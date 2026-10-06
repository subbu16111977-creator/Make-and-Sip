import type { Recipe, TasteTag } from "@/types";
import type { LocalProfile } from "@/lib/profile";

/**
 * "Picked for you": turns the cuisines and flavours chosen in the profile into
 * recommendations. Plain logic — no React, no storage — so it can be tested.
 *
 * Profile labels are written for people ("Middle eastern", "Fresh and light"),
 * while dishes use their own spellings ("Middle Eastern", "Fresh & Light"), so
 * the two are matched here rather than compared directly.
 */

/** Profile flavour label -> the taste tag dishes carry. "Other" has no tag (it uses the custom text). */
export const FLAVOR_TO_TASTE: Record<string, TasteTag> = {
  Spicy: "Spicy",
  Comforting: "Comforting",
  "Fresh and light": "Fresh & Light",
  "Rich and indulgent": "Rich & Indulgent",
  Tangy: "Tangy",
  Smoky: "Smoky",
  Sweet: "Sweet",
  Herby: "Herby",
};

export interface Preferences {
  /** Lower-cased cuisine names the user ticked (without "Others"). */
  cuisines: string[];
  /** Lower-cased free-text cuisines typed under "Others". */
  customCuisines: string[];
  tastes: TasteTag[];
  /** Lower-cased free-text flavours typed under "Other". */
  customFlavors: string[];
}

export function preferencesFrom(profile: Pick<LocalProfile, "favoriteCuisines" | "customCuisines" | "favoriteFlavors" | "customFlavors">): Preferences {
  const tastes: TasteTag[] = [];
  for (const label of profile.favoriteFlavors) {
    const tag = FLAVOR_TO_TASTE[label];
    if (tag && !tastes.includes(tag)) tastes.push(tag);
  }
  return {
    cuisines: profile.favoriteCuisines.filter((c) => c !== "Others").map((c) => c.toLowerCase()),
    // Typed entries only count while "Others"/"Other" is ticked, the same rule the profile applies.
    customCuisines: profile.favoriteCuisines.includes("Others") ? profile.customCuisines.map((c) => c.trim().toLowerCase()).filter(Boolean) : [],
    tastes,
    customFlavors: profile.favoriteFlavors.includes("Other") ? profile.customFlavors.map((c) => c.trim().toLowerCase()).filter(Boolean) : [],
  };
}

export const hasCuisines = (p: Preferences): boolean => p.cuisines.length + p.customCuisines.length > 0;
export const hasFlavors = (p: Preferences): boolean => p.tastes.length + p.customFlavors.length > 0;
export const hasPreferences = (p: Preferences): boolean => hasCuisines(p) || hasFlavors(p);

/** True when the dish's cuisine is one the user picked (or typed). */
export function cuisineMatches(p: Preferences, recipe: Recipe): boolean {
  const c = recipe.cuisine.toLowerCase();
  if (p.cuisines.includes(c)) return true;
  return p.customCuisines.some((custom) => c.includes(custom) || custom.includes(c));
}

/** How many of the user's flavours the dish has (a typed flavour counts once, if it appears in the dish's tags or description). */
export function flavorMatchCount(p: Preferences, recipe: Recipe): number {
  let n = recipe.tasteTags.filter((t) => p.tastes.includes(t)).length;
  if (p.customFlavors.length > 0) {
    const text = `${recipe.tasteTags.join(" ")} ${recipe.description}`.toLowerCase();
    if (p.customFlavors.some((f) => text.includes(f))) n += 1;
  }
  return n;
}

/** A cuisine match counts for more than a flavour match; flavour matches add up to three. */
export function forYouScore(p: Preferences, recipe: Recipe): number {
  return (cuisineMatches(p, recipe) ? 3 : 0) + Math.min(flavorMatchCount(p, recipe), 3);
}

type WithRecipe = { recipe: Recipe };

/** Highest score first; dishes with the same score keep their incoming order (e.g. pantry match). */
export function sortByForYou<T extends WithRecipe>(items: T[], p: Preferences): T[] {
  return items
    .map((item, i) => ({ item, i, s: forYouScore(p, item.recipe) }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .map((x) => x.item);
}

/** Every dish that matches a chosen cuisine or flavour, best match first. Empty when nothing is chosen. */
export function bestForYou<T extends WithRecipe>(items: T[], p: Preferences): T[] {
  if (!hasPreferences(p)) return [];
  return sortByForYou(items.filter((m) => forYouScore(p, m.recipe) > 0), p);
}

/** Flavours the user likes, in cuisines they didn't pick. Needs both kinds of preference to mean anything. */
export function flavorsFromOtherCuisines<T extends WithRecipe>(items: T[], p: Preferences): T[] {
  if (!hasCuisines(p) || !hasFlavors(p)) return [];
  const kept = items.filter((m) => !cuisineMatches(p, m.recipe) && flavorMatchCount(p, m.recipe) > 0);
  return kept
    .map((item, i) => ({ item, i, n: flavorMatchCount(p, item.recipe) }))
    .sort((a, b) => b.n - a.n || a.i - b.i)
    .map((x) => x.item);
}

/** Cuisines the user likes, but with flavours they didn't pick. Needs both kinds of preference to mean anything. */
export function newFlavorsInLikedCuisines<T extends WithRecipe>(items: T[], p: Preferences): T[] {
  if (!hasCuisines(p) || !hasFlavors(p)) return [];
  return items.filter((m) => cuisineMatches(p, m.recipe) && flavorMatchCount(p, m.recipe) === 0);
}
