import React from "react";
import { View, StyleSheet } from "react-native";
import { colors, shade } from "@/theme";
import type { Recipe } from "@/types";
import { FireIcon, SnowflakeIcon } from "./icons";

/** "Served hot" / "Served cold", spelled out for screen readers and labels. */
export const temperatureLabel = (t: Recipe["temperature"]): string => (t === "hot" ? "Served hot" : "Served cold");

/** The small round hot or cold mark that sits in the corner of a drink's photo: a flame for hot, a snowflake for cold. */
export function TemperatureBadge({ temperature, size = 26 }: { temperature: Recipe["temperature"]; size?: number }) {
  const Icon = temperature === "hot" ? FireIcon : SnowflakeIcon;
  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={temperatureLabel(temperature)}
      style={[styles.wrap, { width: size, height: size, borderRadius: size / 2 }]}
    >
      <Icon size={Math.round(size * 0.58)} color={temperature === "hot" ? colors.ember : colors.frost} filled />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: shade(0.62), alignItems: "center", justifyContent: "center" },
});
