import { describe, expect, it } from "vitest";
import {
  addMissingIngredientsFromRecipe,
  addPantryItem,
  markShoppingItemPurchased,
  removePantryItem,
  unmarkShoppingItemPurchased,
} from "./inventoryActions";
import { getIngredientMatch, getRecipeAvailability } from "./pantryMatch";
import type { PantryItem, Recipe, RecipeIngredient, ShoppingItem } from "@/types";

const CHICKEN_INGREDIENT: RecipeIngredient = {
  pantryId: "chicken-thigh",
  label: "1/4 chicken, chopped into pieces",
  amount: "1/4",
};

const CHICKEN_RECIPE: Recipe = {
  id: "recipe_123",
  title: "Weeknight Chicken",
  description: "",
  cuisine: "Test",
  dietTags: [],
  tasteTags: [],
  timeMinutes: 30,
  prepMinutes: 10,
  cookMinutes: 20,
  difficulty: "Easy",
  servings: 2,
  budget: "$",
  image: "",
  ingredients: [CHICKEN_INGREDIENT],
  equipment: [],
  steps: ["Cook it."],
};

describe("Test 8 — Add missing ingredients from Discover puts chicken on Shopping via ingredientId", () => {
  it("adds a shopping item keyed by ingredientId, not raw text", () => {
    const { items, addedCount } = addMissingIngredientsFromRecipe([], CHICKEN_RECIPE.id, CHICKEN_RECIPE.title, [
      CHICKEN_INGREDIENT,
    ]);
    expect(addedCount).toBe(1);
    expect(items[0].ingredientId).toBe("chicken-thigh");
    expect(items[0].sourceRecipeIds).toEqual(["recipe_123"]);
  });

  it("adding the same missing ingredient from a second recipe merges instead of duplicating", () => {
    const first = addMissingIngredientsFromRecipe([], "recipe_123", "Weeknight Chicken", [CHICKEN_INGREDIENT]);
    const second = addMissingIngredientsFromRecipe(first.items, "recipe_999", "Sunday Roast", [
      { ...CHICKEN_INGREDIENT, label: "Chicken, jointed" },
    ]);
    expect(second.items.length).toBe(1);
    expect(second.items[0].sourceRecipeIds).toEqual(["recipe_123", "recipe_999"]);
    expect(second.addedCount).toBe(0);
  });
});

describe("Test 9 — marking chicken purchased updates Shopping AND Pantry atomically, Discover sees it immediately", () => {
  it("full flow: empty pantry -> missing -> shopping -> purchased -> pantry has it -> Discover matches", () => {
    let pantry: PantryItem[] = [];
    let shopping: ShoppingItem[] = [];

    // Discover: chicken is missing.
    let availability = getRecipeAvailability(CHICKEN_RECIPE, pantry);
    expect(availability.missingCount).toBe(1);

    // Tap "Add missing ingredients".
    const added = addMissingIngredientsFromRecipe(shopping, CHICKEN_RECIPE.id, CHICKEN_RECIPE.title, [
      CHICKEN_INGREDIENT,
    ]);
    shopping = added.items;
    expect(shopping.some((i) => i.ingredientId === "chicken-thigh" && !i.checked)).toBe(true);

    // Mark purchased.
    const purchase = markShoppingItemPurchased(shopping, pantry, shopping[0].id);
    shopping = purchase.shoppingItems;
    pantry = purchase.pantryItems;

    expect(shopping[0].checked).toBe(true);
    expect(pantry.some((p) => p.ingredientId === "chicken-thigh")).toBe(true);

    // Discover recomputed from the same pantry array — immediately available, no reload.
    availability = getRecipeAvailability(CHICKEN_RECIPE, pantry);
    expect(availability.missingCount).toBe(0);
    expect(availability.matchedCount).toBe(1);

    const ingredientMatch = getIngredientMatch(CHICKEN_INGREDIENT, pantry);
    expect(ingredientMatch.identityMatched).toBe(true);
  });

  it("marking an already-checked item purchased again is a no-op, not a double-add", () => {
    const shopping: ShoppingItem[] = [
      {
        id: "s1",
        name: "Chicken",
        amount: "1/4",
        category: "Meat & Seafood",
        checked: true,
        ingredientId: "chicken-thigh",
        requestedQuantity: 0.25,
        requestedUnit: "whole",
        sourceRecipeIds: ["recipe_123"],
      },
    ];
    const result = markShoppingItemPurchased(shopping, [], "s1");
    expect(result.pantryItems.length).toBe(0);
  });
});

describe("Test 10 — unchecking a purchased item never silently deletes pantry data", () => {
  it("unmarking purchased leaves Pantry untouched", () => {
    let pantry: PantryItem[] = [];
    let shopping: ShoppingItem[] = [];
    const added = addMissingIngredientsFromRecipe(shopping, CHICKEN_RECIPE.id, CHICKEN_RECIPE.title, [
      CHICKEN_INGREDIENT,
    ]);
    shopping = added.items;
    const purchase = markShoppingItemPurchased(shopping, pantry, shopping[0].id);
    shopping = purchase.shoppingItems;
    pantry = purchase.pantryItems;
    expect(pantry.length).toBe(1);

    shopping = unmarkShoppingItemPurchased(shopping, shopping[0].id);
    expect(shopping[0].checked).toBe(false);
    // Pantry is untouched — no data silently erased.
    expect(pantry.length).toBe(1);
    expect(pantry[0].ingredientId).toBe("chicken-thigh");
  });
});

describe("Test 11 — manually adding an ingredient that's also on the shopping list", () => {
  it("does not create a duplicate pantry entry when added twice", () => {
    const first = addPantryItem([], {
      name: "Chicken",
      quantity: 1,
      unit: "pcs",
      category: "Meat & Seafood",
      location: "Fridge",
      expiresInDays: 5,
    });
    const second = addPantryItem(first.items, {
      name: "chicken",
      quantity: 1,
      unit: "pcs",
      category: "Meat & Seafood",
      location: "Fridge",
      expiresInDays: 5,
    });
    expect(second.merged).toBe(true);
    expect(second.items.length).toBe(1);
    expect(second.items[0].quantity).toBe(2); // same-unit quantities merged
  });

  it("resolves free-text name to the shared ingredient identity used by recipes", () => {
    const result = addPantryItem([], {
      name: "chicken",
      quantity: 1,
      unit: "pcs",
      category: "Meat & Seafood",
      location: "Fridge",
      expiresInDays: 5,
    });
    // Recipe wants chicken-thigh; pantry has generic chicken -> subtype match, not missing.
    const m = getIngredientMatch(CHICKEN_INGREDIENT, result.items);
    expect(m.identityMatched).toBe(true);
    expect(m.matchType).toBe("subtype");
  });
});

describe("Test 12 — removing a pantry item flips the recipe back to missing", () => {
  it("removePantryItem makes Discover show the ingredient as missing again", () => {
    const added = addPantryItem([], {
      name: "Chicken thigh",
      quantity: 1,
      unit: "pcs",
      category: "Meat & Seafood",
      location: "Fridge",
      expiresInDays: 5,
    });
    let pantry = added.items;
    expect(getRecipeAvailability(CHICKEN_RECIPE, pantry).missingCount).toBe(0);

    pantry = removePantryItem(pantry, pantry[0].id);
    expect(getRecipeAvailability(CHICKEN_RECIPE, pantry).missingCount).toBe(1);
  });
});
