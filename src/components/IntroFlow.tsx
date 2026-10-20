import React, { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, Animated, Easing, AccessibilityInfo } from "react-native";
import { useAppDimensions } from "@/lib/useAppDimensions";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { Chip } from "./Chip";
import { DrinkTypesQuestion, FlavoursQuestion, PREFERENCES_NOTE, ProfileForm } from "./ProfileForm";
import { DiscoverIcon, SavedIcon, ShoppingIcon, ChevronLeftIcon, type IconProps } from "./icons";
import { colors, layout, radii, spacing, type as typeScale } from "@/theme";
import { useEquipment } from "@/context/EquipmentContext";
import { useProfile } from "@/context/ProfileContext";
import { INTRO_STEPS, clampIndex, indexAfterEquipmentLater } from "@/lib/introFlow";
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
    ["Milk", "1 l"],
    ["Lemons", "4"],
    ["Espresso beans", "250 g"],
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
        {["Milk & Cream", "Fruit", "Coffee & Tea"].map((c) => (
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
  return (
    <View style={styles.visualCard}>
      <View style={styles.chipWrap}>
        {EQUIPMENT_TAGS.map((tag) => (
          <Chip key={tag} label={tag} selected={isOwned(tag)} onPress={() => toggleEquipment(tag)} />
        ))}
      </View>
      <Text style={styles.cardNote}>You can change this any time in Pantry, under Equipment.</Text>
    </View>
  );
}

function EquipmentIntro() {
  const rows = ["Espresso machine", "Blender", "Shaker"];
  return (
    <View style={styles.visualCard}>
      <Text style={styles.exampleTag}>Example</Text>
      {rows.map((n) => (
        <View key={n} style={styles.exampleRow}>
          <Text style={styles.exampleName}>{n}</Text>
        </View>
      ))}
      <Text style={styles.cardNote}>
        If a drink needs equipment you don’t have, it stays out of your suggestions. Many drinks also have a by-hand way that needs none.
      </Text>
    </View>
  );
}

function Explore() {
  const items: [React.ComponentType<IconProps>, string, string][] = [
    [DiscoverIcon, "Discover", "Drinks you can make, and drinks that are close."],
    [ShoppingIcon, "Shopping", "Add what's missing before you make it."],
    [SavedIcon, "Saved", "Bookmark drinks to come back to."],
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
    title: "Make it with what you have",
    body: "Add the ingredients and equipment you have, discover drinks you can make, find out what you’re missing, and keep your shopping organised.",
  },
  pantry: {
    title: "Start with your pantry",
    body: "Start by adding the ingredients you already have. Your pantry shows which drinks match what you have on hand. You can add quantities and sort items by category.",
  },
  equipment: {
    title: "Tell us your equipment",
    body: "Tell us which equipment you have so we can show drinks that fit your setup.",
  },
  "equipment-pick": {
    title: "What do you have?",
    body: "Tap everything you own. Leave it empty if you only work by hand.",
  },
  explore: {
    title: "Explore, shop and save",
    body: "Explore drinks you can make or almost make. Add missing ingredients to Shopping when you’re planning one, and save drinks you want to come back to.",
  },
  drinks: {
    title: "What do you like to drink?",
    body: "Pick the kinds of drink you enjoy most. They shape the picks on Home and Best for you in Discover.",
  },
  flavors: {
    title: "What flavours do you enjoy?",
    body: PREFERENCES_NOTE,
  },
  profile: {
    title: "Make it yours",
    body: "Add a name and a photo if you like. Your profile stays on this device and you can change it later in Settings.",
  },
};

/** One progress dot: the current one stretches into a pill, and the colour eases between states. */
function Dot({ active, done, animate }: { active: boolean; done: boolean; animate: boolean }) {
  const [progress] = useState(() => new Animated.Value(active ? 1 : 0));
  useEffect(() => {
    if (!animate) return progress.setValue(active ? 1 : 0);
    Animated.timing(progress, { toValue: active ? 1 : 0, duration: 260, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
  }, [active, animate, progress]);
  const width = progress.interpolate({ inputRange: [0, 1], outputRange: [8, 22] });
  const backgroundColor = active ? colors.burntOrange : done ? colors.flame : colors.hairlineStrong;
  return <Animated.View style={[styles.dot, { width, backgroundColor }]} />;
}

const OUT_MS = 150;
const IN_MS = 320;
const SLIDE = 28;

/**
 * The first-launch introduction (also used to replay it from Settings).
 * A few short screens; skippable from any of them. Skipping or finishing never
 * deletes anything — the only thing it can change is the optional profile, and
 * only when the user presses Finish on the last screen.
 */
export function IntroFlow() {
  const { profile, replay, saveDraft, finishIntro } = useProfile();
  const { owned } = useEquipment();
  const [index, setIndex] = useState(0);
  const [draft, setDraft] = useState<ProfileDraft>(() => draftFromProfile(profile));
  const [showErrors, setShowErrors] = useState(false);

  const step = INTRO_STEPS[clampIndex(index, INTRO_STEPS.length)];
  const isLast = index >= INTRO_STEPS.length - 1;
  const errors = showErrors ? validateDraft(draft) : {};

  // Moving between screens: the old one drifts out and fades, the new one drifts in from the side it belongs to.
  // Nothing animates when the person has asked their phone to reduce motion.
  const [fade] = useState(() => new Animated.Value(1));
  const [slide] = useState(() => new Animated.Value(0));
  const scroller = useRef<ScrollView>(null);
  const moving = useRef(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion).catch(() => undefined);
    const sub = AccessibilityInfo.addEventListener("reduceMotionChanged", setReduceMotion);
    return () => sub.remove();
  }, []);

  function goTo(target: number) {
    const to = clampIndex(target, INTRO_STEPS.length);
    if (to === index || moving.current) return;
    setShowErrors(false);
    if (reduceMotion) {
      setIndex(to);
      scroller.current?.scrollTo({ y: 0, animated: false });
      return;
    }
    const direction = to > index ? 1 : -1;
    moving.current = true;
    Animated.parallel([
      Animated.timing(fade, { toValue: 0, duration: OUT_MS, easing: Easing.in(Easing.quad), useNativeDriver: true }),
      Animated.timing(slide, { toValue: -direction * SLIDE, duration: OUT_MS, easing: Easing.in(Easing.quad), useNativeDriver: true }),
    ]).start(() => {
      setIndex(to);
      scroller.current?.scrollTo({ y: 0, animated: false });
      slide.setValue(direction * SLIDE);
      Animated.parallel([
        Animated.timing(fade, { toValue: 1, duration: IN_MS, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        Animated.timing(slide, { toValue: 0, duration: IN_MS, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]).start(() => {
        moving.current = false;
      });
    });
  }

  // The equipment screen needs at least one pick before Continue works. ("Do this later" on the screen before skips it.)
  const needsEquipment = step === "equipment-pick" && owned.length === 0;

  function next() {
    if (needsEquipment) return;
    const found = validateDraft(draft);
    // The taste questions need their text when "Others" is ticked, so those errors are shown on their own screens.
    if (step === "drinks" && found.cuisine) return setShowErrors(true);
    if (step === "flavors" && found.flavor) return setShowErrors(true);
    if (!isLast) return goTo(index + 1);
    if (hasErrors(found)) {
      setShowErrors(true);
      // Take the person to the screen the problem is on.
      if (found.cuisine) goTo(INTRO_STEPS.indexOf("drinks"));
      else if (found.flavor) goTo(INTRO_STEPS.indexOf("flavors"));
      return;
    }
    saveDraft(draft);
    finishIntro();
  }

  return (
    <SafeAreaView style={styles.root} edges={["top", "bottom"]}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={styles.topBar}>
          {index > 0 ? (
            <Pressable onPress={() => goTo(index - 1)} hitSlop={10} accessibilityRole="button" accessibilityLabel="Back" style={styles.topButton}>
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
              <Dot key={s} active={i === index} done={i < index} animate={!reduceMotion} />
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
          ref={scroller}
          style={styles.flex}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={[styles.stepBody, { opacity: fade, transform: [{ translateX: slide }] }]}>
            {step === "welcome" && <Welcome />}
            {step === "pantry" && <PantryVisual />}
            {step === "equipment" && <EquipmentIntro />}
            {step === "equipment-pick" && <EquipmentPicker />}
            {step === "explore" && <Explore />}
            <Text style={styles.eyebrow}>{step === "welcome" ? "Welcome" : `Step ${index + 1} of ${INTRO_STEPS.length}`}</Text>
            <Text style={styles.title} accessibilityRole="header">
              {COPY[step].title}
            </Text>
            <Text style={styles.body}>{COPY[step].body}</Text>
            {step === "drinks" ? <DrinkTypesQuestion draft={draft} onChange={setDraft} errors={errors} /> : null}
            {step === "flavors" ? <FlavoursQuestion draft={draft} onChange={setDraft} errors={errors} /> : null}
            {step === "profile" ? <ProfileForm profile={profile} draft={draft} onChange={setDraft} errors={errors} /> : null}
          </Animated.View>
        </ScrollView>

        <View style={styles.footer}>
          <Button label={isLast ? "Finish" : "Continue"} icon={isLast ? "none" : "arrow"} onPress={next} disabled={needsEquipment} fullWidth />
          {needsEquipment ? <Text style={styles.footerHint}>Pick at least one to continue.</Text> : null}
          {step === "equipment" ? (
            <Pressable onPress={() => goTo(indexAfterEquipmentLater())} accessibilityRole="button" accessibilityLabel="Do this later" style={styles.laterButton}>
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
  dot: { height: 8, borderRadius: 4 },
  stepBody: { gap: spacing.md },
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
  footerHint: { ...typeScale.caption, color: colors.espressoMuted, textAlign: "center" },
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
