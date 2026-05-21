export const site = {
  name: "BenchHype",
  tagline: "Live sports audio control for iPhone and iPad",
  description:
    "Run game-day sound with fast, reliable playback. Import local audio, build tap-ready boards, and control live cues with confidence — even offline.",
  heroAudience:
    "Built for PA operators, game-day volunteers, and anyone running sound at live sports events.",
  iosRequirement: "iOS 26+",

  badges: ["iPhone & iPad", "Works offline", "Apple Music integration", "Built for game day"],

  ctaPrimary: {
    label: "Coming Soon",
    // TODO: Replace with App Store URL when available
    href: "#",
  },
  ctaSecondary: {
    label: "View Features",
    href: "#features",
  },

  supportEmail: "info@benchhype.com",
  supportUrl: "/support",
  privacyUrl: "/privacy",
  benefits: [
    {
      title: "Fast under pressure",
      body: "Large, tap-ready controls and instant playback designed for real game situations. No fumbling when the moment counts.",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    },
    {
      title: "Reliable offline",
      body: "Local audio playback works without internet. The show keeps moving even when the Wi-Fi doesn't.",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.56 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>`,
    },
    {
      title: "Volunteer friendly",
      body: "Simple mode and emergency controls help reduce mistakes when the pressure is on. Hand it to anyone on game day.",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    },
  ],

  workflow: [
    { step: "Import sounds", detail: "Add local audio files or Apple Music tracks to your library" },
    { step: "Build a board", detail: "Arrange tap-ready buttons for your game-day workflow" },
    { step: "Run preflight", detail: "Verify audio files, speaker connections, and storage before the game" },
    { step: "Start the show", detail: "Enter live mode with focused performance controls" },
    { step: "Trigger cues live", detail: "Play, fade, and mute sounds in real time" },
    { step: "Review history", detail: "See what played and when after the event" },
  ],

  features: [
    {
      title: "Sound Library",
      summary: "Import local audio or add Apple Music tracks and playlists.",
      image: "/features/feature-library.webp",
      bullets: [
        "Supports standard audio formats (MP3, M4A, WAV, and more)",
        "Organize with custom color tags, sound groups, and fast search",
        "Smart duplicate detection to keep your library clean and save storage",
      ],
    },
    {
      title: "Cue Editor",
      summary: "Fine-tune how each sound plays with precision controls.",
      image: "/features/feature-cue-editor.webp",
      bullets: [
        "Visual trim editor to set precise start and end times for any sound",
        "Smooth fade-ins and fade-outs with adjustable durations",
        "Custom start points and volume boosts up to 150% for quiet tracks",
      ],
    },
    {
      title: "Boards & Live Mode",
      summary: "Build tap-ready layouts for fast game-day playback.",
      image: "/features/feature-boards.webp",
      bullets: [
        "Customizable button sizes (2 to 5 columns) to fit any iPhone or iPad screen",
        "Live progress rings and large buttons built for cold ice rinks or fields",
        "Remap buttons to tap, double-tap, or swipe to easily adjust volume on the fly",
        "Multi-button split — play different parts of the same song on separate buttons",
      ],
    },
    {
      title: "Emergency Controls",
      summary: "Always-visible controls to stay in command during the show.",
      image: "/features/feature-emergency.webp",
      bullets: [
        "Panic mute — instantly silence all music with a single tap when a whistle blows",
        "Now Playing bar showing time elapsed and current track volume",
        "Always-visible master volume slider and quick fade-out button",
      ],
    },
    {
      title: "Scripts & Rosters",
      summary: "Design repeatable show sequences and manage player walkout rosters.",
      image: "/features/feature-scripts.webp",
      bullets: [
        "Plan your pre-game show with timed pauses and tap-to-continue prompts",
        "Lineup builder with quick drag-to-reorder and one-tap player benching",
        "Assign multiple walk-up songs per player with spelling and pronunciation guides",
      ],
    },
    {
      title: "Apple Music Integration",
      summary: "Add walk-up and background music alongside local sound cues.",
      image: "/features/feature-applemusic.webp",
      bullets: [
        "Search and import millions of songs or playlists from Apple Music",
        "Play and control streaming music directly alongside your local files",
        "Requires an active Apple Music subscription and internet connection",
      ],
    },
    {
      title: "Backup, Logs & Accessibility",
      summary: "Keep setups portable and usable under real conditions.",
      image: "/features/feature-backup.webp",
      bullets: [
        "Automatic backups to ensure you never lose your boards or music lists",
        "Game-day play history logs to see exactly what songs were played and when",
        "Built-in accessibility with full voice support and oversized touch targets",
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
      src: "/screenshots/cue-editor.webp",
      alt: "BenchHype cue editor with waveform trimming and playback controls",
      caption: "Fine-tune each sound with trim points, fades, and gain",
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
      alt: "BenchHype roster live mode with player walkout list and tap-to-play controls",
      caption: "Step through player intros with tap-to-play walkout music",
    },
  ],

  heroTiles: [
    { label: "Airhorn", state: "active" },
    { label: "Anthem", state: "default" },
    { label: "Crowd", state: "default" },
    { label: "Whistle", state: "default" },
    { label: "Buzzer", state: "playing" },
    { label: "Organ", state: "default" },
    { label: "Defense", state: "default" },
    { label: "Strike", state: "default" },
    { label: "Charge", state: "default" },
    { label: "Timeout", state: "default" },
    { label: "Slap", state: "default" },
    { label: "Win", state: "default" },
  ],

  heroPlayer: {
    title: "Game Opener Mix",
    progress: 33
  },

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
      a: "Yes. Local audio playback is designed to work without internet. Apple Music features require an active Apple Music subscription and applicable connectivity.",
    },
    {
      q: "Do I need an Apple Music subscription?",
      a: "Only for Apple Music features. BenchHype works great with local audio files only — no Apple Music subscription required.",
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
      a: "Absolutely. BenchHype supports M4A, MP3, WAV, AIFF, CAF, and M4R. Apple Music integration is entirely optional.",
    },
    {
      q: "Can I customize how sounds are triggered?",
      a: "Yes. You can remap single, double, and triple tap actions for both idle and playing tiles, and configure custom gestures like swipe-to-gain or panic mute directly in Settings.",
    },
    {
      q: "What is Simple Mode?",
      a: "Simple Mode hides Scripts and Rosters, reduces gestures to tap, long press, and panic mute, and simplifies the interface for new or nervous operators. Toggle it on in Settings.",
    },
  ],
} as const;
