import type { Recipe } from "@/types";
import { coffeeDrinks } from "@/data/drinks/coffee";

/**
 * The drinks. Make & Sip starts with a handful of coffees and grows from here; the 642 food dishes the app used to
 * hold were retired and are preserved in Git (tag `checkpoint-final-mise-food-app`, branch `archive/mise-food-app`).
 */
export const recipes: Recipe[] = [...coffeeDrinks];
