# Mise

A pantry-and-recipe app built to feel like a premium cookbook, not a
generic template. Answers one question: *what can I cook with what I
already have?*

Built with Expo (SDK 57), React Native, TypeScript and Expo Router. It runs
on iOS, Android and the web.

## What's built

- **Home** (`src/app/(tabs)/index.tsx`) — a hero recipe chosen by the
  matching algorithm (favouring dishes that use soon-to-expire
  ingredients), a "Use these first" rail, and a "You have enough for…" rail.
- **Discover** (`src/app/(tabs)/discover.tsx`) — every recipe ranked by how
  much of it your pantry already covers, with search and Taste, Cuisine and
  Diet filters. Recipes that need equipment you haven't ticked in
  Pantry > Equipment are hidden, and the header shows how many dishes are
  currently available.
- **Pantry** (`src/app/(tabs)/pantry.tsx`) — add and remove ingredients
  (with storage location and expiry), plus an Equipment checklist.
- **Shopping** (`src/app/(tabs)/shopping.tsx`) — add items by hand or send
  a recipe's missing ingredients to the list. Checking an item off moves it
  into Pantry, and Discover re-ranks straight away.
- **Recipe detail** (`src/app/recipe/[id].tsx`) — have/missing ingredients,
  method, save, and "add missing items to Shopping".
- **Saved** (`src/app/(tabs)/saved.tsx`) — recipes you've bookmarked.

## Data

- `src/data/recipes.ts` — 118 recipes: 93 Indian-and-other-cuisine recipes
  from the original build, plus 25 researched American-cuisine recipes added
  2026-09-29 (Southern/soul food, Creole/Cajun, Texas & regional BBQ, New
  England, Midwestern, Native American, American comfort food and desserts
  — see git tag `checkpoint-american-cuisine-complete`). Every recipe has a
  verified `image`: a trusted Unsplash or Pexels URL (loaded over the
  network), or `local:<recipe-id>` for a photo bundled in `assets/recipes/`
  and registered in `src/data/localRecipeImages.ts` (none are used right
  now). American recipes also carry `sourceName`/`sourceUrl`, pointing at
  the culinary institution, museum or publication used to research them.
  Five older dishes (Aloo Gobi, Malabar Crab Roast, Bengali Crab Curry, Goan
  Crab Curry, Mirchi ka Salan) were removed rather than shown with a wrong
  or unlicensed photo; they can return once a properly licensed photo
  exists (see git tag `checkpoint-user-photos`). 15 of the originally
  researched 40 American dishes (collard greens, jambalaya, crawfish
  étouffée, Boston cream pie, tater tot hotdish, Wisconsin beer cheese
  soup, Cincinnati chili, Pennsylvania Dutch chicken pot pie, shoofly pie,
  scrapple, Hoppin' John, Lowcountry shrimp and grits, Gullah red rice,
  Kansas City burnt ends, Navajo frybread) were removed 2026-09-29 because
  no confident, correctly-matching, free photo could be found for them
  after checking Unsplash, Pexels and Pixabay — see git tag
  `checkpoint-before-removing-photoless-dishes` for their full recipes if
  they're wanted back once a photo exists. Known imperfect matches on the
  older dishes: `dal-makhani` (lighter than the traditional near-black),
  `rasam` (thicker than classic).
- `src/data/pantry.ts` — 46 starting pantry ingredients across nine
  categories.
- `src/data/ingredients.ts` — the shared ingredient dictionary. Recipes,
  Pantry and Shopping all resolve to it, which is how "chicken" in your
  pantry counts toward a recipe that needs chicken thighs.
- `src/lib/pantryMatch.ts` — the pantry-to-recipe matching logic. Nothing is
  hard-coded; "have 5 of 6" is always computed.

**Saved on the device:** Pantry, Shopping, Saved and Equipment are stored
locally with AsyncStorage (plain, unencrypted key-value storage; not for
secrets) under the keys `mise.pantry.v1`, `mise.shopping.v1`,
`mise.saved.v1` and `mise.equipment.v1`, and come back after a restart. The
starting pantry is only used the first time, or if stored data is missing or
unreadable. There is no cloud sync or account yet, so data stays on that one
device/browser. The code is in `src/lib/usePersistedState.ts`,
`src/lib/storage.ts` and `src/lib/persistedShapes.ts`.

Note that the starting pantry's expiry dates are fixed when it is first saved,
so those demo items will show as expiring or expired as real days pass.

## Running it

```bash
npm install
npx expo start        # then press i / a / w, or scan the QR code with Expo Go
```

For the browser, `npx expo start --web` opens it at http://localhost:8081.

## Checks

```bash
npx tsc --noEmit                      # type check
npm test                              # unit tests (matching, ingredients, inventory actions)
npx expo lint                         # lint
node scripts/check-recipe-images.js   # flags missing, broken or duplicate recipe image URLs
```

`npm test` includes `src/data/recipeImages.test.ts`, which checks (on every
run, including CI) that every recipe's image is either a trusted Unsplash or
Pexels URL, a bundled local photo that exists on disk, or a deliberately-blank
id tracked in `EXPECTED_MISSING_PHOTO` (currently none — every recipe has a
photo), and that no two recipes share a photo. Neither that test nor
`check-recipe-images.js` can tell whether a photo shows the *right* dish —
that took a manual visual review (2026-09-27 for the original 93, 2026-09-29
for the 25 American additions) of every photo against its recipe's title,
description and ingredients, and needs re-doing by a person (or a
vision-capable pass) whenever recipes or images change again.

## Next

Sourcing (or being given) photos for the 15 American dishes that were
removed for lack of one — their full recipes are preserved at git tag
`checkpoint-before-removing-photoless-dishes` and can be reinstated once a
verified photo exists for each. Also possibly a second batch of American
dishes to round the cuisine out further. Then
collections and guest mode. See `PROJECT_HANDOFF.md` for the full picture.
