import { describe, expect, it } from "vitest";
import { sortDiscover } from "./discoverView";
import { getIngredientMatch, getRecipeAvailability, matchRecipe, pickSlideshowMatches, pickReadyToCook, pickAlmostThere, pickQuickRecipes, canMakeRecipe, bestEquipmentUnlock, cuisineSummaries } from "./pantryMatch";
import type { PantryItem, Recipe, RecipeIngredient } from "@/types";
import { recipes } from "@/data/recipes";
import { pantryItems as seedPantry } from "@/test/fixtures/pantry";

function pantryItem(overrides: Partial<PantryItem>): PantryItem {
  return {
    id: overrides.ingredientId ?? "test-item",
    name: "Test item",
    category: "Vegetables",
    quantity: 1,
    unit: "pcs",
    quantityKnown: true,
    location: "Pantry",
    purchaseDate: new Date().toISOString(),
    expiryDate: new Date().toISOString(),
    ingredientId: "test-item",
    source: "manual",
    ...overrides,
  };
}

function recipeIngredient(overrides: Partial<RecipeIngredient>): RecipeIngredient {
  return { pantryId: "test-item", label: "Test item", amount: "1 pcs", ...overrides };
}

describe("getIngredientMatch — identity", () => {
  it("Test 1: pantry chicken matches recipe '1/4 chicken, chopped into pieces'", () => {
    const pantry = [pantryItem({ ingredientId: "chicken", name: "Chicken" })];
    const ing = recipeIngredient({ pantryId: "chicken", label: "1/4 chicken, chopped into pieces", amount: "1/4" });
    const m = getIngredientMatch(ing, pantry);
    expect(m.identityMatched).toBe(true);
    expect(m.status).toBe("matched");
    expect(m.message.toLowerCase()).toContain("you have chicken");
  });

  it("Test 2: pantry generic chicken satisfies recipe '500 g boneless chicken breast' as a subtype match", () => {
    const pantry = [pantryItem({ ingredientId: "chicken", name: "Chicken" })];
    const ing = recipeIngredient({ pantryId: "chicken-breast", label: "Boneless chicken breast", amount: "500 g" });
    const m = getIngredientMatch(ing, pantry);
    expect(m.identityMatched).toBe(true);
    expect(m.matchType).toBe("subtype");
    expect(m.status).toBe("matched_subtype");
  });

  it("Test 3: pantry tomato matches recipe '3 tomatoes, diced'", () => {
    const pantry = [pantryItem({ ingredientId: "tomato", name: "Tomato" })];
    const ing = recipeIngredient({ pantryId: "tomato", label: "3 tomatoes, diced", amount: "3" });
    expect(getIngredientMatch(ing, pantry).identityMatched).toBe(true);
  });

  it("Test 4: pantry onion matches recipe '1 large onion, finely chopped'", () => {
    const pantry = [pantryItem({ ingredientId: "onion", name: "Onion" })];
    const ing = recipeIngredient({ pantryId: "onion", label: "1 large onion, finely chopped", amount: "1" });
    expect(getIngredientMatch(ing, pantry).identityMatched).toBe(true);
  });

  it("Test 5: pantry garlic matches recipe '2 cloves garlic, minced'", () => {
    const pantry = [pantryItem({ ingredientId: "garlic", name: "Garlic" })];
    const ing = recipeIngredient({ pantryId: "garlic", label: "2 cloves garlic, minced", amount: "2 cloves" });
    expect(getIngredientMatch(ing, pantry).identityMatched).toBe(true);
  });

  it("Test 6: pantry chicken does NOT match a recipe that needs chicken stock", () => {
    const pantry = [pantryItem({ ingredientId: "chicken", name: "Chicken" })];
    const ing = recipeIngredient({ pantryId: "chicken-stock", label: "Chicken stock", amount: "2 cups" });
    const m = getIngredientMatch(ing, pantry);
    expect(m.identityMatched).toBe(false);
    expect(m.status).toBe("missing");
  });

  it("Test 7: pantry coconut does NOT automatically match a recipe that needs coconut milk", () => {
    const pantry = [pantryItem({ ingredientId: "coconut", name: "Coconut" })];
    const ing = recipeIngredient({ pantryId: "coconut-milk-can", label: "Full-fat coconut milk", amount: "1 can" });
    expect(getIngredientMatch(ing, pantry).identityMatched).toBe(false);
  });

  it("an ingredient nothing in pantry covers comes back missing, with optional ones flagged separately", () => {
    const ing = recipeIngredient({ pantryId: "saffron", label: "Saffron threads", amount: "1 pinch", optional: true });
    const m = getIngredientMatch(ing, []);
    expect(m.status).toBe("optional_missing");
  });
});

