export type StorageLocation = "Fridge" | "Freezer" | "Pantry";

/** Where an ingredient is filed in the pantry and on the shopping list. */
export type PantryCategory =
  | "Coffee & Tea"
  | "Milk & Cream"
  | "Fruit"
  | "Juices & Sodas"
  | "Sweeteners & Syrups"
  | "Spices & Flavourings"
  | "Herbs & Garnish"
  | "Ice & Frozen"
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
  | "Pitcher"
  | "Cezve"
  | "Phin Filter"
  | "South Indian Filter"
  | "Cloth Filter";

export type DietTag = "Vegan" | "Dairy-Free" | "Caffeine-Free" | "Low Sugar" | "Gluten-Free";

/**
 * Flavour tags used for taste-based filtering in Discover.
 * Deliberately small and mutually legible — no ML, just honest,
 * user-settable preference signals.
 */
export type TasteTag = "Sweet" | "Fruity" | "Creamy" | "Refreshing" | "Tangy" | "Bitter" | "Spicy" | "Herbal" | "Rich";

export interface OptionalEquipment {
  tag: EquipmentTag;
  /** What to do without it, in a short sentence, e.g. "Shake hard in a lidded jar." */
  without?: string;
}

/** One way to make a drink. */
export interface Method {
  /** Unique within the drink, e.g. "moka-pot" or "by-hand". */
  id: string;
  /** Short name shown on the picker, e.g. "Moka pot" or "By hand". */
  label: string;
  /** Everything this method needs — ALL of it. Empty = it needs no tracked equipment (a "by hand" method). */
  equipment: EquipmentTag[];
  /** Plain tools it uses that every kitchen has, listed for clarity: "a lidded jar", "a spoon". */
  handTools?: string[];
  /** Gear that makes this method better but is never needed, each with what to do without it. */
  optionalEquipment?: OptionalEquipment[];
  /** Set only when this method's amounts or ingredients differ from the drink's standard list. */
  ingredients?: RecipeIngredient[];
  /** Waiting time (steeping, chilling) for this method, when it differs from the drink's own; 0 for a quick method. */
  waitMinutes?: number;
  steps: string[];
  /** A short note specific to this method. */
  notes?: string;
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
  /** Whether the drink is served hot or cold — shown as a flame or snowflake on its photo. */
  temperature: "hot" | "cold";
  /**
   * The ways to make the drink. Each method names the equipment it needs (none = by hand, with only a glass, a
   * spoon and the like), has its own steps, and may use different amounts. Someone who owns the gear for several
   * methods can pick between them; someone who owns none sees the by-hand method if there is one.
   */
  methods?: Method[];
  /**
   * Shorthand for a drink with exactly ONE way to make it: used only when `methods` is absent. `equipment` is what it
   * can't be made without, `optionalEquipment` what makes it better but is never needed, and `steps` the method.
   */
  equipment?: EquipmentTag[];
  optionalEquipment?: OptionalEquipment[];
  steps?: string[];
  /** Cultural/historical context and any other free-text detail that doesn't fit a structured field. */
  notes?: string;
  /** Name of the reference used when researching this recipe (a culinary institution, museum, publication, etc.) — informational, not shown as a link target unless sourceUrl is also set. */
  sourceName?: string;
  /** URL for sourceName, when the reference has a stable one. */
  sourceUrl?: string;
}
