import { describe, expect, it } from "vitest";
import { COOKABILITY, computeCookability, ingredientCookability, ingredientWeight, scaleAmountText, scaledRecipe } from "@/lib/cookability";
import { getShoppingPlan, pickReadyToCook } from "@/lib/pantryMatch";
import { normalizeIngredient, parseAmount } from "@/lib/ingredientNormalize";
import { recipes } from "@/data/recipes";
import { methodsOf, recipeForMethod } from "@/lib/methods";
import type { PantryItem, Recipe, RecipeIngredient } from "@/types";

function item(ingredientId: string, quantity: number, unit: PantryItem["unit"], extra: Partial<PantryItem> = {}): PantryItem {
  return { id: `p-${ingredientId}`, name: ingredientId, category: "Pantry Staples", quantity, unit, quantityKnown: true, location: "Pantry", purchaseDate: "2026-01-01", expiryDate: "2027-01-01", ingredientId, source: "manual", ...extra };
}
const ing = (pantryId: string, amount: string, extra: Partial<RecipeIngredient> = {}): RecipeIngredient => ({ pantryId, label: pantryId, amount, ...extra });
function dish(ingredients: RecipeIngredient[], extra: Partial<Recipe> = {}): Recipe {
  return { id: "t", title: "T", description: "", cuisine: "X", dietTags: [], tasteTags: [], timeMinutes: 10, prepMinutes: 5, cookMinutes: 5, difficulty: "Easy", servings: 4, budget: "$", image: "", ingredients, equipment: [], steps: [], ...extra } as Recipe;
}

describe("amount reading", () => {
  it("reads single-character fractions", () => {
    expect(parseAmount("¼ tsp")).toEqual({ quantity: 0.25, unit: "tsp" });
    expect(parseAmount("1½ cups")).toEqual({ quantity: 1.5, unit: "cup" });
    expect(parseAmount("½ large")).toMatchObject({ quantity: 0.5 });
  });
  it("reads '2 (14 oz) cans' as two cans", () => {
    expect(parseAmount("2 (14 oz) cans")).toEqual({ quantity: 2, unit: "can" });
  });
});

describe("ingredient names", () => {
  it("maps regional and plural names", () => {
    expect(normalizeIngredient("lemons").ingredientId).toBe("lemon");
    expect(normalizeIngredient("strawberries").ingredientId).toBe("strawberry");
    expect(normalizeIngredient("soda water").ingredientId).toBe("sparkling-water");
    expect(normalizeIngredient("oj").ingredientId).toBe("orange-juice");
    expect(normalizeIngredient("Whole milk").ingredientId).toBe("milk");
    expect(normalizeIngredient("caster sugar").ingredientId).toBe("sugar");
    for (const t of ["mint leaves", "fresh mint"]) expect(normalizeIngredient(t).ingredientId).toBe("fresh-mint");
  });
  it("does not merge look-alike products", () => {
    expect(normalizeIngredient("oat milk").ingredientId).not.toBe(normalizeIngredient("oats").ingredientId);
    expect(normalizeIngredient("oat milk").ingredientId).not.toBe("milk");
    expect(normalizeIngredient("instant coffee").ingredientId).not.toBe(normalizeIngredient("ground coffee").ingredientId);
    expect(normalizeIngredient("coconut milk").ingredientId).not.toBe(normalizeIngredient("coconut cream").ingredientId);
    expect(normalizeIngredient("coconut milk").ingredientId).not.toBe(normalizeIngredient("shredded coconut").ingredientId);
    expect(normalizeIngredient("cocoa powder").ingredientId).not.toBe(normalizeIngredient("chocolate syrup").ingredientId);
    expect(normalizeIngredient("bottled lemon juice").ingredientId).not.toBe("lemon");
  });
});

