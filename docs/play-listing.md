# Make & Sip — Google Play listing draft

Copy these into Play Console when you create the app. Everything here is a draft to edit.

## App details
- **App name** (30 characters max): Make & Sip
- **Default language:** English (United Kingdom or United States, your choice)
- **App or game:** App
- **Free or paid:** Free to download (a plan is bought inside the app)
- **Category:** Food & Drink
- **Package id:** `com.subbu.makeandsip`
- **Contact email:** subbu16111977@gmail.com
- **Privacy Policy URL:** the GitHub Pages address ending in `/privacy/` (see "Publishing the policy" below)

## Short description (80 characters max)
Tell it what's in your pantry. See which drinks you can make right now.

## Full description (4000 characters max)
Make & Sip is a drinks pantry. Add what you have at home and it shows which drinks you can make now, which are almost there, and what to buy.

502 non-alcoholic drinks across eight kinds: coffee, tea, milkshakes and thick shakes, smoothies, mocktails, juices, lemonades and coolers, and sodas and sparkling drinks. Each has a photo, a clear ingredient list and step-by-step method.

HOW IT WORKS
- Type ingredients the way you say them: "oj", "whole milk", "2 tbsp honey". The app understands plurals, spellings and regional names.
- Tick the equipment you own, from a kettle to a blender to an espresso machine. Drinks that need gear you don't have won't show as ready.
- Four clear levels for every drink: Ready to make, Almost ready, Partially matched, Low match. The score is explained on each drink's page.
- Amounts count, not just names. Change the servings and the amounts scale for you.

MADE FOR REAL KITCHENS
- Many drinks have several ways to make them, such as a moka pot, an AeroPress or by hand. The app shows the way that suits the gear you have.
- Tap "Made it" and the ingredients you used come out of your pantry. You can undo it.
- Add what's missing to your shopping list in one tap. Only amounts we can be sure of are added.
- Save drinks, mark favourites, and get suggestions based on the drinks and flavours you like.

SIMPLE AND PRIVATE
- No account or sign-in. Your pantry, lists and profile stay on your device.
- No ads and no tracking.

Make & Sip Premium: Monthly, Yearly or Lifetime. New subscribers get a 7-day free trial on Monthly and Yearly. Subscriptions renew automatically until cancelled in Google Play.

All drinks are non-alcoholic. Dietary tags are a guide only, so check labels if you have allergies.

## Graphics (ready in `store-graphics/`)
- **App icon:** `store-graphics/app-icon-512.png` (512 × 512)
- **Feature graphic:** `store-graphics/feature-graphic-1024x500.png`
- **Phone screenshots:** `store-graphics/phone-screenshots/` — six at 1080 × 2160: Home, Discover, a drink page, ingredients and scoring, Pantry, Saved. Upload in that order.

## Content rating (questionnaire answers)
- Violence, sexual content, language, gambling: none
- **Controlled substances: none** (no alcohol, tobacco or drugs; all drinks are alcohol-free)
- User-generated content / user interaction: none
- Shares location: no
- Expected rating: suitable for everyone

## Target audience
- Age groups: 13 and over (the privacy policy says the app is not directed at children under 13)
- Not primarily directed at children, so the Families policy does not apply

## Data safety form
- **Does the app collect or share user data?** Collects: yes (purchase information only). Shares: no data is sold; purchase information goes to RevenueCat as a service provider.
- **Data collected**
  - *Purchase history* (which plan, when): collected, shared with RevenueCat (service provider), not optional, used for app functionality (to unlock Premium).
  - *Device or other IDs* (an anonymous app user ID created by RevenueCat): collected, same purpose.
- **Not collected:** name, email, address, phone, location, contacts, photos (the profile photo never leaves the device), files, calendar, health data, messages, web browsing, audio, app activity or analytics.
- **Data encrypted in transit:** yes
- **Can people ask for their data to be deleted?** Pantry and profile data live only on the device and are removed by uninstalling or "Reset local app data". Purchase records are kept by Google and RevenueCat.
- **Account creation:** none, so no account deletion page is needed.

## App content declarations
- **Ads:** no
- **News app / government app / health app / financial features:** no
- **Advertising ID:** not used
- **Permissions the app asks for:** notifications (optional reminders before a trial ends), photo picker (only when you choose a profile photo)

## In-app products to create (Monetize → Products)
Prices shown in the app are display only; Google Play sets the real, localised price.

| Product | Type | Price (current plan) | Notes |
| --- | --- | --- | --- |
| Monthly | Subscription | $4.99 / month | 7-day free trial for new subscribers |
| Yearly | Subscription | $29.99 / year | 7-day free trial for new subscribers |
| Lifetime | One-time product | $99.99 | No trial |

Keep the product ids you choose; they must match what is set up in RevenueCat.

## Publishing the policy
`docs/index.html`, `docs/privacy/index.html` and `docs/terms/index.html` are ready to host free on GitHub Pages:
1. Push the repo to GitHub.
2. On GitHub open the repo → Settings → Pages.
3. Under "Build and deployment" choose **Deploy from a branch**, branch `main`, folder `/docs`, and Save.
4. After a minute the pages are at `https://subbu16111977-creator.github.io/Make-and-Sip/`, with the policy at `.../privacy/` and the terms at `.../terms/`. Use the `/privacy/` address in Play Console.

The repo must be public for free Pages hosting. If you'd rather keep the repo private, the same files can go on any static host, or you can paste the policy into a public Google Doc and use its link.

To regenerate the pages after editing `docs/legal/*.md`, run `python3 scripts/build_legal_pages.py`.
