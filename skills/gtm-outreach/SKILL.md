---
name: gtm-outreach
description: Find people who posted the problem and draft a reply, email or DM for each, with a send link.
disable-model-invocation: true
---

# Outreach

Find people who publicly described the problem the product solves, and hand the user a drafted message for each, with a link that sends it. Scouts search in parallel; you verify, draft, and post only when asked. Every message clears one bar: the recipient is glad to get it even if they never click the link.

Part of [gtm](../gtm/SKILL.md): it requires its copy sheet (`.gtm/copy.md`), and its boundaries apply here.

## 1. Send scouts

Launch three scouts in one turn as T3 `delegate_task` children: model `claude-sonnet-5-5`, `{ "effort": "high" }`, on a `claudeAgent` instance that `orchestrator_capabilities` reports can run child tasks. Sonnet suits reading many fresh pages.

| Scout | Direction |
| --- | --- |
| communities | Reddit, Hacker News, Stack Exchange, forums, and the Discord or Slack servers the audience uses |
| social | X, Bluesky, Mastodon, LinkedIn, YouTube and blog comments |
| buyers | Issues on adjacent or competing tools, "alternatives to" threads, review sites, businesses with a published contact |

Each scout's brief is [scout-prompt.md](references/scout-prompt.md):

```markdown
You are a subagent. Don't run memo. You are read-only: search and read, never post, message, sign up, or edit files.

Read <absolute path to references/scout-prompt.md> in full first; it is your brief.

- Direction: <scout row from the table>
- Copy sheet: <absolute path to .gtm/copy.md>
- Already contacted: <absolute path to .gtm/leads.md, or "none">
- Window: <default 90 days>
```

End your turn after launching. Done when all three have reported; relaunch a failed scout once. Draft nothing before that.

## 2. Verify

Open every lead yourself. Keep it only when the quote is at the URL, by that author, inside the window; the thread shows the problem unsolved; the venue's rules allow mentioning a product; and the person is not already in `.gtm/leads.md`. Rank explicit requests for a tool above complaints, direct matches above adjacent ones, recent above old. Done when every lead is kept or dropped.

## 3. Draft

Write every draft yourself, in the user's first person, following [Drafting rules](#drafting-rules) and [Length limits](#length-limits). For Mia, write in her voice per [talk-like-mia](../talk-like-mia/SKILL.md). Attach the send link for the channel:

| Channel | Send link |
| --- | --- |
| Email | `mailto:<address>?subject=<encoded>&body=<encoded>` |
| X reply | `https://x.com/intent/tweet?in_reply_to=<post id>&text=<encoded draft>` |
| Elsewhere | Permalink to the post to reply to |

Done when every kept lead has a draft and a send link.

## 4. Hand back

Append each lead to `.gtm/leads.md`: status `drafted`, date, venue, author, URL, quote, draft, send link. In chat, list the 3–5 best spaces with their self-promotion rules, then the leads in rank order:

```markdown
### 1. r/selfhosted · u/quietfox · 3 days ago
> Every backup tool I try wants a cloud account. I just want my NAS.

Draft text here.

[Reply on Reddit](https://www.reddit.com/r/selfhosted/comments/…)
```

Ask which leads the user posts and which the agents post, then follow [Posting rules](#posting-rules).

## Drafting rules

- Open on a detail only their post contains, and help first, even when the answer is not the product. Generic AI-written "personalised" first lines score badly: one practitioner's cheat sheet puts them at 0.27% replies.
- Then offer the product and state the relationship ("I make X"). One link, to the copy-sheet page matching their problem.
- Claims come from the copy sheet only; anything else becomes a question for the user.
- Every email ends with a one-line opt-out. A reply word ("reply 'no thanks' and I won't write again") satisfies the US CAN-SPAM Act; EU and UK law, and Gmail and Yahoo bulk-sender rules (one-click unsubscribe above 5,000 messages a day), can require more. Check the recipient's country and the user's volume, and honour every opt-out.
- Follow-ups go out only when the user asks. Make them a short bump on the same thread (one cheat sheet's fourth follow-up is "Hi John???"), and draft a reply to any interested answer at once: the same sheet says to answer within 5 minutes.

## Length limits

| Message | Limit |
| --- | --- |
| Public reply | 2–4 sentences |
| Email | Under 120 words, with a subject naming their post |
| Email to a Microsoft-hosted address | Under 40 words, because one practitioner reports Microsoft-hosted prospects reply about 6.5 times less often than Google Workspace ones |

LinkedIn DMs follow [gtm-linkedin](../gtm-linkedin/SKILL.md#dms-from-competitors-ads), and Reddit replies follow [gtm-reddit](../gtm-reddit/SKILL.md) on top of these rules.

## Posting rules

Agents post only the leads the user names, through a tool already signed in as the user: `gh` per [gh-comment](../gh-comment/SKILL.md), the Discord MCP, or a logged-in browser. Everything else, including venues that ban AI-written posts and every LinkedIn message, stays with the user. Read each community's pinned rules first. Post at most one link per community per day, even where the rules allow more, because consecutive link posts trip anti-spam auto-bans. Confirm each post is live and record its URL as `posted`. Stop all posting on any removal, warning, or rate limit.

## Cold email campaigns

When the user runs an email campaign of their own, read its numbers before rewriting anything, because each failure pattern points at one part. These are one practitioner's rules of thumb, without data behind them:

| Symptom | Cause | Fix |
| --- | --- | --- |
| 0 replies, 0 bounces | Landing in spam | Fix the sending setup first, and turn off open tracking: its pixel hurts inbox placement |
| Replies, no interest | The offer | Change what is offered |
| Bounces over 2% | The list | Clean or replace the list |

One lead per 300 contacts is a great campaign and one per 500 is solid, so 2–3 leads from 1,000 contacts is working.

## Do the work first

To win a partner or a client, send finished work instead of a pitch: their real input run through the product, or 10 posts written for them. Close with: try it; if it helps, let's do more, or give me a testimonial. The fallback still earns proof for the next prospect. If the message gets no answer and the user asks for a second try, draft a public post of the work that tags them.

Pick partners by fit, not reach. Shortlist creators under about 100,000 followers who regularly get more views than they have followers, with 2 or more breakouts, then check that their commenters look like the buyer. Drop accounts that are mostly paid posts. Record handle, link, followers, typical views, best video, commenter match and why they fit in `.gtm/creators.md`. Reaching out stays with the user.
