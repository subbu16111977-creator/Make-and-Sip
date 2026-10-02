import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, type as typeScale, layout } from "@/theme";
import { Chip } from "./Chip";
import { usePantry } from "@/context/PantryContext";
import { STARTER_STAPLES } from "@/data/starterStaples";
import { normalizeIngredient } from "@/lib/ingredientNormalize";

/** One-tap everyday basics for someone starting with an empty pantry. */
export function StarterStaples() {
  const { items, addItem } = usePantry();
  const [justAdded, setJustAdded] = useState<string[]>([]);

  const have = new Set(items.map((i) => i.ingredientId));

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Start with the basics</Text>
      <Text style={styles.body}>Tap what you have at home — you can fine-tune amounts later.</Text>
      <View style={styles.chips}>
        {STARTER_STAPLES.map((staple) => {
          const id = normalizeIngredient(staple.name).ingredientId;
          const added = justAdded.includes(staple.name) || (id !== null && have.has(id));
          return (
            <Chip
              key={staple.name}
              label={added ? `${staple.name} ✓` : staple.name}
              selected={added}
              onPress={() => {
                if (added) return;
                addItem(staple);
                setJustAdded((prev) => [...prev, staple.name]);
              }}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.xl,
    gap: spacing.sm,
  },
  title: {
    ...typeScale.titleSmall,
    color: colors.espresso,
  },
  body: {
    ...typeScale.bodySmall,
    color: colors.espressoMuted,
    marginBottom: spacing.sm,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
});
