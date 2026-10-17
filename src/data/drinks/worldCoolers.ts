import type { Recipe } from "@/types";
import { drink, pexels } from "./builders";
import { ICE, L, MUDDLER, SQUEEZER, blended, built, pitcher } from "./mocktailBuilders";
import { LC, lemonade } from "./lemonadeBuilders";

/** Limeades and other ades, Indian sharbats and coolers, Latin American aguas frescas, and coolers from the Middle East and Asia. */

const VEG = ["Vegan", "Dairy-Free", "Gluten-Free", "Caffeine-Free"] as const;
const SRC_IN = { sourceName: "Tarla Dalal — Indian mocktails and coolers", sourceUrl: "https://www.tarladalal.com/recipes-for-Indian-Mocktails-146" };
const SRC_WORLD = { sourceName: "WION — summer coolers from around the world", sourceUrl: "https://embed.wionews.com/web-stories/life-fun/summer-coolers-traditional-drinks-from-around-the-world-8999751" };
const SRC_AGUA = { sourceName: "Wikipedia — Agua fresca", sourceUrl: "https://en.wikipedia.org/wiki/Agua_fresca" };

export const limeades: Recipe[] = [
  lemonade({ id: "limeade", title: "Limeade", diet: [...VEG], taste: ["Tangy", "Sweet", "Refreshing"], description: "Fresh lime juice, sugar syrup and cold water: sharper and greener than lemonade, and just as easy.", prep: 15, make: 5, wait: 30, difficulty: "Easy", image: pexels(8679351) }, { citrus: { pantryId: "lime", label: "Limes", count: 10 } }),
  lemonade({ id: "strawberry-limeade", title: "Strawberry Limeade", diet: [...VEG], taste: ["Fruity", "Tangy", "Sweet"], description: "Limeade swirled with strawberry purée: pink, tart and bright.", prep: 20, make: 5, wait: 30, difficulty: "Easy", image: pexels(10562799) }, { citrus: { pantryId: "lime", label: "Limes", count: 10 }, fruit: { lines: [L("strawberry", "Strawberries, hulled", "250 g")], step: "Blend the strawberries to a purée (or mash them and press through a sieve)." } }),
  lemonade({ id: "cherry-limeade", title: "Cherry Limeade", diet: [...VEG], taste: ["Fruity", "Tangy", "Sweet"], description: "Limeade with cherry juice stirred through: a soda-fountain favourite, deep pink and tart.", prep: 20, make: 8, wait: 30, difficulty: "Medium", image: pexels(31621376) }, { citrus: { pantryId: "lime", label: "Limes", count: 10 }, fruit: { lines: [L("cherries", "Dark cherries, pitted", "250 g")], step: "Simmer the pitted cherries with 100 ml of water for 8 minutes, mash and strain, and let the juice cool." } }),
  lemonade({ id: "orangeade", title: "Orangeade", diet: [...VEG], taste: ["Fruity", "Sweet", "Refreshing"], description: "Fresh orange juice stretched with cold water and a little sugar: gentler than juice and good for a crowd.", prep: 15, make: 5, wait: 30, difficulty: "Easy", image: pexels(12433995) }, { citrus: { pantryId: "orange", label: "Oranges", count: 6 }, sugarG: 80, extra: [L("lemon", "Lemon, juiced", "1")] }),
  lemonade({ id: "grapefruit-ade", title: "Grapefruit Ade", diet: ["Dairy-Free", "Gluten-Free", "Caffeine-Free"], taste: ["Tangy", "Bitter", "Refreshing"], description: "Fresh pink grapefruit juice with honey and cold water: tart, a little bitter and very refreshing.", prep: 15, make: 5, wait: 30, difficulty: "Easy", image: pexels(29177283) }, { citrus: { pantryId: "grapefruit", label: "Pink grapefruit", count: 3 }, honey: true }),
  lemonade({ id: "tangerine-ade", title: "Tangerine Ade", diet: [...VEG], taste: ["Fruity", "Sweet", "Refreshing"], description: "Easy-peel tangerines pressed with a squeeze of lemon: sweet, fragrant and mellow.", prep: 18, make: 5, wait: 30, difficulty: "Easy", image: pexels(30216029) }, { citrus: { pantryId: "mandarin", label: "Tangerines", count: 10 }, sugarG: 60, extra: [L("lemon", "Lemon, juiced", "1")] }),
  lemonade({ id: "calamansi-juice", title: "Calamansi Juice", diet: [...VEG], taste: ["Tangy", "Sweet", "Refreshing"], description: "The Philippines' everyday cooler: small, sour calamansi limes squeezed with sugar and water, served iced.", prep: 20, make: 5, wait: 20, difficulty: "Easy", image: pexels(35020135), notes: "Calamansi are tiny and tart. Limes with a splash of orange juice are the nearest substitute." }, { citrus: { pantryId: "calamansi", label: "Calamansi", count: 25 } }),
];

