/**
 * Photos bundled with the app (assets/recipes/). A recipe points at one by
 * setting `image: "local:<recipe-id>"`. Metro needs a literal require() for
 * every file, so each photo is listed here by hand.
 */
export const LOCAL_IMAGE_PREFIX = "local:";

export const localRecipeImages: Record<string, number> = {
  "aloo-gobi": require("../../assets/recipes/aloo-gobi.jpg"),
  "bengali-crab-curry": require("../../assets/recipes/bengali-crab-curry.jpg"),
  "goan-crab-curry": require("../../assets/recipes/goan-crab-curry.jpg"),
  "malabar-crab-roast": require("../../assets/recipes/malabar-crab-roast.jpg"),
  "mirchi-ka-salan": require("../../assets/recipes/mirchi-ka-salan.jpg"),
};
