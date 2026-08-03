# Maaz portfolio chat Worker

This Worker keeps the Gemini credential off the public GitHub Pages site and limits the assistant to verified portfolio facts.

## Deployment checklist

1. Sign in to Cloudflare with Wrangler.
2. Deploy the Worker.
3. Add `GEMINI_API_KEY` as an encrypted Worker secret in Cloudflare.
4. Copy the resulting `workers.dev` URL into the `data-api-url` attribute in `index.html`.
5. Test an in-scope question, an unrelated question, and the rate limit before publishing the widget.

The API key must never be placed in `index.html`, `script.js`, `wrangler.jsonc`, or any committed file.
