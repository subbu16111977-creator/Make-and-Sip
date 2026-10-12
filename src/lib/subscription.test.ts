import { describe, expect, it } from "vitest";
import {
  REMINDER_DAYS_BEFORE,
  REMINDER_HOUR,
  GRACE_DAYS,
  NEW_ACCOUNT,
  addMonths,
  failPayment,
  fixPayment,
  hasAccess,
  graceEnd,
  cancel,
  choosePlan,
  endPlan,
  trialAvailable,
  currentTermEnd,
  formatDate,
  isSubscription,
  resume,
  startSubscription,
  statusOf,
  summarize,
  termEnds,
  trialEndsAt,
  upcomingReminders,
  type Subscription,
} from "./subscription";

const at = (y: number, m: number, d: number, h = 12) => new Date(y, m - 1, d, h, 0, 0, 0);

describe("dates", () => {
  it("adds months without spilling over (31 Jan + 1 month)", () => {
    expect(addMonths(at(2026, 1, 31), 1).getMonth()).toBe(1); // February
    expect(addMonths(at(2026, 1, 31), 1).getDate()).toBe(28);
    expect(addMonths(at(2028, 1, 31), 1).getDate()).toBe(29); // leap year
    expect(addMonths(at(2026, 1, 31), 2).getDate()).toBe(31); // keeps the original day when possible
  });
});

describe("starting a plan", () => {
  it("begins monthly and yearly with the 7-day trial and lifetime without one", () => {
    const now = at(2026, 10, 7);
    expect(startSubscription("yearly", now).trial).toBe(true);
    expect(startSubscription("monthly", now).trial).toBe(true);
    expect(startSubscription("lifetime", now).trial).toBe(false);
  });
  it("ends the trial 7 days after it begins", () => {
    const sub = startSubscription("yearly", at(2026, 10, 7));
    const end = trialEndsAt(sub)!;
    expect([end.getFullYear(), end.getMonth() + 1, end.getDate()]).toEqual([2026, 10, 14]);
    expect(trialEndsAt(startSubscription("lifetime", at(2026, 10, 7)))).toBeNull();
  });
});

describe("status and dates", () => {
  const start = at(2026, 10, 7);
  it("is on trial for 7 days, then active", () => {
    const sub = startSubscription("yearly", start);
    expect(statusOf(sub, at(2026, 10, 10))).toBe("trial");
    expect(statusOf(sub, at(2026, 10, 14, 13))).toBe("active");
  });
  it("yearly: trial end is the first term end, then a renewal a year after that", () => {
    const sub = startSubscription("yearly", start);
    const ends = termEnds(sub, at(2028, 12, 1)).map((d) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`);
    expect(ends).toEqual(["2026-10-14", "2027-10-14", "2028-10-14"]);
    const now = at(2026, 12, 1);
    expect(currentTermEnd(sub, now)!.getFullYear()).toBe(2027);
  });
  it("monthly: renews on the same day each month", () => {
    const sub = startSubscription("monthly", start);
    const ends = termEnds(sub, at(2027, 1, 20)).map((d) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`);
    expect(ends).toEqual(["2026-10-14", "2026-11-14", "2026-12-14", "2027-1-14"]);
  });
  it("lifetime has no end", () => {
    const sub = startSubscription("lifetime", start);
    expect(statusOf(sub, at(2040, 1, 1))).toBe("lifetime");
    expect(currentTermEnd(sub, at(2040, 1, 1))).toBeNull();
    expect(termEnds(sub, at(2040, 1, 1))).toEqual([]);
  });
});

