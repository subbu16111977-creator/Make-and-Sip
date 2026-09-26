import React, { createContext, useCallback, useContext, useMemo } from "react";
import { AppBlank } from "@/components/AppBlank";
import { isSavedIds } from "@/lib/persistedShapes";
import { usePersistedState } from "@/lib/usePersistedState";

interface SavedContextValue {
  savedIds: string[];
  isSaved: (recipeId: string) => boolean;
  toggleSaved: (recipeId: string) => void;
}

const SavedContext = createContext<SavedContextValue | undefined>(undefined);

/** Live "bookmarked recipes" state, toggled from the save icon on any recipe card. */
export function SavedProvider({ children }: { children: React.ReactNode }) {
  const [savedIds, setSavedIds, hydrated] = usePersistedState<string[]>("mise.saved.v1", [], isSavedIds);

  const isSaved = useCallback((recipeId: string) => savedIds.includes(recipeId), [savedIds]);

  const toggleSaved = useCallback((recipeId: string) => {
    setSavedIds((prev) => (prev.includes(recipeId) ? prev.filter((id) => id !== recipeId) : [recipeId, ...prev]));
  }, [setSavedIds]);

  const value = useMemo(() => ({ savedIds, isSaved, toggleSaved }), [savedIds, isSaved, toggleSaved]);

  if (!hydrated) return <AppBlank />;

  return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>;
}

export function useSaved(): SavedContextValue {
  const ctx = useContext(SavedContext);
  if (!ctx) {
    throw new Error("useSaved must be used within a SavedProvider");
  }
  return ctx;
}
