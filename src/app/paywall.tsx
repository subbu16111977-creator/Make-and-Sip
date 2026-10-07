import React, { useMemo, useState } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Logo } from "@/components/Logo";
import { CheckIcon, CloseIcon } from "@/components/icons";
import { colors, layout, radii, spacing, type as typeScale } from "@/theme";
import { recipes } from "@/data/recipes";
import { useSubscription } from "@/context/SubscriptionContext";
import {
  DEFAULT_PLAN,
  PLANS,
  chargeNotice,
  ctaLabel,
  formatPrice,
  getPlan,
  hasTrial,
  perMonth,
  priceLine,
  yearlySavingsPercent,
  type Plan,
  type PlanId,
} from "@/lib/plans";

const PREVIEW_NOTICE = "Test mode: this simulates a plan on this device. Real purchases get connected before launch, and nothing is charged.";

function cancelText(): string {
  if (Platform.OS === "ios") return "Cancel anytime in your Apple ID settings.";
  if (Platform.OS === "android") return "Cancel anytime in Google Play.";
  return "Cancel anytime in your App Store or Google Play settings.";
}

/** Secondary line under a plan's title. */
function planSubtitle(plan: Plan): string {
  if (plan.id === "yearly") return `${formatPrice(perMonth(plan) ?? 0)} / month, billed yearly`;
  if (plan.id === "monthly") return "Flexible, cancel anytime";
  return "Pay once, yours forever";
}

function PlanCard({ plan, selected, onSelect }: { plan: Plan; selected: boolean; onSelect: () => void }) {
  const badge = plan.id === "yearly" ? `BEST VALUE · SAVE ${yearlySavingsPercent()}%` : plan.id === "lifetime" ? "NO RENEWALS" : null;
  return (
    <Pressable
      onPress={onSelect}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={`${plan.title}, ${priceLine(plan)}${hasTrial(plan) ? `, ${plan.trialDays} day free trial` : ""}`}
      style={[styles.plan, selected && styles.planSelected]}
    >
      {badge ? (
        <View style={[styles.badge, plan.id === "lifetime" && styles.badgeMuted]}>
          <Text style={[styles.badgeText, plan.id === "lifetime" && styles.badgeTextMuted]}>{badge}</Text>
        </View>
      ) : null}
      <View style={[styles.radio, selected && styles.radioSelected]}>{selected ? <View style={styles.radioDot} /> : null}</View>
      <View style={styles.planText}>
        <Text style={styles.planTitle}>{plan.title}</Text>
        <Text style={styles.planSub}>{planSubtitle(plan)}</Text>
        {hasTrial(plan) ? <Text style={styles.planTrial}>{plan.trialDays} days free</Text> : null}
      </View>
      <View style={styles.planPriceCol}>
        <Text style={styles.planPrice}>{formatPrice(plan.price)}</Text>
        <Text style={styles.planPer}>{plan.period === "once" ? "one time" : `per ${plan.period}`}</Text>
      </View>
    </Pressable>
  );
}

/**
 * The Mise Premium paywall. This is the page design only: choosing a plan and pressing the button
 * show a preview notice and never start a purchase. There is no free plan, so once real purchases
 * are connected this page will sit between the tutorial and the app.
 */
