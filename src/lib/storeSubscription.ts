import { addDays, addMonths, type Subscription } from "@/lib/subscription";
import { TRIAL_DAYS, type PlanId } from "@/lib/plans";

/** The name of the RevenueCat entitlement that unlocks the app. Must match the dashboard. */
export const ENTITLEMENT_ID = "premium";

/** The few fields of RevenueCat's entitlement info that the app reads (a subset, so this stays plain, testable logic). */
export interface StoreEntitlement {
  productIdentifier: string;
  /** "TRIAL" while in the free trial, "NORMAL" otherwise (also "INTRO"/"PREPAID", treated as normal). */
  periodType: string;
  latestPurchaseDate: string | null;
  /** null for a lifetime purchase. */
  expirationDate: string | null;
  /** False once the person has turned off auto-renew (cancelled). */
  willRenew: boolean;
  billingIssueDetectedAt: string | null;
}

/** Works out which Mise plan a store product is, from its id (e.g. "mise_premium:yearly" or "lifetime"). */
export function planFromProductId(productId: string): PlanId | null {
  const id = productId.toLowerCase();
  if (id.includes("lifetime")) return "lifetime";
  if (id.includes("year") || id.includes("annual")) return "yearly";
  if (id.includes("month")) return "monthly";
  return null;
}

/**
 * Turns the store's entitlement into the app's Subscription record. The record's dates are chosen so the
 * app's own term maths lands exactly on the store's expiry date (trial end / renewal date).
 */
export function subscriptionFromEntitlement(e: StoreEntitlement | null | undefined): Subscription | null {
  if (!e) return null;
  const planId = planFromProductId(e.productIdentifier);
  if (!planId) return null;
  if (planId === "lifetime") return { planId, startedAt: e.latestPurchaseDate ?? new Date(0).toISOString(), trial: false };

  if (!e.expirationDate) return null;
  const expires = new Date(e.expirationDate);
  if (Number.isNaN(expires.getTime())) return null;
  const trial = e.periodType === "TRIAL";
  const step = planId === "yearly" ? 12 : 1;
  const startedAt = (trial ? addDays(expires, -TRIAL_DAYS) : addMonths(expires, -step)).toISOString();

  const sub: Subscription = { planId, startedAt, trial };
  if (!e.willRenew) sub.cancelledEndsAt = expires.toISOString();
  if (e.billingIssueDetectedAt) sub.billingFailedAt = e.billingIssueDetectedAt;
  return sub;
}
