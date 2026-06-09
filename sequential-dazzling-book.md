# Plan: Capture Real App Screenshots for BenchHype Site

## Context

The BenchHype marketing site has **14 placeholder image slots** that need real screenshots from the iOS Simulator. The app project lives at `/Users/Shared/git/BenchHype/BenchHype/BenchHype.xcodeproj`. This plan documents the exact app state, Simulator device, capture method, naming, format, and save location for each image.

**Device strategy:** iPhone screenshots for the 9:16 portrait gallery, iPad screenshots for the 4:3 landscape feature sections. Both devices shown naturally as users scroll — zero new components needed.

---

## Simulator Setup

### iPhone (for Gallery screenshots)
- **Device:** iPhone 17 Pro Max
- **Appearance:** Dark mode
- **Orientation:** Portrait
- **Why this device:** Largest phone = best visual impact at marketing scale; not far off from smaller phone experience

### iPad (for Feature section images)
- **Device:** iPad (11th generation) — 11-inch
- **Appearance:** Dark mode
- **Orientation:** Landscape
- **Why this device:** 11" is the most common iPad size (standard iPad, iPad Air, iPad Pro all ship at 11"). Represents the widest user base. Close enough to iPad Mini 8.9" to still look representative

### Clean Status Bar (both devices)
```bash
# iPhone
xcrun simctl status_bar "iPhone 17 Pro Max" override \
  --time "9:41" \
  --batteryState charged \
  --batteryLevel 100 \
  --cellularMode active \
  --cellularBars 4 \
  --wifiBars 3

# iPad
xcrun simctl status_bar "iPad (11th generation)" override \
  --time "9:41" \
  --batteryState charged \
  --batteryLevel 100 \
  --wifiBars 3
```

### Capture Commands
```bash
# iPhone
xcrun simctl io "iPhone 17 Pro Max" screenshot <output-path>.png

# iPad
xcrun simctl io "iPad (11th generation)" screenshot <output-path>.png
```

### Post-Processing (convert to WebP)
```bash
cwebp -q 85 input.png -o output.webp
```

---

## Pre-Capture: Seed the App with Demo Data

Before capturing, the app needs realistic demo content loaded:

- **Library:** Import 15-20 sample audio files across 3-4 groups (e.g., "Anthems," "Walk-ups," "Effects," "Intermission"). Use varied formats (M4A, MP3, WAV). Add color tags to several.
- **Boards:** Create 2 boards — one with a full 12-tile grid (used for live-mode screenshot), one partially built (used for editor screenshot).
- **Scripts:** Create 1 script with 5-6 timed cue steps (e.g., "National Anthem → Crowd Hype → Lineup Intro → Player Walk-up → First Pitch").
- **Rosters:** Create 1 roster with 5-8 player entries, each with walkout music assigned and at least 2 with pronunciation notes.
- **Mixer:** Have 2-3 sounds actively playing or queued so the mixer has visible channel strips.

---

## Category A: Gallery Screenshots (6 images)

**Purpose:** Horizontal-scroll gallery in `ScreenshotGallery.astro`
**Format:** `.webp` (convert from PNG capture)
**Aspect ratio:** 9:16 (native iPhone portrait)
**Save to:** `public/screenshots/`
**Referenced in:** `src/content/site.ts` lines 112-143

