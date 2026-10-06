import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet, Animated, useWindowDimensions } from "react-native";
import { useRouter, useRootNavigationState } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, radii, spacing, type as typeScale } from "@/theme";
import { recipes } from "@/data/recipes";
import { usePantry } from "@/context/PantryContext";
import { useEquipment } from "@/context/EquipmentContext";
import { useProfile } from "@/context/ProfileContext";
import { TUTORIAL_STEPS, pickTutorialRecipe } from "@/lib/introFlow";
import { getTutorialTarget, scrollScreenBy } from "@/lib/tutorialTargets";

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** A glowing white outline drawn around the real control a step is about. It never blocks taps. */
function Spotlight({ targetId }: { targetId: (typeof TUTORIAL_STEPS)[number]["target"] }) {
  const [box, setBox] = useState<Box | null>(null);
  const [pulse] = useState(() => new Animated.Value(0));

  useEffect(() => {
    const measure = () => {
      const node = getTutorialTarget(targetId)?.current;
      if (!node) return setBox((prev) => (prev ? null : prev));
      node.measureInWindow((x, y, w, h) => {
        if (!(w > 0 && h > 0)) return setBox((prev) => (prev ? null : prev));
        setBox((prev) => (prev && prev.x === x && prev.y === y && prev.w === w && prev.h === h ? prev : { x, y, w, h }));
      });
    };
    measure();
    // Keep following the control if the screen scrolls, resizes or finishes loading.
    const timer = setInterval(measure, 250);
    return () => clearInterval(timer);
  }, [targetId]);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 900, useNativeDriver: false }),
        Animated.timing(pulse, { toValue: 0, duration: 900, useNativeDriver: false }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  if (!box) return null;
  const pad = 5;
  const glow = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.15, 0.55] });
  const spread = pulse.interpolate({ inputRange: [0, 1], outputRange: [0, 5] });
  return (
    <View pointerEvents="none" style={styles.spotLayer}>
      <Animated.View
        style={[
          styles.spotGlow,
          { left: box.x - pad - 5, top: box.y - pad - 5, width: box.w + (pad + 5) * 2, height: box.h + (pad + 5) * 2, opacity: glow, transform: [{ scale: spread.interpolate({ inputRange: [0, 5], outputRange: [1, 1.04] }) }] },
        ]}
      />
      <View style={[styles.spotRing, { left: box.x - pad, top: box.y - pad, width: box.w + pad * 2, height: box.h + pad * 2 }]} />
    </View>
  );
}

/**
 * A short guided tour that floats over the real app. It moves between the real
 * screens and explains each control, but never presses anything for the user:
 * pantry, equipment, shopping and saved dishes are only changed if the user
 * taps those controls themselves. Skippable at every step.
 */
