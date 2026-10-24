import type { Recipe, RecipeIngredient } from "@/types";
import { pexels } from "./builders";
import { juice } from "./juiceBuilders";

/** Vegetable juices and classic fruit-and-vegetable blends. */

const L = (pantryId: string, label: string, amount: string, optional = false): RecipeIngredient => ({ pantryId, label, amount, ...(optional ? { optional: true } : {}) });
const ICE = (): RecipeIngredient => L("ice", "Ice cubes, to serve", "1/2 cup", true);
const VEG = ["Vegan", "Dairy-Free", "Gluten-Free", "Caffeine-Free"] as const;
const SRC_BLENDS = { sourceName: "Hamilton Beach — beet, orange, ginger and carrot juice", sourceUrl: "https://blog.hamiltonbeach.com/?p=1463" };
const SRC_IN = { sourceName: "Wikipedia — List of juices", sourceUrl: "https://en.wikipedia.org/wiki/List_of_juices" };

export const vegetableJuices: Recipe[] = [
  juice(
    { id: "carrot-juice", title: "Carrot Juice", diet: [...VEG], taste: ["Sweet", "Refreshing"], description: "Sweet, bright orange carrots juiced fresh: earthy, smooth and naturally sweet.", prep: 6, make: 3, difficulty: "Easy", image: pexels(5668171), ...SRC_IN },
    { kind: "hard", what: "the carrots", prep: ["Scrub the carrots and trim the ends. Peel them if the skin is thick."], lines: [L("carrot", "Carrots", "500 g"), L("lemon", "Lemon, a squeeze", "1 tsp", true), ICE()] }
  ),
  juice(
    { id: "beetroot-juice", title: "Beetroot Juice", diet: [...VEG], taste: ["Sweet", "Rich"], description: "Raw beetroot juiced with a squeeze of lemon: deep magenta, earthy and sweet.", prep: 8, make: 3, difficulty: "Easy", image: pexels(11868780), ...SRC_IN, notes: "Wear an apron: beetroot stains everything." },
    { kind: "hard", what: "the beetroot", prep: ["Scrub the beetroots, trim the ends and cut them into chunks that fit the juicer or blender."], lines: [L("beetroot", "Medium beetroots", "2"), L("lemon", "Lemon, juiced", "1/2"), L("water", "Cold water", "100 ml", true), ICE()] }
  ),
  juice(
    { id: "celery-juice", title: "Celery Juice", diet: [...VEG], taste: ["Herbal", "Refreshing"], description: "A bunch of celery juiced into a pale green, salty, grassy drink — sharp and clean.", prep: 8, make: 3, difficulty: "Easy", image: pexels(16963894), ...SRC_IN },
    { kind: "hard", what: "the celery", prep: ["Wash the celery well and cut the stalks into pieces."], lines: [L("celery", "Celery stalks", "400 g"), L("lemon", "Lemon, a squeeze", "1 tsp", true), ICE()] }
  ),
  juice(
    { id: "tomato-juice", title: "Fresh Tomato Juice", diet: [...VEG], taste: ["Tangy", "Rich"], description: "Ripe tomatoes blended and strained, with a pinch of salt and pepper: sweet, sharp and savoury.", prep: 8, make: 3, difficulty: "Easy", image: pexels(8796312), ...SRC_IN },
    { kind: "soft", what: "the tomatoes", prep: ["Wash the tomatoes and cut them into quarters."], lines: [L("tomato", "Ripe tomatoes", "6"), L("salt", "Salt, a pinch", "1 pinch"), L("black-pepper", "Black pepper, a pinch", "1 pinch", true), ICE()], after: ["Stir in the salt and pepper, taste, and serve over ice."] }
  ),
  juice(
    { id: "spinach-apple-juice", title: "Spinach Apple Juice", diet: [...VEG], taste: ["Herbal", "Fruity", "Refreshing"], description: "Spinach, apples and a squeeze of lemon: a green juice that tastes of apple.", prep: 8, make: 3, difficulty: "Easy", image: pexels(4663898), ...SRC_IN },
    { kind: "hard", what: "the spinach and apples", prep: ["Wash the spinach and apples. Core and quarter the apples."], lines: [L("spinach", "Baby spinach", "100 g"), L("apple", "Apples", "2"), L("lemon", "Lemon, juiced", "1/2"), ICE()] }
  ),
  juice(
    { id: "amla-juice", title: "Amla Juice (Indian Gooseberry)", diet: ["Dairy-Free", "Gluten-Free", "Caffeine-Free"], taste: ["Tangy", "Bitter"], description: "Fresh amla pressed into a sharp, sour, astringent juice, usually sweetened with a little honey or jaggery.", prep: 10, make: 4, difficulty: "Medium", image: pexels(34928261), ...SRC_IN, notes: "It is very sharp on its own. A teaspoon of honey makes it easy to drink." },
    { kind: "hard", what: "the amla", prep: ["Wash the amla, cut each one into pieces and remove the stones."], lines: [L("amla", "Fresh amla (Indian gooseberries)", "8"), L("water", "Cold water", "100 ml"), L("honey", "Honey, to taste", "1 tsp", true)], after: ["Stir in the honey, if using, and drink fresh."] }
  ),
];

