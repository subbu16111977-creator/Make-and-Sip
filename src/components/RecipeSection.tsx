import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useAppDimensions } from "@/lib/useAppDimensions";
import { colors, spacing, layout, radii, type as typeScale } from "@/theme";
import type { EquipmentTag } from "@/types";
import { SectionHeader } from "./SectionHeader";
import { RecipeRail, missingNote } from "./RecipeRail";
import { RecipeCard } from "./RecipeCard";
import { missingEquipment, type RecipeMatch } from "@/lib/pantryMatch";

const GAP = spacing.md;
const MIN_CARD = 190;
/** Width of a card in the horizontal row (RecipeCard's default). */
const RAIL_CARD = 216;

interface RecipeSectionProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  matches: RecipeMatch[];
  ownedEquipment: EquipmentTag[];
  showMissingNote?: boolean;
  /** Label of the button that opens the full list. Defaults to "See all". */
  seeAllLabel?: string;
  /** Hide the button when every dish already fits in the row, so there is nothing more to see. */
  hideActionWhenFits?: boolean;
  /** When true the horizontal row becomes a vertical grid of every dish, right here on the page. */
  expanded: boolean;
  /** How many dishes of the grid are rendered so far; the parent raises it as the user scrolls. */
  visibleCount: number;
  onToggle: () => void;
  onOpen: (recipeId: string) => void;
  /** Reports the expanded list's top (y within this section) and height, so the parent knows when to load more. */
  onGridLayout: (y: number, height: number) => void;
}

/** One Home section: a horizontal row by default, and the full list in place after "See all". */
export function RecipeSection({
  eyebrow,
  title,
  subtitle,
  matches,
  ownedEquipment,
  showMissingNote,
  seeAllLabel = "See all",
  hideActionWhenFits,
  expanded,
  visibleCount,
  onToggle,
  onOpen,
  onGridLayout,
}: RecipeSectionProps) {
  const { width } = useAppDimensions();
  const contentWidth = Math.min(width, layout.maxContentWidth) - layout.screenPadding * 2;
  const columns = Math.max(2, Math.floor((contentWidth + GAP) / (MIN_CARD + GAP)));
  const cardWidth = (contentWidth - GAP * (columns - 1)) / columns;
  const fitInRow = Math.max(1, Math.floor((contentWidth + GAP) / (RAIL_CARD + GAP)));
  const showAction = expanded || !hideActionWhenFits || matches.length > fitInRow;

  return (
    <View>
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        actionLabel={expanded ? "Show less" : seeAllLabel}
        onPressAction={showAction ? onToggle : undefined}
      />
      {expanded ? (
        <View onLayout={(e) => onGridLayout(e.nativeEvent.layout.y, e.nativeEvent.layout.height)}>
          <View style={styles.grid}>
            {matches.slice(0, visibleCount).map((m) => (
              <RecipeCard
                key={m.recipe.id}
                recipe={m.recipe}
                haveCount={m.have.length}
                totalCount={m.recipe.ingredients.length}
                missing={m.missing}
                missingEquipment={missingEquipment(ownedEquipment, m.recipe)}
                note={showMissingNote ? missingNote(m) : undefined}
                width={cardWidth}
                onPress={() => onOpen(m.recipe.id)}
              />
            ))}
          </View>
          <Pressable onPress={onToggle} style={styles.lessButton}>
            <Text style={styles.lessText}>
              {visibleCount < matches.length ? `Showing ${visibleCount} of ${matches.length} · ` : `All ${matches.length} shown · `}
              Show less
            </Text>
          </Pressable>
        </View>
      ) : (
        <RecipeRail matches={matches} ownedEquipment={ownedEquipment} showMissingNote={showMissingNote} onOpen={onOpen} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GAP,
    rowGap: spacing.xl,
    paddingHorizontal: layout.screenPadding,
  },
  lessButton: {
    alignSelf: "center",
    marginTop: spacing.xl,
    paddingVertical: 10,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.paper,
  },
  lessText: {
    ...typeScale.label,
    color: colors.espressoMuted,
  },
});
