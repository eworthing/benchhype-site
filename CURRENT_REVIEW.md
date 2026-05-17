<!-- loop_cap: 5 -->

# Contest Refactor Review

## Discovery

- **Project**: BenchHype marketing site — static Astro 6 site, GitHub Pages deploy.
- **Stack**: Node / TypeScript / Astro 6 (`astro check && astro build`).
- **Selected lens**: `lens-generic.md` (Node section).
- **Source roots**: `src/components/` (8 .astro), `src/pages/` (5 .astro), `src/layouts/BaseLayout.astro`, `src/content/site.ts`, `src/styles/global.css` (289 lines).
- **Public assets**: `public/screenshots/` (6 .webp), `public/features/` (7 .webp), `favicon`, `og-image`, `CNAME`.
- **Build command**: `npm run build` (`astro check && astro build`). Verified green this loop: 5 pages generated, 0 errors, 0 warnings, 1 hint (inline-script JSON-LD — see F1).
- **Test command**: none — no unit/e2e tests in repo. `astro check` is the only correctness gate.
- **test_scope**: full (no `--test-filter`).
- **CONTEXT.md / docs/adr**: absent. `docs/project/` exists but empty for ADRs.
- **Domain terms**: site, hero, feature, benefit, workflow, screenshot, FAQ, pricing, board, cue, roster, script — all from `src/content/site.ts`.
- **Working tree dirty paths**: `["sequential-dazzling-book.md"]` (untracked screenshot-capture plan at repo root; no overlap with Step 2 blast radius which targets `src/layouts/BaseLayout.astro`).
- **Provider**: `claude_code` (CLAUDECODE=1).
- **loop_model**: `claude-sonnet-4-6` (default per provider-adapters.md).
- **reviewer_model**: `claude-sonnet-4-6` (default per provider-adapters.md).
- **spawn_isolation**: `subagent` (Loop Isolation active).
- **loop_cap**: 5 (overridden via inline directive; small surface limits expected loop count).

---

### Loop Counter
Loop 1 of 5 (cap)

### System Flag
[STATE: CONTINUE]

---

## Contest Verdict

**Good app, but not top-tier yet**

For a static marketing site, the architecture is commendably flat: a single `site.ts` content module feeding all components, no costume layers, no redundant seams. The structural findings are real but local — a Schema.org honesty leak that misrepresents the product to search crawlers, a parallel icons array that silently mismaps on content growth, and BASE_URL construction scattered across 9 call sites in 7 files. None is catastrophic; all are fixable in targeted loops.

## Scorecard (1–10)

- **Architecture quality**: 7.5 | Delta: SAME | Proof: `src/content/site.ts` flat DAG with `as const`, components as pure template leaves. Residual: parallel icons array at `src/components/BenefitGrid.astro:4-8` indexed unsafely against `site.benefits[]`, and BASE_URL pattern repeated across 7 files without a shared helper.
- **State management and runtime ownership**: 10 | Delta: SAME | Proof: `src/content/site.ts:206` — `as const` literal; zero mutable runtime state; static site generator pipeline; no writers, no readers, no persistence seam. 10-anchor: no behavior-preserving improvement available — there is no mutable state to own.
- **Concurrency and runtime safety**: 10 | Delta: SAME | Proof: no `async/await`, no `Promise`, no event handlers, no Task constructs in any source file. Astro SSG builds synchronous template trees at build time. 10-anchor: concurrency is genuinely N/A; score reflects that correctly.
- **Test strategy and regression resistance**: 3 | Delta: SAME | Proof: zero test files in repo. `astro check` provides type correctness only. No behavioral, semantic, or integration tests. 9-anchor far from met — tests targeting real Interfaces are absent. Note: for a static site with no runtime state, the regression surface is narrow (rendered HTML), but no tests cover it.
- **Overall implementation credibility**: 7.5 | Delta: SAME | Proof: Schema.org structured data at `src/layouts/BaseLayout.astro:60-63` claims `price: "0"` for a paid one-time-purchase app (`site.pricing.pro.price = "One-time purchase"` at `site.ts:167`). This is a visible honesty leak that a judge inspecting the source would notice.
- **Domain modeling**: 7.0 | Delta: SAME | Proof: `site.ts as const` centralizes all content correctly. Residual: icons (visual concern) co-located in `BenefitGrid.astro` as a parallel array rather than in `site.ts` alongside the benefit data they annotate. Domain model is honest but incomplete — presentation metadata (which icon for which benefit) lives outside the content module.
- **Data flow and dependency design**: 8.5 | Delta: SAME | Proof: `import { site } from '../content/site'` is the single data source; all 8 components and 3 pages import from it. DAG is clean — no back-channels. Residual: `import.meta.env.BASE_URL` transformation repeated at 9 call sites across 7 files with two inconsistent patterns (regex strip in SiteHeader, bare concatenation in SiteFooter/pages).
- **Framework / platform best practices**: 8.5 | Delta: SAME | Proof: Astro idioms used correctly — `<slot />` layout composition, `Astro.props` interface typing, `loading="lazy" decoding="async"` on images, `scroll-snap-type` for gallery UX. Residual: `BaseLayout.astro:53` generates a real Astro hint about `set:html` on `<script>` tag requiring `is:inline` (hint is build output: `astro(4000)`). Not an error, but unaddressed.
- **Code simplicity and clarity**: 7.5 | Delta: SAME | Proof: `Hero.astro:22-77` contains a 55-line hardcoded HTML device mockup with 12 fixed tile labels ("Airhorn," "Anthem," "Crowd," etc.) and a "Game Opener Mix" player title, coupled with ~165 CSS lines, fully disconnected from `site.ts`. Provides above-fold visual but adds 220 lines of unmaintained simulation.