| # | Filename | App Tab/Screen | App State Required | What Must Be Visible |
|---|----------|---------------|-------------------|---------------------|
| 1 | `live-mode.webp` | **Live tab** → Active board in live mode | Start a live session with a full board loaded. Have 1 tile actively playing (shows "now playing" indicator). | Tap-ready tile grid with color-coded buttons, 1 tile highlighted as playing, emergency strip at bottom, "LIVE" status indicator, minimal chrome |
| 2 | `board-editor.webp` | **Boards tab** → Board edit mode | Open a board with 8-12 tiles, enter edit mode, select one tile so it shows edit handles/selection state | Tile grid in edit layout, one tile selected with visual highlight, edit toolbar or drag handles visible, tile labels showing sound names |
| 3 | `mixer.webp` | **Live tab** → Mixer view (or mixer overlay) | Start playing 3-4 sounds simultaneously so all mixer channels are populated | 4-channel mixer strips with volume sliders, track names, mute/fade buttons, master volume control, now-playing indicator |
| 4 | `library.webp` | **Library tab** → Group list or cue list | Library populated with 15+ sounds across groups, search bar visible at top | Organized list of audio files with color tags, group headers, duration metadata, search bar, import action visible |
| 5 | `scripts.webp` | **Library tab** → Scripts section → Script detail | Open a script with 5+ timed cue steps, show the timeline/sequence view | Vertical list of timed steps with sound names, timing info, play/rehearse controls, script title |
| 6 | `rosters.webp` | **Library tab** → Rosters section → Roster detail | Open a roster with 5+ players, at least one marked as "next up" | Player names with jersey numbers, assigned walkout music, pronunciation notes, step-through controls, "next up" indicator |

### Capture Sequence for Gallery Screenshots
```bash
# 1. Boot simulator and set clean status bar
xcrun simctl boot "iPhone 17 Pro Max"
xcrun simctl status_bar "iPhone 17 Pro Max" override --time "9:41" --batteryState charged --batteryLevel 100 --cellularMode active --cellularBars 4 --wifiBars 3

# 2. Build and run the app
# (from Xcode or xcodebuild)

# 3. Navigate to each screen state, then capture:
xcrun simctl io "iPhone 17 Pro Max" screenshot ~/Desktop/benchhype-captures/live-mode.png
xcrun simctl io "iPhone 17 Pro Max" screenshot ~/Desktop/benchhype-captures/board-editor.png
xcrun simctl io "iPhone 17 Pro Max" screenshot ~/Desktop/benchhype-captures/mixer.png
xcrun simctl io "iPhone 17 Pro Max" screenshot ~/Desktop/benchhype-captures/library.png
xcrun simctl io "iPhone 17 Pro Max" screenshot ~/Desktop/benchhype-captures/scripts.png
xcrun simctl io "iPhone 17 Pro Max" screenshot ~/Desktop/benchhype-captures/rosters.png

# 4. Convert all to WebP
for f in ~/Desktop/benchhype-captures/*.png; do
  cwebp -q 85 "$f" -o "public/screenshots/$(basename "${f%.png}.webp")"
done

# 5. Clean up status bar override
xcrun simctl status_bar "iPhone 17 Pro Max" clear
```

---

## Category B: Feature Section Images (6 images) — iPad

**Purpose:** Alternating left/right feature detail in `FeatureSections.astro`
**Source device:** iPad (11th generation) in **landscape** orientation
**Format:** `.webp` (convert from PNG capture)
**Aspect ratio:** 4:3 (crop from landscape iPad screenshot)
**Dimensions:** ~800 x 600px after crop and resize
**Save to:** `public/features/`
**New directory:** `mkdir -p public/features/`

These are **iPad landscape screenshots** cropped to 4:3, showing the wider canvas iPad provides. The iPad's landscape view naturally fills the 4:3 feature slots and showcases the app's expanded layout on larger screens.

| # | Filename | Feature | iPad App State | What Must Be Visible |
|---|----------|---------|---------------|---------------------|
| 1 | `feature-library.webp` | Sound Library | **Library tab**, landscape. Groups sidebar visible + cue list with color tags, search bar, format/duration metadata. | iPad's split-view advantage: sidebar + content list simultaneously. Show organization at scale. |
| 2 | `feature-boards.webp` | Boards & Live Mode | **Live tab**, landscape, board loaded with 12+ tiles in wider grid. One tile actively playing. | Larger tile grid taking advantage of iPad screen width. Live status indicators, emergency strip. |
| 3 | `feature-mixer.webp` | Mixer & Emergency Controls | **Live tab** → Mixer overlay/view, landscape. 4 channels populated with active sounds. | Wide mixer layout with all 4 channels visible at once. Master volume, panic mute button prominent. |
| 4 | `feature-scripts.webp` | Scripts & Rosters | **Library tab** → Scripts section → Script detail, landscape. Script with 5+ timed steps open. | Timeline/sequence view with wider step items. Play/rehearse/lock controls. |
| 5 | `feature-spotify.webp` | Spotify Integration | **Library tab** → Spotify search/import screen, landscape. Search results showing tracks. | Spotify search results with track artwork, "Add to Board" actions. Green accent visible. |
| 6 | `feature-backup.webp` | Backup, Logs & Accessibility | **Settings tab** → Backup/Restore or Session History, landscape. | Backup controls or session log entries. VoiceOver focus ring visible on one element if possible. |

