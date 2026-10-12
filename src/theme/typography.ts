import { Platform } from "react-native";

/**
 * Make & Sip — typographic system
 *
 * Libre Caslon Display (serif) carries editorial moments: recipe
 * titles, chapter headings, quotes — a single regular weight, set
 * large. Work Sans (sans) carries everything functional: ingredients,
 * metadata, controls, body copy. Two families only.
 */
export const fontFamily = {
  serif: "LibreCaslonDisplay_400Regular",
  serifItalic: "LibreCaslonDisplay_400Regular",
  serifRegular: "LibreCaslonDisplay_400Regular",
  serifBold: "LibreCaslonDisplay_400Regular",
  sans: "WorkSans_400Regular",
  sansMedium: "WorkSans_500Medium",
  sansSemiBold: "WorkSans_600SemiBold",
  sansBold: "WorkSans_700Bold",
} as const;

export const fontsToLoad = {
  LibreCaslonDisplay_400Regular: require("@expo-google-fonts/libre-caslon-display/400Regular/LibreCaslonDisplay_400Regular.ttf"),
  WorkSans_400Regular: require("@expo-google-fonts/work-sans/400Regular/WorkSans_400Regular.ttf"),
  WorkSans_500Medium: require("@expo-google-fonts/work-sans/500Medium/WorkSans_500Medium.ttf"),
  WorkSans_600SemiBold: require("@expo-google-fonts/work-sans/600SemiBold/WorkSans_600SemiBold.ttf"),
  WorkSans_700Bold: require("@expo-google-fonts/work-sans/700Bold/WorkSans_700Bold.ttf"),
};

type TextPreset = {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing?: number;
  textTransform?: "none" | "uppercase";
};

/**
 * Type scale. "display"/"headline"/"title" are serif editorial
 * moments. Everything else is sans and functional.
 */
export const type: Record<string, TextPreset> = {
  // Editorial serif
  display: { fontFamily: fontFamily.serif, fontSize: 34, lineHeight: 40, letterSpacing: -0.4 },
  displayItalic: { fontFamily: fontFamily.serifItalic, fontSize: 22, lineHeight: 28 },
  headline: { fontFamily: fontFamily.serif, fontSize: 26, lineHeight: 32, letterSpacing: -0.2 },
  title: { fontFamily: fontFamily.serif, fontSize: 20, lineHeight: 26 },
  titleSmall: { fontFamily: fontFamily.serif, fontSize: 17, lineHeight: 22 },

  // Functional sans
  eyebrow: {
    fontFamily: fontFamily.sansSemiBold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.6,
    textTransform: "uppercase",
  },
  body: { fontFamily: fontFamily.sans, fontSize: 16, lineHeight: 23 },
  bodyMedium: { fontFamily: fontFamily.sansMedium, fontSize: 16, lineHeight: 23 },
  bodySmall: { fontFamily: fontFamily.sans, fontSize: 14, lineHeight: 20 },
  label: { fontFamily: fontFamily.sansSemiBold, fontSize: 14, lineHeight: 18 },
  meta: { fontFamily: fontFamily.sansMedium, fontSize: 13, lineHeight: 17 },
  caption: { fontFamily: fontFamily.sans, fontSize: 12, lineHeight: 16 },
  button: { fontFamily: fontFamily.sansSemiBold, fontSize: 15, lineHeight: 18, letterSpacing: 0.2 },
};

/** Web fallback stacks so the design still reads before fonts hydrate. */
export const fallbackFamily = Platform.select({
  web: { serif: "Georgia, 'Times New Roman', serif", sans: "system-ui, sans-serif" },
  default: { serif: undefined, sans: undefined },
});
