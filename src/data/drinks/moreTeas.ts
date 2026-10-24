import type { Recipe, RecipeIngredient } from "@/types";
import { drink, pexels } from "./builders";
import { coldSteepIngredients, coldSteepMethods, steepIngredients, steepMethods, type SteepSpec } from "./teaBuilders";

/** More iced, milk and regional teas: Hong Kong, Taiwan, Kerala, Malaysia and café-style tea lattes. */

const steeped = (facts: Parameters<typeof drink>[0], spec: SteepSpec): Recipe => drink(facts, steepIngredients(spec), steepMethods(spec));
const ice = (cups = 1, label = "Ice cubes"): RecipeIngredient => ({ pantryId: "ice", label, amount: `${cups} ${cups === 1 ? "cup" : "cups"}` });

export const moreTeas: Recipe[] = [
  steeped(
    {
      id: "hong-kong-iced-lemon-tea", title: "Hong Kong Iced Lemon Tea", type: "Tea", temperature: "cold", diet: ["Vegan", "Dairy-Free", "Gluten-Free"], taste: ["Tangy", "Sweet", "Refreshing"],
      description: "The café-teahouse classic: strong black tea over ice with plenty of lemon slices and syrup, pressed and stirred in the glass.",
      prep: 4, make: 6, difficulty: "Easy", image: pexels(19237456),
      notes: "Press the lemon slices against the side of the glass with a spoon: the peel's oils are what give the drink its aroma.",
    },
    {
      leaf: { pantryId: "black-tea", label: "Strong black tea", amount: "2 tsp" }, waterMl: 150, tempC: 100, minutes: 4,
      lines: [{ pantryId: "lemon", label: "Lemon, thinly sliced", amount: "1/2" }, { pantryId: "sugar", label: "Sugar", amount: "2 tbsp" }, ice(1)],
      after: ["Stir the sugar into the hot tea until completely dissolved.", "Put the lemon slices in a tall glass, press them lightly with a spoon, then fill the glass with ice and pour the tea over it. Stir and serve."],
    }
  ),
  drink(
    {
      id: "hong-kong-iced-milk-tea", title: "Hong Kong Iced Milk Tea", type: "Tea", temperature: "cold", diet: ["Gluten-Free"], taste: ["Creamy", "Rich", "Sweet"],
      description: "Hong Kong milk tea chilled over ice: strongly brewed black tea with evaporated milk, smooth and a little sweet.",
      prep: 3, make: 10, difficulty: "Medium", image: pexels(8980388),
      sourceName: "Wikipedia — Hong Kong-style milk tea", sourceUrl: "https://en.wikipedia.org/wiki/Hong_Kong-style_milk_tea",
    },
    [
      { pantryId: "water", label: "Water", amount: "250 ml" },
      { pantryId: "black-tea", label: "Strong black tea, Ceylon or a blend", amount: "3 tsp" },
      { pantryId: "evaporated-milk", label: "Evaporated milk", amount: "80 ml" },
      { pantryId: "sugar", label: "Sugar, to taste", amount: "2 tsp" },
      { pantryId: "ice", label: "Ice cubes", amount: "1 cup" },
    ],
    [
      {
        id: "cloth-filter", label: "Cloth filter", equipment: ["Cloth Filter"], handTools: ["Saucepan", "Tall glass"],
        steps: ["Boil the water in a saucepan, add the tea and simmer for 4 minutes.", "Pour the tea through the cloth filter into a jug and stir in the sugar until dissolved. Let it cool for 5 minutes.", "Fill a tall glass with ice, pour in the tea and the evaporated milk, stir and serve."],
      },
      {
        id: "by-hand", label: "By hand", equipment: [], handTools: ["Saucepan", "Fine sieve", "Tall glass"],
        steps: ["Boil the water in a saucepan, add the tea and simmer for 4 minutes.", "Strain through a fine sieve into a jug and stir in the sugar until dissolved. Let it cool for 5 minutes.", "Fill a tall glass with ice, pour in the tea and the evaporated milk, stir and serve."],
      },
    ]
  ),
  drink(
    {
      id: "bubble-tea", title: "Bubble Tea (Boba Milk Tea)", type: "Tea", temperature: "cold", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Rich"],
      description: "Taiwan's iced milk tea with chewy tapioca pearls soaked in brown sugar syrup, drunk through a wide straw.",
      prep: 10, make: 20, difficulty: "Medium", image: pexels(11160113),
      sourceName: "Wikipedia — Bubble tea", sourceUrl: "https://en.wikipedia.org/wiki/Bubble_tea",
      notes: "Use quick-cook tapioca pearls and eat the drink within a couple of hours: cooked pearls turn hard as they cool. Check the packet for the cooking time.",
    },
    [
      { pantryId: "tapioca-pearls", label: "Quick-cook tapioca pearls", amount: "40 g" },
      { pantryId: "brown-sugar", label: "Brown sugar, for the syrup", amount: "2 tbsp" },
      { pantryId: "water", label: "Water, for the tea", amount: "200 ml" },
      { pantryId: "black-tea", label: "Strong black tea", amount: "2 tsp" },
      { pantryId: "milk", label: "Cold whole milk", amount: "100 ml" },
      { pantryId: "ice", label: "Ice cubes", amount: "1 cup" },
    ],
    [
      {
        id: "shaker", label: "Shaker", equipment: ["Shaker"], handTools: ["Saucepan", "Fine sieve", "Tall glass"],
        steps: ["Cook the tapioca pearls in boiling water as the packet says (quick-cook pearls take about 5 minutes), then cover and leave for 5 minutes. Drain and rinse.", "Heat the brown sugar with 2 tbsp of water until dissolved and syrupy, and stir the warm pearls into it.", "Boil the 200 ml of water, add the tea and steep for 5 minutes. Strain and let it cool for 10 minutes.", "Shake the tea, milk and ice together in the shaker for 15 seconds.", "Spoon the syrupy pearls into a tall glass, pour in the tea and serve with a wide straw."],
      },
      {
        id: "by-hand", label: "By hand", equipment: [], handTools: ["Saucepan", "Fine sieve", "Lidded jar", "Tall glass"],
        steps: ["Cook the tapioca pearls in boiling water as the packet says (quick-cook pearls take about 5 minutes), then cover and leave for 5 minutes. Drain and rinse.", "Heat the brown sugar with 2 tbsp of water until dissolved and syrupy, and stir the warm pearls into it.", "Boil the 200 ml of water, add the tea and steep for 5 minutes. Strain and let it cool for 10 minutes.", "Shake the tea, milk and ice together hard in a lidded jar for 15 seconds.", "Spoon the syrupy pearls into a tall glass, pour in the tea and serve with a wide straw."],
      },
    ]
  ),
  drink(
    {
      id: "sulaimani", title: "Sulaimani (Kerala Lemon Tea)", type: "Tea", temperature: "hot", diet: ["Vegan", "Dairy-Free", "Gluten-Free"], taste: ["Spicy", "Tangy", "Refreshing"],
      description: "Kerala's milk-free spiced black tea, finished with lemon: light, clear and gently scented with cardamom and clove.",
      prep: 3, make: 8, difficulty: "Easy", image: pexels(14473557),
      notes: "Traditionally served after a meal, to help digestion.",
    },
    [
      { pantryId: "water", label: "Water", amount: "250 ml" },
      { pantryId: "black-tea", label: "Black tea", amount: "1 tsp" },
      { pantryId: "cardamom", label: "Green cardamom pod, crushed", amount: "1" },
      { pantryId: "cloves", label: "Clove", amount: "1" },
      { pantryId: "ginger", label: "Fresh ginger, a small slice", amount: "3 g", optional: true },
      { pantryId: "lemon", label: "Lemon, juiced", amount: "1/2" },
      { pantryId: "sugar", label: "Sugar", amount: "2 tsp" },
    ],
    [
      {
        id: "saucepan", label: "Saucepan", equipment: [], handTools: ["Small saucepan", "Strainer or spoon", "Cup"],
        steps: ["Bring the water to a boil with the cardamom, clove and ginger, and simmer for 3 minutes.", "Add the tea and the sugar, switch off the heat and leave it to steep for 2 minutes.", "Strain into a cup, stir in the lemon juice and drink hot."],
      },
      {
        id: "teapot", label: "Teapot", equipment: ["Teapot"], handTools: ["Small saucepan"],
        steps: ["Simmer the water with the cardamom, clove and ginger in a saucepan for 3 minutes.", "Put the tea and the sugar in the teapot, pour in the spiced water, cover and steep for 3 minutes.", "Pour through the strainer into a cup, stir in the lemon juice and drink hot."],
      },
    ]
  ),
  drink(
    {
      id: "chai-latte", title: "Chai Latte", type: "Tea", temperature: "hot", diet: ["Gluten-Free"], taste: ["Spicy", "Creamy", "Sweet"],
      description: "The café version of chai: strong spiced tea topped with steamed milk and a little foam, sweetened with honey.",
      prep: 5, make: 10, difficulty: "Easy", image: pexels(11833310),
      notes: "Make the spiced concentrate in larger batches and keep it in the fridge for up to 5 days.",
    },
    [
      { pantryId: "water", label: "Water", amount: "120 ml" },
      { pantryId: "black-tea", label: "Strong black tea", amount: "2 tsp" },
      { pantryId: "ginger", label: "Fresh ginger, grated", amount: "5 g" },
      { pantryId: "cardamom", label: "Green cardamom pods, crushed", amount: "2" },
      { pantryId: "cinnamon-stick", label: "Cinnamon stick", amount: "1/2" },
      { pantryId: "cloves", label: "Cloves", amount: "2" },
      { pantryId: "milk", label: "Whole milk", amount: "150 ml" },
      { pantryId: "honey", label: "Honey, to taste", amount: "1 tbsp" },
    ],
    [
      {
        id: "milk-frother", label: "Hand frother", equipment: ["Milk Frother"], handTools: ["Two saucepans", "Fine sieve", "Mug"],
        steps: ["Boil the water with the ginger, cardamom, cinnamon and cloves for 4 minutes. Add the tea and simmer for 3 minutes more, then strain into a mug.", "Warm the milk in a second saucepan until steaming, about 65°C, and froth it with the hand frother until it doubles in volume.", "Stir the honey into the tea, add the frothed milk and spoon the foam on top."],
      },
      {
        id: "by-hand", label: "By hand", equipment: [], handTools: ["Two saucepans", "Fine sieve", "Lidded jar", "Mug"],
        steps: ["Boil the water with the ginger, cardamom, cinnamon and cloves for 4 minutes. Add the tea and simmer for 3 minutes more, then strain into a mug.", "Warm the milk in a second saucepan until steaming, about 65°C, pour it into a lidded jar and shake hard for 30 seconds until foamy.", "Stir the honey into the tea, add the frothed milk and spoon the foam on top."],
      },
    ]
  ),
  steeped(
    {
      id: "iced-london-fog", title: "Iced London Fog", type: "Tea", temperature: "cold", diet: ["Gluten-Free"], taste: ["Creamy", "Sweet", "Refreshing"],
      description: "Strong Earl Grey over ice with cold milk and a spoonful of vanilla syrup — light, floral and creamy.",
      prep: 4, make: 5, difficulty: "Easy", image: pexels(38035381),
    },
    {
      leaf: { pantryId: "earl-grey-tea", label: "Earl Grey (loose leaf, or 2 tea bags)", amount: "2 tsp" }, waterMl: 120, tempC: 100, minutes: 4,
      lines: [{ pantryId: "vanilla-syrup", label: "Vanilla syrup", amount: "1 tbsp" }, { pantryId: "milk", label: "Cold milk", amount: "120 ml" }, ice(1)],
      after: ["Stir the vanilla syrup into the hot tea.", "Fill a tall glass with ice, pour in the tea and top with the cold milk. Stir and serve."],
    }
  ),
  drink(
    {
      id: "barley-tea", title: "Barley Tea (Mugicha)", type: "Tea", temperature: "cold", diet: ["Caffeine-Free", "Vegan", "Dairy-Free", "Low Sugar"], taste: ["Rich", "Refreshing"],
      description: "Roasted barley steeped in cold water: nutty, toasty and caffeine-free, the everyday summer drink of Japan and Korea.",
      prep: 3, make: 2, wait: 360, difficulty: "Easy", servings: 2, image: pexels(36673358),
      sourceName: "Wikipedia — Barley tea", sourceUrl: "https://en.wikipedia.org/wiki/Barley_tea",
      notes: "Drunk hot in winter as well. Contains gluten, so it isn't suitable for coeliacs.",
    },
    coldSteepIngredients({ leaf: { pantryId: "roasted-barley", label: "Roasted barley (grains, or 2 tea bags)", amount: "2 tbsp" }, waterMl: 500, lines: [ice(1)] }),
    coldSteepMethods({ leaf: { pantryId: "roasted-barley", label: "Roasted barley (grains, or 2 tea bags)", amount: "2 tbsp" }, waterMl: 500, hours: 6, lines: [ice(1)], after: ["Pour over glasses of ice and drink cold, unsweetened."] })
  ),
  steeped(
    {
      id: "strawberry-iced-tea", title: "Strawberry Iced Tea", type: "Tea", temperature: "cold", diet: ["Vegan", "Dairy-Free", "Gluten-Free"], taste: ["Fruity", "Sweet", "Refreshing"],
      description: "Black tea over ice with crushed strawberries and a squeeze of lemon — summery, fruity and pink.",
      prep: 5, make: 5, difficulty: "Easy", image: pexels(5668258),
    },
    {
      leaf: { pantryId: "black-tea", label: "Black tea, strong", amount: "2 tsp" }, waterMl: 150, tempC: 100, minutes: 4,
      lines: [{ pantryId: "strawberry", label: "Strawberries, hulled and sliced", amount: "5" }, { pantryId: "sugar", label: "Sugar", amount: "1 tbsp" }, { pantryId: "lemon", label: "Lemon, juiced", amount: "1/4" }, ice(1)],
      after: ["Crush the strawberries with the sugar in a tall glass until juicy — use the back of a spoon or a muddler.", "Stir the lemon juice into the hot tea, then add ice to the glass and pour the tea over it. Stir and serve."],
      optional: [{ tag: "Muddler", without: "Crush the strawberries with the back of a spoon or a fork." }],
    }
  ),
  steeped(
    {
      id: "mango-iced-tea", title: "Mango Iced Tea", type: "Tea", temperature: "cold", diet: ["Dairy-Free", "Gluten-Free"], taste: ["Fruity", "Sweet", "Refreshing"],
      description: "Black tea chilled over ice with ripe mango, honey and lime — sweet and tropical.",
      prep: 6, make: 5, difficulty: "Easy", image: pexels(33573171),
    },
    {
      leaf: { pantryId: "black-tea", label: "Black tea, strong", amount: "2 tsp" }, waterMl: 150, tempC: 100, minutes: 4,
      lines: [{ pantryId: "mango", label: "Ripe mango, chopped", amount: "100 g" }, { pantryId: "honey", label: "Honey", amount: "1 tbsp" }, { pantryId: "lime", label: "Lime, juiced", amount: "1/2" }, ice(1)],
      after: ["Mash the mango with the honey in a tall glass with a fork or a muddler until it is mostly pulp.", "Stir the lime juice into the hot tea, then add ice to the glass and pour the tea over it. Stir and serve."],
      optional: [{ tag: "Muddler", without: "Mash the mango with a fork." }],
    }
  ),
  steeped(
    {
      id: "mint-iced-tea", title: "Mint Iced Tea", type: "Tea", temperature: "cold", diet: ["Vegan", "Dairy-Free", "Gluten-Free"], taste: ["Refreshing", "Herbal", "Tangy"],
      description: "Strong black tea steeped with fresh mint, then chilled over ice with lemon — cooling and clean.",
      prep: 4, make: 6, difficulty: "Easy", image: pexels(37515893),
    },
    {
      leaf: { pantryId: "black-tea", label: "Black tea, strong", amount: "2 tsp" }, steeped: [{ pantryId: "fresh-mint", label: "Fresh mint leaves", amount: "10 g" }], waterMl: 150, tempC: 100, minutes: 4,
      lines: [{ pantryId: "lemon", label: "Lemon, juiced", amount: "1/2" }, { pantryId: "sugar", label: "Sugar, to taste", amount: "1 tbsp", optional: true }, ice(1)],
      after: ["Strain out the mint and the leaves, then stir in the sugar and lemon juice.", "Pour over a tall glass of ice and garnish with a mint sprig."],
    }
  ),
  steeped(
    {
      id: "teh-o-ais-limau", title: "Teh O Ais Limau", type: "Tea", temperature: "cold", diet: ["Vegan", "Dairy-Free", "Gluten-Free"], taste: ["Tangy", "Sweet", "Refreshing"],
      description: "Malaysia's iced lime tea: strong, sweet black tea with a squeeze of lime over a glass of ice — 'o' means no milk.",
      prep: 3, make: 6, difficulty: "Easy", image: pexels(33044332),
      sourceName: "Wikipedia — Teh", sourceUrl: "https://en.wikipedia.org/wiki/Teh",
      notes: "Kalamansi limes are traditional; ordinary lime juice works.",
    },
    {
      leaf: { pantryId: "black-tea", label: "Strong black tea", amount: "2 tsp" }, waterMl: 150, tempC: 100, minutes: 4,
      lines: [{ pantryId: "sugar", label: "Sugar", amount: "1.5 tbsp" }, { pantryId: "lime", label: "Lime, juiced", amount: "1/2" }, ice(1)],
      after: ["Stir the sugar into the hot tea until dissolved.", "Pour over a tall glass full of ice, stir in the lime juice and serve right away."],
    }
  ),
];
