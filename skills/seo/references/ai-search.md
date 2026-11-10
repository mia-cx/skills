# AI search visibility

Get the product recommended and cited when buyers ask an AI assistant what to choose. The unit of work is a question a buyer asks before choosing ("what's the best meeting notes app for a sales team?"), because it carries the decision a bare keyword lacks. Judge the work by qualified visits and customers from AI search, not mentions alone.

Google AI Overviews and AI Mode run on ordinary SEO and need no special schema or file. Add `llms.txt` only for a named consumer or an explicit request; no effect on AI citations is confirmed. Respect the site's existing training and retrieval crawler policies.

## 1. Build the question set

List the decisions people make before buying a product like this one, phrased the way they would ask an assistant ("help me plan dinner, I have ADHD"). Turn each into a Google query and an AI prompt. Save the set and keep it fixed, so every run is comparable.

Done when each question records who gets recommended today, which pages are cited, and whether the site has a page that fully answers it.

## 2. Measure

Run each prompt in ChatGPT, Claude, Perplexity, and Google separately, and track search and AI separately too, because a page can climb in Google and barely move in an assistant. Record provider, model, date, locale, exact prompt, brands recommended, and cited URLs. One answer is a noisy sample.

Start with 10 questions asked by hand; script the run once the list stops changing (one practitioner asks 100 questions every Monday). Read the pages that keep getting cited. One observed pattern: a direct answer in the first paragraph, original numbers, and a clear author, which matches [content.md](content.md).

## 3. Diagnose every lost question

For each question that names competitors but not the user, find the cause before creating anything:

| Cause | Sign | Fix |
| --- | --- | --- |
| Missing page | No page answers it | Plan one (below) |
| Weak page | A page answers part of it | Improve that page rather than publishing a second |
| Crawl or index problem | The page exists but crawlers can't reach it | [technical.md](technical.md) |
| Third-party problem | Answers draw on threads, reviews, articles, and directories that barely mention the product | Sort the sources (below) |

Label every cited third-party source by who controls it, and ask why competitors are better represented there:

| Source | Action |
| --- | --- |
| Own: pages the site controls | Improve them |
| Claim: profiles and listings the business can take over | Claim them and correct the facts |
| Earn: reviews, editorial mentions, community threads | [links.md](links.md); [gtm](../../gtm/SKILL.md) joins threads |
| Contest: outdated or wrong information | Ask the publisher for a correction, with evidence |

## 4. Fill the gap

- **Pages per decision and buyer.** A small business and a large one ask the same question with different requirements. In a category with low visibility, study what assistants cite there, then plan one page per segment ("accounts payable software for small businesses", "... for large businesses"), backed by comparison and how-to pages on the questions around the purchase.
- **Threads.** Join only the Reddit and forum threads cited for tracked questions, in communities close to the buyer. Draft a full answer the community would value without the link, and add the link only where it helps, since a bare link reads as spam. The user approves every post.
- **Agent access.** When the product has an API, draft a `SKILL.md` that tells an agent how to use it. With the user's go to publish it in a public GitHub repo, `npx skills add <org>/<repo>` lists it on skills.sh with its install command. One builder reports assistants now send them customers through integrations.

## 5. Rerun

Make one change at a time, then rerun the same questions on a fixed cadence (weekly or monthly). Compare the same segments, and report qualified visits and activated users from AI search alongside clicks and citations. Put more effort into what moved.

## Primary references

- [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
