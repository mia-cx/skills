---
name: seo-content
description: Choose keywords and pages, improve pages that already rank, and test titles from Search Console data.
disable-model-invocation: true
---

# Search content

Part of [seo](../seo/SKILL.md): its evidence method and boundaries apply here.

Choose, write, and improve the pages that bring buyers from Google, steered by Search Console data. AI answers live in [seo-ai-search](../seo-ai-search/SKILL.md); local businesses in [seo-local](../seo-local/SKILL.md).

## What earns the ranking

- **Satisfied clicks.** Google uses click data in ranking (NavBoost, described in its 2023 US antitrust testimony), so a click that bounces straight back counts against the page. Write titles and openings the page delivers on.
- **Visible trust.** A real byline linked to the author's experience, firsthand tests on the page, a factual About page, and identical company facts everywhere. Ask the user for the author's story; the founder's own beats generic copy.
- **Information gain.** Win with what the top results lack: tests, original data, screenshots, a new angle. Research the gap yourself (top results, YouTube transcripts, forum threads, review complaints), then get firsthand material by interviewing the user, analysing their records, or running the task in competing products. Mark every fact you could not verify `[CHECK]` and clear every mark before publishing.

```
Here's my article: [paste]
Tell me where a screenshot, image, table or diagram would help the reader more than text, and exactly what to show.
Then tell me what the top 5 results for "[keyword]" all say the same way, and suggest 3 unique angles from my own experience.
```

Bugs the team fixed and customer questions make candidate pages; young categories often have volume and no good answer. Check a competitor's offline edge (years of sponsorships and press links) before promising to out-write them.

## Choose keywords

