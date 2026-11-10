---
name: gtm-retention
description: Keep users with an onboarded event, behaviour messages and check-ins, and read pricing from the numbers.
disable-model-invocation: true
---

# Retention and pricing

Part of [gtm](../gtm/SKILL.md): its copy sheet and boundaries apply here.

Getting users is the easy part. Keep the ones the product gets: define when a user is onboarded, find what brings people back, message them on what they did, and read from the numbers whether the price is wrong. Work from the product repo and exported data; the user approves every message to a customer and every price change.

## 1. Onboarded event

Name onboarding as one event: the first action that delivers value, such as "first document shared" in a writing app or "first transaction" in a wallet. Find it in the product code or analytics, then propose where the first "aha" moment sits inside the onboarding flow, so a new user feels the value before they leave. Done when the event is named in one sentence, with the share of last month's sign-ups that reached it, or a proposal to instrument it.

## 2. Why people stay and leave

Draft answers in `.gtm/retention.md`, marking guesses as guesses:

- **Hero features**: which features bring people back?
- **Levelling up**: how does a casual user become a power user?
- **Segments**: which usage numbers split users meaningfully?
- **Churn**: why do people leave, and what would win them back?
- **Analytics**: web analytics for the site, and a product analytics tool for what happens inside the product. Propose one where either is missing.
- **Pricing**: why, how and what the product charges. Free with no revenue model does not last.

Done when every question has an answer or a named source of data that would answer it.

## 3. Behaviour messages

Selling again to someone who already bought costs a fraction of finding a new customer, so trigger messages on what each person did:

1. Send the email tool (Klaviyo or the product's own) product events: signed up, reached the onboarded event, went quiet, bought.
2. Draft five flows, each fired by one behaviour.
3. Hold out 10% of users who receive nothing, because without that group nobody can tell what the messages added.
4. Compare revenue or retention between the groups.

Drafts follow the user's voice and the copy sheet's claims. Done when the user approves the flows and the holdout is configured.

## 4. Check-ins

For a service or membership, draft a weekly check-in per client or member from their goals, the last two check-ins and their messages since. Each covers what moved, what is blocked, and one question that gets a reply, and ends on what happens next and by when. Ask for sign-off only when they really have to decide, because "let me know what you think" leaves a team waiting days on approvals nobody needed to give. Flag anyone who skipped their last 2 check-ins, and anyone in their first 4 months, when one practitioner sees churn cost most. The user sends; ask before moving a deadline, cutting a deliverable or touching a price.

## Pricing signals

The heuristics below come from one consultant's agency audits. Use them as prompts to check, not as facts.

| Signal | Check | Reading |
| --- | --- | --- |
| Close rate | Closes over sales calls, from the user's call log | Above about 40% suggests the price is too low |
| Margin per client | Gross margin with the owner's hours priced at what replacing them would cost | Under 50% is a flag; 60% is a target. 10–20% of clients often sit near zero |
| Churn | Monthly | 15% bleeding, 10% treading water, 5% solid, 2.5% best in class |
| Scope creep | Hours delivered over hours contracted, last 90 days | Sort worst first; mark each reprice, rescope or sunset with one line on why |

Work from exported files (billing, costs, client list, time tracking, contracts), not logins. For a month-end report, put revenue, margin, new and churned customers beside last month's numbers, flag any move over 15%, and forecast the next 13 weeks as recurring revenue minus churn plus signed deals, never as this month's revenue repeated. Sending invoices, chasing payments, moving money and talking to clients about price stay with the user.
