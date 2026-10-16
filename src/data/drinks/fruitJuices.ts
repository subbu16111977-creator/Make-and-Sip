import type { Recipe, RecipeIngredient } from "@/types";
import { pexels } from "./builders";
import { juice } from "./juiceBuilders";

/** Single-fruit juices: citrus, soft fruit and hard fruit. */

const L = (pantryId: string, label: string, amount: string, optional = false): RecipeIngredient => ({ pantryId, label, amount, ...(optional ? { optional: true } : {}) });
const ICE = (): RecipeIngredient => L("ice", "Ice cubes, to serve", "1/2 cup", true);
const SUGAR = (tsp = 1): RecipeIngredient => L("sugar", "Sugar, to taste", `${tsp} tsp`, true);
const VEG = ["Vegan", "Dairy-Free", "Gluten-Free", "Caffeine-Free"] as const;
const SRC_LIST = { sourceName: "Wikipedia — List of juices", sourceUrl: "https://en.wikipedia.org/wiki/List_of_juices" };

export const fruitJuices: Recipe[] = [
  juice(
    { id: "orange-juice-fresh", title: "Fresh Orange Juice (Valencia)", diet: [...VEG], taste: ["Fruity", "Tangy", "Refreshing"], description: "Sweet, juicy Valencia oranges pressed fresh: the breakfast classic, with nothing added.", prep: 5, make: 3, difficulty: "Easy", image: pexels(5668181), ...SRC_LIST, notes: "Drink it within 20 minutes: fresh orange juice loses its flavour and turns bitter as it sits." },
    { kind: "citrus", what: "the oranges", prep: ["Wash the oranges and bring them to room temperature, which makes them juicier."], lines: [L("orange", "Valencia or other sweet juicing oranges", "4"), ICE()] }
  ),
  juice(
    { id: "mosambi-juice", title: "Mosambi Juice (Sweet Lime)", diet: [...VEG], taste: ["Fruity", "Sweet", "Refreshing"], description: "Pale, mild and lightly sweet: the juice of the mosambi, or sweet lime, sold at juice stalls across India with a pinch of black salt.", prep: 5, make: 3, difficulty: "Easy", image: pexels(8743856), ...SRC_LIST, notes: "A pinch of black salt and a little ice is the classic way to serve it." },
    { kind: "citrus", what: "the sweet limes", prep: ["Wash the mosambi."], lines: [L("mosambi", "Mosambi (sweet limes)", "5"), L("black-salt", "Black salt, a pinch", "1 pinch", true), ICE()], after: ["Stir in a pinch of black salt, if using, and serve over ice right away."] }
  ),
  juice(
    { id: "grapefruit-juice", title: "Grapefruit Juice", diet: [...VEG], taste: ["Tangy", "Bitter", "Refreshing"], description: "Pink grapefruit pressed fresh: tart, slightly bitter and very refreshing.", prep: 5, make: 3, difficulty: "Easy", image: pexels(30446324), ...SRC_LIST },
    { kind: "citrus", what: "the grapefruit", prep: ["Wash the grapefruit."], lines: [L("grapefruit", "Pink grapefruit", "2"), SUGAR(), ICE()], after: ["Stir in a little sugar if it is too sharp for you, and serve over ice."] }
  ),
  juice(
    { id: "tangerine-juice", title: "Tangerine Juice", diet: [...VEG], taste: ["Fruity", "Sweet", "Refreshing"], description: "Easy-peeling tangerines pressed into a sweet, fragrant juice, sweeter and softer than orange.", prep: 8, make: 3, difficulty: "Easy", image: pexels(19868699), ...SRC_LIST },
    { kind: "citrus", what: "the tangerines", prep: ["Wash the tangerines."], lines: [L("mandarin", "Tangerines or mandarins", "6"), ICE()] }
  ),
  juice(
    { id: "blood-orange-juice", title: "Blood Orange Juice", diet: [...VEG], taste: ["Fruity", "Tangy", "Sweet"], description: "Deep ruby, sweet and faintly berry-like: blood oranges pressed fresh, in season from winter to spring.", prep: 5, make: 3, difficulty: "Easy", image: pexels(2067629), ...SRC_LIST },
    { kind: "citrus", what: "the blood oranges", prep: ["Wash the blood oranges."], lines: [L("blood-orange", "Blood oranges", "4"), ICE()] }
  ),
  juice(
    { id: "apple-juice-fresh", title: "Fresh Apple Juice", diet: [...VEG], taste: ["Fruity", "Sweet", "Refreshing"], description: "Crisp, sweet apples juiced fresh: cloudy, sweet and far more fragrant than anything from a carton.", prep: 6, make: 3, difficulty: "Easy", image: pexels(9024809), ...SRC_LIST, notes: "Add a squeeze of lemon as you juice to stop it browning." },
    { kind: "hard", what: "the apples", prep: ["Wash and quarter the apples, removing the cores but leaving the skin on."], lines: [L("apple", "Sweet apples", "3"), L("lemon", "Lemon, a squeeze", "1 tsp", true), ICE()] }
  ),
  juice(
    { id: "pineapple-juice-fresh", title: "Fresh Pineapple Juice", diet: [...VEG], taste: ["Fruity", "Tangy", "Sweet"], description: "Ripe pineapple juiced fresh: sunny, sharp and sweet, nothing like the canned kind.", prep: 8, make: 3, difficulty: "Easy", image: pexels(5146439), ...SRC_LIST },
    { kind: "hard", what: "the pineapple", prep: ["Cut the skin from the pineapple, cut out the core and chop the flesh into chunks."], lines: [L("pineapple", "Ripe pineapple", "300 g"), ICE()] }
  ),
  juice(
    { id: "watermelon-juice", title: "Watermelon Juice", diet: [...VEG], taste: ["Refreshing", "Sweet", "Fruity"], description: "Chilled watermelon juiced or blended and strained: the most hydrating drink in the app, pink and very light.", prep: 6, make: 3, difficulty: "Easy", image: pexels(5668213), ...SRC_LIST },
    { kind: "soft", what: "the watermelon", prep: ["Cut the rind off the watermelon and cut the flesh into chunks, removing any big seeds."], lines: [L("watermelon", "Seedless watermelon", "500 g"), L("lime", "Lime, a squeeze", "1 tsp", true), ICE()] }
  ),
  juice(
    { id: "pomegranate-juice", title: "Pomegranate Juice", diet: [...VEG], taste: ["Fruity", "Tangy", "Sweet"], description: "Fresh pomegranate seeds pressed into a deep red, tart-sweet juice.", prep: 12, make: 4, difficulty: "Medium", image: pexels(34704678), ...SRC_LIST, notes: "To get the seeds out, cut the fruit in half and hit the skin with a wooden spoon over a bowl." },
    { kind: "soft", what: "the pomegranate seeds", prep: ["Cut the pomegranates in half and knock the seeds out into a bowl, discarding the white pith."], lines: [L("pomegranate", "Pomegranates", "2"), SUGAR(), ICE()], handNote: "Press the seeds with a spoon through a sieve to crush the seeds and leave the hard centres behind." }
  ),
  juice(
    { id: "cantaloupe-juice", title: "Cantaloupe Juice", diet: [...VEG], taste: ["Fruity", "Sweet", "Refreshing"], description: "Ripe cantaloupe pressed to a soft orange, honeyed juice, drunk cold.", prep: 6, make: 3, difficulty: "Easy", image: pexels(8146360), ...SRC_LIST },
    { kind: "soft", what: "the cantaloupe", prep: ["Cut the cantaloupe in half, scoop out the seeds, cut the rind off and chop the flesh."], lines: [L("cantaloupe", "Ripe cantaloupe", "400 g"), L("lime", "Lime, a squeeze", "1 tsp", true), ICE()] }
  ),
  juice(
    { id: "honeydew-juice", title: "Honeydew Melon Juice", diet: [...VEG], taste: ["Fruity", "Sweet", "Refreshing"], description: "Pale green honeydew pressed to a delicate, sweet, almost floral juice.", prep: 6, make: 3, difficulty: "Easy", image: pexels(27299930), ...SRC_LIST },
    { kind: "soft", what: "the honeydew", prep: ["Cut the honeydew in half, scoop out the seeds, cut the rind off and chop the flesh."], lines: [L("honeydew-melon", "Ripe honeydew melon", "400 g"), L("lime", "Lime, a squeeze", "1 tsp", true), ICE()] }
  ),
  juice(
    { id: "guava-juice", title: "Guava Juice", diet: [...VEG], taste: ["Fruity", "Sweet", "Tangy"], description: "Ripe guavas pressed into a thick, perfumed pink juice, a favourite across India and Latin America.", prep: 8, make: 4, difficulty: "Easy", image: pexels(33865733), ...SRC_LIST, notes: "Strain it well: guava seeds are hard." },
    { kind: "soft", what: "the guavas", prep: ["Wash and quarter the guavas."], lines: [L("guava", "Ripe pink guavas", "4"), L("water", "Cold water", "100 ml"), SUGAR(2), ICE()], handNote: "Press through a fine sieve to leave the seeds behind." }
  ),
  juice(
    { id: "pear-juice", title: "Fresh Pear Juice", diet: [...VEG], taste: ["Fruity", "Sweet", "Refreshing"], description: "Ripe pears juiced fresh into a soft, golden, lightly gritty-sweet juice.", prep: 6, make: 3, difficulty: "Easy", image: pexels(16204047), ...SRC_LIST },
    { kind: "hard", what: "the pears", prep: ["Wash the pears, cut them into quarters and remove the cores."], lines: [L("pear", "Ripe pears", "3"), L("lemon", "Lemon, a squeeze", "1 tsp", true), ICE()] }
  ),
  juice(
    { id: "kiwi-juice", title: "Kiwi Juice", diet: [...VEG], taste: ["Tangy", "Fruity", "Refreshing"], description: "Green, tangy kiwi blended and strained into a sharp, sweet juice.", prep: 6, make: 3, difficulty: "Easy", image: pexels(8679377), ...SRC_LIST },
    { kind: "soft", what: "the kiwis", prep: ["Peel the kiwis and cut them in half."], lines: [L("kiwi", "Ripe kiwis", "5"), SUGAR(), ICE()] }
  ),
  juice(
    { id: "strawberry-juice", title: "Strawberry Juice", diet: [...VEG], taste: ["Fruity", "Sweet", "Tangy"], description: "Ripe strawberries blended and strained into a bright pink, clear juice with a little lemon.", prep: 6, make: 3, difficulty: "Easy", image: pexels(2479242), ...SRC_LIST },
    { kind: "soft", what: "the strawberries", prep: ["Hull the strawberries."], lines: [L("strawberry", "Ripe strawberries", "300 g"), L("lemon", "Lemon, a squeeze", "1 tsp", true), SUGAR(2), ICE()] }
  ),
  juice(
    { id: "passion-fruit-juice", title: "Passion Fruit Juice", diet: [...VEG], taste: ["Tangy", "Fruity", "Sweet"], description: "Passion fruit pulp pressed from the seeds and sweetened lightly: sharp, golden and intensely fragrant.", prep: 8, make: 4, difficulty: "Easy", image: pexels(5668214), ...SRC_LIST, notes: "Pass the pulp through a sieve to separate the juice from the crunchy seeds." },
    { kind: "soft", what: "the pulp", prep: ["Cut the passion fruits in half and scoop the pulp into a bowl."], lines: [L("passion-fruit", "Passion fruit", "8"), L("water", "Cold water", "150 ml"), L("sugar", "Sugar, to taste", "2 tbsp"), ICE()], after: ["Stir the sugar and water into the strained juice until the sugar dissolves, then serve over ice."], handNote: "Press the pulp through a sieve with a spoon. The seeds stay behind." }
  ),
  juice(
    { id: "mango-juice", title: "Fresh Mango Juice", diet: [...VEG], taste: ["Fruity", "Sweet", "Rich"], description: "Ripe mango blended with a little water and strained: thick, golden and sweet.", prep: 6, make: 3, difficulty: "Easy", image: pexels(30620864), ...SRC_LIST },
    { kind: "soft", what: "the mango", prep: ["Peel the mangoes and cut the flesh from the stones."], lines: [L("mango", "Very ripe mangoes", "2"), L("water", "Cold water", "100 ml"), SUGAR(), ICE()] }
  ),
  juice(
    { id: "peach-juice", title: "Peach Juice", diet: [...VEG], taste: ["Fruity", "Sweet", "Refreshing"], description: "Ripe peaches blended and strained into a soft, fragrant, golden juice.", prep: 8, make: 3, difficulty: "Easy", image: pexels(10526097), ...SRC_LIST },
    { kind: "soft", what: "the peaches", prep: ["Peel the peaches, cut them in half and remove the stones."], lines: [L("peach", "Ripe peaches", "3"), L("water", "Cold water", "50 ml", true), L("lemon", "Lemon, a squeeze", "1 tsp", true), ICE()] }
  ),
  juice(
    { id: "cherry-juice", title: "Cherry Juice", diet: [...VEG], taste: ["Fruity", "Tangy", "Sweet"], description: "Dark sweet cherries blended and strained into a deep red, tart-sweet juice.", prep: 12, make: 4, difficulty: "Medium", image: pexels(34303588), ...SRC_LIST },
    { kind: "soft", what: "the cherries", prep: ["Wash the cherries and remove the stalks and stones."], lines: [L("cherries", "Dark sweet cherries", "300 g"), L("water", "Cold water", "50 ml"), SUGAR(2), ICE()] }
  ),
  juice(
    { id: "apricot-juice", title: "Apricot Juice", diet: [...VEG], taste: ["Fruity", "Sweet", "Tangy"], description: "Ripe apricots blended and strained into a thick, orange, slightly tart juice.", prep: 8, make: 3, difficulty: "Easy", image: pexels(17612780), ...SRC_LIST },
    { kind: "soft", what: "the apricots", prep: ["Wash the apricots, cut them in half and remove the stones."], lines: [L("apricot", "Ripe apricots", "6"), L("water", "Cold water", "100 ml"), SUGAR(), ICE()] }
  ),
];
