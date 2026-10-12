import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, radii, spacing, type as typeScale } from "@/theme";
import type { Cookability, CookabilityCategory } from "@/lib/cookability";
import { CheckIcon } from "./icons";

const TINT: Record<CookabilityCategory, string> = {
  ready: "rgba(125, 165, 103, 0.94)",
  almost: "rgba(240, 162, 79, 0.94)",
  partial: "rgba(44, 35, 30, 0.9)",
  low: "rgba(44, 35, 30, 0.9)",
};

/** "Ready · 100%" / "82% · Almost ready" — the dish's Cookability at a glance, used on cards and the dish page. */
export function CookabilityBadge({ cookability }: { cookability: Cookability }) {
  const ready = cookability.category === "ready";
  const dark = cookability.category === "almost";
  const text = ready ? `Ready · ${cookability.percent}%` : `${cookability.percent}% · ${cookability.label}`;
  return (
    <View style={[styles.wrap, { backgroundColor: TINT[cookability.category] }]} accessible accessibilityLabel={`${cookability.label}, ${cookability.percent} percent`}>
      {ready ? <CheckIcon size={11} color={colors.white} strokeWidth={2.4} /> : null}
      <Text style={[styles.text, dark && styles.textDark]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: "row", alignItems: "center", gap: 5, alignSelf: "flex-start", paddingVertical: 5, paddingHorizontal: spacing.sm, borderRadius: radii.sm },
  text: { ...typeScale.caption, fontFamily: typeScale.meta.fontFamily, fontSize: 12, color: colors.white },
  textDark: { color: colors.cream },
});
