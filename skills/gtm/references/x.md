# Growing on X

Grow the user's reach on X by writing for what the For You feed rewards: shares and replies, one interest community, and an account reputation that keeps posts out of the filters. The mechanics below come from one creator's reading of X's open-source ranking code ([Ryan, Nov 2026](https://x.com/ryangrowthh/status/2117684231983800732)). They're unofficial, parts of the system are closed, and X changes the weights without notice, so aim at what the system serves: keeping people on X, sharing and talking. Drafts follow [writing.md](writing.md), in the user's voice (for Mia, [talk-like-mia](../../talk-like-mia/SKILL.md)), and the user approves each before it goes out.

## How the feed picks posts

Each feed refresh passes three stages:

1. **Find.** Retrieval pulls roughly 2,000+ candidate posts.
2. **Score.** For each post and viewer, a model predicts the chance of each action (like, reply, share, follow, mute and so on), multiplies each by a weight and adds them up. It reads mostly the viewer's last ~1,000 actions, so per-viewer gaming is out of reach.
3. **Filter.** Posts older than about 48 hours, already seen, from blocked or muted accounts, spam and low-reputation accounts drop out. Reposts and replies from accounts the viewer doesn't follow drop out too, and posts from non-followed accounts get a score discount.

Candidates come from four sources:

| Source | Pulls |
| --- | --- |
| Thunder | Recent posts from accounts the viewer follows and interacts with |
| Phoenix | Posts from accounts the viewer doesn't follow, matched to their interest profile |
| SimClusters | Posts liked by the interest community the viewer belongs to |
| Popular Posts | A small shared list of popular recent posts |

Followers via Thunder are round one, and reach stops there unless the ranking model scores the post well or other people quote it to their followers. Phoenix drives broad virality; SimClusters drives virality inside one community. Hence:

- **One idea per post, one topic per account.** Mixed topics confuse which community a post belongs to. Name the one interest community the user wants to be placed in, and check drafts against it.
- **One self-contained post per launch.** X shows one post per conversation, so a launch spread over five tweets reaches non-followers through one at most. Put everything a stranger needs in the main post; [launch.md](launch.md) covers what goes in it.
- **About 48 hours per post.** A post makes or misses its reach in two days. Small accounts get a boost on fresh posts, so the user should be around to reply in the first hour. Big accounts get no guaranteed reach.

## What the score rewards

Snapshot of the production weights per predicted action, as quoted on 30 Oct 2026:

| Positive | Weight | Negative | Weight |
| --- | --- | --- | --- |
| Share via copy link | 20 | Not dwelled (scrolled past) | −0.02 |
| Reply, quote, share via DM | 5 | Block author | −31.2 |
| Follow author | 4 | Not interested | −52.3 |
| Share | 2 | Mute author | −58.8 |
| Repost | 1 | Report | −234 |
| Like | 0.66 | | |
| Click into post | 0.3 | | |
| Open link | 0.2 | | |
| Dwell, photo expand | 0.05 | | |
| Profile click, video quality view | 0 | | |

A copied link is worth about 30 likes and a reply about 7.5. One mute cancels about 89 likes and one report about 355, so a few annoyed viewers wipe out hundreds of likes. Profile clicks earn nothing, so posts built to send people to a profile gain nothing from it. The like weight went from 0.5 to 0.66 between August and October 2026 unannounced; re-check the code before building a tactic on one exact number.

Write for shares and replies:

- Give people a reason to send the link to someone or add their own take. For each draft, write one line on why someone would forward it or reply; rewrite drafts with a weak answer.
- Draw on the user's experience, network and job, because that insight can't be copied.
- Make it easy to scan and forward. Credit others, and use X's native image and video.
- Try each format X is pushing: articles, threads, media, an article with a quote post.
- For video, the user's camera, mic and lighting matter.

## Account reputation

Each account carries a credibility score computed PageRank-style from who follows and engages with it, so engagement from well-connected accounts in the niche counts for more than a large follower count. It lifts or caps every post.

- Build the network by engaging genuinely with people in the niche. Engagement groups no longer have their old effect.
- Keep the user's posts their own. X tracks inauthentic behaviour over time, so an account where AI writes and posts everything risks a label. You draft; the user edits and posts.
- Mute or block trolls instead of arguing, and keep away from negative and political content. Being muted, blocked or reported cuts reach, and too many blocks and reports relative to likes can trigger a spam or inauthenticity label that limits the account or single posts.
- Suggest Premium, and ID verification if the user is comfortable with it.
- Ask the user to check X's transparency tool, which shows labels on the account and posts marked as spam, and to report what it says, even "none".

## A daily article routine

One founder reached 5,000 followers in 5 months with this recipe. Treat it as one person's result to test:

- One topic. Build in public, share real numbers, lead with proof.
- One long article a day, written to be bookmarked, on fresh trends, giving everything away.
- 2–3 short posts a day that quote the article or share one idea from it; get someone else to quote it too.
- Package each article as one story across cover, title and first line: copy the cover styles of winning articles, put a number in the first line, add screenshots as proof. Keep promises specific, because numbers, names and timeframes beat vague promises.
- Links in the body are a common worry, but opening a link carries a small positive weight (0.2). Include one when it helps the reader, and compare.

Posting volume has no published threshold, and X doesn't give every post a chance when an account floods. Give each post its own job, such as sending people to the day's article. Watch reach per post rather than total reach: when adding posts makes each reach fewer people, cut back to the ones that pull.

## Iterate

When metrics are available, review them weekly: make more versions of clear outliers, and retire formats that underperform across several posts.
