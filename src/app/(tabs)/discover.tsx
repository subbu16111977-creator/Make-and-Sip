import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, FlatList, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { colors, spacing, radii, type as typeScale, layout } from "@/theme";
import { Chip } from "@/components/Chip";
import { RecipeCard } from "@/components/RecipeCard";
import { SearchIcon } from "@/components/icons";
import { usePantry } from "@/context/PantryContext";
import { useEquipment } from "@/context/EquipmentContext";
import { recipes } from "@/data/recipes";
import { missingEquipment, rankRecipesForDiscover } from "@/lib/pantryMatch";
import type { DietTag, TasteTag } from "@/types";

const TASTES: TasteTag[] = ["Spicy", "Comforting", "Fresh & Light", "Rich & Indulgent", "Tangy", "Smoky", "Sweet", "Herby"];
const DIETS: DietTag[] = ["Vegetarian", "Vegan", "Pescatarian", "Gluten-Free", "Dairy-Free"];

export default function DiscoverScreen() {
  const router = useRouter();
  const { items: pantryItems } = usePantry();
  const { owned: ownedEquipment } = useEquipment();
  const { width: screenWidth } = useWindowDimensions();
  const [query, setQuery] = useState("");
  const [selectedTastes, setSelectedTastes] = useState<TasteTag[]>([]);
  const params = useLocalSearchParams<{ cuisine?: string }>();
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(params.cuisine ?? null);

  // Arriving from a Home cuisine tile (or tapping a different one) sets the filter.
  const [appliedCuisineParam, setAppliedCuisineParam] = useState(params.cuisine);
  if (params.cuisine !== appliedCuisineParam) {
    setAppliedCuisineParam(params.cuisine);
    if (params.cuisine) setSelectedCuisine(params.cuisine);
  }
  const [selectedDiets, setSelectedDiets] = useState<DietTag[]>([]);

  const cuisines = useMemo(() => Array.from(new Set(recipes.map((r) => r.cuisine))).sort(), []);

  function toggleTaste(t: TasteTag) {
    setSelectedTastes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }
  function toggleDiet(d: DietTag) {
    setSelectedDiets((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));
  }

  // Every dish is listed. Gear the user hasn't ticked in Pantry > Equipment
  // is shown on the card as "Needs …" and ranks the dish lower, never hides it.
  const ranked = useMemo(
    () => rankRecipesForDiscover(pantryItems, recipes, selectedTastes, ownedEquipment),
    [pantryItems, selectedTastes, ownedEquipment]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ranked.filter(({ recipe }) => {
      if (q && !recipe.title.toLowerCase().includes(q) && !recipe.description.toLowerCase().includes(q)) {
        return false;
      }
      if (selectedCuisine && recipe.cuisine !== selectedCuisine) return false;
      if (selectedDiets.length > 0 && !selectedDiets.every((d) => recipe.dietTags.includes(d))) return false;
      return true;
    });
  }, [ranked, query, selectedCuisine, selectedDiets]);

  const cardGap = spacing.md;
  const cardWidth = (screenWidth - layout.screenPadding * 2 - cardGap) / 2;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <FlatList
        data={filtered}
        keyExtractor={(m) => m.recipe.id}
        numColumns={2}
        columnWrapperStyle={{ gap: cardGap, paddingHorizontal: layout.screenPadding }}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <Text style={styles.eyebrow}>{recipes.length} {recipes.length === 1 ? "dish" : "dishes"}</Text>
              <Text style={styles.headline}>Discover</Text>
              <Text style={styles.subhead}>Ranked by what&apos;s in your pantry, filtered by what you&apos;re craving.</Text>
            </View>

            <View style={styles.searchWrap}>
              <SearchIcon size={17} color={colors.espressoFaint} strokeWidth={1.6} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search dishes…"
                placeholderTextColor={colors.espressoFaint}
                style={styles.searchInput}
              />
            </View>

            <Text style={styles.filterLabel}>Taste</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipRow}
            >
              {TASTES.map((t) => (
                <Chip key={t} label={t} selected={selectedTastes.includes(t)} onPress={() => toggleTaste(t)} />
              ))}
            </ScrollView>

            <Text style={styles.filterLabel}>Cuisine</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipRow}
            >
              <Chip label="All" selected={selectedCuisine === null} onPress={() => setSelectedCuisine(null)} />
              {cuisines.map((c) => (
                <Chip key={c} label={c} selected={selectedCuisine === c} onPress={() => setSelectedCuisine(c)} />
              ))}
            </ScrollView>

            <Text style={styles.filterLabel}>Diet</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[styles.chipRow, styles.chipRowLast]}
            >
              {DIETS.map((d) => (
                <Chip key={d} label={d} selected={selectedDiets.includes(d)} onPress={() => toggleDiet(d)} />
              ))}
            </ScrollView>
          </View>
        }
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item.recipe}
            haveCount={item.have.length}
            totalCount={item.recipe.ingredients.length}
            missing={item.missing}
            missingEquipment={missingEquipment(ownedEquipment, item.recipe)}
            width={cardWidth}
            onPress={() => router.push({ pathname: "/recipe/[id]", params: { id: item.recipe.id } })}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: spacing.xl }} />}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyTitle}>Nothing matches yet</Text>
            <Text style={styles.emptyBody}>Try clearing a filter or searching something broader.</Text>
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
    maxWidth: 320,
  },
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginHorizontal: layout.screenPadding,
    backgroundColor: colors.paper,
    borderRadius: radii.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
    marginBottom: spacing.lg,
  },
  searchInput: {
    flex: 1,
    ...typeScale.body,
    fontSize: 15,
    color: colors.espresso,
    padding: 0,
  },
  filterLabel: {
    ...typeScale.label,
    color: colors.espressoMuted,
    marginHorizontal: layout.screenPadding,
    marginBottom: spacing.sm,
  },
  chipRow: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: layout.screenPadding,
    paddingBottom: spacing.lg,
  },
  chipRowLast: {
    paddingBottom: spacing["2xl"],
  },
  emptyWrap: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing["3xl"],
    alignItems: "center",
    gap: 6,
  },
  emptyTitle: {
    ...typeScale.title,
    color: colors.espresso,
  },
  emptyBody: {
    ...typeScale.body,
    color: colors.espressoMuted,
    textAlign: "center",
  },
});
