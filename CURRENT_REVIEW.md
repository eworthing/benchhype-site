<!-- loop_cap: 5 -->

# Contest Refactor Review

## Discovery

- **Project**: BenchHype marketing site — static Astro 6 site, GitHub Pages deploy.
- **Stack**: Node / TypeScript / Astro 6 (`astro check && astro build`).
- **Selected lens**: `lens-generic.md` (Node section).
- **Source roots**: `src/components/` (8 .astro), `src/pages/` (5 .astro), `src/layouts/BaseLayout.astro`, `src/content/site.ts`, `src/styles/global.css` (289 lines).
- **Public assets**: `public/screenshots/` (6 .webp), `public/features/` (7 .webp), `favicon`, `og-image`, `CNAME`.
- **Build command**: `npm run build` (`astro check && astro build`). Verified green this loop: 5 pages generated, 0 errors, 0 warnings, 0 hints.
- **Test command**: none — no unit/e2e tests in repo. `astro check` is the only correctness gate.
- **test_scope**: full (no `--test-filter`).
- **CONTEXT.md / docs/adr**: absent. `docs/project/` exists but empty for ADRs.
- **Domain terms**: site, hero, feature, benefit, workflow, screenshot, FAQ, pricing, board, cue, roster, script — all from `src/content/site.ts`.
- **Working tree dirty paths**: `["sequential-dazzling-book.md"]` (untracked screenshot-capture plan at repo root; no overlap with Step 2 blast radius which targets `src/content/site.ts` and `src/components/BenefitGrid.astro`).
- **Provider**: `claude_code` (CLAUDECODE=1).
- **loop_model**: `claude-sonnet-4-6` (default per provider-adapters.md).
- **reviewer_model**: `claude-sonnet-4-6` (default per provider-adapters.md).
- **spawn_isolation**: `subagent` (Loop Isolation active).
- **loop_cap**: 5 (overridden via inline directive; small surface limits expected loop count).

---

### Loop Counter
Loop 2 of 5 (cap)

### System Flag
[STATE: CONTINUE]

---

## Contest Verdict

**Good app, but not top-tier yet**

Loop 1 fixed the Schema.org honesty leak and silenced the Astro hint; loop 2 eliminates the parallel icons array that silently mismatched on content growth. The architecture is commendably flat with `site.ts` as the single content source, now with full type enforcement on benefit icons. Remaining structural findings are BASE_URL scatter (F-003, 7 files) and the Hero mockup (F-004, cosmetic). Test strategy remains zero — genuinely N/A for a static site with no runtime domain logic.

## Scorecard (1–10)

