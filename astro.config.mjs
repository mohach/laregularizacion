import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://laregularizacion.com',
  outDir: 'docs',
  integrations: [tailwind()],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'ar', 'ur'],
    routing: { prefixDefaultLocale: false },
  },
});
