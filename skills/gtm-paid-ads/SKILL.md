---
name: gtm-paid-ads
description: Run paid ads you can measure, from tracking and incrementality to creative in volume.
disable-model-invocation: true
---

# Paid ads

Part of [gtm](../gtm/SKILL.md): its copy sheet and boundaries apply here.

Paid ads only pay when the platform learns from correct data and the user can tell what the ads really add. Fix tracking first, match pages to ads, measure incrementally, then feed the account better creative. The playbook is one practitioner's, written for Meta and Google ads on an online store; their numbers are unverified claims. Every change that spends money waits for the user's go.

## 1. Count each sale once

Ad platforms optimise on the conversion events they receive, so a duplicated or missing sale teaches the algorithm wrong data. The practitioner claims most accounts send duplicates or miss about a quarter of orders.

Send the purchase event from both browser and server with the same event ID, so Meta merges them: Google Tag Manager, GA4, server-side tagging (such as Stape), and the Meta Conversions API. Done when Meta Events Manager counts each test order once and event match quality is above 7.

## 2. Match the page to the ad

Most paid traffic leaves in the gap between what the ad promised and what the page says, and closing it costs less than more spend. Draft landing-page variants whose headline and first section match each ad, with claims from the copy sheet. Measure with product analytics such as PostHog, calculate the A/B sample size before starting, and call the test only when it is reached. Done when every live ad points to a page that repeats its promise.

## 3. Measure what ads add

Platforms credit themselves with more sales than they cause; the practitioner puts it at 2–5 times. Propose a regional holdout: Meta ads off in 5 matched regions for 4 weeks, then compare the real sales drop with what Meta attributed. The test regions lose those sales, so the user picks regions small enough to afford it. For an ongoing per-channel estimate, marketing mix modelling with Google Meridian or Meta Robyn (both free) works. Done when the user knows the ratio between attributed and real sales.

## 4. Creative in volume

Run time is the only public signal that an ad performs: nobody keeps paying for a loser, so an ad live for 60+ days probably pays for itself.

1. Write a scraper for the Meta Ad Library (free and public) covering up to 30 competitors, keeping ads live more than 60 days.
2. Rebuild each format for the product with the user's own footage, wording and claims. Copy structure only, because reused wording or footage invites IP complaints.
3. Upload them paused for the user to review.

The account that tests more creatives usually wins. For volume, batch phone-style ads from one product photo and a 30-second script: Veo, Seedance or Kling for video, ElevenLabs for voice, auto-captions, exported in 9:16 and 4:5 with varied hooks, voices and openings. Label them as AI and keep them from implying a real customer said anything, because fake testimonials can breach the FTC's 2024 rule and platform AI-disclosure rules. Video craft lives in [gtm-video](../gtm-video/SKILL.md).

## 5. An agent on the account

Agents bidding with the same rules and platform data tie; the winner has inputs others lack: the product's review data, a scrape of competitors, and what a customer really costs across channels. When the user asks for an agent on the account, propose these rules:

- Check the account hourly.
- Pause ads costing over 3x the target cost per customer, after 50 conversions.
- Raise budget 20% on ads that won three days in a row.
- Draft three new versions of the best ad.
- Post every action with its reason to Slack, and keep a log.

The user sets spend caps on the ad platform itself before it runs, because rules inside an agent cannot stop a bug from spending past them. The practitioner's Claude skills for the full playbook: https://github.com/irinabuht12-oss/marketing-skills
