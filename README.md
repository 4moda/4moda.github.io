# 4moda.github.io

Portfolio / calling-card site. React + TypeScript + Vite, SCSS Modules,
deployed to GitHub Pages by GitHub Actions on every push to `main`.

Live: <https://4moda.github.io>

## Editing the content

All visible text, links, tags, projects and history live in one file:

```
src/data/content.ts
```

Every string is bilingual — `{ ja: '…', en: '…' }` — and the JA/EN toggle in
the header switches between them. Search for `TODO` to find anything still
unwritten. No component needs to be touched to change content.

## Commands

```bash
npm install     # once
npm run dev     # dev server at http://localhost:5173
npm run build   # type-check (tsc -b) + production build into dist/
npm run preview # serve the built output locally
npm run lint    # oxlint
```

Note: this checkout lives under `/mnt/c`, i.e. on the Windows filesystem,
where inotify never fires. `vite.config.ts` detects that and turns on polling
so the dev server actually reloads. Delete that branch if the repo ever moves
to a Linux-native path.

## The look

A cheap riso / CMYK print, deliberately slightly out of register:

- **Halftone.** Backgrounds are grids of dots, not gradients. The `halftone()`
  mixin in `src/styles/_mixins.scss` stacks three plates — cyan, magenta,
  yellow — each offset by a fraction of the dot pitch, which is what produces
  the rosette. `plate()` draws a single-ink screen.
- **Misregistration.** The `.offsetText` class in `global.scss` prints cyan and
  magenta copies of the type either side of the ink and drifts them slowly.
- **One hue governs everything.** Every colour is `hsl(… + var(--hue-shift))`.
  `--hue-base` is global (clicking the logo rotates it), and each section
  offsets `--hue-shift` from that base, so the page walks around the colour
  wheel as you scroll and still recolours as a whole.
- **No soft shadows.** Blocks sit on flat offset shadows (`--shadow-hard`) and
  move into them on hover. Corners are square (`--radius-*: 0`).

Dark mode swaps the blend mode from `multiply` to `screen`, because ink that
darkens paper has to brighten a dark screen instead.

## Source layout (Atomic Design)

```
src/
├── components/
│   ├── atoms/       # Button, Chip, Tag, Card, Icon, Badge, Container,
│   │                #   Reveal, AnimatedText
│   ├── molecules/   # SectionHeading, MakingCard, NowCard, TimelineRow,
│   │                #   TagCloud, Marquee, NavMenu, ScrollProgress, …
│   ├── organisms/   # SiteHeader, HeroSection, AboutSection, MakingSection,
│   │                #   PlaygroundSection, NowSection, TimelineSection,
│   │                #   ContactSection, SiteFooter
│   ├── templates/   # PageTemplate — progress bar / header / main / footer
│   └── pages/       # HomePage — assembles the organisms
├── data/content.ts  # all content (bilingual)
├── lib/
│   ├── i18n/        # LangProvider + useLang + L10n type
│   ├── theme/       # ThemeProvider + useTheme (light / dark)
│   └── hooks.ts     # useScrolled, useActiveSection, useInView,
│                    #   useScrollProgress, usePointerSpotlight
└── styles/
    ├── _tokens.scss       # inks, fonts, dot pitch, hard shadows (light+dark)
    ├── _mixins.scss       # container, surface, lift, pill, plate, halftone
    ├── _breakpoints.scss  # up() / down() media mixins
    └── global.scss        # reset, base type, paper screen, plate drift
```

Each component keeps its styles beside it in a `*.module.scss` file. Colours
are never hard-coded in a component — they come from the custom properties in
`_tokens.scss`, which is what makes both the dark theme and the hue rotation a
single block of overrides.

Every animation is wrapped so that `prefers-reduced-motion: reduce` turns it
off.

## Deployment

`.github/workflows/deploy.yml` runs lint, build, and `actions/deploy-pages` on
push to `main`. In the repository settings, **Pages → Build and deployment →
Source** must be set to **GitHub Actions**.

Because this is a GitHub *user* site served from the domain root, `base` in
`vite.config.ts` stays `'/'`.
