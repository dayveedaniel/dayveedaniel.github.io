# Daniel David — Portfolio

A fast, accessible portfolio and research site built with plain HTML, CSS, and JavaScript. The generated `dist/` directory is ready for Cloudflare Pages or any static host.

## Build

```bash
npm run build
```

For Cloudflare Pages, use `npm run build` as the build command and `dist` as the output directory.

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
