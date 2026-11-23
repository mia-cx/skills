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

- Open on a detail only their post contains, and help first, even when the answer is not the product. Real personalisation pays: in Backlinko's study of 12 million outreach emails, personalised bodies got 32.7% more replies. A generic AI-written "personalised" first line is not that; one practitioner's cheat sheet puts those at 0.27% replies.
- Then offer the product and state the relationship ("I make X"). One link, to the copy-sheet page matching their problem.
- Claims come from the copy sheet only; anything else becomes a question for the user.
- Every email ends with a one-line opt-out and the user's postal address. The US CAN-SPAM Act covers all commercial email, B2B included: it accepts a reply-based opt-out ("reply 'no thanks' and I won't write again"), and also requires a valid physical postal address (a registered PO box counts), a plain signal that the message is a promotion, and honouring opt-outs within 10 business days. Gmail and Yahoo require one-click unsubscribe from bulk senders; Gmail counts anyone who has sent close to 5,000 messages to personal Gmail accounts in one day as a bulk sender permanently.
- In the UK, marketing email to individuals and sole traders needs their prior consent (PECR), so reach them by public reply instead; company addresses may be emailed with an opt-out. EU countries set their own rules, so check before emailing anyone there. Honour every opt-out.
- Follow-ups go out only when the user asks. Make them a short bump on the same thread (one cheat sheet's fourth follow-up is "Hi John???"), because in Backlinko's study one follow-up lifted replies 65.8%. Draft a reply to any interested answer at once: the same cheat sheet says within 5 minutes, and research on inbound sales leads found most companies answer far too slowly (Oldroyd, McElheran and Elkington).

## Length limits

| Message | Limit |
| --- | --- |
| Public reply | 2–4 sentences |
| Email | Under 120 words, with a subject naming their post |
| Email to a Microsoft-hosted address | Under 40 words, because one practitioner reports Microsoft-hosted prospects reply about 6.5 times less often than Google Workspace ones; no public data confirms it |

LinkedIn DMs follow [gtm-linkedin](../gtm-linkedin/SKILL.md#dms-from-competitors-ads), and Reddit replies follow [gtm-reddit](../gtm-reddit/SKILL.md) on top of these rules.

## Posting rules

Agents post only the leads the user names, through a tool already signed in as the user: `gh` per [gh-comment](../gh-comment/SKILL.md), the Discord MCP, or a logged-in browser. Everything else, including venues that ban AI-written posts and every LinkedIn message, stays with the user. Read each community's pinned rules first. Post at most one link per community per day, even where the rules allow more, because platforms count repeated similar posts as spam (Reddit's spam rules name it) and many communities cap self-promotion. Confirm each post is live and record its URL as `posted`. Stop all posting on any removal, warning, or rate limit.

## Cold email campaigns

When the user runs an email campaign of their own, check the sending setup before rewriting anything, because nobody reads copy that lands in spam. Gmail and Yahoo require SPF or DKIM from every sender and a spam-complaint rate under 0.3% (Google recommends under 0.1%); above 5,000 messages a day, Gmail, Yahoo and Outlook also require SPF, DKIM and DMARC with an aligned From domain. Ignore open rates and switch open tracking off, because Apple Mail loads tracking pixels whether or not anyone opens the email.

Then read the numbers, because each failure pattern points at one part. These are one practitioner's rules of thumb, without data behind them:

| Symptom | Cause | Fix |
| --- | --- | --- |
| 0 replies, 0 bounces | Landing in spam | Fix the sending setup above |
| Replies, no interest | The offer | Change what is offered |
| Bounces over 2% | The list | Clean or replace the list |

The same practitioner calls one lead per 300 contacts a great campaign and one per 500 solid, so 2–3 leads from 1,000 contacts is working. For scale, Backlinko's 2019 study found 8.5% of outreach emails got any reply.

## Do the work first

To win a partner or a client, send finished work instead of a pitch: their real input run through the product, or 10 posts written for them. People return what they received first, most when it is personal and unexpected (Cialdini on reciprocity). Close with: try it; if it helps, let's do more, or give me a testimonial. The fallback still earns proof for the next prospect. Keep the sample small, say plainly they may use it, and drop anyone who declines, because unrequested work risks being used for free and lacks the research a paid job gets (AIGA on spec work). If the message gets no answer and the user asks for a second try, draft a public post of the work that tags them.

Pick partners by fit, not reach, because engagement with sponsored posts peaks at mid-sized accounts rather than the biggest (Wies, Bleier and Edeling). Shortlist creators under about 100,000 followers (one practitioner's cut-off) who regularly get more views than they have followers, with 2 or more breakouts, then check that their commenters look like the buyer. Drop accounts that are mostly paid posts. Record handle, link, followers, typical views, best video, commenter match and why they fit in `.gtm/creators.md`. Reaching out stays with the user.

## Sources

- [Brian Dean with Pitchbox, *We Analyzed 12 Million Outreach Emails* (Backlinko, 2019)](https://backlinko.com/email-outreach-study)
- [James Oldroyd, Kristina McElheran and David Elkington, *The Short Life of Online Sales Leads* (HBR, 2011)](https://scholarsarchive.byu.edu/facpub/9711/)
- [Robert Cialdini: the principles of persuasion](https://www.influenceatwork.com/7-principles-of-persuasion/)
- [Simone Wies, Alexander Bleier and Alexander Edeling, *Finding Goldilocks Influencers* (2023)](https://www.ama.org/2022/10/11/finding-goldilocks-influencers-why-high-follower-count-may-not-be-the-best-driver-of-engagement-on-social-media/)
- [FTC: CAN-SPAM Act compliance guide for business](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business)
- [Google: Email sender guidelines](https://support.google.com/a/answer/81126)
- [Google: Email sender guidelines FAQ](https://support.google.com/a/answer/14229414)
- [ICO: Electronic mail marketing (PECR)](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/electronic-and-telephone-marketing/electronic-mail-marketing/)
- [Yahoo: Sender best practices](https://senders.yahooinc.com/best-practices/)
- [Microsoft: Outlook's new requirements for high-volume senders (2025)](https://techcommunity.microsoft.com/blog/microsoftdefenderforoffice365blog/strengthening-email-ecosystem-outlook%E2%80%99s-new-requirements-for-high%E2%80%90volume-senders/4399730)
- [Apple: Mail Privacy Protection](https://www.apple.com/legal/privacy/data/en/mail-privacy-protection/)
- [Reddit Help: How do I keep spam out of my community?](https://support.reddithelp.com/hc/en-us/articles/28012014962580-How-do-I-keep-spam-out-of-my-community)
- [AIGA: Position on spec work](https://www.aiga.org/resources/aiga-position-on-spec-work)
- [@coldemailchris: the cold email cheat sheet](https://x.com/coldemailchris/status/2119415642202034427)
- [@thedankoe: the permissionless apprentice approach](https://x.com/thedankoe/status/2117664712532123680)
- [@dsqjaffa: Creator Scout bot](https://x.com/dsqjaffa/status/2119160045263077664)
