import type { PantryCategory } from "@/types";
import type { IngredientEntity } from "@/data/ingredients";

/**
 * Everyday ingredients that people type into the pantry whether or not a dish uses them yet, plus the plain
 * names ("beef", "oil", "cheese") that cooks use for a whole family of ingredients. Having them in the registry
 * means the pantry files them under the right category and any dish added later matches them straight away.
 *
 * Plain meat names ("beef", "pork") are the base of their cuts, the same way "chicken" is the base of chicken
 * breast and thigh: owning "beef" covers a dish that asks for ground beef, though the dish page flags the cut
 * as one to double-check.
 */
function e(id: string, displayName: string, category: PantryCategory, synonyms: string[], base?: string): IngredientEntity {
  const canonicalName = id.replace(/-/g, "_");
  return { id, canonicalName, baseIngredient: base ?? canonicalName, displayName, category, synonyms: [displayName.toLowerCase(), ...synonyms] };
}

export const commonIngredients: IngredientEntity[] = [
  // --- Plain names for a family of ingredients ---
  e("beef", "Beef", "Meat & Seafood", ["beef", "beef meat", "stewing beef"]),
  e("pork", "Pork", "Meat & Seafood", ["pork", "pork meat"]),
  e("turkey", "Turkey", "Meat & Seafood", ["turkey", "turkey breast", "turkey meat"]),
  e("ground-turkey", "Ground Turkey", "Meat & Seafood", ["ground turkey", "minced turkey", "turkey mince"]),
  e("sausage", "Sausage", "Meat & Seafood", ["sausage", "sausages"]),
  e("steak", "Steak", "Meat & Seafood", ["steak", "beef steak", "steaks"]),
  e("cheese", "Cheese", "Dairy", ["cheese", "grated cheese", "shredded cheese", "sliced cheese"]),
  e("noodles", "Noodles", "Grains", ["noodles", "noodle"]),
  e("bread", "Bread", "Grains", ["bread", "bread slices", "sandwich bread", "loaf of bread"]),
  e("vinegar", "Vinegar", "Pantry Staples", ["vinegar"]),
  e("wine", "Wine", "Pantry Staples", ["wine", "cooking wine"]),
  e("lentils", "Lentils", "Pulses", ["lentils", "lentil"]),
  e("dal", "Dal", "Pulses", ["dal", "dhal", "daal"]),
  e("cinnamon", "Cinnamon", "Spices", ["cinnamon", "ground cinnamon", "cinnamon powder"]),
  e("curry-paste", "Curry Paste", "Spices", ["curry paste"]),
  e("salsa", "Salsa", "Pantry Staples", ["salsa", "jarred salsa", "tomato salsa"]),
  e("mustard", "Mustard", "Pantry Staples", ["mustard", "yellow mustard", "dijon mustard", "dijon", "english mustard", "wholegrain mustard"]),

  // --- Bakery ---
  e("chapati", "Chapati / Roti", "Grains", ["chapati", "roti", "phulka", "chapatti", "indian flatbread"]),
  e("naan", "Naan", "Grains", ["naan", "naan bread"]),
  e("bagel", "Bagels", "Grains", ["bagel", "bagels"]),
  e("croissant", "Croissants", "Grains", ["croissant", "croissants"]),
  e("english-muffin", "English Muffins", "Grains", ["english muffin", "english muffins"]),
  e("pav", "Pav (Dinner Rolls)", "Grains", ["pav", "ladi pav", "dinner rolls", "dinner roll", "soft rolls", "bread rolls", "rolls"]),
  e("pretzel", "Pretzels", "Grains", ["pretzel", "pretzels", "soft pretzels"]),
  e("focaccia", "Focaccia", "Grains", ["focaccia", "focaccia bread"]),
  e("rye-bread", "Rye Bread", "Grains", ["rye bread", "rye"]),
  e("cornbread", "Cornbread", "Grains", ["cornbread", "corn bread"]),
  e("pie-crust", "Pie Crust", "Frozen", ["pie crust", "pie shell", "pastry shell", "shortcrust pastry", "pie dough"]),
  e("stuffing-mix", "Stuffing Mix", "Pantry Staples", ["stuffing", "stuffing mix"]),
  e("pancake-mix", "Pancake Mix", "Pantry Staples", ["pancake mix", "waffle mix", "pancake batter mix"]),
  e("cake-mix", "Cake Mix", "Pantry Staples", ["cake mix", "brownie mix"]),
  e("cereal", "Breakfast Cereal", "Grains", ["cereal", "breakfast cereal", "cornflakes", "corn flakes"]),

  // --- Dairy and eggs ---
  e("halloumi", "Halloumi", "Dairy", ["halloumi", "grilling cheese"]),
  e("gouda", "Gouda", "Dairy", ["gouda", "gouda cheese"]),
  e("brie", "Brie", "Dairy", ["brie", "camembert"]),
  e("swiss-cheese", "Swiss Cheese", "Dairy", ["swiss cheese", "emmental", "emmentaler"]),
  e("goat-cheese", "Goat Cheese", "Dairy", ["goat cheese", "goats cheese", "chevre"]),
  e("gruyere", "Gruyère", "Dairy", ["gruyere", "gruyere cheese"]),
  e("cottage-cheese", "Cottage Cheese", "Dairy", ["cottage cheese"]),
  e("margarine", "Margarine", "Dairy", ["margarine", "vegan butter"]),
  e("almond-milk", "Almond Milk", "Dairy", ["almond milk"]),
  e("oat-milk", "Oat Milk", "Dairy", ["oat milk"]),
  e("soy-milk", "Soy Milk", "Dairy", ["soy milk", "soya milk"]),
  e("coconut-water", "Coconut Water", "Pantry Staples", ["coconut water", "tender coconut water"]),
  e("almond-flour", "Almond Flour", "Grains", ["almond flour", "almond meal", "ground almonds"]),
  e("brioche", "Brioche", "Grains", ["brioche", "brioche loaf"]),
  e("apricots", "Apricots", "Fruit", ["apricots", "fresh apricots"]),
  e("coconut-cream", "Coconut Cream", "Pantry Staples", ["coconut cream", "cream of coconut"]),

  // --- Meat and seafood ---
  e("chicken-drumsticks", "Chicken Drumsticks", "Meat & Seafood", ["chicken drumsticks", "drumsticks", "chicken legs", "chicken leg"], "chicken"),
  e("cod", "Cod", "Meat & Seafood", ["cod", "cod fillet", "white fish fillet"]),
  e("haddock", "Haddock", "Meat & Seafood", ["haddock", "smoked haddock"]),
  e("snapper", "Snapper", "Meat & Seafood", ["snapper", "red snapper"]),
  e("sea-bass", "Sea Bass", "Meat & Seafood", ["sea bass", "seabass", "branzino"]),
  e("scallops", "Scallops", "Meat & Seafood", ["scallops", "sea scallops"]),
  e("oysters", "Oysters", "Meat & Seafood", ["oysters", "fresh oysters"]),
  e("meatballs", "Meatballs", "Frozen", ["meatballs", "frozen meatballs"]),
  e("burger-patties", "Burger Patties", "Frozen", ["burger patty", "burger patties", "hamburger patties", "veggie burger", "veggie patties"]),
  e("chicken-nuggets", "Chicken Nuggets", "Frozen", ["nuggets", "chicken nuggets"]),
  e("french-fries", "French Fries", "Frozen", ["french fries", "fries", "frozen fries", "chips frozen"]),
  e("hash-browns", "Hash Browns", "Frozen", ["hash browns", "hashbrowns", "frozen hash browns"]),

  // --- Vegetables and fruit ---
  e("kale", "Kale", "Vegetables", ["kale", "curly kale", "lacinato kale", "tuscan kale", "cavolo nero"]),
  e("turnip", "Turnips", "Vegetables", ["turnip", "turnips"]),
  e("pumpkin", "Pumpkin", "Vegetables", ["pumpkin", "pumpkin puree", "canned pumpkin"]),
  e("chives", "Chives", "Vegetables", ["chives", "chive"]),
  e("snow-peas", "Snow Peas", "Vegetables", ["snow peas", "sugar snap peas", "mangetout"]),
  e("artichoke", "Artichokes", "Vegetables", ["artichoke", "artichokes", "globe artichoke"]),
  e("watercress", "Watercress", "Vegetables", ["watercress"]),
  e("baby-corn", "Baby Corn", "Vegetables", ["baby corn", "young corn"]),
  e("fennel-bulb", "Fennel Bulb", "Vegetables", ["fennel bulb", "fresh fennel"]),
  e("plantain", "Plantain", "Fruit", ["plantain", "plantains", "green plantain", "ripe plantain"]),
  e("cassava", "Cassava", "Vegetables", ["cassava", "yuca", "manioc", "tapioca root"]),
  e("yam", "Yam", "Vegetables", ["yam", "yams", "elephant yam", "suran"]),
  e("taro", "Taro", "Vegetables", ["taro", "taro root", "colocasia", "arbi"]),
  e("figs", "Figs", "Fruit", ["figs", "fresh figs"]),
  e("cranberries", "Cranberries", "Fruit", ["cranberries", "dried cranberries"]),
  e("blueberries", "Blueberries", "Fruit", ["blueberries", "blueberry"]),
  e("raspberries", "Raspberries", "Fruit", ["raspberries", "raspberry"]),
  e("grapes", "Grapes", "Fruit", ["grapes", "grape"]),
  e("cherries", "Cherries", "Fruit", ["cherries", "cherry"]),
  e("watermelon", "Watermelon", "Fruit", ["watermelon"]),
  e("kiwi", "Kiwi", "Fruit", ["kiwi", "kiwi fruit", "kiwifruit"]),
  e("pomegranate", "Pomegranate", "Fruit", ["pomegranate", "pomegranates"]),
  e("guacamole", "Guacamole", "Pantry Staples", ["guacamole"]),

  // --- Grains, flours and pulses ---
  e("quinoa", "Quinoa", "Grains", ["quinoa"]),
  e("barley", "Barley", "Grains", ["barley", "pearl barley"]),
  e("millet", "Millet", "Grains", ["millet", "pearl millet"]),
  e("ragi", "Ragi (Finger Millet)", "Grains", ["ragi", "finger millet", "nachni", "ragi flour"]),
  e("jowar", "Jowar (Sorghum)", "Grains", ["jowar", "sorghum", "jowar flour"]),
  e("bajra", "Bajra (Pearl Millet)", "Grains", ["bajra", "bajra flour"]),
  e("vermicelli", "Vermicelli (Seviyan)", "Grains", ["vermicelli", "seviyan", "sevai", "wheat vermicelli"]),
  e("poha", "Poha (Flattened Rice)", "Grains", ["poha", "flattened rice", "beaten rice", "aval"]),
  e("sabudana", "Sabudana (Tapioca Pearls)", "Pantry Staples", ["sabudana", "sago", "tapioca pearls", "sago pearls"]),
  e("papad", "Papad", "Pantry Staples", ["papad", "papadum", "poppadom", "poppadum", "appalam"]),
  e("coconut-flour", "Coconut Flour", "Grains", ["coconut flour"]),
  e("masoor-dal", "Masoor Dal (Split Red Lentils)", "Pulses", ["masoor dal", "masoor", "split red lentils"]),
  e("black-chickpeas", "Black Chickpeas (Kala Chana)", "Pulses", ["kala chana", "black chickpeas", "bengal gram"]),
  e("mung-beans", "Mung Beans (Green Gram)", "Pulses", ["mung beans", "mung bean", "green gram", "whole moong", "moong beans"]),
  e("chole", "Chole (Chickpeas)", "Pulses", ["chole", "chhole", "kabuli chana", "white chickpeas"]),

  // --- Oils, sauces and pantry ---
  e("peanut-oil", "Peanut Oil", "Pantry Staples", ["peanut oil", "groundnut oil"]),
  e("coconut-oil", "Coconut Oil", "Pantry Staples", ["coconut oil", "virgin coconut oil"]),
  e("canola-oil", "Canola Oil", "Pantry Staples", ["canola oil", "rapeseed oil", "sunflower oil", "safflower oil"]),
  e("balsamic-vinegar", "Balsamic Vinegar", "Pantry Staples", ["balsamic vinegar", "balsamic"]),
  e("teriyaki-sauce", "Teriyaki Sauce", "Pantry Staples", ["teriyaki sauce", "teriyaki"]),
  e("sriracha", "Sriracha", "Pantry Staples", ["sriracha", "sriracha sauce"]),
  e("pesto", "Pesto", "Pantry Staples", ["pesto", "basil pesto", "green pesto"]),
  e("alfredo-sauce", "Alfredo Sauce", "Pantry Staples", ["alfredo sauce", "alfredo"]),
  e("ranch-dressing", "Ranch Dressing", "Pantry Staples", ["ranch", "ranch dressing"]),
  e("caesar-dressing", "Caesar Dressing", "Pantry Staples", ["caesar dressing", "caesar salad dressing"]),
  e("vinaigrette", "Vinaigrette", "Pantry Staples", ["vinaigrette", "salad dressing", "italian dressing"]),
  e("relish", "Relish", "Pantry Staples", ["relish", "pickle relish", "sweet relish"]),
  e("chutney", "Chutney", "Pantry Staples", ["chutney", "mango chutney", "mint chutney", "tamarind chutney"]),
  e("bouillon", "Stock Cubes / Bouillon", "Pantry Staples", ["bouillon", "stock cube", "stock cubes", "bouillon cube", "bouillon cubes", "maggi cube"]),
  e("hummus", "Hummus", "Pantry Staples", ["hummus", "houmous"]),
  e("shortening", "Shortening", "Pantry Staples", ["shortening", "vegetable shortening", "crisco"]),
  e("syrup", "Syrup", "Pantry Staples", ["syrup", "golden syrup", "pancake syrup"]),
  e("chocolate-hazelnut-spread", "Chocolate Hazelnut Spread", "Pantry Staples", ["nutella", "chocolate hazelnut spread", "hazelnut spread"]),
  e("crackers", "Crackers", "Pantry Staples", ["crackers", "cracker", "water crackers", "saltines"]),
  e("biscuits", "Biscuits / Cookies", "Pantry Staples", ["biscuits", "cookies", "tea biscuits"]),
  e("sprinkles", "Sprinkles", "Pantry Staples", ["sprinkles", "hundreds and thousands"]),
  e("pandan", "Pandan Leaves", "Pantry Staples", ["pandan", "pandan leaves", "pandan extract", "screwpine leaves"]),
  e("coffee", "Coffee", "Pantry Staples", ["coffee", "ground coffee", "instant coffee", "coffee beans"]),
  e("tea", "Tea", "Pantry Staples", ["tea", "tea bags", "black tea", "green tea", "tea leaves"]),
  e("msg", "MSG", "Pantry Staples", ["msg", "monosodium glutamate", "ajinomoto"]),
  e("xanthan-gum", "Xanthan Gum", "Pantry Staples", ["xanthan gum"]),
  e("whey-protein", "Whey / Protein Powder", "Pantry Staples", ["whey", "whey protein", "protein powder"]),

  // --- Spice and paste forms ---
  e("garlic-powder", "Garlic Powder", "Spices", ["garlic powder", "granulated garlic"]),
  e("onion-powder", "Onion Powder", "Spices", ["onion powder", "granulated onion"]),
  e("mushroom-powder", "Mushroom Powder", "Spices", ["mushroom powder"]),
  e("ginger-paste", "Ginger Paste", "Pantry Staples", ["ginger paste"]),
  e("garlic-paste", "Garlic Paste", "Pantry Staples", ["garlic paste"]),
  e("ginger-garlic-paste", "Ginger-Garlic Paste", "Pantry Staples", ["ginger garlic paste", "ginger and garlic paste"]),
  e("tomato-puree", "Tomato Purée", "Pantry Staples", ["tomato puree", "pureed tomatoes", "tomato passata puree"]),
];

