import type { Recipe, RecipeIngredient } from "@/types";
import { drink, pexels } from "./builders";
import { iceCreamShake } from "./shakeBuilders";

/** Classic milkshakes (about three scoops to 150 ml of milk) and thick shakes (more ice cream, little milk). */

const vanilla = (g: number, label = "Vanilla ice cream"): RecipeIngredient => ({ pantryId: "vanilla-ice-cream", label: `${label}, ${Math.round(g / 60)} ${Math.round(g / 60) === 1 ? "scoop" : "scoops"}`, amount: `${g} g` });
const syrup = (tbsp: number, label = "Chocolate syrup"): RecipeIngredient => ({ pantryId: "chocolate-syrup", label, amount: `${tbsp} tbsp` });
const cream = (label = "Whipped cream, to top"): RecipeIngredient => ({ pantryId: "heavy-cream", label, amount: "30 ml", optional: true });
const GF = ["Gluten-Free"] as const;

export const classicShakes: Recipe[] = [
  iceCreamShake(
    { id: "vanilla-milkshake", title: "Vanilla Milkshake", diet: [...GF], taste: ["Sweet", "Creamy"], description: "Ice cream and cold milk blended until smooth — the shake every other flavour starts from.", prep: 3, make: 2, difficulty: "Easy", image: pexels(18142623), notes: "Keep the milk cold and use real vanilla ice cream: it is nearly all the flavour." },
    { iceCream: vanilla(180), milkMl: 150, lines: [{ pantryId: "vanilla-extract", label: "Vanilla extract", amount: "1/2 tsp", optional: true }], withIn: "and the vanilla extract (if using)" }
  ),
  iceCreamShake(
    { id: "chocolate-milkshake", title: "Chocolate Milkshake", diet: [...GF], taste: ["Sweet", "Creamy", "Rich"], description: "Vanilla ice cream, cold milk and chocolate syrup, blended thick and topped with cream — the diner standard.", prep: 3, make: 2, difficulty: "Easy", image: pexels(18142621) },
    { iceCream: vanilla(180), milkMl: 150, lines: [syrup(3), cream()], withIn: "and the chocolate syrup", after: ["Pour into a tall glass, top with whipped cream and a drizzle of syrup, and serve with a wide straw."] }
  ),
  iceCreamShake(
    { id: "strawberry-milkshake", title: "Strawberry Milkshake", diet: [...GF], taste: ["Fruity", "Sweet", "Creamy"], description: "Ripe strawberries blended with vanilla ice cream and milk — pink, fresh and not too sweet.", prep: 5, make: 2, difficulty: "Easy", image: pexels(39344590), notes: "The riper the strawberries, the better the shake. A teaspoon of sugar brings out the flavour of a tart berry." },
    {
      iceCream: vanilla(180), milkMl: 120,
      lines: [{ pantryId: "strawberry", label: "Strawberries, hulled", amount: "100 g" }, { pantryId: "sugar", label: "Sugar, if the berries are tart", amount: "1 tsp", optional: true }],
      before: ["Hull the strawberries and slice them."], withIn: "the strawberries and the sugar (if using)",
      handBefore: ["Mash the strawberries with the sugar in the bowl until they are a juicy pulp — a potato masher or fork works."],
    }
  ),
  iceCreamShake(
    { id: "banana-milkshake", title: "Banana Milkshake", diet: [...GF], taste: ["Fruity", "Sweet", "Creamy"], description: "A ripe banana blended with ice cream and cold milk: mellow, sweet and very smooth.", prep: 3, make: 2, difficulty: "Easy", image: pexels(14994697), notes: "Freeze the banana in slices first for an even thicker shake." },
    {
      iceCream: vanilla(120), milkMl: 200,
      lines: [{ pantryId: "banana", label: "Ripe banana", amount: "1" }, { pantryId: "honey", label: "Honey, to taste", amount: "1 tsp", optional: true }],
      withIn: "the banana and the honey (if using)", handBefore: ["Mash the banana in the bowl with a fork until it is completely smooth, with no lumps."],
    }
  ),
  iceCreamShake(
    { id: "coffee-milkshake", type: "Coffee", title: "Coffee Milkshake", diet: [...GF], taste: ["Rich", "Creamy", "Sweet"], description: "Strong coffee and vanilla ice cream blended with cold milk — like iced coffee made dessert.", prep: 4, make: 2, difficulty: "Easy", image: pexels(5314623), notes: "Dissolve the coffee in a little hot water first: it won't dissolve in cold milk." },
    {
      iceCream: vanilla(180), milkMl: 120,
      lines: [{ pantryId: "instant-coffee", label: "Instant coffee", amount: "2 tsp" }, { pantryId: "chocolate-syrup", label: "Chocolate syrup, optional", amount: "1 tbsp", optional: true }],
      before: ["Stir the instant coffee into 2 tbsp of hot water until dissolved, and let it cool for a couple of minutes."], withIn: "and the coffee",
    }
  ),
  iceCreamShake(
    { id: "cookies-and-cream-milkshake", title: "Cookies & Cream Milkshake", taste: ["Sweet", "Creamy", "Rich"], description: "Vanilla ice cream blended with chocolate sandwich cookies, topped with more crumbs — the second most-searched shake in the US.", prep: 4, make: 2, difficulty: "Easy", image: pexels(30660270), sourceName: "RTA Outdoor Living — most popular milkshake flavours", sourceUrl: "https://rtaoutdoorliving.com/most-popular-milkshake/" },
    {
      iceCream: vanilla(180), milkMl: 150, lines: [{ pantryId: "chocolate-sandwich-cookies", label: "Chocolate sandwich cookies", amount: "4" }],
      before: ["Crush three of the cookies roughly in a bag with a rolling pin. Keep the fourth whole."], withIn: "and the crushed cookies (pulse only briefly, so there are still pieces)",
      after: ["Pour into a tall glass, top with the whole cookie, and serve with a wide straw and a long spoon."],
    }
  ),
  iceCreamShake(
    { id: "chocolate-malted-milkshake", title: "Chocolate Malted Milkshake", taste: ["Rich", "Sweet", "Creamy"], description: "A chocolate shake with malted milk powder: nutty, toasty and the old soda-fountain favourite, known as a 'malt'.", prep: 3, make: 2, difficulty: "Easy", image: pexels(36937762), notes: "Malted milk powder is the whole difference — it adds a toasty, biscuit-like note." },
    { iceCream: vanilla(180), milkMl: 150, lines: [syrup(2), { pantryId: "malted-milk-powder", label: "Malted milk powder", amount: "2 tbsp" }], withIn: "the chocolate syrup and the malted milk powder" }
  ),
  iceCreamShake(
    { id: "black-and-white-shake", title: "Black & White Shake", diet: [...GF], taste: ["Rich", "Sweet", "Creamy"], description: "Vanilla ice cream with chocolate syrup swirled through it — two flavours in one glass, a New York soda-fountain classic.", prep: 3, make: 2, difficulty: "Easy", image: pexels(10117396), sourceName: "Wikipedia — Milkshake", sourceUrl: "https://en.wikipedia.org/wiki/Milkshake" },
    {
      iceCream: vanilla(180), milkMl: 100, lines: [syrup(3)], before: ["Drizzle 1 tablespoon of the chocolate syrup in a ribbon down the inside of a tall glass."], withIn: "and 1 tablespoon of the chocolate syrup",
      after: ["Pour the shake into the glass, swirl the last tablespoon of syrup on top and serve."],
    }
  ),
  iceCreamShake(
    { id: "butterscotch-milkshake", title: "Butterscotch Milkshake", diet: [...GF], taste: ["Sweet", "Creamy", "Rich"], description: "Vanilla ice cream and milk blended with butterscotch sauce — buttery, caramelised and a favourite across India.", prep: 3, make: 2, difficulty: "Easy", image: pexels(7091585) },
    { iceCream: vanilla(180), milkMl: 150, lines: [{ pantryId: "butterscotch-sauce", label: "Butterscotch sauce", amount: "3 tbsp" }], withIn: "and 2 tablespoons of the butterscotch sauce", after: ["Pour into a tall glass, drizzle the last tablespoon of sauce on top and serve."] }
  ),
  iceCreamShake(
    { id: "orange-creamsicle-milkshake", title: "Orange Creamsicle Milkshake", diet: [...GF], taste: ["Fruity", "Creamy", "Refreshing"], description: "Vanilla ice cream blended with orange juice: the taste of an orange-and-cream ice lolly in a glass.", prep: 3, make: 2, difficulty: "Easy", image: pexels(32503389), notes: "Add the juice last and blend briefly, so the acidity doesn't curdle the milk." },
    { iceCream: vanilla(180), milkMl: 80, lines: [{ pantryId: "orange-juice", label: "Orange juice, cold", amount: "100 ml" }], withIn: "and the orange juice" }
  ),
  iceCreamShake(
    { id: "pineapple-milkshake", title: "Pineapple Milkshake", diet: [...GF], taste: ["Fruity", "Refreshing", "Creamy"], description: "Sweet, ripe pineapple blended with vanilla ice cream and milk — tropical, tangy and bright.", prep: 5, make: 2, difficulty: "Easy", image: pexels(38464139), notes: "Pineapple's acidity can curdle milk, so drink this soon after blending." },
    { iceCream: vanilla(120), milkMl: 150, lines: [{ pantryId: "pineapple", label: "Ripe pineapple, chopped", amount: "100 g" }, { pantryId: "sugar", label: "Sugar, to taste", amount: "1 tsp", optional: true }], withIn: "the pineapple and the sugar (if using)", handBefore: ["Chop the pineapple as finely as you can, then mash it in the bowl to a pulp."] }
  ),
  iceCreamShake(
    { id: "mint-chocolate-chip-milkshake", title: "Mint Chocolate Chip Milkshake", diet: [...GF], taste: ["Refreshing", "Creamy", "Sweet"], description: "Vanilla ice cream flavoured with peppermint and studded with chocolate flakes — cool, minty and rich.", prep: 4, make: 2, difficulty: "Easy", image: pexels(32972554), notes: "Peppermint extract is strong: start with a few drops and add more to taste. A little green food colouring is traditional, not necessary." },
    {
      iceCream: vanilla(180), milkMl: 150, lines: [{ pantryId: "mint-extract", label: "Peppermint extract", amount: "1/4 tsp" }, { pantryId: "dark-chocolate", label: "Dark chocolate, finely chopped", amount: "20 g" }],
      before: ["Chop the chocolate finely."], withIn: "and the peppermint extract (add the chocolate for the last 2–3 seconds, so it stays in flakes)",
    }
  ),
  iceCreamShake(
    { id: "brownie-milkshake", title: "Brownie Milkshake", taste: ["Rich", "Sweet", "Creamy"], description: "Chocolate brownie blended into vanilla ice cream and milk, with chocolate syrup — fudgy and dessert-like.", prep: 4, make: 2, difficulty: "Easy", image: pexels(7491901) },
    { iceCream: vanilla(180), milkMl: 150, lines: [{ pantryId: "brownie", label: "Chocolate brownie, in chunks", amount: "40 g" }, syrup(2)], before: ["Break the brownie into small pieces."], withIn: "and the brownie and chocolate syrup" }
  ),
  iceCreamShake(
    { id: "birthday-cake-milkshake", title: "Birthday Cake Milkshake", taste: ["Sweet", "Creamy"], description: "Vanilla ice cream blended with sponge cake and sprinkles, and topped with whipped cream: a birthday party in a glass.", prep: 4, make: 2, difficulty: "Easy", image: pexels(32779819) },
    { iceCream: vanilla(180), milkMl: 150, lines: [{ pantryId: "sponge-cake", label: "Vanilla sponge cake", amount: "40 g" }, { pantryId: "sprinkles", label: "Sprinkles", amount: "1 tbsp" }, { pantryId: "vanilla-extract", label: "Vanilla extract", amount: "1/2 tsp", optional: true }], before: ["Crumble the cake into small pieces."], withIn: "and the cake and vanilla extract (if using)", after: ["Pour into a tall glass, top with whipped cream and a handful of sprinkles, and serve."] }
  ),
  drink(
    { id: "cold-cocoa", title: "Cold Cocoa", type: "Milkshakes & thick shakes", temperature: "cold", diet: ["Gluten-Free"], taste: ["Rich", "Sweet", "Refreshing"], description: "India's cold chocolate milk: cocoa, sugar and ice-cold milk whisked or blended to a froth, no ice cream.", prep: 3, make: 2, difficulty: "Easy", image: pexels(12642348), sourceName: "Tarla Dalal — Indian milkshakes", sourceUrl: "https://www.tarladalal.com/recipes-for-indian-milkshakes-smoothies-145", notes: "The cocoa is dissolved in a little hot water first, so it never turns gritty." },
    [
      { pantryId: "cocoa-powder", label: "Unsweetened cocoa powder", amount: "1 tbsp" },
      { pantryId: "sugar", label: "Sugar", amount: "2 tbsp" },
      { pantryId: "water", label: "Hot water", amount: "2 tbsp" },
      { pantryId: "milk", label: "Cold whole milk", amount: "250 ml" },
      { pantryId: "ice", label: "Ice cubes", amount: "1/2 cup" },
    ],
    [
      { id: "blender", label: "Blender", equipment: ["Blender"], steps: ["Stir the cocoa and sugar into the hot water in a small bowl until you have a smooth, glossy paste.", "Put the paste, the cold milk and the ice in the blender and blend for 20 seconds, until frothy.", "Pour into a tall glass and serve at once."] },
      { id: "by-hand", label: "By hand", equipment: [], handTools: ["Small bowl", "Lidded jar", "Tall glass"], steps: ["Stir the cocoa and sugar into the hot water in a small bowl until you have a smooth, glossy paste.", "Put the paste, the cold milk and the ice in a lidded jar, close it tightly and shake hard for 45 seconds, until frothy.", "Strain into a tall glass and serve at once."] },
    ]
  ),
];

