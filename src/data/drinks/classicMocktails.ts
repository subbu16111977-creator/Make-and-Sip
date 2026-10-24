import type { Recipe } from "@/types";
import { pexels } from "./builders";
import { ICE, JIGGER, L, MUDDLER, SODA, SQUEEZER, blended, built, pitcher, shaken } from "./mocktailBuilders";

/** The classic "virgin" cocktails, made without alcohol. */

const SRC_LIST = { sourceName: "Difford's Guide — 20 best mocktails", sourceUrl: "https://www.diffordsguide.com/g/1283/mocktails/20-best" };
const VEG = ["Vegan", "Dairy-Free", "Gluten-Free", "Caffeine-Free"] as const;

export const classicMocktails: Recipe[] = [
  built(
    { id: "virgin-mojito", title: "Virgin Mojito", diet: [...VEG], taste: ["Refreshing", "Herbal", "Tangy"], description: "Lime and mint muddled with sugar, over crushed ice and topped with soda: the best-known mocktail, clean and cooling.", prep: 4, make: 2, difficulty: "Easy", image: pexels(36268523), ...SRC_LIST, notes: "Press the mint gently: tearing it releases bitter chlorophyll." },
    [L("lime", "Lime, cut in wedges", "1/2"), L("fresh-mint", "Fresh mint leaves", "10"), L("sugar", "Sugar", "2 tsp"), L("ice", "Crushed ice", "1 cup"), L("sparkling-water", "Chilled sparkling water or club soda", "150 ml")],
    ["Put the lime wedges, mint and sugar in a tall glass and muddle gently, just enough to press out the juice and bruise the mint.", "Fill the glass with crushed ice.", "Pour in the sparkling water and stir from the bottom up.", "Garnish with a mint sprig and a lime wheel and serve with a straw."],
    [MUDDLER]
  ),
  built(
    { id: "shirley-temple", title: "Shirley Temple", diet: [...VEG], taste: ["Sweet", "Fruity", "Refreshing"], description: "Ginger ale with a splash of grenadine and a cherry on top: the oldest mocktail, pink and sweet.", prep: 2, make: 1, difficulty: "Easy", image: pexels(10918156), ...SRC_LIST, notes: "Named after the child actress; she famously disliked it." },
    [L("ginger-ale", "Ginger ale, chilled", "200 ml"), L("grenadine", "Grenadine", "2 tsp"), L("lime", "Lime wedge", "1", true), L("cherries", "Maraschino cherry", "1"), ICE()],
    ["Fill a tall glass with ice.", "Pour in the ginger ale, leaving a little room at the top.", "Drizzle the grenadine in slowly so it sinks, then stir once.", "Squeeze in the lime (if using), drop in the cherry and serve."]
  ),
  built(
    { id: "roy-rogers", title: "Roy Rogers", diet: ["Vegan", "Dairy-Free", "Gluten-Free"], taste: ["Sweet", "Fruity"], description: "Cola with a splash of grenadine and a cherry: the Shirley Temple's older, darker cousin.", prep: 2, make: 1, difficulty: "Easy", image: pexels(4425024), ...SRC_LIST, notes: "Cola contains caffeine." },
    [L("cola", "Cola, chilled", "200 ml"), L("grenadine", "Grenadine", "2 tsp"), L("cherries", "Maraschino cherry", "1"), ICE()],
    ["Fill a tall glass with ice.", "Pour in the cola slowly so it doesn't foam over.", "Drizzle in the grenadine and stir once.", "Top with a cherry and serve."]
  ),
  shaken(
    { id: "cinderella-mocktail", title: "Cinderella", diet: [...VEG], taste: ["Fruity", "Sweet", "Refreshing"], description: "Orange, pineapple and lemon juice shaken together, topped with soda and a dash of grenadine: a sunny, fruity classic.", prep: 4, make: 2, difficulty: "Easy", image: pexels(10986584), ...SRC_LIST },
    [L("orange-juice", "Orange juice", "60 ml"), L("pineapple", "Pineapple juice or crushed pineapple", "60 ml"), L("lemon", "Lemon, juiced", "1/2"), L("grenadine", "Grenadine", "1 tsp"), L("lemon-lime-soda", "Lemon-lime soda or ginger ale", "60 ml"), ICE()],
    { put: "the orange juice, pineapple juice and lemon juice", strain: "into a tall glass over fresh ice", post: ["Top with the lemon-lime soda.", "Drizzle in the grenadine so it sinks, garnish with an orange slice and serve."], optional: [JIGGER, SQUEEZER] }
  ),
  built(
    { id: "virgin-mary", title: "Virgin Mary", diet: [...VEG], taste: ["Spicy", "Tangy", "Rich"], description: "Spiced, savoury tomato juice with lemon, Worcestershire sauce and a kick of hot sauce, served with a celery stick.", prep: 4, make: 2, difficulty: "Easy", image: pexels(10888079), ...SRC_LIST, notes: "Roll it between two glasses rather than shaking, which keeps it from foaming." },
    [L("tomato-juice", "Tomato juice, chilled", "200 ml"), L("lemon", "Lemon, juiced", "1/2"), L("worcestershire-sauce", "Worcestershire sauce", "1 tsp"), L("hot-sauce", "Hot sauce, to taste", "3 dashes"), L("black-pepper", "Black pepper, freshly ground", "1 pinch"), L("salt", "Celery salt or salt", "1 pinch"), L("celery", "Celery stick, to garnish", "1", true), ICE()],
    ["Fill a tall glass with ice.", "Add the tomato juice, lemon juice, Worcestershire sauce, hot sauce, pepper and salt.", "Stir well, or pour back and forth between two glasses to mix without foaming.", "Taste and add more hot sauce or lemon, then garnish with the celery stick and a lemon wedge."],
    [SQUEEZER]
  ),
  shaken(
    { id: "virgin-margarita", title: "Virgin Margarita", diet: [...VEG], taste: ["Tangy", "Refreshing", "Sweet"], description: "Lime and orange juice with a little sugar, shaken over ice and served with a salted rim — sharp, bright and cold.", prep: 5, make: 2, difficulty: "Easy", image: pexels(6428258), ...SRC_LIST },
    [L("lime", "Limes, juiced", "2"), L("orange-juice", "Orange juice", "60 ml"), L("sugar", "Sugar syrup (1 tbsp sugar dissolved in 1 tbsp hot water)", "1 tbsp"), L("salt", "Salt, for the rim", "1 tsp", true), SODA(50, "Chilled sparkling water, optional"), ICE()],
    { pre: ["Rub a lime wedge around the rim of a glass and dip it in a saucer of salt."], put: "the lime juice, orange juice and sugar syrup", strain: "into the glass over fresh ice", post: ["Top with a splash of sparkling water if you like, add a lime wheel and serve."], optional: [JIGGER, SQUEEZER] }
  ),
  shaken(
    { id: "virgin-daiquiri", title: "Virgin Daiquiri", diet: [...VEG], taste: ["Tangy", "Refreshing"], description: "Fresh lime juice, sugar and a little water, shaken hard until frosty — the classic daiquiri, sharp and simple.", prep: 3, make: 2, difficulty: "Easy", image: pexels(7259044), ...SRC_LIST, notes: "Balance is everything: the sugar should only just soften the lime." },
    [L("lime", "Limes, juiced", "2"), L("sugar", "Sugar", "2 tsp"), L("water", "Cold water or sparkling water", "60 ml"), ICE()],
    { pre: ["Dissolve the sugar in the lime juice, stirring until no grains remain."], put: "the sweetened lime juice and the water", strain: "into a chilled glass", post: ["Garnish with a lime wheel and serve at once."], optional: [JIGGER, SQUEEZER] }
  ),
  blended(
    { id: "virgin-strawberry-daiquiri", title: "Virgin Strawberry Daiquiri", diet: [...VEG], taste: ["Fruity", "Sweet", "Refreshing"], description: "Strawberries, lime and sugar blended with ice into a frosty pink slush.", prep: 5, make: 2, difficulty: "Easy", image: pexels(28902889), ...SRC_LIST },
    [L("strawberry", "Strawberries, hulled", "150 g"), L("lime", "Lime, juiced", "1"), L("sugar", "Sugar", "1 tbsp"), ICE()],
    { pre: ["Hull the strawberries."], blend: "the strawberries, lime juice, sugar and ice", hand: "Mash the strawberries with the sugar to a pulp in a jar, add the lime juice and the crushed ice", post: ["Pour into a chilled glass, garnish with a strawberry and serve right away."] }
  ),
  shaken(
    { id: "virgin-cosmopolitan", title: "Virgin Cosmopolitan", diet: [...VEG], taste: ["Tangy", "Fruity", "Refreshing"], description: "Cranberry, lime and orange juice shaken and strained into a chilled glass: rosy, tart and elegant.", prep: 4, make: 2, difficulty: "Easy", image: pexels(31331976), ...SRC_LIST },
    [L("cranberry-juice", "Cranberry juice", "90 ml"), L("lime", "Lime, juiced", "1/2"), L("orange-juice", "Orange juice", "30 ml"), L("sugar", "Sugar syrup, a teaspoon", "1 tsp"), ICE()],
    { put: "the cranberry juice, lime juice, orange juice and sugar syrup", strain: "into a chilled coupe or martini glass", post: ["Garnish with an orange twist and serve."], optional: [JIGGER] }
  ),
  pitcher(
    { id: "virgin-sangria", title: "Virgin Sangria", diet: [...VEG], taste: ["Fruity", "Refreshing", "Sweet"], description: "Red grape juice and orange juice steeped with sliced citrus, apple and berries, topped with sparkling water — a fruity pitcher for a crowd.", prep: 15, make: 5, wait: 60, difficulty: "Easy", servings: 4, image: pexels(17146247), ...SRC_LIST, notes: "The longer the fruit sits in the juice, the better it tastes. Add the sparkling water just before serving." },
    [L("grape-juice", "Red grape juice", "500 ml"), L("orange-juice", "Orange juice", "120 ml"), L("lemon", "Lemon, juiced", "1"), L("orange", "Orange, sliced", "1"), L("apple", "Apple, diced", "1"), L("strawberry", "Strawberries, sliced", "100 g"), SODA(250), ICE("2 cups")],
    ["Pour the grape juice, orange juice and lemon juice into a large pitcher.", "Add the orange slices, diced apple and strawberries. Stir, then chill for at least an hour.", "Just before serving, add the ice and pour in the sparkling water.", "Stir gently and serve in glasses with plenty of fruit."]
  ),
  built(
    { id: "virgin-sunrise", title: "Virgin Sunrise", diet: [...VEG], taste: ["Fruity", "Sweet", "Refreshing"], description: "Orange juice over a layer of grenadine that sinks to the bottom: red below, gold above, like a sunrise.", prep: 3, make: 1, difficulty: "Easy", image: pexels(34299757), ...SRC_LIST, notes: "Don't stir: the layers are the point." },
    [L("orange-juice", "Orange juice, chilled", "150 ml"), L("grenadine", "Grenadine", "2 tsp"), L("pineapple", "Pineapple juice, optional", "30 ml", true), L("lime", "Lime juice, a squeeze", "1 tsp", true), ICE()],
    ["Fill a tall glass with ice.", "Pour in the orange juice (and the pineapple juice and lime, if using).", "Pour the grenadine slowly down the inside of the glass, or over the back of a spoon, so it sinks to the bottom.", "Garnish with an orange slice and a cherry and serve without stirring."]
  ),
  built(
    { id: "virgin-mimosa", title: "Virgin Mimosa", diet: [...VEG], taste: ["Fruity", "Refreshing", "Sweet"], description: "Orange juice topped with sparkling white grape juice in a flute: the brunch classic, without the wine.", prep: 2, make: 1, difficulty: "Easy", image: pexels(18237492), ...SRC_LIST, notes: "A 1:1 ratio is traditional. Use freshly squeezed juice if you can." },
    [L("orange-juice", "Orange juice, chilled", "75 ml"), L("sparkling-grape-juice", "Chilled sparkling white grape juice", "75 ml"), L("orange", "Orange slice, to garnish", "1", true)],
    ["Chill a tall flute in the freezer for a few minutes.", "Pour in the orange juice.", "Top up slowly with the sparkling grape juice, tilting the glass to keep the bubbles.", "Garnish with an orange slice and serve at once."],
    [SQUEEZER],
    ["Champagne flute"]
  ),
  shaken(
    { id: "virgin-paloma", title: "Virgin Paloma", diet: [...VEG], taste: ["Tangy", "Refreshing", "Bitter"], description: "Grapefruit and lime juice with a little sugar and a salted rim, topped with fizzy water — Mexico's favourite highball, without the tequila.", prep: 5, make: 2, difficulty: "Easy", image: pexels(15813473), ...SRC_LIST },
    [L("grapefruit", "Grapefruit juice", "120 ml"), L("lime", "Lime, juiced", "1/2"), L("sugar", "Sugar syrup", "1 tsp"), L("salt", "Salt, for the rim", "1 tsp", true), SODA(80), ICE()],
    { pre: ["Rub a lime wedge around the rim of a tall glass and dip it in salt."], put: "the grapefruit juice, lime juice and sugar syrup", strain: "into the glass over fresh ice", post: ["Top with the sparkling water, garnish with a grapefruit wedge and serve."], optional: [SQUEEZER] }
  ),
  built(
    { id: "sea-breeze-mocktail", title: "Sea Breeze", diet: [...VEG], taste: ["Tangy", "Fruity", "Refreshing"], description: "Cranberry and grapefruit juice over ice with a squeeze of lime: tart, pink and crisp.", prep: 2, make: 1, difficulty: "Easy", image: pexels(8743939), ...SRC_LIST },
    [L("cranberry-juice", "Cranberry juice", "90 ml"), L("grapefruit", "Grapefruit juice", "60 ml"), L("lime", "Lime wedge", "1"), { ...SODA(50, "Chilled sparkling water, optional"), optional: true }, ICE()],
    ["Fill a tall glass with ice.", "Pour in the cranberry juice, then the grapefruit juice.", "Squeeze in the lime wedge and stir.", "Top with a splash of sparkling water if you like, add a lime wedge and serve."]
  ),
  shaken(
    { id: "virgin-painkiller", title: "Virgin Painkiller", diet: [...VEG], taste: ["Fruity", "Creamy", "Sweet"], description: "Pineapple and orange juice shaken with coconut cream and finished with a grating of nutmeg: the tiki-bar favourite from the British Virgin Islands.", prep: 4, make: 2, difficulty: "Easy", image: pexels(29177148), ...SRC_LIST },
    [L("pineapple", "Pineapple juice", "90 ml"), L("orange-juice", "Orange juice", "30 ml"), L("coconut-cream", "Coconut cream", "30 ml"), L("nutmeg", "Nutmeg, freshly grated", "1 pinch"), ICE()],
    { put: "the pineapple juice, orange juice and coconut cream", strain: "into a glass of crushed ice", post: ["Grate fresh nutmeg over the top.", "Garnish with a pineapple wedge and serve."], optional: [JIGGER] }
  ),
  shaken(
    { id: "virgin-mai-tai", title: "Virgin Mai Tai", diet: [...VEG], taste: ["Fruity", "Sweet", "Tangy"], description: "Orange and pineapple juice, lime and almond orgeat syrup shaken over ice: tiki-style, nutty and bright.", prep: 5, make: 2, difficulty: "Medium", image: pexels(12580185), ...SRC_LIST },
    [L("orange-juice", "Orange juice", "60 ml"), L("pineapple", "Pineapple juice", "60 ml"), L("lime", "Lime, juiced", "1/2"), L("orgeat-syrup", "Orgeat (almond syrup)", "15 ml"), L("grenadine", "Grenadine, a dash", "1 tsp", true), L("fresh-mint", "Fresh mint sprig", "1", true), ICE()],
    { put: "the orange juice, pineapple juice, lime juice and orgeat", strain: "into a glass of crushed ice", post: ["Float a dash of grenadine on top if you like.", "Garnish with a mint sprig and a pineapple wedge and serve."], optional: [JIGGER] }
  ),
  built(
    { id: "virgin-caipirinha", title: "Virgin Caipirinha", diet: [...VEG], taste: ["Tangy", "Refreshing", "Bitter"], description: "Muddled lime and sugar over crushed ice, topped with tonic where the cachaça would be — Brazil's national drink, alcohol-free.", prep: 4, make: 2, difficulty: "Easy", image: pexels(13059626), ...SRC_LIST, notes: "Muddle the limes gently: pressing too hard releases bitterness from the white pith." },
    [L("lime", "Limes, cut in wedges", "1"), L("sugar", "Sugar", "2 tsp"), L("tonic-water", "Tonic water, chilled", "100 ml"), L("ice", "Crushed ice", "1 cup")],
    ["Put the lime wedges and sugar in a sturdy glass and muddle gently until the juice is released and the sugar has mostly dissolved.", "Fill the glass with crushed ice.", "Pour in the tonic water and stir from the bottom up.", "Garnish with a lime wheel and serve."],
    [MUDDLER]
  ),
];
