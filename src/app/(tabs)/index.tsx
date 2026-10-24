import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, RefreshControl, type NativeScrollEvent, type NativeSyntheticEvent } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { RecipeSection } from "@/components/RecipeSection";
import { ExpiringIngredientCard } from "@/components/ExpiringIngredientCard";
import { HomeLoadingState, EmptyState } from "@/components/States";
import { StarterStaples } from "@/components/StarterStaples";
import { CuisineTile } from "@/components/CuisineTile";
import { colors, spacing, type as typeScale, layout } from "@/theme";
import { recipes } from "@/data/recipes";
import { RefreshButton } from "@/components/RefreshButton";
import { usePantry } from "@/context/PantryContext";
import { useEquipment } from "@/context/EquipmentContext";
import { useShopping } from "@/context/ShoppingContext";
import { EQUIPMENT_TAGS } from "@/lib/persistedShapes";
import {
  bestEquipmentUnlock,
  cuisineSummaries,
  getExpiringSoon,
  isQuickRecipe,
  matchRecipe,
  pickAlmostThere,
  pickQuickRecipes,
  pickReadyToCook,
  pickSlideshowMatches,
  QUICK_MINUTES,
  rankRecipesForDiscover,
} from "@/lib/pantryMatch";

import { ChevronRightIcon } from "@/components/icons";
import { useProfile } from "@/context/ProfileContext";
import { HOME_SECTION_LIMIT, bestForYou, flavorsFromOtherCuisines, hasPreferences, newFlavorsInLikedCuisines, preferencesFrom } from "@/lib/forYou";

type SectionKey = "can-make" | "almost-there" | "quick" | "for-you" | "other-cuisines" | "new-flavors";

/** New random order every time the app is opened (module load), stable while the app stays open. */
const SESSION_SEED = Math.floor(Math.random() * 2 ** 31);

function useGreeting() {
  return useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  }, []);
}

/**
 * Home is keyed on a counter so "Refresh" remounts it: every list is recomputed from the
 * current pantry and equipment and the featured picks are reshuffled with a new seed.
 */
export default function HomeScreen() {
  const [run, setRun] = useState({ key: 0, seed: SESSION_SEED });
  const onRefresh = () => setRun((r) => ({ key: r.key + 1, seed: Math.floor(Math.random() * 2 ** 31) }));
  return <HomeContent key={run.key} seed={run.seed} onRefresh={onRefresh} />;
}