- **Architecture quality**: 8.0 | Delta: UP | Proof: `src/components/BenefitGrid.astro` parallel icons array removed (commit this loop); `src/content/site.ts:26-39` each benefit now carries its own `icon` field. DAG remains flat. Residual blocking higher: BASE_URL construction still scattered across 7 files (F-003).
- **State management and runtime ownership**: 10 | Delta: SAME | Proof: `src/content/site.ts` — `as const` literal; zero mutable runtime state. 10-anchor: no behavior-preserving improvement available — there is no mutable state to own.
- **Concurrency and runtime safety**: 10 | Delta: SAME | Proof: no `async/await`, no `Promise`, no event handlers. Astro SSG builds synchronous template trees. Concurrency is genuinely N/A.
- **Test strategy and regression resistance**: 3 | Delta: SAME | Proof: zero test files in repo. `astro check` provides type correctness only. No behavioral tests. 9-anchor not met — framework-constrained acceptable residual for a static site with no runtime domain logic.
- **Overall implementation credibility**: 8.0 | Delta: UP | Proof: Loop 1 commit `56056b6` fixed Schema.org honesty leak (F-001). Loop 2 eliminates the parallel-array invariant violation (F-002). Both visible honesty hazards now gone. Remaining residual: Hero.astro:28-63 (12 hardcoded tile labels disconnected from site.ts — cosmetic).
- **Domain modeling**: 7.5 | Delta: UP | Proof: `src/content/site.ts:26-39` — each `benefits[]` entry now carries an `icon` field typed as string by `as const`. Missing icon = TypeScript type error at build time. The domain model for benefits is now complete. Residual: Hero.astro tile labels remain disconnected from site.ts (cosmetic).
- **Data flow and dependency design**: 8.5 | Delta: SAME | Proof: `import { site } from '../content/site'` is the single data source. DAG clean. Residual: `import.meta.env.BASE_URL` transformation repeated at 9 call sites across 7 files with two inconsistent patterns (F-003 still open).
- **Framework / platform best practices**: 9.0 | Delta: UP | Proof: Loop 1 commit `56056b6` added `is:inline` directive to silence `astro(4000)` hint and corrected Schema.org to derive from `site.iosRequirement`. Loop 2 commit: benefit icons now sourced from `site.ts` via `benefit.icon` — Astro `<Fragment set:html={benefit.icon} />` idiom used correctly, no index-based access. Residual blocking 9.5: BASE_URL construction without a shared `url()` helper (F-003) — a non-idiomatic pattern duplicated across 7 files.
- **Code simplicity and clarity**: 8.0 | Delta: UP | Proof: `BenefitGrid.astro` reduced from 27 lines frontmatter to 3 lines (removed 7-line `icons` const block); `site.ts` gains 3 `icon` string fields that co-locate visual metadata with content. Net line count essentially flat (icons moved, not duplicated). Residual: Hero.astro:28-286 still carries 220 lines of hardcoded mockup (F-004, cosmetic).

## Authority Map

No mutable runtime concerns exist. This is a static site.

| Concern | Owner | Writers | Readers | Persistence | Async mutations | Verdict |
|---|---|---|---|---|---|---|
| Page content (incl. benefit icons) | `src/content/site.ts` (build-time `as const`) | None (immutable) | All 8 components, 3 pages | None | None | Single and clear |
| URL prefix | `import.meta.env.BASE_URL` (Astro env, build-time) | None | 9 call sites across 7 files | None | None | Single and clear |

## Strengths That Matter

- **Genuine content centralization**: `site.ts` is `as const`, contains all domain copy including benefit icons after this loop. Adding a benefit now requires only editing `site.ts` — TypeScript enforces the `icon` field.
- **Flat template leaves with props interfaces**: Components accept props via typed `interface Props`, keeping callers in control. No ambient state.
- **Astro layout slot pattern**: `BaseLayout.astro` composes header/footer via Astro slots. Deletion test passes.

## Findings

### Finding F1: BenefitGrid parallel icons array silently mismatches on content growth

**Why it matters** — Adding a fourth benefit to `site.ts` produces a silently-broken rendered card with no icon, undetectable until visual QA.

**What is wrong** — `BenefitGrid.astro:4-8` (prior to this loop) defined `const icons = [svg1, svg2, svg3]` (exactly 3 entries). At line 15, `site.benefits.map((benefit, i) => ... icons[i])` indexed into this array. If a fourth benefit were added, `icons[3]` would be `undefined` — no TypeScript error, no build warning.

**Evidence** — `src/components/BenefitGrid.astro:4-8` (pre-fix), `src/components/BenefitGrid.astro:15-18` (pre-fix), `src/content/site.ts:26-39`.

**Architectural test failed** — Shallow module (icons array was implicit interface knowledge the caller — whoever edits `site.ts` — could not see).

**Dependency category** — `in-process`.

**Leverage impact** — Callers (editors of `site.ts`) could not know that adding a benefit without also updating `BenefitGrid.astro` breaks the UI.

**Locality impact** — A domain content change (`site.ts`) required a parallel implementation change (`BenefitGrid.astro`) with no mechanical enforcement.

**Metric signal** — none.

**Why this weakens submission** — Silently broken UI on content growth; invariant violation unenforceable by type system.

**Severity** — Noticeable weakness

**ADR conflicts** — none

**Minimal correction path** — Move SVG icon strings into each benefit entry in `site.ts` as an `icon` field. Template reads `benefit.icon` directly. TypeScript enforces field presence — missing icon = type error at build time. This loop executed this fix.