describe("cancelling", () => {
  const start = at(2026, 10, 7);
  it("during the trial keeps access until the trial ends, then it ends (no charge)", () => {
    const sub = cancel(startSubscription("yearly", start), at(2026, 10, 9));
    expect(statusOf(sub, at(2026, 10, 10))).toBe("cancelled");
    expect(new Date(sub.cancelledEndsAt!).getDate()).toBe(14);
    expect(statusOf(sub, at(2026, 10, 15))).toBe("expired");
  });
  it("after the trial keeps access until the end of the paid period", () => {
    const sub = cancel(startSubscription("yearly", start), at(2027, 3, 1));
    const end = new Date(sub.cancelledEndsAt!);
    expect([end.getFullYear(), end.getMonth() + 1, end.getDate()]).toEqual([2027, 10, 14]);
  });
  it("can be resumed before access ends, but not after, and lifetime can't be cancelled", () => {
    const cancelled = cancel(startSubscription("monthly", start), at(2026, 11, 20));
    expect(resume(cancelled, at(2026, 11, 21)).cancelledEndsAt).toBeUndefined();
    expect(resume(cancelled, at(2027, 1, 1)).cancelledEndsAt).toBeDefined();
    const life = startSubscription("lifetime", start);
    expect(cancel(life, at(2026, 11, 1))).toBe(life);
  });
  it("does not mutate the original", () => {
    const sub = startSubscription("monthly", start);
    const snap = JSON.stringify(sub);
    cancel(sub, at(2026, 10, 9));
    expect(JSON.stringify(sub)).toBe(snap);
  });
});

describe("what the Subscription screen says", () => {
  const start = at(2026, 10, 7);
  it("trial", () => {
    const s = summarize(startSubscription("yearly", start), at(2026, 10, 8));
    expect(s.badge).toBe("Free trial");
    expect(s.headline).toBe(`Your free trial ends on ${formatDate(at(2026, 10, 14))}.`);
    expect(s.detail).toContain("$29.99 per year");
  });
  it("active shows the renewal date", () => {
    const s = summarize(startSubscription("monthly", start), at(2026, 11, 1));
    expect(s.badge).toBe("Active");
    expect(s.headline).toBe(`Your subscription renews on ${formatDate(at(2026, 11, 14))}.`);
    expect(s.detail).toBe("$4.99 per month.");
  });
  it("cancelled shows when it will end", () => {
    const s = summarize(cancel(startSubscription("monthly", start), at(2026, 11, 1)), at(2026, 11, 2));
    expect(s.badge).toBe("Cancelled");
    expect(s.headline).toBe(`Your subscription will end on ${formatDate(at(2026, 11, 14))}.`);
  });
  it("lifetime", () => {
    const s = summarize(startSubscription("lifetime", start), start);
    expect(s.badge).toBe("Lifetime");
    expect(s.date).toBeNull();
  });
});

describe("reminders (3, 2 and 1 days before the term ends)", () => {
  const start = at(2026, 10, 7);
  it("uses 3, 2 and 1 days at 9:00", () => {
    expect([...REMINDER_DAYS_BEFORE]).toEqual([3, 2, 1]);
    expect(REMINDER_HOUR).toBe(9);
  });
  it("a new trial gets reminders on Oct 11, 12 and 13 for the 14th", () => {
    const r = upcomingReminders(startSubscription("yearly", start), start).slice(0, 3);
    expect(r.map((x) => x.at.getDate())).toEqual([11, 12, 13]);
    expect(r.map((x) => x.daysBefore)).toEqual([3, 2, 1]);
    expect(r.every((x) => x.at.getHours() === 9 && x.at.getMinutes() === 0)).toBe(true);
    expect(r[0].title).toBe("Your free trial ends in 3 days");
    expect(r[2].title).toBe("Your free trial ends in 1 day");
    expect(r[0].body).toBe(`You'll be charged $29.99 on ${formatDate(at(2026, 10, 14))} unless you cancel before then.`);
  });
  it("renewals get renewal wording", () => {
    const sub = startSubscription("yearly", start);
    const r = upcomingReminders(sub, at(2026, 12, 1)).find((x) => x.termEnd.getFullYear() === 2027)!;
    expect(r.title).toBe("Make & Sip Premium renews in 3 days");
    expect(r.body).toBe(`Your yearly plan renews on ${formatDate(at(2027, 10, 14))} for $29.99 per year.`);
  });
  it("a cancelled plan only reminds about the end of access", () => {
    const sub = cancel(startSubscription("monthly", start), at(2026, 11, 1));
    const r = upcomingReminders(sub, at(2026, 11, 2));
    expect(r).toHaveLength(3);
    expect(r[0].title).toBe("Your Make & Sip Premium ends in 3 days");
    expect(r.every((x) => x.termEnd.getDate() === 14 && x.termEnd.getMonth() === 10)).toBe(true);
  });
  it("skips reminders that are already in the past", () => {
    const sub = startSubscription("yearly", start);
    const r = upcomingReminders(sub, at(2026, 10, 12, 10)); // after the 9:00 on the 12th
    expect(r.slice(0, 1).map((x) => x.at.getDate())).toEqual([13]);
  });
  it("lifetime never reminds", () => {
    expect(upcomingReminders(startSubscription("lifetime", start), start)).toEqual([]);
  });
  it("monthly keeps scheduling month after month, within a safe number of notifications", () => {
    const r = upcomingReminders(startSubscription("monthly", start), start);
    expect(r.length).toBeGreaterThan(30);
    expect(r.length).toBeLessThan(64); // iOS keeps at most 64 pending local notifications
    expect(r.map((x) => x.at.getTime())).toEqual([...r.map((x) => x.at.getTime())].sort((a, b) => a - b));
  });
});

