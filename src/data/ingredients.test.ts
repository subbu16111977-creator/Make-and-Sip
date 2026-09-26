import { describe, expect, it } from "vitest";
import { ingredientRegistry } from "./ingredients";
import { recipes } from "./recipes";
import { pantryItems } from "./pantry";
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
      for (const ing of recipe.ingredients) {
        if (!resolveIngredientById(ing.pantryId)) unresolved.add(`${recipe.id}: ${ing.pantryId}`);
      }
    }
    expect([...unresolved]).toEqual([]);
  });

  it("every seed pantry item's ingredientId resolves to a registry entry", () => {
    const unresolved = pantryItems.filter((p) => !resolveIngredientById(p.ingredientId)).map((p) => p.id);
    expect(unresolved).toEqual([]);
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
