---
name: website-factory-onboarding
description: "Use this skill to onboard a new client site using the Website Factory system. Covers the full pipeline: gathering client info, populating site.config.yaml, scraping existing sites for content and images, generating service/area/combo page content, optimizing images, building the Astro site, and deploying to Cloudflare Pages. Triggers: 'new client site', 'onboard a client', 'set up a new site', 'build a site for [business name]', 'website factory', 'new build', or any reference to standing up a new local business website. This is the master workflow skill that coordinates the other website-factory skills (design, industry-profiles, scraping)."
---

# Website Factory Onboarding

Master workflow for spinning up a new client website using the Website Factory Astro template system. One config file produces 100-200+ SEO-optimized static pages deployed to Cloudflare Pages.

The template repo lives at the path configured by the user (typically cloned from GitHub). Every component in the template pulls from `site.config.yaml`. Zero hardcoded client data exists in any template file. Swap the config, get a new site.

---

## Before You Start

Read these companion skills (they contain critical design and scraping instructions):

1. `website-factory-design/SKILL.md` — Anti-vibe-code design rules, component specs, page wireframes
2. `website-factory-industry-profiles/SKILL.md` — Per-industry customer psychology, trust angles, color/type direction
3. `website-factory-scraping/SKILL.md` — How to pull content from existing sites and Google Business Profiles

---

## The Onboarding Pipeline

Work through these phases in order. Each phase has a clear deliverable before moving to the next.

### Phase 1: Gather Client Information

Collect everything needed to populate the config. Ask the user for:

**Required:**
- Business name and legal name
- Owner name
- Phone number (formatted and raw with country code)
- Email address
- Physical address (street, city, state, state_full, zip)
- Business hours (display format and schema.org format)
- Google Maps URL
- Year founded
- Geo coordinates (latitude, longitude)
- Services offered (name, slug, short description for each)
- Service areas (name, slug, which is primary)
- Tagline
- Business description (1-2 sentences)

**For trust signals:**
- Google/Yelp rating and review count
- Review platform name
- Trust badges (licensed, insured, satisfaction guaranteed, etc.)
- Any certifications or associations

**For branding:**
- Industry/theme (contractor, plumber, hvac, auto-repair, etc.)
- Primary and secondary brand colors (or extract from existing site)
- Font preferences (or use industry-profile defaults)
- Logo file

**For forms:**
- Zapier webhook URL or form handler endpoint

**For SEO:**
- Target domain name
- Title suffix (e.g., " | Smith Plumbing Co.")

**For footer:**
- Built-by name and URL

If the client has an existing website, use the `website-factory-scraping` skill to extract as much of this as possible before asking the user to fill gaps.

### Phase 2: Populate site.config.yaml

Use the gathered data to write the config file. Follow the exact structure from the template:

```yaml
business:
  name: "Business Name"
  legal_name: "Business Name LLC"
  owner: "Owner Name"
  phone: "(555) 123-4567"
  phone_raw: "+15551234567"
  email: "info@example.com"
  address:
    street: "123 Main St"
    city: "Springfield"
    state: "MO"
    state_full: "Missouri"
    zip: "65801"
  hours: "Monday - Friday: 8AM - 5PM"
  tagline: "Quality Work. Honest Pricing."
  description: "One or two sentences about the business."
  google_maps_url: "https://..."
  founded_year: 2015
  geo:
    latitude: 37.2089
    longitude: -93.2923
  hours_schema: "Mo-Fr 08:00-17:00"

brand:
  theme: "contractor"  # Match to industry-profiles skill
  colors:
    primary: "#2d5a27"
    secondary: "#d4a44c"
    dark: "#1a1a1a"
    light: "#f8f7f4"
    white: "#ffffff"
  fonts:
    heading: "Montserrat"
    body: "Inter"
  logo: "media/logo.webp"

trust_signals:
  rating: "5.0"
  review_count: 42
  review_platform: "Google"
  badges:
    - "5.0-Star Rated"
    - "Fully Insured"
    - "Locally Owned"
    - "100% Satisfaction Guaranteed"
    - "Honest Pricing"
    - "24-Hour Response"

services:
  - slug: "service-slug"
    name: "Service Name"
    short_description: "Brief description for cards and meta."
    image: "media/service-hero.webp"
    sub_services:  # optional
      - slug: "sub-service-slug"
        name: "Sub Service Name"

areas:
  - slug: "city-st"
    name: "City Name"
    is_primary: true
  - slug: "neighborhood-city-st"
    name: "Neighborhood Name"

reviews:
  - author: "Customer Name"
    text: "Review text."
    rating: 5
    date: "2 weeks ago"

form:
  action: "https://hooks.zapier.com/hooks/catch/xxxxx/yyyyy"

seo:
  domain: "clientdomain.com"
  title_suffix: " | Business Name"

built_by:
  name: "ServiceLine Pro"
  url: "https://servicelinepro.com"
```

