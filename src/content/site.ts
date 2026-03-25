export const site = {
  name: "BenchHype",
  tagline: "Live sports audio control for iPhone and iPad",
  description:
    "Run game-day sound with fast, reliable playback. Import local audio, build tap-ready boards, and control live cues with confidence — even offline.",
  heroAudience:
    "Built for PA operators, game-day volunteers, and anyone running sound at live sports events.",
  iosRequirement: "iOS 26+",

  badges: ["iOS 26+", "Works offline", "Spotify supported", "Built for game day"],

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
  // TODO: Replace with real App Store URL
  appStoreUrl: "#",
  // TODO: Replace with real TestFlight URL if applicable
  betaUrl: "#",

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
    { step: "Run preflight", detail: "Catch issues before the game starts" },
    { step: "Start the show", detail: "Enter live mode with focused performance controls" },
    { step: "Trigger cues live", detail: "Play, fade, and mute sounds in real time" },
    { step: "Review history", detail: "See what played and when after the event" },
  ],

  features: [
    {
      title: "Sound Library",
      summary: "Import local audio or add Spotify tracks and playlists.",
      bullets: [
        "Supports M4A, MP3, WAV, AIFF, and CAF",
        "Color tags, groups, search, and duplicate detection",
        "Optional hotkeys for external keyboards",
      ],
    },
    {
      title: "Boards & Live Mode",
      summary: "Build tap-ready layouts for fast game-day playback.",
      bullets: [
        "Flexible button grids and drag-resize layout",
        "Live status indicators and focused performance screen",
        "Tap, long press, quick actions, and panic mute",
      ],
    },
    {
      title: "Mixer & Emergency Controls",
      summary: "See and control multiple active sounds at once.",
      bullets: [
        "4-channel mixer view",
        "Volume, mute, fade, and stop controls",
        "Now playing, master volume, and panic mute always visible",
      ],
    },
    {
      title: "Scripts & Rosters",
      summary: "Run repeatable show sequences and player intros.",
      bullets: [
        "Timeline-based scripts and templates",
        "Rehearsal mode and lock mode",
        "Roster walkouts with music and pronunciation notes",
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
        "Backup and restore your entire setup",
        "Session logs and diagnostics after every event",
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
      features: ["Unlimited sounds", "Unlimited groups", "Unlimited boards", "All future updates"],
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
      a: "Both. BenchHype is a universal app optimized for iPhone and iPad running iOS 26 or later.",
    },
    {
      q: "Can I use only local files?",
      a: "Absolutely. BenchHype supports M4A, MP3, WAV, AIFF, and CAF. Spotify integration is entirely optional.",
    },
    {
      q: "What is Simple Mode?",
      a: "Simple Mode reduces the on-screen controls for new or nervous operators. It is designed to help volunteers and first-timers feel confident during high-pressure moments.",
    },
  ],
} as const;
