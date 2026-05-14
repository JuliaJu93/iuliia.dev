# iuliia.dev — Personal Developer Portfolio

## 1. Overview

A single-page personal portfolio website that introduces Iuliia as a developer, showcases prior work experience, and highlights the best projects/tasks completed at previous jobs. The site is bilingual (English / Russian), supports light and dark themes, and is designed to feel clean, minimalist, and modern.

Primary goals:
- Make a strong first impression on potential employers and clients.
- Communicate experience, technical strengths, and personality clearly.
- Give visitors an easy way to get in touch.

## 2. Tech stack

- **Frontend:** Plain HTML, CSS, and JavaScript (no framework).
- **Styling:** Hand-written CSS with CSS variables for theming. Optional use of CSS Grid / Flexbox for layout.
- **Build / tooling:** **Vite** (Vanilla template) — used for local dev server with HMR and for production builds. Output stays 100% vanilla HTML/CSS/JS.
- **Hosting / deployment:** Vercel (custom domain `iuliia.dev`).
- **Version control:** Git + GitHub.

### Local development

- Project bootstrapped with `npm create vite@latest` using the **Vanilla** template.
- Common scripts (from `package.json`):
  - `npm run dev` — start the local dev server with hot-module reload.
  - `npm run build` — produce an optimized static bundle in `dist/`.
  - `npm run preview` — serve the production build locally for a final check.
- Default dev URL: `http://localhost:5173`.
- Required because `locales/en.json` and `locales/ru.json` are loaded via `fetch` and won't work from `file://`.
- Vercel auto-detects Vite projects, so no extra deploy configuration is needed.

## 3. Structure

The site is mostly a **single page** with smooth-scroll navigation between sections. There is one additional route type:

- `/` — main page with all sections below.
- `/projects/[slug]` — project case study pages (one per featured project) with deep-dive details.

### Main page sections (top to bottom)

1. **Hero / Intro**
   - Photo of Iuliia.
   - Name, short tagline (e.g. role + specialization).
   - Language switcher (EN / RU) and theme switcher (light / dark) in the top-right corner.
   - Primary CTA: "Contact me" / "See my work".
2. **About me**
   - Focus: years of experience & roles, and tech skills & stack.
   - Short paragraph (2–4 sentences) + a compact list of core technologies.
3. **Video**
   - A short personal intro video.
   - Format **TBD** (self-hosted MP4, YouTube/Vimeo embed, or auto-play loop). Placeholder in the design until decided.
4. **Experience (Previous jobs)**
   - **Cards grid** layout. Each card contains: company logo, role, dates, location, 1–2 sentence summary, key tech.
   - Cards link to the relevant project case study when applicable.
5. **Best tasks carousel**
   - Horizontal carousel/slider of highlight projects from previous jobs.
   - Each slide shows: **screenshot/image** + **short description** + **tech stack tags**.
   - Click → opens the full project case study page (`/projects/[slug]`).
6. **Contact**
   - Email, LinkedIn, GitHub, Telegram / WhatsApp.
   - Each as an icon + label with a clear hover state.
7. **Footer**
   - Copyright, current year, small "Built by Iuliia" note, repo link.

## 4. Internationalization (i18n)

- Languages: **English (en)** and **Russian (ru)**.
- Default: **auto-detect from `navigator.language`**, fall back to English.
- All copy stored in two JSON dictionaries (`/locales/en.json`, `/locales/ru.json`) and swapped at runtime.
- Language choice persisted in `localStorage` after the first manual switch.
- `<html lang>` attribute updated on switch.

## 5. Theming

- Themes: **light** and **dark**.
- Default: **follow system preference** via `prefers-color-scheme`.
- Implemented with CSS custom properties (e.g. `--color-bg`, `--color-text`, `--color-accent`) toggled by a `data-theme` attribute on `<html>`.
- User choice persisted in `localStorage`.
- Switcher control near the language switcher in the header.

## 6. Visual design