describe("stored subscription validation", () => {
  it("accepts good records and rejects bad ones", () => {
    const good: Subscription = { planId: "yearly", startedAt: new Date().toISOString(), trial: true };
    expect(isSubscription(good)).toBe(true);
    expect(isSubscription({ ...good, cancelledEndsAt: new Date().toISOString() })).toBe(true);
    for (const bad of [null, 5, {}, { ...good, planId: "weekly" }, { ...good, startedAt: "nope" }, { ...good, trial: "yes" }, { ...good, cancelledEndsAt: "x" }]) {
      expect(isSubscription(bad)).toBe(false);
    }
  });
});

describe("resetting local data never touches purchases", () => {
  it("keeps the plan and the trial memory out of what Reset clears", async () => {
    const { RESET_KEYS, PURCHASE_KEYS, STORAGE_KEYS } = await import("./appData");
    expect(RESET_KEYS).not.toContain(STORAGE_KEYS.subscription);
    expect(RESET_KEYS).not.toContain(STORAGE_KEYS.trialUsed);
    expect([...PURCHASE_KEYS].sort()).toEqual([STORAGE_KEYS.subscription, STORAGE_KEYS.trialUsed].sort());
    // and it still clears the user's own data
    for (const k of [STORAGE_KEYS.pantry, STORAGE_KEYS.shopping, STORAGE_KEYS.saved, STORAGE_KEYS.equipment, STORAGE_KEYS.profile, STORAGE_KEYS.favorites]) {
      expect(RESET_KEYS).toContain(k);
    }
  });
});

describe("storage", () => {
  it("keeps the subscription in its own storage key, included in 'Reset local app data'", async () => {
    const { STORAGE_KEYS, ALL_STORAGE_KEYS } = await import("./appData");
    expect(STORAGE_KEYS.subscription).toBe("mise.subscription.v1");
    expect(STORAGE_KEYS.trialUsed).toBe("mise.trialUsed.v1");
    expect(ALL_STORAGE_KEYS).toContain(STORAGE_KEYS.trialUsed);
    expect(ALL_STORAGE_KEYS).toContain(STORAGE_KEYS.subscription);
    expect(new Set(ALL_STORAGE_KEYS).size).toBe(ALL_STORAGE_KEYS.length);
  });
});

