/**
 * Photos bundled with the app (assets/recipes/). A recipe points at one by
 * setting `image: "local:<recipe-id>"`. Metro needs a literal require() for
 * every file, so each photo is listed here by hand, e.g.
 *   "my-dish": require("../../assets/recipes/my-dish.jpg"),
 * Empty for now: every recipe currently uses a licensed Unsplash photo.
 */
export const LOCAL_IMAGE_PREFIX = "local:";

export const localRecipeImages: Record<string, number> = {};
