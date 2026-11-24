---
name: gtm-launch
description: Plan a launch, from the story and demo to who shares it, where it's listed, and the conversation after.
disable-model-invocation: true
---

# Launch

Part of [gtm](../gtm/SKILL.md): its copy sheet and boundaries apply here.

A launch spreads when strangers have something to add when they quote it. Plan the story, the demo, who shares it and what each will say before it goes live, then work the conversation it starts. A launch rarely makes a product on its own: what it buys is an initial core of users (Graham, *Do Things That Don't Scale*), so plan the weeks after as carefully as the day. Treat each launch as a small go-to-market of its own: its own buyer, channels, plan for scaling what works, and video. For a product with no marketing at all yet, run [Day-zero week](#day-zero-week) first.

Keep the plan in `.gtm/launch.md`. Claims come from the copy sheet.

## 1. Narrative

A stranger decides in a second or two whether to stop (Meta measured 1.7 seconds on the average mobile feed item), against one question: why do I care? "We're excited to announce", logo animations, a niche category nobody has heard of, and a founder talking before anything happens all fail it. Stakes, a fight people already hold opinions on, and a result big enough to sound fake pass it, because people share what is surprising, useful or arousing: awe, anger, anxiety (Berger and Milkman). In one launch agency founder's experience (Matt Epstein), replies rarely ask about features; people argue about what the launch means, so decide what they will argue about first.

Draft one line each, asking the user where the site is silent:

1. What does the market already love?
2. What does it already hate?
3. Who is the enemy?
4. What is the highest-status outcome?
5. What exact words do customers use? (Take them from verified leads.)
6. What is the most polarizing thing that is true?

Then attach the claim to that existing conversation so it reads bigger than the product. Done when all six lines and an answer to "what could a stranger add?" are in `.gtm/launch.md`.

## 2. Demo

The narrative earns the stop; the demo earns belief. Answer two questions: what is the most extreme thing the product can do, and how do people believe it happened? Plan only the moments that answer both. For software, show one real case: what went in, what came out, and what still needed fixing by hand; in one launch agency's experience (0xfJuan), the hand fixes make it credible and give people a detail to discuss. Better still, let people try it themselves; Show HN asks for exactly that. Open on the product, keep the message short, and caption it to work on mute, because Meta's analysis of 600+ feed video ads found recall strongest when the ad showed the product and got its message across succinctly. Start from a screen recording; for a polished cut, read [gtm-video](../gtm-video/SKILL.md). Done when the user approves a shot list of 3 moments.

## 3. Angles

Plan 3–5 angles others can quote from, each reaching a different crowd:

- **Origin**: why the user built it, a personal problem or an unusual path.
- **Implication**: what changes for one specific job, and who benefits.
- **Reaction**: someone trying it on camera, pausing on the interesting parts, saying where they are skeptical.
- **Take**: a defensible claim with evidence to argue against.
- **Tension**: who saves money and whose business is threatened.

Anger spreads as well as awe, and controversy sticks to the product long after launch, so pick contested angles only when the team can answer the pushback with evidence.

## 4. People

Build the quote list:

1. Export the followers of each team member with an account, then add who no export shows: investors, advisors, customers, beta testers, and the scouts' accounts and leads.
2. Rank everyone by reach into the buyer. Follower count alone qualifies nobody: read their posts and replies for who pays attention.
3. For the top ~25, draft a personal message from the founder asking them to quote the launch, not repost it, because a quote is a new post to their followers that carries their own take. Bad: "We're launching Tuesday, would love a retweet!" Good: "Here's what we've been working on. Would you quote this? Here's a great one from a similar launch."

Pick a few creators who live the problem over many big ones, because engagement with sponsored posts does not rise with follower count: across 800+ Instagram campaigns it peaked at mid-sized accounts, whose followers feel a closer tie (Wies, Bleier and Edeling). Give each real access and a brief, and let them write their own take rather than repeat the product's copy; in the same study, posts in the creator's own style made small and large accounts more effective than mid-sized ones:

```markdown
What it does: <one line from the copy sheet>
Try it yourself: <access, demo account, or sample input>
Why your audience might care: <their angle, tied to their posts>
Evidence: <link>
What's your take after trying it? Happy to hop on a call.
```

Every relationship is disclosed in the post itself, not only in a bio: payment, free access or products, employment, friendship or family. The FTC requires it in the US, and platform rules and other countries' advertising law do too. Sending follows [gtm-outreach](../gtm-outreach/SKILL.md#posting-rules)'s posting rules. Done when every angle has a briefed person with access.

## 5. Places

From [Places](#places), rank the sites the buyer already browses when they need this as likely, possible or long shot, and take the top 3–5. Weinberg and Mares's Bullseye (*Traction*) tests a few channels cheaply, then puts the effort into the one that works, because one channel usually dominates. Check each site accepts the product's stage and what its free route costs (a queue, a badge, participation). Draft one core description saying what it does, for whom, and how it differs, then adapt the wording per site with screenshots, matching categories and a working URL.

In communities, the user takes part before posting the link, then shares it as a story or a request for feedback, because each community caps self-promotion its own way: Reddit leaves it to each subreddit (some ban it, many allow at most 10% of your activity there), Lobsters asks for under a quarter of your stories and comments and none in your first 70 days, and Show HN takes only things people can try, never landing or sign-up pages. Reddit specifics are in [gtm-reddit](../gtm-reddit/SKILL.md). Done when the top 3–5 places have a tailored listing draft; after launch, count the sign-ups each brought.

## 6. Launch day

Keep the launch in one post so every quote points to the same place; X shows one post per conversation ([gtm-x](../gtm-x/SKILL.md)). Line up a thunderclap on X: founders, friends and partners post at one set time. On Product Hunt, ask people to try it and leave feedback, never to upvote, because Product Hunt removes launches that ask for or reward upvotes. On Hacker News, ask people only to try it, because HN forbids asking anyone to upvote or comment and penalises submissions that do. Anchor the launch on the platform or ecosystem the product builds on, and use integrations as the onboarding story. Name owners before posting: one for product questions, one for business follow-ups.

Draft answers where each question was asked: under the post, its quotes, and creators' posts. Propose a DM only when someone said something it answers; check their profile first. A like alone is no reason.

Ready when: one claim with evidence, angles matched to briefed people with access, both owners named, and a clear way to try the product.

## 7. After

Log recurring questions, objections, bugs and surprise use cases in `.gtm/launch.md` with links, the answer given and an owner. Log what people did ("it missed two of last month's invoices"), not compliments, because only past specifics are evidence (Fitzpatrick, *The Mom Test*). Repeated questions become FAQ entries and landing copy; confusing features get a walkthrough; fixes get a reply to whoever asked. Feature someone's demo only with permission and credit.

Judge angles and people by trials, relevant DMs and sales calls, not views, because views are vanity metrics that guide no decision (Ries); when a prospect's source is unclear, ask them. Bring back the people who started useful conversations with something new: a deeper walkthrough, a customer case, an update. One launch agency (0xfJuan) does this within 1–2 weeks. Give the use case buyers keep raising more room in the next demo and on the landing page.

## Day-zero week

Kunal Gandhi's order of work for a product with no marketing yet, a playbook with no reported outcomes:

| Day | Work |
| --- | --- |
| 1 | Answer: what we do, what problem we solve, which category we compete in, why we are better, who exactly it is for. Any blank is a question for the user. |
| 2 | Plan goal, audience, creative and channel; map three pillars ("What we build", "Why now", "Who it's for"); check them with the people building the product. |
| 3 | Draft 3 posts from screenshots, mockups or a Loom demo, such as "We're building X for Y. Early testers wanted." |
| 4 | Ecosystem anchor and thunderclap, as in step 6. |
| 5 | Social proof: integrations, quoted user replies, the feedback loop. |
| 6 | Ship something people can click or join: a waitlist, leaderboard or beta. |
| 7 | A recap thread on what worked, what didn't, what's next, tagging who helped. |

Positioning comes first because the market a product claims sets the context buyers judge it by (Dunford), and marketing starts in week one because traction work runs in parallel with product (*Traction*'s 50% rule). After week one, keep the weekly recap and review numbers weekly. Build community in two phases, onboard and listen, then activate and reward, with Discord or Telegram for depth and X for reach.

## Places

A menu from two practitioners' lists, not a checklist. Both authors sell launch or backlink services.

- **Reddit**: the subreddits in [gtm-reddit](../gtm-reddit/SKILL.md#pick-subreddits)
- **Communities**: Indie Hackers, Hacker News, Lobsters, DEV, Hashnode, Devpost, StackShare, freeCodeCamp Forum, Elpha, NoCodeFounders, the Indie Hackers and SaaS Community Discords, LinkedIn and Facebook groups
- **Launch sites**: Product Hunt (no hunter needed; link straight to the product), BetaPage, Launching Next, MicroLaunch, Tiny Startups, Uneed, Fazier, DevHunt (developer tools), Peerlist
- **Directories**: AlternativeTo, SaaSHub, G2, Capterra, TrustRadius, LibHunt and OpenAlternative (open source), AppSumo (a marketplace)
- **AI directories**: Futurepedia, There's An AI For That, Future Tools, AI Agent Store

Google lists low-quality directory links, excessive link exchanges and automated link creation as link spam, and reciprocal-badge listings can count. Use these lists for discovery, fill every profile properly, and leave backlink work to [seo-links](../seo-links/SKILL.md).

## Sources

- [Paul Graham, *Do Things That Don't Scale* (2013)](https://paulgraham.com/ds.html)
- [Jonah Berger and Katherine Milkman, *What Makes Online Content Viral?* (2012)](https://journals.sagepub.com/doi/10.1509/jmr.10.0353)
- [Meta Foresight: Capturing Attention in Feed (2016)](https://www.facebook.com/business/news/insights/capturing-attention-feed-video-creative)
- [Simone Wies, Alexander Bleier and Alexander Edeling, *Finding Goldilocks Influencers* (2023)](https://www.ama.org/2022/10/11/finding-goldilocks-influencers-why-high-follower-count-may-not-be-the-best-driver-of-engagement-on-social-media/)
- [Gabriel Weinberg and Justin Mares, *Traction* (2014), chapters 1–3](https://leananalyticsbook.com/wp-content/uploads/2014/08/Traction-1-3.pdf)
- [Eric Ries, *Vanity Metrics vs. Actionable Metrics* (2009)](https://tim.blog/2009/05/19/vanity-metrics-vs-actionable-metrics/)
- [Rob Fitzpatrick on *The Mom Test*, The Learning Leader](https://learningleader.com/robfitzpatrick/)
- [April Dunford, *Obviously Awesome: a product positioning exercise* (2016)](https://hackernoon.com/obviously-awesome-a-product-positioning-exercise-604e8ced841e)
- [FTC: Disclosures 101 for Social Media Influencers](https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers)
- [Product Hunt: How to promote your launch and what to avoid](http://help.producthunt.com/en/articles/17734384-5-how-to-promote-your-launch-and-what-to-avoid)
- [Hacker News: Show HN guidelines](https://news.ycombinator.com/showhn.html)
- [Hacker News: FAQ](https://news.ycombinator.com/newsfaq.html)
- [Reddit Help: How do I keep spam out of my community?](https://support.reddithelp.com/hc/en-us/articles/28012014962580-How-do-I-keep-spam-out-of-my-community)
- [Lobsters: About](https://lobste.rs/about)
- [Google Search Central: Spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
- [xai-org/x-algorithm: `dedup_conversation_filter.rs`](https://github.com/xai-org/x-algorithm/blob/main/home-mixer/filters/dedup_conversation_filter.rs)
- [@mattepstein: the "why do I care" filter, quotes over retweets](https://x.com/mattepstein/status/2117351855856779486)
- [@0xfJuan: quote angles, creator briefs, the second wave](https://x.com/0xfJuan/status/2114746175026798821)
- [@kunalvg: thunderclaps and a seven-day plan for a day-0 project](https://x.com/kunalvg/status/1985573315830772193)
- [@solyatic: 50 places to get your first 100 users](https://x.com/solyatic/status/2117540123294171201)
- [@2whazzuup: 200 directories, launch platforms and communities](https://x.com/2whazzuup/status/2119247229601062993)
