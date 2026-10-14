import type { Recipe, RecipeIngredient } from "@/types";
import { drink, pexels } from "./builders";
import { steepIngredients, steepMethods, type SteepSpec } from "./teaBuilders";

/** Hot black teas and milk teas from Britain, India, Hong Kong, Malaysia and Russia. */

const milk = (ml: number, label = "Whole milk"): RecipeIngredient => ({ pantryId: "milk", label, amount: `${ml} ml` });
const sugar = (tsp: number): RecipeIngredient => ({ pantryId: "sugar", label: "Sugar, to taste", amount: `${tsp} tsp`, optional: true });
const bag = (pantryId: string, name: string, tsp = 1): RecipeIngredient => ({ pantryId, label: `${name}: 1 tea bag or ${tsp} tsp loose leaf`, amount: `${tsp} tsp` });

/** A drink built from the shared teapot / French press / by-hand methods. */
const steeped = (facts: Parameters<typeof drink>[0], spec: SteepSpec): Recipe => drink(facts, steepIngredients(spec), steepMethods(spec));

export const blackTeas: Recipe[] = [
  steeped(
    {
      id: "english-breakfast-tea", title: "English Breakfast Tea", type: "Tea", temperature: "hot", diet: ["Gluten-Free"], taste: ["Rich", "Bitter"],
      description: "A robust blend of black teas, brewed strong and finished with a splash of milk — the standard morning cup.",
      prep: 2, make: 5, difficulty: "Easy", image: pexels(34009456),
      sourceName: "Wikipedia — English breakfast tea", sourceUrl: "https://en.wikipedia.org/wiki/English_breakfast_tea",
      notes: "Milk is a matter of taste: some add it to the cup first, most add it after the tea has brewed.",
    },
    { leaf: bag("black-tea", "English breakfast tea"), waterMl: 250, tempC: 100, minutes: 4, lines: [milk(30), sugar(1)], after: ["Add a splash of milk and sugar to taste, stir and drink hot."] }
  ),
  steeped(
    {
      id: "earl-grey-tea", title: "Earl Grey Tea", type: "Tea", temperature: "hot", diet: ["Vegan", "Dairy-Free", "Low Sugar", "Gluten-Free"], taste: ["Herbal", "Refreshing"],
      description: "Black tea scented with bergamot, an aromatic citrus — fragrant, light and good with a slice of lemon.",
      prep: 2, make: 5, difficulty: "Easy", image: pexels(15781496),
      sourceName: "Wikipedia — Earl Grey tea", sourceUrl: "https://en.wikipedia.org/wiki/Earl_Grey_tea",
      notes: "Steep it a little shorter than English breakfast: long steeping brings out bitterness and drowns the bergamot.",
    },
    { leaf: bag("earl-grey-tea", "Earl Grey tea"), waterMl: 250, tempC: 100, minutes: 3, lines: [{ pantryId: "lemon", label: "Lemon slice, or a splash of milk", amount: "1", optional: true }], after: ["Add a slice of lemon, or a splash of milk, and drink hot."] }
  ),
  steeped(
    {
      id: "builders-tea", title: "Builder's Tea", type: "Tea", temperature: "hot", diet: ["Gluten-Free"], taste: ["Rich", "Bitter", "Creamy"],
      description: "Britain's strong, dark mug of tea: a bag brewed hard, a generous splash of milk and a couple of sugars.",
      prep: 2, make: 4, difficulty: "Easy", image: pexels(374780),
      sourceName: "Wikipedia — Builder's tea", sourceUrl: "https://en.wikipedia.org/wiki/Builder%27s_tea",
      notes: "The tea is strong and the milk plenty — it should be the colour of a brick. Squeeze the tea bag against the side of the mug before taking it out.",
    },
    { leaf: bag("black-tea", "Black tea", 1), waterMl: 300, tempC: 100, minutes: 3, lines: [milk(50), sugar(2)], after: ["Squeeze the tea bag against the side of the mug, if you used one, and remove it.", "Add the milk until the tea is a deep, orange-brown, and sugar to taste. Stir and drink hot."] }
  ),
  steeped(
    {
      id: "assam-tea", title: "Assam Tea", type: "Tea", temperature: "hot", diet: ["Gluten-Free"], taste: ["Rich", "Bitter"],
      description: "India's malty, full-bodied black tea, brewed strong and taken with milk and sugar — the base of most breakfast blends.",
      prep: 2, make: 5, difficulty: "Easy", image: pexels(17536089),
      sourceName: "Wikipedia — Assam tea", sourceUrl: "https://en.wikipedia.org/wiki/Assam_tea",
    },
    { leaf: { pantryId: "assam-tea", label: "Assam tea, loose leaf", amount: "2 tsp" }, waterMl: 250, tempC: 100, minutes: 4, lines: [milk(40), sugar(1)], after: ["Add milk and sugar to taste, stir and drink hot, or drink it as it is."] }
  ),
  steeped(
    {
      id: "darjeeling-tea", title: "Darjeeling Tea", type: "Tea", temperature: "hot", diet: ["Vegan", "Dairy-Free", "Low Sugar", "Gluten-Free"], taste: ["Herbal", "Refreshing"],
      description: "A light, floral black tea from the Himalayan foothills, brewed gently and drunk without milk.",
      prep: 2, make: 5, difficulty: "Easy", image: pexels(15211517),
      sourceName: "Wikipedia — Darjeeling tea", sourceUrl: "https://en.wikipedia.org/wiki/Darjeeling_tea",
      notes: "Its delicate muscatel flavour is easily overpowered: a slightly cooler brew and a short steep keep it from turning bitter.",
    },
    { leaf: { pantryId: "darjeeling-tea", label: "Darjeeling tea, loose leaf", amount: "2 tsp" }, waterMl: 250, tempC: 90, minutes: 3, after: ["Drink it plain, or add a little honey if you like."] }
  ),
  drink(
    {
      id: "london-fog", title: "London Fog", type: "Tea", temperature: "hot", diet: ["Gluten-Free"], taste: ["Creamy", "Sweet", "Herbal"],
      description: "Earl Grey steeped in hot water, then topped with steamed milk and a little vanilla — a comforting tea latte.",
      prep: 4, make: 5, difficulty: "Easy", image: pexels(2262832),
      notes: "It was created in Vancouver in the 1990s, not London.",
    },
    [
      { pantryId: "earl-grey-tea", label: "Earl Grey tea: 1 tea bag or 2 tsp loose leaf", amount: "2 tsp" },
      { pantryId: "water", label: "Freshly boiled water", amount: "120 ml" },
      { pantryId: "milk", label: "Whole milk", amount: "120 ml" },
      { pantryId: "vanilla-syrup", label: "Vanilla syrup, or 1/4 tsp vanilla extract plus 1 tsp sugar", amount: "1 tsp" },
    ],
    [
      {
        id: "milk-frother", label: "Hand frother", equipment: ["Milk Frother"], handTools: ["Mug", "Saucepan"],
        steps: ["Steep the Earl Grey tea in the 120 ml of boiling water in a mug for 4 minutes, then remove the tea.", "Warm the milk in a saucepan until steaming, about 65°C, and froth it with the hand frother until it doubles in volume.", "Stir the vanilla syrup into the tea, pour in the frothed milk, spooning the foam on top, and serve."],
      },
      {
        id: "by-hand", label: "By hand", equipment: [], handTools: ["Mug", "Saucepan", "Lidded jar"],
        steps: ["Steep the Earl Grey tea in the 120 ml of boiling water in a mug for 4 minutes, then remove the tea.", "Warm the milk in a saucepan until steaming, about 65°C, pour it into a lidded jar and shake hard for 30 seconds until foamy.", "Stir the vanilla syrup into the tea, pour in the frothed milk, spooning the foam on top, and serve."],
      },
    ]
  ),
  drink(
    {
      id: "masala-chai", title: "Masala Chai", type: "Tea", temperature: "hot", diet: ["Gluten-Free"], taste: ["Spicy", "Creamy", "Sweet"],
      description: "India's spiced milk tea: black tea simmered with ginger, cardamom, cinnamon and cloves in milk, strained and sweetened.",
      prep: 5, make: 10, difficulty: "Easy", servings: 2, image: pexels(20270270),
      sourceName: "Wikipedia — Masala chai", sourceUrl: "https://en.wikipedia.org/wiki/Masala_chai",
      notes: "Boil the spices in water first, so they release their flavour before the milk goes in. Every household has its own mix.",
    },
    [
      { pantryId: "water", label: "Water", amount: "250 ml" },
      { pantryId: "ginger", label: "Fresh ginger, grated or crushed", amount: "10 g" },
      { pantryId: "cardamom", label: "Green cardamom pods, crushed", amount: "3" },
      { pantryId: "cinnamon-stick", label: "Cinnamon stick", amount: "1/2" },
      { pantryId: "cloves", label: "Cloves", amount: "2" },
      { pantryId: "black-tea", label: "Strong black tea (Assam CTC if you can)", amount: "2 tsp" },
      { pantryId: "milk", label: "Whole milk", amount: "250 ml" },
      { pantryId: "sugar", label: "Sugar, to taste", amount: "2 tsp", optional: true },
    ],
    [
      {
        id: "saucepan", label: "Saucepan", equipment: [], handTools: ["Saucepan", "Spoon", "Two cups"],
        optionalEquipment: [{ tag: "Strainer", without: "Pour slowly through a tea strainer or a fine sieve, or ladle the chai out carefully so the spices stay in the pan." }],
        steps: ["Put the water, ginger, cardamom, cinnamon and cloves in a saucepan and boil for 3 minutes, until the water is fragrant and beginning to colour.", "Add the tea and simmer for another minute, then pour in the milk and the sugar.", "Bring it back to a boil, then lower the heat and simmer for 3–4 minutes, stirring now and then, until it is a deep brown. Don't let it boil over.", "Strain into two cups and serve very hot."],
      },
    ]
  ),
  drink(
    {
      id: "irani-chai", title: "Irani Chai", type: "Tea", temperature: "hot", diet: ["Gluten-Free"], taste: ["Creamy", "Sweet", "Rich"],
      description: "Hyderabad's café tea: a dark decoction mixed with milk that has been simmered down until it is thick and slightly caramelised, with no spices needed.",
      prep: 4, make: 20, difficulty: "Medium", image: pexels(17473024),
      sourceName: "Wikipedia — Irani chai", sourceUrl: "https://en.wikipedia.org/wiki/Irani_chai",
      notes: "Served with Osmania biscuits at the Irani cafés. The slow-reduced milk is the point, so don't hurry it.",
    },
    [
      { pantryId: "milk", label: "Whole milk", amount: "250 ml" },
      { pantryId: "water", label: "Water, for the decoction", amount: "150 ml" },
      { pantryId: "black-tea", label: "Strong black tea", amount: "2 tsp" },
      { pantryId: "cardamom", label: "Green cardamom pod, crushed", amount: "1", optional: true },
      { pantryId: "sugar", label: "Sugar, to taste", amount: "2 tsp" },
    ],
    [
      {
        id: "two-pans", label: "Two saucepans", equipment: [], handTools: ["Two saucepans", "Spoon", "Small cups"],
        optionalEquipment: [{ tag: "Strainer", without: "Pour slowly through a fine sieve, or let the leaves settle and pour carefully." }],
        steps: ["Simmer the milk in one saucepan over low heat, stirring now and then, for 12–15 minutes, until it has reduced by about a third and turned a pale cream colour.", "While the milk reduces, boil the water with the tea and cardamom (if using) in a second saucepan for 5 minutes, until it is very dark.", "Stir the sugar into the reduced milk. Strain the tea decoction into small cups or glasses, about one-third full, and top up with the hot milk.", "Serve very hot."],
      },
    ]
  ),
  drink(
    {
      id: "kashmiri-kahwa", title: "Kashmiri Kahwa", type: "Tea", temperature: "hot", diet: ["Dairy-Free", "Gluten-Free"], taste: ["Spicy", "Herbal", "Sweet"],
      description: "A fragrant green tea from Kashmir, brewed with saffron, cardamom and cinnamon and sweetened with honey — golden and delicately spiced.",
      prep: 3, make: 8, difficulty: "Easy", servings: 2, image: pexels(32555737),
      sourceName: "Wikipedia — Kahwah", sourceUrl: "https://en.wikipedia.org/wiki/Kahwah",
      notes: "Traditionally brewed in a samovar and topped with sliced almonds.",
    },
    [
      { pantryId: "water", label: "Water", amount: "400 ml" },
      { pantryId: "cardamom", label: "Green cardamom pods, crushed", amount: "2" },
      { pantryId: "cinnamon-stick", label: "Cinnamon stick", amount: "1/2" },
      { pantryId: "saffron", label: "Saffron threads", amount: "4" },
      { pantryId: "green-tea", label: "Green tea leaves", amount: "2 tsp" },
      { pantryId: "honey", label: "Honey, to taste", amount: "2 tsp", optional: true },
    ],
    [
      {
        id: "saucepan", label: "Saucepan", equipment: [], handTools: ["Small saucepan", "Spoon", "Two cups"],
        optionalEquipment: [{ tag: "Strainer", without: "Pour carefully, or hold a spoon over the cup to keep the leaves and spices back." }],
        steps: ["Bring the water to a boil with the cardamom and cinnamon, and let it simmer for 3 minutes.", "Take the pan off the heat, add the green tea and the saffron, cover and leave for 2 minutes.", "Strain into two cups, and stir in the honey to taste. Drink hot."],
      },
      {
        id: "teapot", label: "Teapot", equipment: ["Teapot"], handTools: ["Small saucepan"],
        steps: ["Simmer the water with the cardamom and cinnamon for 3 minutes.", "Put the green tea and saffron in the teapot and pour in the spiced water. Cover and steep for 2 minutes.", "Pour through the strainer into two cups and stir in the honey to taste."],
      },
    ]
  ),
  drink(
    {
      id: "hong-kong-milk-tea", title: "Hong Kong Milk Tea", type: "Tea", temperature: "hot", diet: ["Gluten-Free"], taste: ["Creamy", "Rich", "Sweet"],
      description: "Strong black tea blended and stewed, then mixed with evaporated milk for a silky, smooth cup — Hong Kong's café drink, nicknamed 'silk-stocking milk tea'.",
      prep: 3, make: 10, difficulty: "Medium", image: pexels(13716994),
      sourceName: "Wikipedia — Hong Kong-style milk tea", sourceUrl: "https://en.wikipedia.org/wiki/Hong_Kong-style_milk_tea",
      notes: "The tea is stewed longer than usual and often filtered through a cloth bag, which is where the 'silk stocking' name comes from.",
    },
    [
      { pantryId: "water", label: "Water", amount: "300 ml" },
      { pantryId: "black-tea", label: "Strong black tea, Ceylon or a blend", amount: "3 tsp" },
      { pantryId: "evaporated-milk", label: "Evaporated milk", amount: "80 ml" },
      { pantryId: "sugar", label: "Sugar, to taste", amount: "1 tsp", optional: true },
    ],
    [
      {
        id: "cloth-filter", label: "Cloth filter", equipment: ["Cloth Filter"], handTools: ["Saucepan"],
        steps: ["Bring the water to a boil in a saucepan, add the tea, then lower the heat and simmer for 4 minutes.", "Pour the tea through the cloth filter into a cup or jug and discard the leaves.", "Stir in the evaporated milk and the sugar (if using) and serve hot."],
      },
      {
        id: "by-hand", label: "By hand", equipment: [], handTools: ["Saucepan", "Fine sieve"],
        steps: ["Bring the water to a boil in a saucepan, add the tea, then lower the heat and simmer for 4 minutes.", "Strain through a fine sieve into a cup or jug and discard the leaves.", "Stir in the evaporated milk and the sugar (if using) and serve hot."],
      },
    ]
  ),
  drink(
    {
      id: "teh-tarik", title: "Teh Tarik", type: "Tea", temperature: "hot", diet: ["Gluten-Free"], taste: ["Creamy", "Sweet", "Rich"],
      description: "Malaysia's 'pulled tea': strong black tea sweetened with condensed milk and poured back and forth between two mugs until it is frothy.",
      prep: 3, make: 8, difficulty: "Medium", image: pexels(29707146),
      sourceName: "Wikipedia — Teh tarik", sourceUrl: "https://en.wikipedia.org/wiki/Teh_tarik",
      notes: "Pulling cools the tea and gives it a thick froth. Keep the mugs close together at first and widen the gap gradually.",
    },
    [
      { pantryId: "water", label: "Water", amount: "250 ml" },
      { pantryId: "black-tea", label: "Strong black tea, dark roast", amount: "2 tsp" },
      { pantryId: "sweetened-condensed-milk", label: "Sweetened condensed milk", amount: "30 ml" },
      { pantryId: "evaporated-milk", label: "Evaporated milk", amount: "30 ml", optional: true },
    ],
    [
      {
        id: "cloth-filter", label: "Cloth filter", equipment: ["Cloth Filter"], handTools: ["Saucepan", "Two heatproof mugs"],
        steps: ["Boil the water in a saucepan, add the tea and simmer for 4 minutes.", "Pour the tea through the cloth filter into a heatproof mug, and stir in the condensed milk (and the evaporated milk, if using).", "Pour the tea back and forth between the two mugs from a height, 6–8 times, until it is frothy and a little cooler. Serve hot."],
      },
      {
        id: "by-hand", label: "By hand", equipment: [], handTools: ["Saucepan", "Fine sieve", "Two heatproof mugs"],
        steps: ["Boil the water in a saucepan, add the tea and simmer for 4 minutes.", "Strain through a fine sieve into a heatproof mug, and stir in the condensed milk (and the evaporated milk, if using).", "Pour the tea back and forth between the two mugs from a height, 6–8 times, until it is frothy and a little cooler. Serve hot."],
      },
    ]
  ),
  steeped(
    {
      id: "russian-tea", title: "Russian Tea (Zavarka)", type: "Tea", temperature: "hot", diet: ["Vegan", "Dairy-Free", "Gluten-Free"], taste: ["Rich", "Sweet", "Tangy"],
      description: "A very strong tea concentrate, kept warm and diluted with hot water to each person's liking — served with lemon, jam or sugar, never milk.",
      prep: 3, make: 8, difficulty: "Easy", servings: 2, image: pexels(8691919),
      sourceName: "Wikipedia — Russian tea culture", sourceUrl: "https://en.wikipedia.org/wiki/Tea_in_Russia",
      notes: "In Russia the zavarka sits on top of a samovar to stay warm, and the samovar tap supplies the hot water.",
    },
    {
      leaf: { pantryId: "black-tea", label: "Strong black tea", amount: "2 tbsp" }, waterMl: 150, tempC: 100, minutes: 5,
      lines: [{ pantryId: "water", label: "Hot water, to dilute", amount: "300 ml" }, { pantryId: "lemon", label: "Lemon slices", amount: "2", optional: true }, { pantryId: "sugar", label: "Sugar or jam, to taste", amount: "2 tsp", optional: true }],
      after: ["Pour about 50 ml of the strong tea into each cup or glass, then top up with 150 ml of hot water each.", "Add a slice of lemon and sugar or a spoonful of jam to taste."],
    }
  ),
];
