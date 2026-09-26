import React from "react";
import { Pressable, Text, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import { colors, radii, spacing, type as typeScale } from "@/theme";
import { ArrowRightIcon } from "./icons";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  icon?: "arrow" | "none";
  style?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
}

export function Button({ label, onPress, variant = "primary", icon = "none", style, fullWidth }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        fullWidth && styles.fullWidth,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.label, labelVariantStyles[variant]]}>{label}</Text>
      {icon === "arrow" && (
        <ArrowRightIcon size={16} color={variant === "primary" ? colors.cream : colors.espresso} strokeWidth={1.8} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingVertical: 14,
    paddingHorizontal: spacing["2xl"],
    borderRadius: radii.md,
    alignSelf: "flex-start",
  },
  fullWidth: {
    alignSelf: "stretch",
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    ...typeScale.button,
  },
});

const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.burntOrange,
  },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 1.3,
    borderColor: colors.espresso,
  },
  ghost: {
    backgroundColor: "transparent",
    paddingHorizontal: spacing.sm,
  },
});

const labelVariantStyles = StyleSheet.create({
  primary: { color: colors.cream },
  secondary: { color: colors.espresso },
  ghost: { color: colors.burntOrange },
});
