import type { Recipe, RecipeIngredient } from "@/types";
import { drink, pexels } from "./builders";
import { fruitShake, iceCreamShake } from "./shakeBuilders";

/** Fruit and nut shakes, dessert shakes, and regional milk drinks. */

const vanilla = (g: number, label = "Vanilla ice cream"): RecipeIngredient => ({ pantryId: "vanilla-ice-cream", label: `${label}, ${Math.max(1, Math.round(g / 60))} scoops`, amount: `${g} g` });
const GF = ["Gluten-Free"] as const;

export const fruitAndSpecialShakes: Recipe[] = [
  fruitShake(
    { id: "mango-milkshake", title: "Mango Milkshake", diet: [...GF], taste: ["Fruity", "Sweet", "Creamy"], description: "Ripe mango blended with cold milk and a little sugar: thick, golden and the taste of an Indian summer.", prep: 5, make: 2, difficulty: "Easy", image: pexels(38445505), sourceName: "Magicpin — milkshakes to try", sourceUrl: "https://magicpin.com/blog/try-these-milkshakes", notes: "Alphonso or kesar mangoes are best. Add a scoop of vanilla ice cream for a thicker shake." },
    {
      lines: [{ pantryId: "mango", label: "Very ripe mango, peeled and chopped", amount: "150 g" }, { pantryId: "sugar", label: "Sugar, to taste", amount: "1 tbsp" }, { pantryId: "vanilla-ice-cream", label: "Vanilla ice cream, optional", amount: "60 g", optional: true }],
      milkMl: 200, before: ["Peel the mango and cut the flesh from the stone."], withIn: "the mango, the sugar and the ice cream (if using)", mashWhat: "mango flesh",
    }
  ),
  fruitShake(
    { id: "chikoo-milkshake", title: "Chikoo Milkshake", diet: [...GF], taste: ["Sweet", "Creamy", "Rich"], description: "Soft, caramel-like chikoo (sapodilla) blended with cold milk — malty, sweet and one of India's favourite fruit shakes.", prep: 5, make: 2, difficulty: "Easy", image: pexels(28010208), notes: "Use fruit that gives a little when pressed. Unripe chikoo is astringent and sticky." },
    {
      lines: [{ pantryId: "chikoo", label: "Ripe chikoo (sapodilla), peeled, seeds removed", amount: "2" }, { pantryId: "sugar", label: "Sugar, to taste", amount: "1 tbsp" }, { pantryId: "ice", label: "Ice cubes", amount: "1/2 cup" }],
      milkMl: 250, before: ["Peel the chikoo, cut the flesh from the shiny black seeds and discard the seeds."], withIn: "the chikoo, the sugar and the ice", mashWhat: "chikoo",
    }
  ),
  fruitShake(
    { id: "avocado-milkshake", title: "Avocado Milkshake", diet: [...GF], taste: ["Creamy", "Sweet", "Rich"], description: "A ripe avocado blended with milk and condensed milk — silky, pale green and richer than it sounds, popular in Indonesia, Brazil and Kerala.", prep: 4, make: 2, difficulty: "Easy", image: pexels(11009209), notes: "In Indonesia it is finished with a drizzle of chocolate syrup." },
    {
      lines: [{ pantryId: "avocado", label: "Ripe avocado, flesh only", amount: "1/2" }, { pantryId: "sweetened-condensed-milk", label: "Sweetened condensed milk", amount: "2 tbsp" }, { pantryId: "ice", label: "Ice cubes", amount: "1/2 cup" }, { pantryId: "chocolate-syrup", label: "Chocolate syrup, to drizzle", amount: "1 tbsp", optional: true }],
      milkMl: 250, before: ["Halve the avocado, remove the stone and scoop out the flesh."], withIn: "the avocado, the condensed milk and the ice", mashWhat: "avocado",
      after: ["Pour into a tall glass, drizzle with chocolate syrup if you like, and serve right away."],
    }
  ),
  fruitShake(
    { id: "date-milkshake", title: "Date Milkshake", diet: [...GF], taste: ["Sweet", "Rich", "Creamy"], description: "Soft dates blended with cold milk and a pinch of cardamom — naturally sweet, caramelly and a favourite across the Middle East.", prep: 15, make: 2, difficulty: "Easy", image: pexels(17272970), notes: "Medjool dates blend smoothest. Soak them in warm water first, so they break down." },
    {
      lines: [{ pantryId: "dates", label: "Soft pitted dates", amount: "8" }, { pantryId: "cardamom", label: "Ground cardamom", amount: "1 pinch" }, { pantryId: "vanilla-ice-cream", label: "Vanilla ice cream, optional", amount: "60 g", optional: true }],
      milkMl: 250, before: ["Soak the pitted dates in a little warm water for 10 minutes, then drain."], withIn: "the dates, cardamom and ice cream (if using)", mashWhat: "soaked dates (to a paste)",
    }
  ),
  iceCreamShake(
    { id: "blueberry-milkshake", title: "Blueberry Milkshake", diet: [...GF], taste: ["Fruity", "Creamy", "Sweet"], description: "Blueberries blended with vanilla ice cream and milk: purple, tangy and creamy.", prep: 4, make: 2, difficulty: "Easy", image: pexels(7463309) },
    { iceCream: vanilla(180), milkMl: 120, lines: [{ pantryId: "blueberries", label: "Blueberries, fresh or frozen", amount: "100 g" }], withIn: "and the blueberries", handBefore: ["Mash the blueberries in the bowl with a fork until they are a juicy purple pulp."] }
  ),
  fruitShake(
    { id: "strawberry-banana-milkshake", title: "Strawberry Banana Milkshake", diet: [...GF], taste: ["Fruity", "Sweet", "Creamy"], description: "Strawberries and a ripe banana blended with cold milk: a classic fruit pairing, pink and mellow.", prep: 4, make: 2, difficulty: "Easy", image: pexels(8743860) },
    {
      lines: [{ pantryId: "strawberry", label: "Strawberries, hulled", amount: "80 g" }, { pantryId: "banana", label: "Ripe banana", amount: "1" }, { pantryId: "sugar", label: "Sugar, to taste", amount: "1 tsp", optional: true }, { pantryId: "vanilla-ice-cream", label: "Vanilla ice cream, optional", amount: "60 g", optional: true }],
      milkMl: 200, before: ["Hull the strawberries and peel the banana."], withIn: "the strawberries, banana, sugar and ice cream (if using)", mashWhat: "strawberries and banana (together, into a pulp)",
    }
  ),
  fruitShake(
    { id: "pistachio-milkshake", title: "Pistachio Milkshake", taste: ["Rich", "Creamy", "Sweet"], description: "Pistachios blended with milk and ice cream — pale green, nutty and gently sweet.", prep: 35, make: 3, difficulty: "Easy", image: pexels(12419198), notes: "Soak the pistachios for 30 minutes so they blend smooth, then peel off any loose skins." },
    {
      lines: [{ pantryId: "pistachios", label: "Shelled pistachios, unsalted", amount: "40 g" }, { pantryId: "vanilla-ice-cream", label: "Vanilla ice cream, 2 scoops", amount: "120 g" }, { pantryId: "sugar", label: "Sugar, to taste", amount: "1 tbsp" }],
      milkMl: 200, before: ["Soak the pistachios in hot water for 30 minutes, then drain."], withIn: "the pistachios, the ice cream and the sugar", mashWhat: "pistachios", blenderOnly: true,
    }
  ),
  iceCreamShake(
    { id: "coconut-milkshake", title: "Coconut Milkshake", diet: [...GF], taste: ["Creamy", "Sweet", "Refreshing"], description: "Coconut milk and vanilla ice cream blended with desiccated coconut — creamy, tropical and light.", prep: 3, make: 2, difficulty: "Easy", image: pexels(10806021) },
    { iceCream: vanilla(120), milkMl: 120, lines: [{ pantryId: "coconut-milk", label: "Coconut milk, chilled", amount: "100 ml" }, { pantryId: "coconut-flakes", label: "Desiccated coconut, plus a little to top", amount: "2 tbsp" }], withIn: "the coconut milk and the coconut", after: ["Pour into a tall glass, scatter a little coconut on top and serve."] }
  ),
  iceCreamShake(
    { id: "cherry-milkshake", title: "Cherry Milkshake", diet: [...GF], taste: ["Fruity", "Sweet", "Creamy"], description: "Sweet cherries blended with vanilla ice cream and milk, topped with a cherry — pink, fruity and old-fashioned.", prep: 5, make: 2, difficulty: "Easy", image: pexels(13185222) },
    { iceCream: vanilla(180), milkMl: 120, lines: [{ pantryId: "cherries", label: "Sweet cherries, pitted", amount: "80 g" }], before: ["Pit the cherries, keeping one with its stem to top the glass."], withIn: "and the cherries", handBefore: ["Mash the cherries in the bowl to a juicy pulp."], after: ["Pour into a tall glass, top with whipped cream and the reserved cherry, and serve."] }
  ),
  iceCreamShake(
    { id: "raspberry-milkshake", title: "Raspberry Milkshake", diet: [...GF], taste: ["Fruity", "Tangy", "Creamy"], description: "Raspberries blended with vanilla ice cream and milk — tart, bright pink and creamy.", prep: 4, make: 2, difficulty: "Easy", image: pexels(20791356), notes: "Strain it through a sieve if you don't like the seeds." },
    { iceCream: vanilla(180), milkMl: 120, lines: [{ pantryId: "raspberries", label: "Raspberries, fresh or frozen", amount: "100 g" }, { pantryId: "honey", label: "Honey, to taste", amount: "1 tsp", optional: true }], withIn: "the raspberries and the honey (if using)", handBefore: ["Mash the raspberries in the bowl with a fork until they are a juicy pulp."] }
  ),
  fruitShake(
    { id: "fig-milkshake", title: "Fig Milkshake (Anjeer)", diet: [...GF], taste: ["Sweet", "Rich", "Creamy"], description: "Ripe or soaked dried figs blended with cold milk and honey — honeyed, nutty and rich.", prep: 15, make: 2, difficulty: "Easy", image: pexels(19069897), notes: "If using dried figs, soak them in warm water for 15 minutes first." },
    {
      lines: [{ pantryId: "figs", label: "Fresh figs, or 4 dried figs soaked", amount: "3" }, { pantryId: "honey", label: "Honey, to taste", amount: "1 tbsp" }, { pantryId: "vanilla-ice-cream", label: "Vanilla ice cream, optional", amount: "60 g", optional: true }],
      milkMl: 250, before: ["Trim the stalks off the figs and roughly chop them (soak dried figs first and drain)."], withIn: "the figs, honey and ice cream (if using)", mashWhat: "figs",
    }
  ),
  fruitShake(
    { id: "sharjah-shake", title: "Sharjah Shake", taste: ["Sweet", "Creamy", "Rich"], description: "Kerala's banana shake: ripe bananas blended with milk, malted drink powder and cashews — thick, malty and filling.", prep: 5, make: 2, difficulty: "Easy", image: pexels(35092422), sourceName: "Veg Recipes of India — Sharjah shake", sourceUrl: "https://www.vegrecipesofindia.com/sharjah-shake/", notes: "Frozen milk or a few ice cubes make it thicker. Boost, Horlicks or Bournvita all work." },
    {
      lines: [{ pantryId: "banana", label: "Ripe bananas", amount: "2" }, { pantryId: "malted-milk-powder", label: "Malted milk powder (Horlicks, Boost or similar)", amount: "2 tbsp" }, { pantryId: "cashews", label: "Cashews, optional", amount: "6", optional: true }, { pantryId: "sugar", label: "Sugar, to taste", amount: "1 tbsp" }, { pantryId: "ice", label: "Ice cubes", amount: "1/2 cup" }],
      milkMl: 250, before: ["Peel and slice the bananas."], withIn: "the bananas, malted milk powder, cashews (if using), sugar and ice", mashWhat: "bananas",
    }
  ),
  iceCreamShake(
    { id: "caramel-milkshake", title: "Caramel Milkshake", diet: [...GF], taste: ["Sweet", "Rich", "Creamy"], description: "Vanilla ice cream and milk blended with caramel sauce, with more drizzled over the top.", prep: 3, make: 2, difficulty: "Easy", image: pexels(20066397) },
    { iceCream: vanilla(180), milkMl: 150, lines: [{ pantryId: "caramel-sauce", label: "Caramel sauce", amount: "3 tbsp" }], withIn: "and 2 tablespoons of the caramel sauce", after: ["Pour into a tall glass, drizzle with the last tablespoon of caramel and serve."] }
  ),
  iceCreamShake(
    { id: "chocolate-hazelnut-milkshake", title: "Chocolate Hazelnut Milkshake", taste: ["Rich", "Sweet", "Creamy"], description: "Vanilla ice cream and milk blended with chocolate hazelnut spread — nutty, chocolatey and thick.", prep: 3, make: 2, difficulty: "Easy", image: pexels(1562465), sourceName: "RTA Outdoor Living — most popular milkshake flavours", sourceUrl: "https://rtaoutdoorliving.com/most-popular-milkshake/" },
    { iceCream: vanilla(180), milkMl: 150, lines: [{ pantryId: "chocolate-hazelnut-spread", label: "Chocolate hazelnut spread", amount: "2 tbsp" }], withIn: "and the chocolate hazelnut spread", handBefore: ["Warm the spread for 10 seconds so it is soft enough to stir in."] }
  ),
  iceCreamShake(
    { id: "speculoos-milkshake", title: "Speculoos Biscuit Milkshake", taste: ["Sweet", "Spicy", "Creamy"], description: "Vanilla ice cream blended with caramelised, cinnamon-spiced biscuits — a favourite from Belgium to Hong Kong.", prep: 4, make: 2, difficulty: "Easy", image: pexels(33459861), notes: "These are the spiced caramel biscuits known as speculoos or Biscoff." },
    { iceCream: vanilla(180), milkMl: 150, lines: [{ pantryId: "speculoos-biscuits", label: "Speculoos biscuits", amount: "4" }], before: ["Crush three of the biscuits. Keep the fourth whole for the top."], withIn: "and the crushed biscuits", after: ["Pour into a tall glass, top with the whole biscuit and serve."] }
  ),
  iceCreamShake(
    { id: "ube-milkshake", title: "Ube Milkshake", diet: [...GF], taste: ["Sweet", "Creamy"], description: "Purple yam blended with vanilla ice cream and milk: vividly purple, mildly nutty and vanilla-like — a favourite from the Philippines.", prep: 3, make: 2, difficulty: "Easy", image: pexels(27947539) },
    { iceCream: vanilla(180), milkMl: 150, lines: [{ pantryId: "ube-powder", label: "Ube powder or extract", amount: "1 tbsp" }], withIn: "and the ube", handBefore: ["Stir the ube powder into 2 tbsp of the milk until smooth, with no lumps, before you start."] }
  ),
  iceCreamShake(
    { id: "matcha-milkshake", title: "Matcha Milkshake", diet: [...GF], taste: ["Creamy", "Herbal", "Sweet"], description: "Whisked matcha blended with vanilla ice cream and milk — grassy, creamy and pale green.", prep: 4, make: 2, difficulty: "Easy", image: pexels(32972549) },
    { iceCream: vanilla(180), milkMl: 120, lines: [{ pantryId: "matcha-powder", label: "Matcha powder, sifted", amount: "1.5 tsp" }, { pantryId: "water", label: "Hot water, about 80°C", amount: "2 tbsp" }], before: ["Whisk the matcha with the hot water in a small bowl until smooth, then let it cool for a minute."], withIn: "and the matcha" }
  ),
  drink(
    { id: "rose-milk", title: "Rose Milk", type: "Milkshakes & thick shakes", temperature: "cold", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Refreshing"], description: "Cold milk stirred with rose syrup: pink, floral and cooling, a staple of Indian summers.", prep: 2, make: 1, difficulty: "Easy", image: pexels(35680954), notes: "Add a scoop of vanilla ice cream to turn it into a rose milkshake." },
    [
      { pantryId: "milk", label: "Cold whole milk", amount: "250 ml" },
      { pantryId: "rose-syrup", label: "Rose syrup", amount: "2 tbsp" },
      { pantryId: "ice", label: "Ice cubes", amount: "1/2 cup", optional: true },
      { pantryId: "vanilla-ice-cream", label: "Vanilla ice cream, optional", amount: "60 g", optional: true },
    ],
    [
      { id: "by-hand", label: "By hand", equipment: [], handTools: ["Tall glass", "Spoon"], optionalEquipment: [{ tag: "Milk Frother", without: "Stir well with a long spoon, or shake in a lidded jar for 15 seconds." }], steps: ["Pour the rose syrup into the bottom of a tall glass.", "Add the cold milk slowly, stirring as you pour so the syrup mixes through and the milk turns an even pink.", "Add ice (and a scoop of ice cream, if using) and serve right away."] },
    ]
  ),
  drink(
    { id: "badam-milk", title: "Badam Milk", type: "Milkshakes & thick shakes", temperature: "hot", diet: ["Gluten-Free"], taste: ["Sweet", "Rich", "Creamy"], description: "Milk simmered with ground almonds, saffron and cardamom: warm, golden and fragrant, served at Indian festivals and after dinner.", prep: 15, make: 10, difficulty: "Easy", image: pexels(38260645), notes: "Soak the almonds in hot water for 15 minutes so the skins slip off. Serve it hot, or chilled on a warm day." },
    [
      { pantryId: "milk", label: "Whole milk", amount: "250 ml" },
      { pantryId: "almonds", label: "Almonds, soaked and peeled", amount: "10" },
      { pantryId: "saffron", label: "Saffron threads", amount: "4" },
      { pantryId: "cardamom", label: "Green cardamom pod, crushed", amount: "1" },
      { pantryId: "sugar", label: "Sugar, to taste", amount: "1 tbsp" },
    ],
    [
      { id: "blender", label: "Blender", equipment: ["Blender"], handTools: ["Saucepan"], steps: ["Soak the almonds in hot water for 15 minutes, then peel and drain them.", "Blend the almonds with 100 ml of the milk to a fine, smooth paste.", "Heat the rest of the milk in a saucepan with the cardamom and saffron, add the almond paste and the sugar and simmer gently for 6–8 minutes, stirring, until slightly thickened.", "Pour into a cup and serve hot."] },
      { id: "by-hand", label: "By hand", equipment: [], handTools: ["Saucepan", "Grater or mortar and pestle", "Fine sieve"], steps: ["Soak the almonds in hot water for 15 minutes, then peel and drain them. Grate them as finely as you can, or pound them to a paste in a mortar.", "Heat the milk in a saucepan with the cardamom and saffron, and stir in the ground almonds and the sugar.", "Simmer gently for 10 minutes, stirring often, until slightly thickened. Strain if you want it completely smooth.", "Pour into a cup and serve hot."] },
    ]
  ),
  drink(
    { id: "thandai", title: "Thandai", type: "Milkshakes & thick shakes", temperature: "cold", diet: ["Gluten-Free"], taste: ["Spicy", "Sweet", "Creamy"], description: "A cooling Indian festival drink: milk blended with almonds, pistachios, fennel, cardamom, pepper and saffron.", prep: 20, make: 5, difficulty: "Medium", image: pexels(15082977), notes: "Traditionally made for Holi and Mahashivratri. Soak the nuts and spices for at least 2 hours, or overnight, for the smoothest drink." },
    [
      { pantryId: "milk", label: "Cold whole milk", amount: "300 ml" },
      { pantryId: "almonds", label: "Almonds, soaked", amount: "8" },
      { pantryId: "pistachios", label: "Pistachios, soaked", amount: "1 tbsp" },
      { pantryId: "fennel-seeds", label: "Fennel seeds", amount: "1 tsp" },
      { pantryId: "cardamom", label: "Green cardamom pods", amount: "2" },
      { pantryId: "black-pepper", label: "Black peppercorns", amount: "4" },
      { pantryId: "saffron", label: "Saffron threads", amount: "4" },
      { pantryId: "sugar", label: "Sugar, to taste", amount: "2 tbsp" },
    ],
    [
      { id: "blender", label: "Blender", equipment: ["Blender"], handTools: ["Fine sieve"], steps: ["Soak the almonds, pistachios, fennel seeds, cardamom and peppercorns in a little hot water for at least 2 hours, then drain.", "Blend them with 100 ml of the cold milk to a very fine paste, adding the saffron soaked in 1 tbsp of warm milk.", "Stir the paste, the sugar and the rest of the cold milk together, and strain through a fine sieve, pressing the solids.", "Chill and serve cold, topped with a few pistachio slivers."] },
      { id: "by-hand", label: "By hand", equipment: [], handTools: ["Mortar and pestle", "Fine sieve"], steps: ["Soak the almonds, pistachios and fennel seeds in hot water for at least 2 hours, then drain and peel the almonds.", "Pound the nuts, fennel, cardamom seeds and peppercorns to a very fine paste in a mortar, adding a splash of milk as you go, and stir in the saffron soaked in 1 tbsp of warm milk.", "Stir the paste, the sugar and the rest of the cold milk together, and strain through a fine sieve, pressing the solids.", "Chill and serve cold."] },
    ]
  ),
  drink(
    { id: "egg-cream", title: "Egg Cream", type: "Milkshakes & thick shakes", temperature: "cold", diet: ["Gluten-Free"], taste: ["Sweet", "Refreshing", "Creamy"], description: "New York's soda-fountain classic: chocolate syrup, cold milk and seltzer, whisked until it foams — it has neither egg nor cream.", prep: 2, make: 2, difficulty: "Easy", image: pexels(9868631), sourceName: "PBS Food — chocolate egg cream", sourceUrl: "https://www.pbs.org/food/recipes/chocolate-egg-cream", notes: "Order of pouring matters: syrup, then milk, then seltzer straight in from a height to build the foam." },
    [
      { pantryId: "chocolate-syrup", label: "Chocolate syrup", amount: "2 tbsp" },
      { pantryId: "milk", label: "Cold whole milk", amount: "60 ml" },
      { pantryId: "sparkling-water", label: "Chilled seltzer (plain sparkling water)", amount: "150 ml" },
    ],
    [
      { id: "by-hand", label: "By hand", equipment: [], handTools: ["Tall glass", "Long spoon"], steps: ["Pour the chocolate syrup into a tall glass, then add the cold milk.", "Hold the bottle of seltzer high above the glass and pour it in fast, so a thick white foam rises to the top.", "Stir briskly with a long spoon, just enough to blend the syrup from the bottom, and drink right away while it is still fizzy."] },
    ]
  ),
];
