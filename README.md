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

- `src/data/recipes.ts` — 99 recipes. Each has an `image` URL (Unsplash,
  loaded over the network). Three recipes currently have a blank image and
  show a "Photo coming soon" placeholder rather than a wrong photo.
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

The image script cannot tell whether a photo shows the right dish; that still
needs a person to look at each photo next to its title.

## Next

A recipe-image review, then collections and
guest mode. See `PROJECT_HANDOFF.md` for the full picture.
