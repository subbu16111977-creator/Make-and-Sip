const WORDS = ["", "once more", "twice", "three times", "four times", "five times", "six times", "seven times", "eight times", "nine times", "ten times"];

/** How many servings the drink is being made for, as a multiple of what the recipe makes; 1 when it can't be said. */
export function servingsFactor(chosen: number, recipeServings: number): number {
  return recipeServings > 0 ? chosen / recipeServings : 1;
}

/**
 * The last step added when more than one batch is made: the method is written for one, so the rest is "repeat it".
 * Only whole multiples get a step; a part-batch (1.5×) just has its amounts scaled.
 */
export function repeatStep(factor: number): string | null {
  const batches = Math.round(factor);
  if (batches < 2 || Math.abs(factor - batches) > 1e-9) return null;
  const repeats = batches - 1;
  return `Repeat this ${repeats < WORDS.length ? WORDS[repeats] : `${repeats} more times`}.`;
}
