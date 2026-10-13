import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useAppDimensions } from "@/lib/useAppDimensions";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, radii, spacing, type as typeScale, layout, shadows, shade } from "@/theme";
import { recipes } from "@/data/recipes";
import { usePantry } from "@/context/PantryContext";
import { useSaved } from "@/context/SavedContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useTutorialTarget } from "@/lib/tutorialTargets";
import { useShopping } from "@/context/ShoppingContext";
import { useEquipment } from "@/context/EquipmentContext";
import { getShoppingPlan, matchRecipe } from "@/lib/pantryMatch";
import { useCookability } from "@/lib/useCookability";
import { scaledRecipe } from "@/lib/cookability";
import { CookabilityBadge } from "@/components/CookabilityBadge";
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
  const { width: screenWidth } = useAppDimensions();
  const { items: pantryItems } = usePantry();
  const { isSaved, toggleSaved } = useSaved();
  const { isFavorite, toggleFavorite } = useFavorites();
  const addShoppingTarget = useTutorialTarget("recipe-add-shopping");
  const saveTarget = useTutorialTarget("recipe-save");
  const heartTarget = useTutorialTarget("recipe-heart");
  const { addMissingFromRecipe } = useShopping();
  const { isOwned: isEquipmentOwned } = useEquipment();

  const recipe = useMemo(() => recipes.find((r) => r.id === id), [id]);
  const match = useMemo(() => (recipe ? matchRecipe(pantryItems, recipe) : null), [recipe, pantryItems]);
  // The Cookability check works out amounts for the chosen number of servings (the recipe itself never changes).
  const [chosenServings, setChosenServings] = useState<number | null>(null);
  const servings = chosenServings ?? recipe?.servings ?? 1;
  const cookability = useCookability(recipe, servings);
  const cookByIngredient = useMemo(() => new Map((cookability?.ingredients ?? []).map((c) => [c.ingredient, c])), [cookability]);

  // What "Add to Shopping" sends: required missing items plus top-ups for anything the pantry is short on,
  // for the chosen number of servings. Optional ingredients are held back and offered separately.
  const plan = useMemo(() => (recipe ? getShoppingPlan(scaledRecipe(recipe, servings), pantryItems) : null), [recipe, servings, pantryItems]);

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

  if (!recipe || !match || !cookability) {
    return (
      <View style={[styles.notFoundWrap, { paddingTop: insets.top + spacing.xl }]}>
        <Text style={styles.notFoundText}>We couldn&apos;t find that drink.</Text>
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
    { label: "Make", value: formatMinutes(recipe.cookMinutes) },
    ...(recipe.marinateMinutes ? [{ label: "Chill", value: formatMinutes(recipe.marinateMinutes) }] : []),
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
            colors={[shade(0.55), shade(0.05), shade(0.18), shade(0.97)]}
            locations={[0, 0.3, 0.6, 1]}
            style={StyleSheet.absoluteFill}
          />

          <View style={[styles.heroTopRow, { top: insets.top + spacing.sm }]}>
            <Pressable onPress={() => router.back()} hitSlop={8} style={styles.iconButton}>
              <ChevronLeftIcon size={18} color={colors.white} strokeWidth={2.1} />
            </Pressable>
            <View style={styles.heroActions}>
              <Pressable
                ref={heartTarget}
                onPress={() => toggleFavorite(recipeId)}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel={isFavorite(recipeId) ? "Remove from favourites" : "Add to favourites"}
                style={styles.iconButton}
              >
                <HeartIcon size={17} color={isFavorite(recipeId) ? colors.tomato : colors.white} strokeWidth={1.8} filled={isFavorite(recipeId)} />
              </Pressable>
              <Pressable ref={saveTarget} onPress={() => toggleSaved(recipeId)} hitSlop={8} accessibilityRole="button" accessibilityLabel={saved ? "Remove from saved" : "Save drink"} style={styles.iconButton}>
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
              {cookability ? <CookabilityBadge cookability={cookability} /> : null}
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

          <View style={styles.cookPanel} accessible accessibilityLabel={`${cookability.label}. ${cookability.summary}`}>
            <View style={styles.cookHead}>
              <Text style={styles.cookPercent}>{cookability.percent}%</Text>
              <View style={styles.cookHeadText}>
                <Text style={styles.cookLabel}>{cookability.label}</Text>
                <Text style={styles.cookSummary}>{cookability.summary}</Text>
              </View>
            </View>
            <View style={styles.cookBar}>
              <View style={[styles.cookBarFill, { width: `${cookability.percent}%` }]} />
            </View>
            <View style={styles.cookStats}>
              {cookability.requiredMissing > 0 ? <Text style={styles.cookStat}>{cookability.requiredMissing} missing</Text> : null}
              {cookability.requiredInsufficient > 0 ? <Text style={styles.cookStat}>{cookability.requiredInsufficient} not enough</Text> : null}
              {cookability.requiredAmbiguous > 0 ? <Text style={styles.cookStat}>{cookability.requiredAmbiguous} to double-check</Text> : null}
              {cookability.requiredUnverified > 0 ? <Text style={styles.cookStatSoft}>{cookability.requiredUnverified} amounts couldn&apos;t be checked</Text> : null}
              {cookability.equipmentNeeded.length > 0 ? (
                <Text style={cookability.equipmentMissing.length ? styles.cookStat : styles.cookStatSoft}>
                  {cookability.equipmentMissing.length ? `Needs ${cookability.equipmentMissing.map((t) => t.toLowerCase()).join(", ")}` : "You have the equipment"}
                </Text>
              ) : null}
              {cookability.equipmentOptional.length > 0 ? (
                <Text style={styles.cookStatSoft}>
                  Optional equipment: {cookability.equipmentOptionalOwned.length} of {cookability.equipmentOptional.length} on hand
                </Text>
              ) : null}
              {cookability.optionalHave + cookability.optionalMissing > 0 ? (
                <Text style={styles.cookStatSoft}>
                  Optional: {cookability.optionalHave} on hand, {cookability.optionalMissing} not
                </Text>
              ) : null}
            </View>
            <View style={styles.servingsRow}>
              <Text style={styles.servingsText}>
                Checked for {servings} {servings === 1 ? "serving" : "servings"}
                {servings !== recipe.servings ? ` (drink makes ${recipe.servings})` : ""}
              </Text>
              <View style={styles.stepper}>
                <Pressable onPress={() => setChosenServings(Math.max(1, servings - 1))} disabled={servings <= 1} hitSlop={8} accessibilityRole="button" accessibilityLabel="Fewer servings" style={[styles.stepButton, servings <= 1 && styles.stepButtonOff]}>
                  <Text style={styles.stepButtonText}>−</Text>
                </Pressable>
                <Pressable onPress={() => setChosenServings(Math.min(24, servings + 1))} disabled={servings >= 24} hitSlop={8} accessibilityRole="button" accessibilityLabel="More servings" style={[styles.stepButton, servings >= 24 && styles.stepButtonOff]}>
                  <Text style={styles.stepButtonText}>+</Text>
                </Pressable>
              </View>
            </View>
          </View>

          {toBuyCount > 0 && (
            <Pressable
              ref={addShoppingTarget}
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

          {(recipe.optionalEquipment?.length ?? 0) > 0 && (
            <View style={styles.ingredientGroup}>
              <Text style={styles.ingredientGroupLabel}>Optional equipment</Text>
              {recipe.optionalEquipment?.map(({ tag, without }) => {
                const owned = isEquipmentOwned(tag);
                return (
                  <View key={tag} style={styles.ingredientRow}>
                    <View style={[styles.ingredientMark, owned ? styles.ingredientMarkHave : styles.ingredientMarkOptional]}>
                      {owned && <CheckIcon size={10} color={colors.cream} strokeWidth={2.8} />}
                    </View>
                    <View style={styles.ingredientLabelStack}>
                      <Text style={styles.ingredientLabel}>
                        {tag}
                        <Text style={styles.optionalTag}> · optional</Text>
                      </Text>
                      {!owned && without ? <Text style={styles.uncheckedText}>Without it: {without}</Text> : null}
                    </View>
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
                const c = cookByIngredient.get(ing);
                const shortfall = c?.match === "insufficient" ? c.shortBy : null;
                const check = c?.match === "ambiguous";
                const unverified = !shortfall && !check && c?.quantity === "unknown";
                return (
                  <View key={`${ing.pantryId}-${i}`} style={styles.ingredientRow}>
                    <View
                      style={[
                        styles.ingredientMark,
                        shortfall || check ? styles.ingredientMarkPartial : styles.ingredientMarkHave,
                      ]}
                    >
                      {!shortfall && !check && <CheckIcon size={10} color={colors.cream} strokeWidth={2.8} />}
                    </View>
                    <View style={styles.ingredientLabelStack}>
                      <Text style={styles.ingredientLabel}>
                        {ing.label}
                        {ing.optional ? <Text style={styles.optionalTag}> · optional</Text> : null}
                      </Text>
                      {shortfall && <Text style={styles.shortfallText}>Need {shortfall} more{c?.approximate ? " (estimated)" : ""}</Text>}
                      {check && <Text style={styles.shortfallText}>A different cut or form — check it works</Text>}
                      {unverified && <Text style={styles.uncheckedText}>Amount not checked</Text>}
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

          <Text style={styles.safetyNote}>
            Check every ingredient for allergens and your own dietary needs, including caffeine and sugar. Dietary tags are a guide and may be incomplete.
          </Text>

          {recipe.notes ? (
            <View style={styles.notesWrap}>
              <Text style={styles.notesLabel}>Maker&apos;s note</Text>
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
    backgroundColor: shade(0.5),
    borderWidth: 1,
    borderColor: colors.hairlineStrong,
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
  ingredientMarkOptional: {
    borderWidth: 1.5,
    borderColor: colors.hairlineStrong,
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
  uncheckedText: {
    ...typeScale.caption,
    color: colors.espressoFaint,
  },
  cookPanel: {
    backgroundColor: colors.paper,
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  cookHead: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  cookPercent: { ...typeScale.title, color: colors.burntOrange, fontSize: 30, minWidth: 74 },
  cookHeadText: { flex: 1, gap: 2 },
  cookLabel: { ...typeScale.label, color: colors.espresso },
  cookSummary: { ...typeScale.caption, color: colors.espressoMuted },
  cookBar: { height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.08)", overflow: "hidden" },
  cookBarFill: { height: 6, borderRadius: 3, backgroundColor: colors.burntOrange },
  cookStats: { gap: 2 },
  cookStat: { ...typeScale.caption, color: colors.espressoMuted },
  cookStatSoft: { ...typeScale.caption, color: colors.espressoFaint },
  servingsRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: spacing.xs },
  servingsText: { ...typeScale.caption, color: colors.espresso, flex: 1 },
  stepper: { flexDirection: "row", gap: spacing.sm },
  stepButton: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255,255,255,0.08)" },
  stepButtonOff: { opacity: 0.35 },
  stepButtonText: { ...typeScale.title, color: colors.espresso, fontSize: 22, lineHeight: 26 },
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
  safetyNote: {
    ...typeScale.caption,
    color: colors.espressoFaint,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
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
