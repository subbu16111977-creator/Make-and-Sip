# Cookability Score

Code: `src/lib/cookability.ts` (all thresholds in `COOKABILITY`), tests in `src/lib/cookability.test.ts`.

## How a drink is scored
1. Each **required** ingredient is matched to a pantry item: `exact`, `alias`, `safe-equivalent` (a generic pantry
   item like "coffee" covers a specific form like ground coffee), `ambiguous` (two different specific forms, e.g. coffee
   beans vs ground coffee), `insufficient` (on hand but not enough) or `missing`. `approved-substitute` is reserved: the
   registry has no substitution rules yet, so it is never produced. Look-alike products (instant coffee, oat milk,
   coconut cream, bottled lemon juice) are never matched to the base ingredient.
2. The amount needed is scaled to the chosen servings (recipe amounts are never edited) and compared with the pantry:
   g/kg/lb/oz, ml/l/tsp/tbsp/cup, and counts (whole/piece = pcs). Fluid ounces are volume, not weight. Weight and volume
   are only compared for ingredients in `DENSITY_G_PER_ML` (sugar, milk, honey, ground coffee and a few more) and the
   result is marked "estimated". Anything else (e.g. "1 cup" of lemon against 500 g of lemon) is **quantity unknown**: full
   credit, never "missing", listed separately. "To taste", "to serve", "for garnish", pinches and the like are
   **not applicable**.
3. Credit per ingredient: enough = 1, short = fraction on hand, ambiguous = 0.5, missing = 0.
4. Score = Σ(weight × credit) / Σ weight × 100. The weight comes from the ingredient's pantry category (`ingredientWeight`):
   - **3, the base of the drink:** Coffee & Tea, Milk & Cream, Juices & Sodas.
   - **2, what gives it character:** Fruit, Sweeteners & Syrups, Ice & Frozen.
   - **1, everything else** (spices, herbs, pantry staples), or 2 when 200 ml/g or more is needed.

   Optional ingredients and garnishes are excluded, so they never lower the score.
5. Equipment is separate and depends on the **method**. A drink has one or more ways to make it, each with its own
   equipment (none for a "by hand" way), steps and, where they differ, ingredients. The score is worked out for the method
   shown: the one the person chose, otherwise the first they own the gear for, otherwise the one missing the least. A
   drink is never "Ready to make" if that method's equipment is missing. Optional equipment (with its "without it" tip)
   never blocks "Ready to make" and never lowers the score.

## Categories
Always these four, with the thresholds in `COOKABILITY`:
- **Ready to make**: no required ingredient missing, short or ambiguous, and all equipment for the method owned.
- **Almost ready**: score ≥ 70 and ≤ 3 problem ingredients among the important (weight 2–3) ones. An equipment gap is shown.
- **Partially matched**: score 40–69 (or ≥ 70 with more problems).
- **Low match**: score < 40.

## Shopping
"Add to Shopping" adds only what is reliably missing: missing ingredients, and top-ups for amounts that are genuinely
short, scaled to the chosen servings. It never adds optional items by default, amounts that could not be verified, or
anything already owned. A top-up is filed under the pantry's own ingredient, so buying it merges into the same pantry item.

## Known limits
- Making a drink only changes the pantry when the person taps "Made it" (shown only when the drink is Ready to make) and confirms
  the checklist. Only reliable amounts are subtracted: same-kind units convert, but weight against volume, unknown amounts,
  optional and "to taste" lines are left alone. An item that runs out is removed, and the update can be undone.
- A bracketed note in an amount, such as "(about 567 g)", is dropped when the amount is scaled for the shopping list.
- There are no substitution rules yet: an ingredient either matches, is a safe generic cover, is ambiguous, or is missing.
