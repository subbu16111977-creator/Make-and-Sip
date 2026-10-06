import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, radii, spacing, type as typeScale, layout, shadows } from "@/theme";
import { recipes } from "@/data/recipes";
import { usePantry } from "@/context/PantryContext";
import { useSaved } from "@/context/SavedContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useShopping } from "@/context/ShoppingContext";
import { useEquipment } from "@/context/EquipmentContext";
import { getRecipeAvailability, getShoppingPlan, matchRecipe } from "@/lib/pantryMatch";
import { MatchBadge } from "@/components/MatchBadge";
import { RecipeImage } from "@/components/RecipeImage";
import { ChevronLeftIcon, CheckIcon, ClockIcon, HeartIcon, SavedIcon, ShoppingIcon } from "@/components/icons";

/** "95" -> "1 hr 35 min", "45" -> "45 min", "0" -> "—" */
function formatMinutes(total: number): string {
  if (total <= 0) return "—";
  const hrs = Math.floor(total / 60);
  const mins = total % 60;
  if (hrs === 0) return `${mins} min`;
  if (mins === 0) return `${hrs} hr`;
  return `${hrs} hr ${mins} min`;
}

/**
 * The recipe "manual" — full method, and an honest split of what's
 * already in the pantry versus what still needs buying, with a
 * one-tap way to send the gap straight to Shopping.
 */
