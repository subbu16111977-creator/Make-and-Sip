import { describe, expect, it } from "vitest";
import { normalizeIngredient, resolveIngredientById } from "./ingredientNormalize";

describe("normalizeIngredient — parsing", () => {
  it('parses "1/2 lemon, sliced"', () => {
    const n = normalizeIngredient("1/2 lemon, sliced");
    expect(n.canonicalName).toBe("lemon");
    expect(n.baseIngredient).toBe("lemon");
    expect(n.quantity).toBe(0.5);
    expect(n.unit).toBe("whole");
    expect(n.preparation).toBe("sliced");
    expect(n.needsReview).toBe(false);
  });

  it('parses "18 g ground coffee, freshly ground"', () => {
    const n = normalizeIngredient("18 g ground coffee, freshly ground");
    expect(n.baseIngredient).toBe("coffee");
    expect(n.quantity).toBe(18);
    expect(n.unit).toBe("g");
    expect(n.form).toBe("ground");
    expect(n.preparation).toBe("freshly ground");
  });

  it('parses "3 tomatoes, diced"', () => {
    const n = normalizeIngredient("3 tomatoes, diced");
    expect(n.canonicalName).toBe("tomato");
    expect(n.baseIngredient).toBe("tomato");
    expect(n.quantity).toBe(3);
    expect(n.unit).toBe("piece");
    expect(n.preparation).toBe("diced");
  });

  it('parses "1 large onion, finely chopped"', () => {
    const n = normalizeIngredient("1 large onion, finely chopped");
    expect(n.canonicalName).toBe("onion");
    expect(n.quantity).toBe(1);
    expect(n.preparation).toBe("finely chopped");
  });

  it('parses "2 cloves garlic, minced"', () => {
    const n = normalizeIngredient("2 cloves garlic, minced");
    expect(n.canonicalName).toBe("garlic");
    expect(n.quantity).toBe(2);
    expect(n.unit).toBe("clove");
    expect(n.preparation).toBe("minced");
  });

  it("handles a real drink recipe label (amount in two units, name after)", () => {
    const n = normalizeIngredient("2 tbsp (30 ml) Vanilla syrup");
    expect(n.ingredientId).toBe("vanilla-syrup");
    expect(n.quantity).toBe(2);
    expect(n.unit).toBe("tbsp");
  });

  it("preparation words never change identity — chopped/grated/sliced/crushed/peeled ginger all resolve to ginger", () => {
    for (const text of ["chopped ginger", "grated ginger", "sliced ginger", "crushed ginger", "peeled ginger"]) {
      expect(normalizeIngredient(text).canonicalName).toBe("ginger");
    }
  });
});

describe("normalizeIngredient — must NOT cross-match unrelated ingredients", () => {
  it("lemon != bottled lemon juice", () => {
    const lemon = normalizeIngredient("lemon");
    const bottled = normalizeIngredient("bottled lemon juice");
    expect(lemon.ingredientId).not.toBe(bottled.ingredientId);
    expect(lemon.baseIngredient).not.toBe(bottled.baseIngredient);
  });

  it("instant coffee != ground coffee", () => {
    const instant = normalizeIngredient("instant coffee");
    const ground = normalizeIngredient("ground coffee");
    expect(instant.ingredientId).not.toBe(ground.ingredientId);
    expect(instant.baseIngredient).not.toBe(ground.baseIngredient);
  });

  it("milk != coconut milk", () => {
    const milk = normalizeIngredient("milk");
    const coconutMilk = normalizeIngredient("coconut milk");
    expect(milk.ingredientId).not.toBe(coconutMilk.ingredientId);
    expect(milk.baseIngredient).not.toBe(coconutMilk.baseIngredient);
  });

  it("coconut != coconut milk", () => {
    const coconut = normalizeIngredient("coconut");
    const coconutMilk = normalizeIngredient("coconut milk");
    expect(coconut.ingredientId).not.toBe(coconutMilk.ingredientId);
    expect(coconut.baseIngredient).not.toBe(coconutMilk.baseIngredient);
  });

  it("oat milk != oats", () => {
    const oatMilk = normalizeIngredient("oat milk");
    const oats = normalizeIngredient("oats");
    expect(oatMilk.ingredientId).not.toBe(oats.ingredientId);
    expect(oatMilk.baseIngredient).not.toBe(oats.baseIngredient);
  });

  it("coconut milk != coconut cream", () => {
    const milk = normalizeIngredient("coconut milk");
    const cream = normalizeIngredient("coconut cream");
    expect(milk.ingredientId).not.toBe(cream.ingredientId);
    expect(milk.baseIngredient).not.toBe(cream.baseIngredient);
  });

  it("tomato != tomato sauce", () => {
    const tomato = normalizeIngredient("tomato");
    const tomatoSauce = normalizeIngredient("tomato sauce");
    expect(tomato.ingredientId).not.toBe(tomatoSauce.ingredientId);
    expect(tomato.baseIngredient).not.toBe(tomatoSauce.baseIngredient);
  });
});

describe("normalizeIngredient — meaningful subtypes share a baseIngredient", () => {
  it("coffee beans and ground coffee both base to coffee", () => {
    expect(resolveIngredientById("coffee-beans")!.baseIngredient).toBe("coffee");
    expect(resolveIngredientById("ground-coffee")!.baseIngredient).toBe("coffee");
  });

  it("greek yogurt bases to yogurt, cinnamon stick bases to cinnamon", () => {
    expect(resolveIngredientById("greek-yogurt")!.baseIngredient).toBe("yogurt");
    expect(resolveIngredientById("cinnamon-stick")!.baseIngredient).toBe("cinnamon");
  });
});

describe("normalizeIngredient — unresolved text", () => {
  it("flags gibberish as needing review instead of inventing a confident match", () => {
    const n = normalizeIngredient("xyzzy flibbertigibbet");
    expect(n.ingredientId).toBeNull();
    expect(n.needsReview).toBe(true);
    expect(n.confidence).toBe(0);
  });
});
