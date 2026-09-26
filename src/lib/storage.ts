import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Thin wrapper over device storage (AsyncStorage: plain, unencrypted
 * key-value storage — right for ordinary pantry data, not for secrets).
 *
 * Every call swallows its own errors: a storage failure must never crash the
 * app or block it from starting. A failed read looks like "nothing stored" and
 * a failed write is logged and dropped.
 */

/** Returns the parsed value, or `undefined` when nothing usable is stored. */
export async function loadJSON(key: string): Promise<unknown> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw === null) return undefined;
    return JSON.parse(raw);
  } catch (error) {
    console.warn(`[storage] could not read "${key}"`, error);
    return undefined;
  }
}

export async function saveJSON(key: string, value: unknown): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`[storage] could not save "${key}"`, error);
  }
}
