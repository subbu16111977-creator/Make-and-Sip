import React from "react";
import { IntroFlow } from "./IntroFlow";
import { TutorialOverlay } from "./TutorialOverlay";
import { View, StyleSheet } from "react-native";
import { useProfile } from "@/context/ProfileContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { PaywallView } from "./PaywallView";
import { colors } from "@/theme";

/** Sits above the app: the introduction or tutorial when the profile says so, or the paywall when there is no active plan, otherwise nothing. */
export function FirstLaunchGate() {
  const { phase } = useProfile();
  const { hasAccess } = useSubscription();
  if (phase === "intro") return <IntroFlow />;
  if (phase === "tutorial") return <TutorialOverlay />;
  // There is no free plan: without a plan that hasn't ended, the paywall covers the app and can't be closed.
  // Everything the person saved stays on the device underneath.
  if (!hasAccess) {
    return (
      <View style={styles.lock}>
        <PaywallView dismissible={false} />
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  lock: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 95, backgroundColor: colors.cream },
});
