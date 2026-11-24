---
name: gtm-x
description: Grow an account on X by writing for what the For You feed rewards.
disable-model-invocation: true
---

# Growing on X

Part of [gtm](../gtm/SKILL.md): its copy sheet and boundaries apply here.

Grow the user's reach on X by writing for what the For You feed rewards: shares and replies, one interest community, and an account that stays clear of the visibility labels. The mechanics below come from X's open-source feed code ([xai-org/x-algorithm](https://github.com/xai-org/x-algorithm), read on 21 Nov 2026) and one creator's reading of it ([Ryan, Nov 2026](https://x.com/ryangrowthh/status/2117684231983800732)). Parts of the system are closed and X changes parameters without notice, so aim at what the code rewards, sharing and conversation, rather than one exact number. Drafts follow [gtm-writing](../gtm-writing/SKILL.md), in the user's voice (for Mia, [talk-like-mia](../talk-like-mia/SKILL.md)), and the user approves each before it goes out.

## How the feed picks posts

Each feed refresh passes three stages:

1. **Find.** Retrieval narrows millions of posts to a few thousand candidates (by default up to 1,200 from followed accounts and 1,000 from Phoenix).
2. **Score.** For each post and viewer, a model predicts the chance of each action (like, reply, share, follow, mute and so on), multiplies each by a weight and adds them up. It reads the viewer's last ~1,000 engagements (sequence length 1,024), so per-viewer gaming is out of reach.
3. **Filter.** Posts older than 48 hours, already seen, or from blocked or muted accounts drop out, as do reposts and replies from accounts the viewer doesn't follow. A separate visibility system drops posts carrying spam or safety labels.

Candidates come from four sources:

| Source | Pulls |
| --- | --- |
| Thunder | Recent posts from accounts the viewer follows |
| Phoenix | Posts from accounts the viewer doesn't follow, matched to their engagement history |
| SimClusters | Posts popular in the interest communities the viewer belongs to |
| Popular Posts | A shared list of popular recent posts |

Followed and unfollowed candidates are ranked together, but posts from accounts the viewer doesn't follow are multiplied by a discount below 1, so followers are the surest audience. Phoenix drives broad virality; SimClusters drives virality inside one community, which it finds from overlapping clusters in the follow graph (Satuluri et al., *SimClusters*). Hence:

- **One idea per post, one topic per account.** Mixed topics confuse which community a post belongs to. Name the one interest community the user wants to be placed in, and check drafts against it.
- **One self-contained post per launch.** X keeps only the highest-scoring post per conversation, so a launch spread over five tweets reaches non-followers through one at most. Put everything a stranger needs in the main post; [gtm-launch](../gtm-launch/SKILL.md) covers what goes in it.
- **48 hours per post.** A post makes or misses its reach in two days. For accounts with up to 50,000 followers, an original post (not a reply or repost) under 2 hours old with fewer than 200 Home impressions is eligible for an experimental cold-start lift, which X gives to at most one eligible post per feed request, so it is a chance at reach rather than a guaranteed boost. Follower count isn't scored, so big accounts get no guaranteed reach.

## What the score rewards

Production default weights per predicted action, 21 Nov 2026:

| Positive | Weight | Negative | Weight |
| --- | --- | --- | --- |
| Share via copy link | 20 | Not dwelled (scrolled past) | −0.02 |
| Reply, quote, share via DM | 5 | Block author | −31.2 |
| Follow author | 4 | Not interested | −53.07 |
| Share | 2.118 | Mute author | −58.8 |
| Repost | 1 | Report | −234 |
| Like | 0.708 | | |
| Click into post | 0.274 | | |
| Open link | 0.2 | | |
| Dwell, photo expand | 0.05 | | |
| Profile click, video quality view | 0 | | |

Each weight multiplies one viewer's predicted probability of that action, not a count of actions, so a weight ratio is no exchange rate between likes and shares. X's code calls reading it that way "incorrect": negative weights are large because those actions are rare, and mass blocking or reporting mainly changes what viewers similar to the blockers see. A post people are likely to share or answer outranks one they'd only like; a post viewers are likely to mute sinks for them. Profile clicks weigh 0, so posts built to send people to a profile gain nothing from it. The like weight has moved from 0.5 in August (Ryan's reading) to 0.708 in November 2026; re-check `home-mixer/params/param.rs` before building a tactic on one exact number.

Write for shares and replies:

- Give people a reason to send the link to someone or add their own take, because content that is useful, surprising or awe-inspiring gets shared more (Berger & Milkman, "What Makes Online Content Viral?"). Anger spreads too, but on X it also earns mutes and blocks. For each draft, write one line on why someone would forward it or reply; rewrite drafts with a weak answer.
- Ryan's practice: draw on the user's experience, network and job, because that insight can't be copied; make posts easy to scan and forward; credit others and use X's native image and video; try each format X is pushing (articles, threads, media); for video, invest in camera, mic and lighting.

## Account reputation

Who engages matters more than how many follow. For original posts from accounts the viewer mutually follows, X adds 15 to the base reply weight (the bidirectional follow boost, since July 2026); replies and reposts don't get it. SimClusters places the account by who engages with it.

- Build the network by engaging genuinely with people in the niche, so mutual follows form there.
- Keep the user out of engagement groups. X's authenticity policy bans coordinating to exchange likes, replies, reposts or follows, and X's code ignores engagement on posts opened outside the Home feed, as from a group chat.
- Keep the user's posts their own. X runs models that read an account's actions over time for signs of inauthentic behaviour. You draft; the user edits and posts.
- Mute or block trolls instead of arguing, and keep away from content that draws blocks and reports. X labels accounts from blocks, reports and spam reports relative to likes, and labels limit the account or single posts.
- Suggest Premium if the user wants it: X Help lists reply prioritisation among its features, and ID verification comes with it.
- Ask the user to check X's [Under the Hood](https://x.com/i/jf/under_the_hood) tool, which shows the visibility-limiting labels on the account and its posts, and to report what it says, even "none".

## A daily article routine

One founder reached 5,000 followers in 5 months with this recipe. Treat it as one person's result to test:

- One topic. Build in public, share real numbers, lead with proof.
- One long article a day, written to be bookmarked, on fresh trends, giving everything away.
- 2–3 short posts a day that quote the article or share one idea from it; ask someone who genuinely finds it useful to quote it too.
- Package each article as one story across cover, title and first line: copy the cover styles of winning articles, add screenshots as proof, and put a number in the first line, because numerals catch scanning readers' eyes (Nielsen, NN/g eyetracking). Keep promises specific: numbers, names and timeframes.
- Links in the body are a common worry, but opening a link carries a small positive weight (0.2) and the published scoring has no link penalty. Include one when it helps the reader, and compare.

X multiplies each further post by the same author in one viewer's feed by a decaying factor, so more posts compete with each other. Give each post its own job, such as sending people to the day's article. Watch reach per post rather than total reach: when adding posts makes each reach fewer people, cut back to the ones that pull.

## Iterate

When metrics are available, review them weekly: make more versions of clear outliers, and retire formats that underperform across several posts.

## Sources

- [xAI: X For You feed algorithm (GitHub)](https://github.com/xai-org/x-algorithm)
- [xAI: production weights and how to read them, `param.rs` (GitHub)](https://github.com/xai-org/x-algorithm/blob/main/home-mixer/params/param.rs)
- [xAI: bidirectional follow boost change (GitHub)](https://github.com/xai-org/x-algorithm/blob/main/docs/BIDIRECTIONAL_BOOST_CHANGE.md)
- [Satuluri et al., *SimClusters: Community-Based Representations for Heterogeneous Recommendations at Twitter* (2020)](https://dl.acm.org/doi/10.1145/3394486.3403370)
- [Jonah Berger and Katherine L. Milkman, *What Makes Online Content Viral?* (2012)](https://journals.sagepub.com/doi/10.1509/jmr.10.0353)
- [Jakob Nielsen, *Show Numbers as Numerals When Writing for Online Readers* (2007)](https://www.nngroup.com/articles/web-writing-show-numbers-as-numerals/)
- [X Help: Authenticity policy](https://help.x.com/en/rules-and-policies/authenticity)
- [X Help: About X Premium](https://help.x.com/en/using-x/x-premium)
- [@ryangrowthh: how the X algorithm finds, scores and filters posts](https://x.com/ryangrowthh/status/2117684231983800732)
- [@NicholasDulait: 5,000 followers in 5 months with daily articles](https://x.com/NicholasDulait/status/2119431609472397409)
