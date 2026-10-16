import type { Recipe } from "@/types";
import { pexels } from "./builders";
import { ICE, L, MUDDLER, SQUEEZER } from "./mocktailBuilders";
import { FIZZ, SCOOP, SYRUP, built, fizzy, syrupSoda } from "./sodaBuilders";

/** Fruit and herb sparkling drinks, floats with ice cream, and drinking-vinegar shrubs. */

const VEG = ["Vegan", "Dairy-Free", "Gluten-Free", "Caffeine-Free"] as const;
const DAIRY = ["Gluten-Free", "Caffeine-Free"] as const;
const wiki = (title: string, slug: string) => ({ sourceName: `Wikipedia — ${title}`, sourceUrl: `https://en.wikipedia.org/wiki/${slug}` });
const SHRUB = wiki("Shrub (drink)", "Shrub_(drink)");

export const fruitSodas: Recipe[] = [
  syrupSoda(
    { id: "mango-soda", title: "Mango Soda", diet: [...VEG], taste: ["Fruity", "Sweet", "Refreshing"], description: "Ripe mango cooked down into a golden, pulpy syrup with lime, then topped with sparkling water.", prep: 10, make: 10, wait: 15, difficulty: "Easy", image: pexels(38233296) },
    {
      syrup: [L("mango", "Ripe mangoes, peeled and chopped", "2"), L("sugar", "Sugar", "80 g"), L("water", "Water", "100 ml")],
      glass: [L("lime", "Lime juice", "1 tbsp")],
      syrupSteps: ["Simmer the mango, sugar and water for 8 minutes, until the fruit is very soft.", "Mash or blend the mixture until smooth and let it cool."],
      after: ["Stir in the lime juice."],
      garnish: "Garnish each glass with a thin slice of mango.",
      optional: [SQUEEZER],
    },
  ),
  syrupSoda(
    { id: "passion-fruit-soda", title: "Passion Fruit Soda", diet: [...VEG], taste: ["Fruity", "Tangy", "Refreshing"], description: "Tart, perfumed passion fruit pulp with sugar and lime, topped with sparkling water so the seeds float.", prep: 10, make: 5, wait: 15, difficulty: "Easy", image: pexels(6663793) },
    {
      syrup: [L("passion-fruit", "Passion fruit, pulp and seeds scooped out", "8"), L("sugar", "Sugar", "100 g"), L("water", "Water", "100 ml")],
      glass: [L("lime", "Lime juice", "1 tbsp")],
      syrupSteps: ["Warm the sugar and water until the sugar dissolves, then take it off the heat.", "Stir in the passion fruit pulp and leave it to cool. Strain out the seeds if you prefer, or keep them for crunch."],
      after: ["Stir in the lime juice."],
      garnish: "Add half a passion fruit to each glass, if you like.",
      optional: [SQUEEZER],
    },
  ),
  syrupSoda(
    { id: "blueberry-soda", title: "Blueberry Soda", diet: [...VEG], taste: ["Fruity", "Sweet", "Refreshing"], description: "Blueberries simmered until they burst into a violet syrup with lemon, then topped with fizz.", prep: 5, make: 10, wait: 15, difficulty: "Easy", image: pexels(8679184) },
    {
      syrup: [L("blueberries", "Blueberries, fresh or frozen", "250 g"), L("sugar", "Sugar", "100 g"), L("water", "Water", "120 ml"), L("lemon", "Lemon juice", "1 tbsp")],
      syrupSteps: ["Simmer the blueberries with the sugar, water and lemon juice for 8 minutes, until they have all burst.", "Mash lightly, strain through a sieve and let the syrup cool."],
      garnish: "Garnish with a few blueberries and a lemon wheel.",
    },
  ),
  syrupSoda(
    { id: "mixed-berry-soda", title: "Mixed Berry Soda", diet: [...VEG], taste: ["Fruity", "Tangy", "Refreshing"], description: "Strawberries, raspberries and blueberries cooked into one ruby syrup, then topped with sparkling water.", prep: 10, make: 10, wait: 15, difficulty: "Easy", image: pexels(28525183) },
    {
      syrup: [L("strawberry", "Strawberries, hulled", "150 g"), L("raspberries", "Raspberries", "100 g"), L("blueberries", "Blueberries", "100 g"), L("sugar", "Sugar", "120 g"), L("water", "Water", "100 ml")],
      syrupSteps: ["Simmer all the berries with the sugar and water for 10 minutes, until soft and syrupy.", "Mash lightly, strain through a sieve and let the syrup cool."],
      garnish: "Add a few whole berries to each glass.",
    },
  ),
  fizzy(
    { id: "blackcurrant-soda", title: "Blackcurrant Soda", diet: [...VEG], taste: ["Fruity", "Tangy", "Sweet"], description: "Blackcurrant cordial with a squeeze of lemon and sparkling water: deep purple, tart and very British.", prep: 3, make: 1, difficulty: "Easy", image: pexels(28283605) },
    [L("blackcurrant-cordial", "Blackcurrant cordial", "40 ml"), L("lemon", "Lemon, juiced", "1/2"), FIZZ(200), ICE()],
    ["Fill a tall glass with ice.", "Pour in the cordial and the lemon juice and stir.", "Top up with the sparkling water, pouring slowly, and stir once.", "Garnish with a lemon wheel."],
    [SQUEEZER],
  ),
  fizzy(
    { id: "pomegranate-soda", title: "Pomegranate Soda", diet: [...VEG], taste: ["Fruity", "Tangy", "Refreshing"], description: "Pomegranate juice with lime and a little syrup, topped with sparkling water and scattered with seeds.", prep: 4, make: 1, difficulty: "Easy", image: pexels(8679389) },
    [L("pomegranate", "Pomegranate juice, plus a few seeds to garnish", "80 ml"), L("lime", "Lime, juiced", "1/2"), SYRUP(1), FIZZ(150), ICE()],
    ["Fill a tall glass with ice.", "Pour in the pomegranate juice, lime juice and sugar syrup and stir.", "Top up with the sparkling water, pouring slowly.", "Scatter a few pomegranate seeds over the top, if you have them."],
    [SQUEEZER],
  ),
  fizzy(
    { id: "cranberry-spritzer", title: "Cranberry Spritzer", diet: [...VEG], taste: ["Tangy", "Fruity", "Refreshing"], description: "Cranberry juice with lime and sparkling water over ice: tart, ruby and not too sweet.", prep: 3, make: 1, difficulty: "Easy", image: pexels(32580644) },
    [L("cranberry-juice", "Cranberry juice, chilled", "100 ml"), L("lime", "Lime, juiced", "1/2"), FIZZ(150), ICE()],
    ["Fill a tall glass with ice.", "Pour in the cranberry juice and the lime juice.", "Top up with the sparkling water, pouring slowly, and stir once.", "Garnish with a lime wheel and a few cranberries."],
    [SQUEEZER],
  ),
  fizzy(
    { id: "lychee-soda", title: "Lychee Soda", diet: [...VEG], taste: ["Fruity", "Sweet", "Refreshing"], description: "Lychees and a little of their syrup crushed with lime, then topped with sparkling water: floral, juicy and pale.", prep: 5, make: 2, difficulty: "Easy", image: pexels(12849755) },
    [L("lychee", "Lychees, canned, with 3 tbsp of their syrup", "6"), L("lime", "Lime, juiced", "1/2"), FIZZ(180), ICE()],
    ["Put three of the lychees and the syrup in a tall glass and crush them with a muddler or the back of a spoon.", "Add the lime juice and fill the glass with ice.", "Top up with the sparkling water, pouring slowly, and stir once.", "Garnish with the remaining lychees."],
    [MUDDLER, SQUEEZER],
  ),
  syrupSoda(
    { id: "rosemary-lemon-soda", title: "Rosemary Lemon Soda", diet: [...VEG], taste: ["Herbal", "Tangy", "Refreshing"], description: "A rosemary syrup with fresh lemon juice and sparkling water: piney, bright and grown-up.", prep: 10, make: 8, wait: 20, difficulty: "Easy", image: pexels(13439701) },
    {
      syrup: [L("rosemary", "Fresh rosemary sprigs", "4"), L("sugar", "Sugar", "120 g"), L("water", "Water", "200 ml")],
      glass: [L("lemon", "Lemons, juiced", "2")],
      syrupSteps: ["Heat the rosemary, sugar and water, stirring until the sugar dissolves, and simmer for 5 minutes.", "Take off the heat and leave to steep for 20 minutes, then strain and let the syrup cool."],
      after: ["Stir in the lemon juice."],
      garnish: "Garnish each glass with a rosemary sprig and a lemon wheel.",
      optional: [SQUEEZER],
    },
  ),
  fizzy(
    { id: "cucumber-lime-soda", title: "Cucumber Lime Soda", diet: [...VEG], taste: ["Refreshing", "Herbal", "Tangy"], description: "Crushed cucumber, lime and mint with a little syrup and sparkling water: cool, green and very clean.", prep: 5, make: 2, difficulty: "Easy", image: pexels(6541793) },
    [L("cucumber", "Cucumber, peeled and chopped", "1/2"), L("lime", "Lime, juiced", "1"), SYRUP(1), L("fresh-mint", "Fresh mint leaves", "4", true), FIZZ(150), ICE()],
    ["Crush the cucumber, mint and sugar syrup in a tall glass with a muddler or the back of a spoon until juicy.", "Add the lime juice and fill the glass with ice.", "Top up with the sparkling water, pouring slowly, and stir once.", "Garnish with a cucumber ribbon."],
    [MUDDLER, SQUEEZER],
  ),
  built(
    { id: "bitter-lemon", title: "Bitter Lemon", diet: [...VEG], taste: ["Bitter", "Tangy", "Refreshing"], description: "Fresh lemon juice and a little sugar over tonic water: dry, bitter and sharp, the grown-up lemon soda.", prep: 3, make: 1, difficulty: "Easy", image: pexels(8679533), ...wiki("Bitter lemon", "Bitter_lemon") },
    [L("lemon", "Lemon, juiced", "1/2"), SYRUP(1), L("tonic-water", "Tonic water, chilled", "150 ml"), ICE()],
    ["Fill a tall glass with ice.", "Add the lemon juice and the sugar syrup and stir.", "Top up with the tonic water, pouring slowly.", "Garnish with a lemon twist."],
    [SQUEEZER],
  ),
  fizzy(
    { id: "orange-ginger-soda", title: "Orange Ginger Soda", diet: [...VEG], taste: ["Spicy", "Fruity", "Refreshing"], description: "Orange juice with fresh ginger and a spoon of syrup, topped with sparkling water: bright, warming and light.", prep: 5, make: 1, difficulty: "Easy", image: pexels(11995609) },
    [L("orange-juice", "Orange juice, chilled", "80 ml"), L("ginger", "Fresh ginger, finely grated", "1 tsp"), SYRUP(1), FIZZ(150), ICE()],
    ["Put the grated ginger and the sugar syrup in a tall glass and press the ginger with the back of a spoon.", "Add the orange juice and fill the glass with ice.", "Top up with the sparkling water, pouring slowly, and stir once.", "Garnish with an orange wheel."],
    [MUDDLER],
  ),
  fizzy(
    { id: "strawberry-soda-float", title: "Strawberry Soda Float", diet: [...DAIRY], taste: ["Sweet", "Creamy", "Fruity"], description: "Strawberry soda with scoops of vanilla ice cream floating on top: pink, foamy and meant to be eaten with a spoon.", prep: 4, make: 1, difficulty: "Easy", image: pexels(6542777), ...wiki("Ice cream float", "Ice_cream_float") },
    [L("strawberry-syrup", "Strawberry syrup", "40 ml"), FIZZ(200), L("vanilla-ice-cream", "Vanilla ice cream", "2 scoops")],
    ["Chill a tall glass in the freezer for a few minutes.", "Pour the strawberry syrup into the glass.", "Add the ice cream, then pour the sparkling water slowly down the side of the glass: it will foam, so stop and let it settle if it climbs.", "Serve with a long spoon and a straw."],
    [SCOOP],
  ),
  fizzy(
    { id: "orange-cream-float", title: "Orange Cream Float", diet: [...DAIRY], taste: ["Sweet", "Creamy", "Fruity"], description: "Orange soda with vanilla ice cream: the creamsicle in a glass, tangy, sweet and cold.", prep: 4, make: 1, difficulty: "Easy", image: pexels(32972512), ...wiki("Ice cream float", "Ice_cream_float") },
    [L("orange-juice", "Orange juice, chilled", "100 ml"), SYRUP(1), FIZZ(150), L("vanilla-ice-cream", "Vanilla ice cream", "2 scoops")],
    ["Chill a tall glass in the freezer for a few minutes.", "Stir the orange juice and the sugar syrup together in the glass.", "Add the ice cream, then pour the sparkling water slowly down the side of the glass, letting the foam settle if it climbs.", "Serve with a long spoon and a straw."],
    [SCOOP],
  ),
  syrupSoda(
    { id: "strawberry-shrub-soda", title: "Strawberry Shrub Soda", diet: [...VEG], taste: ["Tangy", "Fruity", "Sweet"], description: "A shrub, or drinking vinegar: strawberries left in sugar overnight, then sharpened with cider vinegar. Sweet-sour and very refreshing when fizzed.", prep: 10, make: 5, wait: 1440, difficulty: "Easy", image: pexels(27412347), ...SHRUB },
    {
      syrup: [L("strawberry", "Strawberries, hulled and sliced", "300 g"), L("sugar", "Sugar", "200 g"), L("apple-cider-vinegar", "Apple cider vinegar", "120 ml")],
      syrupSteps: ["Toss the strawberries with the sugar in a bowl, cover and leave in the fridge for 24 hours, stirring once or twice, until the sugar has become a syrup.", "Strain through a sieve, pressing the fruit to get all the juice out.", "Stir the cider vinegar into the syrup."],
      garnish: "Garnish with a strawberry slice.",
    },
  ),
  syrupSoda(
    { id: "ginger-shrub-soda", title: "Ginger Shrub Soda", diet: [...VEG], taste: ["Spicy", "Tangy", "Refreshing"], description: "A ginger syrup sharpened with cider vinegar and lemon: hot, sour and sweet at once, and very good fizzed.", prep: 10, make: 15, wait: 30, difficulty: "Easy", image: pexels(13425810), ...SHRUB },
    {
      syrup: [L("ginger", "Fresh ginger, peeled and thinly sliced", "100 g"), L("sugar", "Sugar", "200 g"), L("water", "Water", "200 ml"), L("apple-cider-vinegar", "Apple cider vinegar", "150 ml")],
      glass: [L("lemon", "Lemon, juiced", "1")],
      syrupSteps: ["Simmer the ginger, sugar and water for 10 minutes, then leave to steep for 30 minutes.", "Strain the syrup, let it cool, and stir in the cider vinegar."],
      after: ["Stir in the lemon juice."],
      garnish: "Add a slice of ginger and a lemon wheel to each glass.",
      optional: [SQUEEZER],
    },
  ),
  syrupSoda(
    { id: "apple-cider-shrub-soda", title: "Apple Cider Shrub Soda", diet: [...VEG], taste: ["Tangy", "Sweet", "Spicy"], description: "Apples simmered with cinnamon and sugar, sharpened with cider vinegar, then fizzed: an autumn soda that is tart, spiced and crisp.", prep: 10, make: 20, wait: 30, difficulty: "Easy", image: pexels(8679599), ...SHRUB },
    {
      syrup: [L("apple", "Apples, cored and chopped", "2"), L("cinnamon-stick", "Cinnamon stick", "1"), L("sugar", "Sugar", "150 g"), L("water", "Water", "200 ml"), L("apple-cider-vinegar", "Apple cider vinegar", "120 ml")],
      syrupSteps: ["Simmer the apples, cinnamon, sugar and water for 15 minutes, until the apples are very soft.", "Strain through a sieve, pressing the apples, and let the syrup cool.", "Stir in the cider vinegar."],
      garnish: "Garnish with a thin apple slice and a pinch of cinnamon.",
    },
  ),
];
