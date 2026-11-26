---
name: seo-links
description: Earn backlinks from pages the buyers read, and aim them where they move rankings.
disable-model-invocation: true
---

# Earned links

Part of [seo](../seo/SKILL.md): its evidence method and boundaries apply here.

Earn links from pages the business's buyers read, and aim them where they move rankings. A link is a path for a person before it is a signal for Google: PageRank models a reader clicking from page to page (Brin and Page, 1998), and Google later patented weighting each link by how likely a reader is to click it. A link is worth earning when the linking page's readers benefit from the destination.

## Score a prospect

Read every prospective page before recommending it, and claim no completeness from backlink data. Score it on five checks, and stop at a failed relevance or eligibility check whatever its Domain Rating, which is a tiebreaker only: DR is Ahrefs' own relative score, not a Google number.

| Check | Question |
| --- | --- |
| Relevance | Does the site cover the topic or the buyer's problem? |
| Eligibility | Does the business genuinely qualify (product type, location, stage)? |
| Cost | What does it take in money or hours? |
| Placement | Does a live listing show a clickable URL, or only on paid plans? |
| Audience | Do real visitors who could become customers arrive here? |

Point new links at pages at positions 10–30 in Search Console, after making those pages complete ([seo-content](../seo-content/SKILL.md)), rather than at the home page. One agency owner reports 2–5 links a month can lift such pages to page one.

## Run a weekly routine

1. Pick 2–3 site categories where the buyers already look (a SaaS: software directories, startup launches, developer resources; a local service: local listings, community partnerships) and shortlist 20 scored prospects.
2. Build one submission kit in the repo: URL, one-line description, one-paragraph descriptions tailored per audience, logo, screenshots, founder bio and story, tagline, examples. Ask the user for the bio. Keep the name, one-line description, and logo identical on every listing so readers recognise one product (practitioner advice). For launch platforms and software directories, one practitioner finds 20–30 well-chosen beat 300, and Google's link spam policy names low-quality directory links and automated submission.
3. Work five prospects a week: Monday research and score, Tuesday prepare, Wednesday draft the submission or pitch, Thursday follow up, Friday check results. Where a platform wants a contribution rather than a form, spend the slot on that.
4. After a month, keep the sources that approved, sent visitors, reached the right audience, or led to relationships, and put next month's time there.

Track prospects in the project's existing tracker: source URL, category, relevant passage, target URL, evidence, contact route, status (discovered, verified, drafted, sent, published), published URL, link status (clickable, missing, restricted), attributes (followed, nofollow, sponsored, UGC), referral visits. Approval is not a link: mark it published only after opening the live page and checking the link and its attributes, since Google generally doesn't follow `nofollow`, `sponsored`, or `ugc` links.

## Give the writer something

Every earned link answers the writer's question "what does this give my readers?" Draft short pitches that name the exact page and include the text to paste.

| Opportunity | What earns the link |
| --- | --- |
| Roundups ("best X for Y") | Search the buying query in Google and ChatGPT and open the cited listicles that name competitors but not the product; offer a tested feature or example covering a buyer need the list misses, in a short pitch with evidence (one practitioner keeps it to 120–180 words). One follow-up after a week, then stop. Recheck the entry later and send updates |
| Original research | The site's own data with method, sample, dates, and limits, each finding a self-contained quotable sentence, at a stable URL linked to product pages. Google asks for original research, and on a benchmark with a simulated AI engine, adding statistics, quotations, and cited sources raised a page's position-adjusted share of the answer by 30–40% relative (Aggarwal et al., KDD 2024), a candidate to test rather than a citation rate |
| Journalist requests | Qwoted, Featured, SourceBottle, ResponseSource, Dot Star Media; answer only current requests inside real expertise, direct answer first, plus a verifiable number or example. Log requests so none repeat |
| Free tools | A calculation the audience repeats, tested with normal and odd inputs, at a permanent URL; also publish to npm, browser extension stores, or WordPress plugins where it fits |
| Competitor links | Read the sentence around each link to learn why it was cited; create the evidence that publisher lacks |
| Broken links | Dead competitor URLs with backlinks, or guides naming shut-down tools; read the archived page and offer a replacement serving the same reader |
| Visuals and video | Offer a graphic or short demo for one named section of a text-heavy guide; make it after the author agrees, from their checked facts, with credit wording |
| Owed links | Unlinked brand mentions (search `"brand" -site:yoursite.com`), reused charts and quotes, removed pages that still have backlinks (restore or redirect to an equivalent), and a customer story about a tool the user relies on, sent to that vendor (practitioners report vendors link to those) |

## Where to find prospects

Use lists for discovery only, picking entries where the business qualifies and buyers look:

- Review profiles: complete G2 and Capterra, and ask customers for real reviews.
- Developer platforms, for a real project with docs: GitHub, GitLab, Codeberg, PyPI, npm, crates.io, RubyGems, Packagist, Docker Hub, F-Droid, Open VSX, VS Code Marketplace, Firefox Add-ons, WordPress.org, Hugging Face.
- Industry listings, only when eligible: Tripadvisor, Houzz, Thumbtack, Avvo, FindLaw, Healthgrades, MERLOT, OER Commons, Candid, Charity Navigator, VolunteerMatch, and their peers.
- Creator profiles and storefronts the user would use anyway: Linktree, Carrd, Ko-fi, Gumroad, itch.io, Bandcamp.
- Government, supplier, and business listings, with details identical across all.
- A longer searchable list: https://backlinkforme.com/backlinks (maintained by the list's author).

Launch platforms and community posting belong to [gtm-outreach](../gtm-outreach/SKILL.md), which also governs cold email: outreach follows the recipient country's email law (CAN-SPAM in the US, business-to-business included; PECR in the UK, where companies, LLPs, and Scottish partnerships may be emailed but sole traders and other partnerships need consent, and a named person's work address still falls under UK GDPR), and every message goes out only after the user approves it.

## Link policy

Earn editorial citations. Google's [link spam policy](https://developers.google.com/search/docs/essentials/spam-policies#link-spam) names bought links that pass ranking credit, excessive link exchanges, required links that the site owner can't qualify, low-quality directory links, and automated link creation. Since 2022 SpamBrain detects sites buying and selling links and neutralises those links, and a pattern of them can bring a manual action on part or all of the site. Fill in every profile created, and skip directories whose free route demands a reciprocal badge. Paid placements carry `rel="sponsored"` or `nofollow`, and commercial relationships are disclosed.

Refuse outright: link exchange and credit networks, paid Reddit or Quora "tasks", fake accounts, self-written reviews, mass AI posts across a site network, and doorway pages: city × service templates that target near-identical searches and funnel readers to one destination. A local page with its own verified facts is not one ([seo-content](../seo-content/SKILL.md)).

Some shortcuts sit beside that line. Present them to the user as decisions, each needing their go:

| Tactic | Safe version |
| --- | --- |
| Paying a roundup owner for a spot | Ask for the sponsored label; value the spot for its readers and AI citations, not ranking credit. Skip backlink marketplaces |
| Link exchange in a business network | Rare, topical, linking to the specific answer the reader needs; log every source and destination |
| Exact-match "best X" domains | One unverified claim amplified by a domain broker, while Google runs an exact-match domain system so such domains don't get "too much credit": a bet with domain fees as the stake |
| Press-release sites (PRLog, openPR, PR.com, IssueWire) | Genuine launches, studies, or milestones only, with plain links. A hosted release is not coverage, and Google names optimised-anchor links in distributed press releases as link spam |

## Sources

- [Sergey Brin and Lawrence Page, *The Anatomy of a Large-Scale Hypertextual Web Search Engine* (1998)](https://research.google/pubs/the-anatomy-of-a-large-scale-hypertextual-web-search-engine/)
- [Jeffrey Dean, Corin Anderson and Alexis Battle, US patent 7,716,225, *Ranking documents based on user behavior and/or feature data* (2010)](https://patents.google.com/patent/US7716225B1/en)
- [Pranjal Aggarwal et al., *GEO: Generative Engine Optimization* (KDD 2024)](https://arxiv.org/abs/2311.09735)
- [Google Search Central: Spam policies, link spam](https://developers.google.com/search/docs/essentials/spam-policies#link-spam)
- [Google Search Central: Qualify your outbound links](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links)
- [Google Search Central Blog: December 2022 link spam update](https://developers.google.com/search/blog/2022/12/december-22-link-spam-update)
- [Search Console Help: Manual actions report](https://support.google.com/webmasters/answer/9044175)
- [Google Search Central: A guide to Google Search ranking systems](https://developers.google.com/search/docs/appearance/ranking-systems-guide)
- [Google Search Central: Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Ahrefs: What is Domain Rating (DR)?](https://help.ahrefs.com/en/articles/1409408-what-is-domain-rating-dr)
- [US Federal Trade Commission: CAN-SPAM Act, a compliance guide for business](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business)
- [UK Information Commissioner's Office: Electronic mail marketing (PECR)](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/electronic-and-telephone-marketing/electronic-mail-marketing/)
- [UK Information Commissioner's Office: Business-to-business marketing](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/business-to-business-marketing/)
- [@asaio87: link targets and monthly link pace](https://x.com/asaio87/status/2119171723849245031)
- [@2whazzuup: directories, weekly routine and journalist platforms](https://x.com/2whazzuup/status/2119247229601062993)
- [@TheoAGI: roundup pitches and vendor customer stories](https://x.com/TheoAGI/status/2120163220312699025)
