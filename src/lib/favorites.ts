import type { Recipe } from "@/types";

/** Adds the dish at the front (newest first) or removes it if already a favourite. Never mutates. */
export function toggleFavoriteId(ids: readonly string[], recipeId: string): string[] {
  return ids.includes(recipeId) ? ids.filter((id) => id !== recipeId) : [recipeId, ...ids];
}

/** The favourite dishes in the order they were favourited, silently skipping any id that no longer exists in the catalogue. */
export function favoriteRecipes(ids: readonly string[], all: readonly Recipe[]): Recipe[] {
  const byId = new Map(all.map((r) => [r.id, r]));
  const seen = new Set<string>();
  const out: Recipe[] = [];
  for (const id of ids) {
    const recipe = byId.get(id);
    if (recipe && !seen.has(id)) {
      seen.add(id);
      out.push(recipe);
    }
  }
  return out;
}
