import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors, radii, spacing, type as typeScale, shadows, shade } from "@/theme";
import type { Recipe, RecipeIngredient } from "@/types";
import { ClockIcon, SavedIcon, ShoppingIcon, CheckIcon, HeartIcon } from "./icons";
import { CookabilityBadge } from "./CookabilityBadge";
import { TemperatureBadge } from "./TemperatureBadge";
import { useCookability } from "@/lib/useCookability";
import { RecipeImage } from "./RecipeImage";
import { useSaved } from "@/context/SavedContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useShopping } from "@/context/ShoppingContext";

interface RecipeCardProps {
  recipe: Recipe;
  haveCount: number;
  totalCount: number;
  /** Ingredients still missing from the pantry — shows an "add to shopping" action when non-empty. */
  missing?: RecipeIngredient[];
  /** Appliances the recipe needs that the user hasn't ticked in Pantry > Equipment. */
  missingEquipment?: string[];
  /** Optional one-line note under the meta row, e.g. "Missing cilantro". */
  note?: string;
  onPress?: () => void;
  width?: number;
  /** Lets the tutorial outline this card. */
  targetRef?: React.Ref<View>;
}

/** Portrait card used in the "You have enough for…" rail and Discover's grid. */
export function RecipeCard({ recipe, haveCount, totalCount, missing = [], missingEquipment = [], note, onPress, width = 216, targetRef }: RecipeCardProps) {
  const { isSaved, toggleSaved } = useSaved();
  const { addMissingFromRecipe } = useShopping();
  const saved = isSaved(recipe.id);
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(recipe.id);
  const cookability = useCookability(recipe);
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
    <Pressable ref={targetRef} onPress={onPress} style={[styles.wrap, { width }]}>
      <View style={[styles.imageWrap, { height: width * 1.15 }]}>
        <RecipeImage uri={recipe.image} title={recipe.title} style={StyleSheet.absoluteFill} />

        <View style={styles.temperatureBadge}>
          <TemperatureBadge temperature={recipe.temperature} />
        </View>

        <Pressable
          onPress={() => toggleSaved(recipe.id)}
          hitSlop={11}
          style={[styles.iconButton, styles.saveButton]}
        >
          <SavedIcon size={14} color={colors.white} strokeWidth={1.8} filled={saved} />
        </Pressable>

        {missing.length > 0 && (
          <Pressable onPress={handleAddMissing} hitSlop={11} style={[styles.iconButton, styles.cartButton]}>
            {justAdded ? (
              <CheckIcon size={13} color={colors.white} strokeWidth={2.2} />
            ) : (
              <ShoppingIcon size={13} color={colors.white} strokeWidth={1.8} />
            )}
          </Pressable>
        )}

        <Pressable
          onPress={() => toggleFavorite(recipe.id)}
          hitSlop={11}
          accessibilityRole="button"
          accessibilityLabel={favorite ? `Remove ${recipe.title} from favourites` : `Add ${recipe.title} to favourites`}
          accessibilityState={{ selected: favorite }}
          style={styles.heartButton}
        >
          <HeartIcon size={14} color={favorite ? colors.tomato : colors.white} strokeWidth={1.8} filled={favorite} />
        </Pressable>

        <View style={styles.badgeOverlay}>
          {cookability ? <CookabilityBadge cookability={cookability} /> : null}
        </View>
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {recipe.title}
      </Text>
      <View style={styles.metaRow}>
        <ClockIcon size={12} color={colors.espressoMuted} strokeWidth={1.6} />
        <Text style={styles.metaText}>{recipe.timeMinutes} min</Text>
        <View style={styles.metaDot} />
        <Text style={styles.metaText}>{recipe.difficulty}</Text>
      </View>
      {note ? (
        <Text style={styles.noteText} numberOfLines={2}>
          {note}
        </Text>
      ) : null}
      {missingEquipment.length > 0 && (
        <Text style={styles.needsText} numberOfLines={2}>
          Needs {missingEquipment.map((t) => t.toLowerCase()).join(", ")}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.sm,
  },
  imageWrap: {
    borderRadius: radii.lg,
    overflow: "hidden",
    backgroundColor: colors.paper,
    ...shadows.low,
  },
  badgeOverlay: {
    position: "absolute",
    left: spacing.sm,
    bottom: spacing.sm,
  },
  iconButton: {
    position: "absolute",
    top: spacing.sm,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: shade(0.55),
    alignItems: "center",
    justifyContent: "center",
  },
  temperatureBadge: {
    position: "absolute",
    top: spacing.sm,
    left: spacing.sm,
  },
  saveButton: {
    right: spacing.sm,
  },
  heartButton: {
    position: "absolute",
    bottom: spacing.sm,
    right: spacing.sm,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: shade(0.55),
    alignItems: "center",
    justifyContent: "center",
  },
  cartButton: {
    right: spacing.sm + 32,
  },
  title: {
    ...typeScale.titleSmall,
    color: colors.espresso,
    fontSize: 16,
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  metaText: {
    ...typeScale.caption,
    color: colors.espressoMuted,
  },
  noteText: {
    ...typeScale.caption,
    color: colors.espressoMuted,
  },
  needsText: {
    ...typeScale.caption,
    color: colors.burntOrange,
  },
  metaDot: {
    width: 2.5,
    height: 2.5,
    borderRadius: 2,
    backgroundColor: colors.espressoFaint,
  },
});
