---
name: seo-content
description: Choose keywords and pages, improve pages that already rank, and test titles from Search Console data.
disable-model-invocation: true
---

# Search content

Part of [seo](../seo/SKILL.md): its evidence method and boundaries apply here.

Choose, write, and improve the pages that bring buyers from Google, steered by Search Console data. AI answers live in [seo-ai-search](../seo-ai-search/SKILL.md); local businesses in [seo-local](../seo-local/SKILL.md).

## What earns the ranking

- **Satisfied clicks.** Google uses aggregated interaction data to judge relevance, and NavBoost, one of its core ranking signals, memorises which results people click for a query (*United States v. Google*, 2024 opinion). The weights are unpublished, so promise nothing about bounces; write titles and openings the page delivers on.
- **Visible trust.** Google's raters weigh trust most and look for firsthand experience, so give the page a real byline linked to the author's experience, firsthand tests, and a factual About page, and keep company facts identical everywhere. Ask the user for the author's story; the founder's own beats generic copy.
- **Information gain.** Google asks whether a page adds "substantial value when compared to other pages in search results". Win with what the top results lack: tests, original data, screenshots, a new angle. Research the gap yourself (top results, YouTube transcripts, forum threads, review complaints), then get firsthand material by interviewing the user, analysing their records, or running the task in competing products. Mark every fact you could not verify `[CHECK]` and clear every mark before publishing.

```
Here's my article: [paste]
Tell me where a screenshot, image, table or diagram would help the reader more than text, and exactly what to show.
Then tell me what the top 5 results for "[keyword]" all say the same way, and suggest 3 unique angles from my own experience.
```

Bugs the team fixed and customer questions make candidate pages; one marketer finds young categories often have volume and no good answer. Check a competitor's offline edge (years of sponsorships and press links) before promising to out-write them.

## Choose keywords