## Authority Map

No mutable runtime concerns exist. This is a static site.

| Concern | Owner | Writers | Readers | Persistence | Async mutations | Verdict |
|---|---|---|---|---|---|---|
| Page content | `src/content/site.ts` (build-time `as const`) | None (immutable) | All 8 components, 3 pages | None | None | Single and clear |
| URL prefix | `import.meta.env.BASE_URL` (Astro env, build-time) | None | 9 call sites across 7 files | None | None | Single and clear |

## Strengths That Matter

- **Genuine content centralization**: `site.ts` is `as const`, contains all domain copy, zero framework imports. Every component reads from it without duplicating content. This is the right architecture for a static site — it is not fake-clean reward; it actually prevents content drift.
- **Flat template leaves with props interfaces**: Components that accept props (`FAQList.astro:limit, showCta`) do so via a typed `interface Props`, keeping callers in control.
- **Astro layout slot pattern**: `BaseLayout.astro` composes header/footer via Astro slots, not inline duplication. Deletion test passes — removing it forces reorganization, not redistribution of invisible complexity.

## Findings

### Finding F1: Schema.org structured data claims free pricing for a paid app

**Why it matters** — Search crawlers ingest JSON-LD structured data and may surface misleading rich results (price: $0 for a paid one-time-purchase app).

**What is wrong** — `BaseLayout.astro:60-63` hardcodes `"price": "0", "priceCurrency": "USD"` in the Schema.org `SoftwareApplication` offer. `site.pricing.pro.price = "One-time purchase"` (a string, not a number) and the free tier has no price field. The schema claims all versions are free, which is factually wrong once the app launches with paid Pro tier.

**Evidence** — `src/layouts/BaseLayout.astro:60-63` (offer block), `src/content/site.ts:167` (`price: "One-time purchase"`).

**Architectural test failed** — n/a — different category (honesty / data accuracy).

**Dependency category** — n/a (not a Coupling & Leakage finding).

**Leverage impact** — None: the offer object is a 3-line inline literal; no leverage is gained or lost.

**Locality impact** — Low: the offer is defined in one place (`BaseLayout.astro:60-63`), but it doesn't reference `site.pricing` — the honest source of truth is two files away.

**Metric signal** — Astro build hint `astro(4000)` on `BaseLayout.astro:53` (the same `<script>` tag containing the bad data); the hint surfaces line 53, pointing directly to the problematic block.

**Why this weakens submission** — A judge reading the source sees the pricing page (`PricingCard.astro`) correctly renders "One-time purchase," while the JSON-LD in the layout claims `price: "0"`. The discrepancy is a honesty leak that a production code reviewer would flag immediately.

**Severity** — Noticeable weakness

**ADR conflicts** — none

