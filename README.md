# Website Factory

Config-driven Astro static site generator for local home service businesses. One YAML config file produces a complete, SEO-optimized, 100-200+ page website deployed to Cloudflare Pages.

**Built by ServiceLine Pro.**

## How It Works

1. Clone the repo
2. Edit `site.config.yaml` with the client's business data
3. Drop client photos into `public/media/`
4. Run `npm run build` to generate the full static site
5. Deploy to Cloudflare Pages

Every template component pulls from the config. Zero hardcoded client data in any template file. Swap the config, get a new site.

## Stack

- **Astro v6** - Static site generator, zero JS shipped to browser
- **Cloudflare Pages** - Edge deployment with security headers
- **Sharp** - Image optimization to WebP
- **YAML** - Single config drives all page generation

## Commands

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Local dev server at `localhost:4321` |
| `npm run build` | Production build to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run optimize-images` | Optimize images in `public/media/` to WebP |
| `npm run deploy` | Build + deploy to Cloudflare Pages |

## Generated Pages

The build produces pages from `site.config.yaml` data:

- **Homepage** - Hero, trust bar, services grid, reviews, project gallery, service areas
- **Service pages** - One per service (e.g. `/services/deck-building-topeka-ks/`)
- **Area pages** - One per service area (e.g. `/areas/north-topeka/`)
- **Combo pages** - Service + area cross-product (e.g. `/services/deck-building-topeka-ks/north-topeka/`)
- **About, Contact, Projects** - Standard business pages
- **Sitemap** - Auto-generated XML sitemap

## Content

Markdown content lives in `src/content/`:

- `services/*.md` - Service page content with frontmatter (pricing, FAQ, process steps)
- `areas/*.md` - Area page content with local neighborhood details
- `service-areas/*.md` - Combo page content (generated via `scripts/generate-combo-content.js`)

## New Client Onboarding

1. Copy `site.config.yaml` and update all fields for the new client
2. Update markdown content in `src/content/` (or regenerate with scripts)
3. Add client photos to `public/media/` and run `npm run optimize-images`
4. `npm run build` and verify locally with `npm run preview`
5. Push to a new GitHub repo and connect to Cloudflare Pages
