# ServiceLine Pro vs Hook Agency PPC Page — Gap Analysis

## Executive Summary

The current ServiceLine Pro site has functional components (hero, CTA bands, comparison tables, FAQ, pricing, trust bars) but assembles them with weak visual hierarchy, insufficient contrast rhythm, and a "blog-in-a-template" feeling on internal pages. Hook Agency's PPC page demonstrates 14 distinct visual sections with dramatic dark/light contrast shifts, a consistent eyebrow-heading-body pattern, and strategic CRO pacing that current SLP pages lack entirely.

---

## GAP 1: Hero Section — Weak vs. Cinematic

**Hook Agency:** Full-viewport (100vh) hero with real photography background, dark overlay, massive ALL-CAPS H1 (~72-80px), neon-lime eyebrow label, 3 icon-bullets proving niche expertise, and a soft ghost-outline CTA. The hero FILLS the screen and makes a single bold claim.

**Current SLP:** Hero uses a CSS gradient background pattern (no imagery), moderate H1 size, generic "Performance Marketing for Home Services" eyebrow, inline stat chips ($2M+, 5.0★, 500+), and two standard buttons. The hero feels functional but small, generic, and visually flat compared to a full-bleed photo hero.

**Specific fix:** Rebuild hero as full-viewport with dark background, massive H1 in ALL CAPS, add eyebrow label in brand accent color, use 3 icon-bullet proof points below the headline, and a single ghost-outline primary CTA. Move stat proof to a separate trust strip below.

---

## GAP 2: Trust Strip — Missing Client Logo Bar

**Hook Agency:** Immediately below hero, a dark-background horizontal strip shows 6 named client logos in monochrome white/gray. All are home-service companies (HVAC, plumbing, roofing, solar). This is niche-specific social proof that builds credibility before any selling begins.

**Current SLP:** Has a TrustBar component that shows badge text ("Google Certified", "Spectrum Reach Partner", etc.) but NO client logos. The trust signals are self-declared, not third-party proof. There is no client logo strip anywhere on the site.

**Specific fix:** Add a client logo trust strip directly below the hero on all major pages. Use monochrome/white treatment of real client company logos or names.

---

## GAP 3: Section Rhythm — Monotonous vs. Dynamic

**Hook Agency:** Uses a deliberate dark→dark→dark→dark→WHITE→white→dark→white→dark rhythm. Each section shift creates a dramatic visual "breath." After 4 dark sections, the white comparison table section feels like opening a window. This pacing keeps the eye engaged through 14 sections.

**Current SLP:** Uses a mechanical `i % 3 === 1` / `i % 5 === 3` / `i % 7 === 5` system to alternate fw-section backgrounds. This creates unpredictable, un-designed color shifts with no intentional rhythm. The result feels random rather than authored.

**Specific fix:** Design intentional section color sequences per page type. Stop using modular arithmetic for background decisions. Each page template should have a hand-authored section flow.

---

## GAP 4: Content Presentation — Prose Dumps vs. Designed Modules

**Hook Agency:** Never renders raw markdown blocks. Every piece of content lives inside a designed module: 3-column feature grid, comparison table, split-image + text block, checklist with icons, FAQ accordion, card grid. Content is broken into digestible visual units every 1-2 viewport scrolls.

**Current SLP:** The `splitMarkdownSections()` function breaks markdown content into H2-delimited sections and renders each inside a `<div class="prose">` wrapper. While CRO modules (testimonials, CTA bands, comparison tables) are injected between sections, the prose blocks themselves are still long unformatted markdown. Service pages like PPC have 10+ H2 sections of dense text that render as walls of body copy.

**Specific fix:** Stop rendering raw prose sections as the primary content vehicle. Instead, build distinct visual module components (feature grids, split sections, stat callouts, icon checklists, process timelines) and use the markdown content to populate them. The prose class should be a fallback, not the default.

---

## GAP 5: Typography Hierarchy — Timid vs. Bold

