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
  photoView,
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
  it("uses the exact drink-type labels in order", () => {
    expect([...CUISINE_OPTIONS]).toEqual([
      "Coffee", "Tea", "Milkshakes & thick shakes", "Smoothies", "Mocktails", "Juices", "Lemonades & coolers",
      "Sodas & sparkling", "Others",
    ]);
  });
  it("uses the exact flavour labels in order", () => {
    expect([...FLAVOR_OPTIONS]).toEqual([
      "Sweet", "Fruity", "Creamy", "Refreshing", "Tangy", "Bitter", "Spicy", "Herbal", "Rich and indulgent", "Other",
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

describe("profile photo crop", () => {
  const withPhoto: LocalProfile = {
    ...emptyProfile(),
    profilePhotoUri: "file:///p.jpg",
    profilePhotoAspect: 1.5,
    profilePhotoCrop: { zoom: 2, x: 0.1, y: 0 },
  };
  it("stores the crop with a newly chosen photo, defaulting to a centred crop", () => {
    const d = blankDraft();
    d.photoUri = "file:///new.jpg";
    d.photoAspect = 0.75;
    const next = applyDraft(emptyProfile(), d);
    expect(next.profilePhotoAspect).toBe(0.75);
    expect(next.profilePhotoCrop).toEqual({ zoom: 1, x: 0, y: 0 });
  });
  it("saves an adjusted crop without touching the photo", () => {
    const d = draftFromProfile(withPhoto);
    d.photoCrop = { zoom: 3, x: -0.2, y: 0.1 };
    const next = applyDraft(withPhoto, d);
    expect(next.profilePhotoUri).toBe("file:///p.jpg");
    expect(next.profilePhotoCrop).toEqual({ zoom: 3, x: -0.2, y: 0.1 });
  });
  it("keeps the stored crop when the draft doesn't change it", () => {
    expect(applyDraft(withPhoto, draftFromProfile(withPhoto)).profilePhotoCrop).toEqual({ zoom: 2, x: 0.1, y: 0 });
  });
  it("removing the photo removes its crop and shape too", () => {
    const d = draftFromProfile(withPhoto);
    d.photoUri = null;
    const next = applyDraft(withPhoto, d);
    expect(next.profilePhotoUri).toBeUndefined();
    expect(next.profilePhotoAspect).toBeUndefined();
    expect(next.profilePhotoCrop).toBeUndefined();
  });
  it("shows the draft's photo, else the stored one", () => {
    expect(photoView(withPhoto, draftFromProfile(withPhoto)).uri).toBe("file:///p.jpg");
    const d = draftFromProfile(withPhoto);
    d.photoUri = null;
    expect(photoView(withPhoto, d).uri).toBeUndefined();
  });
  it("accepts older profiles without crop fields and rejects bad crop data", () => {
    expect(isLocalProfile({ ...emptyProfile(), profilePhotoUri: "x" })).toBe(true);
    expect(isLocalProfile({ ...withPhoto, profilePhotoCrop: { zoom: "big" } })).toBe(false);
    expect(isLocalProfile({ ...withPhoto, profilePhotoAspect: -2 })).toBe(false);
  });
  it("does not mutate the existing profile", () => {
    const snap = JSON.stringify(withPhoto);
    const d = draftFromProfile(withPhoto);
    d.photoCrop = { zoom: 4, x: 0, y: 0 };
    applyDraft(withPhoto, d);
    expect(JSON.stringify(withPhoto)).toBe(snap);
  });
});
