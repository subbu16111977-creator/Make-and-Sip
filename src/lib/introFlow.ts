import type { LocalProfile } from "@/lib/profile";
import type { PantryItem, Recipe, EquipmentTag } from "@/types";
import { hasRequiredEquipment, matchRecipe } from "@/lib/pantryMatch";
import { methodsOf } from "@/lib/methods";
import type { TutorialTargetId } from "@/lib/tutorialTargets";
import { TERMS_VERSION } from "@/lib/legalText";

/**
 * The first-launch flow as plain logic: which screen to show, and what the
 * stored flags become when each button is pressed. No React, no storage.
 *
 * Nothing here touches pantry, shopping, saved recipes, or equipment — the
 * flow only ever produces a new LocalProfile (flags) or a phase name.
 */

export type Phase = "intro" | "agreement" | "tutorial" | "main";
/** A replay started from Settings. It shows the screens again without changing any stored flag. */
export type Replay = "intro" | "tutorial" | null;

export function getPhase(profile: LocalProfile, replay: Replay): Phase {
  if (replay === "intro") return "intro";
  if (replay === "tutorial") return "tutorial";
  if (!profile.onboardingCompleted) return "intro";
  if (!hasAcceptedTerms(profile)) return "agreement";
  if (!profile.tutorialCompleted && !profile.tutorialSkipped) return "tutorial";
  return "main";
}

export function hasAcceptedTerms(profile: LocalProfile): boolean {
  return profile.termsAcceptedVersion === TERMS_VERSION;
}

/** Records that the person agreed to the current Terms of Use and Privacy Policy. */
export function markTermsAccepted(profile: LocalProfile): LocalProfile {
  return hasAcceptedTerms(profile) ? profile : { ...profile, termsAcceptedVersion: TERMS_VERSION };
}

/** Finishing or skipping the introduction both lead on to the terms, then the tutorial. */
export function markIntroDone(profile: LocalProfile): LocalProfile {
  return profile.onboardingCompleted ? profile : { ...profile, onboardingCompleted: true };
}

export function markTutorialCompleted(profile: LocalProfile): LocalProfile {
  return { ...profile, tutorialCompleted: true, tutorialSkipped: false };
}

export function markTutorialSkipped(profile: LocalProfile): LocalProfile {
  return profile.tutorialCompleted ? profile : { ...profile, tutorialSkipped: true };
}

/**
 * The introduction's screens. "equipment" explains why equipment matters; "equipment-pick" is where it is ticked, and is
 * skipped when the person chooses "Do this later". "drinks" and "flavors" are the two taste questions; "profile" is
 * the optional name and photo.
 */
export const INTRO_STEPS = ["welcome", "pantry", "equipment", "equipment-pick", "explore", "drinks", "flavors", "profile"] as const;
export type IntroStep = (typeof INTRO_STEPS)[number];

/** Where "Do this later" on the equipment screen leads: past the screen where equipment is ticked. */
export function indexAfterEquipmentLater(): number {
  return INTRO_STEPS.indexOf("equipment-pick") + 1;
}

export function clampIndex(index: number, length: number): number {
  return Math.min(Math.max(index, 0), Math.max(length - 1, 0));
}

export type TutorialTarget =
  | "pantry"
  | "equipment"
  | "discover"
  | "recipe-servings"
  | "recipe-names"
  | "recipe-methods"
  | "recipe-shopping"
  | "recipe-made"
  | "recipe-save"
  | "recipe-favorite"
  | "shopping-list"
  | "saved-list"
  | "profile-favorites";

export interface TutorialStep {
  id: TutorialTarget;
  title: string;
  body: string;
  /** Short pointer to the real control, shown under the body. */
  hint: string;
  /** The real control the tutorial outlines with a glowing white border; null for a step that explains something without a control to point at. */
  target: TutorialTargetId | null;
  /** A sample of a control that only shows up when its conditions are met, drawn on the card instead of outlined on the screen. */
  preview?: string;
  /** Whether the card sits at the top or bottom of the screen so it never covers the control being explained. */
  placement: "top" | "bottom";
}

