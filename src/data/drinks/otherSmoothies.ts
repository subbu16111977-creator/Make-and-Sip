import type { Recipe, RecipeIngredient } from "@/types";
import { pexels } from "./builders";
import { smoothie } from "./smoothieBuilders";

/** Green and vegetable smoothies, breakfast smoothies, lassis and regional blended drinks. */

const L = (pantryId: string, label: string, amount: string, optional = false): RecipeIngredient => ({ pantryId, label, amount, ...(optional ? { optional: true } : {}) });
const ice = (amount = "1/2 cup"): RecipeIngredient => L("ice", "Ice cubes", amount);
const yogurt = (g = 100): RecipeIngredient => L("yogurt", "Plain yogurt", `${g} g`);
const VEG = ["Vegan", "Dairy-Free", "Gluten-Free"] as const;
const GF = ["Gluten-Free"] as const;

export const greenSmoothies: Recipe[] = [
  smoothie(
    { id: "spinach-banana-green-smoothie", title: "Spinach Banana Green Smoothie", diet: [...VEG], taste: ["Fruity", "Sweet", "Herbal"], description: "Baby spinach blended with banana, pineapple and coconut water: bright green, sweet and not at all leafy-tasting.", prep: 4, make: 2, difficulty: "Easy", image: pexels(12049998), notes: "Blend the spinach with the liquid first for a smoother, less speckled drink." },
    { lines: [L("spinach", "Baby spinach, a big handful", "40 g"), L("banana", "Ripe banana", "1"), L("pineapple", "Pineapple, chopped", "100 g"), L("coconut-water", "Coconut water", "200 ml"), ice("4 cubes")], withIn: "the coconut water and spinach first, then the banana, pineapple and ice", blenderOnly: true }
  ),
  smoothie(
    { id: "kale-pineapple-smoothie", title: "Kale Pineapple Smoothie", diet: [...VEG], taste: ["Fruity", "Tangy", "Herbal"], description: "Kale blended with pineapple, apple and ginger: sharp, sweet and clean-tasting.", prep: 5, make: 2, difficulty: "Easy", image: pexels(28909422) },
    { lines: [L("kale", "Kale leaves, stems removed", "40 g"), L("pineapple", "Pineapple, chopped", "150 g"), L("apple", "Apple, cored and chopped", "1/2"), L("ginger", "Fresh ginger", "5 g", true), L("water", "Cold water", "150 ml"), ice("4 cubes")], withIn: "the water and kale first, then the pineapple, apple, ginger and ice", blenderOnly: true, before: ["Strip the kale leaves from the stems."] }
  ),
  smoothie(
    { id: "avocado-spinach-smoothie", title: "Avocado Spinach Smoothie", diet: [...VEG], taste: ["Creamy", "Herbal", "Refreshing"], description: "Avocado and spinach blended with banana and coconut water: pale green, silky and filling.", prep: 5, make: 2, difficulty: "Easy", image: pexels(6614841) },
    { lines: [L("avocado", "Ripe avocado, flesh only", "1/2"), L("spinach", "Baby spinach", "30 g"), L("banana", "Ripe banana", "1/2"), L("coconut-water", "Coconut water", "200 ml"), L("lime", "Lime, juiced", "1/2"), ice("4 cubes")], withIn: "the coconut water and spinach first, then the avocado, banana, lime juice and ice", blenderOnly: true, before: ["Halve the avocado, remove the stone and scoop out the flesh."] }
  ),
  smoothie(
    { id: "cucumber-mint-smoothie", title: "Cucumber Mint Smoothie", diet: [...VEG], taste: ["Refreshing", "Herbal", "Tangy"], description: "Cucumber, mint, lime and green apple blended with ice: cool, clean and refreshing.", prep: 5, make: 2, difficulty: "Easy", image: pexels(5338140) },
    { lines: [L("cucumber", "Cucumber, peeled and chopped", "1/2"), L("fresh-mint", "Fresh mint leaves", "10 g"), L("apple", "Green apple, cored and chopped", "1/2"), L("lime", "Lime, juiced", "1/2"), L("honey", "Honey or sugar, to taste", "1 tsp", true), L("water", "Cold water", "100 ml"), ice()], withIn: "the cucumber, mint, apple, lime juice, honey (if using), water and ice", blenderOnly: true }
  ),
  smoothie(
    { id: "green-apple-ginger-smoothie", title: "Green Apple Ginger Smoothie", diet: [...VEG], taste: ["Tangy", "Spicy", "Refreshing"], description: "Green apple, spinach and fresh ginger blended with lemon: sharp, zingy and awakening.", prep: 5, make: 2, difficulty: "Easy", image: pexels(8228301) },
    { lines: [L("apple", "Green apples, cored and chopped", "2"), L("spinach", "Baby spinach", "30 g"), L("ginger", "Fresh ginger, peeled", "10 g"), L("lemon", "Lemon, juiced", "1/2"), L("water", "Cold water", "150 ml"), ice("4 cubes")], withIn: "the water and spinach first, then the apples, ginger, lemon juice and ice", blenderOnly: true }
  ),
  smoothie(
    { id: "carrot-orange-ginger-smoothie", title: "Carrot Orange Ginger Smoothie", diet: [...VEG], taste: ["Fruity", "Sweet", "Spicy"], description: "Carrot, orange juice and ginger blended smooth: sweet, citrusy and bright orange.", prep: 6, make: 2, difficulty: "Easy", image: pexels(4443453) },
    { lines: [L("carrot", "Carrots, peeled and chopped", "2"), L("orange-juice", "Orange juice", "200 ml"), L("ginger", "Fresh ginger, peeled", "5 g"), L("banana", "Ripe banana, optional", "1/2", true), ice("4 cubes")], withIn: "the orange juice, carrots and ginger first, then the banana (if using) and ice", blenderOnly: true, before: ["Peel the carrots and chop them small, so the blender can break them down."] }
  ),
  smoothie(
    { id: "beetroot-berry-smoothie", title: "Beetroot Berry Smoothie", diet: [...GF], taste: ["Fruity", "Sweet", "Tangy"], description: "Cooked beetroot blended with blueberries, banana and yogurt: deep magenta, earthy and sweet.", prep: 5, make: 2, difficulty: "Easy", image: pexels(4958786), notes: "Use cooked, peeled beetroot (vacuum packs are fine). Raw beetroot is much harder to blend smooth." },
    { lines: [L("beetroot", "Cooked beetroot, chopped", "100 g"), L("blueberries", "Blueberries, fresh or frozen", "100 g"), L("banana", "Ripe banana", "1/2"), yogurt(100), L("milk", "Cold milk", "100 ml"), ice("4 cubes")], withIn: "the beetroot, blueberries, banana, yogurt, milk and ice", blenderOnly: true }
  ),
];

