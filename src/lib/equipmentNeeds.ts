import type { EquipmentTag, Recipe } from "@/types";

/**
 * What a drink needs in the way of equipment, and what is still missing. A drink can need specific items
 * (`equipment`) and also "any one of" groups (`equipmentAnyOf`, e.g. an espresso machine, a moka pot or an AeroPress).
 * Optional equipment never counts here.
 */

/** "Espresso Machine, Moka Pot or AeroPress" */
export function groupLabel(tags: readonly EquipmentTag[]): string {
  if (tags.length <= 1) return tags.join("");
  return `${tags.slice(0, -1).join(", ")} or ${tags[tags.length - 1]}`;
}

/** Whether the person owns what the drink needs: every required item, and at least one tool from every group. */
export function equipmentSatisfied(owned: readonly EquipmentTag[], recipe: Recipe): boolean {
  return unmetEquipment(owned, recipe).length === 0;
}

/** What is still missing, as short labels: each missing required item, and for each unmet group the choices. */
export function unmetEquipment(owned: readonly EquipmentTag[], recipe: Recipe): string[] {
  const missing: string[] = recipe.equipment.filter((tag) => !owned.includes(tag));
  for (const group of recipe.equipmentAnyOf ?? []) {
    if (!group.some((tag) => owned.includes(tag))) missing.push(groupLabel(group));
  }
  return missing;
}

/** Every tag the drink's required equipment mentions, requirements and groups alike. */
export function requiredEquipmentTags(recipe: Recipe): EquipmentTag[] {
  return [...new Set([...recipe.equipment, ...(recipe.equipmentAnyOf ?? []).flat()])];
}

export function hasEquipmentRequirement(recipe: Recipe): boolean {
  return recipe.equipment.length > 0 || (recipe.equipmentAnyOf?.length ?? 0) > 0;
}
