import type { PantryItem, RecipeIngredient } from "@/types";
import { resolveIngredientById } from "@/lib/ingredientNormalize";

/**
 * Showing a drink in the person's own words. When the pantry holds an ingredient the drink needs under a different
 * name ("club soda" for "sparkling water", "oj" for "orange juice"), the drink page shows the name they use, both in
 * the ingredient list and in the method. This is display only: the recipe is never edited, and only genuine aliases
 * of the same ingredient are renamed. A different form (coffee beans for ground coffee) is a different ingredient and
 * keeps its own name.
 */

export interface NameSwap {
  /** Every wording the recipe might use for the ingredient, lower case, longest first. */
  terms: string[];
  /** What the person calls it. */
  to: string;
}

/** Wordings that say how an ingredient is served, not what it is: replacing them would lose information ("boiling water" is not "tap water"). */
const STATE_WORDS = /\b(hot|boiling|cold|warm|chilled|iced|ice-cold|crushed|cubed|frozen|fresh|freshly|steamed|melted)\b/i;

const MAX_NAME_LENGTH = 40;

/** Ingredients too generic to rename: "water" and "ice" appear inside other phrases ("boiling water", "ice cubes"). */
const NEVER_RENAMED = new Set(["water", "ice"]);

/** The name the person uses for an ingredient the drink needs, when it differs from the recipe's; otherwise null. */
export function ownedNameFor(ingredient: RecipeIngredient, item: PantryItem | undefined): string | null {
  if (!item || item.ingredientId !== ingredient.pantryId || NEVER_RENAMED.has(ingredient.pantryId)) return null;
  const entity = resolveIngredientById(ingredient.pantryId);
  if (!entity) return null;
  const typed = item.name.replace(/\s+/g, " ").trim();
  if (typed === "" || typed.length > MAX_NAME_LENGTH) return null;
  const lower = typed.toLowerCase();
  if (lower === entity.displayName.toLowerCase()) return null;
  if (ingredient.label.toLowerCase().includes(lower)) return null;
  return typed;
}

/** The wordings of one ingredient that can safely be swapped for the person's own name. */
function swappableTerms(ingredientId: string, to: string): string[] {
  const entity = resolveIngredientById(ingredientId);
  if (!entity) return [];
  const lowerTo = to.toLowerCase();
  const all = [entity.displayName, ...entity.synonyms].map((t) => t.toLowerCase().trim());
  // When the person's name already contains the plain name ("semi skimmed milk" contains "milk"), swapping the plain
  // name too would stack the words, so only the fuller wordings are replaced.
  const plain = entity.displayName.toLowerCase();
  const kept = all.filter((t) => t.length >= 3 && t !== lowerTo && !STATE_WORDS.test(t) && !(t === plain && lowerTo.includes(plain)));
  return [...new Set(kept)].sort((a, b) => b.length - a.length);
}

/** One swap for each matched ingredient the person holds under their own name. */
export function buildSwaps(pairs: readonly { ingredient: RecipeIngredient; item: PantryItem | undefined }[]): NameSwap[] {
  const swaps: NameSwap[] = [];
  const seen = new Set<string>();
  for (const { ingredient, item } of pairs) {
    const to = ownedNameFor(ingredient, item);
    if (!to || seen.has(ingredient.pantryId)) continue;
    seen.add(ingredient.pantryId);
    const terms = swappableTerms(ingredient.pantryId, to);
    if (terms.length > 0) swaps.push({ terms, to });
  }
  return swaps;
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Replaces each wording with the person's name, keeping a leading capital where the original had one. */
export function swapNames(text: string, swaps: readonly NameSwap[]): string {
  let out = text;
  for (const swap of swaps) {
    const pattern = new RegExp(`\\b(${swap.terms.map(escape).join("|")})\\b`, "gi");
    out = out.replace(pattern, (match, _g, offset: number) => {
      const atStart = offset === 0 || /[.!?]\s$/.test(out.slice(Math.max(0, offset - 2), offset));
      const capital = match[0] === match[0].toUpperCase() && match[0] !== match[0].toLowerCase();
      const name = swap.to;
      return capital || atStart ? name[0].toUpperCase() + name.slice(1) : name[0].toLowerCase() + name.slice(1);
    });
  }
  return out;
}

/** Tidies "club soda (plain club soda)": a bracket that only repeats the name adds nothing. */
function dropRepeatedBrackets(label: string, swaps: readonly NameSwap[]): string {
  let out = label;
  for (const { to } of swaps) {
    const name = escape(to.toLowerCase());
    out = out.replace(new RegExp(`\\s*\\((?:plain |just |regular )?${name}\\)`, "gi"), "");
  }
  return out.trim();
}

/** An ingredient's label in the person's words. */
export function swapLabel(label: string, swaps: readonly NameSwap[]): string {
  if (swaps.length === 0) return label;
  return dropRepeatedBrackets(swapNames(label, swaps), swaps);
}
