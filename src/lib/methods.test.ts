import { describe, expect, it } from "vitest";
import { bestMethod, canMakeByHand, equipmentSatisfied, groupLabel, isByHand, methodsOf, missingForMethod, recipeForMethod, unmetEquipment } from "@/lib/methods";
import { computeCookability } from "@/lib/cookability";
import { hasRequiredEquipment, matchRecipe, missingEquipment } from "@/lib/pantryMatch";
import type { PantryItem, Recipe } from "@/types";

const item = (ingredientId: string, quantity: number, unit: PantryItem["unit"]): PantryItem => ({ id: `p-${ingredientId}`, name: ingredientId, category: "Pantry Staples", quantity, unit, quantityKnown: true, location: "Pantry", purchaseDate: "2026-01-01", expiryDate: "2027-01-01", ingredientId, source: "manual" });

const base = [{ pantryId: "ground-coffee", label: "Ground coffee", amount: "18 g" }];
const latte = {
  id: "latte", title: "Latte", description: "", temperature: "hot", cuisine: "Coffee", dietTags: [], tasteTags: [], timeMinutes: 5, prepMinutes: 5, cookMinutes: 0, difficulty: "Easy", servings: 1, budget: "$", image: "",
  ingredients: base,
  methods: [
    { id: "machine", label: "Espresso machine", equipment: ["Espresso Machine"], steps: ["a", "b", "c"] },
    { id: "moka", label: "Moka pot", equipment: ["Moka Pot"], ingredients: [{ pantryId: "ground-coffee", label: "Ground coffee", amount: "15 g" }], steps: ["a", "b", "c"] },
    { id: "hand", label: "By hand", equipment: [], handTools: ["Spoon"], ingredients: [{ pantryId: "instant-coffee", label: "Instant coffee", amount: "2 tsp" }], steps: ["a", "b", "c"] },
  ],
} as unknown as Recipe;
const noHand = { ...latte, methods: latte.methods!.slice(0, 2) } as Recipe;

describe("ways to make a drink", () => {
  it("a drink written the short way has one method built from its fields", () => {
    const m = methodsOf({ id: "x", equipment: ["Blender"], steps: ["one"] } as unknown as Recipe);
    expect(m).toHaveLength(1);
    expect(m[0].equipment).toEqual(["Blender"]);
    expect(m[0].steps).toEqual(["one"]);
  });
  it("is makeable when ANY method's equipment is owned, and by hand always is", () => {
    expect(equipmentSatisfied([], noHand)).toBe(false);
    expect(equipmentSatisfied(["Moka Pot"], noHand)).toBe(true);
    expect(equipmentSatisfied([], latte)).toBe(true);
    expect(canMakeByHand(latte)).toBe(true);
    expect(canMakeByHand(noHand)).toBe(false);
    expect(isByHand(latte.methods![2])).toBe(true);
  });
  it("picks the first method you have gear for, else the one missing the least, and honours a choice", () => {
    expect(bestMethod(["Moka Pot"], noHand).id).toBe("moka");
    expect(bestMethod(["Espresso Machine", "Moka Pot"], noHand).id).toBe("machine");
    expect(bestMethod([], noHand).id).toBe("machine");
    expect(bestMethod(["Espresso Machine", "Moka Pot"], noHand, "moka").id).toBe("moka");
    expect(bestMethod([], latte).id).toBe("hand");
    expect(bestMethod([], latte, "nonsense").id).toBe("hand");
  });
  it("names what is missing as the ways out", () => {
    expect(unmetEquipment([], noHand)).toEqual(["Espresso Machine or Moka Pot"]);
    expect(unmetEquipment(["Moka Pot"], noHand)).toEqual([]);
    expect(unmetEquipment([], latte)).toEqual([]);
    expect(missingForMethod([], latte.methods![0])).toEqual(["Espresso Machine"]);
    expect(groupLabel(["A", "B", "C"])).toBe("A, B or C");
  });
  it("uses a method's own ingredient list when it has one", () => {
    expect(recipeForMethod(latte, latte.methods![0]).ingredients[0].amount).toBe("18 g");
    expect(recipeForMethod(latte, latte.methods![1]).ingredients[0].amount).toBe("15 g");
    expect(recipeForMethod(latte, latte.methods![2]).ingredients[0].pantryId).toBe("instant-coffee");
  });
  it("the score follows the method: instant coffee makes the by-hand way ready, grounds make the machine way ready", () => {
    const instant = [item("instant-coffee", 100, "g")];
    const grounds = [item("ground-coffee", 250, "g")];
    expect(computeCookability(latte, instant, []).methodId).toBe("hand");
    expect(computeCookability(latte, instant, []).category).toBe("ready");
    expect(computeCookability(latte, grounds, []).category).not.toBe("ready"); // by hand needs instant coffee
    expect(computeCookability(latte, grounds, ["Espresso Machine"]).category).toBe("ready");
    expect(computeCookability(latte, grounds, ["Espresso Machine"]).methodId).toBe("machine");
    expect(computeCookability(latte, grounds, ["Espresso Machine", "Moka Pot"], 1, "moka").methodId).toBe("moka");
    // a method you chose but cannot do yet is never ready, and says what it needs
    const c = computeCookability(latte, grounds, [], 1, "moka");
    expect(c.category).not.toBe("ready");
    expect(c.equipmentMissing).toEqual(["Moka Pot"]);
  });
  it("matching helpers see the method too", () => {
    expect(hasRequiredEquipment([], latte)).toBe(true);
    expect(hasRequiredEquipment([], noHand)).toBe(false);
    expect(missingEquipment([], noHand)).toEqual(["Espresso Machine or Moka Pot"]);
    expect(matchRecipe([item("instant-coffee", 50, "g")], latte, []).have.map((i) => i.pantryId)).toEqual(["instant-coffee"]);
    expect(matchRecipe([item("ground-coffee", 50, "g")], latte, []).missing.map((i) => i.pantryId)).toEqual(["instant-coffee"]);
  });
});

describe("time and tool wording", () => {
  it("formats minutes", async () => {
    const { formatMinutes } = await import("./methods");
    expect(formatMinutes(45)).toBe("45 min");
    expect(formatMinutes(840)).toBe("14 hr");
    expect(formatMinutes(852)).toBe("14 hr 12 min");
  });
  it("lists tools once, without repeats", async () => {
    const { toolsPhrase } = await import("./methods");
    expect(toolsPhrase(["Saucepan", "Saucepan or kettle", "Spoon"])).toBe("saucepan or kettle and spoon");
    expect(toolsPhrase(["Glass"])).toBe("glass");
  });
});
