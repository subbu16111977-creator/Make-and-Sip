import type { DietTag, Method, OptionalEquipment, Recipe, RecipeIngredient, TasteTag } from "@/types";

/**
 * Helpers for writing drinks, so the many espresso-style drinks share one correct way of making the strong coffee and
 * only spell out what is particular to each drink. Everything here returns plain data (a Recipe, Methods); nothing
 * is computed at runtime in the app.
 */

export const pexels = (id: number): string => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`;
export const unsplash = (id: string): string => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;
export const attributionFor = (url: string): string => (url.includes("pexels.com") ? "Pexels" : "Unsplash");

/** A drink's headline facts: everything except its ingredients and methods. */
export interface DrinkFacts {
  id: string;
  title: string;
  description: string;
  type: "Coffee" | "Tea" | "Milkshakes & thick shakes" | "Smoothies" | "Mocktails" | "Juices" | "Lemonades & coolers" | "Sodas & sparkling";
  temperature: "hot" | "cold";
  diet?: DietTag[];
  taste: TasteTag[];
  prep: number;
  make: number;
  /** Extra waiting time (steeping, chilling) on top of prep + make, in minutes. */
  wait?: number;
  difficulty: "Easy" | "Medium" | "Advanced";
  servings?: number;
  image: string;
  notes?: string;
  sourceName?: string;
  sourceUrl?: string;
}

/** A topping the steps call for ("top with whipped cream") must be on the list, so it can be bought and counted. */
function withToppings(lines: RecipeIngredient[], steps: string[]): RecipeIngredient[] {
  const wantsCream = steps.some((s) => /whipped cream/i.test(s));
  if (wantsCream && !lines.some((i) => i.pantryId === "heavy-cream")) return [...lines, { pantryId: "heavy-cream", label: "Whipped cream, to top", amount: "30 ml", optional: true }];
  return lines;
}

export function drink(facts: DrinkFacts, ingredients: RecipeIngredient[], methods: Method[]): Recipe {
  const allSteps = methods.flatMap((m) => m.steps);
  ingredients = withToppings(ingredients, allSteps);
  methods = methods.map((m) => (m.ingredients ? { ...m, ingredients: withToppings(m.ingredients, m.steps) } : m));
  return {
    id: facts.id,
    title: facts.title,
    description: facts.description,
    cuisine: facts.type,
    temperature: facts.temperature,
    dietTags: facts.diet ?? [],
    tasteTags: facts.taste,
    timeMinutes: facts.prep + facts.make,
    prepMinutes: facts.prep,
    cookMinutes: facts.make,
    ...(facts.wait ? { marinateMinutes: facts.wait } : {}),
    difficulty: facts.difficulty,
    servings: facts.servings ?? 1,
    budget: "$",
    image: facts.image,
    imageAttribution: attributionFor(facts.image),
    ingredients,
    methods,
    ...(facts.notes ? { notes: facts.notes } : {}),
    ...(facts.sourceName ? { sourceName: facts.sourceName } : {}),
    ...(facts.sourceUrl ? { sourceUrl: facts.sourceUrl } : {}),
  };
}

// ---------------------------------------------------------------------------
// Strong coffee: the base of most espresso-style drinks
// ---------------------------------------------------------------------------

interface Dose {
  /** Ground coffee in grams, and the water that goes through it, in ml. */
  coffeeG: number;
  waterMl: number;
  /** Teaspoons of instant coffee for the by-hand stand-in. */
  instantTsp: number;
  /** What it makes, for the steps: "a double shot (about 40 ml)". */
  yields: string;
}

const DOSES = {
  single: {
    machine: { coffeeG: 9, waterMl: 30, instantTsp: 1, yields: "a single shot, about 30 ml" },
    moka: { coffeeG: 10, waterMl: 90, instantTsp: 1, yields: "about 60 ml of strong coffee" },
    aeropress: { coffeeG: 12, waterMl: 45, instantTsp: 1, yields: "about 40 ml of strong coffee" },
    byHand: { coffeeG: 0, waterMl: 30, instantTsp: 1, yields: "30 ml of strong coffee" },
  },
  double: {
    machine: { coffeeG: 18, waterMl: 40, instantTsp: 2, yields: "a double shot, about 40 ml" },
    moka: { coffeeG: 15, waterMl: 130, instantTsp: 2, yields: "about 100 ml of strong coffee" },
    aeropress: { coffeeG: 17, waterMl: 60, instantTsp: 2, yields: "about 60 ml of strong coffee" },
    byHand: { coffeeG: 0, waterMl: 40, instantTsp: 2, yields: "40 ml of strong coffee" },
  },
} as const;

export type ShotSize = keyof typeof DOSES;

const MOKA_COFFEE = "Medium-fine ground coffee";

export interface StrongCoffeeSpec {
  /** Single or double. */
  size: ShotSize;
  /** The drink's own ingredient lines (milk, syrup, ice...), listed after the coffee. */
  lines: RecipeIngredient[];
  /** Extra cold or hot water added to the drink on top of what goes through the coffee, in ml. */
  extraWaterMl?: number;
  /** Where the coffee goes, e.g. "into the cup" — appended to the brewing step. */
  into?: string;
  /** Steps done before the coffee (prepping the glass, the syrup, the milk), the same for every method. */
  before?: string[] | ((method: "machine" | "moka" | "aeropress" | "byHand") => string[]);
  /** Steps done once the coffee is ready, the same for every method. They call it "the coffee". */
  after: string[] | ((method: "machine" | "moka" | "aeropress" | "byHand") => string[]);
  /** Equipment that makes the drink better for every method (a milk frother, a shaker), each with its tip. */
  optional?: OptionalEquipment[];
  /** Plain tools every method uses. */
  handTools?: string[];
  /** Set false for drinks that can't be made without a real brewer (a straight espresso). */
  byHand?: boolean;
  /** A note shown with the by-hand method. */
  byHandNote?: string;
  /** The ground coffee line label. */
  coffeeLabel?: string;
}

const waterLine = (ml: number, label: string): RecipeIngredient => ({ pantryId: "water", label, amount: `${ml} ml` });

function coffeeLines(d: Dose, extra: number, hot: string, mokaLabel?: string, label?: string): RecipeIngredient[] {
  const out: RecipeIngredient[] = [];
  if (d.coffeeG > 0) out.push({ pantryId: "ground-coffee", label: mokaLabel ?? label ?? "Finely ground coffee, espresso grind", amount: `${d.coffeeG} g` });
  else out.push({ pantryId: "instant-coffee", label: "Instant coffee, for a strong base", amount: `${d.instantTsp} tsp` });
  out.push(waterLine(d.waterMl + extra, extra > 0 ? `${hot}, plus water for the drink` : hot));
  return out;
}

function brewStep(kind: "machine" | "moka" | "aeropress" | "byHand", d: Dose, size: ShotSize, into: string): string {
  const tail = into ? `, ${into}` : "";
  switch (kind) {
    case "machine":
      return `Pull ${size === "double" ? "a double" : "a single"} shot: ${d.coffeeG} g of finely ground coffee pulled into about ${d.waterMl} ml of espresso${tail}.`;
    case "moka":
      return `Make the coffee in a moka pot: fill the base with hot water to just below the safety valve, fill the basket with ${d.coffeeG} g of medium-fine coffee (levelled, not pressed down) and set it on medium-low heat with the lid open. When it gurgles and turns pale, take it off the heat — you will get ${d.yields}${tail}.`;
    case "aeropress":
      return `Make the coffee in an AeroPress: add a filter and ${d.coffeeG} g of fine coffee, pour in ${d.waterMl} ml of hot water (about 85°C), stir for 10 seconds, then press down slowly for about 30 seconds — ${d.yields}${tail}.`;
    case "byHand":
      return `Dissolve ${d.instantTsp} tsp of instant coffee in ${d.waterMl} ml of just-boiled water and stir until completely smooth. Keep it concentrated — it stands in for the espresso.`;
  }
}

/** The four ways to make a strong-coffee drink: espresso machine, moka pot, AeroPress and (optionally) by hand with instant. */
export function strongCoffeeMethods(spec: StrongCoffeeSpec): Method[] {
  const extra = spec.extraWaterMl ?? 0;
  const into = spec.into ?? "";
  const kinds: ("machine" | "moka" | "aeropress" | "byHand")[] = ["machine", "moka", "aeropress", ...(spec.byHand === false ? [] : (["byHand"] as const))];
  const labels = { machine: "Espresso machine", moka: "Moka pot", aeropress: "AeroPress", byHand: "By hand" } as const;
  const equipment = { machine: ["Espresso Machine"], moka: ["Moka Pot"], aeropress: ["AeroPress"], byHand: [] } as const;
  const resolve = <T,>(v: T[] | ((m: "machine" | "moka" | "aeropress" | "byHand") => T[]) | undefined, k: "machine" | "moka" | "aeropress" | "byHand"): T[] => (typeof v === "function" ? v(k) : v ?? []);

  return kinds.map((kind, i) => {
    const d = DOSES[spec.size][kind] as Dose;
    const hot = kind === "byHand" ? "Just-boiled water" : kind === "moka" ? "Hot water, for the moka pot" : kind === "aeropress" ? "Hot water, about 85°C" : "Water, through the machine";
    const method: Method = {
      id: kind === "byHand" ? "by-hand" : kind === "machine" ? "espresso-machine" : kind === "moka" ? "moka-pot" : "aeropress",
      label: labels[kind],
      equipment: [...equipment[kind]],
      steps: [...resolve(spec.before, kind), brewStep(kind, d, spec.size, into), ...resolve(spec.after, kind)],
    };
    if (spec.handTools?.length || kind === "byHand") method.handTools = [...(spec.handTools ?? []), ...(kind === "byHand" ? ["Saucepan or kettle", "Spoon"] : [])].filter((t, idx, all) => all.indexOf(t) === idx);
    if (spec.optional?.length) method.optionalEquipment = spec.optional;
    if (kind === "byHand" && spec.byHandNote) method.notes = spec.byHandNote;
    // The first method's ingredients are the drink's standard list; others differ in the coffee and water lines.
    if (i > 0) method.ingredients = [...coffeeLines(d, extra, hot, kind === "moka" ? MOKA_COFFEE : undefined, kind === "aeropress" ? "Fine ground coffee" : spec.coffeeLabel), ...spec.lines];
    return method;
  });
}

/** The drink's standard ingredient list: the espresso-machine coffee and water, then its own lines. */
export function strongCoffeeIngredients(spec: Pick<StrongCoffeeSpec, "size" | "lines" | "extraWaterMl" | "coffeeLabel">): RecipeIngredient[] {
  const d = DOSES[spec.size].machine as Dose;
  return [...coffeeLines(d, spec.extraWaterMl ?? 0, "Water, through the machine", undefined, spec.coffeeLabel), ...spec.lines];
}

/** Steps for heating and frothing milk, worded for the equipment each method has. */
export function milkSteps(opts: { ml: number; froth: "thin" | "dense" | "none"; into?: string }): (method: "machine" | "moka" | "aeropress" | "byHand") => string[] {
  const goal = opts.froth === "dense" ? "dense and glossy, with a thick layer of foam about 2 cm deep" : opts.froth === "thin" ? "silky, with just a thin layer of fine foam" : "hot but not boiling";
  return (method) =>
    method === "machine"
      ? [`Steam the ${opts.ml} ml of milk with the wand to 60–65°C until it is ${goal}. Swirl the jug to bring it together.`]
      : opts.froth === "none"
        ? [`Heat the ${opts.ml} ml of milk in a saucepan until it steams, about 60–65°C, without letting it boil.`]
        : [`Heat the ${opts.ml} ml of milk in a saucepan to 60–65°C, without boiling. Froth it with a milk frother, or pour it into a lidded jar and shake hard for 30–45 seconds, until it is ${goal}.`];
}

export const MILK_FROTHER_TIP: OptionalEquipment = {
  tag: "Milk Frother",
  without: "Warm the milk in a saucepan to 60–65°C, then whisk hard or shake it in a lidded jar until foamy.",
};

// ---------------------------------------------------------------------------
// Cold brew and chilled-coffee bases
// ---------------------------------------------------------------------------

export interface ColdBrewSpec {
  /** The drink's own lines (ice, syrup, cream...). */
  lines: RecipeIngredient[];
  /** Steps once the cold brew (or its stand-in) is ready. They call it "the cold brew". */
  after: string[];
  optional?: OptionalEquipment[];
  handTools?: string[];
  servings?: number;
}

const COLD_BREW_COFFEE_G = 25;
const COLD_BREW_WATER_ML = 200;

export function coldBrewIngredients(spec: Pick<ColdBrewSpec, "lines">): RecipeIngredient[] {
  return [
    { pantryId: "ground-coffee", label: "Coarsely ground coffee", amount: `${COLD_BREW_COFFEE_G} g` },
    { pantryId: "water", label: "Cold water, for steeping", amount: `${COLD_BREW_WATER_ML} ml` },
    ...spec.lines,
  ];
}

/** Cold brew steeped in a pitcher or a French press, or — with no equipment — a quick stand-in from instant coffee. */
export function coldBrewMethods(spec: ColdBrewSpec): Method[] {
  const steep = `Put ${COLD_BREW_COFFEE_G} g of coarsely ground coffee and ${COLD_BREW_WATER_ML} ml of cold water in`;
  const base = (id: string, label: string, equipment: Method["equipment"], first: string[], i: number): Method => ({
    id, label, equipment: [...equipment], handTools: spec.handTools, optionalEquipment: spec.optional,
    steps: [...first, ...spec.after],
    ...(i > 0 ? { ingredients: coldBrewIngredients(spec) } : {}),
  });
  const methods: Method[] = [
    base("cold-brew-pitcher", "Cold brew pitcher", ["Cold Brew Pitcher"], [`${steep} the pitcher and stir to wet all the grounds. Cover and steep in the fridge for 12–16 hours.`, "Lift out the filter (or strain through a fine sieve lined with a paper filter). You will have about 160 ml of cold brew."], 0),
    base("french-press", "French press", ["French Press"], [`${steep} a French press, stir, and put the lid on without pressing. Leave it in the fridge for 12–16 hours.`, "Press the plunger down slowly and pour the cold brew into a jug — about 160 ml."], 1),
  ];
  const byHand: Method = {
    id: "by-hand", label: "By hand (quick)", equipment: [], waitMinutes: 0, handTools: [...(spec.handTools ?? []), "Glass", "Spoon"],
    optionalEquipment: spec.optional,
    ingredients: [
      { pantryId: "instant-coffee", label: "Instant coffee, for a quick stand-in", amount: "2 tsp" },
      { pantryId: "water", label: "Cold water", amount: "160 ml" },
      ...spec.lines,
    ],
    steps: ["Stir 2 tsp of instant coffee into 160 ml of cold water until it has completely dissolved. It is not true cold brew, but it is smooth and ready in a minute.", ...spec.after],
    notes: "Real cold brew needs 12–16 hours of steeping; this is the no-wait, no-equipment shortcut.",
  };
  return [...methods, byHand];
}

// ---------------------------------------------------------------------------
// Slow-dripped and steeped coffee: Vietnamese, Thai and Southeast Asian styles
// ---------------------------------------------------------------------------

export interface DripSpec {
  coffeeG: number;
  waterMl: number;
  /** Water used when steeping by hand (a little more, since some is left behind). */
  byHandWaterMl?: number;
  coffeeLabel?: string;
  waterLabel?: string;
  /** The drink's other ingredient lines. */
  lines: RecipeIngredient[];
  /** Steps before brewing (put condensed milk in the glass). */
  before?: string[];
  /** Steps once the coffee is ready. They call it "the coffee". */
  after: string[];
  /** Where the coffee drips or is poured. */
  into?: string;
  optional?: OptionalEquipment[];
}

/** Phin filter, French press, AeroPress and a by-hand "cowboy" steep: four ways to a strong, dark cup. */
export function dripMethods(spec: DripSpec): Method[] {
  const into = spec.into ?? "into the glass";
  const g = spec.coffeeG;
  const ml = spec.waterMl;
  const handMl = spec.byHandWaterMl ?? Math.round(ml * 1.2);
  const lines = (waterMl: number, waterLabel: string, coffeeLabel: string): RecipeIngredient[] => [
    { pantryId: "ground-coffee", label: spec.coffeeLabel ?? coffeeLabel, amount: `${g} g` },
    { pantryId: "water", label: waterLabel, amount: `${waterMl} ml` },
    ...spec.lines,
  ];
  const wl = spec.waterLabel ?? "Hot water, just off the boil";
  const pre = spec.before ?? [];
  const common = (method: Method): Method => (method.optionalEquipment || !spec.optional?.length ? method : { ...method, optionalEquipment: spec.optional });
  return [
    common({
      id: "phin-filter", label: "Phin filter", equipment: ["Phin Filter"],
      steps: [...pre, `Set the phin filter on the glass, add the ${g} g of coffee, level it and gently press the insert on top.`, "Pour in a splash of the hot water to wet the grounds, wait 30 seconds so they bloom, then fill the filter with the rest of the water and put the lid on.", `Let it drip ${into}, about 4–6 minutes — slowly, a drop at a time.`, ...spec.after],
    }),
    common({
      id: "french-press", label: "French press", equipment: ["French Press"], handTools: ["Heatproof glass"],
      ingredients: lines(ml, wl, "Dark-roast ground coffee, coarse"),
      steps: [...pre, `Put the ${g} g of coffee in a small French press, pour in the ${ml} ml of hot water and stir. Put the lid on without pressing and leave it for 4 minutes.`, `Press the plunger down slowly and pour the coffee ${into}.`, ...spec.after],
      notes: "Use a small press, or make a double batch in a normal one — a large press needs more coffee than this to stay strong.",
    }),
    common({
      id: "aeropress", label: "AeroPress", equipment: ["AeroPress"],
      ingredients: lines(ml, wl, "Dark-roast ground coffee, medium-fine"),
      steps: [...pre, `Set the AeroPress on the glass with a filter in place, add the ${g} g of coffee, pour in the ${ml} ml of hot water, stir for 10 seconds and leave it for 2 minutes.`, `Press down slowly, straight ${into}.`, ...spec.after],
    }),
    common({
      id: "by-hand", label: "By hand", equipment: [], handTools: ["Heatproof glass", "Spoon"],
      optionalEquipment: [{ tag: "Strainer", without: "Let the grounds settle for a full minute and pour slowly, leaving the last sip behind." }, ...(spec.optional ?? [])],
      ingredients: lines(handMl, wl, "Dark-roast ground coffee, coarse"),
      steps: [...pre, `Stir the ${g} g of coffee into ${handMl} ml of just-boiled water in a heatproof glass or mug. Cover it and leave it to steep for 5 minutes.`, `Let the grounds settle for a minute, then pour the coffee slowly ${into}, leaving the muddy last few drops behind.`, ...spec.after],
      notes: "This is the 'cowboy coffee' way — no filter at all. A little sediment at the bottom is normal; just don't drink the last sip.",
    }),
  ];
}

export const dripIngredients = (spec: Pick<DripSpec, "coffeeG" | "waterMl" | "coffeeLabel" | "waterLabel" | "lines">): RecipeIngredient[] => [
  { pantryId: "ground-coffee", label: spec.coffeeLabel ?? "Dark-roast ground coffee, medium-coarse", amount: `${spec.coffeeG} g` },
  { pantryId: "water", label: spec.waterLabel ?? "Hot water, just off the boil", amount: `${spec.waterMl} ml` },
  ...spec.lines,
];
