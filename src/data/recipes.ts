import type { Recipe } from "@/types";
import { coffeeDrinks } from "@/data/drinks/coffee";
import { espressoClassics } from "@/data/drinks/espressoClassics";
import { worldBrewed } from "@/data/drinks/worldBrewed";
import { worldHot } from "@/data/drinks/worldHot";
import { worldIced } from "@/data/drinks/worldIced";
import { blendedAndIced, coldBrewDrinks, hotFlavoured } from "@/data/drinks/espressoFlavoured";

/**
 * The drinks. Make & Sip is growing one type at a time (coffee first); the 642 food dishes the app used to hold were
 * retired and are preserved in Git (tag `checkpoint-final-mise-food-app`, branch `archive/mise-food-app`).
 */
export const recipes: Recipe[] = [...coffeeDrinks, ...espressoClassics, ...hotFlavoured, ...blendedAndIced, ...coldBrewDrinks, ...worldHot, ...worldBrewed, ...worldIced];
