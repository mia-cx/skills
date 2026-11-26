---
name: gtm-foundations
description: Position a product, research its market, and fit the go-to-market plan on one page.
disable-model-invocation: true
---

# Foundations

Part of [gtm](../gtm/SKILL.md): its copy sheet and boundaries apply here.

Ground any go-to-market work in positioning and buyer evidence, then fit the plan on one page. Use this skill before drafting any campaign, and to write a whole go-to-market plan.

## Work from the product outwards

Marketing sits in rings (Seth Godin, *The circles of marketing*): the product; then usability, support and atmosphere; then story, price and community for the tribe it's for; and only on the outside ads, hype and clicks. Spend effort from the centre outwards, because no ad fixes a product users can't figure out; Godin's rule is "when your marketing isn't working, go one circle in". Name the weakest ring first; when it is an inner one, put the first moves there. Propose community work once there are users to gather: one marketer (@kunalvg) finds that communities built before the product is worth gathering around rarely last.

## 1. Position the product

Run the copy-sheet steps in [gtm](../gtm/SKILL.md) first. Then add a `## Positioning` section to `.gtm/copy.md` that answers these six questions in one or two sentences each, in this order, because each answer only holds against the one before it (April Dunford, *Obviously Awesome*):

1. If not us, what would buyers use instead? Name only the alternatives they really compare, and include doing nothing, because the status quo wins often (Dunford loses about a quarter of enterprise deals to "no decision").
2. What do we have that those alternatives lack (approach, process, IP)?
3. What does each of those give the buyer?
4. Who cares most about that value? What do the most excited users share, and where do they gather?
5. Which market category makes that value obvious to them?
6. What do we do, and what problem do we solve? One short, precise answer built from 1–5.

Add one line, "We are against ___", naming the status quo, a habit or an incumbent way of working, never a person or a company, because buyers who do nothing stay with the status quo, so the messaging has to argue against it (Dunford). Few buyers see any brand as different or unique (on average 17% of a brand's own buyers), so being easy to recognise does more of the work (Romaniuk, Sharp and Ehrenberg 2007): note in the positioning section one look and one phrasing the product uses everywhere. Then describe one reader in their situation, because circumstances explain choices better than demographics (Christensen Institute, jobs to be done): what they're struggling with right now, where they read, what they want, how they feel. Add detail the closer a piece is to a sale.

A question the site, `DIRECTION.md` and the user's notes can't answer is a blank in the product's positioning. List each blank as a question for the user and a research target for step 2. Done when every question has an answer or a listed blank.

## 2. Research the market

Build a first hypothesis from raw material, then have buyers confirm it, because AI desk research gives shallow, overly favourable answers that only real buyers can check (NN/g, *Synthetic Users*).

1. **Gather.** One founder's recipe, a workable default: 25–40 competitor sites (pricing pages, case studies, docs), recent earnings calls from the 3–5 largest incumbents when they're public, 100+ reviews of the product and its competitors (G2, Capterra, Trustpilot, app stores, Amazon), and the Reddit and forum threads where people vent about the category. Reuse the scouts' leads when they're recent.
2. **Synthesise, don't summarise.** Answer these yourself over the material, because they look for shared blind spots and unserved pains where a summary only repeats the material:

   ```
   What do the winners in this market know that their customers would never admit?
   ```

   ```
   List the beliefs this whole industry takes for granted. For each one, what would need to happen for it to be false?
   ```

3. **Attack the best angle.** Pick the strongest thesis and run several rounds of:

   ```
   Steelman this thesis like a top-tier VC would. Then show me exactly where it fails.
   ```

4. **Mine buyer language.** Group the reviews by topic, then pull the 10 most common complaints and the 10 most common reasons to buy, quoted verbatim with their URLs. Add the best phrases to the copy sheet's problem phrasings. Draft hooks from them in the buyers' exact words (see [gtm-writing](../gtm-writing/SKILL.md)).
5. **List competitors' longest-running ads.** Search each competitor in the [Meta Ad Library](https://www.facebook.com/ads/library/) and list its active ads with copy, format and start date, longest-running first. Read the library by hand, or through the [Ad Library API](https://developers.facebook.com/docs/graph-api/reference/ads_archive/) for ads that reached the EU; never scrape it, because Meta's terms forbid automated collection without its written permission. The library shows when an ad ran, not what it spent or earned, so a long run makes an ad a lead to test, not proof it pays. [gtm-paid-ads](../gtm-paid-ads/SKILL.md) covers rebuilding them.

Label the output a hypothesis. Only conversations with people who'd pay confirm it, so end with 3–5 questions the user can ask buyers about a specific recent time they had the problem: what they did, what it cost, what they tried. Leave the product out of the questions, because people are polite about an idea and only past behaviour is evidence (Rob Fitzpatrick, *The Mom Test*). Done when the hypothesis, its weakest point and the buyer questions are written.

## 3. Write the plan on one page

Write `.gtm/plan.md` with four sections. A list of goals is not a strategy: a strategy names the main obstacle, a guiding policy for getting past it, and actions that support each other (Richard Rumelt, *Good Strategy Bad Strategy*).

| Section | Holds |
| --- | --- |
| Brand promise | The positioning answer and the "against" line |
| Target audience | The reader from step 1, the most excited users, and where they gather |
| Growth strategy | The diagnosis (the main obstacle, often one funnel stage) and the guiding policy for it |
| Marketing initiatives | 3–5 moves that carry out the policy, each with a concrete example: a post line, a page title, a prompt to track |

Choose initiatives from the funnel table below. Run each one through a GACC brief (Emily Kramer, MKT1), in this order: **goal, audience, creative, channel**. The channel comes last because where to post depends on what the piece is for and who should see it.

Add a three-month horizon. Pair every outcome goal the user can't force (a macro KPI, such as "bounce rate down 10% in 3 months") with input goals they control (micro KPIs, such as "3 articles a month, each reaching a set number of visits"), because focusing on controllable inputs is the surest way to move the outputs (Jeff Bezos, Amazon's 2009 shareholder letter). Split the inputs into weekly actions, and agree the goals with the user. Done when the growth strategy names the obstacle and each initiative has a GACC brief and a micro KPI.

