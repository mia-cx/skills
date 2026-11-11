<a href="https://0rwx.com"><picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://0rwx.com/static/AI-W-dark.svg">
  <img alt="AI:W" src="https://0rwx.com/static/AI-W-light.svg" height="48">
</picture></a>

Skills that make my agents more tolerable.

## Install

```sh
npx skills add mia-cx/skills
```

Pick the skills you want from the list. Works with Claude Code, Cursor, Codex, and anything else that reads `SKILL.md` files.

## Restore upstream skills

After cloning this repository, run from its root:

```sh
npx skills experimental_install
```

`skills-lock.json` records the upstream dependencies. The CLI restores them into
`.agents/skills/` inside the checkout and refreshes their hashes. It fetches the
current upstream versions. The global `.skill-lock.json` registry stays local.

## Start here

- **[talk-normal](skills/talk-normal/SKILL.md)** talk like a normal person.
- **[talk-like-mia](skills/talk-like-mia/SKILL.md)** cold emails, pitches, and social posts in my voice, measured from 120k of my discord messages.
- **[say-less](skills/say-less/SKILL.md)** stop yapping.
- **[say-more](skills/say-more/SKILL.md)** explain stuff only when asked.
- **[momentum](skills/momentum/SKILL.md)** kill your executive dysfunction.
- **[signal](skills/signal/SKILL.md)** cut the roadmap down to the 3–5 things that matter in the next 18 hours.

Written for my ADHD brain.

## Other cool stuff

- **[ui-design](skills/ui-design/SKILL.md)** my take on ui design, in six stages:
  - **[ui-layout](skills/ui-layout/SKILL.md)** the product's work, its journey, and a composition that holds still.
  - **[ui-style](skills/ui-style/SKILL.md)** type, color, shape, tokens, themes, DESIGN.md.
  - **[ui-copy](skills/ui-copy/SKILL.md)** every string the interface shows.
  - **[ui-a11y](skills/ui-a11y/SKILL.md)** the interaction contract of every control.
  - **[expressive-web](skills/expressive-web/SKILL.md)** scroll, spatial, and GPU experiences for marketing pages.
  - **[ui-review](skills/ui-review/SKILL.md)** render it, look at it, use it.
- **[refine](skills/refine/SKILL.md)** audit and slim any document an agent consumes.
  - **[refine-plan](skills/refine-plan/SKILL.md)** sharpen a plan or handoff before another agent executes it.
  - **[refine-rule](skills/refine-rule/SKILL.md)** slim always-loaded rules: AGENTS.md, CLAUDE.md, Cursor rules.
  - **[refine-skill](skills/refine-skill/SKILL.md)** slim a SKILL.md: invocation mode, description, body, references.
- **[agent-copy](skills/agent-copy/SKILL.md)** write copy for agents, not humans.
- **[seo](skills/seo/SKILL.md)** diagnose search visibility and route to the job.
  - **[seo-technical](skills/seo-technical/SKILL.md)** crawling and indexing, checked with `inspect.mjs`.
  - **[seo-content](skills/seo-content/SKILL.md)** keywords, buyer pages, refreshes and title tests.
  - **[seo-local](skills/seo-local/SKILL.md)** the map pack and Google Business Profile.
  - **[seo-links](skills/seo-links/SKILL.md)** backlinks worth earning.
  - **[seo-ai-search](skills/seo-ai-search/SKILL.md)** get recommended and cited in AI answers.
- **[gtm](skills/gtm/SKILL.md)** the copy sheet every go-to-market job starts from, and the route to the job.
  - **[gtm-foundations](skills/gtm-foundations/SKILL.md)** positioning, market research, a one-page plan, the funnel.
  - **[gtm-outreach](skills/gtm-outreach/SKILL.md)** scouts find people who posted the problem; you get a drafted reply and a send link for each.
  - **[gtm-organic](skills/gtm-organic/SKILL.md)** a brand document, a content map, and which platforms carry it.
  - **[gtm-writing](skills/gtm-writing/SKILL.md)** posts and short copy that get read, on any platform.
  - **[gtm-video](skills/gtm-video/SKILL.md)** premium product videos and short-form formats, on any platform.
  - **[gtm-ai-film](skills/gtm-ai-film/SKILL.md)** a film from image and video models, errors caught before they cost money.
  - **[gtm-x](skills/gtm-x/SKILL.md)** what X's feed rewards.
  - **[gtm-linkedin](skills/gtm-linkedin/SKILL.md)** LinkedIn posts, articles that rank, DMs from competitors' ads.
  - **[gtm-reddit](skills/gtm-reddit/SKILL.md)** Reddit research, subreddits, posting without getting removed.
  - **[gtm-youtube](skills/gtm-youtube/SKILL.md)** demos that show up in Google, titles and thumbnails.
  - **[gtm-launch](skills/gtm-launch/SKILL.md)** story, demo, people, places, launch week.
  - **[gtm-retention](skills/gtm-retention/SKILL.md)** onboarding, behaviour messages, check-ins, pricing signals.
  - **[gtm-paid-ads](skills/gtm-paid-ads/SKILL.md)** ads you can measure.
