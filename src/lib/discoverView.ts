import type { Recipe, RecipeIngredient } from "@/types";
import { foldName, resolveSynonym } from "@/lib/ingredientNormalize";

/** How Discover can arrange the list. "best" keeps the pantry-match ranking. */
export type DiscoverSort = "best" | "cookable" | "for-you" | "quickest" | "easiest" | "fewest-to-buy" | "az";

export const SORT_OPTIONS: { key: DiscoverSort; label: string }[] = [
  { key: "best", label: "Best match" },
  { key: "cookable", label: "Most makeable" },
  { key: "for-you", label: "Best for you" },
  { key: "quickest", label: "Quickest" },
  { key: "easiest", label: "Easiest" },
  { key: "fewest-to-buy", label: "Fewest ingredients to buy" },
  { key: "az", label: "A–Z" },
];

const DIFFICULTY_RANK: Record<Recipe["difficulty"], number> = { Easy: 0, Medium: 1, Advanced: 2 };
const requiredMissingCount = (missing: RecipeIngredient[]) => missing.filter((i) => !i.optional).length;

/** Stable sort: ties keep the incoming (best-match) order. */
export function sortDiscover<T extends { recipe: Recipe; missing: RecipeIngredient[] }>(items: T[], sort: DiscoverSort): T[] {
  // "for-you" and "cookable" are ordered by the caller (they need the profile / pantry), so here it keeps the incoming order.
  if (sort === "best" || sort === "for-you" || sort === "cookable") return items;
  const indexed = items.map((item, i) => ({ item, i }));
  const cmp = (a: T, b: T): number => {
    switch (sort) {
      case "quickest":
        return a.recipe.timeMinutes - b.recipe.timeMinutes;
      case "easiest":
        return (
          DIFFICULTY_RANK[a.recipe.difficulty] - DIFFICULTY_RANK[b.recipe.difficulty] ||
          a.recipe.timeMinutes - b.recipe.timeMinutes
        );
      case "fewest-to-buy":
        return requiredMissingCount(a.missing) - requiredMissingCount(b.missing);
      case "az":
        return a.recipe.title.localeCompare(b.recipe.title);
      default:
        return 0;
    }
  };
  return indexed.sort((x, y) => cmp(x.item, y.item) || x.i - y.i).map((x) => x.item);
}

const wordsOf = (text: string) => foldName(text).split(" ").filter(Boolean);

/** Every ingredient id a drink can use, across all of its ways to make it. */
function ingredientIdsOf(recipe: Recipe): Set<string> {
  const ids = new Set(recipe.ingredients.map((i) => i.pantryId));
  for (const m of recipe.methods ?? []) for (const i of m.ingredients ?? []) ids.add(i.pantryId);
  return ids;
}

/**
 * Discover's search. Each word typed has to start a word in the drink's name, description or type ("oj" no longer
 * finds "mojito"), or the whole phrase can name an ingredient the drink uses, in any wording the normaliser knows
 * ("oj", "club soda", "whole milk").
 */
export function matchesSearch(recipe: Recipe, query: string): boolean {
  const typed = wordsOf(query);
  if (typed.length === 0) return true;
  const have = wordsOf(`${recipe.title} ${recipe.description} ${recipe.cuisine}`);
  if (typed.every((t) => have.some((w) => w.startsWith(t) || (t.length > 3 && w.startsWith(t.replace(/(ies|es|s)$/, "")))))) return true;
  const found = resolveSynonym(query);
  return Boolean(found.entity && found.confidence >= 0.9 && !found.ambiguous && ingredientIdsOf(recipe).has(found.entity.id));
}
