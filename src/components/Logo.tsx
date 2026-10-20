import React from "react";
import { Image, type ImageStyle, type StyleProp } from "react-native";

const FULL = require("../../assets/logo.png");
const MARK = require("../../assets/logo-mark.png");

// Source image sizes, so the logo keeps its proportions at any width.
const FULL_RATIO = 766 / 713; // width / height of logo.png (the bottle mark above the "make & sip" wordmark)
const MARK_RATIO = 501 / 700; // width / height of logo-mark.png

interface LogoProps {
  /** "full" = the bottle mark with the "make & sip" wordmark under it; "mark" = the symbol alone. */
  variant?: "full" | "mark";
  /** Height in points; width follows the logo's proportions. */
  height: number;
  style?: StyleProp<ImageStyle>;
}

/** The Make & Sip logo: a milk bottle with a piece of fruit beside it, drawn in line, on a transparent background so it sits on the app's dark surfaces. */
export function Logo({ variant = "full", height, style }: LogoProps) {
  const ratio = variant === "full" ? FULL_RATIO : MARK_RATIO;
  return (
    <Image
      source={variant === "full" ? FULL : MARK}
      style={[{ height, width: height * ratio }, style]}
      resizeMode="contain"
      accessible
      accessibilityRole="image"
      accessibilityLabel="Make & Sip logo"
    />
  );
}
