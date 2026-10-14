import type { Recipe } from "@/types";
import { drink, pexels } from "./builders";
import { steepIngredients, steepMethods, type SteepSpec } from "./teaBuilders";

/** Green, Japanese, white, oolong and pu-erh teas, and a few regional tea traditions. */

const steeped = (facts: Parameters<typeof drink>[0], spec: SteepSpec): Recipe => drink(facts, steepIngredients(spec), steepMethods(spec));
const NO_MILK = ["Vegan", "Dairy-Free", "Low Sugar", "Gluten-Free"] as const;

export const greenAndRegionalTeas: Recipe[] = [
  steeped(
    {
      id: "sencha", title: "Sencha", type: "Tea", temperature: "hot", diet: [...NO_MILK], taste: ["Herbal", "Refreshing"],
      description: "Japan's everyday green tea: grassy, fresh and a little sweet, brewed in a small pot with cooler water and a short steep.",
      prep: 2, make: 4, difficulty: "Easy", image: pexels(35042573),
      sourceName: "Wikipedia — Sencha", sourceUrl: "https://en.wikipedia.org/wiki/Sencha",
      notes: "Hot water makes sencha bitter and astringent. Let the boiled water cool to around 70–75°C first, and pour every drop out of the pot so the leaves don't over-steep.",
    },
    { leaf: { pantryId: "sencha", label: "Sencha, loose leaf", amount: "2 tsp" }, waterMl: 150, tempC: 75, minutes: 1, press: false, after: ["Pour the tea out in turns between cups, so each cup has the same strength, and drink right away."] }
  ),
  steeped(
    {
      id: "genmaicha", title: "Genmaicha", type: "Tea", temperature: "hot", diet: [...NO_MILK], taste: ["Herbal", "Rich"],
      description: "Green tea blended with toasted brown rice, giving a nutty, comforting cup that is gentler than straight green tea.",
      prep: 2, make: 5, difficulty: "Easy", image: pexels(3735473),
      sourceName: "Wikipedia — Genmaicha", sourceUrl: "https://en.wikipedia.org/wiki/Genmaicha",
    },
    { leaf: { pantryId: "genmaicha", label: "Genmaicha, loose leaf", amount: "2 tsp" }, waterMl: 250, tempC: 85, minutes: 2, after: ["Pour into a cup and drink hot."] }
  ),
  steeped(
    {
      id: "hojicha", title: "Hōjicha", type: "Tea", temperature: "hot", diet: [...NO_MILK], taste: ["Rich", "Herbal"],
      description: "Japanese green tea roasted until it turns brown: toasty, mellow, low in bitterness and very low in caffeine.",
      prep: 2, make: 4, difficulty: "Easy", image: pexels(5946681),
      sourceName: "Wikipedia — Hōjicha", sourceUrl: "https://en.wikipedia.org/wiki/H%C5%8Djicha",
      notes: "Unlike green teas, hōjicha can take boiling water: the roasting removes most of the bitterness.",
    },
    { leaf: { pantryId: "hojicha", label: "Hōjicha, loose leaf", amount: "2 tsp" }, waterMl: 250, tempC: 95, minutes: 1, after: ["Pour into a cup and drink hot."] }
  ),
  drink(
    {
      id: "matcha", title: "Matcha (Usucha)", type: "Tea", temperature: "hot", diet: [...NO_MILK], taste: ["Herbal", "Bitter"],
      description: "Powdered green tea whisked with a little hot water into a thin, frothy bowl — vivid green, grassy and slightly sweet.",
      prep: 3, make: 2, difficulty: "Medium", image: pexels(7113851),
      sourceName: "Wikipedia — Matcha", sourceUrl: "https://en.wikipedia.org/wiki/Matcha",
      notes: "Use water well below boiling — around 80°C — and sift the powder first so it doesn't clump.",
    },
    [
      { pantryId: "matcha-powder", label: "Matcha powder, sifted", amount: "1 tsp" },
      { pantryId: "water", label: "Hot water, about 80°C", amount: "70 ml" },
    ],
    [
      {
        id: "matcha-whisk", label: "Matcha whisk", equipment: ["Matcha Whisk"], handTools: ["Wide bowl", "Fine sieve"],
        steps: ["Sift the matcha through a fine sieve into a warm, wide bowl.", "Pour in the hot water, which should be about 80°C.", "Whisk briskly in a 'W' or 'M' motion, with your wrist, for 15–20 seconds, until the surface is covered in fine foam.", "Drink straight from the bowl while it is hot."],
      },
      {
        id: "milk-frother", label: "Hand frother", equipment: ["Milk Frother"], handTools: ["Wide bowl", "Fine sieve"],
        steps: ["Sift the matcha through a fine sieve into a warm bowl.", "Pour in the hot water, about 80°C.", "Froth with the hand frother for 15–20 seconds until the surface is covered in fine foam, and drink while hot."],
      },
      {
        id: "by-hand", label: "By hand", equipment: [], handTools: ["Small jar with a lid", "Fine sieve"],
        steps: ["Sift the matcha through a fine sieve into a small jar, then pour in the hot water, about 80°C.", "Close the lid tightly and shake hard for 15–20 seconds, until foamy.", "Pour into a cup or bowl and drink hot."],
        notes: "A jar shaken hard does a respectable job when you have no whisk or frother.",
      },
    ]
  ),
  drink(
    {
      id: "matcha-latte", title: "Matcha Latte", type: "Tea", temperature: "hot", diet: ["Gluten-Free"], taste: ["Creamy", "Herbal", "Sweet"],
      description: "Whisked matcha topped with hot, frothed milk and a touch of honey — mellow, creamy and green.",
      prep: 4, make: 4, difficulty: "Easy", image: pexels(39863690),
      notes: "Dissolve the matcha in a little water first, then add the milk: it won't clump that way.",
    },
    [
      { pantryId: "matcha-powder", label: "Matcha powder, sifted", amount: "1 tsp" },
      { pantryId: "water", label: "Hot water, about 80°C", amount: "60 ml" },
      { pantryId: "milk", label: "Whole milk", amount: "180 ml" },
      { pantryId: "honey", label: "Honey, to taste", amount: "1 tsp", optional: true },
    ],
    [
      {
        id: "matcha-whisk", label: "Matcha whisk", equipment: ["Matcha Whisk"], handTools: ["Wide bowl", "Saucepan", "Lidded jar"],
        steps: ["Sift the matcha into a warm bowl, add the hot water and whisk in a 'W' motion for 15–20 seconds until smooth and frothy.", "Heat the milk in a saucepan until steaming, about 65°C, pour it into a lidded jar and shake hard for 30 seconds until foamy.", "Pour the matcha into a mug, stir in the honey, then add the frothed milk, spooning the foam on top."],
      },
      {
        id: "milk-frother", label: "Hand frother", equipment: ["Milk Frother"], handTools: ["Bowl", "Saucepan"],
        steps: ["Sift the matcha into a warm bowl, add the hot water and froth with the hand frother for 15–20 seconds until smooth.", "Heat the milk in a saucepan until steaming, about 65°C, and froth it until it doubles in volume.", "Pour the matcha into a mug, stir in the honey, then add the frothed milk, spooning the foam on top."],
      },
      {
        id: "by-hand", label: "By hand", equipment: [], handTools: ["Lidded jar", "Fine sieve", "Saucepan"],
        steps: ["Sift the matcha into a lidded jar, add the hot water, close the lid and shake hard for 15–20 seconds until smooth and frothy. Pour into a mug.", "Heat the milk in a saucepan until steaming, about 65°C, pour it into the jar and shake again for 30 seconds until foamy.", "Stir the honey into the matcha, then pour in the frothed milk."],
      },
    ]
  ),
  drink(
    {
      id: "hojicha-latte", title: "Hōjicha Latte", type: "Tea", temperature: "hot", diet: ["Gluten-Free"], taste: ["Creamy", "Rich", "Sweet"],
      description: "Roasted green tea whisked with a little hot water and finished with hot milk — toasty, caramel-like and low in caffeine.",
      prep: 4, make: 4, difficulty: "Easy", image: pexels(20854092),
      notes: "Hōjicha powder is sold ready-ground. If you only have leaves, grind them very fine in a mortar first, or steep 2 tsp of leaves in the hot water for 3 minutes and strain.",
    },
    [
      { pantryId: "hojicha", label: "Hōjicha powder", amount: "1.5 tsp" },
      { pantryId: "water", label: "Hot water, about 90°C", amount: "60 ml" },
      { pantryId: "milk", label: "Whole milk", amount: "180 ml" },
      { pantryId: "honey", label: "Honey, to taste", amount: "1 tsp", optional: true },
    ],
    [
      {
        id: "matcha-whisk", label: "Matcha whisk", equipment: ["Matcha Whisk"], handTools: ["Wide bowl", "Saucepan", "Lidded jar"],
        steps: ["Put the hōjicha powder in a warm bowl, add the hot water and whisk in a 'W' motion until smooth.", "Heat the milk in a saucepan until steaming, about 65°C, pour it into a lidded jar and shake hard for 30 seconds until foamy.", "Pour the tea into a mug, stir in the honey and add the frothed milk."],
      },
      {
        id: "milk-frother", label: "Hand frother", equipment: ["Milk Frother"], handTools: ["Bowl", "Saucepan"],
        steps: ["Put the hōjicha powder in a bowl, add the hot water and froth until smooth.", "Heat the milk in a saucepan until steaming, about 65°C, and froth it until it doubles in volume.", "Pour the tea into a mug, stir in the honey and add the frothed milk."],
      },
      {
        id: "by-hand", label: "By hand", equipment: [], handTools: ["Lidded jar", "Saucepan"],
        steps: ["Put the hōjicha powder and hot water in a lidded jar and shake hard for 15 seconds until smooth. Pour into a mug.", "Heat the milk in a saucepan until steaming, about 65°C, pour it into the jar and shake for 30 seconds until foamy.", "Stir the honey into the tea and add the frothed milk."],
      },
    ]
  ),
  steeped(
    {
      id: "jasmine-tea", title: "Jasmine Tea", type: "Tea", temperature: "hot", diet: [...NO_MILK], taste: ["Herbal", "Refreshing"],
      description: "Green tea scented with jasmine blossoms: floral, light and calming — best brewed cooler so the scent stays.",
      prep: 2, make: 5, difficulty: "Easy", image: pexels(38050692),
      sourceName: "Wikipedia — Jasmine tea", sourceUrl: "https://en.wikipedia.org/wiki/Jasmine_tea",
    },
    { leaf: { pantryId: "jasmine-tea", label: "Jasmine tea, loose leaf or pearls", amount: "2 tsp" }, waterMl: 250, tempC: 80, minutes: 3, after: ["Drink it plain. Jasmine pearls can be steeped a second time."] }
  ),
  steeped(
    {
      id: "dragon-well-tea", title: "Dragon Well (Longjing)", type: "Tea", temperature: "hot", diet: [...NO_MILK], taste: ["Herbal", "Refreshing"],
      description: "China's famous pan-fired green tea: smooth, nutty and a little sweet, traditionally brewed in a glass so you can watch the leaves unfurl.",
      prep: 2, make: 4, difficulty: "Easy", image: pexels(30307112),
      sourceName: "Wikipedia — Longjing tea", sourceUrl: "https://en.wikipedia.org/wiki/Longjing_tea",
      notes: "In China you brew it straight in the glass, topping up with hot water as you drink.",
    },
    { leaf: { pantryId: "dragon-well-tea", label: "Dragon Well tea, loose leaf", amount: "1 tsp" }, waterMl: 200, tempC: 80, minutes: 2, press: false, after: ["Drink from the cup, topping up with more hot water as you go."] }
  ),
  drink(
    {
      id: "moroccan-mint-tea", title: "Moroccan Mint Tea", type: "Tea", temperature: "hot", diet: ["Vegan", "Dairy-Free", "Gluten-Free"], taste: ["Sweet", "Herbal", "Refreshing"],
      description: "Gunpowder green tea steeped with plenty of fresh mint and sugar, then poured from a height into small glasses.",
      prep: 3, make: 7, difficulty: "Easy", servings: 3, image: pexels(30497987),
      sourceName: "Wikipedia — Maghrebi mint tea", sourceUrl: "https://en.wikipedia.org/wiki/Maghrebi_mint_tea",
      notes: "Pouring from high above the glass aerates the tea and gives it a light foam. Rinsing the leaves first takes the edge off the bitterness.",
    },
    [
      { pantryId: "green-tea", label: "Gunpowder green tea", amount: "1 tbsp" },
      { pantryId: "fresh-mint", label: "Fresh mint, a big handful", amount: "15 g" },
      { pantryId: "sugar", label: "Sugar, to taste", amount: "2 tbsp" },
      { pantryId: "water", label: "Boiling water", amount: "500 ml" },
    ],
    [
      {
        id: "teapot", label: "Teapot", equipment: ["Teapot"], handTools: ["Small glasses"],
        steps: ["Put the green tea in the teapot, pour in a splash of boiling water, swirl and pour it away — this rinses the leaves.", "Add the mint and sugar to the pot and pour in the 500 ml of boiling water.", "Let it steep for 4–5 minutes, then pour a glass and tip it back into the pot to mix the sugar through.", "Pour the tea into small glasses from a height of 30 cm or more, so it foams slightly."],
      },
      {
        id: "by-hand", label: "By hand", equipment: [], handTools: ["Saucepan", "Small glasses", "Strainer or spoon"],
        steps: ["Put the green tea in a saucepan, pour in a splash of boiling water, swirl and pour it away — this rinses the leaves.", "Add the mint and sugar to the pan and pour in the 500 ml of boiling water.", "Cover and let it steep for 4–5 minutes, then stir.", "Strain into small glasses, pouring from a height so it foams slightly."],
      },
    ]
  ),
  steeped(
    {
      id: "white-tea", title: "White Tea", type: "Tea", temperature: "hot", diet: [...NO_MILK], taste: ["Herbal", "Refreshing"],
      description: "The least processed tea: pale, sweet and delicate, with a soft, honeyed, slightly floral flavour.",
      prep: 2, make: 6, difficulty: "Easy", image: pexels(37935178),
      sourceName: "Wikipedia — White tea", sourceUrl: "https://en.wikipedia.org/wiki/White_tea",
      notes: "Use cooler water and give it time: the leaves are fluffy and need longer to give up their flavour.",
    },
    { leaf: { pantryId: "white-tea", label: "White tea, loose leaf", amount: "2 tsp" }, waterMl: 250, tempC: 80, minutes: 4, after: ["Drink it plain. The leaves can be steeped again, for a little longer each time."] }
  ),
  steeped(
    {
      id: "oolong-tea", title: "Oolong Tea", type: "Tea", temperature: "hot", diet: [...NO_MILK], taste: ["Herbal", "Rich"],
      description: "Partly oxidised tea somewhere between green and black: floral and toasty, and good for several infusions from the same leaves.",
      prep: 2, make: 5, difficulty: "Easy", image: pexels(5190542),
      sourceName: "Wikipedia — Oolong", sourceUrl: "https://en.wikipedia.org/wiki/Oolong",
    },
    { leaf: { pantryId: "oolong-tea", label: "Oolong tea, loose leaf", amount: "2 tsp" }, waterMl: 250, tempC: 90, minutes: 3, after: ["Drink it plain. Re-steep the same leaves two or three times, adding 30 seconds each time."] }
  ),
  steeped(
    {
      id: "pu-erh-tea", title: "Pu-erh Tea", type: "Tea", temperature: "hot", diet: [...NO_MILK], taste: ["Rich", "Bitter"],
      description: "A fermented, aged Chinese tea with an earthy, smooth, almost woody depth, usually sold pressed into cakes.",
      prep: 2, make: 5, difficulty: "Easy", image: pexels(35496100),
      sourceName: "Wikipedia — Pu'er tea", sourceUrl: "https://en.wikipedia.org/wiki/Pu%27er_tea",
      notes: "Break a few grams off the cake with a knife or tea pick. The first quick rinse wakes the leaves and rinses off any dust.",
    },
    {
      leaf: { pantryId: "puerh-tea", label: "Pu-erh tea, broken from the cake", amount: "2 tsp" }, waterMl: 250, tempC: 100, minutes: 3,
      before: ["Rinse the leaves: pour a little of the boiling water over them in the pot or mug, count to five and tip the water away."],
      after: ["Drink it plain. Pu-erh can be steeped five or six times."],
    }
  ),
  drink(
    {
      id: "turkish-tea", title: "Turkish Tea (Çay)", type: "Tea", temperature: "hot", diet: ["Vegan", "Dairy-Free", "Gluten-Free"], taste: ["Rich", "Bitter"],
      description: "A strong black tea brewed over hot water in two stacked pots, then diluted to taste and served in small tulip-shaped glasses.",
      prep: 2, make: 15, difficulty: "Easy", servings: 2, image: pexels(16228379),
      sourceName: "Wikipedia — Turkish tea", sourceUrl: "https://en.wikipedia.org/wiki/Turkish_tea",
      notes: "Served 'koyu' (dark, stronger) or 'açık' (light, more hot water), usually with sugar cubes on the side and no milk.",
    },
    [
      { pantryId: "black-tea", label: "Black tea, Rize-style loose leaf", amount: "2 tbsp" },
      { pantryId: "water", label: "Water, boiling", amount: "500 ml" },
      { pantryId: "sugar", label: "Sugar cubes", amount: "2 tsp", optional: true },
    ],
    [
      {
        id: "teapot", label: "Teapot", equipment: ["Teapot"], handTools: ["Saucepan", "Small glasses"],
        steps: ["Boil the water in a saucepan. Put the tea in a teapot and pour over about 100 ml of the boiling water.", "Set the teapot on top of the saucepan of simmering water (or just keep it warm over very low heat) and let it brew for 10–15 minutes.", "Pour about a third of a small glass with the strong tea, and top up with hot water from the saucepan, to taste.", "Serve with sugar cubes on the side."],
      },
      {
        id: "by-hand", label: "By hand", equipment: [], handTools: ["Two saucepans", "Fine sieve", "Small glasses"],
        steps: ["Boil the water in one saucepan. Put the tea in a second, smaller saucepan, pour over about 100 ml of the boiling water, cover and keep over very low heat for 10–15 minutes.", "Strain a third of a small glass of the strong tea, and top up with hot water from the first saucepan, to taste.", "Serve with sugar cubes on the side."],
      },
    ]
  ),
  drink(
    {
      id: "karak-chai", title: "Karak Chai", type: "Tea", temperature: "hot", diet: ["Gluten-Free"], taste: ["Spicy", "Creamy", "Sweet"],
      description: "The Gulf's strong, sweet tea: black tea boiled hard with evaporated milk and cardamom until it is thick and aromatic.",
      prep: 3, make: 10, difficulty: "Easy", servings: 2, image: pexels(39999020),
      sourceName: "Wikipedia — Karak chai", sourceUrl: "https://en.wikipedia.org/wiki/Karak_chai",
      notes: "'Karak' means 'strong' in Hindi and Urdu. Saffron or ginger often go in as well.",
    },
    [
      { pantryId: "water", label: "Water", amount: "250 ml" },
      { pantryId: "black-tea", label: "Strong black tea", amount: "2 tsp" },
      { pantryId: "cardamom", label: "Green cardamom pods, crushed", amount: "3" },
      { pantryId: "evaporated-milk", label: "Evaporated milk", amount: "120 ml" },
      { pantryId: "sugar", label: "Sugar", amount: "2 tsp" },
    ],
    [
      {
        id: "saucepan", label: "Saucepan", equipment: [], handTools: ["Saucepan", "Spoon", "Two cups"],
        optionalEquipment: [{ tag: "Strainer", without: "Pour slowly through a fine sieve, or ladle it out and leave the leaves behind." }],
        steps: ["Boil the water in a saucepan with the cardamom and tea for 4 minutes, until it is dark and strongly scented.", "Add the evaporated milk and the sugar and bring it back to a gentle boil. Simmer for another 3 minutes, without letting it boil over.", "Strain into two cups and serve very hot."],
      },
    ]
  ),
];
