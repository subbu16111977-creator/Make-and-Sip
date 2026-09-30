import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { recipes } from "./recipes";

/**
 * Structural checks on recipe images — the fast, automatic half of the
 * image audit. These catch missing/malformed/duplicate/untrusted image
 * references on every test run (including CI), so a future edit to
 * recipes.ts can't silently reintroduce one.
 *
 * What this does NOT do: verify a photo actually shows the right dish.
 * That takes a human (or a vision-capable review pass) looking at each
 * photo next to its title and description — see the 2026-09-27 visual
 * audit in the project history for the full manual review, and
 * `scripts/check-recipe-images.js` for the same missing/broken/duplicate
 * checks run against the live URLs (this test only checks shape, not
 * whether the URL currently resolves).
 */

// Every recipe intentionally missing a verified photo shows the app's
// neutral fallback instead of a wrong one — tracked here so the list
// only changes on purpose, not by accident.
const EXPECTED_MISSING_PHOTO = new Set<string>(["chicken-alfredo-pizza"]);

// Photo hosts whose license permits free commercial use without needing
// per-photo attribution tracking beyond `imageAttribution` on the recipe.
const TRUSTED_IMAGE_HOSTS = ["https://images.unsplash.com/", "https://images.pexels.com/"];
const LOCAL_PREFIX = "local:";

describe("recipe images — structural validity", () => {
  it("every recipe has an image field of the expected shape (a trusted URL, or deliberately blank)", () => {
    for (const recipe of recipes) {
      expect(typeof recipe.image, `${recipe.id} is missing an image field`).toBe("string");
      if (recipe.image === "") continue;
      if (recipe.image.startsWith(LOCAL_PREFIX)) {
        const file = join(__dirname, "../../assets/recipes", `${recipe.image.slice(LOCAL_PREFIX.length)}.jpg`);
        expect(existsSync(file), `${recipe.id} points at a missing local photo (${file})`).toBe(true);
        continue;
      }
      expect(
        TRUSTED_IMAGE_HOSTS.some((host) => recipe.image.startsWith(host)),
        `${recipe.id} image is not from a trusted host (${recipe.image})`
      ).toBe(true);
    }
  });

  it("a blank image is only ever the intentional 'needs a verified photo' set, not a silent omission", () => {
    const actuallyBlank = new Set(recipes.filter((r) => !r.image).map((r) => r.id));
    expect(actuallyBlank).toEqual(EXPECTED_MISSING_PHOTO);
  });

  it("no two recipes share the same underlying photo", () => {
    const byPhoto = new Map<string, string[]>();
    for (const recipe of recipes) {
      if (!recipe.image) continue;
      const key = recipe.image.split("?")[0]; // strip query params — same photo id, different crop/size is still a duplicate
      const list = byPhoto.get(key) ?? [];
      list.push(recipe.id);
      byPhoto.set(key, list);
    }
    const duplicates = [...byPhoto.entries()].filter(([, ids]) => ids.length > 1);
    expect(duplicates, `duplicate photos found: ${JSON.stringify(duplicates)}`).toEqual([]);
  });

  it("every recipe id is unique (guards the duplicate-photo check above from false negatives)", () => {
    const ids = recipes.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
