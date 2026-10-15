import type { Method, OptionalEquipment, Recipe, RecipeIngredient } from "@/types";
import { drink, type DrinkFacts } from "./builders";

/**
 * Helpers for mocktails. Every mocktail here is alcohol-free: the "virgin" classics leave the spirit out, and syrups
 * (grenadine, orgeat, blue "curaçao" flavouring) stand in for the liqueurs. A data test keeps alcohol out of the list.
 */

export type MocktailFacts = Omit<DrinkFacts, "type" | "temperature"> & { temperature?: DrinkFacts["temperature"] };

export const L = (pantryId: string, label: string, amount: string, optional = false): RecipeIngredient => ({ pantryId, label, amount, ...(optional ? { optional: true } : {}) });
export const ICE = (amount = "1 cup"): RecipeIngredient => L("ice", "Ice cubes", amount);
export const SODA = (ml: number, label = "Chilled sparkling water or club soda"): RecipeIngredient => L("sparkling-water", label, `${ml} ml`);

export const MUDDLER: OptionalEquipment = { tag: "Muddler", without: "Crush with the back of a wooden spoon in a sturdy glass." };
export const JIGGER: OptionalEquipment = { tag: "Jigger", without: "Measure with spoons: 1 tablespoon is 15 ml." };
export const SQUEEZER: OptionalEquipment = { tag: "Citrus Squeezer", without: "Squeeze the fruit by hand over a sieve to catch the pips." };

const mk = (facts: MocktailFacts): DrinkFacts => ({ ...facts, type: "Mocktails", temperature: facts.temperature ?? "cold" });

/** Built straight in the glass: no equipment needed. */
export function built(facts: MocktailFacts, lines: RecipeIngredient[], steps: string[], optional: OptionalEquipment[] = [], handTools: string[] = ["Tall glass", "Long spoon"]): Recipe {
  return drink(mk(facts), lines, [{ id: "in-the-glass", label: "In the glass", equipment: [], handTools, optionalEquipment: optional, steps }]);
}

export interface ShakenSpec {
  /** Steps before shaking (juicing, muddling, rimming the glass). */
  pre?: string[];
  /** What goes into the shaker, in words. */
  put: string;
  /** Where it is strained to, in words: "into a tall glass over fresh ice". */
  strain: string;
  /** Steps after straining (topping with soda, garnish). */
  post?: string[];
  optional?: OptionalEquipment[];
  handTools?: string[];
}

/** Shaken with ice: a shaker, or a lidded jar when you have none. */
export function shaken(facts: MocktailFacts, lines: RecipeIngredient[], spec: ShakenSpec): Recipe {
  const pre = spec.pre ?? [];
  const post = spec.post ?? ["Garnish and serve right away."];
  const methods: Method[] = [
    { id: "shaker", label: "Shaker", equipment: ["Shaker"], handTools: spec.handTools ?? ["Tall glass"], optionalEquipment: spec.optional, steps: [...pre, `Put ${spec.put} in a cocktail shaker with a handful of ice cubes and shake hard for 12–15 seconds, until the outside is frosty.`, `Strain ${spec.strain}.`, ...post] },
    { id: "by-hand", label: "By hand", equipment: [], handTools: [...(spec.handTools ?? ["Tall glass"]), "Lidded jar", "Spoon"], optionalEquipment: spec.optional, steps: [...pre, `Put ${spec.put} in a lidded jar with a handful of ice cubes, close the lid tightly and shake hard for 12–15 seconds.`, `Strain ${spec.strain}, holding a spoon over the opening to keep the ice back.`, ...post] },
  ];
  return drink(mk(facts), lines, methods);
}

export interface BlendedSpec {
  pre?: string[];
  /** What goes in the blender, in words. */
  blend: string;
  /** How to get close by hand, in words: "Mash the strawberries, then shake with crushed ice in a lidded jar". */
  hand: string;
  post?: string[];
  optional?: OptionalEquipment[];
  handTools?: string[];
}

/** Frozen, slushy drinks: a blender, or crushed ice shaken hard in a jar. */
export function blended(facts: MocktailFacts, lines: RecipeIngredient[], spec: BlendedSpec): Recipe {
  const pre = spec.pre ?? [];
  const post = spec.post ?? ["Pour into a chilled glass, garnish and serve right away."];
  const methods: Method[] = [
    { id: "blender", label: "Blender", equipment: ["Blender"], handTools: spec.handTools ?? ["Chilled glass"], optionalEquipment: spec.optional, steps: ["Put the serving glass in the freezer for a few minutes, so the drink stays frozen.", ...pre, `Put ${spec.blend} in the blender and blend on high for 30–45 seconds, until thick, smooth and slushy.`, ...post] },
    { id: "by-hand", label: "By hand", equipment: [], handTools: [...(spec.handTools ?? ["Chilled glass"]), "Plastic bag and rolling pin", "Lidded jar"], optionalEquipment: spec.optional, steps: [...pre, "Crush the ice finely: wrap it in a clean cloth or a bag and hit it with a rolling pin until it is like snow.", `${spec.hand}. Close the lid and shake very hard for 30 seconds.`, ...post], notes: "It won't be as smooth as blended, but it is just as cold." },
  ];
  return drink(mk(facts), lines, methods);
}

/** A jug for several glasses: a pitcher, or any large jug. */
export function pitcher(facts: MocktailFacts, lines: RecipeIngredient[], steps: string[], optional: OptionalEquipment[] = []): Recipe {
  const methods: Method[] = [
    { id: "pitcher", label: "Pitcher", equipment: ["Pitcher"], handTools: ["Long spoon", "Glasses"], optionalEquipment: optional, steps },
    { id: "by-hand", label: "In a jug", equipment: [], handTools: ["Large jug or bowl", "Long spoon", "Glasses"], optionalEquipment: optional, steps },
  ];
  return drink(mk(facts), lines, methods);
}
