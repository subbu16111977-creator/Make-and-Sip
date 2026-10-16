import type { Recipe, RecipeIngredient } from "@/types";
import { drink, pexels } from "./builders";
import { juice } from "./juiceBuilders";

/** Green juices, juice shots, and regional fresh-pressed drinks. */

const L = (pantryId: string, label: string, amount: string, optional = false): RecipeIngredient => ({ pantryId, label, amount, ...(optional ? { optional: true } : {}) });
const ICE = (): RecipeIngredient => L("ice", "Ice cubes, to serve", "1/2 cup", true);
const VEG = ["Vegan", "Dairy-Free", "Gluten-Free", "Caffeine-Free"] as const;
const SRC_GREEN = { sourceName: "Virginia Living — Juice to Get Loose", sourceUrl: "https://virginialiving.com/?p=18859" };
const SRC_IN = { sourceName: "Wikipedia — List of juices", sourceUrl: "https://en.wikipedia.org/wiki/List_of_juices" };

export const greenJuices: Recipe[] = [
  juice(
    { id: "green-machine-juice", title: "Green Machine Juice", diet: [...VEG], taste: ["Herbal", "Refreshing", "Tangy"], description: "The juice-bar best-seller: spinach, kale, cucumber, celery, apple and lemon pressed together — fresh, green and not at all bitter.", prep: 10, make: 4, difficulty: "Easy", image: pexels(12018245), ...SRC_GREEN },
    { kind: "hard", what: "the greens, cucumber, celery and apple", prep: ["Wash everything well. Remove the kale stems, chop the cucumber and celery and core the apple."], lines: [L("spinach", "Baby spinach", "40 g"), L("kale", "Kale leaves", "30 g"), L("cucumber", "Cucumber", "1/2"), L("celery", "Celery stalks", "2"), L("apple", "Green apple", "1"), L("lemon", "Lemon, juiced", "1/2"), ICE()] }
  ),
  juice(
    { id: "kale-apple-lemon-juice", title: "Kale Apple Lemon Juice", diet: [...VEG], taste: ["Herbal", "Tangy", "Refreshing"], description: "Kale, apple, lemon and ginger: a sharp, bright green juice with a spicy edge.", prep: 9, make: 3, difficulty: "Easy", image: pexels(30635721), ...SRC_GREEN },
    { kind: "hard", what: "the kale, apples and ginger", prep: ["Strip the kale leaves from the stems. Core and quarter the apples. Peel the ginger."], lines: [L("kale", "Kale leaves", "60 g"), L("apple", "Green apples", "2"), L("lemon", "Lemon, juiced", "1/2"), L("ginger", "Fresh ginger, peeled", "5 g"), ICE()] }
  ),
  juice(
    { id: "green-detox-juice", title: "Green Detox Juice", diet: [...VEG], taste: ["Herbal", "Tangy", "Refreshing"], description: "Greens with ginger, lemon and apple: grassy, zesty and sharp.", prep: 9, make: 3, difficulty: "Easy", image: pexels(30635726), ...SRC_GREEN },
    { kind: "hard", what: "the greens, apple, cucumber and ginger", prep: ["Wash everything well. Core the apple, chop the cucumber and peel the ginger."], lines: [L("spinach", "Baby spinach", "60 g"), L("cucumber", "Cucumber", "1/2"), L("apple", "Green apple", "1"), L("ginger", "Fresh ginger, peeled", "10 g"), L("lemon", "Lemon, juiced", "1/2"), ICE()] }
  ),
  juice(
    { id: "pineapple-mint-green-juice", title: "Pineapple Mint Green Juice", diet: [...VEG], taste: ["Fruity", "Herbal", "Refreshing"], description: "Pineapple pressed with mint and a little spinach: sweet and tangy, with a cool finish.", prep: 9, make: 3, difficulty: "Easy", image: pexels(29138465), ...SRC_GREEN },
    { kind: "hard", what: "the pineapple, mint and spinach", prep: ["Cut the skin off the pineapple, cut out the core and chop the flesh. Wash the mint and spinach."], lines: [L("pineapple", "Ripe pineapple", "250 g"), L("fresh-mint", "Fresh mint leaves", "10"), L("spinach", "Baby spinach", "30 g"), ICE()] }
  ),
  juice(
    { id: "cucumber-lime-green-juice", title: "Cucumber Lime Green Juice", diet: [...VEG], taste: ["Refreshing", "Tangy", "Herbal"], description: "Cucumber, kale, celery and lime: pale green, crisp and cold.", prep: 8, make: 3, difficulty: "Easy", image: pexels(4443436), ...SRC_GREEN },
    { kind: "hard", what: "the cucumber, celery and kale", prep: ["Wash everything. Chop the cucumber and celery and remove the kale stems."], lines: [L("cucumber", "Cucumber", "1"), L("celery", "Celery stalks", "2"), L("kale", "Kale leaves", "30 g"), L("lime", "Lime, juiced", "1"), ICE()] }
  ),
  juice(
    { id: "green-citrus-juice", title: "Green Citrus Juice", diet: [...VEG], taste: ["Herbal", "Fruity", "Refreshing"], description: "Kale and cucumber balanced with fresh orange: green, but sweet.", prep: 9, make: 3, difficulty: "Easy", image: pexels(35491363), ...SRC_GREEN },
    { kind: "hard", what: "the kale, cucumber and oranges", prep: ["Remove the kale stems and chop the cucumber. Peel the oranges and separate the segments."], lines: [L("kale", "Kale leaves", "40 g"), L("cucumber", "Cucumber", "1/2"), L("orange", "Oranges", "2"), ICE()] }
  ),
  juice(
    { id: "daily-greens-juice", title: "Daily Greens with Sea Salt", diet: [...VEG], taste: ["Herbal", "Refreshing", "Tangy"], description: "A hydrating juice of cucumber, celery, spinach, kale, parsley and lemon, with a pinch of sea salt.", prep: 10, make: 4, difficulty: "Easy", image: pexels(30635723), sourceName: "Pressed Juicery — Daily Greens", sourceUrl: "https://pressed.com" },
    { kind: "hard", what: "the cucumber, celery, greens and parsley", prep: ["Wash everything well and chop the cucumber and celery. Remove the kale stems."], lines: [L("cucumber", "Cucumber", "1/2"), L("celery", "Celery stalks", "2"), L("spinach", "Baby spinach", "30 g"), L("kale", "Kale leaves", "20 g"), L("parsley", "Fresh parsley", "10 g"), L("lemon", "Lemon, juiced", "1/2"), L("salt", "Sea salt, a pinch", "1 pinch")], after: ["Stir in the pinch of sea salt, taste, and serve cold."] }
  ),
];

