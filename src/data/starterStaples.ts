import type { NewPantryItemInput } from "@/context/PantryContext";

/** Everyday basics offered as one-tap adds on an empty pantry. Names must resolve to registry ingredients. */
export const STARTER_STAPLES: NewPantryItemInput[] = [
  { name: "Ground coffee", category: "Coffee & Tea", quantity: 250, unit: "g", location: "Pantry", expiresInDays: 90 },
  { name: "Milk", category: "Milk & Cream", quantity: 1, unit: "l", location: "Fridge", expiresInDays: 7 },
  { name: "Sugar", category: "Sweeteners & Syrups", quantity: 500, unit: "g", location: "Pantry", expiresInDays: 365 },
  { name: "Ice", category: "Ice & Frozen", quantity: 1, unit: "kg", location: "Freezer", expiresInDays: 60 },
  { name: "Water", category: "Pantry Staples", quantity: 5, unit: "l", location: "Pantry", expiresInDays: 365 },
];
