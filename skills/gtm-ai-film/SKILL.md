---
name: gtm-ai-film
description: Direct a short film with image and video models, catching errors before they cost money.
disable-model-invocation: true
---

# AI film

Part of [gtm](../gtm/SKILL.md): its copy sheet and boundaries apply here.

Direct a short film made with an image model and a video model. Claims on screen come from the copy sheet, and the user watches motion and listens to sound, because you can do neither. The workflow is one practitioner's (EianLu), checked against the models' documentation and the research named below.

You direct: story, storyboard, every prompt, checking each image and clip, and post-production in code with ffmpeg and Python. An image model draws (Codex: `codex exec --skip-git-repo-check -s read-only -i reference.png - < prompt.txt`, prompt opening "Use your image generation tool to create exactly ONE image. Do not run shell commands."; images land in `~/.codex/generated_images/<session id>/`). A video model animates between a first and last frame (Seedance through the Volcengine Ark API, key in `ARK_API_KEY`, never printed). Errors get costlier at each stage: text is free, images cheap, and video billed by tokens that scale with seconds × resolution × frame rate. So catch every error at the cheapest stage. In software the rule that late fixes cost more is disputed (Menzies et al. found no consistent effect across 171 projects); here the price list makes it hold.

1. **Brief.** Ask length, aspect ratio, total budget, music and subtitles. Check that the image tool, ffmpeg, Python and the API key work. Keep everything in a new project folder, and save each version as a new file.
2. **Story.** Write the point in one sentence, the most striking image first (state its second), and turns that pass real-world logic: why does it happen, where does the object come from, can they reach it. Write each gag in three beats, problem, solution, bystander reaction, with reactions staggered. Prefer episodic structure, because continuous stories break most easily. Avoid shots models get wrong: OpenAI says Sora can struggle with complex physics, cause and effect, and left versus right, and the practitioner adds people crossing, hands holding small objects, text, mirrors, asymmetric features, lighting changes within a shot, one person doing three actions, top-down shots hiding faces, and crowds. With a song, put turns on the chorus and key actions on the downbeat. Done when a fresh agent's review passes and the user approves.
3. **Shot list.** Per shot: time, generation seconds (whole seconds, rounded up with ~0.5 s spare), size, camera position and move, who goes where, what moves. Change angle every shot (eye-level frontal at most twice), alternate shot sizes, keep something moving, and give every camera move a reason. Center a single subject facing the camera, and place a subject seen in profile at about 38% or 62% of frame width, facing into the space, because viewers prefer front-facing subjects centered and profiles facing into the frame (Palmer, Gardner & Wickens). Lock a palette in a color table, draw 1920×1080 color-block sketches per shot, and view them in greyscale: if people merge into the background, rework the palette. Done when the user approves sketches and palette.
4. **Look.** Fix the style from one reference image, then draw character and prop sheets (front, side, expressions) with the position of every fixed detail written down ("tattoo on left forearm"). Done when the user approves the style.
5. **Frames.** Draw the busier frame (usually the last) first, then edit it into the first with identical camera. For a push-in, crop the first frame. Both frames match in size and aspect ratio, because Seedance keeps the first frame's aspect ratio and crops a mismatched last frame. Everything used in the action, and small details like rain, hats and tattoos, appear in both frames. Stage reactions in the first frame, vary poses, leave room for action, keep wind consistent, check at phone size, and overlay the two frames: anything that differs will drift during the clip. Image models re-render the whole image on a small edit, so paste the edited patch back onto the original.
6. **Prompt.** Use the seven-part template, phrased positively, because models often ignore negatives; Google's Veo guide advises against "no" and "don't". Set `generate_audio` to `false` whenever post-production supplies the sound, because Seedance 2.x adds voices, effects and music by default. In Draft mode, set it on the preview only: the final inherits it with the prompt, frames, duration and ratio, and rejects any of them resent, even unchanged.
7. **Audit.** Dispatch the audit to a fresh read-only agent, because language models correct their own reasoning poorly without outside feedback (Huang et al.). Then quote the cost. For a Draft shot, count the 480p preview plus the final at its chosen resolution, before submitting the preview; if the pair exceeds the budget, render that shot at 720p instead. Submit only on its "pass" and the user's approval. If the API reports low balance, stop and rough-cut the clips you have; topping up is the user's call.
8. **Generate and repair.** Generate at 720p and upscale; 2.0 mini outputs 480p or 720p only. Skip test clips: shoot real shots, the hardest one or two first. For a hard shot on Seedance 2.5, Draft mode (`draft: true`, which rejects any resolution but 480p) renders a preview billed as 480p; the final render sends the same model, the Draft task ID as `content.draft_task.id`, and a resolution of 1080p or 4K, and is billed separately at that resolution. Volcengine's price list at 720p and 24 fps works out to about ¥1.5/s for `doubao-seedance-2-5-260628`, ¥1.0/s for `doubao-seedance-2-5-flash-261115`, and ¥0.5/s for `doubao-seedance-2-0-mini-260615`, which suits most shots that aren't complex; the API's `usage.completion_tokens` is authoritative. Fix a bad clip by trimming, then in code, and reshoot only after changing the prompt or frames, keeping the old take.
9. **Post.** Do post-production in code, then dispatch the final review to a fresh agent. Write a notes file of style, prompts and mistakes for the next film.