/**
 * Extra everyday names for ingredients the registry already has. A name is only added if no other ingredient
 * already claims it (see the registry integrity test), and these never rename or re-id anything.
 */
export const extraSynonyms: Record<string, string[]> = {
  "vegetable-oil": ["oil", "cooking oil", "neutral oil", "frying oil", "salad oil"],
  "black-pepper": ["pepper", "ground pepper", "ground black pepper", "black peppercorns", "peppercorns", "cracked pepper"],
  "bell-pepper": ["peppers", "green pepper", "green peppers", "sweet pepper", "sweet peppers", "red pepper", "red peppers", "yellow pepper"],
  "frozen-peas": ["peas", "green peas", "garden peas", "sweet peas"],
  "frozen-corn": ["corn", "sweet corn", "sweetcorn", "corn kernels", "corn on the cob"],
  "strawberry-jam": ["jam", "fruit jam", "fruit preserves", "jelly"],
  "miso-paste": ["miso", "white miso", "red miso"],
  "cocoa-powder": ["cocoa", "cacao powder", "unsweetened cocoa"],
  "rolled-oats": ["oats", "oatmeal", "porridge oats", "old fashioned oats"],
  semolina: ["suji", "sooji", "rava", "sooji rava"],
  "all-purpose-flour": ["maida", "plain flour", "white flour", "refined flour"],
  cornmeal: ["polenta", "corn meal", "maize meal"],
  "chipotle-in-adobo": ["chipotle", "chipotles", "chipotle peppers", "chipotle chili"],
  "ancho-chiles": ["ancho", "anchos", "ancho chile powder"],
  "red-food-coloring": ["food coloring", "food colouring", "food dye"],
  pickles: ["pickle", "achar", "indian pickle", "pickled cucumbers", "gherkins"],
  eggs: ["egg yolk", "egg yolks", "egg white", "egg whites", "egg whole"],
  "salmon-fillet": ["salmon", "salmon steak", "salmon steaks"],
  "ground-beef": ["mince", "beef mince", "minced beef", "minced meat"],
  "pork-ribs": ["spare ribs", "baby back ribs", "ribs", "pork spare ribs"],
  "greek-yogurt": ["yoghurt", "curd", "dahi", "plain yogurt", "natural yogurt"],
  lettuce: ["romaine", "romaine lettuce", "iceberg lettuce", "cos lettuce", "salad leaves", "leaf lettuce"],
  nori: ["seaweed sheets", "seaweed", "dried seaweed", "roasted seaweed"],
  "chicken-stock": ["chicken broth", "broth", "stock"],
  "beef-broth": ["beef stock"],
  ladyfingers: ["ladyfinger cookies", "savoiardi", "sponge fingers"],
  "sourdough-bread": ["sourdough", "sourdough loaf"],
  tortillas: ["wraps", "flour wraps", "tortilla wraps"],
  "chicken-wings": ["wings", "chicken wing", "buffalo wings"],
  amchur: ["dried mango powder", "mango powder"],
};

/** Beef and pork cuts that share their plain name as a base, like chicken breast and thigh share "chicken". */
export const BEEF_CUTS = ["ground-beef", "beef-brisket", "beef-chuck", "beef-sirloin", "beef-strips", "beef-short-ribs", "ribeye-steak", "skirt-steak", "cube-steak", "steak"];
export const PORK_CUTS = ["ground-pork", "pork-shoulder", "pork-ribs", "pork-belly", "pork-loin"];
