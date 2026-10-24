import type { Recipe, RecipeIngredient } from "@/types";
import { drink, pexels } from "./builders";
import { coldSteepIngredients, coldSteepMethods, steepIngredients, steepMethods, type SteepSpec } from "./teaBuilders";

/** Iced teas, tea coolers and iced tea lattes. */

const steeped = (facts: Parameters<typeof drink>[0], spec: SteepSpec): Recipe => drink(facts, steepIngredients(spec), steepMethods(spec));
const ice = (cups = 1, label = "Ice cubes"): RecipeIngredient => ({ pantryId: "ice", label, amount: `${cups} ${cups === 1 ? "cup" : "cups"}` });
const lemonWedge = (label = "Lemon slices, to garnish"): RecipeIngredient => ({ pantryId: "lemon", label, amount: "2", optional: true });

export const icedTeas: Recipe[] = [
  steeped(
    {
      id: "iced-tea", title: "Iced Tea", type: "Tea", temperature: "cold", diet: ["Vegan", "Dairy-Free", "Gluten-Free"], taste: ["Refreshing", "Bitter"],
      description: "Black tea brewed double strength and poured straight over ice, so the ice melts into the right dilution.",
      prep: 3, make: 5, difficulty: "Easy", image: pexels(792613),
      sourceName: "Wikipedia — Iced tea", sourceUrl: "https://en.wikipedia.org/wiki/Iced_tea",
      notes: "Brewing strong is the trick: a regular cup poured over ice goes thin and flat.",
    },
    { leaf: { pantryId: "black-tea", label: "Black tea, strong", amount: "2 tsp" }, waterMl: 150, tempC: 100, minutes: 4, lines: [ice(1), lemonWedge(), { pantryId: "sugar", label: "Sugar, to taste", amount: "1 tsp", optional: true }], after: ["Stir the sugar into the hot tea, if using, and pour it over a tall glass filled with ice.", "Add a slice of lemon and serve right away."] }
  ),
  steeped(
    {
      id: "southern-sweet-tea", title: "Southern Sweet Tea", type: "Tea", temperature: "cold", diet: ["Vegan", "Dairy-Free", "Gluten-Free"], taste: ["Sweet", "Refreshing"],
      description: "The American South's pitcher of strongly brewed black tea sweetened while it is still hot, then chilled and served over ice with lemon.",
      prep: 4, make: 10, wait: 60, difficulty: "Easy", servings: 4, image: pexels(32483872),
      sourceName: "Wikipedia — Sweet tea", sourceUrl: "https://en.wikipedia.org/wiki/Sweet_tea",
      notes: "Sugar dissolves best in hot tea. A tiny pinch of baking soda is a Southern trick for taking the bitterness off.",
    },
    {
      leaf: { pantryId: "black-tea", label: "Black tea (loose leaf, or 4 tea bags)", amount: "4 tsp" }, waterMl: 500, tempC: 100, minutes: 5,
      lines: [{ pantryId: "sugar", label: "Sugar", amount: "4 tbsp" }, { pantryId: "water", label: "Cold water, to top up", amount: "500 ml" }, ice(2), lemonWedge()],
      after: ["Stir the sugar into the hot tea until it has dissolved completely.", "Pour in the cold water, then chill the pitcher in the fridge for an hour.", "Serve over glasses full of ice, with lemon slices."],
    }
  ),
  steeped(
    {
      id: "peach-iced-tea", title: "Peach Iced Tea", type: "Tea", temperature: "cold", diet: ["Dairy-Free", "Gluten-Free"], taste: ["Fruity", "Sweet", "Refreshing"],
      description: "Strong black tea over ice with ripe peach slices and honey — summery, juicy and not too sweet.",
      prep: 5, make: 5, difficulty: "Easy", image: pexels(31066139),
      notes: "Let the peach slices sit in the tea for a few minutes so they give up their juice.",
    },
    {
      leaf: { pantryId: "black-tea", label: "Black tea, strong", amount: "2 tsp" }, waterMl: 150, tempC: 100, minutes: 4,
      lines: [{ pantryId: "peach", label: "Ripe peach, sliced", amount: "1" }, { pantryId: "honey", label: "Honey, to taste", amount: "1 tbsp" }, ice(1)],
      after: ["Stir the honey into the hot tea until dissolved.", "Put the peach slices and the ice in a tall glass and pour the tea over them. Let it sit for a few minutes, then stir and drink."],
    }
  ),
  steeped(
    {
      id: "lemon-iced-tea", title: "Lemon Iced Tea", type: "Tea", temperature: "cold", diet: ["Vegan", "Dairy-Free", "Gluten-Free"], taste: ["Tangy", "Refreshing", "Sweet"],
      description: "Black tea chilled over ice with fresh lemon juice and a little sugar: sharp, clean and cooling.",
      prep: 3, make: 5, difficulty: "Easy", image: pexels(6680479),
    },
    {
      leaf: { pantryId: "black-tea", label: "Black tea, strong", amount: "2 tsp" }, waterMl: 150, tempC: 100, minutes: 4,
      lines: [{ pantryId: "lemon", label: "Lemon, juiced", amount: "1/2" }, { pantryId: "sugar", label: "Sugar", amount: "1 tbsp" }, ice(1)],
      after: ["Stir the sugar into the hot tea until it has dissolved.", "Pour over a glass full of ice, stir in the lemon juice and serve."],
    }
  ),
  drink(
    {
      id: "cold-brew-tea", title: "Cold Brew Tea", type: "Tea", temperature: "cold", diet: ["Vegan", "Dairy-Free", "Low Sugar", "Gluten-Free"], taste: ["Refreshing", "Herbal"],
      description: "Tea steeped in cold water overnight: much smoother, with none of the bitterness of hot-brewed iced tea.",
      prep: 3, make: 2, wait: 480, difficulty: "Easy", image: pexels(8335015),
      notes: "Works well with black, green, white or herbal teas. Green tea only needs 6 hours.",
    },
    coldSteepIngredients({ leaf: { pantryId: "black-tea", label: "Black tea (loose leaf, or 2 tea bags)", amount: "2 tsp" }, waterMl: 250, lines: [ice(1), lemonWedge()] }),
    coldSteepMethods({ leaf: { pantryId: "black-tea", label: "Black tea (loose leaf, or 2 tea bags)", amount: "2 tsp" }, waterMl: 250, hours: 8, lines: [ice(1), lemonWedge()], after: ["Pour over a glass of ice, add a slice of lemon and drink cold, sweetened if you like."] })
  ),
  steeped(
    {
      id: "arnold-palmer", title: "Arnold Palmer", type: "Tea", temperature: "cold", diet: ["Vegan", "Dairy-Free", "Gluten-Free"], taste: ["Tangy", "Sweet", "Refreshing"],
      description: "Half iced tea, half lemonade over ice — named after the golfer who ordered it that way.",
      prep: 3, make: 5, difficulty: "Easy", image: pexels(8534125),
      sourceName: "Wikipedia — Arnold Palmer (drink)", sourceUrl: "https://en.wikipedia.org/wiki/Arnold_Palmer_(drink)",
      notes: "Pour the lemonade in slowly over the back of a spoon for two layers, or stir for an even mix.",
    },
    {
      leaf: { pantryId: "black-tea", label: "Black tea, strong", amount: "2 tsp" }, waterMl: 120, tempC: 100, minutes: 4,
      lines: [{ pantryId: "lemonade", label: "Lemonade, cold", amount: "120 ml" }, ice(1), lemonWedge("Lemon slices, to garnish")],
      after: ["Pour the hot tea over a tall glass of ice to chill it quickly.", "Top with the cold lemonade, add a slice of lemon and serve."],
    }
  ),
  drink(
    {
      id: "thai-iced-tea", title: "Thai Iced Tea", type: "Tea", temperature: "cold", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Rich"],
      description: "Strong spiced black tea sweetened, poured over ice and topped with a swirl of evaporated and condensed milk — bright orange and very sweet.",
      prep: 4, make: 8, difficulty: "Easy", image: pexels(33241812),
      sourceName: "Wikipedia — Thai iced tea", sourceUrl: "https://en.wikipedia.org/wiki/Thai_iced_tea",
      notes: "Thai tea mix is sold ready-spiced with star anise and sometimes food colouring; plain black tea with a star anise gives the same flavour.",
    },
    [
      { pantryId: "black-tea", label: "Strong black tea or Thai tea mix", amount: "2 tbsp" },
      { pantryId: "star-anise", label: "Star anise", amount: "1" },
      { pantryId: "water", label: "Boiling water", amount: "250 ml" },
      { pantryId: "sugar", label: "Sugar", amount: "2 tbsp" },
      { pantryId: "ice", label: "Ice cubes", amount: "1 cup" },
      { pantryId: "evaporated-milk", label: "Evaporated milk", amount: "40 ml" },
      { pantryId: "sweetened-condensed-milk", label: "Sweetened condensed milk", amount: "20 ml" },
    ],
    [
      {
        id: "cloth-filter", label: "Cloth filter", equipment: ["Cloth Filter"], handTools: ["Saucepan", "Tall glass"],
        steps: ["Boil the water with the star anise, add the tea and steep for 5 minutes.", "Pour the tea through the cloth filter into a jug, stir in the sugar until dissolved, and let it cool for a few minutes.", "Fill a tall glass with ice and pour in the tea, leaving 2 cm at the top.", "Pour the evaporated milk and the condensed milk over the top, and stir them in as you drink."],
      },
      {
        id: "by-hand", label: "By hand", equipment: [], handTools: ["Saucepan", "Fine sieve", "Tall glass"],
        steps: ["Boil the water with the star anise, add the tea and steep for 5 minutes.", "Strain the tea through a fine sieve into a jug, stir in the sugar until dissolved, and let it cool for a few minutes.", "Fill a tall glass with ice and pour in the tea, leaving 2 cm at the top.", "Pour the evaporated milk and the condensed milk over the top, and stir them in as you drink."],
      },
    ]
  ),
  drink(
    {
      id: "iced-chai-latte", title: "Iced Chai Latte", type: "Tea", temperature: "cold", diet: ["Gluten-Free"], taste: ["Spicy", "Creamy", "Sweet", "Refreshing"],
      description: "Strong masala chai cooled over ice and topped with cold milk: spiced, creamy and refreshing.",
      prep: 5, make: 10, difficulty: "Easy", image: pexels(4438010),
      notes: "The concentrate keeps in the fridge for up to 5 days. Make a double batch and keep it on hand.",
    },
    [
      { pantryId: "water", label: "Water", amount: "200 ml" },
      { pantryId: "black-tea", label: "Strong black tea", amount: "2 tsp" },
      { pantryId: "ginger", label: "Fresh ginger, grated", amount: "5 g" },
      { pantryId: "cardamom", label: "Green cardamom pods, crushed", amount: "2" },
      { pantryId: "cinnamon-stick", label: "Cinnamon stick", amount: "1/2" },
      { pantryId: "cloves", label: "Cloves", amount: "2" },
      { pantryId: "sugar", label: "Sugar", amount: "1 tbsp" },
      { pantryId: "milk", label: "Cold milk", amount: "150 ml" },
      { pantryId: "ice", label: "Ice cubes", amount: "1 cup" },
    ],
    [
      {
        id: "saucepan", label: "Saucepan", equipment: [], handTools: ["Saucepan", "Fine sieve", "Tall glass"],
        optionalEquipment: [{ tag: "Shaker", without: "Stir well in the glass with a long spoon." }],
        steps: ["Boil the water with the ginger, cardamom, cinnamon and cloves for 4 minutes.", "Add the tea and the sugar, simmer for 3 minutes more, then strain into a jug. This is the concentrate.", "Fill a tall glass with ice and pour in about 100 ml of the hot concentrate, which chills as it meets the ice.", "Top with the cold milk, stir and serve."],
      },
    ]
  ),
  drink(
    {
      id: "iced-matcha-latte", title: "Iced Matcha Latte", type: "Tea", temperature: "cold", diet: ["Gluten-Free"], taste: ["Creamy", "Herbal", "Refreshing"],
      description: "Whisked matcha poured over cold milk and ice — grassy, creamy and quietly sweet.",
      prep: 3, make: 3, difficulty: "Easy", image: pexels(32300845),
      notes: "Add the matcha to the milk last, so it sits on top as a green layer; stir to blend it.",
    },
    [
      { pantryId: "matcha-powder", label: "Matcha powder, sifted", amount: "1 tsp" },
      { pantryId: "water", label: "Hot water, about 80°C", amount: "60 ml" },
      { pantryId: "milk", label: "Cold milk", amount: "180 ml" },
      { pantryId: "ice", label: "Ice cubes", amount: "1 cup" },
      { pantryId: "honey", label: "Honey, to taste", amount: "1 tsp", optional: true },
    ],
    [
      {
        id: "matcha-whisk", label: "Matcha whisk", equipment: ["Matcha Whisk"], handTools: ["Wide bowl", "Fine sieve", "Tall glass"],
        steps: ["Sift the matcha into a warm bowl, add the hot water and whisk in a 'W' motion for 15–20 seconds until smooth and frothy.", "Stir the honey into the matcha, if using.", "Fill a tall glass with ice and pour in the cold milk, then pour the matcha over the top. Stir and drink."],
      },
      {
        id: "milk-frother", label: "Hand frother", equipment: ["Milk Frother"], handTools: ["Bowl", "Fine sieve", "Tall glass"],
        steps: ["Sift the matcha into a bowl, add the hot water and froth for 15–20 seconds until smooth.", "Stir the honey into the matcha, if using.", "Fill a tall glass with ice and pour in the cold milk, then pour the matcha over the top. Stir and drink."],
      },
      {
        id: "by-hand", label: "By hand", equipment: [], handTools: ["Lidded jar", "Fine sieve", "Tall glass"],
        steps: ["Sift the matcha into a lidded jar, add the hot water and the honey, close the lid and shake hard for 15–20 seconds until smooth.", "Fill a tall glass with ice and pour in the cold milk.", "Pour the matcha over the top, stir and drink."],
      },
    ]
  ),
  steeped(
    {
      id: "hibiscus-cooler", title: "Hibiscus Cooler (Agua de Jamaica)", type: "Tea", temperature: "cold", diet: ["Caffeine-Free", "Vegan", "Dairy-Free", "Gluten-Free"], taste: ["Tangy", "Fruity", "Refreshing"],
      description: "Dried hibiscus steeped, sweetened and served over ice with lime: ruby red, tart and cooling, a staple of Mexican street stalls.",
      prep: 4, make: 12, difficulty: "Easy", image: pexels(32713606),
      sourceName: "Wikipedia — Agua de Jamaica", sourceUrl: "https://en.wikipedia.org/wiki/Agua_de_Jamaica",
      notes: "Steep it longer for a deeper, tarter drink — and dilute it generously, as it is concentrated.",
    },
    {
      leaf: { pantryId: "hibiscus-flowers", label: "Dried hibiscus flowers", amount: "2 tbsp" }, waterMl: 250, tempC: 100, minutes: 10,
      lines: [{ pantryId: "sugar", label: "Sugar", amount: "2 tbsp" }, { pantryId: "water", label: "Cold water", amount: "150 ml" }, { pantryId: "lime", label: "Lime, juiced", amount: "1/2" }, ice(1)],
      after: ["Strain out the hibiscus and stir the sugar into the hot tea until dissolved.", "Add the cold water and the lime juice, then pour over a tall glass full of ice and serve."],
    }
  ),
  drink(
    {
      id: "sun-tea", title: "Sun Tea", type: "Tea", temperature: "cold", diet: ["Vegan", "Dairy-Free", "Low Sugar", "Gluten-Free"], taste: ["Refreshing", "Herbal"],
      description: "Tea bags left in a jar of water in the sun for a few hours: a gentle, mellow, almost sweet iced tea with no kettle.",
      prep: 3, make: 2, wait: 240, difficulty: "Easy", servings: 4, image: pexels(20782936),
      sourceName: "Wikipedia — Sun tea", sourceUrl: "https://en.wikipedia.org/wiki/Iced_tea#Sun_tea",
      notes: "Works best with mild teas such as green, white, or a fruity herbal tea. Brew it in a clean jar, and keep what you don't drink in the fridge.",
    },
    [
      { pantryId: "black-tea", label: "Tea bags or loose leaf", amount: "4 tsp" },
      { pantryId: "water", label: "Cold water", amount: "1000 ml" },
      { pantryId: "ice", label: "Ice cubes", amount: "2 cups" },
      { pantryId: "lemon", label: "Lemon slices, to garnish", amount: "2", optional: true },
    ],
    [
      {
        id: "pitcher", label: "Pitcher", equipment: ["Pitcher"],
        steps: ["Put the tea in a clear glass pitcher and add the cold water. Cover the top.", "Set it outside in direct sun, or on a bright windowsill, for 3–4 hours.", "Take out the tea, then chill the pitcher in the fridge and serve over ice with lemon slices."],
      },
      {
        id: "by-hand", label: "By hand", equipment: [], handTools: ["Large clear jar with a lid"],
        steps: ["Put the tea in a large clear jar and add the cold water. Put the lid on.", "Set it outside in direct sun, or on a bright windowsill, for 3–4 hours.", "Take out the tea, then chill the jar in the fridge and serve over ice with lemon slices."],
      },
    ]
  ),
  steeped(
    {
      id: "iced-jasmine-tea", title: "Iced Jasmine Tea", type: "Tea", temperature: "cold", diet: ["Vegan", "Dairy-Free", "Gluten-Free"], taste: ["Herbal", "Refreshing"],
      description: "Fragrant jasmine green tea chilled over ice with a little honey and lemon — delicate and floral.",
      prep: 3, make: 5, difficulty: "Easy", image: pexels(33526960),
    },
    {
      leaf: { pantryId: "jasmine-tea", label: "Jasmine tea, loose leaf or pearls", amount: "2 tsp" }, waterMl: 150, tempC: 80, minutes: 3,
      lines: [ice(1), lemonWedge("Lemon wedges"), { pantryId: "sugar", label: "Sugar, to taste", amount: "1 tsp", optional: true }],
      after: ["Stir the sugar into the hot tea, if using, and pour it over a tall glass filled with ice.", "Squeeze in a little lemon and serve right away."],
    }
  ),
];
