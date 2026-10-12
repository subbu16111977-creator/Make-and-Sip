import { describe, expect, it } from "vitest";
import { isEquipmentTags, isPantryItems, isSavedIds, isShoppingItems } from "./persistedShapes";
import { pantryItems as seedPantry } from "@/test/fixtures/pantry";
import { addMissingIngredientsFromRecipe } from "./inventoryActions";

describe("persistedShapes — data read back from device storage", () => {
  it("accepts the real seed pantry after a JSON round trip (what is actually stored and reloaded)", () => {
    const roundTripped = JSON.parse(JSON.stringify(seedPantry));
    expect(isPantryItems(roundTripped)).toBe(true);
    expect(roundTripped).toEqual(seedPantry);
  });

  it("accepts a real shopping list after a JSON round trip, including the addedToPantry flag", () => {
    const { items } = addMissingIngredientsFromRecipe([], "r1", "Test", [
      { pantryId: "chicken-thigh", label: "Chicken", amount: "1" },
    ]);
    const withFlag = items.map((i) => ({ ...i, checked: true, addedToPantry: true }));
    const roundTripped = JSON.parse(JSON.stringify(withFlag));
    expect(isShoppingItems(roundTripped)).toBe(true);
    expect(roundTripped[0].addedToPantry).toBe(true);
  });

  it("accepts empty lists (an emptied pantry or shopping list must stay empty, not reset to the seed)", () => {
    expect(isPantryItems([])).toBe(true);
    expect(isShoppingItems([])).toBe(true);
    expect(isSavedIds([])).toBe(true);
    expect(isEquipmentTags([])).toBe(true);
  });

  it("rejects things that are not lists", () => {
    for (const bad of [null, undefined, 5, "text", {}, { items: [] }]) {
      expect(isPantryItems(bad)).toBe(false);
      expect(isShoppingItems(bad)).toBe(false);
      expect(isSavedIds(bad)).toBe(false);
      expect(isEquipmentTags(bad)).toBe(false);
    }
  });

  it("rejects pantry / shopping lists containing malformed entries", () => {
    expect(isPantryItems([{ id: "x" }])).toBe(false);
    expect(isPantryItems([...seedPantry, null])).toBe(false);
    expect(isShoppingItems([{ id: "x", name: "y" }])).toBe(false);
  });

  it("rejects saved ids and equipment that are not the expected kind", () => {
    expect(isSavedIds(["ok", 3])).toBe(false);
    expect(isEquipmentTags(["Oven", "Time Machine"])).toBe(false);
    expect(isEquipmentTags(["Oven", "Air Fryer"])).toBe(true);
  });
});