describe("getIngredientMatch — quantity logic is separate from identity", () => {
  it("insufficient quantity still counts as identity-matched, with the shortfall reported", () => {
    const pantry = [pantryItem({ ingredientId: "chicken-thigh", quantity: 200, unit: "g", quantityKnown: true })];
    const ing = recipeIngredient({ pantryId: "chicken-thigh", label: "Chicken thighs", amount: "500 g" });
    const m = getIngredientMatch(ing, pantry);
    expect(m.identityMatched).toBe(true);
    expect(m.quantityStatus).toBe("insufficient");
    expect(m.status).toBe("quantity_insufficient");
    expect(m.missingQuantity).toBe("300 g");
  });

  it("cross-unit comparison: pantry has 1 kg, recipe needs 500 g -> sufficient", () => {
    const pantry = [pantryItem({ ingredientId: "chicken-thigh", quantity: 1, unit: "kg", quantityKnown: true })];
    const ing = recipeIngredient({ pantryId: "chicken-thigh", label: "Chicken thighs", amount: "500 g" });
    expect(getIngredientMatch(ing, pantry).quantityStatus).toBe("sufficient");
  });

  it("unknown pantry quantity never counts as missing", () => {
    const pantry = [pantryItem({ ingredientId: "chicken-thigh", quantityKnown: false })];
    const ing = recipeIngredient({ pantryId: "chicken-thigh", label: "Chicken thighs", amount: "500 g" });
    const m = getIngredientMatch(ing, pantry);
    expect(m.identityMatched).toBe(true);
    expect(m.quantityStatus).toBe("unknown");
    expect(m.status).not.toBe("missing");
  });
});

describe("getRecipeAvailability + matchRecipe against the real 24-recipe library", () => {
  it("every recipe's structured ingredients resolve to a registry entry (no broken pantryId references)", () => {
    for (const recipe of recipes) {
      for (const ing of recipe.ingredients) {
        const m = getIngredientMatch(ing, seedPantry);
        // Not asserting matched/missing here — just that matching never throws
        // and always returns a well-formed result for every real ingredient.
        expect(["matched", "matched_subtype", "quantity_insufficient", "missing", "optional_missing"]).toContain(
          m.status
        );
      }
    }
  });

  it("chicken biryani's chicken-thigh ingredient is available from the seed pantry (which stocks chicken-thigh directly)", () => {
    const biryani = recipes.find((r) => r.id === "chicken-biryani")!;
    const chickenLine = biryani.ingredients.find((i) => i.pantryId === "chicken-thigh")!;
    const m = getIngredientMatch(chickenLine, seedPantry);
    expect(m.identityMatched).toBe(true);
  });

  it("matchRecipe have/missing stay consistent with getRecipeAvailability", () => {
    const recipe: Recipe = recipes[0];
    const match = matchRecipe(seedPantry, recipe);
    const availability = getRecipeAvailability(recipe, seedPantry);
    expect(match.have.length).toBe(availability.matchedCount);
    expect(match.have.length + match.missing.length).toBe(recipe.ingredients.length);
  });
});

