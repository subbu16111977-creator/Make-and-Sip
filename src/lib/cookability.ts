import type { EquipmentTag, PantryItem, Recipe, RecipeIngredient } from "@/types";
import { bestMethod, methodsOf, missingForMethod, recipeForMethod, unmetEquipment } from "@/lib/methods";
import { expandUnicodeFractions, parseAmount, resolveIngredientById } from "@/lib/ingredientNormalize";

/**
 * Cookability Score — "can I actually cook this, with what I own, for this many people?"
 *
 * Plain, testable logic that sits on top of the ingredient registry and the pantry. It never edits a
 * recipe or a pantry item. How it works, in short:
 *
 *  1. Each REQUIRED ingredient is matched to a pantry item (exact / alias / safe-equivalent / ambiguous / missing).
 *  2. If matched, the amount needed (scaled to the chosen servings) is compared with the amount on hand.
 *     Credit for the ingredient is 1 when there's enough, the fraction on hand when short, 0.5 when the match
 *     is ambiguous, 0 when missing. When the amounts can't be compared safely, the ingredient is "quantity
 *     unknown": it gets full credit (it's never treated as missing) but is listed separately.
 *  3. Credits are averaged with weights (main 3 / supporting 2 / minor 1) so a missing main ingredient can't
 *     hide behind lots of small ones. Optional ingredients are never part of the score.
 *  4. Equipment is judged separately: a missing required appliance means the dish is never "ready to cook".
 */

// ---------------------------------------------------------------------------
// Tunable constants — every threshold lives here, nowhere else.
// ---------------------------------------------------------------------------

export const COOKABILITY = {
  /** Minimum score for "Almost ready". */
  almostReadyMin: 70,
  /** "Almost ready" tolerates at most this many problem ingredients among the important (weight 2–3) ones. */
  almostReadyMaxImportantProblems: 3,
  /** Minimum score for "Partially matched". Below it is "Low match". */
  partialMin: 40,
  /** Credit for an ambiguous match (e.g. pantry has coffee beans, recipe wants ground coffee). */
  ambiguousCredit: 0.5,
  /** A seasoning or pantry staple needed in a large amount counts as a supporting ingredient, not a minor one. */
  largeStapleMl: 200,
  weights: { main: 3, supporting: 2, minor: 1 },
} as const;

export type MatchKind = "exact" | "alias" | "safe-equivalent" | "approved-substitute" | "insufficient" | "missing" | "ambiguous";
export type QuantityState = "sufficient" | "insufficient" | "missing" | "unknown" | "not-applicable" | "ambiguous";
export type CookabilityCategory = "ready" | "almost" | "partial" | "low";

export const CATEGORY_LABEL: Record<CookabilityCategory, string> = {
  ready: "Ready to make",
  almost: "Almost ready",
  partial: "Partially matched",
  low: "Low match",
};

// ---------------------------------------------------------------------------
// Units
// ---------------------------------------------------------------------------

const MASS_TO_G: Record<string, number> = { g: 1, kg: 1000, lb: 453.592, oz: 28.3495 };
const VOLUME_TO_ML: Record<string, number> = { ml: 1, l: 1000, tsp: 4.92892, tbsp: 14.7868, cup: 236.588 };
const COUNT_UNITS = new Set(["whole", "piece", "pcs"]);

/**
 * Grams per millilitre for everyday ingredients, used ONLY to compare a cups-and-spoons recipe with a
 * pantry kept in grams (or the reverse). These are approximations, so a result that relies on one is flagged.
 * An ingredient that isn't listed is never converted between weight and volume.
 */
export const DENSITY_G_PER_ML: Record<string, number> = {
  sugar: 0.85,
  "brown-sugar": 0.93,
  milk: 1.03,
  honey: 1.42,
  rice: 0.8,
  water: 1,
  ice: 0.55,
  "ground-coffee": 0.4,
  "sweetened-condensed-milk": 1.3,
  "heavy-cream": 1,
  "cocoa-powder": 0.5,
  "oat-milk": 1.03,
  "almond-milk": 1.02,
  "soy-milk": 1.03,
};