1. Collect the buyer's words: sales calls, support questions, product facts, Search Console queries with buying modifiers ("pricing", "vs", "alternative", "for [role]"), and autocomplete.
2. Rank by intent to buy, because the job is conversions and 50 buyers comparing plans outweigh 1,000 browsers. Google's raters judge each result by how well it meets the query's intent (Know, Do, Website, Visit-in-person). In a crowded space, narrow to buyer plus use case ("crm for dentists").
3. Filter each query (one practitioner's checks). Intent: blog posts and a definition box rank, defer; product or category pages with prices rank, target. Size: top 10 all big brands, mark "later". Already yours: in Search Console, filter Performance to the exact query and open Pages; if a page shows, improve it rather than writing a second page for the same query.
4. A new or low-authority site starts with queries nobody targets: keyword difficulty near 0 and listed volume 0–50 (practitioner advice; there is no one to beat).
5. Take volumes from a real tool (LowFruits, KWFinder, AnswerThePublic, Keywords Everywhere). Without one, label queries as hypotheses and state no volume. Google Trends shows relative interest from a sample, never volume.

Done when every query is grouped with those needing the same answer and mapped to an existing page or a proposed URL, in the format the current results share (landing page, listicle, how-to, comparison, tool). Each proposal records audience, intent, URL, the evidence it adds, internal links, and next action. Plan a first batch of 10–15 pages, published at the pace in [Pace a new domain](#pace-a-new-domain) when the domain is new.

## Build the pages buyers check before paying

Pricing (real prices, plan limits, discount and trial terms beside signup), a comparison with each rival on the same criteria, "alternative to X" pages, "best X for [buyer]" lists, migration guides, and feature or integration demos answering stalling objections. Each carries a trial or demo button. "Best X" lists also matter for AI answers: in one vendor's data on 100+ brands, the ranked best-of list was the most-cited content format, at about 21% of citations (Kumar 2026).

Rules for decision pages (thresholds from published SEO skills; rules of thumb, not tested):

- Build the page type that 6 or more of the top 10 results share. If all ten are blog posts and the user sells a product, skip the query. Two queries share a page when 4 or more of their top 10 match.
- Answer in the first 40–80 words and name the product, because Google ranks individual passages and AI answers quote passages, not whole pages.
- A "best of" list has 5–8 options. Every price comes from the vendor's own page with a "checked on" date, every option including the user's gets one real drawback, and the user's product is not ranked first.
- Add one thing the top 10 lack (the user's own number, test, or screenshot) and show the method.

Grow topics from a product page: one broad guide to its buyer questions, detail pages linked both ways, existing answers reused, then the buyer's next problem.

Programmatic pages each need distinct value and verified facts, stored per row in the spreadsheet the template reads. Merge rows needing the same answer, review a small batch before expanding, and watch Search Console for 60 days to fix pages Google drops (one practitioner's window). Google's spam policies name scaled content abuse (many pages made mainly to rank, however produced) and doorway abuse (near-identical pages per city or region funnelling to one destination), so a row without its own facts gets no page.

## Pace a new domain

Google's spam policies judge pages by purpose and value, not publishing rate, yet practitioners agree a new domain with no brand searches or links should start slow: 1–4 pages a week (they disagree on the number, not the direction). Google says changes can take from a few hours to several months to show, so wait at least a few weeks before judging a page and 2–3 months before judging the programme. Its order: week 0 the [seo-technical](../seo-technical/SKILL.md) checks, Bing, and a first run of the buyer questions; at launch Search Console, sitemap, and directories; from month 1 one decision page a week with a demo video each; from month 3 the Search Console loops below (refreshes, title tests, pruning), which need data a new site lacks.

## Grade drafts before publishing

Score every draft against a written rubric before it ships. One published skill scores 8 areas out of 5 and passes at 32 of 40 with no area under 3; agree the areas with the user (answer up front, information gain, accuracy, trust signals, internal links, and so on). A draft that fails goes back with the failing areas named.

## Improve pages that already rank

A page at positions 10–30 already has a measured starting point: Google shows it for real queries, so adding what it misses is the closest win (practitioner view). Pull its queries for the last 3 months (Search Console connector or the Queries tab export). The table omits anonymised queries and stops at 1,000 rows, so a missing query is not proof the page never showed for it.

- A query with impressions the page never answers: add the sentence, paragraph, or section that does.
- A query at positions 10–30: give it its own H2 or paragraph.

Work one page at a time, rewrite only the sections that change, and have the user request indexing once in URL Inspection ([seo-technical](../seo-technical/SKILL.md#verify-from-googles-side)). A crawl after the edit, shown in URL Inspection, is the checkpoint, not the result: crawling takes a few days to a few weeks, and a crawl doesn't guarantee the update reaches search results. Judge the edit on queries from after that crawl, over a window as long as the one before it, leaving out the last 3 days, because Performance data usually takes 2–3 days to appear. A lighter weekly variant (one practitioner's): last 28 days, queries at position 5–15, grouped by page; improve the 3 pages with most impressions, skipping pages Google hasn't recrawled since their last edit. Judge the programme at 3 months.

Refresh stale prices, screenshots, steps, and limits; compare traffic loss with the same season last year. Merge pages only when they serve the same intent, with redirects and updated internal links.

On every page, answer the main question in the first two paragraphs, because web readers skim and may stop at any point (Nielsen Norman Group, inverted pyramid). Put the main keyword in the title and first paragraph, and in the meta description as click copy: Google builds most snippets from the page and uses the description only when it fits the search better. Link every page that matters from at least one other page; one practitioner adds 3–5 internal links per article where a reader would click (to product pages, to orphans, from established pages to pages near page one), each beside the question it answers with a descriptive anchor.

Log each edit with date and URL, open the live URL to confirm it shipped, and track sales by landing page with UTM-tagged links. To run this loop on a schedule, use [marketing-agents](../marketing-agents/SKILL.md).

## Test titles

A title change reports back once Google recrawls and reprocesses the page (a few days to a few weeks) and shows the new title link; a new article takes months. Target pages at positions 3–10 with a few hundred impressions and CTR 40% or more below the site's own norm for that position, as a screen rather than a verdict. Compare by query and device, not by page: a page's average position blends every impression across its queries and devices, so half its impressions at 1 and half at 9 read as 5. Build the norm from the site's own query rows at each position, because published curves disagree (Advanced Web Ranking's July 2026 US desktop data puts position 3 at 3.89%; one practitioner's norm is 9%) and swing with AI Overviews and other results-page features. A page can win its main keyword yet get skipped on queries whose words the title lacks.

1. Search the query in a private window, since Google rewrites titles that are stuffed, boilerplate, half-empty, obsolete, or inaccurate. Note query words the results above use and this title lacks.
2. Draft at least three candidates: query words first, a specific promise ("7 ways to get more leads"), a reason to click now, nothing the page fails to deliver. Use a year only when the page is current for that year: one SearchPilot split test found month and year in titles lifted organic sessions about 5% on a listings site, but Google rewrites obsolete titles and flags dates changed without real updates.
3. Record date, clicks, and CTR, change one variable on one page, and have the user request indexing in URL Inspection.
4. Start the comparison once the new title link shows for the target query in a private window; if Google keeps showing a different title, mark the test inconclusive. Compare equal windows at a similar average position: 2 weeks for busy pages, a month for quiet ones. Judge on clicks, because a new title often adds long-tail impressions that lower CTR while clicks rise. For many similar pages, change the pattern on half and keep or revert, since only a comparison group rules out season and Google updates.

To test angles first, propose three search ads, one angle each, at about $20 a day until each has about 1,000 impressions (one practitioner's numbers; Tim Ferriss picked *The 4-Hour Workweek* title from an AdWords test). The 30-character headline limit means it tests the angle, not the title. It needs the user's go and a total budget; skip quiet keywords.

## Rank on sites that already rank

When LinkedIn, Medium, or forum threads hold page one for a target query, draft a complete answer for that platform under the user's own account: query early in the headline, answer and example up front, one link to the next step, and a link back from the user's site. Write for that platform's readers; [site reputation abuse](https://developers.google.com/search/docs/essentials/spam-policies#site-reputation) covers hosting thin third-party pages to borrow a site's ranking. LinkedIn articles follow [gtm-linkedin](../gtm-linkedin/SKILL.md#articles-that-rank).

Where results show videos, propose a demo of the product doing that exact task, per [gtm-youtube](../gtm-youtube/SKILL.md#demos-for-video-results).

For a rising search, check its Google Trends history to rule out seasonality, read the original announcement, and draft what it means for the user's buyers; reporters covering it are outreach for [gtm-outreach](../gtm-outreach/SKILL.md).

## Sources

- [Amit P. Mehta, Memorandum Opinion, *United States v. Google LLC* (D.D.C. 2024)](https://storage.courtlistener.com/recap/gov.uscourts.dcd.223205/gov.uscourts.dcd.223205.1033.0_2.pdf)
- [Google: How Search works, ranking results](https://www.google.com/search/howsearchworks/how-search-works/ranking-results/)
- [Google: Search Quality Rater Guidelines (2025)](https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf)
- [Google Search Central: Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google Search Central: Spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
- [Google Search Central: SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google Search Central: A guide to Google Search ranking systems](https://developers.google.com/search/docs/appearance/ranking-systems-guide)
- [Google Search Central: Influencing your title links](https://developers.google.com/search/docs/appearance/title-link)
- [Google Search Central: Control your snippets](https://developers.google.com/search/docs/appearance/snippet)
- [Google Search Central: SEO link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
- [Google Search Central: Ask Google to recrawl your URLs](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
- [Search Console Help: What are impressions, position, and clicks?](https://support.google.com/webmasters/answer/7042828)
- [Search Console Help: Performance report data discrepancies](https://support.google.com/webmasters/answer/17010575)
- [Google Trends Help: FAQ about Google Trends data](https://support.google.com/trends/answer/4365533)
- [Google Ads Help: About responsive search ads](https://support.google.com/google-ads/answer/7684791)
- [Amy Schade, Nielsen Norman Group, *Inverted Pyramid: Writing for Comprehension* (2018)](https://www.nngroup.com/articles/inverted-pyramid/)
- [Pratyush Kumar, *Generative Engine Optimization at Scale* (2026)](https://arxiv.org/abs/2606.20065)
- [Advanced Web Ranking: Google organic CTR by position (2026)](https://www.advancedwebranking.com/seo/organic-ctr)
- [Sam Nemzer, SearchPilot, *Adding month and year to title tags* (2020)](https://www.searchpilot.com/resources/case-studies/seo-split-test-lessons-adding-month-year-to-title-tags)
- [Tim Ferriss, *Feeling stuck? Read this…* (2011)](https://tim.blog/2011/01/31/feeling-stuck-read-this/)
- [@asaio87: query-gap refresh, intro check and internal links](https://x.com/asaio87/status/2119171723849245031)
- [@NicholasDulait: keyword filters and the weekly positions 5 to 15 loop](https://x.com/NicholasDulait/status/2120063043614716174)
- [@borjafat: title testing with Search Console](https://x.com/borjafat/status/2119227612258054502)
- [@TheoAGI: the SEO/GEO playbook distilled from 66 articles](https://x.com/TheoAGI/status/2120163220312699025)
