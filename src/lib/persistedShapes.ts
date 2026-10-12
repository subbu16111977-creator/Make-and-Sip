import { EQUIPMENT_TAGS } from "@/lib/equipment";
import type { EquipmentTag, PantryItem, ShoppingItem } from "@/types";

/**
 * Shape checks for data read back from device storage. Storage can hold
 * anything (an older app version, a half-written value, hand-edited JSON), so
 * nothing read from it is trusted until it passes one of these. A failed check
 * means "fall back to the starting data" — never a crash.
 *
 * These deliberately check only the fields the app relies on to identify and
 * combine items; they are not a full schema.
 */

export { EQUIPMENT_TAGS };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isPantryItems(value: unknown): value is PantryItem[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        isRecord(item) &&
        typeof item.id === "string" &&
        typeof item.ingredientId === "string" &&
        typeof item.name === "string" &&
        typeof item.quantity === "number" &&
        typeof item.unit === "string" &&
        typeof item.expiryDate === "string"
    )
  );
}

export function isShoppingItems(value: unknown): value is ShoppingItem[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        isRecord(item) &&
        typeof item.id === "string" &&
        typeof item.ingredientId === "string" &&
        typeof item.name === "string" &&
        typeof item.checked === "boolean" &&
        Array.isArray(item.sourceRecipeIds)
    )
  );
}

export function isSavedIds(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((id) => typeof id === "string");
}

export function isEquipmentTags(value: unknown): value is EquipmentTag[] {
  return Array.isArray(value) && value.every((tag) => EQUIPMENT_TAGS.includes(tag as EquipmentTag));
}
