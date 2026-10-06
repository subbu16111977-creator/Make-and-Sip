import { describe, expect, it } from "vitest";
import { recipes } from "@/data/recipes";
import { CUISINE_OPTIONS, FLAVOR_OPTIONS, emptyProfile, type LocalProfile } from "./profile";
import {
  FLAVOR_TO_TASTE,
  HOME_SECTION_LIMIT,
  bestForYou,
  cuisineMatches,
  flavorMatchCount,
  flavorsFromOtherCuisines,
  forYouScore,
  hasPreferences,
  newFlavorsInLikedCuisines,
  preferencesFrom,
  sortByForYou,
} from "./forYou";

const profile = (over: Partial<LocalProfile>): LocalProfile => ({ ...emptyProfile(), ...over });
const items = recipes.map((recipe) => ({ recipe }));
const ids = (list: { recipe: { id: string } }[]) => new Set(list.map((m) => m.recipe.id));

describe("matching the profile's wording to the dishes' wording", () => {
  it("every flavour choice (except Other) maps to a taste tag that dishes really use", () => {
    const used = new Set(recipes.flatMap((r) => r.tasteTags));
    for (const f of FLAVOR_OPTIONS.filter((f) => f !== "Other")) {
      expect(FLAVOR_TO_TASTE[f], `${f} has no mapping`).toBeDefined();
      expect(used.has(FLAVOR_TO_TASTE[f]), `${f} -> ${FLAVOR_TO_TASTE[f]} matches no dish`).toBe(true);
    }
  });
  it("every cuisine choice (except Others) matches the cuisine of at least one dish", () => {
    for (const c of CUISINE_OPTIONS.filter((c) => c !== "Others")) {
      const p = preferencesFrom(profile({ favoriteCuisines: [c] }));
      expect(recipes.some((r) => cuisineMatches(p, r)), `${c} matches no dish`).toBe(true);
    }
  });
  it("handles the different spellings (Middle eastern / Middle Eastern, Fresh and light / Fresh & Light)", () => {
    const p = preferencesFrom(profile({ favoriteCuisines: ["Middle eastern"], favoriteFlavors: ["Fresh and light"] }));
    expect(p.tastes).toEqual(["Fresh & Light"]);
    expect(recipes.find((r) => r.cuisine === "Middle Eastern" && cuisineMatches(p, r))).toBeDefined();
  });
  it("ignores typed text unless Others/Other is ticked, and counts it when it is", () => {
    expect(preferencesFrom(profile({ customCuisines: ["Thai"] })).customCuisines).toEqual([]);
    expect(preferencesFrom(profile({ favoriteCuisines: ["Others"], customCuisines: ["Thai"] })).customCuisines).toEqual(["thai"]);
    expect(preferencesFrom(profile({ favoriteFlavors: ["Other"], customFlavors: ["Umami"] })).customFlavors).toEqual(["umami"]);
  });
  it("matches a typed cuisine against dishes' cuisines and a typed flavour against their tags or description", () => {
    const p = preferencesFrom(profile({ favoriteCuisines: ["Others"], customCuisines: ["korea"], favoriteFlavors: ["Other"], customFlavors: ["smok"] }));
    expect(recipes.some((r) => r.cuisine === "Korean" && cuisineMatches(p, r))).toBe(true);
    expect(recipes.some((r) => flavorMatchCount(p, r) > 0)).toBe(true);
  });
  it("reports whether anything has been chosen", () => {
    expect(hasPreferences(preferencesFrom(emptyProfile()))).toBe(false);
    expect(hasPreferences(preferencesFrom(profile({ favoriteFlavors: ["Spicy"] })))).toBe(true);
  });
});

describe("Best for you", () => {
  const p = preferencesFrom(profile({ favoriteCuisines: ["Japanese"], favoriteFlavors: ["Spicy", "Comforting"] }));
  it("is empty when nothing is chosen", () => {
    expect(bestForYou(items, preferencesFrom(emptyProfile()))).toEqual([]);
  });
  it("lists every dish matching a chosen cuisine or flavour, and nothing else", () => {
    const best = bestForYou(items, p);
    expect(best.length).toBeGreaterThan(0);
    for (const m of best) expect(cuisineMatches(p, m.recipe) || flavorMatchCount(p, m.recipe) > 0).toBe(true);
    const outside = items.filter((m) => !ids(best).has(m.recipe.id));
    for (const m of outside) expect(forYouScore(p, m.recipe)).toBe(0);
  });
  it("puts dishes matching both the cuisine and a flavour first", () => {
    const best = bestForYou(items, p);
    const top = best[0].recipe;
    expect(cuisineMatches(p, top) && flavorMatchCount(p, top) > 0).toBe(true);
    const scores = best.map((m) => forYouScore(p, m.recipe));
    expect([...scores].sort((a, b) => b - a)).toEqual(scores);
  });
  it("keeps the incoming (pantry) order among equal scores and never mutates its input", () => {
    const copy = [...items];
    const sorted = sortByForYou(items, p);
    expect(items).toEqual(copy);
    for (let i = 1; i < sorted.length; i++) {
      if (forYouScore(p, sorted[i].recipe) === forYouScore(p, sorted[i - 1].recipe)) {
        expect(items.indexOf(sorted[i])).toBeGreaterThan(items.indexOf(sorted[i - 1]));
      }
    }
  });
});

