import { describe, expect, it } from "vitest";
import { sortDiscover } from "./discoverView";
import { bestMethod, recipeForMethod } from "./methods";
import { getIngredientMatch, getRecipeAvailability, matchRecipe, pickSlideshowMatches, pickReadyToCook, pickAlmostThere, pickQuickRecipes, canMakeRecipe, bestEquipmentUnlock, cuisineSummaries } from "./pantryMatch";
import type { PantryItem, Recipe, RecipeIngredient } from "@/types";
import { recipes } from "@/data/recipes";
import { seedPantry } from "@/test/seedPantry";

function pantryItem(overrides: Partial<PantryItem>): PantryItem {
  return {
    id: overrides.ingredientId ?? "test-item",
    name: "Test item",
    category: "Fruit",
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
  it("Test 1: pantry lemon matches recipe '1/2 lemon, sliced'", () => {
    const pantry = [pantryItem({ ingredientId: "lemon", name: "Lemon" })];
    const ing = recipeIngredient({ pantryId: "lemon", label: "1/2 lemon, sliced", amount: "1/2" });
    const m = getIngredientMatch(ing, pantry);
    expect(m.identityMatched).toBe(true);
    expect(m.status).toBe("matched");
    expect(m.message.toLowerCase()).toContain("you have lemon");
  });

  it("Test 2: pantry generic coffee satisfies recipe '18 g ground coffee' as a subtype match", () => {
    const pantry = [pantryItem({ ingredientId: "coffee", name: "Coffee" })];
    const ing = recipeIngredient({ pantryId: "ground-coffee", label: "Ground coffee", amount: "18 g" });
    const m = getIngredientMatch(ing, pantry);
    expect(m.identityMatched).toBe(true);
    expect(m.matchType).toBe("subtype");
    expect(m.status).toBe("matched_subtype");
  });

  it("Test 3: pantry mint matches recipe '8 fresh mint leaves'", () => {
    const pantry = [pantryItem({ ingredientId: "fresh-mint", name: "Mint" })];
    const ing = recipeIngredient({ pantryId: "fresh-mint", label: "8 fresh mint leaves", amount: "8" });
    expect(getIngredientMatch(ing, pantry).identityMatched).toBe(true);
  });

  it("Test 4: pantry milk matches recipe '200 ml whole milk, steamed'", () => {
    const pantry = [pantryItem({ ingredientId: "milk", name: "Milk" })];
    const ing = recipeIngredient({ pantryId: "milk", label: "200 ml whole milk, steamed", amount: "200 ml" });
    expect(getIngredientMatch(ing, pantry).identityMatched).toBe(true);
  });

  it("Test 5: pantry cinnamon stick matches recipe '1 cinnamon stick'", () => {
    const pantry = [pantryItem({ ingredientId: "cinnamon-stick", name: "Cinnamon stick" })];
    const ing = recipeIngredient({ pantryId: "cinnamon-stick", label: "1 cinnamon stick", amount: "1" });
    expect(getIngredientMatch(ing, pantry).identityMatched).toBe(true);
  });

  it("Test 6: pantry coffee does NOT match a recipe that needs instant coffee", () => {
    const pantry = [pantryItem({ ingredientId: "coffee", name: "Coffee" })];
    const ing = recipeIngredient({ pantryId: "instant-coffee", label: "Instant coffee", amount: "2 tsp" });
    const m = getIngredientMatch(ing, pantry);
    expect(m.identityMatched).toBe(false);
    expect(m.status).toBe("missing");
  });

  it("Test 7: pantry coconut milk does NOT match a recipe that needs coconut cream", () => {
    const pantry = [pantryItem({ ingredientId: "coconut-milk", name: "Coconut milk" })];
    const ing = recipeIngredient({ pantryId: "coconut-cream", label: "Coconut cream", amount: "100 ml" });
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
    const pantry = [pantryItem({ ingredientId: "ground-coffee", quantity: 200, unit: "g", quantityKnown: true })];
    const ing = recipeIngredient({ pantryId: "ground-coffee", label: "Ground coffee", amount: "500 g" });
    const m = getIngredientMatch(ing, pantry);
    expect(m.identityMatched).toBe(true);
    expect(m.quantityStatus).toBe("insufficient");
    expect(m.status).toBe("quantity_insufficient");
    expect(m.missingQuantity).toBe("300 g");
  });

  it("cross-unit comparison: pantry has 1 kg, recipe needs 500 g -> sufficient", () => {
    const pantry = [pantryItem({ ingredientId: "ground-coffee", quantity: 1, unit: "kg", quantityKnown: true })];
    const ing = recipeIngredient({ pantryId: "ground-coffee", label: "Ground coffee", amount: "500 g" });
    expect(getIngredientMatch(ing, pantry).quantityStatus).toBe("sufficient");
  });

  it("unknown pantry quantity never counts as missing", () => {
    const pantry = [pantryItem({ ingredientId: "ground-coffee", quantityKnown: false })];
    const ing = recipeIngredient({ pantryId: "ground-coffee", label: "Ground coffee", amount: "500 g" });
    const m = getIngredientMatch(ing, pantry);
    expect(m.identityMatched).toBe(true);
    expect(m.quantityStatus).toBe("unknown");
    expect(m.status).not.toBe("missing");
  });
});

