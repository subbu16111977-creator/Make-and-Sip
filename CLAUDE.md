@AGENTS.md

# Make & Sip — project direction

Make & Sip (formerly Mise, a food pantry/recipe app; briefly "Pourly") is a **drinks pantry app**: you tell it what you have, and it
shows which drinks you can make now, which are almost there, and what to buy. The app is mid-migration from the
food app; the food app is preserved in Git (see "Safety" below) and must not be lost.

## What the app covers

Active categories:

- Coffee
- Tea
- Milkshakes and thick shakes
- Smoothies
- Mocktails
- Juices
- Lemonades and coolers
- Sodas and sparkling drinks
- Hot drinks

**Cocktails / alcohol: not in the first release.** The product owner decided "no need cocktail" (2026-10-12).
Do not add spirits, wine, beer, liqueurs or cocktail recipes. If alcohol is ever added later, it needs its own
decision first, plus: alcoholic and non-alcoholic drinks must be **clearly distinguished everywhere** (cards,
detail pages, filters, search, shopping), an age gate, and the legal/store-policy work that goes with it.
Until then every drink is non-alcoholic and the UI should not imply otherwise.

## Matching rules (the core of the app)

- **Natural-language entry.** People type ingredients however they like ("oj", "Whole milk", "2 tbsp honey").
  Everything funnels through the ingredient normaliser; never match on raw strings elsewhere.
- **Aliases yes, unsafe substitutes no.** Plural/singular, spelling, regional names and approved aliases resolve to
  one canonical ingredient. Never merge look-alikes that behave differently (e.g. coconut milk vs coconut cream vs
  coconut water, oat milk vs oats, lemon juice vs lemon, cocoa powder vs hot chocolate mix, instant vs ground coffee,
  sugar vs syrup). A substitute only counts if an explicit rule says so, and it is shown as a substitute.
- **Quantities and units matter.** Compare amounts, not just names. Convert only where it is reliable (ml/l/fl oz/
  tsp/tbsp/cup; g/kg/oz-weight). Fluid ounces are **volume**, not weight. Drink-specific units (shot, dash, splash,
  scoop, part, ice cube) are handled explicitly; incomparable units are "quantity unknown", never guessed. Servings
  scale required amounts without ever editing the recipe.
- **Equipment matters.** A drink needing equipment the user does not own (blender, shaker, espresso machine, French
  press, kettle, milk frother …) is never "Ready to make"; show the gap clearly.
- **Result levels** — always these four, with thresholds kept as named constants in one place:
  - **Ready to make**
  - **Almost ready**
  - **Partially matched**
  - **Low match**
  Optional ingredients/garnishes never lower the core score. The score is transparent and explained on the detail
  page (see `docs/cookability.md`, which describes the current engine and will be updated as it is adapted).
- **Shopping adds only reliable missing quantities or shortfalls.** Missing ingredients and top-ups for amounts that are
  genuinely short; never optional items by default, never amounts we could not verify, never duplicates of what is
  already owned.

## Design direction

- **Cozy, comfortable, warm — with a subtle house-music influence.** Think late-evening warmth: amber glow, soft
  contrast, generous spacing, calm motion. House-music cues stay *subtle*: a steady rhythmic grid and spacing, a gentle
  pulse or waveform/equaliser accent, vinyl-and-sleeve warmth in the details. No neon, no club clichés, no
  decoration for its own sake.
- **It must look professionally designed and must not look vibecoded.** Concretely: one consistent type scale,
  spacing scale, radius and colour system taken from `src/theme` (no one-off hex values or magic numbers in screens);
  real, consistent iconography (no emoji as UI); considered empty/loading/error states; aligned grids; restrained
  gradients and shadows; copy written like a human product (no filler, no exclamation-mark enthusiasm). Every new
  screen is checked at phone width in the browser before it is called done.
- Accessibility and tap targets (≥44pt) are part of "professional".

## Safety and workflow

- **No destructive change without a Git checkpoint.** Before deleting, archiving, renaming or bulk-rewriting anything,
  create a tag `checkpoint-before-<what>` and confirm the tree is clean. The food app lives in Git history and the
  `checkpoint-*` tags (finish with `checkpoint-final-mise-food-app`) — never overwrite it. The repo currently has no
  remote, so also keep a `git bundle` backup outside the repo.
- Archive before deleting; delete only with the owner's explicit approval.
- **Before every commit run, and fix:** `npx vitest run` (includes the data-validation tests under `src/data`),
  `npx tsc --noEmit`, `npx expo lint`. All must pass. Never commit with failures; if something is skipped, say so.
- Every drink needs a verified free photo (Pexels or Unsplash, never Unsplash+); drop drinks without one and report
  the count. Skip duplicates.
- Commit messages end with the Co-Authored-By trailer the harness provides.
- The app is previewed on `localhost:8081` only (not hosted on Netlify or elsewhere).
- Payments are RevenueCat + Google Play, Android first. Test-only controls must be removed before launch.

## Migration status

Planned in stages (backup → archive food → rename/identity → empty the food data → types/registry → engine → drinks
data → UI copy → legal → tests/docs/build). Update this section as stages complete. Open decisions: new Android package id
(suggested `com.subbu.makeandsip`; free to change until the first Play upload), archive vs delete of the 642 food recipes
(default: archive), remote backup repo.
