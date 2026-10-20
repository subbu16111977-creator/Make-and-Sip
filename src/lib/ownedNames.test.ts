import { describe, expect, it } from "vitest";
import { buildSwaps, ownedNameFor, swapLabel, swapNames } from "./ownedNames";
import type { PantryItem, RecipeIngredient } from "@/types";

const item = (ingredientId: string, name: string): PantryItem => ({ id: ingredientId, ingredientId, name, category: "Juices & Sodas", quantity: 1, unit: "pcs", quantityKnown: true, location: "Pantry", purchaseDate: "2026-01-01", expiryDate: "2027-01-01", source: "manual" });
const ing = (pantryId: string, label: string): RecipeIngredient => ({ pantryId, label, amount: "150 ml" });

describe("the person's own names for what they have", () => {
  const seltzer = ing("sparkling-water", "Chilled seltzer (plain sparkling water)");

  it("finds a different name for the same ingredient", () => {
    expect(ownedNameFor(seltzer, item("sparkling-water", "Club soda"))).toBe("Club soda");
  });

  it("does nothing when the person's name is the recipe's, or already in the label", () => {
    expect(ownedNameFor(seltzer, item("sparkling-water", "Sparkling water"))).toBeNull();
    expect(ownedNameFor(ing("milk", "Cold whole milk"), item("milk", "Whole milk"))).toBeNull();
  });

  it("never renames a different ingredient or form", () => {
    expect(ownedNameFor(ing("ground-coffee", "Ground coffee"), item("coffee-beans", "Coffee beans"))).toBeNull();
    expect(ownedNameFor(ing("ground-coffee", "Ground coffee"), item("coffee", "Coffee"))).toBeNull();
    expect(ownedNameFor(seltzer, undefined)).toBeNull();
  });

  it("never renames water or ice", () => {
    expect(ownedNameFor(ing("water", "Boiling water"), item("water", "Filtered water"))).toBeNull();
    expect(ownedNameFor(ing("ice", "Ice cubes"), item("ice", "Crushed ice"))).toBeNull();
  });

  it("swaps the name in the label and in the method, and tidies a repeated bracket", () => {
    const swaps = buildSwaps([{ ingredient: seltzer, item: item("sparkling-water", "Club soda") }]);
    expect(swapLabel(seltzer.label, swaps)).toBe("Chilled club soda");
    expect(swapNames("Hold the bottle of seltzer high above the glass.", swaps)).toBe("Hold the bottle of club soda high above the glass.");
    expect(swapNames("Top up with sparkling water, then stir.", swaps)).toBe("Top up with club soda, then stir.");
    expect(swapNames("Sparkling water goes in last.", swaps)).toBe("Club soda goes in last.");
  });

  it("leaves steps alone when nothing was renamed", () => {
    expect(swapNames("Top up with sparkling water.", [])).toBe("Top up with sparkling water.");
  });

  it("does not stack words when the new name contains the plain one", () => {
    const milk = ing("milk", "Cold whole milk, for steaming");
    const swaps = buildSwaps([{ ingredient: milk, item: item("milk", "Semi skimmed milk") }]);
    expect(swapLabel(milk.label, swaps)).toBe("Cold semi skimmed milk, for steaming");
    expect(swapNames("Add the cold milk.", swaps)).toBe("Add the cold milk.");
  });

  it("keeps the temperature words of ingredients it does not touch", () => {
    const swaps = buildSwaps([{ ingredient: seltzer, item: item("sparkling-water", "Club soda") }]);
    expect(swapNames("Pour in the boiling water, then the seltzer.", swaps)).toBe("Pour in the boiling water, then the club soda.");
  });
});
