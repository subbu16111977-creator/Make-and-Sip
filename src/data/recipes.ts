import type { Recipe } from "@/types";
import { coffeeDrinks } from "@/data/drinks/coffee";
import { espressoClassics } from "@/data/drinks/espressoClassics";
import { blackTeas } from "@/data/drinks/blackTeas";
import { greenAndRegionalTeas } from "@/data/drinks/greenAndRegionalTeas";
import { herbalTeas } from "@/data/drinks/herbalTeas";
import { icedTeas } from "@/data/drinks/icedTeas";
import { moreTeas } from "@/data/drinks/moreTeas";
import { menuCoffees, menuTeas } from "@/data/drinks/menuAdditions";
import { classicShakes, thickShakes } from "@/data/drinks/classicShakes";
import { fruitAndSpecialShakes } from "@/data/drinks/fruitAndSpecialShakes";
import { bobaDrinks } from "@/data/drinks/bobaDrinks";
import { fruitSmoothies } from "@/data/drinks/fruitSmoothies";
import { breakfastSmoothies, greenSmoothies, lassis, regionalSmoothies } from "@/data/drinks/otherSmoothies";
import { worldBrewed } from "@/data/drinks/worldBrewed";
import { worldHot } from "@/data/drinks/worldHot";
import { worldIced } from "@/data/drinks/worldIced";
import { blendedAndIced, coldBrewDrinks, hotFlavoured } from "@/data/drinks/espressoFlavoured";

/**
 * The drinks. Make & Sip is growing one type at a time (coffee first); the 642 food dishes the app used to hold were
 * retired and are preserved in Git (tag `checkpoint-final-mise-food-app`, branch `archive/mise-food-app`).
 */
export const recipes: Recipe[] = [...coffeeDrinks, ...espressoClassics, ...hotFlavoured, ...blendedAndIced, ...coldBrewDrinks, ...worldHot, ...worldBrewed, ...worldIced, ...blackTeas, ...greenAndRegionalTeas, ...herbalTeas, ...icedTeas, ...moreTeas, ...menuCoffees, ...menuTeas, ...classicShakes, ...thickShakes, ...fruitAndSpecialShakes, ...bobaDrinks, ...fruitSmoothies, ...greenSmoothies, ...breakfastSmoothies, ...lassis, ...regionalSmoothies];
