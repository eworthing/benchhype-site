// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  // TODO: Update site and base when deploying to a custom domain
  // For custom domain: site: 'https://benchhype.com', base: '/'
  site: 'https://eworthing.github.io',
  base: '/benchhype-site',
});
