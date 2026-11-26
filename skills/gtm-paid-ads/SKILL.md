---
name: gtm-paid-ads
description: Run paid ads you can measure, from tracking and incrementality to creative in volume.
disable-model-invocation: true
---

# Paid ads

Part of [gtm](../gtm/SKILL.md): its copy sheet and boundaries apply here.

Paid ads only pay when the platform learns from correct data and the user can tell what the ads really add, because platform reports count sales that follow an ad, not sales it caused. Fix tracking first, match pages to ads, measure incrementally, then feed the account better creative. The workflow is one practitioner's (Korzhov), written for Meta and Google ads on an online store; numbers marked as his are unverified claims. Every change that spends money waits for the user's go.

## 1. Count each sale once

Ad platforms optimise on the conversion events they receive: Meta uses only events matched to a person for attribution and delivery optimisation, so a duplicated or missing sale teaches the algorithm wrong data. Korzhov claims most accounts send duplicates or miss about a quarter of orders.

Send the purchase event from both browser and server with the same event ID and the same event name, so Meta discards a duplicate that arrives within 48 hours of the first: Google Tag Manager, GA4, server-side tagging (such as Stape), and the Meta Conversions API. Check event match quality in Events Manager, which Meta scores out of 10 without publishing a target; Korzhov aims above 7, and sending more customer information parameters raises it. Send only identifiers the site has the right, and where required the consent, to share, apply the same tracking choices on the server as in the browser, and hash email, phone and names as Meta's [customer information parameters](https://developers.facebook.com/documentation/ads-commerce/conversions-api/parameters/customer-information-parameters) require (Meta Business Tools Terms). Done when Events Manager counts each test order once and event match quality is recorded.

## 2. Match the page to the ad

People click on a guess of what the page holds and leave when it doesn't confirm the promise (NN/g, information scent), so a page that repeats the ad's promise wastes less of the spend. Draft landing-page variants whose headline and first section match each ad, with claims from the copy sheet. Measure with product analytics such as PostHog, calculate the A/B sample size before starting, and call the test only when it is reached, because checking until a result looks significant turns noise into false wins (Evan Miller). Done when every live ad points to a page that repeats its promise.

## 3. Measure what ads add

Platforms credit themselves with more sales than they cause: across 15 randomised Facebook experiments, tracking-based estimates were off by a factor of three in half the studies, mostly too high (Gordon et al. 2019), and eBay's brand-keyword search ads showed no measurable short-term benefit (Blake, Nosko and Tadelis 2015). Korzhov puts the over-crediting at 2–5 times; the size varies by account.

Propose a holdout test. Where Meta offers its person-level Conversion Lift test, prefer it, because Meta rates it statistically stronger than a geo test. Otherwise run a geo test in Meta's open-source [GeoLift](https://facebookincubator.github.io/GeoLift/), which plans and reads the test with the same model:

1. Run its power analysis on past sales by region. It picks the markets that go without ads and the test length, because ad effects are small next to weekly sales swings and small tests often can't read them (Lewis and Rao 2015). Korzhov's default is 5 regions off for 4 weeks.
2. Turn ads off in those markets only. GeoLift then measures lift against a synthetic control: a weighted mix of the other markets that tracked the ads-off markets before the test, standing in for what they would have sold with ads on. Report its percent lift, incremental sales and confidence range, with `ConfidenceIntervals = TRUE`, because GeoLift leaves the sales range out by default. GeoLift reports ads-off sales minus the synthetic ads-on estimate, signed, so flip the incremental sales and their range to get what the ads added: negate both endpoints and swap them. Recompute the percentage against ads-off sales, because GeoLift's is a share of the ads-on estimate: 80 sold with ads off against an estimated 100 with ads on prints −20%, while the ads added 25% over no ads. A positive figure means the markets sold more without ads. The flip assumes turning ads off moves sales by the same amount as turning them on (GeoLift's inverse-test guide). Never subtract raw sales changes between groups, because a large and a small market growing at the same rate show a gap with no ad effect.
3. Don't turn the geo result into an over-crediting ratio. Meta attributes nothing in markets with ads off, and weights fitted to total sales don't carry over to attributed sales, so no number from this test is comparable with Meta's. To compare attributed with measured sales, use Conversion Lift: its incremental conversions cover the same campaign, dates and conversion event as the attributed count in Ads Manager.

