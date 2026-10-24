import type { Recipe, RecipeIngredient } from "@/types";
import { MILK_FROTHER_TIP, drink, milkSteps, pexels, strongCoffeeIngredients, strongCoffeeMethods, type DrinkFacts, type StrongCoffeeSpec } from "./builders";
import { steepIngredients, steepMethods, type SteepSpec } from "./teaBuilders";

/** Café-menu staples that were missing: a few more espresso drinks and teas. */

const espresso = (facts: DrinkFacts, spec: StrongCoffeeSpec): Recipe => drink(facts, strongCoffeeIngredients(spec), strongCoffeeMethods(spec));
const steeped = (facts: DrinkFacts, spec: SteepSpec): Recipe => drink(facts, steepIngredients(spec), steepMethods(spec));
const milk = (ml: number, label = "Cold whole milk"): RecipeIngredient => ({ pantryId: "milk", label, amount: `${ml} ml` });
const ice = (cups = 1): RecipeIngredient => ({ pantryId: "ice", label: "Ice cubes", amount: `${cups} ${cups === 1 ? "cup" : "cups"}` });

export const menuCoffees: Recipe[] = [
  espresso(
    {
      id: "piccolo-latte", title: "Piccolo Latte", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Creamy", "Rich"],
      description: "A small, strong latte from Australia: a short, concentrated shot in a small glass, topped with a little silky milk.",
      prep: 3, make: 3, difficulty: "Medium", image: pexels(38576601),
      notes: "The proportions are what make it: roughly one part coffee to two parts milk, in a 90–120 ml glass.",
    },
    { size: "single", lines: [milk(60)], into: "into a small glass", before: ["Warm a small 100 ml glass with hot water, then tip it out."], after: (k) => [...milkSteps({ ml: 60, froth: "thin" })(k), "Pour the milk into the glass over the coffee, holding back the foam with a spoon at first and then letting it settle on top."], optional: [MILK_FROTHER_TIP], handTools: ["Saucepan"] }
  ),
  espresso(
    {
      id: "cardamom-latte", title: "Cardamom Latte", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Spicy", "Creamy", "Sweet"],
      description: "A latte with milk infused with green cardamom: warm, floral and a little citrusy, with just enough sweetness.",
      prep: 5, make: 5, difficulty: "Easy", image: pexels(8463129),
      notes: "Cardamom and coffee have been paired across the Middle East for centuries. Crush the pods just before using them for the freshest flavour.",
    },
    {
      size: "double",
      lines: [milk(180, "Whole milk"), { pantryId: "cardamom", label: "Green cardamom pods, crushed (or 1/4 tsp ground)", amount: "2" }, { pantryId: "honey", label: "Honey or sugar, to taste", amount: "1 tsp", optional: true }],
      into: "into a mug",
      before: ["Warm a mug with hot water, then tip it out. Crush the cardamom pods lightly."],
      after: () => ["Heat the milk in a saucepan with the crushed cardamom until steaming, about 65°C, then leave it to infuse for 2 minutes and strain.", "Froth the milk with a frother or by shaking it in a lidded jar until it doubles in volume.", "Stir the honey, if using, into the coffee, then pour in the milk and spoon the foam on top."],
      optional: [MILK_FROTHER_TIP], handTools: ["Saucepan", "Strainer or spoon"],
    }
  ),
  espresso(
    {
      id: "iced-hazelnut-latte", title: "Iced Hazelnut Latte", type: "Coffee", temperature: "cold", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Refreshing"],
      description: "A double shot with hazelnut syrup, poured over cold milk and ice — nutty, smooth and easy to drink.",
      prep: 4, make: 2, difficulty: "Easy", image: pexels(18142624),
    },
    { size: "double", lines: [{ pantryId: "hazelnut-syrup", label: "Hazelnut syrup", amount: "20 ml" }, milk(180), ice()], into: "into a small cup", before: ["Fill a tall glass with ice and pour in the cold milk."], after: ["Stir the hazelnut syrup into the hot coffee until dissolved, then pour it over the iced milk.", "Stir and drink right away."] }
  ),
  espresso(
    {
      id: "caffe-shakerato", title: "Caffè Shakerato", type: "Coffee", temperature: "cold", diet: ["Vegan", "Dairy-Free", "Gluten-Free"], taste: ["Refreshing", "Bitter"],
      description: "Italy's summer espresso: a hot shot shaken hard with ice and a little sugar until frothy and ice-cold, then strained into a chilled glass.",
      prep: 3, make: 2, difficulty: "Easy", image: pexels(33283848),
      sourceName: "Wikipedia — Caffè shakerato", sourceUrl: "https://en.wikipedia.org/wiki/Caff%C3%A8_shakerato",
      notes: "Shake it hard and fast: the foam is the point. Serve it straight away, before the foam collapses.",
    },
    {
      size: "double",
      lines: [{ pantryId: "sugar", label: "Sugar, or 1 tsp simple syrup", amount: "1 tsp" }, ice()],
      into: "into a shaker or lidded jar",
      before: ["Put the ice and the sugar in a shaker or a lidded jar. Chill a small glass in the freezer while you make the coffee."],
      after: ["Shake it hard for 15–20 seconds, until the outside of the shaker is frosty and the coffee is thick with foam.", "Strain into the chilled glass, leaving the ice behind, and serve immediately."],
      optional: [{ tag: "Shaker", without: "Use a tightly lidded jar and shake just as hard." }, { tag: "Strainer", without: "Hold a spoon over the opening so the ice stays back as you pour." }],
      handTools: ["Lidded jar", "Chilled glass"],
    }
  ),
];

