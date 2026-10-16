import type { Recipe, TasteTag } from "@/types";
import { pexels } from "./builders";
import { ICE, L, MUDDLER, SQUEEZER } from "./mocktailBuilders";
import { FIZZ, SYRUP, fizzy, syrupSoda } from "./sodaBuilders";
import type { MocktailFacts } from "./mocktailBuilders";

/** Italian sodas, and the lime, spice and flower sodas of India, Japan and Korea. */

const VEG = ["Vegan", "Dairy-Free", "Gluten-Free", "Caffeine-Free"] as const;
const wiki = (title: string, slug: string) => ({ sourceName: `Wikipedia — ${title}`, sourceUrl: `https://en.wikipedia.org/wiki/${slug}` });
const ITALIAN = wiki("Italian soda", "Italian_soda");

/** An Italian soda: a flavoured syrup and sparkling water over ice, one glass at a time. */
function italian(id: string, name: string, syrupId: string, syrupLabel: string, description: string, image: number, garnish: string, taste: TasteTag[]): Recipe {
  const facts: MocktailFacts = { id, title: `${name} Italian Soda`, diet: [...VEG], taste, description, prep: 3, make: 1, difficulty: "Easy", image: pexels(image), ...ITALIAN };
  return fizzy(
    facts,
    [L(syrupId, syrupLabel, "30 ml"), FIZZ(200), ICE()],
    ["Fill a tall glass with ice.", "Pour in the syrup.", "Top up slowly with the sparkling water and stir once, gently, from the bottom.", garnish],
    [],
  );
}

