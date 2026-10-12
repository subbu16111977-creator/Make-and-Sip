import React, { createContext, useCallback, useContext, useMemo } from "react";
import type { EquipmentTag } from "@/types";
import { AppBlank } from "@/components/AppBlank";
import { sanitizeEquipment } from "@/lib/equipment";
import { usePersistedState } from "@/lib/usePersistedState";

interface EquipmentContextValue {
  owned: EquipmentTag[];
  isOwned: (tag: EquipmentTag) => boolean;
  toggleEquipment: (tag: EquipmentTag) => void;
  /** Clears owned equipment. Only used by Settings > Reset local app data. */
  reset: () => void;
}

const EquipmentContext = createContext<EquipmentContextValue | undefined>(undefined);

const isStringList = (value: unknown): value is EquipmentTag[] => Array.isArray(value) && value.every((v) => typeof v === "string");

/** A new user owns no equipment until they tick it in Pantry > Equipment. */
const SEED_OWNED: EquipmentTag[] = [];

/**
 * Live "what equipment do I have" state, separate from pantry ingredients. A drink that needs gear you don't own is
 * never "Ready to make" — see hasRequiredEquipment in lib/pantryMatch.
 */
export function EquipmentProvider({ children }: { children: React.ReactNode }) {
  // Stored as a plain list of names; anything this version no longer knows (e.g. "Oven" from the food app) is ignored.
  const [stored, setOwned, hydrated] = usePersistedState<EquipmentTag[]>("mise.equipment.v1", SEED_OWNED, isStringList);
  const owned = useMemo(() => sanitizeEquipment(stored), [stored]);

  const isOwned = useCallback((tag: EquipmentTag) => owned.includes(tag), [owned]);

  const toggleEquipment = useCallback((tag: EquipmentTag) => {
    setOwned((prev) => {
      const current = sanitizeEquipment(prev);
      return current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag];
    });
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