Key rules for the config:
- Every service needs a slug, name, short_description, and image path
- The primary area should have `is_primary: true`
- Area slugs should follow the pattern: `neighborhood-city-state` (lowercase, hyphenated)
- The `hours_schema` field uses schema.org format (e.g., "Mo-Fr 08:00-17:00")
- Trust badges should be 5-6 short, punchy phrases
- Reviews should be real reviews from Google/Yelp (scraped or provided by client)

### Phase 3: Gather and Optimize Images

The site needs these images in `public/media/`:

**Required:**
- `logo.webp` — Business logo
- `hero-bg.webp` — Homepage hero background (or project collage)
- `team.webp` — Owner/team photo for About page
- One hero image per service (named to match config, e.g., `deck-hero.webp`)
- `project-1.webp` through `project-8.webp` — Project gallery photos

**Sources (in priority order):**
1. Client provides photos directly
2. Scrape from existing website (use scraping skill)
3. Pull from Google Business Profile photos
4. As absolute last resort, use high-quality stock photos that match the industry

After collecting images, optimize them:

```bash
npm run optimize-images
```

This runs Sharp to convert all images to WebP at optimized sizes.

### Phase 4: Generate Content

The site needs markdown content in three directories:

**Service pages** (`src/content/services/*.md`):
Write one markdown file per service. Each file needs:
- YAML frontmatter with `title`, `description`, pricing tiers, FAQ (5 questions), process steps
- 1,500-2,200 words of body content
- Real pricing ranges for the local market
- Specific brand/material names relevant to the service
- Local references (neighborhoods, building codes, climate considerations)
- NO generic filler. Every sentence earns its place.

**Area pages** (`src/content/areas/*.md`):
Write one markdown file per area. Each file needs:
- YAML frontmatter with `title`, `description`
- 1,500+ words about serving that specific area
- Neighborhood-specific housing stock descriptions (age, style, common materials, lot sizes)
- Local landmarks, school districts, and community character references
- Popular projects for that area with pricing context
- Specific building considerations (permit requirements, HOA rules, flood zones, soil type)
- Why homeowners in this area invest in home improvement (property values, neighborhood trends)

**Combo pages** (`src/content/service-areas/*.md`):
Each combo page (service + area) needs individually researched, unique content. Do NOT use a template script that generates thin placeholder content. Each page should be written individually with real research about the specific service in that specific area.

Each combo page needs:
- YAML frontmatter with `title`, `description`, `service` (slug), `area` (slug)
- 1,500+ words of unique, researched content
- Specific information about that service as it applies to that neighborhood (housing stock, common project types, local building requirements, climate factors)
- Real local pricing ranges for that service in that area
- References to specific materials, brands, and techniques relevant to the service
- Local knowledge: soil conditions, HOA rules, permit requirements, common architectural styles
- This is the content that wins local SEO. Thin 600-word pages that all read the same will not rank. Each page needs to be a genuinely useful resource for someone searching "[service] in [area]."

For a site with many combinations (e.g., 8 services x 15 areas = 120 pages), this is a multi-pass process. Write them in batches, research as you go, and do not sacrifice depth for speed. The page count is the competitive advantage; the content quality is what makes those pages rank.