export const menuTeas: Recipe[] = [
  steeped(
    {
      id: "green-tea", title: "Green Tea", type: "Tea", temperature: "hot", diet: ["Vegan", "Dairy-Free", "Low Sugar", "Gluten-Free"], taste: ["Herbal", "Refreshing"],
      description: "Plain green tea brewed gently: fresh, lightly grassy and clean, without milk or sugar.",
      prep: 2, make: 5, difficulty: "Easy", image: pexels(36028821),
      sourceName: "Wikipedia — Green tea", sourceUrl: "https://en.wikipedia.org/wiki/Green_tea",
      notes: "Hot water makes green tea taste bitter. Let boiled water cool for a few minutes first.",
    },
    { leaf: { pantryId: "green-tea", label: "Green tea (loose leaf, or 1 tea bag)", amount: "2 tsp" }, waterMl: 250, tempC: 80, minutes: 2, after: ["Drink it plain, or with a little honey."] }
  ),
  steeped(
    {
      id: "apple-spice-tea", title: "Apple Spice Tea", type: "Tea", temperature: "hot", diet: ["Dairy-Free", "Gluten-Free"], taste: ["Fruity", "Spicy", "Sweet"],
      description: "Black tea simmered with fresh apple, cinnamon and clove: warm, fragrant and gently sweet.",
      prep: 4, make: 8, difficulty: "Easy", image: pexels(3338676),
    },
    {
      leaf: { pantryId: "black-tea", label: "Black tea (loose leaf, or 1 tea bag)", amount: "1 tsp" },
      steeped: [{ pantryId: "apple", label: "Apple, thinly sliced", amount: "1/2" }, { pantryId: "cinnamon-stick", label: "Cinnamon stick", amount: "1" }, { pantryId: "cloves", label: "Cloves", amount: "2" }],
      waterMl: 300, tempC: 100, minutes: 5, lines: [{ pantryId: "honey", label: "Honey, to taste", amount: "1 tsp", optional: true }], after: ["Stir in a little honey if you like, and drink warm with the apple slices."],
    }
  ),
  drink(
    {
      id: "taro-milk-tea", title: "Taro Milk Tea", type: "Tea", temperature: "cold", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Rich"],
      description: "Iced milk tea blended with taro: a pale purple, nutty-sweet drink with a hint of vanilla, popular in bubble tea shops.",
      prep: 5, make: 5, difficulty: "Easy", image: pexels(5335709),
      sourceName: "Wikipedia — Bubble tea", sourceUrl: "https://en.wikipedia.org/wiki/Bubble_tea",
      notes: "Taro powder is sold for bubble tea. Tapioca pearls are a popular extra.",
    },
    [
      { pantryId: "taro-powder", label: "Taro powder", amount: "2 tbsp" },
      { pantryId: "black-tea", label: "Strong black tea", amount: "2 tsp" },
      { pantryId: "water", label: "Hot water", amount: "150 ml" },
      { pantryId: "milk", label: "Cold whole milk", amount: "120 ml" },
      { pantryId: "sugar", label: "Sugar, to taste", amount: "2 tsp", optional: true },
      { pantryId: "ice", label: "Ice cubes", amount: "1 cup" },
    ],
    [
      {
        id: "shaker", label: "Shaker", equipment: ["Shaker"], handTools: ["Fine sieve", "Tall glass"],
        steps: ["Steep the tea in the hot water for 4 minutes, then strain.", "Stir the taro powder and the sugar (if using) into the hot tea until completely smooth.", "Add the milk and the ice to the shaker with the tea and shake for 15 seconds.", "Pour into a tall glass and serve."],
      },
      {
        id: "by-hand", label: "By hand", equipment: [], handTools: ["Fine sieve", "Lidded jar", "Tall glass"],
        steps: ["Steep the tea in the hot water for 4 minutes, then strain.", "Stir the taro powder and the sugar (if using) into the hot tea until completely smooth.", "Add the milk and the ice to a lidded jar with the tea and shake hard for 15 seconds.", "Pour into a tall glass and serve."],
      },
    ]
  ),
  drink(
    {
      id: "matcha-lemonade", title: "Matcha Lemonade", type: "Tea", temperature: "cold", diet: ["Vegan", "Dairy-Free", "Gluten-Free"], taste: ["Tangy", "Refreshing", "Herbal"],
      description: "Whisked matcha floated over cold lemonade and ice: sweet and tart below, grassy and earthy on top.",
      prep: 4, make: 3, difficulty: "Easy", image: pexels(35380299),
      notes: "Pour the matcha in slowly over the back of a spoon for two layers, or stir for a uniformly pale green drink.",
    },
    [
      { pantryId: "matcha-powder", label: "Matcha powder, sifted", amount: "1 tsp" },
      { pantryId: "water", label: "Hot water, about 80°C", amount: "60 ml" },
      { pantryId: "lemonade", label: "Cold lemonade", amount: "150 ml" },
      { pantryId: "ice", label: "Ice cubes", amount: "1 cup" },
    ],
    [
      {
        id: "matcha-whisk", label: "Matcha whisk", equipment: ["Matcha Whisk"], handTools: ["Wide bowl", "Fine sieve", "Tall glass"],
        steps: ["Sift the matcha into a warm bowl, add the hot water and whisk in a 'W' motion for 15–20 seconds until smooth and frothy.", "Fill a tall glass with ice and pour in the lemonade.", "Pour the matcha slowly over the back of a spoon so it floats on top. Serve with a straw."],
      },
      {
        id: "milk-frother", label: "Hand frother", equipment: ["Milk Frother"], handTools: ["Bowl", "Fine sieve", "Tall glass"],
        steps: ["Sift the matcha into a bowl, add the hot water and froth for 15–20 seconds until smooth.", "Fill a tall glass with ice and pour in the lemonade.", "Pour the matcha slowly over the back of a spoon so it floats on top. Serve with a straw."],
      },
      {
        id: "by-hand", label: "By hand", equipment: [], handTools: ["Lidded jar", "Fine sieve", "Tall glass"],
        steps: ["Sift the matcha into a lidded jar, add the hot water, close the lid and shake hard for 15–20 seconds until smooth.", "Fill a tall glass with ice and pour in the lemonade.", "Pour the matcha slowly over the top so it floats. Serve with a straw."],
      },
    ]
  ),
];
