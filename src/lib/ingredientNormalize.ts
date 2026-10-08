import { ingredientRegistry, type IngredientEntity } from "@/data/ingredients";

/**
 * Parses free text into a structured, identity-resolved ingredient.
 *
 * This is the one normalization function every entry point funnels
 * through: the Pantry "Add ingredient" form, the Shopping "Add item"
 * form, and (for testing/consistency) recipe ingredient text. It never
 * guesses a confident identity for text it can't resolve — unmatched
 * text comes back with `needsReview: true` and a best-effort slug
 * rather than a fabricated canonical name.
 */
export interface NormalizedIngredient {
  rawText: string;
  /** Null when nothing in the registry could be confidently resolved. */
  ingredientId: string | null;
  canonicalName: string;
  baseIngredient: string;
  displayName: string;
  quantity: number | null;
  unit: string | null;
  preparation: string | null;
  form: string | null;
  /** 0–1. 1 = exact synonym match, down to 0 = unresolved. */
  confidence: number;
  /** True when the text couldn't be confidently mapped to a registry entry. */
  needsReview: boolean;
  /** True when more than one equally-likely ingredient matched. */
  ambiguous: boolean;
}

// ---------------------------------------------------------------------------
// Word lists
// ---------------------------------------------------------------------------

/** Meaningful qualifiers — extracted into `form`, not discarded. */
const FORM_WORDS = new Set([
  "boneless",
  "skinless",
  "skin-on",
  "bone-in",
  "ground",
  "canned",
  "dried",
  "frozen",
  "raw",
]);

/** Ordinary descriptive words that must never block a match. */
const NOISE_WORDS = new Set([
  "large",
  "small",
  "medium",
  "extra",
  "a",
  "an",
  "the",
  "some",
  "fine",
  "coarse",
  "whole",
  "fresh",
  "ripe",
  "firm",
  "new",
  "old",
  "light",
  "dark",
  "plain",
  "very",
  "store-bought",
  "homemade",
]);

/** token (singular or plural) -> canonical unit label. */
const UNIT_WORDS: Record<string, string> = {
  g: "g",
  gram: "g",
  grams: "g",
  kg: "kg",
  kilogram: "kg",
  kilograms: "kg",
  ml: "ml",
  l: "l",
  liter: "l",
  liters: "l",
  litre: "l",
  litres: "l",
  tsp: "tsp",
  teaspoon: "tsp",
  teaspoons: "tsp",
  tbsp: "tbsp",
  tablespoon: "tbsp",
  tablespoons: "tbsp",
  cup: "cup",
  cups: "cup",
  clove: "clove",
  cloves: "clove",
  can: "can",
  cans: "can",
  pack: "pack",
  packs: "pack",
  bunch: "bunch",
  bunches: "bunch",
  pcs: "pcs",
  piece: "pcs",
  pieces: "pcs",
  lb: "lb",
  lbs: "lb",
  pound: "lb",
  pounds: "lb",
  oz: "oz",
  ounce: "oz",
  ounces: "oz",
  pinch: "pinch",
  pinches: "pinch",
};

// ---------------------------------------------------------------------------
// Synonym index — built once at module load, longest phrase first so
// multi-word synonyms ("chicken stock") are tried before a component word
// ("chicken") ever gets a chance to steal the match.
// ---------------------------------------------------------------------------

interface SynonymEntry {
  phrase: string;
  wordCount: number;
  entity: IngredientEntity;
}

const byId = new Map<string, IngredientEntity>(ingredientRegistry.map((e) => [e.id, e]));

const exactPhraseIndex = new Map<string, IngredientEntity>();
const synonymList: SynonymEntry[] = [];
for (const entity of ingredientRegistry) {
  for (const raw of entity.synonyms) {
    const phrase = raw.toLowerCase().trim();
    if (!phrase) continue;
    exactPhraseIndex.set(phrase, entity);
    synonymList.push({ phrase, wordCount: phrase.split(/\s+/).length, entity });
  }
}
// Longest phrase (by word count, then char length) first.
synonymList.sort((a, b) => b.wordCount - a.wordCount || b.phrase.length - a.phrase.length);

export function resolveIngredientById(id: string): IngredientEntity | undefined {
  return byId.get(id);
}

