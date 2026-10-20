import { describe, expect, it } from "vitest";
import { repeatStep, servingsFactor } from "./servingSteps";

describe("making more than one serving", () => {
  it("works out the multiple from the recipe's own servings", () => {
    expect(servingsFactor(2, 1)).toBe(2);
    expect(servingsFactor(8, 4)).toBe(2);
    expect(servingsFactor(3, 0)).toBe(1);
  });
  it("adds a repeat step for each extra batch", () => {
    expect(repeatStep(1)).toBeNull();
    expect(repeatStep(2)).toBe("Repeat this once more.");
    expect(repeatStep(3)).toBe("Repeat this twice.");
    expect(repeatStep(4)).toBe("Repeat this three times.");
    expect(repeatStep(24)).toBe("Repeat this 23 more times.");
  });
  it("adds none for a part-batch", () => {
    expect(repeatStep(1.5)).toBeNull();
    expect(repeatStep(0.5)).toBeNull();
  });
});
