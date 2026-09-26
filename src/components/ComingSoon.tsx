import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Screen } from "./Screen";
import { colors, spacing, type as typeScale, layout } from "@/theme";
import type { IconProps } from "./icons";

interface ComingSoonProps {
  eyebrow: string;
  title: string;
  body: string;
  Icon: React.ComponentType<IconProps>;
}

/**
 * This build stage ships the Home screen in full. The remaining four
 * tabs are staged next — this keeps the shell honest about what's
 * built without faking finished functionality.
 */
export function ComingSoon({ eyebrow, title, body, Icon }: ComingSoonProps) {
  return (
    <Screen contentContainerStyle={styles.wrap} noScroll>
      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <Icon size={30} color={colors.burntOrange} strokeWidth={1.4} />
        </View>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: layout.screenPadding + spacing.lg,
    gap: 6,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.paper,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  eyebrow: {
    ...typeScale.eyebrow,
    color: colors.burntOrange,
    marginBottom: 4,
  },
  title: {
    ...typeScale.headline,
    color: colors.espresso,
    textAlign: "center",
  },
  body: {
    ...typeScale.body,
    color: colors.espressoMuted,
    textAlign: "center",
    marginTop: 6,
    maxWidth: 320,
  },
});
