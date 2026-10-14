import type { Method, OptionalEquipment, Recipe, RecipeIngredient } from "@/types";
import { drink, type DrinkFacts } from "./builders";

/**
 * Shared methods for ice-cream and fruit shakes: a blender, and a by-hand way (softened ice cream or mashed fruit,
 * whisked or shaken in a jar). Thick shakes use less milk and more ice cream.
 */

/** A shake whose flavour is coffee or tea belongs under Coffee or Tea, so those can say so with `type`. */
export type ShakeFacts = Omit<DrinkFacts, "type" | "temperature"> & { type?: DrinkFacts["type"] };

const SCOOP_TIP: OptionalEquipment = { tag: "Ice Cream Scoop", without: "Use a large spoon dipped in hot water, which cuts through hard ice cream cleanly." };

export interface IceCreamShakeSpec {
  /** The ice cream line: "Vanilla ice cream, 3 scoops". */
  iceCream: RecipeIngredient;
  milkMl: number;
  /** Everything else: syrups, fruit, cookies, toppings. */
  lines?: RecipeIngredient[];
  /** Steps before blending (crush cookies, chop fruit). */
  before?: string[];
  /** Extra preparation only the by-hand way needs (mashing fruit that a blender would purée). */
  handBefore?: string[];
  /** What goes in the blender besides the ice cream and milk, in words: "and the chocolate syrup". */
  withIn?: string;
  /** Steps after, such as pouring and topping. */
  after?: string[];
  /** Thick shakes are blended in short bursts and kept spoonable. */
  thick?: boolean;
  handTools?: string[];
}

export function iceCreamShakeIngredients(spec: IceCreamShakeSpec): RecipeIngredient[] {
  return [spec.iceCream, { pantryId: "milk", label: "Cold whole milk", amount: `${spec.milkMl} ml` }, ...(spec.lines ?? [])];
}

export function iceCreamShakeMethods(spec: IceCreamShakeSpec): Method[] {
  const before = spec.before ?? [];
  const after = spec.after ?? ["Pour into a tall glass and serve right away, with a wide straw and a long spoon."];
  const withIn = spec.withIn ? ` ${spec.withIn}` : "";
  const blend = spec.thick
    ? `Put the ice cream, the milk${withIn} in the blender and blend in short bursts of 5–10 seconds, scraping down the sides, until smooth but still very thick — add a splash more milk only if the blades stall.`
    : `Put the ice cream, the milk${withIn} in the blender and blend for 15–20 seconds, until smooth and just pourable.`;
  const hand = spec.thick
    ? `Mash the softened ice cream in a bowl with the back of a spoon, then stir in the milk${withIn} and keep stirring hard with a whisk or fork until it is smooth but still very thick.`
    : `Mash the softened ice cream in a bowl or a tall jug with the back of a spoon, then add the milk${withIn} and whisk hard, or shake in a lidded jar for 30–45 seconds, until smooth and pourable.`;
  return [
    { id: "blender", label: "Blender", equipment: ["Blender"], handTools: spec.handTools, optionalEquipment: [SCOOP_TIP], steps: ["Put a tall glass in the freezer for a few minutes, so the shake stays cold.", ...before, blend, ...after] },
    {
      id: "by-hand", label: "By hand", equipment: [], handTools: [...(spec.handTools ?? []), "Bowl or lidded jar", "Whisk or fork"], optionalEquipment: [SCOOP_TIP],
      steps: [...before, ...(spec.handBefore ?? []), "Take the ice cream out of the freezer and leave it for 5 minutes, until it gives easily under a spoon.", hand, ...after],
      notes: "Softening the ice cream first is what makes this work without a blender.",
    },
  ];
}

export function iceCreamShake(facts: ShakeFacts, spec: IceCreamShakeSpec): Recipe {
  return drink({ ...facts, type: facts.type ?? "Milkshakes & thick shakes", temperature: "cold" }, iceCreamShakeIngredients(spec), iceCreamShakeMethods(spec));
}

export interface FruitShakeSpec {
  /** The fruit and anything blended with it: sugar, nuts, ice. */
  lines: RecipeIngredient[];
  milkMl: number;
  before?: string[];
  /** Words for what goes in the blender: "the banana and the sugar". */
  withIn: string;
  /** Words for mashing it by hand: "banana". */
  mashWhat: string;
  after?: string[];
  handTools?: string[];
  /** Some shakes (nut and seed ones) genuinely need a blender. */
  blenderOnly?: boolean;
}

export function fruitShakeIngredients(spec: FruitShakeSpec): RecipeIngredient[] {
  return [...spec.lines, { pantryId: "milk", label: "Cold whole milk", amount: `${spec.milkMl} ml` }];
}

export function fruitShakeMethods(spec: FruitShakeSpec): Method[] {
  const before = spec.before ?? [];
  const after = spec.after ?? ["Pour into a tall glass and serve right away."];
  const methods: Method[] = [
    { id: "blender", label: "Blender", equipment: ["Blender"], handTools: spec.handTools, steps: ["Put a tall glass in the freezer for a few minutes, so the shake stays cold.", ...before, `Put ${spec.withIn} and the milk in the blender and blend for 30 seconds, until completely smooth.`, ...after] },
  ];
  if (!spec.blenderOnly) {
    methods.push({
      id: "by-hand", label: "By hand", equipment: [], handTools: [...(spec.handTools ?? []), "Bowl", "Fork or masher", "Lidded jar"],
      steps: [...before, `Mash the ${spec.mashWhat} in a bowl with a fork until it is as smooth as you can get it, with no lumps.`, "Add the rest of the ingredients and the milk to a lidded jar with the mash, close the lid and shake hard for 45–60 seconds, until smooth and frothy.", ...after],
      notes: "Use fruit that is very ripe: it mashes easily and tastes sweeter.",
    });
  }
  return methods;
}

export function fruitShake(facts: ShakeFacts, spec: FruitShakeSpec): Recipe {
  return drink({ ...facts, type: facts.type ?? "Milkshakes & thick shakes", temperature: "cold" }, fruitShakeIngredients(spec), fruitShakeMethods(spec));
}
