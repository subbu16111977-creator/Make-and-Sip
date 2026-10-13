import { describe, expect, it } from "vitest";
import { ingredientRegistry } from "./ingredients";
import { recipes } from "./recipes";
import { resolveIngredientById } from "@/lib/ingredientNormalize";

/**
 * Registry integrity / migration-safety guard. Every `pantryId` a
 * recipe references, and every `ingredientId` a seed pantry item
 * carries, must resolve to a real registry entry — never silently fall
 * back to a guessed identity. If a future recipe or pantry batch
 * introduces a new ingredient, this test fails loudly until a matching
 * registry entry is added, instead of Discover quietly mismatching it.
 */
describe("ingredient registry integrity", () => {
  it("every recipe ingredient's pantryId resolves to a registry entry", () => {
    const unresolved = new Set<string>();
    for (const recipe of recipes) {
      const lists = [recipe.ingredients, ...(recipe.methods ?? []).map((m) => m.ingredients ?? [])];
      for (const ing of lists.flat()) {
        if (!resolveIngredientById(ing.pantryId)) unresolved.add(`${recipe.id}: ${ing.pantryId}`);
      }
    }
    expect([...unresolved]).toEqual([]);
  });

  it("no two registry entries claim the same synonym, and ids are unique", () => {
    const owner = new Map<string, string>();
    const clashes: string[] = [];
    for (const entity of ingredientRegistry) {
      for (const raw of entity.synonyms) {
        const key = raw.trim().toLowerCase();
        const prev = owner.get(key);
        if (prev && prev !== entity.id) clashes.push(`"${key}" -> ${prev} / ${entity.id}`);
        owner.set(key, entity.id);
      }
    }
    expect(clashes).toEqual([]);
    const ids = ingredientRegistry.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("no two registry entries claim the same id", () => {
    const ids = ingredientRegistry.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every baseIngredient either matches its own canonicalName or points at another entry's canonicalName (no dangling subtype links)", () => {
    const canonicalNames = new Set(ingredientRegistry.map((e) => e.canonicalName));
    const dangling = ingredientRegistry.filter((e) => e.baseIngredient !== e.canonicalName && !canonicalNames.has(e.baseIngredient));
    expect(dangling.map((e) => e.id)).toEqual([]);
  });
});
