/**
 * Make & Sip — color tokens
 *
 * "Bottle & brass": a quiet, upmarket palette. Deep bottle-green surfaces (the colour of a hotel-bar banquette)
 * carry the page; a single muted brass is the one accent for actions and selected states; soft ivory text keeps the
 * glare down. Roughly 70% deep green surface, 20% ivory text and photography, 8% brass, 2% status colour. Contrast:
 * ivory, muted and faint text all pass WCAG AA on every surface, and brass reads on all of them.
 *
 * Token names are kept from the original theme so components don't need to change — only what each token points at.
 * `cream` is the app's darkest surface; `white` is a separate, still-bright token for text/icons drawn directly over
 * photographs, where it must stay light regardless of theme.
 */

/** The surface colour as an "r, g, b" triple, so overlays on photos and gradients share the exact same ink. */
const INK = "9, 16, 13";

/** A translucent wash of the app's own dark surface — scrims, photo gradients, badges. One source, no loose rgba. */
export const shade = (alpha: number): string => `rgba(${INK}, ${alpha})`;

/** A translucent wash of the app's ivory text colour, for light chips and badges over photos. */
export const ivoryWash = (alpha: number): string => `rgba(246, 242, 232, ${alpha})`;

export const colors = {
  // Surfaces: `cream` is the app background (the darkest), `paper` and `parchment` are raised cards
  cream: "#0F1915",
  paper: "#16231E",
  parchment: "#1C2B25",
  white: "#F6F2E8",

  // Amber/gold family — primary actions, selected states, small accents
  burntOrange: "#C9A66B",
  tangerine: "#E0C592",
  flame: "#A98A52",

  // Text — light on dark
  espresso: "#EEE8DA",
  charcoal: "#F6F2E8",
  espressoMuted: "#B8B7A6",
  espressoFaint: "#969788",

  // Secondary accents — used at 5%, for status and small details
  sageOlive: "#8FBF9F",
  deepOlive: "#6FAF8C",
  mustard: "#D2A64A",
  tomato: "#E0735B",
  clay: "#C28A5E",

  // Temperature — the hot and cold marks on drink photos
  ember: "#EE9A6B",
  frost: "#A6D3E3",

  // Structural
  hairline: "rgba(238, 232, 218, 0.12)",
  hairlineStrong: "rgba(238, 232, 218, 0.24)",
  overlayStrong: shade(0.72),
  overlaySoft: shade(0.35),
  scrim: shade(0.5),

  /** The page behind the phone-width column on the web preview. */
  webBackdrop: "#08100D",
} as const;

export type ColorToken = keyof typeof colors;

/** Semantic aliases so components read by intent, not by hue. */
export const semantic = {
  background: colors.cream,
  surface: colors.paper,
  surfaceAlt: colors.parchment,
  textPrimary: colors.espresso,
  textSecondary: colors.espressoMuted,
  textFaint: colors.espressoFaint,
  /** For text/icons drawn over a photo, not over the app's own dark surface. */
  textOnDark: colors.white,
  border: colors.hairline,
  borderStrong: colors.hairlineStrong,

  primary: colors.burntOrange,
  primaryPressed: "#B38F55",
  onPrimary: colors.cream,

  accent: colors.tangerine,
  accentSoft: colors.flame,

  have: colors.deepOlive,
  haveSoft: "rgba(111, 175, 140, 0.16)",
  haveSoftStrong: "rgba(111, 175, 140, 0.24)",
  /** Solid-ish fills for the Ready / Almost ready badges that sit on photos. */
  readyFill: "rgba(111, 175, 140, 0.95)",
  almostFill: "rgba(201, 166, 107, 0.95)",
  neutralFill: "rgba(28, 43, 37, 0.92)",
  missing: colors.burntOrange,
  missingSoft: "rgba(201, 166, 107, 0.14)",
  optional: colors.mustard,
  optionalSoft: "rgba(210, 166, 74, 0.16)",

  expiryUrgent: colors.tomato,
  expiryUrgentSoft: "rgba(224, 115, 91, 0.14)",
  expirySoon: colors.mustard,
  expirySoonSoft: "rgba(210, 166, 74, 0.16)",
  expiryFresh: colors.sageOlive,
  expiryFreshSoft: "rgba(143, 191, 159, 0.14)",
} as const;
