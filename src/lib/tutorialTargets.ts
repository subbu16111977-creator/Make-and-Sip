import { useEffect, useRef, type RefObject } from "react";
import type { View } from "react-native";

/**
 * A small registry so the tutorial can find real buttons on screen and outline
 * them. A screen attaches the returned ref to the element it wants highlighted;
 * the tutorial looks it up by id and measures where it currently is. Nothing is
 * stored or changed — it is only used to draw an outline.
 */
export type TutorialTargetId = "pantry-add" | "equipment-first-row" | "discover-first-card" | "recipe-servings" | "recipe-methods" | "recipe-add-shopping" | "recipe-save" | "recipe-heart" | "profile-favorites";

const targets = new Map<TutorialTargetId, RefObject<View | null>>();

export function getTutorialTarget(id: TutorialTargetId): RefObject<View | null> | undefined {
  return targets.get(id);
}

let scrollByHandler: ((dy: number) => void) | null = null;

/** A screen that can scroll registers here, so the tutorial can bring a target into view. */
export function registerScrollBy(fn: (dy: number) => void): () => void {
  scrollByHandler = fn;
  return () => {
    if (scrollByHandler === fn) scrollByHandler = null;
  };
}

export function scrollScreenBy(dy: number): void {
  scrollByHandler?.(dy);
}

/** Attach the returned ref to the element the tutorial should be able to outline. */
export function useTutorialTarget(id: TutorialTargetId): RefObject<View | null> {
  const ref = useRef<View | null>(null);
  useEffect(() => {
    targets.set(id, ref);
    return () => {
      if (targets.get(id) === ref) targets.delete(id);
    };
  }, [id]);
  return ref;
}
