import { describe, expect, it } from "vitest";
import {
  NEW_ACCOUNT,
  addDays,
  cancel,
  choosePlan,
  currentTermEnd,
  endPlan,
  failPayment,
  fixPayment,
  hasAccess,
  resume,
  statusOf,
  trialAvailable,
  upcomingReminders,
  type Account,
} from "./subscription";
import type { PlanId } from "./plans";

/** Small deterministic random generator so a failure can be reproduced. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const PLANS: PlanId[] = ["monthly", "yearly", "lifetime"];

describe("stress test: thousands of random sequences of real-world actions", () => {
  it("never breaks the rules, whatever order people do things in", { timeout: 120_000 }, () => {
    for (let seed = 1; seed <= 400; seed++) {
      const rand = rng(seed);
      let account: Account = NEW_ACCOUNT;
      let now = new Date(2026, 9, 7, 12);
      let trialsStarted = 0;
      let wasUsed = false;

      for (let step = 0; step < 60; step++) {
        const action = Math.floor(rand() * 8);
        const sub = account.subscription;
        switch (action) {
          case 0:
          case 1: {
            const planId = PLANS[Math.floor(rand() * 3)];
            const wantsTrial = rand() < 0.7;
            const before = account.trialUsed;
            const next = choosePlan(account, planId, wantsTrial, now);
            // a NEW trial may only be granted if none had ever been used
            if (!before && next.trialUsed) trialsStarted++;
            // once the trial has been used, any plan "on trial" can only be the ORIGINAL trial carried over
            // by a switch (same start date) — never a fresh one
            if (before && next.subscription?.trial) {
              expect(sub && next.subscription.startedAt === sub.startedAt, `seed ${seed} step ${step}: a fresh trial was granted after the first`).toBe(true);
            }
            account = next;
            break;
          }
          case 2:
            if (sub) account = { ...account, subscription: cancel(sub, now) };
            break;
          case 3:
            if (sub) account = { ...account, subscription: resume(sub, now) };
            break;
          case 4:
            if (sub) account = { ...account, subscription: failPayment(sub, now) };
            break;
          case 5:
            if (sub) account = { ...account, subscription: fixPayment(sub, now) };
            break;
          case 6:
            account = endPlan(account);
            break;
          default:
            now = addDays(now, Math.floor(rand() * 45) + 1); // time passes
        }

        // --- invariants that must always hold ---
        // 1. the trial memory never goes backwards
        if (wasUsed) expect(account.trialUsed, `seed ${seed} step ${step}: trial memory was cleared`).toBe(true);
        wasUsed = account.trialUsed;
        // 2. at most one trial ever
        expect(trialsStarted, `seed ${seed} step ${step}: more than one trial`).toBeLessThanOrEqual(1);
        // 3. a trial can only be on if it was marked used
        if (account.subscription?.trial) expect(account.trialUsed).toBe(true);
        // 4. trial is never offered again once used
        if (account.trialUsed) expect(trialAvailable(account)).toBe(false);

        const s = account.subscription;
        const access = hasAccess(s, now);
        if (!s) {
          expect(access).toBe(false);
          continue;
        }
        const status = statusOf(s, now);
        // 5. access matches status exactly
        expect(access, `seed ${seed} step ${step}: access/status mismatch (${status})`).toBe(status !== "expired");
        // 6. lifetime never expires or reminds
        if (s.planId === "lifetime") {
          expect(status).toBe("lifetime");
          expect(upcomingReminders(s, now)).toEqual([]);
        }
        // 7. a running plan's next end is in the future
        if (status === "trial" || status === "active" || status === "billing_issue" || status === "cancelled") {
          const end = currentTermEnd(s, now);
          expect(end, `seed ${seed} step ${step}: ${status} has no end`).not.toBeNull();
          expect(end!.getTime(), `seed ${seed} step ${step}: ${status} term already over`).toBeGreaterThan(now.getTime());
        }
        // 8. reminders are in the future, in order, 3/2/1 days before a term end, and never too many for iOS
        const reminders = upcomingReminders(s, now);
        expect(reminders.length).toBeLessThan(64);
        for (let i = 0; i < reminders.length; i++) {
          expect(reminders[i].at.getTime()).toBeGreaterThan(now.getTime());
          expect([3, 2, 1]).toContain(reminders[i].daysBefore);
          expect(reminders[i].at.getHours()).toBe(9);
          expect(reminders[i].at.getTime()).toBeLessThan(reminders[i].termEnd.getTime());
          if (i > 0) expect(reminders[i].at.getTime()).toBeGreaterThanOrEqual(reminders[i - 1].at.getTime());
        }
        // 9. an expired plan sends nothing
        if (status === "expired") expect(reminders.filter((r) => r.termEnd > now)).toEqual(reminders);
      }
    }
  });
});
