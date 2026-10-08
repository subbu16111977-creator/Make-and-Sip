import { Platform } from "react-native";
import { ENTITLEMENT_ID, subscriptionFromEntitlement, type StoreEntitlement } from "@/lib/storeSubscription";
import type { PlanId } from "@/lib/plans";
import type { Subscription } from "@/lib/subscription";

/**
 * Real purchases through RevenueCat (which talks to Google Play). Only works in a phone build with a
 * RevenueCat key set; on the web, or without a key, `billingLive` is false and the app uses its local
 * test mode instead. The key is a public app key (not a secret).
 */
const API_KEY = process.env.EXPO_PUBLIC_REVENUECAT_KEY ?? "";

export const billingLive = Platform.OS !== "web" && API_KEY.length > 0;

/** What the store knows about the person: their plan (if any) and whether they've ever bought anything (which uses up the free trial). */
export interface StoreState {
  subscription: Subscription | null;
  everPurchased: boolean;
}

type Purchases = typeof import("react-native-purchases").default;
let purchasesPromise: Promise<Purchases> | null = null;

function purchases(): Promise<Purchases> {
  purchasesPromise ??= import("react-native-purchases").then((m) => {
    const P = m.default;
    P.configure({ apiKey: API_KEY });
    return P;
  });
  return purchasesPromise;
}

interface RawCustomerInfo {
  entitlements: { active: Record<string, unknown> };
  allPurchasedProductIdentifiers: string[];
}

function toState(info: RawCustomerInfo): StoreState {
  const e = info.entitlements.active[ENTITLEMENT_ID] as StoreEntitlement | undefined;
  return { subscription: subscriptionFromEntitlement(e), everPurchased: info.allPurchasedProductIdentifiers.length > 0 };
}

export async function fetchStoreState(): Promise<StoreState> {
  const P = await purchases();
  return toState(await P.getCustomerInfo());
}

/** Calls `onChange` whenever the store reports a change (purchase, renewal, cancellation, refund). Returns the unsubscribe. */
export function watchStoreState(onChange: (s: StoreState) => void): () => void {
  let stop = () => {};
  let cancelled = false;
  void purchases().then((P) => {
    if (cancelled) return;
    const listener = (info: RawCustomerInfo) => onChange(toState(info));
    P.addCustomerInfoUpdateListener(listener);
    stop = () => P.removeCustomerInfoUpdateListener(listener);
  });
  return () => {
    cancelled = true;
    stop();
  };
}

const PACKAGE_FOR_PLAN: Record<PlanId, string> = { monthly: "MONTHLY", yearly: "ANNUAL", lifetime: "LIFETIME" };

export type PurchaseResult = { ok: true; state: StoreState } | { ok: false; cancelled: boolean; message: string };

/** Starts the Google Play purchase sheet for a plan. Play decides whether the free trial applies. */
export async function purchasePlan(planId: PlanId): Promise<PurchaseResult> {
  try {
    const P = await purchases();
    const offerings = await P.getOfferings();
    const pkg = offerings.current?.availablePackages.find((p) => p.packageType === PACKAGE_FOR_PLAN[planId]);
    if (!pkg) return { ok: false, cancelled: false, message: "That plan isn't available right now. Please try again later." };
    const { customerInfo } = await P.purchasePackage(pkg);
    return { ok: true, state: toState(customerInfo) };
  } catch (e) {
    const err = e as { userCancelled?: boolean; message?: string };
    if (err.userCancelled) return { ok: false, cancelled: true, message: "" };
    return { ok: false, cancelled: false, message: err.message ?? "The purchase didn't go through." };
  }
}

export async function restorePurchases(): Promise<PurchaseResult> {
  try {
    const P = await purchases();
    return { ok: true, state: toState(await P.restorePurchases()) };
  } catch (e) {
    return { ok: false, cancelled: false, message: (e as Error).message ?? "Couldn't restore purchases." };
  }
}
