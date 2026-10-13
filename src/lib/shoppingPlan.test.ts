import { describe, expect, it } from "vitest";
import { addMissingIngredientsFromRecipe, addPantryItem, markShoppingItemPurchased } from "./inventoryActions";
import { getRecipeAvailability, getShortfallRequest, getShoppingPlan } from "./pantryMatch";
import type { PantryItem, Recipe, RecipeIngredient } from "@/types";

const OIL: RecipeIngredient = {
  pantryId: "vegetable-oil",
  label: "Neutral oil, such as vegetable or avocado oil",
  amount: "1 tablespoon",
};
const SUGAR_OPTIONAL: RecipeIngredient = {
  pantryId: "brown-sugar",
  label: "Light brown sugar",
  amount: "1 teaspoon",
  optional: true,
};
const CHICKEN: RecipeIngredient = {
  pantryId: "chicken-thigh",
  label: "Boneless, skinless chicken thighs, cut into 1-inch strips",
  amount: "1 1/4 lb (about 4 thighs)",
};

const RECIPE: Recipe = {
  id: "curry",
  title: "Weeknight Curry",
  description: "",
  temperature: "hot",
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
  ingredients: [CHICKEN, OIL, SUGAR_OPTIONAL],
  equipment: [],
  steps: ["Cook it."],
};

function pantryWithChicken(grams: number): PantryItem[] {
  return addPantryItem([], {
    name: "Chicken",
    quantity: grams,
    unit: "g",
    category: "Juices & Sodas",
    location: "Fridge",
    expiresInDays: 5,
  }).items;
}

describe("Shopping item names", () => {
  it("uses the standard ingredient name, not the recipe's full sentence", () => {
    const { items } = addMissingIngredientsFromRecipe([], "curry", "Weeknight Curry", [OIL]);
    expect(items[0].name).toBe("Vegetable Oil");
    expect(items[0].name).not.toContain("such as");
  });

  it("keeps the recipe's amount and still keys the item by ingredient identity", () => {
    const { items } = addMissingIngredientsFromRecipe([], "curry", "Weeknight Curry", [OIL]);
    expect(items[0].amount).toBe("1 tablespoon");
    expect(items[0].ingredientId).toBe("vegetable-oil");
  });
});

describe("Optional ingredients", () => {
  it("marks optional items and leaves required ones unmarked", () => {
    const { items } = addMissingIngredientsFromRecipe([], "curry", "Weeknight Curry", [OIL, SUGAR_OPTIONAL]);
    expect(items.find((i) => i.ingredientId === "brown-sugar")?.optional).toBe(true);
    expect(items.find((i) => i.ingredientId === "vegetable-oil")?.optional).toBeFalsy();
  });

  it("an optional item stops being optional once another recipe needs it as required", () => {
    const first = addMissingIngredientsFromRecipe([], "curry", "Weeknight Curry", [SUGAR_OPTIONAL]);
    const second = addMissingIngredientsFromRecipe(first.items, "cake", "Cake", [{ ...SUGAR_OPTIONAL, optional: false }]);
    expect(second.items).toHaveLength(1);
    expect(second.items[0].optional).toBeFalsy();
  });

  it("the shopping plan holds optional ingredients back from the default 'add missing'", () => {
    const plan = getShoppingPlan(RECIPE, []);
    expect(plan.required.map((i) => i.pantryId)).toEqual(["chicken-thigh", "vegetable-oil"]);
    expect(plan.optional.map((i) => i.pantryId)).toEqual(["brown-sugar"]);
    expect(plan.shortfalls).toEqual([]);
  });
});

describe("Quantity shortfalls", () => {
  it("asks for only the missing amount, in the pantry item's own unit", () => {
    const pantry = pantryWithChicken(500); // recipe wants 1 1/4 lb ≈ 567 g
    const shortfall = getShortfallRequest(CHICKEN, pantry);
    expect(shortfall?.unit).toBe("g");
    expect(shortfall?.quantity).toBe(67);
  });

  it("puts a short ingredient in the plan as a top-up, not as a missing item", () => {
    const plan = getShoppingPlan(RECIPE, pantryWithChicken(500));
    expect(plan.shortfalls.map((s) => s.ingredient.pantryId)).toEqual(["chicken-thigh"]);
    expect(plan.required.map((i) => i.pantryId)).toEqual(["vegetable-oil"]);
  });

  it("an ingredient with enough in the pantry produces no shortfall", () => {
    expect(getShortfallRequest(CHICKEN, pantryWithChicken(2000))).toBeNull();
    expect(getShoppingPlan(RECIPE, pantryWithChicken(2000)).shortfalls).toEqual([]);
  });

  it("a top-up shopping item is tagged and carries just the shortfall", () => {
    const pantry = pantryWithChicken(500);
    const plan = getShoppingPlan(RECIPE, pantry);
    const { items } = addMissingIngredientsFromRecipe([], "curry", "Weeknight Curry", plan.required, plan.shortfalls);
    // Filed under the pantry's own ingredient ("chicken"), not the recipe's ("chicken-thigh"), so it merges on purchase.
    const topUp = items.find((i) => i.ingredientId === "chicken");
    expect(topUp?.shortfall).toBe(true);
    expect(topUp?.name).toBe("Chicken");
    expect(topUp?.amount).toBe("67 g");
    expect(topUp?.requestedQuantity).toBe(67);
    expect(topUp?.requestedUnit).toBe("g");
  });

  it("buying the top-up actually closes the gap (the recipe is no longer short)", () => {
    let pantry = pantryWithChicken(500);
    const plan = getShoppingPlan(RECIPE, pantry);
    let shopping = addMissingIngredientsFromRecipe([], "curry", "Weeknight Curry", [], plan.shortfalls).items;

    const purchase = markShoppingItemPurchased(shopping, pantry, shopping[0].id);
    shopping = purchase.shoppingItems;
    pantry = purchase.pantryItems;

    expect(pantry).toHaveLength(1);
    expect(pantry[0].quantity).toBe(567);
    const chicken = getRecipeAvailability(RECIPE, pantry).ingredients.find((m) => m.recipeIngredient.pantryId === "chicken-thigh");
    expect(chicken?.status).not.toBe("quantity_insufficient");
    expect(getShoppingPlan(RECIPE, pantry).shortfalls).toEqual([]);
  });

  it("adding the same recipe twice does not duplicate a top-up", () => {
    const pantry = pantryWithChicken(500);
    const plan = getShoppingPlan(RECIPE, pantry);
    const once = addMissingIngredientsFromRecipe([], "curry", "Weeknight Curry", plan.required, plan.shortfalls);
    const twice = addMissingIngredientsFromRecipe(once.items, "curry", "Weeknight Curry", plan.required, plan.shortfalls);
    expect(twice.items).toHaveLength(once.items.length);
    expect(twice.addedCount).toBe(0);
  });
});
