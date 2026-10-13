# Make & Sip

A drinks pantry app. Tell it what you have, and it shows which drinks you can make now, which are almost there,
and what to buy. Coffee, tea, milkshakes and thick shakes, smoothies, mocktails, juices, lemonades and coolers,
sodas and sparkling drinks, and hot drinks.

Built with Expo (SDK 57), React Native, TypeScript and Expo Router. It runs on iOS, Android and the web.

> The app is mid-migration from "Mise", a food pantry/recipe app. The food version is preserved in Git
> (tag `checkpoint-final-mise-food-app`, branch `archive/mise-food-app`). See `CLAUDE.md` for the product direction
> and rules, and `docs/cookability.md` for how matching and the score work.

## Screens
- **Home** — what you can make now, almost-there drinks, quick drinks, picks for you, and a way in by drink type.
- **Pantry** — your ingredients (with quantities) and your equipment.
- **Discover** — every drink ranked by how much of it your pantry covers, with search and filters for taste, type and
  dietary needs.
- **Shopping** — add what a drink is missing, or add items by hand.
- **Saved** and **Favourites** — drinks to come back to.
- **Profile** — an optional, on-device profile of the drinks and flavours you like.

## Run it
```bash
npm install
npx expo start --web --port 8081
```

Checks: `npx vitest run`, `npx tsc --noEmit`, `npx expo lint`.
