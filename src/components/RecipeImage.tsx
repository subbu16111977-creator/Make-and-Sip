import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image, type ImageContentFit } from "expo-image";
import { colors, radii, spacing, type as typeScale } from "@/theme";
import { AlertPlateIcon } from "./icons";
import { LOCAL_IMAGE_PREFIX, localRecipeImages } from "@/data/localRecipeImages";

interface RecipeImageProps {
  /** Recipe image URL. An empty string (or "needs_review"/"missing" imageStatus) shows the neutral fallback instead. */
  uri?: string | null;
  /** Recipe title, shown under the fallback so the screen never looks broken or unlabeled. */
  title: string;
  style?: any;
  contentFit?: ImageContentFit;
  transition?: number;
}

/**
 * Renders a recipe photo, or — when no verified photo is available —
 * a neutral "Photo coming soon" placeholder that still names the dish.
 *
 * We intentionally never fall back to a generic food photo or another
 * recipe's image: a wrong picture is worse than no picture. See
 * /audit/recipe-image-audit.json for which recipes currently render
 * this fallback and why their previous photo was rejected.
 */
export function RecipeImage({ uri, title, style, contentFit = "cover", transition = 150 }: RecipeImageProps) {
  if (!uri) {
    return (
      <View style={[style, styles.fallback]}>
        <AlertPlateIcon size={32} color={colors.espressoFaint} strokeWidth={1.3} />
        <Text style={styles.fallbackLabel}>Photo coming soon</Text>
        <Text style={styles.fallbackTitle} numberOfLines={2}>
          {title}
        </Text>
      </View>
    );
  }

  // "local:<id>" points at a photo bundled in assets/recipes/.
  const localSource = uri.startsWith(LOCAL_IMAGE_PREFIX) ? localRecipeImages[uri.slice(LOCAL_IMAGE_PREFIX.length)] : undefined;
  if (uri.startsWith(LOCAL_IMAGE_PREFIX) && localSource === undefined) return <RecipeImage title={title} style={style} />;

  return <Image source={localSource ?? { uri }} style={style} contentFit={contentFit} transition={transition} />;
}

const styles = StyleSheet.create({
  fallback: {
    backgroundColor: colors.parchment,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    padding: spacing.md,
  },
  fallbackLabel: {
    ...typeScale.caption,
    color: colors.espressoFaint,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  fallbackTitle: {
    ...typeScale.titleSmall,
    color: colors.espressoMuted,
    textAlign: "center",
    fontSize: 14,
  },
});
