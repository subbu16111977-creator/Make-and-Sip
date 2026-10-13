import { Platform } from "react-native";

/**
 * Make & Sip — typographic system
 *
 * Cormorant Garamond carries the voice: drink names, headings and big numbers — a refined, high-contrast Garamond
 * with the poise of a printed cocktail-lounge menu. Jost carries everything functional: ingredients, metadata,
 * controls and body copy — a clean geometric sans (Futura's descendant) that stays quiet and legible at small sizes.
 * Buttons and eyebrows are set in small, letter-spaced capitals, the way a menu sets its section names.
 * Two families only.
 */
export const fontFamily = {
  display: "CormorantGaramond_600SemiBold",
  displayMedium: "CormorantGaramond_500Medium",
  displayItalic: "CormorantGaramond_500Medium_Italic",
  sans: "Jost_400Regular",
  sansMedium: "Jost_500Medium",
  sansSemiBold: "Jost_600SemiBold",
  sansBold: "Jost_600SemiBold",
} as const;

export const fontsToLoad = {
  CormorantGaramond_500Medium: require("@expo-google-fonts/cormorant-garamond/500Medium/CormorantGaramond_500Medium.ttf"),
  CormorantGaramond_500Medium_Italic: require("@expo-google-fonts/cormorant-garamond/500Medium_Italic/CormorantGaramond_500Medium_Italic.ttf"),
  CormorantGaramond_600SemiBold: require("@expo-google-fonts/cormorant-garamond/600SemiBold/CormorantGaramond_600SemiBold.ttf"),
  Jost_400Regular: require("@expo-google-fonts/jost/400Regular/Jost_400Regular.ttf"),
  Jost_500Medium: require("@expo-google-fonts/jost/500Medium/Jost_500Medium.ttf"),
  Jost_600SemiBold: require("@expo-google-fonts/jost/600SemiBold/Jost_600SemiBold.ttf"),
};

type TextPreset = {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing?: number;
  textTransform?: "none" | "uppercase";
};

/**
 * Type scale. "display"/"headline"/"title" use the display face; everything else is the functional sans. Cormorant
 * has a small x-height, so its sizes run a little larger than a typical serif to read the same.
 */
export const type: Record<string, TextPreset> = {
  // Display face
  display: { fontFamily: fontFamily.display, fontSize: 38, lineHeight: 42, letterSpacing: -0.4 },
  displayItalic: { fontFamily: fontFamily.displayItalic, fontSize: 24, lineHeight: 30, letterSpacing: 0 },
  headline: { fontFamily: fontFamily.display, fontSize: 30, lineHeight: 34, letterSpacing: -0.3 },
  title: { fontFamily: fontFamily.display, fontSize: 23, lineHeight: 28, letterSpacing: -0.1 },
  titleSmall: { fontFamily: fontFamily.display, fontSize: 19, lineHeight: 24, letterSpacing: 0 },

  // Functional sans
  eyebrow: {
    fontFamily: fontFamily.sansSemiBold,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 2.2,
    textTransform: "uppercase",
  },
  body: { fontFamily: fontFamily.sans, fontSize: 16, lineHeight: 24 },
  bodyMedium: { fontFamily: fontFamily.sansMedium, fontSize: 16, lineHeight: 24 },
  bodySmall: { fontFamily: fontFamily.sans, fontSize: 14, lineHeight: 21 },
  label: { fontFamily: fontFamily.sansMedium, fontSize: 14, lineHeight: 18, letterSpacing: 0.2 },
  meta: { fontFamily: fontFamily.sansMedium, fontSize: 13, lineHeight: 17, letterSpacing: 0.2 },
  caption: { fontFamily: fontFamily.sans, fontSize: 12, lineHeight: 16, letterSpacing: 0.2 },
  button: { fontFamily: fontFamily.sansSemiBold, fontSize: 12.5, lineHeight: 16, letterSpacing: 1.6, textTransform: "uppercase" },
};

/** Web fallback stacks so the design still reads before fonts hydrate. */
export const fallbackFamily = Platform.select({
  web: { display: "system-ui, sans-serif", sans: "system-ui, sans-serif" },
  default: { display: undefined, sans: undefined },
});