**Minimal correction path** — Remove the hardcoded `offers` block from the Schema.org JSON-LD, or replace with a `priceCurrency`-less description matching the free tier's factual state. The smallest honest fix: either omit `offers` entirely (Schema.org does not require it for `SoftwareApplication`), or emit two `offers` entries — one for the free tier (valid: `price: "0"`) and one for Pro with `priceSpecification` as a description string. Omitting is simplest: `astro check` passes either way. Also add `is:inline` directive to silence the Astro hint on the same tag.

**Blast radius** — Change: `src/layouts/BaseLayout.astro`. Avoid: all other files.

---

### Finding F2: BenefitGrid parallel icons array silently mismatches on content growth

**Why it matters** — Adding a fourth benefit to `site.ts` produces a silently-broken rendered card with no icon, undetectable until visual QA.

**What is wrong** — `BenefitGrid.astro:4-8` defines `const icons = [svg1, svg2, svg3]` (exactly 3 entries). At line 15, `site.benefits.map((benefit, i) => ... icons[i])` indexes into this array. `site.benefits` currently has 3 entries (`site.ts:26-39`). If a fourth benefit is added, `icons[3]` is `undefined`, and `<Fragment set:html={undefined}>` renders empty (no TypeScript error, no build warning, no runtime error).

**Evidence** — `src/components/BenefitGrid.astro:4-8` (icons array), `src/components/BenefitGrid.astro:15-18` (indexed access), `src/content/site.ts:26-39` (benefits array, 3 items).

**Architectural test failed** — Shallow module (the icons array is implicit interface knowledge the caller — whoever edits `site.ts` — cannot see).

**Dependency category** — `in-process`.

**Leverage impact** — Callers (editors of `site.ts`) cannot know that adding a benefit without also updating `BenefitGrid.astro` breaks the UI.

**Locality impact** — Change spreads: a domain content change (`site.ts`) requires a parallel implementation change (`BenefitGrid.astro`) with no mechanical enforcement.

**Metric signal** — none.

**Why this weakens submission** — Silently broken UI on any content growth. The parallel array is a maintenance hazard that a code reviewer would flag as an invariant violation.

**Severity** — Noticeable weakness

**ADR conflicts** — none

**Minimal correction path** — Move the SVG icon into each benefit entry in `site.ts` (as a `icon` field with the SVG string), or use a fixed set of icon components keyed by index with a fallback. The simplest: add `icon: string` field to each `benefits[]` entry in `site.ts` and reference `benefit.icon` in the template. This co-locates the visual decision with the content decision and is enforceable via TypeScript (missing `icon` = type error).

**Blast radius** — Change: `src/content/site.ts`, `src/components/BenefitGrid.astro`. Avoid: all other files.

---

### Finding F3: BASE_URL construction repeated at 9 call sites across 7 files with inconsistent patterns

**Why it matters** — Any URL convention change (e.g., switching from `BASE_URL + slug` to a path helper) requires touching 7 files with two subtly different patterns that can produce broken links.

**What is wrong** — Two construction patterns exist:
1. `${import.meta.env.BASE_URL}${link.href.replace(/^\//, '')}` — in `SiteHeader.astro:19` and `SiteHeader.astro:33` (duplicated for desktop and mobile nav).
2. `${import.meta.env.BASE_URL}support` / `${import.meta.env.BASE_URL}privacy` / `${import.meta.env.BASE_URL}faq` — bare concatenation in `SiteFooter.astro:10-12`, `FAQList.astro:33`, `support.astro:71-73`.
3. `${import.meta.env.BASE_URL}` alone — in `SiteHeader.astro:13` (logo), `404.astro:10`.
The SiteHeader pattern correctly strips a leading `/` from the path; the SiteFooter/pages pattern assumes no leading slash is present (correct only because the literals happen not to have one). If `SiteFooter.astro:10` were changed to `href="/support"` (a natural edit), it would produce `BASE_URL/support` (double slash or wrong path on GitHub Pages).

**Evidence** — `src/components/SiteHeader.astro:13,19,33`, `src/components/SiteFooter.astro:10-12`, `src/components/FAQList.astro:33`, `src/pages/support.astro:71-73`, `src/pages/404.astro:10`.

**Architectural test failed** — Shallow module (no helper encapsulates the URL-building concern; the interface is implicit and inconsistent).

**Dependency category** — `in-process`.

**Leverage impact** — Each call site must independently know the BASE_URL transformation rule, including the slash-stripping quirk.

**Locality impact** — URL convention change requires touching 7 files; inconsistency means some sites are more fragile than others.

**Metric signal** — none.

