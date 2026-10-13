import { useMemo } from "react";
import { useEquipment } from "@/context/EquipmentContext";
import { usePantry } from "@/context/PantryContext";
import { computeCookability, type Cookability } from "@/lib/cookability";
import type { Recipe } from "@/types";

/** The dish's Cookability for the current pantry and equipment, re-worked whenever either changes. */
export function useCookability(recipe: Recipe | undefined, servings?: number, methodId?: string | null): Cookability | null {
  const { items } = usePantry();
  const { owned } = useEquipment();
  return useMemo(() => (recipe ? computeCookability(recipe, items, owned, servings, methodId) : null), [recipe, items, owned, servings, methodId]);
}
