# dearyali-site

Personal bilingual EN/中文 React site — [dearyali.com](https://dearyali.com).

## Stack

- React (classic JSX transform, loaded from CDN via `<script>` tags)
- esbuild for JSX compilation + minification
- Cloudflare Pages for hosting (git-connected, auto-deploy on push to `main`)

## Layout

```
source/              — dev tooling (not deployed)
  src/               — JSX source + static HTML
      app.jsx          — React app
          index.html       — HTML shell
              robots.txt
                  sitemap.xml
                    build.mjs          — esbuild script
                      package.json

                      app.js               — built JS (committed, served by CF)
                      index.html           — built HTML (committed, served by CF)
                      robots.txt
                      sitemap.xml
                      ```

                      ## Local workflow

                      ```bash
                      cd source
                      npm install        # first time only
                      npm run build      # compiles src/app.jsx -> ../app.js + copies HTML/robots/sitemap
                      cd ..
                      git add .
                      git commit -m "..."
                      git push           # Cloudflare auto-deploys
                      ```
                      
