# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 portfolio website for Maeva Cinquin, a professional makeup artist and nail art specialist based in Haute-Savoie, France. The site uses Payload CMS 3.x as a headless CMS, with PostgreSQL database and S3 storage. The project uses TypeScript, Biome for linting/formatting, and Tailwind CSS 4.x for styling.

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
- **Framework:** Next.js 15.5.6 (App Router with React 19)
- **CMS:** Payload CMS 3.60.0 with Lexical rich text editor
- **Database:** PostgreSQL via `@payloadcms/db-postgres`
- **Storage:** S3 via `@payloadcms/storage-s3`
- **Styling:** Tailwind CSS 4.x with Radix UI components
- **Animations:** GSAP, Framer Motion (motion), Three.js/React Three Fiber
- **Email:** Resend with React Email templates
- **AI Services:** Google AI SDK (Gemini), Forvoyez (alt text generation)
- **Package Manager:** pnpm (v9 or v10)
- **Node Version:** ^18.20.2 || >=20.9.0

## Development Commands

```bash
# Development server (Next.js dev mode)
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Code quality (Biome)
pnpm check      # Run checks and auto-fix
pnpm lint       # Lint with auto-fix
pnpm format     # Format code

# Payload CMS commands
pnpm payload                    # Payload CLI
pnpm generate:types             # Generate TypeScript types from CMS schema
pnpm generate:importmap         # Generate import map for admin panel

# Email development
pnpm email      # React Email dev server on port 3001
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
├── collections/             # Payload CMS collections (Users, Media)
├── globals/                 # Payload CMS globals (Homepage)
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
- **Current Collections:** Users, Media
- **Current Globals:** Homepage
- **Planned Collections to Add:**
  - `Blog` - Blog posts/articles with title, slug, content (Lexical), featured image, excerpt, publish date, SEO fields
  - `Galery` - Galery collections with title, slug, description, images array, category (wedding/artistic/nail-art), publish date
  - `Services` - Services/Prestations with title, description, pricing, category
  - `Legal` - Legal pages (mentions légales, privacy policy) with slug and content
- Use helper functions like `getHomepageData()` from `src/lib/payload/` to fetch CMS data
- Generated types are in `src/payload-types.ts` (regenerate with `pnpm generate:types`)
- Path alias: `@payload-config` points to `src/payload.config.ts`

**2. Next.js App Router Structure**
- Route groups: `(frontend)` for public pages, `(payload)` for admin
- Root layout at `src/app/(frontend)/layout.tsx` includes:
  - Custom fonts: Libre Caslon Display, Corinthia, Kalam, URW Form (Adobe)
  - Global navigation with Gooey component (logo + Blog, Prestations, Galerie, Contact)
  - Vertical scroll progress indicator (positioned left on mobile, right on desktop)
  - Umami analytics integration
  - GlitterFinal background effect for visual appeal
- **Current Pages:**
  - `/` - Homepage (currently basic, needs full landing page implementation)
  - `/blog` - Blog listing page (needs implementation)
  - `/prestations` - Services page (needs implementation)
  - `/galerie` - Galery page (needs implementation)
  - `/contact` - Contact form page (needs implementation)
- **Pages to Add:**
  - `/blog/[slug]` - Individual blog post pages
  - `/galerie/[slug]` - Individual galery detail pages
  - `/mentions-legales` - Legal notice page
- SEO: Robots currently set to block all indexing (`index: false`, `follow: false`) - update when ready for production

**3. Server Actions**
- Contact form submission in `src/actions/contact.ts`
- Uses Resend for email with React Email templates
- Returns typed responses (`ContactFormResponse`)
- Contact form data includes: name, email, phone, address, city, postalCode, message, gardenSize
- Emails sent from: contact@andy-cinquin.fr
- Currently sends to: cinquin.andy@gmail.com (update to Maeva's email when ready)
- Reply-to is set to customer's email for easy responses

**4. AI/API Integrations**
- **Forvoyez:** Alt text generation for images (routes in `src/app/api/forvoyez/`)
- **Gemini:** SEO content generation (routes in `src/app/api/gemini/`)
- Environment variables required (see `.env.example`)

**5. Styling**
- Tailwind CSS 4.x with custom design tokens
- CSS variables for theming
- Utility function: `cn()` from `src/lib/utils.ts` for conditional classes
- Biome formatting: tabs (indent width 2), line width 120

**6. TypeScript Configuration**
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
Always run `pnpm check` before committing to ensure code quality.

## Implementation Priorities

When building out the website, follow this priority order:

1. **CMS Collections Setup**
   - Create Blog collection with all necessary fields
   - Create Galery collection with image arrays
   - Create Services collection for prestations
   - Update Homepage global with sections for hero, about, latest blog posts, latest galleries
   - Run `pnpm generate:types` after each collection creation

2. **Homepage Development**
   - Hero section with introduction
   - "About Maeva" section (training, expertise, service areas)
   - Latest blog articles section (fetch 3-4 recent posts)
   - Latest galleries section (fetch 3-4 recent galleries)
   - Footer component with all contact info and legal links

3. **Core Pages**
   - Blog listing page with attractive card layout
   - Galery listing page with visual grid
   - Contact page with form + contact info + map
   - Individual blog post page (`/blog/[slug]`)
   - Individual galery page (`/galerie/[slug]`)

4. **Services & Legal**
   - Prestations page with service details
   - Legal pages (mentions légales)

5. **Polish & Optimization**
   - SEO metadata for all pages
   - Image optimization and alt text
   - Mobile responsiveness
   - Performance optimization
   - Update robots.txt when ready for indexing

## Important Notes

1. **Payload Types:** After modifying CMS schemas (collections/globals), run `pnpm generate:types` to update TypeScript types
2. **Import Map:** After adding new admin components, run `pnpm generate:importmap`
3. **Git Branch:** Main branch is `master` (not `main`)
4. **Next.js Config:** Uses `withPayload` wrapper for Payload integration
5. **Security Headers:** Basic security headers configured in `next.config.mjs`
6. **Server Actions:** Body size limit set to 10MB for file uploads
7. **Image Optimization:** Configured remote patterns for cinquin-maeva.com and andy-cinquin.fr domains
8. **Language:** All content should be in French (site targets French-speaking audience in France/Switzerland)
9. **Contact Form:** Remember to update recipient email to Maeva's email before production deployment

## Testing Strategy

There are currently no automated tests configured in this project. When adding tests:
- Consider using Vitest (devDependencies include jsdom and vite-related packages)
- Test server actions in `src/actions/`
- Test API routes for AI integrations
- Test Payload CMS collection/global schemas
