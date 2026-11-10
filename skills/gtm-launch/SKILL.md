---
name: gtm-launch
description: Plan a launch, from the story and demo to who shares it, where it's listed, and the conversation after.
disable-model-invocation: true
---

# Launch

Part of [gtm](../gtm/SKILL.md): its copy sheet and boundaries apply here.

A launch spreads when strangers have something to add when they quote it. Plan the story, the demo, who shares it and what each will say before it goes live, then work the conversation it starts. Treat each launch as a small go-to-market of its own: its own buyer, channels, plan for scaling what works, and video. For a product with no marketing at all yet, run [Day-zero week](#day-zero-week) first.

Keep the plan in `.gtm/launch.md`. Claims come from the copy sheet.

## 1. Narrative

A stranger decides in under a second whether to stop, against one question: why do I care? "We're excited to announce", logo animations, a niche category nobody has heard of, and a founder talking before anything happens all fail it. Stakes, a fight people already hold opinions on, and a result big enough to sound fake pass it. Launch replies rarely ask about features; people argue about what the launch means, so decide what they will argue about first.

Draft one line each, asking the user where the site is silent:

1. What does the market already love?
2. What does it already hate?
3. Who is the enemy?
4. What is the highest-status outcome?
5. What exact words do customers use? (Take them from verified leads.)
6. What is the most polarizing thing that is true?

Then attach the claim to that existing conversation so it reads bigger than the product. Done when all six lines and an answer to "what could a stranger add?" are in `.gtm/launch.md`.

## 2. Demo

The narrative earns the stop; the demo earns belief. Answer two questions: what is the most extreme thing the product can do, and how do people believe it happened? Plan only the moments that answer both. For software, show one real case: what went in, what came out, and what still needed fixing by hand, because the hand fixes make it credible and give people a detail to discuss. Start from a screen recording; for a polished cut, read [gtm-video](../gtm-video/SKILL.md). Done when the user approves a shot list of 3 moments.

## 3. Angles

Plan 3–5 angles others can quote from, each reaching a different crowd:

- **Origin**: why the user built it, a personal problem or an unusual path.
- **Implication**: what changes for one specific job, and who benefits.
- **Reaction**: someone trying it on camera, pausing on the interesting parts, saying where they are skeptical.
- **Take**: a defensible claim with evidence to argue against.
- **Tension**: who saves money and whose business is threatened.

Controversy sticks to the product long after launch, so pick contested angles only when the team can answer the pushback with evidence.

## 4. People

Build the quote list:

1. Export the followers of each team member with an account, then add who no export shows: investors, advisors, customers, beta testers, and the scouts' accounts and leads.
2. Rank everyone by reach into the buyer. Follower count alone qualifies nobody: read their posts and replies for who pays attention.
3. For the top ~25, draft a personal message from the founder asking them to quote the launch, not repost it, because a quote is a new post to their followers. Bad: "We're launching Tuesday, would love a retweet!" Good: "Here's what we've been working on. Would you quote this? Here's a great one from a similar launch."

Pick a few creators who live the problem over many big ones, because mediocre reach turns into nothing. Give each real access and a brief, and let them write their own take:

```markdown
What it does: <one line from the copy sheet>
Try it yourself: <access, demo account, or sample input>
Why your audience might care: <their angle, tied to their posts>
Evidence: <link>
What's your take after trying it? Happy to hop on a call.
```

Paid partnerships are disclosed, because undisclosed paid posts break platform rules and advertising law in many countries. Sending follows [gtm-outreach](../gtm-outreach/SKILL.md#posting-rules)'s posting rules. Done when every angle has a briefed person with access.

## 5. Places

Pick the 5 places the buyer already browses when they need this, from [Places](#places); five good fits beat fifty submissions. Check each site accepts the product's stage and what its free route costs (a queue, a badge, participation). Draft one core description saying what it does, for whom, and how it differs, then adapt the wording per site with screenshots, matching categories and a working URL. In communities, the user takes part before posting the link, then shares it as a story or a request for feedback, because most subreddits and Lobsters remove plain self-promotion; Reddit specifics are in [gtm-reddit](../gtm-reddit/SKILL.md). Done when 5 places have a tailored listing draft.

## 6. Launch day

Keep the launch in one post so every quote points to the same place; X shows one post per conversation ([gtm-x](../gtm-x/SKILL.md)). Line up a thunderclap: founders, friends and partners post at one set time. Anchor the launch on the platform or ecosystem the product builds on, and use integrations as the onboarding story. Name owners before posting: one for product questions, one for business follow-ups.

Draft answers where each question was asked: under the post, its quotes, and creators' posts. Propose a DM only when someone said something it answers; check their profile first. A like alone is no reason.

Ready when: one claim with evidence, angles matched to briefed people with access, both owners named, and a clear way to try the product.

## 7. After

Log recurring questions, objections, bugs and surprise use cases in `.gtm/launch.md` with links, the answer given and an owner. Repeated questions become FAQ entries and landing copy; confusing features get a walkthrough; fixes get a reply to whoever asked. Feature someone's demo only with permission and credit.

Judge angles and people by trials, relevant DMs and sales calls, not views; when a prospect's source is unclear, ask them. Within 1–2 weeks, bring back the people who started useful conversations with something new: a deeper walkthrough, a customer case, an update. Give the use case buyers keep raising more room in the next demo and on the landing page.

## Day-zero week

One marketer's order of work for a product with no marketing yet:

| Day | Work |
| --- | --- |
| 1 | Answer: what we do, what problem we solve, which category we compete in, why we are better, who exactly it is for. Any blank is a question for the user. |
| 2 | Plan goal, audience, creative and channel; map three pillars ("What we build", "Why now", "Who it's for"); check them with the people building the product. |
| 3 | Draft 3 posts from screenshots, mockups or a Loom demo, such as "We're building X for Y. Early testers wanted." |
| 4 | Ecosystem anchor and thunderclap, as in step 6. |
| 5 | Social proof: integrations, quoted user replies, the feedback loop. |
| 6 | Ship something people can click or join: a waitlist, leaderboard or beta. |
| 7 | A recap thread on what worked, what didn't, what's next, tagging who helped. |

After week one, keep the weekly recap and review numbers weekly. Build community in two phases, onboard and listen, then activate and reward, with Discord or Telegram for depth and X for reach.

## Places

A menu from two practitioners' lists, not a checklist.

- **Reddit**: the subreddits in [gtm-reddit](../gtm-reddit/SKILL.md#pick-subreddits)
- **Communities**: Indie Hackers, Hacker News, Lobsters, DEV, Hashnode, Devpost, StackShare, freeCodeCamp Forum, Elpha, NoCodeFounders, the Indie Hackers and SaaS Community Discords, LinkedIn and Facebook groups
- **Launch sites**: Product Hunt, BetaPage, Launching Next, MicroLaunch, Tiny Startups, Uneed, Fazier, DevHunt (developer tools), Peerlist
- **Directories**: AlternativeTo, SaaSHub, G2, Capterra, TrustRadius, LibHunt and OpenAlternative (open source), AppSumo (a marketplace)
- **AI directories**: Futurepedia, There's An AI For That, Future Tools, AI Agent Store

Google lists low-quality directory links and automated link creation as link spam, and reciprocal-badge listings can count. Use these lists for discovery, fill every profile properly, and leave backlink work to [seo-links](../seo-links/SKILL.md).
