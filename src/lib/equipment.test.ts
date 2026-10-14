import { describe, expect, it } from "vitest";
import { EQUIPMENT_HELP, EQUIPMENT_TAGS, isEquipmentTag, sanitizeEquipment } from "@/lib/equipment";
import { isEquipmentTags } from "@/lib/persistedShapes";

const RETIRED_FOOD_GEAR = ["Oven", "Microwave", "Food Processor", "Stand Mixer", "Air Fryer", "Pressure Cooker", "Rice Cooker", "Grill", "Slow Cooker", "Toaster"];

describe("drink equipment", () => {
  it("lists only drink-making gear, each with a description and no duplicates", () => {
    expect(EQUIPMENT_TAGS.length).toBe(26);
    expect(new Set(EQUIPMENT_TAGS).size).toBe(EQUIPMENT_TAGS.length);
    for (const tag of EQUIPMENT_TAGS) expect(EQUIPMENT_HELP[tag].length).toBeGreaterThan(5);
    for (const old of RETIRED_FOOD_GEAR) expect(EQUIPMENT_TAGS as readonly string[]).not.toContain(old);
  });
  it("covers coffee, tea, blending, juicing, fizz and bar-style tools", () => {
    for (const tag of ["Espresso Machine", "French Press", "Electric Kettle", "Teapot", "Blender", "Juicer", "Soda Maker", "Shaker", "Muddler"]) {
      expect(isEquipmentTag(tag)).toBe(true);
    }
  });
  it("drops equipment saved by the food app instead of failing", () => {
    expect(sanitizeEquipment(["Oven", "Blender", "Time Machine", "Teapot", 7])).toEqual(["Blender", "Teapot"]);
  });
  it("storage shape check accepts known tags only", () => {
    expect(isEquipmentTags(["Blender", "Shaker"])).toBe(true);
    expect(isEquipmentTags(["Oven"])).toBe(false);
  });
});
