import { describe, expect, it } from "vitest";
import { COOKABILITY, computeCookability, ingredientCookability, ingredientWeight, scaleAmountText, scaledRecipe } from "@/lib/cookability";
import { getShoppingPlan, pickReadyToCook } from "@/lib/pantryMatch";
import { normalizeIngredient, parseAmount } from "@/lib/ingredientNormalize";
import { recipes } from "@/data/recipes";
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
    expect(normalizeIngredient("tomatoes").ingredientId).toBe("tomato");
    expect(normalizeIngredient("chicken breasts").ingredientId).toBe("chicken-breast");
    expect(normalizeIngredient("capsicum").ingredientId).toBe("bell-pepper");
    expect(normalizeIngredient("coriander").ingredientId).toBe("cilantro");
    expect(normalizeIngredient("atta").ingredientId).toBe("roti-flour");
    expect(normalizeIngredient("whole wheat flour").ingredientId).toBe("roti-flour");
    for (const t of ["chillies", "chilis", "chiles"]) expect(normalizeIngredient(t).ingredientId).toBe("green-chili");
  });
  it("does not merge look-alike products", () => {
    expect(normalizeIngredient("garlic powder").ingredientId).not.toBe("garlic");
    expect(normalizeIngredient("tomato sauce").ingredientId).not.toBe("tomato");
    expect(normalizeIngredient("chicken stock").ingredientId).toBe("chicken-stock");
    expect(normalizeIngredient("coconut milk").ingredientId).not.toBe(normalizeIngredient("shredded coconut").ingredientId);
    expect(normalizeIngredient("whole wheat flour").ingredientId).not.toBe("all-purpose-flour");
  });
});

describe("quantity", () => {
  it("compares across g and kg", () => {
    const r = ingredientCookability(ing("chicken-breast", "500 g"), [item("chicken-breast", 0.5, "kg")], 1);
    expect(r.quantity).toBe("sufficient");
  });
  it("is insufficient with a partial credit and a readable shortfall", () => {
    const r = ingredientCookability(ing("chicken-breast", "500 g"), [item("chicken-breast", 200, "g")], 1);
    expect(r.match).toBe("insufficient");
    expect(r.credit).toBeCloseTo(0.4);
    expect(r.shortBy).toBe("300 g");
  });
  it("converts spoons and ml", () => {
    expect(ingredientCookability(ing("olive-oil", "2 tbsp"), [item("olive-oil", 30, "ml")], 1).quantity).toBe("sufficient");
    expect(ingredientCookability(ing("olive-oil", "2 tbsp"), [item("olive-oil", 20, "ml")], 1).quantity).toBe("insufficient");
  });
  it("uses a labelled approximation for weight vs cups only where a density is known", () => {
    const flour = ingredientCookability(ing("all-purpose-flour", "1 cup"), [item("all-purpose-flour", 500, "g")], 1);
    expect(flour.quantity).toBe("sufficient");
    expect(flour.approximate).toBe(true);
    const unknown = ingredientCookability(ing("onion", "1 cup"), [item("onion", 500, "g")], 1);
    expect(unknown.quantity).toBe("unknown");
    expect(unknown.credit).toBe(1);
  });
  it("does not equate '1 onion' with 200 g of onion", () => {
    expect(ingredientCookability(ing("onion", "1"), [item("onion", 200, "g")], 1).quantity).toBe("unknown");
  });
  it("compares pieces with pieces", () => {
    expect(ingredientCookability(ing("onion", "2 medium"), [item("onion", 1, "pcs")], 1).quantity).toBe("insufficient");
    expect(ingredientCookability(ing("onion", "2 medium"), [item("onion", 3, "pcs")], 1).quantity).toBe("sufficient");
  });
  it("treats 'to taste' and 'for frying' as not needing a quantity", () => {
    expect(ingredientCookability(ing("black-pepper", "to taste"), [item("black-pepper", 1, "pcs")], 1).quantity).toBe("not-applicable");
    expect(ingredientCookability(ing("vegetable-oil", "for frying"), [item("vegetable-oil", 1, "ml")], 1).quantity).toBe("not-applicable");
  });
  it("never treats a pantry item without a known amount as missing", () => {
    const r = ingredientCookability(ing("onion", "2"), [item("onion", 1, "pcs", { quantityKnown: false })], 1);
    expect(r.match).toBe("exact");
    expect(r.quantity).toBe("unknown");
  });
});

describe("match kinds", () => {
  it("exact, missing", () => {
    expect(ingredientCookability(ing("onion", "1"), [item("onion", 3, "pcs")], 1).match).toBe("exact");
    expect(ingredientCookability(ing("onion", "1"), [], 1).match).toBe("missing");
  });
  it("a generic pantry item covers a specific cut; two different cuts are ambiguous", () => {
    expect(ingredientCookability(ing("chicken-breast", "500 g"), [item("chicken", 1, "kg")], 1).match).toBe("safe-equivalent");
    const ambiguous = ingredientCookability(ing("chicken-breast", "500 g"), [item("chicken-thigh", 1, "kg")], 1);
    expect(ambiguous.match).toBe("ambiguous");
    expect(ambiguous.credit).toBe(COOKABILITY.ambiguousCredit);
  });
  it("chicken stock is not chicken", () => {
    expect(ingredientCookability(ing("chicken-breast", "500 g"), [item("chicken-stock", 1, "l")], 1).match).toBe("missing");
  });
});

