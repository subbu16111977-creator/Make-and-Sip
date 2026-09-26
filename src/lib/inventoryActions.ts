import type { PantryCategory, PantryItem, PantryItemSource, RecipeIngredient, ShoppingItem, StorageLocation, Unit } from "@/types";
import { normalizeIngredient, resolveIngredientById } from "@/lib/ingredientNormalize";
import type { ShortfallRequest } from "@/lib/pantryMatch";

/**
 * Central, framework-free inventory actions — the "actions/services"
 * layer the architecture calls for. PantryContext and ShoppingContext
 * are thin React wrappers around these: state lives in `useState`, but
 * every decision about what a mutation actually DOES lives here, where
 * it can be unit-tested without rendering anything.
 */

export function slugify(text: string): string {
  return (
    text
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "item"
  );
}

function isoDaysFromNow(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

export function freshId(existingIds: Set<string>, base: string): string {
  let id = base;
  let suffix = 2;
  while (existingIds.has(id)) {
    id = `${base}-${suffix}`;
    suffix += 1;
  }
  return id;
}

// ---------------------------------------------------------------------------
// Action 1 — addPantryItem (manual entry from the Pantry tab)
// ---------------------------------------------------------------------------

export interface AddPantryItemInput {
  name: string;
  quantity: number;
  unit: Unit;
  category: PantryCategory;
  location: StorageLocation;
  expiresInDays: number;
}

export interface AddPantryItemResult {
  items: PantryItem[];
  item: PantryItem;
  /** True when this merged into an existing item rather than creating a new one. */
  merged: boolean;
}

/**
 * Parses and normalizes the input, resolves (or creates) the ingredient
 * identity, and either merges into an existing pantry item for that
 * ingredient or creates a new one. Never creates a duplicate pantry item
 * for the same ingredient identity.
 */
export function addPantryItem(items: PantryItem[], input: AddPantryItemInput): AddPantryItemResult {
  const normalized = normalizeIngredient(input.name);
  const ingredientId = normalized.ingredientId ?? slugify(input.name);

  return addOrMergeItem(items, {
    ingredientId,
    displayName: input.name.trim(),
    quantity: input.quantity,
    unit: input.unit,
    quantityKnown: true,
    category: input.category,
    location: input.location,
    expiresInDays: input.expiresInDays,
    source: "manual",
  });
}

export interface AddOrMergeItemInput {
  ingredientId: string;
  displayName: string;
  quantity: number | null;
  unit: string | null;
  quantityKnown: boolean;
  category: PantryCategory;
  location: StorageLocation;
  expiresInDays: number;
  source: PantryItemSource;
}

const KNOWN_UNITS = new Set<Unit>(["g", "kg", "ml", "l", "pcs", "tsp", "tbsp", "cup", "bunch", "clove", "can", "pack"]);
function asKnownUnit(unit: string | null): Unit {
  return unit && KNOWN_UNITS.has(unit as Unit) ? (unit as Unit) : "pcs";
}

/**
 * The low-level primitive both `addPantryItem` (manual entry) and
 * `markShoppingItemPurchased` (Shopping -> Pantry transfer) build on.
 * Merges by `ingredientId` — never by name text — so "chicken" typed by
 * hand and "chicken" purchased from a recipe's shopping list land in the
 * exact same pantry row.
 */
export function addOrMergeItem(items: PantryItem[], input: AddOrMergeItemInput): AddOrMergeItemResult {
  const existingIndex = items.findIndex((i) => i.ingredientId === input.ingredientId);

  if (existingIndex === -1) {
    const existingIds = new Set(items.map((i) => i.id));
    const newItem: PantryItem = {
      id: freshId(existingIds, slugify(input.ingredientId)),
      name: input.displayName,
      category: input.category,
      quantity: input.quantity ?? 1,
      unit: asKnownUnit(input.unit),
      quantityKnown: input.quantityKnown,
      location: input.location,
      purchaseDate: isoDaysFromNow(0),
      expiryDate: isoDaysFromNow(input.expiresInDays),
      ingredientId: input.ingredientId,
      source: input.source,
    };
    return { items: [newItem, ...items], item: newItem, merged: false };
  }

  const existing = items[existingIndex];
  const sameUnit = input.quantityKnown && existing.quantityKnown && asKnownUnit(input.unit) === existing.unit;

  const merged: PantryItem = sameUnit
    ? {
        ...existing,
        quantity: existing.quantity + (input.quantity ?? 0),
        location: input.location,
        expiryDate: isoDaysFromNow(input.expiresInDays),
      }
    : {
        // Quantities aren't in comparable units (or one side is unknown) —
        // keep the existing amount rather than guess, but still refresh
        // the metadata that's safe to refresh.
        ...existing,
        quantityKnown: existing.quantityKnown || input.quantityKnown,
        location: input.location,
        expiryDate: isoDaysFromNow(input.expiresInDays),
      };

  const nextItems = [...items];
  nextItems[existingIndex] = merged;
  return { items: nextItems, item: merged, merged: true };
}

export interface AddOrMergeItemResult {
  items: PantryItem[];
  item: PantryItem;
  merged: boolean;
}

// ---------------------------------------------------------------------------
// Action 2 — addMissingIngredientsFromRecipe
// ---------------------------------------------------------------------------

function guessCategory(label: string): PantryCategory {
  const l = label.toLowerCase();
  if (/(chicken|beef|pork|shrimp|prawn|salmon|fish|tofu|paneer|egg)/.test(l)) return "Meat & Seafood";
  if (/(milk|cheese|yogurt|yoghurt|butter|cream|feta|mozzarella|parmesan)/.test(l)) return "Dairy";
  if (/(rice|flour|pasta|noodle|bread|oats|lentil|dal|beans|chickpea|quinoa)/.test(l)) return "Grains";
  if (/(lentil|dal|chickpea|bean)/.test(l)) return "Pulses";
  if (/(cumin|turmeric|pepper|chili|chilli|spice|paprika|cinnamon|cardamom|masala|salt)/.test(l)) return "Spices";
  if (/(apple|banana|berry|berries|mango|orange|lemon|lime|fruit|grape|peach)/.test(l)) return "Fruit";
  if (/(frozen)/.test(l)) return "Frozen";
  if (/(oil|vinegar|sauce|honey|sugar|stock|broth|paste|can|tin|chocolate|nut|walnut|almond|cashew|seed|cracker|honey)/.test(l))
    return "Pantry Staples";
  return "Vegetables";
}

export interface AddMissingResult {
  items: ShoppingItem[];
  addedCount: number;
}

/**
 * Adds every ingredient in `missing` to the shopping list, keyed by
 * ingredientId — never by the recipe's raw display text. An ingredient
 * already on the list (from this recipe or another) gets this recipe
 * added to its `sourceRecipeIds` instead of a duplicate row.
 *
 * Items are named with the ingredient's standard name ("Vegetable Oil"), not the
 * recipe's full sentence, and carry `optional` when the recipe lists them as optional.
 * `shortfalls` are "top ups": ingredients the pantry has some of, added as just the amount still short.
 */
export function addMissingIngredientsFromRecipe(
  shoppingItems: ShoppingItem[],
  recipeId: string,
  recipeTitle: string,
  missing: RecipeIngredient[],
  shortfalls: ShortfallRequest[] = []
): AddMissingResult {
  let items = [...shoppingItems];
  let addedCount = 0;

  const requests = [
    ...missing.map((ingredient) => ({ ingredient, shortfall: null as ShortfallRequest | null })),
    ...shortfalls.map((shortfall) => ({ ingredient: shortfall.ingredient, shortfall })),
  ];

  for (const { ingredient, shortfall } of requests) {
    // A top-up is filed under the pantry item's own ingredient, so buying it merges into that item.
    const ingredientId = shortfall ? shortfall.ingredientId : ingredient.pantryId;
    const existingIndex = items.findIndex((i) => i.ingredientId === ingredientId && !i.checked);

    if (existingIndex >= 0) {
      const existing = items[existingIndex];
      items[existingIndex] = {
        ...existing,
        sourceRecipeIds: existing.sourceRecipeIds.includes(recipeId)
          ? existing.sourceRecipeIds
          : [...existing.sourceRecipeIds, recipeId],
        // Once any recipe needs it as a required item, it stops being "optional".
        optional: existing.optional && ingredient.optional ? true : undefined,
      };
      continue;
    }

    const registryEntry = resolveIngredientById(ingredientId);
    const name = registryEntry?.displayName ?? ingredient.label;
    const existingIds = new Set(items.map((i) => i.id));

    let amount = ingredient.amount;
    let requestedQuantity: number | null;
    let requestedUnit: string | null;
    if (shortfall) {
      amount = `${shortfall.quantity} ${shortfall.unit}`;
      requestedQuantity = shortfall.quantity;
      requestedUnit = shortfall.unit;
    } else {
      const parsed = normalizeIngredient(`${ingredient.amount} ${ingredient.label}`);
      requestedQuantity = parsed.quantity;
      requestedUnit = parsed.unit;
    }

    const newItem: ShoppingItem = {
      id: freshId(existingIds, slugify(name)),
      name,
      amount,
      category: registryEntry?.category ?? guessCategory(ingredient.label),
      checked: false,
      fromRecipe: recipeTitle,
      ingredientId,
      requestedQuantity,
      requestedUnit,
      sourceRecipeIds: [recipeId],
      ...(ingredient.optional && !shortfall ? { optional: true } : {}),
      ...(shortfall ? { shortfall: true } : {}),
    };
    items = [newItem, ...items];
    addedCount += 1;
  }

  return { items, addedCount };
}

// ---------------------------------------------------------------------------
// Action 3 / 4 — markShoppingItemPurchased / unmarkShoppingItemPurchased
// ---------------------------------------------------------------------------

export interface PurchaseResult {
  shoppingItems: ShoppingItem[];
  pantryItems: PantryItem[];
}

/**
 * Checks a shopping item off AND transfers it into Pantry, atomically
 * from the caller's perspective — both arrays come back updated from one
 * call, so there's never a moment where Shopping shows "purchased" but
 * Pantry (and therefore Discover) hasn't caught up yet.
 */
export function markShoppingItemPurchased(
  shoppingItems: ShoppingItem[],
  pantryItems: PantryItem[],
  shoppingItemId: string
): PurchaseResult {
  const item = shoppingItems.find((i) => i.id === shoppingItemId);
  if (!item || item.checked) return { shoppingItems, pantryItems };

  // Re-checking an item that was already purchased once (checked, then unchecked): its quantity is
  // already in Pantry — unchecking never removes it — so just tick it again, don't merge it twice.
  if (item.addedToPantry) {
    return {
      shoppingItems: shoppingItems.map((i) => (i.id === shoppingItemId ? { ...i, checked: true } : i)),
      pantryItems,
    };
  }

  const nextShopping = shoppingItems.map((i) =>
    i.id === shoppingItemId ? { ...i, checked: true, addedToPantry: true } : i
  );

  const registryEntry = resolveIngredientById(item.ingredientId);
  const { items: nextPantry } = addOrMergeItem(pantryItems, {
    ingredientId: item.ingredientId,
    displayName: registryEntry?.displayName ?? item.name,
    quantity: item.requestedQuantity,
    unit: item.requestedUnit,
    quantityKnown: item.requestedQuantity !== null,
    category: item.category,
    location: "Pantry",
    expiresInDays: 14,
    source: "shopping",
  });

  return { shoppingItems: nextShopping, pantryItems: nextPantry };
}

/**
 * Unchecks a shopping item. Deliberately does NOT touch Pantry: the app
 * has no reliable way to tell whether the pantry item already existed
 * before this purchase (manually added, left over from a previous
 * purchase, etc.), and silently deleting inventory the user may still
 * have is worse than leaving a stale "purchased" pantry entry around.
 * The safe default is to keep Pantry inventory until the user explicitly
 * removes it from the Pantry tab.
 */
export function unmarkShoppingItemPurchased(shoppingItems: ShoppingItem[], shoppingItemId: string): ShoppingItem[] {
  return shoppingItems.map((i) => (i.id === shoppingItemId ? { ...i, checked: false } : i));
}

// ---------------------------------------------------------------------------
// Action 5 — removePantryItem
// ---------------------------------------------------------------------------

export function removePantryItem(items: PantryItem[], id: string): PantryItem[] {
  return items.filter((item) => item.id !== id);
}
