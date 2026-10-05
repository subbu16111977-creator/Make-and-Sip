import { describe, expect, it } from "vitest";
import {
  CUISINE_OPTIONS,
  CUISINE_OTHER,
  FLAVOR_OPTIONS,
  FLAVOR_OTHER,
  NAME_MAX_LENGTH,
  applyDraft,
  draftFromProfile,
  emptyProfile,
  hasErrors,
  initialsFor,
  isLocalProfile,
  normalizeName,
  parseCustomList,
  toggleOption,
  validateDraft,
  type LocalProfile,
  type ProfileDraft,
} from "./profile";

const blankDraft = (): ProfileDraft => draftFromProfile(emptyProfile());

describe("option lists", () => {
  it("uses the exact cuisine labels in order", () => {
    expect([...CUISINE_OPTIONS]).toEqual([
      "Indian", "American", "South East Asian", "Chinese", "Italian", "Japanese", "Mediterranean",
      "Mexican", "Middle eastern", "Spanish", "Korean", "British", "Others",
    ]);
  });
  it("uses the exact flavour labels in order", () => {
    expect([...FLAVOR_OPTIONS]).toEqual([
      "Spicy", "Comforting", "Fresh and light", "Rich and indulgent", "Tangy", "Smoky", "Sweet", "Herby", "Other",
    ]);
  });
  it("lets every cuisine be selected at the same time", () => {
    let sel: string[] = [];
    for (const c of CUISINE_OPTIONS) sel = toggleOption(sel, c);
    expect(sel).toHaveLength(CUISINE_OPTIONS.length);
  });
  it("lets every flavour be selected at the same time", () => {
    let sel: string[] = [];
    for (const f of FLAVOR_OPTIONS) sel = toggleOption(sel, f);
    expect(sel).toHaveLength(FLAVOR_OPTIONS.length);
  });
  it("toggles an option off again without mutating the original", () => {
    const original = ["Indian"];
    expect(toggleOption(original, "Indian")).toEqual([]);
    expect(original).toEqual(["Indian"]);
  });
});

describe("optional fields", () => {
  it("treats photo as optional", () => {
    const next = applyDraft(emptyProfile(), blankDraft());
    expect(next.profilePhotoUri).toBeUndefined();
    expect(hasErrors(validateDraft(blankDraft()))).toBe(false);
  });
  it("treats name as optional", () => {
    expect(normalizeName("   ")).toEqual({ ok: true, value: undefined });
    expect(applyDraft(emptyProfile(), blankDraft()).displayName).toBeUndefined();
  });
  it("cleans and accepts a normal name", () => {
    expect(normalizeName("  Subbu   V ")).toEqual({ ok: true, value: "Subbu V" });
  });
  it("rejects names that are too long or have no letters", () => {
    expect(normalizeName("x".repeat(NAME_MAX_LENGTH + 1)).ok).toBe(false);
    expect(normalizeName("12345 !!!").ok).toBe(false);
  });
  it("accepts non-latin names", () => {
    expect(normalizeName("சுப்பு").ok).toBe(true);
  });
  it("builds initials for the default avatar", () => {
    expect(initialsFor("subbu vairavan")).toBe("SV");
    expect(initialsFor(undefined)).toBe("");
  });
});

describe("Others / Other custom fields", () => {
  it("requires text for Others only when it is selected", () => {
    const d = blankDraft();
    expect(validateDraft(d).cuisine).toBeUndefined();
    d.cuisines = [CUISINE_OTHER];
    expect(validateDraft(d).cuisine).toBeDefined();
    d.customCuisineText = "Ethiopian";
    expect(validateDraft(d).cuisine).toBeUndefined();
  });
  it("requires text for Other only when it is selected", () => {
    const d = blankDraft();
    d.flavors = [FLAVOR_OTHER];
    expect(validateDraft(d).flavor).toBeDefined();
    d.customFlavorText = "Umami";
    expect(validateDraft(d).flavor).toBeUndefined();
  });
  it("preserves custom cuisines, including more than one", () => {
    const d = blankDraft();
    d.cuisines = [CUISINE_OTHER];
    d.customCuisineText = "Ethiopian, Peruvian";
    expect(applyDraft(emptyProfile(), d).customCuisines).toEqual(["Ethiopian", "Peruvian"]);
  });
  it("preserves custom flavours", () => {
    const d = blankDraft();
    d.flavors = [FLAVOR_OTHER];
    d.customFlavorText = "Umami; Nutty";
    expect(applyDraft(emptyProfile(), d).customFlavors).toEqual(["Umami", "Nutty"]);
  });
  it("de-duplicates custom entries and limits their number", () => {
    expect(parseCustomList("Thai, thai , THAI")).toEqual(["Thai"]);
    expect(parseCustomList(Array.from({ length: 30 }, (_, i) => `c${i}`).join(","))).toHaveLength(10);
  });
  it("round-trips custom text through a stored profile", () => {
    const d = blankDraft();
    d.cuisines = [CUISINE_OTHER, "Korean"];
    d.customCuisineText = "Ethiopian";
    const stored = JSON.parse(JSON.stringify(applyDraft(emptyProfile(), d)));
    expect(isLocalProfile(stored)).toBe(true);
    expect(draftFromProfile(stored).customCuisineText).toBe("Ethiopian");
  });
});

describe("applying a draft", () => {
  const existing: LocalProfile = {
    ...emptyProfile(),
    displayName: "Sam",
    profilePhotoUri: "file:///photo.jpg",
    favoriteCuisines: ["Korean"],
    onboardingCompleted: true,
    tutorialCompleted: true,
  };
  it("never touches onboarding or tutorial flags", () => {
    const d = draftFromProfile(existing);
    d.cuisines = ["Italian"];
    const next = applyDraft(existing, d);
    expect(next.onboardingCompleted).toBe(true);
    expect(next.tutorialCompleted).toBe(true);
  });
  it("keeps the stored photo and name when the draft leaves them alone", () => {
    const next = applyDraft(existing, draftFromProfile(existing));
    expect(next.profilePhotoUri).toBe("file:///photo.jpg");
    expect(next.displayName).toBe("Sam");
  });
  it("removes the photo only when asked", () => {
    const d = draftFromProfile(existing);
    d.photoUri = null;
    expect(applyDraft(existing, d).profilePhotoUri).toBeUndefined();
  });
  it("does not mutate the existing profile", () => {
    const snapshot = JSON.stringify(existing);
    const d = draftFromProfile(existing);
    d.cuisines = ["Italian", "Japanese"];
    d.displayName = "Alex";
    applyDraft(existing, d);
    expect(JSON.stringify(existing)).toBe(snapshot);
  });
  it("drops custom text only when its option is unticked", () => {
    const d = blankDraft();
    d.customCuisineText = "Ethiopian";
    expect(applyDraft(emptyProfile(), d).customCuisines).toEqual([]);
  });
});

describe("stored profile validation", () => {
  it("accepts a good profile and an empty one", () => {
    expect(isLocalProfile(emptyProfile())).toBe(true);
  });
  it("rejects malformed data instead of crashing", () => {
    for (const bad of [null, undefined, 5, "x", [], {}, { favoriteCuisines: "Indian" }, { ...emptyProfile(), onboardingCompleted: "yes" }, { ...emptyProfile(), customFlavors: [1] }]) {
      expect(isLocalProfile(bad)).toBe(false);
    }
  });
});
