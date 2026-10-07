import { describe, expect, it } from "vitest";
import { DEFAULT_PLAN, PLANS, TRIAL_DAYS, chargeNotice, ctaLabel, formatPrice, getPlan, hasTrial, isSubscription, perMonth, priceLine, yearlySavingsPercent } from "./plans";

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
    expect(ctaLabel(getPlan("yearly"))).toBe("Start 7-day free trial");
    expect(ctaLabel(getPlan("monthly"))).toBe("Start 7-day free trial");
    expect(ctaLabel(getPlan("lifetime"))).toBe("Get lifetime access · $99.99");
  });
  it("always tells the user what is charged, and when", () => {
    expect(chargeNotice(getPlan("yearly"))).toBe("7 days free, then $29.99 per year. Renews automatically until you cancel.");
    expect(chargeNotice(getPlan("monthly"))).toBe("7 days free, then $4.99 per month. Renews automatically until you cancel.");
    expect(chargeNotice(getPlan("lifetime"))).toBe("One payment of $99.99. No subscription, no renewals.");
  });
  it("rejects an unknown plan", () => {
    expect(() => getPlan("weekly" as never)).toThrow();
  });
});
