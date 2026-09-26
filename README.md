# Mise

A pantry-and-recipe app built to feel like a premium cookbook, not a
generic template. Answers one question: *what can I cook with what I
already have?*

## What's built in this pass

Per the staged brief, this pass ships the **design system + app
shell + Home screen only**:

1. **Design tokens** — `src/theme/` (colors, typography, spacing,
   radii, shadows). Warm cream/parchment surfaces, restrained burnt
   orange, Fraunces serif for editorial moments, Inter for everything
   functional.
2. **App shell** — Expo Router, five-tab bottom navigation with
   hand-drawn line icons (`src/components/icons.tsx`), a custom tab
   bar (`src/app/(tabs)/_layout.tsx`).
3. **Home screen** (`src/app/(tabs)/index.tsx`) — greeting header, a
   full-bleed hero recipe (chosen by a real matching algorithm that
   favors recipes using soon-to-expire ingredients), a horizontal
   "Use these first" ingredient rail, a "You have enough for…" recipe
   rail, and a pantry summary card.
4. **Loading / empty / error states** — `src/components/States.tsx`,
   wired into Home for real (a skeleton shows on mount; an empty
   state shows if the pantry has zero items).
5. Pantry, Discover, Shopping, and Saved are honest "next up"
   placeholders (`src/components/ComingSoon.tsx`) — not faked
   functionality, just a clear signal of what's staged next.

## Data

`src/data/pantry.ts` and `src/data/recipes.ts` hold realistic seed
content — 41 pantry ingredients across all nine storage categories,
and 14 recipes with real, hand-picked editorial food photography
(licensed Unsplash images, verified and reviewed frame-by-frame, not
random stock). `src/lib/pantryMatch.ts` has the actual
pantry-to-recipe matching logic (no hardcoded "have 5 of 6" labels —
it's computed).

## Running it

```bash
npm install
npx expo start        # then press i / a / w, or scan the QR code
```

To sanity-check the design without a simulator, export the static web
build and open it in a browser:

```bash
npx expo export -p web --output-dir dist
npx serve dist
```

`npx tsc --noEmit` is clean.

## Next stages

Pantry (add-ingredient flow), Discover, recipe detail, Shopping list,
Saved/collections, local persistence, guest mode — in that order, per
the original brief's implementation sequence.
