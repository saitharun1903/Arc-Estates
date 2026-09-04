/**
 * Canonical Project Order for ARC Avenue
 * 
 * Defines the single authoritative order and numbering for all developments:
 * 01 — ARC Vista (Flagship High-Rise Sky Residences)
 * 02 — ARC Haven (Private Courtyard Luxury Villas)
 * 03 — ARC Terrace (Boutique Terraced Residences)
 * 04 — ARC Origin (Prime Commercial & Retail Landmark)
 */

export const CANONICAL_PROJECT_ORDER = [
  "arc-vista",
  "arc-haven",
  "arc-terrace",
  "arc-origin",
] as const;

export type CanonicalSlug = typeof CANONICAL_PROJECT_ORDER[number];

export const CANONICAL_PROJECT_DATA: Record<
  CanonicalSlug,
  {
    number: string;
    roman: string;
    shortTitle: string;
    category: string;
  }
> = {
  "arc-vista": {
    number: "01",
    roman: "I",
    shortTitle: "ARC Vista",
    category: "Flagship Sky Residences",
  },
  "arc-haven": {
    number: "02",
    roman: "II",
    shortTitle: "ARC Haven",
    category: "Courtyard Villas",
  },
  "arc-terrace": {
    number: "03",
    roman: "III",
    shortTitle: "ARC Terrace",
    category: "Boutique Terraced Residences",
  },
  "arc-origin": {
    number: "04",
    roman: "IV",
    shortTitle: "ARC Origin",
    category: "Commercial Landmark",
  },
};

/**
 * Sorts any array of items containing a `slug` property according to the canonical order.
 */
export function sortProjectsCanonically<T extends { slug: string }>(projects: T[]): T[] {
  return [...projects].sort((a, b) => {
    const idxA = CANONICAL_PROJECT_ORDER.indexOf(a.slug as CanonicalSlug);
    const idxB = CANONICAL_PROJECT_ORDER.indexOf(b.slug as CanonicalSlug);
    const orderA = idxA === -1 ? 999 : idxA;
    const orderB = idxB === -1 ? 999 : idxB;
    return orderA - orderB;
  });
}

/**
 * Returns the zero-padded canonical project number ('01', '02', etc.) for a project slug or index.
 */
export function getProjectNumber(slugOrIndex: string | number): string {
  if (typeof slugOrIndex === "number") {
    return String(slugOrIndex).padStart(2, "0");
  }
  const meta = CANONICAL_PROJECT_DATA[slugOrIndex as CanonicalSlug];
  if (meta) return meta.number;
  const idx = CANONICAL_PROJECT_ORDER.indexOf(slugOrIndex as CanonicalSlug);
  if (idx !== -1) return String(idx + 1).padStart(2, "0");
  return "01";
}
