---
name: gtm-foundations
description: Position a product, research its market, and fit the go-to-market plan on one page.
disable-model-invocation: true
---

# Foundations

Part of [gtm](../gtm/SKILL.md): its copy sheet and boundaries apply here.

Ground any go-to-market work in positioning and buyer evidence, then fit the plan on one page, because a good plan run adequately beats a mediocre plan run well. Use this skill before drafting any campaign, and to write a whole go-to-market plan.

## Work from the product outwards

Marketing sits in rings: the product, then usability and support, then story, price and community, and only on the outside ads, hype and clicks. Spend effort from the centre outwards, because no ad fixes a product users can't figure out. Name the weakest ring first; when it is an inner one, put the first moves there. Likewise, a community forms around a product worth gathering around, so propose community work once there are users to gather.

## 1. Position the product

Run the copy-sheet steps in [gtm](../gtm/SKILL.md) first. Then add a `## Positioning` section to `.gtm/copy.md` that answers these six questions in one or two sentences each:

1. What do we do, and what problem do we solve? One short, precise answer.
2. Which market category do we compete in?
3. Why is our approach the best? What sets it apart?
4. Which unique attributes (approach, process, IP) does it have, and what does each one give the user?
5. Who is most interested? What do the most excited users share, and where do they gather?
6. If not us, what would they choose instead? Include doing nothing.

Add one line, "We are against ___", naming a status quo, a habit or an incumbent way of working, never a person or a company. Write the messaging around it, because opinionated messaging stands out and middle-of-the-road messaging gets skipped. Then describe one reader: what they're struggling with right now, where they read, what they want, how they feel. Add detail the closer a piece is to a sale.

A question the site, `DIRECTION.md` and the user's notes can't answer is a finding: the product isn't understood well enough to market yet. List each blank as a question for the user and a research target for step 2. Done when every question has an answer or a listed blank.

## 2. Research the market

Build a first hypothesis from raw material, then have buyers confirm it.

1. **Gather.** Collect 25–40 competitor sites (pricing pages, case studies, docs), recent earnings calls from the 3–5 largest incumbents when they're public, 100+ reviews of the product and its competitors (G2, Capterra, Trustpilot, app stores, Amazon), and the Reddit and forum threads where people vent about the category. Reuse the scouts' leads when they're recent.
2. **Synthesise, don't summarise.** Answer these yourself over the material, because summaries repeat it back while these questions expose shared blind spots and pains nobody is building for:

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
5. **Read competitors' oldest ads.** Look up each competitor in the [Meta Ad Library](https://www.facebook.com/ads/library/) and sort their live ads oldest first, with copy, start date and landing page. The ads that run longest are the ones paying for themselves. [gtm-paid-ads](../gtm-paid-ads/SKILL.md) covers rebuilding them.

Label the output a hypothesis. Only conversations with people who'd pay confirm it, so end with 3–5 questions the user can ask buyers. Done when the hypothesis, its weakest point and the buyer questions are written.

## 3. Write the plan on one page

Write `.gtm/plan.md` with four sections, because a strategy nobody reads in one sitting doesn't get used:

| Section | Holds |
| --- | --- |
| Brand promise | The positioning answer and the "against" line |
| Target audience | The reader from step 1, the most excited users, and where they gather |
| Growth strategy | The funnel stage the plan fixes first, and why |
| Marketing initiatives | 3–5 moves that fit the product best, each with a concrete example: a post line, a page title, a prompt to track |

Choose initiatives from the funnel table below. Run each one through a GACC brief, in this order: **goal, audience, creative, channel**. The channel comes last because where to post depends on what the piece is for and who should see it.

Add a three-month horizon. Pair every outcome goal the user can't force (a macro KPI, such as "bounce rate down 10% in 3 months") with input goals they control (micro KPIs, such as "3 articles a month, each reaching a set number of visits"). Split the inputs into weekly actions, and agree the goals with the user. Done when each initiative has a GACC brief and a micro KPI.

## The funnel

Marketing runs from first contact to payment. Acquisition is the easy part and keeping users is the hard part, so weight the plan towards retention and smoother onboarding, which already puts a product ahead of most competitors.

| Stage | Done looks like | Reference |
| --- | --- | --- |
| Acquisition | A written ideal-user profile, chosen channels, content loops, partners, a referral programme | [gtm-outreach](../gtm-outreach/SKILL.md), [gtm-organic](../gtm-organic/SKILL.md), [gtm-x](../gtm-x/SKILL.md), [gtm-launch](../gtm-launch/SKILL.md), [gtm-video](../gtm-video/SKILL.md), [seo](../seo/SKILL.md), [gtm-paid-ads](../gtm-paid-ads/SKILL.md) |
| Onboarding | One countable event defines "onboarded": the first action that delivers value (a saved note, a first transaction). A first "aha" moment is built into that flow | [gtm-retention](../gtm-retention/SKILL.md) |
| Engagement | The hero features are known, and so is the path from casual to power user | [gtm-retention](../gtm-retention/SKILL.md) |
| Retention | Users segmented by usage, churn reasons tracked, win-back campaigns planned | [gtm-retention](../gtm-retention/SKILL.md) |
| Monetisation | Why, how and what the product charges, decided on day one, because free with no revenue model doesn't last | [gtm-retention](../gtm-retention/SKILL.md) |

Measure every stage: web analytics and Search Console for the site, product analytics inside the product. When the onboarding event can't be counted yet, write "unknown" and make instrumenting it the first initiative.

## Running the plan

Run the week from a board for the big picture, a calendar for daily tasks, and a weekly review of the numbers that doubles down on what moved a micro KPI. Draft the review when you can read the metrics; otherwise list the numbers to pull.