export function allIngredients(): IngredientEntity[] {
  return ingredientRegistry;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function wholeWordContains(haystack: string, phrase: string): boolean {
  return new RegExp(`\\b${escapeRegExp(phrase)}\\b`).test(haystack);
}

function singularize(word: string): string | null {
  if (word.endsWith("ies") && word.length > 4) return `${word.slice(0, -3)}y`;
  if (word.endsWith("es") && word.length > 3) return word.slice(0, -2);
  if (word.endsWith("s") && !word.endsWith("ss") && word.length > 3) return word.slice(0, -1);
  return null;
}

/** Words that turn one ingredient into a different product (garlic → garlic powder, tomato → tomato sauce, chicken → chicken stock). */
const IDENTITY_CHANGING_WORDS = new Set(["powder", "paste", "sauce", "stock", "broth", "flakes", "juice", "extract", "essence", "seasoning", "puree", "purée", "syrup", "vinegar", "oil", "milk", "cream", "butter", "flour", "starch"]);

interface SynonymResolution {
  entity: IngredientEntity | null;
  confidence: number;
  ambiguous: boolean;
}

/** Resolves a cleaned ingredient-name phrase to a registry entity. Exported for reuse/testing. */
export function resolveSynonym(phrase: string): SynonymResolution {
  const cleaned = phrase.toLowerCase().trim();
  if (!cleaned) return { entity: null, confidence: 0, ambiguous: false };

  // 1. Exact full-phrase match.
  const exact = exactPhraseIndex.get(cleaned);
  if (exact) return { entity: exact, confidence: 1, ambiguous: false };

  // 2. Singular/plural fallback on the whole phrase.
  const singular = singularize(cleaned);
  if (singular) {
    const singularMatch = exactPhraseIndex.get(singular);
    if (singularMatch) return { entity: singularMatch, confidence: 0.9, ambiguous: false };
  }

  // 3. Longest-synonym-contained-in-phrase fallback.
  let best: SynonymEntry | null = null;
  const tiedIds = new Set<string>();
  for (const entry of synonymList) {
    if (best && entry.wordCount < best.wordCount) break; // synonymList is sorted desc — nothing longer left
    if (wholeWordContains(cleaned, entry.phrase)) {
      if (!best) {
        best = entry;
        tiedIds.add(entry.entity.id);
      } else if (entry.wordCount === best.wordCount) {
        tiedIds.add(entry.entity.id);
      }
    }
  }
  if (best) {
    // "garlic powder" must not quietly become "garlic": a word that changes what the product IS, which the matched
    // synonym doesn't contain, means this is a different ingredient the registry doesn't know yet.
    const changesIdentity = cleaned.split(/[\s-]+/).some((w) => IDENTITY_CHANGING_WORDS.has(w) && !best!.phrase.includes(w));
    if (changesIdentity) return { entity: null, confidence: 0, ambiguous: false };
    return { entity: best.entity, confidence: 0.75, ambiguous: tiedIds.size > 1 };
  }

  return { entity: null, confidence: 0, ambiguous: false };
}

// ---------------------------------------------------------------------------
// Quantity parsing
// ---------------------------------------------------------------------------

function fractionToNumber(token: string): number | null {
  const mixed = token.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (mixed) return Number(mixed[1]) + Number(mixed[2]) / Number(mixed[3]);
  const frac = token.match(/^(\d+)\/(\d+)$/);
  if (frac) return Number(frac[1]) / Number(frac[2]);
  const dec = token.match(/^\d+(\.\d+)?$/);
  if (dec) return Number(token);
  return null;
}

const NUMBER_TOKEN = "\\d+\\s+\\d+\\/\\d+|\\d+\\/\\d+|\\d+(?:\\.\\d+)?";
const LEADING_QTY_RE = new RegExp(`^\\s*(${NUMBER_TOKEN})(?:\\s*(?:to|-)\\s*(?:${NUMBER_TOKEN}))?\\s*`, "i");

interface QuantityParse {
  quantity: number | null;
  unit: string | null;
  rest: string;
}

const UNICODE_FRACTIONS: Record<string, string> = { "¼": "1/4", "½": "1/2", "¾": "3/4", "⅓": "1/3", "⅔": "2/3", "⅛": "1/8", "⅜": "3/8", "⅝": "5/8", "⅞": "7/8" };

/** "1½ cups" -> "1 1/2 cups", "¼ tsp" -> "1/4 tsp" — recipe text uses the single-character fractions. */
export function expandUnicodeFractions(text: string): string {
  return text.replace(/(\d)?\s*([¼½¾⅓⅔⅛⅜⅝⅞])/g, (_m, whole: string | undefined, f: string) => `${whole ? `${whole} ` : ""}${UNICODE_FRACTIONS[f]}`);
}

function parseLeadingQuantity(rawText: string): QuantityParse {
  const text = expandUnicodeFractions(rawText);
  const m = LEADING_QTY_RE.exec(text);
  if (!m) return { quantity: null, unit: null, rest: text.trim() };

  const quantity = fractionToNumber(m[1]);
  let rest = text.slice(m[0].length);

  // A recognized unit word directly following the number?
  const unitMatch = rest.match(/^([a-zA-Z]+)\b\.?\s*/);
  let unit: string | null = null;
  if (unitMatch) {
    const canonical = UNIT_WORDS[unitMatch[1].toLowerCase()];
    if (canonical) {
      unit = canonical;
      rest = rest.slice(unitMatch[0].length);
    }
  }

  // Skip a parenthetical conversion right after the quantity/unit, e.g. "(700 g)".
  rest = rest.replace(/^\(([^)]*)\)\s*/, "").trim();

  // "2 (14 oz) cans": the unit word comes after the parenthetical, and it is a count of cans, not of ounces.
  if (unit === null) {
    const late = rest.match(/^([a-zA-Z]+)\b\.?\s*/);
    const canonical = late ? UNIT_WORDS[late[1].toLowerCase()] : undefined;
    if (late && canonical) {
      unit = canonical;
      rest = rest.slice(late[0].length);
    }
  }

  if (unit === null && quantity !== null) {
    unit = quantity <= 1 ? "whole" : "piece";
  }

  return { quantity, unit, rest };
}

