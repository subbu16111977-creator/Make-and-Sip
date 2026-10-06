import { describe, expect, it } from "vitest";
import { DEFAULT_CROP, MAX_ZOOM, MIN_ZOOM, clampCrop, displayedSize, isPhotoCrop, layoutFor, withDrag, withZoom } from "./photoCrop";

describe("photo crop geometry", () => {
  it("covers the window at zoom 1 for wide, tall and square photos", () => {
    expect(displayedSize(2, 1)).toEqual({ w: 2, h: 1 });
    expect(displayedSize(0.5, 1)).toEqual({ w: 1, h: 2 });
    expect(displayedSize(1, 1)).toEqual({ w: 1, h: 1 });
  });
  it("keeps zoom within its range", () => {
    expect(clampCrop({ zoom: 99, x: 0, y: 0 }, 1).zoom).toBe(MAX_ZOOM);
    expect(clampCrop({ zoom: 0.1, x: 0, y: 0 }, 1).zoom).toBe(MIN_ZOOM);
  });
  it("never lets the photo leave an empty corner", () => {
    // Square photo at zoom 1 can't move at all.
    expect(clampCrop({ zoom: 1, x: 0.4, y: -0.4 }, 1)).toEqual({ zoom: 1, x: 0, y: 0 });
    // A wide photo can move sideways but not up/down at zoom 1.
    const c = clampCrop({ zoom: 1, x: 5, y: 5 }, 2);
    expect(c.x).toBeCloseTo(0.5);
    expect(c.y).toBe(0);
    // Zoomed in, there is room to move.
    expect(clampCrop({ zoom: 2, x: 0.4, y: 0 }, 1).x).toBeCloseTo(0.4);
    expect(clampCrop({ zoom: 2, x: 9, y: 0 }, 1).x).toBeCloseTo(0.5);
  });
  it("dragging moves the photo and stays clamped", () => {
    const zoomed = { zoom: 2, x: 0, y: 0 };
    expect(withDrag(zoomed, 0.2, -0.1, 1)).toEqual({ zoom: 2, x: 0.2, y: -0.1 });
    expect(withDrag(zoomed, 5, 0, 1).x).toBeCloseTo(0.5);
  });
  it("zooming keeps the offset in proportion and re-clamps when zooming out", () => {
    const z = withZoom({ zoom: 2, x: 0.4, y: 0.2 }, 3, 1);
    expect(z.zoom).toBe(3);
    expect(z.x).toBeCloseTo(0.6);
    const out = withZoom({ zoom: 3, x: 1, y: 0 }, 1, 1);
    expect(out).toEqual({ zoom: 1, x: 0, y: 0 });
  });
  it("survives bad numbers", () => {
    expect(clampCrop({ zoom: NaN, x: Infinity, y: NaN }, 1)).toEqual({ zoom: 1, x: 0, y: 0 });
    expect(displayedSize(NaN, 2)).toEqual({ w: 2, h: 2 });
  });
  it("lays the photo out in points, centred by default", () => {
    expect(layoutFor(DEFAULT_CROP, 2, 100)).toEqual({ width: 200, height: 100, left: -50, top: 0 });
  });
  it("validates stored crops", () => {
    expect(isPhotoCrop({ zoom: 1.5, x: 0, y: 0.1 })).toBe(true);
    expect(isPhotoCrop({ zoom: "1" })).toBe(false);
    expect(isPhotoCrop(null)).toBe(false);
  });
});
