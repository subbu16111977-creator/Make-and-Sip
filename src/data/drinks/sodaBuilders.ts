import type { Method, OptionalEquipment, Recipe, RecipeIngredient } from "@/types";
import { drink, type DrinkFacts } from "./builders";
import { ICE, L, SQUEEZER, built as mocktailBuilt, type MocktailFacts } from "./mocktailBuilders";

/**
 * Sodas and sparkling drinks: a flavour (a syrup, a juice, a cordial) topped with fizz. Every soda here has two ways to
 * get the fizz: bottled sparkling water by hand, or still water carbonated in a soda maker. Nothing is fermented, so
 * everything is alcohol-free; the ginger beer is the quick, unfermented kind.
 */

export const SD = { type: "Sodas & sparkling" } as const;
export const SYRUP_SIEVE = ["Small saucepan", "Sieve", "Jug"];

export const FIZZ = (ml: number, label = "Chilled sparkling water"): RecipeIngredient => L("sparkling-water", label, `${ml} ml`);
export const SYRUP = (tbsp: number): RecipeIngredient => L("sugar", `Sugar syrup (${tbsp} tbsp sugar dissolved in ${tbsp} tbsp hot water)`, `${tbsp} tbsp`);
export const SCOOP: OptionalEquipment = { tag: "Ice Cream Scoop", without: "Use a large spoon dipped in hot water." };

const mk = (facts: MocktailFacts): DrinkFacts => ({ ...SD, temperature: "cold", ...facts }) as DrinkFacts;

/** Swaps the bottled sparkling water for still water that the soda maker carbonates. */
const forSodaMaker = (lines: RecipeIngredient[]): RecipeIngredient[] =>
  lines.map((l) => (l.pantryId === "sparkling-water" ? { ...l, pantryId: "water", label: "Very cold water, to carbonate" } : l));

/** A soda built from its ingredients and steps, offered with bottled sparkling water or a soda maker. */
export function fizzy(facts: MocktailFacts, lines: RecipeIngredient[], steps: string[], optional: OptionalEquipment[] = [], handTools: string[] = ["Tall glass", "Long spoon"]): Recipe {
  const methods: Method[] = [
    { id: "sparkling-water", label: "Bottled sparkling water", equipment: [], handTools, optionalEquipment: optional, steps },
    {
      id: "soda-maker",
      label: "Soda maker",
      equipment: ["Soda Maker"],
      handTools,
      optionalEquipment: optional,
      ingredients: forSodaMaker(lines),
      steps: [
        "Chill the water for the soda maker well, ideally overnight: cold water holds the fizz far better.",
        ...steps.map((s) => s.replaceAll("sparkling water", "carbonated water")),
      ],
      notes: "Carbonate the water just before you need it, and pour it slowly down the side of the glass.",
    },
  ];
  return drink(mk(facts), lines, methods);
}

export interface SyrupSodaSpec {
  /** Everything that goes into the syrup, with the sugar and the water. */
  syrup: RecipeIngredient[];
  /** How the syrup is made, in steps. */
  syrupSteps: string[];
  /** Fresh juice or other things added to each glass (or to the syrup at the end). */
  glass?: RecipeIngredient[];
  /** Fizz for the whole batch, in ml. */
  fizzMl?: number;
  garnish: string;
  optional?: OptionalEquipment[];
  /** Steps that go in before the assembly, such as stirring in the juice. */
  after?: string[];
  glasses?: number;
}

/** A batch of syrup made once and mixed with fizz glass by glass: the way homemade soda is usually done. */
export function syrupSoda(facts: MocktailFacts, spec: SyrupSodaSpec): Recipe {
  const glasses = spec.glasses ?? 4;
  const fizzMl = spec.fizzMl ?? glasses * 200;
  const lines = [...spec.syrup, ...(spec.glass ?? []), FIZZ(fizzMl), L("ice", "Ice cubes, to serve", "2 cups", true)];
  const steps = [
    ...spec.syrupSteps,
    ...(spec.after ?? []),
    `Fill ${glasses} tall glasses with ice and divide the cooled syrup between them.`,
    "Top each glass with about 200 ml of sparkling water, pouring slowly down the side of the glass, and stir once, gently, so the fizz stays.",
    spec.garnish,
  ];
  return fizzy({ servings: glasses, notes: "The syrup keeps for up to two weeks in a clean jar in the fridge, so you can make soda in single glasses: about a quarter of the syrup per glass.", ...facts }, lines, steps, spec.optional ?? [], [...SYRUP_SIEVE, "Tall glasses", "Long spoon"]);
}

export { ICE, L, SQUEEZER };

/** Built straight in the glass, with no fizz of our own to add (a cola with a syrup, say). */
export const built = (facts: MocktailFacts, lines: RecipeIngredient[], steps: string[], optional: OptionalEquipment[] = [], handTools?: string[]): Recipe => mocktailBuilt({ ...SD, ...facts }, lines, steps, optional, handTools);