export const indianCoolers: Recipe[] = [
  built(
    { id: "nimbu-pani", title: "Nimbu Pani", ...LC, diet: [...VEG], taste: ["Tangy", "Refreshing", "Sweet"], description: "India's everyday lemon water: fresh lemon, a little sugar, a pinch of salt and roasted cumin, over ice.", prep: 4, make: 2, difficulty: "Easy", image: pexels(33107433), ...SRC_IN },
    [L("lemon", "Lemon, juiced", "1"), L("sugar", "Sugar, to taste", "2 tsp"), L("salt", "Salt, a pinch", "1 pinch"), L("cumin-powder", "Roasted cumin powder, a pinch", "1 pinch", true), L("fresh-mint", "Fresh mint leaves", "4", true), L("water", "Cold water", "250 ml"), ICE("1/2 cup")],
    ["Squeeze the lemon into a tall glass and stir in the sugar and salt until dissolved.", "Pour in the cold water and stir.", "Add the cumin (if using) and the ice.", "Garnish with mint leaves and serve immediately."],
    [SQUEEZER]
  ),
  built(
    { id: "masala-shikanji", title: "Shikanji (Masala Lemonade)", ...LC, diet: [...VEG], taste: ["Tangy", "Spicy", "Refreshing"], description: "Punjab's spiced lemonade: lemon juice, sugar, black salt, roasted cumin and black pepper — sharper and more savoury than nimbu pani.", prep: 5, make: 2, difficulty: "Easy", image: pexels(10323614), ...SRC_IN },
    [L("lemon", "Lemons, juiced", "2"), L("sugar", "Sugar", "2 tbsp"), L("black-salt", "Black salt", "1/4 tsp"), L("cumin-powder", "Roasted cumin powder", "1/2 tsp"), L("black-pepper", "Black pepper, freshly ground", "1 pinch"), L("fresh-mint", "Fresh mint leaves", "6"), L("water", "Cold water", "250 ml"), ICE("1/2 cup")],
    ["Muddle the mint with the sugar in a tall glass until the mint is bruised and the sugar is wet.", "Add the lemon juice, black salt, cumin and pepper and stir until the sugar dissolves.", "Pour in the cold water and add the ice.", "Stir well and taste for salt and sweetness before serving."],
    [MUDDLER, SQUEEZER]
  ),
  built(
    { id: "kokum-sharbat", title: "Kokum Sharbat", ...LC, diet: [...VEG], taste: ["Tangy", "Sweet", "Refreshing"], description: "A deep red, sweet-sour cooler from the Konkan coast: kokum syrup, roasted cumin and a pinch of salt, diluted and iced.", prep: 5, make: 2, difficulty: "Easy", image: pexels(5455638), ...SRC_IN, notes: "Kokum syrup is sold ready-made. Dried kokum can be soaked in warm water with sugar to make your own." },
    [L("kokum", "Kokum syrup (or 6 dried kokum petals soaked in warm water)", "3 tbsp"), L("sugar", "Sugar, if needed", "1 tsp", true), L("cumin-powder", "Roasted cumin powder", "1/4 tsp"), L("black-salt", "Black salt, a pinch", "1 pinch"), L("water", "Cold water", "250 ml"), ICE("1/2 cup")],
    ["Put the kokum syrup in a tall glass with the cumin and black salt.", "Pour in the cold water slowly and stir until the colour is even.", "Taste, and stir in a little sugar if it is too sharp.", "Add ice and serve."]
  ),
  built(
    { id: "rose-sharbat", title: "Rose Sharbat", ...LC, diet: [...VEG], taste: ["Sweet", "Herbal", "Refreshing"], description: "Rose syrup stirred into iced water with a squeeze of lemon and soaked basil seeds: pink, floral and cooling.", prep: 5, make: 2, difficulty: "Easy", image: pexels(32754053), ...SRC_IN },
    [L("rose-syrup", "Rose syrup", "3 tbsp"), L("lemon", "Lemon, a squeeze", "1 tsp", true), L("basil-seeds", "Basil seeds, soaked for 10 minutes", "1 tsp", true), L("water", "Cold water", "250 ml"), ICE("1/2 cup")],
    ["Put the soaked basil seeds in a tall glass, if using, and add the rose syrup.", "Pour in the cold water slowly, stirring until the syrup is mixed through.", "Squeeze in the lemon juice and add the ice.", "Stir and serve."],
    [SQUEEZER]
  ),
  built(
    { id: "khus-sharbat", title: "Khus Sharbat (Vetiver)", ...LC, diet: [...VEG], taste: ["Sweet", "Herbal", "Refreshing"], description: "A green, earthy, grassy-sweet cooler made from khus (vetiver) syrup: the traditional drink of an Indian summer.", prep: 5, make: 2, difficulty: "Easy", image: pexels(12268573), ...SRC_IN },
    [L("khus-syrup", "Khus (vetiver) syrup", "3 tbsp"), L("lemon", "Lemon, a squeeze", "1 tsp", true), L("water", "Cold water", "250 ml"), ICE("1/2 cup")],
    ["Put the khus syrup in a tall glass.", "Pour in the cold water slowly and stir until mixed.", "Add a squeeze of lemon, if using, and the ice.", "Stir once more and serve."],
    [SQUEEZER]
  ),
  built(
    { id: "imli-cooler", title: "Imli Cooler (Tamarind Sharbat)", ...LC, diet: [...VEG], taste: ["Tangy", "Sweet", "Spicy"], description: "Sweet-sour tamarind with jaggery, roasted cumin and black salt, thinned with cold water: a tart, savoury cooler.", prep: 20, make: 5, difficulty: "Easy", image: pexels(34467107), ...SRC_IN },
    [L("tamarind", "Tamarind pulp or paste", "2 tbsp"), L("jaggery", "Jaggery, grated", "2 tbsp"), L("cumin-powder", "Roasted cumin powder", "1/2 tsp"), L("black-salt", "Black salt", "1/4 tsp"), L("water", "Cold water", "300 ml"), ICE("1/2 cup")],
    ["Soak the tamarind in 100 ml of warm water for 10 minutes, then mash and strain, discarding the fibre and seeds.", "Stir the jaggery, cumin and black salt into the tamarind liquid until the jaggery dissolves.", "Add the remaining cold water and ice.", "Stir well and serve cold, garnished with a mint sprig."]
  ),
  blended(
    { id: "pudina-sharbat", title: "Pudina Sharbat (Mint Cooler)", ...LC, diet: [...VEG], taste: ["Herbal", "Refreshing", "Tangy"], description: "Fresh mint blended with lemon, sugar, black salt and ice: pale green, cooling and tangy.", prep: 8, make: 3, difficulty: "Easy", image: pexels(34472830), ...SRC_IN },
    [L("fresh-mint", "Fresh mint leaves", "25 g"), L("lemon", "Lemon, juiced", "1"), L("sugar", "Sugar", "2 tbsp"), L("black-salt", "Black salt", "1/4 tsp"), L("water", "Cold water", "250 ml"), ICE("1 cup")],
    { pre: ["Squeeze the lemon and pick the mint leaves from the stalks."], blend: "the mint, lemon juice, sugar, black salt, water and ice", hand: "Crush the mint with the sugar and black salt in a jar until it is a wet paste, then add the lemon juice, water and crushed ice", post: ["Strain into glasses and serve cold, with a mint sprig."] }
  ),
  blended(
    { id: "falsa-sharbat", title: "Falsa Sharbat", ...LC, diet: [...VEG], taste: ["Fruity", "Tangy", "Sweet"], description: "North India's summer berry: falsa (phalsa) crushed with sugar and a pinch of black salt into a deep, tart purple-red cooler.", prep: 12, make: 5, difficulty: "Medium", image: pexels(39533225), ...SRC_IN, notes: "Falsa is only in season for a few weeks of summer. Frozen berries work if you can find them." },
    [L("falsa", "Falsa (phalsa) berries", "150 g"), L("sugar", "Sugar", "3 tbsp"), L("black-salt", "Black salt, a pinch", "1 pinch"), L("water", "Cold water", "300 ml"), ICE("1/2 cup")],
    { pre: ["Wash the falsa berries and pick off any stalks."], blend: "the falsa, sugar, black salt and 100 ml of the water", hand: "Crush the falsa with the sugar and black salt in a jar until they are a juicy pulp, then add 100 ml of the water", post: ["Strain through a sieve, pressing out the juice, and discard the seeds.", "Stir in the remaining water, add ice and serve."] }
  ),
  drink(
    { id: "sol-kadhi", title: "Sol Kadhi", ...LC, temperature: "cold", diet: [...VEG], taste: ["Tangy", "Creamy", "Spicy"], description: "A pink, savoury digestif from the Konkan coast: coconut milk and kokum, with garlic, cumin and coriander, served chilled after a meal.", prep: 15, make: 5, difficulty: "Easy", image: pexels(37076555), ...SRC_IN, notes: "Serve it cold, never hot. It curdles if it is boiled." },
    [L("coconut-milk", "Thick coconut milk", "150 ml"), L("kokum", "Kokum syrup (or 5 dried kokum petals soaked in 100 ml warm water)", "2 tbsp"), L("garlic", "Garlic, 1 small clove, crushed", "1"), L("cumin-powder", "Roasted cumin powder", "1/4 tsp"), L("coriander-leaves", "Fresh coriander, chopped", "1 tbsp"), L("salt", "Salt, to taste", "1/4 tsp"), L("water", "Cold water", "150 ml")],
    [
      { id: "blender", label: "Blender", equipment: ["Blender"], steps: ["Soak the dried kokum (if using) in warm water for 10 minutes, then squeeze and discard the petals.", "Put the coconut milk, kokum liquid or syrup, garlic, cumin, coriander, salt and cold water in the blender and blend for 20 seconds.", "Strain, taste for salt and tartness, and chill for 15 minutes.", "Serve cold in small glasses, garnished with coriander."] },
      { id: "by-hand", label: "By hand", equipment: [], handTools: ["Jar", "Fine sieve", "Spoon"], steps: ["Soak the dried kokum (if using) in warm water for 10 minutes, then squeeze and discard the petals.", "Crush the garlic to a paste with the salt, and put it in a lidded jar with the coconut milk, kokum liquid or syrup, cumin, coriander and cold water.", "Close the lid and shake hard for 30 seconds, then strain and chill for 15 minutes.", "Serve cold in small glasses, garnished with coriander."] },
    ]
  ),
];