export const thickShakes: Recipe[] = [
  iceCreamShake(
    { id: "thick-chocolate-shake", title: "Thick Chocolate Shake", taste: ["Rich", "Creamy", "Sweet"], description: "A thick, spoonable chocolate shake: lots of ice cream, only a splash of milk, and chocolate syrup.", prep: 3, make: 3, difficulty: "Easy", image: pexels(28525199), notes: "A thick shake should hold a spoon upright. Blend in short bursts and use only as much milk as it takes to move the blades." },
    { iceCream: { pantryId: "chocolate-ice-cream", label: "Chocolate ice cream, 4 scoops", amount: "240 g" }, milkMl: 60, lines: [syrup(2), cream()], thick: true, withIn: "and the chocolate syrup", after: ["Spoon into a tall glass, top with whipped cream and a drizzle of syrup, and serve with a long spoon and a wide straw."] }
  ),
  iceCreamShake(
    { id: "thick-vanilla-bean-shake", title: "Thick Vanilla Bean Shake", diet: [...GF], taste: ["Creamy", "Sweet"], description: "Four scoops of vanilla ice cream and barely any milk, blended thick with a generous teaspoon of real vanilla.", prep: 3, make: 3, difficulty: "Easy", image: pexels(30451538) },
    { iceCream: vanilla(240, "Vanilla bean ice cream"), milkMl: 60, lines: [{ pantryId: "vanilla-extract", label: "Vanilla extract or vanilla bean paste", amount: "1 tsp" }, cream()], thick: true, withIn: "and the vanilla" }
  ),
  iceCreamShake(
    { id: "thick-strawberry-shake", title: "Thick Strawberry Shake", diet: [...GF], taste: ["Fruity", "Creamy", "Sweet"], description: "Strawberry ice cream blended thick with fresh strawberries and a little milk — pink, creamy and spoonable.", prep: 4, make: 3, difficulty: "Easy", image: pexels(3625372) },
    { iceCream: { pantryId: "strawberry-ice-cream", label: "Strawberry ice cream, 4 scoops", amount: "240 g" }, milkMl: 60, lines: [{ pantryId: "strawberry", label: "Strawberries, hulled", amount: "80 g" }], thick: true, before: ["Hull the strawberries and slice them."], withIn: "and the strawberries", handBefore: ["Mash the strawberries in the bowl into a rough pulp."] }
  ),
  iceCreamShake(
    { id: "thick-salted-caramel-shake", title: "Thick Salted Caramel Shake", diet: [...GF], taste: ["Rich", "Sweet", "Creamy"], description: "Vanilla ice cream blended thick with caramel sauce and a pinch of salt — sweet, buttery and just salty enough.", prep: 3, make: 3, difficulty: "Easy", image: pexels(18142619) },
    { iceCream: vanilla(240), milkMl: 60, lines: [{ pantryId: "caramel-sauce", label: "Caramel sauce", amount: "3 tbsp" }, { pantryId: "salt", label: "Flaky salt", amount: "1/4 tsp" }], thick: true, withIn: "2 tablespoons of the caramel sauce and half the salt", after: ["Spoon into a glass, drizzle with the rest of the caramel and sprinkle on the remaining salt. Serve with a long spoon."] }
  ),
  iceCreamShake(
    { id: "thick-peanut-butter-chocolate-shake", title: "Thick Peanut Butter & Chocolate Shake", taste: ["Rich", "Creamy", "Sweet"], description: "Chocolate ice cream blended thick with peanut butter — the classic candy-cup pairing, in a glass.", prep: 3, make: 3, difficulty: "Easy", image: pexels(30908480) },
    { iceCream: { pantryId: "chocolate-ice-cream", label: "Chocolate ice cream, 4 scoops", amount: "240 g" }, milkMl: 60, lines: [{ pantryId: "peanut-butter", label: "Smooth peanut butter", amount: "2 tbsp" }], thick: true, withIn: "and the peanut butter", handBefore: ["Warm the peanut butter for 10 seconds so it is soft enough to stir in."] }
  ),
  iceCreamShake(
    { id: "thick-cookie-dough-shake", title: "Thick Cookie Dough Shake", taste: ["Sweet", "Creamy", "Rich"], description: "Cookie dough ice cream blended thick with a little milk, with the dough chunks left whole.", prep: 3, make: 3, difficulty: "Easy", image: pexels(6463661) },
    { iceCream: { pantryId: "cookie-dough-ice-cream", label: "Cookie dough ice cream, 4 scoops", amount: "240 g" }, milkMl: 60, thick: true, withIn: "(stop as soon as it is smooth, so the dough stays in chunks)" }
  ),
  iceCreamShake(
    { id: "thick-smores-shake", title: "Thick S'mores Shake", taste: ["Sweet", "Rich", "Creamy"], description: "Vanilla ice cream blended thick with chocolate, marshmallow and graham crackers — the campfire dessert, in a glass.", prep: 5, make: 3, difficulty: "Easy", image: pexels(6895931) },
    {
      iceCream: vanilla(240), milkMl: 60, lines: [{ pantryId: "graham-crackers", label: "Graham crackers or digestive biscuits", amount: "2" }, { pantryId: "marshmallows", label: "Marshmallow fluff or mini marshmallows", amount: "2 tbsp" }, syrup(2)],
      thick: true, before: ["Crush the crackers into coarse crumbs."], withIn: "the chocolate syrup, half the crumbs and half the marshmallow",
      after: ["Spoon into a glass and top with the remaining marshmallow and crumbs. Toast the marshmallow with a kitchen torch or under a hot grill if you like."],
    }
  ),
  iceCreamShake(
    { id: "strawberry-cheesecake-shake", title: "Strawberry Cheesecake Shake", taste: ["Fruity", "Creamy", "Sweet"], description: "Strawberry ice cream blended thick with cream cheese, strawberries and graham cracker crumbs — tastes like the cake.", prep: 5, make: 3, difficulty: "Easy", image: pexels(17429538) },
    {
      iceCream: { pantryId: "strawberry-ice-cream", label: "Strawberry ice cream, 4 scoops", amount: "240 g" }, milkMl: 60,
      lines: [{ pantryId: "cream-cheese", label: "Cream cheese, softened", amount: "30 g" }, { pantryId: "strawberry", label: "Strawberries, hulled", amount: "60 g" }, { pantryId: "graham-crackers", label: "Graham crackers or digestive biscuits", amount: "2" }],
      thick: true, before: ["Crush the crackers into crumbs and hull the strawberries."], withIn: "the cream cheese, the strawberries and half the crumbs",
      after: ["Spoon into a glass and scatter the rest of the crumbs on top."],
    }
  ),
];
