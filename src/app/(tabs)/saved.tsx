import React, { useMemo } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useAppDimensions } from "@/lib/useAppDimensions";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { colors, spacing, type as typeScale, layout } from "@/theme";
import { RecipeCard } from "@/components/RecipeCard";
import { EmptyState } from "@/components/States";
import { useSaved } from "@/context/SavedContext";
import { useEquipment } from "@/context/EquipmentContext";
import { usePantry } from "@/context/PantryContext";
import { recipes } from "@/data/recipes";
import { matchRecipe } from "@/lib/pantryMatch";

export default function SavedScreen() {
  const router = useRouter();
  const { savedIds } = useSaved();
  const { items: pantryItems } = usePantry();
  const { width: screenWidth } = useAppDimensions();
  const { owned: ownedEquipment } = useEquipment();

  const saved = useMemo(() => {
    const savedRecipes = savedIds
      .map((id) => recipes.find((r) => r.id === id))
      .filter((r): r is (typeof recipes)[number] => Boolean(r));
    return savedRecipes.map((recipe) => matchRecipe(pantryItems, recipe, ownedEquipment));
  }, [savedIds, pantryItems, ownedEquipment]);

  const cardGap = spacing.md;
  const cardWidth = (screenWidth - layout.screenPadding * 2 - cardGap) / 2;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <FlatList
        data={saved}
        keyExtractor={(m) => m.recipe.id}
        numColumns={2}
        columnWrapperStyle={saved.length > 0 ? { gap: cardGap, paddingHorizontal: layout.screenPadding } : undefined}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.eyebrow}>Your collection</Text>
            <Text style={styles.headline}>Saved</Text>
            <Text style={styles.subhead}>
              {saved.length} {saved.length === 1 ? "drink" : "drinks"} saved for later.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item.recipe}
            haveCount={item.have.length}
            totalCount={item.recipe.ingredients.length}
            missing={item.missing}
            width={cardWidth}
            onPress={() => router.push({ pathname: "/recipe/[id]", params: { id: item.recipe.id } })}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: spacing.xl }} />}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <EmptyState
              title="Nothing saved yet"
              body="Tap the bookmark on any drink in Discover or Home to keep it here, ready to make again."
            />
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  listContent: {
    paddingBottom: layout.sectionGap,
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    gap: 4,
  },
  eyebrow: {
    ...typeScale.eyebrow,
    color: colors.burntOrange,
  },
  headline: {
    ...typeScale.display,
    color: colors.espresso,
  },
  subhead: {
    ...typeScale.bodySmall,
    color: colors.espressoMuted,
    marginTop: 2,
  },
  emptyWrap: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: layout.screenPadding,
  },
});