// ---------------------------------------------------------------------------
// Name-phrase segmentation
// ---------------------------------------------------------------------------

function classify(word: string): "form" | "noise" | "core" {
  const w = word.toLowerCase().replace(/^[(),]+|[(),]+$/g, "");
  if (FORM_WORDS.has(w)) return "form";
  if (NOISE_WORDS.has(w)) return "noise";
  return "core";
}

interface SegmentParse {
  namePhrase: string;
  form: string | null;
  preparation: string | null;
}

/**
 * Splits the text remaining after quantity/unit removal into a name
 * phrase and preparation, walking comma-separated segments until one
 * contributes an actual core word (so "boneless, skinless chicken
 * thighs, cut into pieces" correctly finds "chicken thighs", not
 * "boneless").
 */
function segmentNameAndPrep(text: string): SegmentParse {
  const segments = text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const formWords: string[] = [];
  let namePhrase = "";
  let nameSegmentIndex = -1;

  for (let i = 0; i < segments.length; i++) {
    const words = segments[i].split(/\s+/).filter(Boolean);
    const coreWords: string[] = [];
    for (const w of words) {
      const kind = classify(w);
      if (kind === "form") formWords.push(w.toLowerCase());
      else if (kind === "core") coreWords.push(w);
    }
    if (coreWords.length > 0) {
      namePhrase = coreWords.join(" ").toLowerCase();
      nameSegmentIndex = i;
      break;
    }
  }

  const preparation =
    nameSegmentIndex >= 0 && nameSegmentIndex < segments.length - 1
      ? segments.slice(nameSegmentIndex + 1).join(", ")
      : null;

  return {
    namePhrase,
    form: formWords.length > 0 ? formWords.join(" ") : null,
    preparation,
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

function slugify(text: string): string {
  return (
    text
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/(^_|_$)/g, "") || "unknown"
  );
}

/** Just the leading amount of a recipe line ("1 1/2 cups (300 g)", "½ onion") — no ingredient lookup, so it is cheap to call for every dish. */
export function parseAmount(amountText: string): { quantity: number | null; unit: string | null } {
  const { quantity, unit } = parseLeadingQuantity(amountText.trim());
  return { quantity, unit };
}

export function normalizeIngredient(rawText: string): NormalizedIngredient {
  const text = rawText.trim();
  const { quantity, unit, rest } = parseLeadingQuantity(text);
  const { namePhrase, form, preparation } = segmentNameAndPrep(rest);

  // Try the cleaned name phrase, then fall back to the raw remainder (in
  // case noise/form stripping was too aggressive for an unusual phrase).
  // A phrase that is itself a registered name ("whole wheat flour") wins over its noise-stripped form ("wheat flour").
  const wholePhrase = exactPhraseIndex.get(rest.trim().toLowerCase());
  let resolution: SynonymResolution = wholePhrase ? { entity: wholePhrase, confidence: 1, ambiguous: false } : resolveSynonym(namePhrase);
  if (!resolution.entity && namePhrase !== rest.trim()) {
    resolution = resolveSynonym(rest.split(",")[0]);
  }

  if (resolution.entity) {
    return {
      rawText: text,
      ingredientId: resolution.entity.id,
      canonicalName: resolution.entity.canonicalName,
      baseIngredient: resolution.entity.baseIngredient,
      displayName: resolution.entity.displayName,
      quantity,
      unit,
      preparation,
      form,
      confidence: resolution.confidence,
      needsReview: resolution.ambiguous,
      ambiguous: resolution.ambiguous,
    };
  }

  const fallbackSlug = slugify(namePhrase || rest);
  return {
    rawText: text,
    ingredientId: null,
    canonicalName: fallbackSlug,
    baseIngredient: fallbackSlug,
    displayName: namePhrase || rest || text,
    quantity,
    unit,
    preparation,
    form,
    confidence: 0,
    needsReview: true,
    ambiguous: false,
  };
}
