---
name: seo-technical
description: Make pages crawlable and indexable for Google and AI search bots, and prove it with inspect.mjs and Search Console.
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

Each URL prints one JSON line: redirect chain, robots header and meta, canonical, title, description, H1 count, start of body text, `<a href>` count, the robots.txt rule that applies, and `issues`. Each origin adds a line with the status a missing page returns, the sitemaps robots.txt lists, and what each AI search bot gets for the home page (`aiSearchBots`). An empty `bodyStart` means the content depends on JavaScript.

## Snapshot every deploy

Four changes kill a site silently: a page turns noindex, a canonical points elsewhere, a 200 becomes a 404, robots.txt blocks everything. Before any change or deploy, save the key pages' output; after it, rerun on the production origin and diff, then show the user the result:

```bash
node <this skill's dir>/scripts/inspect.mjs <key urls> > before.jsonl   # and again after, into after.jsonl
diff <(jq -Sc '{url, chain, xRobotsTag, metaRobots, canonical, robotsTxt, aiSearchBots}' before.jsonl) \
     <(jq -Sc '{url, chain, xRobotsTag, metaRobots, canonical, robotsTxt, aiSearchBots}' after.jsonl)
```

Any of the four in the diff means roll back first and investigate second.

## Discovery and indexing

- Block only pages meant to stay out, such as admin and login. A robots.txt block stops crawling, not indexing, and hides any `noindex` from the crawler; private content needs access control. Check the CDN's bot protection too ([AI crawlers](#ai-crawlers)).
- The www and bare hosts redirect to one canonical host in a single hop.
- When content or links exist only after JavaScript runs, fix it with the framework's existing static generation, prerendering, or SSR. Link pages with `<a href>`.
- Sitemaps list only canonical, indexable, 200 URLs on the right origin, with truthful modification dates, and robots.txt names the sitemap. Sitemap generation can stop silently, so after each publish confirm the new URL appears in `--sitemap` output.
- Canonicals, internal links, sitemap entries, and redirects agree. Each page's canonical points at itself unless it duplicates another. Keep meaningful locale and pagination distinctions, and inspect query parameters and faceted navigation before any blanket canonical or crawl rule.
- Missing pages return 404 or 410. Redirect a retired URL only to an equivalent page, in one hop; collapse existing chains.
- Fix broken internal links, and link orphan pages from relevant pages and the navigation.

## AI crawlers

Training crawlers and search crawlers are separate, and each robots.txt setting is independent. Blocking a search crawler removes the site from that assistant's answers; blocking a training crawler only opts out of training. Keep the site's existing training policy.

| Vendor | Training | Search and user-requested fetches |
| --- | --- | --- |
| OpenAI | GPTBot | OAI-SearchBot (ChatGPT search), ChatGPT-User |
| Anthropic | ClaudeBot | Claude-SearchBot, Claude-User |
| Perplexity | (none) | PerplexityBot, Perplexity-User |
| Google | Google-Extended: a robots.txt token only, no user agent; controls Gemini training and grounding, never Google Search | Googlebot |
| Microsoft | (none listed) | Bingbot, which feeds Copilot |

- Read the live robots.txt (inspect.mjs fetches it), never the repo copy: a CDN can prepend its own rules. OpenAI applies a robots.txt change to ChatGPT search in about 24 hours.
- `aiSearchBots` reports the robots.txt verdict and the status each search bot gets for the home page. The status probe only spoofs the user agent, so a firewall that verifies bot IPs may refuse it while admitting the real crawler; the firewall's event log tells them apart.
- On Cloudflare, check three settings with the user. AI Crawler and Agent access policies (Security → Settings → Bot traffic) set Search, Agent, and Training separately; Search on Block shuts out AI search crawlers, and Training actions also hit crawlers used for both search and training. Managed robots.txt prepends Disallow rules for training crawlers to the origin's file. Bot Fight Mode challenges automated traffic, ignores WAF skip rules, and labels what it challenged in Security → Analytics → Events, so check those events after launch.

## Bing Webmaster Tools

Bing's index feeds Copilot, and Bing reports AI citations, which Google does not. The user sets it up in about ten minutes: My Sites → Import from Google Search Console (verifies the site and brings its sitemaps), confirm the sitemap, and turn on IndexNow, which tells Bing and other participating engines (not Google) when a URL changes. Most CMSs ship IndexNow or a plugin; on Cloudflare it is Crawler Hints. The AI Performance report it unlocks belongs to [seo-ai-search](../seo-ai-search/SKILL.md#2-measure).

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
- AI crawlers: [OpenAI](https://developers.openai.com/api/docs/bots), [Anthropic](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler), [Perplexity](https://docs.perplexity.ai/guides/bots), [Google-Extended](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers)
- Cloudflare: [AI crawler policies](https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/), [managed robots.txt](https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/), [Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/)
- [IndexNow](https://www.bing.com/indexnow/getstarted)
