import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { spacing, layout } from "@/theme";
import type { EquipmentTag } from "@/types";
import { RecipeCard } from "./RecipeCard";
import { missingEquipment, type RecipeMatch } from "@/lib/pantryMatch";
import { resolveIngredientById } from "@/lib/ingredientNormalize";

interface RecipeRailProps {
  matches: RecipeMatch[];
  ownedEquipment: EquipmentTag[];
  /** Show a "Missing …" line under each card (used by "Almost there"). */
  showMissingNote?: boolean;
  onOpen: (recipeId: string) => void;
}

function missingNote(match: RecipeMatch): string {
  const required = match.missing.filter((i) => !i.optional);
  if (required.length > 2) return `Missing ${required.length} ingredients`;
  const names = required.map((i) => resolveIngredientById(i.pantryId)?.displayName ?? i.label);
  return `Missing ${names.join(" + ")}`;
}

/** A horizontally scrolling, virtualized row of recipe cards — fine even with hundreds of dishes. */
export function RecipeRail({ matches, ownedEquipment, showMissingNote, onOpen }: RecipeRailProps) {
  return (
    <FlatList
      horizontal
      data={matches}
      keyExtractor={(m) => m.recipe.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      initialNumToRender={4}
      windowSize={5}
      renderItem={({ item }) => (
        <RecipeCard
          recipe={item.recipe}
          haveCount={item.have.length}
          totalCount={item.recipe.ingredients.length}
          missing={item.missing}
          missingEquipment={missingEquipment(ownedEquipment, item.recipe)}
          note={showMissingNote ? missingNote(item) : undefined}
          onPress={() => onOpen(item.recipe.id)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: layout.screenPadding,
    gap: spacing.md,
  },
});
