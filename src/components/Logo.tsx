import React from "react";
import Svg, { Circle, Path } from "react-native-svg";
import { colors } from "@/theme";

interface LogoMarkProps {
  size?: number;
  color?: string;
  accessibilityLabel?: string;
}

/**
 * The Mise logo mark: a plate seen from above with a monogram M at its centre
 * and three wisps of steam rising from it ("mise en place" — everything
 * ready at the table). Drawn as plain strokes so it stays crisp at any size.
 */
export function LogoMark({ size = 120, color = colors.burntOrange, accessibilityLabel = "Mise logo" }: LogoMarkProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none" accessibilityLabel={accessibilityLabel}>
      {/* steam */}
      <Path d="M40 22C36 18 44 15 40 10" stroke={color} strokeWidth={2.4} strokeLinecap="round" opacity={0.9} />
      <Path d="M50 20C46 15 54 12 50 6" stroke={color} strokeWidth={2.4} strokeLinecap="round" />
      <Path d="M60 22C56 18 64 15 60 10" stroke={color} strokeWidth={2.4} strokeLinecap="round" opacity={0.9} />
      {/* plate */}
      <Circle cx={50} cy={60} r={32} stroke={color} strokeWidth={3} />
      <Circle cx={50} cy={60} r={25} stroke={color} strokeWidth={1.2} opacity={0.45} />
      {/* monogram */}
      <Path d="M37 72V49L50 66L63 49V72" stroke={color} strokeWidth={4.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
