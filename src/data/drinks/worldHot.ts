import type { Recipe, RecipeIngredient } from "@/types";
import { MILK_FROTHER_TIP, drink, milkSteps, pexels, strongCoffeeIngredients, strongCoffeeMethods, type DrinkFacts, type StrongCoffeeSpec } from "./builders";

/**
 * Hot coffees from around the world, and the brewing methods themselves. Where a recipe was checked against published
 * sources the source is named on the drink.
 */

const espresso = (facts: DrinkFacts, spec: StrongCoffeeSpec): Recipe => drink(facts, strongCoffeeIngredients(spec), strongCoffeeMethods(spec));
const WARM_CUP = "Warm your cup with hot water, then tip it out.";
const milk = (ml: number, label = "Whole milk"): RecipeIngredient => ({ pantryId: "milk", label, amount: `${ml} ml` });

export const worldHot: Recipe[] = [
  // --- Turkey, Greece and the Middle East ---
  drink(
    {
      id: "turkish-coffee", title: "Turkish Coffee", type: "Coffee", temperature: "hot", diet: ["Vegan", "Dairy-Free", "Gluten-Free"], taste: ["Bitter", "Rich"],
      description: "Powder-fine coffee simmered slowly with water and sugar in a small pot until it foams — served unfiltered in a tiny cup, with the grounds left to settle.",
      prep: 3, make: 6, difficulty: "Medium", image: pexels(11276233),
      notes: "Never stir once it is heating and never let it boil hard: the foam (kaimaki) is the point. Wait a minute for the grounds to sink before the first sip, and leave the last mouthful.",
    },
    [
      { pantryId: "ground-coffee", label: "Coffee ground to a powder, finer than espresso", amount: "7 g" },
      { pantryId: "water", label: "Cold water", amount: "80 ml" },
      { pantryId: "sugar", label: "Sugar, to taste (about 1 tsp for medium-sweet)", amount: "1 tsp", optional: true },
      { pantryId: "cardamom", label: "Ground cardamom", amount: "1 pinch", optional: true },
    ],
    [
      {
        id: "cezve", label: "Cezve (ibrik)", equipment: ["Cezve"],
        steps: ["Put the water, coffee, sugar and cardamom (if using) into the cezve and stir once, gently, until the coffee is wet.", "Set it over low heat and let it warm slowly, without stirring, for about 4–5 minutes. The coffee will darken and a ring of foam will form.", "Just as the foam rises to the rim — before it boils — take the cezve off the heat, spoon some foam into a small cup, then pour the coffee over it.", "Let it stand for a minute so the grounds settle, then sip slowly. Serve with a glass of cold water."],
      },
      {
        id: "saucepan", label: "Small saucepan", equipment: [], handTools: ["Small saucepan", "Spoon", "Small cup"],
        steps: ["Put the water, coffee, sugar and cardamom (if using) into the smallest saucepan you have and stir once, gently.", "Set it over low heat and let it warm slowly, without stirring, for about 4–5 minutes, until a ring of foam rises to the edge.", "Take it off the heat just before it boils, spoon some foam into a small cup, then pour the coffee over it.", "Let it stand for a minute so the grounds settle, then sip slowly."],
        notes: "A cezve's narrow neck makes the foam easier, but a small saucepan on gentle heat works.",
      },
    ]
  ),
  drink(
    {
      id: "greek-coffee", title: "Greek Coffee (Ελληνικός Καφές)", type: "Coffee", temperature: "hot", diet: ["Vegan", "Dairy-Free", "Gluten-Free"], taste: ["Bitter", "Rich"],
      description: "Fine-ground coffee brought to a foam in a small briki with sugar to your taste, served with a glass of cold water.",
      prep: 3, make: 5, difficulty: "Medium", image: pexels(33894192),
      sourceName: "Savor the Flavour — Greek coffee", sourceUrl: "https://savortheflavour.com/greek-coffee/",
      notes: "Order or make it by sweetness: sketos (no sugar), metrios (1 tsp per tsp of coffee), glykos (2 tsp per tsp of coffee). Make no more than two cups at a time if you want a good foam.",
    },
    [
      { pantryId: "ground-coffee", label: "Greek coffee, ground to a fine powder", amount: "6 g" },
      { pantryId: "water", label: "Cold water, one demitasse cup", amount: "75 ml" },
      { pantryId: "sugar", label: "Sugar (1 tsp makes it metrios, medium-sweet)", amount: "1 tsp", optional: true },
    ],
    [
      {
        id: "briki", label: "Briki (cezve)", equipment: ["Cezve"],
        steps: ["Pour the cold water into the briki and add the coffee and sugar. Stir until just combined.", "Set it over medium-low heat and do not stir again.", "As soon as the coffee foams up to the rim, take it off the heat. Spoon the foam (kaimaki) into the cup, then pour in the coffee.", "Leave it for 3–4 minutes so the grounds settle, and serve with a glass of cold water."],
      },
      {
        id: "saucepan", label: "Small saucepan", equipment: [], handTools: ["Small saucepan", "Spoon", "Small cup"],
        steps: ["Pour the cold water into a very small saucepan and add the coffee and sugar. Stir until just combined, then do not stir again.", "Heat over medium-low until the coffee foams up to the rim, then take it off the heat at once.", "Spoon the foam into a small cup and pour in the coffee. Let it settle for 3–4 minutes before sipping."],
      },
    ]
  ),
  drink(
    {
      id: "arabic-coffee-qahwa", title: "Arabic Coffee (Qahwa)", type: "Coffee", temperature: "hot", diet: ["Vegan", "Dairy-Free", "Low Sugar", "Gluten-Free"], taste: ["Bitter", "Spicy"],
      description: "Lightly roasted coffee simmered with cardamom and poured in small, generous splashes — pale, fragrant and served without sugar, traditionally with dates.",
      prep: 3, make: 10, difficulty: "Medium", servings: 4, image: pexels(34471733),
      sourceName: "Coffeeness — Qahwa coffee", sourceUrl: "https://www.coffeeness.de/en/qahwa-coffee/",
      notes: "Qahwa is poured a third of a cup at a time. Dates are the traditional accompaniment; in some regions saffron, cloves or rosewater are added.",
    },
    [
      { pantryId: "ground-coffee", label: "Lightly roasted coffee, coarsely ground", amount: "20 g" },
      { pantryId: "water", label: "Water", amount: "500 ml" },
      { pantryId: "cardamom", label: "Cardamom, crushed (about 4 pods) or ground", amount: "1 tsp" },
    ],
    [
      {
        id: "cezve", label: "Cezve or small pot", equipment: ["Cezve"], handTools: ["Fine sieve"],
        steps: ["Bring the water to a gentle boil in a cezve (or the largest pot it fits).", "Add the coffee and the cardamom, lower the heat and simmer for about 8 minutes, skimming off any foam. Don't let it boil hard.", "Take it off the heat, cover and leave it for a minute so the grounds settle, then pour through a fine sieve into a pot or thermos.", "Serve in small cups, a third full at a time, with dates."],
      },
      {
        id: "saucepan", label: "Small saucepan", equipment: [], handTools: ["Small saucepan", "Fine sieve or tea strainer", "Small cups"],
        steps: ["Bring the water to a gentle boil in a small saucepan.", "Add the coffee and cardamom, lower the heat and simmer for about 8 minutes, skimming off any foam, without letting it boil hard.", "Cover, take it off the heat and leave it for a minute so the grounds settle, then pour through a fine sieve into a pot or thermos.", "Serve in small cups, a third full at a time, with dates."],
      },
    ]
  ),
  // --- Latin America ---
  drink(
    {
      id: "cafe-de-olla", title: "Café de Olla", type: "Coffee", temperature: "hot", diet: ["Vegan", "Dairy-Free", "Gluten-Free"], taste: ["Sweet", "Spicy"],
      description: "Mexico's pot coffee: simmered with piloncillo and cinnamon, traditionally in a clay pot, so every mug is sweet, warm and softly spiced.",
      prep: 3, make: 12, difficulty: "Easy", servings: 2, image: pexels(34567212),
      notes: "Piloncillo is unrefined cane sugar, sold as a cone; dark brown sugar is the closest stand-in. Add a clove or a strip of orange peel for a variation.",
    },
    [
      { pantryId: "water", label: "Water", amount: "500 ml" },
      { pantryId: "piloncillo", label: "Piloncillo (about half a small cone)", amount: "40 g" },
      { pantryId: "cinnamon-stick", label: "Cinnamon stick", amount: "1" },
      { pantryId: "ground-coffee", label: "Coarsely ground coffee", amount: "30 g" },
    ],
    [
      {
        id: "saucepan", label: "Saucepan", equipment: [], handTools: ["Saucepan", "Spoon", "Two mugs"],
        optionalEquipment: [{ tag: "Strainer", without: "Let the grounds settle for 5 minutes and pour slowly, or ladle gently, leaving the dregs." }],
        steps: ["Put the water, piloncillo and cinnamon stick in a saucepan (or a clay pot, if you have one) and heat, stirring, until the piloncillo has dissolved and the water is simmering.", "Stir in the coffee, take the pan off the heat, cover it and leave it to steep for 5 minutes.", "Pour through a fine strainer into two mugs, or let the grounds settle and pour carefully."],
      },
    ]
  ),
  drink(
    {
      id: "cafezinho", title: "Cafezinho", type: "Coffee", temperature: "hot", diet: ["Vegan", "Dairy-Free", "Gluten-Free"], taste: ["Sweet", "Bitter"],
      description: "Brazil's little cup: strong, sweet coffee made by pouring sugared hot water through a cloth filter, and served in tiny cups all day long.",
      prep: 3, make: 6, difficulty: "Easy", servings: 2, image: pexels(6307235),
      sourceName: "Talk About Coffee — how to make Brazilian coffee", sourceUrl: "https://www.talkaboutcoffee.com/how-to-make-brazilian-coffee-a-cafezinho-primer.html",
      notes: "The sugar goes in with the water, not into the cup. Don't squeeze the filter — let it drip.",
    },
    [
      { pantryId: "water", label: "Cold water", amount: "200 ml" },
      { pantryId: "sugar", label: "Sugar", amount: "2 tsp" },
      { pantryId: "ground-coffee", label: "Finely ground coffee", amount: "15 g" },
    ],
    [
      {
        id: "cloth-filter", label: "Cloth filter (coador)", equipment: ["Cloth Filter"], handTools: ["Small saucepan"],
        steps: ["Stir the sugar into the water in a small saucepan and heat until it is just below boiling.", "Take the pan off the heat, stir in the coffee, and pour it slowly through the cloth filter into a jug.", "Serve right away in tiny cups."],
      },
      {
        id: "by-hand", label: "By hand", equipment: [], handTools: ["Small saucepan", "Fine sieve", "Small cups"],
        steps: ["Stir the sugar into the water in a small saucepan and heat until it is just below boiling.", "Take the pan off the heat, stir in the coffee, and leave it to steep for 2 minutes.", "Pour slowly through a fine sieve (lined with a paper filter if you have one) into tiny cups and serve right away."],
      },
    ]
  ),
  // --- South and Southeast Asia ---
  drink(
    {
      id: "south-indian-filter-coffee", title: "South Indian Filter Coffee", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Bitter"],
      description: "A strong, slowly dripped decoction of coffee and chicory, stirred into sweet hot milk and poured back and forth to a froth.",
      prep: 5, make: 10, difficulty: "Medium", image: pexels(16128085),
      sourceName: "Wikipedia — Indian filter coffee", sourceUrl: "https://en.wikipedia.org/wiki/Indian_filter_coffee",
      notes: "Filter coffee powder is usually about 70–80% coffee and 20–30% chicory. Pouring the coffee between the tumbler and its dish ('meter coffee') cools it and raises the froth.",
    },
    [
      { pantryId: "ground-coffee", label: "Filter coffee powder (coffee and chicory blend)", amount: "20 g" },
      { pantryId: "water", label: "Boiling water, for the decoction", amount: "100 ml" },
      { pantryId: "milk", label: "Hot whole milk", amount: "150 ml" },
      { pantryId: "sugar", label: "Sugar, to taste", amount: "2 tsp" },
    ],
    [
      {
        id: "south-indian-filter", label: "South Indian filter", equipment: ["South Indian Filter"], handTools: ["Tumbler and dish (davara set)", "Saucepan"],
        steps: ["Put the coffee powder in the upper chamber of the filter, level it, press the pressing disc on top and pour in the boiling water. Cover and leave it to drip, 15–20 minutes, to make a thick decoction.", "Heat the milk in a saucepan until it just comes to the boil.", "Pour about a third of a tumbler of decoction, add the hot milk and sugar, and stir.", "Pour the coffee back and forth between the tumbler and the dish from a height, a few times, until it is frothy and cooler, and drink while hot."],
      },
      {
        id: "french-press", label: "French press", equipment: ["French Press"], handTools: ["Saucepan", "Tumbler and dish or two cups"],
        steps: ["Put the coffee powder in a small French press, pour in the boiling water and stir. Put the lid on and leave it for 10 minutes to make the decoction, then press the plunger down.", "Heat the milk in a saucepan until it just comes to the boil.", "Combine a third of a tumbler of decoction with the hot milk and the sugar, and stir.", "Pour the coffee back and forth between two cups from a height until it is frothy."],
      },
      {
        id: "by-hand", label: "By hand", equipment: [], handTools: ["Small saucepan", "Fine sieve or cloth", "Two cups"],
        steps: ["Stir the coffee powder into the boiling water in a small pan, cover, and leave it to steep for 10 minutes.", "Strain the decoction through a fine sieve or a clean cloth into a cup.", "Heat the milk until it just comes to the boil, then combine a third of a tumbler of decoction with the milk and the sugar.", "Pour the coffee back and forth between two cups from a height until it is frothy."],
      },
    ]
  ),
  drink(
    {
      id: "bella-kaapi", title: "Bella Kaapi (Jaggery Coffee)", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Rich"],
      description: "Karnataka-style filter coffee sweetened with jaggery instead of sugar — deeper, almost molasses-like, with a hint of caramel.",
      prep: 5, make: 10, difficulty: "Easy", image: pexels(11429393),
      sourceName: "Archana's Kitchen — bellada coffee", sourceUrl: "https://archanaskitchen.com/bellada-coffee-recipe-with-milk-karnataka-style-filter-coffee-with-jaggery",
      notes: "Dissolve the jaggery in the hot milk, not the coffee, so it doesn't curdle against the acid.",
    },
    [
      { pantryId: "ground-coffee", label: "Filter coffee powder (coffee and chicory blend)", amount: "12 g" },
      { pantryId: "water", label: "Boiling water, for the decoction", amount: "60 ml" },
      { pantryId: "milk", label: "Whole milk", amount: "150 ml" },
      { pantryId: "jaggery", label: "Jaggery, powdered", amount: "10 g" },
    ],
    [
      {
        id: "south-indian-filter", label: "South Indian filter", equipment: ["South Indian Filter"], handTools: ["Saucepan"],
        steps: ["Put the coffee powder in the upper chamber of the filter, press the disc on top, pour in the boiling water and leave it to drip for 15 minutes.", "Heat the milk in a saucepan, add the powdered jaggery and stir until it has dissolved.", "Pour the decoction into a tumbler, add the jaggery milk and mix. Serve hot."],
      },
      {
        id: "french-press", label: "French press", equipment: ["French Press"], handTools: ["Saucepan"],
        steps: ["Put the coffee powder in a small French press, pour in the boiling water and stir. Lid on, leave it for 10 minutes, then press.", "Heat the milk in a saucepan, add the powdered jaggery and stir until it has dissolved.", "Pour the decoction into a tumbler, add the jaggery milk and mix. Serve hot."],
      },
      {
        id: "by-hand", label: "By hand", equipment: [], handTools: ["Small saucepan", "Fine sieve or cloth", "Tumbler"],
        steps: ["Stir the coffee powder into the boiling water in a small pan, cover and steep for 10 minutes, then strain through a fine sieve or clean cloth.", "Heat the milk, add the powdered jaggery and stir until it has dissolved.", "Pour the decoction into a tumbler, add the jaggery milk and mix. Serve hot."],
      },
    ]
  ),
  drink(
    {
      id: "sukku-kaapi", title: "Sukku Kaapi (Dry Ginger Coffee)", type: "Coffee", temperature: "hot", diet: ["Vegan", "Dairy-Free", "Gluten-Free"], taste: ["Spicy", "Sweet"],
      description: "A warming Tamil herbal 'coffee' of dry ginger, coriander seed, pepper and cardamom with palm jaggery — traditionally taken for a cold, here with a little coffee for body.",
      prep: 5, make: 8, difficulty: "Easy", servings: 2, image: pexels(23731625),
      sourceName: "Jeyashri's Kitchen — sukku malli coffee", sourceUrl: "https://www.jeyashriskitchen.com/sukku-malli-coffee-sukku-kaapi-recipe/",
      notes: "The traditional drink has no coffee at all; the spices are the point. Leave out the coffee for the classic caffeine-free version.",
    },
    [
      { pantryId: "water", label: "Water", amount: "400 ml" },
      { pantryId: "ground-ginger", label: "Dry ginger powder", amount: "1 tsp" },
      { pantryId: "coriander-seeds", label: "Coriander seeds, dry-roasted and crushed", amount: "1 tsp" },
      { pantryId: "black-pepper", label: "Black pepper, freshly ground", amount: "1/4 tsp" },
      { pantryId: "cardamom", label: "Cardamom, crushed", amount: "1/4 tsp" },
      { pantryId: "jaggery", label: "Palm jaggery", amount: "20 g" },
      { pantryId: "ground-coffee", label: "Ground coffee, for body", amount: "1 tsp", optional: true },
    ],
    [
      {
        id: "saucepan", label: "Saucepan", equipment: [], handTools: ["Saucepan", "Strainer or cloth", "Two cups"],
        steps: ["Dry-roast the coriander seeds in a small pan for a minute until fragrant, then crush them with the pepper and cardamom.", "Bring the water to a boil, add the spices, the ginger powder and the coffee (if using), and boil for 2 minutes.", "Add the jaggery, simmer for another minute until dissolved, then turn off the heat.", "Strain into two cups and drink hot."],
      },
    ]
  ),
  drink(
    {
      id: "kopi-o", title: "Kopi O", type: "Coffee", temperature: "hot", diet: ["Vegan", "Dairy-Free", "Gluten-Free"], taste: ["Bitter", "Sweet"],
      description: "Singapore and Malaysia's kopitiam black coffee: dark-roast coffee brewed through a cloth 'sock' and sweetened with sugar, with no milk. Ask for 'peng' to have it iced.",
      prep: 3, make: 7, difficulty: "Easy", image: pexels(35352271),
      sourceName: "Wikipedia — Kopi", sourceUrl: "https://www.wikipedia.org/wiki/Kopi_O",
      notes: "In a kopitiam the order changes the drink: kopi (with condensed milk), kopi C (with evaporated milk and sugar), kopi O (black with sugar), and 'kosong' (no sugar).",
    },
    [
      { pantryId: "ground-coffee", label: "Dark-roast ground coffee, medium-coarse", amount: "15 g" },
      { pantryId: "water", label: "Hot water, just off the boil", amount: "150 ml" },
      { pantryId: "sugar", label: "Sugar, to taste (2 tsp is a typical cup)", amount: "2 tsp" },
    ],
    [
      {
        id: "cloth-filter", label: "Cloth filter (kopi sock)", equipment: ["Cloth Filter"],
        steps: ["Put the coffee in the cloth filter, set it over a jug or cup and pour in the hot water slowly, so it drips through. Dip the filter in and out a few times to strengthen it.", "Stir the sugar into the hot coffee until it has dissolved.", "Pour into a cup and serve hot."],
      },
      {
        id: "french-press", label: "French press", equipment: ["French Press"],
        steps: ["Put the coffee in the French press, pour in the hot water, stir and leave it for 4 minutes.", "Press the plunger down slowly and pour the coffee into a cup.", "Stir in the sugar until dissolved and serve hot."],
      },
      {
        id: "by-hand", label: "By hand", equipment: [], handTools: ["Heatproof mug", "Spoon"],
        optionalEquipment: [{ tag: "Strainer", without: "Let the grounds settle for a minute and pour slowly into a second cup, leaving the last sip." }],
        steps: ["Stir the coffee into the hot water in a heatproof mug, cover and leave it to steep for 4 minutes.", "Let the grounds settle for a minute, then pour slowly into a cup, leaving the muddy last few drops behind.", "Stir in the sugar until dissolved and serve hot."],
      },
    ]
  ),
  drink(
    {
      id: "kopi-c", title: "Kopi C", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Bitter"],
      description: "Kopitiam coffee with evaporated milk and sugar — richer and a little less sweet than plain kopi, with a caramel note from the dark roast.",
      prep: 3, make: 7, difficulty: "Easy", image: pexels(13800737),
      sourceName: "Wikipedia — Kopi", sourceUrl: "https://www.wikipedia.org/wiki/Kopi_O",
      notes: "The 'C' is said to come from Carnation, the tinned evaporated milk brand.",
    },
    [
      { pantryId: "ground-coffee", label: "Dark-roast ground coffee, medium-coarse", amount: "15 g" },
      { pantryId: "water", label: "Hot water, just off the boil", amount: "150 ml" },
      { pantryId: "sugar", label: "Sugar, to taste", amount: "2 tsp" },
      { pantryId: "evaporated-milk", label: "Evaporated milk", amount: "30 ml" },
    ],
    [
      {
        id: "cloth-filter", label: "Cloth filter (kopi sock)", equipment: ["Cloth Filter"],
        steps: ["Put the coffee in the cloth filter, set it over a jug and pour in the hot water slowly. Dip the filter in and out a few times.", "Stir the sugar into the hot coffee, then stir in the evaporated milk.", "Pour into a cup and serve hot."],
      },
      {
        id: "french-press", label: "French press", equipment: ["French Press"],
        steps: ["Put the coffee in the French press, pour in the hot water, stir and leave it for 4 minutes, then press slowly.", "Pour into a cup, stir in the sugar until dissolved and then the evaporated milk.", "Serve hot."],
      },
      {
        id: "by-hand", label: "By hand", equipment: [], handTools: ["Heatproof mug", "Spoon"],
        steps: ["Stir the coffee into the hot water in a heatproof mug, cover and leave it to steep for 4 minutes.", "Let the grounds settle for a minute, then pour slowly into a cup, leaving the last few drops behind.", "Stir in the sugar until dissolved and then the evaporated milk. Serve hot."],
      },
    ]
  ),
  // --- Europe, the UK and the USA ---
  espresso(
    {
      id: "wiener-melange", title: "Wiener Melange", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Creamy", "Bitter"],
      description: "Vienna's café-house coffee: a shot of espresso in a large cup with steamed milk and a crown of milk foam — traditionally served with a glass of water.",
      prep: 4, make: 3, difficulty: "Medium", image: pexels(10966812),
      sourceName: "Caffè Atlas — Wiener Melange", sourceUrl: "https://www.caffeatlas.com/wiener-melange",
    },
    { size: "double", lines: [milk(100, "Cold whole milk")], into: "into a large cup", before: [WARM_CUP], after: (k) => [...milkSteps({ ml: 100, froth: "dense" })(k), "Pour the hot milk into the coffee, filling the cup, and spoon the foam on top.", "Serve with a glass of water."], optional: [MILK_FROTHER_TIP], handTools: ["Saucepan"] }
  ),
  espresso(
    {
      id: "einspanner", title: "Einspänner", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Creamy", "Sweet", "Rich"],
      description: "Vienna's 'one-horse carriage' coffee: a hot, strong coffee under a tall, cold crown of lightly sweetened whipped cream, served in a glass.",
      prep: 5, make: 3, difficulty: "Medium", image: pexels(17506136),
      sourceName: "Tara's Multicultural Table — Einspänner", sourceUrl: "https://tarasmulticulturaltable.com/einspanner-viennese-coffee",
      notes: "Don't stir. Drink the hot coffee through the cold cream, as the carriage drivers did, who could keep a lid of cream on their coffee to hold the heat in.",
    },
    {
      size: "double",
      lines: [{ pantryId: "heavy-cream", label: "Heavy cream, to whip", amount: "60 ml" }, { pantryId: "sugar", label: "Sugar, for the cream and the coffee", amount: "2 tsp" }],
      into: "into a tall heatproof glass",
      before: ["Whip the cream with 1 tsp of the sugar until it holds stiff peaks — with a whisk, or shaken hard in a lidded jar."],
      after: ["Stir the remaining teaspoon of sugar into the coffee, if you like.", "Spoon or pipe the whipped cream on top so it forms a tall cap over the coffee. Serve right away, without stirring."],
      handTools: ["Whisk or lidded jar", "Tall heatproof glass"],
    }
  ),
  espresso(
    {
      id: "cafe-miel", title: "Café Miel", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy", "Spicy"],
      description: "A Spanish honey coffee: espresso stirred with honey, softened with a little steamed milk and dusted with cinnamon.",
      prep: 4, make: 3, difficulty: "Easy", image: pexels(15023080),
      sourceName: "Sugar & Soul — Café con miel", sourceUrl: "https://www.sugarandsoul.co/wprm_print/cafe-con-miel-spanish-coffee-with-honey",
    },
    {
      size: "double",
      lines: [{ pantryId: "honey", label: "Honey", amount: "15 ml" }, milk(60, "Cold whole milk"), { pantryId: "cinnamon", label: "Ground cinnamon, to top", amount: "1 pinch" }],
      into: "onto the honey in a glass or mug",
      before: ["Put 15 ml of honey in the bottom of a glass or small mug."],
      after: (k) => ["Stir until the honey has dissolved into the hot coffee.", ...milkSteps({ ml: 60, froth: "thin" })(k), "Pour in the milk, then finish with a generous dusting of cinnamon."],
      optional: [MILK_FROTHER_TIP], handTools: ["Saucepan"],
    }
  ),
  espresso(
    {
      id: "cafe-bombon", title: "Café Bombón", type: "Coffee", temperature: "hot", diet: ["Gluten-Free"], taste: ["Sweet", "Creamy"],
      description: "Valencia's two-layer treat: espresso floated over an equal amount of sweetened condensed milk in a small glass — stir it in as you drink.",
      prep: 3, make: 2, difficulty: "Medium", image: pexels(34797548),
      sourceName: "Food Republic — café bombón", sourceUrl: "https://www.foodrepublic.com/1736275/spain-coffee-bombon-sweetened-condensed-milk",
    },
    {
      size: "single",
      lines: [{ pantryId: "sweetened-condensed-milk", label: "Sweetened condensed milk", amount: "30 ml" }],
      into: "into a small jug",
      before: ["Spoon 30 ml of sweetened condensed milk into the bottom of a small, clear glass."],
      after: ["Pour the coffee slowly over the back of a spoon so it floats on top of the condensed milk in a separate layer.", "Serve with the layers showing and stir before drinking."],
      handTools: ["Small clear glass"],
    }
  ),
];
