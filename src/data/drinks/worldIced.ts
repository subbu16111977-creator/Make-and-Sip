import type { Recipe, RecipeIngredient } from "@/types";
import { coldBrewMethods, dripMethods, drink, pexels, strongCoffeeIngredients, strongCoffeeMethods, type DrinkFacts, type StrongCoffeeSpec } from "./builders";

/** Iced, chilled and blended coffees from around the world. */

const espresso = (facts: DrinkFacts, spec: StrongCoffeeSpec): Recipe => drink(facts, strongCoffeeIngredients(spec), strongCoffeeMethods(spec));
const milk = (ml: number, label = "Cold whole milk"): RecipeIngredient => ({ pantryId: "milk", label, amount: `${ml} ml` });
const ice = (cups = 1, label = "Ice cubes"): RecipeIngredient => ({ pantryId: "ice", label, amount: `${cups} cup` });

export const worldIced: Recipe[] = [
  espresso(
    { id: "iced-latte", title: "Iced Latte", type: "Coffee", temperature: "cold", diet: ["Gluten-Free"], taste: ["Creamy", "Refreshing"], description: "A double shot over cold milk and ice — the simple, smooth one.", prep: 3, make: 2, difficulty: "Easy", image: pexels(35028555) },
    { size: "double", lines: [milk(180), ice()], into: "into a small cup", before: ["Fill a tall glass with ice and pour in the cold milk."], after: ["Pour the hot coffee over the milk and ice. Stir once and drink right away."] }
  ),
  espresso(
    { id: "iced-coffee-with-milk", title: "Iced Coffee with Milk", type: "Coffee", temperature: "cold", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Refreshing"], description: "Strong coffee, sugar and a splash of milk over ice — what most people mean when they ask for iced coffee.", prep: 3, make: 2, difficulty: "Easy", image: pexels(12433986) },
    { size: "double", lines: [{ pantryId: "sugar", label: "Sugar, or to taste", amount: "1 tbsp" }, milk(100), ice()], into: "into a small cup", before: ["Fill a tall glass with ice."], after: ["Stir the sugar into the hot coffee until dissolved, then pour it over the ice.", "Add the milk, stir and drink."] }
  ),
  espresso(
    { id: "iced-mocha", title: "Iced Mocha", type: "Coffee", temperature: "cold", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Rich"], description: "Espresso and chocolate over cold milk and ice, topped with cream if you like.", prep: 4, make: 2, difficulty: "Easy", image: pexels(26951876) },
    {
      size: "double",
      lines: [{ pantryId: "chocolate-syrup", label: "Chocolate syrup", amount: "30 ml" }, milk(150), ice(), { pantryId: "heavy-cream", label: "Whipped cream, to top", amount: "30 ml", optional: true }],
      into: "into a small cup",
      before: ["Fill a tall glass with ice and pour in the cold milk."],
      after: ["Stir the chocolate syrup into the hot coffee until smooth, then pour it over the iced milk.", "Top with a little whipped cream if you like, and drink right away."],
    }
  ),
  espresso(
    {
      id: "iced-caramel-macchiato", title: "Iced Caramel Macchiato", type: "Coffee", temperature: "cold", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy"],
      description: "Vanilla milk over ice, marked with espresso and a lattice of caramel — built in layers and stirred as you drink.",
      prep: 4, make: 2, difficulty: "Easy", image: pexels(34969154),
      notes: "'Macchiato' means 'marked': the espresso goes in last, on top of the milk, so you can see the layers.",
    },
    {
      size: "double",
      lines: [{ pantryId: "vanilla-syrup", label: "Vanilla syrup", amount: "20 ml" }, milk(180), ice(), { pantryId: "caramel-sauce", label: "Caramel sauce, to drizzle", amount: "1 tbsp" }],
      into: "into a small cup",
      before: ["Stir the vanilla syrup into the cold milk in a tall glass, then add the ice."],
      after: ["Pour the hot coffee slowly over the top so it floats on the milk.", "Drizzle the caramel sauce over the top in a crosshatch pattern and serve."],
    }
  ),
  espresso(
    {
      id: "spanish-latte", title: "Spanish Latte", type: "Coffee", temperature: "cold", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy"],
      description: "A café bombón made long: espresso sweetened with condensed milk and poured over milk and ice, with a dusting of cinnamon.",
      prep: 3, make: 2, difficulty: "Easy", image: pexels(38519299),
      notes: "Hot or iced — the hot version swaps the ice for steamed milk.",
    },
    {
      size: "double",
      lines: [{ pantryId: "sweetened-condensed-milk", label: "Sweetened condensed milk", amount: "30 ml" }, milk(150), ice(), { pantryId: "cinnamon", label: "Ground cinnamon, to top", amount: "1 pinch", optional: true }],
      into: "over the condensed milk",
      before: ["Spoon the condensed milk into the bottom of a tall glass."],
      after: ["Stir until the condensed milk has dissolved into the hot coffee.", "Add the ice and the cold milk, stir, and dust with cinnamon if you like."],
    }
  ),
  drink(
    {
      id: "japanese-iced-coffee", title: "Japanese Iced Coffee", type: "Coffee", temperature: "cold", diet: ["Vegan", "Dairy-Free", "Low Sugar", "Gluten-Free"], taste: ["Refreshing", "Bitter"],
      description: "Hot coffee brewed straight onto ice, so it is chilled in seconds, keeping its aroma and brightness instead of turning flat like coffee cooled slowly.",
      prep: 3, make: 4, difficulty: "Medium", image: pexels(31621814),
      sourceName: "Wikipedia — Iced coffee", sourceUrl: "https://en.wikipedia.org/wiki/Iced_coffee",
      notes: "The ice counts as part of the water: here 100 ml hot water onto 120 g of ice, so the finished drink is about 200 ml. Brew it a little stronger than usual.",
    },
    [
      { pantryId: "ground-coffee", label: "Medium-fine ground coffee", amount: "20 g" },
      { pantryId: "water", label: "Hot water, just off the boil", amount: "120 ml" },
      { pantryId: "ice", label: "Ice cubes, in the glass or jug", amount: "120 g" },
    ],
    [
      {
        id: "pour-over", label: "Pour-over dripper", equipment: ["Pour-Over Dripper"],
        steps: ["Put the ice in a jug or heatproof glass and set the dripper (with a paper filter) on top.", "Add the coffee, pour 30 ml of the hot water over the grounds and wait 30 seconds to bloom.", "Pour in the rest of the water slowly in circles and let it drip down onto the ice. Swirl the jug and pour over fresh ice."],
      },
      {
        id: "aeropress", label: "AeroPress", equipment: ["AeroPress"],
        steps: ["Put the ice in a glass and set the AeroPress on a jug with the filter in place.", "Add the coffee, pour in the hot water, stir for 10 seconds and leave it for 1 minute.", "Press the coffee straight onto the ice, swirl to chill, and pour over fresh ice if you like."],
      },
      {
        id: "by-hand", label: "By hand", equipment: [], handTools: ["Heatproof jug", "Fine sieve", "Spoon"],
        steps: ["Stir the coffee into the hot water in a heatproof jug and leave it for 3 minutes.", "Strain the hot coffee through a sieve (lined with a paper filter if you have one) straight onto a jug of ice.", "Stir until chilled and pour over fresh ice."],
      },
    ]
  ),
  drink(
    {
      id: "cold-brew", title: "Cold Brew", type: "Coffee", temperature: "cold", diet: ["Vegan", "Dairy-Free", "Low Sugar", "Gluten-Free"], taste: ["Rich", "Refreshing"],
      description: "Coarse coffee steeped in cold water for half a day, then strained: smooth, sweet and low in acidity, served over ice.",
      prep: 5, make: 3, wait: 720, difficulty: "Easy", image: pexels(2067404),
      notes: "This makes a concentrate-strength brew: dilute with water or milk to taste.",
    },
    [
      { pantryId: "ground-coffee", label: "Coarsely ground coffee", amount: "25 g" },
      { pantryId: "water", label: "Cold water, for steeping", amount: "200 ml" },
      { pantryId: "ice", label: "Ice cubes", amount: "1 cup" },
    ],
    coldBrewMethods({
      lines: [ice()],
      after: ["Fill a glass with ice and pour in the cold brew.", "Add a splash of cold water or milk to taste and serve."],
    })
  ),
  drink(
    {
      id: "greek-frappe", title: "Greek Frappé", type: "Coffee", temperature: "cold", diet: ["Gluten-Free"], taste: ["Creamy", "Refreshing", "Sweet"],
      description: "Instant coffee whisked with water and sugar into a thick golden foam, poured over ice — the Greek summer coffee since the 1950s.",
      prep: 3, make: 2, difficulty: "Easy", image: pexels(6767147),
      sourceName: "Wikipedia — Frappé coffee", sourceUrl: "https://en.wikipedia.org/wiki/Frapp%C3%A9_coffee",
      notes: "Invented in Thessaloniki in 1957, when a Nescafé salesman found a way to make an instant drink with a shaker. Order it sketos (plain), metrios (medium sweet) or glykos (sweet).",
    },
    [
      { pantryId: "instant-coffee", label: "Instant coffee", amount: "2 tsp" },
      { pantryId: "sugar", label: "Sugar, to taste", amount: "2 tsp" },
      { pantryId: "water", label: "Cold water", amount: "100 ml" },
      { pantryId: "ice", label: "Ice cubes", amount: "1 cup" },
      { pantryId: "evaporated-milk", label: "Evaporated milk, optional", amount: "30 ml", optional: true },
    ],
    [
      {
        id: "shaker", label: "Shaker", equipment: ["Shaker"],
        steps: ["Put the instant coffee, sugar and 30 ml of the cold water into a shaker and shake hard for 30 seconds, until thick and foamy.", "Pour into a tall glass over ice.", "Top up with the remaining water (and evaporated milk, if using) and serve with a straw."],
      },
      {
        id: "milk-frother", label: "Hand frother", equipment: ["Milk Frother"], handTools: ["Tall glass"],
        steps: ["Put the instant coffee, sugar and 30 ml of the cold water in a tall glass and froth for 20–30 seconds, until thick and foamy.", "Add the ice.", "Top up with the remaining water (and evaporated milk, if using) and serve with a straw."],
      },
      {
        id: "by-hand", label: "By hand", equipment: [], handTools: ["Lidded jar", "Tall glass"],
        steps: ["Put the instant coffee, sugar and 30 ml of the cold water in a lidded jar and shake very hard for 45–60 seconds, until thick and foamy.", "Pour into a tall glass over ice.", "Top up with the remaining water (and evaporated milk, if using) and serve with a straw."],
      },
    ]
  ),
  drink(
    {
      id: "dalgona-coffee", title: "Dalgona Coffee", type: "Coffee", temperature: "cold", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy"],
      description: "Instant coffee, sugar and hot water whipped into a stiff, glossy cream and spooned over cold milk — the 2020 lockdown coffee.",
      prep: 10, make: 2, difficulty: "Medium", image: pexels(17694499),
      sourceName: "Wikipedia — Dalgona coffee", sourceUrl: "https://en.wikipedia.org/wiki/Dalgona_coffee",
      notes: "Equal parts instant coffee, sugar and hot water. By hand it takes 8–10 minutes of whisking; a frother or electric whisk takes 2.",
    },
    [
      { pantryId: "instant-coffee", label: "Instant coffee", amount: "2 tbsp" },
      { pantryId: "sugar", label: "Sugar", amount: "2 tbsp" },
      { pantryId: "water", label: "Hot water", amount: "2 tbsp" },
      { pantryId: "milk", label: "Cold milk", amount: "200 ml" },
      { pantryId: "ice", label: "Ice cubes", amount: "1 cup" },
    ],
    [
      {
        id: "milk-frother", label: "Hand frother", equipment: ["Milk Frother"], handTools: ["Small bowl", "Tall glass"],
        steps: ["Put the coffee, sugar and hot water in a small bowl and froth for 1–2 minutes, until thick, pale and holding its shape.", "Fill a tall glass with ice and pour in the milk.", "Spoon the whipped coffee on top and stir it through as you drink."],
      },
      {
        id: "by-hand", label: "By hand", equipment: [], handTools: ["Small bowl", "Whisk or fork", "Tall glass"],
        steps: ["Put the coffee, sugar and hot water in a small bowl and whisk hard with a whisk or a fork for 8–10 minutes, until thick, pale and holding its shape.", "Fill a tall glass with ice and pour in the milk.", "Spoon the whipped coffee on top and stir it through as you drink."],
        notes: "It's a workout. Turn it into a rhythm — it comes together faster than you think.",
      },
    ]
  ),
  drink(
    {
      id: "bac-xiu", title: "Bạc Xỉu", type: "Coffee", temperature: "cold", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy"],
      description: "Saigon's milky coffee: a little phin coffee in a lot of condensed and fresh milk, over ice — gentler and sweeter than cà phê sữa đá.",
      prep: 5, make: 6, difficulty: "Easy", image: pexels(32774146),
      sourceName: "Wikipedia — Vietnamese iced coffee", sourceUrl: "https://en.wikipedia.org/wiki/Vietnamese_iced_coffee",
    },
    [
      { pantryId: "ground-coffee", label: "Dark-roast ground coffee", amount: "10 g" },
      { pantryId: "water", label: "Hot water, just off the boil", amount: "50 ml" },
      { pantryId: "sweetened-condensed-milk", label: "Sweetened condensed milk", amount: "30 ml" },
      { pantryId: "milk", label: "Cold milk", amount: "120 ml" },
      { pantryId: "ice", label: "Ice cubes", amount: "1 cup" },
    ],
    dripMethods({
      coffeeG: 10, waterMl: 50, byHandWaterMl: 60,
      lines: [
        { pantryId: "sweetened-condensed-milk", label: "Sweetened condensed milk", amount: "30 ml" },
        { pantryId: "milk", label: "Cold milk", amount: "120 ml" },
        { pantryId: "ice", label: "Ice cubes", amount: "1 cup" },
      ],
      before: ["Spoon the condensed milk into the bottom of a tall glass."],
      into: "onto the condensed milk",
      after: ["Stir the coffee into the condensed milk, then add the cold milk and the ice. Stir and serve."],
    })
  ),
  espresso(
    {
      id: "espresso-tonic", title: "Espresso Tonic", type: "Coffee", temperature: "cold", diet: ["Vegan", "Dairy-Free", "Gluten-Free"], taste: ["Refreshing", "Bitter"],
      description: "Espresso poured over tonic water and ice with a slice of citrus — bitter, bright and fizzy, and surprisingly good.",
      prep: 3, make: 2, difficulty: "Easy", image: pexels(32997941),
      notes: "Pour the espresso slowly over the back of a spoon to keep the two layers apart, then stir as you drink.",
    },
    {
      size: "double",
      lines: [{ pantryId: "tonic-water", label: "Tonic water, cold", amount: "150 ml" }, ice(), { pantryId: "lemon", label: "Lemon or orange slice, to garnish", amount: "1", optional: true }],
      into: "into a small cup",
      before: ["Fill a tall glass with ice and pour in the tonic water."],
      after: ["Pour the coffee slowly over the back of a spoon so it floats on the tonic.", "Add a slice of lemon or orange if you like, and serve."],
    }
  ),
  espresso(
    {
      id: "affogato", title: "Affogato", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Rich"],
      description: "A scoop of vanilla ice cream 'drowned' in a hot shot of espresso — dessert and coffee in one glass.",
      prep: 2, make: 2, difficulty: "Easy", image: pexels(32972513),
      sourceName: "Wikipedia — Affogato", sourceUrl: "https://en.wikipedia.org/wiki/Affogato",
      notes: "Serve the moment the espresso hits the ice cream, while the two are still in contrast.",
    },
    {
      size: "single",
      lines: [{ pantryId: "vanilla-ice-cream", label: "Vanilla ice cream, 2 scoops", amount: "100 g" }],
      into: "into a small cup",
      before: ["Put the ice cream in a small glass or bowl."],
      after: ["Pour the hot coffee over the ice cream and serve right away with a spoon."],
      handTools: ["Small glass", "Spoon"],
    }
  ),
  drink(
    {
      id: "coffee-float", title: "Coffee Float", type: "Coffee", temperature: "cold", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Refreshing"],
      description: "Cold, strong coffee over a scoop of vanilla ice cream — a soda-fountain float for people who like coffee better than cola.",
      prep: 4, make: 2, wait: 720, difficulty: "Easy", image: pexels(34384850),
      notes: "Any strong, cold coffee will do. Pour slowly: the coffee foams as it meets the ice cream.",
    },
    [
      { pantryId: "ground-coffee", label: "Coarsely ground coffee", amount: "25 g" },
      { pantryId: "water", label: "Cold water, for steeping", amount: "200 ml" },
      { pantryId: "vanilla-ice-cream", label: "Vanilla ice cream, 2 scoops", amount: "100 g" },
      { pantryId: "ice", label: "Ice cubes", amount: "1/2 cup" },
    ],
    coldBrewMethods({
      lines: [{ pantryId: "vanilla-ice-cream", label: "Vanilla ice cream, 2 scoops", amount: "100 g" }, ice(0.5)],
      after: ["Put the ice in a tall glass and add the scoops of ice cream.", "Pour the cold brew slowly over the ice cream and serve with a long spoon and a straw."],
      optional: [{ tag: "Ice Cream Scoop", without: "Use a large spoon dipped in hot water, which lets it cut through the ice cream cleanly." }],
    })
  ),
  drink(
    {
      id: "eiskaffee", title: "Eiskaffee", type: "Coffee", temperature: "cold", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Rich"],
      description: "Germany's ice-cream coffee: chilled strong coffee over two scoops of vanilla ice cream, topped with whipped cream and chocolate.",
      prep: 8, make: 4, difficulty: "Easy", image: pexels(31199325),
      sourceName: "Wikipedia — Eiskaffee", sourceUrl: "https://de.wikipedia.org/wiki/Eiskaffee",
      notes: "In German cafés it comes in a tall glass with a long spoon and a straw — a summer afternoon staple.",
    },
    [
      { pantryId: "ground-coffee", label: "Medium ground coffee", amount: "20 g" },
      { pantryId: "water", label: "Hot water, just off the boil", amount: "160 ml" },
      { pantryId: "vanilla-ice-cream", label: "Vanilla ice cream, 2 scoops", amount: "100 g" },
      { pantryId: "heavy-cream", label: "Whipped cream, to top", amount: "40 ml" },
      { pantryId: "dark-chocolate", label: "Grated dark chocolate, to top", amount: "10 g", optional: true },
    ],
    dripMethods({
      coffeeG: 20, waterMl: 160, byHandWaterMl: 190,
      lines: [
        { pantryId: "vanilla-ice-cream", label: "Vanilla ice cream, 2 scoops", amount: "100 g" },
        { pantryId: "heavy-cream", label: "Whipped cream, to top", amount: "40 ml" },
        { pantryId: "dark-chocolate", label: "Grated dark chocolate, to top", amount: "10 g", optional: true },
      ],
      into: "into a jug",
      after: ["Let the coffee cool, then chill it in the fridge until cold, about 30 minutes — or stir it over a few ice cubes.", "Put two scoops of ice cream in a tall glass and pour the cold coffee around it.", "Whip the cream until it holds soft peaks, spoon it on top and finish with grated chocolate."],
    })
  ),
  drink(
    {
      id: "cold-filter-coffee", title: "Iced Filter Coffee", type: "Coffee", temperature: "cold", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Refreshing"],
      description: "South Indian filter coffee served cold: the strong decoction stirred into chilled sweet milk and poured over ice.",
      prep: 5, make: 10, difficulty: "Medium", image: pexels(35795108),
      sourceName: "Wikipedia — Indian filter coffee", sourceUrl: "https://en.wikipedia.org/wiki/Indian_filter_coffee",
    },
    [
      { pantryId: "ground-coffee", label: "Filter coffee powder (coffee and chicory blend)", amount: "20 g" },
      { pantryId: "water", label: "Boiling water, for the decoction", amount: "100 ml" },
      { pantryId: "milk", label: "Cold whole milk", amount: "150 ml" },
      { pantryId: "sugar", label: "Sugar, to taste", amount: "2 tsp" },
      { pantryId: "ice", label: "Ice cubes", amount: "1 cup" },
    ],
    [
      {
        id: "south-indian-filter", label: "South Indian filter", equipment: ["South Indian Filter"],
        steps: ["Put the coffee powder in the upper chamber of the filter, level it, press the disc on top and pour in the boiling water. Cover and leave it to drip for 15–20 minutes.", "Stir the sugar into the warm decoction until dissolved, then let it cool.", "Fill a tall glass with ice, add the cold milk and pour the decoction over it. Stir and serve."],
      },
      {
        id: "french-press", label: "French press", equipment: ["French Press"],
        steps: ["Put the coffee powder in a small French press, pour in the boiling water, stir and cover. Leave it for 10 minutes, then press.", "Stir the sugar into the warm decoction until dissolved, then let it cool.", "Fill a tall glass with ice, add the cold milk and pour the decoction over it. Stir and serve."],
      },
      {
        id: "by-hand", label: "By hand", equipment: [], handTools: ["Small pan", "Fine sieve or cloth", "Tall glass"],
        steps: ["Stir the coffee powder into the boiling water in a small pan, cover and steep for 10 minutes, then strain through a fine sieve or cloth.", "Stir the sugar into the warm decoction until dissolved, then let it cool.", "Fill a tall glass with ice, add the cold milk and pour the decoction over it. Stir and serve."],
      },
    ]
  ),
  drink(
    {
      id: "coconut-coffee", title: "Coconut Coffee (Cà Phê Cốt Dừa)", type: "Coffee", temperature: "cold", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Rich"],
      description: "Vietnam's coconut coffee: a thick, icy coconut-milk smoothie topped with strong phin coffee, so every sip moves from coconut to bitter.",
      prep: 8, make: 6, difficulty: "Medium", image: pexels(29370798),
      sourceName: "Wikipedia — Vietnamese coffee", sourceUrl: "https://en.wikipedia.org/wiki/Vietnamese_iced_coffee",
      notes: "Use the thick, full-fat canned coconut milk.",
    },
    [
      { pantryId: "ground-coffee", label: "Dark-roast ground coffee", amount: "15 g" },
      { pantryId: "water", label: "Hot water, just off the boil", amount: "60 ml" },
      { pantryId: "coconut-milk", label: "Full-fat coconut milk, chilled", amount: "100 ml" },
      { pantryId: "sweetened-condensed-milk", label: "Sweetened condensed milk", amount: "30 ml" },
      { pantryId: "ice", label: "Ice cubes", amount: "1 cup" },
    ],
    dripMethods({
      coffeeG: 15, waterMl: 60, byHandWaterMl: 75,
      lines: [
        { pantryId: "coconut-milk", label: "Full-fat coconut milk, chilled", amount: "100 ml" },
        { pantryId: "sweetened-condensed-milk", label: "Sweetened condensed milk", amount: "30 ml" },
        { pantryId: "ice", label: "Ice cubes", amount: "1 cup" },
      ],
      before: ["Blend the coconut milk, condensed milk and ice until thick and slushy — or shake them hard with the ice in a lidded jar, and stir until the ice has mostly broken down. Pour into a glass."],
      into: "into a small cup",
      after: ["Pour the hot coffee over the coconut slush and serve at once with a spoon and a straw."],
      optional: [{ tag: "Blender", without: "Shake hard in a lidded jar with the ice — less smooth, but still thick and cold." }],
    })
  ),
  drink(
    {
      id: "black-iced-coffee", title: "Black Iced Coffee", type: "Coffee", temperature: "cold", diet: ["Vegan", "Dairy-Free", "Low Sugar", "Gluten-Free"], taste: ["Refreshing", "Bitter"],
      description: "Simple hot-brewed coffee poured over ice: clean, strong and unsweetened unless you want it to be.",
      prep: 3, make: 5, difficulty: "Easy", image: pexels(8255188),
      notes: "Brew it strong — the ice will dilute it.",
    },
    [
      { pantryId: "ground-coffee", label: "Medium ground coffee", amount: "20 g" },
      { pantryId: "water", label: "Hot water, just off the boil", amount: "200 ml" },
      { pantryId: "ice", label: "Ice cubes", amount: "1 cup" },
      { pantryId: "sugar", label: "Sugar, optional", amount: "1 tsp", optional: true },
    ],
    dripMethods({
      coffeeG: 20, waterMl: 200, byHandWaterMl: 230,
      lines: [{ pantryId: "ice", label: "Ice cubes", amount: "1 cup" }, { pantryId: "sugar", label: "Sugar, optional", amount: "1 tsp", optional: true }],
      into: "into a jug",
      after: ["Stir in the sugar, if using, while the coffee is hot.", "Fill a tall glass with ice and pour the coffee over it. Drink right away."],
    })
  ),
  espresso(
    {
      id: "kopi-susu-gula-aren", title: "Kopi Susu Gula Aren", type: "Coffee", temperature: "cold", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy"],
      description: "Indonesia's iced palm-sugar latte: espresso and milk sweetened with caramel-like gula aren syrup, over ice.",
      prep: 5, make: 3, difficulty: "Easy", image: pexels(36572437),
      notes: "Gula aren is palm sugar; the syrup is 1:1 sugar and hot water. Dark brown sugar can stand in.",
    },
    {
      size: "double",
      lines: [{ pantryId: "palm-sugar", label: "Palm sugar, chopped (gula aren)", amount: "2 tbsp" }, milk(150), ice()],
      extraWaterMl: 30,
      into: "into a small cup",
      before: ["Stir the palm sugar into 30 ml of hot water until completely dissolved, then pour it into a tall glass. Add the ice and cold milk."],
      after: ["Pour the hot coffee over the top. Stir well and drink."],
    }
  ),
  drink(
    {
      id: "thai-iced-coffee", title: "Thai Iced Coffee", type: "Coffee", temperature: "cold", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Rich"],
      description: "Strong dark-roast coffee with sweetened condensed and evaporated milk, poured over a glass of crushed ice — the street-stall drink.",
      prep: 5, make: 6, difficulty: "Easy", image: pexels(37834876),
      sourceName: "Wikipedia — Thai iced coffee", sourceUrl: "https://en.wikipedia.org/wiki/Thai_iced_tea",
    },
    [
      { pantryId: "ground-coffee", label: "Dark-roast ground coffee", amount: "20 g" },
      { pantryId: "water", label: "Hot water, just off the boil", amount: "150 ml" },
      { pantryId: "sweetened-condensed-milk", label: "Sweetened condensed milk", amount: "30 ml" },
      { pantryId: "evaporated-milk", label: "Evaporated milk", amount: "30 ml" },
      { pantryId: "ice", label: "Crushed ice", amount: "1 cup" },
    ],
    dripMethods({
      coffeeG: 20, waterMl: 150, byHandWaterMl: 180,
      lines: [
        { pantryId: "sweetened-condensed-milk", label: "Sweetened condensed milk", amount: "30 ml" },
        { pantryId: "evaporated-milk", label: "Evaporated milk", amount: "30 ml" },
        { pantryId: "ice", label: "Crushed ice", amount: "1 cup" },
      ],
      before: ["Fill a tall glass with ice."],
      into: "into a jug",
      after: ["Stir the condensed milk into the hot coffee until dissolved, then pour it over the ice.", "Top with a swirl of evaporated milk and serve."],
    })
  ),
  espresso(
    {
      id: "mazagran", title: "Mazagran", type: "Coffee", temperature: "cold", diet: ["Vegan", "Dairy-Free", "Gluten-Free"], taste: ["Refreshing", "Sweet", "Bitter"],
      description: "Cold sweet coffee with lemon, a nineteenth-century Algerian soldiers' drink: strong, tart and made for hot weather.",
      prep: 4, make: 2, difficulty: "Easy", image: pexels(37372293),
      sourceName: "Wikipedia — Mazagran", sourceUrl: "https://en.wikipedia.org/wiki/Mazagran_(drink)",
      notes: "It originated with the French garrison at Mazagran in Algeria in 1840. Some versions add a splash of rum or brandy; this one doesn't.",
    },
    {
      size: "double",
      lines: [{ pantryId: "sugar", label: "Sugar", amount: "2 tsp" }, { pantryId: "lemon", label: "Lemon, juiced", amount: "1/2" }, ice()],
      extraWaterMl: 60,
      into: "into a small cup",
      before: ["Put the sugar and the lemon juice in a tall glass."],
      after: ["Pour the hot coffee over the sugar and lemon and stir until dissolved.", "Add the ice, stir and serve cold, with a slice of lemon if you like."],
    }
  ),
  espresso(
    {
      id: "bumble-coffee", title: "Bumble Coffee", type: "Coffee", temperature: "cold", diet: ["Vegan", "Dairy-Free", "Gluten-Free"], taste: ["Refreshing", "Sweet", "Bitter"],
      description: "Espresso over orange juice and ice: sweet and tart at the bottom, bitter at the top, and meant to be stirred together as you drink.",
      prep: 3, make: 2, difficulty: "Easy", image: pexels(8679576),
      notes: "Fresh-squeezed juice makes the difference here.",
    },
    {
      size: "double",
      lines: [{ pantryId: "orange-juice", label: "Orange juice, cold", amount: "100 ml" }, ice(), { pantryId: "sugar", label: "Sugar, optional", amount: "1 tsp", optional: true }],
      into: "into a small cup",
      before: ["Fill a glass with ice and pour in the orange juice."],
      after: ["Stir the sugar into the hot coffee, if using, then pour it slowly over the back of a spoon onto the juice.", "Serve as it is, and stir as you drink."],
    }
  ),
];
