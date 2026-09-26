import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

interface SavedContextValue {
  savedIds: string[];
  isSaved: (recipeId: string) => boolean;
  toggleSaved: (recipeId: string) => void;
}

const SavedContext = createContext<SavedContextValue | undefined>(undefined);

/** Live "bookmarked recipes" state, toggled from the save icon on any recipe card. */
export function SavedProvider({ children }: { children: React.ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const isSaved = useCallback((recipeId: string) => savedIds.includes(recipeId), [savedIds]);

  const toggleSaved = useCallback((recipeId: string) => {
    setSavedIds((prev) => (prev.includes(recipeId) ? prev.filter((id) => id !== recipeId) : [recipeId, ...prev]));
  }, []);

  const value = useMemo(() => ({ savedIds, isSaved, toggleSaved }), [savedIds, isSaved, toggleSaved]);

  return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>;
}

export function useSaved(): SavedContextValue {
  const ctx = useContext(SavedContext);
  if (!ctx) {
    throw new Error("useSaved must be used within a SavedProvider");
  }
  return ctx;
}
