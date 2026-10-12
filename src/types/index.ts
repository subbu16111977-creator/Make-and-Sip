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
  /**
   * True once this item's purchase has been merged into Pantry. Unchecking never reverses that, so
   * checking the item a second time must not merge it in again (which would double the quantity).
   */
  addedToPantry?: boolean;
  /** True when every recipe that asked for this item lists it as optional. */
  optional?: boolean;
  /** True for a "top up": the pantry already has some, and this is just the amount still short. */
  shortfall?: boolean;
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
 * Drink-making equipment a drink might need beyond a glass, a spoon and a saucepan — the gear not everyone owns.
 * A drink with an empty `equipment` array needs none of these and is always makeable, equipment-wise.
 */
export type EquipmentTag =
  | "Espresso Machine"
  | "Moka Pot"
  | "French Press"
  | "Pour-Over Dripper"
  | "Drip Coffee Maker"
  | "AeroPress"
  | "Cold Brew Pitcher"
  | "Coffee Grinder"
  | "Milk Frother"
  | "Electric Kettle"
  | "Teapot"
  | "Matcha Whisk"
  | "Blender"
  | "Juicer"
  | "Citrus Squeezer"
  | "Soda Maker"
  | "Ice Cream Scoop"
  | "Shaker"
  | "Muddler"
  | "Strainer"
  | "Jigger"
  | "Pitcher";

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

export interface OptionalEquipment {
  tag: EquipmentTag;
  /** What to do without it, in a short sentence, e.g. "Shake hard in a lidded jar." */
  without?: string;
}

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
  /** Equipment this drink can't be made without. Empty = always makeable, equipment-wise. */
  equipment: EquipmentTag[];
  /**
   * Equipment that makes the drink better or easier but isn't needed (an espresso machine for a latte that works
   * with strong moka-pot coffee, a shaker you can swap for a jar). Never blocks "Ready to make" and never lowers the
   * score. A tag never appears in both `equipment` and `optionalEquipment`.
   */
  optionalEquipment?: OptionalEquipment[];
  steps: string[];
  /** Cultural/historical context and any other free-text detail that doesn't fit a structured field. */
  notes?: string;
  /** Name of the reference used when researching this recipe (a culinary institution, museum, publication, etc.) — informational, not shown as a link target unless sourceUrl is also set. */
  sourceName?: string;
  /** URL for sourceName, when the reference has a stable one. */
  sourceUrl?: string;
}