type Dimension = "mass" | "volume" | "count" | "other";

function dimensionOf(unit: string | null): Dimension | null {
  if (!unit) return null;
  const u = unit.toLowerCase();
  if (u in MASS_TO_G) return "mass";
  if (u in VOLUME_TO_ML) return "volume";
  if (COUNT_UNITS.has(u)) return "count";
  return "other";
}

/** An amount in a base measure: grams, millilitres or a count. */
interface Base {
  dim: Dimension;
  amount: number;
}

function toBase(quantity: number, unit: string): Base {
  const u = unit.toLowerCase();
  const dim = dimensionOf(u) as Dimension;
  if (dim === "mass") return { dim, amount: quantity * MASS_TO_G[u] };
  if (dim === "volume") return { dim, amount: quantity * VOLUME_TO_ML[u] };
  return { dim, amount: quantity };
}

/**
 * How much of a pantry item an amount from a recipe is, in that item's own unit, when that can be said reliably:
 * the same kind of measure (ml with cups, g with oz, pieces with pieces) or the very same unit. Weight against volume
 * is never converted here, even for ingredients with a known density, because this is used to take amounts out of
 * the pantry and an estimate is not good enough for that. Returns null when it can't be said.
 */
export function amountInPantryUnit(required: { quantity: number; unit: string }, pantryItem: PantryItem): number | null {
  if (!pantryItem.quantityKnown || pantryItem.quantity <= 0) return null;
  const need = toBase(required.quantity, required.unit);
  const have = toBase(pantryItem.quantity, pantryItem.unit);
  if (need.dim === have.dim && need.dim !== "other") return (need.amount * pantryItem.quantity) / have.amount;
  if (required.unit.toLowerCase() === pantryItem.unit.toLowerCase()) return required.quantity;
  return null;
}

// ---------------------------------------------------------------------------
// Quantity comparison
// ---------------------------------------------------------------------------

interface QuantityResult {
  state: QuantityState;
  /** 0–1: how much of the needed amount is on hand (1 when enough or when it can't be compared). */
  sufficiency: number;
  /** "300 g" — what is still short, in the recipe's own unit. */
  shortBy: string | null;
  /** True when the answer relied on a weight↔volume approximation. */
  approximate: boolean;
}

const UNKNOWN: QuantityResult = { state: "unknown", sufficiency: 1, shortBy: null, approximate: false };
const NOT_APPLICABLE: QuantityResult = { state: "not-applicable", sufficiency: 1, shortBy: null, approximate: false };

function roundNice(n: number): number {
  return Math.round(n * 100) / 100;
}

/** Amounts like "salt to taste" or "oil for frying" are about having it, not about a measured quantity. */
const QUALITATIVE_RE = /to taste|for (deep[- ]|shallow[- ])?frying|as needed|as desired|a few|a pinch|a dash|a splash|a handful|pinch|dash|drizzle|for serving|to serve|for greasing|for dusting|for brushing|for garnish|handful/i;

export function isQualitative(ingredient: RecipeIngredient): boolean {
  return QUALITATIVE_RE.test(`${ingredient.amount} ${ingredient.label}`);
}

// Parsing a recipe's amount text is the same every time, so it's remembered.
const amountCache = new Map<string, { quantity: number | null; unit: string | null }>();
function parsedAmount(ingredient: RecipeIngredient) {
  const key = ingredient.amount;
  let hit = amountCache.get(key);
  if (!hit) {
    hit = parseAmount(ingredient.amount);
    amountCache.set(key, hit);
  }
  return hit;
}

