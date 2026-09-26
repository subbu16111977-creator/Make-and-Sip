import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors, spacing, type as typeScale, layout } from "@/theme";
import { ChevronRightIcon } from "./icons";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  onPressAction?: () => void;
  actionLabel?: string;
}

export function SectionHeader({ eyebrow, title, subtitle, onPressAction, actionLabel = "See all" }: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <View style={styles.textCol}>
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {onPressAction ? (
        <Pressable onPress={onPressAction} style={styles.action} hitSlop={8}>
          <Text style={styles.actionLabel}>{actionLabel}</Text>
          <ChevronRightIcon size={16} color={colors.burntOrange} strokeWidth={2} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: layout.screenPadding,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  textCol: {
    flex: 1,
    gap: 4,
  },
  eyebrow: {
    ...typeScale.eyebrow,
    color: colors.burntOrange,
  },
  title: {
    ...typeScale.headline,
    color: colors.espresso,
  },
  subtitle: {
    ...typeScale.bodySmall,
    color: colors.espressoMuted,
    marginTop: 2,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingBottom: 4,
  },
  actionLabel: {
    ...typeScale.label,
    color: colors.burntOrange,
  },
});