### iPad Capture & Process Commands
```bash
mkdir -p ~/Desktop/benchhype-captures/ipad

# Capture each iPad screen (navigate to state first):
xcrun simctl io "iPad (11th generation)" screenshot ~/Desktop/benchhype-captures/ipad/feature-library-raw.png
xcrun simctl io "iPad (11th generation)" screenshot ~/Desktop/benchhype-captures/ipad/feature-boards-raw.png
xcrun simctl io "iPad (11th generation)" screenshot ~/Desktop/benchhype-captures/ipad/feature-mixer-raw.png
xcrun simctl io "iPad (11th generation)" screenshot ~/Desktop/benchhype-captures/ipad/feature-scripts-raw.png
xcrun simctl io "iPad (11th generation)" screenshot ~/Desktop/benchhype-captures/ipad/feature-spotify-raw.png
xcrun simctl io "iPad (11th generation)" screenshot ~/Desktop/benchhype-captures/ipad/feature-backup-raw.png

# Crop to 4:3 center region and resize to 800x600
for f in feature-library feature-boards feature-mixer feature-scripts feature-spotify feature-backup; do
  # iPad landscape is wider than 4:3 — crop center to 4:3 aspect
  # iPad 11" landscape is ~4:3 natively, minimal crop needed
  sips --resampleWidth 800 ~/Desktop/benchhype-captures/ipad/${f}-raw.png --out ~/Desktop/benchhype-captures/ipad/${f}-resized.png
  cwebp -q 85 ~/Desktop/benchhype-captures/ipad/${f}-resized.png -o public/features/${f}.webp
done
```

---

## Category C: OG Image (1 image)

**Purpose:** Social sharing preview (Twitter, Facebook, Slack, iMessage)
**Format:** `.png` (required for OG compatibility)
**Dimensions:** 1200 x 630px
**Save to:** `public/og-image.png`
**Referenced in:** `src/layouts/BaseLayout.astro` line 16

### Composition
This is a **composite marketing image**, not a raw screenshot. Build it from:

1. **Left side (60%):** "BenchHype" wordmark in white, tagline "Live sports audio control for iPhone and iPad" in `#8a8a8a` gray, on `#0a0a0a` dark background
2. **Right side (40%):** The `live-mode.webp` gallery screenshot placed inside a device frame mockup (or just the raw screenshot with rounded corners and subtle shadow)

### How to Create
- Use the `live-mode.png` Simulator capture as the device screenshot
- Composite in any image tool (Figma, Preview, ImageMagick):
```bash
# Example with ImageMagick (adjust as needed):
# 1. Create dark background canvas
convert -size 1200x630 xc:'#0a0a0a' og-bg.png
# 2. Resize live-mode screenshot to fit right side
sips --resampleHeight 550 ~/Desktop/benchhype-captures/live-mode.png --out ~/Desktop/benchhype-captures/live-mode-small.png
# 3. Composite (manual placement recommended for text + image)
```
- **Alternative:** Use Stitch MCP to generate this as a designed screen with the real screenshot embedded, then export

---

## Category D: Apple Touch Icon (1 image)

**Purpose:** iOS home screen icon when site is saved to home
**Format:** `.png`
**Dimensions:** 512 x 512px
**Save to:** `public/app-icon-512.png`

