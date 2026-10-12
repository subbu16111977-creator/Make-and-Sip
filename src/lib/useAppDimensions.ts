import { useWindowDimensions } from "react-native";

/**
 * Make & Sip is built for phones. On wide screens (a computer browser, a tablet) the
 * app is shown as a centred phone-width column, so every layout calculation has
 * to use that column's width rather than the whole window's.
 */
export const MAX_APP_WIDTH = 430;

export function useAppDimensions(): { width: number; height: number } {
  const { width, height } = useWindowDimensions();
  return { width: Math.min(width, MAX_APP_WIDTH), height };
}
