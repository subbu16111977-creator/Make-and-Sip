import React, { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { AppBlank } from "@/components/AppBlank";
import { STORAGE_KEYS } from "@/lib/appData";
import type { PlanId } from "@/lib/plans";
import { ensureReminderPermission, syncReminders } from "@/lib/reminders";
import { cancel, isSubscription, resume, startSubscription, type Subscription } from "@/lib/subscription";
import { usePersistedState } from "@/lib/usePersistedState";

interface SubscriptionContextValue {
  /** The current plan, or null when there isn't one. */
  subscription: Subscription | null;
  /**
   * TEST MODE: starts a plan on this device without any real purchase or charge. Real store
   * purchases will replace this before launch.
   */
  startTestSubscription: (planId: PlanId) => Promise<void>;
  cancelSubscription: () => void;
  resumeSubscription: () => void;
  /** Removes the (test) subscription. Also used by Settings > Reset local app data. */
  reset: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextValue | undefined>(undefined);

const isStoredSubscription = (v: unknown): v is Subscription | null => v === null || isSubscription(v);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [subscription, setSubscription, hydrated] = usePersistedState<Subscription | null>(STORAGE_KEYS.subscription, null, isStoredSubscription);

  // Keep the scheduled reminders matching the plan: on start, change, and each time the app opens
  // (so a renewing plan always has its next reminders lined up).
  useEffect(() => {
    if (hydrated) void syncReminders(subscription);
  }, [subscription, hydrated]);

  const startTestSubscription = useCallback(
    async (planId: PlanId) => {
      await ensureReminderPermission(); // asked now, because the user just chose a plan
      setSubscription(startSubscription(planId, new Date()));
    },
    [setSubscription]
  );
  const cancelSubscription = useCallback(() => setSubscription((s) => (s ? cancel(s, new Date()) : s)), [setSubscription]);
  const resumeSubscription = useCallback(() => setSubscription((s) => (s ? resume(s, new Date()) : s)), [setSubscription]);
  const reset = useCallback(() => setSubscription(null), [setSubscription]);

  const value = useMemo(
    () => ({ subscription, startTestSubscription, cancelSubscription, resumeSubscription, reset }),
    [subscription, startTestSubscription, cancelSubscription, resumeSubscription, reset]
  );

  if (!hydrated) return <AppBlank />;
  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
}

export function useSubscription(): SubscriptionContextValue {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error("useSubscription must be used within a SubscriptionProvider");
  return ctx;
}
