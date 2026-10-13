import type { EquipmentTag, Recipe } from "@/types";

/**
 * Coffee drinks. Photography is real, free-to-use Pexels photography, each checked against its drink.
 * Amounts are for the number of servings shown; a double shot (18 g of coffee) is the base for the milk drinks.
 */

/** Any of these makes the strong, concentrated coffee that milk and ice drinks are built on. */
const STRONG_COFFEE: EquipmentTag[] = ["Espresso Machine", "Moka Pot", "AeroPress"];

const pexels = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`;

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
      { pantryId: "water", label: "Water, through the machine (or moka pot)", amount: "40 ml" },
      { pantryId: "milk", label: "Cold whole milk, for steaming", amount: "120 ml" },
      { pantryId: "cocoa-powder", label: "Cocoa powder, to dust the top", amount: "1 pinch", optional: true },
    ],
    equipment: [],
    equipmentAnyOf: [STRONG_COFFEE],
    optionalEquipment: [
      { tag: "Milk Frother", without: "Warm the milk in a saucepan to 60–65°C, then whisk hard or shake it in a lidded jar until foamy." },
    ],
    steps: [
      "Warm your cup with hot water, then tip it out.",
      "Make a double shot: 18 g of finely ground coffee pulled into about 40 ml of espresso (or the strongest, smallest cup your moka pot or AeroPress makes) and pour it into the cup.",
      "Steam or froth the milk to 60–65°C. You want it dense and glossy, with a thick layer of foam about 2 cm deep — thicker than for a latte.",
      "Tap the jug on the counter and swirl it to knock out any big bubbles.",
      "Hold the cup at an angle and pour the milk into the centre of the espresso, letting the foam spoon in last so it sits as a cap.",
      "Dust with a pinch of cocoa if you like, and drink while the foam is still tall.",
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
    equipment: [],
    equipmentAnyOf: [STRONG_COFFEE],
    steps: [
      "Fill a tall glass with ice cubes.",
      "Pour 150 ml of cold water over the ice.",
      "Make a double shot: 18 g of finely ground coffee pulled into about 40 ml of espresso, or the strongest coffee your moka pot or AeroPress makes.",
      "Pour the hot shot straight over the ice and water — it cools instantly and keeps its aroma.",
      "Give it a stir and drink right away, before the ice melts and thins it.",
    ],
    notes: "Pour the shot last, over the ice, rather than adding ice to the espresso: this keeps the coffee from tasting flat or watery.",
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
    equipment: [],
    equipmentAnyOf: [["Phin Filter", "French Press", "AeroPress", "Moka Pot"]],
    steps: [
      "Spoon the condensed milk into the bottom of a heatproof glass.",
      "Set the phin filter on top. Add the coffee, level it and gently press the insert on top. (No phin? Brew the same coffee strong in a French press or AeroPress with the 100 ml of water, and pour it in.)",
      "Pour in a splash of hot water to wet the grounds, wait 30 seconds so they bloom, then fill the filter with the rest of the water and put the lid on.",
      "Let it drip, about 4–6 minutes. It should come slowly, a drop at a time.",
      "Stir the coffee into the condensed milk until it is one smooth, dark caramel colour.",
      "Fill a second glass with ice and pour the coffee over it. Drink right away.",
    ],
    notes: "Vietnamese coffee is traditionally robusta, which is why it is so dark and strong. Adjust the sweetness by the spoonful of condensed milk.",
  },
];
