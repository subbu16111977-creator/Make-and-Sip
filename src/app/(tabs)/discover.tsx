import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, FlatList, Pressable } from "react-native";
import { useAppDimensions } from "@/lib/useAppDimensions";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { colors, spacing, radii, type as typeScale, layout } from "@/theme";
import { Chip } from "@/components/Chip";
import { RecipeCard } from "@/components/RecipeCard";
import { useProfile } from "@/context/ProfileContext";
import { hasPreferences, preferencesFrom, sortByForYou } from "@/lib/forYou";
import { useTutorialTarget } from "@/lib/tutorialTargets";
import { SearchIcon } from "@/components/icons";
import { RefreshButton } from "@/components/RefreshButton";
import { usePantry } from "@/context/PantryContext";
import { useEquipment } from "@/context/EquipmentContext";
import { recipes } from "@/data/recipes";
import { missingEquipment, rankRecipesForDiscover } from "@/lib/pantryMatch";
import { SORT_OPTIONS, sortDiscover, type DiscoverSort } from "@/lib/discoverView";
import type { DietTag, TasteTag } from "@/types";

/** New value every time the app is opened (module load), so Best for you varies between sessions. */
const SESSION_SEED = Math.floor(Math.random() * 2 ** 31);

const TASTES: TasteTag[] = ["Spicy", "Comforting", "Fresh & Light", "Rich & Indulgent", "Tangy", "Smoky", "Sweet", "Herby"];
const DIETS: DietTag[] = ["Vegetarian", "Vegan", "Pescatarian", "Gluten-Free", "Dairy-Free"];

export default function DiscoverScreen() {
  const router = useRouter();
  const { items: pantryItems } = usePantry();
  const { owned: ownedEquipment } = useEquipment();
  const { profile } = useProfile();
  const preferences = useMemo(() => preferencesFrom(profile), [profile]);
  const { width: screenWidth } = useAppDimensions();
  const [query, setQuery] = useState("");
  const [selectedTastes, setSelectedTastes] = useState<TasteTag[]>([]);
  const params = useLocalSearchParams<{ cuisine?: string; t?: string }>();
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(params.cuisine ?? null);
  const [sort, setSort] = useState<DiscoverSort>("best");

  // Arriving from a Home cuisine tile applies that cuisine. Home adds a changing `t`
  // so tapping the same tile again still re-applies it.
  const paramKey = `${params.t ?? ""}|${params.cuisine ?? ""}`;
  const [appliedParamKey, setAppliedParamKey] = useState(paramKey);
  if (paramKey !== appliedParamKey) {
    setAppliedParamKey(paramKey);
    if (params.cuisine) setSelectedCuisine(params.cuisine);
  }
  const [selectedDiets, setSelectedDiets] = useState<DietTag[]>([]);

  const cuisines = useMemo(() => Array.from(new Set(recipes.map((r) => r.cuisine))).sort(), []);

  // Refresh re-ranks every dish against the current pantry and equipment (keeps your filters).
  const [refreshTick, setRefreshTick] = useState(0);
  const [pulling, setPulling] = useState(false);
  const refresh = () => setRefreshTick((t) => t + 1);

  function toggleTaste(t: TasteTag) {
    setSelectedTastes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }
  function toggleDiet(d: DietTag) {
    setSelectedDiets((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));
  }

  // Every dish is listed. Gear the user hasn't ticked in Pantry > Equipment
  // is shown on the card as "Needs …" and ranks the dish lower, never hides it.
  const ranked = useMemo(
    () => {
      void refreshTick; // re-rank on demand when the Refresh button bumps this
      return rankRecipesForDiscover(pantryItems, recipes, selectedTastes, ownedEquipment);
    },
    [pantryItems, selectedTastes, ownedEquipment, refreshTick]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const kept = ranked.filter((m) => {
      const { recipe } = m;
      if (q && !recipe.title.toLowerCase().includes(q) && !recipe.description.toLowerCase().includes(q)) {
        return false;
      }
      if (selectedCuisine && recipe.cuisine !== selectedCuisine) return false;
      if (selectedDiets.length > 0 && !selectedDiets.every((d) => recipe.dietTags.includes(d))) return false;
      return true;
    });
    // Best for you reshuffles equally good matches each time the app is opened or Refresh is pressed.
    return sort === "for-you" ? sortByForYou(kept, preferences, { seed: SESSION_SEED + refreshTick }) : sortDiscover(kept, sort);
  }, [ranked, query, selectedCuisine, selectedDiets, sort, preferences, refreshTick]);

  const firstCardTarget = useTutorialTarget("discover-first-card");
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
        refreshing={pulling}
        onRefresh={() => {
          setPulling(true);
          refresh();
          setTimeout(() => setPulling(false), 600);
        }}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <Text style={styles.eyebrow}>{filtered.length} {filtered.length === 1 ? "dish" : "dishes"}</Text>
              <Text style={styles.headline}>Discover</Text>
              <Text style={styles.subhead}>Ranked by what&apos;s in your pantry, filtered by what you&apos;re craving.</Text>
              <View style={styles.refreshRow}>
                <RefreshButton onPress={refresh} />
              </View>
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

            <Text style={styles.filterLabel}>Sort by</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
              {SORT_OPTIONS.map((o) => (
                <Chip key={o.key} label={o.label} selected={sort === o.key} onPress={() => setSort(o.key)} />
              ))}
            </ScrollView>

            {sort === "for-you" && !hasPreferences(preferences) ? (
              <Pressable onPress={() => router.push("/profile")} style={styles.forYouNote} accessibilityRole="button" accessibilityLabel="Choose your cuisines and flavours in Profile">
                <Text style={styles.forYouNoteText}>
                  Pick the cuisines and flavours you enjoy in Profile and Best for you will put your favourites first. Tap to choose.
                </Text>
              </Pressable>
            ) : null}

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
        renderItem={({ item, index }) => (
          <RecipeCard
            targetRef={index === 0 ? firstCardTarget : undefined}
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
  forYouNote: {
    marginHorizontal: layout.screenPadding,
    marginTop: spacing.sm,
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.paper,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
  },
  forYouNoteText: { ...typeScale.bodySmall, color: colors.espressoMuted },
  safeArea: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  listContent: {
    paddingBottom: layout.sectionGap,
  },
  refreshRow: {
    marginTop: spacing.sm,
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
