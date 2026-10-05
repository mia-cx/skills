// Usage: node proof.mjs <logo-dir> — proof every direction dir (one containing mark.svg): writes proof.png and per-dir board.png.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const logoDir = path.resolve(process.argv[2] ?? '');
if (!fs.statSync(logoDir, { throwIfNoEntry: false })?.isDirectory()) {
  console.error(`Not a directory: ${logoDir}`);
  process.exit(1);
}

const dirs = fs.readdirSync(logoDir, { withFileTypes: true })
  .filter(e => e.isDirectory() && fs.existsSync(path.join(logoDir, e.name, 'mark.svg')))
  .map(e => e.name)
  .sort();
if (!dirs.length) {
  console.error(`No direction dirs (subdir with mark.svg) under ${logoDir}`);
  process.exit(1);
}

const chromium = process.env.CHROMIUM
  ?? ['chromium', 'chromium-browser', 'google-chrome'].find(b => {
    try { execFileSync('which', [b], { stdio: 'ignore' }); return true; } catch { return false; }
  })
  ?? ['/Applications/Chromium.app/Contents/MacOS/Chromium',
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome']
    .find(p => fs.existsSync(p));
if (!chromium) {
  console.error('Chromium not found; set CHROMIUM to a binary path');
  process.exit(1);
}

const shoot = (htmlFile, png, w, h) => {
  execFileSync(chromium, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars',
    '--allow-file-access-from-files',
    `--screenshot=${png}`, `--window-size=${w},${h}`,
    `file://${htmlFile}`,
  ], { stdio: 'pipe' });
  console.log(png);
};

// Fixed geometry so the page size is exact regardless of mark aspect ratio.
const PAD = 32, GAP = 24, LABEL = 20, BIG = 256, SQ = 64;
const BLOCK = PAD + LABEL + 16 + BIG + 16 + SQ + PAD + 1; // 437, +1 for border-bottom
const WIDTH = PAD * 2 + 600 * 2 + GAP; // 1288

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'proof-'));
try {
  const cell = (d, w, h, dark) =>
    `<div class="cell${dark ? ' dark' : ''}" style="width:${w}px;height:${h}px">`
    + `<img ${dark ? 'class="inv" ' : ''}src="file://${path.join(logoDir, d, 'mark.svg')}"></div>`;
  const block = d => `<div class="block"><div class="label">${d}</div>`
    + `<div class="line">${cell(d, 600, BIG, false)}${cell(d, 600, BIG, true)}</div>`
    + `<div class="line">${[64, 32, 16].map(s => cell(d, s, s, false)).join('')
      + [64, 32, 16].map(s => cell(d, s, s, true)).join('')}</div></div>`;
  const html = `<!doctype html><style>
    *{margin:0;box-sizing:border-box}
    body{width:${WIDTH}px;background:#fff;font:12px/20px sans-serif}
    .block{padding:${PAD}px;border-bottom:1px solid #eee}
    .label{color:#888;height:${LABEL}px}
    .line{display:flex;align-items:flex-end;gap:${GAP}px;margin-top:16px}
    .cell{background:#fff;flex:none}
    .cell.dark{background:#111}
    img{width:100%;height:100%;object-fit:contain;display:block}
    .inv{filter:invert(1)}
  </style>${dirs.map(block).join('')}`;
  const htmlFile = path.join(tmp, 'proof.html');
  fs.writeFileSync(htmlFile, html);
  shoot(htmlFile, path.join(logoDir, 'proof.png'), WIDTH, dirs.length * BLOCK);

  for (const d of dirs) {
    const board = path.join(logoDir, d, 'board.svg');
    if (!fs.existsSync(board)) continue;
    const bf = path.join(tmp, `${d}.html`);
    fs.writeFileSync(bf, `<!doctype html><style>body{margin:0}img{display:block}</style><img src="file://${board}">`);
    shoot(bf, path.join(logoDir, d, 'board.png'), 2560, 1440);
  }
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}
