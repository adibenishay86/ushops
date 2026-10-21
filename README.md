# Ushops public form + read-only results

## Deployment
Deploy command:
`npx wrangler deploy`

## Configuration included in wrangler.jsonc
- KV binding `SUBMISSIONS` -> namespace ID `c3b491a11f8341448b4e9ebbed9213d7`
- `ADMIN_USER` = `viewer`
- `ADMIN_PASSWORD` is declared as a required secret, but its value is NOT stored in Git.

The existing `ADMIN_PASSWORD` secret must remain configured on the Cloudflare Worker.

## URLs
- `/` public form
- `/api/health` health check
- `/admin` read-only results (HTTP Basic Auth)
- `/api/admin/submissions` protected read-only results API

## Repository layout
This ZIP is intentionally flat. Extract its contents directly into the GitHub repository root.
