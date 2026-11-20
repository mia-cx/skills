---
name: seo-ai-search
description: Track the questions buyers ask AI assistants, and fix why the answers skip the product.
disable-model-invocation: true
---

# AI search visibility

Part of [seo](../seo/SKILL.md): its evidence method and boundaries apply here.

Get the product recommended and cited when buyers ask an AI assistant what to choose. The unit of work is a question a buyer asks before choosing ("what's the best meeting notes app for a sales team?"), because it carries the decision a bare keyword lacks. Judge the work by qualified visits and customers from AI search, not mentions alone.

Google AI Overviews and AI Mode run on ordinary SEO and need no special schema or file. Add `llms.txt` only for a named consumer or an explicit request; no effect on AI citations is confirmed. Crawler access (which bots to allow, and what a CDN blocks) lives in [seo-technical](../seo-technical/SKILL.md#ai-crawlers).

Citations need both the site and third parties. In one vendor's dataset (44,070 citations, 10 brands), 85% went to third-party pages and under 4% to the brand's own site, yet brands whose own site was cited were named far more often.

## 1. Build the question set

List 15–30 decisions people make before buying a product like this one, phrased the way they would ask an assistant ("help me plan dinner, I have ADHD"). Take the wording from the user's inbox, sales calls, and reviews; mark any question you drafted yourself as a guess for the user to replace. Turn each into a Google query and an AI prompt. Save the set and keep it fixed, so every run is comparable.

Done when each question records who gets recommended today, which pages are cited, and whether the site has a page that fully answers it.

## 2. Measure

Run each prompt at least twice per engine, logged out, in ChatGPT, Claude, Perplexity, and Gemini, and track search and AI separately too, because a page can climb in Google and barely move in an assistant. Record provider, model, date, locale, exact prompt, brands named, and cited URLs, with named and cited in separate columns: being cited and being recommended are different numbers. Answers move week to week (one quoted study found ChatGPT swaps most of its sources between weeks), so a single run proves nothing.

- Open the "searching" step in ChatGPT or Claude to read the hidden searches behind an answer; each is a page the site needs or a site to be on.
- Bing Webmaster Tools' AI Performance report counts citations of each page in Copilot, Bing's AI summaries, and some partners, with a sample of grounding queries (the AI's own retrieval phrases, not what users typed). It is free first-party citation data, without clicks. Setup is in [seo-technical](../seo-technical/SKILL.md#bing-webmaster-tools).
- Under about 100 AI visits a month, report counts, not percentages.
- Propose a "How did you hear about us?" field at signup; one founder found the analytics referrer credited Google with 3.4 times more signups than customers did.

Ask by hand first; script the run once the list stops changing (one practitioner asks 100 questions every Monday). Paid visibility trackers wait until the hand-run list proves useful. Read the pages that keep getting cited. One observed pattern: a direct answer in the first paragraph, original numbers, and a clear author, which matches [seo-content](../seo-content/SKILL.md).

## 3. Diagnose every lost question

For each question that names competitors but not the user, find the cause before creating anything:

| Cause | Sign | Fix |
| --- | --- | --- |
| Missing page | No page answers it | Plan one (below) |
| Weak page | A page answers part of it | Improve that page rather than publishing a second |
| Crawl or index problem | The page exists but crawlers can't reach it | [seo-technical](../seo-technical/SKILL.md) |
| Third-party problem | Answers draw on threads, reviews, articles, and directories that barely mention the product | Sort the sources (below) |

Label every cited third-party source by who controls it, and ask why competitors are better represented there:

| Source | Action |
| --- | --- |
| Own: pages the site controls | Improve them |
| Claim: profiles and listings the business can take over | Claim them and correct the facts |
| Earn: reviews, editorial mentions, community threads | [seo-links](../seo-links/SKILL.md); [gtm-outreach](../gtm-outreach/SKILL.md) joins threads |
| Contest: outdated or wrong information | Ask the publisher for a correction, with evidence |

To contest, keep a dated fact sheet (price, plans, platforms), ask each engine about the product, and trace every wrong claim to the page it came from. Fix it at that page, and call it fixed only when the claim has been gone two months in a row.

## 4. Fill the gap

- **Pages per decision and buyer.** A small business and a large one ask the same question with different requirements. In a category with low visibility, study what assistants cite there, then plan one page per segment ("accounts payable software for small businesses", "... for large businesses"), backed by comparison and how-to pages on the questions around the purchase.
- **Threads.** Join only the Reddit and forum threads cited for tracked questions, in communities close to the buyer. Draft a full answer the community would value without the link, and add the link only where it helps, since a bare link reads as spam. The user approves every post; Reddit posting follows [gtm-reddit](../gtm-reddit/SKILL.md).
- **Agent access.** When the product has an API, draft a `SKILL.md` that tells an agent how to use it. With the user's go to publish it in a public GitHub repo, `npx skills add <org>/<repo>` lists it on skills.sh with its install command. One builder reports assistants now send them customers through integrations.

## 5. Rerun

Make one change at a time, then rerun the same questions on a fixed cadence (weekly or monthly). Compare the same segments, and report qualified visits and activated users from AI search alongside clicks and citations. Put more effort into what moved.

## Primary references

- [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [AI Performance in Bing Webmaster Tools](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/)
- [Helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
