import type { Method, OptionalEquipment, RecipeIngredient } from "@/types";

/** Shared methods for steeped teas: a teapot, a French press, and a mug-and-saucer way with no equipment. */

export interface SteepSpec {
  /** The tea itself, with its amount: "2 tsp loose leaf or 1 tea bag". */
  leaf: RecipeIngredient;
  /** Extra tea or herb lines that steep with it (cardamom, mint...). */
  steeped?: RecipeIngredient[];
  waterMl: number;
  /** Water temperature in °C, and how long it steeps in minutes. */
  tempC: number;
  minutes: number;
  /** Steps after the water is hot and before the tea goes in (rinsing the leaves). */
  before?: string[];
  /** Lines added after steeping (honey, milk, lemon). */
  lines?: RecipeIngredient[];
  /** Steps after the tea is ready, the same for every method. They call it "the tea". */
  after?: string[];
  /** A French press is a poor fit for a few teas (very delicate green teas). */
  press?: boolean;
  optional?: OptionalEquipment[];
  handTools?: string[];
}

const KETTLE_TIP: OptionalEquipment = { tag: "Electric Kettle", without: "Heat the water in a small saucepan and take it off the heat as it begins to bubble." };
const STRAINER_TIP: OptionalEquipment = { tag: "Strainer", without: "Hold a spoon over the cup to keep the leaves back, or use tea bags." };

export function steepIngredients(spec: Pick<SteepSpec, "leaf" | "steeped" | "waterMl" | "lines">): RecipeIngredient[] {
  return [spec.leaf, ...(spec.steeped ?? []), { pantryId: "water", label: "Freshly boiled water", amount: `${spec.waterMl} ml` }, ...(spec.lines ?? [])];
}

const heat = (tempC: number): string =>
  tempC >= 95 ? "Bring the water to a full boil." : `Boil the water, then let it cool for 2–3 minutes, to about ${tempC}°C (it should stop bubbling and steam gently).`;

export function steepMethods(spec: SteepSpec): Method[] {
  const after = spec.after ?? [];
  const before = spec.before ?? [];
  const steep = `Pour in the ${spec.waterMl} ml of water and steep for ${spec.minutes} minute${spec.minutes === 1 ? "" : "s"}.`;
  const optional = [KETTLE_TIP, ...(spec.optional ?? [])];
  const methods: Method[] = [
    {
      id: "teapot", label: "Teapot", equipment: ["Teapot"], handTools: spec.handTools, optionalEquipment: [KETTLE_TIP, ...(spec.optional ?? [])],
      steps: [heat(spec.tempC), ...before, "Warm the teapot with a splash of hot water, then tip it out.", `Add the tea to the pot. ${steep}`, "Pour the tea through the pot's strainer into your cup.", ...after],
    },
  ];
  if (spec.press !== false) {
    methods.push({
      id: "french-press", label: "French press", equipment: ["French Press"], handTools: spec.handTools, optionalEquipment: [KETTLE_TIP, ...(spec.optional ?? [])],
      steps: [heat(spec.tempC), ...before, `Put the tea in the French press. ${steep}`, "Press the plunger down gently and pour the tea straight away, so it doesn't keep steeping.", ...after],
    });
  }
  methods.push({
    id: "by-hand", label: "By hand", equipment: [], handTools: [...(spec.handTools ?? []), "Mug", "Saucer or small plate"], optionalEquipment: [STRAINER_TIP, ...optional],
    steps: [heat(spec.tempC), ...before, `Put the tea in a mug. ${steep} Cover the mug with a saucer so the heat stays in.`, "Take out the tea bag, or pour the tea through a sieve or spoon into a second cup, leaving the leaves behind.", ...after],
  });
  return methods;
}

export interface ColdSpec {
  leaf: RecipeIngredient;
  /** Water for the cold steep, in ml, and hours in the fridge. */
  waterMl: number;
  hours: number;
  lines?: RecipeIngredient[];
  after: string[];
  handTools?: string[];
  optional?: OptionalEquipment[];
}

export function coldSteepIngredients(spec: Pick<ColdSpec, "leaf" | "waterMl" | "lines">): RecipeIngredient[] {
  return [spec.leaf, { pantryId: "water", label: "Cold water", amount: `${spec.waterMl} ml` }, ...(spec.lines ?? [])];
}

/** Cold-steeped tea: in a pitcher, a French press, or a jar. */
export function coldSteepMethods(spec: ColdSpec): Method[] {
  const steep = (vessel: string) => `Put the tea in ${vessel}, add the ${spec.waterMl} ml of cold water and stir. Cover and chill in the fridge for ${spec.hours} hours.`;
  return [
    { id: "pitcher", label: "Pitcher", equipment: ["Pitcher"], handTools: spec.handTools, optionalEquipment: spec.optional, steps: [steep("a pitcher"), "Lift out the tea bags, or strain out the leaves.", ...spec.after] },
    { id: "french-press", label: "French press", equipment: ["French Press"], handTools: spec.handTools, optionalEquipment: spec.optional, steps: [steep("a French press"), "Press the plunger down slowly and pour the tea out.", ...spec.after] },
    { id: "by-hand", label: "By hand", equipment: [], handTools: [...(spec.handTools ?? []), "Large jar with a lid"], optionalEquipment: spec.optional, steps: [steep("a large jar"), "Take out the tea bags, or pour through a sieve to remove the leaves.", ...spec.after] },
  ];
}
