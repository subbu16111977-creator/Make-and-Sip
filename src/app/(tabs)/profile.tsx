import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Screen } from "@/components/Screen";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/Button";
import { ProfileForm, LOCAL_NOTE } from "@/components/ProfileForm";
import { colors, layout, radii, spacing, type as typeScale } from "@/theme";
import { useProfile } from "@/context/ProfileContext";
import { usePantry } from "@/context/PantryContext";
import { useShopping } from "@/context/ShoppingContext";
import { useSaved } from "@/context/SavedContext";
import { useEquipment } from "@/context/EquipmentContext";
import { draftFromProfile, hasErrors, validateDraft, type ProfileDraft } from "@/lib/profile";

export default function ProfileScreen() {
  const { profile, saveDraft, startReplay, resetProfile } = useProfile();
  const pantry = usePantry();
  const shopping = useShopping();
  const saved = useSaved();
  const equipment = useEquipment();

  const [draft, setDraft] = useState<ProfileDraft>(() => draftFromProfile(profile));
  const [showErrors, setShowErrors] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [confirmingReset, setConfirmingReset] = useState(false);

  const errors = showErrors ? validateDraft(draft) : {};
  const shownPhoto = draft.photoUri === null ? undefined : draft.photoUri ?? profile.profilePhotoUri;

  function change(update: (d: ProfileDraft) => ProfileDraft) {
    setDraft(update);
    setJustSaved(false);
  }

  function save() {
    if (hasErrors(validateDraft(draft))) return setShowErrors(true);
    saveDraft(draft);
    // The photo is now stored on the profile, so the draft goes back to "leave as is".
    setDraft((d) => ({ ...d, photoUri: undefined }));
    setShowErrors(false);
    setJustSaved(true);
  }

  function resetEverything() {
    pantry.reset();
    shopping.reset();
    saved.reset();
    equipment.reset();
    resetProfile();
    setDraft(draftFromProfile({ ...profile, displayName: undefined, profilePhotoUri: undefined, favoriteCuisines: [], customCuisines: [], favoriteFlavors: [], customFlavors: [] }));
    setConfirmingReset(false);
  }

  return (
    <Screen keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Your kitchen</Text>
        <Text style={styles.headline}>Profile &amp; Settings</Text>
        <View style={styles.identity}>
          <Avatar uri={shownPhoto} name={draft.displayName} size={64} />
          <View style={styles.identityText}>
            <Text style={styles.name}>{profile.displayName ?? "Your profile"}</Text>
            <Text style={styles.sub}>{LOCAL_NOTE}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <ProfileForm profile={profile} draft={draft} onChange={change} errors={errors} />
        <Button label={justSaved ? "Saved on this device" : "Save profile"} onPress={save} fullWidth />
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
          Your pantry, equipment, shopping list, saved dishes and profile are all stored on this device only. Resetting clears every one of them.
        </Text>
        {confirmingReset ? (
          <View style={styles.confirm}>
            <Text style={styles.confirmText}>This permanently deletes your pantry, equipment, shopping list, saved dishes and profile on this device. It can’t be undone.</Text>
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