```
[Style] <one sentence>. Style, colour and character design exactly match the first and last frames.
[Camera] <X> seconds, <shot size>, <position>, <move; if static: "locked-off camera, framing identical throughout">.
[Composition and colour] <where people and objects sit; wall and light colours, matching the first frame>
[Characters] <each person's appearance, clothes, fixed props>
[Second by second]
0–0.2 s: frame completely still, identical to the first frame.
<each segment: who does what, expression, where hands are, toward which side of frame>
Final 0.3 s: everyone still, identical to the last frame.
[Sound] Only sounds with a visible cause. Characters stay silent, mouths closed.
[Constraints] Only the people and objects in the first frame appear; faces and bodies stay identical; one continuous shot; clean frame with plain picture only.
```

```
You are the reviewer; read only, don't edit. This shot is about to be paid for.
Materials: <prompt>, <first frame>, <last frame>, <character sheet>, <shot list>, <colour rules>.
Zoom into the images and check:
1. Does every sentence match both images (position, left/right, colour, headcount, prop count, clothes, expression)?
2. Do both images share camera, size and background, and match the sheets and neighbouring shots?
3. Is each action realistic, with its cause written and the hands placed?
4. Where might the model fail (simultaneous action, objects from nowhere, faces on objects, wrong direction, ambiguous words, negative phrasing)?
End with only "pass" or "fail", and list changes if fail.
```

Post-production, the practitioner's settings: transitions with motion blur (8–16 sub-frames, half-frame shutter); grade saturation and brightness by section, never hue, keeping skin tones; decode Seedance MP4s as BT.601, keep lossless intermediates, tag delivery BT.709; upscale with lanczos and light sharpening, no whole-clip interpolation; cut to beats measured on the original track; spot-check 3 frames either side of each cut. The final reviewer gets only the cut: it writes the story as understood, lists what it didn't understand, checks each shot for repeats, prop counts, continuity, color jumps and face distortion, and names what it cannot check.

Fixes for common failures, from the practitioner's films:

| Failure | Fix |
| --- | --- |
| A group moves in unison | Name the order ("Dad first, a second later Grandma") |
| A person does wind's job | State the cause; "both hands stay at her sides" |
| Clouds or plants grow faces | Describe texture and motion only, never "cartoon cloud" |
| Wrong direction or place | Use screen terms ("toward frame left") and specific positions |
| Object counts change | State counts |
| A prop gets its usual use (a kettle pours) | Keep that prop out of action shots |
| Too much action | One or two actions per shot |
| Timing or push-in off | Leave slack; retime or push further in code |
| Mouths move, or music appears | Set `generate_audio` to `false`; replace clip audio in post |
| Clip drifts darker or jumps at the end | Color-match to the first frame; freeze on a clean frame |

## Sources

- [Stephen E. Palmer, Jonathan S. Gardner and Thomas D. Wickens, *Aesthetic Issues in Spatial Composition* (2008)](https://palmerlab.berkeley.edu/pdf/PalmerGardner&Wickens-1.pdf)
- [Jie Huang et al., *Large Language Models Cannot Self-Correct Reasoning Yet* (2024)](https://arxiv.org/abs/2310.01798)
- [Tim Menzies et al., *Are Delayed Issues Harder to Resolve?* (2016)](https://arxiv.org/abs/1609.04886)
- [OpenAI: Sora (2024)](https://openai.com/index/sora/)
- [Google Cloud: Video generation prompt guide (Veo)](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/video/video-gen-prompt-guide)
- [Volcengine Ark: Model pricing](https://www.volcengine.com/docs/82379/1544106)
- [Volcengine Ark: Create a video generation task](https://www.volcengine.com/docs/82379/1520757)
- [Volcengine Ark: Model list](https://www.volcengine.com/docs/82379/1330310)
- [Volcengine Ark: Seedance 2.5, Draft mode (in Chinese)](https://ark.volcengine.com/region:cn-beijing/docs/seedance-2-5#2.5_draft_mode)
- [@EianLu: AI video workflow with Claude Code, Codex and Seedance (in Chinese)](https://x.com/EianLu/status/2118317430665613741)
