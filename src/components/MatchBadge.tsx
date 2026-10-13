import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, radii, spacing, type as typeScale } from "@/theme";
import { CheckIcon } from "./icons";

interface MatchBadgeProps {
  haveCount: number;
  totalCount: number;
  tone?: "light" | "dark";
}

/** Small "6 of 8 on hand" indicator used on drink cards. */
export function MatchBadge({ haveCount, totalCount, tone = "light" }: MatchBadgeProps) {
  const complete = haveCount >= totalCount;
  const dark = tone === "dark";

  return (
    <View
      style={[
        styles.wrap,
        dark ? styles.wrapDark : styles.wrapLight,
        complete && (dark ? styles.wrapDarkComplete : styles.wrapLightComplete),
      ]}
    >
      {complete ? (
        <CheckIcon size={11} color={dark ? colors.white : colors.deepOlive} strokeWidth={2.4} />
      ) : null}
      <Text style={[styles.text, dark ? styles.textDark : styles.textLight]}>
        {complete ? "You have it all" : `${haveCount} of ${totalCount} on hand`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    alignSelf: "flex-start",
    paddingVertical: 5,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.sm,
  },
  wrapLight: {
    backgroundColor: "rgba(111, 175, 140, 0.16)",
  },
  wrapLightComplete: {
    backgroundColor: "rgba(111, 175, 140, 0.24)",
  },
  wrapDark: {
    backgroundColor: "rgba(246, 242, 232, 0.16)",
  },
  wrapDarkComplete: {
    backgroundColor: "rgba(246, 242, 232, 0.22)",
  },
  text: {
    ...typeScale.caption,
    fontFamily: typeScale.meta.fontFamily,
    fontSize: 12,
  },
  textLight: {
    color: colors.deepOlive,
  },
  textDark: {
    color: colors.white,
  },
});
