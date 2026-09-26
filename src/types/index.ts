export type StorageLocation = "Fridge" | "Freezer" | "Pantry";

export type PantryCategory =
  | "Vegetables"
  | "Fruit"
  | "Dairy"
  | "Grains"
  | "Pulses"
  | "Spices"
  | "Meat & Seafood"
  | "Frozen"
  | "Pantry Staples";

export type Unit =
  | "g"
  | "kg"
  | "ml"
  | "l"
  | "pcs"
  | "tsp"
  | "tbsp"
  | "cup"
  | "bunch"
  | "clove"
  | "can"
  | "pack";

/** Where a pantry item came from — informational only, never used for matching. */
export type PantryItemSource = "seed" | "manual" | "shopping";

export interface PantryItem {
  id: string;
  name: string;
  category: PantryCategory;
  quantity: number;
  unit: Unit;
  /** False when quantity/unit are placeholders because the user never entered a real amount — an unknown quantity still counts as "have", never "missing". */
  quantityKnown: boolean;
  location: StorageLocation;
  purchaseDate: string; // ISO date
  expiryDate: string; // ISO date
  notes?: string;
  /**
   * The canonical ingredient this item is an instance of — the shared
   * identity key Discover matches recipe ingredients against. Resolved
   * once at creation time via `normalizeIngredient`/the ingredient
   * registry; never re-derived from `name` at read time.
   */
  ingredientId: string;
  source: PantryItemSource;
}

export interface ShoppingItem {
  id: string;
  name: string;
  /** Free-text amount, e.g. "400 g" or "2 pcs" — mirrors how recipe ingredients describe quantity. */
  amount: string;
  category: PantryCategory;
  checked: boolean;
  /** Recipe title this item was auto-added from, if any — for provenance ("from Chicken Biryani"). */
  fromRecipe?: string;
  /**
   * The canonical ingredient this shopping item resolves to — the same
   * identity key used by Pantry and recipe ingredients. Set for every
   * item, whether typed by hand or added from a recipe.
   */
  ingredientId: string;
  requestedQuantity: number | null;
  requestedUnit: string | null;
  /** Every recipe this item was pulled in from — a chicken added from two recipes stays one shopping item. */
  sourceRecipeIds: string[];
}

export type Difficulty = "Easy" | "Medium" | "Advanced";
export type Budget = "$" | "$$" | "$$$";

/**
 * Kitchen appliances a dish might need beyond a basic stovetop, knife,
 * and pot — the stuff not everyone owns. A recipe with an empty
 * `equipment` array needs none of these; a plain stovetop/oven-free
 * dish is always makeable regardless of what's checked in Equipment.
 */
export type EquipmentTag =
  | "Oven"
  | "Microwave"
  | "Blender"
  | "Food Processor"
  | "Stand Mixer"
  | "Air Fryer"
  | "Pressure Cooker"
  | "Rice Cooker"
  | "Grill"
  | "Slow Cooker"
  | "Toaster";

export type DietTag =
  | "Vegetarian"
  | "Vegan"
  | "Pescatarian"
  | "Non-Vegetarian"
  | "Gluten-Free"
  | "Dairy-Free";

/**
 * Flavor-profile tags used for taste-based filtering in Discover.
 * Deliberately small and mutually legible — no ML, just honest,
 * user-settable preference signals.
 */
export type TasteTag =
  | "Spicy"
  | "Comforting"
  | "Fresh & Light"
  | "Rich & Indulgent"
  | "Tangy"
  | "Smoky"
  | "Sweet"
  | "Herby";

export interface RecipeIngredient {
  /** Matches a PantryItem id when the user could plausibly have it on hand. */
  pantryId: string;
  label: string;
  amount: string;
  optional?: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  cuisine: string;
  dietTags: DietTag[];
  tasteTags: TasteTag[];
  /** Active time (prep + cook) — drives the quick "X min" badge on cards and Discover's tie-break sort. */
  timeMinutes: number;
  prepMinutes: number;
  cookMinutes: number;
  /** Passive resting/marinating time, on top of timeMinutes — only set when a recipe actually has one. */
  marinateMinutes?: number;
  difficulty: Difficulty;
  servings: number;
  /** A yield in its own natural unit ("2 quarts", "1 loaf", "8 tacos") — set only when that reads better than a serving count. */
  yield?: string;
  budget: Budget;
  image: string;
  imageAttribution?: string;
  ingredients: RecipeIngredient[];
  /** Specialty appliances this dish needs, beyond a basic stovetop. Empty = always makeable, equipment-wise. */
  equipment: EquipmentTag[];
  steps: string[];
  notes?: string;
}
