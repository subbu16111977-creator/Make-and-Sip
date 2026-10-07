import { describe, expect, it } from "vitest";
import {
  REMINDER_DAYS_BEFORE,
  REMINDER_HOUR,
  addMonths,
  cancel,
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
    expect(r.title).toBe("Mise Premium renews in 3 days");
    expect(r.body).toBe(`Your yearly plan renews on ${formatDate(at(2027, 10, 14))} for $29.99 per year.`);
  });
  it("a cancelled plan only reminds about the end of access", () => {
    const sub = cancel(startSubscription("monthly", start), at(2026, 11, 1));
    const r = upcomingReminders(sub, at(2026, 11, 2));
    expect(r).toHaveLength(3);
    expect(r[0].title).toBe("Your Mise Premium ends in 3 days");
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

describe("storage", () => {
  it("keeps the subscription in its own storage key, included in 'Reset local app data'", async () => {
    const { STORAGE_KEYS, ALL_STORAGE_KEYS } = await import("./appData");
    expect(STORAGE_KEYS.subscription).toBe("mise.subscription.v1");
    expect(ALL_STORAGE_KEYS).toContain(STORAGE_KEYS.subscription);
    expect(new Set(ALL_STORAGE_KEYS).size).toBe(ALL_STORAGE_KEYS.length);
  });
});
