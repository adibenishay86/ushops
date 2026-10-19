# Ushops public form - Cloudflare Worker

## Before deploy
Create a Cloudflare Workers KV namespace for submissions, copy its namespace ID, then replace:

REPLACE_WITH_YOUR_KV_NAMESPACE_ID

in `wrangler.jsonc`.

The Worker expects the KV binding name to be exactly `SUBMISSIONS`.

## Deploy from a Git repository
Commit the whole project, including `wrangler.jsonc`, `src/` and `public/`, then connect/deploy the repository as a Cloudflare Worker project.

## Deploy using Wrangler CLI
Run:

npm install
npm run deploy

## Verify
Open `/api/health` on the deployed Worker. It should return JSON with `ok: true`.
Then load the root URL and submit the form.

## Storage
Each successful submission is saved in KV as one JSON value. Its key is a generated UUID.

## Important before broad public distribution
Add bot/spam protection such as Cloudflare Turnstile. This package intentionally does not contain a site key or secret because those values must come from your Cloudflare account.