**Blast radius** — Change: `src/content/site.ts`, `src/components/BenefitGrid.astro`. Avoid: all other files.

---

### Finding F2: BASE_URL construction repeated at 9 call sites across 7 files with inconsistent patterns

**Why it matters** — Any URL convention change requires touching 7 files with two subtly different patterns that can produce broken links on GitHub Pages.

**What is wrong** — Two construction patterns exist:
1. `${import.meta.env.BASE_URL}${link.href.replace(/^\//, '')}` — in `SiteHeader.astro:19,33` (slash-stripping).
2. `${import.meta.env.BASE_URL}support` / `${import.meta.env.BASE_URL}privacy` — bare concatenation in `SiteFooter.astro:10-12`, `FAQList.astro:33`, `support.astro:71-73`.
Pattern 2 works only because literals happen not to have leading slashes. Changing `SiteFooter.astro:10` to `href="/support"` would produce `/benchhype-site//support` — double slash on GitHub Pages.

**Evidence** — `src/components/SiteHeader.astro:13,19,33`, `src/components/SiteFooter.astro:10-12`, `src/components/FAQList.astro:33`, `src/pages/support.astro:71-73`, `src/pages/404.astro:10`.

**Architectural test failed** — Shallow module (no helper encapsulates the URL-building concern; the interface is implicit and inconsistent).

**Dependency category** — `in-process`.

**Leverage impact** — Each call site must independently know the BASE_URL transformation rule, including the slash-stripping quirk.

**Locality impact** — URL convention change requires touching 7 files; inconsistency means some sites are more fragile than others.

**Metric signal** — none.

**Why this weakens submission** — Inconsistent URL construction can produce a broken link to production; fragile invariant spread across 7 files.

**Severity** — Noticeable weakness

**ADR conflicts** — none

**Minimal correction path** — Extract a `url(path: string): string` helper in `src/utils/url.ts`: `export const url = (path: string) => \`\${import.meta.env.BASE_URL}\${path.replace(/^\\//, '')}\``. All 9 call sites become `url('support')`, `url('/')`, etc. Deletion test: removing the helper forces complexity back to 9 callers — it earns its keep.

**Blast radius** — Change: new `src/utils/url.ts`, `src/components/SiteHeader.astro`, `src/components/SiteFooter.astro`, `src/components/FAQList.astro`, `src/pages/support.astro`, `src/pages/404.astro`, `src/layouts/BaseLayout.astro`. Avoid: `src/content/site.ts`, `src/styles/`, `public/`.

---

### Finding F3: Hero device mockup is 220 lines of hardcoded simulation disconnected from site.ts

**Why it matters** — Tile labels in the hero visual will drift from the real app's content with zero build-time warning.

**What is wrong** — `Hero.astro:28-63` contains 12 hardcoded `.sb-tile` labels ("Airhorn," "Anthem," etc.) and player title "Game Opener Mix" (`Hero.astro:67`), all disconnected from `site.ts`. ~165 CSS lines for the mockup.

**Evidence** — `src/components/Hero.astro:28-63`, `src/components/Hero.astro:67`, `src/components/Hero.astro:80-286`.

**Architectural test failed** — Deletion test: deleting `.hero-visual` removes the decorative mockup; complexity does not redistribute.

**Dependency category** — `in-process`.

**Leverage impact** — None: the mockup is pure HTML/CSS with no reuse.

**Locality impact** — Changes to the app's tile naming require manual hunting in `Hero.astro`, not `site.ts`.

**Metric signal** — none.

**Why this weakens submission** — Maintenance drift between hero visual and real app is invisible.

**Severity** — Cosmetic for contest

**ADR conflicts** — none

**Minimal correction path** — Either (a) replace the device mockup with a real screenshot from `site.screenshots[0]` framed in the existing `.device-frame` CSS; or (b) keep the mockup but source tile labels from `site.ts`. Option (a) is simpler — removes ~50 HTML lines and ~120 CSS lines.

**Blast radius** — Change: `src/components/Hero.astro`. Avoid: `src/content/site.ts`, all other components.