- **Style:** minimalist / clean.
- Generous whitespace, restrained color palette, one accent color.
- Modern typography — likely a single readable sans-serif for body and a slightly distinct treatment for headings.
- Subtle micro-interactions (button hovers, focus rings, theme transition).
- Smooth scroll between sections + scroll-triggered fade/slide-in animations (kept gentle, no parallax overload).

## 7. Carousel ("Best tasks") — details

- Horizontal sliding carousel, swipeable on touch devices, draggable with mouse, navigable by arrow keys and on-screen prev/next buttons.
- Each slide: image (16:9 or 4:3), title, 1–2 sentence description, tech-stack tag chips.
- Pagination dots and slide counter (e.g. "3 / 7").
- Lazy-load slide images for performance.
- Pauses any autoplay when the slide is focused or hovered.

## 8. Project case studies (`/projects/[slug]`)

Lightweight separate HTML pages for each featured project. Each page contains:
- Title, role, dates, company.
- Problem / context.
- What I did (responsibilities and approach).
- Screenshots / images.
- Tech stack.
- Outcome (qualitative; metrics if available).
- Link back to the main page.

## 9. Contact

Visible contact channels with icons:
- **Email** — `mailto:` link.
- **LinkedIn** — profile URL.
- **GitHub** — profile URL.
- **Telegram** and/or **WhatsApp** — deep links (`https://t.me/...`, `https://wa.me/...`).

All external links open in a new tab with `rel="noopener noreferrer"`.

## 10. Must-have features

- **Smooth scroll & section animations** — anchor navigation, gentle reveal on scroll.
- **Accessibility (WCAG AA)** — semantic HTML, keyboard navigability, visible focus states, sufficient color contrast in both themes, `prefers-reduced-motion` respected, alt text on all images, ARIA labels on icon-only buttons (language/theme switchers, carousel controls).
- **SEO + Open Graph** — proper `<title>`, `<meta description>`, `og:*` and `twitter:*` tags, a clean OG preview image, `sitemap.xml`, `robots.txt`, language alternates (`hreflang`).

## 11. Performance targets

- Lighthouse score 90+ on Performance, Accessibility, Best Practices, SEO.
- Images served in modern formats (WebP/AVIF) and properly sized.
- No heavy JS libraries; vanilla JS only.
- Fonts loaded with `font-display: swap`.

## 12. Repository / file layout (proposed)

```
iuliia.dev/
├── index.html              # Vite entry point (lives at project root)
├── package.json
├── vite.config.js          # optional, only if custom config is needed
├── public/                 # static assets served as-is (favicon, og-image, robots.txt, sitemap.xml)
├── src/
│   ├── projects/
│   │   ├── project-a.html
│   │   └── project-b.html
│   ├── assets/
│   │   ├── img/            # photo, project screenshots, logos
│   │   ├── video/          # intro video (if self-hosted)
│   │   └── icons/          # SVG icons (contact, theme, language, arrows)
│   ├── styles/
│   │   ├── main.css
│   │   ├── themes.css      # light/dark variables
│   │   └── components/     # carousel, cards, header, etc.
│   ├── scripts/
│   │   ├── main.js
│   │   ├── i18n.js         # language switching
│   │   ├── theme.js        # theme switching
│   │   └── carousel.js     # carousel logic
│   └── locales/
│       ├── en.json
│       └── ru.json
├── PROJECT.md              # this file
└── README.md
```

## 13. Open questions / TODO

- Decide the format for the intro video (self-hosted vs. embedded vs. background loop).
- Finalize list of jobs and which projects become full case studies.
- Choose the accent color and primary typeface.
- Collect logos / screenshots / video asset.
- Decide whether to add light analytics later (e.g. Vercel Analytics) — currently out of scope.

## 14. Roadmap (rough)

1. Define content: copy in EN + RU, list of jobs, list of featured projects, photo and video.
2. Design pass: pick palette, typography, build a Figma mock (or sketch) of the main page.
3. Build the skeleton (HTML structure, sections, navigation).
4. Add theming + i18n infrastructure early.
5. Implement sections one by one (hero → about → video → experience → carousel → contact).
6. Build case study pages.
7. Polish: animations, accessibility audit, SEO, OG images.
8. Deploy to Vercel and connect the domain.
