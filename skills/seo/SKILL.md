---
name: seo
description: Use when the user asks about SEO: pages missing from Google, lost organic traffic, content to rank for, backlinks, or getting cited in AI answers.
---

# SEO

Bring the site the visitors it serves. Judge work by useful visits and conversions, not rankings, link counts, or AI mentions alone.

## Establish the job

Read `DIRECTION.md`, the existing SEO setup, and any search data to learn the audience, the public pages, and what a visitor should do next. Ask only for what changes the work. Without Search Console or analytics access, work from public pages and source code and mark those measurements unknown.

Match the request: an audit produces findings, a fix ships and verifies, a content request skips the technical audit. Each job is its own skill. Read the SKILL.md of every branch the task reaches, and follow it with this skill's method and boundaries:

- Crawling, indexing, AI crawler access, Bing Webmaster Tools, deploy snapshots, metadata, structured data, performance: [seo-technical](../seo-technical/SKILL.md).
- Keywords, buyer pages, refreshes, title tests, ranking on other platforms: [seo-content](../seo-content/SKILL.md).
- Google Business Profile and the map pack: [seo-local](../seo-local/SKILL.md).
- Backlinks, mentions, journalist requests: [seo-links](../seo-links/SKILL.md).
- Recommendations and citations in AI answers: [seo-ai-search](../seo-ai-search/SKILL.md).

## Work from evidence

1. **Baseline.** Record the URLs inspected, data source, date range, and device or market segment. For traffic loss, compare equivalent periods. Separate observed defects from hypotheses.
2. **Constraint.** Name which stage fails: discovery, crawling, indexing, relevance, click-through, or conversion.
3. **Smallest fix.** Clear unintended indexing blockers first, then rank by audience value and evidence. A defect on a page that answers a buying question outranks site-wide warnings. Each action names the URL, the source file or template behind it, and how to verify it.
4. **Verify.** Report what changed and what the checks establish, local separately from deployed. Name each check the user must confirm in Search Console themselves, and what waits on a recrawl.

An audit leads with the highest-impact findings, each with evidence, fix, and success check, and states its coverage: sampled templates are not the whole site.

Every number comes from a tool or a page fetched this session; anything unchecked is written "not checked". Before trusting a data connection, ask it for the top 5 pages by clicks and compare with Search Console. The free stack covers most work: Google Search Console (an MCP connector such as mcp-gsc, read-only by default), Bing Webmaster Tools, Ahrefs Webmaster Tools, and Screaming Frog (free to 500 URLs).

Judge a third-party SEO skill or tool by its findings and their evidence. A quick test: ask which bot decides whether a site appears in ChatGPT search (OAI-SearchBot; GPTBot is for training). Ignore 0–100 site scores, whose weights were never validated against rankings or citations.

## Boundaries

Preserve deliberate privacy, staging restrictions, and crawler policies. Sending outreach, submitting listings, spending money, and changing account settings each need the user's go.

Permission tiers for site changes: reading data and writing drafts are free; publishing and changing a title need the user's go on the diff; deleting a page or changing robots.txt or a canonical happens only on the user's explicit go for that exact diff, with the block enforced in a hook where the harness allows ([marketing-agents-guardrails](../marketing-agents-guardrails/SKILL.md#gate-irreversible-actions)).

Verify time-sensitive search-engine claims against current primary documentation, because SEO advice goes stale faster than training data. SEO blogs and social posts are leads, not proof. Never invent search volume, rankings, results, authorship, or citations, and promise no ranking or indexing date.
