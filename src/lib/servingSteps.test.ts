import { describe, expect, it } from "vitest";
import { repeatStep, scaleLabelCounts, servingsFactor } from "./servingSteps";

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

describe("amounts written inside an ingredient name", () => {
  it("scale with the servings, with the right singular or plural", () => {
    expect(scaleLabelCounts("Vanilla ice cream, 3 scoops", 2)).toBe("Vanilla ice cream, 6 scoops");
    expect(scaleLabelCounts("Vanilla ice cream, 2 scoops", 0.5)).toBe("Vanilla ice cream, 1 scoop");
    expect(scaleLabelCounts("Caramel sauce, 30 ml in the blend and 15 ml to drizzle", 2)).toBe("Caramel sauce, 60 ml in the blend and 30 ml to drizzle");
  });
  it("leaves names without a count, and one serving, alone", () => {
    expect(scaleLabelCounts("2% milk", 3)).toBe("2% milk");
    expect(scaleLabelCounts("Vanilla ice cream, 3 scoops", 1)).toBe("Vanilla ice cream, 3 scoops");
  });
});
