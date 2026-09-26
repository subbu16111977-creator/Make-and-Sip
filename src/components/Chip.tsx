import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { colors, radii, spacing, type as typeScale } from "@/theme";

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

/** A single filter/selector pill — used by Pantry's add form and Discover's filters. */
export function Chip({ label, selected, onPress }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.base, selected && styles.selected, pressed && styles.pressed]}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 8,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.pill,
    backgroundColor: colors.paper,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
  },
  selected: {
    backgroundColor: colors.burntOrange,
    borderColor: colors.burntOrange,
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    ...typeScale.label,
    fontSize: 13,
    color: colors.espresso,
  },
  labelSelected: {
    color: colors.cream,
  },
});