export const blendJuices: Recipe[] = [
  juice(
    { id: "abc-juice", title: "ABC Juice (Apple, Beetroot, Carrot)", diet: [...VEG], taste: ["Sweet", "Fruity", "Refreshing"], description: "India's favourite blend: apple, beetroot and carrot juiced together into a ruby red, earthy-sweet drink.", prep: 8, make: 3, difficulty: "Easy", image: pexels(30635737), ...SRC_IN },
    { kind: "hard", what: "the apples, beetroot and carrots", prep: ["Wash and scrub everything. Core and quarter the apples and cut the beetroot and carrots into chunks."], lines: [L("apple", "Apples", "2"), L("beetroot", "Small beetroot", "1"), L("carrot", "Carrots", "2"), ICE()] }
  ),
  juice(
    { id: "carrot-orange-juice", title: "Carrot Orange Juice", diet: [...VEG], taste: ["Sweet", "Fruity", "Refreshing"], description: "Carrot and orange juice: sweeter and sharper than carrot alone, and bright orange.", prep: 8, make: 3, difficulty: "Easy", image: pexels(4443447), ...SRC_BLENDS },
    { kind: "hard", what: "the carrots and oranges", prep: ["Scrub the carrots. Peel the oranges, leaving the white pith on, and separate the segments."], lines: [L("carrot", "Carrots", "3"), L("orange", "Oranges", "2"), ICE()] }
  ),
  juice(
    { id: "carrot-ginger-juice", title: "Carrot Ginger Juice", diet: [...VEG], taste: ["Sweet", "Spicy", "Refreshing"], description: "Sweet carrot with a slice of fresh ginger and a squeeze of lemon: warming and bright.", prep: 8, make: 3, difficulty: "Easy", image: pexels(4443445), ...SRC_BLENDS },
    { kind: "hard", what: "the carrots and ginger", prep: ["Scrub the carrots. Peel the ginger."], lines: [L("carrot", "Carrots", "4"), L("ginger", "Fresh ginger, peeled", "10 g"), L("lemon", "Lemon, juiced", "1/2"), ICE()] }
  ),
  juice(
    { id: "apple-carrot-ginger-juice", title: "Apple Carrot Ginger Juice", diet: [...VEG], taste: ["Sweet", "Spicy", "Fruity"], description: "Apple, carrot and ginger: sweet, crisp and gently spicy.", prep: 8, make: 3, difficulty: "Easy", image: pexels(10791062), ...SRC_BLENDS },
    { kind: "hard", what: "the apples, carrots and ginger", prep: ["Wash and quarter the apples, removing the cores. Scrub the carrots and peel the ginger."], lines: [L("apple", "Apples", "2"), L("carrot", "Carrots", "3"), L("ginger", "Fresh ginger, peeled", "10 g"), ICE()] }
  ),
  juice(
    { id: "beet-orange-ginger-juice", title: "Beet Orange Ginger Juice", diet: [...VEG], taste: ["Sweet", "Spicy", "Fruity"], description: "Beetroot, orange and ginger: deep red, sweet and citrusy, with a spicy finish.", prep: 8, make: 3, difficulty: "Easy", image: pexels(5668199), ...SRC_BLENDS },
    { kind: "hard", what: "the beetroot, oranges and ginger", prep: ["Scrub the beetroot and cut it into chunks. Peel the oranges and the ginger."], lines: [L("beetroot", "Beetroot", "1"), L("orange", "Oranges", "2"), L("ginger", "Fresh ginger, peeled", "10 g"), ICE()] }
  ),
  juice(
    { id: "apple-ginger-juice", title: "Apple Ginger Juice", diet: [...VEG], taste: ["Sweet", "Spicy", "Refreshing"], description: "Crisp green apples with a warming slice of ginger: bright, sharp and very easy to drink — the best-seller at a British cider-press.", prep: 7, make: 3, difficulty: "Easy", image: pexels(5817625), sourceName: "Speciality Food Magazine — apple and ginger juice", sourceUrl: "https://www.specialityfoodmagazine.com/content/product_news/discover_one_of_britains_best_apple_juices" },
    { kind: "hard", what: "the apples and ginger", prep: ["Wash and quarter the apples, removing the cores. Peel the ginger."], lines: [L("apple", "Green apples", "3"), L("ginger", "Fresh ginger, peeled", "10 g"), ICE()] }
  ),
  juice(
    { id: "orange-pineapple-carrot-turmeric-juice", title: "Orange Pineapple Carrot Turmeric Juice", diet: [...VEG], taste: ["Fruity", "Spicy", "Refreshing"], description: "A juice-bar favourite: orange, pineapple and carrot with fresh turmeric and a pinch of black pepper.", prep: 10, make: 3, difficulty: "Medium", image: pexels(11879053), sourceName: "Pressed Juicery — orange turmeric juice", sourceUrl: "https://pressed.com" },
    { kind: "hard", what: "the oranges, pineapple, carrots and turmeric", prep: ["Peel the oranges, cut the skin off the pineapple and chop it, scrub the carrots and peel the turmeric."], lines: [L("orange", "Oranges", "2"), L("pineapple", "Pineapple, chopped", "100 g"), L("carrot", "Carrots", "2"), L("turmeric-root", "Fresh turmeric root", "5 g"), L("black-pepper", "Black pepper, a pinch", "1 pinch", true), ICE()] }
  ),
  juice(
    { id: "ganga-jamuna-juice", title: "Ganga Jamuna Juice (Orange & Mosambi)", diet: [...VEG], taste: ["Fruity", "Sweet", "Refreshing"], description: "Mumbai's two-in-one juice: orange and mosambi (sweet lime) juice poured together, so both colours show.", prep: 10, make: 4, difficulty: "Easy", image: pexels(14510445), sourceName: "Veg Recipes of India — Ganga Jamuna juice", sourceUrl: "https://www.vegrecipesofindia.com/ganga-jamuna-juice/" },
    { kind: "citrus", what: "the oranges and mosambi", prep: ["Wash the oranges and mosambi and keep them separate."], lines: [L("orange", "Oranges", "2"), L("mosambi", "Mosambi (sweet limes)", "2"), L("black-salt", "Black salt, a pinch", "1 pinch", true), ICE()], after: ["Pour the orange juice into a glass, then slowly pour the mosambi juice down the side so the two layers show. Serve cold."] }
  ),
  juice(
    { id: "pineapple-ginger-juice", title: "Pineapple Ginger Juice", diet: [...VEG], taste: ["Fruity", "Spicy", "Refreshing"], description: "Sweet pineapple with fresh ginger and a squeeze of lime: tangy, warming and bright.", prep: 8, make: 3, difficulty: "Easy", image: pexels(20205971), ...SRC_IN },
    { kind: "hard", what: "the pineapple and ginger", prep: ["Cut the skin from the pineapple, cut out the core and chop the flesh. Peel the ginger."], lines: [L("pineapple", "Ripe pineapple", "300 g"), L("ginger", "Fresh ginger, peeled", "10 g"), L("lime", "Lime, a squeeze", "1 tsp", true), ICE()] }
  ),
  juice(
    { id: "watermelon-mint-juice", title: "Watermelon Mint Juice", diet: [...VEG], taste: ["Refreshing", "Herbal", "Sweet"], description: "Watermelon juiced with fresh mint and a squeeze of lime: pink, cooling and herbal.", prep: 7, make: 3, difficulty: "Easy", image: pexels(19523851), ...SRC_IN },
    { kind: "soft", what: "the watermelon and mint", prep: ["Cut the rind off the watermelon and chop the flesh."], lines: [L("watermelon", "Seedless watermelon", "500 g"), L("fresh-mint", "Fresh mint leaves", "10"), L("lime", "Lime, a squeeze", "1 tsp", true), ICE()] }
  ),
  juice(
    { id: "pomegranate-orange-juice", title: "Pomegranate Orange Juice", diet: [...VEG], taste: ["Fruity", "Tangy", "Sweet"], description: "Pomegranate seeds and orange pressed together: ruby, tart and sweet.", prep: 14, make: 4, difficulty: "Medium", image: pexels(15670709), ...SRC_IN },
    { kind: "soft", what: "the pomegranate seeds and oranges", prep: ["Knock the seeds out of the pomegranate into a bowl. Peel the oranges and separate the segments."], lines: [L("pomegranate", "Pomegranate", "1"), L("orange", "Oranges", "2"), ICE()] }
  ),
  juice(
    { id: "green-apple-cucumber-juice", title: "Green Apple Cucumber Juice", diet: [...VEG], taste: ["Refreshing", "Tangy", "Herbal"], description: "Green apple and cucumber with a little lime: cool, crisp and very green.", prep: 7, make: 3, difficulty: "Easy", image: pexels(4443435), ...SRC_IN },
    { kind: "hard", what: "the apples and cucumber", prep: ["Wash the apples and cucumber. Quarter and core the apples and cut the cucumber into chunks."], lines: [L("apple", "Green apples", "2"), L("cucumber", "Cucumber", "1"), L("lime", "Lime, juiced", "1/2"), ICE()] }
  ),
  juice(
    { id: "strawberry-watermelon-juice", title: "Strawberry Watermelon Juice", diet: [...VEG], taste: ["Fruity", "Sweet", "Refreshing"], description: "Strawberries and watermelon blended and strained into a pink, summery juice.", prep: 7, make: 3, difficulty: "Easy", image: pexels(1337825), ...SRC_IN },
    { kind: "soft", what: "the watermelon and strawberries", prep: ["Cut the rind off the watermelon and chop the flesh. Hull the strawberries."], lines: [L("watermelon", "Seedless watermelon", "350 g"), L("strawberry", "Strawberries", "150 g"), L("lime", "Lime, a squeeze", "1 tsp", true), ICE()] }
  ),
  juice(
    { id: "kiwi-apple-juice", title: "Kiwi Apple Juice", diet: [...VEG], taste: ["Tangy", "Fruity", "Refreshing"], description: "Green kiwi and apple juiced together: tart, sweet and bright green.", prep: 7, make: 3, difficulty: "Easy", image: pexels(8679388), ...SRC_IN },
    { kind: "hard", what: "the kiwis and apples", prep: ["Peel the kiwis. Quarter and core the apples."], lines: [L("kiwi", "Kiwis", "3"), L("apple", "Apples", "2"), ICE()] }
  ),
  juice(
    { id: "orange-mint-juice", title: "Orange Mint Juice", diet: [...VEG], taste: ["Fruity", "Herbal", "Refreshing"], description: "Fresh orange juice with crushed mint: sweet, cool and fragrant.", prep: 6, make: 3, difficulty: "Easy", image: pexels(4958861), ...SRC_IN },
    { kind: "citrus", what: "the oranges", prep: ["Wash the oranges. Bruise the mint leaves between your fingers."], lines: [L("orange", "Oranges", "4"), L("fresh-mint", "Fresh mint leaves", "8"), ICE()], after: ["Muddle half the mint in the bottom of a glass, pour in the orange juice and add ice. Garnish with a mint sprig."] }
  ),
  juice(
    { id: "pineapple-orange-juice", title: "Pineapple Orange Juice", diet: [...VEG], taste: ["Fruity", "Tangy", "Sweet"], description: "Pineapple and orange juiced together: a sunny, sweet-and-sharp blend.", prep: 8, make: 3, difficulty: "Easy", image: pexels(32472084), ...SRC_IN },
    { kind: "hard", what: "the pineapple and oranges", prep: ["Cut the skin off the pineapple, cut out the core and chop the flesh. Peel the oranges."], lines: [L("pineapple", "Pineapple", "200 g"), L("orange", "Oranges", "2"), ICE()] }
  ),
  juice(
    { id: "apple-pomegranate-juice", title: "Apple Pomegranate Juice", diet: [...VEG], taste: ["Fruity", "Tangy", "Sweet"], description: "Apple and pomegranate pressed together: ruby, tart and gently sweet.", prep: 14, make: 4, difficulty: "Medium", image: pexels(8679384), ...SRC_IN },
    { kind: "hard", what: "the apples and pomegranate seeds", prep: ["Quarter and core the apples. Knock the seeds out of the pomegranate into a bowl."], lines: [L("apple", "Apples", "2"), L("pomegranate", "Pomegranate", "1"), ICE()] }
  ),
  juice(
    { id: "beet-carrot-lime-juice", title: "Beet Carrot Lime Juice", diet: [...VEG], taste: ["Sweet", "Tangy", "Refreshing"], description: "Beetroot and carrot with a squeeze of lime: earthy, sweet and sharp — a juice-bar best-seller.", prep: 8, make: 3, difficulty: "Easy", image: pexels(9027525), sourceName: "Hamilton Beach — beet, orange, ginger and carrot juice", sourceUrl: "https://blog.hamiltonbeach.com/?p=1463" },
    { kind: "hard", what: "the beetroot and carrots", prep: ["Scrub the beetroot and carrots and cut them into chunks."], lines: [L("beetroot", "Beetroot", "1"), L("carrot", "Carrots", "3"), L("lime", "Lime, juiced", "1"), ICE()] }
  ),
  juice(
    { id: "cucumber-mint-lime-juice", title: "Cucumber Mint Lime Juice", diet: [...VEG], taste: ["Refreshing", "Herbal", "Tangy"], description: "Cucumber with fresh mint and lime: pale green, cooling and crisp.", prep: 7, make: 3, difficulty: "Easy", image: pexels(18142599), ...SRC_IN },
    { kind: "hard", what: "the cucumber and mint", prep: ["Wash the cucumber and cut it into chunks."], lines: [L("cucumber", "Cucumbers", "2"), L("fresh-mint", "Fresh mint leaves", "10"), L("lime", "Lime, juiced", "1"), ICE()] }
  ),
  juice(
    { id: "cranberry-apple-juice", title: "Cranberry Apple Juice", diet: [...VEG], taste: ["Tangy", "Fruity", "Sweet"], description: "Fresh cranberries pressed with sweet apple: ruby, tart and softened by the apple.", prep: 8, make: 3, difficulty: "Easy", image: pexels(5760182), ...SRC_IN },
    { kind: "hard", what: "the apples and cranberries", prep: ["Quarter and core the apples. Rinse the cranberries."], lines: [L("apple", "Sweet apples", "3"), L("cranberries", "Fresh cranberries", "80 g"), ICE()] }
  ),
];
