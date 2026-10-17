import type { Recipe } from "@/types";
import { pexels } from "./builders";
import { ICE, JIGGER, L, MUDDLER, SODA, SQUEEZER, blended, built, shaken } from "./mocktailBuilders";

/** Modern fizzes, spritzes and coolers; Southeast Asian and Indian-style mocktails; and the frozen, creamy ones. */

const SRC_LIST = { sourceName: "Taste and Tell — 50 mocktail recipes", sourceUrl: "https://www.tasteandtellblog.com/50-mocktail-recipes/" };
const SRC_IN = { sourceName: "Tarla Dalal — Indian mocktails", sourceUrl: "https://www.tarladalal.com/recipes-for-Indian-Mocktails-146" };
const VEG = ["Vegan", "Dairy-Free", "Gluten-Free", "Caffeine-Free"] as const;
const SYRUP = (tbsp: number) => L("sugar", `Sugar syrup (${tbsp} tbsp sugar dissolved in ${tbsp} tbsp hot water)`, `${tbsp} tbsp`);

export const fizzMocktails: Recipe[] = [
  built(
    { id: "blue-lagoon-mocktail", title: "Blue Lagoon", diet: [...VEG], taste: ["Tangy", "Sweet", "Refreshing"], description: "Blue curaçao-flavoured syrup, lemon juice and lemon-lime soda over ice: a bright blue, fizzy, citrus drink — the syrup is alcohol-free.", prep: 3, make: 1, difficulty: "Easy", image: pexels(8771967), ...SRC_LIST, notes: "Use a non-alcoholic 'blue curaçao' flavoured syrup." },
    [L("blue-curacao-syrup", "Blue curaçao flavoured syrup (non-alcoholic)", "30 ml"), L("lemon", "Lemon, juiced", "1/2"), L("lemon-lime-soda", "Lemon-lime soda, chilled", "120 ml"), ICE()],
    ["Fill a tall glass with ice.", "Pour in the blue syrup and the lemon juice and stir.", "Top up with the lemon-lime soda, pouring slowly to keep the fizz.", "Garnish with a lemon wheel and a cherry and serve."],
    [SQUEEZER]
  ),
  built(
    { id: "mixed-berry-fizz", title: "Mixed Berry Fizz", diet: [...VEG], taste: ["Fruity", "Tangy", "Refreshing"], description: "Strawberries, raspberries and blueberries muddled with lime and sugar, topped with sparkling water: ruby red and crisp.", prep: 4, make: 2, difficulty: "Easy", image: pexels(8679161), ...SRC_LIST },
    [L("strawberry", "Strawberries, hulled", "40 g"), L("raspberries", "Raspberries", "30 g"), L("blueberries", "Blueberries", "30 g"), L("lime", "Lime, juiced", "1/2"), L("sugar", "Sugar", "2 tsp"), L("fresh-mint", "Fresh mint sprig", "1", true), SODA(150), ICE()],
    ["Muddle the berries with the sugar and lime juice in a tall glass until juicy but still a little chunky.", "Fill the glass with ice.", "Pour in the sparkling water and stir gently from the bottom.", "Garnish with a mint sprig and a few whole berries."],
    [MUDDLER, SQUEEZER]
  ),
  built(
    { id: "cucumber-mint-cooler", title: "Cucumber Mint Cooler", diet: [...VEG], taste: ["Refreshing", "Herbal", "Tangy"], description: "Muddled cucumber and mint with lime and a little syrup, topped with soda — the most cooling drink on any menu.", prep: 4, make: 2, difficulty: "Easy", image: pexels(5335918), ...SRC_LIST },
    [L("cucumber", "Cucumber, peeled and chopped", "1/2"), L("fresh-mint", "Fresh mint leaves", "8"), L("lime", "Lime, juiced", "1"), SYRUP(1), SODA(120), ICE()],
    ["Muddle the cucumber with the mint and sugar syrup in a tall glass until the cucumber is crushed and juicy.", "Add the lime juice and fill the glass with ice.", "Top up with the sparkling water and stir gently.", "Garnish with a cucumber ribbon and a mint sprig."],
    [MUDDLER, SQUEEZER]
  ),
  built(
    { id: "watermelon-mojito", title: "Watermelon Mojito", diet: [...VEG], taste: ["Refreshing", "Fruity", "Herbal"], description: "Muddled watermelon, mint and lime, topped with soda: a pink, juicy summer mojito.", prep: 5, make: 2, difficulty: "Easy", image: pexels(17321335), ...SRC_LIST },
    [L("watermelon", "Seedless watermelon, cubed", "150 g"), L("fresh-mint", "Fresh mint leaves", "8"), L("lime", "Lime, juiced", "1/2"), L("sugar", "Sugar", "1 tsp"), SODA(80), ICE()],
    ["Muddle the watermelon with the mint, sugar and lime juice in a tall glass until the melon is mashed and juicy.", "Fill the glass with crushed ice.", "Top up with the sparkling water and stir from the bottom up.", "Garnish with a watermelon wedge and a mint sprig."],
    [MUDDLER, SQUEEZER]
  ),
  built(
    { id: "strawberry-basil-smash", title: "Strawberry Basil Smash", diet: [...VEG], taste: ["Fruity", "Herbal", "Refreshing"], description: "Strawberries and fresh basil smashed with lemon and sugar, topped with sparkling water: sweet, peppery and summery.", prep: 4, make: 2, difficulty: "Easy", image: pexels(8679333), ...SRC_LIST },
    [L("strawberry", "Strawberries, hulled", "4"), L("fresh-basil", "Fresh basil leaves", "6"), L("lemon", "Lemon, juiced", "1/2"), SYRUP(1), SODA(100), ICE()],
    ["Muddle the strawberries with the basil, lemon juice and sugar syrup in a glass until pulpy.", "Fill the glass with ice.", "Top up with the sparkling water and stir gently.", "Garnish with a basil leaf and a strawberry."],
    [MUDDLER, SQUEEZER]
  ),
  shaken(
    { id: "pineapple-ginger-fizz", title: "Pineapple Ginger Fizz", diet: [...VEG], taste: ["Fruity", "Spicy", "Refreshing"], description: "Pineapple juice, fresh ginger and lime shaken with honey, topped with ginger beer: sweet, warming and fizzy.", prep: 5, make: 2, difficulty: "Easy", image: pexels(39948818), ...SRC_LIST },
    [L("pineapple", "Pineapple juice", "120 ml"), L("ginger", "Fresh ginger, grated", "5 g"), L("lime", "Lime, juiced", "1/2"), L("honey", "Honey or sugar syrup", "1 tsp"), L("ginger-beer", "Ginger beer (non-alcoholic)", "80 ml"), ICE()],
    { put: "the pineapple juice, ginger, lime juice and honey", strain: "into a tall glass over fresh ice", post: ["Top with the ginger beer.", "Garnish with a pineapple wedge and serve."], optional: [JIGGER] }
  ),
  built(
    { id: "elderflower-spritz", title: "Elderflower Spritz", diet: [...VEG], taste: ["Sweet", "Herbal", "Refreshing"], description: "Elderflower cordial and sparkling water over ice with lemon and mint: floral, light and delicate.", prep: 2, make: 1, difficulty: "Easy", image: pexels(7376782), ...SRC_LIST },
    [L("elderflower-cordial", "Elderflower cordial", "40 ml"), SODA(120), L("lemon", "Lemon slices", "2"), L("fresh-mint", "Fresh mint sprig", "1", true), ICE()],
    ["Fill a wine glass with ice and add the lemon slices.", "Pour in the elderflower cordial.", "Top up with the sparkling water and stir once.", "Garnish with a mint sprig and serve."],
    [JIGGER],
    ["Wine glass"]
  ),
  shaken(
    { id: "rosemary-grapefruit-spritz", title: "Rosemary Grapefruit Spritz", diet: [...VEG], taste: ["Tangy", "Herbal", "Refreshing"], description: "Grapefruit juice shaken with honey and a rosemary sprig, topped with sparkling water: bittersweet, piney and pink.", prep: 4, make: 2, difficulty: "Easy", image: pexels(4144244), ...SRC_LIST },
    [L("grapefruit", "Grapefruit juice", "120 ml"), L("rosemary", "Fresh rosemary sprigs", "2"), L("honey", "Honey", "1 tsp"), SODA(80), ICE()],
    { pre: ["Bruise one rosemary sprig between your fingers to release its oils."], put: "the grapefruit juice, honey and the bruised rosemary", strain: "into a tall glass over fresh ice", post: ["Top with the sparkling water.", "Garnish with the second rosemary sprig and a grapefruit wedge and serve."] }
  ),
  shaken(
    { id: "lavender-lemon-sparkler", title: "Lavender Lemon Sparkler", diet: [...VEG], taste: ["Herbal", "Tangy", "Sweet"], description: "Homemade lavender syrup with lemon juice, topped with sparkling water: floral, tart and pale lilac.", prep: 12, make: 2, difficulty: "Medium", image: pexels(36305564), ...SRC_LIST, notes: "Use culinary lavender, and don't steep it too long: it turns soapy." },
    [L("lavender", "Dried culinary lavender", "1 tsp"), L("sugar", "Sugar, for the syrup", "2 tbsp"), L("water", "Water, for the syrup", "60 ml"), L("lemon", "Lemon, juiced", "1"), SODA(150), ICE()],
    { pre: ["Make the syrup: heat the sugar, water and lavender in a small pan until the sugar dissolves, then take it off the heat and steep for 5 minutes. Strain and cool."], put: "the lavender syrup and the lemon juice", strain: "into a tall glass over fresh ice", post: ["Top with the sparkling water.", "Garnish with a lemon slice and a lavender sprig and serve."], handTools: ["Tall glass", "Small pan"] }
  ),
  built(
    { id: "pomegranate-spritz", title: "Pomegranate Spritz", diet: [...VEG], taste: ["Fruity", "Tangy", "Refreshing"], description: "Pomegranate juice, lime and sparkling water over ice with a few seeds: ruby red, tart and festive.", prep: 3, make: 1, difficulty: "Easy", image: pexels(36448983), ...SRC_LIST },
    [L("pomegranate", "Pomegranate juice", "90 ml"), L("lime", "Lime, juiced", "1/2"), SODA(100), L("pomegranate", "Pomegranate seeds, to garnish", "1 tbsp", true), ICE()],
    ["Fill a glass with ice.", "Pour in the pomegranate juice and the lime juice.", "Top up with the sparkling water and stir gently.", "Scatter a few pomegranate seeds over the top and serve."],
    [SQUEEZER]
  ),
  built(
    { id: "cranberry-ginger-fizz", title: "Cranberry Ginger Fizz", diet: [...VEG], taste: ["Tangy", "Spicy", "Refreshing"], description: "Cranberry juice and lime topped with spicy ginger beer: tart, red and warming.", prep: 3, make: 1, difficulty: "Easy", image: pexels(18498028), ...SRC_LIST },
    [L("cranberry-juice", "Cranberry juice", "90 ml"), L("lime", "Lime, juiced", "1/2"), L("ginger-beer", "Ginger beer (non-alcoholic)", "100 ml"), ICE()],
    ["Fill a tall glass with ice.", "Pour in the cranberry juice and the lime juice.", "Top up with the ginger beer slowly, so it doesn't foam over.", "Garnish with a lime wheel and a few cranberries and serve."],
    [SQUEEZER]
  ),
  built(
    { id: "passion-fruit-spritz", title: "Passion Fruit Spritz", diet: [...VEG], taste: ["Fruity", "Tangy", "Refreshing"], description: "Passion fruit pulp, orange juice and honey topped with sparkling water: tangy, perfumed and golden.", prep: 4, make: 1, difficulty: "Easy", image: pexels(8375042), ...SRC_LIST },
    [L("passion-fruit", "Passion fruit pulp", "3 tbsp"), L("orange-juice", "Orange juice", "60 ml"), L("honey", "Honey", "2 tsp"), SODA(100), ICE()],
    ["Stir the honey into the passion fruit pulp and orange juice in a glass until dissolved.", "Fill the glass with ice.", "Top up with the sparkling water and stir gently.", "Garnish with an orange slice and serve."]
  ),
  built(
    { id: "kiwi-mint-cooler", title: "Kiwi Mint Cooler", diet: [...VEG], taste: ["Fruity", "Tangy", "Refreshing"], description: "Muddled kiwi, mint and lime, topped with soda: a bright green, tangy cooler.", prep: 4, make: 2, difficulty: "Easy", image: pexels(7799685), ...SRC_LIST },
    [L("kiwi", "Kiwis, peeled", "2"), L("fresh-mint", "Fresh mint leaves", "8"), L("lime", "Lime, juiced", "1/2"), SYRUP(1), SODA(120), ICE()],
    ["Muddle the kiwi with the mint, lime juice and sugar syrup in a tall glass until pulpy.", "Fill the glass with ice.", "Top up with the sparkling water and stir gently.", "Garnish with a kiwi slice and a mint sprig."],
    [MUDDLER, SQUEEZER]
  ),
  built(
    { id: "lychee-spritz", title: "Lychee Spritz", diet: [...VEG], taste: ["Fruity", "Sweet", "Refreshing"], description: "Lychees and their syrup with lime and sparkling water: floral, sweet and pale pink.", prep: 3, make: 1, difficulty: "Easy", image: pexels(31902393), ...SRC_LIST },
    [L("lychee", "Lychees in syrup, with 30 ml of the syrup", "4"), L("lime", "Lime, juiced", "1/2"), SODA(120), ICE()],
    ["Put 3 lychees and 30 ml of their syrup in a glass and crush them lightly with a spoon.", "Add the lime juice and fill the glass with ice.", "Top up with the sparkling water and stir gently.", "Garnish with the remaining lychee on a pick and serve."],
    [SQUEEZER]
  ),
  built(
    { id: "blackberry-lime-soda", title: "Blackberry Lime Soda", diet: [...VEG], taste: ["Fruity", "Tangy", "Refreshing"], description: "Blackberries and lime muddled with sugar and topped with soda: deep purple, tart and cold.", prep: 4, make: 2, difficulty: "Easy", image: pexels(33926468), ...SRC_LIST },
    [L("blackberries", "Blackberries", "6"), L("lime", "Lime, juiced", "1"), L("sugar", "Sugar", "2 tsp"), SODA(150), ICE()],
    ["Muddle the blackberries with the sugar and lime juice in a glass until the berries are crushed.", "Fill the glass with ice.", "Top up with the sparkling water and stir gently.", "Garnish with a blackberry and a lime wheel."],
    [MUDDLER, SQUEEZER]
  ),
  shaken(
    { id: "cucumber-limeade", title: "Cucumber Limeade", diet: [...VEG], taste: ["Refreshing", "Tangy", "Herbal"], description: "Cucumber juice, lime and a little syrup shaken over ice, topped with sparkling water: crisp, green and sharp.", prep: 5, make: 2, difficulty: "Easy", image: pexels(39609690), ...SRC_LIST },
    [L("cucumber", "Cucumber, peeled and grated", "1/2"), L("lime", "Limes, juiced", "2"), SYRUP(2), SODA(100), ICE()],
    { pre: ["Grate the cucumber and squeeze the pulp through a sieve to collect the juice."], put: "the cucumber juice, lime juice and sugar syrup", strain: "into a tall glass over fresh ice", post: ["Top with the sparkling water.", "Garnish with a cucumber slice and a lime wheel and serve."], optional: [SQUEEZER] }
  ),
  built(
    { id: "sparkling-grapefruit-mocktail", title: "Sparkling Grapefruit", diet: [...VEG], taste: ["Tangy", "Bitter", "Refreshing"], description: "Pink grapefruit juice with honey and sparkling water: pale rosé-pink, bittersweet and dry.", prep: 3, make: 1, difficulty: "Easy", image: pexels(11665831), ...SRC_LIST },
    [L("grapefruit", "Pink grapefruit juice", "100 ml"), L("honey", "Honey", "1 tsp"), SODA(100), L("rosemary", "Rosemary sprig, optional", "1", true), ICE()],
    ["Stir the honey into the grapefruit juice in a glass until dissolved.", "Fill the glass with ice.", "Top up with the sparkling water and stir gently.", "Garnish with a grapefruit slice (and rosemary, if using) and serve."],
    [SQUEEZER]
  ),
  built(
    { id: "blood-orange-spritz", title: "Blood Orange Spritz", diet: [...VEG], taste: ["Fruity", "Tangy", "Refreshing"], description: "Blood orange juice with a touch of honey and sparkling water: ruby, sweet and slightly bitter.", prep: 4, make: 1, difficulty: "Easy", image: pexels(10986585), ...SRC_LIST },
    [L("blood-orange", "Blood orange juice", "100 ml"), L("honey", "Honey", "1 tsp"), L("lemon", "Lemon, a squeeze", "1 tsp"), SODA(100), ICE()],
    ["Stir the honey and lemon juice into the blood orange juice in a wine glass.", "Fill the glass with ice.", "Top up with the sparkling water and stir gently.", "Garnish with a blood orange wheel and serve."],
    [SQUEEZER],
    ["Wine glass"]
  ),
  built(
    { id: "lemon-blueberry-sparkler", title: "Lemon Blueberry Sparkler", diet: [...VEG], taste: ["Fruity", "Tangy", "Refreshing"], description: "Blueberries muddled with lemon and sugar, topped with sparkling water: purple at the bottom, pale at the top, and ready in five minutes.", prep: 4, make: 2, difficulty: "Easy", image: pexels(29786270), ...SRC_LIST },
    [L("blueberries", "Blueberries", "40 g"), L("lemon", "Lemon, juiced", "1"), SYRUP(1), SODA(150), ICE()],
    ["Muddle the blueberries with the sugar syrup and lemon juice in a tall glass until they burst.", "Fill the glass with ice.", "Top up with the sparkling water and stir gently.", "Garnish with a lemon wheel and a few blueberries on a pick."],
    [MUDDLER, SQUEEZER]
  ),
  built(
    { id: "sparkling-peach-punch", title: "Sparkling Peach Punch", diet: [...VEG], taste: ["Fruity", "Sweet", "Refreshing"], description: "Peach nectar, lemon and ginger ale over ice with peach slices: soft, sweet and fizzy.", prep: 4, make: 1, difficulty: "Easy", image: pexels(19507875), ...SRC_LIST },
    [L("peach-nectar", "Peach nectar, chilled", "100 ml"), L("lemon", "Lemon, juiced", "1/2"), L("ginger-ale", "Ginger ale, chilled", "100 ml"), L("peach", "Peach slices, to garnish", "2", true), ICE()],
    ["Fill a glass with ice and add the peach slices.", "Pour in the peach nectar and the lemon juice.", "Top up with the ginger ale and stir gently.", "Serve with a straw."],
    [SQUEEZER]
  ),
  // --- Southeast Asian and Indian-style ---
  built(
    { id: "ginger-nojito", title: "Ginger Nojito", diet: [...VEG], taste: ["Spicy", "Refreshing", "Herbal"], description: "A mojito with fresh ginger muddled in with the mint and lime: sharper and warmer than the original.", prep: 5, make: 2, difficulty: "Easy", image: pexels(37662775), sourceName: "Difford's Guide — 20 best mocktails", sourceUrl: "https://www.diffordsguide.com/g/1283/mocktails/20-best" },
    [L("lime", "Lime, cut in wedges", "1/2"), L("fresh-mint", "Fresh mint leaves", "10"), L("ginger", "Fresh ginger, thinly sliced", "8 g"), L("sugar", "Sugar", "2 tsp"), SODA(120), ICE()],
    ["Muddle the lime, mint, ginger and sugar in a tall glass until the juice runs and the ginger is crushed.", "Fill the glass with crushed ice.", "Top up with the sparkling water and stir from the bottom.", "Garnish with a mint sprig and serve."],
    [MUDDLER]
  ),
  built(
    { id: "sparkling-jaljeera", title: "Sparkling Jaljeera", diet: [...VEG], taste: ["Tangy", "Spicy", "Refreshing"], description: "Jaljeera — cumin, mint, ginger and black salt — mixed with lemon and sparkling water: India's street-side digestif, with bubbles.", prep: 4, make: 2, difficulty: "Easy", image: pexels(37380520), ...SRC_IN },
    [L("jaljeera-powder", "Jaljeera powder", "1 tbsp"), L("lemon", "Lemon, juiced", "1/2"), L("sugar", "Sugar, to taste", "1 tsp"), L("fresh-mint", "Fresh mint leaves", "6"), SODA(200), ICE()],
    ["Crush the mint with the sugar in a tall glass.", "Stir in the jaljeera powder and lemon juice until dissolved.", "Add ice and top up with the sparkling water.", "Stir gently, taste for salt and tartness, and serve."],
    [MUDDLER, SQUEEZER]
  ),
  built(
    { id: "kala-khatta-fizz", title: "Kala Khatta Fizz", diet: [...VEG], taste: ["Tangy", "Sweet", "Refreshing"], description: "Dark purple kala khatta syrup, lemon and black salt topped with soda: the sweet-sour roadside gola, as a fizzy drink.", prep: 3, make: 1, difficulty: "Easy", image: pexels(17585011), ...SRC_IN },
    [L("kala-khatta-syrup", "Kala khatta syrup", "2 tbsp"), L("lemon", "Lemon, juiced", "1 tbsp"), L("black-salt", "Black salt, a pinch", "1 pinch"), SODA(150), ICE()],
    ["Fill a glass with ice.", "Add the kala khatta syrup, lemon juice and black salt.", "Top up with the sparkling water and stir well from the bottom.", "Garnish with a lemon slice and serve."]
  ),
  built(
    { id: "rose-sharbat-spritzer", title: "Rose Sharbat Spritzer", diet: [...VEG], taste: ["Sweet", "Refreshing", "Herbal"], description: "Rose syrup with a squeeze of lemon, topped with sparkling water and a few basil seeds: pink, floral and cooling.", prep: 3, make: 1, difficulty: "Easy", image: pexels(32753957), ...SRC_IN },
    [L("rose-syrup", "Rose syrup", "2 tbsp"), L("lemon", "Lemon, a squeeze", "1 tsp"), SODA(180), L("basil-seeds", "Basil seeds, soaked, optional", "1 tsp", true), ICE()],
    ["Fill a glass with ice and add the soaked basil seeds, if using.", "Pour in the rose syrup and the lemon juice.", "Top up with the sparkling water and stir.", "Garnish with a few dried rose petals and serve."],
    [SQUEEZER]
  ),
  built(
    { id: "sparkling-aam-panna", title: "Sparkling Aam Panna", diet: [...VEG], taste: ["Tangy", "Sweet", "Spicy"], description: "Raw mango pulp with roasted cumin, mint and black salt, topped with soda: India's summer cooler, with fizz.", prep: 25, make: 3, difficulty: "Medium", image: pexels(39536485), ...SRC_IN, notes: "The concentrate keeps in the fridge for 5 days." },
    [L("raw-mango", "Raw (green) mango", "1"), L("sugar", "Sugar", "2 tbsp"), L("cumin-powder", "Roasted cumin powder", "1/2 tsp"), L("black-salt", "Black salt", "1/4 tsp"), L("fresh-mint", "Fresh mint leaves", "6"), SODA(150), ICE()],
    ["Boil the whole raw mango in water for 15 minutes until soft. Peel it, scrape the pulp from the stone and mash it with the sugar, cumin, black salt and mint to a smooth concentrate.", "Put 3 tablespoons of the concentrate in a tall glass and add ice.", "Top up with the sparkling water and stir well.", "Garnish with a mint sprig and serve."],
    [],
    ["Tall glass", "Saucepan", "Fork"]
  ),
  built(
    { id: "pan-mojito", title: "Pan Mojito", diet: [...VEG], taste: ["Herbal", "Sweet", "Refreshing"], description: "An Indian cafe favourite: mint, lime, gulkand (rose petal jam), fennel and a betel leaf for the flavour of paan.", prep: 5, make: 2, difficulty: "Medium", image: pexels(14537768), ...SRC_IN },
    [L("fresh-mint", "Fresh mint leaves", "8"), L("lime", "Lime, juiced", "1/2"), L("gulkand", "Gulkand (rose petal jam)", "1 tbsp"), L("fennel-seeds", "Fennel seeds", "1/2 tsp"), L("betel-leaf", "Betel (paan) leaf, optional", "1", true), SODA(150), ICE()],
    ["Muddle the mint, betel leaf (if using), fennel and gulkand in a tall glass until fragrant.", "Add the lime juice and fill the glass with crushed ice.", "Top up with the sparkling water and stir well.", "Garnish with a mint sprig and serve."],
    [MUDDLER, SQUEEZER]
  ),
  built(
    { id: "litchi-rose-cooler", title: "Litchi Rose Cooler", diet: [...VEG], taste: ["Fruity", "Sweet", "Herbal"], description: "Lychee and rose syrup shaken with lemon and topped with soda: perfumed, pink and gentle.", prep: 4, make: 2, difficulty: "Easy", image: pexels(26953243), ...SRC_IN },
    [L("lychee", "Lychees in syrup, with 30 ml of the syrup", "4"), L("rose-syrup", "Rose syrup", "1 tbsp"), L("lemon", "Lemon, juiced", "1/2"), SODA(120), ICE()],
    ["Crush 3 lychees with the rose syrup and 30 ml of the lychee syrup in a glass.", "Add the lemon juice and fill the glass with ice.", "Top up with the sparkling water and stir.", "Garnish with the last lychee and a rose petal."],
    [MUDDLER, SQUEEZER]
  ),
  built(
    { id: "mango-chilli-cooler", title: "Mango Chilli Cooler", diet: [...VEG], taste: ["Fruity", "Spicy", "Refreshing"], description: "Mango pulp with lime, a pinch of chilli powder and black salt, topped with soda: sweet, sour and a little hot.", prep: 5, make: 2, difficulty: "Easy", image: pexels(36402326), ...SRC_IN },
    [L("mango", "Ripe mango pulp", "100 g"), L("lime", "Lime, juiced", "1/2"), L("sugar", "Sugar", "1 tsp"), L("chili-powder", "Chilli powder, a pinch", "1 pinch"), L("black-salt", "Black salt, a pinch", "1 pinch"), SODA(100), ICE()],
    ["Mash the mango to a smooth pulp with the lime juice, sugar, chilli powder and black salt in a tall glass.", "Fill the glass with ice.", "Top up with the sparkling water and stir well.", "Dust the rim with a little chilli salt and serve."],
    [SQUEEZER]
  ),
];

