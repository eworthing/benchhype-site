/**
 * Build a site-relative URL from a path, normalizing against Astro's BASE_URL.
 *
 * Accepts both slash-prefixed paths ('/support') and bare paths ('support').
 * Correctly handles GitHub Pages sub-path deployments where BASE_URL may be
 * '/benchhype-site/' — avoids the double-slash that bare concatenation produces
 * when the caller passes a leading slash.
 *
 * Deletion test: removing this function forces every caller to re-implement
 * the slash-stripping rule and the BASE_URL convention — it earns its keep.
 */
export const url = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
