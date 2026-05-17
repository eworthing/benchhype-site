# Review History

Per-loop archive of `CURRENT_REVIEW.md`, appended at Step 3 step 9 of each loop.

--- Loop 1 (UTC 2026-05-16T21:25:00Z) ---

<!-- loop_cap: 5 -->

# Contest Refactor Review

## Discovery

- **Project**: BenchHype marketing site — static Astro 6 site, GitHub Pages deploy.
- **Stack**: Node / TypeScript / Astro 6 (`astro check && astro build`).
- **Selected lens**: `lens-generic.md` (Node section).
- **Source roots**: `src/components/` (8 .astro), `src/pages/` (5 .astro), `src/layouts/BaseLayout.astro`, `src/content/site.ts`, `src/styles/global.css` (289 lines).
- **Build command**: `npm run build`. Verified green: 5 pages, 0 errors, 0 warnings, 1 hint (inline-script JSON-LD — see F1).
- **Test command**: none. `astro check` only correctness gate. test_scope: full.
- **Working tree dirty paths**: `["sequential-dazzling-book.md"]` (no overlap with blast radius).
- **Provider**: `claude_code`, loop_model: `claude-sonnet-4-6`, spawn_isolation: `subagent`, loop_cap: 5.

---

### Loop Counter
Loop 1 of 5 (cap)

### System Flag
[STATE: CONTINUE]

---

## Contest Verdict

**Good app, but not top-tier yet**

For a static marketing site, the architecture is commendably flat: a single `site.ts` content module feeding all components, no costume layers, no redundant seams. The structural findings are real but local — a Schema.org honesty leak that misrepresents the product to search crawlers, a parallel icons array that silently mismaps on content growth, and BASE_URL construction scattered across 9 call sites in 7 files.

## Scorecard (1–10)

- **Architecture quality**: 7.5 | Delta: SAME | Proof: `src/content/site.ts` flat DAG with `as const`, components as pure template leaves. Residual: parallel icons array at `BenefitGrid.astro:4-8`; BASE_URL pattern repeated across 7 files.
- **State management and runtime ownership**: 10 | Delta: SAME | Proof: `site.ts:206` — `as const` literal; zero mutable runtime state. 10-anchor: no mutable state to own.
- **Concurrency and runtime safety**: 10 | Delta: SAME | Proof: no async/await, no Promise, no event handlers. Static gen. 10-anchor: concurrency genuinely N/A.
- **Test strategy and regression resistance**: 3 | Delta: SAME | Proof: zero test files. `astro check` type correctness only. 9-anchor far from met.
- **Overall implementation credibility**: 7.5 | Delta: SAME | Proof: `BaseLayout.astro:60-63` claims `price: "0"` for paid app. Honesty leak.
- **Domain modeling**: 7.0 | Delta: SAME | Proof: `site.ts as const` correct. Residual: icons in parallel array in `BenefitGrid.astro` instead of `site.ts`.
- **Data flow and dependency design**: 8.5 | Delta: SAME | Proof: single `site.ts` data source, DAG clean. Residual: BASE_URL at 9 call sites, two inconsistent patterns.
- **Framework / platform best practices**: 8.5 | Delta: SAME | Proof: Astro idioms correct. Residual: `astro(4000)` hint on `BaseLayout.astro:53`.
- **Code simplicity and clarity**: 7.5 | Delta: SAME | Proof: `Hero.astro:22-77` 55-line hardcoded mockup + 165 CSS lines, disconnected from `site.ts`.

## Authority Map

No mutable runtime concerns. Static site.

| Concern | Owner | Writers | Readers | Persistence | Async mutations | Verdict |
|---|---|---|---|---|---|---|
| Page content | `src/content/site.ts` (build-time `as const`) | None | All 8 components, 3 pages | None | None | Single and clear |
| URL prefix | `import.meta.env.BASE_URL` | None | 9 call sites, 7 files | None | None | Single and clear |

## Strengths That Matter

- `site.ts as const` genuine content centralization — every component reads from it without duplicating content.
- `FAQList.astro` typed `interface Props` — callers in control.
- `BaseLayout.astro` Astro slot composition — deletion test passes.

## Findings

### Finding F1: Schema.org structured data claims free pricing for a paid app
**Severity**: Noticeable weakness | **stable_id**: F-001
**Evidence**: `src/layouts/BaseLayout.astro:60-63`, `src/content/site.ts:167`
Hardcoded `"price": "0"` applies to all tiers; pro tier is a one-time purchase. The schema falsely claims all versions are free.

### Finding F2: BenefitGrid parallel icons array silently mismatches on content growth
**Severity**: Noticeable weakness | **stable_id**: F-002
**Evidence**: `src/components/BenefitGrid.astro:4-8`, `src/components/BenefitGrid.astro:15-18`, `src/content/site.ts:26-39`
3-element icons array indexed against site.benefits. Adding a 4th benefit renders an icon-less card with no error.

### Finding F3: BASE_URL construction repeated at 9 call sites across 7 files with inconsistent patterns
**Severity**: Noticeable weakness | **stable_id**: F-003
**Evidence**: `SiteHeader.astro:13,19,33`, `SiteFooter.astro:10-12`, `FAQList.astro:33`, `support.astro:71-73`, `404.astro:10`
Two patterns: regex-strip in SiteHeader; bare concat in SiteFooter/pages. Inconsistency can produce double-slash on GitHub Pages.

### Finding F4: Hero device mockup is 220 lines of hardcoded simulation disconnected from site.ts
**Severity**: Cosmetic for contest | **stable_id**: F-004
**Evidence**: `Hero.astro:28-63`, `Hero.astro:67`, `Hero.astro:80-286`
12 hardcoded tile labels and "Game Opener Mix" player title — no derivation from site.ts.

## Simplification Check

| Field | Value |
|---|---|
| structurally_necessary | F1 fix removes factual inaccuracy from Schema.org structured data. Passes deletion test. |
| new_seam_justified | false |
| helpful_simplification | Purely subtractive — fewer lines, more honest. |
| should_not_be_done | Adding pricing-aware Schema.org renderer. |
| tests_after_fix | No tests exist; no test changes. `astro check` is the gate. |

## Improvement Backlog

1. F1 — Correct Schema.org structured data — structural — needed for winning
2. F2 — Inline icons into site.ts benefit entries — structural — helpful
3. F3 — Extract url() helper — structural — helpful

## Final Judge Narrative

Place — good, not winning. site.ts as flat content source is right. Three fixable structural weaknesses: Schema.org honesty leak, parallel icons array, scattered BASE_URL. Test strategy zero but forgivable for pure static site. Concurrency and state 10 honestly. Hero mockup drift is cosmetic for contest but real for production.

## Loop 1 Result

Changed `src/layouts/BaseLayout.astro`: added `is:inline` to JSON-LD script tag; restructured `offers` to name only the free tier (`site.pricing.free.title, price: "0"`); replaced hardcoded `operatingSystem` with `site.iosRequirement`. `npm run build`: 0 errors, 0 warnings, **0 hints** (was 1 hint pre-fix). F1 (stable_id F-001) resolved.

## Loop 1 Implementation Review

Verdict: **approved**. All three checks passed: F1 pattern no longer in source; offers array scoped to free tier only; astro(4000) hint eliminated; no regression introduced.
