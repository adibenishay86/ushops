# Public contact form - Cloudflare Pages

Static frontend plus a Pages Function. Submissions are stored as JSON in a Cloudflare KV binding named `SUBMISSIONS`.

## Deploy
1. Create a GitHub repository and put these files at its root.
2. In Cloudflare Pages, create a project connected to that repository.
3. This project has no framework/build step; the site files are already deployable.
4. Create a Workers KV namespace for submissions.
5. In the Pages project settings, add the KV binding with variable name `SUBMISSIONS` and select that namespace.
6. Deploy the project.

## Important before public use
- Test a submission and verify a new JSON entry appears in the KV namespace.
- Add an anti-spam control before distributing the URL widely. Cloudflare Turnstile has a free plan; integrating it requires a site key and secret generated in your Cloudflare account.
- Do not collect more personal information than you need. Add your own privacy/contact wording appropriate to your use case.

## Fields
- Full name in Hebrew and English
- BShops package/tracking numbers
- Payment date
- Value of stuck goods
- Shipping paid
- Short description of contents
