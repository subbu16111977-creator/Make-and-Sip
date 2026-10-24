import type { Recipe, RecipeIngredient } from "@/types";
import { drink, pexels } from "./builders";
import { steepIngredients, steepMethods, type SteepSpec } from "./teaBuilders";

/** Caffeine-free herbal infusions and spiced milks. */

const steeped = (facts: Parameters<typeof drink>[0], spec: SteepSpec): Recipe => drink(facts, steepIngredients(spec), steepMethods(spec));
const honey = (tsp = 1): RecipeIngredient => ({ pantryId: "honey", label: "Honey, to taste", amount: `${tsp} tsp`, optional: true });
const lemon = (label = "Lemon slice or wedge"): RecipeIngredient => ({ pantryId: "lemon", label, amount: "1", optional: true });

export const herbalTeas: Recipe[] = [
  steeped(
    {
      id: "chamomile-tea", title: "Chamomile Tea", type: "Tea", temperature: "hot", diet: ["Caffeine-Free", "Dairy-Free", "Gluten-Free"], taste: ["Herbal", "Sweet"],
      description: "A soft, apple-scented infusion of dried chamomile flowers — gentle and caffeine-free, the classic cup for the end of the day.",
      prep: 2, make: 6, difficulty: "Easy", image: pexels(17125135),
      sourceName: "Wikipedia — Chamomile tea", sourceUrl: "https://en.wikipedia.org/wiki/Chamomile#Tea",
      notes: "Cover the cup while it steeps, to keep the fragrant oils from escaping with the steam.",
    },
    { leaf: { pantryId: "chamomile-tea", label: "Dried chamomile (flowers, or 1 tea bag)", amount: "2 tsp" }, waterMl: 250, tempC: 100, minutes: 5, lines: [honey()], after: ["Stir in a little honey, if you like, and drink warm."] }
  ),
  steeped(
    {
      id: "peppermint-tea", title: "Peppermint Tea", type: "Tea", temperature: "hot", diet: ["Caffeine-Free", "Vegan", "Dairy-Free", "Low Sugar", "Gluten-Free"], taste: ["Herbal", "Refreshing"],
      description: "Fresh, cooling and naturally caffeine-free: dried peppermint leaves steeped in boiling water.",
      prep: 1, make: 6, difficulty: "Easy", image: pexels(36228280),
      sourceName: "Wikipedia — Peppermint", sourceUrl: "https://en.wikipedia.org/wiki/Peppermint",
      notes: "Cover the cup while it steeps so the menthol stays in the tea.",
    },
    { leaf: { pantryId: "peppermint-tea", label: "Dried peppermint (leaves, or 1 tea bag)", amount: "1 tbsp" }, waterMl: 250, tempC: 100, minutes: 5, lines: [lemon("Lemon wedge")], after: ["Add a squeeze of lemon if you like, and drink warm."] }
  ),
  steeped(
    {
      id: "ginger-lemon-honey-tea", title: "Ginger, Lemon & Honey Tea", type: "Tea", temperature: "hot", diet: ["Caffeine-Free", "Dairy-Free", "Gluten-Free"], taste: ["Spicy", "Tangy", "Sweet"],
      description: "Fresh ginger steeped in hot water, with lemon and honey added at the end — warming, sharp and soothing.",
      prep: 4, make: 10, difficulty: "Easy", image: pexels(34928359),
      notes: "Add the lemon and honey once the tea has cooled slightly: very hot water dulls the lemon's brightness and honey's flavour.",
    },
    {
      leaf: { pantryId: "ginger", label: "Fresh ginger, sliced thin", amount: "15 g" }, waterMl: 250, tempC: 100, minutes: 8,
      lines: [{ pantryId: "lemon", label: "Lemon, juiced", amount: "1/2" }, { pantryId: "honey", label: "Honey", amount: "2 tsp" }],
      after: ["Take out the ginger slices, then stir in the lemon juice and honey until dissolved and drink warm."],
    }
  ),
  steeped(
    {
      id: "hibiscus-tea", title: "Hibiscus Tea (Karkadé)", type: "Tea", temperature: "hot", diet: ["Caffeine-Free", "Vegan", "Dairy-Free", "Gluten-Free"], taste: ["Tangy", "Fruity", "Refreshing"],
      description: "Deep-red dried hibiscus flowers steeped in hot water: tart, cranberry-like and caffeine-free, served hot or iced across Egypt and Sudan.",
      prep: 2, make: 7, difficulty: "Easy", image: pexels(38293145),
      sourceName: "Wikipedia — Hibiscus tea", sourceUrl: "https://en.wikipedia.org/wiki/Hibiscus_tea",
      notes: "Naturally tart. Most people sweeten it a little.",
    },
    { leaf: { pantryId: "hibiscus-flowers", label: "Dried hibiscus flowers", amount: "1 tbsp" }, waterMl: 250, tempC: 100, minutes: 5, lines: [{ pantryId: "sugar", label: "Sugar, to taste", amount: "2 tsp", optional: true }], after: ["Sweeten to taste and drink warm."] }
  ),
  drink(
    {
      id: "rooibos-latte", title: "Rooibos Latte (Red Latte)", type: "Tea", temperature: "hot", diet: ["Caffeine-Free", "Gluten-Free"], taste: ["Creamy", "Sweet", "Herbal"],
      description: "Strong rooibos topped with frothed milk and a little vanilla and honey — a caffeine-free tea latte.",
      prep: 4, make: 8, difficulty: "Easy", image: pexels(14668084),
    },
    [
      { pantryId: "rooibos-tea", label: "Rooibos (loose leaf, or 2 tea bags)", amount: "2 tsp" },
      { pantryId: "water", label: "Freshly boiled water", amount: "120 ml" },
      { pantryId: "milk", label: "Whole milk", amount: "120 ml" },
      { pantryId: "honey", label: "Honey", amount: "1 tsp" },
      { pantryId: "vanilla-extract", label: "Vanilla extract", amount: "1/4 tsp", optional: true },
    ],
    [
      {
        id: "milk-frother", label: "Hand frother", equipment: ["Milk Frother"], handTools: ["Mug", "Saucepan"],
        steps: ["Steep the rooibos in the 120 ml of boiling water in a mug for 6 minutes, then remove the tea.", "Warm the milk in a saucepan until steaming, about 65°C, and froth it with the hand frother until it doubles in volume.", "Stir the honey (and vanilla, if using) into the tea, then pour in the frothed milk, spooning the foam on top."],
      },
      {
        id: "by-hand", label: "By hand", equipment: [], handTools: ["Mug", "Saucepan", "Lidded jar"],
        steps: ["Steep the rooibos in the 120 ml of boiling water in a mug for 6 minutes, then remove the tea.", "Warm the milk in a saucepan until steaming, about 65°C, pour it into a lidded jar and shake hard for 30 seconds until foamy.", "Stir the honey (and vanilla, if using) into the tea, then pour in the frothed milk, spooning the foam on top."],
      },
    ]
  ),
  steeped(
    {
      id: "tulsi-tea", title: "Tulsi Tea", type: "Tea", temperature: "hot", diet: ["Caffeine-Free", "Vegan", "Dairy-Free", "Low Sugar", "Gluten-Free"], taste: ["Herbal", "Spicy"],
      description: "Holy basil leaves steeped in boiling water: clove-like, peppery and slightly sweet, a staple of Ayurvedic tradition.",
      prep: 2, make: 7, difficulty: "Easy", image: pexels(33576619),
      sourceName: "Wikipedia — Ocimum tenuiflorum", sourceUrl: "https://en.wikipedia.org/wiki/Ocimum_tenuiflorum",
      notes: "Fresh or dried leaves both work. Add a slice of ginger for a stronger cup.",
    },
    { leaf: { pantryId: "tulsi", label: "Tulsi leaves (10–12 fresh, or 1 tbsp dried)", amount: "1 tbsp" }, waterMl: 250, tempC: 100, minutes: 5, after: ["Drink warm, with honey if you like."] }
  ),
  drink(
    {
      id: "golden-milk", title: "Golden Milk (Turmeric Latte)", type: "Tea", temperature: "hot", diet: ["Caffeine-Free", "Gluten-Free"], taste: ["Spicy", "Creamy", "Sweet"],
      description: "Warm milk simmered with turmeric, cinnamon and ginger — earthy, gently spiced and golden yellow.",
      prep: 3, make: 6, difficulty: "Easy", image: pexels(2633406),
      sourceName: "Wikipedia — Golden milk", sourceUrl: "https://en.wikipedia.org/wiki/Golden_milk",
      notes: "A pinch of black pepper is traditional. Whisk well so the spices don't settle.",
    },
    [
      { pantryId: "milk", label: "Whole milk (or a milk alternative)", amount: "250 ml" },
      { pantryId: "turmeric-powder", label: "Ground turmeric", amount: "1/2 tsp" },
      { pantryId: "cinnamon", label: "Ground cinnamon", amount: "1/4 tsp" },
      { pantryId: "ground-ginger", label: "Ground ginger", amount: "1/4 tsp" },
      { pantryId: "black-pepper", label: "Black pepper, freshly ground", amount: "1 pinch" },
      { pantryId: "honey", label: "Honey, to taste", amount: "1 tsp" },
    ],
    [
      {
        id: "saucepan", label: "Saucepan", equipment: [], handTools: ["Small saucepan", "Whisk or spoon", "Mug"],
        optionalEquipment: [{ tag: "Milk Frother", without: "Whisk hard with a balloon whisk, or shake the hot milk in a lidded jar, to bring up a little foam." }],
        steps: ["Put the milk, turmeric, cinnamon, ginger and pepper in a small saucepan and whisk to combine.", "Heat gently, whisking now and then, for about 5 minutes, until it steams. Don't let it boil.", "Take it off the heat, stir in the honey and pour into a mug, using a strainer if you'd like it smooth."],
      },
    ]
  ),
  steeped(
    {
      id: "butterfly-pea-tea", title: "Butterfly Pea Flower Tea", type: "Tea", temperature: "hot", diet: ["Caffeine-Free", "Vegan", "Dairy-Free", "Low Sugar", "Gluten-Free"], taste: ["Herbal", "Refreshing"],
      description: "Dried butterfly pea flowers turn hot water a deep blue; a squeeze of lemon changes it to violet.",
      prep: 2, make: 7, difficulty: "Easy", image: pexels(34439031),
      sourceName: "Wikipedia — Clitoria ternatea", sourceUrl: "https://en.wikipedia.org/wiki/Clitoria_ternatea",
      notes: "The flavour is mild and earthy, so most of the fun is the colour change when you add something acidic.",
    },
    { leaf: { pantryId: "butterfly-pea-flowers", label: "Dried butterfly pea flowers", amount: "1 tsp" }, waterMl: 250, tempC: 100, minutes: 5, lines: [lemon("Lemon wedge, to change the colour")], after: ["Take out the flowers, then squeeze in a little lemon and watch the tea turn violet. Drink warm."] }
  ),
  steeped(
    {
      id: "lavender-honey-tea", title: "Lavender Honey Tea", type: "Tea", temperature: "hot", diet: ["Caffeine-Free", "Dairy-Free", "Gluten-Free"], taste: ["Herbal", "Sweet"],
      description: "Culinary lavender buds steeped briefly in hot water and sweetened with honey — floral and calming.",
      prep: 2, make: 6, difficulty: "Easy", image: pexels(14127817),
      notes: "Use culinary lavender, and not too much: steeped for longer or in greater quantity, it turns soapy.",
    },
    { leaf: { pantryId: "lavender", label: "Dried culinary lavender buds", amount: "1 tsp" }, waterMl: 250, tempC: 100, minutes: 4, lines: [{ pantryId: "honey", label: "Honey", amount: "1 tsp" }], after: ["Strain out the buds, stir in the honey and drink warm."] }
  ),
];
