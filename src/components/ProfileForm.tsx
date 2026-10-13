import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { Avatar } from "./Avatar";
import { PhotoCropper } from "./PhotoCropper";
import { Chip } from "./Chip";
import { colors, radii, spacing, type as typeScale } from "@/theme";
import {
  CUISINE_OPTIONS,
  CUISINE_OTHER,
  FLAVOR_OPTIONS,
  FLAVOR_OTHER,
  NAME_MAX_LENGTH,
  toggleOption,
  type DraftErrors,
  photoView,
  type LocalProfile,
  type ProfileDraft,
} from "@/lib/profile";
import { DEFAULT_CROP } from "@/lib/photoCrop";
import { chooseProfilePhoto } from "@/lib/profilePhoto";

interface ProfileFormProps {
  /** The stored profile — used to show the current photo when the draft hasn't changed it. */
  profile: LocalProfile;
  draft: ProfileDraft;
  /** Takes an updater so rapid taps never overwrite each other with a stale copy of the draft. */
  onChange: (update: (draft: ProfileDraft) => ProfileDraft) => void;
  errors: DraftErrors;
  /** Extra content shown directly under the cuisines question (used by the Profile tab for Favourite dishes). */
  afterCuisines?: React.ReactNode;
}

export const PREFERENCES_NOTE =
  "These choices are saved to your profile and shape your recommendations: Best for you in Discover and the picks on Home.";
export const LOCAL_NOTE = "Your profile and preferences are stored only on this device.";

