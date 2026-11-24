---
name: seo-ai-search
description: Track the questions buyers ask AI assistants, and fix why the answers skip the product.
disable-model-invocation: true
---

# AI search visibility

Part of [seo](../seo/SKILL.md): its evidence method and boundaries apply here.

Get the product recommended and cited when buyers ask an AI assistant what to choose. The unit of work is a question a buyer asks before choosing ("what's the best meeting notes app for a sales team?"), because it carries the decision a bare keyword lacks. Judge the work by qualified visits and customers from AI search, not mentions alone.

Google AI Overviews and AI Mode run on ordinary SEO and need no special schema or file. `llms.txt` is a proposal for giving agents a curated overview of a site, used mostly for documentation; no search engine or assistant says it affects citations. Add one when agents read the site's docs or API, or on request. Crawler access (which bots to allow, and what a CDN blocks) lives in [seo-technical](../seo-technical/SKILL.md#ai-crawlers).

Citations need both the site and third parties. AI search leans towards earned, third-party sources more than Google does (Chen et al., 2025), and in one multilingual audit of 131,512 citations in answers about brands, 82.4% fell outside the domains its classifier marked brand-associated, a label the author says does not establish ownership (Żatuchin, 2026).

## 1. Build the question set

List 15–30 decisions people make before buying a product like this one, phrased the way they would ask an assistant ("help me plan dinner, I have ADHD"). Take the wording from the user's inbox, sales calls, and reviews; mark any question you drafted yourself as a guess for the user to replace. Turn each into a Google query and an AI prompt. Save the set and keep it fixed, so every run is comparable.

Done when each question records who gets recommended today, which pages are cited, and whether the site has a page that fully answers it.

## 2. Measure

Run each prompt at least 3 times per engine, logged out, in ChatGPT, Claude, Perplexity, and Gemini, because answers vary from run to run: in SparkToro's test of 2,961 runs, ChatGPT and Google's AI gave the same brand list twice less than 1 time in 100, and the same order about 1 in 1,000. Report the share of runs that name the brand, never its position in an answer, with run counts by engine and question. SparkToro ran each prompt 60–100 times per tool and leaves the minimum sample open, so 3 runs is a pilot: rerun a question before treating the brand's absence from it as a gap. Logged out keeps memory and personalisation out of the searches ChatGPT runs; record the locale too, since it uses approximate location. Where an engine needs an account, as Claude does, use a fresh chat with web search on and record the run as signed in; if web search is off for that plan or workspace, mark the engine unavailable rather than counting its runs as misses. Track search and AI separately, because AI engines pick sources differently from Google, so a page can climb in Google and barely move in an assistant. Record provider, model, date, locale, exact prompt, brands named, and cited URLs, with named and cited in separate columns: being cited and being recommended are different numbers.