function compareQuantity(
  required: { quantity: number; unit: string },
  pantryItem: PantryItem,
  recipeIngredientId: string
): QuantityResult {
  if (!pantryItem.quantityKnown) return UNKNOWN;
  if (pantryItem.quantity <= 0) return { state: "insufficient", sufficiency: 0, shortBy: `${roundNice(required.quantity)} ${required.unit}`, approximate: false };

  const need = toBase(required.quantity, required.unit);
  let have = toBase(pantryItem.quantity, pantryItem.unit);
  let approximate = false;

  // Weight ↔ volume needs a density, and only a few common ingredients have one.
  if ((need.dim === "mass" && have.dim === "volume") || (need.dim === "volume" && have.dim === "mass")) {
    const density = DENSITY_G_PER_ML[recipeIngredientId] ?? DENSITY_G_PER_ML[pantryItem.ingredientId];
    if (!density) return UNKNOWN;
    have = need.dim === "mass" ? { dim: "mass", amount: have.amount * density } : { dim: "volume", amount: have.amount / density };
    approximate = true;
  }

  const sameUnitText = required.unit.toLowerCase() === pantryItem.unit.toLowerCase();
  if (need.dim !== have.dim && !sameUnitText) return UNKNOWN; // e.g. "1 onion" vs 200 g — no safe rule
  if (need.dim === "other" && !sameUnitText) return UNKNOWN;

  const haveAmount = need.dim === have.dim ? have.amount : pantryItem.quantity;
  const needAmount = need.dim === have.dim ? need.amount : required.quantity;
  if (haveAmount >= needAmount - 1e-9) return { state: "sufficient", sufficiency: 1, shortBy: null, approximate };

  const fractionShort = (needAmount - haveAmount) / needAmount;
  const short = required.quantity * fractionShort;
  // Whole things are bought whole: "need 1 more", never "0.5 more".
  const shortBy = need.dim === "count" ? `${Math.ceil(short - 1e-9)} ${required.unit === "pcs" ? "pcs" : "piece"}` : `${roundNice(short)} ${required.unit}`;
  return { state: "insufficient", sufficiency: Math.max(0, haveAmount / needAmount), shortBy, approximate };
}

// ---------------------------------------------------------------------------
// Ingredient role weights
// ---------------------------------------------------------------------------

export type Weight = 1 | 2 | 3;

/** The role an ingredient plays, from what kind of ingredient it is (and, for staples and flavourings, how much the drink needs). */
export function ingredientWeight(ingredientId: string, requiredMl: number | null): Weight {
  const category = resolveIngredientById(ingredientId)?.category;
  switch (category) {
    // The base of the drink (the coffee, tea, milk or juice it is built on) matters most...
    case "Coffee & Tea":
    case "Milk & Cream":
    case "Juices & Sodas":
      return 3;
    // ...then what gives it its character...
    case "Fruit":
    case "Sweeteners & Syrups":
    case "Ice & Frozen":
      return 2;
    default:
      return requiredMl !== null && requiredMl >= COOKABILITY.largeStapleMl ? 2 : 1;
  }
}

function requiredMlOf(quantity: number | null, unit: string | null): number | null {
  if (quantity === null || !unit) return null;
  const u = unit.toLowerCase();
  if (u in VOLUME_TO_ML) return quantity * VOLUME_TO_ML[u];
  if (u in MASS_TO_G) return quantity * MASS_TO_G[u]; // for staples a gram ≈ a millilitre is close enough for "is it a big amount"
  return null;
}

// ---------------------------------------------------------------------------
// One ingredient
// ---------------------------------------------------------------------------

export interface IngredientCookability {
  ingredient: RecipeIngredient;
  optional: boolean;
  match: MatchKind;
  quantity: QuantityState;
  /** 0–1 contribution to the score (ignored for optional ingredients). */
  credit: number;
  weight: Weight;
  pantryItemId: string | null;
  /** The amount needed after scaling to the chosen servings, e.g. "250 g", when it could be worked out. */
  needed: string | null;
  shortBy: string | null;
  /** True when the quantity answer used a weight↔volume approximation. */
  approximate: boolean;
  message: string;
}

