import type { Recipe, RecipeIngredient } from "@/types";

/** How Discover can arrange the list. "best" keeps the pantry-match ranking. */
export type DiscoverSort = "best" | "for-you" | "quickest" | "easiest" | "fewest-to-buy" | "az";

export const SORT_OPTIONS: { key: DiscoverSort; label: string }[] = [
  { key: "best", label: "Best match" },
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
  // "for-you" is ordered by the caller (it needs the profile), so here it keeps the incoming order.
  if (sort === "best" || sort === "for-you") return items;
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
