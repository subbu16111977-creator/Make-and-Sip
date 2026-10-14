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
  // --- Syrups and sauces. Each flavour is its own ingredient: vanilla syrup is not vanilla extract, caramel sauce is not toffee syrup. ---
  entity("vanilla-syrup", "Vanilla Syrup", "Sweeteners & Syrups", ["vanilla coffee syrup", "monin vanilla", "torani vanilla"]),
  entity("caramel-sauce", "Caramel Sauce", "Sweeteners & Syrups", ["caramel syrup", "caramel drizzle", "salted caramel sauce", "caramel topping", "dulce de leche sauce"]),
  entity("chocolate-syrup", "Chocolate Syrup", "Sweeteners & Syrups", ["chocolate sauce", "mocha sauce", "hershey's syrup", "hershey syrup", "dark chocolate sauce"]),
  entity("white-chocolate-sauce", "White Chocolate Sauce", "Sweeteners & Syrups", ["white chocolate syrup", "white mocha sauce"]),
  entity("hazelnut-syrup", "Hazelnut Syrup", "Sweeteners & Syrups", ["hazelnut coffee syrup", "monin hazelnut"]),
  entity("toffee-nut-syrup", "Toffee Nut Syrup", "Sweeteners & Syrups", ["toffee syrup", "toffee nut coffee syrup", "praline syrup"]),
  entity("peppermint-syrup", "Peppermint Syrup", "Sweeteners & Syrups", ["mint syrup", "peppermint coffee syrup"]),
  entity("palm-sugar", "Palm Sugar", "Sweeteners & Syrups", ["gula aren", "gula jawa", "gula melaka", "coconut palm sugar", "palm sugar syrup", "arenga sugar"]),
  entity("jaggery", "Jaggery", "Sweeteners & Syrups", ["bella", "gur", "gud", "karupatti", "panakalkandu", "palm jaggery", "cane jaggery", "jaggery powder"]),
  entity("piloncillo", "Piloncillo", "Sweeteners & Syrups", ["panela", "panela sugar", "piloncillo cone", "dark brown sugar cone"]),

  // --- Spices and flavourings ---
  entity("vanilla-extract", "Vanilla Extract", "Spices & Flavourings", ["vanilla essence", "pure vanilla extract", "vanilla paste", "vanilla bean paste"]),
  entity("cinnamon", "Cinnamon", "Spices & Flavourings", ["ground cinnamon", "cinnamon powder"]),
  entity("cinnamon-stick", "Cinnamon Stick", "Spices & Flavourings", ["cinnamon sticks", "cinnamon quill", "cassia stick"], "cinnamon"),
  entity("cardamom", "Cardamom", "Spices & Flavourings", ["green cardamom", "cardamom pods", "ground cardamom", "cardamom powder", "elaichi"]),
  entity("ground-ginger", "Ground Ginger", "Spices & Flavourings", ["dry ginger", "dry ginger powder", "dried ginger", "sukku", "sonth", "ginger powder"]),
  entity("coriander-seeds", "Coriander Seeds", "Spices & Flavourings", ["dhania seeds", "coriander seed", "malli", "whole coriander"]),
  entity("black-pepper", "Black Pepper", "Spices & Flavourings", ["peppercorns", "black peppercorns", "ground black pepper", "pepper", "cracked pepper"]),
  entity("pumpkin-pie-spice", "Pumpkin Pie Spice", "Spices & Flavourings", ["pumpkin spice", "pumpkin spice mix", "pumpkin spice blend"]),
  entity("dark-chocolate", "Dark Chocolate", "Spices & Flavourings", ["bittersweet chocolate", "dark chocolate bar", "chocolate bar", "chocolate chips", "dark chocolate chips", "semisweet chocolate", "chocolate shavings"]),
  entity("salt", "Salt", "Spices & Flavourings", ["sea salt", "flaky salt", "flaky sea salt", "fine salt", "table salt", "kosher salt"]),

  // --- More dairy, cream and ice cream ---
  entity("half-and-half", "Half-and-Half", "Milk & Cream", ["half and half", "half n half", "single cream", "light cream", "coffee cream", "coffee creamer"]),
  entity("evaporated-milk", "Evaporated Milk", "Milk & Cream", ["tinned milk", "canned evaporated milk", "carnation milk", "unsweetened condensed milk"]),
  entity("coconut-milk", "Coconut Milk", "Milk & Cream", ["canned coconut milk", "full fat coconut milk", "coconut cream", "creamy coconut milk"]),
  entity("vanilla-ice-cream", "Vanilla Ice Cream", "Ice & Frozen", ["ice cream", "vanilla gelato", "vanilla bean ice cream", "gelato", "fior di latte"]),
  entity("eggs", "Eggs", "Pantry Staples", ["egg", "egg yolk", "egg yolks", "fresh egg", "free range eggs"]),

  // --- Fruit, juice and fizz ---
  entity("orange-juice", "Orange Juice", "Juices & Sodas", ["oj", "fresh orange juice", "orange juice no pulp", "squeezed orange juice"]),
  entity("lemon", "Lemon", "Fruit", ["lemons", "fresh lemon", "lemon slice", "lemon wedge", "lemon juice", "fresh lemon juice"]),
  entity("orange", "Orange", "Fruit", ["oranges", "orange slice", "orange peel", "orange zest", "navel orange"]),
  entity("tonic-water", "Tonic Water", "Juices & Sodas", ["tonic", "indian tonic water", "premium tonic", "light tonic water"]),
  entity("pumpkin-puree", "Pumpkin Purée", "Pantry Staples", ["pumpkin puree", "canned pumpkin", "pumpkin pie filling", "cooked pumpkin"]),

  entity("cocoa-powder", "Cocoa Powder", "Spices & Flavourings", ["unsweetened cocoa", "cocoa", "cacao powder", "unsweetened cocoa powder"]),
  entity("ice", "Ice", "Ice & Frozen", ["ice cubes", "crushed ice", "cubed ice"]),
  entity("water", "Water", "Pantry Staples", ["cold water", "hot water", "boiling water", "filtered water", "still water", "tap water", "chilled water"]),
];
