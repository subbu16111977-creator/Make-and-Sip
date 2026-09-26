import { Platform, type ViewStyle } from "react-native";

/**
 * Shadows are used sparingly — a soft lift for the hero image and
 * floating surfaces only. Most hierarchy comes from spacing, hairline
 * dividers, and typography instead of drop shadows. On the dark
 * "Midnight Kitchen" theme, shadows read as pure-black depth rather
 * than a tinted lift, so opacities run a bit higher to still register
 * against a near-black background.
 */
function shadow(opacity: number, radius: number, offsetY: number, elevation: number): ViewStyle {
  return Platform.select<ViewStyle>({
    web: {
      boxShadow: `0 ${offsetY}px ${radius}px rgba(0, 0, 0, ${opacity})`,
    },
    default: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: offsetY },
      shadowOpacity: opacity,
      shadowRadius: radius,
      elevation,
    },
  }) as ViewStyle;
}

export const shadows = {
  none: {} as ViewStyle,
  low: shadow(0.28, 10, 3, 2),
  soft: shadow(0.34, 20, 8, 4),
  lifted: shadow(0.45, 32, 14, 8),
};
