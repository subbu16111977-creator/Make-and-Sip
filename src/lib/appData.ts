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
  subscription: "mise.subscription.v1",
  trialUsed: "mise.trialUsed.v1",
} as const;

export const ALL_STORAGE_KEYS: readonly string[] = Object.values(STORAGE_KEYS);

/**
 * Purchase records: the current plan and whether the free trial has been used. These are NOT the
 * user's kitchen data, so "Reset local app data" must never clear them (otherwise a reset would
 * hand out another free trial). In the live app they come from the App Store / Google Play.
 */
export const PURCHASE_KEYS: readonly string[] = [STORAGE_KEYS.subscription, STORAGE_KEYS.trialUsed];

/** What "Reset local app data" clears: everything except purchase records. */
export const RESET_KEYS: readonly string[] = ALL_STORAGE_KEYS.filter((k) => !PURCHASE_KEYS.includes(k));