**Why this weakens submission** — Inconsistent URL construction is the kind of thing that ships a broken link to production. On GitHub Pages, BASE_URL is `/benchhype-site/`, so `BASE_URL/support` produces `/benchhype-site//support` — double slash bug.

**Severity** — Noticeable weakness

**ADR conflicts** — none

**Minimal correction path** — Extract a `url(path: string): string` helper in a shared module (e.g., `src/utils/url.ts`): `export const url = (path: string) => \`\${import.meta.env.BASE_URL}\${path.replace(/^\\//, '')}\``. All 9 call sites become `url('support')`, `url('/')`, etc. One implementation, one contract. Deletion test: removing the helper forces complexity back to 9 callers — it earns its keep.

**Blast radius** — Change: new `src/utils/url.ts`, `src/components/SiteHeader.astro`, `src/components/SiteFooter.astro`, `src/components/FAQList.astro`, `src/pages/support.astro`, `src/pages/404.astro`, `src/layouts/BaseLayout.astro`. Avoid: `src/content/site.ts`, `src/styles/`, `public/`.

---

### Finding F4: Hero device mockup is 220 lines of hardcoded simulation disconnected from site.ts

**Why it matters** — Tile labels and player title in the hero visual will drift from the real app's content with zero build-time warning.

**What is wrong** — `Hero.astro:22-77` contains 55 lines of hardcoded HTML (12 `.sb-tile` divs with labels "Airhorn," "Anthem," "Crowd," "Whistle," "Buzzer," "Organ," "Defense," "Strike," "Charge," "Timeout," "Slap," "Win"; player title "Game Opener Mix") plus ~165 lines of CSS. None of these strings come from `site.ts`. They are static fabrications. The `ScreenshotGallery` section already shows real app screenshots (`src/components/ScreenshotGallery.astro`).

**Evidence** — `src/components/Hero.astro:28-63` (tile labels), `Hero.astro:67` (player title "Game Opener Mix"), `Hero.astro:80-286` (165-line CSS block for device mockup).

**Architectural test failed** — Deletion test: deleting `.hero-visual` removes the decorative mockup; complexity does not redistribute. The hero still functions as text + CTAs.

**Dependency category** — `in-process`.

**Leverage impact** — None: the mockup is pure HTML/CSS with no reuse.

**Locality impact** — Changes to the app's tile naming require manual hunting in `Hero.astro` (not `site.ts`) because the labels are not derived from content.

**Metric signal** — none.

**Why this weakens submission** — Maintenance drift between the hero visual and the real app is invisible. A new visitor reads "Airhorn," "Organ" in the hero but may see different UI in the actual app.

**Severity** — Cosmetic for contest

**ADR conflicts** — none

**Minimal correction path** — Either (a) replace the device mockup with a real screenshot from `site.screenshots[0]` (already in `site.ts:128`), framed in the existing `.device-frame` CSS, removing ~50 HTML lines and ~120 CSS lines; or (b) keep the mockup but source the tile labels from `site.ts` (e.g., a `heroTiles` array). Option (a) is simpler and uses real content.

**Blast radius** — Change: `src/components/Hero.astro`. Avoid: `src/content/site.ts`, all other components.

---

## Simplification Check

- **Structurally necessary**: F1 fix removes a factual inaccuracy from Schema.org structured data. Passes deletion test (the `offers` block can be omitted entirely without breaking anything). No new seam created.
- **New seam justified**: false.
- **Helpful simplification**: Removing or correcting the `offers` block in BaseLayout is purely subtractive — fewer lines, more honest.
- **Should NOT be done**: Adding a complex pricing-aware Schema.org renderer. The simplest fix is omission or a single correct entry. Do not introduce a content module dependency on pricing just for JSON-LD.
- **Tests after fix**: No tests exist; no test changes. Build (`astro check`) is the verification gate — it will still pass.

## Improvement Backlog

1. **F1 — Correct Schema.org structured data (remove or fix offers block)**
   - Why it matters: honesty leak; search crawlers see free pricing for a paid app
   - Score impact: Overall implementation credibility +0.5, Framework/platform best practices +0.5 (also silences astro(4000) hint by adding `is:inline`)
   - Kind: structural (honesty fix)
   - Rank: needed for winning

