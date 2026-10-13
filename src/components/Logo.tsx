import React from "react";
import { Image, type ImageStyle, type StyleProp } from "react-native";

const FULL = require("../../assets/logo.png");
const MARK = require("../../assets/logo-mark.png");

// Source image sizes, so the logo keeps its proportions at any width.
const FULL_RATIO = 900 / 753; // width / height of logo.png (mug mark + "make & sip" wordmark)
const MARK_RATIO = 640 / 700; // width / height of logo-mark.png

interface LogoProps {
  /** "full" = steaming-mug mark with the "make & sip" wordmark; "mark" = the symbol alone. */
  variant?: "full" | "mark";
  /** Height in points; width follows the logo's proportions. */
  height: number;
  style?: StyleProp<ImageStyle>;
}

/** The Make & Sip logo: a mug whose steam is three equaliser bars, on a transparent background so it sits on the app's dark surfaces. */
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
