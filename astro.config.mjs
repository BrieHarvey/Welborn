// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// ---------------------------------------------------------------------------
// SITE URL
// ---------------------------------------------------------------------------
// Change this one line if the practice moves to a different domain. It is used
// to build canonical URLs, Open Graph tags, the sitemap and robots.txt.
// ---------------------------------------------------------------------------
const SITE_URL = 'https://welbornorthopedics.com';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  build: {
    format: 'file',
    inlineStylesheets: 'auto',
  },
  integrations: [
    sitemap({
      changefreq: 'monthly',
      lastmod: new Date(),
    }),
  ],
  compressHTML: true,
  devToolbar: { enabled: false },
});
