import React, { createContext, useCallback, useContext, useMemo } from "react";
import type { PantryCategory, RecipeIngredient, ShoppingItem, Unit } from "@/types";
import { usePantry } from "@/context/PantryContext";
import { AppBlank } from "@/components/AppBlank";
import { isShoppingItems } from "@/lib/persistedShapes";
import { usePersistedState } from "@/lib/usePersistedState";
import { normalizeIngredient, resolveIngredientById } from "@/lib/ingredientNormalize";
import {
  addMissingIngredientsFromRecipe,
  freshId,
  slugify,
  unmarkShoppingItemPurchased,
} from "@/lib/inventoryActions";

export interface NewShoppingItemInput {
  name: string;
  category: PantryCategory;
  quantity: number;
  unit: Unit;
}

interface ShoppingContextValue {
  items: ShoppingItem[];
  addItem: (input: NewShoppingItemInput) => void;
  /** Adds every not-yet-listed ingredient from `missing`, tagged with the recipe it came from. Dedupes by ingredient identity, not text. */
  addMissingFromRecipe: (recipeId: string, recipeTitle: string, missing: RecipeIngredient[]) => number;
  /** Checks/unchecks an item. Checking it also transfers it into Pantry (via PantryContext.receiveFromShopping) in the same action — see the module doc below for why unchecking doesn't reverse that. */
  toggleChecked: (id: string) => void;
  removeItem: (id: string) => void;
  clearChecked: () => void;
}

const ShoppingContext = createContext<ShoppingContextValue | undefined>(undefined);

/**
 * Live shopping-list state, shared across Discover, Home, Pantry, and
 * the Shopping tab. Items land here two ways: typed in by hand from the
 * Shopping tab's own form, or added automatically when the user asks
 * to buy what a recipe is missing.
 *
 * This provider is nested inside `PantryProvider` (see `_layout.tsx`),
 * so it can call `usePantry()` directly — that's the whole fix for the
 * old "Shopping never updates Pantry" bug: checking an item off calls
 * `pantry.receiveFromShopping(...)` right here, in the same user action,
 * instead of the two tabs maintaining disconnected state.
 *
 * Unchecking a purchased item deliberately does NOT reach back into
 * Pantry and remove anything (see `unmarkShoppingItemPurchased` in
 * `@/lib/inventoryActions` for the reasoning) — this app has no way to
 * know whether that pantry item already existed before the purchase, so
 * the safe default is to never silently erase inventory. The user can
 * always remove it from the Pantry tab directly if that's what they want.
 */
export function ShoppingProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems, hydrated] = usePersistedState<ShoppingItem[]>("mise.shopping.v1", [], isShoppingItems);
  const pantry = usePantry();

  const addItem = useCallback((input: NewShoppingItemInput) => {
    const normalized = normalizeIngredient(input.name);
    const ingredientId = normalized.ingredientId ?? slugify(input.name);

    setItems((prev) => {
      const existingIds = new Set(prev.map((item) => item.id));
      const id = freshId(existingIds, slugify(input.name));
      const newItem: ShoppingItem = {
        id,
        name: input.name.trim(),
        amount: `${input.quantity} ${input.unit}`,
        category: input.category,
        checked: false,
        ingredientId,
        requestedQuantity: input.quantity,
        requestedUnit: input.unit,
        sourceRecipeIds: [],
      };
      return [newItem, ...prev];
    });
  }, [setItems]);

  const addMissingFromRecipe = useCallback((recipeId: string, recipeTitle: string, missing: RecipeIngredient[]) => {
    let added = 0;
    setItems((prev) => {
      const result = addMissingIngredientsFromRecipe(prev, recipeId, recipeTitle, missing);
      added = result.addedCount;
      return result.items;
    });
    return added;
  }, [setItems]);

  const toggleChecked = useCallback(
    (id: string) => {
      const target = items.find((item) => item.id === id);
      if (!target) return;

      if (target.checked) {
        setItems((prev) => unmarkShoppingItemPurchased(prev, id));
        return;
      }

      // Check it off AND transfer it into Pantry in the same action —
      // both state updates are triggered from this one event handler, so
      // React commits them together and every subscribed screen
      // (Discover, Pantry, Shopping) re-renders in the same pass. No
      // in-between moment where Shopping shows "purchased" but Pantry
      // hasn't caught up.
      setItems((prev) => prev.map((item) => (item.id === id ? { ...item, checked: true, addedToPantry: true } : item)));

      // Only transfer the first time. If this item was checked before and then unchecked, its
      // quantity is already in Pantry (unchecking never removes it), so re-checking must not add it again.
      if (target.addedToPantry) return;

      pantry.receiveFromShopping({
        ingredientId: target.ingredientId,
        displayName: resolveIngredientById(target.ingredientId)?.displayName ?? target.name,
        quantity: target.requestedQuantity,
        unit: target.requestedUnit,
        category: target.category,
      });
    },
    [items, pantry, setItems]
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, [setItems]);

  const clearChecked = useCallback(() => {
    setItems((prev) => prev.filter((item) => !item.checked));
  }, [setItems]);

  const value = useMemo(
    () => ({ items, addItem, addMissingFromRecipe, toggleChecked, removeItem, clearChecked }),
    [items, addItem, addMissingFromRecipe, toggleChecked, removeItem, clearChecked]
  );

  if (!hydrated) return <AppBlank />;

  return <ShoppingContext.Provider value={value}>{children}</ShoppingContext.Provider>;
}

export function useShopping(): ShoppingContextValue {
  const ctx = useContext(ShoppingContext);
  if (!ctx) {
    throw new Error("useShopping must be used within a ShoppingProvider");
  }
  return ctx;
}
