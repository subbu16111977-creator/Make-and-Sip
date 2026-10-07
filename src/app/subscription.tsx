import React, { useMemo, useState } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ChevronLeftIcon } from "@/components/icons";
import { colors, layout, radii, spacing, type as typeScale } from "@/theme";
import { useSubscription } from "@/context/SubscriptionContext";
import { getPlan, formatPrice, priceLine } from "@/lib/plans";
import { formatDate, summarize, upcomingReminders, type SubscriptionStatus } from "@/lib/subscription";

const BADGE_COLOR: Record<SubscriptionStatus, string> = {
  trial: colors.burntOrange,
  active: colors.deepOlive,
  cancelled: colors.tomato,
  expired: colors.espressoFaint,
  lifetime: colors.burntOrange,
  billing_issue: colors.tomato,
};

function formatReminderTime(d: Date): string {
  const day = d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  const time = d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  return `${day} · ${time}`;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

/**
 * Your plan: which plan you're on, whether it's a free trial or active, and the date it renews or
 * ends — laid out like Claude's plan page. Until real purchases are connected the plan comes from the
 * test purchase on the paywall and exists only on this device.
 */
export default function SubscriptionScreen() {
  const router = useRouter();
  const { subscription, cancelSubscription, resumeSubscription, endSubscription, simulateFailedPayment, simulateFixedPayment } = useSubscription();
  const [confirming, setConfirming] = useState(false);
  const now = new Date();

  const summary = useMemo(() => (subscription ? summarize(subscription, new Date()) : null), [subscription]);
  const reminders = useMemo(() => (subscription ? upcomingReminders(subscription, new Date()).slice(0, 3) : []), [subscription]);

  const header = (
    <View style={styles.topBar}>
      <Pressable onPress={() => router.back()} hitSlop={10} accessibilityRole="button" accessibilityLabel="Back" style={styles.back}>
        <ChevronLeftIcon size={18} color={colors.espresso} />
      </Pressable>
      <Text style={styles.topTitle} accessibilityRole="header">
        Subscription
      </Text>
      <View style={styles.back} />
    </View>
  );

  if (!subscription || !summary) {
    return (
      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
        {header}
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>No plan yet</Text>
          <Text style={styles.emptyBody}>Choose a Mise Premium plan to get started. Every plan begins with a 7-day free trial, except Lifetime.</Text>
          <Pressable onPress={() => router.replace("/paywall")} accessibilityRole="button" accessibilityLabel="See plans" style={styles.primary}>
            <Text style={styles.primaryText}>See plans</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const plan = getPlan(subscription.planId);
  const status = summary.status;
  const ends = summary.date;
  const dateLabel = status === "trial" ? "Trial ends" : status === "active" ? "Renews on" : status === "cancelled" ? "Access ends" : status === "billing_issue" ? "Access until" : "Ended on";
  const canChange = status !== "lifetime";
  const noun = status === "trial" ? "turns into a charge" : status === "active" ? "renews" : "ends";

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      {header}
      <ScrollView style={styles.flex} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.testBanner}>
          <Text style={styles.testBannerText}>Test mode: this plan is simulated on this device only. Nothing is charged.</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHead}>
            <View style={styles.cardHeadText}>
              <Text style={styles.eyebrow}>CURRENT PLAN</Text>
              <Text style={styles.planName}>Mise Premium · {summary.planName}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: BADGE_COLOR[status] }]}>
              <Text style={styles.badgeText}>{summary.badge}</Text>
            </View>
          </View>
          <Text style={styles.headline}>{summary.headline}</Text>
          {summary.detail ? <Text style={styles.detail}>{summary.detail}</Text> : null}

          <View style={styles.rows}>
            <Row label="Plan" value={`${plan.title} · ${priceLine(plan)}`} />
            <Row label="Started" value={formatDate(new Date(subscription.startedAt))} />
            {ends ? <Row label={dateLabel} value={formatDate(ends)} /> : null}
            {status === "trial" ? <Row label="First charge" value={`${formatPrice(plan.price)} on ${ends ? formatDate(ends) : ""}`} /> : null}
          </View>
        </View>

        {reminders.length > 0 ? (
          <View style={styles.card}>
            <Text style={styles.eyebrow}>REMINDERS</Text>
            <Text style={styles.cardTitle}>We’ll remind you 3, 2 and 1 days before it {noun}</Text>
            {reminders.map((r) => (
              <View key={r.at.getTime()} style={styles.reminder}>
                <Text style={styles.reminderWhen}>{formatReminderTime(r.at)}</Text>
                <Text style={styles.reminderText}>{r.title}</Text>
              </View>
            ))}
            <Text style={styles.footnote}>
              {Platform.OS === "web" ? "Reminders are delivered as notifications on iPhone and Android." : "Reminders arrive as notifications at 9:00 AM. Make sure notifications are allowed for Mise."}
            </Text>
          </View>
        ) : null}

        <View style={styles.actions}>
          {canChange ? (
            <Pressable onPress={() => router.push("/paywall")} accessibilityRole="button" accessibilityLabel="Change plan" style={styles.secondary}>
              <Text style={styles.secondaryText}>Change plan</Text>
            </Pressable>
          ) : null}

          {status === "cancelled" ? (
            <Pressable onPress={resumeSubscription} accessibilityRole="button" accessibilityLabel="Resume subscription" style={styles.primary}>
              <Text style={styles.primaryText}>Resume subscription</Text>
            </Pressable>
          ) : status === "trial" || status === "active" ? (
            confirming ? (
              <View style={styles.confirm}>
                <Text style={styles.confirmText}>
                  {status === "trial"
                    ? `Cancel your free trial? You'll keep full access until ${ends ? formatDate(ends) : "it ends"}, and you won't be charged.`
                    : `Cancel your subscription? You'll keep full access until ${ends ? formatDate(ends) : "the end of this period"}. It won't renew.`}
                </Text>
                <View style={styles.confirmButtons}>
                  <Pressable onPress={() => setConfirming(false)} accessibilityRole="button" accessibilityLabel="Keep my plan" style={styles.secondary}>
                    <Text style={styles.secondaryText}>Keep my plan</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      cancelSubscription();
                      setConfirming(false);
                    }}
                    accessibilityRole="button"
                    accessibilityLabel="Yes, cancel"
                    style={styles.danger}
                  >
                    <Text style={styles.dangerText}>Yes, cancel</Text>
                  </Pressable>
                </View>
              </View>
            ) : (
              <Pressable onPress={() => setConfirming(true)} accessibilityRole="button" accessibilityLabel="Cancel subscription" style={styles.cancelRow}>
                <Text style={styles.cancelText}>Cancel subscription</Text>
              </Pressable>
            )
          ) : null}

          {status === "expired" ? (
            <Pressable onPress={() => router.push("/paywall")} accessibilityRole="button" accessibilityLabel="See plans" style={styles.primary}>
              <Text style={styles.primaryText}>See plans</Text>
            </Pressable>
          ) : null}

          {/* TEST MODE ONLY — remove before launch. */}
          {status === "billing_issue" ? (
            <Pressable onPress={simulateFixedPayment} accessibilityRole="button" accessibilityLabel="Test mode only: payment fixed" style={styles.testLink}>
              <Text style={styles.testLinkText}>Test mode only: payment fixed</Text>
            </Pressable>
          ) : status === "trial" || status === "active" ? (
            <Pressable onPress={simulateFailedPayment} accessibilityRole="button" accessibilityLabel="Test mode only: simulate a failed payment" style={styles.testLink}>
              <Text style={styles.testLinkText}>Test mode only: simulate a failed payment</Text>
            </Pressable>
          ) : null}

          <Pressable
            onPress={() => {
              endSubscription();
              router.back();
            }}
            accessibilityRole="button"
            accessibilityLabel="End test subscription"
            style={styles.testLink}
          >
            <Text style={styles.testLinkText}>End test subscription</Text>
          </Pressable>
        </View>
        <Text style={styles.nowNote}>Today is {formatDate(now)}.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream },
  flex: { flex: 1 },
  topBar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: layout.screenPadding, paddingTop: spacing.sm, paddingBottom: spacing.sm },
  back: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  topTitle: { ...typeScale.headline, fontSize: 20, color: colors.espresso },
  content: { paddingHorizontal: layout.screenPadding, paddingBottom: spacing["2xl"], gap: spacing.lg, width: "100%", maxWidth: layout.maxContentWidth, alignSelf: "center" },
  testBanner: { padding: spacing.md, borderRadius: radii.lg, backgroundColor: colors.paper, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.burntOrange },
  testBannerText: { ...typeScale.caption, color: colors.burntOrange, textAlign: "center" },
  card: { padding: spacing.lg, borderRadius: radii.xl, backgroundColor: colors.paper, borderWidth: StyleSheet.hairlineWidth, borderColor: colors.hairline, gap: spacing.sm },
  cardHead: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: spacing.md },
  cardHeadText: { flex: 1, gap: 2 },
  eyebrow: { ...typeScale.eyebrow, color: colors.burntOrange },
  planName: { ...typeScale.headline, fontSize: 20, lineHeight: 26, color: colors.espresso },
  badge: { paddingVertical: 4, paddingHorizontal: spacing.md, borderRadius: radii.pill },
  badgeText: { ...typeScale.caption, fontWeight: "700", color: colors.cream },
  headline: { ...typeScale.body, color: colors.espresso, marginTop: spacing.xs },
  detail: { ...typeScale.bodySmall, color: colors.espressoMuted },
  rows: { marginTop: spacing.sm, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.hairline },
  row: { flexDirection: "row", justifyContent: "space-between", gap: spacing.lg, paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.hairline },
  rowLabel: { ...typeScale.bodySmall, color: colors.espressoMuted },
  rowValue: { ...typeScale.bodySmall, color: colors.espresso, flexShrink: 1, textAlign: "right" },
  cardTitle: { ...typeScale.label, fontSize: 15, color: colors.espresso },
  reminder: { paddingVertical: 8, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.hairline, gap: 2 },
  reminderWhen: { ...typeScale.caption, color: colors.burntOrange },
  reminderText: { ...typeScale.bodySmall, color: colors.espresso },
  footnote: { ...typeScale.caption, color: colors.espressoMuted, marginTop: spacing.xs },
  actions: { gap: spacing.md },
  primary: { backgroundColor: colors.burntOrange, borderRadius: radii.lg, paddingVertical: 15, alignItems: "center" },
  primaryText: { ...typeScale.button, color: colors.cream },
  secondary: { borderRadius: radii.lg, paddingVertical: 14, paddingHorizontal: spacing.lg, alignItems: "center", borderWidth: 1, borderColor: colors.hairlineStrong },
  secondaryText: { ...typeScale.button, color: colors.espresso },
  cancelRow: { paddingVertical: 14, alignItems: "center" },
  cancelText: { ...typeScale.label, fontSize: 15, color: colors.tomato },
  confirm: { padding: spacing.lg, borderRadius: radii.xl, backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.tomato, gap: spacing.md },
  confirmText: { ...typeScale.bodySmall, color: colors.espresso },
  confirmButtons: { flexDirection: "row", gap: spacing.sm, justifyContent: "flex-end" },
  danger: { backgroundColor: colors.tomato, borderRadius: radii.lg, paddingVertical: 14, paddingHorizontal: spacing.lg, alignItems: "center" },
  dangerText: { ...typeScale.button, color: colors.white },
  testLink: { alignItems: "center", paddingVertical: 8 },
  testLinkText: { ...typeScale.caption, color: colors.espressoFaint, textDecorationLine: "underline" },
  nowNote: { ...typeScale.caption, color: colors.espressoFaint, textAlign: "center" },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: layout.screenPadding + spacing.lg, gap: spacing.md },
  emptyTitle: { ...typeScale.headline, color: colors.espresso },
  emptyBody: { ...typeScale.body, color: colors.espressoMuted, textAlign: "center" },
});
