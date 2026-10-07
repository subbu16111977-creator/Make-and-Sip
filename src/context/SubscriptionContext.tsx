import React, { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { AppBlank } from "@/components/AppBlank";
import { STORAGE_KEYS } from "@/lib/appData";
import type { PlanId } from "@/lib/plans";
import { ensureReminderPermission, syncReminders } from "@/lib/reminders";
import { cancel, choosePlan, endPlan, isSubscription, resume, trialAvailable, type Account, type Subscription } from "@/lib/subscription";
import { usePersistedState } from "@/lib/usePersistedState";

interface SubscriptionContextValue {
  /** The current plan, or null when there isn't one. */
  subscription: Subscription | null;
  /** True once the 7-day free trial has been used. It can only be used once, across all plans. */
  trialUsed: boolean;
  /** True when the person can still start the free trial right now. */
  trialAvailable: boolean;
  /**
   * TEST MODE: picks a plan on this device without any real purchase or charge. `withTrial` asks for
   * the free trial, which is only granted the first time. Real store purchases replace this before launch.
   */
  startTestSubscription: (planId: PlanId, withTrial: boolean) => Promise<void>;
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

  const available = trialAvailable({ subscription, trialUsed });
  const value = useMemo(
    () => ({ subscription, trialUsed, trialAvailable: available, startTestSubscription, cancelSubscription, resumeSubscription, endSubscription, resetTestState }),
    [subscription, trialUsed, available, startTestSubscription, cancelSubscription, resumeSubscription, endSubscription, resetTestState]
  );

  if (!hydrated) return <AppBlank />;
  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
}

export function useSubscription(): SubscriptionContextValue {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error("useSubscription must be used within a SubscriptionProvider");
  return ctx;
}