export const TUTORIAL_STEPS: readonly TutorialStep[] = [
  {
    id: "pantry",
    title: "Add ingredients",
    body: "Add the ingredients you already have at home. You can include quantities and categories to keep your pantry accurate. Type them however you like: \"oj\", \"whole milk\" or \"2 tbsp honey\" all work.",
    hint: "Tap the glowing + button to add an ingredient when you’re ready.",
    target: "pantry-add",
    placement: "top",
  },
  {
    id: "equipment",
    title: "Add equipment",
    body: "Choose the equipment you have so the app can show drinks that fit your setup. Many drinks also have a by-hand way that needs none.",
    hint: "Tap an item, like the glowing one, to tick it. Nothing is changed unless you tap.",
    target: "equipment-first-row",
    placement: "bottom",
  },
  {
    id: "discover",
    title: "See what you can make",
    body: "Discover drinks you can make with your ingredients and equipment, plus drinks that are close when only a few ingredients are missing. Search by name, and narrow by taste, type, hot or iced, and dietary needs.",
    hint: "Tap the glowing drink to see what you have and what’s missing.",
    target: "discover-first-card",
    placement: "top",
  },
  {
    id: "recipe-servings",
    title: "Choose how many you’re making",
    body: "Change the number of servings and every ingredient amount follows, so you see exactly how much you need. The method gets a last step telling you to repeat it for each extra serving.",
    hint: "Tap + or − on the glowing row. The recipe itself never changes.",
    target: "recipe-servings",
    placement: "top",
  },
  {
    id: "recipe-names",
    title: "Your words, not ours",
    body: "If you keep “club soda” where a drink says “sparkling water”, the drink uses your name for it in the ingredient list and the method. Only real aliases are swapped; a different product is never treated as the same.",
    hint: "Nothing to tap here. You’ll see it on drinks as you add your own ingredients.",
    target: null,
    placement: "bottom",
  },
  {
    id: "recipe-methods",
    title: "Pick a way to make it",
    body: "Many drinks have more than one way to make them, each with its own equipment and steps. The app shows the first one your equipment allows, and you can choose another any time.",
    hint: "Tap a way in the glowing row to switch the ingredients and steps below.",
    target: "recipe-methods",
    placement: "top",
  },
  {
    id: "recipe-shopping",
    title: "Use Shopping",
    body: "When you plan to make a drink, add its missing ingredients to Shopping so you know what to buy. Only what is really missing goes on the list, and for something you’re short of, just the amount you need.",
    hint: "This is an example drink. Tap the glowing button only if you want those items on your list.",
    target: "recipe-add-shopping",
    placement: "top",
  },
  {
    id: "recipe-made",
    title: "Tell us you made it",
    body: "Once you have everything for a drink, a Made it button appears. Tap it to see what will come out of your pantry, untick anything you didn’t use, and confirm. Items that run out leave your pantry, and you can undo it.",
    hint: "Nothing to tap here. This is a sample of the button, which appears on a drink when you can make it right now.",
    target: null,
    preview: "Made it — update my pantry",
    placement: "bottom",
  },
  {
    id: "recipe-save",
    title: "Save a drink",
    body: "Save drinks you want to find again later.",
    hint: "Tap the glowing bookmark. Tap it again to remove it.",
    target: "recipe-save",
    placement: "bottom",
  },
  {
    id: "recipe-favorite",
    title: "Favourite a drink",
    body: "Tap the heart on any drink you love to make it a favourite. Favourites are kept separately from Saved.",
    hint: "Tap the glowing heart. You'll find hearts on every drink card too. Tap again to remove it.",
    target: "recipe-heart",
    placement: "bottom",
  },
  {
    id: "shopping-list",
    title: "Shop, then stock up",
    body: "On the Shopping tab, tick items off as you buy them. Each one moves into your pantry with its amount, so the app already knows what you can make when you get home.",
    hint: "Nothing to tap here. Your list fills as you add items from drinks.",
    target: null,
    placement: "bottom",
  },
  {
    id: "saved-list",
    title: "Find saved drinks again",
    body: "Everything you bookmark waits on the Saved tab, ready to make when you are.",
    hint: "Nothing to tap here. Saved drinks appear as you bookmark them.",
    target: null,
    placement: "bottom",
  },
  {
    id: "profile-favorites",
    title: "See your favourites",
    body: "All your favourite drinks are collected on your Profile tab. Tap View all to see every one. Your name and photo live there too, and they save on their own.",
    hint: "Your hearted drinks appear in the glowing section.",
    target: "profile-favorites",
    placement: "bottom",
  },
];

/**
 * An example drink for the Shopping and Save steps: the first one the user's
 * equipment allows that is missing at least one required ingredient, so the
 * Shopping button has something to show. Read-only — it only looks at the
 * pantry and equipment, never changes them.
 */
export function pickTutorialRecipe(recipes: readonly Recipe[], pantry: PantryItem[], owned: EquipmentTag[]): Recipe | undefined {
  const usable = recipes.filter((r) => hasRequiredEquipment(owned, r));
  const gap = (r: Recipe) => matchRecipe(pantry, r).missing.length > 0;
  // The Methods step needs a drink with more than one way to make it, and the Shopping step needs something missing.
  return usable.find((r) => gap(r) && methodsOf(r).length > 1) ?? usable.find(gap) ?? usable[0] ?? recipes[0];
}
