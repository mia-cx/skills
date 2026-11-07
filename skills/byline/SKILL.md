---
name: byline
description: 'Use when writing or rewriting copy that sells or gets found: marketing sites, landing pages, product pages, launch posts, outreach. Combines talk-normal, talk-like-mia, gtm, and seo.'
---

# Byline

Each skill owns one job in the copy: gtm decides what is true and who it is for, seo decides what each page answers, talk-normal decides how each sentence reads, and talk-like-mia decides whose voice it is. Read all four in one turn before you start:

- [gtm](../gtm/SKILL.md)
- [seo](../seo/SKILL.md), plus its [content reference](../seo/references/content.md)
- [talk-normal](../talk-normal/SKILL.md)
- [talk-like-mia](../talk-like-mia/SKILL.md)

Work through the steps in order, because each one feeds the next. When two skills conflict, a true claim beats a better line, and a reader beats a search engine.

## 1. Ground

Write or refresh `.gtm/copy.md` per gtm step 1. When `.gtm/leads.md` exists, add its quotes to the phrasings. A claim that the site does not make yet needs evidence from the product or a yes from the user. Send scouts only when the user asks, because a rewrite needs the copy sheet, not leads.

Done when the copy sheet has the one-sentence problem, the audience, every claim with its source, and 10–15 phrasings of the problem in the audience's words.

## 2. Map

When the site is live, run seo's `inspect.mjs` on its pages and save the output for the before and after. Map each copy-sheet phrasing to the existing page that should answer it, per seo's content reference, and propose a new URL only for a phrasing no page fits.

Done when every page has one search intent, one next action for the visitor, a title, and a meta description, and no two pages share an intent.

## 3. Draft

- The headline answers the page's main question in the words the copy sheet's phrasings use. Use a searcher's phrase where it reads naturally, once.
- Each page leads with evidence other results lack: a number, a real input and output, or Mia's firsthand story.
- Claims follow gtm's drafting rule: the copy sheet only, and anything else becomes a question for the user.
- talk-normal governs every sentence.

## 4. Voice

Who is speaking decides the register:

| Surface | Voice |
| --- | --- |
| Product pages, pricing, docs, titles, meta descriptions | talk-normal mechanics. From talk-like-mia, keep the bluntness, specifics, spelling, and Never list |
| Mia speaking in first person: about page, origin story, founder note | talk-like-mia email register |
| Social posts, launch posts, replies, community threads | talk-like-mia casual register, with gtm's drafting and posting rules |
| Cold emails and pitches | talk-like-mia email register, with gtm's length limit and opt-out line |

## 5. Check

Read every piece as it will render, line by line: talk-normal's pattern scan and self-audit, talk-like-mia's Never list, each claim against the copy sheet, and each title and description against its page's intent. After deploy, rerun `inspect.mjs` and show the user the before and after.

Hand back each page as its URL, the intent it answers, the new copy, and the claims it uses. Publishing and posting wait for the user's go.