export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const { items: pantryItems } = usePantry();
  const { isSaved, toggleSaved } = useSaved();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addMissingFromRecipe } = useShopping();
  const { isOwned: isEquipmentOwned } = useEquipment();

  const recipe = useMemo(() => recipes.find((r) => r.id === id), [id]);
  const match = useMemo(() => (recipe ? matchRecipe(pantryItems, recipe) : null), [recipe, pantryItems]);
  // Recomputed fresh from current Pantry state on every render — never
  // cached on the recipe — so a quantity shortfall or a subtype match
  // shows up here the moment Pantry changes, same as `match` above.
  const availability = useMemo(() => (recipe ? getRecipeAvailability(recipe, pantryItems) : null), [recipe, pantryItems]);
  const matchByPantryId = useMemo(
    () => new Map((availability?.ingredients ?? []).map((m) => [m.recipeIngredient.pantryId, m])),
    [availability]
  );

  // What "Add to Shopping" sends: required missing items plus top-ups for anything the pantry is short on.
  // Optional ingredients are held back and offered separately.
  const plan = useMemo(() => (recipe ? getShoppingPlan(recipe, pantryItems) : null), [recipe, pantryItems]);

  const [justAdded, setJustAdded] = useState(false);
  const [justAddedOptional, setJustAddedOptional] = useState(false);
  const addedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const addedOptionalTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (addedTimer.current) clearTimeout(addedTimer.current);
      if (addedOptionalTimer.current) clearTimeout(addedOptionalTimer.current);
    };
  }, []);

  if (!recipe || !match) {
    return (
      <View style={[styles.notFoundWrap, { paddingTop: insets.top + spacing.xl }]}>
        <Text style={styles.notFoundText}>We couldn&apos;t find that recipe.</Text>
        <Pressable onPress={() => router.back()} hitSlop={8} style={styles.notFoundBack}>
          <ChevronLeftIcon size={16} color={colors.burntOrange} strokeWidth={2} />
          <Text style={styles.notFoundBackText}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const saved = isSaved(recipe.id);
  const recipeId = recipe.id;
  const recipeTitle = recipe.title;
  const heroHeight = Math.round(screenWidth * 0.98);

  const totalMinutes = recipe.prepMinutes + recipe.cookMinutes + (recipe.marinateMinutes ?? 0);
  const timeTiles = [
    { label: "Prep", value: formatMinutes(recipe.prepMinutes) },
    { label: "Cook", value: formatMinutes(recipe.cookMinutes) },
    ...(recipe.marinateMinutes ? [{ label: "Marinate", value: formatMinutes(recipe.marinateMinutes) }] : []),
    { label: "Total", value: formatMinutes(totalMinutes) },
    { label: recipe.yield ? "Yield" : "Servings", value: recipe.yield ?? String(recipe.servings) },
  ];

  const toBuyCount = plan ? plan.required.length + plan.shortfalls.length : 0;
  const optionalCount = plan ? plan.optional.length : 0;

  function handleAddMissing() {
    if (!plan) return;
    addMissingFromRecipe(recipeId, recipeTitle, plan.required, plan.shortfalls);
    setJustAdded(true);
    if (addedTimer.current) clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setJustAdded(false), 1600);
  }

  function handleAddOptional() {
    if (!plan) return;
    addMissingFromRecipe(recipeId, recipeTitle, plan.optional);
    setJustAddedOptional(true);
    if (addedOptionalTimer.current) clearTimeout(addedOptionalTimer.current);
    addedOptionalTimer.current = setTimeout(() => setJustAddedOptional(false), 1600);
  }

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} bounces={false}>
        <View style={[styles.heroWrap, { height: heroHeight }]}>
          <RecipeImage uri={recipe.image} title={recipe.title} style={StyleSheet.absoluteFill} transition={200} />
          <LinearGradient
            colors={["rgba(11,10,8,0.55)", "rgba(11,10,8,0.05)", "rgba(11,10,8,0.18)", "rgba(11,10,8,0.97)"]}
            locations={[0, 0.3, 0.6, 1]}
            style={StyleSheet.absoluteFill}
          />

          <View style={[styles.heroTopRow, { top: insets.top + spacing.sm }]}>
            <Pressable onPress={() => router.back()} hitSlop={8} style={styles.iconButton}>
              <ChevronLeftIcon size={18} color={colors.white} strokeWidth={2.1} />
            </Pressable>
            <View style={styles.heroActions}>
              <Pressable
                onPress={() => toggleFavorite(recipeId)}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel={isFavorite(recipeId) ? "Remove from favourites" : "Add to favourites"}
                style={styles.iconButton}
              >
                <HeartIcon size={17} color={isFavorite(recipeId) ? colors.tomato : colors.white} strokeWidth={1.8} filled={isFavorite(recipeId)} />
              </Pressable>
              <Pressable onPress={() => toggleSaved(recipeId)} hitSlop={8} accessibilityRole="button" accessibilityLabel={saved ? "Remove from saved" : "Save dish"} style={styles.iconButton}>
                <SavedIcon size={17} color={colors.white} strokeWidth={1.8} filled={saved} />
              </Pressable>
            </View>
          </View>

          <View style={styles.heroContent}>
            <Text style={styles.title}>{recipe.title}</Text>
            <Text style={styles.description}>{recipe.description}</Text>

            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <ClockIcon size={14} color={colors.white} strokeWidth={1.6} />
                <Text style={styles.metaText}>{recipe.timeMinutes} min</Text>
              </View>
              <View style={styles.metaDot} />
              <Text style={styles.metaText}>{recipe.difficulty}</Text>
              <View style={styles.metaDot} />
              <Text style={styles.metaText}>{recipe.cuisine}</Text>
              <View style={styles.metaDot} />
              <Text style={styles.metaText}>Serves {recipe.servings}</Text>
            </View>

            <View style={styles.badgeRow}>
              <MatchBadge haveCount={match.have.length} totalCount={recipe.ingredients.length} tone="dark" />
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.timeTileRow}>
            {timeTiles.map((tile) => (
              <View key={tile.label} style={styles.timeTile}>
                <Text style={styles.timeTileValue}>{tile.value}</Text>
                <Text style={styles.timeTileLabel}>{tile.label}</Text>
              </View>
            ))}
          </View>

          {toBuyCount > 0 && (
            <Pressable
              onPress={handleAddMissing}
              style={[
                styles.addMissingButton,
                optionalCount > 0 && styles.addMissingButtonWithLink,
                justAdded && styles.addMissingButtonDone,
              ]}
            >
              {justAdded ? (
                <CheckIcon size={16} color={colors.cream} strokeWidth={2.4} />
              ) : (
                <ShoppingIcon size={16} color={colors.cream} strokeWidth={1.8} />
              )}
              <Text style={styles.addMissingButtonText}>
                {justAdded
                  ? "Added to your Shopping list"
                  : `Add ${toBuyCount} ${toBuyCount === 1 ? "item" : "items"} to Shopping`}
              </Text>
            </Pressable>
          )}
          {optionalCount > 0 && (
            <Pressable onPress={handleAddOptional} hitSlop={8} style={styles.optionalLink}>
              <Text style={styles.optionalLinkText}>
                {justAddedOptional
                  ? "Optional items added"
                  : `Also add ${optionalCount} optional ${optionalCount === 1 ? "item" : "items"}`}
              </Text>
            </Pressable>
          )}

          {recipe.equipment.length > 0 && (
            <View style={styles.ingredientGroup}>
              <Text style={styles.ingredientGroupLabel}>Equipment needed</Text>
              {recipe.equipment.map((tag) => {
                const owned = isEquipmentOwned(tag);
                return (
                  <View key={tag} style={styles.ingredientRow}>
                    <View style={[styles.ingredientMark, owned ? styles.ingredientMarkHave : styles.ingredientMarkMissing]}>
                      {owned && <CheckIcon size={10} color={colors.cream} strokeWidth={2.8} />}
                    </View>
                    <Text style={styles.ingredientLabel}>{tag}</Text>
                    {!owned && <Text style={styles.equipmentMissingTag}>missing — you&apos;ll need to get this</Text>}
                  </View>
                );
              })}
            </View>
          )}

          <Text style={styles.sectionTitle}>Ingredients</Text>

          {match.have.length > 0 && (
            <View style={styles.ingredientGroup}>
              <Text style={styles.ingredientGroupLabel}>On hand · {match.have.length}</Text>
              {match.have.map((ing, i) => {
                const m = matchByPantryId.get(ing.pantryId);
                const shortfall = m?.status === "quantity_insufficient" ? m.missingQuantity : null;
                return (
                  <View key={`${ing.pantryId}-${i}`} style={styles.ingredientRow}>
                    <View
                      style={[
                        styles.ingredientMark,
                        shortfall ? styles.ingredientMarkPartial : styles.ingredientMarkHave,
                      ]}
                    >
                      {!shortfall && <CheckIcon size={10} color={colors.cream} strokeWidth={2.8} />}
                    </View>
                    <View style={styles.ingredientLabelStack}>
                      <Text style={styles.ingredientLabel}>
                        {ing.label}
                        {ing.optional ? <Text style={styles.optionalTag}> · optional</Text> : null}
                      </Text>
                      {shortfall && <Text style={styles.shortfallText}>Need {shortfall} more</Text>}
                    </View>
                    <Text style={styles.ingredientAmount}>{ing.amount}</Text>
                  </View>
                );
              })}
            </View>
          )}

          {match.missing.length > 0 && (
            <View style={styles.ingredientGroup}>
              <Text style={styles.ingredientGroupLabel}>To buy · {match.missing.length}</Text>
              {match.missing.map((ing, i) => (
                <View key={`${ing.pantryId}-${i}`} style={styles.ingredientRow}>
                  <View style={[styles.ingredientMark, styles.ingredientMarkMissing]} />
                  <Text style={styles.ingredientLabel}>
                    {ing.label}
                    {ing.optional ? <Text style={styles.optionalTag}> · optional</Text> : null}
                  </Text>
                  <Text style={styles.ingredientAmount}>{ing.amount}</Text>
                </View>
              ))}
            </View>
          )}

          <Text style={styles.sectionTitle}>Method</Text>
          <View style={styles.stepsWrap}>
            {recipe.steps.map((step, i) => (
              <View key={i} style={styles.stepRow}>
                <Text style={styles.stepNumber}>{String(i + 1).padStart(2, "0")}</Text>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>

          {recipe.notes ? (
            <View style={styles.notesWrap}>
              <Text style={styles.notesLabel}>Cook&apos;s note</Text>
              <Text style={styles.notesText}>{recipe.notes}</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  scrollContent: {
    paddingBottom: layout.sectionGap,
  },
  heroWrap: {
    width: "100%",
    backgroundColor: colors.paper,
    overflow: "hidden",
  },
  heroTopRow: {
    position: "absolute",
    left: spacing.lg,
    right: spacing.lg,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heroActions: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(11, 10, 8, 0.5)",
    borderWidth: 1,
    borderColor: "rgba(244,238,224,0.22)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroContent: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: layout.screenPadding,
    gap: 8,
  },
  title: {
    ...typeScale.display,
    color: colors.white,
    fontSize: 30,
    lineHeight: 35,
  },
  description: {
    ...typeScale.body,
    color: colors.white,
    opacity: 0.88,
    fontSize: 15,
    lineHeight: 21,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginTop: 4,
    flexWrap: "wrap",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  metaText: {
    ...typeScale.meta,
    color: colors.white,
    opacity: 0.92,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.white,
    opacity: 0.6,
  },
  badgeRow: {
    marginTop: 6,
  },
  body: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing["2xl"],
  },
  timeTileRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing["2xl"],
  },
  timeTile: {
    flexGrow: 1,
    flexBasis: "18%",
    backgroundColor: colors.paper,
    borderRadius: radii.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    gap: 3,
  },
  timeTileValue: {
    ...typeScale.label,
    color: colors.espresso,
    fontSize: 13,
  },
  timeTileLabel: {
    ...typeScale.caption,
    color: colors.espressoMuted,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    fontSize: 10,
  },
  addMissingButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    backgroundColor: colors.burntOrange,
    borderRadius: radii.md,
    paddingVertical: 14,
    marginBottom: spacing["2xl"],
    ...shadows.low,
  },
  addMissingButtonDone: {
    backgroundColor: colors.sageOlive,
  },
  addMissingButtonWithLink: {
    marginBottom: spacing.md,
  },
  optionalLink: {
    alignSelf: "center",
    marginBottom: spacing["2xl"],
  },
  optionalLinkText: {
    ...typeScale.label,
    color: colors.burntOrange,
  },
  addMissingButtonText: {
    ...typeScale.button,
    color: colors.cream,
  },
  sectionTitle: {
    ...typeScale.title,
    color: colors.espresso,
    marginBottom: spacing.md,
  },
  ingredientGroup: {
    marginBottom: spacing.lg,
  },
  ingredientGroupLabel: {
    ...typeScale.label,
    color: colors.espressoMuted,
    marginBottom: spacing.sm,
  },
  ingredientRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 9,
    gap: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.hairline,
  },
  ingredientMark: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  ingredientMarkHave: {
    backgroundColor: colors.sageOlive,
  },
  ingredientMarkMissing: {
    borderWidth: 1.5,
    borderColor: colors.tomato,
  },
  ingredientMarkPartial: {
    backgroundColor: colors.mustard,
  },
  ingredientLabelStack: {
    flex: 1,
    gap: 1,
  },
  ingredientLabel: {
    ...typeScale.bodySmall,
    color: colors.espresso,
  },
  shortfallText: {
    ...typeScale.caption,
    color: colors.mustard,
  },
  optionalTag: {
    color: colors.espressoFaint,
  },
  equipmentMissingTag: {
    ...typeScale.caption,
    color: colors.tomato,
  },
  ingredientAmount: {
    ...typeScale.caption,
    color: colors.espressoMuted,
  },
  stepsWrap: {
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  stepRow: {
    flexDirection: "row",
    gap: spacing.lg,
  },
  stepNumber: {
    ...typeScale.label,
    color: colors.burntOrange,
    width: 24,
  },
  stepText: {
    ...typeScale.body,
    color: colors.espresso,
    flex: 1,
  },
  notesWrap: {
    backgroundColor: colors.paper,
    borderRadius: radii.md,
    padding: spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
    gap: 4,
  },
  notesLabel: {
    ...typeScale.label,
    color: colors.espressoMuted,
  },
  notesText: {
    ...typeScale.bodySmall,
    color: colors.espresso,
  },
  notFoundWrap: {
    flex: 1,
    backgroundColor: colors.cream,
    paddingHorizontal: layout.screenPadding,
    gap: spacing.lg,
  },
  notFoundText: {
    ...typeScale.title,
    color: colors.espresso,
  },
  notFoundBack: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
  },
  notFoundBackText: {
    ...typeScale.label,
    color: colors.burntOrange,
  },
});