1. Collect the buyer's words: sales calls, support questions, product facts, Search Console queries with buying modifiers ("pricing", "vs", "alternative", "for [role]"), and autocomplete.
2. Rank by intent to buy, because 50 buyers comparing plans outweigh 1,000 browsers. In a crowded space, narrow to buyer plus use case ("crm for dentists").
3. Filter each query (one practitioner's checks). Intent: blog posts and a definition box rank, defer; product or category pages with prices rank, target. Size: top 10 all big brands, mark "later". Already yours: in Search Console, filter Performance to the exact query and open Pages; if a page shows, improve it, since two pages chasing one query split Google's attention.
4. A new or low-authority site starts with queries nobody targets: keyword difficulty near 0 and listed volume 0–50. Tools undercount long-tail volume, and there is no one to beat.
5. Take volumes from a real tool (LowFruits, KWFinder, AnswerThePublic, Keywords Everywhere). Without one, label queries as hypotheses and state no volume.

Done when every query is grouped with those needing the same answer and mapped to an existing page or a proposed URL, in the format the current results share (landing page, listicle, how-to, comparison, tool). Each proposal records audience, intent, URL, the evidence it adds, internal links, and next action. Ship a first batch of 10–15 pages.

## Build the pages buyers check before paying

Pricing (real prices, plan limits, discount and trial terms beside signup), a comparison with each rival on the same criteria, "alternative to X" pages, "best X for [buyer]" lists, migration guides, and feature or integration demos answering stalling objections. Each carries a trial or demo button. These decision pages are also what AI answers cite most.

Rules for decision pages (thresholds from published SEO skills; rules of thumb, not tested):

- Build the page type that 6 or more of the top 10 results share. If all ten are blog posts and the user sells a product, skip the query. Two queries share a page when 4 or more of their top 10 match.
- Answer in the first 40–80 words and name the product, because AI engines lift passages, not pages.
- A "best of" list has 5–8 options. Every price comes from the vendor's own page with a "checked on" date, every option including the user's gets one real drawback, and the user's product is not ranked first.
- Add one thing the top 10 lack (the user's own number, test, or screenshot) and show the method.

Grow topics from a product page: one broad guide to its buyer questions, detail pages linked both ways, existing answers reused, then the buyer's next problem.

Programmatic pages each need distinct value and verified facts, stored per row in the spreadsheet the template reads. Merge rows needing the same answer, review a small batch before expanding, and fix pages Google drops within 60 days. Near-identical location or keyword pages count as scaled content abuse, so a row without its own facts gets no page.

## Pace a new domain

A burst of pages with no brand searches or links reads as generated, so a new domain publishes 1–4 pages a week (practitioners disagree on the number, not the direction) and waits 2–3 months before judging a change. Its order: week 0 the [seo-technical](../seo-technical/SKILL.md) checks, Bing, and a first run of the buyer questions; at launch Search Console, sitemap, and directories; from month 1 one decision page a week with a demo video each; from month 3 the Search Console loops below (refreshes, title tests, pruning), which need data a new site lacks.

## Grade drafts before publishing

Score every draft against a written rubric before it ships. One published skill scores 8 areas out of 5 and passes at 32 of 40 with no area under 3; agree the areas with the user (answer up front, information gain, accuracy, trust signals, internal links, and so on). A draft that fails goes back with the failing areas named.

## Improve pages that already rank

A page at positions 10–30 is relevant but incomplete: the closest win. Pull its queries for the last 3 months (Search Console connector or the Queries tab export):

- A query with impressions the page never answers: add the sentence, paragraph, or section that does.
- A query at positions 10–30: give it its own H2 or paragraph.

Work one page at a time, rewrite only the sections that change, request indexing in URL Inspection, and pull the queries again after 7–14 days. A lighter weekly variant: last 28 days, queries at position 5–15, grouped by page; improve the 3 pages with most impressions, skipping pages edited in the last 60 days. Judge the programme at 3 months.

Refresh stale prices, screenshots, steps, and limits; compare traffic loss with the same season last year. Merge pages only when they serve the same intent, with redirects and updated internal links.

On every page, answer the main question in the first two paragraphs and put the main keyword in the title, description, and first paragraph. Add 3–5 internal links per article where a reader would click (to product pages, to orphans, from established pages to pages near page one), each beside the question it answers with a descriptive anchor.

Log each edit with date and URL, open the live URL to confirm it shipped, and track sales by landing page with UTM-tagged links. To run this loop on a schedule, use [marketing-agents](../marketing-agents/SKILL.md).

## Test titles

A title change reports back in about two weeks; a new article takes months. Target pages at positions 3–10 with a few hundred impressions and CTR 40%+ below the norm for their position (one practitioner's norms: 9% at 3, 6% at 4, 4% at 5). A page can win its main keyword yet get skipped on queries whose words the title lacks.

1. Search the query in a private window, since Google rewrites long, stuffed, duplicated, or off-topic titles. Note query words the results above use and this title lacks.
2. Draft at least three candidates: query words first, a specific promise ("7 ways to get more leads"), a reason to click now, nothing the page fails to deliver. A year in the title must match current content; one practitioner uses next year's in Q4.
3. Record date, clicks, and CTR, change one variable on one page, and request a recrawl.
4. Compare equal windows at a similar average position: 2 weeks for busy pages, a month for quiet ones. Judge on clicks, because a new title often adds long-tail impressions that lower CTR while clicks rise. For many similar pages, change the pattern on half and keep or revert.

To test angles first, propose three search ads, one angle each, at about $20 a day until each has about 1,000 impressions. The 30-character headline tests the angle, not the title. It needs the user's go and a total budget; skip quiet keywords.

## Rank on sites that already rank

When LinkedIn, Medium, or forum threads hold page one for a target query, draft a complete answer for that platform under the user's own account: query early in the headline, answer and example up front, one link to the next step, and a link back from the user's site. Write for that platform's readers; [site reputation abuse](https://developers.google.com/search/docs/essentials/spam-policies#site-reputation) covers hosting thin third-party pages to borrow a site's ranking. LinkedIn articles follow [gtm-linkedin](../gtm-linkedin/SKILL.md#articles-that-rank).

Where results show videos, propose a demo of the product doing that exact task, per [gtm-youtube](../gtm-youtube/SKILL.md#demos-for-video-results).

For a rising search, check its Google Trends history to rule out seasonality, read the original announcement, and draft what it means for the user's buyers; reporters covering it are outreach for [gtm-outreach](../gtm-outreach/SKILL.md).

## Primary references

- [Helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
