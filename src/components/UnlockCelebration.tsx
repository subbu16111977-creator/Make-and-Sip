import React, { useEffect, useMemo, useState } from "react";
import { Modal, View, Text, StyleSheet, Animated, Easing } from "react-native";
import { useAppDimensions } from "@/lib/useAppDimensions";
import { colors, radii, spacing, type as typeScale, shadows } from "@/theme";
import { Button } from "./Button";

interface UnlockCelebrationProps {
  visible: boolean;
  count: number;
  onDismiss: () => void;
}

const CONFETTI_COLORS = [colors.burntOrange, colors.tangerine, colors.sageOlive, colors.mustard, colors.tomato, colors.white];
const PARTICLE_COUNT = 26;

function ConfettiParticle({ seed, width }: { seed: number; width: number }) {
  // useState's lazy initializer (not useRef().current) so this survives
  // re-renders without a fresh Animated.Value each time, and without
  // reading ref state during render.
  const [progress] = useState(() => new Animated.Value(0));

  // Deterministic-ish per-particle spread, seeded by index so it doesn't reshuffle on re-render.
  const { startX, drift, delay, duration, color, size, rotationDeg } = useMemo(() => {
    const rand = (n: number) => {
      const x = Math.sin(seed * 12.9898 + n * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };
    return {
      startX: rand(1) * width,
      drift: (rand(2) - 0.5) * 140,
      delay: rand(3) * 260,
      duration: 1300 + rand(4) * 700,
      color: CONFETTI_COLORS[seed % CONFETTI_COLORS.length],
      size: 6 + rand(5) * 6,
      rotationDeg: 180 + rand(6) * 540,
    };
  }, [seed, width]);

  useEffect(() => {
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration,
      delay,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [progress, duration, delay]);

  const translateY = progress.interpolate({ inputRange: [0, 1], outputRange: [-20, 560] });
  const translateX = progress.interpolate({ inputRange: [0, 1], outputRange: [0, drift] });
  const rotate = progress.interpolate({ inputRange: [0, 1], outputRange: ["0deg", `${rotationDeg}deg`] });
  const opacity = progress.interpolate({ inputRange: [0, 0.8, 1], outputRange: [1, 1, 0] });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.particle,
        {
          left: startX,
          width: size,
          height: size * 1.6,
          backgroundColor: color,
          opacity,
          transform: [{ translateY }, { translateX }, { rotate }],
        },
      ]}
    />
  );
}

/**
 * A one-shot celebration for the "you just unlocked new dishes by
 * adding a piece of equipment" moment — confetti burst (plain RN
 * Animated, no extra dependency) plus a count of what opened up.
 */
export function UnlockCelebration({ visible, count, onDismiss }: UnlockCelebrationProps) {
  const { width } = useAppDimensions();
  const particles = useMemo(() => Array.from({ length: PARTICLE_COUNT }, (_, i) => i), []);

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDismiss}>
      <View style={styles.backdrop}>
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          {particles.map((i) => (
            <ConfettiParticle key={i} seed={i} width={width} />
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.emoji}>🎉</Text>
          <Text style={styles.headline}>Congrats!</Text>
          <Text style={styles.body}>
            You&apos;ve unlocked {count} new {count === 1 ? "drink" : "drinks"}!!
          </Text>
          <Text style={styles.note}>
            They&apos;ll show up on Home once you have their ingredients. In Discover they no longer say &quot;Needs&quot; your new appliance.
          </Text>
          <Button label="Nice!" onPress={onDismiss} fullWidth style={styles.button} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.overlayStrong,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing["2xl"],
  },
  particle: {
    position: "absolute",
    top: 0,
    borderRadius: 2,
  },
  card: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: colors.paper,
    borderRadius: radii.xl,
    paddingVertical: spacing["2xl"],
    paddingHorizontal: spacing["2xl"],
    alignItems: "center",
    gap: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
    ...shadows.lifted,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 4,
  },
  headline: {
    ...typeScale.headline,
    color: colors.espresso,
  },
  note: {
    ...typeScale.caption,
    color: colors.espressoFaint,
    textAlign: "center",
    marginBottom: 6,
  },
  body: {
    ...typeScale.body,
    color: colors.espressoMuted,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  button: {
    marginTop: spacing.sm,
  },
});