### Source
**Check the app's Asset Catalog first** — the icon likely already exists:
```
/Users/Shared/git/BenchHype/BenchHype/Assets.xcassets/AppIcon.appiconset/
```
If it exists, copy and resize:
```bash
# Find the largest icon variant
ls /Users/Shared/git/BenchHype/BenchHype/Assets.xcassets/AppIcon.appiconset/
# Copy and resize to 512x512
sips --resampleWidth 512 <source-icon>.png --out public/app-icon-512.png
```

If no app icon exists yet, this needs to be designed separately (not a screenshot).

---

## Stitch MCP: Reference Compositions

Use Stitch to create **reference mockups** that serve as art direction for each screenshot. These show the ideal composition, framing, and what should be prominent — guiding how to set up the app state before capture.

### Step 1: Create Project
```
mcp__stitch__create_project(title: "BenchHype Screenshot References")
```

### Step 2: Create Design System
```
mcp__stitch__create_design_system(
  title: "BenchHype Dark",
  primary: "#e63946",
  background: "#0a0a0a",
  surface: "#141414",
  text: "#f0f0f0",
  font: Inter,
  mode: dark
)
```

### Step 3: Generate Reference Screens
Generate 1 reference screen per gallery screenshot (6 total) showing the ideal UI state, layout, and visual hierarchy. These are NOT the final assets — they guide what the real capture should look like.

### Step 4: Compare & Adjust
After capturing real screenshots, compare against Stitch references. Re-capture if the app state doesn't match the intended composition.

---

## Code Changes After All Images Are Captured

### 1. `src/components/ScreenshotGallery.astro` — Enable real images
- **Remove** line 17: `<div class="gallery-placeholder"></div>`
- **Uncomment** lines 18-27: the `<img>` tag

### 2. `src/components/FeatureSections.astro` — Wire feature images
- Replace `<div class="feature-placeholder">` with:
```html
<img
  src={`/features/feature-${feature.title.toLowerCase().replace(/[^a-z]/g, '-')}.webp`}
  alt={feature.summary}
  loading="lazy"
  decoding="async"
/>
```
- Or add `image` field to each feature in `src/content/site.ts` and use `feature.image`

### 3. `src/content/site.ts` — Add image paths to features
Add `image` property to each feature object:
```ts
{ title: "Sound Library", image: "/features/feature-library.webp", ... }
{ title: "Boards & Live Mode", image: "/features/feature-boards.webp", ... }
{ title: "Mixer & Emergency Controls", image: "/features/feature-mixer.webp", ... }
{ title: "Scripts & Rosters", image: "/features/feature-scripts.webp", ... }
{ title: "Spotify Integration", image: "/features/feature-spotify.webp", ... }
{ title: "Backup, Logs & Accessibility", image: "/features/feature-backup.webp", ... }
```

### 4. `src/layouts/BaseLayout.astro` — Enable apple-touch-icon
Uncomment line 50:
```html
<link rel="apple-touch-icon" href="/app-icon-512.png" />
```

---

## Verification

1. `npm run dev` — all 14 images load, no broken `<img>` tags
2. Gallery scrolls smoothly with real screenshots at correct 9:16 aspect ratio
3. Feature images display at 4:3 in alternating layout, properly cropped
4. OG image renders correctly in social preview debuggers
5. Apple touch icon appears when saving site to iOS home screen
6. All images are `< 200KB` each (WebP compression)
7. Lighthouse accessibility: all `<img>` tags have `alt` text

---

## File Summary

| Category | Source Device | Path | Format | Dimensions | Count |
|----------|-------------|------|--------|-----------|-------|
| Gallery screenshots | iPhone 17 Pro Max | `public/screenshots/*.webp` | WebP | 390x844 (9:16) | 6 |
| Feature images | iPad 11" 11th gen (landscape) | `public/features/*.webp` | WebP | 800x600 (4:3) | 6 |
| OG image | Composite (uses iPhone capture) | `public/og-image.png` | PNG | 1200x630 | 1 |
| Apple touch icon | App Assets.xcassets | `public/app-icon-512.png` | PNG | 512x512 | 1 |
| **Total** | | | | | **14** |