---

## Simplification Check

| Field | Value |
|---|---|
| structurally_necessary | F1 fix (parallel icons → benefit.icon): passes deletion test; `icons` const disappears cleanly, complexity collapses into data. No new seam created. |
| new_seam_justified | false |
| helpful_simplification | BenefitGrid.astro frontmatter reduced from 9 lines to 2 lines. Icon co-location with content eliminates the two-file edit requirement. |
| should_not_be_done | Extracting an icon component, adding a mapping object, or introducing a registry — all add ceremony without reducing ambiguity. |
| tests_after_fix | No tests exist; none needed. Build-time TypeScript (`as const`) enforces `icon` field presence. `astro check` is the verification gate — passes with 0 errors, 0 hints. |

## Improvement Backlog

1. **F2 — Extract url() helper, consolidate BASE_URL construction across 7 files**
   - Why it matters: 7-file touch radius for any URL convention change; two inconsistent patterns can produce broken links on GitHub Pages
   - Score impact: Data flow +0.5, Code simplicity +0.5
   - Kind: structural
   - Rank: helpful

## Deepening Candidates

No real deepening candidates remaining after this loop. The benefit icon co-location eliminated the only proven parallel-array friction point. BASE_URL consolidation (F-003/F2 in backlog) is a simplification, not a deepening.

## Builder Notes

1. **Parallel arrays as invisible invariants**
   - Pattern: `const icons = [A, B, C]` paired with `data.map((item, i) => icons[i])`. Works while `data.length == icons.length`; silent breakage on growth.
   - How to recognize: any `map(..., i) => sideArray[i]` pattern where two arrays are maintained separately.
   - Smallest coding rule: co-locate the associated data in the same object. If an icon belongs to a benefit, it is a property of the benefit — icon travels with the data in `site.ts`.

2. **BASE_URL as ambient concern**
   - Pattern: `${import.meta.env.BASE_URL}${path}` repeated in every file that links to another page.
   - How to recognize: the same env var read + string transform repeated in 7+ files.
   - Smallest coding rule: one function `url(path)` that owns the convention. Deletion test: if you delete the function, the problem comes back in all callers — it earns its keep.

3. **Schema.org as honesty surface**
   - Pattern: structured data hardcoded inline as literal JSON, not derived from the content module.
   - How to recognize: JSON-LD in a layout that contains prices, dates, or feature flags that also appear in a separate content module.
   - Smallest coding rule: derive JSON-LD values from the content module (DRY), or omit claims the code cannot authoritatively make.

## Final Judge Narrative

Good, not winning yet. Loop 2 lands cleanly: the parallel icons array is gone, benefit domain objects now carry their own visual metadata, and TypeScript enforces the invariant at build time. The architecture is getting more honest. Remaining structural work is the BASE_URL scatter (7 files, two inconsistent patterns) — one more loop should close it. Test strategy is zero, which is an honest score for a static site with no runtime domain logic; a judge would accept this as framework-constrained. State management and concurrency are genuinely N/A at 10. The hero mockup (220 hardcoded lines) is real drift risk but cosmetic for contest purposes. If the BASE_URL helper lands cleanly in loop 3, the site's architecture will be as tight as it can get without adding test infrastructure the site genuinely doesn't need.

## Loop 2 Result

Changed `src/content/site.ts` (added `icon` string field to each of 3 `benefits[]` entries — lightning bolt SVG for "Fast under pressure," wifi-off SVG for "Reliable offline," users SVG for "Volunteer friendly") and `src/components/BenefitGrid.astro` (removed 7-line `icons` const from frontmatter; changed `<Fragment set:html={icons[i]} />` to `<Fragment set:html={benefit.icon} />`). `npm run build` passes: 0 errors, 0 warnings, 0 hints, 5 pages built (`astro check && astro build` clean). Targeted finding F1 (stable_id F-002) is resolved — the parallel array no longer exists; adding a fourth benefit to `site.ts` without an `icon` field now produces a TypeScript type error. No unintended scorecard regression observed.
