import React, { createContext, useCallback, useContext, useMemo } from "react";
import type { PantryCategory, PantryItem, StorageLocation, Unit } from "@/types";
import { pantryItems as seedPantryItems } from "@/data/pantry";
import { AppBlank } from "@/components/AppBlank";
import { isPantryItems } from "@/lib/persistedShapes";
import { usePersistedState } from "@/lib/usePersistedState";
import { addOrMergeItem, addPantryItem as addPantryItemAction, removePantryItem as removePantryItemAction } from "@/lib/inventoryActions";

export interface NewPantryItemInput {
  name: string;
  category: PantryCategory;
  quantity: number;
  unit: Unit;
  location: StorageLocation;
  /** Days from today until this item expires. */
  expiresInDays: number;
}

export interface ReceiveFromShoppingInput {
  ingredientId: string;
  displayName: string;
  quantity: number | null;
  unit: string | null;
  category: PantryCategory;
}

interface PantryContextValue {
  items: PantryItem[];
  addItem: (input: NewPantryItemInput) => void;
  removeItem: (id: string) => void;
  /**
   * Called by Shopping when a purchase is checked off. Goes through the
   * same identity-aware merge logic as a manual add (dedup by
   * `ingredientId`, merge quantities when comparable), tagged
   * `source: "shopping"` — this is the one place Shopping is allowed to
   * touch Pantry, and it never bypasses this merge logic.
   */
  receiveFromShopping: (input: ReceiveFromShoppingInput) => void;
}

const PantryContext = createContext<PantryContextValue | undefined>(undefined);

/**
 * Live pantry state, shared across Home, Pantry, Discover, and Shopping.
 *
 * This is genuine app state (not a static mock): adding, removing, or
 * receiving an ingredient here immediately changes what Home shows as
 * "on hand", what Discover marks as available, and how recipes rank.
 * All identity resolution (free text -> canonical ingredient) and merge
 * logic lives in `@/lib/inventoryActions` — this context only owns the
 * `useState` and wires the two callers (the Pantry tab's manual-add
 * form, and Shopping's purchase flow) into it.
 *
 * It is saved on the device (see `usePersistedState`), so it survives an
 * app restart. The seed pantry is only used the very first time, or if
 * what's stored can't be read.
 */
export function PantryProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems, hydrated] = usePersistedState<PantryItem[]>("mise.pantry.v1", seedPantryItems, isPantryItems);

  const addItem = useCallback((input: NewPantryItemInput) => {
    setItems((prev) => addPantryItemAction(prev, input).items);
  }, [setItems]);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => removePantryItemAction(prev, id));
  }, [setItems]);

  const receiveFromShopping = useCallback((input: ReceiveFromShoppingInput) => {
    setItems(
      (prev) =>
        addOrMergeItem(prev, {
          ingredientId: input.ingredientId,
          displayName: input.displayName,
          quantity: input.quantity,
          unit: input.unit,
          quantityKnown: input.quantity !== null,
          category: input.category,
          location: "Pantry",
          expiresInDays: 14,
          source: "shopping",
        }).items
    );
  }, [setItems]);

  const value = useMemo(
    () => ({ items, addItem, removeItem, receiveFromShopping }),
    [items, addItem, removeItem, receiveFromShopping]
  );

  if (!hydrated) return <AppBlank />;

  return <PantryContext.Provider value={value}>{children}</PantryContext.Provider>;
}

export function usePantry(): PantryContextValue {
  const ctx = useContext(PantryContext);
  if (!ctx) {
    throw new Error("usePantry must be used within a PantryProvider");
  }
  return ctx;
}
