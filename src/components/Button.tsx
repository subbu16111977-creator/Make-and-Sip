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
  /** Greyed out and not pressable. */
  disabled?: boolean;
}

export function Button({ label, onPress, variant = "primary", icon = "none", style, fullWidth, disabled }: ButtonProps) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: Boolean(disabled) }}
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        disabled && styles.disabled,
        fullWidth && styles.fullWidth,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.label, labelVariantStyles[variant], disabled && styles.disabledLabel]}>{label}</Text>
      {icon === "arrow" && (
        <ArrowRightIcon size={16} color={disabled ? colors.espressoFaint : variant === "primary" ? colors.cream : colors.espresso} strokeWidth={1.8} />
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
    paddingVertical: 16,
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
  disabled: {
    backgroundColor: colors.parchment,
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  disabledLabel: { color: colors.espressoFaint },
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
    borderWidth: 1,
    borderColor: colors.burntOrange,
  },
  ghost: {
    backgroundColor: "transparent",
    paddingHorizontal: spacing.sm,
  },
});

const labelVariantStyles = StyleSheet.create({
  primary: { color: colors.cream },
  secondary: { color: colors.burntOrange },
  ghost: { color: colors.burntOrange },
});