export const breakfastSmoothies: Recipe[] = [
  smoothie(
    { id: "peanut-butter-banana-smoothie", title: "Peanut Butter Banana Smoothie", diet: [...GF], taste: ["Rich", "Creamy", "Sweet"], description: "Banana and peanut butter blended with milk and yogurt: thick, nutty and filling — a breakfast in a glass.", prep: 4, make: 2, difficulty: "Easy", image: pexels(17738825), notes: "Use a frozen banana for a thicker, ice-cream-like texture." },
    { lines: [L("banana", "Ripe banana", "1"), L("peanut-butter", "Smooth peanut butter", "2 tbsp"), yogurt(100), L("milk", "Cold milk", "150 ml"), L("honey", "Honey, to taste", "1 tsp", true), ice("4 cubes")], withIn: "the banana, peanut butter, yogurt, milk, honey (if using) and ice", mashWhat: "the banana and the peanut butter together" }
  ),
  smoothie(
    { id: "banana-bread-smoothie", title: "Banana Bread Smoothie", diet: [...GF], taste: ["Sweet", "Spicy", "Creamy"], description: "Banana, oats, cinnamon and vanilla blended with milk: it tastes like the loaf.", prep: 5, make: 2, difficulty: "Easy", image: pexels(18142614) },
    { lines: [L("banana", "Ripe bananas, the spottier the better", "2"), L("rolled-oats", "Rolled oats", "2 tbsp"), L("milk", "Cold milk", "200 ml"), L("cinnamon", "Ground cinnamon", "1/2 tsp"), L("vanilla-extract", "Vanilla extract", "1/4 tsp"), L("honey", "Honey, to taste", "1 tbsp"), ice("4 cubes")], withIn: "the bananas, oats, milk, cinnamon, vanilla, honey and ice", blenderOnly: true }
  ),
  smoothie(
    { id: "berry-chia-smoothie", title: "Berry Chia Smoothie", diet: [...GF], taste: ["Fruity", "Tangy", "Creamy"], description: "Blueberries and banana blended with yogurt and chia seeds: thick, purple and full of fibre.", prep: 15, make: 2, difficulty: "Easy", image: pexels(556832), notes: "The chia seeds thicken it as it sits, so it gets more pudding-like after 10 minutes." },
    { lines: [L("blueberries", "Blueberries, fresh or frozen", "100 g"), L("banana", "Ripe banana", "1/2"), yogurt(100), L("milk", "Cold milk", "150 ml"), L("chia-seeds", "Chia seeds", "1 tbsp"), L("honey", "Honey, to taste", "1 tsp", true)], withIn: "the blueberries, banana, yogurt, milk, chia seeds and honey (if using)", mashWhat: "the blueberries and banana", before: ["Soak the chia seeds in the milk for 10 minutes."] }
  ),
  smoothie(
    { id: "orange-turmeric-ginger-smoothie", title: "Orange Turmeric Ginger Smoothie", diet: [...VEG], taste: ["Spicy", "Fruity", "Tangy"], description: "Orange, mango, turmeric and fresh ginger blended with black pepper: golden, warming and sharp.", prep: 6, make: 2, difficulty: "Easy", image: pexels(8230024), notes: "A pinch of black pepper helps the body absorb turmeric." },
    { lines: [L("orange-juice", "Orange juice", "200 ml"), L("mango", "Ripe mango, chopped", "100 g"), L("turmeric-powder", "Ground turmeric", "1/2 tsp"), L("ginger", "Fresh ginger, peeled", "5 g"), L("black-pepper", "Black pepper, a pinch", "1 pinch"), ice("4 cubes")], withIn: "the orange juice, mango, turmeric, ginger, pepper and ice", mashWhat: "the mango and ginger (grated)", before: ["Peel and chop the mango, and peel the ginger."] }
  ),
];

