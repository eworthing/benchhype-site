# Codebase Audit Report

**Project:** benchhype-site
**Date:** 2026-03-28
**Overall Score: 8.0 / 10**

## Executive Summary

BenchHype Site is a small, well-structured static marketing site built with Astro 6 and deployed to GitHub Pages. The codebase is clean, minimal, and free of security vulnerabilities. The primary areas for improvement are dead code cleanup, DRY violations in prose page styling, and missing type-checking tooling in devDependencies.

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Astro 6.0.8 (static output) |
| Language | TypeScript (strict), CSS |
| Build | Astro/Vite |
| CI/CD | GitHub Actions (withastro/action@v3) |
| Hosting | GitHub Pages |
| Node | >=22.12.0 |

**Project type:** Static website (SSG) — no server runtime, no database, no API endpoints.

**Inapplicable audit categories:**
- Observability (ln-627): N/A — static site, no runtime server
- Concurrency (ln-628): N/A — static site, no concurrent operations
- Lifecycle (ln-629): N/A — static site, no server lifecycle

---

## Category Scores

| # | Category | Score | Priority | Findings |
|---|----------|-------|----------|----------|
| 1 | Security | 9/10 | CRITICAL | 1 LOW |
| 2 | Build | 8/10 | CRITICAL | 2 MEDIUM |
| 3 | Code Principles | 7/10 | HIGH | 2 MEDIUM |
| 4 | Code Quality | 9/10 | MEDIUM | 0 |
| 5 | Dependencies | 9/10 | MEDIUM | 1 LOW |
| 6 | Dead Code | 6/10 | LOW | 4 MEDIUM, 1 LOW |
| 7 | Observability | N/A | — | Not applicable (static site) |
| 8 | Concurrency | N/A | — | Not applicable (static site) |
| 9 | Lifecycle | N/A | — | Not applicable (static site) |

---

## Strengths

1. **Minimal dependency surface** — single production dependency (`astro`), zero vulnerabilities, minimal attack surface
2. **Clean data architecture** — all content centralized in `src/content/site.ts` with `as const` typing, making updates safe and consistent
3. **Accessible by default** — `aria-labelledby` on all sections, `aria-label` on navigation, `sr-only` utility, `prefers-reduced-motion` support, semantic HTML throughout
4. **Responsive design** — mobile breakpoints on all major components, mobile navigation with `<details>` (no JS required)
5. **SEO & social** — canonical URLs, Open Graph, Twitter cards, structured data (JSON-LD), proper meta descriptions
6. **Clean build** — zero errors, zero actionable warnings, 636ms build time

---

## Findings

### 1. Security (9/10)

| Severity | Finding | Location | Recommendation |
|----------|---------|----------|----------------|
| LOW | No Content-Security-Policy headers | Hosting config | Add CSP headers via `_headers` file or Astro middleware if supported by hosting. Low risk for a static site with no inline scripts or external resources. |

**Notes:**
- `set:html` usage in `BenefitGrid.astro:19` uses static SVG literals defined in the same file — safe, no injection vector
- `set:html` usage in `BaseLayout.astro:53` uses `JSON.stringify()` for structured data — safe, properly escaped
- External link in `privacy.astro:37` correctly uses `rel="noopener noreferrer"`
- `.env` and `.env.production` properly listed in `.gitignore`
- `npm audit`: 0 vulnerabilities

### 2. Build (8/10)

| Severity | Finding | Location | Recommendation |
|----------|---------|----------|----------------|
| MEDIUM | Missing `@astrojs/check` and `typescript` in devDependencies | `package.json` | Add `npm i -D @astrojs/check typescript` to enable `astro check` in CI and locally |
| MEDIUM | Astro outdated (6.0.8 -> 6.1.1) | `package.json:15` | Update to `6.1.1` for latest patches |