**Content quality standards (applies to ALL content types):**
- Write like a human, not a content mill. Vary sentence length. Use active voice.
- Include real pricing for the local market (research comparable businesses)
- Reference specific product brands (Trex, Kohler, Cambria, etc.)
- Mention local building codes, climate factors, and soil conditions where relevant
- Each page should stand alone as a useful resource for someone searching that topic in that area
- Do NOT use em dashes, "merely," "straightforward," or other banned words from user preferences
- Do NOT use juxtapositions, contrasts, or bait-and-switch sentence structures
- Do NOT use phrases like "in today's world" or "best practices"

### Phase 5: Build and Verify

```bash
npm install
npm run build
```

The build should complete with zero errors and produce the expected page count. For a site with 8 services and 15 areas, expect roughly:

- 1 homepage
- 8 service pages
- 15 area pages
- 120 combo pages
- 1 about page
- 1 contact page
- 1 projects page
- **~147 pages total**

After building, verify locally:

```bash
npm run preview
```

Check at minimum:
- Homepage loads with correct business name, phone, services
- One service page has correct content and sidebar
- One area page renders with service cards linking to combo pages
- Contact page has correct phone, email, address
- Schema markup in page source has correct business data
- Sitemap.xml contains all generated pages

### Phase 6: Deploy

**Option A: Direct deploy via Wrangler (fastest for first deploy)**

```bash
npm run deploy
# or with a custom project name:
CLOUDFLARE_PROJECT_NAME=client-site npm run deploy
```

This builds the site and pushes to Cloudflare Pages via wrangler CLI.

**Option B: GitHub-connected deploy (recommended for ongoing)**

1. Create a new GitHub repo for the client:
```bash
gh repo create servicelinepro/client-domain --private
git remote add origin git@github.com:servicelinepro/client-domain.git
git add -A
git commit -m "Initial site build"
git push -u origin main
```

2. Connect to Cloudflare Pages:
   - Go to Cloudflare dashboard > Pages > Create a project
   - Connect the GitHub repo
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variable: `NODE_VERSION` = `22`

3. Set up the custom domain:
   - In Cloudflare Pages project settings > Custom domains
   - Add the client's domain
   - Update DNS records (CNAME to `<project>.pages.dev`)

After deploy, verify the live site loads correctly and all pages are accessible.

---

## Quick Reference: File Locations

| What | Where |
|---|---|
| Config | `site.config.yaml` |
| Templates | `src/pages/`, `src/components/`, `src/layouts/` |
| Service content | `src/content/services/*.md` |
| Area content | `src/content/areas/*.md` |
| Combo content | `src/content/service-areas/*.md` |
| Images | `public/media/` |
| Styles | `src/styles/` |
| Theme overrides | `src/styles/themes/` |
| Scripts | `scripts/` |
| Build output | `dist/` |
| Security headers | `public/_headers` |
| Redirects | `public/_redirects` |
| Deploy config | `wrangler.toml` |

---

## Common Customizations

**Changing the theme:**
Update `brand.theme` in the config. Available themes: `contractor`, `auto-shop`. Each theme has a CSS file in `src/styles/themes/` that overrides design tokens.

**Adding a new service:**
1. Add the service entry to `services:` in the config (slug, name, short_description, image)
2. Add a hero image to `public/media/`
3. Write `src/content/services/{slug}.md`
4. Update the `areaDetails` and `serviceContent` objects in `scripts/generate-combo-content.js`
5. Regenerate combo content: `node scripts/generate-combo-content.js`
6. Rebuild: `npm run build`

**Adding a new area:**
1. Add the area entry to `areas:` in the config (slug, name)
2. Write `src/content/areas/{slug}.md`
3. Add the area to `areaDetails` in `scripts/generate-combo-content.js`
4. Regenerate combo content: `node scripts/generate-combo-content.js`
5. Rebuild: `npm run build`

**Custom redirects:**
Add entries to `public/_redirects` in the format: `/old-path /new-path 301`

**Form handler:**
Update `form.action` in the config with the client's Zapier webhook URL or other form endpoint. The contact form POSTs: name, email, phone, service, message, and a honeypot field.
