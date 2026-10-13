import { describe, expect, it } from "vitest";
import { equipmentSatisfied, groupLabel, hasEquipmentRequirement, requiredEquipmentTags, unmetEquipment } from "@/lib/equipmentNeeds";
import { computeCookability } from "@/lib/cookability";
import { missingEquipment, hasRequiredEquipment } from "@/lib/pantryMatch";
import type { EquipmentTag, Recipe } from "@/types";

const drink = (extra: Partial<Recipe>): Recipe => ({ id: "d", title: "D", description: "", temperature: "hot", cuisine: "Coffee", dietTags: [], tasteTags: [], timeMinutes: 5, prepMinutes: 5, cookMinutes: 0, difficulty: "Easy", servings: 1, budget: "$", image: "", ingredients: [], equipment: [], steps: [], ...extra }) as Recipe;

describe('"any one of" equipment', () => {
  const latte = drink({ equipmentAnyOf: [["Espresso Machine", "Moka Pot", "AeroPress"]] });
  it("is met by owning any single tool in the group", () => {
    expect(equipmentSatisfied([], latte)).toBe(false);
    for (const tag of ["Espresso Machine", "Moka Pot", "AeroPress"] as EquipmentTag[]) expect(equipmentSatisfied([tag], latte)).toBe(true);
    expect(equipmentSatisfied(["Blender"], latte)).toBe(false);
  });
  it("labels what is missing as the whole choice, once", () => {
    expect(unmetEquipment([], latte)).toEqual(["Espresso Machine, Moka Pot or AeroPress"]);
    expect(groupLabel(["Teapot", "French Press"])).toBe("Teapot or French Press");
    expect(unmetEquipment(["Moka Pot"], latte)).toEqual([]);
  });
  it("combines with required items: both must hold", () => {
    const d = drink({ equipment: ["Blender"], equipmentAnyOf: [["Moka Pot", "AeroPress"]] });
    expect(unmetEquipment(["Blender"], d)).toEqual(["Moka Pot or AeroPress"]);
    expect(unmetEquipment(["AeroPress"], d)).toEqual(["Blender"]);
    expect(unmetEquipment(["Blender", "AeroPress"], d)).toEqual([]);
  });
  it("lists every tag mentioned and knows when there is a requirement", () => {
    expect(requiredEquipmentTags(drink({ equipment: ["Blender"], equipmentAnyOf: [["Moka Pot", "AeroPress"]] }))).toEqual(["Blender", "Moka Pot", "AeroPress"]);
    expect(hasEquipmentRequirement(drink({}))).toBe(false);
    expect(hasEquipmentRequirement(latte)).toBe(true);
  });
  it("blocks 'ready' in the score until one tool is owned, and is reflected in the match helpers", () => {
    expect(computeCookability(latte, [], []).category).not.toBe("ready");
    expect(computeCookability(latte, [], []).equipmentMissing).toEqual(["Espresso Machine, Moka Pot or AeroPress"]);
    expect(computeCookability(latte, [], ["AeroPress"]).category).toBe("ready");
    expect(hasRequiredEquipment(["AeroPress"], latte)).toBe(true);
    expect(missingEquipment([], latte)).toEqual(["Espresso Machine, Moka Pot or AeroPress"]);
  });
});
