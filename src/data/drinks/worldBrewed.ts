import type { Recipe, RecipeIngredient } from "@/types";
import { dripMethods, drink, milkSteps, pexels, strongCoffeeIngredients, strongCoffeeMethods, type DrinkFacts, type StrongCoffeeSpec } from "./builders";

/** Hot brewed coffees — the brewing methods themselves, and a few classic mixed cups. */

const espresso = (facts: DrinkFacts, spec: StrongCoffeeSpec): Recipe => drink(facts, strongCoffeeIngredients(spec), strongCoffeeMethods(spec));
const WARM_CUP = "Warm your cup with hot water, then tip it out.";
const milk = (ml: number, label = "Whole milk"): RecipeIngredient => ({ pantryId: "milk", label, amount: `${ml} ml` });

export const worldBrewed: Recipe[] = [
  drink(
    {
      id: "vietnamese-egg-coffee", title: "Vietnamese Egg Coffee (Cà Phê Trứng)", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Rich"],
      description: "Hanoi's dessert coffee: strong phin-dripped coffee under a thick, custardy cap of egg yolk whisked with sugar and condensed milk.",
      prep: 8, make: 6, difficulty: "Medium", image: pexels(32871412),
      sourceName: "Wikipedia — Egg coffee", sourceUrl: "https://en.wikipedia.org/wiki/Egg_coffee",
      notes: "Invented in Hanoi in the 1940s when milk was scarce. Serve it in a small bowl of hot water to keep the cup warm. Whisk the yolk until pale and billowing — a hand frother or electric whisk makes it easy.",
    },
    [
      { pantryId: "ground-coffee", label: "Dark-roast ground coffee, medium-coarse", amount: "20 g" },
      { pantryId: "water", label: "Hot water, just off the boil", amount: "70 ml" },
      { pantryId: "eggs", label: "Egg yolk, very fresh", amount: "1" },
      { pantryId: "sweetened-condensed-milk", label: "Sweetened condensed milk", amount: "30 ml" },
      { pantryId: "sugar", label: "Sugar", amount: "1 tsp" },
    ],
    dripMethods({
      coffeeG: 20, waterMl: 70, byHandWaterMl: 90, coffeeLabel: "Dark-roast ground coffee, medium-coarse",
      lines: [
        { pantryId: "eggs", label: "Egg yolk, very fresh", amount: "1" },
        { pantryId: "sweetened-condensed-milk", label: "Sweetened condensed milk", amount: "30 ml" },
        { pantryId: "sugar", label: "Sugar", amount: "1 tsp" },
      ],
      before: ["Whisk the egg yolk with the sugar and condensed milk for 4–5 minutes, until pale, thick and doubled in volume — a hand frother or electric whisk is quickest, but a fork and patience work."],
      into: "into a small cup",
      after: ["Spoon the whisked egg cream over the coffee until it forms a thick cap, about 2 cm deep.", "Serve immediately, and stir gently as you sip."],
      optional: [{ tag: "Milk Frother", without: "Whisk the yolk with a balloon whisk or a fork for 5–6 minutes until pale and doubled in volume." }],
    })
  ),
  drink(
    {
      id: "moka-pot-coffee", title: "Moka Pot Coffee", type: "Coffee", temperature: "hot", diet: ["Vegan", "Dairy-Free", "Low Sugar", "Gluten-Free"], taste: ["Bitter", "Rich"],
      description: "The stovetop pot every Italian kitchen owns: pressure from steam pushes hot water up through the grounds for a strong, espresso-style cup.",
      prep: 3, make: 6, difficulty: "Easy", image: pexels(714563),
      notes: "Start with hot water in the base so the grounds don't cook while the pot heats up. Take it off the heat as soon as it begins to sputter, and run the base under cold water to stop the bitter last drops.",
    },
    [
      { pantryId: "ground-coffee", label: "Medium-fine ground coffee, levelled", amount: "15 g" },
      { pantryId: "water", label: "Hot water, up to the valve", amount: "130 ml" },
    ],
    [
      {
        id: "moka-pot", label: "Moka pot", equipment: ["Moka Pot"],
        steps: ["Fill the base with hot water to just below the safety valve, and the basket with the coffee — levelled, never tamped.", "Screw the top on tight and set the pot on medium-low heat with the lid open.", "When the coffee starts to flow, watch for it to turn pale and gurgle, then take the pot off the heat at once and run the base under a cold tap for a second.", "Stir the coffee in the top chamber and pour. Drink as it is, or add hot water for a long cup."],
      },
    ]
  ),
  drink(
    {
      id: "french-press-coffee", title: "French Press Coffee", type: "Coffee", temperature: "hot", diet: ["Vegan", "Dairy-Free", "Low Sugar", "Gluten-Free"], taste: ["Rich", "Bitter"],
      description: "Coarse coffee steeped in hot water and pressed — a full-bodied, slightly silty cup with all the oils left in.",
      prep: 3, make: 5, difficulty: "Easy", servings: 2, image: pexels(2748538),
      notes: "About 1:16 coffee to water by weight, steeped four minutes. Pour it all out as soon as you have pressed, or it keeps extracting and turns bitter.",
    },
    [
      { pantryId: "ground-coffee", label: "Coarsely ground coffee", amount: "30 g" },
      { pantryId: "water", label: "Hot water, just off the boil", amount: "500 ml" },
    ],
    [
      {
        id: "french-press", label: "French press", equipment: ["French Press"],
        steps: ["Warm the press with a splash of hot water and tip it out. Add the coffee and pour in the hot water, wetting all the grounds.", "Stir once, put the lid on with the plunger up, and leave it for 4 minutes.", "Press the plunger down slowly and evenly, then pour all the coffee out straight away into cups."],
      },
      {
        id: "by-hand", label: "By hand", equipment: [], handTools: ["Heatproof jug or pan", "Spoon", "Fine sieve"],
        steps: ["Put the coffee in a heatproof jug and pour in the hot water. Stir, cover and leave for 4 minutes.", "Skim off the crust with a spoon and let the grounds settle for a minute.", "Pour slowly through a fine sieve into cups."],
        notes: "Same steeping logic as the press, with the sieve doing the plunger's job.",
      },
    ]
  ),
  drink(
    {
      id: "pour-over-coffee", title: "Pour-Over Coffee", type: "Coffee", temperature: "hot", diet: ["Vegan", "Dairy-Free", "Low Sugar", "Gluten-Free"], taste: ["Bitter", "Refreshing"],
      description: "Hot water poured in slow circles over medium-ground coffee in a paper filter, giving a clean, bright cup.",
      prep: 3, make: 4, difficulty: "Medium", image: pexels(2616164),
      notes: "A common starting point is 20 g of coffee to 320 ml of water, water just off the boil, about three minutes in total. Finer coffee runs slower and tastes stronger.",
    },
    [
      { pantryId: "ground-coffee", label: "Medium-fine ground coffee", amount: "20 g" },
      { pantryId: "water", label: "Water, just off the boil", amount: "320 ml" },
    ],
    [
      {
        id: "pour-over", label: "Pour-over dripper", equipment: ["Pour-Over Dripper"],
        optionalEquipment: [{ tag: "Electric Kettle", without: "Use a pan, then pour the water into a jug with a spout to control the pour." }],
        steps: ["Set a paper filter in the dripper over your cup or jug and rinse it with hot water, then tip the rinse water out.", "Add the coffee and level it. Pour 40 ml of water over the grounds, wetting them evenly, and wait 30–40 seconds for the coffee to bloom.", "Pour the rest of the water in slow circles in three or four pours, keeping the water level steady, until you reach 320 ml.", "Let it drip through — about 3 minutes in all — then remove the dripper and enjoy."],
      },
      {
        id: "by-hand", label: "By hand", equipment: [], handTools: ["Heatproof jug", "Fine sieve", "Paper filter or clean cloth"],
        steps: ["Put the coffee in a jug, pour in the water, stir and leave it for 4 minutes.", "Line a sieve with a paper filter or a clean cloth and set it over your cup.", "Pour the coffee through slowly and let it drip out before you drink."],
        notes: "Steeping then filtering gets a little closer to a pour-over cup than a plain mug steep.",
      },
    ]
  ),
  drink(
    {
      id: "drip-coffee", title: "Drip Coffee", type: "Coffee", temperature: "hot", diet: ["Vegan", "Dairy-Free", "Low Sugar", "Gluten-Free"], taste: ["Bitter", "Rich"],
      description: "The everyday filter pot: medium-ground coffee brewed through a paper filter by a drip machine, enough for the whole table.",
      prep: 3, make: 6, difficulty: "Easy", servings: 3, image: pexels(17598134),
      notes: "A good ratio is two level tablespoons (about 10 g) of coffee to each 180 ml cup — adjust by taste.",
    },
    [
      { pantryId: "ground-coffee", label: "Medium ground coffee", amount: "30 g" },
      { pantryId: "water", label: "Cold water", amount: "540 ml" },
    ],
    [
      {
        id: "drip-machine", label: "Drip coffee maker", equipment: ["Drip Coffee Maker"],
        steps: ["Put a paper filter in the basket, add the coffee, and pour the cold water into the reservoir.", "Switch the machine on and let it brew through.", "Serve straight away, or move it to a thermos so it doesn't stew on the hot plate."],
      },
      {
        id: "by-hand", label: "By hand", equipment: [], handTools: ["Heatproof jug", "Fine sieve", "Paper filter or clean cloth"],
        steps: ["Heat the water until just off the boil and pour it over the coffee in a heatproof jug. Stir and leave it for 4 minutes.", "Strain through a sieve lined with a paper filter or clean cloth.", "Pour into cups and serve."],
      },
    ]
  ),
  espresso(
    {
      id: "cafe-au-lait", title: "Café au Lait", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Creamy", "Bitter"],
      description: "France's breakfast coffee: strong coffee and hot milk poured together in equal parts, traditionally sipped from a wide bowl.",
      prep: 3, make: 4, difficulty: "Easy", image: pexels(26755324),
      notes: "Unlike a latte, the milk isn't foamed: it is simply hot, and the coffee is brewed strong rather than as espresso.",
    },
    { size: "double", lines: [milk(120)], into: "into a wide cup or bowl", before: [WARM_CUP], after: (k) => [...milkSteps({ ml: 120, froth: "none" })(k), "Pour the hot milk into the cup in a steady stream alongside the coffee until the cup is full."], handTools: ["Saucepan"] }
  ),
  espresso(
    {
      id: "white-coffee-ipoh", title: "Ipoh White Coffee", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy"],
      description: "Malaysia's mellow white coffee: lightly roasted beans brewed through a cloth and finished with sweet condensed milk — smooth and low on bitterness.",
      prep: 3, make: 5, difficulty: "Easy", image: pexels(27294595),
      sourceName: "Wikipedia — White coffee", sourceUrl: "https://en.wikipedia.org/wiki/White_coffee",
      notes: "Ipoh white coffee is named for the pale colour of the roast and the milk — not for the drink being mostly milk. Look for a light-roast 'white coffee' blend if you can.",
    },
    { size: "double", lines: [{ pantryId: "sweetened-condensed-milk", label: "Sweetened condensed milk", amount: "30 ml" }], extraWaterMl: 100, into: "into a cup", before: [WARM_CUP, "Put the condensed milk in the bottom of the cup."], after: ["Stir the coffee into the condensed milk until blended and serve hot."] }
  ),
  espresso(
    {
      id: "red-eye", title: "Red Eye", type: "Coffee", temperature: "hot", diet: ["Vegan", "Dairy-Free", "Low Sugar", "Gluten-Free"], taste: ["Bitter", "Rich"],
      description: "A cup of drip coffee with an espresso shot dropped in — a stronger, more caffeinated mug for early starts.",
      prep: 5, make: 5, difficulty: "Easy", image: pexels(11677124),
      notes: "Add another shot and it becomes a 'black eye'. There is no milk in a classic red eye.",
    },
    {
      size: "single",
      lines: [{ pantryId: "ground-coffee", label: "Medium ground coffee, for the drip", amount: "15 g" }, { pantryId: "water", label: "Hot water, for the drip coffee", amount: "250 ml" }],
      into: "into a small cup",
      before: ["Brew about 240 ml of drip coffee: stir 15 g of medium ground coffee into 250 ml of just-boiled water, steep for 4 minutes and strain (or brew it in a drip machine or French press) into a large mug."],
      after: ["Pour the coffee into the mug of drip coffee and stir. Drink hot."],
      handTools: ["Large mug", "Fine sieve"],
    }
  ),
  espresso(
    {
      id: "bicerin", title: "Bicerin", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Rich", "Sweet", "Creamy"],
      description: "Turin's layered classic: drinking chocolate, espresso and cream in a small glass, served without stirring so each sip is a little different.",
      prep: 6, make: 4, difficulty: "Medium", image: pexels(22089040),
      sourceName: "Wikipedia — Bicerin", sourceUrl: "https://en.wikipedia.org/wiki/Bicerin",
      notes: "Bicerin has been served at Caffè al Bicerin in Turin since the 1700s. Don't stir it: drink it as it comes.",
    },
    {
      size: "single",
      lines: [{ pantryId: "dark-chocolate", label: "Dark chocolate, chopped", amount: "30 g" }, milk(100), { pantryId: "heavy-cream", label: "Heavy cream, lightly whipped", amount: "40 ml" }],
      into: "into a small cup",
      before: ["Melt the chocolate with the milk in a small pan over low heat, stirring until smooth and just steaming. Pour it into a small glass, filling it by about a third.", "Whisk the cream until it thickens slightly but still pours."],
      after: ["Pour the coffee slowly over the back of a spoon onto the chocolate so it forms a layer.", "Spoon the cream on top in a third layer, without stirring, and serve."],
      handTools: ["Small pan", "Whisk or fork", "Small glass"],
    }
  ),
];
