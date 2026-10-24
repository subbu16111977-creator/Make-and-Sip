import type { Method, Recipe, RecipeIngredient } from "@/types";
import { drink, pexels, type DrinkFacts } from "./builders";

/** Boba (bubble tea): tea or milk drinks served over tapioca pearls or popping boba, drunk through a wide straw. */

const PEARLS: RecipeIngredient = { pantryId: "tapioca-pearls", label: "Quick-cook tapioca pearls", amount: "40 g" };
const SYRUP: RecipeIngredient = { pantryId: "brown-sugar", label: "Brown sugar, for the pearl syrup", amount: "2 tbsp" };
const ice = (cups = 1): RecipeIngredient => ({ pantryId: "ice", label: "Ice cubes", amount: `${cups} ${cups === 1 ? "cup" : "cups"}` });

const COOK_PEARLS = "Cook the tapioca pearls in boiling water as the packet says (quick-cook pearls take about 5 minutes), then cover and leave for 5 minutes. Drain and rinse under cold water.";
const SYRUP_PEARLS = "Dissolve the brown sugar in 2 tbsp of hot water, and stir the warm pearls into it. Spoon them into the bottom of a tall glass.";

interface BobaSpec {
  /** Steps that make the tea or milk base, cooled (the same for every method). */
  base: string[];
  /** The ingredients, with the pearls line included. */
  ingredients: RecipeIngredient[];
  /** Skips cooking pearls (for popping boba, which is ready to use). */
  noPearls?: boolean;
  /** How the base, milk and ice are mixed. */
  mix: string;
  /** Final steps. */
  after?: string[];
  handTools?: string[];
}

function bobaMethods(spec: BobaSpec): Method[] {
  const pearls = spec.noPearls ? [] : [COOK_PEARLS, SYRUP_PEARLS];
  const after = spec.after ?? ["Pour over the pearls and serve right away, with a wide straw."];
  return [
    { id: "shaker", label: "Shaker", equipment: ["Shaker"], handTools: [...(spec.handTools ?? []), "Saucepan", "Tall glass"], steps: [...pearls, ...spec.base, `${spec.mix} in the shaker for 15 seconds.`, ...after] },
    { id: "by-hand", label: "By hand", equipment: [], handTools: [...(spec.handTools ?? []), "Saucepan", "Lidded jar", "Tall glass"], steps: [...pearls, ...spec.base, `${spec.mix} in a tightly lidded jar, shaking hard for 15 seconds.`, ...after] },
  ];
}

function boba(facts: Omit<DrinkFacts, "type" | "temperature">, spec: BobaSpec): Recipe {
  return drink({ ...facts, type: "Tea", temperature: "cold" }, spec.ingredients, bobaMethods(spec));
}

const NOTE_PEARLS = "Cooked pearls are best within a couple of hours: they harden as they cool. Popping boba needs no cooking.";

