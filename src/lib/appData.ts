/**
 * Every key the app saves on the device. Kept in one place so "Reset local app
 * data" clears exactly these, and so the profile can never share a key with
 * pantry, shopping, saved, or equipment data.
 */
export const STORAGE_KEYS = {
  pantry: "mise.pantry.v1",
  shopping: "mise.shopping.v1",
  saved: "mise.saved.v1",
  equipment: "mise.equipment.v1",
  profile: "mise.profile.v1",
  favorites: "mise.favorites.v1",
} as const;

export const ALL_STORAGE_KEYS: readonly string[] = Object.values(STORAGE_KEYS);
