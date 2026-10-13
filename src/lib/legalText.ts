/**
 * The Terms of Use and Privacy Policy shown on the "Before you start" screen (and kept in docs/legal for
 * publishing at a public address). Draft wording — have it reviewed before launch.
 *
 * Fill these in before launch; while they are empty the contact lines are simply left out.
 */
export const LEGAL_OWNER_NAME = "";
export const LEGAL_CONTACT_EMAIL = "";
export const LEGAL_GOVERNING_LAW = "";

/** Change this whenever the wording changes in a way people must accept again. */
export const TERMS_VERSION = "2026-10-08";
export const LEGAL_UPDATED = "October 8, 2026";

export interface LegalSection {
  title: string;
  paragraphs: string[];
}

export interface LegalDocument {
  title: string;
  intro: string;
  sections: LegalSection[];
}

const contactLine = (): string[] => {
  const who = [LEGAL_OWNER_NAME, LEGAL_CONTACT_EMAIL].filter(Boolean).join(" · ");
  return who ? [who] : [];
};

export function termsOfUse(): LegalDocument {
  const closing: LegalSection[] = [];
  const contact = contactLine();
  if (contact.length || LEGAL_GOVERNING_LAW) {
    closing.push({
      title: "Contact",
      paragraphs: [...contact, ...(LEGAL_GOVERNING_LAW ? [`Governing law: ${LEGAL_GOVERNING_LAW}.`] : [])],
    });
  }
  return {
    title: "Terms of Use",
    intro: `Last updated ${LEGAL_UPDATED}. By using Make & Sip you agree to these terms.`,
    sections: [
      {
        title: "Using the app",
        paragraphs: [
          "Make & Sip is for personal, non-commercial use. Don't copy, resell, reverse-engineer or misuse the app or its content. The drinks, text, logo and design belong to the app's owner or their licensors; photos belong to their photographers.",
        ],
      },
      {
        title: "Allergens, caffeine and your health",
        paragraphs: [
          "Drinks are general inspiration. You are responsible for checking ingredients for allergens (such as milk, nuts, soy and gluten) and for your own dietary needs. Dietary tags (such as Vegan, Dairy-Free, Caffeine-Free or Low Sugar) are a convenience and may be incomplete or wrong, so always check labels.",
          "Caffeine, sugar and other ingredients affect people differently. If you are pregnant, have a medical condition or are unsure, ask a professional. Take care with hot liquids, steam, blenders and sharp tools. Expiry dates in your pantry are estimates you enter, not a food-safety guarantee. Make & Sip does not give medical or nutritional advice.",
        ],
      },
      {
        title: "Make & Sip Premium, subscriptions and the free trial",
        paragraphs: [
          "Make & Sip needs an active plan: Monthly or Yearly (both renew automatically) or Lifetime (one payment, no renewal).",
          "New subscribers may get a 7-day free trial, once per Google account. If you don't cancel before the trial ends, your plan starts and you are charged the plan price. The trial doesn't apply to Lifetime.",
          "Payment is charged to your Google Play account. Subscriptions renew until cancelled; cancel at least 24 hours before the end of the current period in Google Play under Payments & subscriptions. After you cancel you keep access until the end of the period you've paid for.",
          "If a renewal payment fails, Google Play may retry for a short time and you may keep access meanwhile. If it isn't resolved, access ends. Refunds are handled by Google Play under its policies.",
        ],
      },
      {
        title: "Your data",
        paragraphs: ["Your pantry and profile are stored on your device. We can't recover them if you uninstall or reset the app. See the Privacy Policy below."],
      },
      {
        title: "No warranty and limit of liability",
        paragraphs: [
          'The app and its drinks are provided "as is". To the extent the law allows, we are not liable for illness, injury, loss or damage from making or drinking them or using the app, or for interruptions or errors in the app.',
          "We may update these terms; continuing to use the app means you accept them.",
        ],
      },
      ...closing,
    ],
  };
}

export function privacyPolicy(): LegalDocument {
  const contact = contactLine();
  return {
    title: "Privacy Policy",
    intro: `Last updated ${LEGAL_UPDATED}. This explains what information Make & Sip handles.`,
    sections: [
      {
        title: "The short version",
        paragraphs: [
          "Make & Sip has no accounts and no sign-in. Your pantry, shopping list, saved and favourite drinks, equipment and optional profile stay on your device; we don't receive them. We don't show ads and we don't use analytics or tracking tools.",
        ],
      },
      {
        title: "Stored on your device",
        paragraphs: [
          "The app keeps pantry items and quantities, your shopping list, saved and favourite drinks, your equipment, and your optional profile (name, drink-type and flavour choices, and a profile photo if you pick one). A photo from your gallery is used only inside the app and is never uploaded.",
          "Uninstalling the app, or using Reset local app data in Profile, removes this information. Reset does not cancel a subscription; that is managed in Google Play.",
        ],
      },
      {
        title: "Purchases",
        paragraphs: [
          "Subscriptions and the Lifetime purchase are processed by Google Play. We use RevenueCat to check which plan you have; it receives an anonymous app user ID and purchase details such as which plan you bought and when. We never see your payment card details, and RevenueCat's own privacy policy applies to what it handles.",
        ],
      },
      {
        title: "Notifications",
        paragraphs: ["If you allow notifications, the app schedules reminders on your device shortly before your subscription term ends. They are created on your phone; no notification service receives your data. You can turn them off in your phone's settings."],
      },
      {
        title: "Images",
        paragraphs: ["Drink photos are loaded over the internet from image providers, which may see your device's IP address, as with any web image."],
      },
      {
        title: "Children",
        paragraphs: ["Make & Sip isn't directed at children under 13, and we don't knowingly collect information from them."],
      },
      {
        title: "Your choices",
        paragraphs: ["Delete all app data by resetting it in the app or uninstalling. Manage or cancel a subscription in Google Play under Payments & subscriptions."],
      },
      ...(contact.length ? [{ title: "Contact", paragraphs: contact }] : []),
    ],
  };
}
