import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Logo } from "@/components/Logo";
import { CheckIcon, CloseIcon } from "@/components/icons";
import { colors, layout, radii, spacing, type as typeScale } from "@/theme";
import { useAppDimensions } from "@/lib/useAppDimensions";
import { useSubscription } from "@/context/SubscriptionContext";
import {
  PLANS,
  TRIAL_DAYS,
  TRIAL_ONCE_NOTE,
  TRIAL_USED_NOTICE,
  chargeNotice,
  ctaLabel,
  formatPrice,
  getPlan,
  perMonth,
  priceLine,
  trialDescription,
  yearlySavingsPercent,
  type Plan,
  type PlanId,
} from "@/lib/plans";
import { formatDate, statusOf, summarize, trialEndsAt } from "@/lib/subscription";

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
      accessibilityLabel={`${plan.title}, ${priceLine(plan)}`}
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
        {plan.period !== "once" ? <Text style={styles.planTrial}>Charged today</Text> : null}
      </View>
      <View style={styles.planPriceCol}>
        <Text style={styles.planPrice}>{formatPrice(plan.price)}</Text>
        <Text style={styles.planPer}>{plan.period === "once" ? "one time" : `per ${plan.period}`}</Text>
      </View>
    </Pressable>
  );
}

type Choice = "trial" | PlanId;

