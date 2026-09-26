import type { EquipmentTag, PantryItem, Recipe, RecipeIngredient, TasteTag } from "@/types";
import { normalizeIngredient, resolveIngredientById } from "@/lib/ingredientNormalize";

export interface RecipeMatch {
  recipe: Recipe;
  have: RecipeIngredient[];
  missing: RecipeIngredient[];
  /** Required ingredients only — optional garnishes don't count against the ratio. */
  ratio: number;
}

// ---------------------------------------------------------------------------
// Ingredient identity + quantity matching
//
// This is the one place Discover availability gets computed. Nothing here
// is ever cached on the recipe or the pantry item — every call re-derives
// the answer from current Pantry state, which is what keeps Discover,
// Shopping, and Pantry from drifting out of sync with each other.
// ---------------------------------------------------------------------------

export type IngredientMatchType = "exact_id" | "subtype" | "none";
export type IngredientMatchStatus = "matched" | "matched_subtype" | "quantity_insufficient" | "missing" | "optional_missing";
export type QuantityStatus = "sufficient" | "insufficient" | "unknown";

export interface IngredientMatch {
  recipeIngredient: RecipeIngredient;
  status: IngredientMatchStatus;
  matchType: IngredientMatchType;
  pantryItemId: string | null;
  identityMatched: boolean;
  quantityStatus: QuantityStatus;
  /** Human-readable shortfall, e.g. "300 g", only set when quantityStatus is "insufficient". */
  missingQuantity: string | null;
  confidence: number;
  message: string;
}

/** The ingredient's own base identity — falls back to its raw pantryId when the registry has no entry (shouldn't happen for real data, but never throws). */
function baseOf(ingredientId: string): string {
  return resolveIngredientById(ingredientId)?.baseIngredient ?? ingredientId;
}

function displayNameOf(ingredientId: string): string {
  return resolveIngredientById(ingredientId)?.displayName ?? ingredientId;
}

// Small unit-conversion tables so "recipe wants 500 g" can be checked
// against "pantry has 1 kg" — cross-unit comparison, same physical
// quantity. Units outside these tables (count-based: pcs, clove, can, …)
// are only comparable when they match exactly; otherwise quantity status
// is "unknown" rather than a guessed answer.
const MASS_TO_G: Record<string, number> = { g: 1, kg: 1000, lb: 453.592, oz: 28.3495 };
const VOLUME_TO_ML: Record<string, number> = { ml: 1, l: 1000, tsp: 4.92892, tbsp: 14.7868, cup: 236.588 };

function comparableAmount(quantity: number, unit: string | null): { base: "mass" | "volume" | "count"; amount: number } | null {
  if (!unit) return null;
  const u = unit.toLowerCase();
  if (u in MASS_TO_G) return { base: "mass", amount: quantity * MASS_TO_G[u] };
  if (u in VOLUME_TO_ML) return { base: "volume", amount: quantity * VOLUME_TO_ML[u] };
  return null;
}

/**
 * Compares a required quantity against what's on hand. Only ever called
 * once identity is already established — this never decides whether an
 * ingredient matches, only whether there's *enough* of it.
 */
function compareQuantity(
  requiredQuantity: number | null,
  requiredUnit: string | null,
  pantryItem: PantryItem
): { status: QuantityStatus; missingQuantity: string | null } {
  if (!pantryItem.quantityKnown) return { status: "unknown", missingQuantity: null };
  if (requiredQuantity === null) return { status: "unknown", missingQuantity: null };

  const required = comparableAmount(requiredQuantity, requiredUnit);
  const have = comparableAmount(pantryItem.quantity, pantryItem.unit);

  if (required && have && required.base === have.base) {
    if (have.amount >= required.amount) return { status: "sufficient", missingQuantity: null };
    const shortfallBase = required.amount - have.amount;
    // Report the shortfall back in the recipe's own unit for a readable message.
    const perUnit = required.amount / requiredQuantity!;
    const shortfallInRequiredUnit = perUnit > 0 ? shortfallBase / perUnit : shortfallBase;
    return {
      status: "insufficient",
      missingQuantity: `${roundNice(shortfallInRequiredUnit)} ${requiredUnit ?? ""}`.trim(),
    };
  }

  // Same exact unit string (e.g. both "pcs" or both "clove") — direct compare.
  if (requiredUnit && pantryItem.unit && requiredUnit.toLowerCase() === pantryItem.unit.toLowerCase()) {
    if (pantryItem.quantity >= requiredQuantity) return { status: "sufficient", missingQuantity: null };
    return { status: "insufficient", missingQuantity: `${roundNice(requiredQuantity - pantryItem.quantity)} ${requiredUnit}` };
  }

  // Units aren't meaningfully comparable (e.g. recipe wants "g", pantry tracks "pcs") — identity still counts as available.
  return { status: "unknown", missingQuantity: null };
}

