import type { Recipe, TasteTag } from "@/types";
import type { LocalProfile } from "@/lib/profile";
import { seededUnit } from "@/lib/pantryMatch";

/**
 * "Picked for you": turns the drink types and flavours chosen in the profile into
 * recommendations. Plain logic — no React, no storage — so it can be tested.
 *
 * Profile labels are written for people ("Rich and indulgent"), while drinks use their own
 * tags ("Rich"), so the two are matched here rather than compared directly.
 */

/** Profile flavour label -> the taste tag dishes carry. "Other" has no tag (it uses the custom text). */
export const FLAVOR_TO_TASTE: Record<string, TasteTag> = {
  Sweet: "Sweet",
  Fruity: "Fruity",
  Creamy: "Creamy",
  Refreshing: "Refreshing",
  Tangy: "Tangy",
  Bitter: "Bitter",
  Spicy: "Spicy",
  Herbal: "Herbal",
  "Rich and indulgent": "Rich",
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

/** How many dishes each recommendation section on Home shows. */
export const HOME_SECTION_LIMIT = 40;

/**
 * Optional variety: with a `seed`, dishes that are equally good matches swap places a little
 * (a different seed gives a different order), so the lists don't look identical every time
 * the app is opened or refreshed. Dishes the user is nearer to cooking (earlier in the incoming
 * order) are still favoured. `limit` keeps only the first N after ordering, so the strongest
 * matches always make the cut.
 */
export interface VarietyOptions {
  seed?: number;
  limit?: number;
}

/** How far (in places) a dish may move among equal matches. */
const JITTER_PLACES = 120;

function orderKey(item: WithRecipe, index: number, seed: number | undefined): number {
  return seed === undefined ? index : index + seededUnit(seed, item.recipe.id) * JITTER_PLACES;
}

function finish<T>(list: T[], opts?: VarietyOptions): T[] {
  return opts?.limit !== undefined ? list.slice(0, opts.limit) : list;
}

/** Highest score first; dishes with the same score keep their incoming order (shuffled a little when a seed is given). */
export function sortByForYou<T extends WithRecipe>(items: T[], p: Preferences, opts?: VarietyOptions): T[] {
  return finish(
    items
      .map((item, i) => ({ item, k: orderKey(item, i, opts?.seed), s: forYouScore(p, item.recipe) }))
      .sort((a, b) => b.s - a.s || a.k - b.k)
      .map((x) => x.item),
    opts
  );
}

/** Every dish that matches a chosen cuisine or flavour, best match first. Empty when nothing is chosen. */
export function bestForYou<T extends WithRecipe>(items: T[], p: Preferences, opts?: VarietyOptions): T[] {
  if (!hasPreferences(p)) return [];
  return sortByForYou(items.filter((m) => forYouScore(p, m.recipe) > 0), p, opts);
}

/** Flavours the user likes, in cuisines they didn't pick. Needs both kinds of preference to mean anything. */
export function flavorsFromOtherCuisines<T extends WithRecipe>(items: T[], p: Preferences, opts?: VarietyOptions): T[] {
  if (!hasCuisines(p) || !hasFlavors(p)) return [];
  const kept = items.filter((m) => !cuisineMatches(p, m.recipe) && flavorMatchCount(p, m.recipe) > 0);
  return finish(
    kept
      .map((item, i) => ({ item, k: orderKey(item, i, opts?.seed), n: flavorMatchCount(p, item.recipe) }))
      .sort((a, b) => b.n - a.n || a.k - b.k)
      .map((x) => x.item),
    opts
  );
}

/** Cuisines the user likes, but with flavours they didn't pick. Needs both kinds of preference to mean anything. */
export function newFlavorsInLikedCuisines<T extends WithRecipe>(items: T[], p: Preferences, opts?: VarietyOptions): T[] {
  if (!hasCuisines(p) || !hasFlavors(p)) return [];
  const kept = items.filter((m) => cuisineMatches(p, m.recipe) && flavorMatchCount(p, m.recipe) === 0);
  return finish(
    kept
      .map((item, i) => ({ item, k: orderKey(item, i, opts?.seed) }))
      .sort((a, b) => a.k - b.k)
      .map((x) => x.item),
    opts
  );
}
