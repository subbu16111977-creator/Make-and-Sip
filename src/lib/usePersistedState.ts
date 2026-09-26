import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { loadJSON, saveJSON } from "@/lib/storage";

/**
 * `useState` that remembers its value on the device.
 *
 * - Starts as `seed`, then reads storage once. If something valid is stored it
 *   replaces the seed; if nothing is stored, or it fails `isValid`, the seed stays.
 * - Nothing is written until that read has finished (`hydrated` is true).
 *   Writing earlier would let the starting data overwrite what the user saved
 *   before it had been loaded.
 * - After that, every change is saved.
 *
 * Callers should not render anything that depends on this state until
 * `hydrated` is true, otherwise the seed would flash on screen first.
 */
export function usePersistedState<T>(
  key: string,
  seed: T,
  isValid: (value: unknown) => value is T
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [state, setState] = useState<T>(seed);
  const [hydrated, setHydrated] = useState(false);
  const isValidRef = useRef(isValid);
  useEffect(() => {
    isValidRef.current = isValid;
  });

  useEffect(() => {
    let cancelled = false;
    loadJSON(key).then((stored) => {
      if (cancelled) return;
      if (stored !== undefined && isValidRef.current(stored)) {
        setState(stored);
      } else if (stored !== undefined) {
        console.warn(`[storage] stored "${key}" was not in the expected shape; using starting data`);
      }
      setHydrated(true);
    });
    return () => {
      cancelled = true;
    };
  }, [key]);

  useEffect(() => {
    if (hydrated) saveJSON(key, state);
  }, [key, state, hydrated]);

  return [state, setState, hydrated];
}
