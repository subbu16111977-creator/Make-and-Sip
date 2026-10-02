import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "@/components/Screen";
import { SectionHeader } from "@/components/SectionHeader";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { RecipeCard } from "@/components/RecipeCard";
import { ExpiringIngredientCard } from "@/components/ExpiringIngredientCard";
import { HomeLoadingState, EmptyState } from "@/components/States";
import { colors, spacing, type as typeScale, layout } from "@/theme";
import { recipes } from "@/data/recipes";
import { usePantry } from "@/context/PantryContext";
import { useEquipment } from "@/context/EquipmentContext";
import { getExpiringSoon, hasRequiredEquipment, pickSlideshowMatches, rankRecipesByPantryMatch } from "@/lib/pantryMatch";
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

  // Home only recommends what you can cook now, so dishes needing gear you
  // haven't ticked are left out of these rails. They all remain in Discover,
  // flagged with the equipment they need.
  const equipmentReady = useMemo(
    () => recipes.filter((r) => hasRequiredEquipment(ownedEquipment, r)),
    [ownedEquipment]
  );

  const expiringSoon = useMemo(() => getExpiringSoon(pantryItems, 4), [pantryItems]);
  const slideshow = useMemo(() => pickSlideshowMatches(pantryItems, recipes, SESSION_SEED), [pantryItems]);
  const ranked = useMemo(() => rankRecipesByPantryMatch(pantryItems, equipmentReady), [pantryItems, equipmentReady]);
  const readyToCook = useMemo(() => ranked.filter((m) => m.ratio >= 0.75).slice(0, 8), [ranked]);

  const categoryCount = useMemo(() => new Set(pantryItems.map((i) => i.category)).size, [pantryItems]);

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
            {pantryItems.length} ingredients on hand · {expiringSoon.length} to use up soon
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

      {readyToCook.length > 0 && (
        <View style={styles.section}>
          <SectionHeader
            eyebrow="Ready when you are"
            title="You have enough for…"
            subtitle="Little or nothing left to buy."
            onPressAction={() => router.push("/discover")}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.railContent}
          >
            {readyToCook.map((match) => (
              <RecipeCard
                key={match.recipe.id}
                recipe={match.recipe}
                haveCount={match.have.length}
                totalCount={match.recipe.ingredients.length}
                missing={match.missing}
                onPress={() => router.push({ pathname: "/recipe/[id]", params: { id: match.recipe.id } })}
              />
            ))}
          </ScrollView>
        </View>
      )}

      <View style={styles.pantrySummaryWrap}>
        <Pressable style={styles.pantrySummary} onPress={() => router.push("/pantry")}>
          <View style={styles.pantrySummaryText}>
            <Text style={styles.pantrySummaryTitle}>Your kitchen, at a glance</Text>
            <Text style={styles.pantrySummaryBody}>
              {pantryItems.length} ingredients across {categoryCount} categories
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
