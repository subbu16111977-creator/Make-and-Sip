import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useAppDimensions } from "@/lib/useAppDimensions";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { Chip } from "./Chip";
import { ProfileForm } from "./ProfileForm";
import { DiscoverIcon, SavedIcon, ShoppingIcon, ChevronLeftIcon, type IconProps } from "./icons";
import { colors, layout, radii, spacing, type as typeScale } from "@/theme";
import { useEquipment } from "@/context/EquipmentContext";
import { useProfile } from "@/context/ProfileContext";
import { INTRO_STEPS, clampIndex } from "@/lib/introFlow";
import { draftFromProfile, hasErrors, validateDraft, type ProfileDraft } from "@/lib/profile";
import { EQUIPMENT_TAGS } from "@/lib/persistedShapes";

function Badge({ Icon }: { Icon: React.ComponentType<IconProps> }) {
  return (
    <View style={styles.badge}>
      <Icon size={26} color={colors.burntOrange} strokeWidth={1.5} />
    </View>
  );
}

function Welcome() {
  const { width } = useAppDimensions();
  const side = Math.min(width - layout.screenPadding * 2, 300);
  return (
    <View style={[styles.logoFrame, { width: side, height: side }]}>
      <Logo variant="full" height={side * 0.68} />
    </View>
  );
}

