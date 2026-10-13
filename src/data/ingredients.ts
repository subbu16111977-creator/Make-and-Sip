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
 * `checkpoint-final-mise-food-app`, branch `archive/mise-food-app`). This list holds what the drinks in the app need so far
 * (coffee and the everyday basics); it grows as drinks are added.
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

function entity(id: string, displayName: string, category: PantryCategory, synonyms: string[], base?: string): IngredientEntity {
  const canonicalName = id.replace(/-/g, "_");
  return { id, canonicalName, baseIngredient: base ?? canonicalName, displayName, category, synonyms: [displayName.toLowerCase(), ...synonyms] };
}

export const ingredientRegistry: IngredientEntity[] = [
  // --- Coffee. "Coffee" is the plain name; owning it covers beans or grounds, though the drink page flags the form. ---
  entity("coffee", "Coffee", "Coffee & Tea", ["coffee"]),
  entity("ground-coffee", "Ground Coffee", "Coffee & Tea", ["coffee grounds", "espresso grind", "espresso ground coffee", "fine ground coffee", "medium ground coffee", "coarse ground coffee", "filter coffee", "drip coffee", "dark roast ground coffee", "roast and ground coffee", "filter coffee powder"], "coffee"),
  entity("coffee-beans", "Coffee Beans", "Coffee & Tea", ["whole bean coffee", "whole coffee beans", "espresso beans", "roasted coffee beans", "whole beans"], "coffee"),
  entity("instant-coffee", "Instant Coffee", "Coffee & Tea", ["instant coffee granules", "instant coffee powder", "coffee granules", "nescafe", "freeze dried coffee", "soluble coffee"]),

  // --- Milk, cream and alternatives. Plant milks are their own ingredients: oat milk is never "milk". ---
  entity("milk", "Milk", "Milk & Cream", ["whole milk", "full fat milk", "full cream milk", "semi skimmed milk", "skimmed milk", "skim milk", "2% milk", "cows milk", "fresh milk", "dairy milk"]),
  entity("oat-milk", "Oat Milk", "Milk & Cream", ["oat drink", "oat milk barista"]),
  entity("almond-milk", "Almond Milk", "Milk & Cream", ["almond drink"]),
  entity("soy-milk", "Soy Milk", "Milk & Cream", ["soya milk", "soy drink", "soya drink"]),
  entity("heavy-cream", "Heavy Cream", "Milk & Cream", ["double cream", "whipping cream", "thickened cream", "heavy whipping cream"]),
  entity("sweetened-condensed-milk", "Sweetened Condensed Milk", "Milk & Cream", ["condensed milk", "sweet condensed milk", "tinned condensed milk"]),

  // --- Sweeteners ---
  entity("sugar", "Sugar", "Sweeteners & Syrups", ["white sugar", "granulated sugar", "caster sugar", "superfine sugar", "table sugar"]),
  entity("brown-sugar", "Brown Sugar", "Sweeteners & Syrups", ["light brown sugar", "dark brown sugar", "soft brown sugar", "demerara sugar"]),
  entity("honey", "Honey", "Sweeteners & Syrups", ["runny honey", "clear honey", "raw honey"]),

  // --- Flavourings, ice and water ---
  entity("cocoa-powder", "Cocoa Powder", "Spices & Flavourings", ["unsweetened cocoa", "cocoa", "cacao powder", "unsweetened cocoa powder"]),
  entity("ice", "Ice", "Ice & Frozen", ["ice cubes", "crushed ice", "cubed ice"]),
  entity("water", "Water", "Pantry Staples", ["cold water", "hot water", "boiling water", "filtered water", "still water", "tap water", "chilled water"]),
];