describe("one free trial per person (no loophole)", () => {
  const t0 = at(2026, 10, 7);

  it("the first plan can start on the trial", () => {
    const a = choosePlan(NEW_ACCOUNT, "yearly", true, t0);
    expect(a.subscription?.trial).toBe(true);
    expect(a.trialUsed).toBe(true);
  });
  it("choosing to pay straight away never uses the trial up", () => {
    const a = choosePlan(NEW_ACCOUNT, "yearly", false, t0);
    expect(a.subscription?.trial).toBe(false);
    expect(a.trialUsed).toBe(false);
    expect(trialAvailable(NEW_ACCOUNT)).toBe(true);
  });
  it("lifetime has no trial and does not use it up", () => {
    const a = choosePlan(NEW_ACCOUNT, "lifetime", true, t0);
    expect(a.subscription?.trial).toBe(false);
    expect(a.trialUsed).toBe(false);
  });
  it("cancelling, ending the plan and signing up again does NOT give a second trial", () => {
    let a = choosePlan(NEW_ACCOUNT, "yearly", true, t0);
    a = { ...a, subscription: cancel(a.subscription!, at(2026, 10, 9)) };
    a = endPlan(a);
    expect(a.subscription).toBeNull();
    expect(a.trialUsed).toBe(true);
    expect(trialAvailable(a)).toBe(false);
    const again = choosePlan(a, "yearly", true, at(2026, 10, 20));
    expect(again.subscription?.trial).toBe(false);
  });
  it("trying the other plan type (yearly trial, then monthly) does NOT give another trial", () => {
    let a = choosePlan(NEW_ACCOUNT, "yearly", true, t0);
    a = endPlan(a);
    const monthly = choosePlan(a, "monthly", true, at(2026, 10, 8));
    expect(monthly.subscription?.trial).toBe(false);
    expect(monthly.subscription?.planId).toBe("monthly");
    expect(statusOf(monthly.subscription!, at(2026, 10, 8))).toBe("active");
  });
  it("switching plan during the trial keeps the original trial dates (no restart, no extension)", () => {
    const a = choosePlan(NEW_ACCOUNT, "yearly", true, t0);
    const switched = choosePlan(a, "monthly", true, at(2026, 10, 10));
    expect(switched.subscription?.planId).toBe("monthly");
    expect(switched.subscription?.startedAt).toBe(a.subscription?.startedAt);
    expect(statusOf(switched.subscription!, at(2026, 10, 10))).toBe("trial");
    const end = trialEndsAt(switched.subscription!)!;
    expect([end.getMonth() + 1, end.getDate()]).toEqual([10, 14]);
    expect(switched.trialUsed).toBe(true);
  });
  it("after the trial has run out, switching plan starts paying, never a new trial", () => {
    const a = choosePlan(NEW_ACCOUNT, "yearly", true, t0);
    const later = choosePlan(a, "monthly", true, at(2026, 11, 1));
    expect(later.subscription?.trial).toBe(false);
  });
  it("a trial-less, paid-up person can still never claim a trial later via a trial request on a paid plan", () => {
    let a = choosePlan(NEW_ACCOUNT, "monthly", false, t0); // paid straight away
    a = endPlan(a);
    // the trial was never used, so it is still genuinely available once
    expect(choosePlan(a, "yearly", true, at(2026, 11, 1)).subscription?.trial).toBe(true);
  });
  it("only one trial can ever happen in a whole run of sign-ups", () => {
    let a = NEW_ACCOUNT;
    let trials = 0;
    const plans = ["yearly", "monthly", "yearly", "monthly", "yearly"] as const;
    plans.forEach((planId, i) => {
      a = choosePlan(a, planId, true, at(2026, 10, 7 + i * 20));
      if (a.subscription?.trial) trials++;
      a = endPlan(a);
    });
    expect(trials).toBe(1);
  });
  it("does not mutate the account it is given", () => {
    const snap = JSON.stringify(NEW_ACCOUNT);
    choosePlan(NEW_ACCOUNT, "yearly", true, t0);
    expect(JSON.stringify(NEW_ACCOUNT)).toBe(snap);
  });
});

describe("letting a plan lapse and coming back", () => {
  it("resubscribing a day after it ended starts a fresh paid period from that day, with no new trial", () => {
    const start = at(2026, 10, 7);
    let a = choosePlan(NEW_ACCOUNT, "monthly", true, start); // trial -> first charge 14 Oct
    a = { ...a, subscription: cancel(a.subscription!, at(2026, 11, 20)) }; // cancelled; access ends 14 Dec
    const endsOn = new Date(a.subscription!.cancelledEndsAt!);
    expect(statusOf(a.subscription!, addDaysLocal(endsOn, 1))).toBe("expired");
    const backDay = addDaysLocal(endsOn, 1);
    const back = choosePlan(a, "monthly", true, backDay);
    expect(back.subscription?.trial).toBe(false);
    expect(statusOf(back.subscription!, backDay)).toBe("active");
    expect(back.subscription?.cancelledEndsAt).toBeUndefined();
    // the new period runs from the day they came back, not from the old date
    const next = currentTermEnd(back.subscription!, backDay)!;
    expect(next.getDate()).toBe(backDay.getDate());
    expect(next.getMonth()).toBe((backDay.getMonth() + 1) % 12);
  });
  it("a plan that is left to renew keeps renewing on the same date with no action from the user", () => {
    const sub = startSubscription("monthly", at(2026, 10, 7));
    expect(statusOf(sub, at(2026, 12, 1))).toBe("active");
    expect(currentTermEnd(sub, at(2026, 12, 1))!.getDate()).toBe(14);
  });
});

