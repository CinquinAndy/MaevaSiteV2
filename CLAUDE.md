# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 portfolio website for Maeva Cinquin, a professional makeup artist and nail art specialist based in Haute-Savoie, France. The site uses Payload CMS 3.x as a headless CMS, with PostgreSQL database and S3 storage. The project uses TypeScript, Biome for linting/formatting, and Tailwind CSS 4.x for styling.

**About Maeva Cinquin:**
- Professional makeup artist specializing in beauty makeup, artistic makeup, and nail art
- Graduate of Make Up For Ever Academy (Nice) - 10-month intensive training
- Provides services for weddings, events, artistic projects, children, photo shoots, film productions, fashion shows
- Also certified as a nail technician (prothésiste ongulaire)
- Services areas: Haute-Savoie and Switzerland (Thonon-les-Bains, Geneva, Annecy, Lausanne and surrounding areas)
- Contact: maevacinquin1@gmail.com | +33 6 16 62 51 37
- Social: Instagram (@makeup.artist.dream), Facebook (Cinquin-maeva)
- Old website: https://cinquin-maeva.com/

**Tech Stack:**
- **Framework:** Next.js 16.4.5 (App Router with React 19)
- **CMS:** Payload CMS 3.93 with Lexical rich text editor
- **Database:** PostgreSQL via `@payloadcms/db-postgres`
- **Storage:** S3 via `@payloadcms/storage-s3`
- **Styling:** Tailwind CSS 4.x with Radix UI components
- **Animations:** GSAP, Framer Motion (motion), Three.js/React Three Fiber
- **Email:** Resend with React Email templates
- **AI Services:** Google AI SDK (Gemini), Forvoyez (alt text generation)
- **Package Manager:** bun (1.4, `bun.lock`)
- **Node Version:** ^18.20.2 || >=20.9.0

## Development Commands

```bash
# Development server (Next.js dev mode)
bun dev

# Production build
bun build

# Start production server
bun start

# Code quality (Biome)
bun check      # Run checks and auto-fix
bun lint       # Lint with auto-fix
bun format     # Format code

# Payload CMS commands
bun payload                    # Payload CLI
bun generate:types             # Generate TypeScript types from CMS schema
bun generate:importmap         # Generate import map for admin panel

# Email development
bun email      # React Email dev server on port 3001
```

## Site Structure & Content Strategy

### Page Structure

The website consists of the following pages:

**1. Homepage (Landing Page) - `/`**
- Hero section introducing Maeva and her expertise
- "Who is Maeva" section with background and qualifications
- "Latest Blog Articles" section - displays recent blog posts
- "Latest Galleries" section - showcases recent work/projects
- Footer with contact info and legal links

**2. Blog Page - `/blog`**
- Lists all blog articles in an attractive layout
- Content focus: Makeup tips, nail art advice, and industry news/updates
- Purpose: Share knowledge, showcase expertise, and provide beauty industry news
- Each article should link to a detailed post page

**3. Galery Page - `/galerie`**
- Displays Maeva's work organized in galleries
- Shows recent projects, makeup collections, and completed work
- Visual showcase of artistic makeup, beauty makeup, and nail art
- Each galery should link to a detailed view with full images

**4. Prestations (Services) Page - `/prestations`**
- Details of services offered (weddings, events, artistic makeup, nail art, photo shoots, etc.)
- Pricing information if applicable
- Service areas and availability

**5. Contact Page - `/contact`**
- Contact form (already implemented via Server Action in `src/actions/contact.ts`)
- Contact information section with:
  - Email: maevacinquin1@gmail.com
  - Phone: +33 6 16 62 51 37
  - Location/service areas map
  - Social media links (Instagram, Facebook)
  - Google Maps link: https://g.page/cinquin-maeva?share

**6. Legal Pages**
- Mentions Légales (Legal Notice) - `/mentions-legales`
- Privacy Policy if needed

### Navigation Structure

**Header Navigation (Gooey component):**
- Logo (links to homepage)
- Blog
- Prestations (Services)
- Galerie (Galery)
- Contact

**Footer:**
- Contact information
- Social media links
- Legal links (Mentions Légales)
- Quick links to main pages
- Copyright notice

### Content Approach

