/**
 * Make & Sip — color tokens
 *
 * "Late evening": a warm, cozy, low-glare palette. Deep brown surfaces with a faint plum undertone carry the page;
 * a single apricot-amber, like lamplight, is the one accent for actions and selected states; cream text is soft
 * rather than stark. Roughly 65% deep warm surface, 20% cream text and photography, 10% apricot-amber, 5% sage/clay
 * for status. Contrast: body text and muted text pass WCAG AA on every surface (muted ≈ 8:1, faint ≈ 5:1).
 *
 * Token names are kept from the original theme so components don't need to change — only what each token points at.
 * `cream` is the app's darkest surface; `white` is a separate, still-bright token for text/icons drawn directly over
 * photographs, where it must stay light regardless of theme.
 */

/** The surface colour as an "r, g, b" triple, so overlays on photos and gradients share the exact same ink. */
const INK = "22, 16, 13";

/** A translucent wash of the app's own dark surface — scrims, photo gradients, badges. One source, no loose rgba. */
export const shade = (alpha: number): string => `rgba(${INK}, ${alpha})`;

export const colors = {
  // Surfaces: `cream` is the app background (the darkest), `paper` and `parchment` are raised cards
  cream: "#1B1512",
  paper: "#251D19",
  parchment: "#2C231E",
  white: "#FBF4EA",

  // Amber/gold family — primary actions, selected states, small accents
  burntOrange: "#F0A24F",
  tangerine: "#F6C184",
  flame: "#D98A3D",

  // Text — light on dark
  espresso: "#F6ECDD",
  charcoal: "#FBF4EA",
  espressoMuted: "#C5B3A0",
  espressoFaint: "#9B8A79",

  // Secondary accents — used at 5%, for status and small details
  sageOlive: "#93B07F",
  deepOlive: "#7DA567",
  mustard: "#D49A52",
  tomato: "#DE6B52",
  clay: "#D49A52",

  // Structural
  hairline: "rgba(246, 236, 221, 0.12)",
  hairlineStrong: "rgba(246, 236, 221, 0.22)",
  overlayStrong: shade(0.72),
  overlaySoft: shade(0.35),
  scrim: shade(0.5),
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
  primaryPressed: "#CF7F34",
  onPrimary: colors.cream,

  accent: colors.tangerine,
  accentSoft: colors.flame,

  have: colors.deepOlive,
  haveSoft: "rgba(125, 165, 103, 0.16)",
  missing: colors.burntOrange,
  missingSoft: "rgba(240, 162, 79, 0.14)",
  optional: colors.mustard,
  optionalSoft: "rgba(212, 154, 82, 0.16)",

  expiryUrgent: colors.tomato,
  expiryUrgentSoft: "rgba(222, 107, 82, 0.14)",
  expirySoon: colors.mustard,
  expirySoonSoft: "rgba(212, 154, 82, 0.16)",
  expiryFresh: colors.sageOlive,
} as const;
