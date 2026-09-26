import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { EquipmentTag } from "@/types";

interface EquipmentContextValue {
  owned: EquipmentTag[];
  isOwned: (tag: EquipmentTag) => boolean;
  toggleEquipment: (tag: EquipmentTag) => void;
}

const EquipmentContext = createContext<EquipmentContextValue | undefined>(undefined);

/**
 * Common basics start checked — most kitchens have an oven, a
 * microwave, a blender — while specialty gear (air fryer, stand
 * mixer, pressure cooker...) starts unchecked. That split is what
 * gives the "add equipment, unlock dishes" moment something real to
 * do from day one, instead of everything already being available.
 */
const SEED_OWNED: EquipmentTag[] = ["Oven", "Microwave", "Blender"];

/**
 * Live "what's in my kitchen" state for appliances, separate from
 * pantry ingredients. Recipes that need gear you don't own are
 * hard-filtered out of recommendations (Home, Discover) — see
 * hasRequiredEquipment in lib/pantryMatch.
 */
export function EquipmentProvider({ children }: { children: React.ReactNode }) {
  const [owned, setOwned] = useState<EquipmentTag[]>(SEED_OWNED);

  const isOwned = useCallback((tag: EquipmentTag) => owned.includes(tag), [owned]);

  const toggleEquipment = useCallback((tag: EquipmentTag) => {
    setOwned((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }, []);

  const value = useMemo(() => ({ owned, isOwned, toggleEquipment }), [owned, isOwned, toggleEquipment]);

  return <EquipmentContext.Provider value={value}>{children}</EquipmentContext.Provider>;
}

export function useEquipment(): EquipmentContextValue {
  const ctx = useContext(EquipmentContext);
  if (!ctx) {
    throw new Error("useEquipment must be used within an EquipmentProvider");
  }
  return ctx;
}
