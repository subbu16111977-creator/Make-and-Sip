import type { LocalProfile } from "@/lib/profile";
import type { PantryItem, Recipe, EquipmentTag } from "@/types";
import { hasRequiredEquipment, matchRecipe } from "@/lib/pantryMatch";

/**
 * The first-launch flow as plain logic: which screen to show, and what the
 * stored flags become when each button is pressed. No React, no storage.
 *
 * Nothing here touches pantry, shopping, saved recipes, or equipment — the
 * flow only ever produces a new LocalProfile (flags) or a phase name.
 */

export type Phase = "intro" | "tutorial" | "main";
/** A replay started from Settings. It shows the screens again without changing any stored flag. */
export type Replay = "intro" | "tutorial" | null;

export function getPhase(profile: LocalProfile, replay: Replay): Phase {
  if (replay === "intro") return "intro";
  if (replay === "tutorial") return "tutorial";
  if (!profile.onboardingCompleted) return "intro";
  if (!profile.tutorialCompleted && !profile.tutorialSkipped) return "tutorial";
  return "main";
}

/** Finishing or skipping the introduction both lead on to the tutorial. */
export function markIntroDone(profile: LocalProfile): LocalProfile {
  return profile.onboardingCompleted ? profile : { ...profile, onboardingCompleted: true };
}

export function markTutorialCompleted(profile: LocalProfile): LocalProfile {
  return { ...profile, tutorialCompleted: true, tutorialSkipped: false };
}

export function markTutorialSkipped(profile: LocalProfile): LocalProfile {
  return profile.tutorialCompleted ? profile : { ...profile, tutorialSkipped: true };
}

export const INTRO_STEPS = ["welcome", "pantry", "equipment", "explore", "profile"] as const;
export type IntroStep = (typeof INTRO_STEPS)[number];

export function clampIndex(index: number, length: number): number {
  return Math.min(Math.max(index, 0), Math.max(length - 1, 0));
}

export type TutorialTarget = "pantry" | "equipment" | "discover" | "recipe-shopping" | "recipe-save";

export interface TutorialStep {
  id: TutorialTarget;
  title: string;
  body: string;
  /** Short pointer to the real control, shown under the body. */
  hint: string;
  /** Whether the card sits at the top or bottom of the screen so it never covers the control being explained. */
  placement: "top" | "bottom";
}

export const TUTORIAL_STEPS: readonly TutorialStep[] = [
  {
    id: "pantry",
    title: "Add ingredients",
    body: "Add the ingredients you already have at home. You can include quantities and categories to keep your pantry accurate.",
    hint: "Tap the + button on this screen to add something when you’re ready.",
    placement: "bottom",
  },
  {
    id: "equipment",
    title: "Add equipment",
    body: "Choose the equipment you have so the app can show dishes that fit your kitchen.",
    hint: "Tick appliances in this Equipment list. Nothing is changed unless you tick it.",
    placement: "bottom",
  },
  {
    id: "discover",
    title: "See what you can make",
    body: "Discover dishes you can make with your ingredients and equipment, plus dishes that are close when only a few ingredients are missing.",
    hint: "Use the Taste, Cuisine and Diet filters to narrow what you see.",
    placement: "bottom",
  },
  {
    id: "recipe-shopping",
    title: "Use Shopping",
    body: "When you plan to make a dish, add its missing ingredients to Shopping so you know what to buy.",
    hint: "This is an example dish. Tap \"Add to Shopping\" only if you want those items on your list.",
    placement: "top",
  },
  {
    id: "recipe-save",
    title: "Save a dish",
    body: "Save dishes you want to find again later.",
    hint: "Tap the bookmark at the top right of the dish. Tap it again to remove it.",
    placement: "bottom",
  },
];

/**
 * An example dish for the Shopping and Save steps: the first one the user's
 * equipment allows that is missing at least one required ingredient, so the
 * Shopping button has something to show. Read-only — it only looks at the
 * pantry and equipment, never changes them.
 */
export function pickTutorialRecipe(recipes: readonly Recipe[], pantry: PantryItem[], owned: EquipmentTag[]): Recipe | undefined {
  const usable = recipes.filter((r) => hasRequiredEquipment(owned, r));
  const withGap = usable.find((r) => matchRecipe(pantry, r).missing.length > 0);
  return withGap ?? usable[0] ?? recipes[0];
}
