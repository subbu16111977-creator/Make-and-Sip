import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet, Animated } from "react-native";
import { useAppDimensions } from "@/lib/useAppDimensions";
import { useRouter, useRootNavigationState } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, radii, spacing, type as typeScale } from "@/theme";
import { recipes } from "@/data/recipes";
import { usePantry } from "@/context/PantryContext";
import { useEquipment } from "@/context/EquipmentContext";
import { useProfile } from "@/context/ProfileContext";
import { TUTORIAL_STEPS, pickTutorialRecipe } from "@/lib/introFlow";
import { CheckIcon } from "@/components/icons";
import { getTutorialTarget, scrollScreenBy, type TutorialTargetId } from "@/lib/tutorialTargets";

/** The tutorial steps that live on the example drink's page. */
/** Steps whose control can sit below the fold of a scrolling page. */
const SCROLL_STEPS = new Set(["discover", "recipe-servings", "recipe-methods", "recipe-shopping", "recipe-save", "recipe-favorite", "profile-favorites"]);
const RECIPE_STEPS = new Set(["recipe-servings", "recipe-names", "recipe-methods", "recipe-shopping", "recipe-made", "recipe-save", "recipe-favorite"]);

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** A glowing white outline drawn around the real control a step is about. It never blocks taps. */
function Spotlight({ targetId }: { targetId: TutorialTargetId }) {
  const [box, setBox] = useState<Box | null>(null);
  const layerRef = useRef<View>(null);
  const [pulse] = useState(() => new Animated.Value(0));

  useEffect(() => {
    const measure = () => {
      const node = getTutorialTarget(targetId)?.current;
      const layer = layerRef.current;
      if (!node || !layer) return setBox((prev) => (prev ? null : prev));
      // The app can be a centred column on wide screens, so position the outline relative to this layer, not the window.
      layer.measureInWindow((ox, oy) => {
        node.measureInWindow((wx, wy, w, h) => {
          if (!(w > 0 && h > 0)) return setBox((prev) => (prev ? null : prev));
          const x = wx - ox;
          const y = wy - oy;
          setBox((prev) => (prev && prev.x === x && prev.y === y && prev.w === w && prev.h === h ? prev : { x, y, w, h }));
        });
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

  const pad = 5;
  const glow = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.15, 0.55] });
  const spread = pulse.interpolate({ inputRange: [0, 1], outputRange: [0, 5] });
  return (
    <View ref={layerRef} collapsable={false} pointerEvents="none" style={styles.spotLayer}>
      {box ? (
      <>
      <Animated.View
        style={[
          styles.spotGlow,
          { left: box.x - pad - 5, top: box.y - pad - 5, width: box.w + (pad + 5) * 2, height: box.h + (pad + 5) * 2, opacity: glow, transform: [{ scale: spread.interpolate({ inputRange: [0, 5], outputRange: [1, 1.04] }) }] },
        ]}
      />
      <View style={[styles.spotRing, { left: box.x - pad, top: box.y - pad, width: box.w + pad * 2, height: box.h + pad * 2 }]} />
      </>
      ) : null}
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
  const { height: windowHeight } = useAppDimensions();
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
      } else if (RECIPE_STEPS.has(step.id) && exampleId && !onRecipe.current) {
        // Also covers coming Back from a later step.
        router.push({ pathname: "/recipe/[id]", params: { id: exampleId } });
        onRecipe.current = true;
      } else if (step.id === "shopping-list" || step.id === "saved-list") {
        const path = step.id === "shopping-list" ? "/shopping" : "/saved";
        if (onRecipe.current) router.dismissTo(path);
        else router.navigate(path);
        onRecipe.current = false;
      } else if (step.id === "profile-favorites") {
        if (onRecipe.current) router.dismissTo("/profile");
        else router.navigate("/profile");
        onRecipe.current = false;
      }
    } catch (error) {
      console.warn("[tutorial] could not move to the step's screen", error);
    }
  }, [index, ready]); // eslint-disable-line react-hooks/exhaustive-deps

  // Which half of the screen the card sits in is decided once per step from where the control is, so the card never
  // covers it: a control in the upper half gets the card below, anything lower (or still off-screen) gets the card above.
  const [placed, setPlaced] = useState<{ id: string; side: "top" | "bottom" } | null>(null);
  const [cardHeight, setCardHeight] = useState(0);
  const target = step.target;
  useEffect(() => {
    if (!ready || !target) return;
    const decide = () => {
      getTutorialTarget(target)?.current?.measureInWindow((_x, y, _w, h) => {
        if (!(h > 0)) return;
        const side = y > windowHeight || y + h / 2 > windowHeight * 0.5 ? "top" : "bottom";
        setPlaced((prev) => (prev && prev.id === step.id ? prev : { id: step.id, side }));
      });
    };
    const timers = [setTimeout(decide, 350), setTimeout(decide, 900)];
    return () => timers.forEach(clearTimeout);
  }, [step.id, target, ready, windowHeight]);
  const side = placed && placed.id === step.id ? placed.side : step.placement;

  const bottomOffset = RECIPE_STEPS.has(step.id) ? insets.bottom + spacing.lg : insets.bottom + 76;

  // Controls partway down a scrolling page are scrolled into the free area, clear of the card.
  useEffect(() => {
    if (!ready || !target || !SCROLL_STEPS.has(step.id)) return;
    const margin = 16;
    // Until the card has been measured, assume it takes about a third of the screen.
    const cardH = cardHeight || windowHeight * 0.3;
    const zoneTop = side === "top" ? insets.top + spacing.sm + cardH + margin : insets.top + margin + 40;
    const zoneBottom = side === "top" ? windowHeight - (RECIPE_STEPS.has(step.id) ? insets.bottom : insets.bottom + 76) - margin : windowHeight - bottomOffset - cardH - margin;
    // On Discover the list scrolls itself to just below the filters (see the screen), whatever is measured, so ask it
    // a few times while the first visit finishes loading.
    if (step.id === "discover") {
      const timers = [1200, 2800, 5000].map((ms) => setTimeout(() => scrollScreenBy(0), ms));
      return () => timers.forEach(clearTimeout);
    }
    // A screen can take a while to appear and fill (the first visit to Discover ranks every drink), so keep looking
    // for the control for a few seconds and scroll as soon as it is found out of place.
    let ticks = 0;
    let cooldown = 0;
    const bring = () => {
      ticks += 1;
      if (ticks > 24) return clearInterval(timer);
      // A scroll animates for a moment; don't measure and scroll again while it is still moving.
      if (cooldown > 0) {
        cooldown -= 1;
        return;
      }
      getTutorialTarget(target)?.current?.measureInWindow((_x, y, _w, h) => {
        if (!(h > 0)) return;
        const free = zoneBottom - zoneTop;
        const fits = h <= free;
        if (fits ? y >= zoneTop && y + h <= zoneBottom : Math.abs(y - zoneTop) < 24) return;
        scrollScreenBy(fits ? y - (zoneTop + (free - h) / 2) : y - zoneTop);
        cooldown = 2;
      });
    };
    const timer = setInterval(bring, 450);
    return () => clearInterval(timer);
  }, [step.id, target, ready, side, cardHeight, windowHeight, insets.top, insets.bottom, bottomOffset]);

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
  const pos = side === "top" ? { top: insets.top + spacing.sm } : { bottom: bottomOffset };

  return (
    <View style={[styles.layer, { pointerEvents: "box-none" }]}>
      {step.target ? <Spotlight key={step.id} targetId={step.target} /> : null}
      <View
        style={[styles.card, pos, { maxHeight: windowHeight * 0.5 }]}
        onLayout={(e) => setCardHeight(e.nativeEvent.layout.height)}
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
        {step.preview ? (
          <View style={styles.sample} accessible={false} importantForAccessibility="no-hide-descendants" pointerEvents="none">
            <CheckIcon size={16} color={colors.espresso} strokeWidth={2.2} />
            <Text style={styles.sampleText}>{step.preview}</Text>
          </View>
        ) : null}
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
    padding: spacing.md,
    gap: 4,
  },
  headRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  dots: { flexDirection: "row", gap: 5 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.hairlineStrong },
  dotActive: { width: 18, backgroundColor: colors.burntOrange },
  dotDone: { backgroundColor: colors.flame },
  skip: { ...typeScale.label, fontSize: 13, color: colors.espressoMuted },
  title: { ...typeScale.headline, fontSize: 19, lineHeight: 24, color: colors.espresso, marginTop: 2 },
  body: { ...typeScale.bodySmall, color: colors.espresso },
  hint: { ...typeScale.caption, color: colors.espressoMuted },
  sample: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.sm, borderRadius: radii.md, borderWidth: 1.2, borderColor: colors.hairlineStrong, paddingVertical: 12, marginVertical: spacing.xs },
  sampleText: { ...typeScale.button, color: colors.espresso },
  buttons: { flexDirection: "row", justifyContent: "flex-end", gap: spacing.sm, marginTop: spacing.xs },
  primary: { backgroundColor: colors.burntOrange, borderRadius: radii.md, paddingVertical: 10, paddingHorizontal: spacing.xl },
  primaryText: { ...typeScale.button, color: colors.cream },
  secondary: { borderRadius: radii.md, paddingVertical: 10, paddingHorizontal: spacing.lg, borderWidth: 1, borderColor: colors.hairlineStrong },
  secondaryText: { ...typeScale.button, color: colors.espresso },
  disabled: { opacity: 0.35 },
});
