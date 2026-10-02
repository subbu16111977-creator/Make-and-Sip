import type { EquipmentTag, Recipe, RecipeIngredient } from "@/types";
import { isAlmostThere, isCanMake, isQuickRecipe, type RecipeMatch } from "./pantryMatch";

/** Which slice of the catalogue Discover is showing. "all" is the full list. */
export type DiscoverView = "all" | "can-make" | "almost-there" | "quick";

export const VIEW_LABELS: Record<DiscoverView, string> = {
  all: "All dishes",
  "can-make": "What you can make",
  "almost-there": "Almost there",
  quick: "Quick and easy",
};

export function isDiscoverView(value: unknown): value is DiscoverView {
  return value === "all" || value === "can-make" || value === "almost-there" || value === "quick";
}

/** Whether a dish belongs to a view, using the same definitions as the Home sections. */
export function matchesView(m: RecipeMatch, view: DiscoverView, ownedEquipment: EquipmentTag[]): boolean {
  switch (view) {
    case "can-make":
      return isCanMake(m, ownedEquipment);
    case "almost-there":
      return isAlmostThere(m, ownedEquipment);
    case "quick":
      return isQuickRecipe(m.recipe, ownedEquipment);
    default:
      return true;
  }
}

/** How Discover can arrange the list. "best" keeps the pantry-match ranking. */
export type DiscoverSort = "best" | "quickest" | "easiest" | "fewest-to-buy" | "az";

export const SORT_OPTIONS: { key: DiscoverSort; label: string }[] = [
  { key: "best", label: "Best match" },
  { key: "quickest", label: "Quickest" },
  { key: "easiest", label: "Easiest" },
  { key: "fewest-to-buy", label: "Fewest to buy" },
  { key: "az", label: "A–Z" },
];

const DIFFICULTY_RANK: Record<Recipe["difficulty"], number> = { Easy: 0, Medium: 1, Advanced: 2 };
const requiredMissingCount = (missing: RecipeIngredient[]) => missing.filter((i) => !i.optional).length;

/** Stable sort: ties keep the incoming (best-match) order. */
export function sortDiscover<T extends { recipe: Recipe; missing: RecipeIngredient[] }>(items: T[], sort: DiscoverSort): T[] {
  if (sort === "best") return items;
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
