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
import { moreSmoothies } from "@/data/drinks/moreSmoothies";
import { moreShakes } from "@/data/drinks/moreShakes";
import { classicMocktails } from "@/data/drinks/classicMocktails";
import { fizzMocktails, frozenMocktails } from "@/data/drinks/fizzMocktails";
import { fruitJuices } from "@/data/drinks/fruitJuices";
import { blendJuices, vegetableJuices } from "@/data/drinks/blendJuices";
import { greenJuices, juiceShots, regionalJuices } from "@/data/drinks/greenAndRegionalJuices";
import { classicLemonades, herbLemonades } from "@/data/drinks/lemonades";
import { indianCoolers, latinCoolers, limeades, worldCoolers } from "@/data/drinks/worldCoolers";
import { classicSodas } from "@/data/drinks/classicSodas";
import { worldSodas } from "@/data/drinks/worldSodas";
import { fruitSodas } from "@/data/drinks/fruitSodas";
import { worldBrewed } from "@/data/drinks/worldBrewed";
import { worldHot } from "@/data/drinks/worldHot";
import { worldIced } from "@/data/drinks/worldIced";
import { blendedAndIced, coldBrewDrinks, hotFlavoured } from "@/data/drinks/espressoFlavoured";

/**
 * The drinks. Make & Sip is growing one type at a time (coffee first); the 642 food dishes the app used to hold were
 * retired and are preserved in Git (tag `checkpoint-final-mise-food-app`, branch `archive/mise-food-app`).
 */
export const recipes: Recipe[] = [...coffeeDrinks, ...espressoClassics, ...hotFlavoured, ...blendedAndIced, ...coldBrewDrinks, ...worldHot, ...worldBrewed, ...worldIced, ...blackTeas, ...greenAndRegionalTeas, ...herbalTeas, ...icedTeas, ...moreTeas, ...menuCoffees, ...menuTeas, ...classicShakes, ...thickShakes, ...fruitAndSpecialShakes, ...bobaDrinks, ...fruitSmoothies, ...greenSmoothies, ...breakfastSmoothies, ...lassis, ...regionalSmoothies, ...moreSmoothies, ...moreShakes, ...classicMocktails, ...fizzMocktails, ...frozenMocktails, ...fruitJuices, ...vegetableJuices, ...blendJuices, ...greenJuices, ...juiceShots, ...regionalJuices, ...classicLemonades, ...herbLemonades, ...limeades, ...indianCoolers, ...latinCoolers, ...worldCoolers, ...classicSodas, ...worldSodas, ...fruitSodas];
