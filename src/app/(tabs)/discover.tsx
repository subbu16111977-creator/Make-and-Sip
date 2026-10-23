import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, FlatList, Pressable } from "react-native";
import { useAppDimensions } from "@/lib/useAppDimensions";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { colors, spacing, radii, type as typeScale, layout } from "@/theme";
import { Chip } from "@/components/Chip";
import { RecipeCard } from "@/components/RecipeCard";
import { useProfile } from "@/context/ProfileContext";
import { CUISINE_OPTIONS, CUISINE_OTHER } from "@/lib/profile";
import { hasPreferences, preferencesFrom, sortByForYou } from "@/lib/forYou";
import { registerScrollBy, useTutorialTarget } from "@/lib/tutorialTargets";
import { SearchIcon } from "@/components/icons";
import { RefreshButton } from "@/components/RefreshButton";
import { usePantry } from "@/context/PantryContext";
import { useEquipment } from "@/context/EquipmentContext";
import { recipes } from "@/data/recipes";
import { missingEquipment, rankRecipesForDiscover } from "@/lib/pantryMatch";
import { computeCookability } from "@/lib/cookability";
import { SORT_OPTIONS, sortDiscover, type DiscoverSort } from "@/lib/discoverView";
import type { DietTag, TasteTag } from "@/types";

/** New value every time the app is opened (module load), so Best for you varies between sessions. */
const SESSION_SEED = Math.floor(Math.random() * 2 ** 31);

const TASTES: TasteTag[] = ["Sweet", "Fruity", "Creamy", "Refreshing", "Tangy", "Bitter", "Spicy", "Herbal", "Rich"];
const DIETS: DietTag[] = ["Vegan", "Dairy-Free", "Caffeine-Free", "Low Sugar", "Gluten-Free"];

export default function DiscoverScreen() {
  const router = useRouter();
  const { items: pantryItems } = usePantry();
  const { owned: ownedEquipment } = useEquipment();
  const { profile, startReplay } = useProfile();
  const listRef = useRef<FlatList>(null);
  const scrollY = useRef(0);
  const headerHeight = useRef(0);
  // Lets the tutorial bring the first drink into view: the list scrolls past the search and filters, which are tall, so
  // the first row sits just below the tutorial card. (Registered whenever the tab is in front, since another screen may
  // have taken the hook meanwhile.)
  useFocusEffect(useCallback(() => registerScrollBy(() => listRef.current?.scrollToOffset({ offset: Math.max(0, headerHeight.current - 300), animated: true })), []));
  const preferences = useMemo(() => preferencesFrom(profile), [profile]);
  const { width: screenWidth } = useAppDimensions();
  const [query, setQuery] = useState("");
  const [selectedTastes, setSelectedTastes] = useState<TasteTag[]>([]);
  const params = useLocalSearchParams<{ cuisine?: string; t?: string }>();
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(params.cuisine ?? null);
  const [sort, setSort] = useState<DiscoverSort>("best");

  // Arriving from a Home drink-type tile applies that type. Home adds a changing `t`
  // so tapping the same tile again still re-applies it.
  const paramKey = `${params.t ?? ""}|${params.cuisine ?? ""}`;
  const [appliedParamKey, setAppliedParamKey] = useState(paramKey);
  if (paramKey !== appliedParamKey) {
    setAppliedParamKey(paramKey);
    if (params.cuisine) setSelectedCuisine(params.cuisine);
  }
  const [selectedTemperature, setSelectedTemperature] = useState<"hot" | "cold" | null>(null);
  const [selectedDiets, setSelectedDiets] = useState<DietTag[]>([]);

  // The drink types are fixed (they are the same ones the profile asks about), so the filter looks the same whatever is in the library.
  const cuisines = CUISINE_OPTIONS.filter((c) => c !== CUISINE_OTHER);

  // Refresh re-ranks every drink against the current pantry and equipment (keeps your filters).
  const [refreshTick, setRefreshTick] = useState(0);
  const [pulling, setPulling] = useState(false);
  const refresh = () => setRefreshTick((t) => t + 1);

  function toggleTaste(t: TasteTag) {
    setSelectedTastes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }
  function toggleDiet(d: DietTag) {
    setSelectedDiets((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));
  }

  // Every drink is listed. Gear the user hasn't ticked in Pantry > Equipment
  // is shown on the card as "Needs …" and ranks the drink lower, never hides it.
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
      if (selectedTastes.length > 0 && !recipe.tasteTags.some((t) => selectedTastes.includes(t))) return false;
      if (selectedTemperature && recipe.temperature !== selectedTemperature) return false;
      if (selectedDiets.length > 0 && !selectedDiets.every((d) => recipe.dietTags.includes(d))) return false;
      return true;
    });
    // Best for you reshuffles equally good matches each time the app is opened or Refresh is pressed.
    if (sort === "for-you") return sortByForYou(kept, preferences, { seed: SESSION_SEED + refreshTick });
    if (sort === "cookable") {
      // Highest Cookability first; equal scores keep the pantry-match order.
      return kept
        .map((m, i) => ({ m, i, score: computeCookability(m.recipe, pantryItems, ownedEquipment) }))
        .sort((a, b) => b.score.percent - a.score.percent || Number(b.score.category === "ready") - Number(a.score.category === "ready") || a.i - b.i)
        .map((x) => x.m);
    }
    return sortDiscover(kept, sort);
  }, [ranked, query, selectedCuisine, selectedTemperature, selectedTastes, selectedDiets, sort, preferences, refreshTick, pantryItems, ownedEquipment]);

  const firstCardTarget = useTutorialTarget("discover-first-card");
  const cardGap = spacing.md;
  const cardWidth = (screenWidth - layout.screenPadding * 2 - cardGap) / 2;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <FlatList
        ref={listRef}
        scrollEventThrottle={64}
        onScroll={(e) => {
          scrollY.current = e.nativeEvent.contentOffset.y;
        }}
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
          <View onLayout={(e) => (headerHeight.current = e.nativeEvent.layout.height)}>
            <View style={styles.header}>
              <Text style={styles.eyebrow}>{filtered.length} {filtered.length === 1 ? "drink" : "drinks"}</Text>
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
                placeholder="Search drinks…"
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
              <Pressable onPress={() => startReplay("intro")} style={styles.forYouNote} accessibilityRole="button" accessibilityLabel="Answer the drink and flavour questions">
                <Text style={styles.forYouNoteText}>
                  Tell us the drinks and flavours you enjoy and Best for you will put your favourites first. Tap to answer the questions again.
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

            <Text style={styles.filterLabel}>Type</Text>
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

            <Text style={styles.filterLabel}>Hot or iced</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
              <Chip label="All" selected={selectedTemperature === null} onPress={() => setSelectedTemperature(null)} />
              <Chip label="Hot" selected={selectedTemperature === "hot"} onPress={() => setSelectedTemperature("hot")} />
              <Chip label="Iced" selected={selectedTemperature === "cold"} onPress={() => setSelectedTemperature("cold")} />
            </ScrollView>

            <Text style={styles.filterLabel}>Dietary</Text>
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