**Blog Content Strategy:**
- Makeup tips and tutorials
- Nail art techniques and trends
- Professional advice (e.g., "Why choose a professional makeup artist for your wedding?")
- Product reviews and recommendations (e.g., Estée Lauder Double Wear foundation)
- Showcase of special collections (e.g., "Mi Ange-Mi Démon" collection)
- Industry news and updates

**Galery Content Strategy:**
- Wedding makeup portfolios
- Artistic makeup projects
- Nail art designs
- Event and fashion show work
- Before/after transformations
- Special collections and collaborations

## Architecture

### Directory Structure

```
src/
├── app/
│   ├── (frontend)/          # Public-facing pages (homepage, blog, contact, etc.)
│   │   ├── layout.tsx       # Root layout with fonts, navigation, analytics
│   │   ├── page.tsx         # Homepage
│   │   ├── blog/
│   │   ├── prestations/
│   │   ├── galerie/
│   │   └── contact/
│   ├── (payload)/           # Payload CMS admin panel routes
│   └── api/                 # API routes
│       ├── forvoyez/        # Alt text generation endpoints
│       ├── gemini/          # SEO generation endpoints
│       └── health/
├── collections/             # Payload CMS collections (Users, Media, Blog, Galery, Services, Testimonials)
├── components/
│   ├── admin/              # Payload admin UI components
│   ├── fields/             # Custom Payload fields
│   ├── global/             # Shared app components
│   ├── home/               # Homepage-specific components
│   └── ui/                 # Reusable UI components (Radix-based)
├── actions/                # Next.js Server Actions (e.g., contact.ts)
├── emails/                 # React Email templates
├── lib/
│   ├── forvoyez/          # Forvoyez API integration
│   ├── gemini/            # Google Gemini API integration
│   ├── lexical/           # Lexical editor utilities
│   ├── payload/           # Payload utilities (seo-fields, get-homepage-data)
│   └── utils.ts           # Shared utilities (cn, etc.)
└── payload.config.ts       # Payload CMS configuration
```

### Key Patterns

**1. Payload CMS Integration**
- `payload.config.ts` is the central configuration (aliased as `@payload-config`)
- **Collections:** Users, Media, Blog, Galery, Services, Testimonials (no globals)
- CMS helpers live in `src/lib/payload/` (testimonials, admin auth, revalidation hook, legacy slug lookup)
- Generated types are in `src/payload-types.ts` (regenerate with `bun generate:types`)
- Path alias: `@payload-config` points to `src/payload.config.ts`

**2. Next.js App Router Structure**
- Route groups: `(frontend)` for public pages, `(payload)` for admin
- Root layout at `src/app/(frontend)/layout.tsx` includes:
  - Custom fonts: Libre Caslon Display, Corinthia, Kalam, URW Form (Adobe)
  - Global navigation with Gooey component (logo + Blog, Prestations, Galerie, Contact)
  - Vertical scroll progress indicator (positioned left on mobile, right on desktop)
  - Umami analytics integration
  - GlitterFinal background effect for visual appeal
- **Pages:** `/`, `/blog` + `/blog/[slug]`, `/galerie` + `/galerie/[slug]`, `/prestations` + `/prestations/[slug]`,
  `/contact`, `/mentions-legales`, `/tuto` (CMS guide, admin session required)
- `/[slug]` (root): old WordPress URLs → 308 to the blog post, gallery or service with that slug, else 404.
  Unknown or wrongly-cased slugs in the detail pages are redirected the same way (`src/lib/payload/find-page-by-slug.ts`)
- SEO: indexing open (`index, follow`). Metadata, JSON-LD (LocalBusiness, Person, BlogPosting, ImageGallery, Service,
  BreadcrumbList) in `src/lib/seo.ts`; share images go through the Next image optimizer (`optimizedImageUrl`)
- `/llms.txt` (`src/app/llms.txt/route.ts`): Markdown summary of the site for AI assistants, built from the CMS
- `robots.txt` blocks `/admin/` and `/api/` except `/api/media/file/` (CMS images must stay crawlable)

**3. Server Actions**
- Contact form submission in `src/actions/contact.ts`
- Uses Resend for email with React Email templates
- Returns typed responses (`ContactFormResponse`)
- Contact form data includes: name, email, phone, city, postalCode, message, prestation, source (the last two are
  optional choices from `src/lib/contact-options.ts`)
