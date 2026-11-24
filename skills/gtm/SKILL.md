---
name: gtm
description: 'Use when the user asks for go-to-market work: positioning, finding people who have the problem, cold emails, replies or DMs, posts or a content plan, posting on X, LinkedIn, Reddit or YouTube, a launch, a product video, retention or pricing, paid ads, or a whole go-to-market plan.'
---

# GTM

Get the product in front of the people who have the problem it solves, and keep the ones it serves. Every piece of work traces back to evidence: the product's real claims, and people's own words for the problem.

Every message and post clears one bar: the reader is glad to see it even if they never click.

## 1. Ground the product

Every job starts here. Read `DIRECTION.md` and the live website, then write or refresh `.gtm/copy.md` in the product repo:

- The product, the problem it solves in one sentence, and who has it.
- Every claim a message may make, quoted verbatim from the site with its URL.
- 10–15 phrasings of the problem as people write it: questions, complaints, "<competitor> alternative". Take them from reviews, threads and replies, because a headline lifted from a review beat the team's own by over 400% in clicks in Joanna Wiebe's review-mining test.

Add `.gtm/` to `.git/info/exclude`, because its ledgers hold real people's names and quotes. Ask the user only when the site leaves the audience or the problem unclear.

Done when the copy sheet has the one-sentence problem, the audience, every claim with its source, and the phrasings.

## 2. Pick the job

Each job is its own skill. Read the SKILL.md of every branch the job reaches, and follow it with this skill's copy sheet and boundaries.

Making a piece and placing it are separate branches. Writing and video make pieces any platform can reuse; each platform branch decides how a piece is shaped, posted and timed there. A post for LinkedIn reaches gtm-writing and gtm-linkedin.

| Job | Branch |
| --- | --- |
| Positioning, market research, a one-page strategy, the funnel | [gtm-foundations](../gtm-foundations/SKILL.md) |
| Finding people who posted the problem; replies, cold email | [gtm-outreach](../gtm-outreach/SKILL.md) |
| A content plan or brand, and which platforms carry it | [gtm-organic](../gtm-organic/SKILL.md) |
| Writing posts and short copy | [gtm-writing](../gtm-writing/SKILL.md) |
| Making a product video or short-form video | [gtm-video](../gtm-video/SKILL.md) |
| Making an AI-generated film | [gtm-ai-film](../gtm-ai-film/SKILL.md) |
| X: the feed, account reputation, the daily article routine | [gtm-x](../gtm-x/SKILL.md) |
| LinkedIn: posts, articles that rank, DMs | [gtm-linkedin](../gtm-linkedin/SKILL.md) |
| Reddit: research, subreddits, posting without removal | [gtm-reddit](../gtm-reddit/SKILL.md) |
| YouTube: demos for video results, titles and thumbnails | [gtm-youtube](../gtm-youtube/SKILL.md) |
| A launch or announcement | [gtm-launch](../gtm-launch/SKILL.md) |
| Retention, churn, check-ins, pricing | [gtm-retention](../gtm-retention/SKILL.md) |
| Paid ads | [gtm-paid-ads](../gtm-paid-ads/SKILL.md) |
| Search and AI answers | [seo](../seo/SKILL.md) |
| Automating any of this with agents | [marketing-agents](../marketing-agents/SKILL.md) |

A whole go-to-market plan: work through gtm-foundations, then give the 3–5 moves from the other branches and seo that fit the product best, each with a concrete example (a post line, a page title, a prompt to track).

Content, launches and video build on gtm-outreach's leads, so run its scouts first when none are recent.

## Boundaries

- Reach people only through a public reply or a contact route they published. Never guess, scrape, or buy an address: none of them is a route the person chose, and US law makes unlawful commercial email sent to automatically harvested or generated addresses an aggravated violation (CAN-SPAM, 15 U.S.C. 7704(b)).
- Always disclose the relationship to the product; never pose as a customer or a neutral third party, because the FTC treats undisclosed connections and fake testimonials as deceptive (16 CFR 255 and 465).
- Claims come from the copy sheet. Anything else becomes a question for the user.
- One message per person, and follow-ups only when the user asks.
- Anything public or sent goes out only after the user approves it, under [gtm-outreach](../gtm-outreach/SKILL.md#posting-rules)'s posting rules.

## Sources

- [Joanna Wiebe, *Amazon review mining for copywriting* (2014)](https://copyhackers.com/2014/10/amazon-review-mining/)
- [15 U.S.C. 7704: Other protections for users of commercial electronic mail (CAN-SPAM)](https://www.law.cornell.edu/uscode/text/15/7704)
- [eCFR: 16 CFR Part 255, Guides concerning the use of endorsements and testimonials in advertising](https://www.ecfr.gov/current/title-16/chapter-I/subchapter-B/part-255)
- [eCFR: 16 CFR Part 465, Use of consumer reviews and testimonials](https://www.ecfr.gov/current/title-16/chapter-I/subchapter-D/part-465)
