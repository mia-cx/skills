---
name: gtm
description: Use when the user asks for go-to-market work: finding people who have the problem a product solves, drafting cold emails, replies, or community posts to them, planning organic social content, or planning a launch.
---

# GTM

Find people who publicly described the problem the product solves, and hand the user a drafted message for each, with a link that sends it. Scouts search in parallel; you verify, draft, and post only when asked.

Every message clears one bar: the recipient is glad to get it even if they never click the link.

## 1. Ground the product

Read `DIRECTION.md` and the live website, then write `.gtm/copy.md` in the product repo:

- The product, the problem it solves in one sentence, and who has it.
- Every claim a message may make, quoted verbatim from the site with its URL.
- 10–15 phrasings of the problem as people write it: questions, complaints, "<competitor> alternative".

Add `.gtm/` to `.git/info/exclude`: the ledger holds real people's names and quotes. Ask the user only when the site leaves audience or problem unclear.

## 2. Send scouts

Launch three scouts in one turn as T3 `delegate_task` children: model `claude-sonnet-5-5`, `{ "effort": "high" }`, on a `claudeAgent` instance that `orchestrator_capabilities` reports can run child tasks. Sonnet suits reading many fresh pages.

| Scout | Direction |
| --- | --- |
| communities | Reddit, Hacker News, Stack Exchange, forums, and the Discord or Slack servers the audience uses |
| social | X, Bluesky, Mastodon, LinkedIn, YouTube and blog comments |
| buyers | Issues on adjacent or competing tools, "alternatives to" threads, review sites, businesses with a published contact |

```markdown
You are a subagent. Don't run memo. You are read-only: search and read, never post, message, sign up, or edit files.

Read <absolute path to references/scout-prompt.md> in full first; it is your brief.

- Direction: <scout row from the table>
- Copy sheet: <absolute path to .gtm/copy.md>
- Already contacted: <absolute path to .gtm/leads.md, or "none">
- Window: <default 90 days>
```

End your turn after launching. Draft nothing until all three have reported; relaunch a failed scout once.

## 3. Verify

Open every lead yourself. Keep it only when the quote is at the URL, by that author, inside the window; the thread shows the problem unsolved; the venue's rules allow mentioning a product; and the person is not already in `.gtm/leads.md`. Rank explicit requests for a tool above complaints, direct matches above adjacent ones, recent above old.

## 4. Draft

Write every draft yourself, in the user's first person.

- Open on a detail only their post contains, and help first, even when the answer is not the product.
- Then offer the product and state the relationship ("I make X"). One link, to the copy-sheet page matching their problem.
- Claims come from the copy sheet only; anything else becomes a question for the user.
- Replies run 2–4 sentences. Emails stay under 120 words, with a subject naming their post and a one-line opt-out.

| Channel | Send link |
| --- | --- |
| Email | `mailto:<address>?subject=<encoded>&body=<encoded>` |
| X reply | `https://x.com/intent/tweet?in_reply_to=<post id>&text=<encoded draft>` |
| Elsewhere | Permalink to the post to reply to |

## 5. Hand back

Append each lead to `.gtm/leads.md`: status `drafted`, date, venue, author, URL, quote, draft, send link. In chat, list the 3–5 best spaces with their self-promotion rules, then the leads in rank order:

```markdown
### 1. r/selfhosted · u/quietfox · 3 days ago
> Every backup tool I try wants a cloud account. I just want my NAS.

Draft text here.

[Reply on Reddit](https://www.reddit.com/r/selfhosted/comments/…)
```

Ask which leads the user posts and which the agents post.

## Posting

Agents post only the leads the user names, through a tool already signed in as the user: `gh` per [gh-comment](../gh-comment/SKILL.md), the Discord MCP, or a logged-in browser. Everything else, including venues that ban AI-written posts, stays with the user. Post at most 3 per venue per day, because bursts trip spam filters. Confirm each post is live and record its URL as `posted`. Stop all posting on any removal, warning, or rate limit.

## Boundaries

- Reach people only through a public reply or a contact route they published. Never guess, scrape, or buy an address.
- Always disclose the relationship to the product; never pose as a customer or a neutral third party.
- One message per person, and follow-ups only when the user asks.

## Beyond outreach

- Content plan or social posts, or many leads sharing one problem: read [references/organic.md](references/organic.md).
- A launch or announcement: read [references/launch.md](references/launch.md).

Both build on the scouts' leads, so run the scouts first when none are recent.