2. **F2 — Inline icons into site.ts benefit entries**
   - Why it matters: silent UI breakage on content growth; invariant not enforced
   - Score impact: Domain modeling +0.5, Architecture quality +0.5
   - Kind: structural
   - Rank: helpful

3. **F3 — Extract url() helper, consolidate BASE_URL construction**
   - Why it matters: 7-file touch radius for any URL convention change; inconsistent patterns
   - Score impact: Data flow +0.5, Code simplicity +0.5
   - Kind: structural
   - Rank: helpful

## Deepening Candidates

1. **Candidate**: `BenefitGrid.astro` icons parallel array
   - **Source friction proven**: Finding F2 — icons array indexed against benefits with no enforcement.
   - **Why shallow/misplaced**: The icon-to-benefit mapping is an implicit runtime association. The interface (edit `site.ts`) does not expose the constraint (also update `BenefitGrid.astro`).
   - **Behavior to move behind interface**: Move icon SVGs into `site.ts benefits[].icon` field. Template reads `benefit.icon` directly — no index.
   - **Dependency category**: `in-process`
   - **Test surface after change**: No tests. Build-time TypeScript enforces the field presence.
   - **Smallest first step**: Add `icon: string` field to each benefit in `site.ts`; update `BenefitGrid.astro` to use `benefit.icon`.
   - **What not to do**: Do not extract an icon component or introduce a mapping object. Keep it as a string field in the data.

## Builder Notes

1. **Parallel arrays as invisible invariants**
   - Pattern: `const icons = [A, B, C]` paired with `data.map((item, i) => icons[i])`. Works while data.length == icons.length; silent breakage on growth.
   - How to recognize: any `map(..., i) => sideArray[i]` pattern where the two arrays are maintained separately.
   - Smallest coding rule: co-locate the associated data in the same object. If an icon belongs to a benefit, it is a property of the benefit, not an entry in a parallel array.

2. **BASE_URL as ambient concern**
   - Pattern: `${import.meta.env.BASE_URL}${path}` repeated in every file that links to another page. Works until the convention changes or a path is added with a leading slash.
   - How to recognize: the same env var read + string transform repeated in 7+ files.
   - Smallest coding rule: one function `url(path)` that owns the convention. All callers use it. Deletion test: if you delete the function, the problem comes back in all callers — it's earning its keep.

3. **Schema.org as honesty surface**
   - Pattern: structured data hardcoded inline as literal JSON, not derived from the content module that holds the authoritative values.
   - How to recognize: JSON-LD in a layout that contains prices, dates, or feature flags that also appear in a separate content module.
   - Smallest coding rule: either derive JSON-LD values from the content module (DRY), or omit claims the code cannot authoritatively make (free tier: can claim price=0 honestly; pro tier: cannot claim a price until one is known).

## Final Judge Narrative

Place — good, not winning. The architecture is honestly flat: `site.ts` as the single content source feeding pure template leaves is the right pattern for a static site, and it's executed cleanly. The structural weaknesses are concentrated: a Schema.org honesty leak misrepresents pricing to search crawlers, a parallel icons array will silently break on content growth, and BASE_URL construction is scattered across 7 files with two inconsistent patterns. These are all fixable in 2-3 loops. Test strategy is effectively zero — for a pure static site this is less damning than for an app, but there are no behavioral checks of any kind. Concurrency and state management are genuinely N/A and scored 10 honestly. Future risk: the hero device mockup (220 hardcoded lines disconnected from site.ts) will drift from the real app's UI as the app ships; this is cosmetic for contest but real for production.

## Loop 1 Result

Changed `src/layouts/BaseLayout.astro`: (1) replaced `<script type="application/ld+json" set:html={...}>` with `<script is:inline type="application/ld+json" set:html={...}>` — adds the `is:inline` directive required by Astro when a `type` attribute is present; (2) restructured the `offers` block from a single claim of `"price": "0"` (falsely applying to all tiers) to an array with a single named entry `{ "@type": "Offer", "name": site.pricing.free.title, "price": "0", "priceCurrency": "USD" }` — truthfully represents only the free tier; (3) replaced hardcoded `"operatingSystem": "iOS 26+"` with `site.iosRequirement` (derived from content module). `npm run build` passes: 0 errors, 0 warnings, **0 hints** (down from 1 hint pre-fix). Targeted finding F1 (stable_id F-001) is resolved — the structured data no longer claims all tiers are free, and the Astro hint is gone. No unintended scorecard regression observed.