**Hook Agency:** ALL CAPS for every H1 and H2. 72-80px hero H1. 48-60px section H2s. Consistent eyebrow→H2 two-step pattern on every section. Mixed-weight contrast within headlines (thin + bold words in the same line). Inline bold highlights in bullet text.

**Current SLP:** H1 at 3.052rem (~49px), H2 at 2.441rem (~39px). No ALL-CAPS treatment on headings. Eyebrow labels exist but are inconsistently applied. Typography feels moderate and professional but lacks the authority and visual punch that makes Hook Agency feel premium and confident.

**Specific fix:** Increase heading sizes dramatically. Apply ALL CAPS to H1 and H2 headings. Implement consistent eyebrow→heading→subtitle pattern on every section. Add weight contrast (light + bold) within select headlines for visual interest.

---

## GAP 6: Background Texture — Flat vs. Dimensional

**Hook Agency:** Dark sections use a subtle diagonal crosshatch/circuit-board texture that adds depth and visual interest without photography. This appears on at least 2 dark sections and prevents "flat dark rectangle" fatigue.

**Current SLP:** Dark sections use solid `var(--color-dark)` with occasional subtle radial gradients. The gradients are so subtle they're nearly invisible. Dark sections feel like flat dark blocks.

**Specific fix:** Add a subtle geometric texture pattern (CSS-based or SVG) to dark sections. Even a faint diagonal line pattern or dot grid adds perceived quality.

---

## GAP 7: CTA Cadence — Aggressive vs. Progressive

**Hook Agency:** CTAs escalate in commitment: nav has persistent "Schedule Intro Call" (lime-green, always visible), hero uses soft "Get In Touch" ghost button, mid-page has "Call Us" text link, final section has "Schedule Intro Call" with handwritten "No Obligation / Twenty Minute Call" annotation. The friction decreases as trust increases down the page.

**Current SLP:** Every CTA on the page says "Get Your Free Strategy Call" or "Free Strategy Call" or "Book Your Free Call." There is no progression. The same ask appears in the hero, mid-page CTA bands, and the final CTABand component. The repetition feels pushy rather than strategic.

**Specific fix:** Implement progressive CTA language. Top of page: softer ask ("Get In Touch" or "See Our Results"). Mid-page: value-specific ("Get Your Free PPC Audit"). Bottom: commitment-ready ("Schedule Your Strategy Call"). Add friction-reducing annotations near bottom CTAs.

---

## GAP 8: Comparison Table — Present but Weaker

**Hook Agency:** Full-width white-background comparison table with 3 columns (Hook Agency highlighted as dark/winner card vs. lighter Budget Agencies and In-House/DIY). Uses emoji icons for row headers. Clean, scannable, immediately communicates "we're the premium choice."

**Current SLP:** Has a ComparisonTable component but it renders inside a narrow prose container. The visual treatment is adequate but doesn't have the same "winner column" highlighting or the emoji row headers that make Hook Agency's version scan instantly.

**Specific fix:** Rebuild comparison table as a full-width section with the "winner column" visually dominant (dark background, border highlight). Add emoji or icon row headers for scannability.

---

## GAP 9: Video/Media as Authority — Missing

**Hook Agency:** Embeds a YouTube video mid-page ("How long does it take to get results on PPC?") with a team photo and "Visit Our YouTube" CTA. This positions the agency as a thought leader who creates educational content.

**Current SLP:** No video embeds anywhere. The VideoShowcase component exists but is not used on service pages. For a company with a Video Director (Cade Hansen) and free video production as a selling point, this is a major missed opportunity.

**Specific fix:** Add video embed sections to key pages. Use educational content ("How our PPC campaigns work" / "What to expect in the first 30 days") as mid-page authority signals.

---

## GAP 10: Handwritten/Human Elements — Missing

**Hook Agency:** Uses handwritten script annotations in 2 sections ("How we make your ads work" with arrow, "No Obligation / Twenty Minute Call" with curving arrow). These humanize the brand and break the rigidity of an all-caps design system.