export const latinCoolers: Recipe[] = [
  pitcher(
    { id: "agua-de-tamarindo", title: "Agua de Tamarindo", ...LC, diet: [...VEG], taste: ["Tangy", "Sweet", "Refreshing"], description: "Mexico's tamarind agua fresca: pods simmered, mashed and strained, sweetened and served well chilled over ice.", prep: 30, make: 15, wait: 60, difficulty: "Medium", servings: 4, image: pexels(38956012), ...SRC_AGUA },
    [L("tamarind", "Tamarind pods, shelled (or 150 g tamarind paste)", "150 g"), L("water", "Water", "1200 ml"), L("sugar", "Sugar", "100 g"), L("lime", "Lime, a squeeze", "1 tsp", true), ICE("2 cups")],
    ["Peel the tamarind pods and put the pulp in a saucepan with 600 ml of the water. Simmer for 10 minutes until the pulp is very soft.", "Mash the pulp in the pan, then pour through a sieve into a pitcher, pressing out all the pulp and discarding the seeds.", "Stir in the sugar until dissolved, then add the rest of the cold water and the lime juice.", "Chill for at least an hour and serve over ice."]
  ),
  pitcher(
    { id: "agua-de-pepino", title: "Agua de Pepino", ...LC, diet: [...VEG], taste: ["Refreshing", "Tangy", "Herbal"], description: "Cucumber blended with lime, sugar and water, then strained: pale green, cool and clean — a Mexican street-stall favourite.", prep: 15, make: 5, wait: 30, difficulty: "Easy", servings: 4, image: pexels(38431320), ...SRC_AGUA },
    [L("cucumber", "Cucumbers, peeled and chopped", "2"), L("lime", "Limes, juiced", "3"), L("sugar", "Sugar", "80 g"), L("water", "Cold water", "1000 ml"), ICE("2 cups")],
    ["Blend the cucumbers with 300 ml of the water (or grate them finely and press the juice out through a clean cloth).", "Strain the cucumber juice into a pitcher, pressing out every drop.", "Stir in the lime juice and the sugar until dissolved, then add the rest of the water.", "Chill for 30 minutes and serve over ice."],
    [SQUEEZER]
  ),
  pitcher(
    { id: "agua-de-sandia", title: "Agua de Sandía", ...LC, diet: [...VEG], taste: ["Refreshing", "Fruity", "Sweet"], description: "Watermelon blended with lime and sugar, strained and diluted: pink, light and the best way to use a watermelon.", prep: 12, make: 5, wait: 30, difficulty: "Easy", servings: 4, image: pexels(8755253), ...SRC_AGUA },
    [L("watermelon", "Seedless watermelon, cubed", "600 g"), L("lime", "Lime, juiced", "1"), L("sugar", "Sugar, to taste", "2 tbsp"), L("water", "Cold water", "500 ml"), ICE("2 cups")],
    ["Blend or mash the watermelon to a pulp, then strain through a sieve into a pitcher, pressing out the juice.", "Stir in the lime juice and the sugar until it dissolves.", "Add the cold water and stir.", "Chill for 30 minutes and serve over ice."],
    [SQUEEZER]
  ),
  pitcher(
    { id: "agua-de-pina", title: "Agua de Piña", ...LC, diet: [...VEG], taste: ["Fruity", "Tangy", "Sweet"], description: "Fresh pineapple blended with water and a little sugar and strained: sunny, tart and light.", prep: 15, make: 5, wait: 30, difficulty: "Easy", servings: 4, image: pexels(8963407), ...SRC_AGUA },
    [L("pineapple", "Ripe pineapple, chopped", "400 g"), L("sugar", "Sugar, to taste", "3 tbsp"), L("water", "Cold water", "800 ml"), ICE("2 cups")],
    ["Blend the pineapple with 300 ml of the water until smooth (or grate it finely and press out the juice through a clean cloth).", "Strain into a pitcher, pressing out every drop.", "Stir in the sugar until dissolved and add the rest of the water.", "Chill for 30 minutes and serve over ice."]
  ),
  pitcher(
    { id: "agua-de-melon", title: "Agua de Melón", ...LC, diet: [...VEG], taste: ["Fruity", "Sweet", "Refreshing"], description: "Ripe cantaloupe blended with water, lime and a little sugar: soft orange, honeyed and very cooling.", prep: 15, make: 5, wait: 30, difficulty: "Easy", servings: 4, image: pexels(32489970), ...SRC_AGUA },
    [L("cantaloupe", "Ripe cantaloupe, cubed", "500 g"), L("lime", "Lime, juiced", "1"), L("sugar", "Sugar, to taste", "2 tbsp"), L("water", "Cold water", "700 ml"), ICE("2 cups")],
    ["Blend or mash the cantaloupe with 300 ml of the water and strain through a sieve into a pitcher.", "Stir in the lime juice and the sugar until dissolved.", "Add the rest of the water and stir.", "Chill for 30 minutes and serve over ice."],
    [SQUEEZER]
  ),
  blended(
    { id: "limonada-de-coco", title: "Limonada de Coco", ...LC, diet: [...VEG], taste: ["Creamy", "Tangy", "Refreshing"], description: "Colombia's coconut lemonade: lime juice blended with coconut cream and ice into a thick, frothy, pale green drink.", prep: 8, make: 3, difficulty: "Easy", image: pexels(18016884), sourceName: "Wikipedia — Colombian cuisine", sourceUrl: "https://en.wikipedia.org/wiki/Colombian_cuisine" },
    [L("lime", "Limes, juiced", "4"), L("coconut-cream", "Coconut cream", "150 ml"), L("sugar", "Sugar", "3 tbsp"), L("water", "Cold water", "100 ml"), ICE("2 cups")],
    { pre: ["Squeeze the limes and strain out the pips."], blend: "the lime juice, coconut cream, sugar, water and ice", hand: "Stir the sugar into the lime juice, coconut cream and water until dissolved, then put it in a jar with the crushed ice", post: ["Pour into chilled glasses and serve right away with a lime wheel."] }
  ),
  pitcher(
    { id: "chicha-morada", title: "Chicha Morada", ...LC, diet: [...VEG], taste: ["Fruity", "Sweet", "Spicy"], description: "Peru's purple corn drink: dried purple corn simmered with pineapple, apple, cinnamon and cloves, sweetened and finished with lime, and served very cold.", prep: 15, make: 45, wait: 60, difficulty: "Medium", servings: 6, image: pexels(28490841), sourceName: "Wikipedia — Chicha morada", sourceUrl: "https://en.wikipedia.org/wiki/Chicha_morada", notes: "The deep colour comes from the purple corn kernels and cob. It is not alcoholic, unlike other chichas." },
    [L("purple-corn", "Dried purple corn (maíz morado)", "200 g"), L("pineapple", "Pineapple skin and a few chunks", "150 g"), L("apple", "Apple, chopped", "1"), L("cinnamon-stick", "Cinnamon sticks", "2"), L("cloves", "Cloves", "4"), L("water", "Water", "2000 ml"), L("sugar", "Sugar", "100 g"), L("lime", "Limes, juiced", "2"), ICE("2 cups")],
    ["Put the purple corn, pineapple, apple, cinnamon sticks and cloves in a large pot with the water.", "Bring to a boil, then lower the heat and simmer for 45 minutes, until the water is deep purple. Let it cool.", "Strain into a pitcher, discarding the solids, then stir in the sugar until dissolved and the lime juice.", "Chill for at least an hour and serve over ice with a few pieces of fruit."],
    []
  ),
  drink(
    { id: "horchata", title: "Horchata (Mexican Rice Drink)", ...LC, temperature: "cold", diet: ["Vegan", "Dairy-Free", "Gluten-Free", "Caffeine-Free"], taste: ["Sweet", "Creamy", "Spicy"], description: "Rice soaked with cinnamon and blended into a sweet, milky, dairy-free drink: Mexico's most-loved agua fresca.", prep: 15, make: 10, wait: 240, difficulty: "Easy", servings: 4, image: pexels(34488753), sourceName: "Wikipedia — Horchata", sourceUrl: "https://en.wikipedia.org/wiki/Horchata", notes: "Soak the rice for at least 4 hours, or overnight, so it blends smooth. Serve it very cold over ice." },
    [L("rice", "Long-grain white rice", "200 g"), L("cinnamon-stick", "Cinnamon stick", "1"), L("water", "Water", "1000 ml"), L("sugar", "Sugar", "80 g"), L("vanilla-extract", "Vanilla extract", "1 tsp"), L("ice", "Ice cubes, to serve", "2 cups", true)],
    [
      { id: "blender", label: "Blender", equipment: ["Blender", "Strainer"], handTools: ["Jug"], steps: ["Rinse the rice, then soak it with the cinnamon stick in 500 ml of the water for at least 4 hours.", "Break up the cinnamon stick, then blend the rice, cinnamon and its soaking water for 2 minutes, until as smooth as you can make it.", "Strain through a fine sieve (or a clean cloth) into a jug, pressing out all the liquid, then stir in the sugar, vanilla and the rest of the water.", "Chill and serve over ice, with a dusting of ground cinnamon."] },
      { id: "by-hand", label: "By hand", equipment: [], handTools: ["Saucepan", "Masher", "Fine sieve", "Jug"], steps: ["Rinse the rice and simmer it with the cinnamon stick in 500 ml of the water for about 25 minutes, until it is very soft.", "Mash the rice hard with a potato masher, then add 300 ml more water and press through a fine sieve into a jug, working the rice through.", "Stir in the sugar, vanilla and the rest of the water until the sugar dissolves.", "Chill and serve over ice, with a dusting of ground cinnamon."], notes: "It is a little less smooth than the blended version, but just as good." },
    ]
  ),
];

