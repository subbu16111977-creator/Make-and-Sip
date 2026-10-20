import React, { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet, type ScrollView, type NativeScrollEvent, type NativeSyntheticEvent } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "@/components/Screen";
import { Avatar } from "@/components/Avatar";
import { RecipeSection } from "@/components/RecipeSection";
import { SectionHeader } from "@/components/SectionHeader";
import { ProfileForm, LOCAL_NOTE } from "@/components/ProfileForm";
import { colors, layout, radii, spacing, type as typeScale } from "@/theme";
import { useProfile } from "@/context/ProfileContext";
import { usePantry } from "@/context/PantryContext";
import { useShopping } from "@/context/ShoppingContext";
import { useSaved } from "@/context/SavedContext";
import { useEquipment } from "@/context/EquipmentContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { summarize } from "@/lib/subscription";
import { recipes } from "@/data/recipes";
import { favoriteRecipes } from "@/lib/favorites";
import { matchRecipe } from "@/lib/pantryMatch";
import { registerScrollBy, useTutorialTarget } from "@/lib/tutorialTargets";
import { draftFromProfile, hasErrors, photoView, validateDraft, type ProfileDraft } from "@/lib/profile";

export default function ProfileScreen() {
  const { profile, saveDraft, startReplay, resetProfile } = useProfile();
  const pantry = usePantry();
  const shopping = useShopping();
  const saved = useSaved();
  const equipment = useEquipment();
  const favorites = useFavorites();
  const subscriptionCtx = useSubscription();
  const planSummary = subscriptionCtx.subscription ? summarize(subscriptionCtx.subscription, new Date()) : null;
  const router = useRouter();
  const favoritesTarget = useTutorialTarget("profile-favorites");
  const scrollRef = useRef<ScrollView>(null);
  const scrollY = useRef(0);
  const [favoritesExpanded, setFavoritesExpanded] = useState(false);

  // Lets the tutorial scroll this screen to show the Favourites section.
  useEffect(
    () => registerScrollBy((dy) => scrollRef.current?.scrollTo({ y: Math.max(0, scrollY.current + dy), animated: true })),
    []
  );

  const favoriteMatches = favoriteRecipes(favorites.favoriteIds, recipes).map((r) => matchRecipe(pantry.items, r, equipment.owned));

  const [draft, setDraft] = useState<ProfileDraft>(() => draftFromProfile(profile));
  // Changes to the name, photo and the rest save themselves a moment after they are made, so there is no Save button.
  const [touched, setTouched] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [confirmingReset, setConfirmingReset] = useState(false);

  const errors = touched ? validateDraft(draft) : {};
  const view = photoView(profile, draft);

  function change(update: (d: ProfileDraft) => ProfileDraft) {
    setDraft(update);
    setTouched(true);
    setJustSaved(false);
  }

  useEffect(() => {
    if (!touched || hasErrors(validateDraft(draft))) return;
    const timer = setTimeout(() => {
      saveDraft(draft);
      // The photo is now stored on the profile, so the draft goes back to "leave as is".
      setDraft((d) => ({ ...d, photoUri: undefined, photoAspect: undefined, photoCrop: undefined }));
      setTouched(false);
      setJustSaved(true);
    }, 600);
    return () => clearTimeout(timer);
  }, [draft, touched, saveDraft]);

  function resetEverything() {
    pantry.reset();
    shopping.reset();
    saved.reset();
    equipment.reset();
    favorites.reset();
    resetProfile();
    setDraft(draftFromProfile({ ...profile, displayName: undefined, profilePhotoUri: undefined, favoriteCuisines: [], customCuisines: [], favoriteFlavors: [], customFlavors: [] }));
    setConfirmingReset(false);
  }

  return (
    <Screen
      keyboardShouldPersistTaps="handled"
      scrollRef={scrollRef}
      scrollEventThrottle={64}
      onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
        scrollY.current = e.nativeEvent.contentOffset.y;
      }}
    >
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Your setup</Text>
        <Text style={styles.headline}>Profile &amp; Settings</Text>
        <View style={styles.identity}>
          <Avatar uri={view.uri} aspect={view.aspect} crop={view.crop} name={draft.displayName} size={64} />
          <View style={styles.identityText}>
            <Text style={styles.name}>{profile.displayName ?? "Your profile"}</Text>
            <Text style={styles.sub}>{LOCAL_NOTE}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your profile</Text>
        <ProfileForm
          profile={profile}
          draft={draft}
          onChange={change}
          errors={errors}
          afterName={
            <View ref={favoritesTarget} collapsable={false} style={styles.favoritesSlot}>
              {favoriteMatches.length === 0 ? (
                <>
                  <SectionHeader eyebrow="Your favourites" title="Favourite drinks" subtitle="Tap the heart on any drink to keep it here." />
                </>
              ) : (
                <RecipeSection
                  eyebrow="Your favourites"
                  title="Favourite drinks"
                  subtitle={`${favoriteMatches.length} ${favoriteMatches.length === 1 ? "drink" : "drinks"} you've hearted.`}
                  matches={favoriteMatches}
                  ownedEquipment={equipment.owned}
                  seeAllLabel="View all"
                  hideActionWhenFits
                  expanded={favoritesExpanded}
                  visibleCount={favoriteMatches.length}
                  onToggle={() => setFavoritesExpanded((v) => !v)}
                  onOpen={(id) => router.push({ pathname: "/recipe/[id]", params: { id } })}
                  onGridLayout={() => {}}
                />
              )}
            </View>
          }
        />
        <Text style={styles.sub}>{justSaved ? "Saved on this device." : "Changes save on their own."}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Make & Sip Premium</Text>
        {planSummary ? (
          <Pressable onPress={() => router.push("/subscription")} accessibilityRole="button" accessibilityLabel="Open your subscription" style={styles.row}>
            <Text style={styles.rowText}>
              {planSummary.planName} · {planSummary.badge}
            </Text>
            <Text style={styles.sub}>{planSummary.headline}</Text>
          </Pressable>
        ) : (
          <Pressable onPress={() => router.push("/paywall")} accessibilityRole="button" accessibilityLabel="See Make & Sip Premium plans" style={styles.row}>
            <Text style={styles.rowText}>See plans and pricing</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Guides</Text>
        <Pressable onPress={() => startReplay("intro")} accessibilityRole="button" accessibilityLabel="Replay the introduction" style={styles.row}>
          <Text style={styles.rowText}>Replay the introduction</Text>
        </Pressable>
        <Pressable onPress={() => startReplay("tutorial")} accessibilityRole="button" accessibilityLabel="Replay the tutorial" style={styles.row}>
          <Text style={styles.rowText}>Replay the tutorial</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Local data</Text>
        <Text style={styles.sub}>
          Your pantry, equipment, shopping list, saved drinks, favourites and profile are all stored on this device only. Resetting clears every one of them, and never touches your subscription.
        </Text>
        {confirmingReset ? (
          <View style={styles.confirm}>
            <Text style={styles.confirmText}>This permanently deletes your pantry, equipment, shopping list, saved drinks, favourites and profile on this device. It can’t be undone. Your subscription isn’t affected.</Text>
            <View style={styles.confirmButtons}>
              <Pressable onPress={() => setConfirmingReset(false)} accessibilityRole="button" accessibilityLabel="Cancel reset" style={styles.cancel}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
              <Pressable onPress={resetEverything} accessibilityRole="button" accessibilityLabel="Yes, reset all local app data" style={styles.danger}>
                <Text style={styles.dangerText}>Yes, reset everything</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <Pressable onPress={() => setConfirmingReset(true)} accessibilityRole="button" accessibilityLabel="Reset local app data" style={styles.row}>
            <Text style={[styles.rowText, { color: colors.tomato }]}>Reset local app data</Text>
          </Pressable>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: layout.screenPadding, paddingTop: spacing.md, paddingBottom: spacing.lg, gap: 4 },
  eyebrow: { ...typeScale.eyebrow, color: colors.burntOrange },
  headline: { ...typeScale.display, color: colors.espresso },
  identity: { flexDirection: "row", alignItems: "center", gap: spacing.lg, marginTop: spacing.lg },
  identityText: { flex: 1, gap: 2 },
  name: { ...typeScale.headline, fontSize: 22, color: colors.espresso },
  sub: { ...typeScale.bodySmall, color: colors.espressoMuted },
  section: { paddingHorizontal: layout.screenPadding, paddingTop: spacing.xl, gap: spacing.md, maxWidth: layout.maxContentWidth, width: "100%", alignSelf: "center" },
  // Cancels the form's side padding so the row can run edge to edge, like on Home.
  favoritesSlot: { marginHorizontal: -layout.screenPadding, marginTop: spacing.xl },
  sectionTitle: { ...typeScale.headline, fontSize: 20, color: colors.espresso },
  row: { paddingVertical: 14, paddingHorizontal: spacing.lg, borderRadius: radii.lg, backgroundColor: colors.paper, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.hairline },
  rowText: { ...typeScale.label, fontSize: 15, color: colors.espresso },
  confirm: { padding: spacing.lg, borderRadius: radii.lg, backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.tomato, gap: spacing.md },
  confirmText: { ...typeScale.bodySmall, color: colors.espresso },
  confirmButtons: { flexDirection: "row", gap: spacing.sm, justifyContent: "flex-end" },
  cancel: { paddingVertical: 10, paddingHorizontal: spacing.lg, borderRadius: radii.md, borderWidth: 1, borderColor: colors.hairlineStrong },
  cancelText: { ...typeScale.button, color: colors.espresso },
  danger: { paddingVertical: 10, paddingHorizontal: spacing.lg, borderRadius: radii.md, backgroundColor: colors.tomato },
  dangerText: { ...typeScale.button, color: colors.white },
});
