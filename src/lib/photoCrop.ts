/**
 * Geometry for the profile-photo crop. Everything is in "frame units": the
 * round crop window is 1 x 1 and the photo is drawn at some size around it.
 * A crop is stored as { zoom, x, y } next to the photo, so the original is never
 * altered and can be re-adjusted later.
 *
 *  - zoom 1 = the photo just covers the window (its shorter side fits it).
 *  - x, y = how far the photo's centre sits from the window's centre.
 */
export interface PhotoCrop {
  zoom: number;
  x: number;
  y: number;
}

export const MIN_ZOOM = 1;
export const MAX_ZOOM = 4;
export const DEFAULT_CROP: PhotoCrop = { zoom: 1, x: 0, y: 0 };

export function isPhotoCrop(value: unknown): value is PhotoCrop {
  if (typeof value !== "object" || value === null) return false;
  const c = value as Record<string, unknown>;
  return [c.zoom, c.x, c.y].every((n) => typeof n === "number" && Number.isFinite(n));
}

/** Width and height of the drawn photo in frame units, for a photo of the given width/height ratio. */
export function displayedSize(aspect: number, zoom: number): { w: number; h: number } {
  const a = Number.isFinite(aspect) && aspect > 0 ? aspect : 1;
  const coverW = a >= 1 ? a : 1;
  const coverH = a >= 1 ? 1 : 1 / a;
  return { w: coverW * zoom, h: coverH * zoom };
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(Math.max(n, lo), hi);
}

/** Keeps the zoom in range and the photo covering the whole window (no empty corners). */
export function clampCrop(crop: PhotoCrop, aspect: number): PhotoCrop {
  const zoom = clamp(Number.isFinite(crop.zoom) ? crop.zoom : 1, MIN_ZOOM, MAX_ZOOM);
  const { w, h } = displayedSize(aspect, zoom);
  const maxX = Math.max((w - 1) / 2, 0);
  const maxY = Math.max((h - 1) / 2, 0);
  return {
    zoom,
    // `|| 0` turns a negative zero into a plain zero.
    x: clamp(Number.isFinite(crop.x) ? crop.x : 0, -maxX, maxX) || 0,
    y: clamp(Number.isFinite(crop.y) ? crop.y : 0, -maxY, maxY) || 0,
  };
}

/** Changes the zoom, scaling the offset so the same part of the photo stays under the window's centre. */
export function withZoom(crop: PhotoCrop, nextZoom: number, aspect: number): PhotoCrop {
  const zoom = clamp(nextZoom, MIN_ZOOM, MAX_ZOOM);
  const ratio = crop.zoom > 0 ? zoom / crop.zoom : 1;
  return clampCrop({ zoom, x: crop.x * ratio, y: crop.y * ratio }, aspect);
}

/** Moves the photo by a drag of (dx, dy) frame units. */
export function withDrag(crop: PhotoCrop, dx: number, dy: number, aspect: number): PhotoCrop {
  return clampCrop({ ...crop, x: crop.x + dx, y: crop.y + dy }, aspect);
}

/** Pixel position and size of the photo inside a window of `side` points. */
export function layoutFor(crop: PhotoCrop, aspect: number, side: number): { width: number; height: number; left: number; top: number } {
  const safe = clampCrop(crop, aspect);
  const { w, h } = displayedSize(aspect, safe.zoom);
  return {
    width: w * side,
    height: h * side,
    left: (0.5 - w / 2 + safe.x) * side,
    top: (0.5 - h / 2 + safe.y) * side,
  };
}
