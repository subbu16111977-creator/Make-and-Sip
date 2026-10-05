import React, { createContext, useCallback, useContext, useMemo } from "react";
import type { EquipmentTag } from "@/types";
import { AppBlank } from "@/components/AppBlank";
import { isEquipmentTags } from "@/lib/persistedShapes";
import { usePersistedState } from "@/lib/usePersistedState";

interface EquipmentContextValue {
  owned: EquipmentTag[];
  isOwned: (tag: EquipmentTag) => boolean;
  toggleEquipment: (tag: EquipmentTag) => void;
  /** Clears owned equipment. Only used by Settings > Reset local app data. */
  reset: () => void;
}

const EquipmentContext = createContext<EquipmentContextValue | undefined>(undefined);

/** A new user owns no equipment until they tick it in Pantry > Equipment. */
const SEED_OWNED: EquipmentTag[] = [];

/**
 * Live "what's in my kitchen" state for appliances, separate from
 * pantry ingredients. Recipes that need gear you don't own are
 * hard-filtered out of recommendations (Home, Discover) — see
 * hasRequiredEquipment in lib/pantryMatch.
 */
export function EquipmentProvider({ children }: { children: React.ReactNode }) {
  const [owned, setOwned, hydrated] = usePersistedState<EquipmentTag[]>("mise.equipment.v1", SEED_OWNED, isEquipmentTags);

  const isOwned = useCallback((tag: EquipmentTag) => owned.includes(tag), [owned]);

  const toggleEquipment = useCallback((tag: EquipmentTag) => {
    setOwned((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }, [setOwned]);

  const reset = useCallback(() => setOwned([]), [setOwned]);

  const value = useMemo(() => ({ owned, isOwned, toggleEquipment, reset }), [owned, isOwned, toggleEquipment, reset]);

  if (!hydrated) return <AppBlank />;

  return <EquipmentContext.Provider value={value}>{children}</EquipmentContext.Provider>;
}

export function useEquipment(): EquipmentContextValue {
  const ctx = useContext(EquipmentContext);
  if (!ctx) {
    throw new Error("useEquipment must be used within an EquipmentProvider");
  }
  return ctx;
}
