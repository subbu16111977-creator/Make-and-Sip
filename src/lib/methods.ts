import type { EquipmentTag, Method, Recipe } from "@/types";

/**
 * The ways to make a drink, and which of them a person can do with the equipment they own.
 *
 * A drink has one or more methods. Each needs ALL of its own equipment (or none: a "by hand" method). A drink is
 * makeable when ANY method is. Which method is shown is chosen automatically — the first one the person has the
 * gear for — until they pick one themselves.
 */

/** "Espresso Machine, Moka Pot or AeroPress" */
export function groupLabel(tags: readonly string[]): string {
  if (tags.length <= 1) return tags.join("");
  return `${tags.slice(0, -1).join(", ")} or ${tags[tags.length - 1]}`;
}

/** The drink's methods; a drink written in the single-method shorthand gets its one method built from those fields. */
export function methodsOf(recipe: Recipe): Method[] {
  if (recipe.methods && recipe.methods.length > 0) return recipe.methods;
  return [{ id: "standard", label: "Standard", equipment: recipe.equipment ?? [], optionalEquipment: recipe.optionalEquipment, steps: recipe.steps ?? [] }];
}

export function missingForMethod(owned: readonly EquipmentTag[], method: Method): EquipmentTag[] {
  return method.equipment.filter((tag) => !owned.includes(tag));
}

export const methodReady = (owned: readonly EquipmentTag[], method: Method): boolean => missingForMethod(owned, method).length === 0;

/** A method that needs no tracked equipment at all. */
export const isByHand = (method: Method): boolean => method.equipment.length === 0;

/** True when the drink can be made without any tracked equipment. */
export const canMakeByHand = (recipe: Recipe): boolean => methodsOf(recipe).some(isByHand);

/**
 * The method to show: the one the person chose, if it exists; otherwise the first they have the gear for;
 * otherwise the one needing the fewest missing items (the first, on a tie).
 */
export function bestMethod(owned: readonly EquipmentTag[], recipe: Recipe, chosenId?: string | null): Method {
  const methods = methodsOf(recipe);
  const chosen = chosenId ? methods.find((m) => m.id === chosenId) : undefined;
  if (chosen) return chosen;
  const ready = methods.find((m) => methodReady(owned, m));
  if (ready) return ready;
  return methods.reduce((best, m) => (missingForMethod(owned, m).length < missingForMethod(owned, best).length ? m : best), methods[0]);
}

/** Whether the person can make the drink at all with what they own. */
export function equipmentSatisfied(owned: readonly EquipmentTag[], recipe: Recipe): boolean {
  return methodsOf(recipe).some((m) => methodReady(owned, m));
}

/**
 * What is missing, as one short label naming the ways out: "Espresso Machine, Moka Pot or AeroPress", or
 * "Blender + Strainer" for a method that needs two things. Empty when the drink can already be made.
 */
export function unmetEquipment(owned: readonly EquipmentTag[], recipe: Recipe): string[] {
  if (equipmentSatisfied(owned, recipe)) return [];
  const missing = methodsOf(recipe).map((m) => missingForMethod(owned, m));
  // When every way needs just one thing, list them ("Espresso Machine or Moka Pot"); otherwise name the way that needs the fewest.
  if (missing.every((m) => m.length === 1)) return [groupLabel([...new Set(missing.map((m) => m[0]))])];
  const cheapest = missing.reduce((best, m) => (m.length < best.length ? m : best), missing[0]);
  return [cheapest.join(" + ")];
}

/** Every piece of equipment any method of the drink mentions as required. */
export function requiredEquipmentTags(recipe: Recipe): EquipmentTag[] {
  return [...new Set(methodsOf(recipe).flatMap((m) => m.equipment))];
}

/** The drink as it is made by one method: its ingredient list swapped for that method's, when it has its own. */
export function recipeForMethod(recipe: Recipe, method: Method): Recipe {
  return method.ingredients ? { ...recipe, ingredients: method.ingredients } : recipe;
}

/** Waiting time (steeping, chilling) for a method: its own if it has one, otherwise the drink's. */
export function waitFor(recipe: Recipe, method: Method): number {
  return method.waitMinutes ?? recipe.marinateMinutes ?? 0;
}

/** Hands-on time plus waiting, for the drink as made by one method (the first one when none is given). */
export function totalMinutes(recipe: Recipe, method?: Method): number {
  return recipe.prepMinutes + recipe.cookMinutes + waitFor(recipe, method ?? methodsOf(recipe)[0]);
}

/** "95" -> "1 hr 35 min", "45" -> "45 min", "840" -> "14 hr". */
export function formatMinutes(total: number): string {
  if (total <= 0) return "—";
  const hrs = Math.floor(total / 60);
  const mins = total % 60;
  if (hrs === 0) return `${mins} min`;
  if (mins === 0) return `${hrs} hr`;
  return `${hrs} hr ${mins} min`;
}

/** Tool names for "You'll use …": lower-cased, no repeats, and "saucepan" dropped when "saucepan or kettle" is also listed. */
export function toolsPhrase(tools: readonly string[]): string {
  const list = [...new Set(tools.map((t) => t.trim().toLowerCase()).filter(Boolean))];
  const kept = list.filter((t) => !list.some((o) => o !== t && o.startsWith(`${t} `)));
  if (kept.length <= 1) return kept.join("");
  return `${kept.slice(0, -1).join(", ")} and ${kept[kept.length - 1]}`;
}