## The funnel

Marketing runs from first contact to payment; the stages adapt Dave McClure's AARRR metrics. Weight the plan by where the product leaks. For a product people should keep using, fix retention first while the retention curve keeps falling, because a curve that flattens is the best sign users get lasting value (Brian Balfour, from a subscription product) and traffic poured into a leaking product drains away. A one-off purchase is meant to end, so a falling curve there is no leak: find the stage where most buyers drop out and start there. Once a repeat-use product's curve flattens at a level that pays for winning each user, put most effort into acquisition, because brands grow and shrink mainly through how many buyers they win (Riebe, Wright, Stern and Sharp 2014).

| Stage | Done looks like | Reference |
| --- | --- | --- |
| Acquisition | A written ideal-user profile, chosen channels, content loops, partners, a referral programme | [gtm-outreach](../gtm-outreach/SKILL.md), [gtm-organic](../gtm-organic/SKILL.md), [gtm-x](../gtm-x/SKILL.md), [gtm-launch](../gtm-launch/SKILL.md), [gtm-video](../gtm-video/SKILL.md), [seo](../seo/SKILL.md), [gtm-paid-ads](../gtm-paid-ads/SKILL.md) |
| Onboarding | For a product people should keep using, "onboarded" is defined as a key action still repeated at a set frequency weeks after sign-up, such as Pinterest's weekly savers four weeks in (Casey Winters). For a one-off purchase, it is the job done: the purchase completed and the result delivered. The first value event, the user's first key action or "aha" moment, is built into the onboarding flow | [gtm-retention](../gtm-retention/SKILL.md) |
| Engagement | The hero features are known, how often users repeat the key action is measured, and so is the path from casual to power user | [gtm-retention](../gtm-retention/SKILL.md) |
| Retention | Users segmented by usage, churn reasons tracked, win-back campaigns planned | [gtm-retention](../gtm-retention/SKILL.md) |
| Monetisation | Why, how and what the product charges, written down before launch, because pricing left until after the build is a main reason new products miss their revenue targets (Ramanujam and Tacke, *Monetizing Innovation*) | [gtm-retention](../gtm-retention/SKILL.md) |