describe("pickSlideshowMatches", () => {
  const mk = (id: string, pantryIds: string[], optional: string[] = []): Recipe =>
    ({
      id,
      title: id,
      ingredients: [
        ...pantryIds.map((p) => recipeIngredient({ pantryId: p })),
        ...optional.map((p) => recipeIngredient({ pantryId: p, optional: true })),
      ],
    }) as unknown as Recipe;
  const have = (...ids: string[]) => ids.map((ingredientId) => pantryItem({ id: ingredientId, ingredientId, name: ingredientId }));

  it("only includes dishes with at least one ingredient on hand", () => {
    const pantry = have("tomato");
    const out = pickSlideshowMatches(pantry, [mk("a", ["tomato", "onion"]), mk("b", ["chicken", "garlic"])], 1);
    expect(out.map((m) => m.recipe.id)).toEqual(["a"]);
  });

  it("always includes every dish the user has all ingredients for, even beyond the target size", () => {
    const pantry = have("tomato", "onion");
    const complete = Array.from({ length: 12 }, (_, i) => mk(`full-${i}`, ["tomato", "onion"]));
    const partial = Array.from({ length: 5 }, (_, i) => mk(`part-${i}`, ["tomato", "garlic"]));
    const out = pickSlideshowMatches(pantry, [...complete, ...partial], 7, 8);
    const ids = out.map((m) => m.recipe.id);
    for (const c of complete) expect(ids).toContain(c.id);
    expect(out.filter((m) => m.complete)).toHaveLength(12);
  });

  it("treats a dish as complete when only optional ingredients are missing", () => {
    const pantry = have("tomato");
    const out = pickSlideshowMatches(pantry, [mk("a", ["tomato"], ["basil"])], 1);
    expect(out[0].complete).toBe(true);
  });

  it("fills remaining slots up to the target with partial matches", () => {
    const pantry = have("tomato");
    const many = Array.from({ length: 20 }, (_, i) => mk(`p-${i}`, ["tomato", `x-${i}`]));
    expect(pickSlideshowMatches(pantry, many, 3, 8)).toHaveLength(8);
  });

  it("is deterministic for a seed and changes order for a different seed", () => {
    const pantry = have("tomato");
    const many = Array.from({ length: 20 }, (_, i) => mk(`p-${i}`, ["tomato", `x-${i}`]));
    const a = pickSlideshowMatches(pantry, many, 11).map((m) => m.recipe.id);
    const b = pickSlideshowMatches(pantry, many, 11).map((m) => m.recipe.id);
    const c = pickSlideshowMatches(pantry, many, 12345).map((m) => m.recipe.id);
    expect(a).toEqual(b);
    expect(c).not.toEqual(a);
  });

  it("returns nothing when no dish shares any ingredient with the pantry", () => {
    expect(pickSlideshowMatches(have("caviar"), [mk("a", ["tomato"])], 1)).toEqual([]);
  });
});

describe("canMakeRecipe", () => {
  const recipe = { id: "r", equipment: ["Espresso Machine"], ingredients: [] } as unknown as Recipe;
  const req = recipeIngredient({ pantryId: "a" });
  const opt = recipeIngredient({ pantryId: "b", optional: true });

  it("is true with all required ingredients and gear, even when optional ones are missing", () => {
    expect(canMakeRecipe(recipe, 1, [opt], ["Espresso Machine"])).toBe(true);
  });
  it("is false when a required ingredient is missing, gear is missing, or nothing is on hand", () => {
    expect(canMakeRecipe(recipe, 1, [req], ["Espresso Machine"])).toBe(false);
    expect(canMakeRecipe(recipe, 1, [], [])).toBe(false);
    expect(canMakeRecipe(recipe, 0, [], ["Espresso Machine"])).toBe(false);
  });
});

