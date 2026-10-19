# Ushops Worker

The ZIP is intentionally flat: extract its CONTENTS directly into the Git repository root.

Expected repository root:
- wrangler.jsonc
- package.json
- src/index.js
- public/index.html
- public/app.js
- public/style.css

Deployment command: `npx wrangler deploy`

After deployment, `/api/health` should return `{ "ok": true }`.

## Required storage binding
The code stores submissions in a Workers KV binding named `SUBMISSIONS`.
Configure a KV binding named exactly `SUBMISSIONS` for this Worker in Cloudflare before testing form submission. The KV namespace ID is intentionally not hard-coded in this repository.
