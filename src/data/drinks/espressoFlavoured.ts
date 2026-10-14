import type { Recipe, RecipeIngredient } from "@/types";
import { MILK_FROTHER_TIP, coldBrewIngredients, coldBrewMethods, drink, milkSteps, pexels, strongCoffeeIngredients, strongCoffeeMethods, type DrinkFacts, type StrongCoffeeSpec } from "./builders";

/**
 * Café-style flavoured and blended coffees. The flavours are the familiar ones; the names here are generic.
 */

const espresso = (facts: DrinkFacts, spec: StrongCoffeeSpec): Recipe => drink(facts, strongCoffeeIngredients(spec), strongCoffeeMethods(spec));
const WARM_CUP = "Warm your cup with hot water, then tip it out.";
const milk = (ml: number, label = "Cold whole milk"): RecipeIngredient => ({ pantryId: "milk", label, amount: `${ml} ml` });
const cream = (ml: number, label: string, optional = true): RecipeIngredient => ({ pantryId: "heavy-cream", label, amount: `${ml} ml`, optional });
const ice = (cups = 1): RecipeIngredient => ({ pantryId: "ice", label: "Ice cubes", amount: `${cups} cup` });

/** A hot flavoured latte: syrup in the cup, coffee on top, then steamed milk. */
const flavouredLatte = (facts: DrinkFacts, syrup: RecipeIngredient, extra: RecipeIngredient[] = [], extraStep?: string): Recipe =>
  espresso(facts, {
    size: "double",
    lines: [syrup, milk(200), ...extra],
    into: "onto the syrup in a large mug",
    before: [`Pour ${syrup.amount} of ${syrup.label.toLowerCase()} into the bottom of a large mug.`],
    after: (k) => ["Stir the coffee into the syrup until it has dissolved.", ...milkSteps({ ml: 200, froth: "thin" })(k), "Pour the milk into the mug, holding the foam back at first and then spooning it on top.", ...(extraStep ? [extraStep] : [])],
    optional: [MILK_FROTHER_TIP], handTools: ["Saucepan", "Large mug"],
  });

