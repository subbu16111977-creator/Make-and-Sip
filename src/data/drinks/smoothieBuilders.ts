import type { Method, Recipe, RecipeIngredient } from "@/types";
import { drink, type DrinkFacts } from "./builders";

/** Smoothies and lassis: fruit, yogurt or juice blended with ice, or — with no blender — mashed and shaken in a jar. */

export type SmoothieFacts = Omit<DrinkFacts, "type" | "temperature">;

export interface SmoothieSpec {
  /** Every ingredient, liquids and ice included. */
  lines: RecipeIngredient[];
  /** What goes in the blender, in words: "the strawberries, banana, yogurt, juice and ice". */
  withIn: string;
  /** What to mash first when making it by hand ("the strawberries and banana"). */
  mashWhat?: string;
  /** For smoothies that really need a blender: raw greens, frozen fruit, whole nuts and seeds. */
  blenderOnly?: boolean;
  before?: string[];
  after?: string[];
  handTools?: string[];
  /** A note shown with the by-hand method. */
  handNote?: string;
}

export function smoothieMethods(spec: SmoothieSpec): Method[] {
  const before = spec.before ?? [];
  const after = spec.after ?? ["Pour into a tall glass and drink right away."];
  const methods: Method[] = [
    {
      id: "blender", label: "Blender", equipment: ["Blender"], handTools: spec.handTools,
      steps: ["Put a tall glass in the freezer for a few minutes, so the drink stays cold.", ...before, `Put ${spec.withIn} in the blender and blend on high for 45–60 seconds, until completely smooth. Add a splash of water if it sticks.`, ...after],
    },
  ];
  if (!spec.blenderOnly) {
    methods.push({
      id: "by-hand", label: "By hand", equipment: [], handTools: [...(spec.handTools ?? []), "Bowl", "Fork or masher", "Lidded jar"],
      steps: [...before, `Mash ${spec.mashWhat ?? "the fruit"} in a bowl with a fork until it is as smooth as you can get it.`, "Put the mash and everything else into a lidded jar, close it tightly and shake hard for 60 seconds, until smooth and frothy.", ...after],
      notes: spec.handNote ?? "Use very ripe fruit: it mashes easily and tastes sweeter. Add the ice last, after shaking, so it doesn't water the smoothie down.",
    });
  }
  return methods;
}

export function smoothie(facts: SmoothieFacts, spec: SmoothieSpec): Recipe {
  return drink({ ...facts, type: "Smoothies", temperature: "cold" }, spec.lines, smoothieMethods(spec));
}
