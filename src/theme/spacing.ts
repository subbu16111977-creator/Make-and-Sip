/** Mise — spacing & layout scale (4px base unit, editorial-generous). */
export const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
  "6xl": 64,
  "7xl": 80,
} as const;

export type SpacingToken = keyof typeof spacing;

/** Corner radii — moderate throughout; nothing is a pill by default. */
export const radii = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 18,
  "2xl": 24,
  pill: 999,
} as const;

export type RadiusToken = keyof typeof radii;

/** Consistent screen gutters. */
export const layout = {
  screenPadding: spacing["2xl"],
  cardGap: spacing.lg,
  sectionGap: spacing["4xl"],
  maxContentWidth: 560,
} as const;
