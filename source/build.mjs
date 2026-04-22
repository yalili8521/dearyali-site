// Build script for dearyali.com
// Compiles src/app.jsx -> ../app.js (React classic transform, minified)
// Copies static assets (index.html, robots.txt, sitemap.xml) from src/ to ../
//
// The output lives one level up (personal-site/) so Cloudflare Pages can serve
// the built files as-is from the repo. Workflow: edit src/ -> npm run build -> commit + push.

import * as esbuild from 'esbuild';
import { cp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const SRC = 'src';
const OUT = '..';  // personal-site/
const WATCH = process.argv.includes('--watch');

// Files we own at the output root. We only touch these — we never rm the whole OUT
// directory, because OUT is the parent folder and contains source/ itself.
const OWNED_FILES = ['app.js', 'index.html', 'robots.txt', 'sitemap.xml'];

// Clean only the files we own
for (const f of OWNED_FILES) {
  const p = `${OUT}/${f}`;
  if (existsSync(p)) await rm(p, { force: true });
}

// Copy static assets (HTML + plain-text files)
const staticAssets = ['index.html', 'robots.txt', 'sitemap.xml'];
for (const f of staticAssets) {
  const from = `${SRC}/${f}`;
  const to = `${OUT}/${f}`;
  if (existsSync(from)) {
    await cp(from, to);
    console.log(`copy  ${from}  ->  ${to}`);
  }
}

// Compile JSX -> JS
// Classic transform: output uses global React.createElement.
// React / ReactDOM load as externals from CDN via <script> tags in index.html.
const buildOptions = {
  entryPoints: [`${SRC}/app.jsx`],
  outfile: `${OUT}/app.js`,
  bundle: false,            // no imports to resolve; app.jsx uses global React
  minify: true,
  target: ['es2019'],
  loader: { '.jsx': 'jsx' },
  jsx: 'transform',
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  logLevel: 'info',
};

if (WATCH) {
  const ctx = await esbuild.context(buildOptions);
  await ctx.watch();
  console.log('watching...');
} else {
  await esbuild.build(buildOptions);
  console.log('built.');
}