**Notes:**
- Build succeeds cleanly: 5 pages, 636ms
- Single Vite warning about unused imports from `@astrojs/internal-helpers/remote` — internal to Astro, not actionable
- Node engine constraint `>=22.12.0` matches CI config (`node-version: 22`)
- CI workflow uses `withastro/action@v3` and `actions/deploy-pages@v4` — current versions

### 3. Code Principles (7/10)

| Severity | Finding | Location | Recommendation |
|----------|---------|----------|----------------|
| MEDIUM | DRY violation: `.prose` styles duplicated | `privacy.astro:97-141`, `support.astro:78-121` | Extract shared `.prose` styles to `global.css` or a `Prose.astro` layout component |
| MEDIUM | Inconsistent badge rendering pattern | `Hero.astro:16-18` vs `BadgeRow.astro` | Hero has inline badge rendering while a dedicated `BadgeRow` component exists unused. Choose one approach. |

**Notes:**
- Content centralization in `site.ts` is excellent — single source of truth
- Component decomposition is clean and follows single-responsibility
- 8 TODO comments across the codebase are legitimate pre-launch placeholders (support email, App Store URL, screenshots, analytics) — tracked for awareness, not penalized

### 4. Code Quality (9/10)

No findings. The codebase demonstrates:

- Low cyclomatic complexity across all components
- Consistent naming conventions (kebab-case CSS, PascalCase components)
- Clean file organization (content, components, layouts, pages, styles)
- Props interfaces defined where needed (`FAQList`, `BaseLayout`)
- CSS custom properties used consistently for theming
- Responsive breakpoints applied uniformly

### 5. Dependencies (9/10)

| Severity | Finding | Location | Recommendation |
|----------|---------|----------|----------------|
| LOW | Astro 6.0.8 is behind latest 6.1.1 | `package.json:15` | Run `npm update astro` — minor version, low risk |

**Notes:**
- 0 vulnerabilities (`npm audit`)
- Lock file present (`package-lock.json`)
- Only 1 production dependency — exemplary minimal surface
- No unused dependencies

### 6. Dead Code (6/10)

| Severity | Finding | Location | Recommendation |
|----------|---------|----------|----------------|
| MEDIUM | `BadgeRow.astro` is never imported | `src/components/BadgeRow.astro` | Delete the file or use it (Hero.astro has inline badge rendering instead) |
| MEDIUM | `appStoreUrl` property never referenced in templates | `src/content/site.ts:27` | Wire up to CTA button or remove until needed |
| MEDIUM | `betaUrl` property never referenced in templates | `src/content/site.ts:29` | Wire up or remove until needed |
| MEDIUM | Screenshot `<img>` tags commented out, placeholder divs used instead | `src/components/ScreenshotGallery.astro:17-27` | Expected pre-launch state, but the `public/screenshots/` directory is empty (only `.gitkeep`) |
| LOW | `--success` and `--warning` CSS custom properties never used | `src/styles/global.css:28-29` | Remove or use. If reserved for future use, document intent. |

---

## Advisory Findings

These items were flagged but downgraded to advisory based on project context:

| Finding | Reason for Advisory |
|---------|-------------------|
| 8 TODO comments across codebase | Legitimate pre-launch placeholders (support email, App Store URL, screenshots, analytics). These represent planned work, not code debt. |
| Placeholder screenshots | Pre-launch state — screenshot data structure is well-defined, images just need to be added. |
| `supportEmail: "TODO@example.com"` | Placeholder, but should be replaced before public launch to avoid confusion. |

---

## Recommended Actions (Priority Order)

1. **Add type-checking tooling** — `npm i -D @astrojs/check typescript`, add `astro check` to CI
2. **Extract shared prose styles** — deduplicate `privacy.astro` / `support.astro` `.prose` CSS
3. **Remove dead code** — delete `BadgeRow.astro`, remove unused CSS vars and `site.ts` properties
4. **Update Astro** — `npm update astro` (6.0.8 -> 6.1.1)
5. **Pre-launch checklist** — replace TODO placeholders (support email, App Store URL, screenshots)
