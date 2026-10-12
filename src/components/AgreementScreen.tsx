import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet, BackHandler, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "./Button";
import { colors, layout, radii, spacing, type as typeScale } from "@/theme";
import { useProfile } from "@/context/ProfileContext";
import { privacyPolicy, termsOfUse, type LegalDocument } from "@/lib/legalText";

function Document({ doc }: { doc: LegalDocument }) {
  return (
    <View style={styles.doc}>
      <Text style={styles.docTitle} accessibilityRole="header">
        {doc.title}
      </Text>
      <Text style={styles.docIntro}>{doc.intro}</Text>
      {doc.sections.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.paragraphs.map((p, i) => (
            <Text key={i} style={styles.paragraph}>
              {p}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}

/**
 * Shown once after the introduction questions (and again if the wording ever changes): the Terms of Use and
 * Privacy Policy in full, with an "I agree" button underneath. The app can't be used until it is accepted.
 */
export function AgreementScreen() {
  const { acceptTerms } = useProfile();
  const [declined, setDeclined] = useState(false);

  function decline() {
    if (Platform.OS === "android") BackHandler.exitApp();
    else setDeclined(true);
  }

  return (
    <SafeAreaView style={styles.root} edges={["top", "bottom"]}>
      <ScrollView style={styles.flex} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>One last step</Text>
        <Text style={styles.title} accessibilityRole="header">
          Terms of Use and Privacy Policy
        </Text>
        <Text style={styles.lead}>Please read these, then tap I agree at the bottom to start using Make & Sip.</Text>
        <Document doc={termsOfUse()} />
        <Document doc={privacyPolicy()} />
      </ScrollView>

      <View style={styles.footer}>
        <Button label="I agree" icon="none" onPress={acceptTerms} fullWidth />
        <Text style={styles.fineprint}>By tapping I agree, you accept the Terms of Use and Privacy Policy above.</Text>
        {declined ? <Text style={styles.declined}>Make & Sip can only be used once you agree. You can close the app now, or tap I agree to continue.</Text> : null}
        <Pressable onPress={decline} accessibilityRole="button" accessibilityLabel="I don't agree" style={styles.decline}>
          <Text style={styles.declineText}>I don&apos;t agree</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: colors.cream, zIndex: 100 },
  flex: { flex: 1 },
  content: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing["2xl"],
    paddingBottom: spacing["2xl"],
    gap: spacing.md,
    width: "100%",
    maxWidth: layout.maxContentWidth,
    alignSelf: "center",
  },
  eyebrow: { ...typeScale.eyebrow, color: colors.burntOrange },
  title: { ...typeScale.display, color: colors.espresso },
  lead: { ...typeScale.body, color: colors.espressoMuted },
  doc: {
    backgroundColor: colors.paper,
    borderRadius: radii.xl,
    padding: spacing.xl,
    gap: spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
    marginTop: spacing.sm,
  },
  docTitle: { ...typeScale.title, color: colors.espresso },
  docIntro: { ...typeScale.bodySmall, color: colors.espressoFaint },
  section: { gap: spacing.xs },
  sectionTitle: { ...typeScale.label, color: colors.espresso, marginTop: spacing.xs },
  paragraph: { ...typeScale.bodySmall, color: colors.espressoMuted },
  footer: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    gap: spacing.sm,
    width: "100%",
    maxWidth: layout.maxContentWidth,
    alignSelf: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.hairline,
    backgroundColor: colors.cream,
  },
  fineprint: { ...typeScale.caption, color: colors.espressoFaint, textAlign: "center" },
  declined: { ...typeScale.caption, color: colors.burntOrange, textAlign: "center" },
  decline: { alignItems: "center", paddingVertical: 8 },
  declineText: { ...typeScale.label, color: colors.espressoMuted },
});
