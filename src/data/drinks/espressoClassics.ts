import type { Recipe } from "@/types";
import { MILK_FROTHER_TIP, drink, milkSteps, pexels, strongCoffeeIngredients, strongCoffeeMethods, unsplash, type DrinkFacts, type StrongCoffeeSpec } from "./builders";

/**
 * The classic espresso drinks. Proportions follow the standard café definitions (a double shot is 18 g of coffee into
 * about 40 ml; milk drinks are built on a double unless they are traditionally a single).
 */

const espresso = (facts: DrinkFacts, spec: StrongCoffeeSpec): Recipe => drink(facts, strongCoffeeIngredients(spec), strongCoffeeMethods(spec));

const WARM_CUP = "Warm your cup with hot water, then tip it out.";
const milk = (ml: number) => ({ pantryId: "milk", label: "Cold whole milk", amount: `${ml} ml` });

export const espressoClassics: Recipe[] = [
  espresso(
    {
      id: "espresso", title: "Espresso", type: "Coffee", temperature: "hot", diet: ["Vegan", "Dairy-Free", "Low Sugar", "Gluten-Free"], taste: ["Bitter", "Rich"],
      description: "A single, concentrated shot with a hazelnut crema — small, intense and gone in three sips.",
      prep: 2, make: 1, difficulty: "Medium", image: pexels(11160148),
      notes: "True espresso needs the pressure of an espresso machine. The moka pot and AeroPress give a very strong coffee that is the closest you can get without one, but without the crema.",
    },
    { size: "single", lines: [], into: "straight into the cup", before: [WARM_CUP], after: ["Look for a thick, hazelnut-brown crema on top. Drink it right away, in two or three sips, before the crema fades."], byHand: false }
  ),
  espresso(
    {
      id: "doppio", title: "Doppio", type: "Coffee", temperature: "hot", diet: ["Vegan", "Dairy-Free", "Low Sugar", "Gluten-Free"], taste: ["Bitter", "Rich"],
      description: "A double espresso — twice the coffee in the same small cup. This is the base most café drinks are built on.",
      prep: 2, make: 1, difficulty: "Medium", image: pexels(12975714),
    },
    { size: "double", lines: [], into: "straight into the cup", before: [WARM_CUP], after: ["Drink it right away while the crema is still thick."], byHand: false }
  ),
  {
    ...drink(
      {
        id: "ristretto", title: "Ristretto", type: "Coffee", temperature: "hot", diet: ["Vegan", "Dairy-Free", "Low Sugar", "Gluten-Free"], taste: ["Bitter", "Rich"],
        description: "A 'restricted' shot, pulled short: the same coffee in half the water, so it tastes sweeter, thicker and less bitter than a regular espresso.",
        prep: 2, make: 1, difficulty: "Advanced", image: pexels(19257831),
        notes: "Ristretto is a technique more than a recipe: grind a little finer and stop the shot early. Expect to adjust the grind over a few tries.",
      },
      [
        { pantryId: "ground-coffee", label: "Finely ground coffee, a touch finer than for espresso", amount: "18 g" },
        { pantryId: "water", label: "Water, through the machine", amount: "20 ml" },
      ],
      [
        {
          id: "espresso-machine", label: "Espresso machine", equipment: ["Espresso Machine"],
          steps: [WARM_CUP, "Grind the coffee slightly finer than for a normal espresso and pack 18 g into the portafilter.", "Start the shot and stop it at about 15–20 seconds, once you have roughly 20 ml in the cup — about half a normal shot's volume.", "Sip it right away; it is sweet and syrupy, with the bitterness turned down."],
        },
        {
          id: "moka-pot", label: "Moka pot", equipment: ["Moka Pot"],
          ingredients: [
            { pantryId: "ground-coffee", label: "Fine ground coffee", amount: "15 g" },
            { pantryId: "water", label: "Hot water, for a small moka pot", amount: "60 ml" },
          ],
          steps: [WARM_CUP, "Put 60 ml of hot water in the base of a small moka pot (a 1–2 cup pot is best) and fill the basket with 15 g of fine coffee, levelled.", "Set it on medium heat with the lid open and take it off the moment the first coffee starts to flow, then catch it quickly in the cup.", "Drink right away — a concentrated, syrupy shot, though without a machine's crema."],
        },
      ]
    ),
  },
  {
    ...drink(
      {
        id: "lungo", title: "Lungo", type: "Coffee", temperature: "hot", diet: ["Vegan", "Dairy-Free", "Low Sugar", "Gluten-Free"], taste: ["Bitter"],
        description: "A 'long' espresso: the same coffee with about twice the water run through it, giving a larger, lighter, more bitter cup.",
        prep: 2, make: 2, difficulty: "Medium", image: pexels(16523911),
      },
      [
        { pantryId: "ground-coffee", label: "Finely ground coffee, espresso grind", amount: "9 g" },
        { pantryId: "water", label: "Water, through the machine", amount: "60 ml" },
      ],
      [
        { id: "espresso-machine", label: "Espresso machine", equipment: ["Espresso Machine"], steps: [WARM_CUP, "Pack 9 g of finely ground coffee into the portafilter.", "Run the shot for about 40–45 seconds, until you have around 60 ml in the cup — about double a normal single shot.", "Taste it as it is; a lungo is meant to be more bitter and less intense than espresso."] },
        {
          id: "aeropress", label: "AeroPress", equipment: ["AeroPress"],
          ingredients: [
            { pantryId: "ground-coffee", label: "Fine ground coffee", amount: "12 g" },
            { pantryId: "water", label: "Hot water, about 85°C", amount: "100 ml" },
          ],
          steps: [WARM_CUP, "Add a filter and 12 g of fine coffee to the AeroPress, set it on the cup and pour in 100 ml of hot water (about 85°C).", "Stir for 10 seconds and press down slowly for about 40 seconds.", "Drink it as it is — long, smooth and a little bitter."],
        },
      ]
    ),
  },
  espresso(
    {
      id: "americano", title: "Americano", type: "Coffee", temperature: "hot", diet: ["Vegan", "Dairy-Free", "Low Sugar", "Gluten-Free"], taste: ["Bitter"],
      description: "Espresso topped up with hot water — the long, smooth black coffee that tastes like filter coffee but with an espresso's depth.",
      prep: 2, make: 2, difficulty: "Easy", image: pexels(31964023),
      notes: "Add the water after the shot. If you pour the shot onto the water instead you have a long black, which keeps the crema.",
    },
    { size: "double", extraWaterMl: 150, lines: [], into: "into the cup", before: [WARM_CUP], after: ["Top up with 150 ml of just-boiled water, added to the shot. Stir once and drink as it is, or add milk or sugar to taste."], byHandNote: "Strong instant coffee gives you a quick, no-equipment americano." }
  ),
  espresso(
    {
      id: "long-black", title: "Long Black", type: "Coffee", temperature: "hot", diet: ["Vegan", "Dairy-Free", "Low Sugar", "Gluten-Free"], taste: ["Bitter", "Rich"],
      description: "A double shot poured over hot water, so the crema stays whole on top — bolder and more aromatic than an americano.",
      prep: 2, make: 2, difficulty: "Medium", image: pexels(4195604),
      notes: "The only difference from an americano is the order: the water goes in first and the shot is poured on top.",
    },
    { size: "double", extraWaterMl: 120, lines: [], into: "gently on top of the water", before: ["Pour 120 ml of just-boiled water into a warmed cup, filling it about two-thirds."], after: ["Look for the crema floating on top, undisturbed. Drink without stirring, so you get the crema first."], byHand: false }
  ),
  espresso(
    {
      id: "espresso-macchiato", title: "Espresso Macchiato", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Bitter", "Creamy"],
      description: "A single espresso 'marked' with a spoonful of milk foam — almost all coffee, with just enough milk to soften the edge.",
      prep: 3, make: 2, difficulty: "Medium", image: pexels(10187350),
    },
    { size: "single", lines: [milk(40)], into: "into a warmed cup", before: [WARM_CUP], after: (k) => [...milkSteps({ ml: 40, froth: "dense" })(k), "Spoon one or two teaspoons of the thick foam onto the centre of the coffee.", "Drink it right away, in three or four sips."], optional: [MILK_FROTHER_TIP], handTools: ["Saucepan"] }
  ),
  espresso(
    {
      id: "latte-macchiato", title: "Latte Macchiato", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Creamy"],
      description: "Steamed milk 'stained' with a shot of espresso — the order is reversed from a latte, so you get three distinct layers: milk, coffee, foam.",
      prep: 4, make: 3, difficulty: "Advanced", image: pexels(6763217),
      notes: "Let the glass stand for a minute after pouring the coffee so the layers settle. Pour slowly and don't stir.",
    },
    { size: "single", lines: [milk(220)], into: "into a small jug", before: (k) => [...milkSteps({ ml: 220, froth: "dense" })(k), "Pour the hot milk into a tall glass, holding the foam back with a spoon, then spoon the foam on top. Let it rest for a minute so the foam sets."], after: ["Pour the coffee in slowly through the foam, aiming for the middle of the glass, so it sinks and settles between the milk and the foam.", "Don't stir — drink it with a long spoon so you taste the layers."], optional: [MILK_FROTHER_TIP], handTools: ["Saucepan", "Tall glass"] }
  ),
  espresso(
    {
      id: "cortado", title: "Cortado", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Bitter", "Creamy"],
      description: "Espresso 'cut' with an equal amount of warm milk. Smooth and strong, with no foam to speak of.",
      prep: 3, make: 2, difficulty: "Medium", image: pexels(30556590),
    },
    { size: "double", lines: [milk(60)], into: "into a small glass", before: (k) => [...milkSteps({ ml: 60, froth: "none" })(k)], after: ["Pour in the warm milk, so there is roughly as much milk as coffee. Add a little foam on top only if you like.", "Serve in a small glass and drink while hot."], optional: [MILK_FROTHER_TIP], handTools: ["Small glass"] }
  ),
  espresso(
    {
      id: "flat-white", title: "Flat White", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Creamy", "Bitter"],
      description: "Strong espresso under a thin layer of glossy, velvety milk. Smaller and stronger than a latte, with almost no foam.",
      prep: 4, make: 3, difficulty: "Advanced", image: pexels(34452164),
      notes: "The signature is 'microfoam': milk heated while it is stretched just a little, so it is silky rather than frothy. A flat white is served in a small cup, about 160–180 ml.",
    },
    { size: "double", lines: [milk(130)], into: "into a warmed cup", before: [WARM_CUP], after: (k) => [...milkSteps({ ml: 130, froth: "thin" })(k), "Pour the milk into the coffee in a steady stream from a low height, finishing with a thin layer of fine foam on top."], optional: [MILK_FROTHER_TIP], handTools: ["Saucepan"] }
  ),
  espresso(
    {
      id: "cafe-latte", title: "Café Latte", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Creamy"],
      description: "A shot of espresso in a tall glass or cup of steamed milk, finished with a thin cap of foam — the mellow everyday café drink.",
      prep: 4, make: 3, difficulty: "Medium", image: pexels(35549066),
    },
    { size: "double", lines: [milk(200)], into: "into a large warmed cup or glass", before: [WARM_CUP], after: (k) => [...milkSteps({ ml: 200, froth: "thin" })(k), "Pour the milk over the coffee, holding the foam back at first and then letting a thin layer sit on top."], optional: [MILK_FROTHER_TIP], handTools: ["Saucepan"] }
  ),
  espresso(
    {
      id: "cafe-mocha", title: "Café Mocha", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Rich"],
      description: "Espresso, chocolate and steamed milk — a latte with a chocolate heart, topped with whipped cream.",
      prep: 5, make: 3, difficulty: "Medium", image: pexels(9823577),
    },
    {
      size: "double",
      lines: [
        { pantryId: "chocolate-syrup", label: "Chocolate syrup", amount: "30 ml" },
        milk(180),
        { pantryId: "heavy-cream", label: "Whipped cream, to top", amount: "30 ml", optional: true },
      ],
      into: "onto the chocolate syrup in the mug",
      before: ["Spoon 30 ml of chocolate syrup into the bottom of a large mug."],
      after: (k) => ["Stir the coffee into the syrup until the chocolate has melted into it.", ...milkSteps({ ml: 180, froth: "thin" })(k), "Pour in the milk, holding the foam back, then spoon the foam on top.", "Top with a swirl of whipped cream if you like."],
      optional: [MILK_FROTHER_TIP], handTools: ["Saucepan", "Mug"],
    }
  ),
  espresso(
    {
      id: "caramel-macchiato", title: "Caramel Macchiato", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy"],
      description: "Vanilla-sweetened steamed milk marked with espresso and a lattice of caramel — built upside down, so the coffee lands on top.",
      prep: 5, make: 3, difficulty: "Medium", image: pexels(5112646),
      notes: "The name means 'marked' or 'stained': the espresso is poured last, through the foam, and the caramel goes on top.",
    },
    {
      size: "double",
      lines: [
        { pantryId: "vanilla-syrup", label: "Vanilla syrup", amount: "20 ml" },
        milk(200),
        { pantryId: "caramel-sauce", label: "Caramel sauce, to drizzle", amount: "15 ml" },
      ],
      into: "into a small jug",
      before: (k) => ["Pour 20 ml of vanilla syrup into the bottom of a tall glass or mug.", ...milkSteps({ ml: 200, froth: "dense" })(k), "Pour the hot milk over the syrup, holding the foam back, then spoon the foam on top and let it rest for 30 seconds."],
      after: ["Pour the coffee slowly through the foam so it marks the top and drips down in a spiral.", "Drizzle 15 ml of caramel sauce over the foam in a criss-cross pattern."],
      optional: [MILK_FROTHER_TIP], handTools: ["Saucepan", "Tall glass"],
    }
  ),
  espresso(
    {
      id: "espresso-con-panna", title: "Espresso con Panna", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Bitter", "Creamy"],
      description: "'Espresso with cream': a hot shot topped with a soft cloud of lightly sweetened whipped cream that melts as you drink.",
      prep: 5, make: 1, difficulty: "Easy", image: pexels(20066400),
      sourceName: "Dolce Gusto — Espresso con panna", sourceUrl: "https://www.dolce-gusto.co.uk/recipes/espresso-con-panna-recipe",
      notes: "Whip the cream only to soft peaks. Too stiff and it won't melt into the coffee.",
    },
    {
      size: "double",
      lines: [
        { pantryId: "heavy-cream", label: "Heavy cream, to whip", amount: "40 ml" },
        { pantryId: "sugar", label: "Sugar, to sweeten the cream", amount: "1 tsp", optional: true },
      ],
      into: "into a small cup",
      before: ["Whip the cream with the sugar (if using) in a small bowl, with a whisk or in a lidded jar shaken hard, until it just holds soft peaks."],
      after: ["Spoon a generous dollop of the whipped cream on top of the hot coffee.", "Sip through the cream for a stronger coffee taste, or stir it in for a creamier cup."],
      handTools: ["Small bowl", "Whisk or lidded jar"],
    }
  ),
  espresso(
    {
      id: "marocchino", title: "Marocchino", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Bitter", "Creamy", "Sweet"],
      description: "A tiny layered coffee from northern Italy: cocoa, espresso and a cap of milk foam in a small glass, dusted with more cocoa.",
      prep: 4, make: 2, difficulty: "Medium", image: pexels(15800393),
      sourceName: "Wikipedia — Marocchino", sourceUrl: "https://en.wikipedia.org/wiki/Marocchino",
    },
    {
      size: "single",
      lines: [{ pantryId: "cocoa-powder", label: "Cocoa powder", amount: "1 tsp" }, milk(40)],
      into: "onto the cocoa in a small glass",
      before: ["Dust the inside of a small glass (about 60–100 ml) with half the cocoa."],
      after: (k) => ["Sprinkle a thin layer of cocoa over the coffee.", ...milkSteps({ ml: 40, froth: "dense" })(k), "Spoon the foam on top to fill the glass, finish with the last of the cocoa, and stir before drinking."],
      optional: [MILK_FROTHER_TIP], handTools: ["Saucepan", "Small glass"],
    }
  ),
  espresso(
    {
      id: "cafe-breve", title: "Café Breve", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Creamy", "Rich"],
      description: "An American twist on a latte made with steamed half-and-half instead of milk — thick, rich and naturally sweet.",
      prep: 4, make: 3, difficulty: "Medium", image: unsplash("1602320574582-741740d4fcd7"),
      sourceName: "Brew Coffee Home — Breve coffee", sourceUrl: "https://www.brewcoffeehome.com/wprm_print/breve-coffee-recipe-breve-latte",
      notes: "Because half-and-half is so rich, keep the ratio at about 1:1 espresso to half-and-half, and taste before adding sugar.",
    },
    {
      size: "double",
      lines: [{ pantryId: "half-and-half", label: "Half-and-half", amount: "120 ml" }],
      into: "into a warmed cup",
      before: [WARM_CUP],
      after: (k) => [...milkSteps({ ml: 120, froth: "thin" })(k).map((s) => s.replace("milk", "half-and-half")), "Hold back the foam with a spoon while you pour the warm half-and-half into the coffee, then spoon the foam on top."],
      optional: [MILK_FROTHER_TIP], handTools: ["Saucepan"],
    }
  ),
  espresso(
    {
      id: "cafe-con-leche", title: "Café con Leche", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Creamy"],
      description: "Spain's everyday coffee: a strong shot mixed with about an equal amount of hot, gently scalded milk, with sugar if you like.",
      prep: 3, make: 3, difficulty: "Easy", image: pexels(4195609),
      sourceName: "Café Bustelo — Café con leche", sourceUrl: "https://www.cafebustelo.com/en/coffee/recipes/cafe-con-leche",
    },
    {
      size: "double",
      lines: [milk(120), { pantryId: "sugar", label: "Sugar, to taste", amount: "1 tsp", optional: true }],
      into: "into a large cup",
      before: [WARM_CUP],
      after: ["Heat the milk in a saucepan until it just steams, about 65°C, without letting it boil and form a skin.", "Pour the hot milk into the coffee, so it is roughly half and half, and stir in sugar to taste."],
      handTools: ["Saucepan"],
    }
  ),
];
