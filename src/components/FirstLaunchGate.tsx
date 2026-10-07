import React, { useEffect, useRef } from "react";
import { View, StyleSheet, BackHandler, Platform } from "react-native";
import { IntroFlow } from "./IntroFlow";
import { TutorialOverlay } from "./TutorialOverlay";
import { PaywallView } from "./PaywallView";
import { useProfile } from "@/context/ProfileContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { colors } from "@/theme";

/** True while the lock screen is showing: the intro and tutorial are done but there is no plan that hasn't ended. */
export function useIsLocked(): boolean {
  const { phase } = useProfile();
  const { hasAccess } = useSubscription();
  return phase === "main" && !hasAccess;
}

/**
 * Wraps the app. While it is locked, everything underneath is hidden from screen readers, can't be tapped
 * and (on the web) can't be reached with the keyboard — so the lock screen is the only thing a person can use.
 */
export function LockAware({ children }: { children: React.ReactNode }) {
  const locked = useIsLocked();
  const ref = useRef<View>(null);
  useEffect(() => {
    if (Platform.OS !== "web") return;
    const el = ref.current as unknown as HTMLElement | null;
    if (!el?.setAttribute) return;
    if (locked) el.setAttribute("inert", "");
    else el.removeAttribute("inert");
  }, [locked]);
  return (
    <View
      ref={ref}
      style={styles.fill}
      pointerEvents={locked ? "none" : "auto"}
      importantForAccessibility={locked ? "no-hide-descendants" : "auto"}
      accessibilityElementsHidden={locked}
      aria-hidden={locked}
    >
      {children}
    </View>
  );
}

/** Sits above the app: the introduction or tutorial when the profile says so, or the paywall when there is no active plan, otherwise nothing. */
export function FirstLaunchGate() {
  const { phase } = useProfile();
  const locked = useIsLocked();

  // On Android the back button from the lock screen leaves the app, like any other first screen.
  useEffect(() => {
    if (Platform.OS !== "android" || !locked) return;
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      BackHandler.exitApp();
      return true;
    });
    return () => sub.remove();
  }, [locked]);

  if (phase === "intro") return <IntroFlow />;
  if (phase === "tutorial") return <TutorialOverlay />;
  // There is no free plan: without a plan that hasn't ended, the paywall covers the app and can't be closed.
  // Everything the person saved stays on the device underneath.
  if (locked) {
    return (
      <View style={styles.lock}>
        <PaywallView dismissible={false} />
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  lock: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 95, backgroundColor: colors.cream },
});
