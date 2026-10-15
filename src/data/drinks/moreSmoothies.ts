import type { Recipe, RecipeIngredient } from "@/types";
import { pexels } from "./builders";
import { smoothie } from "./smoothieBuilders";

/** A second batch of smoothies: more fruit, dessert-style, protein and green blends. */

const L = (pantryId: string, label: string, amount: string, optional = false): RecipeIngredient => ({ pantryId, label, amount, ...(optional ? { optional: true } : {}) });
const ice = (amount = "4 cubes"): RecipeIngredient => L("ice", "Ice cubes", amount);
const yogurt = (g = 100): RecipeIngredient => L("yogurt", "Plain yogurt", `${g} g`);
const VEG = ["Vegan", "Dairy-Free", "Gluten-Free"] as const;
const GF = ["Gluten-Free"] as const;

export const moreSmoothies: Recipe[] = [
  smoothie(
    { id: "blackberry-smoothie", title: "Blackberry Smoothie", diet: [...GF], taste: ["Fruity", "Tangy", "Sweet"], description: "Blackberries blended with banana, yogurt and apple juice: deep purple-pink, tangy and just sweet enough.", prep: 4, make: 2, difficulty: "Easy", image: pexels(5893751), notes: "Strain it if you'd rather not have the seeds." },
    { lines: [L("blackberries", "Blackberries, fresh or frozen", "150 g"), L("banana", "Ripe banana", "1/2"), yogurt(100), L("apple-juice", "Apple juice", "100 ml"), ice()], withIn: "the blackberries, banana, yogurt, juice and ice", mashWhat: "the blackberries and banana" }
  ),
  smoothie(
    { id: "cranberry-orange-smoothie", title: "Cranberry Orange Smoothie", diet: [...GF], taste: ["Tangy", "Fruity", "Refreshing"], description: "Cranberry juice, orange and banana blended with yogurt: tart, bright and ruby red.", prep: 5, make: 2, difficulty: "Easy", image: pexels(11066830) },
    { lines: [L("cranberry-juice", "Cranberry juice, unsweetened", "150 ml"), L("orange", "Orange, peeled and segmented", "1"), L("banana", "Ripe banana", "1/2"), yogurt(80), L("honey", "Honey, to taste", "1 tsp", true), ice()], withIn: "the cranberry juice, orange, banana, yogurt, honey (if using) and ice", mashWhat: "the orange and banana", before: ["Peel the orange and separate the segments, removing any pips."] }
  ),
  smoothie(
    { id: "purple-grape-smoothie", title: "Purple Grape Smoothie", diet: [...GF], taste: ["Fruity", "Sweet", "Refreshing"], description: "Black grapes blended with banana and yogurt: deep purple, juicy and naturally sweet.", prep: 4, make: 2, difficulty: "Easy", image: pexels(31791585), notes: "Seedless grapes are easiest; freeze them first for a thicker drink." },
    { lines: [L("grapes", "Red or black seedless grapes", "200 g"), L("banana", "Ripe banana", "1/2"), yogurt(100), ice()], withIn: "the grapes, banana, yogurt and ice", mashWhat: "the grapes and banana" }
  ),
  smoothie(
    { id: "pear-ginger-smoothie", title: "Pear Ginger Smoothie", diet: [...GF], taste: ["Fruity", "Spicy", "Refreshing"], description: "Ripe pear, fresh ginger and lemon blended with apple juice and yogurt: soft, sweet and warming.", prep: 5, make: 2, difficulty: "Easy", image: pexels(6614843) },
    { lines: [L("pear", "Ripe pear, cored and chopped", "1"), L("ginger", "Fresh ginger, peeled", "5 g"), L("lemon", "Lemon, juiced", "1/2"), L("apple-juice", "Apple juice", "100 ml"), yogurt(80), ice()], withIn: "the pear, ginger, lemon juice, apple juice, yogurt and ice", mashWhat: "the pear and ginger (grated)", before: ["Core the pear and chop it."] }
  ),
  smoothie(
    { id: "cantaloupe-smoothie", title: "Cantaloupe Smoothie", diet: [...GF], taste: ["Fruity", "Sweet", "Refreshing"], description: "Sweet, ripe cantaloupe blended with yogurt and a squeeze of lime — soft, orange and very cooling.", prep: 5, make: 2, difficulty: "Easy", image: pexels(18664060) },
    { lines: [L("cantaloupe", "Ripe cantaloupe, cubed", "250 g"), yogurt(100), L("lime", "Lime, juiced", "1/2"), L("honey", "Honey, to taste", "1 tsp", true), ice()], withIn: "the cantaloupe, yogurt, lime juice, honey (if using) and ice", mashWhat: "the cantaloupe", before: ["Cut the rind and seeds from the cantaloupe and cube the flesh."] }
  ),
  smoothie(
    { id: "guava-smoothie", title: "Guava Smoothie", diet: [...GF], taste: ["Fruity", "Sweet", "Creamy"], description: "Ripe pink guava blended with milk and honey: fragrant, thick and a little musky — a favourite across Latin America and India.", prep: 6, make: 2, difficulty: "Easy", image: pexels(2134037), notes: "Guava seeds are hard: blend, then strain through a sieve for a smooth drink." },
    { lines: [L("guava", "Ripe guavas, chopped", "2"), L("milk", "Cold milk", "200 ml"), L("honey", "Honey, to taste", "1 tbsp"), ice()], withIn: "the guavas, milk, honey and ice", mashWhat: "the guavas", before: ["Chop the guavas, skin and all, discarding any hard stalk end."], after: ["Strain through a sieve into a tall glass, pressing out the pulp, and serve right away."] }
  ),
  smoothie(
    { id: "strawberry-mango-smoothie", title: "Strawberry Mango Smoothie", diet: [...GF], taste: ["Fruity", "Sweet", "Creamy"], description: "Strawberries and mango blended with yogurt and orange juice: a sweet, peachy-pink pairing.", prep: 5, make: 2, difficulty: "Easy", image: pexels(14930480) },
    { lines: [L("strawberry", "Strawberries, hulled", "100 g"), L("mango", "Ripe mango, chopped", "100 g"), yogurt(100), L("orange-juice", "Orange juice", "100 ml"), ice()], withIn: "the strawberries, mango, yogurt, juice and ice", mashWhat: "the strawberries and mango", before: ["Hull the strawberries. Peel and chop the mango."] }
  ),
  smoothie(
    { id: "pineapple-mint-smoothie", title: "Pineapple Mint Smoothie", diet: [...VEG], taste: ["Fruity", "Refreshing", "Herbal"], description: "Pineapple blended with fresh mint, lime and coconut water: cooling, tangy and light.", prep: 5, make: 2, difficulty: "Easy", image: pexels(12698349) },
    { lines: [L("pineapple", "Ripe pineapple, chopped", "200 g"), L("fresh-mint", "Fresh mint leaves", "8"), L("lime", "Lime, juiced", "1/2"), L("coconut-water", "Coconut water", "100 ml"), ice("1/2 cup")], withIn: "the pineapple, mint, lime juice, coconut water and ice", mashWhat: "the pineapple and mint (to a pulp)", before: ["Peel the pineapple, cut out the core and chop the flesh."] }
  ),
  smoothie(
    { id: "pumpkin-pie-smoothie", title: "Pumpkin Pie Smoothie", diet: [...GF], taste: ["Spicy", "Sweet", "Creamy"], description: "Pumpkin purée blended with banana, milk and pumpkin pie spice — it tastes like the pie, in a glass.", prep: 4, make: 2, difficulty: "Easy", image: pexels(34645840), notes: "Use plain pumpkin purée, not ready-made pie filling." },
    { lines: [L("pumpkin-puree", "Pumpkin purée", "100 g"), L("banana", "Ripe banana", "1"), L("milk", "Cold milk", "150 ml"), yogurt(80), L("pumpkin-pie-spice", "Pumpkin pie spice", "1/2 tsp"), L("honey", "Honey or maple syrup", "1 tbsp"), ice()], withIn: "the pumpkin, banana, milk, yogurt, spice, honey and ice", mashWhat: "the pumpkin and banana" }
  ),
  smoothie(
    { id: "key-lime-pie-smoothie", title: "Key Lime Pie Smoothie", taste: ["Tangy", "Creamy", "Sweet"], description: "Lime juice, yogurt, banana and a little avocado blended into a pale green, tart, creamy drink — topped with graham cracker crumbs.", prep: 5, make: 2, difficulty: "Easy", image: pexels(17612833) },
    { lines: [L("lime", "Limes, juiced", "2"), yogurt(120), L("banana", "Ripe banana", "1/2"), L("avocado", "Ripe avocado, flesh only", "1/4"), L("honey", "Honey, to taste", "1 tbsp"), L("milk", "Cold milk", "80 ml"), L("graham-crackers", "Graham cracker, crushed, to top", "1", true), ice()], withIn: "the lime juice, yogurt, banana, avocado, honey, milk and ice", mashWhat: "the avocado and banana", after: ["Pour into a glass and sprinkle the crushed graham cracker over the top."] }
  ),
  smoothie(
    { id: "chocolate-peanut-butter-protein-smoothie", title: "Chocolate Peanut Butter Protein Smoothie", diet: [...GF], taste: ["Rich", "Creamy", "Sweet"], description: "Banana, cocoa, peanut butter and protein powder blended with milk: thick, chocolatey and filling, a post-workout favourite.", prep: 4, make: 2, difficulty: "Easy", image: pexels(3028139) },
    { lines: [L("banana", "Ripe banana", "1"), L("cocoa-powder", "Unsweetened cocoa powder", "1 tbsp"), L("peanut-butter", "Smooth peanut butter", "1 tbsp"), L("protein-powder", "Chocolate or vanilla protein powder", "1 scoop"), L("milk", "Cold milk", "250 ml"), ice()], withIn: "the banana, cocoa, peanut butter, protein powder, milk and ice", blenderOnly: true }
  ),
  smoothie(
    { id: "vanilla-berry-protein-smoothie", title: "Vanilla Berry Protein Smoothie", diet: [...GF], taste: ["Fruity", "Creamy", "Sweet"], description: "Mixed berries, vanilla protein and yogurt blended with milk: pink, thick and balanced.", prep: 4, make: 2, difficulty: "Easy", image: pexels(7656565) },
    { lines: [L("strawberry", "Strawberries, hulled", "60 g"), L("blueberries", "Blueberries", "60 g"), L("protein-powder", "Vanilla protein powder", "1 scoop"), yogurt(80), L("milk", "Cold milk", "200 ml"), ice()], withIn: "the berries, protein powder, yogurt, milk and ice", blenderOnly: true, before: ["Hull the strawberries."] }
  ),
  smoothie(
    { id: "green-goddess-smoothie", title: "Green Goddess Smoothie", diet: [...VEG], taste: ["Herbal", "Refreshing", "Creamy"], description: "Avocado, kale, apple and lime blended with coconut water and mint: green, creamy and fresh-tasting.", prep: 5, make: 2, difficulty: "Easy", image: pexels(33064481) },
    { lines: [L("avocado", "Ripe avocado, flesh only", "1/2"), L("kale", "Kale leaves, stems removed", "30 g"), L("apple", "Green apple, cored and chopped", "1/2"), L("lime", "Lime, juiced", "1/2"), L("fresh-mint", "Fresh mint leaves", "6"), L("coconut-water", "Coconut water", "200 ml"), ice()], withIn: "the coconut water and kale first, then the avocado, apple, lime juice, mint and ice", blenderOnly: true }
  ),
  smoothie(
    { id: "pineapple-ginger-detox-smoothie", title: "Pineapple Ginger Detox Smoothie", diet: [...VEG], taste: ["Tangy", "Spicy", "Refreshing"], description: "Pineapple, cucumber, fresh ginger and lemon blended with water: sharp, green and bright.", prep: 5, make: 2, difficulty: "Easy", image: pexels(10003799) },
    { lines: [L("pineapple", "Ripe pineapple, chopped", "150 g"), L("cucumber", "Cucumber, peeled and chopped", "1/2"), L("ginger", "Fresh ginger, peeled", "5 g"), L("lemon", "Lemon, juiced", "1/2"), L("water", "Cold water", "100 ml"), ice()], withIn: "the water and cucumber first, then the pineapple, ginger, lemon juice and ice", blenderOnly: true }
  ),
  smoothie(
    { id: "pineapple-coconut-smoothie", title: "Pineapple Coconut Smoothie", diet: [...VEG], taste: ["Fruity", "Creamy", "Refreshing"], description: "Pineapple blended with coconut milk and ice: creamy, tropical and dairy-free.", prep: 5, make: 2, difficulty: "Easy", image: pexels(13425813), notes: "A south Indian version simply crushes pineapple with ice and sugar." },
    { lines: [L("pineapple", "Ripe pineapple, chopped", "200 g"), L("coconut-milk", "Coconut milk, chilled", "100 ml"), L("coconut-water", "Coconut water", "50 ml"), ice()], withIn: "the pineapple, coconut milk, coconut water and ice", mashWhat: "the pineapple (chopped finely)", before: ["Peel the pineapple, cut out the core and chop the flesh."] }
  ),
  smoothie(
    { id: "strawberry-slush-smoothie", title: "Strawberry Slush", diet: [...VEG], taste: ["Fruity", "Refreshing", "Sweet"], description: "Frozen strawberries, lemon and a little sugar blended to a frosty, spoonable slush — no dairy.", prep: 4, make: 2, difficulty: "Easy", image: pexels(39536484) },
    { lines: [L("strawberry", "Frozen strawberries", "200 g"), L("lemon", "Lemon, juiced", "1/2"), L("sugar", "Sugar, to taste", "1 tbsp"), L("water", "Cold water", "100 ml"), ice("1/2 cup")], withIn: "the strawberries, lemon juice, sugar, water and ice", blenderOnly: true }
  ),
  smoothie(
    { id: "mango-pineapple-smoothie", title: "Mango Pineapple Smoothie", diet: [...VEG], taste: ["Fruity", "Sweet", "Refreshing"], description: "Mango and pineapple blended with coconut water and lime — golden and sunny, with no dairy.", prep: 5, make: 2, difficulty: "Easy", image: pexels(32672499) },
    { lines: [L("mango", "Ripe mango, chopped", "100 g"), L("pineapple", "Ripe pineapple, chopped", "100 g"), L("coconut-water", "Coconut water", "150 ml"), L("lime", "Lime, juiced", "1/2"), ice()], withIn: "the mango, pineapple, coconut water, lime juice and ice", mashWhat: "the mango and pineapple", before: ["Peel and chop the mango and the pineapple."] }
  ),
  smoothie(
    { id: "blueberry-spinach-smoothie", title: "Blueberry Spinach Smoothie", diet: [...GF], taste: ["Fruity", "Sweet", "Herbal"], description: "Blueberries, spinach and banana blended with milk: a green smoothie that tastes of blueberry.", prep: 4, make: 2, difficulty: "Easy", image: pexels(12049996) },
    { lines: [L("blueberries", "Blueberries, fresh or frozen", "100 g"), L("spinach", "Baby spinach", "30 g"), L("banana", "Ripe banana", "1"), L("milk", "Cold milk", "200 ml"), ice()], withIn: "the milk and spinach first, then the blueberries, banana and ice", blenderOnly: true }
  ),
  smoothie(
    { id: "beet-apple-cinnamon-smoothie", title: "Beet Apple Cinnamon Smoothie", diet: [...GF], taste: ["Sweet", "Spicy", "Fruity"], description: "Cooked beetroot, apple and cinnamon blended with yogurt: earthy, sweet and deep magenta.", prep: 5, make: 2, difficulty: "Easy", image: pexels(4958787), notes: "Use cooked, peeled beetroot (vacuum packs are fine)." },
    { lines: [L("beetroot", "Cooked beetroot, chopped", "80 g"), L("apple", "Apple, cored and chopped", "1"), L("cinnamon", "Ground cinnamon", "1/4 tsp"), yogurt(80), L("apple-juice", "Apple juice", "100 ml"), ice()], withIn: "the beetroot, apple, cinnamon, yogurt, apple juice and ice", blenderOnly: true }
  ),
  smoothie(
    { id: "strawberry-frozen-yogurt-smoothie", title: "Strawberry Frozen Yogurt Smoothie", diet: [...GF], taste: ["Fruity", "Creamy", "Sweet"], description: "Strawberries blended with thick Greek yogurt and honey: pink, tangy and thick as a frozen yogurt.", prep: 4, make: 2, difficulty: "Easy", image: pexels(8963418), notes: "Use frozen strawberries and chilled yogurt for the closest thing to the real thing." },
    { lines: [L("strawberry", "Frozen strawberries", "150 g"), L("greek-yogurt", "Greek yogurt", "150 g"), L("honey", "Honey, to taste", "1 tbsp"), L("milk", "Cold milk", "80 ml")], withIn: "the strawberries, yogurt, honey and milk", mashWhat: "the strawberries (thawed)", blenderOnly: true }
  ),
  smoothie(
    { id: "orange-creamsicle-smoothie", title: "Orange Creamsicle Smoothie", diet: [...GF], taste: ["Fruity", "Creamy", "Sweet"], description: "Orange juice, vanilla yogurt and banana blended together: the orange-and-cream ice lolly taste, no ice cream.", prep: 4, make: 2, difficulty: "Easy", image: pexels(31012761) },
    { lines: [L("orange-juice", "Orange juice", "150 ml"), yogurt(120), L("banana", "Ripe banana", "1/2"), L("vanilla-extract", "Vanilla extract", "1/2 tsp"), L("honey", "Honey, to taste", "1 tsp", true), ice()], withIn: "the juice, yogurt, banana, vanilla, honey (if using) and ice", mashWhat: "the banana" }
  ),
  smoothie(
    { id: "mango-kiwi-smoothie", title: "Mango Kiwi Smoothie", diet: [...VEG], taste: ["Fruity", "Tangy", "Refreshing"], description: "Mango and kiwi blended with orange juice: golden, tangy and sweet.", prep: 5, make: 2, difficulty: "Easy", image: pexels(8504561) },
    { lines: [L("mango", "Ripe mango, chopped", "100 g"), L("kiwi", "Kiwis, peeled", "2"), L("orange-juice", "Orange juice", "100 ml"), ice()], withIn: "the mango, kiwis, orange juice and ice", mashWhat: "the mango and kiwis", before: ["Peel and chop the mango. Peel the kiwis."] }
  ),
];
