# Technical SEO

Inspect representative page templates, important landing pages, and known problem URLs. Compare source configuration, HTTP responses, and rendered output where available. A repository-only review cannot establish deployed behavior.

Start from the raw responses Googlebot fetches:

```bash
node <this skill's dir>/scripts/inspect.mjs https://example.com/ https://example.com/pricing
node <this skill's dir>/scripts/inspect.mjs --sitemap https://example.com/sitemap.xml | jq -c 'select(.issues | length > 0)'
```

Each URL prints one JSON line: redirect chain, `X-Robots-Tag`, meta robots, canonical, title, description, H1 count, the robots.txt rule that applies, and `issues`. Sitemap mode streams every listed URL, including nested sitemaps. The script reads unrendered HTML, so check client-rendered content in a browser.

## Discovery and indexing

- Check status codes, redirects, robots.txt, robots meta tags, `X-Robots-Tag`, canonical URLs, and CDN or authentication blocks. Check the actual production origin before diagnosing a production problem from preview behavior.
- Remove accidental indexing restrictions only on intended public pages. A robots.txt block prevents crawling, not necessarily indexing. Crawlers must fetch a page to see its `noindex`; private content needs access control.
- Check whether important text and crawlable `<a href>` links appear in fetched and rendered HTML. When rendering causes a demonstrated problem, fix it with the framework's existing static generation, prerendering, or SSR.
- Keep sitemap URLs canonical, indexable, successful, and on the intended origin. Exclude redirects, errors, and private pages. Use truthful modification dates. Submission aids discovery but does not guarantee indexing. Submit through Search Console only when authorized; otherwise provide the sitemap URL and exact remaining action.
- Align canonical tags, internal links, sitemap entries, and redirects. Use absolute preferred URLs and preserve meaningful locale or pagination distinctions. Canonical tags are signals, not guaranteed directives.

Repair broken internal links and unintended orphan pages with relevant contextual links. Collapse redirect chains to their intended destination. Redirect retired URLs only to equivalent replacements; keep genuinely removed content at 404 or 410. Inspect query parameters and faceted navigation before applying blanket canonical or crawl rules.

Use Search Console URL Inspection when available to compare the declared and Google-selected canonical, indexing state, and rendered content. Distinguish live eligibility checks from Google's stored index state.

## Page meaning and previews

- Give indexable pages specific titles and descriptions matching their content and search intent. Google can rewrite both. Avoid rigid character quotas and duplicate template boilerplate.
- Use a clear main heading and a meaningful hierarchy for readers. Multiple H1s are valid and need no SEO fix.
- Use breadcrumb navigation where it explains the site's hierarchy. Add structured data only for facts and content the page actually contains.
- Select supported schema types for the actual page, such as Article for editorial content or Product for a real product. Check current eligibility and validate supported types with Google's Rich Results Test. Valid markup does not guarantee a rich result.
- Provide descriptive alt text for informative images and empty alt text for decorative images. Check social preview metadata when sharing is in scope; social cards are not a substitute for search metadata.

Google retired FAQ rich results in May 2026, so FAQPage markup earns nothing in Google Search. Keep visible FAQs that answer readers' questions. Check the [search changelog](https://developers.google.com/search/updates) before relying on any rich result feature.

## Performance

Measure before editing. Field Core Web Vitals targets at the 75th percentile are LCP ≤ 2.5 s, INP ≤ 200 ms, and CLS ≤ 0.1. Report device segmentation, observation period, and whether data is page-level or origin-level. Lab measurements diagnose problems; they do not prove a field pass.

Fix the measured cause: oversized images, render-blocking resources, unnecessary JavaScript, long tasks, or unstable layout. Choose image format, quality, and responsive sizes for the actual image. Reserve image dimensions and load the LCP image eagerly.

After implementation, verify the affected routes and templates, generated sitemap, relevant headers, redirects, and metadata. Run the project's appropriate checks. Report local validation separately from deployed validation and later search-engine observations.

## Primary references

- [SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Blocking indexing with noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
- [Canonicalization](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Structured data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Core Web Vitals](https://web.dev/articles/vitals)
