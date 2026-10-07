/**
 * Mise Premium plans, as shown on the paywall page. Prices here are for DISPLAY only:
 * once real in-app purchases are connected, the App Store and Google Play supply the
 * live (and localised) price and decide what is charged.
 *
 * There is no free plan. A 7-day free trial applies to the two subscriptions; the
 * stores don't allow a trial on a one-time purchase, so Lifetime has none.
 */
export type PlanId = "monthly" | "yearly" | "lifetime";

export interface Plan {
  id: PlanId;
  title: string;
  /** Price in US dollars. */
  price: number;
  /** "month" and "year" renew automatically; "once" is a single payment. */
  period: "month" | "year" | "once";
  /** Days of free trial before the first charge (0 = none). */
  trialDays: number;
}

export const TRIAL_DAYS = 7;

export const PLANS: readonly Plan[] = [
  { id: "yearly", title: "Yearly", price: 29.99, period: "year", trialDays: TRIAL_DAYS },
  { id: "monthly", title: "Monthly", price: 4.99, period: "month", trialDays: TRIAL_DAYS },
  { id: "lifetime", title: "Lifetime", price: 99.99, period: "once", trialDays: 0 },
];

/** The plan highlighted when the page opens. */
export const DEFAULT_PLAN: PlanId = "yearly";

export function getPlan(id: PlanId): Plan {
  const plan = PLANS.find((p) => p.id === id);
  if (!plan) throw new Error(`Unknown plan: ${id}`);
  return plan;
}

export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function isSubscription(plan: Plan): boolean {
  return plan.period !== "once";
}

export function hasTrial(plan: Plan): boolean {
  return plan.trialDays > 0;
}

/** Yearly shown as a monthly figure ("$2.50/month"); other plans have none. */
export function perMonth(plan: Plan): number | null {
  return plan.period === "year" ? Math.round((plan.price / 12) * 100) / 100 : null;
}

/** Whole-number percentage the yearly plan saves compared with paying monthly for 12 months. */
export function yearlySavingsPercent(): number {
  const monthly = getPlan("monthly").price * 12;
  const yearly = getPlan("yearly").price;
  return Math.round((1 - yearly / monthly) * 100);
}

/** "$29.99 / year", "$4.99 / month", or "$99.99 one time". */
export function priceLine(plan: Plan): string {
  if (plan.period === "once") return `${formatPrice(plan.price)} one time`;
  return `${formatPrice(plan.price)} / ${plan.period}`;
}

/** The big button's label. */
export function ctaLabel(plan: Plan): string {
  if (hasTrial(plan)) return `Start ${plan.trialDays}-day free trial`;
  return `Get lifetime access · ${formatPrice(plan.price)}`;
}

/** What the user will be charged and when — shown right under the button, as the stores require. */
export function chargeNotice(plan: Plan): string {
  if (plan.period === "once") return `One payment of ${formatPrice(plan.price)}. No subscription, no renewals.`;
  const unit = plan.period === "year" ? "year" : "month";
  return `${plan.trialDays} days free, then ${formatPrice(plan.price)} per ${unit}. Renews automatically until you cancel.`;
}