export const bobaDrinks: Recipe[] = [
  drink(
    {
      id: "brown-sugar-boba-milk", title: "Brown Sugar Boba Milk", type: "Milkshakes & thick shakes", temperature: "cold", diet: ["Caffeine-Free", "Gluten-Free"], taste: ["Sweet", "Creamy", "Rich"],
      description: "Cold milk over chewy pearls soaked in dark brown sugar syrup, which streaks the glass in tiger-stripes — no tea, just milk and caramel.",
      prep: 10, make: 15, difficulty: "Medium", image: pexels(6412828), notes: NOTE_PEARLS,
    },
    [
      PEARLS,
      { pantryId: "brown-sugar", label: "Dark brown sugar", amount: "3 tbsp" },
      { pantryId: "water", label: "Water, for the syrup", amount: "3 tbsp" },
      { pantryId: "milk", label: "Cold whole milk", amount: "200 ml" },
      ice(1),
    ],
    [{
      id: "saucepan", label: "Saucepan", equipment: [], handTools: ["Saucepan", "Tall glass", "Spoon"],
      steps: [COOK_PEARLS, "Simmer the brown sugar and water in a small saucepan for 3–4 minutes until syrupy, then stir in the pearls and simmer for another 2 minutes.", "Spoon the pearls and syrup into a tall glass and swirl so the syrup streaks down the inside.", "Add the ice, pour the cold milk over the top and serve with a wide straw. Stir before drinking."],
    }]
  ),
  boba(
    {
      id: "taro-boba-milk-tea", title: "Taro Boba Milk Tea", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Rich"],
      description: "Pale purple taro milk tea over chewy pearls: nutty, vanilla-sweet and the favourite flavour at most boba shops.",
      prep: 10, make: 15, difficulty: "Medium", image: pexels(12666797), notes: NOTE_PEARLS,
    },
    {
      ingredients: [PEARLS, SYRUP, { pantryId: "taro-powder", label: "Taro powder", amount: "2 tbsp" }, { pantryId: "water", label: "Hot water", amount: "50 ml" }, { pantryId: "milk", label: "Cold whole milk", amount: "150 ml" }, ice(1)],
      base: ["Whisk the taro powder into the hot water in a bowl until completely smooth, and let it cool for a few minutes."],
      mix: "Add the taro, the milk and the ice and shake them together",
    }
  ),
  boba(
    {
      id: "thai-boba-tea", title: "Thai Boba Tea", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Rich"],
      description: "Thai iced tea with a layer of pearls at the bottom: spiced black tea, condensed milk and evaporated milk, in bright orange.",
      prep: 10, make: 20, difficulty: "Medium", image: pexels(33241809), notes: NOTE_PEARLS,
    },
    {
      ingredients: [PEARLS, SYRUP, { pantryId: "black-tea", label: "Strong black tea or Thai tea mix", amount: "2 tbsp" }, { pantryId: "star-anise", label: "Star anise", amount: "1" }, { pantryId: "water", label: "Boiling water", amount: "200 ml" }, { pantryId: "sweetened-condensed-milk", label: "Sweetened condensed milk", amount: "30 ml" }, { pantryId: "evaporated-milk", label: "Evaporated milk", amount: "40 ml" }, ice(1)],
      base: ["Boil the 200 ml of water with the star anise, add the tea and steep for 5 minutes. Strain, stir in the condensed milk and let it cool for 10 minutes."],
      mix: "Add the tea and the ice and shake them together", after: ["Pour over the pearls, swirl the evaporated milk over the top and serve with a wide straw."],
    }
  ),
  boba(
    {
      id: "hong-kong-boba-milk-tea", title: "Hong Kong Boba Milk Tea", diet: ["Gluten-Free"], taste: ["Creamy", "Rich", "Sweet"],
      description: "Strong Hong Kong-style milk tea made with evaporated milk, poured over chewy pearls.",
      prep: 10, make: 20, difficulty: "Medium", image: pexels(12666754), notes: NOTE_PEARLS,
    },
    {
      ingredients: [PEARLS, SYRUP, { pantryId: "black-tea", label: "Strong black tea", amount: "3 tsp" }, { pantryId: "water", label: "Water", amount: "200 ml" }, { pantryId: "evaporated-milk", label: "Evaporated milk", amount: "80 ml" }, ice(1)],
      base: ["Boil the 200 ml of water in a saucepan, add the tea and simmer for 4 minutes. Strain it and let it cool for 10 minutes."],
      mix: "Add the tea, the evaporated milk and the ice and shake them together",
    }
  ),
  boba(
    {
      id: "matcha-boba-latte", title: "Matcha Boba Latte", diet: ["Gluten-Free"], taste: ["Creamy", "Herbal", "Sweet"],
      description: "An iced matcha latte served over chewy pearls: grassy, creamy and lightly sweet.",
      prep: 10, make: 15, difficulty: "Medium", image: pexels(35727299), notes: NOTE_PEARLS,
    },
    {
      ingredients: [PEARLS, SYRUP, { pantryId: "matcha-powder", label: "Matcha powder, sifted", amount: "1.5 tsp" }, { pantryId: "water", label: "Hot water, about 80°C", amount: "60 ml" }, { pantryId: "milk", label: "Cold milk", amount: "180 ml" }, ice(1)],
      base: ["Whisk the matcha with the hot water in a small bowl, or shake it in a jar, until smooth. Let it cool for a minute."],
      mix: "Add the matcha, the milk and the ice and shake them together",
    }
  ),
  boba(
    {
      id: "jasmine-milk-tea-with-boba", title: "Jasmine Milk Tea with Boba", diet: ["Gluten-Free"], taste: ["Creamy", "Herbal", "Sweet"],
      description: "Floral jasmine tea mixed with cold milk and a little syrup, over pearls — light and fragrant.",
      prep: 10, make: 20, difficulty: "Medium", image: pexels(11160122), notes: NOTE_PEARLS,
    },
    {
      ingredients: [PEARLS, SYRUP, { pantryId: "jasmine-tea", label: "Jasmine tea, loose leaf", amount: "2 tsp" }, { pantryId: "water", label: "Water, just off the boil", amount: "200 ml" }, { pantryId: "milk", label: "Cold whole milk", amount: "80 ml" }, ice(1)],
      base: ["Steep the jasmine tea in the 200 ml of hot water for 4 minutes. Strain it and let it cool for 10 minutes."],
      mix: "Add the tea, the milk and the ice and shake them together",
    }
  ),
  boba(
    {
      id: "honey-boba-milk-tea", title: "Honey Boba Milk Tea", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy"],
      description: "Black milk tea sweetened with honey instead of syrup, over soft pearls: gentler and more floral than the brown sugar versions.",
      prep: 10, make: 20, difficulty: "Medium", image: pexels(8911656), notes: NOTE_PEARLS,
    },
    {
      ingredients: [PEARLS, SYRUP, { pantryId: "black-tea", label: "Black tea", amount: "2 tsp" }, { pantryId: "water", label: "Boiling water", amount: "150 ml" }, { pantryId: "honey", label: "Honey", amount: "1 tbsp" }, { pantryId: "milk", label: "Cold whole milk", amount: "100 ml" }, ice(1)],
      base: ["Steep the tea in the 150 ml of boiling water for 4 minutes. Strain, stir in the honey and let it cool for 10 minutes."],
      mix: "Add the tea, the milk and the ice and shake them together",
    }
  ),
  boba(
    {
      id: "passion-fruit-tea-with-popping-boba", title: "Passion Fruit Tea with Popping Boba", diet: ["Dairy-Free", "Gluten-Free"], taste: ["Fruity", "Tangy", "Refreshing"],
      description: "Iced green tea with tangy passion fruit pulp and honey, topped with juice-filled popping boba that burst as you sip.",
      prep: 5, make: 5, difficulty: "Easy", image: pexels(35137081),
    },
    {
      ingredients: [{ pantryId: "popping-boba", label: "Popping boba", amount: "2 tbsp" }, { pantryId: "green-tea", label: "Green tea", amount: "2 tsp" }, { pantryId: "water", label: "Hot water, about 80°C", amount: "150 ml" }, { pantryId: "passion-fruit", label: "Passion fruit pulp", amount: "2 tbsp" }, { pantryId: "honey", label: "Honey", amount: "1 tbsp" }, ice(1)],
      base: ["Steep the green tea in the 150 ml of hot water for 2 minutes. Strain it, stir in the honey and let it cool for 10 minutes."], noPearls: true,
      mix: "Add the tea, the passion fruit pulp and the ice and shake them together", after: ["Spoon the popping boba into a tall glass, pour the tea over it and serve with a wide straw."],
    }
  ),
];