export function TutorialOverlay() {
  const router = useRouter();
  const navState = useRootNavigationState();
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const { finishTutorial, skipTutorial } = useProfile();
  const { items } = usePantry();
  const { owned } = useEquipment();
  const [index, setIndex] = useState(0);
  const onRecipe = useRef(false);

  // Chosen once when the tutorial opens, so the example dish doesn't change underneath the user.
  const exampleId = useMemo(() => pickTutorialRecipe(recipes, items, owned)?.id, []); // eslint-disable-line react-hooks/exhaustive-deps

  const step = TUTORIAL_STEPS[index];
  const ready = Boolean(navState?.key);

  useEffect(() => {
    if (!ready) return;
    try {
      if (step.id === "pantry") {
        // Always show the ingredients list, even when coming back from Equipment.
        if (onRecipe.current) router.dismissTo({ pathname: "/pantry", params: { segment: "ingredients" } });
        else router.navigate({ pathname: "/pantry", params: { segment: "ingredients" } });
        onRecipe.current = false;
      } else if (step.id === "equipment") {
        if (onRecipe.current) router.dismissTo({ pathname: "/pantry", params: { segment: "equipment" } });
        else router.navigate({ pathname: "/pantry", params: { segment: "equipment" } });
        onRecipe.current = false;
      } else if (step.id === "discover") {
        if (onRecipe.current) router.dismissTo("/discover");
        else router.navigate("/discover");
        onRecipe.current = false;
      } else if ((step.id === "recipe-shopping" || step.id === "recipe-save" || step.id === "recipe-favorite") && exampleId && !onRecipe.current) {
        // Also covers coming Back from the Profile step.
        router.push({ pathname: "/recipe/[id]", params: { id: exampleId } });
        onRecipe.current = true;
      } else if (step.id === "profile-favorites") {
        if (onRecipe.current) router.dismissTo("/profile");
        else router.navigate("/profile");
        onRecipe.current = false;
      }
    } catch (error) {
      console.warn("[tutorial] could not move to the step's screen", error);
    }
  }, [index, ready]); // eslint-disable-line react-hooks/exhaustive-deps

  // The favourites section sits partway down the Profile tab, so scroll it into view.
  useEffect(() => {
    if (!ready || step.id !== "profile-favorites") return;
    const bring = () => {
      getTutorialTarget("profile-favorites")?.current?.measureInWindow((_x, y, _w, h) => {
        if (h > 0 && (y > windowHeight * 0.45 || y < 60)) scrollScreenBy(y - 110);
      });
    };
    const timers = [setTimeout(bring, 700), setTimeout(bring, 1500)];
    return () => timers.forEach(clearTimeout);
  }, [index, ready, step.id, windowHeight]);

  function leaveToHome() {
    try {
      if (onRecipe.current) router.dismissTo("/");
      else router.navigate("/");
    } catch (error) {
      console.warn("[tutorial] could not return home", error);
    }
    onRecipe.current = false;
  }

  function done(kind: "finish" | "skip") {
    leaveToHome();
    if (kind === "finish") finishTutorial();
    else skipTutorial();
  }

  const isLast = index === TUTORIAL_STEPS.length - 1;
  const bottomOffset = step.id === "recipe-save" || step.id === "recipe-shopping" ? insets.bottom + spacing.lg : insets.bottom + 76;
  const pos = step.placement === "top" ? { top: insets.top + spacing.sm } : { bottom: bottomOffset };

  return (
    <View style={[styles.layer, { pointerEvents: "box-none" }]}>
      <Spotlight key={step.id} targetId={step.target} />
      <View
        style={[styles.card, pos]}
        accessible={false}
        accessibilityViewIsModal={false}
        accessibilityLabel={`Tutorial step ${index + 1} of ${TUTORIAL_STEPS.length}: ${step.title}`}
      >
        <View style={styles.headRow}>
          <View
            style={styles.dots}
            accessible
            accessibilityRole="progressbar"
            accessibilityLabel={`Tutorial step ${index + 1} of ${TUTORIAL_STEPS.length}`}
            accessibilityValue={{ min: 1, max: TUTORIAL_STEPS.length, now: index + 1 }}
          >
            {TUTORIAL_STEPS.map((s, i) => (
              <View key={s.id} style={[styles.dot, i === index && styles.dotActive, i < index && styles.dotDone]} />
            ))}
          </View>
          <Pressable onPress={() => done("skip")} hitSlop={10} accessibilityRole="button" accessibilityLabel="Skip tutorial">
            <Text style={styles.skip}>Skip tutorial</Text>
          </Pressable>
        </View>
        <Text style={styles.title} accessibilityRole="header">
          {step.title}
        </Text>
        <Text style={styles.body}>{step.body}</Text>
        <Text style={styles.hint}>{step.hint}</Text>
        <View style={styles.buttons}>
          <Pressable
            onPress={() => setIndex(Math.max(0, index - 1))}
            disabled={index === 0}
            accessibilityRole="button"
            accessibilityLabel="Back"
            accessibilityState={{ disabled: index === 0 }}
            style={[styles.secondary, index === 0 && styles.disabled]}
          >
            <Text style={styles.secondaryText}>Back</Text>
          </Pressable>
          <Pressable
            onPress={() => (isLast ? done("finish") : setIndex(index + 1))}
            accessibilityRole="button"
            accessibilityLabel={isLast ? "Finish tutorial" : "Continue"}
            style={styles.primary}
          >
            <Text style={styles.primaryText}>{isLast ? "Finish" : "Continue"}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layer: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 90 },
  spotLayer: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  spotRing: { position: "absolute", borderRadius: radii.lg, borderWidth: 2.5, borderColor: "#FFFFFF" },
  spotGlow: { position: "absolute", borderRadius: radii.xl, borderWidth: 6, borderColor: "#FFFFFF" },
  card: {
    position: "absolute",
    left: spacing.lg,
    right: spacing.lg,
    maxWidth: 520,
    alignSelf: "center",
    backgroundColor: colors.paper,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.burntOrange,
    padding: spacing.lg,
    gap: 6,
  },
  headRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  dots: { flexDirection: "row", gap: 5 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.hairlineStrong },
  dotActive: { width: 18, backgroundColor: colors.burntOrange },
  dotDone: { backgroundColor: colors.flame },
  skip: { ...typeScale.label, fontSize: 13, color: colors.espressoMuted },
  title: { ...typeScale.headline, fontSize: 20, lineHeight: 26, color: colors.espresso, marginTop: 4 },
  body: { ...typeScale.bodySmall, color: colors.espresso },
  hint: { ...typeScale.caption, color: colors.espressoMuted },
  buttons: { flexDirection: "row", justifyContent: "flex-end", gap: spacing.sm, marginTop: spacing.sm },
  primary: { backgroundColor: colors.burntOrange, borderRadius: radii.md, paddingVertical: 10, paddingHorizontal: spacing.xl },
  primaryText: { ...typeScale.button, color: colors.cream },
  secondary: { borderRadius: radii.md, paddingVertical: 10, paddingHorizontal: spacing.lg, borderWidth: 1, borderColor: colors.hairlineStrong },
  secondaryText: { ...typeScale.button, color: colors.espresso },
  disabled: { opacity: 0.35 },
});