- **[marketing-agents](skills/marketing-agents/SKILL.md)** automate marketing work with agents, starting from one manual task.
  - **[marketing-agents-first-agent](skills/marketing-agents-first-agent/SKILL.md)** the weekly report as a scheduled agent.
  - **[marketing-agents-context](skills/marketing-agents-context/SKILL.md)** the context folder and standing brief.
  - **[marketing-agents-guardrails](skills/marketing-agents-guardrails/SKILL.md)** permissions, spend caps, quality checks.
  - **[marketing-agents-coordinator](skills/marketing-agents-coordinator/SKILL.md)** one coordinator over worker agents.
  - **[marketing-agents-research-team](skills/marketing-agents-research-team/SKILL.md)** research bots sharing one folder.
  - **[marketing-agents-campaign](skills/marketing-agents-campaign/SKILL.md)** a whole campaign on tickets.
- **[byline](skills/byline/SKILL.md)** talk-normal, talk-like-mia, gtm, and seo in one go, for rewriting marketing copy.
- **[review-relay](skills/review-relay/SKILL.md)** review a PR on a loop until it comes back clean.
- **[review-council](skills/review-council/SKILL.md)** the same, with every provider reviewing each head at once.
- **[babysit](skills/babysit/SKILL.md)** watch a PR's reviewers, fix what is real, resolve threads, repeat until green.
- **[autopilot](skills/autopilot/SKILL.md)** issue to mergeable PR while you're away; add "ship it" to merge too.

## Inspirations

- talk-normal, say-less, say-more, momentum:
  - [Unslop](https://skills.sh/cursor/plugins/unslop)
  - [i-have-adhd](https://skills.sh/ayghri/i-have-adhd/i-have-adhd)
- ui-design
  - [frontend-design](https://skills.sh/anthropics/skills/frontend-design) by Anthropic
  - [interface-design](https://skills.sh/dammyjay93/interface-design/interface-design) by dammyjay93
  - [design-taste-frontend](https://skills.sh/leonxlnx/taste-skill/design-taste-frontend) by leonxlnx
  - [web-design-guidelines](https://skills.sh/vercel-labs/agent-skills/web-design-guidelines) by Vercel
  - [ui-ux-pro-max](https://skills.sh/nextlevelbuilder/ui-ux-pro-max-skill/ui-ux-pro-max) by nextlevelbuilder
  - [extract-design-system](https://skills.sh/arvindrk/extract-design-system/extract-design-system) by arvindrk
  - [better-*](https://github.com/jakubkrehel/skills) by jakubkrehel
- agent-copy & refine-*
  - [writing-for-agents](https://skills.sh/mattpocock/skills/writing-for-agents) by Matt Pocock
- autopilot & review-council
  - [full-send, full-stop, council](https://github.com/t3dotgg/tstack) by Theo
- gtm, seo, marketing-agents
  - Free Game, a private marketing course distilled from free posts on X
  - [The Ultimate Guide to Organic Marketing & Content](https://x.com/ryangrowthh/status/2116221594267730298) by Ryan
  - [How to Engineer Virality on X](https://x.com/0xfJuan/status/2114746175026798821) by Juan
  - [The X Algorithm Explained](https://x.com/ryangrowthh/status/2117684231983800732) by Ryan
  - [Make your product videos look expensive](https://x.com/leomeethewoo/status/2103529310208606701) by leo
- seo
  - [Technical SEO checklist](https://x.com/suraj_sharma14/status/2116062550416871512) by Suraj Sharma
  - [Backlink tactics](https://x.com/borjafat/status/2116164330014007296) by Borja
  - [Granola's AEO workflow](https://x.com/wespreadjam/status/2115568290307469548) by Jam
  - [Ramp's AEO pages](https://x.com/wespreadjam/status/2117333079106932897) by Jam
  - [Indexing checklist for AI-built sites](https://x.com/Voxyz_ai/status/2116304148228722833) by Voxyz
  - [Ranking without backlinks](https://x.com/asaio87/status/2118989064305037690) by Andrei Saioc
