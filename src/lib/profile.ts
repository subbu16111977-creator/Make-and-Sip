/**
 * The optional local profile: a name, a photo, and favourite drink types and
 * flavours. It lives only on this device (see ProfileContext) — there is no
 * account, login, email, or cloud copy.
 *
 * Everything here is plain logic with no React or storage in it, so it can be
 * tested directly. Cuisine and flavour preferences are collected for the
 * profile only; they do not currently change recommendations.
 */

import { DEFAULT_CROP, isPhotoCrop, type PhotoCrop } from "@/lib/photoCrop";

/**
 * The drink types people can pick as favourites. (Stored under the old field name `favoriteCuisines`, so nothing
 * saved on a device needs migrating.) Each label is also the `cuisine` value a drink carries, so a pick matches
 * drinks directly.
 */
export const CUISINE_OPTIONS = [
  "Coffee",
  "Tea",
  "Milkshakes & thick shakes",
  "Smoothies",
  "Mocktails",
  "Juices",
  "Lemonades & coolers",
  "Sodas & sparkling",
  "Others",
] as const;

/** The exact flavour choices shown to the user. */
export const FLAVOR_OPTIONS = [
  "Sweet",
  "Fruity",
  "Creamy",
  "Refreshing",
  "Tangy",
  "Bitter",
  "Spicy",
  "Herbal",
  "Rich and indulgent",
  "Other",
] as const;

export const CUISINE_OTHER = "Others";
export const FLAVOR_OTHER = "Other";

export const NAME_MAX_LENGTH = 40;
export const CUSTOM_ENTRY_MAX_LENGTH = 40;
export const CUSTOM_ENTRIES_MAX = 10;

export interface LocalProfile {
  /** Local file/data URI of the chosen photo; absent when none is set. */
  profilePhotoUri?: string;
  /** The photo's width / height, so the crop can be drawn correctly. */
  profilePhotoAspect?: number;
  /** How the photo is positioned and zoomed inside the round avatar. */
  profilePhotoCrop?: PhotoCrop;
  displayName?: string;
  /** Selected drink types from CUISINE_OPTIONS (may include "Others"). */
  favoriteCuisines: string[];
  /** Free-text drink types typed under "Others". */
  customCuisines: string[];
  /** Selected labels from FLAVOR_OPTIONS (may include "Other"). */
  favoriteFlavors: string[];
  /** Free-text flavours typed under "Other". */
  customFlavors: string[];
  onboardingCompleted: boolean;
  tutorialCompleted: boolean;
  tutorialSkipped: boolean;
  /** The version of the Terms of Use and Privacy Policy the person agreed to; absent until they do. */
  termsAcceptedVersion?: string;
}

export function emptyProfile(): LocalProfile {
  return {
    favoriteCuisines: [],
    customCuisines: [],
    favoriteFlavors: [],
    customFlavors: [],
    onboardingCompleted: false,
    tutorialCompleted: false,
    tutorialSkipped: false,
  };
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string");
}

/** Shape check for what comes back from device storage. Anything else falls back to an empty profile. */
export function isLocalProfile(value: unknown): value is LocalProfile {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const p = value as Record<string, unknown>;
  return (
    (p.profilePhotoUri === undefined || typeof p.profilePhotoUri === "string") &&
    (p.profilePhotoAspect === undefined || (typeof p.profilePhotoAspect === "number" && Number.isFinite(p.profilePhotoAspect) && p.profilePhotoAspect > 0)) &&
    (p.profilePhotoCrop === undefined || isPhotoCrop(p.profilePhotoCrop)) &&
    (p.displayName === undefined || typeof p.displayName === "string") &&
    isStringArray(p.favoriteCuisines) &&
    isStringArray(p.customCuisines) &&
    isStringArray(p.favoriteFlavors) &&
    isStringArray(p.customFlavors) &&
    typeof p.onboardingCompleted === "boolean" &&
    typeof p.tutorialCompleted === "boolean" &&
    typeof p.tutorialSkipped === "boolean" &&
    (p.termsAcceptedVersion === undefined || typeof p.termsAcceptedVersion === "string")
  );
}

/** Adds the option if absent, removes it if present. Never mutates. */
export function toggleOption(selected: readonly string[], option: string): string[] {
  return selected.includes(option) ? selected.filter((s) => s !== option) : [...selected, option];
}

export interface NameResult {
  ok: boolean;
  /** Cleaned name, or undefined when the field was left empty (which is fine — it's optional). */
  value?: string;
  error?: string;
}

/** Trims, collapses spaces, strips control characters, and rejects values that are too long or contain no letters. */
export function normalizeName(raw: string): NameResult {
  const cleaned = raw.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();
  if (cleaned === "") return { ok: true, value: undefined };
  if (cleaned.length > NAME_MAX_LENGTH) return { ok: false, error: `Please keep your name under ${NAME_MAX_LENGTH} characters.` };
  if (!/\p{L}/u.test(cleaned)) return { ok: false, error: "Please use at least one letter in your name." };
  return { ok: true, value: cleaned };
}

