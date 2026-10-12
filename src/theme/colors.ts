/**
 * Make & Sip — color tokens
 *
 * "Midnight Kitchen": a moody, late-night-cookbook palette. Near-black
 * espresso-brown surfaces carry the page; warm amber-gold is the one
 * accent, used sparingly for actions and selected states. Roughly 65%
 * near-black surface, 20% warm cream text and photography, 10%
 * amber-gold, 5% sage/clay for status.
 *
 * Token names are kept from the original light theme so components
 * don't need to change — only what each token points at changed.
 * `cream` is the app's darkest surface (was the palest); `white` is a
 * separate, still-bright token reserved for text/icons drawn directly
 * over photographs, where it must stay light regardless of theme.
 */

export const colors = {
  // Surfaces (darkest → card surfaces, lightest → app background is still the darkest of the three)
  cream: "#15130F",
  paper: "#1E1B15",
  parchment: "#211D17",
  white: "#F9F5EC",

  // Amber/gold family — primary actions, selected states, small accents
  burntOrange: "#E3A23C",
  tangerine: "#EFC17A",
  flame: "#C98A46",

  // Text — light on dark
  espresso: "#F4EEE0",
  charcoal: "#F9F5EC",
  espressoMuted: "#B7AC97",
  espressoFaint: "#8A8271",

  // Secondary accents — used at 5%, for status and small details
  sageOlive: "#8FAF7B",
  deepOlive: "#6E9A5B",
  mustard: "#C98A46",
  tomato: "#D1573D",
  clay: "#C98A46",

  // Structural
  hairline: "rgba(244, 238, 224, 0.12)",
  hairlineStrong: "rgba(244, 238, 224, 0.22)",
  overlayStrong: "rgba(11, 10, 8, 0.72)",
  overlaySoft: "rgba(11, 10, 8, 0.35)",
  scrim: "rgba(11, 10, 8, 0.5)",
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
  primaryPressed: "#C4832E",
  onPrimary: colors.cream,

  accent: colors.tangerine,
  accentSoft: colors.flame,

  have: colors.deepOlive,
  haveSoft: "rgba(110, 154, 91, 0.16)",
  missing: colors.burntOrange,
  missingSoft: "rgba(227, 162, 60, 0.14)",
  optional: colors.mustard,
  optionalSoft: "rgba(201, 138, 70, 0.16)",

  expiryUrgent: colors.tomato,
  expiryUrgentSoft: "rgba(209, 87, 61, 0.14)",
  expirySoon: colors.mustard,
  expirySoonSoft: "rgba(201, 138, 70, 0.16)",
  expiryFresh: colors.sageOlive,
} as const;
