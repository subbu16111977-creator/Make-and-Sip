import type { EquipmentTag, PantryItem, Recipe, RecipeIngredient, TasteTag } from "@/types";
import { normalizeIngredient, resolveIngredientById } from "@/lib/ingredientNormalize";
import { computeCookability } from "@/lib/cookability";
import { bestMethod, equipmentSatisfied, recipeForMethod, unmetEquipment } from "@/lib/methods";

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

/** Recipes write counts as "whole" or "piece" ("2 medium"); the pantry calls them "pcs". They are the same thing. */
function countUnit(unit: string | null): string | null {
  const u = unit?.toLowerCase();
  return u === "piece" || u === "whole" ? "pcs" : unit;
}

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

  requiredUnit = countUnit(requiredUnit);
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
  const parsedUnit = countUnit(parsed.unit) as string;

  let short: number | null = null;
  const required = comparableAmount(parsed.quantity, parsedUnit);
  const have = comparableAmount(pantryItem.quantity, pantryItem.unit);
  if (required && have && required.base === have.base) {
    short = (required.amount - have.amount) / (have.amount / pantryItem.quantity);
  } else if (parsedUnit.toLowerCase() === pantryItem.unit.toLowerCase()) {
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
  return equipmentSatisfied(owned, recipe);
}