export const worldSodas: Recipe[] = [
  italian("strawberry-italian-soda", "Strawberry", "strawberry-syrup", "Strawberry syrup", "Strawberry syrup and sparkling water over ice: pink, sweet and the one everyone orders first.", 17653580, "Garnish with a strawberry on the rim.", ["Fruity", "Sweet", "Refreshing"]),
  italian("raspberry-italian-soda", "Raspberry", "raspberry-syrup", "Raspberry syrup", "Raspberry syrup stirred through sparkling water: a little tart, deep pink and very fizzy.", 10477118, "Garnish with two or three raspberries.", ["Fruity", "Tangy", "Refreshing"]),
  italian("peach-italian-soda", "Peach", "peach-syrup", "Peach syrup", "Peach syrup and sparkling water: soft, golden and gently sweet.", 461210, "Garnish with a thin peach slice.", ["Fruity", "Sweet", "Refreshing"]),
  italian("cherry-italian-soda", "Cherry", "cherry-syrup", "Cherry syrup", "Cherry syrup over ice with sparkling water: bright red and nostalgic.", 8093442, "Garnish with a cherry.", ["Fruity", "Sweet", "Refreshing"]),
  italian("blackberry-italian-soda", "Blackberry", "blackberry-syrup", "Blackberry syrup", "Blackberry syrup and sparkling water: dark, jammy and slightly wild.", 8093446, "Garnish with a blackberry and a lemon wedge.", ["Fruity", "Sweet", "Refreshing"]),
  italian("lavender-italian-soda", "Lavender", "lavender-syrup", "Lavender syrup", "Lavender syrup and sparkling water: floral, pale and very calm.", 4448078, "Garnish with a few lavender buds.", ["Herbal", "Sweet", "Refreshing"]),
  fizzy(
    { id: "lemon-italian-soda", title: "Lemon Italian Soda", diet: [...VEG], taste: ["Tangy", "Sweet", "Refreshing"], description: "Fresh lemon juice and sugar syrup topped with sparkling water: the sharp, simple one.", prep: 4, make: 1, difficulty: "Easy", image: pexels(16736473), ...ITALIAN },
    [L("lemon", "Lemon, juiced", "1/2"), SYRUP(2), FIZZ(200), ICE()],
    ["Fill a tall glass with ice.", "Add the lemon juice and the sugar syrup and stir.", "Top up slowly with the sparkling water.", "Garnish with a lemon wheel."],
    [SQUEEZER],
  ),
  fizzy(
    { id: "italian-cream-soda", title: "Italian Cream Soda", diet: ["Gluten-Free", "Caffeine-Free"], taste: ["Creamy", "Sweet", "Refreshing"], description: "Vanilla syrup and sparkling water finished with a swirl of cream: the soda-shop favourite, pale and silky.", prep: 3, make: 1, difficulty: "Easy", image: pexels(16630831), ...ITALIAN },
    [L("vanilla-syrup", "Vanilla syrup", "30 ml"), FIZZ(180), L("half-and-half", "Half-and-half or single cream", "30 ml"), ICE()],
    ["Fill a tall glass with ice.", "Pour in the vanilla syrup, then the sparkling water, slowly.", "Float the cream on top by pouring it over the back of a spoon.", "Stir gently if you like it blended, and serve."],
  ),
  fizzy(
    { id: "fresh-lime-soda-sweet", title: "Sweet Fresh Lime Soda", diet: [...VEG], taste: ["Tangy", "Sweet", "Refreshing"], description: "India's everyday cooler: fresh lime, sugar syrup and a few mint leaves, topped with soda until it fizzes up.", prep: 4, make: 1, difficulty: "Easy", image: pexels(9996446) },
    [L("lime", "Lime, juiced", "1"), SYRUP(2), L("fresh-mint", "Fresh mint leaves", "4", true), FIZZ(200), ICE()],
    ["Put the mint (if using) in a tall glass and press it lightly with a spoon.", "Add the lime juice and the sugar syrup, then fill the glass with ice.", "Top up with the sparkling water, pouring slowly down the side.", "Stir once and serve with a lime wheel."],
    [SQUEEZER],
  ),
  fizzy(
    { id: "fresh-lime-soda-salted", title: "Salted Fresh Lime Soda", diet: [...VEG], taste: ["Tangy", "Refreshing", "Spicy"], description: "The savoury way to take lime soda: salt, a little roasted cumin and no sugar. Sharp and thirst-quenching in hot weather.", prep: 3, make: 1, difficulty: "Easy", image: pexels(16970621) },
    [L("lime", "Lime, juiced", "1"), L("salt", "Salt", "1/4 tsp"), L("cumin-powder", "Roasted cumin powder", "1/4 tsp", true), FIZZ(200), ICE()],
    ["Put the lime juice, salt and cumin (if using) in a tall glass and stir until the salt dissolves.", "Fill the glass with ice.", "Top up with the sparkling water, pouring slowly, and stir once.", "Serve right away, with a lime wedge."],
    [SQUEEZER],
  ),
  fizzy(
    { id: "masala-soda", title: "Masala Soda", diet: [...VEG], taste: ["Spicy", "Tangy", "Refreshing"], description: "The spiced street soda of India: lime, black salt, roasted cumin, ginger and a little chilli, topped with soda until it fizzes.", prep: 5, make: 1, difficulty: "Easy", image: pexels(9787746) },
    [L("lime", "Lime, juiced", "1"), L("black-salt", "Black salt", "1/4 tsp"), L("cumin-powder", "Roasted cumin powder", "1/4 tsp"), L("chili-powder", "Chilli powder", "1/8 tsp"), L("ginger", "Fresh ginger, finely grated", "1 tsp"), L("sugar", "Sugar", "1 tsp"), L("fresh-mint", "Fresh mint leaves", "4", true), FIZZ(200), ICE()],
    ["Put the lime juice, black salt, cumin, chilli, ginger, sugar and mint in a tall glass and muddle for a few seconds.", "Fill the glass with ice.", "Top up with the sparkling water, pouring slowly, and stir once.", "Serve right away, with a lime wedge."],
    [MUDDLER, SQUEEZER],
  ),
  fizzy(
    { id: "nimbu-adrak-soda", title: "Nimbu Adrak Soda", diet: [...VEG], taste: ["Spicy", "Tangy", "Refreshing"], description: "Lime and fresh ginger with a pinch of black salt, topped with soda: sharp, warming and good for the stomach.", prep: 5, make: 1, difficulty: "Easy", image: pexels(32334432) },
    [L("lime", "Lime, juiced", "1"), L("ginger", "Fresh ginger, finely grated", "2 tsp"), SYRUP(1), L("black-salt", "Black salt", "1/4 tsp"), FIZZ(200), ICE()],
    ["Put the grated ginger in a tall glass and press it with the back of a spoon to release the juice.", "Add the lime juice, the sugar syrup and the black salt, and stir.", "Fill the glass with ice and top up with the sparkling water, pouring slowly.", "Serve with a lime wheel."],
    [MUDDLER, SQUEEZER],
  ),
  fizzy(
    { id: "mosambi-soda", title: "Mosambi Soda", diet: [...VEG], taste: ["Sweet", "Tangy", "Refreshing"], description: "Fresh sweet-lime juice with black salt and a splash of soda: mild, juicy and a little savoury.", prep: 6, make: 1, difficulty: "Easy", image: pexels(38441763) },
    [L("mosambi", "Sweet limes (mosambi), juiced", "2"), L("black-salt", "Black salt", "1/4 tsp"), L("sugar", "Sugar", "1 tsp", true), FIZZ(100), ICE()],
    ["Squeeze the sweet limes and strain the juice into a tall glass.", "Stir in the black salt, and the sugar if the fruit is not very sweet.", "Fill the glass with ice and top up with the sparkling water, pouring slowly.", "Serve right away."],
    [SQUEEZER],
  ),
  fizzy(
    { id: "rose-soda", title: "Rose Soda", diet: [...VEG], taste: ["Sweet", "Herbal", "Refreshing"], description: "Rose syrup with a squeeze of lime and sparkling water: pink, fragrant and not too sweet.", prep: 3, make: 1, difficulty: "Easy", image: pexels(5946993) },
    [L("rose-syrup", "Rose syrup", "40 ml"), L("lime", "Lime, juiced", "1/2"), FIZZ(200), ICE()],
    ["Fill a tall glass with ice.", "Pour in the rose syrup and the lime juice and stir.", "Top up with the sparkling water, pouring slowly, and stir once.", "Garnish with a few dried rose petals if you have them."],
    [SQUEEZER],
  ),
  syrupSoda(
    { id: "pineapple-mint-soda", title: "Pineapple Mint Soda", diet: [...VEG], taste: ["Fruity", "Herbal", "Refreshing"], description: "Pineapple cooked down with sugar and a handful of mint, then fizzed: tropical, fresh and not as sweet as it looks.", prep: 10, make: 15, wait: 15, difficulty: "Easy", image: pexels(5668261) },
    {
      syrup: [L("pineapple", "Pineapple, peeled and chopped", "300 g"), L("sugar", "Sugar", "100 g"), L("water", "Water", "150 ml"), L("fresh-mint", "Fresh mint leaves", "10")],
      glass: [L("lime", "Lime juice", "1 tbsp")],
      syrupSteps: ["Simmer the pineapple, sugar and water for 12 minutes, until the fruit is soft and the liquid is syrupy.", "Add the mint, mash lightly and leave to steep for 10 minutes, then strain and let the syrup cool."],
      after: ["Stir in the lime juice."],
      garnish: "Garnish with a pineapple wedge and a sprig of mint.",
      optional: [SQUEEZER],
    },
  ),
  fizzy(
    { id: "ramune-style-soda", title: "Ramune-Style Soda", diet: [...VEG], taste: ["Sweet", "Tangy", "Refreshing"], description: "A lemon-lime soda in the style of Japan's marble-bottle ramune: sweeter and rounder than the western kind, with a tiny pinch of salt.", prep: 4, make: 1, difficulty: "Easy", image: pexels(4045205), ...wiki("Ramune", "Ramune") },
    [L("lemon", "Lemon, juiced", "1/2"), L("lime", "Lime, juiced", "1/2"), SYRUP(3), L("salt", "Salt", "1/8 tsp"), FIZZ(200), ICE()],
    ["Stir the lemon juice, lime juice, sugar syrup and salt together in a tall glass.", "Fill the glass with ice.", "Top up with the sparkling water, pouring slowly, and stir once.", "Serve with a lemon wheel and a straw."],
    [SQUEEZER],
  ),
  fizzy(
    { id: "maesil-soda", title: "Maesil Soda", diet: [...VEG], taste: ["Tangy", "Sweet", "Refreshing"], description: "Korean green-plum syrup (maesil-cheong) over ice with sparkling water: tart, fruity and a little like apricot.", prep: 3, make: 1, difficulty: "Easy", image: pexels(19299992), ...wiki("Maesil-cheong", "Maesil-cheong") },
    [L("maesil-syrup", "Maesil syrup (Korean green plum syrup)", "40 ml"), L("lemon", "Lemon slice", "1", true), FIZZ(200), ICE()],
    ["Fill a tall glass with ice.", "Pour in the maesil syrup.", "Top up with the sparkling water, pouring slowly, and stir once.", "Add a lemon slice, if you like, and serve."],
  ),
];