describe("servings", () => {
  const recipe = dish([ing("chicken-breast", "500 g")], { servings: 4 });
  it("scales what is required, not what the recipe says", () => {
    const pantry = [item("chicken-breast", 250, "g")];
    expect(computeCookability(recipe, pantry, [], 4).category).toBe("partial");
    expect(computeCookability(recipe, pantry, [], 2).category).toBe("ready");
    expect(computeCookability(recipe, pantry, [], 2).ingredients[0].needed).toBe("250 g");
    expect(recipe.ingredients[0].amount).toBe("500 g");
  });
});

describe("score and categories", () => {
  const pantryAll = [item("chicken-breast", 1, "kg"), item("onion", 3, "pcs"), item("black-pepper", 1, "pcs")];
  it("ready when everything is there", () => {
    const c = computeCookability(dish([ing("chicken-breast", "500 g"), ing("onion", "1"), ing("black-pepper", "to taste")]), pantryAll, []);
    expect(c.category).toBe("ready");
    expect(c.percent).toBe(100);
    expect(c.summary).toContain("all 3 required ingredients");
  });
  it("optional ingredients never lower the score", () => {
    const c = computeCookability(dish([ing("chicken-breast", "500 g"), ing("cilantro", "1 bunch", { optional: true })]), pantryAll, []);
    expect(c.percent).toBe(100);
    expect(c.category).toBe("ready");
    expect(c.optionalMissing).toBe(1);
  });
  it("a missing main ingredient can't hide behind small ones", () => {
    const small = ["black-pepper", "onion", "garlic", "tomato"].map((id) => ing(id, "1"));
    const pantry = small.map((i) => item(i.pantryId, 5, "pcs"));
    const c = computeCookability(dish([ing("chicken-breast", "500 g"), ...small]), pantry, []);
    expect(c.requiredMissing).toBe(1);
    expect(c.category).not.toBe("ready");
    expect(c.percent).toBeLessThanOrEqual(70);
  });
  it("missing equipment prevents 'ready'", () => {
    const c = computeCookability(dish([ing("onion", "1")], { equipment: ["Espresso Machine"] }), pantryAll, []);
    expect(c.category).toBe("almost");
    expect(c.equipmentMissing).toEqual(["Espresso Machine"]);
    expect(computeCookability(dish([ing("onion", "1")], { equipment: ["Espresso Machine"] }), pantryAll, ["Espresso Machine"]).category).toBe("ready");
  });
  it("low match below 40%", () => {
    const c = computeCookability(dish([ing("chicken-breast", "500 g"), ing("rice", "1 cup"), ing("onion", "1")]), [item("onion", 1, "pcs")], []);
    expect(c.category).toBe("low");
  });
  it("weights follow the ingredient's role", () => {
    expect(ingredientWeight("chicken-breast", null)).toBe(3);
    expect(ingredientWeight("onion", null)).toBe(2);
    expect(ingredientWeight("black-pepper", null)).toBe(1);
    expect(ingredientWeight("soy-sauce", 500)).toBe(2);
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
    const r = recipes[0];
    const pantry = r.ingredients.map((i) => item(i.pantryId, 100000, "g"));
    const c = computeCookability(r, pantry, r.equipment);
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
    const r = dish([ing("chicken-breast", "500 g")], { servings: 4 });
    const pantry = [item("chicken-breast", 250, "g")];
    expect(getShoppingPlan(scaledRecipe(r, 4), pantry).shortfalls[0]?.quantity).toBe(250);
    expect(getShoppingPlan(scaledRecipe(r, 2), pantry).shortfalls).toHaveLength(0);
    expect(r.ingredients[0].amount).toBe("500 g");
  });
});

describe("Home's ready-to-cook list uses amounts", () => {
  it("leaves out a dish whose amount is short", () => {
    const r = dish([ing("chicken-breast", "500 g")]);
    expect(pickReadyToCook([item("chicken-breast", 1, "kg")], [r], [])).toHaveLength(1);
    expect(pickReadyToCook([item("chicken-breast", 100, "g")], [r], [])).toHaveLength(0);
  });
});

describe("everyday bread names", () => {
  it("recognises plain 'buns' and hot dog buns", () => {
    for (const t of ["buns", "Buns", "bun", "burger buns", "sesame buns"]) expect(normalizeIngredient(t).ingredientId).toBe("burger-buns");
    expect(normalizeIngredient("hot dog buns").ingredientId).toBe("hoagie-roll");
  });
});