/** The recipe's required equipment the user doesn't currently own. */
export function missingEquipment(owned: EquipmentTag[], recipe: Recipe): string[] {
  return unmetEquipment(owned, recipe);
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
/**
 * `ownedEquipment` (and optionally a chosen `methodId`) pick which way of making the drink the have/missing split is
 * worked out for, since methods can use different ingredients. Left out, the drink's first method is used.
 */
export function matchRecipe(pantry: PantryItem[], recipe: Recipe, ownedEquipment: EquipmentTag[] = [], methodId?: string | null): RecipeMatch {
  const resolved = recipeForMethod(recipe, bestMethod(ownedEquipment, recipe, methodId));
  const availability = getRecipeAvailability(resolved, pantry);
  const have: RecipeIngredient[] = [];
  const missing: RecipeIngredient[] = [];

  for (const m of availability.ingredients) {
    if (m.identityMatched) have.push(m.recipeIngredient);
    else missing.push(m.recipeIngredient);
  }

  const required = resolved.ingredients.filter((i) => !i.optional);
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
 * outranks a taste-perfect one you can't. When `ownedEquipment` is given,
 * dishes needing gear the user lacks are ranked lower, never hidden.
 */
export function rankRecipesForDiscover(
  pantry: PantryItem[],
  recipes: Recipe[],
  selectedTastes: TasteTag[] = [],
  ownedEquipment?: EquipmentTag[]
): (RecipeMatch & { tasteScore: number; score: number })[] {
  return recipes
    .map((recipe) => {
      const match = matchRecipe(pantry, recipe, ownedEquipment ?? []);
      const tasteScore =
        selectedTastes.length === 0
          ? 1
          : recipe.tasteTags.filter((t) => selectedTastes.includes(t)).length / selectedTastes.length;
      // Dishes needing gear the user lacks stay visible but sink below ones they can cook now.
      const gearPenalty = ownedEquipment && !hasRequiredEquipment(ownedEquipment, recipe) ? 0.15 : 0;
      const score = match.ratio * 0.65 + tasteScore * 0.35 - gearPenalty;
      return { ...match, tasteScore, score };
    })
    .sort((a, b) => b.score - a.score || a.recipe.timeMinutes - b.recipe.timeMinutes);
}

/** Deterministic 0..1 value for (seed, key) — lets a session reshuffle once without reshuffling again on every pantry edit. */
export function seededUnit(seed: number, key: string): number {
  let h = 2166136261 ^ seed;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  h ^= h >>> 15;
  h = Math.imul(h, 2246822519);
  h ^= h >>> 13;
  return (h >>> 0) / 4294967296;
}

export interface SlideshowMatch extends RecipeMatch {
  /** True when every non-optional ingredient is already in the pantry. */
  complete: boolean;
}

/**
 * The Home slideshow. Rules:
 *  - a dish appears only if the user has at least one of its ingredients;
 *  - a dish the user has every required ingredient for ALWAYS appears;
 *  - the remaining slots (up to `targetSize` in total) go to partial matches,
 *    favouring better matches but chosen at random;
 *  - order is shuffled by `seed`, so pass a new seed each time the app opens.
 */
export function pickSlideshowMatches(
  pantry: PantryItem[],
  recipes: Recipe[],
  seed: number,
  targetSize = 8
): SlideshowMatch[] {
  const matches: SlideshowMatch[] = recipes
    .map((recipe) => matchRecipe(pantry, recipe))
    .filter((m) => m.have.length > 0)
    .map((m) => ({ ...m, complete: !m.missing.some((i) => !i.optional) }));

  const complete = matches.filter((m) => m.complete);
  const slots = Math.max(0, targetSize - complete.length);
  const partial = matches
    .filter((m) => !m.complete)
    .map((m) => ({ m, pick: m.ratio * 0.6 + seededUnit(seed, `pick:${m.recipe.id}`) * 0.4 }))
    .sort((a, b) => b.pick - a.pick)
    .slice(0, slots)
    .map((x) => x.m);

  return [...complete, ...partial].sort(
    (a, b) => seededUnit(seed, `order:${a.recipe.id}`) - seededUnit(seed, `order:${b.recipe.id}`)
  );
}

const requiredMissing = (m: RecipeMatch) => m.missing.filter((i) => !i.optional);

/** Dishes ready in this many minutes or fewer count as "quick". */
export const QUICK_MINUTES = 20;

/**
 * A dish can be made when every required ingredient is on hand, at least one
 * ingredient is on hand, and every needed appliance is owned. Optional
 * ingredients never matter — with or without them, the dish can be made.
 */
export function canMakeRecipe(
  recipe: Recipe,
  haveCount: number,
  missing: RecipeIngredient[],
  ownedEquipment: EquipmentTag[]
): boolean {
  return haveCount > 0 && !missing.some((i) => !i.optional) && hasRequiredEquipment(ownedEquipment, recipe);
}

export function isCanMake(m: RecipeMatch, ownedEquipment: EquipmentTag[]): boolean {
  return canMakeRecipe(m.recipe, m.have.length, m.missing, ownedEquipment);
}

/** At least one ingredient is on hand, something required is still missing, and every needed appliance is owned. */
export function isAlmostThere(m: RecipeMatch, ownedEquipment: EquipmentTag[]): boolean {
  return m.have.length > 0 && requiredMissing(m).length > 0 && hasRequiredEquipment(ownedEquipment, m.recipe);
}

/** Quick to make, and cookable with the appliances the user owns. */
export function isQuickRecipe(recipe: Recipe, ownedEquipment: EquipmentTag[]): boolean {
  return recipe.timeMinutes <= QUICK_MINUTES && hasRequiredEquipment(ownedEquipment, recipe);
}

/**
 * Everything the user can make right now, quickest first: nothing required is missing, short or in doubt
 * (amounts included — see Cookability), and every needed appliance is owned.
 */
export function pickReadyToCook(
  pantry: PantryItem[],
  recipes: Recipe[],
  ownedEquipment: EquipmentTag[]
): RecipeMatch[] {
  return recipes
    .map((r) => ({ m: matchRecipe(pantry, r, ownedEquipment), c: computeCookability(r, pantry, ownedEquipment) }))
    .filter(({ m, c }) => c.category === "ready" && m.have.length > 0)
    .map(({ m }) => m)
    .sort((a, b) => a.recipe.timeMinutes - b.recipe.timeMinutes);
}

/**
 * Dishes the user has at least one ingredient for and all the appliances
 * for, but is still short of something (a missing ingredient or not enough of one). Closest to done first.
 */
export function pickAlmostThere(pantry: PantryItem[], recipes: Recipe[], ownedEquipment: EquipmentTag[]): RecipeMatch[] {
  return recipes
    .map((r) => ({ m: matchRecipe(pantry, r, ownedEquipment), c: computeCookability(r, pantry, ownedEquipment) }))
    .filter(({ m, c }) => m.have.length > 0 && c.category !== "ready" && hasRequiredEquipment(ownedEquipment, m.recipe))
    .sort(
      (a, b) =>
        a.c.requiredMissing + a.c.requiredInsufficient + a.c.requiredAmbiguous - (b.c.requiredMissing + b.c.requiredInsufficient + b.c.requiredAmbiguous) ||
        b.c.percent - a.c.percent ||
        a.m.recipe.timeMinutes - b.m.recipe.timeMinutes
    )
    .map(({ m }) => m);
}

/** Dishes ready in `maxMinutes` or less, in a random order that is stable for a given seed. */
export function pickQuickRecipes(recipes: Recipe[], seed: number, maxMinutes = QUICK_MINUTES, limit = 10): Recipe[] {
  return recipes
    .filter((r) => r.timeMinutes <= maxMinutes)
    .sort((a, b) => seededUnit(seed, `quick:${a.id}`) - seededUnit(seed, `quick:${b.id}`))
    .slice(0, limit);
}

/** The appliance not yet owned whose purchase would newly unlock the most dishes, or null if none unlocks anything. */
export function bestEquipmentUnlock(
  owned: EquipmentTag[],
  candidates: EquipmentTag[],
  allRecipes: Recipe[]
): { tag: EquipmentTag; count: number } | null {
  let best: { tag: EquipmentTag; count: number } | null = null;
  for (const tag of candidates) {
    if (owned.includes(tag)) continue;
    const count = recipesUnlockedByAdding(owned, tag, allRecipes).length;
    if (count > 0 && (!best || count > best.count)) best = { tag, count };
  }
  return best;
}

export interface CuisineSummary {
  cuisine: string;
  count: number;
  /** A representative photo (first dish in the cuisine that has one). */
  image: string;
}

export function cuisineSummaries(recipes: Recipe[]): CuisineSummary[] {
  const map = new Map<string, CuisineSummary>();
  for (const r of recipes) {
    const cur = map.get(r.cuisine);
    if (!cur) map.set(r.cuisine, { cuisine: r.cuisine, count: 1, image: r.image });
    else {
      cur.count += 1;
      if (!cur.image && r.image) cur.image = r.image;
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.cuisine.localeCompare(b.cuisine));
}
