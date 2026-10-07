import { TRIAL_DAYS, formatPrice, getPlan, type PlanId } from "@/lib/plans";

/**
 * A Mise Premium subscription as the app understands it: which plan, when it began, whether it
 * began with the free trial, and — once cancelled — the date access ends. Everything the
 * Subscription screen shows (status, renewal or end date, reminders) is worked out from this
 * record and "now", so it is plain logic that can be tested.
 *
 * Until real store purchases are connected, records are created by the test purchase and live
 * only on this device.
 */
export interface Subscription {
  planId: PlanId;
  /** ISO time the plan (or its free trial) began. */
  startedAt: string;
  /** True when it began with the 7-day free trial. */
  trial: boolean;
  /** ISO time access ends, set when the user cancels. Absent while the plan is set to continue. */
  cancelledEndsAt?: string;
  /** ISO time a renewal payment failed. While set the plan is in a short grace period. */
  billingFailedAt?: string;
}

export type SubscriptionStatus = "trial" | "active" | "cancelled" | "expired" | "lifetime" | "billing_issue";

/** Days of access a person keeps after a renewal payment fails, while the store retries the card. */
export const GRACE_DAYS = 7;

export function isSubscription(value: unknown): value is Subscription {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const s = value as Record<string, unknown>;
  const planOk = s.planId === "monthly" || s.planId === "yearly" || s.planId === "lifetime";
  const date = (v: unknown) => typeof v === "string" && !Number.isNaN(Date.parse(v));
  return planOk && date(s.startedAt) && typeof s.trial === "boolean" && (s.cancelledEndsAt === undefined || date(s.cancelledEndsAt)) && (s.billingFailedAt === undefined || date(s.billingFailedAt));
}

// ---------------------------------------------------------------------------
// Dates
// ---------------------------------------------------------------------------

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

/** Adds calendar months, keeping the same day of the month where it exists (31 Jan + 1 month = 28/29 Feb). */
export function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  const day = d.getDate();
  d.setDate(1);
  d.setMonth(d.getMonth() + months);
  const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  d.setDate(Math.min(day, lastDay));
  return d;
}

