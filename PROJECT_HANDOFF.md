# Mise — Project Handoff (Cowork → Claude Code)

Written 2026-09-26 after a read-only inspection. No app code was changed.
Everything below was checked against the actual files unless marked
**(not verified in a running app)**.

## 1. What the app is

Mise is a mobile "what can I cook with what I already have?" app with a
premium-cookbook look (dark/espresso + cream/parchment, burnt-orange accent,
Fraunces serif headings, Inter body text). You keep a pantry, and the app
ranks recipes by how much of each one you can already make. Recipes that need
equipment you don't own are hidden.

## 2. Tech

- Expo SDK 57 (`expo ~57.0.24`), React Native 0.86, React 19, TypeScript.
- Expo Router (file-based navigation) in `src/app/`. Entry: `"main": "expo-router/entry"` in `package.json`; root layout `src/app/_layout.tsx`.
- Runs on iOS, Android and web (`react-native-web`).
- Tests: Vitest (logic only, no screen tests). Lint: `expo lint`.
- No backend and no database. Nothing is saved between app launches.

## 3. Where things live

| Thing | Location |
|---|---|
| Recipe data (99 recipes) | `src/data/recipes.ts` (4,137 lines) |
| Recipe images | `image:` field on each recipe in `src/data/recipes.ts` — remote Unsplash URLs, not files in the project |
| Image fallback | `src/components/RecipeImage.tsx` ("Photo coming soon") |
| Ingredient dictionary (146 canonical ingredients + synonyms) | `src/data/ingredients.ts` |
| Starting pantry (46 items) | `src/data/pantry.ts` |
| Live app data (in memory only) | `src/context/PantryContext.tsx`, `ShoppingContext.tsx`, `SavedContext.tsx`, `EquipmentContext.tsx` |
| Data shapes | `src/types/index.ts` |
| Matching / ranking logic | `src/lib/pantryMatch.ts` |
| Add/merge/dedupe logic | `src/lib/inventoryActions.ts`, `src/lib/ingredientNormalize.ts` |
| Design tokens | `src/theme/` |
| Reusable UI pieces | `src/components/` |
| Image check script | `scripts/check-recipe-images.js` |

## 4. Features and the files that control them

| Feature | Status | Files |
|---|---|---|
| Home (hero recipe, "use these first", "you have enough for…") | Built | `src/app/(tabs)/index.tsx`, `RecipeHero.tsx`, `ExpiringIngredientCard.tsx` |
| Discover (search, Taste / Cuisine / Diet filters, ranked grid) | Built | `src/app/(tabs)/discover.tsx`, `lib/pantryMatch.ts` (`rankRecipesForDiscover`) |
| Pantry (add/remove items, storage locations, expiry, Equipment checklist + "unlock" celebration) | Built | `src/app/(tabs)/pantry.tsx`, `PantryContext`, `EquipmentContext`, `UnlockCelebration.tsx` |
| Shopping (add by hand, check off, clear checked, add-missing-from-recipe) | Built | `src/app/(tabs)/shopping.tsx`, `ShoppingContext`, `lib/inventoryActions.ts` |
| Recipe detail (ingredients with have/missing, steps, save, add missing to Shopping) | Built | `src/app/recipe/[id].tsx` |
| Saved | Built (thin) | `src/app/(tabs)/saved.tsx`, `SavedContext` |
| Checking off a shopping item moves it into Pantry | Built, unit-tested | `ShoppingContext.toggleChecked` → `PantryContext.receiveFromShopping` → `inventoryActions.addOrMergeItem` |

Health check today: `npx tsc --noEmit` clean; `vitest` 43/43 tests pass; the
image script reports 0 broken URLs and 0 duplicates.

## 5. Unfinished

- **Persistence.** Pantry, Shopping, Saved and Equipment reset to defaults on every restart. The code comments call out AsyncStorage/Supabase as the plan.
- **No accounts, guest mode, or sync** (original brief listed these).
- **Saved is a plain list**, no collections.
- **3 recipes have no photo** (see §7).
- **No screen/UI tests**, and no evidence in the repo of on-device testing.
- Discover search only looks at title and description, not ingredients.

## 6. Known bugs and weak spots

Found by reading the code. **(not verified in a running app)**

