---
name: gtm-video
description: Make a product video look premium, and build short-form videos on proven formats.
disable-model-invocation: true
---

# Product video

Part of [gtm](../gtm/SKILL.md): its copy sheet and boundaries apply here.

Two jobs share this skill: a polished product video, and short-form posts built on proven formats. An AI-generated film is [gtm-ai-film](../gtm-ai-film/SKILL.md). In all of them, claims on screen come from the copy sheet, and the user watches motion and listens to sound, because you can do neither. A finished video can go to any platform; publishing on YouTube is [gtm-youtube](../gtm-youtube/SKILL.md), and on X is [gtm-x](../gtm-x/SKILL.md).

## Product video

A video looks expensive through restraint: every choice is deliberate, and nothing is there by accident. The steps are one product-video studio's practice; the research behind each is named where it exists.

1. **Rules.** Fix them per video type (launch, feature, explainer) before production: about 3 colors by hex, one background style, one typeface, one kind of music. Reuse them across videos, because repetition makes things easier to process and so better liked (Reber, Schwarz & Winkielman), and consistent colors and house styles make a brand easy to recognise (Ehrenberg-Bass Institute).
2. **Storyboard.** Design every frame before animating. One idea per shot, room to breathe, and a background that never competes with the subject. Center a single front-facing subject, such as the product, because viewers prefer it there; place a subject seen in profile off-center, facing into the frame (Palmer, Gardner & Wickens, center and inward bias).
3. **Motion.** Ease and overlap every keyframe, because completely linear motion "looks weird and unnatural" (Laubheimer, NN/g). Move between scenes with transitions, cutting hard only when the message needs it, and vary the pace across sections.
4. **Music.** Pick tempo for energy, because tempo changes listeners' arousal while major or minor mode changes their mood (Husain, Thompson & Schellenberg). Then pick key and genre for mood and audience. The studio's ranges: 60–80 BPM cinematic, 90–110 smooth, 115–123 sharp and premium, faster reads as hype.
5. **Sound.** After the edit, have the user listen through, and cut every effect that is too loud, out of place, or does not help the viewer understand the product.

Show the storyboard to the user before animating, because frames are cheap to change and animation is not.

## Short-form

Platforms rank videos on viewer response: YouTube's recommender reads clicks, watch time, survey answers, shares, likes and dislikes (Goodrow, YouTube). A format that broke out has already earned those responses, so reuse a proven format and keep everything else the user's own. Take the structure: the opening, the beats, the framing. Subject, words, footage and claims stay the user's, because lifted scripts or clips are plain copying.

Find formats through outliers: videos that beat their creator's usual views. A big account's views mostly reflect its audience; the gap suggests the format did some of the work, though luck, timing and topic play a part, so treat an outlier as a format to test and a format that broke out twice as a pattern. On TikTok, follower count and past hits are not direct ranking factors (TikTok), so small creators' formats can travel. Practitioners favor creators under about 100,000 followers with several breakouts, since their formats fit small accounts.

1. **Teardown.** For a video the user sends, get its transcript (the caption, where the platform has no transcript), top comments and numbers against the creator's recent videos. Return: the first line verbatim, each beat in order, what viewers came for, what commenters keep asking, what to keep and swap for this product, 5 hooks from different angles, and claims to verify. Mark why-it-worked as opinion, since the data only shows that it did. Save the structure to `.gtm/templates.md`.
2. **Voice.** Once, study the user's 30 latest captions and any transcripts. Save their go-to words, words they avoid, how their videos open and close, and AI-sounding habits to keep out to `.gtm/voice.md`. For Mia, start from [talk-like-mia](../talk-like-mia/SKILL.md).
3. **Scripts.** From a voice note, build 3 scripts on 3 templates, using only the user's words and claims: first line, on-screen text, beats, ending and caption. Check them against `.gtm/voice.md`, save the user's edits back to it, and log the chosen script in `.gtm/log.md`.
4. **Review.** Weekly, compare the week's videos with the user's 3-month baseline. Name the 3 strongest and 3 weakest and what the strong ones share (hook, format, length, topic), state the sample size behind every pattern, and call anything under 6 videos early. On YouTube, Studio's audience retention report compares each video with the user's 10 latest of similar length. Compare a metric only across platforms where the data source reports it. Add 3–5 lessons to `.gtm/lessons.md`.

One practitioner runs these as scheduled bots on Virlo, a paid viral-video database; any source of transcripts, comments and per-video views works.

## Sources

- [Rolf Reber, Norbert Schwarz and Piotr Winkielman, *Processing Fluency and Aesthetic Pleasure* (2004)](https://pages.ucsd.edu/~pwinkiel/abs_beauty-PSPR-2004.htm)
- [Ehrenberg-Bass Institute: Differentiation versus distinctiveness](https://marketingscience.info/news-and-insights/differentiation-versus-distinctiveness)
- [Stephen E. Palmer, Jonathan S. Gardner and Thomas D. Wickens, *Aesthetic Issues in Spatial Composition* (2008)](https://palmerlab.berkeley.edu/pdf/PalmerGardner&Wickens-1.pdf)
- [Page Laubheimer, *Executing UX Animations: Duration and Motion Characteristics* (NN/g, 2020)](https://www.nngroup.com/articles/animation-duration/)
- [Gabriela Husain, William F. Thompson and E. Glenn Schellenberg, *Effects of Musical Tempo and Mode on Arousal, Mood, and Spatial Abilities* (2002)](https://research.bond.edu.au/en/publications/effects-of-musical-tempo-and-mode-on-arousal-mood-and-spatial-abi/)
- [Cristos Goodrow, *On YouTube's recommendation system* (2021)](https://blog.youtube/inside-youtube/on-youtubes-recommendation-system/)
- [TikTok: How TikTok recommends videos #ForYou (2020)](https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you)
- [YouTube Help: Measure key moments for audience retention](https://support.google.com/youtube/answer/9314415)
- [@leomeethewoo: making product videos look expensive](https://x.com/leomeethewoo/status/2103529310208606701)
- [@tuanle: copying proven formats instead of chasing originality](https://x.com/tuanle/status/2119097657658597491)
- [@dsqjaffa: scheduled research bots for short-form video](https://x.com/dsqjaffa/status/2119160045263077664)