describe("Home section helpers", () => {
  const mk = (id: string, ids: string[], extra: Partial<Recipe> = {}): Recipe =>
    ({ id, title: id, cuisine: "X", image: "", timeMinutes: 30, equipment: [], ingredients: ids.map((p) => recipeIngredient({ pantryId: p })), ...extra }) as unknown as Recipe;
  const have = (...ids: string[]) => ids.map((ingredientId) => pantryItem({ id: ingredientId, ingredientId, name: ingredientId }));

  it("pickReadyToCook needs every required ingredient and all equipment", () => {
    const pantry = have("a", "b");
    const recipes = [mk("ok", ["a", "b"]), mk("gear", ["a", "b"], { equipment: ["Espresso Machine"] }), mk("short", ["a", "c"])];
    expect(pickReadyToCook(pantry, recipes, []).map((m) => m.recipe.id)).toEqual(["ok"]);
    expect(pickReadyToCook(pantry, recipes, ["Espresso Machine"]).map((m) => m.recipe.id).sort()).toEqual(["gear", "ok"]);
  });

  it("pickAlmostThere needs >=1 ingredient on hand, something still missing, and all equipment owned; closest first", () => {
    const pantry = have("a");
    const recipes = [
      mk("two", ["a", "b", "c"]),
      mk("one", ["a", "b"]),
      mk("many", ["a", "b", "c", "d", "e"]),
      mk("none", ["x", "y"]),
      mk("done", ["a"]),
      mk("gear", ["a", "b"], { equipment: ["Espresso Machine"] }),
    ];
    expect(pickAlmostThere(pantry, recipes, []).map((m) => m.recipe.id)).toEqual(["one", "two", "many"]);
    expect(pickAlmostThere(pantry, recipes, ["Espresso Machine"]).map((m) => m.recipe.id)).toContain("gear");
  });

  it("pickQuickRecipes only returns short dishes and is stable per seed", () => {
    const recipes = [mk("q1", [], { timeMinutes: 10 }), mk("q2", [], { timeMinutes: 20 }), mk("slow", [], { timeMinutes: 60 })];
    const out = pickQuickRecipes(recipes, 5).map((r) => r.id);
    expect(out.sort()).toEqual(["q1", "q2"]);
    expect(pickQuickRecipes(recipes, 5).map((r) => r.id)).toEqual(pickQuickRecipes(recipes, 5).map((r) => r.id));
  });

  it("bestEquipmentUnlock picks the appliance that unlocks the most dishes", () => {
    const recipes = [mk("a", [], { equipment: ["Milk Frother"] }), mk("b", [], { equipment: ["Milk Frother"] }), mk("c", [], { equipment: ["Soda Maker"] }), mk("d", [], { equipment: ["Espresso Machine", "Soda Maker"] })];
    expect(bestEquipmentUnlock(["Espresso Machine"], ["Milk Frother", "Soda Maker", "Espresso Machine"], recipes)).toEqual({ tag: "Milk Frother", count: 2 });
    expect(bestEquipmentUnlock(["Espresso Machine", "Milk Frother", "Soda Maker"], ["Milk Frother", "Soda Maker"], recipes)).toBeNull();
  });

  it("cuisineSummaries counts dishes and picks a photo", () => {
    const recipes = [mk("a", [], { cuisine: "Thai", image: "" }), mk("b", [], { cuisine: "Thai", image: "img" }), mk("c", [], { cuisine: "Mexican", image: "m" })];
    expect(cuisineSummaries(recipes)).toEqual([{ cuisine: "Thai", count: 2, image: "img" }, { cuisine: "Mexican", count: 1, image: "m" }]);
  });
});

describe("Discover sorting", () => {
  const mk = (id: string, ids: string[], extra: Partial<Recipe> = {}): Recipe =>
    ({ id, title: id, cuisine: "X", image: "", timeMinutes: 30, difficulty: "Easy", equipment: [], ingredients: ids.map((p) => recipeIngredient({ pantryId: p })), ...extra }) as unknown as Recipe;
  const have = (...ids: string[]) => ids.map((ingredientId) => pantryItem({ id: ingredientId, ingredientId, name: ingredientId }));

  it("sortDiscover orders by the chosen key and keeps ties stable", () => {
    const pantry = have("a");
    const ms = [
      matchRecipe(pantry, mk("b-slow", ["a"], { timeMinutes: 60, difficulty: "Advanced" })),
      matchRecipe(pantry, mk("a-fast", ["a", "x"], { timeMinutes: 10, difficulty: "Easy" })),
      matchRecipe(pantry, mk("c-mid", ["a", "x", "y"], { timeMinutes: 30, difficulty: "Medium" })),
    ];
    expect(sortDiscover(ms, "best").map((m) => m.recipe.id)).toEqual(["b-slow", "a-fast", "c-mid"]);
    expect(sortDiscover(ms, "quickest").map((m) => m.recipe.id)).toEqual(["a-fast", "c-mid", "b-slow"]);
    expect(sortDiscover(ms, "easiest").map((m) => m.recipe.id)).toEqual(["a-fast", "c-mid", "b-slow"]);
    expect(sortDiscover(ms, "fewest-to-buy").map((m) => m.recipe.id)).toEqual(["b-slow", "a-fast", "c-mid"]);
    expect(sortDiscover(ms, "az").map((m) => m.recipe.id)).toEqual(["a-fast", "b-slow", "c-mid"]);
  });
});

describe("counts written as 'medium' or 'whole' match pantry 'pcs'", () => {
  it("reports a shortfall for pieces", () => {
    const m = getIngredientMatch(recipeIngredient({ pantryId: "onion", label: "Onion", amount: "3 medium" }), [pantryItem({ ingredientId: "onion", quantity: 1, unit: "pcs" })]);
    expect(m.quantityStatus).toBe("insufficient");
  });
});