function findPantryMatch(ingredientId: string, pantry: PantryItem[]): { item: PantryItem; kind: "exact" | "alias" | "safe-equivalent" | "ambiguous" } | null {
  const entity = resolveIngredientById(ingredientId);
  const exact = pantry.find((p) => p.ingredientId === ingredientId);
  if (exact) {
    const alias = entity && exact.name.trim().toLowerCase() !== entity.displayName.toLowerCase() && exact.name.trim().toLowerCase() !== entity.canonicalName.replace(/_/g, " ");
    return { item: exact, kind: alias ? "alias" : "exact" };
  }
  const base = entity?.baseIngredient ?? ingredientId;
  const sameBase = pantry.filter((p) => (resolveIngredientById(p.ingredientId)?.baseIngredient ?? p.ingredientId) === base);
  if (sameBase.length === 0) return null;
  const recipeIsGeneric = entity ? entity.canonicalName === entity.baseIngredient : false;
  // A generic pantry entry ("chicken") or a generic recipe line covers a specific cut; two different specific cuts do not.
  const generic = sameBase.find((p) => {
    const e = resolveIngredientById(p.ingredientId);
    return e ? e.canonicalName === e.baseIngredient : false;
  });
  if (recipeIsGeneric) return { item: sameBase[0], kind: "safe-equivalent" };
  if (generic) return { item: generic, kind: "safe-equivalent" };
  return { item: sameBase[0], kind: "ambiguous" };
}

export function ingredientCookability(ingredient: RecipeIngredient, pantry: PantryItem[], servingsFactor: number): IngredientCookability {
  const optional = !!ingredient.optional;
  const entityName = resolveIngredientById(ingredient.pantryId)?.displayName ?? ingredient.label;
  const parsed = parsedAmount(ingredient);
  const qualitative = isQualitative(ingredient) || parsed.unit === "pinch";
  const scaledQty = parsed.quantity === null ? null : parsed.quantity * servingsFactor;
  const weight = ingredientWeight(ingredient.pantryId, requiredMlOf(scaledQty, parsed.unit));
  const needed = qualitative || scaledQty === null || !parsed.unit ? null : `${roundNice(scaledQty)} ${parsed.unit === "whole" || parsed.unit === "piece" ? "" : parsed.unit}`.trim();

  const found = findPantryMatch(ingredient.pantryId, pantry);
  if (!found) {
    return { ingredient, optional, match: "missing", quantity: "missing", credit: 0, weight, pantryItemId: null, needed, shortBy: null, approximate: false, message: `You don't have ${entityName.toLowerCase()}` };
  }

  if (found.kind === "ambiguous") {
    return { ingredient, optional, match: "ambiguous", quantity: "ambiguous", credit: COOKABILITY.ambiguousCredit, weight, pantryItemId: found.item.id, needed, shortBy: null, approximate: false, message: `You have a different cut or form — check it works for ${entityName.toLowerCase()}` };
  }

  let q: QuantityResult = UNKNOWN;
  if (qualitative) q = NOT_APPLICABLE;
  else if (scaledQty !== null && parsed.unit) q = compareQuantity({ quantity: scaledQty, unit: parsed.unit }, found.item, ingredient.pantryId);

  if (q.state === "insufficient") {
    return { ingredient, optional, match: "insufficient", quantity: "insufficient", credit: q.sufficiency, weight, pantryItemId: found.item.id, needed, shortBy: q.shortBy, approximate: q.approximate, message: `You have some ${entityName.toLowerCase()} — need ${q.shortBy} more` };
  }
  const message = q.state === "unknown" ? `You have ${entityName.toLowerCase()} — amount not checked` : `You have ${entityName.toLowerCase()}`;
  return { ingredient, optional, match: found.kind, quantity: q.state, credit: 1, weight, pantryItemId: found.item.id, needed, shortBy: null, approximate: q.approximate, message };
}

