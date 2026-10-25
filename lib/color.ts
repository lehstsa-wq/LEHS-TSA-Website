/**
 * A solid tint of `color`: `percent`% of it mixed into the page background.
 * The site is fully opaque, so this replaces hex-alpha strings like `${c}20`.
 * Works with palette variables such as `var(--accent)`.
 */
export const tint = (color: string, percent: number) =>
  `color-mix(in srgb, ${color} ${percent}%, var(--c-bg))`;
