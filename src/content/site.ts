export const site = {
  name: "BenchHype",
  tagline: "Live sports audio control for iPhone and iPad",
  description:
    "Run game-day sound with fast, reliable playback. Import local audio, build tap-ready boards, and control live cues with confidence — even offline.",
  heroAudience:
    "Built for PA operators, game-day volunteers, and anyone running sound at live sports events.",
  iosRequirement: "iOS 26+",

  badges: ["iPhone & iPad", "Works offline", "Spotify integration", "Built for game day"],

  ctaPrimary: {
    label: "Coming Soon",
    // TODO: Replace with App Store URL when available
    href: "#",
  },
  ctaSecondary: {
    label: "View Features",
    href: "#features",
  },

  // TODO: Replace with real contact info
  supportEmail: "TODO@example.com",
  supportUrl: "/support",
  privacyUrl: "/privacy",
  benefits: [
    {
      title: "Fast under pressure",
      body: "Large, tap-ready controls and instant playback designed for real game situations. No fumbling when the moment counts.",
    },
    {
      title: "Reliable offline",
      body: "Local audio playback works without internet. The show keeps moving even when the Wi-Fi doesn't.",
    },
    {
      title: "Volunteer friendly",
      body: "Simple mode and emergency controls help reduce mistakes when the pressure is on. Hand it to anyone on game day.",
    },
  ],

  workflow: [
    { step: "Import sounds", detail: "Add local audio files or Spotify tracks to your library" },
    { step: "Build a board", detail: "Arrange tap-ready buttons for your game-day workflow" },
    { step: "Run preflight", detail: "Verify audio files, speaker connections, and storage before the game" },
    { step: "Start the show", detail: "Enter live mode with focused performance controls" },
    { step: "Trigger cues live", detail: "Play, fade, and mute sounds in real time" },
    { step: "Review history", detail: "See what played and when after the event" },
  ],

  features: [
    {
      title: "Sound Library",
      summary: "Import local audio or add Spotify tracks and playlists.",
      bullets: [
        "Supports M4A, MP3, WAV, AIFF, CAF, and M4R",
        "Color tags, groups, search, and duplicate detection",
        "Optional hotkeys for external keyboards",
      ],
    },
    {
      title: "Cue Editor",
      summary: "Fine-tune how each sound plays with precision controls.",
      bullets: [
        "Waveform trimming with exact start and end points",
        "Fade in/out with adjustable durations",
        "Cue points, dropout regions, and per-sound volume (0–150%)",
      ],
    },
    {
      title: "Boards & Live Mode",
      summary: "Build tap-ready layouts for fast game-day playback.",
      bullets: [
        "Flexible button grids with adjustable density (2–5 columns) and wide bar layout",
        "Live status indicators and focused performance screen",
        "Configurable tap gestures, swipe volume, and panic mute",
        "Pre-built templates for hockey and general events",
      ],
    },
    {
      title: "Emergency Controls",
      summary: "Always-visible controls to stay in command during the show.",
      bullets: [
        "Panic mute — instant silence with one tap",
        "Now playing strip with elapsed time and gain control",
        "Master volume slider and fade-out always within reach",
      ],
    },
    {
      title: "Scripts & Rosters",
      summary: "Run repeatable show sequences and player intros.",
      bullets: [
        "Step-by-step scripts with timed waits, operator holds, fade-outs, and stop-all",
        "Rehearsal mode, lock mode, and built-in templates",
        "Roster walkouts with multiple entrance songs and pronunciation notes",
      ],
    },
    {
      title: "Spotify Integration",
      summary: "Add walk-up and background music alongside local sound cues.",
      bullets: [
        "Search and import tracks or playlists",
        "Remote playback control",
        "Requires Spotify Premium",
      ],
    },
    {
      title: "Backup, Logs & Accessibility",
      summary: "Keep setups portable and usable under real conditions.",
      bullets: [
        "Backup and restore your entire setup with automatic backups",
        "Session logs with timestamped play history and diagnostics",
        "VoiceOver support and large touch targets",
      ],
    },
  ],

  screenshots: [
    {
      src: "/screenshots/live-mode.webp",
      alt: "BenchHype live mode with tap-ready sound tiles and emergency controls",
      caption: "Run the show with large controls and always-available emergency tools",
    },
    {
      src: "/screenshots/board-editor.webp",
      alt: "BenchHype board editor with customizable sound tile layout",
      caption: "Build boards that match your sport and game-day workflow",
    },
    {
      src: "/screenshots/mixer.webp",
      alt: "BenchHype mixer showing multiple active sounds and volume controls",
      caption: "Manage multiple active sounds from one clear mixer view",
    },
    {
      src: "/screenshots/library.webp",
      alt: "BenchHype sound library with organized audio files and search",
      caption: "Keep your sounds organized and easy to find",
    },
    {
      src: "/screenshots/scripts.webp",
      alt: "BenchHype scripts view with timeline-based show sequences",
      caption: "Build repeatable show sequences for ceremonies and intros",
    },
    {
      src: "/screenshots/rosters.webp",
      alt: "BenchHype roster walkouts with player names and music assignments",
      caption: "Step through player intros with walkout music and notes",
    },
  ],

  pricing: {
    free: {
      title: "Free",
      description: "Everything you need to get started.",
      limits: ["15 sounds", "3 groups", "1 board"],
    },
    pro: {
      title: "Pro",
      description: "Remove all limits. One-time purchase.",
      // TODO: Replace with actual price when finalized
      price: "One-time purchase",
      features: ["Unlimited sounds and groups", "Unlimited boards and tiles", "Unlimited scripts and rosters", "Backup and restore", "All future updates"],
    },
  },

  faq: [
    {
      q: "Does BenchHype work offline?",
      a: "Yes. Local audio playback is designed to work without internet. Spotify features require an active Spotify Premium account and applicable connectivity.",
    },
    {
      q: "Do I need Spotify Premium?",
      a: "Only for Spotify features. BenchHype works great with local audio files only — no Spotify account required.",
    },
    {
      q: "Is BenchHype only for hockey?",
      a: "No. It is especially well suited to hockey-style stoppages and live cue workflows, but it works for any sport or live event where you need reliable sound control.",
    },
    {
      q: "Is it for iPhone or iPad?",
      a: "Both. BenchHype is a universal app optimized for the latest iPhone and iPad models.",
    },
    {
      q: "What are groups and play modes?",
      a: "Groups organize related sounds — like goal horns or timeout music — with play modes including playlist, shuffle, and loop. You can also set groups to only play unheard sounds for automatic variety.",
    },
    {
      q: "Can I use only local files?",
      a: "Absolutely. BenchHype supports M4A, MP3, WAV, AIFF, CAF, and M4R. Spotify integration is entirely optional.",
    },
    {
      q: "Can I customize how sounds are triggered?",
      a: "Yes. You can remap single, double, and triple tap actions for both idle and playing tiles. You can also assign keyboard hotkeys for use with an external keyboard.",
    },
    {
      q: "What is Simple Mode?",
      a: "Simple Mode hides Scripts and Rosters, reduces gestures to tap, long press, and panic mute, and simplifies the interface for new or nervous operators. Toggle it on in Settings.",
    },
  ],
} as const;