export const worldCoolers: Recipe[] = [
  pitcher(
    { id: "tamar-hindi", title: "Tamar Hindi (Tamarind Sharbat)", ...LC, diet: [...VEG], taste: ["Tangy", "Sweet", "Herbal"], description: "The Middle East's tamarind drink, scented with rose water: dark amber, sweet-sour and especially popular during Ramadan.", prep: 25, make: 15, wait: 60, difficulty: "Medium", servings: 4, image: pexels(17612825), ...SRC_WORLD },
    [L("tamarind", "Tamarind paste or pulp", "100 g"), L("water", "Water", "1200 ml"), L("sugar", "Sugar", "100 g"), L("rose-water", "Rose water", "1 tsp"), ICE("2 cups")],
    ["Simmer the tamarind in 500 ml of the water for 10 minutes, mashing it as it softens.", "Strain through a sieve into a pitcher, pressing out the pulp and discarding the seeds and fibre.", "Stir in the sugar until dissolved, then the rose water and the rest of the cold water.", "Chill for at least an hour and serve over ice."]
  ),
  built(
    { id: "pomegranate-cooler", title: "Pomegranate Cooler", ...LC, diet: [...VEG], taste: ["Fruity", "Tangy", "Refreshing"], description: "Pomegranate juice with lime, mint and a little syrup, diluted and iced: ruby, tart and cooling.", prep: 5, make: 2, difficulty: "Easy", image: pexels(38638932), ...SRC_WORLD },
    [L("pomegranate", "Pomegranate juice", "150 ml"), L("lime", "Lime, juiced", "1/2"), L("sugar", "Sugar syrup", "1 tbsp"), L("fresh-mint", "Fresh mint leaves", "6"), L("water", "Cold water", "100 ml"), ICE("1/2 cup")],
    ["Muddle the mint with the sugar syrup in a tall glass.", "Add the pomegranate juice and lime juice and stir.", "Pour in the cold water and fill the glass with ice.", "Garnish with a mint sprig and a few pomegranate seeds."],
    [MUDDLER, SQUEEZER]
  ),
  blended(
    { id: "watermelon-mint-cooler", title: "Watermelon Mint Cooler", ...LC, diet: [...VEG], taste: ["Refreshing", "Herbal", "Sweet"], description: "Watermelon blended with mint, lime and ice into a pink, frothy, extremely cooling drink.", prep: 8, make: 3, difficulty: "Easy", image: pexels(7981892), ...SRC_WORLD },
    [L("watermelon", "Seedless watermelon, cubed", "300 g"), L("fresh-mint", "Fresh mint leaves", "10"), L("lime", "Lime, juiced", "1"), L("sugar", "Sugar, to taste", "1 tsp"), ICE("1 cup")],
    { pre: ["Cut the rind off the watermelon and cube the flesh."], blend: "the watermelon, mint, lime juice, sugar and ice", hand: "Crush the watermelon and mint with the sugar in a jar until pulpy, then add the lime juice and crushed ice", post: ["Pour into a tall glass and serve with a mint sprig."] }
  ),
  built(
    { id: "chanh-muoi", title: "Chanh Muối (Salted Lemon Cooler)", ...LC, diet: [...VEG], taste: ["Tangy", "Sweet", "Refreshing"], description: "Vietnam's salted-pickled-lemon drink: a pickled lemon crushed with sugar syrup and topped with cold water or soda — salty, sour and sweet at once.", prep: 5, make: 2, difficulty: "Easy", image: pexels(31975410), ...SRC_WORLD, notes: "The pickled lemons are made weeks ahead from lemons packed in salt. Preserved lemon is the nearest shop-bought stand-in." },
    [L("salted-lemon", "Salted (pickled) lemon, half", "1/2"), L("sugar", "Sugar syrup", "2 tbsp"), L("water", "Cold water or sparkling water", "250 ml"), ICE("1/2 cup")],
    ["Put the pickled lemon half in a tall glass and crush it with a spoon (or muddler), squeezing out the juice and breaking up the peel.", "Stir in the sugar syrup.", "Fill the glass with ice and pour in the cold water or sparkling water.", "Stir well, taste, and add more syrup if it is too salty."],
    [MUDDLER]
  ),
  built(
    { id: "lemon-honey-ginger-cooler", title: "Lemon Honey Ginger Cooler", ...LC, diet: ["Dairy-Free", "Gluten-Free", "Caffeine-Free"], taste: ["Tangy", "Spicy", "Sweet"], description: "Fresh ginger steeped in water, then mixed with lemon juice and honey and iced: sharp, warm and refreshing.", prep: 15, make: 3, difficulty: "Easy", image: pexels(6932890), ...SRC_WORLD },
    [L("ginger", "Fresh ginger, thinly sliced", "15 g"), L("water", "Boiling water", "100 ml"), L("lemon", "Lemon, juiced", "1"), L("honey", "Honey", "2 tbsp"), L("water", "Cold water", "200 ml"), ICE("1/2 cup")],
    ["Pour the boiling water over the ginger in a heatproof glass and leave for 10 minutes.", "Strain out the ginger, then stir in the honey and lemon juice until the honey dissolves.", "Add the cold water and the ice.", "Stir and serve with a lemon slice."],
    [SQUEEZER]
  ),
  built(
    { id: "switchel", title: "Switchel (Haymaker's Punch)", ...LC, diet: ["Dairy-Free", "Gluten-Free", "Caffeine-Free"], taste: ["Tangy", "Spicy", "Sweet"], description: "The old New England farmhands' drink: apple cider vinegar, ginger and honey (or maple syrup) in cold water — sharp, sweet and extremely thirst-quenching.", prep: 4, make: 2, difficulty: "Easy", image: pexels(10802278), ...SRC_WORLD, notes: "Vinegar is the main ingredient here, not alcohol. It tastes more like a tart ginger ale." },
    [L("apple-cider-vinegar", "Apple cider vinegar", "2 tbsp"), L("ginger", "Fresh ginger, grated", "15 g"), L("honey", "Honey (or maple syrup)", "2 tbsp"), L("water", "Cold water", "400 ml"), ICE("1/2 cup")],
    ["Stir the honey into a little warm water in a jar until dissolved.", "Add the cider vinegar, the grated ginger and the rest of the cold water. Stir well.", "Leave for 10 minutes so the ginger can flavour the water, then strain if you like.", "Serve over ice."],
    [SQUEEZER]
  ),
];
