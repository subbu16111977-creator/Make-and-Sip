import React, { useEffect, useRef, useState } from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { colors, radii, spacing, type as typeScale } from "@/theme";
import { RefreshIcon } from "@/components/icons";

interface RefreshButtonProps {
  onPress: () => void;
  label?: string;
}

/** A small pill that re-runs a screen's recommendations. Shows "Refreshing…" for a beat so the tap feels acknowledged. */
export function RefreshButton({ onPress, label = "Refresh" }: RefreshButtonProps) {
  const [busy, setBusy] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const handlePress = () => {
    onPress();
    setBusy(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setBusy(false), 700);
  };

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.pill, pressed && styles.pressed]}
      hitSlop={6}
    >
      <RefreshIcon size={15} color={colors.espresso} />
      <Text style={styles.label}>{busy ? "Refreshing…" : label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
    paddingVertical: 7,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.pill,
    backgroundColor: colors.paper,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
  },
  pressed: { opacity: 0.7 },
  label: {
    ...typeScale.caption,
    color: colors.espresso,
  },
});