// ---------------------------------------------------------------------------
// A whole dish
// ---------------------------------------------------------------------------

export interface Cookability {
  recipeId: string;
  /** The servings the check was done for, and the recipe's own default. */
  servings: number;
  baseServings: number;
  /** 0–100, from required ingredients only. */
  percent: number;
  category: CookabilityCategory;
  label: string;
  requiredTotal: number;
  /** Required ingredients with enough on hand (or on hand with the amount not checkable). */
  requiredSatisfied: number;
  requiredMissing: number;
  requiredInsufficient: number;
  requiredAmbiguous: number;
  /** Required ingredients that are on hand but whose amount couldn't be compared safely. */
  requiredUnverified: number;
  optionalHave: number;
  optionalMissing: number;
  /** Which way of making the drink the check was done for, and its short name ("Moka pot", "By hand"). */
  methodId: string;
  methodLabel: string;
  /** How many ways there are to make it. */
  methodCount: number;
  /** The equipment the chosen method needs (none for a by-hand method). */
  equipmentNeeded: EquipmentTag[];
  /** What is still missing, as labels: a missing item, or "A, B or C" for a group with none owned. */
  equipmentMissing: string[];
  /** Equipment the drink is better with, and which of it the person owns. Never affects the score or the category. */
  equipmentOptional: EquipmentTag[];
  equipmentOptionalOwned: EquipmentTag[];
  ingredients: IngredientCookability[];
  /** A one-line plain-English summary for the card/detail screen. */
  summary: string;
}

