import type { PantryCategory } from "@/types";

/** Pantry and Shopping group ingredients in this order. Typed as a Record so a new category can't be forgotten here. */
const CATEGORY_NOTES: Record<PantryCategory, string> = {
  "Coffee & Tea": "Beans, grounds, tea leaves, matcha",
  "Milk & Cream": "Milk, plant milks, cream, yoghurt",
  Fruit: "Fresh and dried fruit, citrus",
  "Juices & Sodas": "Juice, soda, tonic, sparkling water",
  "Sweeteners & Syrups": "Sugar, honey, syrups, sauces",
  "Spices & Flavourings": "Vanilla, cinnamon, cocoa, extracts",
  "Herbs & Garnish": "Mint, basil, edible garnish",
  "Ice & Frozen": "Ice, frozen fruit, ice cream",
  "Pantry Staples": "Everything else you keep on hand",
};

export const CATEGORY_ORDER: PantryCategory[] = Object.keys(CATEGORY_NOTES) as PantryCategory[];
export const DEFAULT_CATEGORY: PantryCategory = "Pantry Staples";
