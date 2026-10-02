import { describe, expect, it } from "vitest";
import { STARTER_STAPLES } from "./starterStaples";
import { normalizeIngredient } from "@/lib/ingredientNormalize";

describe("starter staples", () => {
  it("every staple resolves to a distinct registry ingredient", () => {
    const ids = STARTER_STAPLES.map((s) => normalizeIngredient(s.name).ingredientId);
    expect(ids.every((id) => id !== null)).toBe(true);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