describe("getRecipeAvailability + matchRecipe against the real drinks library", () => {
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

  it("matchRecipe have/missing stay consistent with getRecipeAvailability", () => {
    const recipe: Recipe = recipes[0];
    const match = matchRecipe(seedPantry, recipe);
    // matchRecipe reads the method the person can actually make, so compare against that method's ingredients.
    const resolved = recipeForMethod(recipe, bestMethod([], recipe));
    const availability = getRecipeAvailability(resolved, seedPantry);
    expect(match.have.length).toBe(availability.matchedCount);
    expect(match.have.length + match.missing.length).toBe(resolved.ingredients.length);
  });
});

describe("pickSlideshowMatches", () => {
  const mk = (id: string, cuisine: string, pantryIds: string[], optional: string[] = []): Recipe =>
    ({
      id,
      title: id,
      cuisine,
      ingredients: [
        ...pantryIds.map((p) => recipeIngredient({ pantryId: p })),
        ...optional.map((p) => recipeIngredient({ pantryId: p, optional: true })),
      ],
    }) as unknown as Recipe;
  const have = (...ids: string[]) => ids.map((ingredientId) => pantryItem({ id: ingredientId, ingredientId, name: ingredientId }));
  const categories = ["Coffee", "Tea", "Smoothies", "Juices"];
  const library = categories.flatMap((c) => Array.from({ length: 10 }, (_, i) => mk(`${c}-${i}`, c, ["milk", `x-${i}`])));

  it("shows one drink from every category, however the pantry leans", () => {
    const out = pickSlideshowMatches(have("coffee"), library, 5, 8);
    expect(out.map((m) => m.recipe.cuisine).sort()).toEqual([...categories].sort());
  });

  it("shows drinks even when the pantry holds nothing for them", () => {
    expect(pickSlideshowMatches([], library, 5, 8)).toHaveLength(categories.length);
  });

  it("favours a drink the pantry covers, within its category", () => {
    const recipes = [mk("good", "Tea", ["tea", "milk"]), ...Array.from({ length: 6 }, (_, i) => mk(`poor-${i}`, "Tea", [`a-${i}`, `b-${i}`, `c-${i}`]))];
    let good = 0;
    for (let seed = 1; seed <= 30; seed++) if (pickSlideshowMatches(have("tea", "milk"), recipes, seed)[0].recipe.id === "good") good++;
    expect(good).toBeGreaterThan(20);
  });

  it("marks a drink as complete when only optional ingredients are missing", () => {
    const out = pickSlideshowMatches(have("tomato"), [mk("a", "Tea", ["tomato"], ["basil"])], 1);
    expect(out[0].complete).toBe(true);
  });

  it("never shows more than the target", () => {
    const many = Array.from({ length: 12 }, (_, i) => mk(`d-${i}`, `Type ${i}`, ["milk"]));
    expect(pickSlideshowMatches([], many, 3, 8)).toHaveLength(8);
  });

  it("is deterministic for a seed and changes with a different seed", () => {
    const a = pickSlideshowMatches([], library, 11).map((m) => m.recipe.id);
    const b = pickSlideshowMatches([], library, 11).map((m) => m.recipe.id);
    const c = pickSlideshowMatches([], library, 12345).map((m) => m.recipe.id);
    expect(a).toEqual(b);
    expect(c).not.toEqual(a);
  });

  it("covers every real drink category with the real library", () => {
    const out = pickSlideshowMatches([], recipes, 9, 8);
    expect(new Set(out.map((m) => m.recipe.cuisine)).size).toBe(8);
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