describe("quantity", () => {
  it("compares across g and kg", () => {
    const r = ingredientCookability(ing("ground-coffee", "500 g"), [item("ground-coffee", 0.5, "kg")], 1);
    expect(r.quantity).toBe("sufficient");
  });
  it("is insufficient with a partial credit and a readable shortfall", () => {
    const r = ingredientCookability(ing("ground-coffee", "500 g"), [item("ground-coffee", 200, "g")], 1);
    expect(r.match).toBe("insufficient");
    expect(r.credit).toBeCloseTo(0.4);
    expect(r.shortBy).toBe("300 g");
  });
  it("converts spoons and ml", () => {
    expect(ingredientCookability(ing("milk", "2 tbsp"), [item("milk", 30, "ml")], 1).quantity).toBe("sufficient");
    expect(ingredientCookability(ing("milk", "2 tbsp"), [item("milk", 20, "ml")], 1).quantity).toBe("insufficient");
  });
  it("uses a labelled approximation for weight vs cups only where a density is known", () => {
    const flour = ingredientCookability(ing("sugar", "1 cup"), [item("sugar", 500, "g")], 1);
    expect(flour.quantity).toBe("sufficient");
    expect(flour.approximate).toBe(true);
    const unknown = ingredientCookability(ing("lemon", "1 cup"), [item("lemon", 500, "g")], 1);
    expect(unknown.quantity).toBe("unknown");
    expect(unknown.credit).toBe(1);
  });
  it("does not equate '1 onion' with 200 g of onion", () => {
    expect(ingredientCookability(ing("lemon", "1"), [item("lemon", 200, "g")], 1).quantity).toBe("unknown");
  });
  it("compares pieces with pieces", () => {
    expect(ingredientCookability(ing("lemon", "2 medium"), [item("lemon", 1, "pcs")], 1).quantity).toBe("insufficient");
    expect(ingredientCookability(ing("lemon", "2 medium"), [item("lemon", 3, "pcs")], 1).quantity).toBe("sufficient");
  });
  it("treats 'to taste' and 'for frying' as not needing a quantity", () => {
    expect(ingredientCookability(ing("salt", "to taste"), [item("salt", 1, "pcs")], 1).quantity).toBe("not-applicable");
    expect(ingredientCookability(ing("sugar", "to serve"), [item("sugar", 1, "g")], 1).quantity).toBe("not-applicable");
  });
  it("never treats a pantry item without a known amount as missing", () => {
    const r = ingredientCookability(ing("lemon", "2"), [item("lemon", 1, "pcs", { quantityKnown: false })], 1);
    expect(r.match).toBe("exact");
    expect(r.quantity).toBe("unknown");
  });
});

describe("match kinds", () => {
  it("exact, missing", () => {
    expect(ingredientCookability(ing("lemon", "1"), [item("lemon", 3, "pcs")], 1).match).toBe("exact");
    expect(ingredientCookability(ing("lemon", "1"), [], 1).match).toBe("missing");
  });
  it("a generic pantry item covers a specific form; two different forms are ambiguous", () => {
    expect(ingredientCookability(ing("ground-coffee", "500 g"), [item("coffee", 1, "kg")], 1).match).toBe("safe-equivalent");
    const ambiguous = ingredientCookability(ing("ground-coffee", "500 g"), [item("coffee-beans", 1, "kg")], 1);
    expect(ambiguous.match).toBe("ambiguous");
    expect(ambiguous.credit).toBe(COOKABILITY.ambiguousCredit);
  });
  it("instant coffee is not ground coffee", () => {
    expect(ingredientCookability(ing("ground-coffee", "500 g"), [item("instant-coffee", 100, "g")], 1).match).toBe("missing");
  });
});

describe("servings", () => {
  const recipe = dish([ing("ground-coffee", "500 g")], { servings: 4 });
  it("scales what is required, not what the recipe says", () => {
    const pantry = [item("ground-coffee", 250, "g")];
    expect(computeCookability(recipe, pantry, [], 4).category).toBe("partial");
    expect(computeCookability(recipe, pantry, [], 2).category).toBe("ready");
    expect(computeCookability(recipe, pantry, [], 2).ingredients[0].needed).toBe("250 g");
    expect(recipe.ingredients[0].amount).toBe("500 g");
  });
});

