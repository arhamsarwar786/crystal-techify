# Crystal Techify — Corporate Website

A production-ready, futuristic marketing site for **Crystal Techify**, a Dublin,
Ohio-based AI & advanced software engineering firm.

## Stack

| Layer      | Choice                                   |
| ---------- | ---------------------------------------- |
| Framework  | Next.js 14 (App Router, RSC)             |
| Language   | TypeScript                              |
| Database   | PostgreSQL + Prisma                      |
| Uploads    | Local `data/uploads` or Vercel Blob      |
| Styling    | Tailwind CSS + custom glassmorphism utils |
| Animation  | Framer Motion                           |
| Icons      | Lucide React                           |
| Fonts      | Michroma + Poppins (`next/font`)        |

## Getting started

```bash
cp .env.example .env
pnpm install
pnpm db:up          # Docker Postgres on localhost:5433
pnpm db:migrate     # apply Prisma migrations
pnpm db:seed        # admin + sample jobs
pnpm dev            # http://localhost:3000
```

Admin login after seed: `admin@crystaltechify.com` / `changeme`.

Optional: copy [`.env.example`](.env.example) to `.env.local` and add a
`NEXT_PUBLIC_WEB3FORMS_KEY` to enable direct contact-form submissions (see
**Contact form** below).

## Database and file uploads (Vercel)

The Next.js app (frontend + API), Postgres, and CV files all run on Vercel:

| What | Where in Vercel | Env |
| --- | --- | --- |
| Site + API | the Next.js project | — |
| Database | **Storage → Create → Neon** | `DATABASE_URL`, `DATABASE_URL_UNPOOLED` (injected) |
| CVs | **Storage → Create → Blob** | `BLOB_READ_WRITE_TOKEN` (injected) |

Also set `AUTH_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`. Local Docker Postgres is only for development.

## Structure

```
app/
  layout.tsx          # fonts, metadata, <html> shell
  page.tsx            # section composition (server component)
  globals.css         # Tailwind layers + glass/gradient/grid utilities
  privacy/ terms/     # legal pages (linked from the footer)
components/
  Logo.tsx            # theme-aware logo (real brand assets in public/brand/)
  theme/              # ThemeProvider + pre-paint theme-script
  layout/             # Header (sticky, animated, theme toggle), Footer
  sections/           # Hero, Services, Industries, Process, Portfolio,
                      # Engagement (+ audit banner), Testimonials, Contact
  ui/                 # Reveal, SectionHeading, TiltCard, Marquee,
                      # CTAButton, ThemeToggle, ParticleField, SplashScreen
lib/
  types.ts            # PortfolioItem, Service, Testimonial, ...
  data.ts             # all site content in one place
```

## Theming

Light and dark are driven by semantic tokens. `components/theme/theme-script.ts`
resolves the theme before first paint (order: `?theme=` query param → saved
choice → OS preference) and sets `light`/`dark` on `<html>`. Colours come from
CSS variables in `app/globals.css`; `--ink` is the single value that flips
text, hairlines, and glass surfaces. The header/mobile-menu toggle persists the
choice to `localStorage` (`ct-theme`).

Brand artwork lives in [`public/brand/`](public/brand/) — `lockup-light.png`,
`lockup-dark.png`, and `mark.png`. The `<Logo>` component swaps them with CSS
`dark:` variants (no flash, no JS).

## Contact form

The homepage `#contact` form posts to [Web3Forms](https://web3forms.com) when
`NEXT_PUBLIC_WEB3FORMS_KEY` is set — no backend, no secret (the key is public by
design). Get a free key by entering `info@crystaltechify.com` at web3forms.com
and put it in `.env.local`.

Without a key the form still works: it opens the visitor's mail client with a
pre-filled message and shows a copyable fallback panel. A failed POST falls back
to the same panel.

## Editing content

All copy, services, process steps, portfolio items, testimonials, and contact
details live in [`lib/data.ts`](lib/data.ts). Types are defined in
[`lib/types.ts`](lib/types.ts).

## Design system

- **Brand gradient:** `#FF3B30 → #FF9500` (`bg-brand-gradient`, `.gradient-text`)
- **Surfaces:** `bg-bg` / `bg-surface` grounds, `text-ink` foreground, `.glass` /
  `.glass-strong` cards — all theme-aware via CSS variables
- **Accents:** animated `.gradient-border`, ambient blur glows, `.grid-backdrop`
- **Motion:** scroll-reveal via `<Reveal>`, cursor-tracking `<TiltCard>`,
  logo-dispersion `<ParticleField>`, marquee tech strip
- Respects `prefers-reduced-motion`.
