import type { Recipe, RecipeIngredient } from "@/types";
import { pexels } from "./builders";
import { smoothie } from "./smoothieBuilders";

/** Classic fruit smoothies and tropical blends. */

const L = (pantryId: string, label: string, amount: string, optional = false): RecipeIngredient => ({ pantryId, label, amount, ...(optional ? { optional: true } : {}) });
const ice = (amount = "1/2 cup"): RecipeIngredient => L("ice", "Ice cubes", amount);
const yogurt = (g = 100): RecipeIngredient => L("yogurt", "Plain yogurt", `${g} g`);
const honey = (): RecipeIngredient => L("honey", "Honey, to taste", "1 tsp", true);
const VEG = ["Vegan", "Dairy-Free", "Gluten-Free"] as const;
const GF = ["Gluten-Free"] as const;

export const fruitSmoothies: Recipe[] = [
  smoothie(
    { id: "strawberry-banana-smoothie", title: "Strawberry Banana Smoothie", diet: [...GF], taste: ["Fruity", "Sweet", "Creamy"], description: "Strawberries, banana, yogurt and a splash of juice: the best-selling smoothie at the big chains, and the one most people start with.", prep: 5, make: 2, difficulty: "Easy", image: pexels(29653641), sourceName: "The Donut Whole — what is the best-selling smoothie?", sourceUrl: "https://www.thedonutwhole.com/what-is-the-selling-smoothie/", notes: "Freeze the banana in slices first for a thicker, colder smoothie with less ice." },
    { lines: [L("strawberry", "Strawberries, hulled", "150 g"), L("banana", "Ripe banana", "1"), yogurt(100), L("orange-juice", "Orange juice", "100 ml"), ice(), honey()], withIn: "the strawberries, banana, yogurt, juice, ice and honey (if using)", mashWhat: "the strawberries and banana", before: ["Hull the strawberries and peel the banana."] }
  ),
  smoothie(
    { id: "strawberry-smoothie", title: "Strawberry Smoothie", diet: [...GF], taste: ["Fruity", "Sweet", "Creamy"], description: "Ripe strawberries blended with yogurt and a little milk: pink, tangy and fresh — the fruit most searched for in smoothies.", prep: 5, make: 2, difficulty: "Easy", image: pexels(17612783), sourceName: "Pantry & Larder — most popular smoothie flavours", sourceUrl: "https://pantryandlarder.com/most-popular-smoothie-flavors/" },
    { lines: [L("strawberry", "Strawberries, hulled", "200 g"), yogurt(120), L("milk", "Cold milk", "100 ml"), ice(), L("honey", "Honey, to taste", "1 tbsp", true)], withIn: "the strawberries, yogurt, milk, ice and honey (if using)", mashWhat: "the strawberries", before: ["Hull the strawberries."] }
  ),
  smoothie(
    { id: "banana-smoothie", title: "Banana Smoothie", diet: [...GF], taste: ["Sweet", "Creamy", "Rich"], description: "Ripe banana, yogurt and milk blended thick: the simplest creamy smoothie, mildly sweet and filling.", prep: 4, make: 2, difficulty: "Easy", image: pexels(4051785) },
    { lines: [L("banana", "Ripe bananas", "2"), yogurt(100), L("milk", "Cold milk", "150 ml"), L("honey", "Honey, to taste", "1 tsp", true), L("cinnamon", "Ground cinnamon, a pinch", "1 pinch", true), ice("4 cubes")], withIn: "the bananas, yogurt, milk, honey, cinnamon and ice", mashWhat: "the bananas" }
  ),
  smoothie(
    { id: "blueberry-smoothie", title: "Blueberry Smoothie", diet: [...GF], taste: ["Fruity", "Sweet", "Tangy"], description: "Blueberries blended with banana and yogurt: deep purple, mildly tart and full of colour.", prep: 4, make: 2, difficulty: "Easy", image: pexels(11136335) },
    { lines: [L("blueberries", "Blueberries, fresh or frozen", "150 g"), L("banana", "Ripe banana", "1"), yogurt(100), L("milk", "Cold milk", "100 ml"), honey(), ice("4 cubes")], withIn: "the blueberries, banana, yogurt, milk, honey (if using) and ice", mashWhat: "the blueberries and banana" }
  ),
  smoothie(
    { id: "mixed-berry-smoothie", title: "Mixed Berry Smoothie", diet: [...GF], taste: ["Fruity", "Tangy", "Sweet"], description: "Strawberries, raspberries and blueberries blended with banana and apple juice: bright, tart and berry-sweet.", prep: 5, make: 2, difficulty: "Easy", image: pexels(11020888) },
    { lines: [L("strawberry", "Strawberries, hulled", "80 g"), L("raspberries", "Raspberries", "50 g"), L("blueberries", "Blueberries", "50 g"), L("banana", "Ripe banana", "1/2"), L("apple-juice", "Apple juice", "150 ml"), yogurt(80), ice("4 cubes")], withIn: "the berries, banana, juice, yogurt and ice", mashWhat: "the berries and banana", before: ["Hull the strawberries."] }
  ),
  smoothie(
    { id: "mango-smoothie", title: "Mango Smoothie", diet: [...GF], taste: ["Fruity", "Sweet", "Creamy"], description: "Ripe mango blended with yogurt and orange juice: thick, golden and sweet.", prep: 5, make: 2, difficulty: "Easy", image: pexels(8813997), notes: "Frozen mango chunks give the thickest result and need no ice." },
    { lines: [L("mango", "Ripe mango, peeled and chopped", "200 g"), yogurt(100), L("orange-juice", "Orange juice", "100 ml"), ice("4 cubes"), honey()], withIn: "the mango, yogurt, juice, ice and honey (if using)", mashWhat: "the mango", before: ["Peel the mango and cut the flesh from the stone."] }
  ),
  smoothie(
    { id: "peach-smoothie", title: "Peach Smoothie", diet: [...GF], taste: ["Fruity", "Sweet", "Creamy"], description: "Ripe peaches blended with yogurt, vanilla and a little honey — soft, summery and gently sweet.", prep: 6, make: 2, difficulty: "Easy", image: pexels(32662590), notes: "Peel peaches by dropping them into boiling water for 30 seconds first, then into cold water." },
    { lines: [L("peach", "Ripe peaches, peeled and stoned", "2"), yogurt(120), L("milk", "Cold milk", "80 ml"), L("vanilla-extract", "Vanilla extract", "1/4 tsp", true), L("honey", "Honey, to taste", "1 tbsp"), ice("4 cubes")], withIn: "the peaches, yogurt, milk, vanilla, honey and ice", mashWhat: "the peaches", before: ["Peel the peaches, remove the stones and chop the flesh."] }
  ),
  smoothie(
    { id: "pineapple-smoothie", title: "Pineapple Smoothie", diet: [...VEG], taste: ["Fruity", "Tangy", "Refreshing"], description: "Sweet pineapple blended with coconut water and ice: bright, tangy and light, with no dairy.", prep: 5, make: 2, difficulty: "Easy", image: pexels(18142612) },
    { lines: [L("pineapple", "Ripe pineapple, chopped", "200 g"), L("coconut-water", "Coconut water", "150 ml"), L("lime", "Lime, juiced", "1/2", true), ice()], withIn: "the pineapple, coconut water, lime and ice", mashWhat: "the pineapple (chopped as finely as you can)", before: ["Peel the pineapple, cut out the core and chop the flesh."] }
  ),
  smoothie(
    { id: "orange-banana-smoothie", title: "Orange Banana Smoothie", diet: [...GF], taste: ["Fruity", "Sweet", "Refreshing"], description: "Orange juice, banana and yogurt: a classic breakfast smoothie, sweet and full of citrus.", prep: 4, make: 2, difficulty: "Easy", image: pexels(33683902) },
    { lines: [L("orange-juice", "Orange juice", "200 ml"), L("banana", "Ripe banana", "1"), yogurt(100), ice("4 cubes")], withIn: "the juice, banana, yogurt and ice", mashWhat: "the banana" }
  ),
  smoothie(
    { id: "apple-cinnamon-smoothie", title: "Apple Cinnamon Smoothie", diet: [...GF], taste: ["Sweet", "Spicy", "Creamy"], description: "Apple, banana, yogurt and cinnamon blended together — like apple pie in a glass.", prep: 5, make: 2, difficulty: "Easy", image: pexels(8679186) },
    { lines: [L("apple", "Apple, cored and chopped", "1"), L("banana", "Ripe banana", "1/2"), yogurt(100), L("milk", "Cold milk", "100 ml"), L("cinnamon", "Ground cinnamon", "1/2 tsp"), L("honey", "Honey", "1 tsp"), ice("4 cubes")], withIn: "the apple, banana, yogurt, milk, cinnamon, honey and ice", mashWhat: "the apple (grated) and banana", before: ["Core the apple and chop it."] }
  ),
  smoothie(
    { id: "raspberry-smoothie", title: "Raspberry Smoothie", diet: [...GF], taste: ["Fruity", "Tangy", "Sweet"], description: "Raspberries blended with yogurt and a little honey: bright pink and pleasantly sharp.", prep: 4, make: 2, difficulty: "Easy", image: pexels(38161155), notes: "Strain it through a sieve if you don't like the seeds." },
    { lines: [L("raspberries", "Raspberries, fresh or frozen", "150 g"), yogurt(120), L("milk", "Cold milk", "100 ml"), L("honey", "Honey, to taste", "1 tbsp"), ice("4 cubes")], withIn: "the raspberries, yogurt, milk, honey and ice", mashWhat: "the raspberries" }
  ),
  smoothie(
    { id: "watermelon-smoothie", title: "Watermelon Smoothie", diet: [...VEG], taste: ["Refreshing", "Sweet", "Fruity"], description: "Chilled watermelon with lime and mint, blended with ice: the lightest, most hydrating smoothie.", prep: 5, make: 2, difficulty: "Easy", image: pexels(4113138) },
    { lines: [L("watermelon", "Seedless watermelon, cubed", "300 g"), L("lime", "Lime, juiced", "1/2"), L("fresh-mint", "Fresh mint leaves", "6", true), ice()], withIn: "the watermelon, lime juice, mint and ice", mashWhat: "the watermelon", before: ["Cut the rind from the watermelon and cube the flesh."] }
  ),
  smoothie(
    { id: "papaya-smoothie", title: "Papaya Smoothie", diet: [...GF], taste: ["Fruity", "Sweet", "Creamy"], description: "Ripe papaya blended with yogurt and lime: soft, orange and gently sweet — a staple of tropical breakfasts.", prep: 5, make: 2, difficulty: "Easy", image: pexels(8181521) },
    { lines: [L("papaya", "Ripe papaya, seeded and chopped", "200 g"), yogurt(100), L("lime", "Lime, juiced", "1/2"), L("honey", "Honey, to taste", "1 tbsp", true), ice("4 cubes")], withIn: "the papaya, yogurt, lime juice, honey (if using) and ice", mashWhat: "the papaya", before: ["Halve the papaya, scoop out the seeds and cut the flesh from the skin."] }
  ),
  smoothie(
    { id: "kiwi-strawberry-smoothie", title: "Kiwi Strawberry Smoothie", diet: [...GF], taste: ["Fruity", "Tangy", "Refreshing"], description: "Kiwi and strawberries blended with banana and apple juice — tart, sweet and bright.", prep: 5, make: 2, difficulty: "Easy", image: pexels(7937485) },
    { lines: [L("kiwi", "Kiwis, peeled", "2"), L("strawberry", "Strawberries, hulled", "100 g"), L("banana", "Ripe banana", "1/2"), L("apple-juice", "Apple juice", "150 ml"), ice("4 cubes")], withIn: "the kiwi, strawberries, banana, juice and ice", mashWhat: "the kiwi, strawberries and banana", before: ["Peel the kiwis and hull the strawberries."] }
  ),
  smoothie(
    { id: "pomegranate-berry-smoothie", title: "Pomegranate Berry Smoothie", diet: [...GF], taste: ["Fruity", "Tangy", "Refreshing"], description: "Pomegranate juice blended with mixed berries and yogurt: deep red, tart and fresh.", prep: 4, make: 2, difficulty: "Easy", image: pexels(7656390) },
    { lines: [L("pomegranate", "Pomegranate juice", "150 ml"), L("blueberries", "Blueberries, fresh or frozen", "75 g"), L("strawberry", "Strawberries, hulled", "75 g"), yogurt(100), honey(), ice("4 cubes")], withIn: "the pomegranate juice, berries, yogurt, honey (if using) and ice", mashWhat: "the berries", before: ["Hull the strawberries."] }
  ),
  // --- Tropical ---
  smoothie(
    { id: "tropical-blast-smoothie", title: "Tropical Blast Smoothie", diet: [...VEG], taste: ["Fruity", "Sweet", "Refreshing"], description: "Mango, pineapple and banana blended with coconut water: golden, sweet and sunny.", prep: 6, make: 2, difficulty: "Easy", image: pexels(8181545) },
    { lines: [L("mango", "Ripe mango, chopped", "100 g"), L("pineapple", "Pineapple, chopped", "100 g"), L("banana", "Ripe banana", "1/2"), L("coconut-water", "Coconut water", "150 ml"), L("lime", "Lime, juiced", "1/2", true), ice()], withIn: "the mango, pineapple, banana, coconut water, lime and ice", mashWhat: "the mango, pineapple and banana", before: ["Peel and chop the mango and pineapple."] }
  ),
  smoothie(
    { id: "virgin-pina-colada-smoothie", title: "Virgin Piña Colada Smoothie", diet: [...VEG], taste: ["Fruity", "Creamy", "Sweet"], description: "Pineapple blended with coconut milk and ice: creamy, tropical and entirely alcohol-free.", prep: 5, make: 2, difficulty: "Easy", image: pexels(10986589) },
    { lines: [L("pineapple", "Pineapple, chopped", "200 g"), L("coconut-milk", "Coconut milk, chilled", "120 ml"), L("sugar", "Sugar, to taste", "1 tsp", true), ice()], withIn: "the pineapple, coconut milk, sugar (if using) and ice", mashWhat: "the pineapple (chopped finely)", before: ["Peel the pineapple, cut out the core and chop the flesh."], after: ["Pour into a tall glass, add a wedge of pineapple on the rim and serve right away."] }
  ),
  smoothie(
    { id: "mango-passion-fruit-smoothie", title: "Mango Passion Fruit Smoothie", diet: [...GF], taste: ["Fruity", "Tangy", "Sweet"], description: "Mango and passion fruit pulp blended with yogurt and orange juice: sweet with a tangy, perfumed edge.", prep: 6, make: 2, difficulty: "Easy", image: pexels(5817627) },
    { lines: [L("mango", "Ripe mango, chopped", "150 g"), L("passion-fruit", "Passion fruit pulp", "3 tbsp"), yogurt(100), L("orange-juice", "Orange juice", "80 ml"), ice("4 cubes")], withIn: "the mango, passion fruit pulp, yogurt, juice and ice", mashWhat: "the mango", before: ["Peel and chop the mango. Scoop the pulp from the passion fruit."] }
  ),
  smoothie(
    { id: "dragon-fruit-smoothie", title: "Dragon Fruit Smoothie", diet: [...VEG], taste: ["Fruity", "Sweet", "Refreshing"], description: "Pink dragon fruit blended with banana and coconut water: a vivid magenta smoothie with a subtle, kiwi-like sweetness.", prep: 5, make: 2, difficulty: "Easy", image: pexels(12144880) },
    { lines: [L("dragon-fruit", "Red dragon fruit, peeled and chopped", "200 g"), L("banana", "Ripe banana", "1/2"), L("coconut-water", "Coconut water", "150 ml"), ice()], withIn: "the dragon fruit, banana, coconut water and ice", mashWhat: "the dragon fruit and banana", before: ["Cut the dragon fruit in half and scoop the flesh from the skin."] }
  ),
  smoothie(
    { id: "coconut-mango-smoothie", title: "Coconut Mango Smoothie", diet: [...VEG], taste: ["Fruity", "Creamy", "Sweet"], description: "Mango and coconut milk blended with a little chia: creamy, tropical and dairy-free.", prep: 5, make: 2, difficulty: "Easy", image: pexels(20590289) },
    { lines: [L("mango", "Ripe mango, chopped", "200 g"), L("coconut-milk", "Coconut milk, chilled", "150 ml"), L("chia-seeds", "Chia seeds, to top", "1 tsp", true), L("lime", "Lime, juiced", "1/2", true), ice("4 cubes")], withIn: "the mango, coconut milk, lime and ice", mashWhat: "the mango", before: ["Peel and chop the mango."], after: ["Pour into a glass, sprinkle with chia seeds and serve right away."] }
  ),
  smoothie(
    { id: "peach-mango-smoothie", title: "Peach Mango Smoothie", diet: [...GF], taste: ["Fruity", "Sweet", "Creamy"], description: "Peach and mango blended with yogurt and orange juice — soft, golden and sweet.", prep: 6, make: 2, difficulty: "Easy", image: pexels(14930492) },
    { lines: [L("peach", "Ripe peach, peeled and stoned", "1"), L("mango", "Ripe mango, chopped", "100 g"), yogurt(100), L("orange-juice", "Orange juice", "100 ml"), ice("4 cubes")], withIn: "the peach, mango, yogurt, juice and ice", mashWhat: "the peach and mango", before: ["Peel and chop the peach and the mango."] }
  ),
];