function roundNice(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Resolves one recipe ingredient against current pantry inventory.
 * Priority: exact ingredient-id match, then same-baseIngredient subtype
 * match, then missing. Preparation words never enter this decision —
 * they were already stripped out when the recipe data (and any
 * free-text pantry entry) was normalized.
 */
export function getIngredientMatch(recipeIngredient: RecipeIngredient, pantryItems: PantryItem[]): IngredientMatch {
  const requiredId = recipeIngredient.pantryId;
  const requiredBase = baseOf(requiredId);
  const name = displayNameOf(requiredId);

  const exact = pantryItems.find((p) => p.ingredientId === requiredId);
  const subtype = exact ? null : pantryItems.find((p) => baseOf(p.ingredientId) === requiredBase);
  const hit = exact ?? subtype;

  if (!hit) {
    return {
      recipeIngredient,
      status: recipeIngredient.optional ? "optional_missing" : "missing",
      matchType: "none",
      pantryItemId: null,
      identityMatched: false,
      quantityStatus: "unknown",
      missingQuantity: null,
      confidence: 0,
      message: recipeIngredient.optional ? `${name} (optional) — not on hand` : `Add ${name.toLowerCase()}`,
    };
  }

  // Best-effort quantity parse from the recipe's own amount + label text.
  const parsed = normalizeIngredient(`${recipeIngredient.amount} ${recipeIngredient.label}`);
  const { status: quantityStatus, missingQuantity } = compareQuantity(parsed.quantity, parsed.unit, hit);

  const matchType: IngredientMatchType = exact ? "exact_id" : "subtype";
  const status: IngredientMatchStatus = quantityStatus === "insufficient" ? "quantity_insufficient" : exact ? "matched" : "matched_subtype";

  let message: string;
  if (quantityStatus === "insufficient") {
    message = `You have some ${name.toLowerCase()} — need ${missingQuantity} more`;
  } else if (quantityStatus === "unknown") {
    message = `You have ${name.toLowerCase()} — quantity unknown`;
  } else {
    message = `You have ${name.toLowerCase()}`;
  }

  return {
    recipeIngredient,
    status,
    matchType,
    pantryItemId: hit.id,
    identityMatched: true,
    quantityStatus,
    missingQuantity,
    confidence: exact ? 1 : 0.85,
    message,
  };
}

export interface RecipeAvailability {
  recipeId: string;
  requiredCount: number;
  matchedCount: number;
  missingCount: number;
  quantityDeficientCount: number;
  optionalMissingCount: number;
  matchPercentage: number;
  status: "ready" | "almost_ready" | "needs_shopping";
  ingredients: IngredientMatch[];
}

/**
 * The single source of truth for "can I make this?" — called fresh from
 * current Pantry state every time Discover (or the recipe detail screen)
 * needs to know. Nothing about availability is ever written back onto
 * the recipe object.
 */
export function getRecipeAvailability(recipe: Recipe, pantryItems: PantryItem[]): RecipeAvailability {
  const ingredients = recipe.ingredients.map((ingredient) => getIngredientMatch(ingredient, pantryItems));

  const required = ingredients.filter((m) => !m.recipeIngredient.optional);
  const matchedCount = ingredients.filter((m) => m.identityMatched).length;
  const missingCount = ingredients.filter((m) => m.status === "missing").length;
  const optionalMissingCount = ingredients.filter((m) => m.status === "optional_missing").length;
  const quantityDeficientCount = ingredients.filter((m) => m.status === "quantity_insufficient").length;

  const requiredMatched = required.filter((m) => m.identityMatched).length;
  const matchPercentage = required.length === 0 ? 100 : Math.round((requiredMatched / required.length) * 100);

  const status: RecipeAvailability["status"] =
    matchPercentage === 100 ? "ready" : matchPercentage >= 60 ? "almost_ready" : "needs_shopping";

  return {
    recipeId: recipe.id,
    requiredCount: required.length,
    matchedCount,
    missingCount,
    quantityDeficientCount,
    optionalMissingCount,
    matchPercentage,
    status,
    ingredients,
  };
}

// ---------------------------------------------------------------------------
// Shopping plan — what "add missing ingredients" should send to Shopping.
// Read-only view over the matching above; it never changes how matching works.
// ---------------------------------------------------------------------------

/** A quantity still needed for an ingredient the pantry already has some of. */
export interface ShortfallRequest {
  ingredient: RecipeIngredient;
  /**
   * The pantry item's ingredient (which may be a more generic one than the recipe's, e.g. "chicken" for
   * "chicken thigh"). The top-up is filed under this so buying it merges into that same pantry item.
   */
  ingredientId: string;
  quantity: number;
  /** In the unit the pantry item itself uses, so buying it merges straight into that pantry item. */
  unit: string;
}

/**
 * How much more of an already-stocked ingredient is needed, expressed in the
 * pantry item's own unit (the pantry only merges quantities in matching units,
 * so a "0.15 lb" top-up against a pantry tracked in grams would never close the gap).
 * Null when the ingredient isn't short, or the units can't be compared.
 */
export function getShortfallRequest(recipeIngredient: RecipeIngredient, pantryItems: PantryItem[]): ShortfallRequest | null {
  const match = getIngredientMatch(recipeIngredient, pantryItems);
  if (match.status !== "quantity_insufficient" || !match.pantryItemId) return null;
  const pantryItem = pantryItems.find((p) => p.id === match.pantryItemId);
  if (!pantryItem || pantryItem.quantity <= 0) return null;

  const parsed = normalizeIngredient(`${recipeIngredient.amount} ${recipeIngredient.label}`);
  if (parsed.quantity === null || !parsed.unit) return null;

  let short: number | null = null;
  const required = comparableAmount(parsed.quantity, parsed.unit);
  const have = comparableAmount(pantryItem.quantity, pantryItem.unit);
  if (required && have && required.base === have.base) {
    short = (required.amount - have.amount) / (have.amount / pantryItem.quantity);
  } else if (parsed.unit.toLowerCase() === pantryItem.unit.toLowerCase()) {
    short = parsed.quantity - pantryItem.quantity;
  }
  if (short === null || short <= 0) return null;

  // Round up so the top-up always covers the gap.
  const quantity = pantryItem.unit === "g" || pantryItem.unit === "ml" ? Math.ceil(short) : Math.ceil(short * 100) / 100;
  return { ingredient: recipeIngredient, ingredientId: pantryItem.ingredientId, quantity, unit: pantryItem.unit };
}

export interface ShoppingPlan {
  /** Required ingredients not in the pantry at all. */
  required: RecipeIngredient[];
  /** Optional ingredients not in the pantry — left out of "add missing" unless the user asks. */
  optional: RecipeIngredient[];
  /** Required ingredients the pantry has some of, but not enough. */
  shortfalls: ShortfallRequest[];
}

export function getShoppingPlan(recipe: Recipe, pantryItems: PantryItem[]): ShoppingPlan {
  const plan: ShoppingPlan = { required: [], optional: [], shortfalls: [] };
  for (const m of getRecipeAvailability(recipe, pantryItems).ingredients) {
    if (m.status === "missing") plan.required.push(m.recipeIngredient);
    else if (m.status === "optional_missing") plan.optional.push(m.recipeIngredient);
    else if (m.status === "quantity_insufficient" && !m.recipeIngredient.optional) {
      const shortfall = getShortfallRequest(m.recipeIngredient, pantryItems);
      if (shortfall) plan.shortfalls.push(shortfall);
    }
  }
  return plan;
}

/** True when `owned` covers every appliance `recipe` needs (an empty requirement list always passes). */
export function hasRequiredEquipment(owned: EquipmentTag[], recipe: Recipe): boolean {
  return recipe.equipment.every((tag) => owned.includes(tag));
}

/** The recipe's required equipment the user doesn't currently own. */
export function missingEquipment(owned: EquipmentTag[], recipe: Recipe): EquipmentTag[] {
  return recipe.equipment.filter((tag) => !owned.includes(tag));
}

/**
 * Recipes that go from equipment-locked to equipment-ready the moment
 * `tag` is added to what's owned — the "you just unlocked N dishes"
 * set for the celebration when someone checks off a new appliance.
 */
export function recipesUnlockedByAdding(owned: EquipmentTag[], tag: EquipmentTag, allRecipes: Recipe[]): Recipe[] {
  const after = [...owned, tag];
  return allRecipes.filter((recipe) => !hasRequiredEquipment(owned, recipe) && hasRequiredEquipment(after, recipe));
}

export function daysUntil(iso: string, from: Date = new Date()): number {
  const target = new Date(iso);
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.ceil((target.getTime() - from.getTime()) / msPerDay);
}

/** Items expiring within `withinDays`, soonest first. */
export function getExpiringSoon(pantry: PantryItem[], withinDays = 4): PantryItem[] {
  return pantry
    .filter((item) => daysUntil(item.expiryDate) <= withinDays)
    .sort((a, b) => daysUntil(a.expiryDate) - daysUntil(b.expiryDate));
}

/**
 * Backward-compatible have/missing view used by Home, Discover ranking,
 * Saved, and the recipe detail screen. Built entirely on top of
 * `getRecipeAvailability` — a subtype match (pantry has "chicken",
 * recipe needs "chicken thighs") now correctly counts as "have", and a
 * quantity-insufficient ingredient still counts as "have" here (it's not
 * literally missing — the detail screen surfaces the shortfall
 * separately via `getIngredientMatch`).
 */
export function matchRecipe(pantry: PantryItem[], recipe: Recipe): RecipeMatch {
  const availability = getRecipeAvailability(recipe, pantry);
  const have: RecipeIngredient[] = [];
  const missing: RecipeIngredient[] = [];

  for (const m of availability.ingredients) {
    if (m.identityMatched) have.push(m.recipeIngredient);
    else missing.push(m.recipeIngredient);
  }

  const required = recipe.ingredients.filter((i) => !i.optional);
  const requiredHave = have.filter((i) => !i.optional).length;
  const ratio = required.length === 0 ? 1 : requiredHave / required.length;

  return { recipe, have, missing, ratio };
}

/** All recipes, ranked by how much of the pantry already covers them. */
export function rankRecipesByPantryMatch(pantry: PantryItem[], recipes: Recipe[]): RecipeMatch[] {
  return recipes
    .map((recipe) => matchRecipe(pantry, recipe))
    .sort((a, b) => b.ratio - a.ratio || a.recipe.timeMinutes - b.recipe.timeMinutes);
}

/**
 * The hero pick: among recipes the user can substantially make (ratio
 * >= threshold), prefer the one that uses the most soon-to-expire
 * ingredients — the "use it before it's gone" story. Falls back to
 * the single best overall match.
 */
export function pickHeroMatch(
  pantry: PantryItem[],
  recipes: Recipe[],
  threshold = 0.6
): RecipeMatch & { expiringUsed: PantryItem[] } {
  const expiring = getExpiringSoon(pantry, 4);
  const expiringIds = new Set(expiring.map((i) => i.id));
  const ranked = rankRecipesByPantryMatch(pantry, recipes);
  const candidates = ranked.filter((m) => m.ratio >= threshold);
  const pool = candidates.length > 0 ? candidates : ranked;

  let best = pool[0];
  let bestOverlap = -1;
  for (const match of pool) {
    const overlap = match.have.filter((i) => expiringIds.has(i.pantryId)).length;
    if (overlap > bestOverlap) {
      bestOverlap = overlap;
      best = match;
    }
  }

  const expiringUsed = expiring.filter((item) =>
    best.have.some((ingredient) => ingredient.pantryId === item.id)
  );

  return { ...best, expiringUsed };
}

/**
 * Discover's ranking: how much of the pantry already covers the dish,
 * combined with how many of the user's selected taste preferences it
 * hits. This is the honest, rule-based version of "matches your taste"
 * — no history, no ML, just pantry overlap plus preferences the user
 * set themselves. Weighted 65/35 so a dish you can actually make still
 * outranks a taste-perfect one you can't.
 */
export function rankRecipesForDiscover(
  pantry: PantryItem[],
  recipes: Recipe[],
  selectedTastes: TasteTag[] = []
): (RecipeMatch & { tasteScore: number; score: number })[] {
  return recipes
    .map((recipe) => {
      const match = matchRecipe(pantry, recipe);
      const tasteScore =
        selectedTastes.length === 0
          ? 1
          : recipe.tasteTags.filter((t) => selectedTastes.includes(t)).length / selectedTastes.length;
      const score = match.ratio * 0.65 + tasteScore * 0.35;
      return { ...match, tasteScore, score };
    })
    .sort((a, b) => b.score - a.score || a.recipe.timeMinutes - b.recipe.timeMinutes);
}
