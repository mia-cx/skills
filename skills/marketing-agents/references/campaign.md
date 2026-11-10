# Campaign on tickets

Run a multi-channel campaign that agents research, build and check, while the user agrees the offer and approves every launch. Every asset can pass its own checks and still contradict the others, so the campaign is planned, ticketed and reviewed as one.

## Steps

1. **Plan out loud.** Ask the user to talk for 5–10 minutes into a transcription tool, or write freely: the goal, the context, what they've tried, what they're unsure about. Save it as `plan.md`.
2. **Question the plan.** Interview the user with [grilling](../../grilling/SKILL.md) until the offer, the goal and what counts as a qualified lead are written to `brief.md`. The lead definition decides which results count later. Creative waits for an agreed offer.
3. **Build the folder** below. Done when each channel brief points to `brief.md`.
4. **Research and brief** with the goal prompt. Done when `creative-brief.md` is ready for the user's review.
5. **Ticket it.** Done when every deliverable has a ticket naming what it depends on. A coordinator hands out the ready ones ([coordinator.md](coordinator.md)).
6. **Check it as a whole**, then **launch on the user's go**: publishing, uploads and spend wait for it.
7. **Learn from results**, then rerun the workflow on the next campaign.

Add agents only where they help: one practitioner's first content system used four agents for three steps, and better context for the writer helped more than more agents.

## The campaign folder

```
campaign/
├── brief.md          ← audience, offer, goal, qualified lead
├── campaign-book/    ← approved visual direction
├── research/         ← shared across channels
├── tickets/          ← tasks and dependencies
├── landing-page/
├── paid/
├── email/
└── results/          ← informs the next campaign
```

- Save research several channels need, like customer objections, once and reference it.
- The campaign book holds the approved look with examples for ads, pages, posts and email, so every channel matches.

Agents can't tell a decision from a suggestion unless the files do:

- Save every finding with its source and date, and label unchecked claims.
- Keep approved decisions in their own file, apart from ideas floated in a meeting.
- When the user rejects a draft, save the reason ("this promises a result our product doesn't deliver") as something the next run checks.
- Move a finding into shared knowledge only after the user reviews it and it matters beyond this campaign.

Research covers both sides:

| Internal | External |
| --- | --- |
| product, offer and positioning | competitors' products, offers and campaigns |
| customer calls, CRM notes, support conversations | public discussions, reviews, customer questions |
| previous campaigns and their results | search demand and keyword research |

## First goal prompt

The files hold the context, so the prompt is short and says when to stop. In a tool without `/goal`, send the body as the task.

```
/goal prepare a creative brief for the next round of paid ads.

use audience.md, approved-claims.md, campaign-book/ and previous-test-results.md as context.

research and propose 3 angles. explain who each angle is for, what informed it and how it differs from previous tests. link the supporting sources and flag assumptions.

check each angle against the audience and approved claims.
save the brief to creative-brief.md in the campaign folder.

stop when the brief is ready for my review.
do not produce or publish ads. ask if required context is missing.
```

## Tickets

Each ticket names the deliverable, the context to read, the checks before review, what it depends on, and who or which agent has it. When one is blocked on the user, it records the exact question and other work carries on.

Dependencies set the order: research runs in parallel, final copy needs an agreed offer, ads need a page to point to, and follow-up emails match what someone signed up for.

| Ticket | Depends on | Status |
| --- | --- | --- |
| approve campaign offer | customer and competitor research | needs the user |
| build landing page | approved offer and campaign book | waiting |
| produce paid creative | approved offer and campaign book | waiting |
| check ad-to-page consistency | landing page and paid creative | waiting |

```
# produce the paid creative set

assigned to: paid creative agent
status: waiting for approval of the offer and campaign book

## before starting
confirm the offer and campaign book are approved.
use creative-brief.md for the angles, formats and deliverables.
use approved-claims.md for what the ads can promise.

## produce
- editable designs following the campaign book
- exports in each format specified in the brief
- a review report linking each ad to its angle and checks

## ready for my review when
- [ ] every deliverable in the brief is accounted for
- [ ] claims match approved-claims.md
- [ ] formats and dimensions match the brief
- [ ] exported images have readable text and accurate product details
- [ ] designs, exports and review report are linked in this ticket

## update this ticket
if blocked, name the missing input or decision.
otherwise, mark ready for review. do not publish.
```

Inside a ticket an agent loops make, check, fix, with a retry limit and a budget ([guardrails.md](guardrails.md#define-verified-before-the-run)). When it keeps failing the same check, it asks the user for the missing photo, tool or decision. Passing checks doesn't make creative good; the user judges the direction.

## Check the campaign as a whole

Before launch, check every asset against the others:

- Does the ad promise what the landing page delivers?
- Does the email use the same offer?
- Are dates, links and claims the same everywhere?

When the offer changes during review, every asset that mentions it goes back for revision.

## Learn from results

Start from one question, such as "which creative angles brought qualified leads last month, and what should we test next?" It takes spend, lead outcomes and each ad's angle, from the ad platform, analytics and the CRM. Campaign and ad IDs say what ran, UTM tags say where visits came from, and where they carry through to the CRM a sale ties back to an ad ([gtm paid ads](../../gtm/references/paid-ads.md)).

Flag missing tracking instead of crediting every sale to an ad, and a failed data update instead of reporting old numbers. Then ask the user for what the numbers can't show (late follow-ups, an offer changed halfway, an ad that drew the wrong buyers) and save it next to the results.

Each time the user steps in to fix the agents' work, fix the cause:

| What happened | What to fix |
| --- | --- |
| research covered irrelevant companies | the selection criteria and research instructions |
| recommendations missed a key customer objection | the customer context the agent could read |
| the report used old numbers | data updates and freshness checks |
| the output looked right but wasn't useful | the brief and the definition of a good result |

Run the workflow on the next campaign. If it gets worse, it was relying on instructions buried in the last conversation; move them into its files.
