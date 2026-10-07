import React from "react";
import { PaywallView } from "@/components/PaywallView";

/** The plans page, opened from Profile or "Change plan". It can be closed. */
export default function PaywallScreen() {
  return <PaywallView dismissible />;
}