/** The "7-day free trial" section: what it is, what happens after, and which plan it turns into. */
function TrialCard({
  selected,
  available,
  then,
  onThen,
  onSelect,
}: {
  selected: boolean;
  available: boolean;
  then: PlanId;
  onThen: (id: PlanId) => void;
  onSelect: () => void;
}) {
  const thenPlan = getPlan(then);
  return (
    <Pressable
      onPress={available ? onSelect : undefined}
      disabled={!available}
      accessibilityRole="radio"
      accessibilityState={{ selected: selected && available, disabled: !available }}
      accessibilityLabel={`${TRIAL_DAYS}-day free trial. ${available ? trialDescription(thenPlan) : TRIAL_USED_NOTICE}`}
      style={[styles.plan, styles.trialCard, selected && available && styles.planSelected, !available && styles.trialOff]}
    >
      <View style={[styles.badge, !available && styles.badgeMuted]}>
        <Text style={[styles.badgeText, !available && styles.badgeTextMuted]}>{available ? "TRY IT FIRST" : "ALREADY USED"}</Text>
      </View>
      <View style={styles.trialHead}>
        <View style={[styles.radio, selected && available && styles.radioSelected]}>{selected && available ? <View style={styles.radioDot} /> : null}</View>
        <Text style={styles.trialTitle}>{TRIAL_DAYS}-day free trial</Text>
        <Text style={styles.trialFree}>{available ? "Free" : ""}</Text>
      </View>
      <Text style={styles.trialDesc}>{available ? trialDescription(thenPlan) : TRIAL_USED_NOTICE}</Text>
      {available ? (
        <View style={styles.thenRow}>
          <Text style={styles.thenLabel}>After the trial, bill me</Text>
          <View style={styles.thenChips}>
            {(["yearly", "monthly"] as const).map((id) => {
              const p = getPlan(id);
              const on = then === id;
              return (
                <Pressable
                  key={id}
                  onPress={() => {
                    onThen(id);
                    onSelect();
                  }}
                  accessibilityRole="button"
                  accessibilityState={{ selected: on }}
                  accessibilityLabel={`After the trial, bill ${priceLine(p)}`}
                  style={[styles.thenChip, on && styles.thenChipOn]}
                >
                  <Text style={[styles.thenChipText, on && styles.thenChipTextOn]}>
                    {p.title} · {priceLine(p)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <Text style={styles.trialOnce}>{TRIAL_ONCE_NOTE}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

/**
 * The Make & Sip Premium paywall. This is the page design only: choosing a plan and pressing the button
 * show a preview notice and never start a purchase. There is no free plan, so once real purchases
 * are connected this page will sit between the tutorial and the app.
 */
export function PaywallView({ dismissible = true }: { dismissible?: boolean }) {
  const router = useRouter();
  const { height: screenHeight } = useAppDimensions();
  const compact = screenHeight < 700; // short phones: tighter header so the plans stay in view
  const { subscription, trialAvailable, hasAccess, startTestSubscription, resetTestState, billingLive, purchase, restore } = useSubscription();
  const lapsed = subscription && !hasAccess ? summarize(subscription, new Date()) : null;
  const [choice, setChoice] = useState<Choice>(trialAvailable ? "trial" : "yearly");
  const [thenPlan, setThenPlan] = useState<PlanId>("yearly");
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // The trial can't be chosen once it has been used (or if there is already a plan).
  const activeChoice: Choice = choice === "trial" && !trialAvailable ? "yearly" : choice;
  const withTrial = activeChoice === "trial";
  const planId: PlanId = withTrial ? thenPlan : (activeChoice as PlanId);
  const plan = getPlan(planId);

  // Switching while already in the free trial keeps that trial (it doesn't restart).
  const inTrial = subscription ? statusOf(subscription, new Date()) === "trial" : false;
  const keepsTrial = inTrial && !withTrial && planId !== "lifetime";
  const trialEnd = subscription ? trialEndsAt(subscription) : null;
  const buttonLabel = keepsTrial ? `Switch to ${plan.title}` : ctaLabel(plan, withTrial);
  const chargeLine = keepsTrial
    ? `Your free trial continues until ${trialEnd ? formatDate(trialEnd) : "it ends"}. Then ${formatPrice(plan.price)} per ${plan.period}, renewing automatically until you cancel.`
    : chargeNotice(plan, withTrial);

  const benefits = [
    "Every drink: coffee, tea, shakes, smoothies, mocktails and more",
    "Matched to your pantry and equipment",
    "Best for you: picks from your tastes",
    "Shopping list, favourites and saved drinks",
  ];

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.topBar}>
        {dismissible ? (
          <Pressable onPress={() => router.back()} hitSlop={10} accessibilityRole="button" accessibilityLabel="Close" style={styles.close}>
            <CloseIcon size={18} color={colors.espresso} />
          </Pressable>
        ) : (
          <View style={styles.closeSpace} />
        )}
      </View>

      <ScrollView style={styles.flex} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {lapsed ? (
          <View style={styles.lapsed}>
            <Text style={styles.lapsedTitle}>{lapsed.headline}</Text>
            <Text style={styles.lapsedBody}>Pick a plan to continue. Your pantry, favourites and everything else you saved are safe and waiting.</Text>
          </View>
        ) : null}

        <View style={[styles.hero, compact && styles.heroCompact]}>
          <Logo variant="mark" height={compact ? 36 : 52} />
          <Text style={styles.eyebrow}>MAKE & SIP PREMIUM</Text>
          <Text style={[styles.title, compact && styles.titleCompact]} accessibilityRole="header">
            Make it with what you have
          </Text>
          <Text style={styles.sub}>{trialAvailable ? `Try everything free for ${TRIAL_DAYS} days. Cancel anytime.` : "Choose the plan that suits you."}</Text>
        </View>

        <View accessibilityRole="radiogroup" style={styles.plans}>
          <TrialCard
            selected={activeChoice === "trial"}
            available={trialAvailable}
            then={thenPlan}
            onThen={setThenPlan}
            onSelect={() => {
              setChoice("trial");
              setNotice(null);
            }}
          />
          {PLANS.map((p) => (
            <PlanCard
              key={p.id}
              plan={p}
              selected={activeChoice === p.id}
              onSelect={() => {
                setChoice(p.id);
                setNotice(null);
              }}
            />
          ))}
          <Text style={styles.cancel}>{plan.period === "once" ? "Your purchase is tied to your App Store or Google Play account." : cancelText()}</Text>
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

        {billingLive ? null : (
          <>
        <Text style={styles.testTag}>{PREVIEW_NOTICE}</Text>
        {/* TEST MODE ONLY — remove before launch. Lets the trial be tried again while developing. */}
        <Pressable
          onPress={() => {
            resetTestState();
            setChoice("trial");
          }}
          accessibilityRole="button"
          accessibilityLabel="Test mode only: reset the free trial and plan"
          style={styles.testReset}
        >
          <Text style={styles.testResetText}>Test mode only: reset free trial and plan</Text>
        </Pressable>
          </>
        )}
      </ScrollView>

      <View style={styles.footer}>
        {notice ? <Text style={styles.notice}>{notice}</Text> : null}
        <Pressable
          onPress={async () => {
            if (busy) return; // a second tap while the first is still going through must do nothing
            setBusy(true);
            try {
              if (billingLive) {
                const error = await purchase(planId);
                setNotice(error ?? "");
                if (!error && dismissible) router.replace("/subscription");
              } else {
                await startTestSubscription(planId, withTrial);
                if (dismissible) router.replace("/subscription");
              }
            } finally {
              setBusy(false);
            }
          }}
          disabled={busy}
          accessibilityRole="button"
          accessibilityState={{ busy, disabled: busy }}
          accessibilityLabel={buttonLabel}
          style={({ pressed }) => [styles.cta, (pressed || busy) && styles.ctaPressed]}
        >
          <Text style={styles.ctaText}>{buttonLabel}</Text>
        </Pressable>
        <Text style={styles.charge}>{chargeLine}</Text>
        <View style={styles.links}>
          <Pressable onPress={async () => setNotice(billingLive ? await restore() : PREVIEW_NOTICE)} accessibilityRole="button" accessibilityLabel="Restore purchases">
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
  closeSpace: { width: 44, height: 44 },
  close: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center", backgroundColor: colors.paper, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.hairlineStrong },
  content: { paddingHorizontal: layout.screenPadding, paddingBottom: spacing.lg, paddingTop: spacing.xs, gap: spacing.lg, width: "100%", maxWidth: layout.maxContentWidth, alignSelf: "center" },
  heroCompact: { gap: 2 },
  titleCompact: { fontSize: 22, lineHeight: 27 },
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
  badgeText: { ...typeScale.caption, fontSize: 11, fontWeight: "700", letterSpacing: 0.5, color: colors.cream },
  badgeTextMuted: { color: colors.espressoMuted },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: colors.hairlineStrong, alignItems: "center", justifyContent: "center" },
  radioSelected: { borderColor: colors.burntOrange },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.burntOrange },
  planText: { flex: 1, gap: 2 },
  planTitle: { ...typeScale.label, fontSize: 16, color: colors.espresso },
  planSub: { ...typeScale.bodySmall, color: colors.espressoMuted },
  planTrial: { ...typeScale.caption, color: colors.sageOlive, fontWeight: "600" },
  trialCard: { flexDirection: "column", alignItems: "stretch", gap: spacing.sm },
  trialOff: { opacity: 0.6 },
  trialHead: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  trialTitle: { ...typeScale.label, fontSize: 16, color: colors.espresso, flex: 1 },
  trialFree: { ...typeScale.headline, fontSize: 18, lineHeight: 22, color: colors.sageOlive },
  trialDesc: { ...typeScale.bodySmall, color: colors.espressoMuted },
  thenRow: { gap: spacing.xs, marginTop: spacing.xs },
  thenLabel: { ...typeScale.caption, color: colors.espressoFaint },
  thenChips: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  thenChip: { minHeight: 44, justifyContent: "center", paddingVertical: 8, paddingHorizontal: spacing.md, borderRadius: radii.pill, borderWidth: 1, borderColor: colors.hairlineStrong },
  thenChipOn: { borderColor: colors.burntOrange, backgroundColor: colors.burntOrange },
  thenChipText: { ...typeScale.caption, color: colors.espresso },
  thenChipTextOn: { color: colors.cream, fontWeight: "700" },
  trialOnce: { ...typeScale.caption, color: colors.espressoFaint },
  planPriceCol: { alignItems: "flex-end" },
  planPrice: { ...typeScale.headline, fontSize: 20, lineHeight: 24, color: colors.espresso },
  planPer: { ...typeScale.caption, color: colors.espressoMuted },
  footer: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    gap: spacing.xs,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.hairline,
    backgroundColor: colors.cream,
    width: "100%",
    maxWidth: layout.maxContentWidth,
    alignSelf: "center",
  },
  lapsed: { padding: spacing.md, borderRadius: radii.lg, backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.tomato, gap: 4 },
  lapsedTitle: { ...typeScale.label, color: colors.espresso },
  lapsedBody: { ...typeScale.bodySmall, color: colors.espressoMuted },
  testReset: { alignSelf: "center", paddingVertical: 6 },
  testResetText: { ...typeScale.caption, color: colors.espressoFaint, textDecorationLine: "underline" },
  testTag: { ...typeScale.caption, color: colors.espressoFaint, textAlign: "center" },
  notice: { ...typeScale.bodySmall, color: colors.burntOrange, textAlign: "center" },
  cta: { backgroundColor: colors.burntOrange, borderRadius: radii.lg, paddingVertical: 16, alignItems: "center" },
  ctaPressed: { opacity: 0.85 },
  ctaText: { ...typeScale.button, fontSize: 16, color: colors.cream },
  charge: { ...typeScale.caption, color: colors.espresso, textAlign: "center" },
  cancel: { ...typeScale.caption, color: colors.espressoMuted, textAlign: "center", marginTop: spacing.xs },
  links: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: spacing.xs, paddingTop: 0, marginBottom: -spacing.sm },
  link: { ...typeScale.caption, fontSize: 12, color: colors.espressoMuted, textDecorationLine: "underline", paddingVertical: 14, paddingHorizontal: 4 },
  linkDot: { ...typeScale.caption, color: colors.espressoFaint },
});
