import { describe, expect, it } from "vitest";
import { addMissingIngredientsFromRecipe, addPantryItem, markShoppingItemPurchased } from "./inventoryActions";
import { getRecipeAvailability, getShortfallRequest, getShoppingPlan } from "./pantryMatch";
import type { PantryItem, Recipe, RecipeIngredient } from "@/types";

const SYRUP: RecipeIngredient = {
  pantryId: "vanilla-syrup",
  label: "Vanilla syrup, such as the café kind",
  amount: "1 tablespoon",
};
const SUGAR_OPTIONAL: RecipeIngredient = {
  pantryId: "brown-sugar",
  label: "Light brown sugar",
  amount: "1 teaspoon",
  optional: true,
};
const COFFEE: RecipeIngredient = {
  pantryId: "ground-coffee",
  label: "Ground coffee, medium grind",
  amount: "1 1/4 lb (about 567 g)",
};

const RECIPE: Recipe = {
  id: "latte",
  title: "Weekend Latte",
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
  ingredients: [COFFEE, SYRUP, SUGAR_OPTIONAL],
  equipment: [],
  steps: ["Cook it."],
};

function pantryWithCoffee(grams: number): PantryItem[] {
  return addPantryItem([], {
    name: "Coffee",
    quantity: grams,
    unit: "g",
    category: "Coffee & Tea",
    location: "Fridge",
    expiresInDays: 5,
  }).items;
}

describe("Shopping item names", () => {
  it("uses the standard ingredient name, not the recipe's full sentence", () => {
    const { items } = addMissingIngredientsFromRecipe([], "latte", "Weekend Latte", [SYRUP]);
    expect(items[0].name).toBe("Vanilla Syrup");
    expect(items[0].name).not.toContain("such as");
  });

  it("keeps the recipe's amount and still keys the item by ingredient identity", () => {
    const { items } = addMissingIngredientsFromRecipe([], "latte", "Weekend Latte", [SYRUP]);
    expect(items[0].amount).toBe("1 tablespoon");
    expect(items[0].ingredientId).toBe("vanilla-syrup");
  });
});

describe("Optional ingredients", () => {
  it("marks optional items and leaves required ones unmarked", () => {
    const { items } = addMissingIngredientsFromRecipe([], "latte", "Weekend Latte", [SYRUP, SUGAR_OPTIONAL]);
    expect(items.find((i) => i.ingredientId === "brown-sugar")?.optional).toBe(true);
    expect(items.find((i) => i.ingredientId === "vanilla-syrup")?.optional).toBeFalsy();
  });

  it("an optional item stops being optional once another recipe needs it as required", () => {
    const first = addMissingIngredientsFromRecipe([], "latte", "Weekend Latte", [SUGAR_OPTIONAL]);
    const second = addMissingIngredientsFromRecipe(first.items, "cake", "Cake", [{ ...SUGAR_OPTIONAL, optional: false }]);
    expect(second.items).toHaveLength(1);
    expect(second.items[0].optional).toBeFalsy();
  });

  it("the shopping plan holds optional ingredients back from the default 'add missing'", () => {
    const plan = getShoppingPlan(RECIPE, []);
    expect(plan.required.map((i) => i.pantryId)).toEqual(["ground-coffee", "vanilla-syrup"]);
    expect(plan.optional.map((i) => i.pantryId)).toEqual(["brown-sugar"]);
    expect(plan.shortfalls).toEqual([]);
  });
});

describe("Quantity shortfalls", () => {
  it("asks for only the missing amount, in the pantry item's own unit", () => {
    const pantry = pantryWithCoffee(500); // recipe wants 1 1/4 lb ≈ 567 g
    const shortfall = getShortfallRequest(COFFEE, pantry);
    expect(shortfall?.unit).toBe("g");
    expect(shortfall?.quantity).toBe(67);
  });

  it("puts a short ingredient in the plan as a top-up, not as a missing item", () => {
    const plan = getShoppingPlan(RECIPE, pantryWithCoffee(500));
    expect(plan.shortfalls.map((s) => s.ingredient.pantryId)).toEqual(["ground-coffee"]);
    expect(plan.required.map((i) => i.pantryId)).toEqual(["vanilla-syrup"]);
  });

  it("an ingredient with enough in the pantry produces no shortfall", () => {
    expect(getShortfallRequest(COFFEE, pantryWithCoffee(2000))).toBeNull();
    expect(getShoppingPlan(RECIPE, pantryWithCoffee(2000)).shortfalls).toEqual([]);
  });

  it("a top-up shopping item is tagged and carries just the shortfall", () => {
    const pantry = pantryWithCoffee(500);
    const plan = getShoppingPlan(RECIPE, pantry);
    const { items } = addMissingIngredientsFromRecipe([], "latte", "Weekend Latte", plan.required, plan.shortfalls);
    // Filed under the pantry's own ingredient ("coffee"), not the recipe's ("ground-coffee"), so it merges on purchase.
    const topUp = items.find((i) => i.ingredientId === "coffee");
    expect(topUp?.shortfall).toBe(true);
    expect(topUp?.name).toBe("Coffee");
    expect(topUp?.amount).toBe("67 g");
    expect(topUp?.requestedQuantity).toBe(67);
    expect(topUp?.requestedUnit).toBe("g");
  });

  it("buying the top-up actually closes the gap (the recipe is no longer short)", () => {
    let pantry = pantryWithCoffee(500);
    const plan = getShoppingPlan(RECIPE, pantry);
    let shopping = addMissingIngredientsFromRecipe([], "latte", "Weekend Latte", [], plan.shortfalls).items;

    const purchase = markShoppingItemPurchased(shopping, pantry, shopping[0].id);
    shopping = purchase.shoppingItems;
    pantry = purchase.pantryItems;

    expect(pantry).toHaveLength(1);
    expect(pantry[0].quantity).toBe(567);
    const coffee = getRecipeAvailability(RECIPE, pantry).ingredients.find((m) => m.recipeIngredient.pantryId === "ground-coffee");
    expect(coffee?.status).not.toBe("quantity_insufficient");
    expect(getShoppingPlan(RECIPE, pantry).shortfalls).toEqual([]);
  });

  it("adding the same recipe twice does not duplicate a top-up", () => {
    const pantry = pantryWithCoffee(500);
    const plan = getShoppingPlan(RECIPE, pantry);
    const once = addMissingIngredientsFromRecipe([], "latte", "Weekend Latte", plan.required, plan.shortfalls);
    const twice = addMissingIngredientsFromRecipe(once.items, "latte", "Weekend Latte", plan.required, plan.shortfalls);
    expect(twice.items).toHaveLength(once.items.length);
    expect(twice.addedCount).toBe(0);
  });
});
