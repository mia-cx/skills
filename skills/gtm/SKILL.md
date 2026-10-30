---
name: gtm
description: Use when the user asks for go-to-market work: finding people who have the problem a product solves, drafting cold emails, replies, or community posts to them, planning organic social content, or planning a launch.
---

# GTM

Find people who have publicly described the problem the product solves, and hand the user a ready-to-send message for each one, with a one-click place to send it. Scouts search in parallel; you verify every lead, write every draft, and post only when the user asks.

The bar for every message: the recipient would be glad to get it even if they never click the link. That bar is what separates outreach from spam, and it decides every edge case below.

## 1. Ground the product

Read the project's `DIRECTION.md` and the live website. Write the copy sheet to `.gtm/copy.md` in the product repo:

- The product's name, the problem it solves in one sentence, and who has that problem.
- Every claim a message may make, quoted verbatim from the live site with its URL. Include pricing and plan limits when the site states them.
- 10–15 phrasings people use when they have the problem: questions ("is there a tool that…"), complaints ("sick of…"), and competitor names with "alternative".

Add `.gtm/` to the repo's `.git/info/exclude`, because the ledger holds names and quotes of real people and must never be committed. Ask the user only when the site leaves the audience or the problem unclear. Done when every claim on the sheet links to the page it came from.

## 2. Send scouts

Launch all three scouts in one turn, following the delegation rules in `~/.agents/AGENTS.md`: in T3, each is a `delegate_task` child with model `claude-sonnet-5-5` and `{ "effort": "high" }`, on whichever `claudeAgent` instance `orchestrator_capabilities` reports can run child tasks. Sonnet fits because scouting reads lots of fresh pages.

| Scout | Direction |
| --- | --- |
| communities | Reddit, Hacker News, Stack Exchange, Discourse forums, niche forums, and the Discord or Slack communities the audience gathers in |
| social | X, Bluesky, Mastodon, LinkedIn, and comments on YouTube videos and blog posts |
| buyers | GitHub issues and discussions on adjacent or competing tools, "alternatives to" threads, review sites, and businesses or authors with a published contact route |

Each scout reads [references/scout-prompt.md](references/scout-prompt.md) from disk as its brief. The task carries only what varies:

```markdown
You are a subagent. Don't run memo. You are read-only: search and read, never post, message, sign up, or edit files.

Read <absolute path to references/scout-prompt.md> in full first; it is your brief.

- Direction: <scout name and its row from the table>
- Copy sheet: <absolute path to .gtm/copy.md>
- Already contacted: <absolute path to .gtm/leads.md, or "none">
- Window: <default 90 days>
```

Record each `taskId` and end your turn. Draft nothing until all three have reported or failed; relaunch a failed scout once.

## 3. Verify

Open every lead yourself. Keep it only when:

- the quoted words appear at the URL, written by the named author, inside the window;
- the thread does not show the problem already solved;
- the venue's rules allow a reply that mentions a product (cite the rule); and
- the person is not already in `.gtm/leads.md` under another channel. Each person gets one message.

Rank what remains: an explicit request for a tool beats a complaint, a direct match beats an adjacent one, and recent beats old.

## 4. Draft

Write every draft yourself in the user's first-person voice, so the batch reads as one person.

- Open on a detail only their post contains. Help first: answer the question or offer the workaround, even when the answer is not the product.
- Then offer the product as one option and state the relationship plainly ("I make X"). Link once, to the copy-sheet page that matches their problem.
- Product claims come from the copy sheet only. A claim the sheet lacks becomes a question for the user.
- Match the venue's register. Replies run 2–4 sentences. Emails stay under 120 words, with a subject naming their post and a one-line opt-out.

Each draft gets a send link the user can click:

| Channel | Send link |
| --- | --- |
| Email | `mailto:<address>?subject=<encoded>&body=<encoded>` |
| X reply | `https://x.com/intent/tweet?in_reply_to=<post id>&text=<encoded draft>` |
| Everything else | Permalink to the post or comment to reply to |

## 5. Hand back

Append every lead to `.gtm/leads.md` with status `drafted`, date, venue, author, URL, quote, draft, and send link. In chat, list the 3–5 best spaces with their self-promotion rules, then the leads in rank order:

```markdown
### 1. r/selfhosted · u/quietfox · 3 days ago
> Every backup tool I try wants a cloud account. I just want my NAS.

Draft text here.

[Reply on Reddit](https://www.reddit.com/r/selfhosted/comments/…)
```

Close by asking which leads the user will post and which the agents should post.

## Organic content

When the user asks for a content plan or social posts, or the leads show many people describing the same problem, read [references/organic.md](references/organic.md). Run the scouts first when no recent leads exist, because the plan is built from their evidence.

## Launch

When the user is planning a launch or announcement, read [references/launch.md](references/launch.md). It reuses the scouts' leads and niche accounts to choose who shares the launch.

## Posting

Agents post only the leads the user names ("all" counts). Post with a tool already authenticated as the user: `gh` for GitHub, following [gh-comment](../gh-comment/SKILL.md); the Discord MCP; a logged-in browser. Leads without such a tool, and venues that ban AI-written posts, stay with the user.

Post at most 3 messages per venue per day, because bursts read as spam and trip moderation filters. Open each posted message to confirm it is live, then record its URL and status `posted` in the ledger. Stop all posting on any removal, warning, or rate limit, and report it.

## Boundaries

- Reach only people who described the problem in public, through a public reply or a contact route they published for business. Never guess, scrape, or buy an email address.
- Always disclose the relationship to the product. Never post as a satisfied customer, a neutral third party, or a sock puppet.
- One message per person. Follow-ups happen only when the user asks for them.