/** Splits typed text on commas / new lines into trimmed, de-duplicated entries, each kept as typed. */
export function parseCustomList(text: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const piece of text.split(/[,\n;]/)) {
    const entry = piece.replace(/\s+/g, " ").trim().slice(0, CUSTOM_ENTRY_MAX_LENGTH);
    const key = entry.toLowerCase();
    if (entry === "" || seen.has(key)) continue;
    seen.add(key);
    out.push(entry);
    if (out.length >= CUSTOM_ENTRIES_MAX) break;
  }
  return out;
}

/** What the profile form is editing: raw text and selections, not yet validated. */
export interface ProfileDraft {
  displayName: string;
  /** undefined = leave the stored photo alone; null = remove it; string = new photo. */
  photoUri: string | null | undefined;
  /** Width / height of a newly chosen photo. */
  photoAspect?: number;
  /** undefined = leave the stored crop alone. */
  photoCrop?: PhotoCrop;
  cuisines: string[];
  customCuisineText: string;
  flavors: string[];
  customFlavorText: string;
}

export function draftFromProfile(profile: LocalProfile): ProfileDraft {
  return {
    displayName: profile.displayName ?? "",
    photoUri: undefined,
    cuisines: [...profile.favoriteCuisines],
    customCuisineText: profile.customCuisines.join(", "),
    flavors: [...profile.favoriteFlavors],
    customFlavorText: profile.customFlavors.join(", "),
  };
}

export interface DraftErrors {
  name?: string;
  cuisine?: string;
  flavor?: string;
}

/** "Others"/"Other" need some text when selected. Everything else is optional. */
export function validateDraft(draft: ProfileDraft): DraftErrors {
  const errors: DraftErrors = {};
  const name = normalizeName(draft.displayName);
  if (!name.ok) errors.name = name.error;
  if (draft.cuisines.includes(CUISINE_OTHER) && parseCustomList(draft.customCuisineText).length === 0) {
    errors.cuisine = "Tell us which drinks, or untick Others.";
  }
  if (draft.flavors.includes(FLAVOR_OTHER) && parseCustomList(draft.customFlavorText).length === 0) {
    errors.flavor = "Tell us what flavours you like, or untick Other.";
  }
  return errors;
}

export function hasErrors(errors: DraftErrors): boolean {
  return Boolean(errors.name || errors.cuisine || errors.flavor);
}

/**
 * Returns a new profile with the draft's answers applied. Onboarding and
 * tutorial flags are never touched here, and a photo is only changed when the
 * draft says so. Custom text is kept only while its "Other" option is ticked,
 * and is never silently dropped otherwise.
 */
export function applyDraft(profile: LocalProfile, draft: ProfileDraft): LocalProfile {
  const name = normalizeName(draft.displayName);
  const next: LocalProfile = {
    ...profile,
    displayName: name.ok ? name.value : profile.displayName,
    favoriteCuisines: [...draft.cuisines],
    customCuisines: draft.cuisines.includes(CUISINE_OTHER) ? parseCustomList(draft.customCuisineText) : [],
    favoriteFlavors: [...draft.flavors],
    customFlavors: draft.flavors.includes(FLAVOR_OTHER) ? parseCustomList(draft.customFlavorText) : [],
  };
  if (draft.photoUri === null) {
    delete next.profilePhotoUri;
    delete next.profilePhotoAspect;
    delete next.profilePhotoCrop;
  } else if (typeof draft.photoUri === "string") {
    next.profilePhotoUri = draft.photoUri;
    if (draft.photoAspect !== undefined) next.profilePhotoAspect = draft.photoAspect;
    else delete next.profilePhotoAspect;
    next.profilePhotoCrop = draft.photoCrop ?? { ...DEFAULT_CROP };
  } else if (draft.photoCrop !== undefined) {
    next.profilePhotoCrop = draft.photoCrop;
  }
  if (next.displayName === undefined) delete next.displayName;
  return next;
}

/** Hide-the-mark helper: initials for the default avatar when a name exists. */
export function initialsFor(name: string | undefined): string {
  if (!name) return "";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  const first = Array.from(parts[0])[0] ?? "";
  const last = parts.length > 1 ? Array.from(parts[parts.length - 1])[0] ?? "" : "";
  return (first + last).toUpperCase();
}

export interface PhotoView {
  uri?: string;
  aspect?: number;
  crop: PhotoCrop;
}

/** What photo (and crop) to show right now: the draft's change if there is one, otherwise the stored profile's. */
export function photoView(profile: LocalProfile, draft: ProfileDraft): PhotoView {
  if (draft.photoUri === null) return { uri: undefined, aspect: undefined, crop: { ...DEFAULT_CROP } };
  if (typeof draft.photoUri === "string") {
    return { uri: draft.photoUri, aspect: draft.photoAspect, crop: draft.photoCrop ?? { ...DEFAULT_CROP } };
  }
  return {
    uri: profile.profilePhotoUri,
    aspect: profile.profilePhotoAspect,
    crop: draft.photoCrop ?? profile.profilePhotoCrop ?? { ...DEFAULT_CROP },
  };
}
