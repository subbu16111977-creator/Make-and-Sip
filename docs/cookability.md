# Cookability Score

Code: `src/lib/cookability.ts` (all thresholds in `COOKABILITY`), tests in `src/lib/cookability.test.ts`.

## How a drink is scored
1. Each **required** ingredient is matched to a pantry item: `exact`, `alias`, `safe-equivalent` (a generic pantry
   item like "chicken" covers a specific cut), `ambiguous` (two different specific cuts, e.g. thigh vs breast),
   `insufficient` (on hand but not enough) or `missing`. `approved-substitute` is reserved — the registry has no
   substitution rules yet, so it is never produced. Look-alike products (chicken stock, garlic powder, tomato sauce)
   are never matched to the base ingredient.
2. The amount needed is scaled to the chosen servings (recipe amounts are never edited) and compared with the pantry:
   g/kg/lb/oz, ml/l/tsp/tbsp/cup, and counts (whole/piece = pcs). Weight↔volume is only compared for ingredients in
   `DENSITY_G_PER_ML` and is marked "estimated". Anything else (e.g. "1 onion" vs 200 g) is **quantity unknown**:
   full credit, never "missing", listed separately. "To taste", "for frying", pinches etc. are **not applicable**.
3. Credit per ingredient: enough = 1, short = fraction on hand, ambiguous = 0.5, missing = 0.
4. Score = Σ(weight × credit) / Σ weight × 100. Weights: meat/seafood/grains/pulses 3; vegetables/fruit/dairy/frozen 2;
   spices and staples 1 (2 when ≥ 200 ml/g is needed). Optional ingredients are excluded.
5. Equipment is separate and depends on the **method**: a drink has one or more ways to make it, each with its own
   equipment (none for a "by hand" way), steps and, where they differ, ingredients. The score is worked out for the method
   shown: the one the person chose, otherwise the first they own the gear for, otherwise the one missing the least. A
   drink is never "Ready to make" if that method's equipment is missing.

## Categories
- **Ready to make** — no required ingredient missing, short or ambiguous, and all equipment owned.
- **Almost ready** — score ≥ 70 and ≤ 3 problem ingredients among the important (weight 2–3) ones (equipment gap is shown).
- **Partially matched** — score 40–69 (or ≥ 70 with more problems).
- **Low match** — score < 40.

## Known limits
- "Add to Shopping" scales the recipe's amounts to the chosen servings (a bracketed note like "(about 4 thighs)" is dropped when scaled).
