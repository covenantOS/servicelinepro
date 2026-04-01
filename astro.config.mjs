import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import YAML from 'yaml';

const siteConfig = YAML.parse(fs.readFileSync('./site.config.yaml', 'utf8'));

// When using custom domain (servicelinepro.com), remove the base line below
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  site: isGitHubPages ? 'https://covenantos.github.io' : `https://${siteConfig.seo.domain}`,
  base: isGitHubPages ? '/servicelinepro/' : '/',
  output: 'static',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  integrations: [
    sitemap(),
  ],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
