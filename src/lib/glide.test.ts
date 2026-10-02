import { describe, expect, it } from "vitest";
import { easeInOutCubic, glidePosition, rewindDuration } from "./glide";

describe("slideshow rewind glide", () => {
  it("easing starts at 0, ends at 1, and never goes backwards", () => {
    expect(easeInOutCubic(0)).toBe(0);
    expect(easeInOutCubic(1)).toBe(1);
    let prev = 0;
    for (let i = 1; i <= 100; i++) {
      const v = easeInOutCubic(i / 100);
      expect(v).toBeGreaterThanOrEqual(prev);
      prev = v;
    }
  });

  it("moves smoothly from the last slide to the first with no overshoot or big jumps", () => {
    const from = 2000;
    const to = 0;
    const duration = rewindDuration(3);
    let prev = from;
    let maxStep = 0;
    for (let t = 16; t <= duration + 16; t += 16) {
      const x = glidePosition(from, to, t, duration);
      expect(x).toBeLessThanOrEqual(prev);
      expect(x).toBeGreaterThanOrEqual(to);
      maxStep = Math.max(maxStep, prev - x);
      prev = x;
    }
    expect(prev).toBe(to);
    // fastest frame stays a modest slice of the trip, never a snap
    expect(maxStep).toBeLessThan(from * 0.06);
  });

  it("takes longer for longer trips, within a cap", () => {
    expect(rewindDuration(1)).toBeLessThan(rewindDuration(5));
    expect(rewindDuration(100)).toBe(1600);
  });
});
