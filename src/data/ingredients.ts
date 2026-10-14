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

  // --- Tea. Each kind of tea is its own ingredient: green tea is never black tea, and matcha is never "green tea".
  // Named black teas (Assam, Darjeeling) count as black tea when that is what someone has. ---
  entity("black-tea", "Black Tea", "Coffee & Tea", ["tea", "tea bags", "tea bag", "teabags", "loose leaf tea", "loose tea", "english breakfast tea", "english breakfast", "ceylon tea", "ceylon", "strong black tea", "black tea leaves", "chai leaves", "chai tea leaves", "tea leaves", "tea dust", "ctc tea", "red label", "irish breakfast tea", "kenyan tea", "yorkshire tea", "pg tips", "lipton", "thai tea", "thai tea mix", "thai tea leaves"]),
  entity("assam-tea", "Assam Tea", "Coffee & Tea", ["assam", "assam black tea", "assam tea leaves", "assam ctc"], "black_tea"),
  entity("darjeeling-tea", "Darjeeling Tea", "Coffee & Tea", ["darjeeling", "darjeeling black tea", "darjeeling first flush"], "black_tea"),
  entity("earl-grey-tea", "Earl Grey Tea", "Coffee & Tea", ["earl grey", "earl grey tea bag", "earl grey tea bags", "earl grey leaves", "bergamot tea", "lady grey"]),
  entity("green-tea", "Green Tea", "Coffee & Tea", ["green tea bag", "green tea bags", "green tea leaves", "loose green tea", "chinese green tea", "gunpowder tea", "gunpowder green tea", "chun mee"]),
  entity("sencha", "Sencha", "Coffee & Tea", ["sencha tea", "sencha green tea", "japanese green tea", "japanese sencha"], "green_tea"),
  entity("dragon-well-tea", "Dragon Well Tea", "Coffee & Tea", ["longjing", "long jing", "dragonwell", "dragon well", "xihu longjing"], "green_tea"),
  entity("genmaicha", "Genmaicha", "Coffee & Tea", ["genmai cha", "brown rice tea", "genmaicha tea", "popcorn tea"]),
  entity("hojicha", "Hojicha", "Coffee & Tea", ["houjicha", "hojicha tea", "roasted green tea", "hojicha leaves", "hojicha powder"]),
  entity("matcha-powder", "Matcha Powder", "Coffee & Tea", ["matcha", "matcha green tea powder", "ceremonial matcha", "culinary matcha", "matcha tea powder", "usucha"]),
  entity("jasmine-tea", "Jasmine Tea", "Coffee & Tea", ["jasmine green tea", "jasmine pearls", "jasmine tea bags", "jasmine tea leaves", "jasmine"]),
  entity("white-tea", "White Tea", "Coffee & Tea", ["silver needle", "white peony", "bai mudan", "white tea leaves", "white tea bags"]),
  entity("oolong-tea", "Oolong Tea", "Coffee & Tea", ["oolong", "tieguanyin", "iron goddess", "milk oolong", "oolong tea leaves", "wulong"]),
  entity("puerh-tea", "Pu-erh Tea", "Coffee & Tea", ["puerh", "pu erh", "pu-erh", "pu'er", "puer tea", "pu-erh cake", "ripe pu-erh", "shou pu-erh"]),
  entity("chamomile-tea", "Chamomile Tea", "Coffee & Tea", ["chamomile", "chamomile flowers", "dried chamomile", "chamomile tea bag", "chamomile tea bags", "camomile", "camomile tea"]),
  entity("peppermint-tea", "Peppermint Tea", "Coffee & Tea", ["peppermint tea bag", "peppermint tea bags", "dried peppermint", "peppermint leaves", "mint tea", "mint tea bags"]),
  entity("rooibos-tea", "Rooibos Tea", "Coffee & Tea", ["rooibos", "red bush tea", "redbush", "red tea", "rooibos tea bags", "rooibos leaves"]),
  entity("hibiscus-flowers", "Dried Hibiscus", "Coffee & Tea", ["hibiscus", "hibiscus tea", "dried hibiscus flowers", "jamaica flowers", "flor de jamaica", "karkade", "roselle", "hibiscus tea bags"]),
  entity("lemongrass", "Lemongrass", "Herbs & Garnish", ["lemon grass", "lemongrass stalk", "lemongrass stalks", "fresh lemongrass", "dried lemongrass", "lemongrass tea"]),
  entity("tulsi", "Tulsi", "Herbs & Garnish", ["holy basil", "tulsi leaves", "tulsi tea", "tulasi", "dried tulsi", "holy basil tea"]),
  entity("butterfly-pea-flowers", "Butterfly Pea Flowers", "Coffee & Tea", ["butterfly pea", "butterfly pea flower", "blue pea flowers", "blue tea", "clitoria", "anchan", "aparajita flowers", "butterfly pea tea"]),
  entity("lavender", "Dried Lavender", "Herbs & Garnish", ["culinary lavender", "lavender buds", "dried lavender buds", "lavender flowers", "lavender"]),
  entity("fresh-mint", "Fresh Mint", "Herbs & Garnish", ["mint", "mint leaves", "spearmint", "fresh spearmint", "nana mint", "pudina", "mint sprig", "mint sprigs"]),
  entity("ginger", "Fresh Ginger", "Spices & Flavourings", ["ginger", "ginger root", "fresh ginger root", "grated ginger", "sliced ginger", "adrak", "ginger piece"]),
  entity("turmeric-powder", "Turmeric Powder", "Spices & Flavourings", ["turmeric", "ground turmeric", "haldi", "turmeric root powder"]),
  entity("cloves", "Cloves", "Spices & Flavourings", ["clove", "whole cloves", "ground cloves", "laung"]),
  entity("star-anise", "Star Anise", "Spices & Flavourings", ["anise star", "chakri phool", "whole star anise"]),
  entity("saffron", "Saffron", "Spices & Flavourings", ["saffron threads", "saffron strands", "kesar", "zafran"]),
  entity("lime", "Lime", "Fruit", ["limes", "fresh lime", "lime juice", "lime wedge", "lime slice"]),
  entity("peach", "Peach", "Fruit", ["peaches", "fresh peach", "peach slices", "sliced peach", "ripe peach"]),
  entity("lemonade", "Lemonade", "Juices & Sodas", ["lemonade drink", "fresh lemonade", "homemade lemonade", "still lemonade", "cloudy lemonade"]),

  entity("tapioca-pearls", "Tapioca Pearls", "Pantry Staples", ["boba", "boba pearls", "bubble tea pearls", "black tapioca pearls", "tapioca balls", "quick cook boba", "sago pearls"]),
  entity("roasted-barley", "Roasted Barley", "Coffee & Tea", ["barley tea", "mugicha", "boricha", "roasted barley tea", "barley tea bags", "roasted barley grains"]),
  entity("strawberry", "Strawberries", "Fruit", ["strawberry", "fresh strawberries", "sliced strawberries", "frozen strawberries"]),
  entity("mango", "Mango", "Fruit", ["mangoes", "fresh mango", "ripe mango", "mango chunks", "mango pulp", "mango puree", "alphonso mango"]),
  entity("cocoa-powder", "Cocoa Powder", "Spices & Flavourings", ["unsweetened cocoa", "cocoa", "cacao powder", "unsweetened cocoa powder"]),
  entity("ice", "Ice", "Ice & Frozen", ["ice cubes", "crushed ice", "cubed ice"]),
  entity("water", "Water", "Pantry Staples", ["cold water", "hot water", "boiling water", "filtered water", "still water", "tap water", "chilled water"]),
];