- Anti-spam: Cloudflare Turnstile (`TURNSTILE_SECRET_KEY`, fails closed in production), honeypot field `website`,
  random-letter bot filter (`src/lib/security/`). Bots get a silent success
- Emails sent from: contact@andy-cinquin.com, to maevacinquin1@gmail.com
- Reply-to is set to customer's email for easy responses

**4. AI/API Integrations**
- **Forvoyez:** Alt text generation for images (routes in `src/app/api/forvoyez/`, admin session required)
- **Gemini:** SEO content generation (routes in `src/app/api/gemini/`, admin session required)

**5. Analytics (Umami)**
- Umami (umami.wadefade.fr) is served from the site's own domain to get past ad blockers: script `/v/s.js`, events
  `/v/e`, relayed by `src/app/v/[...path]/route.ts`. The visitor IP is forwarded in `true-client-ip` (Umami's nginx
  rewrites `x-real-ip`)
- Event names live in `src/lib/analytics/track.ts` (`UMAMI_EVENTS`); goals and funnels in Umami use them, do not rename
- Replays are wired but off (`NEXT_PUBLIC_UMAMI_REPLAYS`): they need visitor consent (CNIL)
- IndexNow (`src/lib/seo/indexnow.ts`) pings Bing when a blog post, gallery or service is published
- Environment variables required (see `.env.example`)

**6. Styling**
- Tailwind CSS 4.x with custom design tokens
- CSS variables for theming
- Utility function: `cn()` from `src/lib/utils.ts` for conditional classes
- Biome formatting: tabs (indent width 2), line width 120

**7. TypeScript Configuration**
- Path aliases: `@/*` → `src/*`, `@payload-config` → `src/payload.config.ts`
- Strict mode enabled
- Target: ES2017

## Environment Variables

Required environment variables (see `.env.example`):

```bash
DATABASE_URI=               # PostgreSQL connection string
NEXT_PUBLIC_SERVER_URL=     # Public server URL
PAYLOAD_SECRET=             # Payload CMS secret
S3_BUCKET=                  # S3 bucket name
S3_ACCESS_KEY_ID=           # S3 access key
S3_SECRET_ACCESS_KEY=       # S3 secret key
S3_ENDPOINT=                # S3 endpoint URL
S3_REGION=                  # S3 region (default: "auto")
REVALIDATE_SECRET=          # Shared secret for /api/revalidate (ISR after CMS changes)
TURNSTILE_SECRET_KEY=       # Cloudflare Turnstile secret (contact form)
RESEND_TOKEN=               # Resend API token for emails
FORVOYEZ_TOKEN=             # Forvoyez API token
GEMINI_API_KEY=             # Google Gemini API key
```

## Code Quality Standards

### Biome Configuration
- **Formatter:** Tabs with 2-space width, 120 char line width, single quotes for JS, double quotes for JSX
- **Linter:** Strict rules with some exceptions:
  - `useExhaustiveDependencies`: off
  - `noNonNullAssertion`: off
  - `noDangerouslySetInnerHtml`: off
  - `noImportantStyles`: off
- **Special override:** `payload-types.ts` has relaxed type rules

### Running Code Quality Checks
Always run `bun check` before committing to ensure code quality.

## Important Notes

1. **Payload Types:** After modifying CMS schemas (collections/globals), run `bun generate:types` to update TypeScript types
2. **Import Map:** After adding new admin components, run `bun generate:importmap`
3. **Git Branch:** Main branch is `main`; merging to `main` deploys through Coolify
4. **Next.js Config:** Uses `withPayload` wrapper for Payload integration
5. **Security Headers:** Basic security headers configured in `next.config.mjs`
6. **Server Actions:** Body size limit set to 10MB for file uploads
7. **Image Optimization:** Configured remote patterns for cinquin-maeva.com and andy-cinquin.fr domains
8. **Language:** All content should be in French (site targets French-speaking audience in France/Switzerland)
9. **Data migrations:** `bun run build` runs `src/scripts/migrate.ts` against `DATABASE_URI` before `next build`. Content fixes go in idempotent data migrations in `src/migrations/` (never overwrite a value edited in the admin)

## Testing Strategy

Tests run with `bun test tests` (bun:test). They cover the contact action and anti-spam, the contact draft, the
Umami relay and events, SEO helpers (JSON-LD escaping, share images, local data, legacy redirects) and IndexNow.
