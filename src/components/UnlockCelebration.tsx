import React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { colors, radii, spacing, type as typeScale, shadows } from "@/theme";
import { Button } from "./Button";
import { CheckIcon } from "./icons";

interface UnlockCelebrationProps {
  visible: boolean;
  count: number;
  onDismiss: () => void;
}

/**
 * Shown once when a newly ticked piece of equipment opens up more drinks. Quiet on purpose: a tick, a count of what
 * opened up, and one way to carry on.
 */
export function UnlockCelebration({ visible, count, onDismiss }: UnlockCelebrationProps) {
  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDismiss}>
      <View style={styles.backdrop}>
        <View style={styles.card} accessibilityViewIsModal>
          <View style={styles.mark}>
            <CheckIcon size={22} color={colors.cream} strokeWidth={2.2} />
          </View>
          <Text style={styles.headline} accessibilityRole="header">
            {count} more {count === 1 ? "drink" : "drinks"} you can make
          </Text>
          <Text style={styles.body}>They will show up on Home once you have their ingredients. In Discover they no longer say “Needs” your new equipment.</Text>
          <Button label="Continue" onPress={onDismiss} fullWidth style={styles.button} />
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
  card: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: colors.paper,
    borderRadius: radii.xl,
    padding: spacing["2xl"],
    alignItems: "center",
    gap: spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
    ...shadows.lifted,
  },
  mark: {
    width: 44,
    height: 44,
    borderRadius: radii.pill,
    backgroundColor: colors.burntOrange,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xs,
  },
  headline: {
    ...typeScale.title,
    color: colors.espresso,
    textAlign: "center",
  },
  body: {
    ...typeScale.bodySmall,
    color: colors.espressoMuted,
    textAlign: "center",
  },
  button: {
    marginTop: spacing.md,
  },
});