**Current SLP:** Zero handwritten or human-touch design elements. Everything is strictly typographic. The brand feels sterile and corporate compared to Hook Agency's blend of authority + personality.

**Specific fix:** Add 1-2 handwritten-style annotations near CTAs. Use a script/handwritten web font for these elements. Place them strategically to reduce friction ("No commitment" / "Just a quick call").

---

## GAP 11: Proof/Badge Treatment — Underpowered

**Hook Agency:** Mid-page Google Partner badge displayed as a framed card with explanatory text. This is a standalone section, not buried in a footer or sidebar. Industry partner logos (Roofing Academy, ROOFCON, etc.) get their own horizontal strip. Two distinct logo strips serve different purposes: client logos (proof of work) and partner logos (proof of authority).

**Current SLP:** Trust badges are text-only in the top bar ("Google Certified", "Spectrum Reach Partner") and in the TrustBar component. There is no visual badge/certification card treatment. The Spectrum Reach partnership — SLP's biggest differentiator — is mentioned but never visually showcased with a logo, card treatment, or dedicated section.

**Specific fix:** Create a dedicated Spectrum Reach partnership section with their logo, a stats grid (30M+ households, 36 states, TAG certified), and a clear value proposition. Display Google and TAG certifications as visual badge cards, not text labels.

---

## GAP 12: Footer — Adequate but Generic

**Hook Agency:** Dark footer with logo, phone (green icon), address (neon pin icon), 3 link columns, email signup with lime-green button, social media icons. Clean and functional.

**Current SLP:** Footer exists and is functional but needs review. The current footer structure is acceptable but could benefit from tighter visual alignment with the redesigned section aesthetic.

**Specific fix:** Polish footer with consistent icon treatment, add email signup, ensure visual consistency with the new dark-section aesthetic.

---

## GAP 13: Mobile Sticky Bar and Nav CTA — Good but Off-Brand

**Hook Agency:** Persistent phone number in nav with green icon. Lime-green "Schedule Intro Call" button always visible. Mobile presumably similar.

**Current SLP:** Has a mobile sticky bar with "Call Now" and "Free Strategy Call." This is functional. The desktop nav has phone + "Free Strategy Call" button. This pattern is solid but the visual treatment (red primary) is less attention-grabbing than Hook Agency's neon-lime.

**Specific fix:** Consider making the nav CTA button more visually distinct (higher contrast, different color from page CTAs) so it pops in the header at all times.

---

## GAP 14: Page-Specific Content Architecture

**Hook Agency PPC page section flow:**
1. Hero (niche claim)
2. Client logos (proof)
3. Expertise + video (authority)
4. Checklist CTA (qualify)
5. Feature grid (capabilities)
6. Comparison table (differentiate)
7. Certification badge (trust)
8. Search CTA (urgency)
9. FAQ (objection handling)
10. Blog cards (content authority)
11. Partner logos (industry trust)
12. Final CTA (convert)

**Current SLP PPC page section flow:**
1. Hero (with breadcrumbs)
2. Qualifier block (good fit / not fit)
3. Prose section 1 + testimonial
4. Prose section 2 + CTA band
5. Prose section 3 + case study cards
6. Prose section 4 + comparison table
7. Prose section 5 + testimonial
8. More prose sections...
9. Sub-services grid
10. Process steps
11. Industries chips
12. FAQ
13. Pricing cards
14. Spectrum partnership
15. CTA band + reviews + footer

**Key difference:** Hook Agency's flow is 14 visually distinct modules. SLP's flow is 8-10 prose blocks with CRO modules stapled between them. The prose blocks are the problem — they're the "blog post in a template" feeling.

**Specific fix:** Restructure internal pages to use designed modules as the PRIMARY content vehicle, not prose sections. The markdown content should feed into components (feature grids, split sections, stat callouts), not render as raw HTML blocks.
