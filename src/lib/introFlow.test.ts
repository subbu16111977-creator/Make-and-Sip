import { describe, expect, it } from "vitest";
import { emptyProfile, type LocalProfile } from "./profile";
import {
  INTRO_STEPS,
  indexAfterEquipmentLater,
  TUTORIAL_STEPS,
  clampIndex,
  getPhase,
  markIntroDone,
  markTermsAccepted,
  markTutorialCompleted,
  markTutorialSkipped,
  pickTutorialRecipe,
} from "./introFlow";
import { ALL_STORAGE_KEYS, STORAGE_KEYS } from "./appData";
import { recipes } from "@/data/recipes";
import type { PantryItem } from "@/types";

const fresh = () => emptyProfile();
/** The introduction finished and the terms agreed — the point from which the tutorial starts. */
const agreed = () => markTermsAccepted(markIntroDone(fresh()));

describe("first launch", () => {
  it("shows the introduction first", () => {
    expect(getPhase(fresh(), null)).toBe("intro");
  });
  it("asks for agreement to the terms right after the introduction", () => {
    expect(getPhase(markIntroDone(fresh()), null)).toBe("agreement");
  });
  it("asks for agreement even when the introduction (and profile setup) is skipped", () => {
    const skipped = markIntroDone(fresh());
    expect(skipped.displayName).toBeUndefined();
    expect(getPhase(skipped, null)).toBe("agreement");
  });
  it("opens the tutorial after the terms are agreed", () => {
    expect(getPhase(agreed(), null)).toBe("tutorial");
  });
  it("asks again if the terms change", () => {
    expect(getPhase({ ...agreed(), termsAcceptedVersion: "old" }, null)).toBe("agreement");
  });
  it("keeps the agreement across a reload", () => {
    const stored = JSON.parse(JSON.stringify(agreed())) as LocalProfile;
    expect(getPhase(stored, null)).toBe("tutorial");
  });
  it("does not ask for agreement in a replay of the introduction", () => {
    expect(getPhase(markIntroDone(fresh()), "intro")).toBe("intro");
  });
  it("opens the main app after the tutorial is completed", () => {
    expect(getPhase(markTutorialCompleted(agreed()), null)).toBe("main");
  });
  it("opens the main app after the tutorial is skipped", () => {
    expect(getPhase(markTutorialSkipped(agreed()), null)).toBe("main");
  });
  it("does not show the introduction or tutorial again once finished (reload)", () => {
    const done = JSON.parse(JSON.stringify(markTutorialCompleted(agreed()))) as LocalProfile;
    expect(getPhase(done, null)).toBe("main");
  });
});

describe("replays from Settings", () => {
  const done = markTutorialCompleted(agreed());
  it("replays the introduction", () => {
    expect(getPhase(done, "intro")).toBe("intro");
  });
  it("replays the tutorial", () => {
    expect(getPhase(done, "tutorial")).toBe("tutorial");
  });
  it("returns to the main app when the replay ends", () => {
    expect(getPhase(done, null)).toBe("main");
  });
  it("does not change stored flags (the flag helpers are no-ops on a finished profile)", () => {
    expect(markIntroDone(done)).toBe(done);
    expect(markTutorialSkipped(done)).toBe(done);
  });
});

describe("flow only produces profile flags", () => {
  it("does not mutate the profile it is given", () => {
    const p = fresh();
    const snap = JSON.stringify(p);
    markIntroDone(p);
    markTutorialCompleted(p);
    markTutorialSkipped(p);
    expect(JSON.stringify(p)).toBe(snap);
  });
  it("keeps the profile in its own storage key, separate from pantry, shopping, saved and equipment", () => {
    expect(new Set(ALL_STORAGE_KEYS).size).toBe(ALL_STORAGE_KEYS.length);
    expect(STORAGE_KEYS.profile).not.toBe(STORAGE_KEYS.pantry);
    expect(STORAGE_KEYS.profile).not.toBe(STORAGE_KEYS.shopping);
    expect(STORAGE_KEYS.profile).not.toBe(STORAGE_KEYS.saved);
    expect(STORAGE_KEYS.profile).not.toBe(STORAGE_KEYS.equipment);
  });
  it("keeps the existing storage keys unchanged", () => {
    expect(STORAGE_KEYS.pantry).toBe("mise.pantry.v1");
    expect(STORAGE_KEYS.shopping).toBe("mise.shopping.v1");
    expect(STORAGE_KEYS.saved).toBe("mise.saved.v1");
    expect(STORAGE_KEYS.equipment).toBe("mise.equipment.v1");
  });
});

describe("tutorial", () => {
  it("has seven steps, each described", () => {
    expect(TUTORIAL_STEPS).toHaveLength(7);
    for (const s of TUTORIAL_STEPS) {
      expect(s.title.length).toBeGreaterThan(0);
      expect(s.body.length).toBeGreaterThan(0);
    }
  });
  it("gives every step a real control to outline, in the right order", () => {
    expect(TUTORIAL_STEPS.map((s) => s.target)).toEqual(["pantry-add", "equipment-first-row", "discover-first-card", "recipe-add-shopping", "recipe-save", "recipe-heart", "profile-favorites"]);
  });
  it("says that the outlined control glows, and never claims to press it for the user", () => {
    for (const s of TUTORIAL_STEPS) {
      expect(s.hint.toLowerCase()).toContain("glow");
      expect(s.hint.toLowerCase()).not.toMatch(/we(’| wi)ll (add|tick|save)/);
    }
  });
  it("keeps the explanation card clear of the outlined control (top for the + button and the shopping button)", () => {
    expect(TUTORIAL_STEPS.find((s) => s.id === "pantry")?.placement).toBe("top");
    expect(TUTORIAL_STEPS.find((s) => s.id === "recipe-shopping")?.placement).toBe("top");
  });
  it("teaches favouriting a dish and then where to find favourites on the Profile tab", () => {
    const ids = TUTORIAL_STEPS.map((s) => s.id);
    expect(ids.slice(-2)).toEqual(["recipe-favorite", "profile-favorites"]);
    const last = TUTORIAL_STEPS[TUTORIAL_STEPS.length - 1];
    expect(last.body.toLowerCase()).toContain("view all");
    expect(last.body.toLowerCase()).toContain("profile");
  });
  it("has eight intro screens, with the equipment ticking screen right after the equipment one", () => {
    expect(INTRO_STEPS).toHaveLength(8);
    expect(INTRO_STEPS.indexOf("equipment-pick")).toBe(INTRO_STEPS.indexOf("equipment") + 1);
    expect(INTRO_STEPS[indexAfterEquipmentLater()]).toBe("explore");
  });
  it("clamps step indexes", () => {
    expect(clampIndex(-3, 5)).toBe(0);
    expect(clampIndex(9, 5)).toBe(4);
  });
  it("picks an example dish without changing pantry or equipment", () => {
    const pantry: PantryItem[] = [];
    const owned: never[] = [];
    const before = JSON.stringify({ pantry, owned });
    const picked = pickTutorialRecipe(recipes, pantry, owned);
    expect(picked).toBeDefined();
    expect(JSON.stringify({ pantry, owned })).toBe(before);
  });
});