export default function PaywallScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<PlanId>(DEFAULT_PLAN);
  const [notice, setNotice] = useState<string | null>(null);
  const { startTestSubscription } = useSubscription();
  const plan = getPlan(selected);

  const cuisineCount = useMemo(() => new Set(recipes.map((r) => r.cuisine)).size, []);
  const benefits = [
    `All ${recipes.length} dishes across ${cuisineCount} cuisines`,
    "Matched to your pantry and equipment",
    "Best for you: picks from your tastes",
    "Shopping list, favourites and saved dishes",
  ];

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} hitSlop={10} accessibilityRole="button" accessibilityLabel="Close" style={styles.close}>
          <CloseIcon size={18} color={colors.espresso} />
        </Pressable>
      </View>

      <ScrollView style={styles.flex} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Logo variant="mark" height={52} />
          <Text style={styles.eyebrow}>MISE PREMIUM</Text>
          <Text style={styles.title} accessibilityRole="header">
            Cook with what you have
          </Text>
          <Text style={styles.sub}>Try everything free for {getPlan("yearly").trialDays} days. Cancel anytime.</Text>
        </View>

        <View style={styles.benefits}>
          {benefits.map((b) => (
            <View key={b} style={styles.benefitRow}>
              <View style={styles.tick}>
                <CheckIcon size={12} color={colors.cream} strokeWidth={2.6} />
              </View>
              <Text style={styles.benefitText}>{b}</Text>
            </View>
          ))}
        </View>

        <View accessibilityRole="radiogroup" style={styles.plans}>
          {PLANS.map((p) => (
            <PlanCard
              key={p.id}
              plan={p}
              selected={selected === p.id}
              onSelect={() => {
                setSelected(p.id);
                setNotice(null);
              }}
            />
          ))}
          <Text style={styles.cancel}>{plan.period === "once" ? "Your purchase is tied to your App Store or Google Play account." : cancelText()}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {notice ? <Text style={styles.notice}>{notice}</Text> : <Text style={styles.testTag}>{PREVIEW_NOTICE}</Text>}
        <Pressable
          onPress={async () => {
            await startTestSubscription(selected);
            router.replace("/subscription");
          }}
          accessibilityRole="button"
          accessibilityLabel={ctaLabel(plan)}
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
        >
          <Text style={styles.ctaText}>{ctaLabel(plan)}</Text>
        </Pressable>
        <Text style={styles.charge}>{chargeNotice(plan)}</Text>
        <View style={styles.links}>
          <Pressable onPress={() => setNotice(PREVIEW_NOTICE)} accessibilityRole="button" accessibilityLabel="Restore purchases">
            <Text style={styles.link}>Restore purchases</Text>
          </Pressable>
          <Text style={styles.linkDot}>·</Text>
          <Pressable onPress={() => setNotice("Terms of Use and Privacy Policy links get added before launch.")} accessibilityRole="button" accessibilityLabel="Terms of Use">
            <Text style={styles.link}>Terms</Text>
          </Pressable>
          <Text style={styles.linkDot}>·</Text>
          <Pressable onPress={() => setNotice("Terms of Use and Privacy Policy links get added before launch.")} accessibilityRole="button" accessibilityLabel="Privacy Policy">
            <Text style={styles.link}>Privacy</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  flex: { flex: 1 },
  topBar: { flexDirection: "row", justifyContent: "flex-start", paddingHorizontal: layout.screenPadding, paddingTop: spacing.sm },
  close: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center", backgroundColor: colors.paper, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.hairlineStrong },
  content: { paddingHorizontal: layout.screenPadding, paddingBottom: spacing.lg, paddingTop: spacing.xs, gap: spacing.lg, width: "100%", maxWidth: layout.maxContentWidth, alignSelf: "center" },
  hero: { alignItems: "center", gap: 6, paddingTop: 0 },
  eyebrow: { ...typeScale.eyebrow, color: colors.burntOrange, marginTop: spacing.sm },
  title: { ...typeScale.display, fontSize: 26, lineHeight: 32, color: colors.espresso, textAlign: "center" },
  sub: { ...typeScale.bodySmall, color: colors.espressoMuted, textAlign: "center" },
  benefits: { gap: spacing.sm, padding: spacing.md, borderRadius: radii.xl, backgroundColor: colors.paper, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.hairline },
  benefitRow: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  tick: { width: 20, height: 20, borderRadius: 10, backgroundColor: colors.burntOrange, alignItems: "center", justifyContent: "center" },
  benefitText: { ...typeScale.bodySmall, flex: 1, color: colors.espresso },
  plans: { gap: spacing.md, paddingTop: spacing.xs },
  plan: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radii.xl,
    backgroundColor: colors.paper,
    borderWidth: 1.5,
    borderColor: colors.hairline,
  },
  planSelected: { borderColor: colors.burntOrange, backgroundColor: colors.parchment },
  badge: { position: "absolute", top: -10, left: spacing.lg, paddingVertical: 3, paddingHorizontal: spacing.sm, borderRadius: radii.pill, backgroundColor: colors.burntOrange },
  badgeMuted: { backgroundColor: colors.parchment, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.hairlineStrong },
  badgeText: { ...typeScale.caption, fontSize: 10, fontWeight: "700", letterSpacing: 0.6, color: colors.cream },
  badgeTextMuted: { color: colors.espressoMuted },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: colors.hairlineStrong, alignItems: "center", justifyContent: "center" },
  radioSelected: { borderColor: colors.burntOrange },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.burntOrange },
  planText: { flex: 1, gap: 2 },
  planTitle: { ...typeScale.label, fontSize: 16, color: colors.espresso },
  planSub: { ...typeScale.bodySmall, color: colors.espressoMuted },
  planTrial: { ...typeScale.caption, color: colors.sageOlive, fontWeight: "600" },
  planPriceCol: { alignItems: "flex-end" },
  planPrice: { ...typeScale.headline, fontSize: 20, lineHeight: 24, color: colors.espresso },
  planPer: { ...typeScale.caption, color: colors.espressoMuted },
  footer: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    gap: spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.hairline,
    backgroundColor: colors.cream,
    width: "100%",
    maxWidth: layout.maxContentWidth,
    alignSelf: "center",
  },
  testTag: { ...typeScale.caption, color: colors.espressoFaint, textAlign: "center" },
  notice: { ...typeScale.bodySmall, color: colors.burntOrange, textAlign: "center" },
  cta: { backgroundColor: colors.burntOrange, borderRadius: radii.lg, paddingVertical: 16, alignItems: "center" },
  ctaPressed: { opacity: 0.85 },
  ctaText: { ...typeScale.button, fontSize: 16, color: colors.cream },
  charge: { ...typeScale.caption, color: colors.espresso, textAlign: "center" },
  cancel: { ...typeScale.caption, color: colors.espressoMuted, textAlign: "center", marginTop: spacing.xs },
  links: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: spacing.sm, paddingTop: 2 },
  link: { ...typeScale.caption, color: colors.espressoMuted, textDecorationLine: "underline" },
  linkDot: { ...typeScale.caption, color: colors.espressoFaint },
});
