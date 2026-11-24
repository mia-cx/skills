---
name: marketing-agents-research-team
description: Run research bots that share one folder and send the user a weekly shortlist of content ideas.
disable-model-invocation: true
---

# Research team

Part of [marketing-agents](../marketing-agents/SKILL.md): its context and approval rules apply here.

Run narrow research bots on schedules that share one folder, with a head bot that sends the user a weekly shortlist of content ideas. Writing and posting stay with the user; drafts follow [gtm](../gtm/SKILL.md).

## Share one folder, not one chat

The bots talk only through files: each reads a shared brief, does one job on a schedule, and writes its own file; the head bot reads them all. Anthropic's research agents work this way, because work stored in files and passed by reference doesn't get lost in a chain of summaries. Put the folder at `.gtm/` in the product repo when the bots can reach it, so they share `copy.md`, `templates.md`, `voice.md` and `log.md` with gtm; otherwise use any folder every bot can read.

| File | Holds |
| --- | --- |
| `brief.md` | what the user sells, who buys, off-limits claims, the result wanted from content; link `copy.md` for claims when it exists |
| `outliers.md`, `niche.md`, `competitors.md`, `trends.md`, `comments.md` | one per research bot |
| `log.md` | what the user actually made, so ideas don't repeat |

Give every research bot these rules, and reuse them in any agent you build:

- Read free data before paying for searches.
- Stay silent on days with nothing new.
- Mark "why it worked" as opinion, because the data only shows that it did.
- Cite sample sizes, and call any pattern under 6 videos "early". Six is the prompt author's convention, not a statistical test; it guards against trusting small samples, which people do far too readily (Tversky and Kahneman, *Belief in the law of small numbers*).

## Wire it up

Use any agent tool that can reach the data, save a repeatable instruction and run on a schedule. The prompts come from a paid viral-video database's co-founder, with no results reported; `[data source]` is whatever the user's agent can reach: a data tool over MCP, Meta's public Ad Library, or hand exports. Ask for API keys through a private input.

For each bot: fill the brackets, run it once, correct the first draft with the user, save the corrected prompt as its charter, then schedule it. Add one or two a day, once the last one works:

1. Head of social and outlier finder.
2. Niche map.
3. Comment miner.
4. Trend radar and competitor watch.

