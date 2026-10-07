import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

// Site for nqlite.com. Prod serves dist/ from Cloudflare Workers assets
// (wrangler.jsonc); base './' keeps asset URLs relative so the SPA also
// works under a sub-path or a workers.dev route.
//
// @devstroop/react-uikit resolves to the vendor submodule (pinned commit
// on its develop branch) so the site iterates against library source
// until the uikit stabilizes; then this alias goes away in favor of the
// tag dep. Array form, most-specific first: the root entry would
// otherwise hijack the CSS subpath. style.css maps to tokens.css —
// utilities arrive via main.ts, and Vite dedupes the shared module.
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@devstroop/react-uikit/style.css',
        replacement: path.resolve(
          rootDir,
          'vendor/react-uikit/lib/styles/tokens.css'
        ),
      },
      // Upstream names a utility module `markdown.ts` next to the
      // `Markdown.tsx` component; extension-probing resolvers can
      // land on the wrong sibling and fail the `Markdown` export.
      {
        find: /\.\/components\/Markdown\/Markdown$/,
        replacement: path.resolve(
          rootDir,
          'vendor/react-uikit/lib/components/Markdown/Markdown.tsx'
        ),
      },
      {
        find: '@devstroop/react-uikit',
        replacement: path.resolve(rootDir, 'vendor/react-uikit/lib/main.ts'),
      },
    ],
  },
  server: {
    port: 5173,
  },
});