/** Shots are small, strong juices: a few spoonfuls to sip. */
function shot(facts: Parameters<typeof drink>[0], lines: RecipeIngredient[], what: string, prep: string[]): Recipe {
  return juice({ ...facts, servings: 1 } as never, { kind: "hard", what, prep, lines, after: ["Pour into a small glass and drink it in two or three sips."] });
}

export const juiceShots: Recipe[] = [
  shot(
    { id: "ginger-shot", title: "Ginger Shot", diet: [...VEG], taste: ["Spicy", "Tangy"], description: "Fresh ginger pressed with a little lemon and orange: a small, fiery shot.", prep: 6, make: 3, difficulty: "Easy", image: pexels(4443462) } as never,
    [L("ginger", "Fresh ginger, peeled", "60 g"), L("orange", "Orange", "1"), L("lemon", "Lemon, juiced", "1/2")], "the ginger and orange", ["Wash the ginger and peel it. Peel the orange."]
  ),
  shot(
    { id: "turmeric-lemon-pepper-shot", title: "Turmeric Lemon Pepper Shot", diet: [...VEG], taste: ["Spicy", "Tangy"], description: "Fresh turmeric and ginger with lemon, black pepper and a little coconut water: bright yellow and sharp.", prep: 6, make: 3, difficulty: "Easy", image: pexels(4443511), sourceName: "Pressed Juicery — Vitality Shot", sourceUrl: "https://www.bevnet.com/brands/pressed-juicery/vitality-shot", notes: "Fresh turmeric stains. A pinch of black pepper rounds out the flavour." } as never,
    [L("turmeric-root", "Fresh turmeric root", "15 g"), L("ginger", "Fresh ginger, peeled", "15 g"), L("lemon", "Lemon, juiced", "1"), L("coconut-water", "Coconut water", "50 ml"), L("black-pepper", "Black pepper, a pinch", "1 pinch")], "the turmeric and ginger", ["Scrub the turmeric and peel the ginger."]
  ),
  shot(
    { id: "orange-turmeric-immunity-shot", title: "Orange Turmeric Shot", diet: [...VEG], taste: ["Fruity", "Spicy", "Tangy"], description: "Orange juice with fresh turmeric, ginger and lemon: sweet, citrusy and spicy.", prep: 6, make: 3, difficulty: "Easy", image: pexels(13427966), sourceName: "Pressed Juicery — Immunity Shot", sourceUrl: "https://pressed.com" } as never,
    [L("orange", "Oranges", "2"), L("turmeric-root", "Fresh turmeric root", "10 g"), L("ginger", "Fresh ginger, peeled", "10 g"), L("lemon", "Lemon, juiced", "1/2"), L("black-pepper", "Black pepper, a pinch", "1 pinch", true)], "the oranges, turmeric and ginger", ["Peel the oranges and the ginger. Scrub the turmeric."]
  ),
  shot(
    { id: "amla-ginger-shot", title: "Amla Ginger Shot", diet: [...VEG], taste: ["Tangy", "Spicy", "Bitter"], description: "Fresh amla and ginger pressed together with a little honey: sharp, sour and fiery.", prep: 8, make: 3, difficulty: "Medium", image: pexels(34928264), ...SRC_IN } as never,
    [L("amla", "Fresh amla (Indian gooseberries)", "5"), L("ginger", "Fresh ginger, peeled", "10 g"), L("honey", "Honey, to taste", "1 tsp", true)], "the amla and ginger", ["Wash the amla, cut each into pieces and remove the stones. Peel the ginger."]
  ),
];

