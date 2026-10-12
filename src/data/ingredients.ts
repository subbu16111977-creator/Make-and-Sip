import type { PantryCategory } from "@/types";

/**
 * The single canonical ingredient registry — the shared identity layer behind Pantry, Shopping, and Discover.
 *
 * Every drink ingredient, pantry item, and shopping item resolves to one of these entries. `id` is the stable
 * identity key (recipes reference it via `RecipeIngredient.pantryId`; pantry/shopping items via `ingredientId`).
 * `baseIngredient` groups genuine subtypes under one plain name (e.g. "chicken-thigh" and "chicken-breast" both
 * base to "chicken") so owning the plain name reasonably covers a specific kind — without conflating look-alikes.
 * `synonyms` drives free-text resolution (see `resolveSynonym` in ingredientNormalize.ts).
 *
 * The food registry that used to live here was retired (it is preserved in Git: tag
 * `checkpoint-final-mise-food-app`, branch `archive/mise-food-app`). Make & Sip's drink ingredients go here next.
 */
export interface IngredientEntity {
  id: string;
  canonicalName: string;
  /** Groups subtypes under one umbrella concept. Equal to `canonicalName` for a base/generic ingredient itself. */
  baseIngredient: string;
  displayName: string;
  category: PantryCategory;
  synonyms: string[];
}

export const ingredientRegistry: IngredientEntity[] = [];