describe("the two Home sections", () => {
  const p = preferencesFrom(profile({ favoriteCuisines: ["Italian", "Mexican"], favoriteFlavors: ["Spicy", "Smoky"] }));
  it("'Flavours from other cuisines' has liked flavours but never a liked cuisine", () => {
    const list = flavorsFromOtherCuisines(items, p);
    expect(list.length).toBeGreaterThan(0);
    for (const m of list) {
      expect(cuisineMatches(p, m.recipe)).toBe(false);
      expect(flavorMatchCount(p, m.recipe)).toBeGreaterThan(0);
    }
  });
  it("'New flavours in cuisines you like' is a liked cuisine with none of the liked flavours", () => {
    const list = newFlavorsInLikedCuisines(items, p);
    expect(list.length).toBeGreaterThan(0);
    for (const m of list) {
      expect(cuisineMatches(p, m.recipe)).toBe(true);
      expect(flavorMatchCount(p, m.recipe)).toBe(0);
    }
  });
  it("the two sections never share a dish", () => {
    const a = ids(flavorsFromOtherCuisines(items, p));
    for (const id of ids(newFlavorsInLikedCuisines(items, p))) expect(a.has(id)).toBe(false);
  });
  it("both sections are part of what Best for you covers, or sit beside it, never contradicting it", () => {
    const best = ids(bestForYou(items, p));
    for (const id of ids(flavorsFromOtherCuisines(items, p))) expect(best.has(id)).toBe(true);
    for (const id of ids(newFlavorsInLikedCuisines(items, p))) expect(best.has(id)).toBe(true);
  });
  it("need both a cuisine and a flavour, otherwise they stay hidden", () => {
    const onlyCuisine = preferencesFrom(profile({ favoriteCuisines: ["Italian"] }));
    const onlyFlavor = preferencesFrom(profile({ favoriteFlavors: ["Spicy"] }));
    for (const only of [onlyCuisine, onlyFlavor]) {
      expect(flavorsFromOtherCuisines(items, only)).toEqual([]);
      expect(newFlavorsInLikedCuisines(items, only)).toEqual([]);
    }
  });
  it("ranks flavour matches with more of the user's flavours first", () => {
    const list = flavorsFromOtherCuisines(items, p);
    const counts = list.map((m) => flavorMatchCount(p, m.recipe));
    expect([...counts].sort((a, b) => b - a)).toEqual(counts);
  });
});

describe("40-dish limit and variety", () => {
  const p = preferencesFrom(profile({ favoriteCuisines: ["Japanese", "Mexican"], favoriteFlavors: ["Spicy", "Smoky", "Fresh and light"] }));
  const sections = (seed: number) => ({
    best: bestForYou(items, p, { seed, limit: HOME_SECTION_LIMIT }),
    other: flavorsFromOtherCuisines(items, p, { seed, limit: HOME_SECTION_LIMIT }),
    fresh: newFlavorsInLikedCuisines(items, p, { seed, limit: HOME_SECTION_LIMIT }),
  });

  it("limits each Home section to 40 dishes", () => {
    expect(HOME_SECTION_LIMIT).toBe(40);
    const s = sections(1);
    for (const list of [s.best, s.other, s.fresh]) {
      expect(list.length).toBeLessThanOrEqual(40);
      expect(new Set(list.map((m) => m.recipe.id)).size).toBe(list.length);
    }
    // each pool is bigger than 40, so the limit really bites
    expect(bestForYou(items, p).length).toBeGreaterThan(40);
    expect(flavorsFromOtherCuisines(items, p).length).toBeGreaterThan(40);
    expect(s.best).toHaveLength(40);
    expect(s.other).toHaveLength(40);
  });
  it("is the same for the same seed (stable while the app stays open)", () => {
    const a = sections(7);
    const b = sections(7);
    expect(a.best.map((m) => m.recipe.id)).toEqual(b.best.map((m) => m.recipe.id));
    expect(a.other.map((m) => m.recipe.id)).toEqual(b.other.map((m) => m.recipe.id));
  });
  it("differs between seeds (a new mix when the app is opened or refreshed)", () => {
    const a = sections(1);
    const b = sections(2);
    expect(a.best.map((m) => m.recipe.id)).not.toEqual(b.best.map((m) => m.recipe.id));
    expect(a.other.map((m) => m.recipe.id)).not.toEqual(b.other.map((m) => m.recipe.id));
    expect(a.fresh.map((m) => m.recipe.id)).not.toEqual(b.fresh.map((m) => m.recipe.id));
    // different dishes, not only a different order, so the content changes too
    expect(new Set(a.best.map((m) => m.recipe.id))).not.toEqual(new Set(b.best.map((m) => m.recipe.id)));
  });
  it("still puts the strongest matches first and keeps the ones that matter in the 40", () => {
    for (const seed of [1, 2, 3]) {
      const { best } = sections(seed);
      const scores = best.map((m) => forYouScore(p, m.recipe));
      expect([...scores].sort((x, y) => y - x)).toEqual(scores);
      const everyScore = bestForYou(items, p).map((m) => forYouScore(p, m.recipe));
      expect(scores[0]).toBe(everyScore[0]); // the very best score is always represented
    }
  });
  it("without a seed or limit nothing changes (Discover's full list)", () => {
    expect(bestForYou(items, p).map((m) => m.recipe.id)).toEqual(sortByForYou(items.filter((m) => forYouScore(p, m.recipe) > 0), p).map((m) => m.recipe.id));
  });
  it("the sections stay separate whatever the seed", () => {
    const s = sections(9);
    const a = ids(s.other);
    for (const id of ids(s.fresh)) expect(a.has(id)).toBe(false);
  });
});
