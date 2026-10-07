/** Minimal runtime shape (avoids the workers-types pin). */
interface Fetcher {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}

interface Env {
  ASSETS: Fetcher;
}

// Thin edge: static dist/ from Workers assets (SPA fallback comes from
// wrangler.jsonc's not_found_handling). Same-origin API/docs proxies get
// added here when a backend appears — pattern: 1km-foundation/web.
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return env.ASSETS.fetch(request);
  },
};
