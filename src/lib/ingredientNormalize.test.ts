import { describe, expect, it } from "vitest";
import { normalizeIngredient, resolveIngredientById } from "./ingredientNormalize";

describe("normalizeIngredient — parsing", () => {
  it('parses "1/4 chicken, chopped into pieces"', () => {
    const n = normalizeIngredient("1/4 chicken, chopped into pieces");
    expect(n.canonicalName).toBe("chicken");
    expect(n.baseIngredient).toBe("chicken");
    expect(n.quantity).toBe(0.25);
    expect(n.unit).toBe("whole");
    expect(n.preparation).toBe("chopped into pieces");
    expect(n.needsReview).toBe(false);
  });

  it('parses "500 g boneless chicken breast, sliced"', () => {
    const n = normalizeIngredient("500 g boneless chicken breast, sliced");
    expect(n.canonicalName).toBe("chicken_breast");
    expect(n.baseIngredient).toBe("chicken");
    expect(n.quantity).toBe(500);
    expect(n.unit).toBe("g");
    expect(n.form).toBe("boneless");
    expect(n.preparation).toBe("sliced");
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

  it("handles the real chicken-thigh recipe label (form word before the head noun)", () => {
    const n = normalizeIngredient(
      "1 1/2 lb (700 g) Boneless, skinless chicken thighs, cut into 1 1/2-inch pieces"
    );
    expect(n.ingredientId).toBe("chicken-thigh");
    expect(n.baseIngredient).toBe("chicken");
    expect(n.quantity).toBe(1.5);
    expect(n.unit).toBe("lb");
    expect(n.form).toBe("boneless skinless");
  });

  it("preparation words never change identity — chopped/diced/sliced/cooked/roasted chicken all resolve to chicken", () => {
    for (const text of ["chopped chicken", "diced chicken", "sliced chicken", "cooked chicken", "roasted chicken"]) {
      expect(normalizeIngredient(text).canonicalName).toBe("chicken");
    }
  });
});

describe("normalizeIngredient — must NOT cross-match unrelated ingredients", () => {
  it("chicken != chicken stock", () => {
    const chicken = normalizeIngredient("chicken");
    const stock = normalizeIngredient("chicken stock");
    expect(chicken.ingredientId).not.toBe(stock.ingredientId);
    expect(chicken.baseIngredient).not.toBe(stock.baseIngredient);
  });

  it("chicken != chicken sausage", () => {
    const chicken = normalizeIngredient("chicken");
    const sausage = normalizeIngredient("chicken sausage");
    expect(chicken.baseIngredient).not.toBe(sausage.baseIngredient);
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

  it("rice != rice flour", () => {
    const rice = normalizeIngredient("rice");
    const riceFlour = normalizeIngredient("rice flour");
    expect(rice.ingredientId).not.toBe(riceFlour.ingredientId);
    expect(rice.baseIngredient).not.toBe(riceFlour.baseIngredient);
  });

  it("potato != sweet potato", () => {
    const potato = normalizeIngredient("potato");
    const sweetPotato = normalizeIngredient("sweet potato");
    expect(potato.ingredientId).not.toBe(sweetPotato.ingredientId);
    expect(potato.baseIngredient).not.toBe(sweetPotato.baseIngredient);
  });

  it("tomato != tomato sauce", () => {
    const tomato = normalizeIngredient("tomato");
    const tomatoSauce = normalizeIngredient("tomato sauce");
    expect(tomato.ingredientId).not.toBe(tomatoSauce.ingredientId);
    expect(tomato.baseIngredient).not.toBe(tomatoSauce.baseIngredient);
  });
});

describe("normalizeIngredient — meaningful subtypes share a baseIngredient", () => {
  it("chicken thigh and chicken breast both base to chicken", () => {
    const thigh = resolveIngredientById("chicken-thigh")!;
    const breast = resolveIngredientById("chicken-breast")!;
    expect(thigh.baseIngredient).toBe("chicken");
    expect(breast.baseIngredient).toBe("chicken");
  });

  it("cherry tomato bases to tomato, basmati rice bases to rice, red onion bases to onion", () => {
    expect(resolveIngredientById("cherry-tomato")!.baseIngredient).toBe("tomato");
    expect(resolveIngredientById("basmati-rice")!.baseIngredient).toBe("rice");
    expect(resolveIngredientById("red-onion")!.baseIngredient).toBe("onion");
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
