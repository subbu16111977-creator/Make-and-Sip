import React from "react";
import { Text, StyleSheet } from "react-native";
import { Pressable } from "@/components/Pressable";
import { colors, radii, semantic, spacing, type as typeScale } from "@/theme";
import { CheckIcon } from "./icons";

interface ChipProps {
  label: string;
  selected?: boolean;
  /** Shows a tick before the label (for "added" states). */
  checked?: boolean;
  onPress?: () => void;
}

/** A single filter/selector pill — used by Pantry's add form and Discover's filters. */
export function Chip({ label, selected, checked, onPress }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: Boolean(selected) }}
      style={({ pressed }) => [styles.base, selected && styles.selected, pressed && styles.pressed]}
    >
      {checked ? <CheckIcon size={13} color={colors.tangerine} strokeWidth={2.2} /> : null}
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
    borderRadius: radii.md,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.hairlineStrong,
  },
  selected: {
    backgroundColor: semantic.missingSoft,
    borderColor: colors.burntOrange,
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    ...typeScale.label,
    color: colors.espresso,
  },
  labelSelected: {
    color: colors.tangerine,
  },
});
