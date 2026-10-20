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

There is no "hot drinks" category: whether a drink is hot or cold is a property of each drink (`temperature`), shown as a
flame or snowflake in the corner of its photo.

**Cocktails / alcohol: not in the first release.** The product owner decided "no need cocktail" (2026-10-12).
Do not add spirits, wine, beer, liqueurs or cocktail recipes. If alcohol is ever added later, it needs its own
decision first, plus: alcoholic and non-alcoholic drinks must be **clearly distinguished everywhere** (cards,
detail pages, filters, search, shopping), an age gate, and the legal/store-policy work that goes with it.
Until then every drink is non-alcoholic and the UI should not imply otherwise.

## Matching rules (the core of the app)

- **Natural-language entry.** People type ingredients however they like ("oj", "Whole milk", "2 tbsp honey").
  Everything funnels through the ingredient normaliser; never match on raw strings elsewhere.
- **Aliases yes, unsafe substitutes no.** Plural/singular, spelling, regional names and approved aliases resolve to
  one canonical ingredient, and a drink page shows the person's own wording for an alias they hold (their "club soda" where the
  drink says "sparkling water"), in the ingredient list and the method, display only (`src/lib/ownedNames.ts`). Never merge look-alikes that behave differently (e.g. coconut milk vs coconut cream vs
  coconut water, oat milk vs oats, lemon juice vs lemon, cocoa powder vs hot chocolate mix, instant vs ground coffee,
  sugar vs syrup). A substitute only counts if an explicit rule says so, and it is shown as a substitute.
- **Quantities and units matter.** Compare amounts, not just names. Convert only where it is reliable (ml/l/fl oz/
  tsp/tbsp/cup; g/kg/oz-weight). Fluid ounces are **volume**, not weight. Drink-specific units (shot, dash, splash,
  scoop, part, ice cube) are handled explicitly; incomparable units are "quantity unknown", never guessed. Servings
  scale required amounts without ever editing the recipe.
- **Equipment matters, and a drink can have several ways to make it.** Each drink lists `methods`: a method names ALL the
  equipment it needs (or none: a "by hand" way using only a glass, spoon, jar and the like), has its own steps, and
  gives its own `ingredients` only where the amounts or ingredients differ (a moka pot uses less coffee than an
  espresso machine; by hand uses instant). A drink is makeable if ANY method is; it is never "Ready to make" when none
  is. The method shown is the first one the person has the gear for (so it changes when they tick or untick equipment)
  until they pick one themselves. Where a drink can be made by hand, include that method. Equipment can also be
  optional within a method (`optionalEquipment`, with a one-line "without it" tip): it never blocks "Ready to make" or
  lowers the score. Drinks with one way only may use the short form (`equipment`, `optionalEquipment`, `steps`).
- **Result levels** — always these four, with thresholds kept as named constants in one place:
  - **Ready to make**
  - **Almost ready**
  - **Partially matched**
  - **Low match**
  Optional ingredients/garnishes never lower the core score. The score is transparent and explained on the detail
  page (see `docs/cookability.md`, which describes the current engine and will be updated as it is adapted).
