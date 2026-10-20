import { describe, expect, it } from "vitest";
import { applyUsage, planUsage } from "./pantryUse";
import type { PantryItem, Recipe, RecipeIngredient } from "@/types";

const item = (ingredientId: string, quantity: number, unit: PantryItem["unit"], extra: Partial<PantryItem> = {}): PantryItem => ({ id: ingredientId, ingredientId, name: ingredientId, category: "Pantry Staples", quantity, unit, quantityKnown: true, location: "Pantry", purchaseDate: "2026-01-01", expiryDate: "2027-01-01", source: "manual", ...extra });
const ing = (pantryId: string, amount: string, extra: Partial<RecipeIngredient> = {}): RecipeIngredient => ({ pantryId, label: pantryId, amount, ...extra });
const drink = (ingredients: RecipeIngredient[]): Recipe => ({ id: "t", title: "T", description: "", cuisine: "Coffee", temperature: "cold", dietTags: [], tasteTags: [], timeMinutes: 5, prepMinutes: 2, cookMinutes: 3, difficulty: "Easy", servings: 1, budget: "$", image: "", ingredients, equipment: [], steps: ["Make it."] });

describe("taking what a drink used out of the pantry", () => {
  it("takes the amount off, converting between units of the same kind", () => {
    const plan = planUsage(drink([ing("milk", "2 tbsp")]), [item("milk", 1, "l")]);
    expect(plan.lines).toHaveLength(1);
    expect(plan.lines[0].unit).toBe("l");
    expect(plan.lines[0].remaining).toBeCloseTo(0.97, 2);
    expect(plan.lines[0].runsOut).toBe(false);
  });

  it("removes an item that is fully used", () => {
    const pantry = [item("lemon", 1, "pcs"), item("milk", 500, "ml")];
    const plan = planUsage(drink([ing("lemon", "1")]), pantry);
    expect(plan.lines[0].runsOut).toBe(true);
    const after = applyUsage(pantry, plan.lines, new Set([0]));
    expect(after.map((p) => p.id)).toEqual(["milk"]);
  });

  it("leaves unticked lines exactly as they were", () => {
    const pantry = [item("milk", 500, "ml"), item("sugar", 1000, "g")];
    const plan = planUsage(drink([ing("milk", "120 ml"), ing("sugar", "20 g")]), pantry);
    const after = applyUsage(pantry, plan.lines, new Set([0]));
    expect(after.find((p) => p.id === "milk")?.quantity).toBe(380);
    expect(after.find((p) => p.id === "sugar")).toBe(pantry[1]);
  });

  it("adds up two lines that come out of the same item, even if one is unticked", () => {
    const pantry = [item("sugar", 100, "g")];
    const plan = planUsage(drink([ing("sugar", "30 g"), ing("sugar", "20 g")]), pantry);
    expect(plan.lines.map((l) => l.remaining)).toEqual([70, 50]);
    expect(applyUsage(pantry, plan.lines, new Set([0, 1]))[0].quantity).toBe(50);
    expect(applyUsage(pantry, plan.lines, new Set([1]))[0].quantity).toBe(80);
  });

  it("never guesses: unknown amounts, weight against volume, optional and to-taste lines are left alone", () => {
    const pantry = [item("milk", 1, "pcs", { quantityKnown: false }), item("honey", 300, "g"), item("sugar", 500, "g"), item("salt", 100, "g")];
    const plan = planUsage(drink([ing("milk", "100 ml"), ing("honey", "2 tbsp"), ing("sugar", "10 g", { optional: true }), ing("salt", "to taste")]), pantry);
    expect(plan.lines).toEqual([]);
    expect(plan.skipped.map((s) => s.ingredient.pantryId)).toEqual(["milk", "honey"]);
    expect(applyUsage(pantry, plan.lines, new Set())).toEqual(pantry);
  });

  it("ignores ingredients the pantry does not have", () => {
    const plan = planUsage(drink([ing("milk", "100 ml")]), []);
    expect(plan).toEqual({ lines: [], skipped: [] });
  });
});
