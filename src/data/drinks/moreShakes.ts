import type { Recipe, RecipeIngredient } from "@/types";
import { pexels } from "./builders";
import { iceCreamShake } from "./shakeBuilders";

/** A second batch of milkshakes: cake and pie shakes, candy shakes, and a few classics that were missing. */

const L = (pantryId: string, label: string, amount: string, optional = false): RecipeIngredient => ({ pantryId, label, amount, ...(optional ? { optional: true } : {}) });
const vanilla = (g = 180): RecipeIngredient => L("vanilla-ice-cream", `Vanilla ice cream, ${Math.max(1, Math.round(g / 60))} scoops`, `${g} g`);
const choc = (g = 180): RecipeIngredient => L("chocolate-ice-cream", `Chocolate ice cream, ${Math.max(1, Math.round(g / 60))} scoops`, `${g} g`);
const cream = (label = "Whipped cream, to top"): RecipeIngredient => L("heavy-cream", label, "30 ml", true);
const GF = ["Gluten-Free"] as const;

export const moreShakes: Recipe[] = [
  iceCreamShake(
    { id: "black-forest-milkshake", title: "Black Forest Milkshake", taste: ["Rich", "Fruity", "Creamy"], description: "Chocolate ice cream blended with cherries and a little dark chocolate, topped with cream and a cherry — the cake as a shake.", prep: 6, make: 2, difficulty: "Easy", image: pexels(27626320) },
    { iceCream: choc(), milkMl: 120, lines: [L("cherries", "Dark cherries, pitted", "80 g"), L("chocolate-syrup", "Chocolate syrup", "1 tbsp"), cream()], before: ["Pit the cherries, keeping one with its stem to top the glass."], withIn: "the cherries and the chocolate syrup", handBefore: ["Mash the cherries in the bowl to a juicy pulp."], after: ["Pour into a tall glass, top with whipped cream and the reserved cherry, and serve."] }
  ),
  iceCreamShake(
    { id: "chocolate-banana-milkshake", title: "Chocolate Banana Milkshake", taste: ["Rich", "Sweet", "Creamy"], description: "Chocolate ice cream blended with a ripe banana and cold milk: thick, chocolatey and mellow.", prep: 4, make: 2, difficulty: "Easy", image: pexels(7491906) },
    { iceCream: choc(150), milkMl: 150, lines: [L("banana", "Ripe banana", "1")], withIn: "and the banana", handBefore: ["Mash the banana in the bowl with a fork until completely smooth."] }
  ),
  iceCreamShake(
    { id: "banana-split-milkshake", title: "Banana Split Milkshake", taste: ["Sweet", "Fruity", "Creamy"], description: "Vanilla ice cream blended with banana and strawberries, finished with chocolate syrup, pineapple and a cherry — the sundae in a glass.", prep: 6, make: 2, difficulty: "Easy", image: pexels(6463666) },
    { iceCream: vanilla(), milkMl: 120, lines: [L("banana", "Ripe banana", "1/2"), L("strawberry", "Strawberries, hulled", "50 g"), L("pineapple", "Pineapple, chopped, to top", "30 g", true), L("chocolate-syrup", "Chocolate syrup", "2 tbsp"), L("cherries", "Cherry, to top", "1", true)], withIn: "the banana, strawberries and half the chocolate syrup", handBefore: ["Mash the banana and strawberries together in the bowl until smooth."], after: ["Pour into a tall glass, drizzle with the rest of the syrup, top with whipped cream, a few pineapple pieces and a cherry."] }
  ),
  iceCreamShake(
    { id: "peppermint-candy-cane-milkshake", title: "Peppermint Candy Cane Milkshake", diet: [...GF], taste: ["Refreshing", "Sweet", "Creamy"], description: "Vanilla ice cream blended with peppermint and crushed candy canes, topped with cream — a winter favourite.", prep: 5, make: 2, difficulty: "Easy", image: pexels(29814736), notes: "Peppermint extract is strong. Start with a few drops." },
    { iceCream: vanilla(), milkMl: 150, lines: [L("mint-extract", "Peppermint extract", "1/4 tsp"), L("candy-canes", "Candy canes", "2"), cream()], before: ["Crush one candy cane to a coarse powder in a bag with a rolling pin. Keep the other to decorate."], withIn: "the peppermint extract and most of the crushed candy cane", after: ["Pour into a tall glass, top with whipped cream, the remaining crushed candy and a whole candy cane on the rim."] }
  ),
  iceCreamShake(
    { id: "cotton-candy-milkshake", title: "Cotton Candy Milkshake", diet: [...GF], taste: ["Sweet", "Creamy"], description: "Vanilla ice cream and milk blended with melted cotton candy and topped with a cloud of it: pink, sugary and fun.", prep: 4, make: 2, difficulty: "Easy", image: pexels(1028418) },
    { iceCream: vanilla(), milkMl: 150, lines: [L("cotton-candy", "Cotton candy, a large handful", "30 g")], before: ["Pull the cotton candy into two piles: a small one to top the glass, the rest for the shake."], withIn: "and most of the cotton candy", after: ["Pour into a tall glass, top with the reserved cotton candy and serve right away, before it dissolves."] }
  ),
  iceCreamShake(
    { id: "cereal-milkshake", title: "Cereal Milkshake", taste: ["Sweet", "Creamy"], description: "Vanilla ice cream blended with milk that has been soaked in sweet breakfast cereal, topped with more cereal — the end-of-bowl milk, as a shake.", prep: 8, make: 2, difficulty: "Easy", image: pexels(6413393), notes: "Soaking the cereal in the milk first is what gives it the flavour." },
    { iceCream: vanilla(), milkMl: 120, lines: [L("fruity-cereal", "Sweet breakfast cereal", "40 g")], before: ["Stir 30 g of the cereal into the milk and leave it for 5 minutes. Strain, pressing the cereal, and keep the milk."], withIn: "and the cereal-flavoured milk", after: ["Pour into a tall glass and top with the rest of the cereal."] }
  ),
  iceCreamShake(
    { id: "red-velvet-milkshake", title: "Red Velvet Milkshake", taste: ["Sweet", "Rich", "Creamy"], description: "Vanilla ice cream blended with red velvet cake and a spoon of cream cheese, topped with cake crumbs.", prep: 5, make: 2, difficulty: "Easy", image: pexels(31219014) },
    { iceCream: vanilla(), milkMl: 120, lines: [L("red-velvet-cake", "Red velvet cake", "60 g"), L("cream-cheese", "Cream cheese, softened", "20 g", true)], before: ["Crumble the cake. Keep a little to decorate."], withIn: "the cake and the cream cheese (if using)", after: ["Pour into a tall glass and top with whipped cream and the reserved cake crumbs."] }
  ),
  iceCreamShake(
    { id: "neapolitan-milkshake", title: "Neapolitan Milkshake", diet: [...GF], taste: ["Sweet", "Creamy"], description: "Equal scoops of vanilla, chocolate and strawberry ice cream blended together: the three-flavour carton in a glass.", prep: 3, make: 2, difficulty: "Easy", image: pexels(6463660) },
    { iceCream: vanilla(60), milkMl: 150, lines: [L("chocolate-ice-cream", "Chocolate ice cream, 1 scoop", "60 g"), L("strawberry-ice-cream", "Strawberry ice cream, 1 scoop", "60 g")], withIn: "and the other two ice creams" }
  ),
  iceCreamShake(
    { id: "rose-falooda-milkshake", title: "Rose Falooda Milkshake", diet: [...GF], taste: ["Sweet", "Creamy", "Rich"], description: "Rose syrup, ice cream and milk topped with falooda noodles and soaked basil seeds — the Indian dessert as a shake.", prep: 15, make: 3, difficulty: "Medium", image: pexels(18646641), notes: "Soak the basil seeds in water for 10 minutes until they swell with a clear jelly coat. Cook falooda sev as the packet says." },
    { iceCream: vanilla(120), milkMl: 200, lines: [L("rose-syrup", "Rose syrup", "2 tbsp"), L("falooda-sev", "Cooked falooda sev (noodles), cooled", "2 tbsp", true), L("basil-seeds", "Basil seeds, soaked", "1 tsp", true), L("pistachios", "Pistachios, chopped, to top", "1 tbsp", true)], withIn: "the rose syrup (leaving out the noodles and basil seeds)", after: ["Put the noodles and basil seeds in the bottom of a tall glass, pour in the shake and top with a scoop of ice cream and chopped pistachios."] }
  ),
  iceCreamShake(
    { id: "pumpkin-pie-milkshake", title: "Pumpkin Pie Milkshake", taste: ["Spicy", "Sweet", "Creamy"], description: "Vanilla ice cream blended with pumpkin purée and pumpkin pie spice, topped with crushed graham crackers.", prep: 5, make: 2, difficulty: "Easy", image: pexels(29653644) },
    { iceCream: vanilla(), milkMl: 100, lines: [L("pumpkin-puree", "Pumpkin purée", "60 g"), L("pumpkin-pie-spice", "Pumpkin pie spice", "1/2 tsp"), L("graham-crackers", "Graham cracker, crushed, to top", "1")], before: ["Crush the graham cracker."], withIn: "the pumpkin purée and spice", after: ["Pour into a tall glass, top with whipped cream and the crushed cracker, and serve."] }
  ),
  iceCreamShake(
    { id: "apple-pie-milkshake", title: "Apple Pie Milkshake", taste: ["Sweet", "Spicy", "Creamy"], description: "Vanilla ice cream blended with cinnamon-cooked apple and crushed crackers, topped with cream — apple pie à la mode, in a glass.", prep: 12, make: 2, difficulty: "Easy", image: pexels(14994931) },
    { iceCream: vanilla(), milkMl: 120, lines: [L("apple", "Apple, peeled and diced", "1/2"), L("cinnamon", "Ground cinnamon", "1/2 tsp"), L("brown-sugar", "Brown sugar", "1 tbsp"), L("graham-crackers", "Graham cracker, crushed", "1")], before: ["Cook the diced apple in a small pan with the brown sugar, cinnamon and a splash of water for 5 minutes until soft. Cool for 5 minutes."], withIn: "the apple, a pinch of the crumbs and the cooking juices", after: ["Pour into a tall glass, top with whipped cream, the remaining crumbs and a dusting of cinnamon."], handTools: ["Small pan"] }
  ),
  iceCreamShake(
    { id: "mexican-chocolate-milkshake", title: "Mexican Chocolate Milkshake", taste: ["Rich", "Spicy", "Creamy"], description: "Chocolate ice cream blended with cinnamon and a pinch of chilli, for a warm, slow kick behind the chocolate.", prep: 4, make: 2, difficulty: "Easy", image: pexels(17429505), notes: "A pinch of chilli, not more — it should warm the back of your throat, not burn." },
    { iceCream: choc(), milkMl: 150, lines: [L("cinnamon", "Ground cinnamon", "1/2 tsp"), L("chili-powder", "Chilli powder, a pinch", "1 pinch"), L("cocoa-powder", "Unsweetened cocoa powder", "1 tsp")], withIn: "the cinnamon, chilli and cocoa" }
  ),
  iceCreamShake(
    { id: "lemon-pie-milkshake", title: "Lemon Pie Milkshake", taste: ["Tangy", "Sweet", "Creamy"], description: "Vanilla ice cream blended with lemon juice and lemon curd, with graham cracker crumbs: lemon meringue pie, as a drink.", prep: 5, make: 2, difficulty: "Easy", image: pexels(32848535) },
    { iceCream: vanilla(), milkMl: 100, lines: [L("lemon", "Lemon, juiced", "1/2"), L("lemon-curd", "Lemon curd", "2 tbsp"), L("graham-crackers", "Graham cracker, crushed", "1")], before: ["Crush the graham cracker."], withIn: "the lemon juice and lemon curd", after: ["Pour into a tall glass, top with whipped cream and the crushed cracker, and serve."] }
  ),
  iceCreamShake(
    { id: "salted-caramel-pretzel-milkshake", title: "Salted Caramel Pretzel Milkshake", taste: ["Rich", "Sweet", "Creamy"], description: "Vanilla ice cream blended with caramel sauce, crushed pretzels and a pinch of salt — sweet, salty and crunchy.", prep: 5, make: 2, difficulty: "Easy", image: pexels(1146758) },
    { iceCream: vanilla(), milkMl: 120, lines: [L("caramel-sauce", "Caramel sauce", "3 tbsp"), L("pretzels", "Pretzels", "4"), L("salt", "Flaky salt", "1/4 tsp")], before: ["Crush three of the pretzels. Keep one whole."], withIn: "the caramel (2 tablespoons), the crushed pretzels and the salt", after: ["Pour into a tall glass, drizzle with the last tablespoon of caramel and top with the whole pretzel."] }
  ),
  iceCreamShake(
    { id: "chocolate-mint-milkshake", title: "Chocolate Mint Milkshake", taste: ["Rich", "Refreshing", "Creamy"], description: "Chocolate ice cream blended with peppermint and a little dark chocolate: cool, minty and after-dinner rich.", prep: 4, make: 2, difficulty: "Easy", image: pexels(7491905) },
    { iceCream: choc(), milkMl: 120, lines: [L("mint-extract", "Peppermint extract", "1/4 tsp"), L("dark-chocolate", "Dark chocolate, finely chopped", "20 g"), L("fresh-mint", "Fresh mint sprig, to garnish", "1", true)], before: ["Chop the chocolate finely."], withIn: "the peppermint extract (add the chocolate for the last 2–3 seconds, so it stays in flakes)" }
  ),
  iceCreamShake(
    { id: "strawberries-and-cream-milkshake", title: "Strawberries & Cream Milkshake", diet: [...GF], taste: ["Fruity", "Creamy", "Sweet"], description: "Vanilla ice cream, fresh strawberries and a splash of cream blended smooth: a Wimbledon favourite, in a glass.", prep: 5, make: 2, difficulty: "Easy", image: pexels(11410544) },
    { iceCream: vanilla(), milkMl: 100, lines: [L("strawberry", "Strawberries, hulled", "100 g"), L("heavy-cream", "Double or heavy cream", "30 ml"), L("sugar", "Sugar, if the berries are tart", "1 tsp", true)], before: ["Hull the strawberries."], withIn: "the strawberries, cream and sugar (if using)", handBefore: ["Mash the strawberries with the sugar in the bowl until juicy."] }
  ),
  iceCreamShake(
    { id: "peanut-butter-cup-milkshake", title: "Peanut Butter Cup Milkshake", diet: [...GF], taste: ["Rich", "Sweet", "Creamy"], description: "Chocolate ice cream, peanut butter and chocolate syrup blended together: the candy cup, as a shake.", prep: 3, make: 2, difficulty: "Easy", image: pexels(26867904) },
    { iceCream: choc(), milkMl: 120, lines: [L("peanut-butter", "Smooth peanut butter", "2 tbsp"), L("chocolate-syrup", "Chocolate syrup", "1 tbsp")], withIn: "the peanut butter and chocolate syrup", handBefore: ["Warm the peanut butter for 10 seconds so it is soft enough to stir in."] }
  ),
  iceCreamShake(
    { id: "rainbow-sprinkle-milkshake", title: "Rainbow Sprinkle Milkshake", taste: ["Sweet", "Creamy"], description: "Vanilla ice cream and milk blended with a spoon of sprinkles, then topped with cream and more sprinkles — pure fun.", prep: 3, make: 2, difficulty: "Easy", image: pexels(5570885), notes: "Blend the sprinkles in only briefly, or the colour bleeds and the shake turns grey-brown." },
    { iceCream: vanilla(), milkMl: 150, lines: [L("sprinkles", "Rainbow sprinkles", "2 tbsp"), L("vanilla-extract", "Vanilla extract", "1/2 tsp", true)], withIn: "the vanilla (if using) and only half the sprinkles, pulsing briefly at the end", after: ["Pour into a tall glass, top with whipped cream and the remaining sprinkles."] }
  ),
];