- **"Made it" takes ingredients out of the pantry, and only reliable amounts.** The button shows only when the drink is Ready to make; it opens a checklist (everything ticked, untick what wasn't used) and then subtracts the amounts for the method and servings shown (`src/lib/pantryUse.ts`). Same-kind units convert (ml/cups, g/oz, pieces); weight against volume, unknown amounts, optional and to-taste lines are never touched and are listed as left alone. An item with nothing left leaves the pantry. The update can be undone.
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
- **Current look ("Bottle & brass"):** deep bottle-green surfaces, a single muted brass accent, soft ivory text (all in
  `src/theme/colors.ts`, with contrast tests). Type: Cormorant Garamond for display/headings, Jost for everything
  functional; buttons and eyebrows are small letter-spaced capitals. Corners are small and crisp (`radii`). Icons are
  one family — Phosphor, light weight — and only come through `src/components/icons.tsx`. Don't add one-off icons,
  colours or fonts outside these.
- Accessibility and tap targets (≥44pt) are part of "professional".

## Safety and workflow

- **No destructive change without a Git checkpoint.** Before deleting, archiving, renaming or bulk-rewriting anything,
  create a tag `checkpoint-before-<what>` and confirm the tree is clean. The food app lives in Git history and the
  `checkpoint-*` tags (finish with `checkpoint-final-mise-food-app`) — never overwrite it. The repo has a private GitHub remote
  (`origin`); keep the `git bundle` backup outside the repo too.
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
data → UI copy → legal → tests/docs/build). Update this section as stages complete. Done so far: food app checkpointed (`checkpoint-final-mise-food-app`, branch `archive/mise-food-app`, bundle backup at
`~/Downloads/mise-food-app-backup.bundle`); visible name changed to Make & Sip; food dishes and ingredient registry removed
(the food recipes and the food ingredient vocabulary are deleted from the working tree, in two steps: tags `checkpoint-before-delete-food-recipes` and `checkpoint-before-delete-food-ingredients`; they live only in Git: `checkpoint-final-mise-food-app`, branch `archive/mise-food-app` and the bundle backup; the engine tests run on the real drinks and a small drinks pantry in `src/test/seedPantry.ts`). Drinks live in `src/data/drinks/<type>.ts` (one file per type, combined in `src/data/recipes.ts`); the ingredient registry in
`src/data/ingredients.ts` grows with them. Coffee is built: 88 drinks (espresso classics, flavoured/Starbucks-style, iced and blended, cold brew, and world coffees), each with several equipment methods and a by-hand way where one exists; dropped for lack of a confident photo: Yuenyeung, Salt Coffee, Yogurt Coffee, Kopi Tubruk, Iced White Chocolate Mocha. Tea is built: 71 drinks (including the boba drinks and the chai and matcha shakes) (black, green/Japanese, white/oolong/pu-erh and regional, herbal, iced) in `src/data/drinks/{blackTeas,greenAndRegionalTeas,herbalTeas,icedTeas,moreTeas}.ts`, sharing `teaBuilders.ts`; dropped: fennel tea (no good photo). Milkshakes and thick shakes are built: 59 drinks in `src/data/drinks/{classicShakes,fruitAndSpecialShakes,moreShakes}.ts` (helpers in `shakeBuilders.ts`; boba in `bobaDrinks.ts`); dropped for lack of a good photo: peach, rocky road, custard apple, papaya, key lime pie, tiramisu, black sesame, kulfi, peanut butter banana, strawberry boba. Smoothies are built: 66 drinks in `src/data/drinks/{fruitSmoothies,otherSmoothies,moreSmoothies}.ts` (helpers in `smoothieBuilders.ts`; includes lassi and chaas); dropped for lack of a good photo: chocolate banana. Mocktails are built: 52 drinks in `src/data/drinks/{classicMocktails,fizzMocktails}.ts` (helpers in `mocktailBuilders.ts`), all alcohol-free and guarded by a data test; dropped for lack of a good photo: Lemongrass Lychee Cooler, Guava Chilli Mojito. Juices are built: 64 drinks in `src/data/drinks/{fruitJuices,blendJuices,greenAndRegionalJuices}.ts` (helpers in `juiceBuilders.ts`); dropped for lack of a good photo: black grape, papaya, plum, cucumber, carrot celery, tomato celery, celery cucumber, wheatgrass, beet ginger shot, lemon cayenne shot, pineapple ginger shot, red banana, jamun. Lemonades and coolers are built: 55 drinks in `src/data/drinks/{lemonades,worldCoolers}.ts` (helpers in `lemonadeBuilders.ts`, reusing `mocktailBuilders.ts`); dropped for lack of a good photo: coconut limeade, nam manao, panakam, sattu sharbat, maracuyá limeade, sekanjabin, cucumber melon cooler, honeydew mint cooler. Sodas and sparkling are built: 48 drinks in `src/data/drinks/{classicSodas,worldSodas,fruitSodas}.ts` (helpers in `sodaBuilders.ts`: each soda offers bottled sparkling water or a soda maker; ginger beer is the quick unfermented kind; floats and shrubs included); dropped for lack of a good photo: root beer float, cola float, cream soda float, black cow, chocolate ice cream soda, vanilla and coconut Italian sodas, tamarind soda, yuzu soda, watermelon soda. Four more drinks were removed in a second photo audit: litchi juice, cardamom lemonade, agua de limón and sour plum cooler. 502 drinks in all. A full photo audit (2026-10-17, tag `checkpoint-before-photo-cull-3`) found ten drinks sharing a near-identical photo with another or showing a weak one, and swapped their photos (no drinks removed): Kopi O, Kopi C, Tamar Hindi, Agua de Tamarindo, Sparkling Lemonade, Lavender Lemon Sparkler, Orange Pineapple Carrot Turmeric Juice, Apple Cinnamon Smoothie, Chocolate Hazelnut Milkshake and Peach Smoothie. A photo audit on 2026-10-15 removed 13 drinks whose photos weren't good enough (tag `checkpoint-before-photo-cull` has them): Peanut Butter Milkshake, Speculoos Milkshake, Sharjah Shake, Rooibos Tea, Lemongrass Tea, Lychee Boba Tea, Mango Boba Tea, Orange Banana Smoothie, Oat & Banana Smoothie, Date & Almond Smoothie, Apple Pear Green Smoothie, Virgin Moscow Mule and Virgin Bellini. Also done: drink-only equipment (26 items, optional equipment per drink), the "Bottle & brass" theme with Cormorant Garamond and Jost, new
logo (steaming mug with equaliser steam; generator script not kept — assets in `assets/`), and all wording changed from food to
drinks (drink types replace cuisines, new flavour/dietary tags, new pantry categories). Anything made with coffee, tea or matcha is filed under Coffee or Tea (a data test enforces it). Next: a fresh phone build. Android package id is `com.subbu.makeandsip` (set 2026-10-19; the earlier `com.subbu.mise` test builds install as a separate app). The repo now has a private GitHub remote, `origin` = `subbu16111977-creator/Make-and-Sip` (main, all checkpoint tags and `archive/mise-food-app` pushed 2026-10-20; pushes need a personal access token typed by the owner in a terminal). Open decisions: none.
