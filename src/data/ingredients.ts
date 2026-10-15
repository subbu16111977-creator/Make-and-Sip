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
  entity("coconut-milk", "Coconut Milk", "Milk & Cream", ["canned coconut milk", "full fat coconut milk", "creamy coconut milk"]),
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
  entity("apple", "Apple", "Fruit", ["apples", "fresh apple", "red apple", "green apple", "apple slices", "sliced apple"]),
  entity("taro-powder", "Taro Powder", "Pantry Staples", ["taro", "taro milk tea powder", "taro paste", "taro root powder", "purple taro powder"]),
  // --- Shakes: ice creams, fruit, nuts and sauces ---
  entity("chocolate-ice-cream", "Chocolate Ice Cream", "Ice & Frozen", ["chocolate gelato", "choc ice cream", "double chocolate ice cream"]),
  entity("strawberry-ice-cream", "Strawberry Ice Cream", "Ice & Frozen", ["strawberry gelato", "strawberries and cream ice cream"]),
  entity("cookie-dough-ice-cream", "Cookie Dough Ice Cream", "Ice & Frozen", ["chocolate chip cookie dough ice cream", "cookie dough"]),
  entity("butterscotch-sauce", "Butterscotch Sauce", "Sweeteners & Syrups", ["butterscotch syrup", "butterscotch topping", "butterscotch"]),
  entity("chocolate-hazelnut-spread", "Chocolate Hazelnut Spread", "Pantry Staples", ["nutella", "hazelnut spread", "choc hazelnut spread", "gianduja spread"]),
  entity("peanut-butter", "Peanut Butter", "Pantry Staples", ["smooth peanut butter", "crunchy peanut butter", "natural peanut butter", "creamy peanut butter"]),
  entity("malted-milk-powder", "Malted Milk Powder", "Pantry Staples", ["malt powder", "malted milk", "horlicks", "ovaltine", "diastatic malt", "malted barley powder"]),
  entity("chocolate-sandwich-cookies", "Chocolate Sandwich Cookies", "Pantry Staples", ["oreo", "oreos", "oreo cookies", "cookies and cream cookies", "chocolate cream cookies", "sandwich cookies"]),
  entity("banana", "Banana", "Fruit", ["bananas", "ripe banana", "ripe bananas", "frozen banana", "banana slices"]),
  entity("blueberries", "Blueberries", "Fruit", ["blueberry", "fresh blueberries", "frozen blueberries", "wild blueberries"]),
  entity("chikoo", "Chikoo", "Fruit", ["sapota", "sapodilla", "chiku", "chickoo", "naseberry", "ripe chikoo"]),
  entity("avocado", "Avocado", "Fruit", ["avocados", "ripe avocado", "hass avocado", "butter fruit"]),
  entity("dates", "Dates", "Fruit", ["date", "pitted dates", "medjool dates", "dried dates", "khajoor", "deglet noor dates"]),
  entity("almonds", "Almonds", "Pantry Staples", ["almond", "raw almonds", "blanched almonds", "badam", "sliced almonds", "whole almonds"]),
  entity("pistachios", "Pistachios", "Pantry Staples", ["pistachio", "shelled pistachios", "pista", "unsalted pistachios", "roasted pistachios"]),
  entity("fennel-seeds", "Fennel Seeds", "Spices & Flavourings", ["saunf", "fennel", "sweet fennel seeds", "variyali", "sombu"]),
  entity("rose-syrup", "Rose Syrup", "Sweeteners & Syrups", ["rooh afza", "rose sharbat", "rose flavoured syrup", "gulab syrup", "rose essence syrup"]),
  entity("sparkling-water", "Sparkling Water", "Juices & Sodas", ["seltzer", "soda water", "club soda", "carbonated water", "fizzy water", "seltzer water"]),
  entity("pineapple", "Pineapple", "Fruit", ["pineapples", "fresh pineapple", "pineapple chunks", "pineapple pieces", "canned pineapple", "pineapple slices"]),
  entity("raspberries", "Raspberries", "Fruit", ["raspberry", "fresh raspberries", "frozen raspberries", "red raspberries"]),
  entity("cherries", "Cherries", "Fruit", ["cherry", "fresh cherries", "pitted cherries", "frozen cherries", "sweet cherries", "morello cherries", "maraschino cherries"]),
  entity("figs", "Figs", "Fruit", ["fig", "fresh figs", "dried figs", "anjeer", "anjir", "ripe figs", "black mission figs"]),
  entity("lychee", "Lychee", "Fruit", ["lychees", "litchi", "canned lychees", "fresh lychees", "lychee syrup", "lychee in syrup"]),
  entity("passion-fruit", "Passion Fruit", "Fruit", ["passionfruit", "passion fruit pulp", "passion fruit puree", "maracuja", "granadilla", "krishna fruit"]),
  entity("brownie", "Brownie", "Pantry Staples", ["brownies", "chocolate brownie", "brownie pieces", "brownie chunks", "fudge brownie"]),
  entity("sprinkles", "Sprinkles", "Pantry Staples", ["rainbow sprinkles", "hundreds and thousands", "jimmies", "funfetti sprinkles", "nonpareils", "confetti sprinkles"]),
  entity("sponge-cake", "Sponge Cake", "Pantry Staples", ["vanilla cake", "yellow cake", "plain cake", "vanilla sponge", "cake crumbs", "pound cake", "birthday cake"]),
  entity("cream-cheese", "Cream Cheese", "Milk & Cream", ["philadelphia", "soft cheese", "full fat cream cheese", "cream cheese spread"]),
  entity("graham-crackers", "Graham Crackers", "Pantry Staples", ["digestive biscuits", "digestives", "graham cracker crumbs", "graham crumbs", "biscuit crumbs", "plain biscuits"]),
  entity("marshmallows", "Marshmallows", "Pantry Staples", ["marshmallow", "mini marshmallows", "marshmallow fluff", "marshmallow creme", "large marshmallows"]),
  entity("mint-extract", "Peppermint Extract", "Spices & Flavourings", ["mint extract", "peppermint essence", "mint essence", "peppermint flavouring", "mint flavouring", "peppermint oil food grade"]),
  entity("speculoos-biscuits", "Speculoos Biscuits", "Pantry Staples", ["biscoff", "lotus biscoff", "speculoos", "spiced biscuits", "biscoff biscuits", "biscoff spread", "cookie butter", "speculoos spread"]),
  entity("ube-powder", "Ube Powder", "Pantry Staples", ["ube", "purple yam", "ube extract", "ube halaya", "purple yam powder", "ube flavouring"]),
  entity("popping-boba", "Popping Boba", "Pantry Staples", ["popping pearls", "fruit pearls", "bursting boba", "juice balls", "popping bubbles"]),
  entity("coconut-flakes", "Desiccated Coconut", "Pantry Staples", ["shredded coconut", "coconut flakes", "grated coconut", "dried coconut", "desiccated coconut"]),
  entity("cashews", "Cashews", "Pantry Staples", ["cashew nuts", "cashew", "raw cashews", "kaju", "roasted cashews", "cashew pieces"]),
  // --- Smoothies and lassi ---
  entity("yogurt", "Plain Yogurt", "Milk & Cream", ["yoghurt", "curd", "dahi", "natural yogurt", "plain yoghurt", "natural yoghurt", "set yogurt", "plain curd", "low fat yogurt", "whole milk yogurt"]),
  entity("greek-yogurt", "Greek Yogurt", "Milk & Cream", ["greek yoghurt", "strained yogurt", "thick yogurt", "hung curd", "skyr"], "yogurt"),
  entity("buttermilk", "Buttermilk", "Milk & Cream", ["chaas", "chaach", "mattha", "moru", "cultured buttermilk", "thin buttermilk", "diluted curd", "chhaas"]),
  entity("kiwi", "Kiwi", "Fruit", ["kiwis", "kiwi fruit", "kiwifruit", "green kiwi", "golden kiwi"]),
  entity("watermelon", "Watermelon", "Fruit", ["watermelon chunks", "seedless watermelon", "watermelon cubes", "tarbooz", "fresh watermelon"]),
  entity("papaya", "Papaya", "Fruit", ["ripe papaya", "papaya chunks", "pawpaw", "papita", "fresh papaya"]),
  entity("pomegranate", "Pomegranate", "Fruit", ["pomegranate seeds", "pomegranate arils", "anar", "pomegranate juice", "fresh pomegranate"]),
  entity("dragon-fruit", "Dragon Fruit", "Fruit", ["pitaya", "pitahaya", "red dragon fruit", "white dragon fruit", "frozen dragon fruit", "pitaya puree"]),
  entity("acai-puree", "Açaí Purée", "Ice & Frozen", ["acai", "açaí", "acai pack", "frozen acai", "acai pulp", "acai berry puree", "acai powder", "acai packet"]),
  entity("spinach", "Spinach", "Herbs & Garnish", ["baby spinach", "fresh spinach", "palak", "spinach leaves"]),
  entity("kale", "Kale", "Herbs & Garnish", ["curly kale", "baby kale", "lacinato kale", "tuscan kale", "kale leaves"]),
  entity("cucumber", "Cucumber", "Fruit", ["cucumbers", "english cucumber", "fresh cucumber", "kheera", "peeled cucumber"]),
  entity("carrot", "Carrot", "Fruit", ["carrots", "fresh carrots", "gajar", "baby carrots", "grated carrot"]),
  entity("beetroot", "Beetroot", "Fruit", ["beet", "beets", "red beet", "cooked beetroot", "chukandar", "roasted beetroot"]),
  entity("chia-seeds", "Chia Seeds", "Pantry Staples", ["chia", "white chia seeds", "black chia seeds", "chia seed"]),
  entity("rolled-oats", "Rolled Oats", "Pantry Staples", ["oats", "porridge oats", "old fashioned oats", "quick oats", "oatmeal", "instant oats", "jumbo oats"]),
  entity("apple-juice", "Apple Juice", "Juices & Sodas", ["cloudy apple juice", "pressed apple juice", "apple juice from concentrate", "unsweetened apple juice"]),
  entity("coconut-water", "Coconut Water", "Juices & Sodas", ["tender coconut water", "nariyal pani", "young coconut water", "pure coconut water", "coconut juice"]),
  entity("rice-milk", "Rice Milk", "Milk & Cream", ["rice drink", "rice beverage", "horchata base"]),
  entity("cumin-powder", "Roasted Cumin Powder", "Spices & Flavourings", ["jeera powder", "ground cumin", "cumin", "roasted jeera", "bhuna jeera", "cumin seeds"]),
  entity("black-salt", "Black Salt", "Spices & Flavourings", ["kala namak", "himalayan black salt", "sanchal", "kala namak salt"]),
  entity("coriander-leaves", "Fresh Coriander", "Herbs & Garnish", ["cilantro", "coriander", "fresh coriander leaves", "dhania leaves", "coriander leaves", "cilantro leaves"]),
  // --- More smoothies and shakes ---
  entity("blackberries", "Blackberries", "Fruit", ["blackberry", "fresh blackberries", "frozen blackberries", "brambles"]),
  entity("cranberry-juice", "Cranberry Juice", "Juices & Sodas", ["cranberry drink", "unsweetened cranberry juice", "cranberry juice cocktail", "pure cranberry juice"]),
  entity("grapes", "Grapes", "Fruit", ["grape", "red grapes", "black grapes", "purple grapes", "seedless grapes", "concord grapes", "green grapes"]),
  entity("pear", "Pear", "Fruit", ["pears", "ripe pear", "bartlett pear", "conference pear", "nashi", "asian pear"]),
  entity("cantaloupe", "Cantaloupe", "Fruit", ["muskmelon", "rockmelon", "cantaloupe melon", "kharbuja", "honeydew", "honeydew melon", "melon"]),
  entity("guava", "Guava", "Fruit", ["guavas", "pink guava", "ripe guava", "amrood", "peru", "guava pulp"]),
  entity("protein-powder", "Protein Powder", "Pantry Staples", ["whey protein", "vanilla protein powder", "plant protein", "chocolate protein powder", "pea protein", "protein scoop", "whey"]),
  entity("candy-canes", "Candy Canes", "Pantry Staples", ["candy cane", "peppermint candy", "peppermint candies", "crushed peppermint", "starlight mints"]),
  entity("cotton-candy", "Cotton Candy", "Pantry Staples", ["candy floss", "fairy floss", "spun sugar"]),
  entity("fruity-cereal", "Sweet Breakfast Cereal", "Pantry Staples", ["fruity cereal", "fruity pebbles", "froot loops", "frosted flakes", "cereal", "sweetened cereal", "cocoa puffs", "corn flakes"]),
  entity("red-velvet-cake", "Red Velvet Cake", "Pantry Staples", ["red velvet", "red velvet cupcake", "red velvet crumbs"]),
  entity("lemon-curd", "Lemon Curd", "Sweeteners & Syrups", ["lemon cheese", "lemon spread", "lemon filling"]),
  entity("pretzels", "Pretzels", "Pantry Staples", ["pretzel", "salted pretzels", "mini pretzels", "pretzel sticks", "pretzel twists"]),
  entity("chili-powder", "Chilli Powder", "Spices & Flavourings", ["chili powder", "chilli powder", "red chilli powder", "cayenne", "cayenne pepper", "lal mirch", "kashmiri chilli powder"]),
  entity("falooda-sev", "Falooda Sev", "Pantry Staples", ["falooda noodles", "falooda vermicelli", "cornflour vermicelli", "sev"]),
  entity("basil-seeds", "Basil Seeds", "Pantry Staples", ["sabja", "sabja seeds", "tukmaria", "falooda seeds", "sweet basil seeds", "subja"]),
  // --- Mocktails. Everything here is alcohol-free: grenadine, orgeat and "blue curaçao" are syrups. ---
  entity("ginger-beer", "Ginger Beer", "Juices & Sodas", ["non alcoholic ginger beer", "fentimans ginger beer", "ginger brew", "spicy ginger beer", "alcohol free ginger beer"]),
  entity("ginger-ale", "Ginger Ale", "Juices & Sodas", ["canada dry", "dry ginger ale", "ginger soda", "diet ginger ale", "ginger fizz"]),
  entity("cola", "Cola", "Juices & Sodas", ["coke", "coca cola", "pepsi", "cola soda", "diet coke", "cherry cola", "cola drink"]),
  entity("lemon-lime-soda", "Lemon-Lime Soda", "Juices & Sodas", ["sprite", "7up", "7 up", "lemon lime soda", "lime soda", "clear soda", "lemon lime pop", "limca"]),
  entity("grenadine", "Grenadine", "Sweeteners & Syrups", ["grenadine syrup", "pomegranate syrup", "rose's grenadine", "cherry grenadine", "red syrup"]),
  entity("orgeat-syrup", "Orgeat Syrup", "Sweeteners & Syrups", ["orgeat", "almond syrup", "almond orgeat", "sirop d'orgeat"]),
  entity("blue-curacao-syrup", "Blue Curaçao Syrup", "Sweeteners & Syrups", ["blue curacao syrup", "blue syrup", "blue curaçao syrup", "blue raspberry syrup", "non alcoholic blue curacao", "blue lagoon syrup", "blue curaçao flavoured syrup"]),
  entity("elderflower-cordial", "Elderflower Cordial", "Sweeteners & Syrups", ["elderflower syrup", "elderflower presse", "elderflower concentrate", "st germain style syrup", "elderflower squash"]),
  entity("kala-khatta-syrup", "Kala Khatta Syrup", "Sweeteners & Syrups", ["kala khatta", "jamun syrup", "black plum syrup", "kala khatta squash", "kala khatta gola syrup"]),
  entity("jaljeera-powder", "Jaljeera Powder", "Spices & Flavourings", ["jal jeera", "jaljeera masala", "jal jeera powder", "jaljeera mix", "jeera masala"]),
  entity("tomato-juice", "Tomato Juice", "Juices & Sodas", ["tomato cocktail", "passata", "bloody mary mix", "v8", "spiced tomato juice", "tomato juice cocktail"]),
  entity("worcestershire-sauce", "Worcestershire Sauce", "Spices & Flavourings", ["worcester sauce", "lea and perrins", "worcestershire", "vegetarian worcestershire"]),
  entity("hot-sauce", "Hot Sauce", "Spices & Flavourings", ["tabasco", "chilli sauce", "sriracha", "pepper sauce", "louisiana hot sauce", "cholula", "hot pepper sauce"]),
  entity("celery", "Celery", "Herbs & Garnish", ["celery stalk", "celery sticks", "celery stick", "celery stalks", "celery leaves", "celery salt"]),
  entity("grapefruit", "Grapefruit", "Fruit", ["pink grapefruit", "ruby grapefruit", "grapefruit juice", "fresh grapefruit", "grapefruit slice", "grapefruit wedge", "white grapefruit"]),
  entity("blood-orange", "Blood Orange", "Fruit", ["blood oranges", "blood orange juice", "moro orange", "tarocco orange", "blood orange slice"]),
  entity("grape-juice", "Red Grape Juice", "Juices & Sodas", ["purple grape juice", "concord grape juice", "black grape juice", "red grape drink", "unsweetened grape juice"]),
  entity("sparkling-grape-juice", "Sparkling White Grape Juice", "Juices & Sodas", ["sparkling grape juice", "non alcoholic sparkling wine", "alcohol free sparkling wine", "sparkling cider", "sparkling apple juice", "alcohol free prosecco", "martinelli's", "sparkling white juice"]),
  entity("peach-nectar", "Peach Nectar", "Juices & Sodas", ["peach juice", "peach puree", "peach purée", "peach drink", "canned peach juice", "peach nectar juice"]),
  entity("coconut-cream", "Coconut Cream", "Milk & Cream", ["cream of coconut", "coco lopez", "creamed coconut", "thick coconut cream", "canned coconut cream", "coconut cream tin"]),
  entity("nutmeg", "Nutmeg", "Spices & Flavourings", ["ground nutmeg", "grated nutmeg", "whole nutmeg", "jaiphal"]),
  entity("rosemary", "Fresh Rosemary", "Herbs & Garnish", ["rosemary", "rosemary sprig", "rosemary sprigs", "fresh rosemary sprigs", "dried rosemary"]),
  entity("fresh-basil", "Fresh Basil", "Herbs & Garnish", ["basil", "basil leaves", "sweet basil", "fresh basil leaves", "genovese basil", "thai basil"]),
  entity("raw-mango", "Raw Mango", "Fruit", ["green mango", "unripe mango", "kaccha aam", "kacchi keri", "raw green mango", "mango raw"]),
  entity("gulkand", "Gulkand", "Sweeteners & Syrups", ["rose petal jam", "rose petal preserve", "gulkand jam", "gulqand"]),
  entity("betel-leaf", "Betel Leaf", "Herbs & Garnish", ["paan leaf", "paan leaves", "betel leaves", "nagarvel", "paan patta", "vettila"]),
  entity("cocoa-powder", "Cocoa Powder", "Spices & Flavourings", ["unsweetened cocoa", "cocoa", "cacao powder", "unsweetened cocoa powder"]),
  entity("ice", "Ice", "Ice & Frozen", ["ice cubes", "crushed ice", "cubed ice"]),
  entity("water", "Water", "Pantry Staples", ["cold water", "hot water", "boiling water", "filtered water", "still water", "tap water", "chilled water"]),
];
