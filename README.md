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
- **[say-less](skills/say-less/SKILL.md)** stop yapping.
- **[say-more](skills/say-more/SKILL.md)** explain stuff only when asked.
- **[momentum](skills/momentum/SKILL.md)** kill your executive dysfunction.

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
- **[seo](skills/seo/SKILL.md)** diagnose search visibility, improve content, and research earned links.
- **[gtm](skills/gtm/SKILL.md)** scouts find people who posted the problem your product solves; you get a drafted reply and a send link for each.
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
- gtm
  - [The Ultimate Guide to Organic Marketing & Content](https://x.com/ryangrowthh/status/2116221594267730298) by Ryan
  - [How to Engineer Virality on X](https://x.com/0xfJuan/status/2114746175026798821) by Juan
- seo
  - [Technical SEO checklist](https://x.com/suraj_sharma14/status/2116062550416871512) by Suraj Sharma
  - [Backlink tactics](https://x.com/borjafat/status/2116164330014007296) by Borja
  - [Granola's AEO workflow](https://x.com/wespreadjam/status/2115568290307469548) by Jam