Format teardowns, scripts and the weekly performance review are in [gtm-video](../gtm-video/SKILL.md#short-form).

## Head of social

```
JOB
Run my social research team and turn what the other bots find into a plan for my week. Writing and posting stay with me.

SET UP ONCE
- Look through [website] and [TikTok, Instagram, YouTube and X handles].
- Ask me questions, one per message, until you're clear on what I sell, who buys it, which claims are off limits, and the result I want from content: [calls, signups, sales].
- Save the answers to [folder]/brief.md for the other bots.
- If [data source] offers a saved weekly search, draft one for my niche: a one-line goal, 7 to 12 search phrases, terms to leave out, all 3 platforms. Hold it until I say yes.

MONDAYS, 9 A.M.
- Read the newest saved-search report, which costs nothing, and everything in [folder].
- Rate each idea out of 10 for fit, how easily I could shoot it this week, and whether it's new for us (see log.md).
- Send me your best 5 in one message: the idea, its source video, how far it outperformed, the format, its first line and a suggested day.

WEEKDAYS, 8 A.M.
A 5-line update: new finds, decisions for me, blockers.

DATA
Every number comes from [data source]. When the newest report hasn't landed, tell me and wait for it.
```

## Outlier finder

Finds videos that did far better than their creator's size. That hints the format did some of the work, but luck and timing can't be ruled out, and studying only winners makes risky choices look like the cause of success, because everyone who tried the same move and flopped is out of view (Denrell, *Vicarious learning, undersampling of failure, and the myths of management*). So the finder also pulls similar videos that flopped; if they exist, the format didn't do the work alone.

```
JOB
Spot the videos in my niche that took off for their size. Weekdays, 7 a.m.

STEPS
- Read brief.md.
- Open the outliers from my saved search first; they're free to read.
- Run a single search on [data source] for [topic]: TikTok and Instagram, past week, outliers only, [outlier score threshold], creators under [100,000] followers, [language]. One page.
- Drop paid posts and anything already in outliers.md.
- For each of the 5 you send, run one more search for the same hook or format with the same filters but without the outlier filter. One page. If [data source] can't return videos that did badly, say so; an empty result doesn't mean none flopped.

SEND ME 5, HIGHEST SCORE FIRST
- Link, creator, followers, views and score.
- First line, hook type and format.
- Your best guess at why it took off, marked as opinion.
- Up to 3 videos in my niche with the same hook or format that flopped, and what differs, or a note that [data source] can't show them.
- Whether my business could shoot it this week.

Add them to outliers.md. On a day with nothing new, stay silent.
```

## Niche map and competitor watch

The niche map (monthly) shows who owns the topic and which formats nobody does well. Competitor watch (weekly) turns each rival change into a test idea. It sorts ads oldest first, because an ad a rival keeps running is a better signal than a new one; it is not proof the ad works, since some run because nobody switched them off.

```
JOB
Show me who's winning in [topic] and which formats are up for grabs. Run now, then on the 1st of each month.

STEPS
- Read brief.md.
- Look up the 20 biggest creators for this topic across TikTok, Instagram and YouTube, with followers, typical views, biggest video and breakout count.
- Label each one brand or person. Star anyone under [100,000] followers with several breakouts.
- For the top 10, pull their outliers and note the hook types and formats they come back to.

SEND ME
A table of all 20, the 5 most common formats, and 3 formats that fit my business that few of them do well. Save it as niche.md and mark your opinions as opinions.
```

```
JOB
Keep an eye on [up to 5 handles] and the ads from [brands]. Mondays, 8 a.m.

STEPS
- Read brief.md.
- Read this week's tracking signals for those handles, free ones first.
- For each handle, note outliers, any hook or format they've reused, and changes in posting pace.
- Pull each brand's live Meta ads with the copy, start date and landing page, oldest first.

SEND ME
Each change with its link, plus one idea I could test from it. Save it as competitors.md.
```

## Trend radar and comment miner

Trend radar judges each trend only on whether the user's buyer would care. Comment miner collects the audience's exact words, so each video answers a real comment.

```
JOB
Sort this week's trends into make or skip for my business. Mondays, 7 a.m.

PULL
- Content trends: formats being copied now, with stage, creator count this week, and what to keep or change.
- Topic trends: today's and emerging stories in [region].
- Sounds: most used and breakouts from the past 7 days.

STEPS
- Read brief.md. Keep formats, topics and sounds in separate lists.
- Mark each one MAKE or SKIP, judged only on whether my buyer would care.

SEND ME
For each MAKE: an example link, its stage, and what we'd actually shoot. For each sound, say whether TikTok's Commercial Music Library lists it for [region] and for the placement we'd post it in. Save it as trends.md.
```

On TikTok, a business may post only sounds from the Commercial Music Library or tracks it has licensed itself, because TikTok bars businesses from using the general music library for any commercial use, organic posts included. The library filters tracks by the region a campaign runs in and by usable placement, so a track listed in one region or placement may be unavailable in another. Have the user confirm a sound's licence before posting with it.

```
JOB
Collect what my audience says under viral videos. Mondays, 7:30 a.m.

STEPS
- Read brief.md.
- Pick this week's 5 strongest videos from outliers.md and pull their top comments.
- Sort them under: questions, complaints, requests, and phrases I should reuse.

SEND ME
Each list with the original wording untouched and the video link, then 5 video ideas that each answer a specific comment. Save it as comments.md.
```

## Sources

- [Jerker Denrell, *Vicarious learning, undersampling of failure, and the myths of management* (2003)](https://ora.ox.ac.uk/objects/uuid:a8102a34-f7a4-40de-91c0-139355f97358)
- [Amos Tversky, Daniel Kahneman, *Belief in the law of small numbers* (1971)](https://doi.org/10.1037/h0031322)
- [Anthropic: How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)
- [TikTok: About the Commercial Music Library](https://ads.tiktok.com/help/article/commercial-music-library?lang=en)
- [jaffa (Virlo co-founder), *Grok Bot for social media* (2026)](https://x.com/dsqjaffa/status/2119160045263077664)
