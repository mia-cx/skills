---
name: seo-technical
description: Make pages crawlable and indexable, and prove it with inspect.mjs and Search Console.
disable-model-invocation: true
---

# Technical SEO

Part of [seo](../seo/SKILL.md): its evidence method and boundaries apply here.

Make sure Google can fetch, render and index the pages that matter, then prove it from Google's side. Most of this is a mechanical checklist the agent can apply; an agent reporting "done" is not Google seeing the page. Writing quality lives in [seo-content](../seo-content/SKILL.md) and earned links in [seo-links](../seo-links/SKILL.md).

## Inspect raw responses

Start from the raw responses Googlebot fetches, on the production origin:

```bash
node <this skill's dir>/scripts/inspect.mjs https://example.com/ https://example.com/pricing
node <this skill's dir>/scripts/inspect.mjs --sitemap https://example.com/sitemap.xml | jq -c 'select(.issues | length > 0)'
```

Each URL prints one JSON line: redirect chain, robots header and meta, canonical, title, description, H1 count, start of body text, `<a href>` count, the robots.txt rule that applies, and `issues`. Each origin adds a line with the status a missing page returns and the sitemaps robots.txt lists. An empty `bodyStart` means the content depends on JavaScript.

Save the output for the main pages before changing anything, rerun it after, and show the user the before and after.

## Discovery and indexing

- Block only pages meant to stay out, such as admin and login. A robots.txt block stops crawling, not indexing, and hides any `noindex` from the crawler; private content needs access control. Check the CDN's bot protection too, since it can block search and AI crawlers that robots.txt allows.
- When content or links exist only after JavaScript runs, fix it with the framework's existing static generation, prerendering, or SSR. Link pages with `<a href>`.
- Sitemaps list only canonical, indexable, 200 URLs on the right origin, with truthful modification dates, and robots.txt names the sitemap. Sitemap generation can stop silently, so after each publish confirm the new URL appears in `--sitemap` output.
- Canonicals, internal links, sitemap entries, and redirects agree. Each page's canonical points at itself unless it duplicates another. Keep meaningful locale and pagination distinctions, and inspect query parameters and faceted navigation before any blanket canonical or crawl rule.
- Missing pages return 404 or 410. Redirect a retired URL only to an equivalent page, in one hop; collapse existing chains.
- Fix broken internal links, and link orphan pages from relevant pages and the navigation.

## Verify from Google's side

With Search Console access, run URL Inspection on the money pages first (home, pricing, main product page): stored index state, declared versus Google-selected canonical, and whether the rendered HTML shows the answer rather than an empty shell. Without access, hand the user that list of checks, plus submitting the sitemap under Sitemaps, which needs their account.

## Page meaning

- Titles and descriptions are specific to each page and match its intent. Google truncates titles to the device width and may rewrite either, so skip character quotas and put the distinguishing words first.
- Keep the title and H1 saying the same thing, because Google draws rewritten titles from on-page headings and other prominent text.
- Headings form a clear hierarchy for readers. Multiple H1s are valid.
- Structured data describes only what the page shows, uses a supported type, and passes the Rich Results Test. Valid markup earns no guaranteed rich result. On a site with a real hierarchy, show breadcrumbs and mark them up with `BreadcrumbList`.
- Google retired FAQ rich results in May 2026, so FAQPage markup earns nothing in Google Search. Check the [search changelog](https://developers.google.com/search/updates) before relying on any rich result.
- Informative images get descriptive alt text; decorative ones get `alt=""`.

## Performance

Field Core Web Vitals pass at the 75th percentile with LCP ≤ 2.5 s, INP ≤ 200 ms, and CLS ≤ 0.1. Lab tools diagnose; only field data proves a pass. Measure first, then fix the measured cause: oversized images, render-blocking resources, excess JavaScript, long tasks, layout shift. Serve images at display size in WebP or AVIF, reserve their dimensions, load the LCP image eagerly, and fix anything broken on mobile.

## Primary references

- [SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Blocking indexing with noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
- [Canonicalization](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Title links](https://developers.google.com/search/docs/appearance/title-link)
- [Structured data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Core Web Vitals](https://web.dev/articles/vitals)
