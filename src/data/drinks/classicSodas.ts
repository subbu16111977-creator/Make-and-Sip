import type { Recipe } from "@/types";
import { pexels } from "./builders";
import { ICE, L, SQUEEZER } from "./mocktailBuilders";
import { FIZZ, SYRUP, built, fizzy, syrupSoda } from "./sodaBuilders";

/** The soda-fountain classics, made from real ingredients: ginger beer and ale, cola, root beer, cream soda and the fruit sodas. */

const VEG = ["Vegan", "Dairy-Free", "Gluten-Free", "Caffeine-Free"] as const;
const wiki = (title: string, slug: string) => ({ sourceName: `Wikipedia — ${title}`, sourceUrl: `https://en.wikipedia.org/wiki/${slug}` });

export const classicSodas: Recipe[] = [
  syrupSoda(
    { id: "ginger-beer", title: "Ginger Beer", diet: [...VEG], taste: ["Spicy", "Tangy", "Refreshing"], description: "A sharp, fiery ginger syrup with lemon, topped with fizz. This is the quick, unfermented way, so it is ready in half an hour and has no alcohol.", prep: 10, make: 20, wait: 20, difficulty: "Easy", image: pexels(14887460), ...wiki("Ginger beer", "Ginger_beer") },
    {
      syrup: [L("ginger", "Fresh ginger, unpeeled and thinly sliced", "100 g"), L("sugar", "Sugar", "150 g"), L("water", "Water", "300 ml")],
      glass: [L("lemon", "Lemons, juiced", "2")],
      syrupSteps: ["Put the ginger, sugar and water in a small saucepan and bring to a simmer, stirring until the sugar dissolves.", "Simmer gently for 15 minutes, then take off the heat and leave to steep for 20 minutes.", "Strain the syrup through a sieve into a jug and let it cool completely."],
      after: ["Stir the juice of the two lemons into the cooled syrup."],
      garnish: "Add a lemon wedge or a thin slice of ginger to each glass and serve right away.",
      optional: [SQUEEZER],
    },
  ),
  syrupSoda(
    { id: "ginger-ale", title: "Ginger Ale", diet: [...VEG], taste: ["Spicy", "Sweet", "Refreshing"], description: "The gentler cousin of ginger beer: a lighter, sweeter ginger syrup with a little lemon, golden and crisp.", prep: 10, make: 15, wait: 20, difficulty: "Easy", image: pexels(35532831), ...wiki("Ginger ale", "Ginger_ale") },
    {
      syrup: [L("ginger", "Fresh ginger, peeled and grated", "60 g"), L("sugar", "Sugar", "120 g"), L("water", "Water", "250 ml")],
      glass: [L("lemon", "Lemon, juiced", "1")],
      syrupSteps: ["Heat the ginger, sugar and water in a small saucepan, stirring until the sugar dissolves, then simmer for 10 minutes.", "Leave to steep for 20 minutes, then strain through a fine sieve and cool."],
      after: ["Stir in the lemon juice."],
      garnish: "Serve with a lemon twist.",
      optional: [SQUEEZER],
    },
  ),
  syrupSoda(
    { id: "cola", title: "Homemade Cola", diet: [...VEG], taste: ["Sweet", "Spicy", "Rich"], description: "Citrus zest, cinnamon, nutmeg and vanilla in a brown-sugar syrup: the same spice-and-citrus idea as a cola, amber rather than black.", prep: 15, make: 20, wait: 30, difficulty: "Medium", image: pexels(16404143), ...wiki("Cola", "Cola") },
    {
      syrup: [L("lime", "Limes (zest two in wide strips; keep the third to juice)", "3"), L("orange", "Orange, zest in wide strips", "1"), L("lemon", "Lemon, zest in wide strips", "1"), L("cinnamon-stick", "Cinnamon stick", "1"), L("nutmeg", "Ground nutmeg", "1/4 tsp"), L("coriander-seeds", "Coriander seeds, lightly crushed", "1/2 tsp"), L("brown-sugar", "Dark brown sugar", "200 g"), L("water", "Water", "300 ml")],
      glass: [L("vanilla-extract", "Vanilla extract", "1 tsp")],
      syrupSteps: ["Put the zests, cinnamon, nutmeg, coriander seeds, sugar and water in a saucepan and bring to the boil, stirring until the sugar dissolves.", "Simmer gently for 15 minutes, then leave to steep for 30 minutes.", "Strain the syrup into a jug through a fine sieve and let it cool."],
      after: ["Stir the vanilla and the juice of the third lime into the cooled syrup."],
      garnish: "Serve over plenty of ice with a lime wedge.",
      optional: [SQUEEZER],
    },
  ),
  built(
    { id: "cherry-cola", title: "Cherry Cola", diet: [...VEG], taste: ["Sweet", "Fruity", "Rich"], description: "Cola with a spoonful of cherry syrup stirred in: dark, sweet and a little tart, the way a soda fountain serves it.", prep: 3, make: 1, difficulty: "Easy", image: pexels(6427771), ...wiki("Cherry cola", "Cherry_cola") },
    [L("cola", "Cola, chilled", "200 ml"), L("cherry-syrup", "Cherry syrup", "30 ml"), ICE(), L("lime", "Lime wedge", "1", true)],
    ["Fill a tall glass with ice.", "Pour in the cherry syrup, then the cola, slowly so it doesn't foam over.", "Stir once and add a squeeze of lime if you like."],
  ),
  syrupSoda(
    { id: "root-beer", title: "Root Beer", diet: [...VEG], taste: ["Sweet", "Herbal", "Rich"], description: "Sweet, creamy, a little minty and a little medicinal: root beer made with the extract, sugar and a spoon of molasses, with the foamy head it is known for.", prep: 10, make: 5, wait: 10, difficulty: "Easy", image: pexels(8879621), ...wiki("Root beer", "Root_beer") },
    {
      syrup: [L("sugar", "Sugar", "150 g"), L("molasses", "Molasses", "1 tbsp"), L("water", "Hot water", "250 ml"), L("root-beer-extract", "Root beer extract", "2 tsp"), L("vanilla-extract", "Vanilla extract", "1 tsp")],
      syrupSteps: ["Stir the sugar and molasses into the hot water until completely dissolved.", "Stir in the root beer extract and the vanilla, then let the syrup cool."],
      garnish: "Pour the fizz in last and quickly, for the foamy head root beer should have.",
    },
  ),
  syrupSoda(
    { id: "cream-soda", title: "Cream Soda", diet: [...VEG], taste: ["Sweet", "Creamy", "Rich"], description: "Vanilla and lightly caramelised sugar, with no cream in sight: a sweet, smooth amber soda with a vanilla-toffee taste.", prep: 5, make: 10, wait: 15, difficulty: "Easy", image: pexels(10023035), ...wiki("Cream soda", "Cream_soda") },
    {
      syrup: [L("sugar", "Sugar", "150 g"), L("brown-sugar", "Brown sugar", "50 g"), L("water", "Water", "250 ml"), L("vanilla-extract", "Vanilla extract", "1 tbsp"), L("salt", "Salt", "1/8 tsp")],
      syrupSteps: ["Heat both sugars with the water and the salt, stirring until they dissolve, and simmer for 5 minutes until the syrup turns a pale golden brown.", "Take off the heat, stir in the vanilla and let the syrup cool."],
      garnish: "Serve cold with a straw.",
    },
  ),
  fizzy(
    { id: "lemon-lime-soda", title: "Lemon-Lime Soda", diet: [...VEG], taste: ["Tangy", "Sweet", "Refreshing"], description: "Lemon and lime juice with sugar syrup and fizz: clean, bright and the lightest of the fruit sodas.", prep: 5, make: 2, difficulty: "Easy", image: pexels(13061331), ...wiki("Lemon-lime drink", "Lemon-lime_drink") },
    [L("lemon", "Lemon, juiced", "1/2"), L("lime", "Lime, juiced", "1/2"), SYRUP(2), FIZZ(200), ICE()],
    ["Fill a tall glass with ice.", "Add the lemon juice, lime juice and sugar syrup and stir.", "Top up with the sparkling water, pouring slowly down the side of the glass.", "Garnish with a lemon wheel and a lime wheel."],
    [SQUEEZER],
  ),
  syrupSoda(
    { id: "orange-soda", title: "Orange Soda", diet: [...VEG], taste: ["Sweet", "Fruity", "Refreshing"], description: "Orange juice reduced with zest to a bright, concentrated syrup, then topped with fizz: far fruitier than the bottled kind.", prep: 10, make: 15, wait: 15, difficulty: "Easy", image: pexels(36951470), ...wiki("Orange soda", "Orange_soda") },
    {
      syrup: [L("orange-juice", "Orange juice", "400 ml"), L("orange", "Orange, zest in wide strips", "1"), L("sugar", "Sugar", "80 g")],
      glass: [L("lemon", "Lemon, juiced", "1/2")],
      syrupSteps: ["Simmer the orange juice, zest and sugar in a saucepan for 12 to 15 minutes, until reduced to about 250 ml and a little syrupy.", "Strain out the zest and let the syrup cool."],
      after: ["Stir in the lemon juice to sharpen the flavour."],
      garnish: "Garnish each glass with an orange wheel.",
      optional: [SQUEEZER],
    },
  ),
  syrupSoda(
    { id: "grape-soda", title: "Grape Soda", diet: [...VEG], taste: ["Sweet", "Fruity", "Refreshing"], description: "Concord-style grape juice boiled down into a deep purple syrup with a squeeze of lemon, then fizzed up.", prep: 5, make: 20, wait: 15, difficulty: "Easy", image: pexels(12987520), ...wiki("Grape soda", "Grape_soda") },
    {
      syrup: [L("grape-juice", "Red or purple grape juice", "500 ml"), L("sugar", "Sugar", "60 g")],
      glass: [L("lemon", "Lemon, juiced", "1/2")],
      syrupSteps: ["Simmer the grape juice with the sugar for about 20 minutes, until reduced to roughly 250 ml.", "Let the syrup cool."],
      after: ["Stir in the lemon juice."],
      garnish: "Serve with a few frozen grapes in the glass, if you have them.",
      optional: [SQUEEZER],
    },
  ),
  syrupSoda(
    { id: "strawberry-soda", title: "Strawberry Soda", diet: [...VEG], taste: ["Fruity", "Sweet", "Refreshing"], description: "Strawberries cooked down to a bright red syrup with lemon, then topped with sparkling water.", prep: 10, make: 15, wait: 15, difficulty: "Easy", image: pexels(102444) },
    {
      syrup: [L("strawberry", "Strawberries, hulled and halved", "300 g"), L("sugar", "Sugar", "120 g"), L("water", "Water", "120 ml"), L("lemon", "Lemon juice", "1 tbsp")],
      syrupSteps: ["Put the strawberries, sugar, water and lemon juice in a saucepan and simmer for 10 minutes, until the fruit has collapsed.", "Mash lightly, strain through a sieve without pushing too hard (you want a clear syrup), and let it cool."],
      garnish: "Garnish each glass with a halved strawberry.",
    },
  ),
  syrupSoda(
    { id: "raspberry-soda", title: "Raspberry Soda", diet: [...VEG], taste: ["Fruity", "Tangy", "Refreshing"], description: "A tart, ruby raspberry syrup with a little lemon, topped with fizz.", prep: 10, make: 10, wait: 15, difficulty: "Easy", image: pexels(16261531) },
    {
      syrup: [L("raspberries", "Raspberries, fresh or frozen", "250 g"), L("sugar", "Sugar", "120 g"), L("water", "Water", "120 ml"), L("lemon", "Lemon juice", "1 tbsp")],
      syrupSteps: ["Simmer the raspberries, sugar, water and lemon juice for 8 minutes, until the fruit has broken down.", "Strain through a fine sieve to remove the seeds, pressing gently, and let the syrup cool."],
      garnish: "Drop a few whole raspberries into each glass.",
    },
  ),
  syrupSoda(
    { id: "black-cherry-soda", title: "Black Cherry Soda", diet: [...VEG], taste: ["Fruity", "Sweet", "Rich"], description: "Dark cherries simmered with sugar and a drop of vanilla: deep, jammy and a classic soda-fountain flavour.", prep: 15, make: 15, wait: 15, difficulty: "Easy", image: pexels(8093472), ...wiki("Cherry soda", "Cherry_soda") },
    {
      syrup: [L("cherries", "Dark cherries, pitted", "300 g"), L("sugar", "Sugar", "120 g"), L("water", "Water", "120 ml"), L("vanilla-extract", "Vanilla extract", "1/2 tsp")],
      syrupSteps: ["Simmer the cherries with the sugar and water for 12 minutes, until the fruit is soft and the syrup is dark red.", "Mash lightly, strain through a sieve, stir in the vanilla and let the syrup cool."],
      garnish: "Add a cherry to each glass.",
    },
  ),
  fizzy(
    { id: "lime-rickey", title: "Lime Rickey", diet: [...VEG], taste: ["Tangy", "Refreshing", "Sweet"], description: "The old Washington classic: lots of fresh lime juice, a little sugar syrup and sparkling water, with the squeezed lime left in the glass.", prep: 4, make: 1, difficulty: "Easy", image: pexels(28559550), ...wiki("Lime rickey", "Lime_rickey") },
    [L("lime", "Limes, juiced", "2"), SYRUP(1), FIZZ(250), ICE()],
    ["Fill a tall glass with ice.", "Squeeze in the juice of the limes, saving one of the squeezed halves.", "Stir in the sugar syrup, then top with the sparkling water, pouring slowly.", "Drop the squeezed lime half into the glass and serve."],
    [SQUEEZER],
  ),
  syrupSoda(
    { id: "sarsaparilla", title: "Sarsaparilla", diet: [...VEG], taste: ["Herbal", "Rich", "Sweet"], description: "Dried sarsaparilla root simmered with star anise, cinnamon and brown sugar: dark, earthy and sweet, a cousin of root beer from the old west.", prep: 10, make: 30, wait: 30, difficulty: "Medium", image: pexels(37211777), ...wiki("Sarsaparilla (soft drink)", "Sarsaparilla_(soft_drink)") },
    {
      syrup: [L("sarsaparilla-root", "Dried sarsaparilla root", "30 g"), L("star-anise", "Star anise", "2"), L("cinnamon-stick", "Cinnamon stick", "1"), L("brown-sugar", "Brown sugar", "180 g"), L("molasses", "Molasses", "1 tbsp"), L("water", "Water", "500 ml")],
      glass: [L("vanilla-extract", "Vanilla extract", "1 tsp")],
      syrupSteps: ["Simmer the sarsaparilla root, star anise, cinnamon, sugar, molasses and water for 25 minutes, until reduced to about 300 ml.", "Leave to steep for 30 minutes, then strain through a fine sieve and let the syrup cool."],
      after: ["Stir in the vanilla."],
      garnish: "Serve very cold, in a tall glass.",
    },
  ),
];
