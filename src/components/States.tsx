import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { colors, radii, spacing, type as typeScale, layout } from "@/theme";
import { Button } from "./Button";
import { AlertPlateIcon, BasketEmptyIcon } from "./icons";

interface StateProps {
  title: string;
  body: string;
  actionLabel?: string;
  onPressAction?: () => void;
}

/** A calm, editorial empty state — never a bare "No data" screen. */
export function EmptyState({ title, body, actionLabel, onPressAction }: StateProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.iconWrap}>
        <BasketEmptyIcon size={52} color={colors.espressoFaint} strokeWidth={1.3} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      {actionLabel ? <Button label={actionLabel} onPress={onPressAction} variant="secondary" style={styles.action} /> : null}
    </View>
  );
}

/** Something went wrong — plainly stated, with a way forward. */
export function ErrorState({ title, body, actionLabel = "Try again", onPressAction }: StateProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.iconWrap}>
        <AlertPlateIcon size={52} color={colors.tomato} strokeWidth={1.3} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      {actionLabel ? <Button label={actionLabel} onPress={onPressAction} variant="secondary" style={styles.action} /> : null}
    </View>
  );
}

function Pulse({ style }: { style: object }) {
  const [opacity] = useState(() => new Animated.Value(0.55));

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 900, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.55, duration: 900, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return <Animated.View style={[style, { opacity }]} />;
}

/** Home screen loading skeleton — same rhythm as the real layout so nothing jumps on load. */
export function HomeLoadingState() {
  return (
    <View style={loadingStyles.wrap}>
      <View style={loadingStyles.headerBlock}>
        <Pulse style={loadingStyles.greetingLine} />
        <Pulse style={loadingStyles.headlineLine} />
      </View>
      <Pulse style={loadingStyles.hero} />
      <View style={loadingStyles.railHeader}>
        <Pulse style={loadingStyles.railHeaderLine} />
      </View>
      <View style={loadingStyles.railRow}>
        <Pulse style={loadingStyles.chip} />
        <Pulse style={loadingStyles.chip} />
        <Pulse style={loadingStyles.chip} />
      </View>
      <View style={loadingStyles.railHeader}>
        <Pulse style={loadingStyles.railHeaderLine} />
      </View>
      <View style={loadingStyles.railRow}>
        <Pulse style={loadingStyles.card} />
        <Pulse style={loadingStyles.card} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    paddingHorizontal: layout.screenPadding,
    paddingVertical: spacing["5xl"],
    gap: spacing.sm,
  },
  iconWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.paper,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  title: {
    ...typeScale.title,
    color: colors.espresso,
    textAlign: "center",
  },
  body: {
    ...typeScale.body,
    color: colors.espressoMuted,
    textAlign: "center",
    maxWidth: 300,
    marginTop: 4,
  },
  action: {
    marginTop: spacing.lg,
  },
});

const loadingStyles = StyleSheet.create({
  wrap: {
    paddingTop: spacing.lg,
    gap: spacing["2xl"],
  },
  headerBlock: {
    paddingHorizontal: layout.screenPadding,
    gap: spacing.sm,
  },
  greetingLine: {
    width: 140,
    height: 14,
    borderRadius: radii.sm,
    backgroundColor: colors.paper,
  },
  headlineLine: {
    width: 220,
    height: 26,
    borderRadius: radii.sm,
    backgroundColor: colors.paper,
  },
  hero: {
    alignSelf: "center",
    width: "88%",
    height: 340,
    borderRadius: radii.xl,
    backgroundColor: colors.paper,
  },
  railHeader: {
    paddingHorizontal: layout.screenPadding,
  },
  railHeaderLine: {
    width: 180,
    height: 20,
    borderRadius: radii.sm,
    backgroundColor: colors.paper,
  },
  railRow: {
    flexDirection: "row",
    gap: spacing.md,
    paddingHorizontal: layout.screenPadding,
  },
  chip: {
    width: 148,
    height: 92,
    borderRadius: radii.lg,
    backgroundColor: colors.paper,
  },
  card: {
    width: 216,
    height: 280,
    borderRadius: radii.lg,
    backgroundColor: colors.paper,
  },
});