The holdout loses the sales ads would have brought, so the user picks a holdout small enough to afford it. For an ongoing per-channel estimate, propose marketing mix modelling with Google [Meridian](https://developers.google.com/meridian) or Meta [Robyn](https://facebookexperimental.github.io/Robyn/) (both free and open source), calibrated with the holdout result. Done when the user knows what the ads added, with its confidence range; a range that includes zero means the test found no clear effect. A ratio of attributed to measured sales comes only from Conversion Lift.

## 4. Creative in volume

The ad itself drives more sales lift than reach, targeting or timing (Nielsen's analysis of about 500 consumer-goods campaigns), and run time is the best public hint of which competitor ads work: an ad live for 60+ days is probably paying for itself. That is a heuristic, not proof, because the Ad Library shows when an ad ran, not what it spent or earned, and brand ads and neglected accounts run long too.

1. List up to 30 competitors' active ads that have run more than 60 days, with copy, format and start date. Read the [Meta Ad Library](https://www.facebook.com/ads/library/) by hand, or call the Ad Library API (`ads_archive`, which returns `ad_delivery_start_time`) for ads that reached the EU. Never scrape the library, because Meta's terms forbid automated collection without its written permission.
2. Rebuild each format for the product with the user's own footage, wording and claims. Copy the structure only, because copyright protects a competitor's expression, not the idea or method behind it (US Copyright Office, Circular 33), and reused wording or footage invites IP complaints.
3. Upload them paused for the user to review.

Korzhov claims the account that tests more creatives usually wins. For volume, batch phone-style ads from one product photo and a 30-second script: Veo, Seedance or Kling for video, ElevenLabs for voice, auto-captions, exported in 9:16 and 4:5 with varied hooks, voices and openings. Label them as AI, check the platform's AI-disclosure rules, and keep them from implying a real customer said anything, because the FTC bans testimonials that misrepresent that the person exists or used the product (16 CFR 465), and ads showing "actual consumers" must use real ones or clearly say they aren't (16 CFR 255.2). Video craft lives in [gtm-video](../gtm-video/SKILL.md).

## 5. An agent on the account

Korzhov's reasoning: agents bidding with the same rules and platform data tie, so the winner has inputs others lack: the product's review data, a scrape of competitors' sites, and what a customer really costs across channels. When the user asks for an agent on the account, propose his rules, fitted to how Meta learns:

- Check the account hourly for spend anomalies.
- Leave ad sets in Meta's learning phase alone, and batch changes into one edit, because an ad set needs about 50 optimisation events in 7 days to stabilise and changes can restart learning (Meta).
- Pause ads costing over 3x the target cost per customer, after 50 conversions.
- Raise budget 20% on ads that won three days in a row (Korzhov's number).
- Draft three new versions of the best ad.
- Post every action with its reason to Slack, and keep a log.

The user sets spend caps on the ad platform itself before it runs (Meta's account spending limit, Google Ads budgets), because rules inside an agent cannot stop a bug from spending past them. An average daily budget is not a fixed cap: most Google Ads campaigns can be billed up to twice it on a given day and 30.4 times it in a month, Pay for Conversions campaigns have no daily limit, and a budget edit resets the month's limit. Read the campaign's actual limits before proposing a spend change.

## Sources

- [Gordon, Zettelmeyer, Bhargava and Chapsky, *A Comparison of Approaches to Advertising Measurement: Evidence from Big Field Experiments at Facebook* (Marketing Science, 2019)](https://www.kellogg.northwestern.edu/faculty/gordon_b/files/fb_comparison.pdf)
- [Blake, Nosko and Tadelis, *Consumer Heterogeneity and Paid Search Effectiveness* (NBER, 2014; Econometrica, 2015)](https://www.nber.org/system/files/working_papers/w20171/w20171.pdf)
- [Lewis and Rao, *The Unfavorable Economics of Measuring the Returns to Advertising* (QJE, 2015)](https://ideas.repec.org/a/oup/qjecon/v130y2015i4p1941-1973.html)
- [Nielsen: When it comes to advertising effectiveness, what is key? (2017)](https://www.nielsen.com/insights/2017/when-it-comes-to-advertising-effectiveness-what-is-key/)
- [Raluca Budiu, NN/g: Information Scent (2020)](https://www.nngroup.com/articles/information-scent/)
- [Evan Miller, *How Not To Run an A/B Test* (2010)](https://www.evanmiller.org/how-not-to-run-an-ab-test.html)
- [Meta for Developers: Deduplicate Pixel and server events](https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events/)
- [Meta for Developers: Conversions API best practices](https://developers.facebook.com/docs/marketing-api/conversions-api/best-practices/) and [customer information parameters](https://developers.facebook.com/documentation/ads-commerce/conversions-api/parameters/customer-information-parameters)
- [Meta Business Tools Terms](https://www.facebook.com/legal/terms/businesstools)
- [Meta for Developers: Understanding and optimizing your ad campaign (learning phase)](https://developers.meta.com/vr/resources/optimize-ad-campaign/)
- [Meta Transparency Center: Ad Library tools](https://transparency.meta.com/researchtools/ad-library-tools/)
- [Meta for Developers: Ad Library API (ads_archive)](https://developers.facebook.com/docs/graph-api/reference/ads_archive/) and [ArchivedAd fields](https://developers.facebook.com/docs/graph-api/reference/archived-ad/)
- [Meta: Automated Data Collection Terms](https://www.facebook.com/legal/automated_data_collection_terms)
- [Meta Open Source: GeoLift](https://facebookincubator.github.io/GeoLift/), [its introduction](https://facebookincubator.github.io/GeoLift/docs/intro/), [its walkthrough](https://facebookincubator.github.io/GeoLift/docs/GettingStarted/Walkthrough/), [Inverse GeoLift (2022)](https://facebookincubator.github.io/GeoLift/blog/inverse-geolift) and [its `GeoLift()` source](https://github.com/facebookincubator/GeoLift/blob/main/R/post_test_analysis.R)
- [Google: Meridian](https://developers.google.com/meridian)
- [Meta: Robyn](https://facebookexperimental.github.io/Robyn/)
- [Google Ads Help: About overdelivery and your average daily budget](https://support.google.com/google-ads/answer/2375423?hl=en)
- [Google Ads Help: About spending limits](https://support.google.com/google-ads/answer/10486637?hl=en) and [how budget changes affect them](https://support.google.com/google-ads/answer/10487143?hl=en)
- [US Copyright Office: Circular 33, Works Not Protected by Copyright](https://www.copyright.gov/circs/circ33.pdf)
- [eCFR: 16 CFR Part 465, Use of consumer reviews and testimonials](https://www.ecfr.gov/current/title-16/chapter-I/subchapter-D/part-465)
- [eCFR: 16 CFR Part 255, Guides concerning endorsements and testimonials](https://www.ecfr.gov/current/title-16/chapter-I/subchapter-B/part-255)
- [@korzhov_dm: eleven marketing-engineering workflows, from ad agents to incrementality](https://x.com/korzhov_dm/status/2118984106335756532)
