import type { Recipe, RecipeIngredient } from "@/types";

/**
 * Coffee drinks. Photography is real, free-to-use Pexels photography, each checked against its drink.
 *
 * Every drink lists the ways to make it (`methods`). A method names the equipment it needs, or none for a "by hand"
 * way; the drink's own `ingredients` are the standard amounts (the first method's), and a method gives its own
 * `ingredients` only where they differ (a moka pot uses less coffee than an espresso machine; by hand uses instant).
 */

const pexels = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`;

const FROTH_OPTIONAL = {
  tag: "Milk Frother" as const,
  without: "Warm the milk in a saucepan to 60–65°C, then whisk hard or shake it in a lidded jar until foamy.",
};

/** The same milk and cocoa lines, reused by every cappuccino method. */
const cappuccinoMilk: RecipeIngredient[] = [
  { pantryId: "milk", label: "Cold whole milk, for steaming", amount: "120 ml" },
  { pantryId: "cocoa-powder", label: "Cocoa powder, to dust the top", amount: "1 pinch", optional: true },
];

export const coffeeDrinks: Recipe[] = [
  {
    id: "cappuccino",
    title: "Cappuccino",
    description: "Equal parts espresso, steamed milk and a cap of dense foam — small, strong and softly sweet from the milk.",
    cuisine: "Coffee",
    temperature: "hot",
    dietTags: ["Gluten-Free"],
    tasteTags: ["Creamy", "Bitter"],
    timeMinutes: 8,
    prepMinutes: 5,
    cookMinutes: 3,
    difficulty: "Medium",
    servings: 1,
    budget: "$",
    image: pexels(997670),
    imageAttribution: "Pexels",
    ingredients: [
      { pantryId: "ground-coffee", label: "Finely ground coffee, espresso grind", amount: "18 g" },
      { pantryId: "water", label: "Water, through the machine", amount: "40 ml" },
      ...cappuccinoMilk,
    ],
    methods: [
      {
        id: "espresso-machine",
        label: "Espresso machine",
        equipment: ["Espresso Machine"],
        steps: [
          "Warm your cup with hot water, then tip it out.",
          "Make a double shot: 18 g of finely ground coffee pulled into about 40 ml of espresso, straight into the cup.",
          "Steam the milk with the wand to 60–65°C. You want it dense and glossy, with a thick layer of foam about 2 cm deep — thicker than for a latte.",
          "Tap the jug on the counter and swirl it to knock out any big bubbles.",
          "Hold the cup at an angle and pour the milk into the centre of the espresso, letting the foam spoon in last so it sits as a cap.",
          "Dust with a pinch of cocoa if you like, and drink while the foam is still tall.",
        ],
      },
      {
        id: "moka-pot",
        label: "Moka pot",
        equipment: ["Moka Pot"],
        handTools: ["Saucepan"],
        optionalEquipment: [FROTH_OPTIONAL],
        ingredients: [
          { pantryId: "ground-coffee", label: "Medium-fine ground coffee", amount: "15 g" },
          { pantryId: "water", label: "Hot water, for the moka pot", amount: "130 ml" },
          ...cappuccinoMilk,
        ],
        steps: [
          "Fill the base of the moka pot with hot water up to just below the safety valve, then fill the basket with the coffee, levelled but not pressed down.",
          "Screw the pot together and set it on medium-low heat with the lid open. When it starts to gurgle and turns pale, take it off the heat and pour the coffee into your cup.",
          "Heat the milk in a saucepan to 60–65°C, without letting it boil. Froth it with a milk frother, or pour it into a lidded jar and shake hard for 30 seconds.",
          "Hold the cup at an angle and pour the milk into the coffee, spooning the foam on last.",
          "Dust with a pinch of cocoa if you like.",
        ],
        notes: "A moka pot makes a strong, espresso-style coffee, so this stays close to a true cappuccino.",
      },
      {
        id: "aeropress",
        label: "AeroPress",
        equipment: ["AeroPress"],
        handTools: ["Saucepan"],
        optionalEquipment: [FROTH_OPTIONAL],
        ingredients: [
          { pantryId: "ground-coffee", label: "Fine ground coffee", amount: "17 g" },
          { pantryId: "water", label: "Hot water, about 85°C", amount: "60 ml" },
          ...cappuccinoMilk,
        ],
        steps: [
          "Set the AeroPress upright on your cup, add a filter and the 17 g of fine coffee, and pour in 60 ml of hot water. Stir for 10 seconds.",
          "Insert the plunger and press down slowly and steadily for about 30 seconds, straight into the cup.",
          "Heat the milk in a saucepan to 60–65°C and froth it hard — a milk frother, or a lidded jar shaken for 30 seconds.",
          "Pour the milk into the coffee, spooning the foam on last, and dust with cocoa if you like.",
        ],
      },
      {
        id: "by-hand",
        label: "By hand",
        equipment: [],
        handTools: ["Saucepan", "Lidded jar", "Spoon"],
        ingredients: [
          { pantryId: "instant-coffee", label: "Instant coffee, for a strong base", amount: "2 tsp" },
          { pantryId: "water", label: "Just-boiled water", amount: "40 ml" },
          ...cappuccinoMilk,
        ],
        steps: [
          "Dissolve the instant coffee in 40 ml of just-boiled water in your cup and stir until smooth. Keep it strong — that is what stands in for the espresso.",
          "Heat the milk in a saucepan until steaming, about 60–65°C, without letting it boil.",
          "Pour the hot milk into a lidded jar, fasten the lid tightly and shake hard for 30–45 seconds, until the milk has roughly doubled and is thick with fine foam.",
          "Hold the cup at an angle and pour in the milk, spooning the foam on top.",
          "Dust with a pinch of cocoa if you like.",
        ],
        notes: "No machine needed. It won't have espresso's crema, but strong instant coffee and well-shaken milk make a convincing cappuccino.",
      },
    ],
    notes: "The traditional proportion is thirds: one third espresso, one third milk, one third foam. If it comes out thin, the milk wasn't frothed long enough.",
  },
  {
    id: "iced-americano",
    title: "Iced Americano",
    description: "A double shot of espresso over cold water and ice — clean, bright and bitter in the best way. Nothing in it but coffee.",
    cuisine: "Coffee",
    temperature: "cold",
    dietTags: ["Vegan", "Dairy-Free", "Low Sugar", "Gluten-Free"],
    tasteTags: ["Bitter", "Refreshing"],
    timeMinutes: 5,
    prepMinutes: 3,
    cookMinutes: 2,
    difficulty: "Easy",
    servings: 1,
    budget: "$",
    image: pexels(32550065),
    imageAttribution: "Pexels",
    ingredients: [
      { pantryId: "ground-coffee", label: "Finely ground coffee, espresso grind", amount: "18 g" },
      { pantryId: "water", label: "Water, through the machine for the shot, plus cold water to dilute", amount: "190 ml" },
      { pantryId: "ice", label: "Ice cubes", amount: "1 cup" },
    ],
    methods: [
      {
        id: "espresso-machine",
        label: "Espresso machine",
        equipment: ["Espresso Machine"],
        steps: [
          "Fill a tall glass with ice cubes and pour 150 ml of cold water over the ice.",
          "Make a double shot: 18 g of finely ground coffee pulled into about 40 ml of espresso.",
          "Pour the hot shot straight over the ice and water — it cools instantly and keeps its aroma.",
          "Give it a stir and drink right away, before the ice melts and thins it.",
        ],
        notes: "Pour the shot last, over the ice, rather than adding ice to the espresso: this keeps the coffee from tasting flat or watery.",
      },
      {
        id: "moka-pot",
        label: "Moka pot",
        equipment: ["Moka Pot"],
        ingredients: [
          { pantryId: "ground-coffee", label: "Medium-fine ground coffee", amount: "15 g" },
          { pantryId: "water", label: "Hot water for the moka pot, plus cold water to dilute", amount: "230 ml" },
          { pantryId: "ice", label: "Ice cubes", amount: "1 cup" },
        ],
        steps: [
          "Fill the base of the moka pot with 130 ml of hot water, fill the basket with the 15 g of coffee (levelled, not pressed) and set it on medium-low heat with the lid open.",
          "Fill a tall glass with ice and pour 100 ml of cold water over it.",
          "When the moka pot gurgles and the coffee turns pale, take it off the heat and pour the coffee over the ice.",
          "Stir and drink right away.",
        ],
      },
      {
        id: "aeropress",
        label: "AeroPress",
        equipment: ["AeroPress"],
        ingredients: [
          { pantryId: "ground-coffee", label: "Fine ground coffee", amount: "17 g" },
          { pantryId: "water", label: "Hot water for the brew (about 85°C), plus cold water to dilute", amount: "200 ml" },
          { pantryId: "ice", label: "Ice cubes", amount: "1 cup" },
        ],
        steps: [
          "Fill a tall glass with ice and pour 140 ml of cold water over it.",
          "Set the AeroPress on a small jug, add a filter and 17 g of fine coffee, and pour in 60 ml of hot water. Stir for 10 seconds.",
          "Press down slowly for about 30 seconds into the jug, then pour the concentrate over the ice.",
          "Stir and drink right away.",
        ],
      },
      {
        id: "by-hand",
        label: "By hand",
        equipment: [],
        handTools: ["Tall glass", "Spoon"],
        ingredients: [
          { pantryId: "instant-coffee", label: "Instant coffee, for a strong base", amount: "2 tsp" },
          { pantryId: "water", label: "Just-boiled water for the coffee, plus cold water to dilute", amount: "190 ml" },
          { pantryId: "ice", label: "Ice cubes", amount: "1 cup" },
        ],
        steps: [
          "Stir the instant coffee into 40 ml of just-boiled water until it is completely dissolved. Keep it concentrated.",
          "Fill a tall glass with ice and pour 150 ml of cold water over it.",
          "Pour the hot coffee over the ice and water, stir and drink right away.",
        ],
        notes: "It is the quickest way to an iced coffee with no equipment at all; go for a good-quality instant for a cleaner taste.",
      },
    ],
  },
  {
    id: "vietnamese-iced-coffee",
    title: "Vietnamese Iced Coffee (Cà Phê Sữa Đá)",
    description: "Dark, slow-dripped coffee over a spoonful of sweetened condensed milk and ice — thick, sweet and very strong.",
    cuisine: "Coffee",
    temperature: "cold",
    dietTags: ["Gluten-Free"],
    tasteTags: ["Sweet", "Creamy", "Rich"],
    timeMinutes: 10,
    prepMinutes: 3,
    cookMinutes: 7,
    difficulty: "Easy",
    servings: 1,
    budget: "$",
    image: pexels(14226658),
    imageAttribution: "Pexels",
    ingredients: [
      { pantryId: "ground-coffee", label: "Dark-roast ground coffee, medium-coarse", amount: "20 g" },
      { pantryId: "water", label: "Hot water, just off the boil", amount: "100 ml" },
      { pantryId: "sweetened-condensed-milk", label: "Sweetened condensed milk", amount: "30 ml" },
      { pantryId: "ice", label: "Ice cubes", amount: "1 cup" },
    ],
    methods: [
      {
        id: "phin-filter",
        label: "Phin filter",
        equipment: ["Phin Filter"],
        steps: [
          "Spoon the condensed milk into the bottom of a heatproof glass and set the phin filter on top.",
          "Add the coffee, level it and gently press the insert on top.",
          "Pour in a splash of hot water to wet the grounds, wait 30 seconds so they bloom, then fill the filter with the rest of the water and put the lid on.",
          "Let it drip, about 4–6 minutes. It should come slowly, a drop at a time.",
          "Stir the coffee into the condensed milk until it is one smooth, dark caramel colour.",
          "Fill a second glass with ice and pour the coffee over it. Drink right away.",
        ],
        notes: "Vietnamese coffee is traditionally robusta, which is why it is so dark and strong. Adjust the sweetness by the spoonful of condensed milk.",
      },
      {
        id: "french-press",
        label: "French press",
        equipment: ["French Press"],
        steps: [
          "Spoon the condensed milk into the bottom of a heatproof glass.",
          "Put the coffee in a small French press, pour in the hot water and stir. Put the lid on without pressing and leave it for 4 minutes.",
          "Press the plunger down slowly and pour the coffee into the glass with the condensed milk.",
          "Stir until smooth, then pour over a second glass of ice and drink right away.",
        ],
        notes: "Use a small press, or make a double batch in a normal one — a large press needs more coffee than this to stay strong.",
      },
      {
        id: "aeropress",
        label: "AeroPress",
        equipment: ["AeroPress"],
        steps: [
          "Spoon the condensed milk into a heatproof glass and set the AeroPress on top with a filter in place.",
          "Add the coffee, pour in the hot water, stir for 10 seconds and leave it for 2 minutes.",
          "Press down slowly into the glass, then stir the coffee into the condensed milk until smooth.",
          "Pour over a second glass of ice and drink right away.",
        ],
      },
      {
        id: "by-hand",
        label: "By hand",
        equipment: [],
        handTools: ["Heatproof glass", "Spoon"],
        optionalEquipment: [{ tag: "Strainer", without: "Let the grounds settle for a full minute and pour slowly, leaving the last sip behind." }],
        ingredients: [
          { pantryId: "ground-coffee", label: "Dark-roast ground coffee, medium-coarse", amount: "20 g" },
          { pantryId: "water", label: "Hot water, just off the boil", amount: "120 ml" },
          { pantryId: "sweetened-condensed-milk", label: "Sweetened condensed milk", amount: "30 ml" },
          { pantryId: "ice", label: "Ice cubes", amount: "1 cup" },
        ],
        steps: [
          "Stir the coffee into the hot water in a heatproof glass or mug. Cover it and leave it to steep for 5 minutes.",
          "Spoon the condensed milk into a second glass.",
          "Let the grounds settle for a minute, then pour the coffee slowly into the condensed milk, leaving the muddy last few drops behind.",
          "Stir until smooth, fill a third glass with ice, pour the coffee over it, and drink right away.",
        ],
        notes: "This is the 'cowboy coffee' way: no filter at all. A little sediment at the bottom is normal — just don't drink the last sip.",
      },
    ],
  },
];