1. **Check → uncheck → check adds to Pantry twice.** Checking buys and merges into Pantry. Unchecking deliberately doesn't remove it (by design, documented). Checking again merges again, so quantities double.
2. **Discover heading says "99 dishes" even when equipment hides some.** It counts all recipes, not the filtered list (`discover.tsx`, `recipes.length`).
3. **Hero "expiring" match compares `pantryId` to the pantry item's `id`** rather than its `ingredientId` (`pantryMatch.ts`, `pickHeroMatch`). Works for seed items; fragile for items added later.
4. **Shopping-added Pantry items are always "Pantry" location with 14-day expiry** — a guess, not the real storage/expiry.
5. **README is out of date.** It says Pantry/Discover/Shopping/Saved are placeholders, 14 recipes, 41 pantry items. Reality: all built, 99 recipes, 46 pantry items.
6. **Dangling references to missing files.** `RecipeImage.tsx` mentions `/audit/recipe-image-audit.json` and the image script mentions `/audit/rejected-images.json`. Neither exists (see §9).
7. Vitest prints a config warning (`vitest.config.ts` uses ESM syntax in a CommonJS package). Harmless.
8. `imageAttribution` is set on only 1 of 99 recipes.

## 7. The recipe-image issue

- Every recipe has an `image:` URL pointing at Unsplash (`images.unsplash.com/...`). 96 of 99 load (HTTP OK, checked today), no two recipes share a photo.
- **Photos (updated):** no recipes are blank now. Five dishes (aloo-gobi, malabar-crab-roast, bengali-crab-curry, goan-crab-curry, mirchi-ka-salan) were removed because no licensed photo was available. 93 recipes remain.
- **The script cannot tell if a photo matches its dish.** It only checks missing/broken/duplicate. Whether each of the 96 photos actually shows the right dish was decided by a visual review in Cowork, and the record of that review (`/audit/*.json`) isn't in the project. Treat "photos are correct" as **unverified** until re-reviewed.
- **Risk:** photos are hotlinked, so if Unsplash removes one, that recipe silently breaks. Downloading photos into the app (or your own storage) would remove the risk.
- Only 1 recipe records an attribution.

## 8. The Pantry / Shopping / Discover issue

Per code comments, the old bug was that Shopping and Pantry kept **separate, disconnected lists**, so buying something never made it show up in Pantry or improve Discover results, and free-text names ("chicken", "Chicken thighs") never matched recipe ingredients.

What the code does now:
- One **ingredient dictionary** (`data/ingredients.ts`) gives every recipe ingredient, pantry item and shopping item the same identity. All 1,271 recipe ingredient references resolve to it (0 unresolved).
- Shopping is nested inside Pantry, so checking an item off updates Pantry in the same action, and Discover/Home re-rank immediately.
- Matching is recomputed from live Pantry each time (`getRecipeAvailability`), never stored on recipes.
- Subtype matching ("have chicken" covers "chicken thighs") and quantity checks (500 g vs 1 kg) are implemented and unit-tested.

Status: the logic and tests look sound, but I have **not** confirmed in the running app that the buy → Pantry → Discover flow feels right. Remaining gaps are bug #1, #3 and #4 above, plus no persistence.

## 9. Was all the Cowork work carried over?

- The project folder is **byte-identical to your newest export**, `~/Downloads/mise-app_10.zip` (14:39 today), apart from `node_modules`/`.expo`. So nothing in that export is missing.
- **Missing / not present:**
  - The `/audit/` folder (`recipe-image-audit.json`, `rejected-images.json`) referenced by code. It isn't in any of the 11 zips, so it likely lived only inside Cowork's workspace.
  - **Git history.** This folder is not a git repository. Zips `mise-app_6` to `_9` contain a `.git` folder (older history), zip 10 does not. If you want history, it can be recovered from zip 9.
  - The Cowork conversation itself and any decisions made only in chat.
- I can't prove nothing was lost inside Cowork that never made it into an export.
- Old versions: `mise-app.zip` … `mise-app_9.zip` in `~/Downloads`. Left untouched.
- Unrelated to the app: `~/Downloads/App/` holds a few website pages (privacy, terms, support, delete-account). Not part of this project.

## 10. How to run and preview

```bash
cd ~/Downloads/mise
npx expo start          # then press i (iOS simulator), a (Android), w (web), or scan the QR with Expo Go
```

Web-only: `npx expo start --web`. Checks: `npx tsc --noEmit`, `npm test`, `npx expo lint`, `node scripts/check-recipe-images.js`.
`node_modules` is already installed. A dev server was last run on web today and bundled without errors (per `.expo/dev/logs/start.log`). Everything used is Expo Go-compatible (no custom native code).

## 11. Recommended next steps (in order, all need your approval first)

1. **Put the project under git** (fresh repo, first commit = current state) so there's a safe rollback point.
2. **Run the app and look at every tab** with you, to confirm the real state of Discover/Pantry/Shopping before changing anything.
3. **Fix the small bugs** (#1 double-add, #2 dish count, #3 hero matching, #5 README).
4. **Add persistence** (save Pantry, Shopping, Saved, Equipment on the device).
5. **Finish images:** re-review all 96 photos against titles, find photos for the 3 blanks, and consider hosting photos ourselves.
6. Then the remaining brief items: collections, guest mode/accounts.