export const lassis: Recipe[] = [
  smoothie(
    { id: "mango-lassi", title: "Mango Lassi", diet: [...GF], taste: ["Fruity", "Sweet", "Creamy"], description: "Ripe mango whisked with yogurt and a little milk: India's creamiest, most refreshing mango drink.", prep: 5, make: 2, difficulty: "Easy", image: pexels(14509267), sourceName: "Wikipedia — Lassi", sourceUrl: "https://en.wikipedia.org/wiki/Lassi", notes: "Use mango pulp from a tin if fresh mangoes aren't in season: Alphonso pulp is common." },
    { lines: [L("mango", "Ripe mango, chopped (or 150 g mango pulp)", "150 g"), yogurt(200), L("milk", "Cold milk", "50 ml"), L("sugar", "Sugar, to taste", "1 tbsp"), L("cardamom", "Ground cardamom, a pinch", "1 pinch", true), ice("4 cubes")], withIn: "the mango, yogurt, milk, sugar, cardamom (if using) and ice", mashWhat: "the mango (to a pulp)" }
  ),
  smoothie(
    { id: "sweet-lassi", title: "Sweet Lassi (Meethi Lassi)", diet: [...GF], taste: ["Sweet", "Creamy", "Refreshing"], description: "Punjab's classic: thick yogurt churned with sugar, a little cardamom and rose water, served cold.", prep: 5, make: 3, difficulty: "Easy", image: pexels(8917283), sourceName: "Wikipedia — Lassi", sourceUrl: "https://en.wikipedia.org/wiki/Lassi", notes: "In the Punjab it is often topped with a spoonful of malai (clotted cream) and served in a tall steel glass." },
    { lines: [yogurt(250), L("water", "Cold water or milk", "100 ml"), L("sugar", "Sugar", "2 tbsp"), L("cardamom", "Ground cardamom", "1 pinch"), ice("4 cubes")], withIn: "the yogurt, water, sugar, cardamom and ice", mashWhat: "the yogurt (whisk it until smooth)", handNote: "Whisk the yogurt until completely smooth before adding anything else." }
  ),
  smoothie(
    { id: "salted-lassi", title: "Salted Lassi (Namkeen Lassi)", diet: [...GF], taste: ["Refreshing", "Tangy", "Spicy"], description: "Yogurt whisked with water, salt and roasted cumin: cooling, savoury and the best answer to spicy food.", prep: 4, make: 3, difficulty: "Easy", image: pexels(4475024), sourceName: "Wikipedia — Lassi", sourceUrl: "https://en.wikipedia.org/wiki/Lassi" },
    { lines: [yogurt(250), L("water", "Cold water", "150 ml"), L("salt", "Salt, to taste", "1/4 tsp"), L("cumin-powder", "Roasted cumin powder", "1/2 tsp"), L("fresh-mint", "Fresh mint leaves", "5", true), ice("4 cubes")], withIn: "the yogurt, water, salt, cumin, mint (if using) and ice", mashWhat: "the yogurt (whisk it until completely smooth)" }
  ),
  smoothie(
    { id: "mint-lassi", title: "Mint Lassi (Pudina Lassi)", diet: [...GF], taste: ["Refreshing", "Herbal", "Creamy"], description: "Yogurt blended with fresh mint, a touch of sugar and cumin: pale green, cool and sharp.", prep: 5, make: 3, difficulty: "Easy", image: pexels(20689315) },
    { lines: [yogurt(250), L("fresh-mint", "Fresh mint leaves", "15 g"), L("water", "Cold water", "100 ml"), L("sugar", "Sugar, to taste", "1 tbsp"), L("cumin-powder", "Roasted cumin powder, a pinch", "1 pinch", true), ice("4 cubes")], withIn: "the yogurt, mint, water, sugar, cumin (if using) and ice", mashWhat: "the mint (pound it to a paste with the sugar)" }
  ),
  smoothie(
    { id: "strawberry-lassi", title: "Strawberry Lassi", diet: [...GF], taste: ["Fruity", "Sweet", "Creamy"], description: "Strawberries blended with yogurt and sugar: pink, tangy and creamy.", prep: 5, make: 3, difficulty: "Easy", image: pexels(11410545) },
    { lines: [L("strawberry", "Strawberries, hulled", "120 g"), yogurt(200), L("milk", "Cold milk", "50 ml"), L("sugar", "Sugar, to taste", "1 tbsp"), ice("4 cubes")], withIn: "the strawberries, yogurt, milk, sugar and ice", mashWhat: "the strawberries and sugar", before: ["Hull the strawberries."] }
  ),
  smoothie(
    { id: "banana-lassi", title: "Banana Lassi", diet: [...GF], taste: ["Sweet", "Creamy", "Rich"], description: "Ripe banana blended with yogurt, honey and cardamom: mellow, thick and fragrant.", prep: 4, make: 3, difficulty: "Easy", image: pexels(15481508) },
    { lines: [L("banana", "Ripe banana", "1"), yogurt(200), L("milk", "Cold milk", "80 ml"), L("honey", "Honey, to taste", "1 tbsp"), L("cardamom", "Ground cardamom, a pinch", "1 pinch"), ice("3 cubes")], withIn: "the banana, yogurt, milk, honey, cardamom and ice", mashWhat: "the banana" }
  ),
  smoothie(
    { id: "masala-chaas", title: "Masala Chaas (Spiced Buttermilk)", diet: [...GF], taste: ["Refreshing", "Tangy", "Spicy"], description: "Thin, cooling buttermilk spiced with roasted cumin, ginger, mint and coriander: India's everyday digestif.", prep: 5, make: 3, difficulty: "Easy", image: pexels(8489749), sourceName: "Wikipedia — Buttermilk", sourceUrl: "https://en.wikipedia.org/wiki/Buttermilk", notes: "If you don't have buttermilk, whisk 100 g of yogurt with 200 ml of cold water." },
    { lines: [L("buttermilk", "Buttermilk, cold (or 100 g yogurt whisked with 200 ml water)", "250 ml"), L("cumin-powder", "Roasted cumin powder", "1/2 tsp"), L("black-salt", "Black salt, or ordinary salt", "1/4 tsp"), L("ginger", "Fresh ginger, grated", "3 g"), L("fresh-mint", "Fresh mint leaves", "5"), L("coriander-leaves", "Fresh coriander leaves", "5 g")], withIn: "the buttermilk, cumin, salt, ginger, mint and coriander", mashWhat: "the ginger, mint and coriander (to a paste, with the salt)", after: ["Pour into a glass over ice and drink cold, topped with a pinch of cumin."] }
  ),
  smoothie(
    { id: "saffron-pistachio-lassi", title: "Saffron Pistachio Lassi", diet: [...GF], taste: ["Sweet", "Creamy", "Rich"], description: "Thick yogurt churned with saffron, cardamom and crushed pistachios — the festive, kesar-pista lassi.", prep: 10, make: 3, difficulty: "Easy", image: pexels(18142611), notes: "Soak the saffron in a spoonful of warm milk for 10 minutes first, to release the colour." },
    { lines: [yogurt(250), L("milk", "Cold milk", "50 ml"), L("saffron", "Saffron threads", "6"), L("pistachios", "Pistachios, crushed", "1 tbsp"), L("sugar", "Sugar", "2 tbsp"), L("cardamom", "Ground cardamom", "1 pinch"), ice("3 cubes")], withIn: "the yogurt, milk, saffron milk, sugar, cardamom and ice", mashWhat: "the yogurt (whisk it smooth)", before: ["Soak the saffron in 1 tbsp of warm milk for 10 minutes."], after: ["Pour into a tall glass and top with the crushed pistachios."] }
  ),
];