function HomeContent({ seed, onRefresh }: { seed: number; onRefresh: () => void }) {
  const router = useRouter();
  const greeting = useGreeting();
  const { items: pantryItems } = usePantry();
  const { owned: ownedEquipment } = useEquipment();
  const { profile, startReplay } = useProfile();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const { items: shoppingItems } = useShopping();

  const expiringSoon = useMemo(() => getExpiringSoon(pantryItems, 4), [pantryItems]);
  const slideshow = useMemo(() => pickSlideshowMatches(pantryItems, recipes, seed), [pantryItems, seed]);

  // The rails below only recommend what is makeable with the gear you own.
  // Every drink, including ones needing gear you lack, remains in Discover.
  const canMake = useMemo(() => pickReadyToCook(pantryItems, recipes, ownedEquipment), [pantryItems, ownedEquipment]);
  const almostThere = useMemo(() => pickAlmostThere(pantryItems, recipes, ownedEquipment), [pantryItems, ownedEquipment]);
  const quickAll = useMemo(
    () =>
      pickQuickRecipes(
        recipes.filter((r) => isQuickRecipe(r, ownedEquipment)),
        seed,
        QUICK_MINUTES,
        recipes.length
      ).map((r) => matchRecipe(pantryItems, r, ownedEquipment)),
    [pantryItems, ownedEquipment, seed]
  );

  // Picked from the cuisines and flavours chosen in the profile. These look at every dish (gear
  // the user lacks is shown on the card as "Needs …"), ranked the same way Discover ranks them.
  const preferences = useMemo(() => preferencesFrom(profile), [profile]);
  const allRanked = useMemo(() => rankRecipesForDiscover(pantryItems, recipes, [], ownedEquipment), [pantryItems, ownedEquipment]);
  // Each section shows at most 40 dishes. The seed changes every time the app is opened and on
  // Refresh, so equally good matches reshuffle and some dishes are different each time.
  const variety = useMemo(() => ({ seed, limit: HOME_SECTION_LIMIT }), [seed]);
  const forYou = useMemo(() => bestForYou(allRanked, preferences, variety), [allRanked, preferences, variety]);
  const otherCuisines = useMemo(() => flavorsFromOtherCuisines(allRanked, preferences, variety), [allRanked, preferences, variety]);
  const newFlavors = useMemo(() => newFlavorsInLikedCuisines(allRanked, preferences, variety), [allRanked, preferences, variety]);

  const openRecipe = useCallback((id: string) => router.push({ pathname: "/recipe/[id]", params: { id } }), [router]);

  // "See all" opens the section's full list right here on the page. One section is open at a
  // time; its dishes load in pages as the user scrolls down.
  const PAGE = 12;
  const [expanded, setExpanded] = useState<SectionKey | null>(null);
  const [visible, setVisible] = useState(PAGE);
  const scrollRef = useRef<ScrollView>(null);
  const sectionY = useRef<Record<string, number>>({});
  const gridBox = useRef({ y: 0, height: 0 });

  const lists: Record<SectionKey, number> = {
    "can-make": canMake.length,
    "almost-there": almostThere.length,
    quick: quickAll.length,
    "for-you": forYou.length,
    "other-cuisines": otherCuisines.length,
    "new-flavors": newFlavors.length,
  };

  const toggleSection = (key: SectionKey) => {
    const opening = expanded !== key;
    setExpanded(opening ? key : null);
    setVisible(PAGE);
    // Opening brings the section's heading to the top; collapsing returns to it, so a long
    // scroll through the full list doesn't strand you far below.
    setTimeout(() => scrollRef.current?.scrollTo({ y: Math.max(0, (sectionY.current[key] ?? 0) - 12), animated: opening }), 60);
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!expanded) return;
    const { contentOffset, layoutMeasurement } = e.nativeEvent;
    const viewportBottom = contentOffset.y + layoutMeasurement.height;
    const gridBottom = (sectionY.current[expanded] ?? 0) + gridBox.current.y + gridBox.current.height;
    if (viewportBottom > gridBottom - 600) {
      setVisible((v) => (v < lists[expanded] ? Math.min(lists[expanded], v + PAGE) : v));
    }
  };

  const unlock = useMemo(() => bestEquipmentUnlock(ownedEquipment, [...EQUIPMENT_TAGS], recipes), [ownedEquipment]);
  const cuisines = useMemo(() => cuisineSummaries(recipes), []);
  const toBuy = useMemo(() => shoppingItems.filter((i) => !i.checked).length, [shoppingItems]);

  const prefSection = (key: SectionKey, eyebrow: string, title: string, subtitle: string, matches: typeof forYou) =>
    matches.length > 0 ? (
      <View key={key} style={styles.section} onLayout={(e) => (sectionY.current[key] = e.nativeEvent.layout.y)}>
        <RecipeSection
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          matches={matches}
          ownedEquipment={ownedEquipment}
          expanded={expanded === key}
          visibleCount={visible}
          onToggle={() => toggleSection(key)}
          onOpen={openRecipe}
          onGridLayout={(y, height) => (gridBox.current = { y, height })}
        />
      </View>
    ) : null;

  const bestForYouSection = prefSection(
    "for-you",
    "Picked for you",
    "Best for you",
    `${forYou.length} ${forYou.length === 1 ? "drink" : "drinks"} chosen from the drinks and flavours you picked. A fresh mix each time.`,
    forYou
  );
  const otherCuisinesSection = prefSection(
    "other-cuisines",
    "Same flavours, new drinks",
    "Flavours from other kinds of drink you may like",
    "Drinks with the flavours you enjoy, from types you haven't picked.",
    otherCuisines
  );
  const newFlavorsSection = prefSection(
    "new-flavors",
    "Branch out",
    "New flavours from drinks you love",
    "Drinks from your favourite types with flavours you haven't picked.",
    newFlavors
  );
  // Until the user has answered the drink-type and flavour questions there is nothing to base these on.
  const preferenceNudge = !hasPreferences(preferences) ? (
    <View style={styles.pantrySummaryWrap}>
      <Pressable style={styles.pantrySummary} onPress={() => startReplay("intro")} accessibilityRole="button" accessibilityLabel="Answer the drink and flavour questions">
        <View style={styles.pantrySummaryText}>
          <Text style={styles.pantrySummaryTitle}>Get drinks picked for you</Text>
          <Text style={styles.pantrySummaryBody}>Tell us the drinks and flavours you enjoy and we’ll recommend drinks to match.</Text>
        </View>
        <ChevronRightIcon size={18} color={colors.espresso} strokeWidth={1.6} />
      </Pressable>
    </View>
  ) : null;

  if (loading) {
    return (
      <Screen>
        <HomeLoadingState />
      </Screen>
    );
  }

  if (pantryItems.length === 0) {
    return (
      <Screen contentContainerStyle={styles.emptyWrap} scrollRef={scrollRef} onScroll={onScroll} scrollEventThrottle={64}>
        <EmptyState
          title="Your pantry's empty"
          body="Add a few ingredients and we'll start suggesting what to make with what you already have."
          actionLabel="Add your first ingredient"
          onPressAction={() => router.push("/pantry")}
        />
        <StarterStaples />
        {preferenceNudge}
        {bestForYouSection}
        {otherCuisinesSection}
        {newFlavorsSection}
      </Screen>
    );
  }

  return (
    <Screen
      scrollRef={scrollRef}
      onScroll={onScroll}
      scrollEventThrottle={64}
      refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>{profile.displayName ? `${greeting}, ${profile.displayName}.` : `${greeting}.`}</Text>
        <Text style={styles.headline}>What are we sipping today?</Text>
        <Pressable onPress={() => router.push("/pantry")} hitSlop={6}>
          <Text style={styles.pantryStatus}>
            {pantryItems.length} {pantryItems.length === 1 ? "ingredient" : "ingredients"} on hand · {expiringSoon.length} to use up soon
          </Text>
        </Pressable>
        <View style={styles.refreshRow}>
          <RefreshButton onPress={onRefresh} />
        </View>
      </View>

      <View style={styles.heroSection}>
        {slideshow.length > 0 ? (
          <HeroSlideshow
            matches={slideshow}
            ownedEquipment={ownedEquipment}
            expiring={expiringSoon}
            onOpen={(id) => router.push({ pathname: "/recipe/[id]", params: { id } })}
          />
        ) : (
          <Pressable style={styles.noMatchCard} onPress={() => router.push("/discover")}>
            <Text style={styles.noMatchTitle}>Nothing in the app uses your ingredients yet</Text>
            <Text style={styles.noMatchBody}>Add a few staples to your pantry, or browse every drink in Discover.</Text>
          </Pressable>
        )}
      </View>

      {preferenceNudge}
      {bestForYouSection}

      {expiringSoon.length > 0 && (
        <View style={styles.section}>
          <SectionHeader
            eyebrow="Reduce waste"
            title="Use these first"
            subtitle="Soonest to turn, from your fridge and counter."
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.railContent}
          >
            {expiringSoon.slice(0, 8).map((item) => (
              <ExpiringIngredientCard key={item.id} item={item} />
            ))}
          </ScrollView>
        </View>
      )}

      {canMake.length > 0 && (
        <View style={styles.section} onLayout={(e) => (sectionY.current["can-make"] = e.nativeEvent.layout.y)}>
          <RecipeSection
            eyebrow="Ready when you are"
            title="What you can make"
            subtitle={`${canMake.length} ${canMake.length === 1 ? "drink" : "drinks"} with every ingredient and every tool you need.`}
            matches={canMake}
            ownedEquipment={ownedEquipment}
            expanded={expanded === "can-make"}
            visibleCount={visible}
            onToggle={() => toggleSection("can-make")}
            onOpen={openRecipe}
            onGridLayout={(y, height) => (gridBox.current = { y, height })}
          />
        </View>
      )}

      {almostThere.length > 0 && (
        <View style={styles.section} onLayout={(e) => (sectionY.current["almost-there"] = e.nativeEvent.layout.y)}>
          <RecipeSection
            eyebrow="Just a few more"
            title="Almost there"
            subtitle="Just a few ingredients short, with all the tools you need. Tap the bag to add what's missing to Shopping."
            matches={almostThere}
            ownedEquipment={ownedEquipment}
            showMissingNote
            expanded={expanded === "almost-there"}
            visibleCount={visible}
            onToggle={() => toggleSection("almost-there")}
            onOpen={openRecipe}
            onGridLayout={(y, height) => (gridBox.current = { y, height })}
          />
        </View>
      )}

      {unlock && (
        <View style={styles.pantrySummaryWrap}>
          <Pressable
            style={[styles.pantrySummary, styles.nudge]}
            onPress={() => router.push({ pathname: "/pantry", params: { segment: "equipment" } })}
          >
            <View style={styles.pantrySummaryText}>
              <Text style={styles.pantrySummaryTitle}>
                Got {/^[aeiou]/i.test(unlock.tag) ? "an" : "a"} {unlock.tag.toLowerCase()}?
              </Text>
              <Text style={styles.pantrySummaryBody}>
                Tick it in Equipment to make {unlock.count} more {unlock.count === 1 ? "drink" : "drinks"} — they show up here once you have their ingredients.
              </Text>
            </View>
            <ChevronRightIcon size={18} color={colors.espresso} strokeWidth={1.6} />
          </Pressable>
        </View>
      )}

      {quickAll.length > 0 && (
        <View
          style={[styles.section, unlock ? styles.sectionAfterCard : null]}
          onLayout={(e) => (sectionY.current.quick = e.nativeEvent.layout.y)}
        >
          <RecipeSection
            eyebrow="In a hurry"
            title="Quick and easy"
            subtitle={`${quickAll.length} ${quickAll.length === 1 ? "drink" : "drinks"} ready in 20 minutes or less.`}
            matches={quickAll}
            ownedEquipment={ownedEquipment}
            expanded={expanded === "quick"}
            visibleCount={visible}
            onToggle={() => toggleSection("quick")}
            onOpen={openRecipe}
            onGridLayout={(y, height) => (gridBox.current = { y, height })}
          />
        </View>
      )}

      {otherCuisinesSection}
      {newFlavorsSection}

      <View style={styles.section}>
        <SectionHeader eyebrow="Explore" title="Browse by type" subtitle="Every drink, grouped by what kind it is." />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.railContent}>
          {cuisines.map((c) => (
            <CuisineTile
              key={c.cuisine}
              cuisine={c.cuisine}
              count={c.count}
              image={c.image}
              onPress={() => router.push({ pathname: "/discover", params: { cuisine: c.cuisine, t: String(Date.now()) } })}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.pantrySummaryWrap}>
        <Pressable style={styles.pantrySummary} onPress={() => router.push("/shopping")}>
          <View style={styles.pantrySummaryText}>
            <Text style={styles.pantrySummaryTitle}>Shopping list</Text>
            <Text style={styles.pantrySummaryBody}>
              {toBuy === 0 ? "Nothing to buy yet" : `${toBuy} ${toBuy === 1 ? "item" : "items"} to buy`}
            </Text>
          </View>
          <ChevronRightIcon size={18} color={colors.espresso} strokeWidth={1.6} />
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  emptyWrap: {
    flexGrow: 1,
    justifyContent: "center",
  },
  refreshRow: {
    marginTop: spacing.sm,
  },
  header: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.md,
    paddingBottom: spacing["2xl"],
    gap: 6,
  },
  greeting: {
    ...typeScale.eyebrow,
    color: colors.burntOrange,
  },
  headline: {
    ...typeScale.display,
    color: colors.espresso,
    marginTop: 2,
  },
  pantryStatus: {
    ...typeScale.bodySmall,
    color: colors.espressoMuted,
    marginTop: 6,
  },
  heroSection: {
    marginBottom: layout.sectionGap,
  },
  noMatchCard: {
    marginHorizontal: layout.screenPadding,
    backgroundColor: colors.paper,
    borderRadius: 16,
    padding: spacing.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
    gap: 4,
  },
  noMatchTitle: {
    ...typeScale.titleSmall,
    color: colors.espresso,
  },
  noMatchBody: {
    ...typeScale.bodySmall,
    color: colors.espressoMuted,
  },
  section: {
    marginBottom: layout.sectionGap,
  },
  sectionAfterCard: {
    marginTop: layout.sectionGap,
  },
  nudge: {
    marginBottom: 0,
  },
  railContent: {
    paddingHorizontal: layout.screenPadding,
    gap: spacing.md,
  },
  pantrySummaryWrap: {
    paddingHorizontal: layout.screenPadding,
  },
  pantrySummary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.paper,
    borderRadius: 16,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
  },
  pantrySummaryText: {
    gap: 2,
    flexShrink: 1,
  },
  pantrySummaryTitle: {
    ...typeScale.titleSmall,
    color: colors.espresso,
  },
  pantrySummaryBody: {
    ...typeScale.bodySmall,
    color: colors.espressoMuted,
  },
});
