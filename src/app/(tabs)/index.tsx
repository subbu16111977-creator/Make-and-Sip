import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { RecipeRail } from "@/components/RecipeRail";
import { ExpiringIngredientCard } from "@/components/ExpiringIngredientCard";
import { HomeLoadingState, EmptyState } from "@/components/States";
import { StarterStaples } from "@/components/StarterStaples";
import { CuisineTile } from "@/components/CuisineTile";
import { colors, spacing, type as typeScale, layout } from "@/theme";
import { recipes } from "@/data/recipes";
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
} from "@/lib/pantryMatch";
import type { DiscoverView } from "@/lib/discoverView";
import { ChevronRightIcon } from "@/components/icons";

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

export default function HomeScreen() {
  const router = useRouter();
  const greeting = useGreeting();
  const { items: pantryItems } = usePantry();
  const { owned: ownedEquipment } = useEquipment();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const { items: shoppingItems } = useShopping();

  const expiringSoon = useMemo(() => getExpiringSoon(pantryItems, 4), [pantryItems]);
  const slideshow = useMemo(() => pickSlideshowMatches(pantryItems, recipes, SESSION_SEED), [pantryItems]);

  // The rails below only recommend what is cookable with the gear you own.
  // Every dish, including ones needing gear you lack, remains in Discover.
  const canMake = useMemo(() => pickReadyToCook(pantryItems, recipes, ownedEquipment), [pantryItems, ownedEquipment]);
  const almostThere = useMemo(() => pickAlmostThere(pantryItems, recipes, ownedEquipment), [pantryItems, ownedEquipment]);
  const quick = useMemo(
    () =>
      pickQuickRecipes(
        recipes.filter((r) => isQuickRecipe(r, ownedEquipment)),
        SESSION_SEED
      ).map((r) => matchRecipe(pantryItems, r)),
    [pantryItems, ownedEquipment]
  );

  const openRecipe = (id: string) => router.push({ pathname: "/recipe/[id]", params: { id } });
  // `t` changes on every tap so Discover re-applies the view even if it was already open on it.
  const seeAll = (view: DiscoverView) => router.push({ pathname: "/discover", params: { view, t: String(Date.now()) } });
  const unlock = useMemo(() => bestEquipmentUnlock(ownedEquipment, [...EQUIPMENT_TAGS], recipes), [ownedEquipment]);
  const cuisines = useMemo(() => cuisineSummaries(recipes), []);
  const toBuy = useMemo(() => shoppingItems.filter((i) => !i.checked).length, [shoppingItems]);

  if (loading) {
    return (
      <Screen>
        <HomeLoadingState />
      </Screen>
    );
  }

  if (pantryItems.length === 0) {
    return (
      <Screen contentContainerStyle={styles.emptyWrap}>
        <EmptyState
          title="Your pantry's empty"
          body="Add a few ingredients and we'll start suggesting what to cook with what you already have."
          actionLabel="Add your first ingredient"
          onPressAction={() => router.push("/pantry")}
        />
        <StarterStaples />
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.greeting}>{greeting}, Subbu.</Text>
        <Text style={styles.headline}>Let&apos;s make something delicious.</Text>
        <Pressable onPress={() => router.push("/pantry")} hitSlop={6}>
          <Text style={styles.pantryStatus}>
            {pantryItems.length} {pantryItems.length === 1 ? "ingredient" : "ingredients"} on hand · {expiringSoon.length} to use up soon
          </Text>
        </Pressable>
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
            <Text style={styles.noMatchBody}>Add a few staples to your pantry, or browse every dish in Discover.</Text>
          </Pressable>
        )}
      </View>

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
        <View style={styles.section}>
          <SectionHeader
            eyebrow="Ready when you are"
            title="What you can make"
            subtitle={`${canMake.length} ${canMake.length === 1 ? "dish" : "dishes"} with every ingredient and every tool you need.`}
            onPressAction={() => seeAll("can-make")}
          />
          <RecipeRail matches={canMake} ownedEquipment={ownedEquipment} onOpen={openRecipe} />
        </View>
      )}

      {almostThere.length > 0 && (
        <View style={styles.section}>
          <SectionHeader
            eyebrow="Just a few more"
            title="Almost there"
            subtitle="You have an ingredient and all the tools. Tap the bag to add what's missing to Shopping."
            onPressAction={() => seeAll("almost-there")}
          />
          <RecipeRail matches={almostThere} ownedEquipment={ownedEquipment} showMissingNote onOpen={openRecipe} />
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
                Tick it in Equipment to unlock {unlock.count} more {unlock.count === 1 ? "dish" : "dishes"}.
              </Text>
            </View>
            <ChevronRightIcon size={18} color={colors.espresso} strokeWidth={1.6} />
          </Pressable>
        </View>
      )}

      {quick.length > 0 && (
        <View style={[styles.section, unlock ? styles.sectionAfterCard : null]}>
          <SectionHeader
            eyebrow="In a hurry"
            title="Quick and easy"
            subtitle="Ready in 20 minutes or less."
            onPressAction={() => seeAll("quick")}
          />
          <RecipeRail matches={quick} ownedEquipment={ownedEquipment} onOpen={openRecipe} />
        </View>
      )}

      <View style={styles.section}>
        <SectionHeader eyebrow="Explore" title="Browse by cuisine" subtitle="Every dish, grouped by where it comes from." />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.railContent}>
          {cuisines.map((c) => (
            <CuisineTile
              key={c.cuisine}
              cuisine={c.cuisine}
              count={c.count}
              image={c.image}
              onPress={() => router.push({ pathname: "/discover", params: { cuisine: c.cuisine } })}
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