function PantryVisual() {
  const rows = [
    ["Rice", "1 kg"],
    ["Tomatoes", "4"],
    ["Cumin seeds", "50 g"],
  ];
  return (
    <View style={styles.visualCard}>
      <Text style={styles.exampleTag}>Example</Text>
      {rows.map(([n, q]) => (
        <View key={n} style={styles.exampleRow}>
          <Text style={styles.exampleName}>{n}</Text>
          <Text style={styles.exampleQty}>{q}</Text>
        </View>
      ))}
      <View style={styles.exampleChips}>
        {["Grains", "Vegetables", "Spices"].map((c) => (
          <View key={c} style={styles.categoryPill}>
            <Text style={styles.categoryText}>{c}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function EquipmentPicker() {
  const { isOwned, toggleEquipment } = useEquipment();
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.visualCard}>
      <Text style={styles.cardNote}>
        If a drink needs equipment you don’t have, it stays out of your suggestions, so ticking what you own helps.
      </Text>
      {open ? (
        <>
          <View style={styles.chipWrap}>
            {EQUIPMENT_TAGS.map((tag) => (
              <Chip key={tag} label={tag} selected={isOwned(tag)} onPress={() => toggleEquipment(tag)} />
            ))}
          </View>
          <Text style={styles.cardNote}>You can change this any time in Pantry, under Equipment.</Text>
        </>
      ) : (
        <Button label="Choose my equipment now" variant="secondary" onPress={() => setOpen(true)} />
      )}
    </View>
  );
}

function Explore() {
  const items: [React.ComponentType<IconProps>, string, string][] = [
    [DiscoverIcon, "Discover", "Dishes you can make, and dishes that are close."],
    [ShoppingIcon, "Shopping", "Add what's missing when you plan a meal."],
    [SavedIcon, "Saved", "Bookmark dishes to come back to."],
  ];
  return (
    <View style={styles.visualCard}>
      {items.map(([Icon, title, text]) => (
        <View key={title} style={styles.exploreRow}>
          <Badge Icon={Icon} />
          <View style={styles.exploreText}>
            <Text style={styles.exploreTitle}>{title}</Text>
            <Text style={styles.exploreBody}>{text}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const COPY: Record<(typeof INTRO_STEPS)[number], { title: string; body: string }> = {
  welcome: {
    title: "Cook with what you have",
    body: "Add the ingredients and equipment in your kitchen, discover dishes you can make, find out what you’re missing, and keep your next meals organized.",
  },
  pantry: {
    title: "Start with your pantry",
    body: "Start by adding the ingredients you already have. Pantry helps you see which dishes match what is available in your kitchen. You can add quantities and sort items by category.",
  },
  equipment: {
    title: "Tell us your equipment",
    body: "Tell us which equipment you have so we can show dishes that fit your kitchen.",
  },
  explore: {
    title: "Explore, shop and save",
    body: "Explore dishes you can make or almost make. Add missing ingredients to Shopping when you’re planning a meal, and save dishes you want to come back to.",
  },
  profile: {
    title: "Make it yours",
    body: "Personalize your cooking experience. This profile stays on this device and you can change it later in Settings.",
  },
};

/**
 * The first-launch introduction (also used to replay it from Settings).
 * Five short screens; skippable from any of them. Skipping or finishing never
 * deletes anything — the only thing it can change is the optional profile, and
 * only when the user presses Finish on the last screen.
 */
export function IntroFlow() {
  const { profile, replay, saveDraft, finishIntro } = useProfile();
  const [index, setIndex] = useState(0);
  const [draft, setDraft] = useState<ProfileDraft>(() => draftFromProfile(profile));
  const [showErrors, setShowErrors] = useState(false);

  const step = INTRO_STEPS[clampIndex(index, INTRO_STEPS.length)];
  const isLast = index >= INTRO_STEPS.length - 1;
  const errors = showErrors ? validateDraft(draft) : {};

  function next() {
    if (!isLast) return setIndex(index + 1);
    const found = validateDraft(draft);
    if (hasErrors(found)) return setShowErrors(true);
    saveDraft(draft);
    finishIntro();
  }

  return (
    <SafeAreaView style={styles.root} edges={["top", "bottom"]}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={styles.topBar}>
          {index > 0 ? (
            <Pressable onPress={() => setIndex(index - 1)} hitSlop={10} accessibilityRole="button" accessibilityLabel="Back" style={styles.topButton}>
              <ChevronLeftIcon size={18} color={colors.espresso} />
              <Text style={styles.topText}>Back</Text>
            </Pressable>
          ) : (
            <View style={styles.topButton} />
          )}
          <View
            style={styles.dots}
            accessible
            accessibilityRole="progressbar"
            accessibilityLabel={`Step ${index + 1} of ${INTRO_STEPS.length}`}
            accessibilityValue={{ min: 1, max: INTRO_STEPS.length, now: index + 1 }}
          >
            {INTRO_STEPS.map((s, i) => (
              <View key={s} style={[styles.dot, i === index && styles.dotActive, i < index && styles.dotDone]} />
            ))}
          </View>
          <Pressable
            onPress={finishIntro}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel={replay ? "Close introduction" : "Skip introduction"}
            style={styles.topButton}
          >
            <Text style={styles.topText}>{replay ? "Close" : "Skip"}</Text>
          </Pressable>
        </View>

        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {step === "welcome" && <Welcome />}
          {step === "pantry" && <PantryVisual />}
          {step === "equipment" && <EquipmentPicker />}
          {step === "explore" && <Explore />}
          <Text style={styles.eyebrow}>{step === "welcome" ? "Welcome" : `Step ${index + 1} of ${INTRO_STEPS.length}`}</Text>
          <Text style={styles.title} accessibilityRole="header">
            {COPY[step].title}
          </Text>
          <Text style={styles.body}>{COPY[step].body}</Text>
          {step === "profile" ? <ProfileForm profile={profile} draft={draft} onChange={setDraft} errors={errors} /> : null}
        </ScrollView>

        <View style={styles.footer}>
          <Button
            label={isLast ? "Finish" : step === "equipment" ? "Continue" : "Continue"}
            icon={isLast ? "none" : "arrow"}
            onPress={next}
            fullWidth
          />
          {step === "equipment" ? (
            <Pressable onPress={() => setIndex(index + 1)} accessibilityRole="button" accessibilityLabel="Do this later" style={styles.laterButton}>
              <Text style={styles.laterText}>Do this later</Text>
            </Pressable>
          ) : null}
          {isLast ? (
            <Pressable onPress={finishIntro} accessibilityRole="button" accessibilityLabel="Skip profile setup" style={styles.laterButton}>
              <Text style={styles.laterText}>Skip profile setup</Text>
            </Pressable>
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: colors.cream, zIndex: 100 },
  flex: { flex: 1 },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  topButton: { minWidth: 64, flexDirection: "row", alignItems: "center", gap: 2 },
  topText: { ...typeScale.label, color: colors.espressoMuted },
  dots: { flexDirection: "row", gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.hairlineStrong },
  dotActive: { width: 22, backgroundColor: colors.burntOrange },
  dotDone: { backgroundColor: colors.flame },
  content: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.lg,
    paddingBottom: spacing["2xl"],
    gap: spacing.md,
    width: "100%",
    maxWidth: layout.maxContentWidth,
    alignSelf: "center",
  },
  eyebrow: { ...typeScale.eyebrow, color: colors.burntOrange, marginTop: spacing.lg },
  title: { ...typeScale.display, color: colors.espresso },
  body: { ...typeScale.body, color: colors.espressoMuted },
  footer: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    gap: spacing.sm,
    width: "100%",
    maxWidth: layout.maxContentWidth,
    alignSelf: "center",
  },
  laterButton: { alignItems: "center", paddingVertical: 8 },
  laterText: { ...typeScale.label, color: colors.espressoMuted },
  visualCard: {
    backgroundColor: colors.paper,
    borderRadius: radii.xl,
    padding: spacing["2xl"],
    gap: spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
  },
  logoFrame: {
    alignSelf: "center",
    backgroundColor: colors.paper,
    borderRadius: radii["2xl"],
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairlineStrong,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  badge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.parchment,
    alignItems: "center",
    justifyContent: "center",
  },
  exampleTag: { ...typeScale.eyebrow, color: colors.espressoFaint },
  exampleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.hairline,
  },
  exampleName: { ...typeScale.body, color: colors.espresso },
  exampleQty: { ...typeScale.body, color: colors.espressoMuted },
  exampleChips: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.xs },
  categoryPill: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: radii.pill, backgroundColor: colors.parchment },
  categoryText: { ...typeScale.caption, color: colors.espressoMuted },
  cardNote: { ...typeScale.bodySmall, color: colors.espressoMuted },
  chipWrap: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  exploreRow: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  exploreText: { flex: 1 },
  exploreTitle: { ...typeScale.label, color: colors.espresso },
  exploreBody: { ...typeScale.bodySmall, color: colors.espressoMuted },
});
