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
  const options = methodsOf(recipe).map((m) => missingForMethod(owned, m).join(" + "));
  return [groupLabel([...new Set(options)])];
}

/** Every piece of equipment any method of the drink mentions as required. */
export function requiredEquipmentTags(recipe: Recipe): EquipmentTag[] {
  return [...new Set(methodsOf(recipe).flatMap((m) => m.equipment))];
}

/** The drink as it is made by one method: its ingredient list swapped for that method's, when it has its own. */
export function recipeForMethod(recipe: Recipe, method: Method): Recipe {
  return method.ingredients ? { ...recipe, ingredients: method.ingredients } : recipe;
}
