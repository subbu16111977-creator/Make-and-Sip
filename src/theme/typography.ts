import { Platform } from "react-native";

/**
 * Make & Sip — typographic system
 *
 * Bricolage Grotesque carries the voice: drink names, headings, big numbers — warm, slightly quirky, confident,
 * with the compact punch of a gig poster rather than a cookbook. DM Sans carries everything functional:
 * ingredients, metadata, controls, body copy — friendly geometric shapes that stay calm at small sizes.
 * Two families only.
 */
export const fontFamily = {
  display: "BricolageGrotesque_600SemiBold",
  displayMedium: "BricolageGrotesque_500Medium",
  sans: "DMSans_400Regular",
  sansMedium: "DMSans_500Medium",
  sansSemiBold: "DMSans_600SemiBold",
  sansBold: "DMSans_700Bold",
} as const;

export const fontsToLoad = {
  BricolageGrotesque_500Medium: require("@expo-google-fonts/bricolage-grotesque/500Medium/BricolageGrotesque_500Medium.ttf"),
  BricolageGrotesque_600SemiBold: require("@expo-google-fonts/bricolage-grotesque/600SemiBold/BricolageGrotesque_600SemiBold.ttf"),
  DMSans_400Regular: require("@expo-google-fonts/dm-sans/400Regular/DMSans_400Regular.ttf"),
  DMSans_500Medium: require("@expo-google-fonts/dm-sans/500Medium/DMSans_500Medium.ttf"),
  DMSans_600SemiBold: require("@expo-google-fonts/dm-sans/600SemiBold/DMSans_600SemiBold.ttf"),
  DMSans_700Bold: require("@expo-google-fonts/dm-sans/700Bold/DMSans_700Bold.ttf"),
};

type TextPreset = {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing?: number;
  textTransform?: "none" | "uppercase";
};

/**
 * Type scale. "display"/"headline"/"title" use the display face; everything else is the functional sans.
 * Sizes and line heights are unchanged from the previous theme so no layout moves.
 */
export const type: Record<string, TextPreset> = {
  // Display face
  display: { fontFamily: fontFamily.display, fontSize: 34, lineHeight: 40, letterSpacing: -0.7 },
  displayItalic: { fontFamily: fontFamily.displayMedium, fontSize: 22, lineHeight: 28, letterSpacing: -0.3 },
  headline: { fontFamily: fontFamily.display, fontSize: 26, lineHeight: 32, letterSpacing: -0.5 },
  title: { fontFamily: fontFamily.display, fontSize: 20, lineHeight: 26, letterSpacing: -0.3 },
  titleSmall: { fontFamily: fontFamily.display, fontSize: 17, lineHeight: 22, letterSpacing: -0.2 },

  // Functional sans
  eyebrow: {
    fontFamily: fontFamily.sansBold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.5,
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
  web: { display: "system-ui, sans-serif", sans: "system-ui, sans-serif" },
  default: { display: undefined, sans: undefined },
});
