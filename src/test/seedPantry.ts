import type { PantryItem } from "@/types";

/** A small pantry of everyday drink ingredients, used only by tests. */
const item = (ingredientId: string, name: string, category: PantryItem["category"], quantity: number, unit: PantryItem["unit"], location: PantryItem["location"]): PantryItem => ({
  id: ingredientId,
  ingredientId,
  name,
  category,
  quantity,
  unit,
  location,
  purchaseDate: "2026-01-01T00:00:00.000Z",
  expiryDate: "2027-01-01T00:00:00.000Z",
  quantityKnown: true,
  source: "seed",
});

export const seedPantry: PantryItem[] = [
  item("milk", "Milk", "Milk & Cream", 1000, "ml", "Fridge"),
  item("ground-coffee", "Ground coffee", "Coffee & Tea", 250, "g", "Pantry"),
  item("sugar", "Sugar", "Sweeteners & Syrups", 1000, "g", "Pantry"),
  item("lemon", "Lemons", "Fruit", 4, "pcs", "Fridge"),
  item("ice", "Ice", "Ice & Frozen", 1, "pack", "Freezer"),
  item("honey", "Honey", "Sweeteners & Syrups", 300, "g", "Pantry"),
];
