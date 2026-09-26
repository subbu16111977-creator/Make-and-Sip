import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, radii, spacing, type as typeScale, shadows } from "@/theme";
import type { PantryItem } from "@/types";
import { daysUntil } from "@/lib/pantryMatch";

interface ExpiringIngredientCardProps {
  item: PantryItem;
}

function urgencyFor(days: number) {
  if (days <= 1) {
    return { label: days <= 0 ? "Use today" : "Use tomorrow", fg: colors.tomato, bg: "rgba(209, 87, 61, 0.16)" };
  }
  if (days <= 3) {
    return { label: `${days} days left`, fg: colors.mustard, bg: "rgba(201, 138, 70, 0.18)" };
  }
  return { label: `${days} days left`, fg: colors.sageOlive, bg: "rgba(143, 175, 123, 0.14)" };
}

/** A single ingredient "shelf card" for the horizontal Use These First rail. */
export function ExpiringIngredientCard({ item }: ExpiringIngredientCardProps) {
  const days = daysUntil(item.expiryDate);
  const urgency = urgencyFor(days);

  return (
    <View style={styles.wrap}>
      <View style={[styles.tag, { backgroundColor: urgency.bg }]}>
        <View style={[styles.dot, { backgroundColor: urgency.fg }]} />
        <Text style={[styles.tagText, { color: urgency.fg }]}>{urgency.label}</Text>
      </View>
      <Text style={styles.name} numberOfLines={2}>
        {item.name}
      </Text>
      <Text style={styles.meta}>
        {item.quantity} {item.unit} · {item.location}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 148,
    backgroundColor: colors.paper,
    borderRadius: radii.lg,
    padding: spacing.md,
    gap: 8,
    ...shadows.none,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 7,
    borderRadius: radii.sm,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  tagText: {
    ...typeScale.caption,
    fontSize: 11,
  },
  name: {
    ...typeScale.bodyMedium,
    color: colors.espresso,
    fontSize: 15,
    lineHeight: 19,
  },
  meta: {
    ...typeScale.caption,
    color: colors.espressoMuted,
  },
});