describe("score and categories", () => {
  const pantryAll = [item("ground-coffee", 1, "kg"), item("lemon", 3, "pcs"), item("salt", 1, "pcs")];
  it("ready when everything is there", () => {
    const c = computeCookability(dish([ing("ground-coffee", "500 g"), ing("lemon", "1"), ing("salt", "to taste")]), pantryAll, []);
    expect(c.category).toBe("ready");
    expect(c.percent).toBe(100);
    expect(c.summary).toContain("all 3 required ingredients");
  });
  it("optional ingredients never lower the score", () => {
    const c = computeCookability(dish([ing("ground-coffee", "500 g"), ing("fresh-mint", "1 sprig", { optional: true })]), pantryAll, []);
    expect(c.percent).toBe(100);
    expect(c.category).toBe("ready");
    expect(c.optionalMissing).toBe(1);
  });
  it("a missing main ingredient can't hide behind small ones", () => {
    const small = ["salt", "lemon", "ginger", "cinnamon"].map((id) => ing(id, "1"));
    const pantry = small.map((i) => item(i.pantryId, 5, "pcs"));
    const c = computeCookability(dish([ing("ground-coffee", "500 g"), ...small]), pantry, []);
    expect(c.requiredMissing).toBe(1);
    expect(c.category).not.toBe("ready");
    expect(c.percent).toBeLessThanOrEqual(70);
  });
  it("missing equipment prevents 'ready'", () => {
    const c = computeCookability(dish([ing("lemon", "1")], { equipment: ["Espresso Machine"] }), pantryAll, []);
    expect(c.category).toBe("almost");
    expect(c.equipmentMissing).toEqual(["Espresso Machine"]);
    expect(computeCookability(dish([ing("lemon", "1")], { equipment: ["Espresso Machine"] }), pantryAll, ["Espresso Machine"]).category).toBe("ready");
  });
  it("optional equipment never blocks 'ready' or lowers the score", () => {
    const withOptional = dish([ing("lemon", "1")], { optionalEquipment: [{ tag: "Shaker", without: "Stir hard in a jar." }] });
    const c = computeCookability(withOptional, pantryAll, []);
    expect(c.category).toBe("ready");
    expect(c.percent).toBe(100);
    expect(c.equipmentMissing).toEqual([]);
    expect(c.equipmentOptional).toEqual(["Shaker"]);
    expect(c.equipmentOptionalOwned).toEqual([]);
    expect(computeCookability(withOptional, pantryAll, ["Shaker"]).equipmentOptionalOwned).toEqual(["Shaker"]);
  });
  it("required equipment still blocks 'ready' even when other equipment is optional", () => {
    const d = dish([ing("lemon", "1")], { equipment: ["Blender"], optionalEquipment: [{ tag: "Shaker" }] });
    expect(computeCookability(d, pantryAll, ["Shaker"]).category).toBe("almost");
    expect(computeCookability(d, pantryAll, ["Blender"]).category).toBe("ready");
  });
  it("low match below 40%", () => {
    const c = computeCookability(dish([ing("ground-coffee", "500 g"), ing("sugar", "1 cup"), ing("lemon", "1")]), [item("lemon", 1, "pcs")], []);
    expect(c.category).toBe("low");
  });
  it("weights follow the ingredient's role", () => {
    expect(ingredientWeight("ground-coffee", null)).toBe(3);
    expect(ingredientWeight("lemon", null)).toBe(2);
    expect(ingredientWeight("salt", null)).toBe(1);
    expect(ingredientWeight("salt", 500)).toBe(2);
  });
});

describe("every real dish", () => {
  it("computes a sane result for an empty pantry and for a full one", () => {
    for (const r of recipes) {
      const empty = computeCookability(r, [], []);
      expect(empty.percent).toBeGreaterThanOrEqual(0);
      expect(empty.percent).toBeLessThanOrEqual(100);
      expect(["low", "partial"]).toContain(empty.category);
      expect(empty.requiredTotal).toBe(r.ingredients.filter((i) => !i.optional).length);
    }
  });
  it("is ready when the pantry holds plenty of exactly what the dish needs", () => {
    const method = methodsOf(recipes[0])[0];
    const r = recipeForMethod(recipes[0], method);
    const pantry = r.ingredients.map((i) => item(i.pantryId, 100000, "g"));
    const c = computeCookability(r, pantry, method.equipment);
    expect(c.requiredMissing).toBe(0);
  });
});

describe("scaling for the shopping list", () => {
  it("scales the leading number and keeps the unit", () => {
    expect(scaleAmountText("500 g", 0.5)).toBe("250 g");
    expect(scaleAmountText("1 1/2 cups (300 g)", 2)).toBe("3 cups");
    expect(scaleAmountText("½ tsp", 2)).toBe("1 tsp");
    expect(scaleAmountText("2-3 cloves", 2)).toBe("4-6 cloves");
    expect(scaleAmountText("a pinch", 2)).toBe("a pinch");
    expect(scaleAmountText("500 g", 1)).toBe("500 g");
  });
  it("tops up only what is short for the chosen servings", () => {
    const r = dish([ing("ground-coffee", "500 g")], { servings: 4 });
    const pantry = [item("ground-coffee", 250, "g")];
    expect(getShoppingPlan(scaledRecipe(r, 4), pantry).shortfalls[0]?.quantity).toBe(250);
    expect(getShoppingPlan(scaledRecipe(r, 2), pantry).shortfalls).toHaveLength(0);
    expect(r.ingredients[0].amount).toBe("500 g");
  });
});

describe("Home's ready-to-cook list uses amounts", () => {
  it("leaves out a dish whose amount is short", () => {
    const r = dish([ing("ground-coffee", "500 g")]);
    expect(pickReadyToCook([item("ground-coffee", 1, "kg")], [r], [])).toHaveLength(1);
    expect(pickReadyToCook([item("ground-coffee", 100, "g")], [r], [])).toHaveLength(0);
  });
});
