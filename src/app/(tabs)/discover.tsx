import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, FlatList, Pressable, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { colors, spacing, radii, type as typeScale, layout } from "@/theme";
import { Chip } from "@/components/Chip";
import { RecipeCard } from "@/components/RecipeCard";
import { SearchIcon } from "@/components/icons";
import { usePantry } from "@/context/PantryContext";
import { useEquipment } from "@/context/EquipmentContext";
import { recipes } from "@/data/recipes";
import { isCanMake, missingEquipment, rankRecipesForDiscover } from "@/lib/pantryMatch";
import {
  SORT_OPTIONS,
  VIEW_LABELS,
  isDiscoverView,
  matchesView,
  sortDiscover,
  type DiscoverSort,
  type DiscoverView,
} from "@/lib/discoverView";
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
  const params = useLocalSearchParams<{ cuisine?: string; view?: string; t?: string }>();
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(params.cuisine ?? null);
  const [view, setView] = useState<DiscoverView>(isDiscoverView(params.view) ? params.view : "all");
  const [sort, setSort] = useState<DiscoverSort>("best");

  // Arriving from Home (a cuisine tile or a section's "See all") applies that
  // choice. Home adds a changing `t` so tapping the same link twice still applies.
  const paramKey = `${params.t ?? ""}|${params.cuisine ?? ""}|${params.view ?? ""}`;
  const [appliedParamKey, setAppliedParamKey] = useState(paramKey);
  if (paramKey !== appliedParamKey) {
    setAppliedParamKey(paramKey);
    if (params.cuisine) {
      setSelectedCuisine(params.cuisine);
      setView("all");
    } else if (isDiscoverView(params.view)) {
      setView(params.view);
      setSelectedCuisine(null);
    }
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

  const canMakeCount = useMemo(
    () => ranked.filter((m) => isCanMake(m, ownedEquipment)).length,
    [ranked, ownedEquipment]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const kept = ranked.filter((m) => {
      const { recipe } = m;
      if (!matchesView(m, view, ownedEquipment)) return false;
      if (q && !recipe.title.toLowerCase().includes(q) && !recipe.description.toLowerCase().includes(q)) {
        return false;
      }
      if (selectedCuisine && recipe.cuisine !== selectedCuisine) return false;
      if (selectedDiets.length > 0 && !selectedDiets.every((d) => recipe.dietTags.includes(d))) return false;
      return true;
    });
    return sortDiscover(kept, sort);
  }, [ranked, query, selectedCuisine, selectedDiets, view, sort, ownedEquipment]);

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
              <Text style={styles.eyebrow}>{filtered.length} {filtered.length === 1 ? "dish" : "dishes"}</Text>
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

            <View style={styles.canMakeRow}>
              <Pressable
                onPress={() => setView(view === "can-make" ? "all" : "can-make")}
                style={[styles.canMakeButton, view === "can-make" && styles.canMakeButtonActive]}
              >
                <Text style={[styles.canMakeText, view === "can-make" && styles.canMakeTextActive]}>
                  {view === "can-make" ? "✓ " : ""}What I can make · {canMakeCount}
                </Text>
              </Pressable>
              <Text style={styles.canMakeHint}>Dishes you have every ingredient and tool for</Text>
            </View>

            {view !== "all" && view !== "can-make" && (
              <View style={styles.viewBanner}>
                <Text style={styles.viewBannerText}>
                  Showing <Text style={styles.viewBannerStrong}>{VIEW_LABELS[view]}</Text>
                </Text>
                <Pressable onPress={() => setView("all")} hitSlop={8}>
                  <Text style={styles.viewBannerClear}>Show all dishes</Text>
                </Pressable>
              </View>
            )}

            <Text style={styles.filterLabel}>Sort by</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
              {SORT_OPTIONS.map((o) => (
                <Chip key={o.key} label={o.label} selected={sort === o.key} onPress={() => setSort(o.key)} />
              ))}
            </ScrollView>

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
            <Text style={styles.emptyTitle}>{view === "can-make" || view === "almost-there" ? "Nothing here yet" : "Nothing matches yet"}</Text>
            <Text style={styles.emptyBody}>
              {view === "can-make"
                ? "You don't have every ingredient and tool for any dish yet. Add more to your pantry, tick your equipment, or see what's almost there."
                : view === "almost-there"
                  ? "No dish has an ingredient you own and the tools it needs. Add a few staples to your pantry."
                  : "Try clearing a filter or searching something broader."}
            </Text>
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
  canMakeRow: {
    marginHorizontal: layout.screenPadding,
    marginBottom: spacing.lg,
    gap: 6,
  },
  canMakeButton: {
    alignSelf: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.burntOrange,
    backgroundColor: colors.paper,
  },
  canMakeButtonActive: {
    backgroundColor: colors.burntOrange,
  },
  canMakeText: {
    ...typeScale.label,
    color: colors.burntOrange,
  },
  canMakeTextActive: {
    color: colors.cream,
  },
  canMakeHint: {
    ...typeScale.caption,
    color: colors.espressoMuted,
  },
  viewBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: layout.screenPadding,
    marginBottom: spacing.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.md,
    backgroundColor: colors.paper,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
  },
  viewBannerText: {
    ...typeScale.bodySmall,
    color: colors.espressoMuted,
  },
  viewBannerStrong: {
    color: colors.espresso,
    fontWeight: "600",
  },
  viewBannerClear: {
    ...typeScale.label,
    color: colors.burntOrange,
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
