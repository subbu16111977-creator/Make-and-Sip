import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useAppDimensions } from "@/lib/useAppDimensions";
import { LinearGradient } from "expo-linear-gradient";
import { colors, radii, spacing, type as typeScale, layout, shadows, shade } from "@/theme";
import type { EquipmentTag, Recipe, RecipeIngredient } from "@/types";
import { ClockIcon, LeafIcon, SavedIcon, ShoppingIcon, CheckIcon } from "./icons";
import { MatchBadge } from "./MatchBadge";
import { RecipeImage } from "./RecipeImage";
import { useSaved } from "@/context/SavedContext";
import { useShopping } from "@/context/ShoppingContext";

interface RecipeHeroProps {
  recipe: Recipe;
  haveCount: number;
  totalCount: number;
  missing?: RecipeIngredient[];
  usingUpLabel?: string;
  /** Label on the small chip at the top of the card. Defaults to "Make tonight". */
  eyebrow?: string;
  /** Adds a tick before the eyebrow when the dish can be made right now. */
  canMake?: boolean;
  /** Appliances the recipe needs that the user hasn't ticked in Pantry > Equipment. */
  missingEquipment?: EquipmentTag[];
  onPress?: () => void;
}

/** Width of a hero card — shared with the slideshow so slides page exactly one card at a time. */
export function useHeroWidth(): number {
  const { width } = useAppDimensions();
  return Math.min(width - layout.screenPadding * 2, layout.maxContentWidth);
}

/**
 * The Home screen's opening spread — a large, full-bleed photograph
 * with the recipe title set in serif over a gradient, the way a
 * cookbook opens a chapter.
 */
export function RecipeHero({
  recipe,
  haveCount,
  totalCount,
  missing = [],
  usingUpLabel,
  eyebrow = "Make tonight",
  canMake = false,
  missingEquipment = [],
  onPress,
}: RecipeHeroProps) {
  const cardWidth = useHeroWidth();
  const height = Math.round(cardWidth * 1.15);

  const { isSaved, toggleSaved } = useSaved();
  const { addMissingFromRecipe } = useShopping();
  const saved = isSaved(recipe.id);
  const [justAdded, setJustAdded] = useState(false);
  const addedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (addedTimer.current) clearTimeout(addedTimer.current);
    };
  }, []);

  function handleAddMissing() {
    addMissingFromRecipe(recipe.id, recipe.title, missing);
    setJustAdded(true);
    if (addedTimer.current) clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setJustAdded(false), 1400);
  }

  return (
    <View style={[styles.wrap, { width: cardWidth, height }]}>
      <Pressable onPress={onPress} style={StyleSheet.absoluteFill}>
        <RecipeImage uri={recipe.image} title={recipe.title} style={StyleSheet.absoluteFill} transition={200} />
        <LinearGradient
          colors={[shade(0.5), shade(0.05), shade(0.2), shade(0.95)]}
          locations={[0, 0.22, 0.55, 1]}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.topRow}>
          <View style={styles.eyebrowChip}>
            {canMake && <CheckIcon size={11} color={colors.deepOlive} strokeWidth={2.6} />}
            <Text style={styles.eyebrowChipText}>{eyebrow}</Text>
          </View>
          <View style={styles.topRowActions}>
            {missing.length > 0 && (
              <Pressable onPress={handleAddMissing} hitSlop={8} style={styles.iconButton}>
                {justAdded ? (
                  <CheckIcon size={16} color={colors.white} strokeWidth={2.2} />
                ) : (
                  <ShoppingIcon size={16} color={colors.white} strokeWidth={1.7} />
                )}
              </Pressable>
            )}
            <Pressable onPress={() => toggleSaved(recipe.id)} hitSlop={8} style={styles.iconButton}>
              <SavedIcon size={16} color={colors.white} strokeWidth={1.8} filled={saved} />
            </Pressable>
          </View>
        </View>

        <View style={styles.content}>
          {usingUpLabel ? (
            <View style={styles.usingUpRow}>
              <LeafIcon size={14} color={colors.white} strokeWidth={1.6} />
              <Text style={styles.usingUpText}>{usingUpLabel}</Text>
            </View>
          ) : null}

          <Text style={styles.title}>{recipe.title}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {recipe.description}
          </Text>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <ClockIcon size={14} color={colors.white} strokeWidth={1.6} />
              <Text style={styles.metaText}>{recipe.timeMinutes} min</Text>
            </View>
            <View style={styles.metaDot} />
            <Text style={styles.metaText}>{recipe.difficulty}</Text>
            <View style={styles.metaDot} />
            <Text style={styles.metaText}>{recipe.cuisine}</Text>
          </View>

          <View style={styles.badgeRow}>
            <MatchBadge haveCount={haveCount} totalCount={totalCount} tone="dark" />
            {missingEquipment.length > 0 && (
              <Text style={styles.needsText}>Needs {missingEquipment.map((t) => t.toLowerCase()).join(", ")}</Text>
            )}
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: "center",
    borderRadius: radii.xl,
    overflow: "hidden",
    backgroundColor: colors.paper,
    ...shadows.lifted,
  },
  topRow: {
    position: "absolute",
    top: spacing.lg,
    left: spacing.lg,
    right: spacing.lg,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  topRowActions: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: shade(0.5),
    borderWidth: 1,
    borderColor: colors.hairlineStrong,
    alignItems: "center",
    justifyContent: "center",
  },
  eyebrowChip: {
    backgroundColor: "rgba(246, 242, 232, 0.92)",
    paddingVertical: 6,
    paddingHorizontal: spacing.md,
    borderRadius: radii.sm,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  eyebrowChipText: {
    ...typeScale.eyebrow,
    color: colors.burntOrange,
    fontSize: 11,
  },
  content: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: spacing["2xl"],
    gap: 8,
  },
  usingUpRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 2,
  },
  usingUpText: {
    ...typeScale.meta,
    color: colors.white,
    opacity: 0.92,
  },
  title: {
    ...typeScale.display,
    color: colors.white,
    fontSize: 32,
    lineHeight: 36,
  },
  description: {
    ...typeScale.body,
    color: colors.white,
    opacity: 0.88,
    fontSize: 15,
    lineHeight: 21,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginTop: 4,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  metaText: {
    ...typeScale.meta,
    color: colors.white,
    opacity: 0.92,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.white,
    opacity: 0.6,
  },
  badgeRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  needsText: {
    ...typeScale.meta,
    color: colors.white,
    opacity: 0.92,
  },
});
