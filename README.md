# Daniel David — Portfolio

A static portfolio and research site built with plain HTML, CSS, and JavaScript, hosted on GitHub Pages. No Cloudflare account or server is required.

Site: https://dayveedaniel.github.io/personal-blog/

## Build

```bash
npm run build
npm run check
```

Use Node.js 24. There are no package dependencies to install. The output is `dist/`.

## Deployment

In the repository's **Settings → Pages**, select **GitHub Actions** as the source.
The workflow in `.github/workflows/pages.yml` builds, checks, and publishes the site
after each push to `main`. It can also be run manually from the Actions tab.
Only `dist/` is deployed; source files and original reports remain in the repository.

The workflow uses GitHub's Pages URL automatically. `site.config.mjs` supplies the
default URL for local builds; override `SITE_URL` for another host or a custom domain.
The build handles repository subpaths, canonical URLs, the sitemap, and downloads.

## Local preview

```bash
SITE_URL=http://127.0.0.1:4173/ npm run build
SITE_URL=http://127.0.0.1:4173/ npm run check
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Run `npm run build` again to restore the default GitHub Pages build.

## Content

- `site/index.html` — homepage template, shared sidebar, and CV copy
- `content/projects.mjs` — article copy, homepage summaries, and report mappings
- `content/future-research.mjs` — future research summaries and article copy
- `future_research/` — source research concept notes
- `site/styles.css` — visual design and responsive layout
- `site/navigation.js` — mobile menu and footer year
- `scripts/build.mjs` — generates the homepage, article pages, sitemap, and report downloads
- `reports/` — original project reports and research manuscripts
- `public/` — downloadable résumé and research files

Each project opens at `/projects/<slug>/`; research articles use `/research/<slug>/`.
Future research notes use `/future-research/<slug>/`.
Each note's `proposal` field maps a Markdown file in `future_research/` to a downloadable copy in `dist/proposals/`.
The build copies only reports explicitly mapped in `content/projects.mjs` into `dist/reports/`.
To add a report to an existing article, replace its `report: null` with a source filename and
a URL-safe output filename. LaTeX sources use `manuscript: true` and are labeled as `.tex`
downloads, not PDFs. Rebuild after editing; serve `dist/`, not the source templates.
