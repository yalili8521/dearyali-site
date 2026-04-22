# dearyali.com — source

Source files + build pipeline for **dearyali.com** (the personal site of Yali Li).

## Folder layout

```
personal-site/          ← what Cloudflare Pages serves (committed to repo)
├── index.html          ← built (from source/src/index.html)
├── app.js              ← built (esbuild output of source/src/app.jsx)
├── robots.txt          ← built (copy of source/src/robots.txt)
├── sitemap.xml         ← built (copy of source/src/sitemap.xml)
└── source/             ← YOU EDIT FILES HERE
    ├── src/
    │   ├── index.html  # HTML shell, meta tags, noscript fallback
    │   ├── app.jsx     # React component (JSX)
    │   ├── robots.txt
    │   └── sitemap.xml
    ├── build.mjs       # esbuild: JSX → JS + copy static assets to ../
    ├── package.json
    ├── README.md
    └── .gitignore
```

## The workflow (push-to-deploy)

```bash
cd source/
npm install          # only once
# ... edit files in src/ ...
npm run build        # writes straight into personal-site/ (the parent)
cd ..
git add .
git commit -m "update site"
git push             # Cloudflare Pages auto-deploys personal-site/
```

No Cloudflare Pages build step is needed — we commit the built files, and Pages serves them as static.

## Local preview

After `npm run build`, open `personal-site/index.html` in a browser, or serve with any static server:

```bash
cd ..
npx serve .
```

## Watch mode (optional)

```bash
cd source/
npm run dev          # rebuilds on change
```

## Analytics

Cloudflare Web Analytics is the default. To enable:

1. Cloudflare dashboard → Web Analytics → add site `dearyali.com`.
2. Copy the beacon token.
3. In `source/src/index.html`, uncomment the Cloudflare beacon block and paste the token.
4. `npm run build`, commit, push.

No cookie banner required — CF Web Analytics is privacy-friendly and cookieless.

## What's already in place

- `@babel/standalone` is gone — JSX pre-compiled to a 23 KB minified JS file.
- React / ReactDOM load from unpkg CDN (can be bundled later if desired).
- Full SEO stack: description, keywords, canonical, robots, theme-color.
- Open Graph + Twitter Card tags.
- JSON-LD `Person` schema with Organization (auctura ai), LinkedIn, email, languages.
- `<noscript>` fallback inside `#root` for crawlers + no-JS visitors.
- Skip-to-content link for keyboard users.
- Inline SVG favicon — no extra request.
- `robots.txt` + `sitemap.xml` with hreflang for EN.
