---
name: gtm-retention
description: Keep users with an onboarded event, behaviour messages and check-ins, and read pricing from the numbers.
disable-model-invocation: true
---

# Retention and pricing

Part of [gtm](../gtm/SKILL.md): its copy sheet and boundaries apply here.

Retention multiplies what acquisition brings in; it does not replace it. Customers who stay grow more profitable each year (Reichheld), yet growing and declining brands differ mostly in how many buyers they win, not how many they lose (Riebe, Wright, Stern and Sharp). Keep the ones the product gets: define when a user is onboarded, find what brings people back, message them on what they did, and read from the numbers whether the price is wrong. Work from the product repo and exported data; the user approves every message to a customer and every price change.

## 1. Onboarded event

Define onboarded as a key action repeated at a set frequency, because one first action says nothing about whether a user keeps getting value (Casey Winters, *Why Onboarding is the Most Crucial Part of Your Growth Strategy*):

1. **Key action**: the action that only happens when a user got value, such as "document shared" in a writing app or "transaction made" in a wallet. Find it in the product code or analytics.
2. **Frequency**: how often a user should get that value, benchmarked on the offline habit it replaces. Grubhub used monthly, from how often people phoned restaurants.
3. **Definition**: users still doing the key action at that frequency some weeks after sign-up. Pinterest counted weekly savers four weeks after sign-up. When cohorts take long to settle, use a leading indicator; Grubhub used a second order within 30 days.

Then propose where the first "aha" moment sits inside the onboarding flow, so a new user feels the value before they leave. Done when the definition is one sentence, with the share of a sign-up cohort old enough to check that meets it, or a proposal to instrument it.

## 2. Why people stay and leave

Draft answers in `.gtm/retention.md`, marking guesses as guesses:

- **Hero features**: which features bring people back?
- **Levelling up**: how does a casual user become a power user?
- **Segments**: which usage numbers split users meaningfully?
- **Churn**: why do people leave, and what would win them back? For software, set six-month user retention beside the practitioner benchmarks Lenny Rachitsky collected from about 20 growth leaders, counted from the same starting group each uses: roughly 25% good and 45% great of registered users for consumer social, 40% and 70% of paid subscribers for consumer SaaS, 60% and 80% of paying companies (not seats) for SMB SaaS.
- **Analytics**: web analytics for the site, and a product analytics tool for what happens inside the product. Propose one where either is missing.
- **Pricing**: why, how and what the product charges.

Done when every question has an answer or a named source of data that would answer it.

## 3. Behaviour messages

Trigger messages on what each person did, because behaviour happens only when motivation, ability and a prompt come together at the same moment (Fogg Behavior Model), and a message fired by an action arrives while the motivation is still there:

1. Send the email tool (Klaviyo or the product's own) product events: signed up, reached the onboarded event, went quiet, bought.
2. Draft five flows, each fired by one behaviour.
3. Hold out a random 10% of users who receive nothing, because only a randomised control group shows what the messages caused; intuition misjudges such changes often (Kohavi and Thomke).
4. Fix the test's sample size and end date before it starts, and compare revenue or retention between the groups only at the end, because stopping when a difference first looks significant inflates false positives (Evan Miller). On a small list, say plainly that the test may show nothing either way.

Drafts follow the user's voice and the copy sheet's claims. Done when the user approves the flows and the holdout is configured.

## 4. Check-ins

For a service or membership, draft a weekly check-in per client or member from their goals, the last two check-ins and their messages since. Each covers what moved, what is blocked, and one question that gets a reply, and ends on what happens next and by when. Ask for sign-off only when they really have to decide: one agency consultant (Kyle Hunt) traced a 35-client agency's late delivery to messages ending "let me know what you think", which left the team waiting 1–3 days on approvals nobody needed to give. Flag anyone who skipped their last 2 check-ins, and anyone in their first 4 months, when the same consultant sees churn cost most. The user sends; ask before moving a deadline, cutting a deliverable or touching a price.

## Pricing signals

The heuristics below come from one consultant's agency audits (Kyle Hunt). Use them as prompts to check, not as facts.

| Signal | Check | Reading |
| --- | --- | --- |
| Close rate | Closes over sales calls, from the user's call log, with each lead's source | Above about 40% suggests the price is too low. Referrals close more at any price, and 10 calls is a small sample, so a high rate is a reason to test a higher price, not proof |
| Margin per client | Gross margin with the owner's hours priced at what replacing them would cost | Under 50% is a flag; 60% is a target. 10–20% of clients often sit near zero, which fits Kaplan's finding that in nearly every customer-profitability study 15–20% of customers produce all the profit |
| Churn | Monthly | 15% bleeding, 10% treading water, 5% solid, 2.5% best in class, for agencies. Software uses the retention benchmarks in step 2 |
| Scope creep | Hours delivered over hours contracted, last 90 days | Sort worst first. For each unprofitable client, propose in Kaplan's order: fix the user's own process first, then reprice so every extra covers its cost, then rescope or sell more of what is profitable, and sunset only as a last resort. One line on why for each |

Work from exported files (billing, costs, client list, time tracking, contracts), not logins. For a month-end report, put revenue, margin, new and churned customers beside last month's numbers, flag any move over 15%, and forecast the next 13 weeks as recurring revenue minus churn plus signed deals, never as this month's revenue repeated. Sending invoices, chasing payments, moving money and talking to clients about price stay with the user.

## Sources

- [Fred Reichheld, *Prescription for cutting costs* (Bain, 2001)](https://media.bain.com/Images/BB_Prescription_cutting_costs.pdf)
- [Riebe, Wright, Stern and Sharp, *How to grow a brand: Retain or acquire customers?* (2014)](https://ideas.repec.org/a/eee/jbrese/v67y2014i5p990-997.html)
- [Ehrenberg-Bass Institute: Effective brand growth, acquisition or retention?](http://marketingscience.info/effective-brand-growth-acquisition-or-retention)
- [Casey Winters, *Why Onboarding is the Most Crucial Part of Your Growth Strategy* (2017)](https://www.caseyaccidental.com/p/why-onboarding-is-the-most-crucial-part-of-your-growth-strategy)
- [Lenny Rachitsky, *What is good retention* (2020)](https://www.lennysnewsletter.com/p/what-is-good-retention-issue-29)
- [BJ Fogg: Fogg Behavior Model](https://behaviormodel.org/)
- [Ron Kohavi and Stefan Thomke, *The Surprising Power of Online Experiments* (HBR, 2017)](https://hbr.org/2017/09/the-surprising-power-of-online-experiments)
- [Evan Miller, *How Not To Run an A/B Test* (2010)](https://www.evanmiller.org/how-not-to-run-an-ab-test.html)
- [Robert S. Kaplan, *A Balanced Scorecard Approach to Measure Customer Profitability* (HBS Working Knowledge, 2005)](https://www.library.hbs.edu/working-knowledge/a-balanced-scorecard-approach-to-measure-customer-profitability)
- [@huntkyle: check-ins, close rate, month-end and scope checks](https://x.com/huntkyle/status/2118086670918750341)
- [@korzhov_dm: email and SMS triggered on behaviour, with a holdout](https://x.com/korzhov_dm/status/2118984106335756532)
- [@kunalvg: the funnel and smoother onboarding](https://x.com/kunalvg/status/1685889947461402624)
