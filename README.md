# BenchHype Website

Product landing site for [BenchHype](https://eworthing.github.io/benchhype-site/) — live sports audio control for iPhone and iPad.

Built with [Astro](https://astro.build/), deployed to GitHub Pages.

## Development

```bash
npm install
npm run dev       # Start dev server at localhost:4321
npm run build     # Build static site to dist/
npm run preview   # Preview built site locally
```

## How to Edit

### Content (copy, features, FAQ, etc.)

All site content is centralized in **`src/content/site.ts`**. Edit this file to change:

- App name, tagline, and description
- Badges, CTAs, and links
- Benefits, features, and feature bullets
- FAQ questions and answers
- Screenshot captions and alt text
- Pricing details

### Screenshots

Drop `.webp` screenshot files into **`public/screenshots/`**. Update the `screenshots` array in `site.ts` to match filenames. Then uncomment the `<img>` tags in `src/components/ScreenshotGallery.astro`.

### Links

Search for `TODO` comments to find all placeholder links that need real URLs:

- App Store URL
- TestFlight URL
- Support email
- OG image

### Styles

All styles are in **`src/styles/global.css`** (design tokens, utilities) and component-scoped `<style>` blocks.

### Pages

- `src/pages/index.astro` — Home
- `src/pages/privacy.astro` — Privacy Policy (edit inline)
- `src/pages/support.astro` — Support (edit inline)
- `src/pages/faq.astro` — FAQ (reads from site.ts)
- `src/pages/404.astro` — 404

### SEO / Metadata

Edit `src/layouts/BaseLayout.astro` to change default title, description, OG image, and structured data.

## Deployment

Pushes to `main` automatically deploy to GitHub Pages via the workflow in `.github/workflows/deploy.yml`.

### Custom Domain

To use a custom domain, update `astro.config.mjs`:

```js
site: 'https://yourdomain.com',
base: '/',
```

Then configure your DNS and GitHub Pages custom domain settings.

## Stack

- **Framework:** Astro (static output)
- **Styling:** Plain CSS
- **Hosting:** GitHub Pages
- **CI/CD:** GitHub Actions