function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`;
}

/**
 * `methodId` picks a way of making the drink; left out, the first method the person has the equipment for is used
 * (or, if none, the one missing the least). The ingredient amounts and the equipment checked are that method's.
 */
export function computeCookability(recipe: Recipe, pantry: PantryItem[], ownedEquipment: EquipmentTag[], servings: number = recipe.servings, methodId?: string | null): Cookability {
  const safeServings = servings > 0 ? servings : recipe.servings;
  const factor = recipe.servings > 0 ? safeServings / recipe.servings : 1;
  const method = bestMethod(ownedEquipment, recipe, methodId);
  const all = recipeForMethod(recipe, method).ingredients.map((i) => ingredientCookability(i, pantry, factor));
  const required = all.filter((i) => !i.optional);
  const optional = all.filter((i) => i.optional);

  const weightSum = required.reduce((n, i) => n + i.weight, 0);
  const percent = weightSum === 0 ? 100 : Math.round((required.reduce((n, i) => n + i.weight * i.credit, 0) / weightSum) * 100);

  const missing = required.filter((i) => i.match === "missing");
  const insufficient = required.filter((i) => i.match === "insufficient");
  const ambiguous = required.filter((i) => i.match === "ambiguous");
  const unverified = required.filter((i) => i.match !== "missing" && i.match !== "ambiguous" && i.quantity === "unknown");
  const problems = [...missing, ...insufficient, ...ambiguous];
  const importantProblems = problems.filter((i) => i.weight >= 2).length;

  // Picked a method yourself: what THAT one needs. Otherwise: what the drink needs overall (the ways out).
  const chosenByPerson = !!methodId && methodsOf(recipe).some((m) => m.id === methodId);
  const equipmentMissing = chosenByPerson ? missingForMethod(ownedEquipment, method) : unmetEquipment(ownedEquipment, recipe);
  const equipmentOptional = (method.optionalEquipment ?? []).map((o) => o.tag).filter((t) => !method.equipment.includes(t));

  let category: CookabilityCategory;
  if (problems.length === 0 && equipmentMissing.length === 0) category = "ready";
  else if (percent >= COOKABILITY.almostReadyMin && importantProblems <= COOKABILITY.almostReadyMaxImportantProblems) category = "almost";
  else if (percent >= COOKABILITY.partialMin) category = "partial";
  else category = "low";

  const satisfied = required.length - problems.length;
  let summary: string;
  if (category === "ready") {
    summary = `You have all ${plural(required.length, "required ingredient")}${method.equipment.length > 0 ? " and the equipment" : ""}.`;
  } else {
    const bits: string[] = [];
    if (missing.length) bits.push(`${missing.length} missing`);
    if (insufficient.length) bits.push(`${insufficient.length} not enough`);
    if (ambiguous.length) bits.push(`${ambiguous.length} to check`);
    if (equipmentMissing.length) bits.push(`needs ${equipmentMissing.map((t) => t.toLowerCase()).join(", ")}`);
    summary = `${satisfied} of ${required.length} required ingredients ready${bits.length ? ` · ${bits.join(" · ")}` : ""}.`;
  }

  return {
    recipeId: recipe.id,
    servings: safeServings,
    baseServings: recipe.servings,
    percent,
    category,
    label: CATEGORY_LABEL[category],
    requiredTotal: required.length,
    requiredSatisfied: satisfied,
    requiredMissing: missing.length,
    requiredInsufficient: insufficient.length,
    requiredAmbiguous: ambiguous.length,
    requiredUnverified: unverified.length,
    optionalHave: optional.filter((i) => i.match !== "missing").length,
    optionalMissing: optional.filter((i) => i.match === "missing").length,
    methodId: method.id,
    methodLabel: method.label,
    methodCount: methodsOf(recipe).length,
    equipmentNeeded: method.equipment,
    equipmentMissing,
    equipmentOptional,
    equipmentOptionalOwned: equipmentOptional.filter((t) => ownedEquipment.includes(t)),
    ingredients: all,
    summary,
  };
}

// ---------------------------------------------------------------------------
// Scaling a recipe to other servings (used for the shopping list)
// ---------------------------------------------------------------------------

const NUM = "\\d+\\s+\\d+\\/\\d+|\\d+\\/\\d+|\\d+(?:\\.\\d+)?";
const LEADING_AMOUNT = new RegExp(`^(\\s*)(${NUM})(?:(\\s*(?:to|-)\\s*)(${NUM}))?`, "i");

function numberOf(token: string): number {
  const mixed = token.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (mixed) return Number(mixed[1]) + Number(mixed[2]) / Number(mixed[3]);
  const frac = token.match(/^(\d+)\/(\d+)$/);
  if (frac) return Number(frac[1]) / Number(frac[2]);
  return Number(token);
}

function formatScaled(n: number): string {
  return String(Math.round(n * 100) / 100);
}

/**
 * "500 g" at half the servings -> "250 g". Only the leading number is scaled, and a bracketed note such as
 * "(about 4 thighs)" is dropped when scaling, because it would no longer be true. Text with no leading number
 * ("a pinch", "to taste") is returned unchanged.
 */
export function scaleAmountText(amount: string, factor: number): string {
  if (factor === 1) return amount;
  const text = expandUnicodeFractions(amount);
  const m = LEADING_AMOUNT.exec(text);
  if (!m) return amount;
  const scaled = formatScaled(numberOf(m[2].trim()) * factor) + (m[4] ? `${m[3]}${formatScaled(numberOf(m[4].trim()) * factor)}` : "");
  const rest = text.slice(m[0].length).replace(/\s*\([^)]*\)/g, "");
  return `${m[1]}${scaled}${rest}`;
}

/** A copy of the recipe with every ingredient amount scaled to `servings` — for shopping, never for display or saving. */
export function scaledRecipe(recipe: Recipe, servings: number): Recipe {
  const factor = recipe.servings > 0 ? servings / recipe.servings : 1;
  if (factor === 1) return recipe;
  return { ...recipe, ingredients: recipe.ingredients.map((i) => ({ ...i, amount: scaleAmountText(i.amount, factor) })) };
}
