import type { Method, OptionalEquipment, Recipe, RecipeIngredient } from "@/types";
import { drink, type DrinkFacts } from "./builders";

/**
 * Juices: pressed from citrus, juiced from soft fruit, or juiced from hard produce. Each has a machine way (a citrus
 * squeezer or a juicer), a blender-and-strainer way, and a way by hand with no machine: squeezing citrus, or mashing or
 * grating the produce and pressing it through a clean cloth or a sieve.
 */

export type JuiceFacts = Omit<DrinkFacts, "type" | "temperature">;
export type JuiceKind = "citrus" | "soft" | "hard";

export interface JuiceSpec {
  lines: RecipeIngredient[];
  kind: JuiceKind;
  /** Steps shared by every method: washing, peeling, chopping. */
  prep: string[];
  /** The produce in words, for the steps: "the oranges", "the carrots and apple". */
  what: string;
  /** Steps after the juice is made: stir in, top with, garnish. */
  after?: string[];
  /** Any tip for the by-hand way. */
  handNote?: string;
}

const STRAIN_TIP: OptionalEquipment = { tag: "Strainer", without: "Pour the juice through a clean cloth, or a fine sieve, pressing out every drop." };

/** The last step when a juice has no steps of its own: stir in whatever is listed to finish it, then serve. */
function finishingStep(lines: RecipeIngredient[]): string {
  const parts: string[] = [];
  for (const l of lines) {
    if (l.pantryId === "ice") continue;
    const name = l.label.split(",")[0].replace(/\s*\(.*\)/, "").trim().toLowerCase();
    const note = (l.label.split(",")[1] ?? "").trim().toLowerCase();
    if (l.pantryId === "water") parts.push(`the ${l.amount.trim()} of cold water`);
    else if (/juiced/.test(note) && /^(lemon|lime)/.test(name)) parts.push(`the juice of ${l.amount.trim()} ${name}`);
    else if (/squeeze/.test(note)) parts.push(`a squeeze of ${name}`);
    else if (/pinch/.test(note) || /^1 pinch/.test(l.amount)) parts.push(`a pinch of ${name}`);
    else if (/to taste/.test(note) && (l.optional || /sugar|honey|salt/.test(name))) parts.push(`${name} to taste`);
    else if (l.optional && /^(sugar|honey|salt|lemon|lime|black pepper)\b/.test(name)) parts.push(name);
  }
  if (parts.length === 0) return "Stir, pour into a glass over ice if you like, and drink right away.";
  const list = parts.length === 1 ? parts[0] : `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
  return `Stir in ${list}, pour into a glass over ice if you like, and drink right away.`;
}

export function juiceMethods(spec: JuiceSpec): Method[] {
  const after = spec.after ?? [finishingStep(spec.lines)];
  const prep = spec.prep;
  if (spec.kind === "citrus") {
    return [
      { id: "citrus-squeezer", label: "Citrus squeezer", equipment: ["Citrus Squeezer"], handTools: ["Glass"], steps: [...prep, `Halve ${spec.what} across the middle. Press each half on the squeezer and twist until the juice runs out.`, "Pour the juice through a sieve to catch the pips, pressing the pulp.", ...after] },
      { id: "juicer", label: "Juicer", equipment: ["Juicer"], handTools: ["Glass"], steps: [...prep, `Peel ${spec.what}, leaving the white pith on, and separate the segments.`, "Feed the segments through the juicer into a jug.", ...after] },
      { id: "by-hand", label: "By hand", equipment: [], handTools: ["Sieve", "Jug", "Glass"], optionalEquipment: [STRAIN_TIP], steps: [...prep, `Roll ${spec.what} firmly on the counter, pressing down with your palm, to loosen the juice.`, "Halve them and squeeze each half by hand over a sieve set on a jug, pushing the pulp with a spoon to get out the rest.", ...after], notes: spec.handNote ?? "Rolling the fruit first makes it give up a lot more juice." },
    ];
  }
  const water = "Add 50 ml of cold water if the blades stall";
  const blender: Method = {
    id: "blender-strainer", label: "Blender and strainer", equipment: ["Blender", "Strainer"], handTools: ["Jug", "Glass"],
    steps: [...prep, `Put ${spec.what} in the blender. ${water}, and blend on high for 30–45 seconds, until completely smooth.`, "Pour through the strainer set over a jug, pressing the pulp with a spoon to get out every drop of juice.", ...after],
    notes: "Blending then straining gives a lighter, pulpier juice than a juicer.",
  };
  const juicer: Method = { id: "juicer", label: "Juicer", equipment: ["Juicer"], handTools: ["Glass"], steps: [...prep, `Feed ${spec.what} through the juicer, alternating soft and hard pieces, into a jug.`, ...after] };
  const handSteps = spec.kind === "soft"
    ? [...prep, `Mash ${spec.what} in a bowl with a fork or a potato masher until it is a smooth pulp.`, "Tip the pulp into a clean cloth or a fine sieve set over a jug and squeeze or press until the juice runs out.", ...after]
    : [...prep, `Grate ${spec.what} as finely as you can on the fine side of a grater, into a bowl.`, "Gather the gratings in a clean cloth and twist hard over a jug, squeezing out all the juice.", ...after];
  const byHand: Method = { id: "by-hand", label: "By hand", equipment: [], handTools: ["Grater or masher", "Clean cloth or sieve", "Jug", "Glass"], optionalEquipment: [STRAIN_TIP], steps: handSteps, notes: spec.handNote ?? "Slower than a machine, but the result is just as good — the finer you grate or mash, the more juice you get." };
  return [juicer, blender, byHand];
}

export function juice(facts: JuiceFacts, spec: JuiceSpec): Recipe {
  return drink({ ...facts, type: "Juices", temperature: "cold" }, spec.lines, juiceMethods(spec));
}
