import type { NewPantryItemInput } from "@/context/PantryContext";

/** Everyday basics offered as one-tap adds on an empty pantry. Names resolve to registry ingredients. */
export const STARTER_STAPLES: NewPantryItemInput[] = [
  { name: "Salt", category: "Pantry Staples", quantity: 1, unit: "pack", location: "Pantry", expiresInDays: 365 },
  { name: "Black pepper", category: "Spices", quantity: 1, unit: "pack", location: "Pantry", expiresInDays: 365 },
  { name: "Olive oil", category: "Pantry Staples", quantity: 500, unit: "ml", location: "Pantry", expiresInDays: 365 },
  { name: "Vegetable oil", category: "Pantry Staples", quantity: 1, unit: "l", location: "Pantry", expiresInDays: 365 },
  { name: "Onion", category: "Vegetables", quantity: 3, unit: "pcs", location: "Pantry", expiresInDays: 14 },
  { name: "Garlic", category: "Vegetables", quantity: 1, unit: "pack", location: "Pantry", expiresInDays: 21 },
  { name: "Tomato", category: "Vegetables", quantity: 4, unit: "pcs", location: "Fridge", expiresInDays: 7 },
  { name: "Eggs", category: "Dairy", quantity: 6, unit: "pcs", location: "Fridge", expiresInDays: 21 },
  { name: "Butter", category: "Dairy", quantity: 250, unit: "g", location: "Fridge", expiresInDays: 60 },
  { name: "Milk", category: "Dairy", quantity: 1, unit: "l", location: "Fridge", expiresInDays: 7 },
  { name: "Rice", category: "Grains", quantity: 1, unit: "kg", location: "Pantry", expiresInDays: 365 },
  { name: "All purpose flour", category: "Grains", quantity: 1, unit: "kg", location: "Pantry", expiresInDays: 240 },
  { name: "Sugar", category: "Pantry Staples", quantity: 1, unit: "kg", location: "Pantry", expiresInDays: 365 },
];