Measure every stage: web analytics and Search Console for the site, product analytics inside the product. When the key action can't be counted yet, write "unknown" and make instrumenting it the first initiative.

## Running the plan

Run the week from a board for the big picture, a calendar for daily tasks, and a weekly review of the numbers that doubles down on what moved a micro KPI. Draft the review when you can read the metrics; otherwise list the numbers to pull.

## Sources

- [Seth Godin, *The circles of marketing* (2012)](https://seths.blog/2012/07/the-circles-of-marketing/)
- [April Dunford, *A Quickstart Guide to Positioning* (2021)](https://www.aprildunford.com/post/a-quickstart-guide-to-positioning)
- [Jenni Romaniuk, Byron Sharp and Andrew Ehrenberg, *Evidence concerning the importance of perceived brand differentiation* (2007)](https://byronsharp.wordpress.com/wp-content/uploads/2008/04/different1.pdf)
- [Clayton Christensen Institute: Jobs to Be Done theory](https://www.christenseninstitute.org/theory/jobs-to-be-done/)
- [Maria Rosala and Kate Moran, NN/g: *Synthetic Users* (2024)](https://www.nngroup.com/articles/synthetic-users/)
- [Rob Fitzpatrick, *The Mom Test* (2013)](https://www.momtestbook.com/)
- [Joanna Wiebe, *Amazon review mining for copywriting* (2014)](https://copyhackers.com/2014/10/amazon-review-mining/)
- [Meta Transparency Center: Ad Library tools](https://transparency.meta.com/researchtools/ad-library-tools/)
- [Meta for Developers: Ad Library API (ads_archive)](https://developers.facebook.com/docs/graph-api/reference/ads_archive/)
- [Meta: Automated Data Collection Terms](https://www.facebook.com/legal/automated_data_collection_terms)
- [Richard Rumelt, *The perils of bad strategy* (McKinsey Quarterly, 2011)](https://www.mckinsey.com/capabilities/strategy-and-corporate-finance/our-insights/the-perils-of-bad-strategy)
- [Emily Kramer, *The GACC Marketing Brief* (MKT1, 2021)](https://newsletter.mkt1.co/p/the-gacc-marketing-brief-the-best)
- [Jeff Bezos, *2009 Letter to Shareholders* (2010)](https://www.sec.gov/Archives/edgar/data/1018724/000119312510082914/dex991.htm)
- [Google Analytics Help: Engagement rate and bounce rate](https://support.google.com/analytics/answer/12195621?hl=en)
- [Dave McClure, *Startup Metrics for Pirates: AARRR!* (2007)](https://www.slideshare.net/dmc500hats/startup-metrics-for-pirates-long-version)
- [Brian Balfour, *Building a Growth Framework Towards a $100 Million Product*](https://brianbalfour.com/essays/hubspot-growth-framework-100m)
- [Casey Winters, *Why Onboarding is the Most Crucial Part of Your Growth Strategy* (2017)](https://www.caseyaccidental.com/p/why-onboarding-is-the-most-crucial-part-of-your-growth-strategy)
- [Ehrenberg-Bass Institute: Answering critics, on Riebe, Wright, Stern and Sharp (2014)](https://marketingscience.info/news-and-insights/answering-critics)
- [Madhavan Ramanujam and Georg Tacke, *Monetizing Innovation* (Wiley, 2016)](https://www.wiley.com/en-us/Monetizing+Innovation%3A+How+Smart+Companies+Design+the+Product+Around+the+Price-p-9781119240860)
- [@kunalvg: community, strategy and marketing missteps](https://x.com/kunalvg/status/1685889947461402624)
- [@kunalvg: positioning questions and exercise](https://x.com/kunalvg/status/1709147454606565816)
- [@kunalvg: three-month plans and KPIs](https://x.com/kunalvg/status/1697157671567470819)
- [@romanbuildsaas: three-hour AI market research](https://x.com/romanbuildsaas/status/2119091729181880583)
