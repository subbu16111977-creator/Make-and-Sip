/** Ease-in-out cubic: starts and ends gently, fastest in the middle. Maps 0..1 -> 0..1. */
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * How long the slideshow's rewind from the last slide to the first takes:
 * a little longer per slide crossed so the glide never looks like a whip,
 * capped so it never drags.
 */
export function rewindDuration(slidesToCross: number): number {
  return Math.min(1600, 600 + slidesToCross * 120);
}

/** Position partway through a glide from `fromX` to `toX`, `elapsedMs` into a `durationMs` animation. */
export function glidePosition(fromX: number, toX: number, elapsedMs: number, durationMs: number): number {
  const t = Math.min(1, Math.max(0, elapsedMs / durationMs));
  return fromX + (toX - fromX) * easeInOutCubic(t);
}
