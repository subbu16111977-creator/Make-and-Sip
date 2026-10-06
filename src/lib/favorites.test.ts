import { describe, expect, it } from "vitest";
import { favoriteRecipes, toggleFavoriteId } from "./favorites";
import { recipes } from "@/data/recipes";
import { STORAGE_KEYS, ALL_STORAGE_KEYS } from "./appData";

describe("favourites", () => {
  it("adds a dish to the front and removes it on a second tap", () => {
    const one = toggleFavoriteId([], "a");
    const two = toggleFavoriteId(one, "b");
    expect(two).toEqual(["b", "a"]);
    expect(toggleFavoriteId(two, "a")).toEqual(["b"]);
  });
  it("never mutates or duplicates", () => {
    const ids = ["a"];
    toggleFavoriteId(ids, "b");
    expect(ids).toEqual(["a"]);
    expect(toggleFavoriteId(toggleFavoriteId([], "a"), "a")).toEqual([]);
  });
  it("returns real dishes in favourited order and skips unknown or repeated ids", () => {
    const [first, second] = recipes;
    const out = favoriteRecipes([second.id, "no-such-dish", first.id, second.id], recipes);
    expect(out.map((r) => r.id)).toEqual([second.id, first.id]);
  });
  it("keeps favourites in their own storage key, apart from Saved", () => {
    expect(STORAGE_KEYS.favorites).toBe("mise.favorites.v1");
    expect(STORAGE_KEYS.favorites).not.toBe(STORAGE_KEYS.saved);
    expect(ALL_STORAGE_KEYS).toContain(STORAGE_KEYS.favorites);
    expect(new Set(ALL_STORAGE_KEYS).size).toBe(ALL_STORAGE_KEYS.length);
  });
});
