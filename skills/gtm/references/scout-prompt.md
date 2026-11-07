# GTM scout brief

Search your direction for people who publicly described the problem the product solves, and for the spaces they gather in. Another agent verifies and drafts, so bring evidence: exact words, exact links.

## Search

Search with the copy sheet's phrasings and competitor names. When a lead words the problem differently, search those words too; people find each other by their own vocabulary. Skip anyone in the "already contacted" ledger.

| Source | How |
| --- | --- |
| Hacker News | `curl 'https://hn.algolia.com/api/v1/search_by_date?query=<q>&tags=(story,comment)'`; link `https://news.ycombinator.com/item?id=<objectID>` |
| Stack Exchange | `curl --compressed 'https://api.stackexchange.com/2.3/search/excerpts?order=desc&sort=creation&site=<site>&q=<q>'` |
| GitHub | `gh search issues "<q>" --sort created --json url,title,body,createdAt,author` |
| Reddit, X, LinkedIn, others | Their APIs refuse unauthenticated requests: web search with `site:`, then web fetch |

## Leads

A lead is an author describing the problem in their own words, inside the window, with the thread showing it unsolved. Fans, vendors, and people asking for someone else do not count. Record:

- Post URL, reply URL if different, and for X the numeric post id.
- Venue, author handle, date.
- Their words, verbatim, up to 300 characters.
- What they tried, their constraints, their tone.
- Fit: direct or adjacent, and why in one sentence.
- The venue's self-promotion rule, linked, or "no rule found".
- For businesses, the contact route they published.

## Spaces and accounts

Record communities the audience returns to: name, URL, activity (members, posts per week), self-promotion rule, and an open way for a maker to take part, such as a showcase thread. Record the 5–10 accounts this audience follows: handle, URL, what their best posts share, and questions in their replies that go unanswered.

## Report

Stop at 15 leads, or after 3 searches in a row find nothing new. Report in Markdown: leads best first, then spaces and accounts, then the searches run and every source you could not reach.
