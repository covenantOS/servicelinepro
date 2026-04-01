import { marked } from 'marked';

// Configure marked for clean output
marked.setOptions({
  gfm: true,
  breaks: false,
});

export function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false }) as string;
}

/**
 * Transform rendered HTML to add visual modules:
 * - Consecutive bold-lead paragraphs become a feature card grid
 * - H3 + content blocks become card modules
 * - Long sections get visual breaks
 */
function transformToModules(html: string): string {
  // 1. Transform consecutive <p><strong>Title.</strong> description</p> into feature cards
  // Match paragraphs that start with <strong>...</strong> followed by text
  html = html.replace(
    /(<p><strong>[^<]+<\/strong>[^<]*<\/p>\s*){2,}/g,
    (match) => {
      const cards = match.match(/<p><strong>([^<]+)<\/strong>\s*([\s\S]*?)<\/p>/g);
      if (!cards || cards.length < 2) return match;

      const cardHtml = cards.map(card => {
        const m = card.match(/<p><strong>([^<]+)<\/strong>\s*([\s\S]*?)<\/p>/);
        if (!m) return card;
        const title = m[1].replace(/\.$/, '');
        const desc = m[2].trim();
        return `<div class="feature-card"><h4 class="feature-card-title">${title}</h4><p class="feature-card-desc">${desc}</p></div>`;
      }).join('\n');

      return `<div class="feature-grid">${cardHtml}</div>`;
    }
  );

  // 2. Single bold-lead paragraphs become callout boxes
  html = html.replace(
    /<p><strong>([^<]+)<\/strong>\s*([\s\S]*?)<\/p>/g,
    (match, title, desc) => {
      // Skip if already inside a feature-grid (already transformed)
      if (!desc.trim()) return match;
      const cleanTitle = title.replace(/\.$/, '');
      return `<div class="callout-box"><strong class="callout-title">${cleanTitle}</strong><p class="callout-desc">${desc.trim()}</p></div>`;
    }
  );

  // 3. Transform <ul> lists with 4+ items into visual list grids
  html = html.replace(
    /<ul>\s*((?:<li>[\s\S]*?<\/li>\s*){4,})<\/ul>/g,
    (match, items) => {
      return `<ul class="visual-list">${items}</ul>`;
    }
  );

  return html;
}

/**
 * Split markdown content at H2 boundaries into sections.
 * Returns an array of { heading, html } objects.
 * Each section's HTML is transformed with visual modules.
 */
export function splitMarkdownSections(md: string): { heading: string; html: string }[] {
  const parts = md.split(/^(?=## )/m);

  return parts.map(part => {
    const trimmed = part.trim();
    if (!trimmed) return null;

    const headingMatch = trimmed.match(/^## (.+)/m);
    const heading = headingMatch ? headingMatch[1].trim() : '';

    let html = marked.parse(trimmed, { async: false }) as string;
    html = transformToModules(html);

    return { heading, html };
  }).filter(Boolean) as { heading: string; html: string }[];
}
