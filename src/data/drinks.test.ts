import { describe, expect, it } from "vitest";
import { recipes } from "./recipes";
import { CUISINE_OPTIONS, CUISINE_OTHER } from "@/lib/profile";
import { parseAmount, normalizeIngredient, resolveIngredientById } from "@/lib/ingredientNormalize";
import { computeCookability, isQualitative } from "@/lib/cookability";
import { addPantryItem } from "@/lib/inventoryActions";
import type { PantryItem } from "@/types";

const TASTES = ["Sweet", "Fruity", "Creamy", "Refreshing", "Tangy", "Bitter", "Spicy", "Herbal", "Rich"];
const DIETS = ["Vegan", "Dairy-Free", "Caffeine-Free", "Low Sugar", "Gluten-Free"];

describe("the drinks", () => {
  it("each has the fields the app relies on", () => {
    const bad: string[] = [];
    for (const r of recipes) {
      if (!/^[a-z0-9-]+$/.test(r.id)) bad.push(`${r.id}: id should be lowercase-hyphenated`);
      if (r.temperature !== "hot" && r.temperature !== "cold") bad.push(`${r.id}: temperature must be hot or cold`);
      if (!(CUISINE_OPTIONS as readonly string[]).includes(r.cuisine) || r.cuisine === CUISINE_OTHER) bad.push(`${r.id}: unknown drink type "${r.cuisine}"`);
      if (r.prepMinutes + r.cookMinutes !== r.timeMinutes) bad.push(`${r.id}: prep + make time must equal the total`);
      if (r.servings < 1) bad.push(`${r.id}: servings`);
      if (r.description.length < 30) bad.push(`${r.id}: description too thin`);
      for (const t of r.tasteTags) if (!TASTES.includes(t)) bad.push(`${r.id}: unknown taste "${t}"`);
      for (const d of r.dietTags) if (!DIETS.includes(d)) bad.push(`${r.id}: unknown dietary tag "${d}"`);
      if (r.tasteTags.length === 0) bad.push(`${r.id}: needs a taste tag`);
      if (r.image === "") bad.push(`${r.id}: needs a verified photo`);
      if (!r.image.startsWith("https://images.pexels.com/photos/") && !r.image.startsWith("https://images.unsplash.com/")) bad.push(`${r.id}: photo must be Pexels or Unsplash`);
      if (r.image.includes("plus.unsplash.com")) bad.push(`${r.id}: Unsplash+ photos are paywalled`);
    }
    expect(bad).toEqual([]);
  });

  it("every drink has distinct ids, titles and photos", () => {
    const dup = (values: string[]) => values.filter((v, i) => values.indexOf(v) !== i);
    expect(dup(recipes.map((r) => r.id))).toEqual([]);
    expect(dup(recipes.map((r) => r.title.toLowerCase()))).toEqual([]);
    expect(dup(recipes.map((r) => r.image.split("?")[0]))).toEqual([]);
  });

  it("every required ingredient, in every method, has an amount that can be read, or is a to-taste style amount", () => {
    const bad: string[] = [];
    for (const r of recipes) {
      const lists = [r.ingredients, ...(r.methods ?? []).map((m) => m.ingredients ?? [])];
      for (const i of lists.flat()) {
        const { quantity } = parseAmount(i.amount);
        if (quantity === null && !isQualitative(i)) bad.push(`${r.id}: "${i.amount}" ${i.label}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it("every way of making every drink works from names typed into the pantry with that method's equipment", () => {
    const stuck: string[] = [];
    for (const r of recipes) {
      for (const m of r.methods ?? []) {
        let pantry: PantryItem[] = [];
        for (const i of m.ingredients ?? r.ingredients) {
          const name = resolveIngredientById(i.pantryId)?.displayName ?? i.pantryId;
          pantry = addPantryItem(pantry, { name, category: "Pantry Staples", quantity: 100000, unit: "g", location: "Pantry", expiresInDays: 30 }).items;
        }
        const c = computeCookability(r, pantry, m.equipment, r.servings, m.id);
        if (c.category !== "ready") stuck.push(`${r.id}/${m.id} (${c.category})`);
      }
    }
    expect(stuck).toEqual([]);
  });

  it("offers a by-hand way for the coffees where one is possible, and the app has both hot and cold drinks", () => {
    const withByHand = recipes.filter((r) => (r.methods ?? []).some((m) => m.equipment.length === 0));
    expect(withByHand.length).toBeGreaterThan(0);
  });

  it("files anything made with coffee, tea or matcha under Coffee or Tea, wherever the recipe came from", () => {
    const COFFEE = new Set(["coffee", "ground-coffee", "coffee-beans", "instant-coffee"]);
    const TEA = new Set(["black-tea", "assam-tea", "darjeeling-tea", "earl-grey-tea", "green-tea", "sencha", "dragon-well-tea", "genmaicha", "hojicha", "matcha-powder", "jasmine-tea", "white-tea", "oolong-tea", "puerh-tea", "chamomile-tea", "peppermint-tea", "rooibos-tea", "hibiscus-flowers", "butterfly-pea-flowers", "roasted-barley"]);
    const misfiled: string[] = [];
    for (const r of recipes) {
      const lines = [...r.ingredients, ...(r.methods ?? []).flatMap((m) => m.ingredients ?? [])].filter((i) => !i.optional);
      const usesCoffee = lines.some((i) => COFFEE.has(i.pantryId));
      const usesTea = lines.some((i) => TEA.has(i.pantryId));
      if (usesCoffee && r.cuisine !== "Coffee" && !usesTea) misfiled.push(`${r.id} (${r.cuisine}) uses coffee`);
      if (usesTea && r.cuisine !== "Tea" && !usesCoffee) misfiled.push(`${r.id} (${r.cuisine}) uses tea`);
    }
    expect(misfiled).toEqual([]);
  });

  it("is hot or cold, and the app has both", () => {
    expect(new Set(recipes.map((r) => r.temperature))).toEqual(new Set(["hot", "cold"]));
  });
});

describe("coffee and milk names", () => {
  const id = (t: string) => normalizeIngredient(t).ingredientId;
  it("recognises everyday coffee ingredient names", () => {
    const known: [string, string][] = [
      ["ground coffee", "ground-coffee"],
      ["Coffee beans", "coffee-beans"],
      ["espresso beans", "coffee-beans"],
      ["instant coffee", "instant-coffee"],
      ["nescafe", "instant-coffee"],
      ["whole milk", "milk"],
      ["Oat milk", "oat-milk"],
      ["condensed milk", "sweetened-condensed-milk"],
      ["double cream", "heavy-cream"],
      ["ice cubes", "ice"],
      ["cocoa", "cocoa-powder"],
      ["demerara sugar", "brown-sugar"],
    ];
    for (const [text, expected] of known) expect(id(text), text).toBe(expected);
  });
  it("keeps look-alikes apart: oat milk is not milk, instant is not ground, beans are not grounds", () => {
    expect(id("oat milk")).not.toBe(id("milk"));
    expect(id("almond milk")).not.toBe(id("milk"));
    expect(id("instant coffee")).not.toBe(id("ground coffee"));
    expect(id("coffee beans")).not.toBe(id("ground coffee"));
    expect(id("condensed milk")).not.toBe(id("milk"));
  });
  it("plain 'coffee' covers beans or grounds, but the cut is flagged for a person to check", () => {
    expect(resolveIngredientById("ground-coffee")?.baseIngredient).toBe("coffee");
    expect(resolveIngredientById("coffee-beans")?.baseIngredient).toBe("coffee");
    expect(resolveIngredientById("instant-coffee")?.baseIngredient).not.toBe("coffee");
  });
});
