import { describe, expect, it } from "vitest";
import { colors, semantic, shade } from "./colors";

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

describe("theme colours", () => {
  const surfaces = [colors.cream, colors.paper, colors.parchment];
  it("text passes WCAG AA (4.5:1) on every surface", () => {
    for (const surface of surfaces) {
      expect(contrast(colors.espresso, surface)).toBeGreaterThanOrEqual(4.5);
      expect(contrast(colors.espressoMuted, surface)).toBeGreaterThanOrEqual(4.5);
      expect(contrast(colors.espressoFaint, surface)).toBeGreaterThanOrEqual(4.5);
    }
  });
  it("the accent reads on the surfaces, and button text reads on the accent", () => {
    for (const surface of surfaces) expect(contrast(colors.burntOrange, surface)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(semantic.onPrimary, semantic.primary)).toBeGreaterThanOrEqual(4.5);
  });
  it("shade builds a wash of the app's own dark surface", () => {
    expect(shade(0.5)).toBe("rgba(22, 16, 13, 0.5)");
    expect(colors.scrim).toBe(shade(0.5));
  });
});