export const frozenMocktails: Recipe[] = [
  blended(
    { id: "blue-hawaii-mocktail", title: "Blue Hawaii", diet: [...VEG], taste: ["Fruity", "Creamy", "Refreshing"], description: "Pineapple juice, blue curaçao-flavoured syrup and coconut cream blended with ice: a bright blue frozen tiki drink.", prep: 4, make: 2, difficulty: "Easy", image: pexels(32300850), ...SRC_LIST },
    [L("pineapple", "Pineapple juice", "90 ml"), L("blue-curacao-syrup", "Blue curaçao flavoured syrup (non-alcoholic)", "30 ml"), L("coconut-cream", "Coconut cream", "30 ml"), L("lemon", "Lemon, juiced", "1/2"), ICE()],
    { blend: "the pineapple juice, blue syrup, coconut cream, lemon juice and ice", hand: "Put the pineapple juice, blue syrup, coconut cream, lemon juice and crushed ice in a lidded jar" }
  ),
  blended(
    { id: "strawberry-colada", title: "Strawberry Colada", diet: [...VEG], taste: ["Fruity", "Creamy", "Sweet"], description: "Strawberries, pineapple juice and coconut cream blended with ice: pink, creamy and tropical.", prep: 5, make: 2, difficulty: "Easy", image: pexels(15523639), ...SRC_LIST },
    [L("strawberry", "Strawberries, hulled", "100 g"), L("pineapple", "Pineapple juice", "90 ml"), L("coconut-cream", "Coconut cream", "45 ml"), ICE()],
    { pre: ["Hull the strawberries."], blend: "the strawberries, pineapple juice, coconut cream and ice", hand: "Mash the strawberries to a pulp in a jar, then add the pineapple juice, coconut cream and crushed ice" }
  ),
  blended(
    { id: "mango-colada", title: "Mango Colada", diet: [...VEG], taste: ["Fruity", "Creamy", "Sweet"], description: "Mango, pineapple juice and coconut cream blended with ice: golden, creamy and thick.", prep: 5, make: 2, difficulty: "Easy", image: pexels(28525186), ...SRC_LIST },
    [L("mango", "Ripe mango, chopped", "100 g"), L("pineapple", "Pineapple juice", "80 ml"), L("coconut-cream", "Coconut cream", "45 ml"), ICE()],
    { pre: ["Peel and chop the mango."], blend: "the mango, pineapple juice, coconut cream and ice", hand: "Mash the mango to a smooth pulp in a jar, then add the pineapple juice, coconut cream and crushed ice" }
  ),
  blended(
    { id: "frozen-virgin-margarita", title: "Frozen Virgin Margarita", diet: [...VEG], taste: ["Tangy", "Refreshing", "Sweet"], description: "Lime and orange juice blended with ice into a frosty, tart slush, served in a salt-rimmed glass.", prep: 6, make: 2, difficulty: "Easy", image: pexels(31269850), ...SRC_LIST },
    [L("lime", "Limes, juiced", "2"), L("orange-juice", "Orange juice", "60 ml"), L("sugar", "Sugar", "2 tbsp"), L("salt", "Salt, for the rim", "1 tsp", true), ICE("1 1/2 cups")],
    { pre: ["Rub a lime wedge around the rim of a glass and dip it in salt, then put the glass in the freezer."], blend: "the lime juice, orange juice, sugar and ice", hand: "Put the lime juice, orange juice and sugar in a lidded jar with the crushed ice", post: ["Pour into the frosted, salt-rimmed glass, garnish with a lime wheel and serve right away."] }
  ),
  blended(
    { id: "frozen-peach-bellini", title: "Frozen Peach Bellini", diet: [...VEG], taste: ["Fruity", "Sweet", "Refreshing"], description: "Ripe peaches blended with ice and sparkling white grape juice into a pale peach slush.", prep: 6, make: 2, difficulty: "Easy", image: pexels(17525270), ...SRC_LIST },
    [L("peach", "Ripe peaches, peeled and stoned", "1"), L("sparkling-grape-juice", "Chilled sparkling white grape juice", "80 ml"), L("honey", "Honey, to taste", "1 tsp"), ICE()],
    { pre: ["Peel the peach and cut the flesh from the stone."], blend: "the peach, sparkling grape juice, honey and ice", hand: "Mash the peach to a smooth pulp in a jar, then add the grape juice, honey and crushed ice" }
  ),
  blended(
    { id: "frozen-watermelon-margarita", title: "Frozen Watermelon Margarita", diet: [...VEG], taste: ["Refreshing", "Fruity", "Tangy"], description: "Watermelon, lime and a pinch of sugar blended with ice, served with a salted rim: pink, frosty and very light.", prep: 6, make: 2, difficulty: "Easy", image: pexels(12497800), ...SRC_LIST },
    [L("watermelon", "Seedless watermelon, cubed", "200 g"), L("lime", "Lime, juiced", "1"), L("sugar", "Sugar", "1 tsp"), L("salt", "Salt, for the rim", "1 tsp", true), ICE()],
    { pre: ["Rub a lime wedge around the rim of a glass and dip it in salt, then freeze the glass."], blend: "the watermelon, lime juice, sugar and ice", hand: "Mash the watermelon to a pulp in a jar, then add the lime juice, sugar and crushed ice", post: ["Pour into the salt-rimmed glass and serve right away."] }
  ),
  blended(
    { id: "virgin-pina-colada", title: "Virgin Piña Colada", diet: [...VEG], taste: ["Fruity", "Creamy", "Sweet"], description: "Pineapple juice and coconut cream blended with ice: Puerto Rico's famous drink, without the rum.", prep: 4, make: 2, difficulty: "Easy", image: pexels(28575243), sourceName: "Swiggy — types of mocktails", sourceUrl: "https://blog.swiggy.com/food/types-of-mocktails/", notes: "The mocktail version of the better-known drink. There is also a Virgin Piña Colada Smoothie, which is blended with whole pineapple." },
    [L("pineapple", "Pineapple juice", "120 ml"), L("coconut-cream", "Coconut cream", "60 ml"), L("lime", "Lime, a squeeze", "1 tsp", true), ICE()],
    { blend: "the pineapple juice, coconut cream, lime juice (if using) and ice", hand: "Put the pineapple juice, coconut cream and lime juice (if using) in a lidded jar with the crushed ice", post: ["Pour into a hurricane glass, garnish with a pineapple wedge and a cherry, and serve right away."] }
  ),
];