export const regionalJuices: Recipe[] = [
  juice(
    { id: "sugarcane-juice", title: "Sugarcane Juice (Ganne ka Ras)", diet: [...VEG], taste: ["Sweet", "Refreshing", "Tangy"], description: "Freshly pressed sugarcane with ginger and lemon: a pale green, sweet street drink, served ice cold across South Asia.", prep: 10, make: 5, difficulty: "Medium", image: pexels(25078443), ...SRC_IN, notes: "Pressed on a roller at stalls; at home you need a juicer that can take the stalks." },
    { kind: "hard", what: "the sugarcane and ginger", prep: ["Peel the tough outer skin off the sugarcane and cut it into short lengths that fit the juicer. Peel the ginger."], lines: [L("sugarcane", "Fresh sugarcane stalks", "500 g"), L("ginger", "Fresh ginger, peeled", "5 g"), L("lemon", "Lemon, juiced", "1/2"), L("black-salt", "Black salt, a pinch", "1 pinch", true), ICE()] }
  ),
  drink(
    { id: "tender-coconut-water", title: "Tender Coconut Water", type: "Juices", temperature: "cold", diet: [...VEG], taste: ["Refreshing", "Sweet"], description: "Water straight from a young green coconut: lightly sweet, cool and clear.", prep: 5, make: 3, difficulty: "Easy", image: pexels(22468360), ...SRC_IN, notes: "Chill the coconut in the fridge first. The soft white flesh inside is good to scoop out and eat afterwards." },
    [L("coconut-water", "Tender coconut water, from 1 young green coconut", "300 ml"), L("ice", "Ice cubes, to serve", "1/2 cup", true)],
    [
      { id: "straight-from-the-coconut", label: "From the coconut", equipment: [], handTools: ["Heavy knife or cleaver", "Straw", "Glass"], steps: ["Stand the coconut upright and shave off the top of the husk with a sharp, heavy knife, working in strokes until the pale shell shows.", "Cut or tap a hole through the shell at the top, wide enough for a straw.", "Put in a straw and drink straight from the coconut, or pour the water into a glass over ice.", "Split the coconut open with the knife afterwards and scoop out the soft flesh to eat."] },
    ]
  ),
  drink(
    { id: "coconut-water-lime", title: "Coconut Water with Lime", type: "Juices", temperature: "cold", diet: [...VEG], taste: ["Refreshing", "Tangy"], description: "Cold coconut water with a squeeze of lime and a pinch of salt: a lightly sweet, hydrating drink.", prep: 3, make: 1, difficulty: "Easy", image: pexels(12954736), ...SRC_IN },
    [L("coconut-water", "Coconut water, chilled", "300 ml"), L("lime", "Lime, juiced", "1/2"), L("salt", "Salt, a pinch", "1 pinch", true), L("ice", "Ice cubes", "1/2 cup", true)],
    [{ id: "in-the-glass", label: "In the glass", equipment: [], handTools: ["Glass", "Spoon"], optionalEquipment: [{ tag: "Citrus Squeezer", without: "Squeeze the lime by hand over a sieve." }], steps: ["Fill a tall glass with ice.", "Pour in the coconut water.", "Squeeze in the lime juice and add the pinch of salt, if using.", "Stir and drink cold."] }]
  ),
  juice(
    { id: "bael-juice", title: "Bael Juice (Wood Apple Sharbat)", diet: [...VEG], taste: ["Sweet", "Tangy", "Refreshing"], description: "Pulp of the bael (wood apple) fruit, mixed with water and jaggery or sugar: a fragrant, cooling summer sharbat from India.", prep: 20, make: 5, difficulty: "Medium", image: pexels(8679128), ...SRC_IN, notes: "Scoop the pulp from the ripe fruit and soak it in water for 15 minutes to loosen it from the seeds." },
    { kind: "soft", what: "the pulp", prep: ["Break open the bael fruit and scoop the pulp into a bowl. Cover with warm water and leave for 15 minutes."], lines: [L("bael", "Ripe bael (wood apple) pulp", "100 g"), L("water", "Cold water", "250 ml"), L("jaggery", "Jaggery or sugar, to taste", "2 tbsp"), L("black-salt", "Black salt, a pinch", "1 pinch", true), ICE()], after: ["Stir in the jaggery until dissolved and serve over ice."] }
  ),
  juice(
    { id: "mixed-fruit-juice", title: "Mixed Fruit Juice", diet: [...VEG], taste: ["Fruity", "Sweet", "Refreshing"], description: "Apple, orange, pineapple and strawberry pressed together: sweet, bright and the classic juice-stall mix.", prep: 10, make: 4, difficulty: "Easy", image: pexels(2479243), ...SRC_IN },
    { kind: "hard", what: "the fruit", prep: ["Quarter and core the apple, peel the orange, chop the pineapple and hull the strawberries."], lines: [L("apple", "Apple", "1"), L("orange", "Orange", "1"), L("pineapple", "Pineapple, chopped", "100 g"), L("strawberry", "Strawberries", "80 g"), ICE()] }
  ),
  juice(
    { id: "pear-ginger-juice", title: "Pear Ginger Juice", diet: [...VEG], taste: ["Fruity", "Spicy", "Sweet"], description: "Ripe pears pressed with fresh ginger: soft, sweet and warming.", prep: 7, make: 3, difficulty: "Easy", image: pexels(12973242), ...SRC_IN },
    { kind: "hard", what: "the pears and ginger", prep: ["Quarter and core the pears. Peel the ginger."], lines: [L("pear", "Ripe pears", "3"), L("ginger", "Fresh ginger, peeled", "10 g"), L("lemon", "Lemon, a squeeze", "1 tsp", true), ICE()] }
  ),
  drink(
    { id: "apple-cinnamon-cider", title: "Apple Cinnamon Cider (Non-Alcoholic)", type: "Juices", temperature: "hot", diet: [...VEG], taste: ["Sweet", "Spicy", "Fruity"], description: "Apple juice simmered with cinnamon, cloves and orange: a warm, spiced, non-alcoholic cider.", prep: 5, make: 15, difficulty: "Easy", servings: 2, image: pexels(15494430), ...SRC_IN, notes: "This is the unfermented, non-alcoholic kind of cider: pressed apple juice, gently spiced." },
    [L("apple-juice", "Cloudy apple juice", "500 ml"), L("cinnamon-stick", "Cinnamon sticks", "2"), L("cloves", "Cloves", "4"), L("orange", "Orange, sliced", "1/2"), L("brown-sugar", "Brown sugar, optional", "1 tbsp", true)],
    [{ id: "saucepan", label: "Saucepan", equipment: [], handTools: ["Saucepan", "Ladle", "Two mugs"], optionalEquipment: [{ tag: "Strainer", without: "Ladle carefully and leave the spices in the pan." }], steps: ["Pour the apple juice into a saucepan and add the cinnamon sticks, cloves and orange slices.", "Heat gently until it just begins to steam, without letting it boil, then lower the heat and simmer for 10 minutes.", "Stir in the brown sugar if using, and strain into two mugs.", "Serve warm with a cinnamon stick and an orange slice."] }]
  ),
];
