import type { EquipmentTag } from "@/types";

/**
 * Every piece of drink-making equipment the app knows, in the order it is shown, with a short line on what it is for.
 * Typed as a Record so adding a tag to `EquipmentTag` without describing it here fails the type check.
 */
export const EQUIPMENT_HELP: Record<EquipmentTag, string> = {
  "Espresso Machine": "Espresso, lattes, cappuccinos",
  "Moka Pot": "Stovetop espresso-style coffee",
  "French Press": "Full-bodied coffee and loose-leaf tea",
  "Pour-Over Dripper": "V60, Chemex or Kalita filter coffee",
  "Drip Coffee Maker": "Batch filter coffee",
  AeroPress: "Clean, quick single cups",
  "Cold Brew Pitcher": "Slow, smooth cold brew",
  "Coffee Grinder": "Fresh grounds from whole beans",
  "Milk Frother": "Foamed milk for lattes and chai",
  "Electric Kettle": "Hot water on demand",
  Teapot: "Brewing loose-leaf tea",
  "Matcha Whisk": "Smooth, lump-free matcha",
  Blender: "Smoothies, shakes, frozen drinks",
  Juicer: "Fresh-pressed fruit and veg juice",
  "Citrus Squeezer": "Lemon, lime and orange juice",
  "Soda Maker": "Sparkling water and homemade soda",
  "Ice Cream Scoop": "Thick shakes and floats",
  Shaker: "Shaken mocktails and iced drinks",
  Muddler: "Crushing mint, fruit and sugar",
  Strainer: "Straining shaken or steeped drinks",
  Jigger: "Measuring small pours accurately",
  Pitcher: "Lemonades, coolers, big batches",
};

export const EQUIPMENT_TAGS: readonly EquipmentTag[] = Object.keys(EQUIPMENT_HELP) as EquipmentTag[];

export function isEquipmentTag(value: unknown): value is EquipmentTag {
  return typeof value === "string" && (EQUIPMENT_TAGS as readonly string[]).includes(value);
}

/** Keeps only the tags the app still knows (equipment saved by an older version, e.g. "Oven", is dropped). */
export function sanitizeEquipment(value: readonly unknown[]): EquipmentTag[] {
  return value.filter(isEquipmentTag);
}
