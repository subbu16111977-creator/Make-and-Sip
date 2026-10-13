import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, radii, spacing, type as typeScale, shadows, shade } from "@/theme";
import { RecipeImage } from "./RecipeImage";

interface CuisineTileProps {
  cuisine: string;
  count: number;
  image: string;
  onPress: () => void;
}

/** Photo tile that jumps to Discover filtered to one cuisine. */
export function CuisineTile({ cuisine, count, image, onPress }: CuisineTileProps) {
  return (
    <Pressable onPress={onPress} style={styles.wrap}>
      <RecipeImage uri={image} title={cuisine} style={StyleSheet.absoluteFill} />
      <LinearGradient
        colors={[shade(0.05), shade(0.85)]}
        locations={[0.35, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.text}>
        <Text style={styles.name}>{cuisine}</Text>
        <Text style={styles.count}>{count} {count === 1 ? "drink" : "drinks"}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 150,
    height: 190,
    borderRadius: radii.lg,
    overflow: "hidden",
    backgroundColor: colors.paper,
    ...shadows.low,
  },
  text: {
    position: "absolute",
    left: spacing.md,
    right: spacing.md,
    bottom: spacing.md,
    gap: 2,
  },
  name: {
    ...typeScale.titleSmall,
    color: colors.white,
  },
  count: {
    ...typeScale.caption,
    color: colors.white,
    opacity: 0.85,
  },
});
