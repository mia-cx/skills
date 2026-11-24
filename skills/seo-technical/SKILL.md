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
- When content or links exist only after JavaScript runs, fix it with the framework's existing static generation, prerendering, or SSR, because Google recommends server-side or pre-rendering and not every bot runs JavaScript. Link pages with `<a href>`, the only links Google reliably parses.
- Sitemaps list only canonical, indexable, 200 URLs on the right origin, with `lastmod` dates that change only on significant updates (Google ignores dates it finds inaccurate), and robots.txt names the sitemap. Sitemap generation can stop unnoticed, so after each publish confirm the new URL appears in `--sitemap` output.
- Canonicals, internal links, sitemap entries, and redirects agree. Each page's canonical points at itself unless it duplicates another. Keep meaningful locale and pagination distinctions, and inspect query parameters and faceted navigation before any blanket canonical or crawl rule.
- Missing pages return 404 or 410. Redirect a retired URL only to an equivalent page, in one hop; collapse existing chains.
- Fix broken internal links, and link every page that matters from at least one other page and, where it fits, the navigation.

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
- ChatGPT-User and Perplexity-User fetch on a user's request and may ignore robots.txt, so a robots.txt rule cannot keep them out; access control can.
- `aiSearchBots` reports the robots.txt verdict and the status each search bot gets for the home page. The status probe only spoofs the user agent, so a firewall that verifies bot IPs may refuse it while admitting the real crawler; the firewall's event log tells them apart.
- On Cloudflare, check three settings with the user. AI Crawler and Agent access policies (Security → Settings, filter Bot traffic) set Search, Agent, and Training separately; Search on Block shuts out AI search crawlers, Search on Block on pages with ads shuts them out of every page where Cloudflare detects ads, and Training actions also hit crawlers used for both search and training. With Bot Preference Sync on and any of those policies on Block or Block on pages with ads (or Training on Disallow), Cloudflare prepends matching rules to the origin's robots.txt. Training on Disallow with Bot Preference Sync also blocks training-only crawlers at the edge but exempts crawlers used for both search and training, so when a mixed crawler is refused, the cause lies elsewhere (Training on Block, for one) and relaxing Disallow won't admit it. Bot Fight Mode challenges automated traffic, ignores WAF skip rules, and labels what it challenged in Security → Analytics → Events, so check those events after launch.

## Bing Webmaster Tools

Bing's index feeds Copilot, and Bing counts how often AI answers cite each page. Google counts impressions instead: Search Console's Generative AI performance report shows how often the site's links appeared in AI Overviews and AI Mode, by page, country, and device, and the same impressions stay in the Performance report's "Web" totals. The user sets it up: My Sites → Import from Google Search Console (verifies the site and brings its sitemaps), confirm the sitemap, and turn on IndexNow, which tells Bing and other participating engines (not Google) when a URL changes. Most CMSs ship IndexNow or a plugin; on Cloudflare it is Crawler Hints. The AI Performance report it unlocks belongs to [seo-ai-search](../seo-ai-search/SKILL.md#2-measure).

## Verify from Google's side

Check the money pages first (home, pricing, main product page). The Search Console connector's URL inspection returns stored index state, last crawl date, and declared versus Google-selected canonical. Two steps need URL Inspection in the Search Console UI, so hand them to the user: whether the rendered HTML shows the answer rather than an empty shell, and Request indexing once per changed page, which only an owner or full user can do. Google says repeat requests don't speed crawling, which takes a few days to a few weeks. Without any access, hand the user the whole list, plus submitting the sitemap under Sitemaps, which needs their account.

## Page meaning

- Titles and descriptions are specific to each page and match its intent. Google truncates titles to the device width and may rewrite either, so skip character quotas and put the distinguishing words first.
- Keep the title and H1 saying the same thing, because Google draws rewritten titles from on-page headings and other prominent text.
- Headings form a clear hierarchy for readers. Multiple H1s are valid: Google says heading count and order don't matter for Search.
- Structured data describes only what the page shows, uses a supported type, and passes the Rich Results Test. Valid markup earns no guaranteed rich result. On a site with a real hierarchy, show breadcrumbs and mark them up with `BreadcrumbList`.
- Google stopped showing FAQ rich results on 7 May 2026, so FAQPage markup earns nothing in Google Search. Check the [search changelog](https://developers.google.com/search/updates) before relying on any rich result.
- Informative images get descriptive alt text; decorative ones get `alt=""`.

## Performance

Field Core Web Vitals pass at the 75th percentile with LCP ≤ 2.5 s, INP ≤ 200 ms, and CLS ≤ 0.1. Lab tools diagnose; only field data proves a pass. Google uses Core Web Vitals in ranking but still ranks the most relevant page above a faster one, so fix speed after crawling, indexing and content. Measure first, then fix the measured cause: oversized images, render-blocking resources, excess JavaScript, long tasks, layout shift. Serve images at display size in WebP or AVIF, reserve their dimensions, never lazy-load the LCP image, and fix anything broken on mobile.

## Sources

- [Google Search Central: SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google Search Central: Block indexing with noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
- [Google Search Central: JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google Search Central: SEO link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
- [Google Search Central: Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google Search Central: Consolidate duplicate URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google Search Central: Ask Google to recrawl your URLs](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
- [Google Search Central: Influencing your title links](https://developers.google.com/search/docs/appearance/title-link)
- [Google Search Central: Structured data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Google Search Central: Latest documentation updates](https://developers.google.com/search/updates)
- [Google Search Central: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google Search Central: Understanding page experience](https://developers.google.com/search/docs/appearance/page-experience)
- [Google: Google's common crawlers (Google-Extended)](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers)
- [W3C WAI: Decorative images](https://www.w3.org/WAI/tutorials/images/decorative/)
- [web.dev: Web Vitals](https://web.dev/articles/vitals)
- [web.dev: Optimize Largest Contentful Paint](https://web.dev/articles/optimize-lcp)
- [OpenAI: Overview of OpenAI crawlers](https://developers.openai.com/api/docs/bots)
- [Anthropic: Does Anthropic crawl data from the web?](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- [Perplexity: Perplexity crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)
- [Cloudflare: AI Crawler and Agent access policies](https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/)
- [Cloudflare: Managed robots.txt](https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/)
- [Cloudflare: Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/)
- [Cloudflare: Crawler Hints](https://developers.cloudflare.com/cache/advanced-configuration/crawler-hints/)
- [IndexNow: FAQ](https://www.indexnow.org/faq)
- [Search Console Help: Generative AI performance report](https://support.google.com/webmasters/answer/16984139)
- [Bing Webmaster Blog: Introducing AI Performance in Bing Webmaster Tools (2026)](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/)