/** The optional local profile fields, shared by the first-launch flow and Settings. Nothing here is required. */
export function ProfileForm({ profile, draft, onChange, errors, afterCuisines }: ProfileFormProps) {
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [cropping, setCropping] = useState(false);

  const view = photoView(profile, draft);
  const shownPhoto = view.uri;

  async function pickPhoto() {
    setPhotoError(null);
    setBusy(true);
    try {
      const photo = await chooseProfilePhoto();
      if (photo) {
        onChange((d) => ({ ...d, photoUri: photo.uri, photoAspect: photo.aspect, photoCrop: { ...DEFAULT_CROP } }));
        setCropping(true);
      }
    } catch (error) {
      console.warn("[profile] photo selection failed", error);
      setPhotoError("We couldn't use that photo. Please try another, or skip the photo.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.photoRow}>
        <Avatar uri={shownPhoto} aspect={view.aspect} crop={view.crop} name={draft.displayName} size={84} />
        <View style={styles.photoActions}>
          <Pressable
            onPress={pickPhoto}
            disabled={busy}
            accessibilityRole="button"
            accessibilityLabel={shownPhoto ? "Change profile photo" : "Add a profile photo"}
            style={({ pressed }) => [styles.smallButton, pressed && styles.pressed]}
          >
            <Text style={styles.smallButtonText}>{shownPhoto ? "Change photo" : "Add a photo"}</Text>
          </Pressable>
          {shownPhoto && view.aspect ? (
            <Pressable
              onPress={() => setCropping(true)}
              accessibilityRole="button"
              accessibilityLabel="Adjust profile photo position and zoom"
              style={({ pressed }) => [styles.linkButton, pressed && styles.pressed]}
            >
              <Text style={styles.linkText}>Adjust photo</Text>
            </Pressable>
          ) : null}
          {shownPhoto ? (
            <Pressable
              onPress={() => onChange((d) => ({ ...d, photoUri: null, photoAspect: undefined, photoCrop: undefined }))}
              accessibilityRole="button"
              accessibilityLabel="Remove profile photo"
              style={({ pressed }) => [styles.linkButton, pressed && styles.pressed]}
            >
              <Text style={styles.linkText}>Remove photo</Text>
            </Pressable>
          ) : (
            <Text style={styles.helper}>Optional. Only used on this device.</Text>
          )}
        </View>
      </View>
      {photoError ? <Text style={styles.error}>{photoError}</Text> : null}
      {shownPhoto && view.aspect ? (
        <PhotoCropper
          visible={cropping}
          uri={shownPhoto}
          aspect={view.aspect}
          initialCrop={view.crop}
          onCancel={() => setCropping(false)}
          onDone={(crop) => {
            onChange((d) => ({ ...d, photoCrop: crop }));
            setCropping(false);
          }}
        />
      ) : null}

      <Text style={styles.label}>Your name</Text>
      <TextInput
        value={draft.displayName}
        onChangeText={(t) => onChange((d) => ({ ...d, displayName: t }))}
        placeholder="Optional"
        placeholderTextColor={colors.espressoFaint}
        maxLength={NAME_MAX_LENGTH}
        autoCapitalize="words"
        autoCorrect={false}
        autoComplete="off"
        returnKeyType="done"
        accessibilityLabel="Your name"
        style={[styles.input, errors.name && styles.inputError]}
      />
      {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}

      <Text style={styles.question}>Which kinds of drink do you enjoy?</Text>
      <Text style={styles.helper}>Choose as many as you like.</Text>
      <View style={styles.chips}>
        {CUISINE_OPTIONS.map((c) => (
          <View key={c} accessibilityRole="checkbox" accessibilityState={{ checked: draft.cuisines.includes(c) }} accessibilityLabel={c}>
            <Chip label={c} selected={draft.cuisines.includes(c)} onPress={() => onChange((d) => ({ ...d, cuisines: toggleOption(d.cuisines, c) }))} />
          </View>
        ))}
      </View>
      {draft.cuisines.includes(CUISINE_OTHER) ? (
        <View style={styles.customWrap}>
          <Text style={styles.label}>Tell us which drinks</Text>
          <TextInput
            value={draft.customCuisineText}
            onChangeText={(t) => onChange((d) => ({ ...d, customCuisineText: t }))}
            placeholder="e.g. Ethiopian (separate several with commas)"
            placeholderTextColor={colors.espressoFaint}
            maxLength={200}
            accessibilityLabel="Tell us which drinks"
            style={[styles.input, errors.cuisine && styles.inputError]}
          />
          {errors.cuisine ? <Text style={styles.error}>{errors.cuisine}</Text> : null}
        </View>
      ) : null}

      {afterCuisines}

      <Text style={styles.question}>What kinds of flavours do you enjoy?</Text>
      <Text style={styles.helper}>Choose as many as you like.</Text>
      <View style={styles.chips}>
        {FLAVOR_OPTIONS.map((f) => (
          <View key={f} accessibilityRole="checkbox" accessibilityState={{ checked: draft.flavors.includes(f) }} accessibilityLabel={f}>
            <Chip label={f} selected={draft.flavors.includes(f)} onPress={() => onChange((d) => ({ ...d, flavors: toggleOption(d.flavors, f) }))} />
          </View>
        ))}
      </View>
      {draft.flavors.includes(FLAVOR_OTHER) ? (
        <View style={styles.customWrap}>
          <Text style={styles.label}>Tell us what flavours you like</Text>
          <TextInput
            value={draft.customFlavorText}
            onChangeText={(t) => onChange((d) => ({ ...d, customFlavorText: t }))}
            placeholder="e.g. Umami (separate several with commas)"
            placeholderTextColor={colors.espressoFaint}
            maxLength={200}
            accessibilityLabel="Tell us what flavours you like"
            style={[styles.input, errors.flavor && styles.inputError]}
          />
          {errors.flavor ? <Text style={styles.error}>{errors.flavor}</Text> : null}
        </View>
      ) : null}

      <View style={styles.note}>
        <Text style={styles.noteText}>{PREFERENCES_NOTE}</Text>
        <Text style={styles.noteText}>{LOCAL_NOTE}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: spacing.sm },
  photoRow: { flexDirection: "row", alignItems: "center", gap: spacing.lg, marginBottom: spacing.sm },
  photoActions: { flex: 1, gap: spacing.sm, alignItems: "flex-start" },
  smallButton: {
    paddingVertical: 10,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.md,
    borderWidth: 1.2,
    borderColor: colors.hairlineStrong,
  },
  smallButtonText: { ...typeScale.label, color: colors.espresso },
  linkButton: { paddingVertical: 4 },
  linkText: { ...typeScale.label, color: colors.burntOrange },
  pressed: { opacity: 0.8 },
  label: { ...typeScale.label, color: colors.espresso, marginTop: spacing.md },
  question: { ...typeScale.headline, fontSize: 20, lineHeight: 26, color: colors.espresso, marginTop: spacing.xl },
  helper: { ...typeScale.bodySmall, color: colors.espressoMuted },
  input: {
    ...typeScale.body,
    color: colors.espresso,
    backgroundColor: colors.paper,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairlineStrong,
    borderRadius: radii.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
  },
  inputError: { borderColor: colors.tomato },
  error: { ...typeScale.bodySmall, color: colors.tomato },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginTop: spacing.sm },
  customWrap: { gap: spacing.sm, marginTop: spacing.sm },
  note: {
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: colors.paper,
    gap: 6,
  },
  noteText: { ...typeScale.bodySmall, color: colors.espressoMuted },
});