- Open the "searching" step in ChatGPT or Claude to read the searches behind an answer; assistants rewrite a question into one or more searches (Google calls it query fan-out), and each is a page the site needs or a site to be on.
- Bing Webmaster Tools' AI Performance report counts citations of each page in Copilot, Bing's AI summaries, and some partners, with a sample of grounding queries (the AI's own retrieval phrases, not what users typed), grouped into intents and topics with a citation share. It is free first-party citation data, without clicks. Setup is in [seo-technical](../seo-technical/SKILL.md#bing-webmaster-tools).
- Under about 100 AI visits a month, report counts, not percentages.
- Propose a "How did you hear about us?" field at signup; one founder found the analytics referrer credited Google with 3.4 times more signups than customers did.

Ask by hand first; script the run once the list stops changing (one practitioner asks 100 questions every Monday). Paid visibility trackers wait until the hand-run list proves useful. Read the pages that keep getting cited. On the GEO-bench benchmark, adding statistics, quotations, and cited sources to a page raised its position-adjusted share of the words in a simulated engine's answer by 30–40% relative, most for lower-ranked pages, while keyword stuffing did not help (Aggarwal et al., KDD 2024). The study measured no citation rate in live assistants, so treat these as edits to test; they match [seo-content](../seo-content/SKILL.md).

## 3. Diagnose every lost question

For each question that still names competitors but not the user after a rerun, find the cause before creating anything:

| Cause | Sign | Fix |
| --- | --- | --- |
| Missing page | No page answers it | Plan one (below) |
| Weak page | A page answers part of it | Improve that page rather than publishing a second |
| Crawl or index problem | The page exists but crawlers can't reach it | [seo-technical](../seo-technical/SKILL.md) |
| Third-party problem | Answers draw on threads, reviews, articles, and directories that barely mention the product | Sort the sources (below) |

Label every cited third-party source by who controls it (Discovered Labs' own, claim, earn, contest split), and ask why competitors are better represented there:

| Source | Action |
| --- | --- |
| Own: pages the site controls | Improve them |
| Claim: profiles and listings the business can take over | Claim them and correct the facts |
| Earn: reviews, editorial mentions, community threads | [seo-links](../seo-links/SKILL.md); [gtm-outreach](../gtm-outreach/SKILL.md) joins threads |
| Contest: outdated or wrong information | Ask the publisher for a correction, with evidence |

To contest, keep a dated fact sheet (price, plans, platforms), ask each engine about the product, and trace every wrong claim to the page it came from. Fix it at that page, and call it fixed only when the claim has been gone two months in a row.

## 4. Fill the gap

- **Pages per decision and buyer.** A small business and a large one ask the same question with different requirements, and fan-out searches carry those specifics. In a category with low visibility, study what assistants cite there, then plan one page per segment ("accounts payable software for small businesses", "... for large businesses"), backed by comparison and how-to pages on the questions around the purchase.
- **Threads.** Reddit is among the most-cited non-corporate sources in one vendor's data (Kumar, 2026). Join only the Reddit and forum threads cited for tracked questions, in communities close to the buyer. Draft a full answer the community would value without the link, and add the link only where it helps, since a bare link reads as spam. The user approves every post; Reddit posting follows [gtm-reddit](../gtm-reddit/SKILL.md).
- **Agent access.** When the product has an API, draft a `SKILL.md` whose description says what the skill does and when to use it, because agents match requests against the description alone. With the user's go to publish it in a public GitHub repo, installs through `npx skills add <org>/<repo>` put it on the skills.sh leaderboard, which ranks skills by install telemetry. One builder reports assistants now send them customers through integrations.

## 5. Rerun

Make one change at a time, then rerun the same questions on a fixed cadence (weekly or monthly). Compare the same segments, and report qualified visits and activated users from AI search alongside clicks and citations. Put more effort into what moved.

## Sources

- [Pranjal Aggarwal et al., *GEO: Generative Engine Optimization* (KDD 2024)](https://arxiv.org/abs/2311.09735)
- [Mahe Chen, Xiaoxuan Wang, Kaiwen Chen and Nick Koudas, *Generative Engine Optimization: How to Dominate AI Search* (2025)](https://arxiv.org/abs/2509.08919)
- [Dmitrij Żatuchin, *Cited Web Sources in LLM Answers about Brands: A Multilingual Audit* (2026)](https://arxiv.org/abs/2606.25787)
- [Pratyush Kumar, *Generative Engine Optimization at Scale* (2026)](https://arxiv.org/abs/2606.20065)
- [Rand Fishkin and Patrick O'Donnell, SparkToro, *AIs are highly inconsistent when recommending brands or products* (2026)](https://sparktoro.com/blog/new-research-ais-are-highly-inconsistent-when-recommending-brands-or-products-marketers-should-take-care-when-tracking-ai-visibility/)
- [Google Search Central: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [OpenAI Help: Searching the web with ChatGPT](https://help.openai.com/en/articles/9237897-searching-the-web-with-chatgpt)
- [Claude Help Center: Enable and use web search](https://support.claude.com/en/articles/10684626-enable-and-use-web-search)
- [Bing Webmaster Blog: Introducing AI Performance in Bing Webmaster Tools (2026)](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/)
- [Bing Search Blog: New AI visibility insights in Bing Webmaster Tools (2026)](https://blogs.bing.com/search/2026/6/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare/)
- [Jeremy Howard: The /llms.txt file](https://llmstxt.org/)
- [Anthropic: Agent Skills overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- [skills.sh: Docs](https://skills.sh/docs)
- [Discovered Labs: How Granola grew monthly activated users from AI search](https://discoveredlabs.com/case-studies/granola)
- [Profound: How Ramp increased AI brand visibility in accounts payable](https://www.tryprofound.com/customers/ramp)
- [Google Search Central: Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [@TheoAGI: the SEO/GEO playbook distilled from 66 articles](https://x.com/TheoAGI/status/2120163220312699025)
- [@korzhov_dm: asking three AIs 100 buyer questions every Monday](https://x.com/korzhov_dm/status/2118984106335756532)
- [@tarasshyn: listing an agent skill on skills.sh](https://x.com/tarasshyn/status/2119165493470974378)
