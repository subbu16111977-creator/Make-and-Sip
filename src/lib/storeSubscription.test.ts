import { describe, expect, it } from "vitest";
import { currentTermEnd, statusOf } from "@/lib/subscription";
import { planFromProductId, subscriptionFromEntitlement, type StoreEntitlement } from "@/lib/storeSubscription";

const base: StoreEntitlement = {
  productIdentifier: "mise_premium:yearly",
  periodType: "NORMAL",
  latestPurchaseDate: "2026-10-01T10:00:00.000Z",
  expirationDate: "2027-10-01T10:00:00.000Z",
  willRenew: true,
  billingIssueDetectedAt: null,
};

describe("planFromProductId", () => {
  it("recognises the three plans", () => {
    expect(planFromProductId("mise_premium:yearly")).toBe("yearly");
    expect(planFromProductId("mise_premium:monthly")).toBe("monthly");
    expect(planFromProductId("mise_lifetime")).toBe("lifetime");
    expect(planFromProductId("something_else")).toBeNull();
  });
});

describe("subscriptionFromEntitlement", () => {
  it("returns null with no entitlement or an unknown product", () => {
    expect(subscriptionFromEntitlement(null)).toBeNull();
    expect(subscriptionFromEntitlement({ ...base, productIdentifier: "x" })).toBeNull();
  });
  it("maps lifetime", () => {
    const sub = subscriptionFromEntitlement({ ...base, productIdentifier: "mise_lifetime", expirationDate: null });
    expect(sub && statusOf(sub, new Date("2030-01-01"))).toBe("lifetime");
  });
  it("lands the next renewal on the store's expiry date", () => {
    const sub = subscriptionFromEntitlement(base)!;
    expect(currentTermEnd(sub, new Date("2026-12-01"))?.toISOString()).toBe(base.expirationDate);
    expect(statusOf(sub, new Date("2026-12-01"))).toBe("active");
  });
  it("maps a trial and its end date", () => {
    const e = { ...base, productIdentifier: "mise_premium:monthly", periodType: "TRIAL", expirationDate: "2026-10-08T10:00:00.000Z" };
    const sub = subscriptionFromEntitlement(e)!;
    expect(sub.trial).toBe(true);
    expect(statusOf(sub, new Date("2026-10-03"))).toBe("trial");
    expect(currentTermEnd(sub, new Date("2026-10-03"))?.toISOString()).toBe(e.expirationDate);
  });
  it("maps a cancelled plan (auto-renew off) as cancelled until expiry", () => {
    const sub = subscriptionFromEntitlement({ ...base, willRenew: false })!;
    expect(statusOf(sub, new Date("2027-01-01"))).toBe("cancelled");
    expect(statusOf(sub, new Date("2027-10-02"))).toBe("expired");
  });
  it("maps a billing issue", () => {
    const sub = subscriptionFromEntitlement({ ...base, billingIssueDetectedAt: "2027-10-01T10:00:00.000Z" })!;
    expect(statusOf(sub, new Date("2027-10-03"))).toBe("billing_issue");
  });
});
