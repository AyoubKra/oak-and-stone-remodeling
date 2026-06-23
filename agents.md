# Oak & Stone Remodeling — Agent Instructions

## Project Identity

**Project:** Oak & Stone Remodeling — Demo Website
**Owner:** AK Digital House (akdigitalhouse.com)
**Purpose:** Portfolio demo showcasing lead-generation web design for remodeling contractors
**Status:** Active development

This is a **demo website only**. It is not a live business. There is no backend, no CMS, no database, and no tracking/analytics integration required. All data (testimonials, project counts, reviews) is hardcoded static content.

---

## Tech Stack

| Layer | Tool | Notes |
|---|---|---|
| Framework | Astro 4.x | Static-first, Islands architecture |
| Styling | Tailwind CSS v3 | Utility-first, config-extended with brand tokens |
| Language | TypeScript | Strict mode on |
| Hosting | Cloudflare Pages | Static output |
| Repository | GitHub | Main branch = production |

**Astro output mode:** `static`
**No SSR. No API routes. No database.**

---

## Design System

All design tokens are defined in `src/styles/global.css` as CSS custom properties and extended into Tailwind via `tailwind.config.mjs`.

**Never hardcode color hex values in components.** Always use Tailwind classes that map to the design tokens.

### Color Token Reference

| Token | Tailwind Class | Usage |
|---|---|---|
| `--color-primary` | `bg-primary` / `text-primary` | CTAs, links, active states |
| `--color-primary-dark` | `bg-primary-dark` | Hover states on primary |
| `--color-dark` | `bg-dark` / `text-dark` | Page background, nav |
| `--color-light` | `bg-light` | Section backgrounds |
| `--color-accent` | `bg-accent` / `text-accent` | Highlights, badges, icons |
| `--color-text` | `text-body` | All body copy |
| `--color-text-muted` | `text-muted` | Supporting copy, captions |
| `--color-border` | `border-border` | Dividers, card borders |
| `--color-surface` | `bg-surface` | Card backgrounds |

### Typography Reference

| Token | Tailwind Class | Usage |
|---|---|---|
| `--font-display` | `font-display` | Hero headlines, section headlines |
| `--font-body` | `font-body` | All body copy, UI text |
| `--font-mono` | `font-mono` | Price ranges, numbers |

### Spacing Scale

Use Tailwind's default spacing scale. For section padding, use the custom utilities defined in `global.css`:
- `.section-pad` → `padding-top: 5rem; padding-bottom: 5rem`
- `.section-pad-lg` → `padding-top: 7rem; padding-bottom: 7rem`
- `.container-site` → max-width 1280px, centered, horizontal padding 1.5rem

---

## Component Rules

### General

- Every component is self-contained. Data is either imported from `src/data/` or passed as Astro props.
- No component should import from another component's internal logic.
- All images use Astro's `<Image />` component from `astro:assets` — never raw `<img>` tags. This ensures WebP conversion and lazy loading automatically.
- All section components include a semantic `<section>` wrapper with an `id` attribute for anchor linking.

### The Estimator Component

`EstimateCalculator.astro` is the **only interactive island** on the page. It uses `client:visible` directive so it hydrates only when scrolled into view.

The estimator is built as a self-contained Astro component with an embedded `<script>` block handling all step logic and calculation.

**Calculation logic lives in `src/data/estimator.ts`** — never inline the matrix inside the component. The component imports and calls the calculation functions.

**Estimator rules:**
- ask for contact information before show estimation — this is non-negotiable
- All 8 steps must be completable with keyboard navigation
- The progress bar at the top updates on every step
- Never reset state when the user navigates back to a previous step

### Before/After Gallery

The gallery uses a CSS-only drag slider (no JS library). The slider uses `input[type=range]` positioned over two absolutely-stacked images. This keeps the component fully static-compatible.

### FAQ Section

The FAQ accordion uses the native HTML `<details>` and `<summary>` elements — no JavaScript required.

---

## Image Guidelines

- **Format:** All images must be WebP. Source images placed in `public/images/` in JPG/PNG are acceptable at authoring time; Astro's `<Image />` component handles WebP conversion at build time for images in `src/assets/`. For `public/` images, convert manually before committing.
- **Alt text:** Every image must have descriptive alt text. For decorative images use `alt=""`.
- **Lazy loading:** All images below the fold use `loading="lazy"`. The hero image uses `loading="eager"` and `fetchpriority="high"`.

---

## Performance Requirements

| Metric | Target |
|---|---|
| Lighthouse Performance | 90+ |
| Lighthouse Accessibility | 95+ |
| Lighthouse Best Practices | 95+ |
| Lighthouse SEO | 90+ |
| First Contentful Paint | < 1.2s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |

**Rules to maintain performance:**
- No third-party scripts (no analytics, no chat widgets, no tag managers — this is a demo)
- Fonts are self-hosted in `/public/fonts/` — no Google Fonts CDN calls
- The EstimateCalculator is the only hydrated island (`client:visible`)
- No CSS frameworks other than Tailwind are imported
- No icon libraries — use inline SVGs only

---

## Copy & Content Rules

All copy is final and sourced from the project strategy document. When building components:

- Do not paraphrase or rewrite any headline, subheadline, or body copy — use the exact strings from the strategy document or `src/data/` files
- Price ranges must match the estimator calculation matrix exactly
- Testimonial names, neighborhoods, dollar amounts, and timelines are fixed — do not alter them
- The phone number placeholder is `(919) 555-0180` — do not change it
- The license placeholder is `NC Contractors License #XXXXXX` — do not change it

---

## Accessibility Rules

- All interactive elements must be keyboard accessible
- Color contrast must meet WCAG AA minimum (4.5:1 for body text, 3:1 for large text)
- The estimator step navigation must be operable by keyboard
- `aria-label` attributes required on all icon-only buttons
- Section landmarks: `<header>`, `<main>`, `<footer>`, `<section>` with `aria-labelledby` where appropriate

---

## What NOT to Do

- Do not add analytics, pixels, or any third-party tracking scripts
- Do not add a CMS integration — all content is static
- Do not use `client:load` on any component except the estimator (use `client:visible` for that)
- Do not use `<img>` tags — always use Astro's `<Image />` component
- Do not hardcode colors as hex values in component files
- Do not install UI component libraries (shadcn, DaisyUI, etc.) — build components from Tailwind primitives
- Do not modify copy, prices, or testimonial data without explicit instruction
- Do Not bash any edits, will do by myself.
- Do Not check the server.