function addDaysLocal(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

describe("access (what the app is locked behind)", () => {
  const start = at(2026, 10, 7);
  it("no plan means no access", () => {
    expect(hasAccess(null, start)).toBe(false);
  });
  it("trial, active, lifetime all have access", () => {
    expect(hasAccess(startSubscription("yearly", start), at(2026, 10, 9))).toBe(true);
    expect(hasAccess(startSubscription("monthly", start), at(2026, 12, 1))).toBe(true);
    expect(hasAccess(startSubscription("lifetime", start), at(2040, 1, 1))).toBe(true);
  });
  it("a cancelled plan keeps access until its end date, then loses it", () => {
    const sub = cancel(startSubscription("monthly", start), at(2026, 11, 1));
    expect(hasAccess(sub, at(2026, 11, 13, 12))).toBe(true);
    expect(hasAccess(sub, at(2026, 11, 14, 23))).toBe(false);
  });
  it("turning off auto-renew mid-trial: access until the trial ends, nothing is charged", () => {
    const sub = cancel(startSubscription("yearly", start), at(2026, 10, 8));
    expect(statusOf(sub, at(2026, 10, 13))).toBe("cancelled");
    expect(hasAccess(sub, at(2026, 10, 13))).toBe(true);
    expect(hasAccess(sub, at(2026, 10, 15))).toBe(false);
  });
});

describe("a failed renewal payment", () => {
  const base = startSubscription("monthly", at(2026, 10, 7));
  const failedAt = at(2026, 11, 14, 12); // the first renewal fails
  it("starts a 7-day grace period with full access", () => {
    expect(GRACE_DAYS).toBe(7);
    const sub = failPayment(base, failedAt);
    expect(statusOf(sub, at(2026, 11, 16))).toBe("billing_issue");
    expect(hasAccess(sub, at(2026, 11, 16))).toBe(true);
    const end = graceEnd(sub)!;
    expect([end.getMonth() + 1, end.getDate()]).toEqual([11, 21]);
  });
  it("ends access after the grace period if it isn't fixed", () => {
    const sub = failPayment(base, failedAt);
    expect(statusOf(sub, at(2026, 11, 22))).toBe("expired");
    expect(hasAccess(sub, at(2026, 11, 22))).toBe(false);
  });
  it("is fixed by updating the payment method during the grace period", () => {
    const sub = failPayment(base, failedAt);
    const fixed = fixPayment(sub, at(2026, 11, 17));
    expect(fixed.billingFailedAt).toBeUndefined();
    expect(statusOf(fixed, at(2026, 11, 17))).toBe("active");
    // too late once the grace period is over
    expect(fixPayment(sub, at(2026, 11, 25)).billingFailedAt).toBeDefined();
  });
  it("tells the person what happened and by when", () => {
    const s = summarize(failPayment(base, failedAt), at(2026, 11, 16));
    expect(s.badge).toBe("Payment issue");
    expect(s.headline).toBe(`We couldn't charge your payment method. You still have access until ${formatDate(at(2026, 11, 21, 12))}.`);
    expect(s.detail).toContain("Update your payment method");
  });
  it("reminds 3, 2 and 1 days before access ends", () => {
    const sub = failPayment(base, failedAt);
    const r = upcomingReminders(sub, at(2026, 11, 14, 13));
    expect(r).toHaveLength(3);
    expect(r.map((x) => x.at.getDate())).toEqual([18, 19, 20]);
    expect(r[0].title).toBe("Your Make & Sip Premium access ends in 3 days");
    expect(r[0].body).toContain("couldn't charge your payment method");
  });
  it("cannot happen to lifetime or a cancelled plan, and can't be cancelled while failing", () => {
    const life = startSubscription("lifetime", at(2026, 10, 7));
    expect(failPayment(life, failedAt)).toBe(life);
    const cancelled = cancel(base, at(2026, 11, 1));
    expect(failPayment(cancelled, failedAt)).toBe(cancelled);
    const failing = failPayment(base, failedAt);
    expect(cancel(failing, at(2026, 11, 15))).toBe(failing);
  });
  it("validates in storage", () => {
    expect(isSubscription({ ...base, billingFailedAt: failedAt.toISOString() })).toBe(true);
    expect(isSubscription({ ...base, billingFailedAt: "nope" })).toBe(false);
  });
});
