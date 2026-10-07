# nqlite.com — website for [nqlite](https://github.com/devstroop/nqlite)

React 19 + Vite 8 + TypeScript, deployed to **Cloudflare Workers** (static
assets + a thin edge worker). All UI comes from
[`@devstroop/react-uikit`](https://github.com/devstroop/react-uikit), vendored
as a git submodule on its `develop` branch — the page composes components and
tokens only; bespoke CSS is off-limits (house rule).

## Commands

```sh
npm install
npm run dev          # http://localhost:5173
npm run build        # typecheck (tsc -b) + vite build → dist/
npm run typecheck
npm run lint         # oxlint
npm run format       # prettier --write .
npm run cf-typegen   # regenerate worker-configuration types from wrangler.jsonc
npm run deploy:dry   # build + wrangler deploy --dry-run (no upload)
npm run deploy       # build + wrangler deploy (needs `wrangler login`)
```

## Layout

```
index.html            meta/branding for nqlite.com
src/main.tsx          mounts App; imports uikit style.css (tokens) first
src/App.tsx           landing composition — uikit components only
src/index.css         page-CSS minimum (code font); everything else is uikit
src/worker.ts         Cloudflare worker: serves dist/ via Workers assets
vendor/react-uikit    submodule (pinned develop commit)
wrangler.jsonc        worker + assets config (SPA fallback, observability)
```

## Worker edge

`wrangler.jsonc` serves `./dist` through Workers assets with
`not_found_handling: single-page-application`; `src/worker.ts` is a thin
`env.ASSETS.fetch` pass-through. Same-origin API or docs proxies get added
there when a backend appears (reference: `1km-foundation/web`).

## Submodule

```sh
git submodule update --init   # after clone — uikit source lands in vendor/
```

When the uikit stabilizes, replace the `vendor/` submodule + the
`vite.config.ts` / `tsconfig.app.json` aliases with a tagged registry
dependency (the aliases are written to make that a deletion).
