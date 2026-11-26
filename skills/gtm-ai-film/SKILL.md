---
name: gtm-ai-film
description: Direct a short film with image and video models, catching errors before they cost money.
disable-model-invocation: true
---

# AI film

Part of [gtm](../gtm/SKILL.md): its copy sheet and boundaries apply here.

Direct a short film made with an image model and a video model. Claims on screen come from the copy sheet, and the user watches motion and listens to sound, because you can do neither.

You direct: story, storyboard, every prompt, checking each image and clip, and post-production in code with ffmpeg and Python. An image model draws (Codex: `codex exec --skip-git-repo-check -s read-only -i reference.png - < prompt.txt`, prompt opening "Use your image generation tool to create exactly ONE image. Do not run shell commands."; images land in `~/.codex/generated_images/<session id>/`). A video model animates between a first and last frame (one practitioner uses Seedance through the Volcengine Ark API, key in `ARK_API_KEY`, never printed). Errors get costlier at each stage: text is free, images cheap, video billed per second. So catch every error at the cheapest stage.

1. **Brief.** Ask length, aspect ratio, total budget, music and subtitles. Check that the image tool, ffmpeg, Python and the API key work. Keep everything in a new project folder, and save each version as a new file.
2. **Story.** Write the point in one sentence, the most striking image first (state its second), and turns that pass real-world logic: why does it happen, where does the object come from, can they reach it. Write each gag in three beats, problem, solution, bystander reaction, with reactions staggered. Prefer episodic structure, because continuous stories break most easily. Avoid shots models get wrong: people crossing, hands holding small objects, text, mirrors, asymmetric features, lighting changes within a shot, one person doing three actions, top-down shots hiding faces, crowds. With a song, put turns on the chorus and key actions on the downbeat. Done when a fresh agent's review passes and the user approves.
3. **Shot list.** Per shot: time, generation seconds (rounded up, ~0.5 s spare), size, camera position and move, who goes where, what moves. Change angle every shot (eye-level frontal at most twice), alternate shot sizes, keep something moving, give every camera move a reason, and place heads at 38% or 62% of frame width. Lock a palette in a color table, draw 1920×1080 color-block sketches per shot, and view them in greyscale: if people merge into the background, rework the palette. Done when the user approves sketches and palette.
4. **Look.** Fix the style from one reference image, then draw character and prop sheets (front, side, expressions) with the position of every fixed detail written down ("tattoo on left forearm"). Done when the user approves the style.
5. **Frames.** Draw the busier frame (usually the last) first, then edit it into the first with identical camera. For a push-in, crop the first frame. Both frames match in size and aspect ratio. Everything used in the action, and small details like rain, hats and tattoos, appear in both frames. Stage reactions in the first frame, vary poses, leave room for action, keep wind consistent, check at phone size, and overlay the two frames: anything that differs will drift during the clip. Image models re-render the whole image on a small edit, so paste the edited patch back onto the original.
6. **Prompt.** Use the seven-part template, phrased positively, because models often ignore negatives.
7. **Audit.** Dispatch the audit to a fresh read-only agent, then quote the cost. Submit only on its "pass" and the user's approval. If the API reports low balance, stop and rough-cut the clips you have; topping up is the user's call.
8. **Generate and repair.** Generate at 720p and upscale. Skip test clips: shoot real shots, the hardest one or two first. One practitioner's prices at 720p: `doubao-seedance-2-5-260628` about ¥1.5/s, `doubao-seedance-2-0-mini-260615` about ¥0.5/s, which suits most shots that aren't complex; the bill is authoritative. Fix a bad clip by trimming, then in code, and reshoot only after changing the prompt or frames, keeping the old take.
9. **Post.** Do post-production in code, then dispatch the final review to a fresh agent. Write a notes file of style, prompts and mistakes for the next film.

```
[Style] <one sentence>. Style, colour and character design exactly match the first and last frames.
[Camera] <X> seconds, <shot size>, <position>, <move; if static: "no push, no pull, no pan, no cut">.
[Composition and colour] <where people and objects sit; wall and light colours, matching the first frame>
[Characters] <each person's appearance, clothes, fixed props>
[Second by second]
0–0.2 s: frame completely still, identical to the first frame.
<each segment: who does what, expression, where hands are, toward which side of frame>
Final 0.3 s: everyone still, identical to the last frame.
[Sound] Only sounds with a visible cause. Characters don't speak.
[Constraints] Only the people and objects in the first frame appear; faces and bodies never change; one continuous shot; no text, subtitles or watermark.
```

```
You are the reviewer; read only, don't edit. This shot is about to be paid for.
Materials: <prompt>, <first frame>, <last frame>, <character sheet>, <shot list>, <colour rules>.
Zoom into the images and check:
1. Does every sentence match both images (position, left/right, colour, headcount, prop count, clothes, expression)?
2. Do both images share camera, size and background, and match the sheets and neighbouring shots?
3. Is each action realistic, with its cause written and the hands placed?
4. Where might the model fail (simultaneous action, objects from nowhere, faces on objects, wrong direction, ambiguous words)?
End with only "pass" or "fail", and list changes if fail.
```

Post-production: transitions with motion blur (8–16 sub-frames, half-frame shutter); grade saturation and brightness by section, never hue, keeping skin tones; decode Seedance MP4s as BT.601, keep lossless intermediates, tag delivery BT.709; upscale with lanczos and light sharpening, no whole-clip interpolation; cut to beats measured on the original track; spot-check 3 frames either side of each cut. The final reviewer gets only the cut: it writes the story as understood, lists what it didn't understand, checks each shot for repeats, prop counts, continuity, color jumps and face distortion, and names what it cannot check.

Fixes for common failures:

| Failure | Fix |
| --- | --- |
| A group moves in unison | Name the order ("Dad first, a second later Grandma") |
| A person does wind's job | State the cause; "both hands never touch the bag" |
| Clouds or plants grow faces | Describe texture and motion only, never "cartoon cloud" |
| Wrong direction or place | Use screen terms ("toward frame left") and specific positions |
| Object counts change | State counts |
| A prop gets its usual use (a kettle pours) | Keep that prop out of action shots |
| Too much action | One or two actions per shot |
| Timing or push-in off | Leave slack; retime or push further in code |
| Mouths move, or music appears | "Characters don't speak"; replace clip audio in post |
| Clip drifts darker or jumps at the end | Color-match to the first frame; freeze on a clean frame |
