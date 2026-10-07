import { describe, expect, it } from "vitest";
import { DEFAULT_PLAN, PLANS, TRIAL_DAYS, TRIAL_ONCE_NOTE, TRIAL_USED_NOTICE, trialDescription, chargeNotice, ctaLabel, formatPrice, getPlan, hasTrial, isSubscription, perMonth, priceLine, yearlySavingsPercent } from "./plans";

describe("Mise Premium plans", () => {
  it("has exactly monthly, yearly and lifetime, with the agreed prices", () => {
    expect(PLANS.map((p) => p.id).sort()).toEqual(["lifetime", "monthly", "yearly"]);
    expect(getPlan("monthly").price).toBe(4.99);
    expect(getPlan("yearly").price).toBe(29.99);
    expect(getPlan("lifetime").price).toBe(99.99);
  });
  it("has no free plan", () => {
    for (const p of PLANS) expect(p.price).toBeGreaterThan(0);
  });
  it("gives the two subscriptions a 7-day free trial and the one-time purchase none", () => {
    expect(TRIAL_DAYS).toBe(7);
    expect(hasTrial(getPlan("monthly"))).toBe(true);
    expect(hasTrial(getPlan("yearly"))).toBe(true);
    expect(getPlan("monthly").trialDays).toBe(7);
    expect(hasTrial(getPlan("lifetime"))).toBe(false);
    expect(isSubscription(getPlan("lifetime"))).toBe(false);
    expect(isSubscription(getPlan("yearly"))).toBe(true);
  });
  it("opens on the yearly plan", () => {
    expect(DEFAULT_PLAN).toBe("yearly");
  });
  it("formats prices", () => {
    expect(formatPrice(4.99)).toBe("$4.99");
    expect(formatPrice(100)).toBe("$100.00");
  });
  it("shows the yearly plan as $2.50 a month and saves 50% over monthly", () => {
    expect(perMonth(getPlan("yearly"))).toBe(2.5);
    expect(perMonth(getPlan("monthly"))).toBeNull();
    expect(perMonth(getPlan("lifetime"))).toBeNull();
    expect(yearlySavingsPercent()).toBe(50);
  });
  it("describes each price clearly", () => {
    expect(priceLine(getPlan("monthly"))).toBe("$4.99 / month");
    expect(priceLine(getPlan("yearly"))).toBe("$29.99 / year");
    expect(priceLine(getPlan("lifetime"))).toBe("$99.99 one time");
  });
  it("labels the button by what the user is really buying", () => {
    expect(ctaLabel(getPlan("yearly"), true)).toBe("Start 7-day free trial");
    expect(ctaLabel(getPlan("monthly"), true)).toBe("Start 7-day free trial");
    expect(ctaLabel(getPlan("yearly"), false)).toBe("Subscribe · $29.99 / year");
    expect(ctaLabel(getPlan("monthly"), false)).toBe("Subscribe · $4.99 / month");
    expect(ctaLabel(getPlan("lifetime"), false)).toBe("Get lifetime access · $99.99");
    expect(ctaLabel(getPlan("lifetime"), true)).toBe("Get lifetime access · $99.99"); // lifetime never has a trial
  });
  it("always tells the user what is charged, and when", () => {
    expect(chargeNotice(getPlan("yearly"), true)).toBe("7 days free, then $29.99 per year. Renews automatically until you cancel.");
    expect(chargeNotice(getPlan("monthly"), true)).toBe("7 days free, then $4.99 per month. Renews automatically until you cancel.");
    expect(chargeNotice(getPlan("yearly"), false)).toBe("You'll be charged $29.99 today, then every year. Renews automatically until you cancel.");
    expect(chargeNotice(getPlan("lifetime"), true)).toBe("One payment of $99.99. No subscription, no renewals.");
  });
  it("the trial section explains it and says a charge is added after the 7 days", () => {
    const yearly = trialDescription(getPlan("yearly"));
    expect(yearly).toContain("free for 7 days");
    expect(yearly).toContain("After the 7 days, a charge of $29.99 per year is added");
    expect(yearly).toContain("unless you cancel before the trial ends");
    expect(trialDescription(getPlan("monthly"))).toContain("$4.99 per month");
  });
  it("says the trial can only be used once", () => {
    expect(TRIAL_USED_NOTICE).toContain("only be used once");
    expect(TRIAL_ONCE_NOTE).toContain("One free trial per person");
  });
  it("rejects an unknown plan", () => {
    expect(() => getPlan("weekly" as never)).toThrow();
  });
});
