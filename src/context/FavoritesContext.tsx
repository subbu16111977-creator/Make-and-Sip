import React, { createContext, useCallback, useContext, useMemo } from "react";
import { AppBlank } from "@/components/AppBlank";
import { STORAGE_KEYS } from "@/lib/appData";
import { toggleFavoriteId } from "@/lib/favorites";
import { isSavedIds } from "@/lib/persistedShapes";
import { usePersistedState } from "@/lib/usePersistedState";

interface FavoritesContextValue {
  /** Dish ids, most recently favourited first. */
  favoriteIds: string[];
  isFavorite: (recipeId: string) => boolean;
  toggleFavorite: (recipeId: string) => void;
  /** Clears every favourite. Only used by Settings > Reset local app data. */
  reset: () => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

/** The user's favourite dishes (the heart), kept on this device and separate from Saved (the bookmark). */
export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds, hydrated] = usePersistedState<string[]>(STORAGE_KEYS.favorites, [], isSavedIds);

  const isFavorite = useCallback((recipeId: string) => favoriteIds.includes(recipeId), [favoriteIds]);
  const toggleFavorite = useCallback((recipeId: string) => setFavoriteIds((prev) => toggleFavoriteId(prev, recipeId)), [setFavoriteIds]);
  const reset = useCallback(() => setFavoriteIds([]), [setFavoriteIds]);

  const value = useMemo(() => ({ favoriteIds, isFavorite, toggleFavorite, reset }), [favoriteIds, isFavorite, toggleFavorite, reset]);

  if (!hydrated) return <AppBlank />;

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within a FavoritesProvider");
  return ctx;
}