export const hotFlavoured: Recipe[] = [
  flavouredLatte(
    { id: "vanilla-latte", title: "Vanilla Latte", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy"], description: "A café latte sweetened with vanilla — soft, rounded and not too sweet.", prep: 5, make: 3, difficulty: "Easy", image: pexels(5112649) },
    { pantryId: "vanilla-syrup", label: "Vanilla syrup", amount: "20 ml" }
  ),
  flavouredLatte(
    { id: "hazelnut-latte", title: "Hazelnut Latte", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy"], description: "Espresso and steamed milk with toasted hazelnut syrup — nutty, warm and a little like chocolate spread.", prep: 5, make: 3, difficulty: "Easy", image: pexels(7932731) },
    { pantryId: "hazelnut-syrup", label: "Hazelnut syrup", amount: "20 ml" }
  ),
  flavouredLatte(
    { id: "toffee-nut-latte", title: "Toffee Nut Latte", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Rich"], description: "A latte with buttery toffee and toasted-nut syrup, finished with whipped cream — a cosy, dessert-like cup.", prep: 5, make: 3, difficulty: "Easy", image: pexels(15023131) },
    { pantryId: "toffee-nut-syrup", label: "Toffee nut syrup", amount: "30 ml" },
    [cream(30, "Whipped cream, to top")],
    "Top with a swirl of whipped cream if you like."
  ),
  flavouredLatte(
    {
      id: "salted-caramel-latte", title: "Salted Caramel Latte", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Rich"],
      description: "A latte with a ribbon of caramel and a pinch of flaky salt — sweet first, then salty, then the coffee.",
      prep: 5, make: 3, difficulty: "Easy", image: pexels(5567613),
      notes: "The salt is what makes it: it dials down the bitterness and brings out the caramel, so go lightly.",
    },
    { pantryId: "caramel-sauce", label: "Caramel sauce, 20 ml in the cup and 10 ml to drizzle", amount: "30 ml" },
    [{ pantryId: "salt", label: "Flaky sea salt, to finish", amount: "1 pinch" }],
    "Drizzle a little extra caramel over the foam and finish with a pinch of flaky salt."
  ),
  espresso(
    { id: "white-chocolate-mocha", title: "White Chocolate Mocha", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Rich"], description: "Espresso and steamed milk melted into white chocolate sauce — creamy, sweet and mellow, topped with whipped cream.", prep: 5, make: 3, difficulty: "Easy", image: pexels(24433379) },
    {
      size: "double",
      lines: [{ pantryId: "white-chocolate-sauce", label: "White chocolate sauce", amount: "30 ml" }, milk(180), cream(30, "Whipped cream, to top")],
      into: "onto the sauce in a large mug",
      before: ["Spoon 30 ml of white chocolate sauce into the bottom of a large mug."],
      after: (k) => ["Stir the coffee into the sauce until it is smooth.", ...milkSteps({ ml: 180, froth: "thin" })(k), "Pour in the milk, spoon the foam on top, and finish with whipped cream if you like."],
      optional: [MILK_FROTHER_TIP], handTools: ["Saucepan", "Large mug"],
    }
  ),
  espresso(
    {
      id: "pumpkin-spice-latte", title: "Pumpkin Spice Latte", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Spicy"],
      description: "A latte warmed with real pumpkin purée, brown sugar and autumn spices, with a little whipped cream on top.",
      prep: 6, make: 6, difficulty: "Medium", image: pexels(11743819),
      notes: "Whisk the pumpkin into the milk while it heats so it doesn't catch on the bottom of the pan.",
    },
    {
      size: "double",
      lines: [
        milk(240), { pantryId: "pumpkin-puree", label: "Pumpkin purée", amount: "30 ml" }, { pantryId: "sugar", label: "Sugar", amount: "1 tbsp" },
        { pantryId: "pumpkin-pie-spice", label: "Pumpkin pie spice", amount: "1/4 tsp" }, { pantryId: "vanilla-extract", label: "Vanilla extract", amount: "1/4 tsp", optional: true },
        cream(30, "Whipped cream, to top"),
      ],
      into: "into a large mug",
      before: ["In a saucepan, whisk the milk with the pumpkin purée, sugar and pumpkin pie spice. Heat gently, whisking, until it steams (about 65°C) without boiling, then stir in the vanilla.", "Froth the pumpkin milk with a milk frother, or pour it into a lidded jar and shake hard for 30 seconds."],
      after: ["Pour the hot, frothy pumpkin milk into the coffee, holding the foam back at first.", "Spoon the foam on top, add whipped cream if you like, and dust with a little more spice."],
      optional: [MILK_FROTHER_TIP], handTools: ["Saucepan", "Whisk", "Large mug"],
    }
  ),
  espresso(
    { id: "honey-oat-flat-white", title: "Honey Oat Flat White", type: "Coffee", temperature: "hot", diet: ["Dairy-Free"], taste: ["Sweet", "Creamy"], description: "A flat white made with oat milk and a spoonful of honey melted into the coffee — mellow, toasty and lightly sweet.", prep: 5, make: 3, difficulty: "Medium", image: pexels(23057984) },
    {
      size: "double",
      lines: [{ pantryId: "honey", label: "Honey", amount: "15 ml" }, { pantryId: "oat-milk", label: "Barista-style oat milk", amount: "150 ml" }],
      into: "onto the honey in a warmed cup",
      before: [WARM_CUP, "Put 15 ml of honey in the bottom of the cup."],
      after: (k) => ["Stir until the honey has dissolved into the hot coffee.", ...milkSteps({ ml: 150, froth: "thin" })(k).map((s) => s.replace(/\bmilk\b/g, "oat milk")), "Pour the oat milk in a steady stream, finishing with a thin layer of fine foam."],
      optional: [MILK_FROTHER_TIP], handTools: ["Saucepan"],
    }
  ),
  espresso(
    { id: "cinnamon-brown-sugar-latte", title: "Cinnamon Brown Sugar Latte", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Sweet", "Spicy", "Creamy"], description: "A latte sweetened with brown sugar and warmed with cinnamon — caramelly and cosy.", prep: 5, make: 3, difficulty: "Easy", image: pexels(40135674) },
    {
      size: "double",
      lines: [{ pantryId: "brown-sugar", label: "Brown sugar", amount: "2 tsp" }, { pantryId: "cinnamon", label: "Ground cinnamon, plus a pinch to finish", amount: "1/4 tsp" }, milk(200)],
      into: "into a large mug",
      before: [],
      after: (k) => ["Stir the brown sugar and cinnamon into the hot coffee until the sugar has dissolved.", ...milkSteps({ ml: 200, froth: "thin" })(k), "Pour in the milk, spooning the foam on top, and finish with a pinch of cinnamon."],
      optional: [MILK_FROTHER_TIP], handTools: ["Saucepan", "Large mug"],
    }
  ),
  espresso(
    { id: "peppermint-mocha", title: "Peppermint Mocha", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Rich"], description: "A mocha with a cool hit of peppermint — chocolate, espresso and steamed milk under whipped cream.", prep: 5, make: 3, difficulty: "Easy", image: pexels(15023069) },
    {
      size: "double",
      lines: [{ pantryId: "chocolate-syrup", label: "Chocolate syrup", amount: "30 ml" }, { pantryId: "peppermint-syrup", label: "Peppermint syrup", amount: "15 ml" }, milk(180), cream(30, "Whipped cream, to top")],
      into: "onto the syrups in a large mug",
      before: ["Pour the chocolate syrup and peppermint syrup into the bottom of a large mug."],
      after: (k) => ["Stir the coffee into the syrups until smooth.", ...milkSteps({ ml: 180, froth: "thin" })(k), "Pour in the milk, spoon the foam on top and finish with whipped cream."],
      optional: [MILK_FROTHER_TIP], handTools: ["Saucepan", "Large mug"],
    }
  ),
];

// ---------------------------------------------------------------------------
// Iced and blended
// ---------------------------------------------------------------------------

/** A blended frappé: strong coffee, milk, ice and flavour, whizzed until thick. */
function frappe(facts: DrinkFacts, flavour: RecipeIngredient[], flavourStep: string): Recipe {
  const lines: RecipeIngredient[] = [milk(120), ice(2), { pantryId: "sugar", label: "Sugar", amount: "1 tbsp" }, ...flavour, cream(30, "Whipped cream, to top")];
  const shot = (kind: "espresso" | "moka" | "instant") => (kind === "instant" ? [{ pantryId: "instant-coffee", label: "Instant coffee", amount: "2 tsp" }, { pantryId: "water", label: "Just-boiled water", amount: "40 ml" }] : kind === "espresso" ? [{ pantryId: "ground-coffee", label: "Finely ground coffee, espresso grind", amount: "18 g" }, { pantryId: "water", label: "Water, through the machine", amount: "40 ml" }] : [{ pantryId: "ground-coffee", label: "Medium-fine ground coffee", amount: "15 g" }, { pantryId: "water", label: "Hot water, for the moka pot", amount: "130 ml" }]);
  const blend = [flavourStep, "Add the milk, sugar and the ice to a blender and blend on high for 30–45 seconds, until thick and slushy.", "Pour into a tall glass and top with whipped cream if you like. Drink with a straw while it is cold."];
  return drink(facts, [...shot("espresso"), ...lines], [
    { id: "blender-espresso", label: "Blender + espresso machine", equipment: ["Blender", "Espresso Machine"], steps: ["Pull a double shot (18 g of coffee into about 40 ml) and let it cool for a few minutes so it doesn't melt the ice.", ...blend] },
    { id: "blender-moka", label: "Blender + moka pot", equipment: ["Blender", "Moka Pot"], ingredients: [...shot("moka"), ...lines], steps: ["Brew the coffee in a moka pot (15 g of medium-fine coffee, 130 ml of hot water) and let it cool for a few minutes.", ...blend] },
    { id: "blender-instant", label: "Blender + instant coffee", equipment: ["Blender"], handTools: ["Spoon"], ingredients: [...shot("instant"), ...lines], steps: ["Dissolve 2 tsp of instant coffee in 40 ml of just-boiled water and let it cool for a few minutes.", ...blend], notes: "The easiest way in — no brewer needed, just a blender." },
  ]);
}

export const blendedAndIced: Recipe[] = [
  espresso(
    { id: "iced-vanilla-latte", title: "Iced Vanilla Latte", type: "Coffee", temperature: "cold", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Refreshing"], description: "A double shot sweetened with vanilla, poured over cold milk and ice — smooth and easy-drinking.", prep: 4, make: 2, difficulty: "Easy", image: pexels(28744927) },
    {
      size: "double",
      lines: [{ pantryId: "vanilla-syrup", label: "Vanilla syrup", amount: "20 ml" }, milk(180), ice()],
      into: "into a small cup",
      before: ["Fill a tall glass with ice cubes and pour in the cold milk."],
      after: ["Stir the vanilla syrup into the hot coffee until dissolved, then pour it over the iced milk.", "Stir and drink right away."],
    }
  ),
  espresso(
    {
      id: "brown-sugar-oat-shaken-espresso", title: "Brown Sugar Oat Shaken Espresso", type: "Coffee", temperature: "cold", diet: ["Dairy-Free", "Vegan"], taste: ["Sweet", "Creamy", "Refreshing"],
      description: "Espresso shaken hard with brown sugar and ice until frothy, then topped with oat milk — lightly spiced and toasty.",
      prep: 4, make: 2, difficulty: "Medium", image: pexels(8605911),
      sourceName: "Winding Creek Ranch — brown sugar oatmilk shaken espresso", sourceUrl: "https://www.windingcreekranch.org/iced-brown-sugar-oatmilk-shaken-espresso/",
      notes: "Shaking is what makes it: it chills the espresso instantly and whips it into a pale, frothy layer.",
    },
    {
      size: "double",
      lines: [{ pantryId: "brown-sugar", label: "Brown sugar", amount: "1 tbsp" }, { pantryId: "cinnamon", label: "Ground cinnamon", amount: "1 pinch", optional: true }, { pantryId: "oat-milk", label: "Oat milk", amount: "80 ml" }, ice()],
      into: "into a shaker or lidded jar",
      before: ["Put the ice in a cocktail shaker or a large lidded jar."],
      after: ["Stir the brown sugar (and the pinch of cinnamon) into the hot coffee until dissolved, then shake hard with the ice for about 30 seconds, until frothy and cold.", "Pour everything into a tall glass and top with the cold oat milk. Drink right away."],
      optional: [{ tag: "Shaker", without: "A large, tightly lidded jar shaken hard works just as well." }], handTools: ["Tall glass"],
    }
  ),
  {
    ...drink(
      { id: "classic-cold-coffee", title: "Classic Cold Coffee", type: "Coffee", temperature: "cold", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Rich"], description: "The café-style blended cold coffee: instant coffee whizzed with cold milk, sugar and ice until frothy, with a scoop of ice cream if you like.", prep: 5, make: 2, difficulty: "Easy", image: pexels(18281882), sourceName: "Spice Up The Curry — cold coffee", sourceUrl: "https://www.spiceupthecurry.com/cold-coffee-recipe/" },
      [
        { pantryId: "instant-coffee", label: "Strong instant coffee", amount: "2 tsp" },
        { pantryId: "sugar", label: "Sugar", amount: "1.5 tbsp" },
        { pantryId: "milk", label: "Cold whole milk", amount: "240 ml" },
        { pantryId: "ice", label: "Ice cubes", amount: "1 cup" },
        { pantryId: "vanilla-ice-cream", label: "Vanilla ice cream", amount: "90 g", optional: true },
        { pantryId: "chocolate-syrup", label: "Chocolate syrup, to drizzle", amount: "1 tbsp", optional: true },
      ],
      [
        { id: "blender", label: "Blender", equipment: ["Blender"], steps: ["Add the instant coffee, sugar, milk and ice (and the ice cream, if using) to a blender.", "Blend on high for 30–45 seconds, until thick and frothy.", "Pour into a tall glass, drizzle with chocolate syrup if you like, and drink right away while the froth lasts."] },
        { id: "milk-frother", label: "Hand frother", equipment: ["Milk Frother"], handTools: ["Tall glass"], steps: ["Stir the instant coffee and sugar into 2 tbsp of hot water in a tall glass until dissolved, then froth it for 20–30 seconds until pale and foamy.", "Add the cold milk and the ice and froth again until frothy.", "Top with a scoop of ice cream and a drizzle of chocolate syrup if you like."] },
        { id: "by-hand", label: "By hand", equipment: [], handTools: ["Lidded jar", "Spoon"], steps: ["Dissolve the instant coffee and sugar in 2 tbsp of hot water in a lidded jar.", "Add the cold milk and ice, fasten the lid tightly and shake very hard for 45–60 seconds, until frothy.", "Pour into a tall glass and top with ice cream and chocolate syrup if you like."], notes: "Dissolving the coffee and sugar in a little hot water first is what gives cafés their foam." },
      ]
    ),
  },
  frappe(
    { id: "caramel-frappe", title: "Caramel Frappé", type: "Coffee", temperature: "cold", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Rich"], description: "A thick, blended iced coffee with caramel, finished with whipped cream and a drizzle of sauce.", prep: 6, make: 2, difficulty: "Easy", image: pexels(4438014) },
    [{ pantryId: "caramel-sauce", label: "Caramel sauce, 30 ml in the blend and 15 ml to drizzle", amount: "45 ml" }],
    "Drizzle a little of the caramel sauce around the inside of your glass."
  ),
  frappe(
    { id: "mocha-frappe", title: "Mocha Frappé", type: "Coffee", temperature: "cold", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Rich"], description: "A frosty blend of coffee, chocolate and ice, topped with whipped cream — a coffee-flavoured milkshake.", prep: 6, make: 2, difficulty: "Easy", image: pexels(11512983) },
    [{ pantryId: "chocolate-syrup", label: "Chocolate syrup", amount: "45 ml" }],
    "Drizzle a little of the chocolate syrup around the inside of your glass."
  ),
  frappe(
    { id: "chocolate-chip-coffee-frappe", title: "Chocolate Chip Coffee Frappé", type: "Coffee", temperature: "cold", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Rich"], description: "A blended coffee frappé with chocolate sauce and crunchy chocolate chips stirred through.", prep: 6, make: 2, difficulty: "Easy", image: pexels(34224582) },
    [{ pantryId: "chocolate-syrup", label: "Chocolate syrup", amount: "30 ml" }, { pantryId: "dark-chocolate", label: "Chocolate chips, chopped, 15 g to blend and 5 g to top", amount: "20 g" }],
    "Add 15 g of the chocolate chips to the blender with everything else; reserve the rest to scatter on top."
  ),
  {
    ...drink(
      { id: "blended-iced-coffee", title: "Blended Iced Coffee", type: "Coffee", temperature: "cold", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Refreshing"], description: "Coffee, milk and ice blended into a slushy, topped with whipped cream — the plain, café-style frozen coffee.", prep: 5, make: 2, difficulty: "Easy", image: pexels(17558646) },
      [
        { pantryId: "instant-coffee", label: "Instant coffee", amount: "2 tsp" },
        { pantryId: "water", label: "Just-boiled water", amount: "40 ml" },
        { pantryId: "milk", label: "Cold whole milk", amount: "150 ml" },
        { pantryId: "ice", label: "Ice cubes", amount: "2 cup" },
        { pantryId: "sugar", label: "Sugar", amount: "2 tbsp" },
        { pantryId: "vanilla-extract", label: "Vanilla extract", amount: "1/4 tsp", optional: true },
        { pantryId: "heavy-cream", label: "Whipped cream, to top", amount: "30 ml", optional: true },
      ],
      [
        { id: "blender", label: "Blender", equipment: ["Blender"], steps: ["Dissolve the instant coffee in the 40 ml of hot water and let it cool for 5 minutes.", "Blend it with the milk, ice, sugar and vanilla on high for 30–45 seconds, until slushy and smooth.", "Pour into a tall glass, top with whipped cream if you like, and drink with a straw."] },
      ]
    ),
  },
];

// Cold-brew based drinks share the chilled-coffee base.
const vanillaCreamLines: RecipeIngredient[] = [ice(), { pantryId: "vanilla-syrup", label: "Vanilla syrup", amount: "30 ml" }, { pantryId: "heavy-cream", label: "Heavy cream, for the sweet cream", amount: "30 ml" }];
const saltedCaramelLines: RecipeIngredient[] = [
  ice(),
  { pantryId: "caramel-sauce", label: "Caramel sauce, 30 ml in the glass and 10 ml in the foam", amount: "40 ml" },
  { pantryId: "heavy-cream", label: "Heavy cream, for the foam", amount: "30 ml" },
  { pantryId: "milk", label: "Cold milk, for the foam", amount: "30 ml" },
  { pantryId: "salt", label: "Fine sea salt, for the foam", amount: "1 pinch" },
];

export const coldBrewDrinks: Recipe[] = [
  drink(
    {
      id: "vanilla-sweet-cream-cold-brew", title: "Vanilla Sweet Cream Cold Brew", type: "Coffee", temperature: "cold", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Refreshing"], wait: 840,
      description: "Smooth, low-acid cold brew over ice, sweetened with vanilla syrup and finished with a floating layer of lightly whipped vanilla cream.",
      prep: 8, make: 4, difficulty: "Easy", image: pexels(2717971),
      sourceName: "The Girl on Bloor — vanilla sweet cream cold brew", sourceUrl: "https://thegirlonbloor.com/wprm_print/vanilla-sweet-cream-cold-brew-starbucks-copycat",
      notes: "Cold brew can be made in a batch: use the same 1:8 ratio and keep it in the fridge for up to a week.",
    },
    coldBrewIngredients({ lines: vanillaCreamLines }),
    coldBrewMethods({
      lines: vanillaCreamLines,
      after: ["Fill a tall glass about three-quarters full of ice, stir in the vanilla syrup, then pour in the cold brew.", "Pour the cream into a small jar with a lid and shake for 15–20 seconds, until it just thickens and turns slightly foamy but is still pourable.", "Pour the sweet cream slowly over the coffee so it floats on top. Sip through the cream, or stir it in."],
      optional: [MILK_FROTHER_TIP], handTools: ["Tall glass", "Small lidded jar"],
    })
  ),
  drink(
    {
      id: "salted-caramel-cold-brew", title: "Salted Caramel Cold Brew", type: "Coffee", temperature: "cold", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Rich"], wait: 840,
      description: "Cold brew sweetened with caramel and topped with a thick, lightly salted cream foam that you drink through.",
      prep: 8, make: 4, difficulty: "Medium", image: pexels(15086185),
      sourceName: "Ohh How Civilized — salted caramel cold brew", sourceUrl: "https://www.ohhowcivilized.com/wprm_print/salted-caramel-cold-brew",
      notes: "The foam is meant to taste salty on its own; it mellows as it melts into the coffee, so keep the pinch small.",
    },
    coldBrewIngredients({ lines: saltedCaramelLines }),
    coldBrewMethods({
      lines: saltedCaramelLines,
      after: ["Fill a tall glass with ice, pour in 30 ml of the caramel sauce and the cold brew, and stir.", "Make the salted foam: put the cream, milk, the last 10 ml of caramel sauce and the pinch of salt in a small jar and shake hard for 30–45 seconds (or froth it), until it is thick but still pourable.", "Spoon the foam over the coffee. Drink through the foam, or stir it in."],
      optional: [MILK_FROTHER_TIP], handTools: ["Tall glass", "Small lidded jar"],
    })
  ),
];