/** "October 14, 2026" in the reader's own locale. */
export function formatDate(date: Date): string {
  return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

// ---------------------------------------------------------------------------
// Terms and status
// ---------------------------------------------------------------------------

/** When the free trial ends (and the first charge happens), or null if there was no trial. */
export function trialEndsAt(sub: Subscription): Date | null {
  return sub.trial && sub.planId !== "lifetime" ? addDays(new Date(sub.startedAt), TRIAL_DAYS) : null;
}

/** Every date a subscription's "term" ends — trial end first, then each renewal — from the start up to `until`. */
export function termEnds(sub: Subscription, until: Date): Date[] {
  if (sub.planId === "lifetime") return [];
  const plan = getPlan(sub.planId);
  const step = plan.period === "year" ? 12 : 1;
  const trialEnd = trialEndsAt(sub);
  const anchor = trialEnd ?? new Date(sub.startedAt);
  const ends: Date[] = [];
  if (trialEnd) ends.push(trialEnd);
  for (let k = 1; k < 1000; k++) {
    const next = addMonths(anchor, k * step);
    if (next > until) break;
    ends.push(next);
  }
  return ends;
}

/** The end of the current term: where a trial turns into a charge, the next renewal, or — once cancelled — where access ends. */
export function currentTermEnd(sub: Subscription, now: Date): Date | null {
  if (sub.planId === "lifetime") return null;
  if (sub.billingFailedAt) return graceEnd(sub);
  if (sub.cancelledEndsAt) return new Date(sub.cancelledEndsAt);
  const horizon = addMonths(now, 24);
  return termEnds(sub, horizon).find((d) => d > now) ?? null;
}

/** When access stops if a failed payment is not fixed. */
export function graceEnd(sub: Subscription): Date | null {
  return sub.billingFailedAt ? addDays(new Date(sub.billingFailedAt), GRACE_DAYS) : null;
}

export function statusOf(sub: Subscription, now: Date): SubscriptionStatus {
  if (sub.planId === "lifetime") return "lifetime";
  if (sub.billingFailedAt) return now < (graceEnd(sub) as Date) ? "billing_issue" : "expired";
  if (sub.cancelledEndsAt) return new Date(sub.cancelledEndsAt) > now ? "cancelled" : "expired";
  const trialEnd = trialEndsAt(sub);
  return trialEnd && now < trialEnd ? "trial" : "active";
}

/** The subscription after the user cancels: it keeps working until the end of what they've already got. */
export function cancel(sub: Subscription, now: Date): Subscription {
  if (sub.planId === "lifetime" || sub.cancelledEndsAt || sub.billingFailedAt) return sub;
  const ends = currentTermEnd(sub, now);
  return ends ? { ...sub, cancelledEndsAt: ends.toISOString() } : sub;
}

/** Undo a cancellation while access hasn't ended yet. */
export function resume(sub: Subscription, now: Date): Subscription {
  if (!sub.cancelledEndsAt || new Date(sub.cancelledEndsAt) <= now) return sub;
  const { cancelledEndsAt: _removed, ...rest } = sub;
  void _removed;
  return rest;
}

/** A renewal payment failed (the store could not charge the card). Not possible for lifetime or a cancelled plan. */
export function failPayment(sub: Subscription, now: Date): Subscription {
  if (sub.planId === "lifetime" || sub.cancelledEndsAt || sub.billingFailedAt) return sub;
  return { ...sub, billingFailedAt: now.toISOString() };
}

/** The person fixed their payment method and the charge went through: back to a normal plan. */
export function fixPayment(sub: Subscription, now: Date): Subscription {
  if (!sub.billingFailedAt || statusOf(sub, now) === "expired") return sub;
  const { billingFailedAt: _removed, ...rest } = sub;
  void _removed;
  return rest;
}

/** Whether the person may use the app: any plan that hasn't ended (trial, active, cancelled but not yet over, in a payment grace period, lifetime). */
export function hasAccess(sub: Subscription | null, now: Date): boolean {
  return sub !== null && statusOf(sub, now) !== "expired";
}

export interface Summary {
  status: SubscriptionStatus;
  /** Short plan name, e.g. "Yearly". */
  planName: string;
  /** Pill text: "Free trial", "Active", "Cancelled", "Ended", "Lifetime". */
  badge: string;
  /** The date the line below is about (null for lifetime). */
  date: Date | null;
  /** The main sentence, Claude-style: "Your subscription renews on October 14, 2027." */
  headline: string;
  /** Extra detail line, e.g. the amount charged. */
  detail: string | null;
}

export function summarize(sub: Subscription, now: Date): Summary {
  const plan = getPlan(sub.planId);
  const status = statusOf(sub, now);
  const end = currentTermEnd(sub, now);
  const price = formatPrice(plan.price);
  const unit = plan.period === "year" ? "year" : "month";
  switch (status) {
    case "lifetime":
      return { status, planName: plan.title, badge: "Lifetime", date: null, headline: "You have lifetime access. It never renews or expires.", detail: `Paid once (${price}).` };
    case "trial":
      return {
        status,
        planName: plan.title,
        badge: "Free trial",
        date: end,
        headline: `Your free trial ends on ${end ? formatDate(end) : ""}.`,
        detail: `Then ${price} per ${unit}, renewing automatically. Cancel before then and you won't be charged.`,
      };
    case "active":
      return {
        status,
        planName: plan.title,
        badge: "Active",
        date: end,
        headline: `Your subscription renews on ${end ? formatDate(end) : ""}.`,
        detail: `${price} per ${unit}.`,
      };
    case "billing_issue":
      return {
        status,
        planName: plan.title,
        badge: "Payment issue",
        date: end,
        headline: `We couldn't charge your payment method. You still have access until ${end ? formatDate(end) : ""}.`,
        detail: "Update your payment method in your App Store or Google Play settings to keep Mise Premium.",
      };
    case "cancelled":
      return {
        status,
        planName: plan.title,
        badge: "Cancelled",
        date: end,
        headline: `Your subscription will end on ${end ? formatDate(end) : ""}.`,
        detail: "It won't renew. You keep full access until then.",
      };
    default:
      return {
        status,
        planName: plan.title,
        badge: "Ended",
        date: end,
        headline: `Your subscription ended on ${end ? formatDate(end) : ""}.`,
        detail: "Choose a plan to get Mise Premium back.",
      };
  }
}

// ---------------------------------------------------------------------------
// Reminders: 3, 2 and 1 days before each term ends
// ---------------------------------------------------------------------------

/** Days before the end of a term that a reminder is sent. */
export const REMINDER_DAYS_BEFORE = [3, 2, 1] as const;
/** Local hour reminders arrive at. */
export const REMINDER_HOUR = 9;

export interface Reminder {
  /** When it is sent (local time). */
  at: Date;
  daysBefore: number;
  /** The term end it is about. */
  termEnd: Date;
  title: string;
  body: string;
}

function dayWord(n: number): string {
  return n === 1 ? "1 day" : `${n} days`;
}

function reminderText(sub: Subscription, termEnd: Date, daysBefore: number): { title: string; body: string } {
  const plan = getPlan(sub.planId);
  const price = formatPrice(plan.price);
  const unit = plan.period === "year" ? "year" : "month";
  const when = formatDate(termEnd);
  if (sub.billingFailedAt) {
    return {
      title: `Your Mise Premium access ends in ${dayWord(daysBefore)}`,
      body: `We couldn't charge your payment method. Update it before ${when} to keep your plan.`,
    };
  }
  if (sub.cancelledEndsAt) {
    return {
      title: `Your Mise Premium ends in ${dayWord(daysBefore)}`,
      body: `Your ${plan.title.toLowerCase()} plan ends on ${when}. Resubscribe in the app to keep going.`,
    };
  }
  const trialEnd = trialEndsAt(sub);
  if (trialEnd && termEnd.getTime() === trialEnd.getTime()) {
    return {
      title: `Your free trial ends in ${dayWord(daysBefore)}`,
      body: `You'll be charged ${price} on ${when} unless you cancel before then.`,
    };
  }
  return {
    title: `Mise Premium renews in ${dayWord(daysBefore)}`,
    body: `Your ${plan.title.toLowerCase()} plan renews on ${when} for ${price} per ${unit}.`,
  };
}

/**
 * Every reminder still to come: for each term end (trial end, renewals, or the cancellation date) up
 * to 13 months ahead, one at 9:00 local time on each of the 3, 2 and 1 days before it. Lifetime plans
 * and reminders already in the past are left out.
 */
export function upcomingReminders(sub: Subscription, now: Date): Reminder[] {
  if (sub.planId === "lifetime") return [];
  const horizon = addMonths(now, 13);
  const ends = sub.billingFailedAt ? [graceEnd(sub) as Date] : sub.cancelledEndsAt ? [new Date(sub.cancelledEndsAt)] : termEnds(sub, horizon);
  const out: Reminder[] = [];
  for (const termEnd of ends) {
    for (const daysBefore of REMINDER_DAYS_BEFORE) {
      const day = addDays(termEnd, -daysBefore);
      const at = new Date(day.getFullYear(), day.getMonth(), day.getDate(), REMINDER_HOUR, 0, 0, 0);
      if (at > now) out.push({ at, daysBefore, termEnd, ...reminderText(sub, termEnd, daysBefore) });
    }
  }
  return out.sort((a, b) => a.at.getTime() - b.at.getTime());
}

/** A fresh subscription starting now. It begins on the free trial only if `withTrial` is true and the plan allows one. */
export function startSubscription(planId: PlanId, now: Date, withTrial: boolean = getPlan(planId).trialDays > 0): Subscription {
  return { planId, startedAt: now.toISOString(), trial: withTrial && getPlan(planId).trialDays > 0 };
}

// ---------------------------------------------------------------------------
// One free trial per person
// ---------------------------------------------------------------------------

/**
 * Everything the app remembers about a person's plan: their current subscription and whether the
 * free trial has ever been used. The trial flag is set the moment a trial begins and is NOT cleared
 * by cancelling, ending a plan or switching plans, so the trial cannot be started again on another plan.
 *
 * (In the live app the App Store and Google Play enforce this per Apple ID / Google account. This
 * mirrors that rule for the test mode.)
 */
export interface Account {
  subscription: Subscription | null;
  trialUsed: boolean;
}

export const NEW_ACCOUNT: Account = { subscription: null, trialUsed: false };

/** True when the person may still start the free trial. */
export function trialAvailable(account: Account): boolean {
  return !account.trialUsed && !account.subscription;
}

/**
 * Chooses a plan. The trial only applies the first time and never again; picking another plan
 * while still in the trial keeps the original trial (it doesn't restart or extend).
 */
export function choosePlan(account: Account, planId: PlanId, wantsTrial: boolean, now: Date): Account {
  const current = account.subscription;
  if (current && statusOf(current, now) === "trial" && planId !== "lifetime") {
    return { ...account, subscription: { ...current, planId, cancelledEndsAt: undefined } };
  }
  const trial = wantsTrial && !account.trialUsed && getPlan(planId).trialDays > 0;
  return { subscription: startSubscription(planId, now, trial), trialUsed: account.trialUsed || trial };
}

/** Removes the current plan. The trial stays used. */
export function endPlan(account: Account): Account {
  return { ...account, subscription: null };
}