export const regionalSmoothies: Recipe[] = [
  smoothie(
    { id: "acai-berry-smoothie", title: "Açaí Berry Smoothie", diet: [...VEG], taste: ["Fruity", "Rich", "Refreshing"], description: "Frozen açaí blended with banana and berries: deep purple, earthy and not too sweet — Brazil's most famous export.", prep: 5, make: 2, difficulty: "Easy", image: pexels(20348546), sourceName: "Infor — most popular smoothie in North America", sourceUrl: "https://www.infor.com/blog/infographic-the-most-popular-smoothie-in-north-america-re-post", notes: "Frozen açaí purée comes in unsweetened packs. Use a thick blend and eat it with a spoon for a bowl." },
    { lines: [L("acai-puree", "Frozen açaí purée pack", "100 g"), L("banana", "Ripe banana", "1/2"), L("blueberries", "Blueberries, fresh or frozen", "50 g"), L("apple-juice", "Apple juice", "150 ml")], withIn: "the açaí, banana, blueberries and apple juice", blenderOnly: true }
  ),
  smoothie(
    { id: "licuado-de-platano", title: "Licuado de Plátano", diet: [...GF], taste: ["Sweet", "Creamy", "Rich"], description: "Mexico's banana licuado: ripe banana blended with cold milk and a little cinnamon and honey, sold from street stalls.", prep: 4, make: 2, difficulty: "Easy", image: pexels(30216065), sourceName: "Wikipedia — Licuado", sourceUrl: "https://en.wikipedia.org/wiki/Licuado", notes: "A licuado uses a milk base, where an American smoothie often uses juice or sherbet." },
    { lines: [L("banana", "Ripe banana", "1"), L("milk", "Cold whole milk", "250 ml"), L("honey", "Honey or sugar, to taste", "1 tbsp"), L("cinnamon", "Ground cinnamon", "1/4 tsp"), ice("3 cubes")], withIn: "the banana, milk, honey, cinnamon and ice", mashWhat: "the banana" }
  ),
  smoothie(
    { id: "vitamina-de-abacate", title: "Vitamina de Abacate", diet: [...GF], taste: ["Creamy", "Sweet", "Rich"], description: "Brazil's avocado vitamina: ripe avocado blended with milk and sugar until smooth, thick and sweet.", prep: 5, make: 2, difficulty: "Easy", image: pexels(15358548), sourceName: "Wikipedia — Licuado", sourceUrl: "https://en.wikipedia.org/wiki/Licuado", notes: "In Brazil the avocado is treated as a fruit, and this is eaten like a dessert, often with a squeeze of lime." },
    { lines: [L("avocado", "Ripe avocado, flesh only", "1/2"), L("milk", "Cold whole milk", "250 ml"), L("sugar", "Sugar, to taste", "2 tbsp"), L("lime", "Lime, juiced", "1/2", true), ice("3 cubes")], withIn: "the avocado, milk, sugar, lime juice (if using) and ice", mashWhat: "the avocado and sugar", before: ["Halve the avocado, remove the stone and scoop out the flesh."] }
  ),
  smoothie(
    { id: "licuado-de-fresa", title: "Licuado de Fresa", diet: [...GF], taste: ["Fruity", "Sweet", "Creamy"], description: "Mexico's strawberry licuado: strawberries blended with cold milk and sugar into a pale pink drink.", prep: 4, make: 2, difficulty: "Easy", image: pexels(8284685), sourceName: "Wikipedia — Licuado", sourceUrl: "https://en.wikipedia.org/wiki/Licuado" },
    { lines: [L("strawberry", "Strawberries, hulled", "150 g"), L("milk", "Cold whole milk", "250 ml"), L("sugar", "Sugar, to taste", "1 tbsp"), L("vanilla-extract", "Vanilla extract", "1/4 tsp", true), ice("3 cubes")], withIn: "the strawberries, milk, sugar, vanilla (if using) and ice", mashWhat: "the strawberries and sugar", before: ["Hull the strawberries."] }
  ),
  smoothie(
    { id: "horchata-smoothie", title: "Horchata Smoothie", diet: [...VEG], taste: ["Sweet", "Spicy", "Creamy"], description: "Rice milk blended with cinnamon, vanilla and banana, served over ice — a thick, blended take on Mexico's rice drink.", prep: 5, make: 2, difficulty: "Easy", image: pexels(34566510), sourceName: "Wikipedia — Horchata", sourceUrl: "https://en.wikipedia.org/wiki/Horchata", notes: "Traditional horchata is made by soaking rice in water overnight. Rice milk is the shortcut." },
    { lines: [L("rice-milk", "Rice milk, cold", "250 ml"), L("banana", "Ripe banana", "1/2"), L("cinnamon", "Ground cinnamon", "1/2 tsp"), L("vanilla-extract", "Vanilla extract", "1/2 tsp"), L("sugar", "Sugar, to taste", "1 tbsp"), ice("4 cubes")], withIn: "the rice milk, banana, cinnamon, vanilla, sugar and ice", mashWhat: "the banana", after: ["Pour into a glass and dust with a little cinnamon."] }
  ),
];
