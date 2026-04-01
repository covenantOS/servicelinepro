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
 * Split markdown content at H2 boundaries into sections.
 * Returns an array of { heading, html } objects.
 * The first section may have no heading (intro content before first H2).
 * This allows page templates to inject CRO modules between content sections.
 */
export function splitMarkdownSections(md: string): { heading: string; html: string }[] {
  // Split the raw markdown at ## headings
  const parts = md.split(/^(?=## )/m);

  return parts.map(part => {
    const trimmed = part.trim();
    if (!trimmed) return null;

    // Extract heading text if this section starts with ##
    const headingMatch = trimmed.match(/^## (.+)/m);
    const heading = headingMatch ? headingMatch[1].trim() : '';

    const html = marked.parse(trimmed, { async: false }) as string;
    return { heading, html };
  }).filter(Boolean) as { heading: string; html: string }[];
}
