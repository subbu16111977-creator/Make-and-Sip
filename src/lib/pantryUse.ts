import type { PantryItem, Recipe, RecipeIngredient } from "@/types";
import { amountInPantryUnit, ingredientCookability, isQualitative } from "@/lib/cookability";
import { parseAmount } from "@/lib/ingredientNormalize";

/**
 * "I made it": taking what a drink used out of the pantry. The drink passed in is already the method that was made,
 * scaled to the servings made. Only amounts that can be said reliably are taken out; anything else is left alone and
 * listed, so the pantry is never changed by a guess.
 */

export interface UsageLine {
  ingredient: RecipeIngredient;
  /** The pantry item the amount comes out of. */
  itemId: string;
  /** What the person calls it. */
  itemName: string;
  /** How much is used, in the pantry item's own unit. */
  used: number;
  unit: string;
  /** How much is left afterwards (0 when none is). */
  remaining: number;
  /** True when nothing is left, so the item leaves the pantry. */
  runsOut: boolean;
}

export interface SkippedLine {
  ingredient: RecipeIngredient;
  itemName: string;
  reason: string;
}

export interface UsagePlan {
  lines: UsageLine[];
  skipped: SkippedLine[];
}

const round = (n: number) => Math.round(n * 100) / 100;
/** Below this, what is left counts as none (rounding dust from unit conversions). */
const EMPTY = 0.005;

export function planUsage(recipe: Recipe, pantry: PantryItem[]): UsagePlan {
  const lines: UsageLine[] = [];
  const skipped: SkippedLine[] = [];
  // Two lines in a drink can come out of the same pantry item, so what is left is tracked as it goes.
  const left = new Map<string, number>(pantry.map((p) => [p.id, p.quantity]));

  for (const ingredient of recipe.ingredients) {
    if (ingredient.optional || isQualitative(ingredient)) continue;
    const check = ingredientCookability(ingredient, pantry, 1);
    const item = check.pantryItemId ? pantry.find((p) => p.id === check.pantryItemId) : undefined;
    if (!item || check.match === "missing") continue;
    if (check.match === "ambiguous") {
      skipped.push({ ingredient, itemName: item.name, reason: "a different form from the one the drink uses" });
      continue;
    }
    if (!item.quantityKnown) {
      skipped.push({ ingredient, itemName: item.name, reason: "no amount saved for it" });
      continue;
    }
    const parsed = parseAmount(ingredient.amount);
    if (parsed.quantity === null || !parsed.unit) continue;
    const used = amountInPantryUnit({ quantity: parsed.quantity, unit: parsed.unit }, item);
    if (used === null) {
      skipped.push({ ingredient, itemName: item.name, reason: "its units can't be compared safely" });
      continue;
    }
    const before = left.get(item.id) ?? item.quantity;
    const after = Math.max(0, before - used);
    const remaining = after < EMPTY ? 0 : round(after);
    left.set(item.id, remaining);
    lines.push({ ingredient, itemId: item.id, itemName: item.name, used: round(used), unit: item.unit, remaining, runsOut: remaining === 0 });
  }
  return { lines, skipped };
}

/**
 * The pantry after the chosen lines are taken out. An item that runs out leaves the pantry. A line that was not
 * chosen leaves its item exactly as it was.
 */
export function applyUsage(pantry: PantryItem[], lines: readonly UsageLine[], chosen: ReadonlySet<number>): PantryItem[] {
  const taken = new Map<string, number>();
  lines.forEach((line, i) => {
    if (chosen.has(i)) taken.set(line.itemId, (taken.get(line.itemId) ?? 0) + line.used);
  });
  return pantry.flatMap((item) => {
    const used = taken.get(item.id);
    if (used === undefined) return [item];
    const after = item.quantity - used;
    return after < EMPTY ? [] : [{ ...item, quantity: round(after) }];
  });
}
