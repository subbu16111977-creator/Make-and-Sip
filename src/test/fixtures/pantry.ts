// Test fixture: the retired Mise seed pantry, used only by tests.
import type { PantryItem } from "@/types";

/** ISO date `n` days from now — keeps "expiring soon" data honest whenever the app runs. */
function inDays(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString();
}
function daysAgo(n: number): string {
  return inDays(-n);
}

/**
 * Seed pantry — 46 everyday ingredients across all nine storage
 * categories. A handful are set to expire within the next few days so
 * the "Use these first" and hero-matching logic has real signal.
 */
export const pantryItems: PantryItem[] = [
  // Vegetables
  { id: "cherry-tomato", ingredientId: "cherry-tomato", name: "Cherry tomatoes", category: "Vegetables", quantity: 250, unit: "g", location: "Fridge", purchaseDate: daysAgo(4), expiryDate: inDays(2), quantityKnown: true, source: "seed" },
  { id: "red-onion", ingredientId: "red-onion", name: "Red onion", category: "Vegetables", quantity: 4, unit: "pcs", location: "Pantry", purchaseDate: daysAgo(6), expiryDate: inDays(20), quantityKnown: true, source: "seed" },
  { id: "garlic", ingredientId: "garlic", name: "Garlic", category: "Vegetables", quantity: 1, unit: "pack", location: "Pantry", purchaseDate: daysAgo(10), expiryDate: inDays(45), quantityKnown: true, source: "seed" },
  { id: "ginger", ingredientId: "ginger", name: "Ginger", category: "Vegetables", quantity: 120, unit: "g", location: "Fridge", purchaseDate: daysAgo(5), expiryDate: inDays(18), quantityKnown: true, source: "seed" },
  { id: "bell-pepper", ingredientId: "bell-pepper", name: "Bell pepper", category: "Vegetables", quantity: 3, unit: "pcs", location: "Fridge", purchaseDate: daysAgo(4), expiryDate: inDays(3), quantityKnown: true, source: "seed" },
  { id: "spinach", ingredientId: "spinach", name: "Spinach", category: "Vegetables", quantity: 1, unit: "bunch", location: "Fridge", purchaseDate: daysAgo(3), expiryDate: inDays(2), quantityKnown: true, source: "seed" },
  { id: "red-cabbage", ingredientId: "red-cabbage", name: "Red cabbage", category: "Vegetables", quantity: 1, unit: "pcs", location: "Fridge", purchaseDate: daysAgo(3), expiryDate: inDays(10), quantityKnown: true, source: "seed" },
  { id: "sweet-potato", ingredientId: "sweet-potato", name: "Sweet potato", category: "Vegetables", quantity: 3, unit: "pcs", location: "Pantry", purchaseDate: daysAgo(2), expiryDate: inDays(14), quantityKnown: true, source: "seed" },
  { id: "cucumber", ingredientId: "cucumber", name: "Cucumber", category: "Vegetables", quantity: 2, unit: "pcs", location: "Fridge", purchaseDate: daysAgo(3), expiryDate: inDays(6), quantityKnown: true, source: "seed" },
  { id: "green-chili", ingredientId: "green-chili", name: "Green chili", category: "Vegetables", quantity: 8, unit: "pcs", location: "Fridge", purchaseDate: daysAgo(4), expiryDate: inDays(5), quantityKnown: true, source: "seed" },

  // Fruit
  { id: "lemon", ingredientId: "lemon", name: "Lemon", category: "Fruit", quantity: 5, unit: "pcs", location: "Fridge", purchaseDate: daysAgo(4), expiryDate: inDays(12), quantityKnown: true, source: "seed" },
  { id: "lime", ingredientId: "lime", name: "Lime", category: "Fruit", quantity: 6, unit: "pcs", location: "Fridge", purchaseDate: daysAgo(5), expiryDate: inDays(9), quantityKnown: true, source: "seed" },
  { id: "avocado", ingredientId: "avocado", name: "Avocado", category: "Fruit", quantity: 3, unit: "pcs", location: "Pantry", purchaseDate: daysAgo(3), expiryDate: inDays(3), quantityKnown: true, source: "seed" },
  { id: "banana", ingredientId: "banana", name: "Banana", category: "Fruit", quantity: 5, unit: "pcs", location: "Pantry", purchaseDate: daysAgo(3), expiryDate: inDays(4), quantityKnown: true, source: "seed" },
  { id: "orange", ingredientId: "orange", name: "Orange", category: "Fruit", quantity: 4, unit: "pcs", location: "Fridge", purchaseDate: daysAgo(2), expiryDate: inDays(15), quantityKnown: true, source: "seed" },

  // Dairy
  { id: "greek-yogurt", ingredientId: "greek-yogurt", name: "Greek yogurt", category: "Dairy", quantity: 500, unit: "g", location: "Fridge", purchaseDate: daysAgo(3), expiryDate: inDays(7), quantityKnown: true, source: "seed" },
  { id: "feta", ingredientId: "feta", name: "Feta", category: "Dairy", quantity: 200, unit: "g", location: "Fridge", purchaseDate: daysAgo(6), expiryDate: inDays(16), quantityKnown: true, source: "seed" },
  { id: "butter", ingredientId: "butter", name: "Butter", category: "Dairy", quantity: 250, unit: "g", location: "Fridge", purchaseDate: daysAgo(8), expiryDate: inDays(40), quantityKnown: true, source: "seed" },
  { id: "milk", ingredientId: "milk", name: "Whole milk", category: "Dairy", quantity: 1, unit: "l", location: "Fridge", purchaseDate: daysAgo(2), expiryDate: inDays(5), quantityKnown: true, source: "seed" },
  { id: "paneer", ingredientId: "paneer", name: "Paneer", category: "Dairy", quantity: 200, unit: "g", location: "Fridge", purchaseDate: daysAgo(3), expiryDate: inDays(4), quantityKnown: true, source: "seed" },

  // Grains
  { id: "basmati-rice", ingredientId: "basmati-rice", name: "Basmati rice", category: "Grains", quantity: 2, unit: "kg", location: "Pantry", purchaseDate: daysAgo(30), expiryDate: inDays(300), quantityKnown: true, source: "seed" },
  { id: "rolled-oats", ingredientId: "rolled-oats", name: "Rolled oats", category: "Grains", quantity: 500, unit: "g", location: "Pantry", purchaseDate: daysAgo(20), expiryDate: inDays(200), quantityKnown: true, source: "seed" },
  { id: "sourdough-bread", ingredientId: "sourdough-bread", name: "Sourdough loaf", category: "Grains", quantity: 1, unit: "pcs", location: "Pantry", purchaseDate: daysAgo(2), expiryDate: inDays(3), quantityKnown: true, source: "seed" },
  { id: "roti-flour", ingredientId: "roti-flour", name: "Whole wheat atta", category: "Grains", quantity: 5, unit: "kg", location: "Pantry", purchaseDate: daysAgo(15), expiryDate: inDays(150), quantityKnown: true, source: "seed" },

  // Pulses
  { id: "chickpeas-canned", ingredientId: "chickpeas-canned", name: "Chickpeas", category: "Pulses", quantity: 3, unit: "can", location: "Pantry", purchaseDate: daysAgo(40), expiryDate: inDays(400), quantityKnown: true, source: "seed" },
  { id: "toor-dal", ingredientId: "toor-dal", name: "Toor dal", category: "Pulses", quantity: 1, unit: "kg", location: "Pantry", purchaseDate: daysAgo(25), expiryDate: inDays(250), quantityKnown: true, source: "seed" },
  { id: "red-lentils", ingredientId: "red-lentils", name: "Red lentils", category: "Pulses", quantity: 750, unit: "g", location: "Pantry", purchaseDate: daysAgo(18), expiryDate: inDays(220), quantityKnown: true, source: "seed" },
  { id: "black-beans-canned", ingredientId: "black-beans-canned", name: "Black beans", category: "Pulses", quantity: 2, unit: "can", location: "Pantry", purchaseDate: daysAgo(40), expiryDate: inDays(400), quantityKnown: true, source: "seed" },

  // Spices
  { id: "turmeric", ingredientId: "turmeric", name: "Turmeric", category: "Spices", quantity: 100, unit: "g", location: "Pantry", purchaseDate: daysAgo(60), expiryDate: inDays(300), quantityKnown: true, source: "seed" },
  { id: "cumin-seeds", ingredientId: "cumin-seeds", name: "Cumin seeds", category: "Spices", quantity: 80, unit: "g", location: "Pantry", purchaseDate: daysAgo(50), expiryDate: inDays(280), quantityKnown: true, source: "seed" },
  { id: "red-curry-paste", ingredientId: "red-curry-paste", name: "Red curry paste", category: "Spices", quantity: 1, unit: "pack", location: "Pantry", purchaseDate: daysAgo(15), expiryDate: inDays(60), quantityKnown: true, source: "seed" },
  { id: "chili-flakes", ingredientId: "chili-flakes", name: "Chili flakes", category: "Spices", quantity: 60, unit: "g", location: "Pantry", purchaseDate: daysAgo(70), expiryDate: inDays(300), quantityKnown: true, source: "seed" },
  { id: "garam-masala", ingredientId: "garam-masala", name: "Garam masala", category: "Spices", quantity: 100, unit: "g", location: "Pantry", purchaseDate: daysAgo(45), expiryDate: inDays(200), quantityKnown: true, source: "seed" },
  { id: "black-pepper", ingredientId: "black-pepper", name: "Black pepper", category: "Spices", quantity: 90, unit: "g", location: "Pantry", purchaseDate: daysAgo(80), expiryDate: inDays(320), quantityKnown: true, source: "seed" },

  // Meat & Seafood
  { id: "chicken-thigh", ingredientId: "chicken-thigh", name: "Chicken thigh", category: "Meat & Seafood", quantity: 600, unit: "g", location: "Fridge", purchaseDate: daysAgo(2), expiryDate: inDays(2), quantityKnown: true, source: "seed" },
  { id: "shrimp", ingredientId: "shrimp", name: "Shrimp", category: "Meat & Seafood", quantity: 400, unit: "g", location: "Fridge", purchaseDate: daysAgo(2), expiryDate: inDays(2), quantityKnown: true, source: "seed" },
  { id: "eggs", ingredientId: "eggs", name: "Eggs", category: "Meat & Seafood", quantity: 8, unit: "pcs", location: "Fridge", purchaseDate: daysAgo(6), expiryDate: inDays(12), quantityKnown: true, source: "seed" },

  // Frozen
  { id: "frozen-peas", ingredientId: "frozen-peas", name: "Frozen peas", category: "Frozen", quantity: 500, unit: "g", location: "Freezer", purchaseDate: daysAgo(30), expiryDate: inDays(120), quantityKnown: true, source: "seed" },
  { id: "frozen-corn", ingredientId: "frozen-corn", name: "Frozen corn", category: "Frozen", quantity: 400, unit: "g", location: "Freezer", purchaseDate: daysAgo(30), expiryDate: inDays(120), quantityKnown: true, source: "seed" },

  // Pantry staples
  { id: "olive-oil", ingredientId: "olive-oil", name: "Olive oil", category: "Pantry Staples", quantity: 1, unit: "l", location: "Pantry", purchaseDate: daysAgo(40), expiryDate: inDays(200), quantityKnown: true, source: "seed" },
  { id: "soy-sauce", ingredientId: "soy-sauce", name: "Soy sauce", category: "Pantry Staples", quantity: 500, unit: "ml", location: "Pantry", purchaseDate: daysAgo(35), expiryDate: inDays(250), quantityKnown: true, source: "seed" },
  { id: "coconut-milk-can", ingredientId: "coconut-milk-can", name: "Coconut milk", category: "Pantry Staples", quantity: 3, unit: "can", location: "Pantry", purchaseDate: daysAgo(20), expiryDate: inDays(300), quantityKnown: true, source: "seed" },
  { id: "honey", ingredientId: "honey", name: "Honey", category: "Pantry Staples", quantity: 350, unit: "g", location: "Pantry", purchaseDate: daysAgo(60), expiryDate: inDays(400), quantityKnown: true, source: "seed" },
  { id: "maple-syrup", ingredientId: "maple-syrup", name: "Maple syrup", category: "Pantry Staples", quantity: 250, unit: "ml", location: "Pantry", purchaseDate: daysAgo(40), expiryDate: inDays(300), quantityKnown: true, source: "seed" },
  { id: "sesame-oil", ingredientId: "sesame-oil", name: "Sesame oil", category: "Pantry Staples", quantity: 250, unit: "ml", location: "Pantry", purchaseDate: daysAgo(50), expiryDate: inDays(200), quantityKnown: true, source: "seed" },
  { id: "vegetable-stock", ingredientId: "vegetable-stock", name: "Vegetable stock", category: "Pantry Staples", quantity: 4, unit: "can", location: "Pantry", purchaseDate: daysAgo(25), expiryDate: inDays(180), quantityKnown: true, source: "seed" },
];
