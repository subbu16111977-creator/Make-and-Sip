import { AppState, Linking } from "react-native";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AppBlank } from "@/components/AppBlank";
import { STORAGE_KEYS } from "@/lib/appData";
import { billingLive, fetchStoreState, purchasePlan, restorePurchases, watchStoreState, type StoreState } from "@/lib/billing";
import type { PlanId } from "@/lib/plans";
import { ensureReminderPermission, syncReminders } from "@/lib/reminders";
import { cancel, choosePlan, endPlan, failPayment, fixPayment, hasAccess, isSubscription, resume, trialAvailable, type Account, type Subscription } from "@/lib/subscription";
import { usePersistedState } from "@/lib/usePersistedState";

interface SubscriptionContextValue {
  /** The current plan, or null when there isn't one. */
  subscription: Subscription | null;
  /** Whether the person may use the app right now (a plan that hasn't ended). There is no free plan. */
  hasAccess: boolean;
  /** TEST MODE ONLY — remove before launch. Pretends the next renewal payment failed. */
  simulateFailedPayment: () => void;
  /** TEST MODE ONLY — remove before launch. Pretends the person fixed their payment method. */
  simulateFixedPayment: () => void;
  /** True once the 7-day free trial has been used. It can only be used once, across all plans. */
  trialUsed: boolean;
  /** True when the person can still start the free trial right now. */
  trialAvailable: boolean;
  /**
   * TEST MODE: picks a plan on this device without any real purchase or charge. `withTrial` asks for
   * the free trial, which is only granted the first time. Real store purchases replace this before launch.
   */
  startTestSubscription: (planId: PlanId, withTrial: boolean) => Promise<void>;
  /** True when real Google Play purchases are connected (a phone build with a RevenueCat key); false = local test mode. */
  billingLive: boolean;
  /** Real purchase: opens the store's payment sheet. Resolves with an error message to show, or null on success/cancel. */
  purchase: (planId: PlanId) => Promise<string | null>;
  /** Asks the store for the person's existing purchases (new phone, reinstall). Resolves with a message to show. */
  restore: () => Promise<string>;
  /** Opens the store's own subscription page, where a real plan is cancelled or resumed. */
  manageInStore: () => void;
  cancelSubscription: () => void;
  resumeSubscription: () => void;
  /** Removes the current (test) plan but remembers that the trial was used. */
  endSubscription: () => void;
  /**
   * TEST MODE ONLY — remove before launch. Clears the test plan AND the "trial used" memory so the trial can be
   * tried again while developing. It is deliberately NOT part of "Reset local app data".
   */
  resetTestState: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextValue | undefined>(undefined);

const isStoredSubscription = (v: unknown): v is Subscription | null => v === null || isSubscription(v);
const isBoolean = (v: unknown): v is boolean => typeof v === "boolean";

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [subscription, setSubscription, subHydrated] = usePersistedState<Subscription | null>(STORAGE_KEYS.subscription, null, isStoredSubscription);
  const [trialUsed, setTrialUsed, trialHydrated] = usePersistedState<boolean>(STORAGE_KEYS.trialUsed, false, isBoolean);
  const hydrated = subHydrated && trialHydrated;

  // Re-check every minute so access ends on time even if the app stays open.
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    // Phones pause timers in the background, so also re-check the moment the app comes back.
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") setNow(new Date());
    });
    return () => {
      clearInterval(t);
      sub.remove();
    };
  }, []);

  // With real purchases, the store is the source of truth: read it at start and whenever it changes.
  const applyStore = useCallback(
    (state: StoreState) => {
      setSubscription(state.subscription);
      if (state.everPurchased) setTrialUsed(true);
    },
    [setSubscription, setTrialUsed]
  );
  useEffect(() => {
    if (!billingLive || !hydrated) return;
    // If the store can't be reached (offline), keep what's saved on the device.
    fetchStoreState().then(applyStore, () => {});
    const stop = watchStoreState(applyStore);
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") fetchStoreState().then(applyStore, () => {});
    });
    return () => {
      stop();
      sub.remove();
    };
  }, [hydrated, applyStore]);

  const purchase = useCallback(
    async (planId: PlanId) => {
      const result = await purchasePlan(planId);
      if (result.ok) {
        applyStore(result.state);
        await ensureReminderPermission();
        return null;
      }
      return result.cancelled ? null : result.message;
    },
    [applyStore]
  );
  const restore = useCallback(async () => {
    const result = await restorePurchases();
    if (!result.ok) return result.message;
    applyStore(result.state);
    return result.state.subscription ? "Your plan has been restored." : "No previous purchases were found for this Google account.";
  }, [applyStore]);
  const manageInStore = useCallback(() => {
    void Linking.openURL("https://play.google.com/store/account/subscriptions");
  }, []);

  // Keep the scheduled reminders matching the plan: on start, change, and each time the app opens
  // (so a renewing plan always has its next reminders lined up).
  useEffect(() => {
    if (hydrated) void syncReminders(subscription);
  }, [subscription, hydrated]);

  const startTestSubscription = useCallback(
    async (planId: PlanId, withTrial: boolean) => {
      await ensureReminderPermission(); // asked now, because the user just chose a plan
      const account: Account = { subscription, trialUsed };
      const next = choosePlan(account, planId, withTrial, new Date());
      setSubscription(next.subscription);
      setTrialUsed(next.trialUsed);
    },
    [subscription, trialUsed, setSubscription, setTrialUsed]
  );
  const cancelSubscription = useCallback(() => setSubscription((s) => (s ? cancel(s, new Date()) : s)), [setSubscription]);
  const resumeSubscription = useCallback(() => setSubscription((s) => (s ? resume(s, new Date()) : s)), [setSubscription]);
  const endSubscription = useCallback(() => setSubscription(endPlan({ subscription, trialUsed }).subscription), [subscription, trialUsed, setSubscription]);
  const resetTestState = useCallback(() => {
    setSubscription(null);
    setTrialUsed(false);
  }, [setSubscription, setTrialUsed]);

  const simulateFailedPayment = useCallback(() => setSubscription((s) => (s ? failPayment(s, new Date()) : s)), [setSubscription]);
  const simulateFixedPayment = useCallback(() => setSubscription((s) => (s ? fixPayment(s, new Date()) : s)), [setSubscription]);

  const available = trialAvailable({ subscription, trialUsed });
  const access = hasAccess(subscription, now);
  const value = useMemo(
    () => ({ subscription, trialUsed, hasAccess: access, simulateFailedPayment, simulateFixedPayment, trialAvailable: available, billingLive, purchase, restore, manageInStore, startTestSubscription, cancelSubscription, resumeSubscription, endSubscription, resetTestState }),
    [subscription, trialUsed, access, simulateFailedPayment, simulateFixedPayment, available, purchase, restore, manageInStore, startTestSubscription, cancelSubscription, resumeSubscription, endSubscription, resetTestState]
  );

  if (!hydrated) return <AppBlank />;
  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
}

export function useSubscription(): SubscriptionContextValue {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error("useSubscription must be used within a SubscriptionProvider");
  return ctx;
}
