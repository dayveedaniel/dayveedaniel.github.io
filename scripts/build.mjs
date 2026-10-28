import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { projects } from "../content/projects.mjs";
import { futureResearch } from "../content/future-research.mjs";
import { siteUrl } from "../site.config.mjs";

const articles = [...projects, ...futureResearch];

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "dist");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(resolve(root, "site"), output, { recursive: true });
await cp(resolve(root, "public"), output, { recursive: true });

const template = (await readFile(resolve(root, "site/index.html"), "utf8")).replaceAll("{{SITE_URL}}", siteUrl.href);
const basePath = siteUrl.pathname.replace(/\/$/, "");
const publicPath = (path) => `${basePath}${path}`;
const absoluteUrl = (path) => new URL(path.replace(/^\//, ""), siteUrl).href;
// Source HTML uses root-relative links; deployment may live under a repository path.
const deployHtml = (html) => html.replace(/(href|src)="\/(?!\/)/g, `$1="${basePath}/`);
const escape = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const articlePath = (project) => `/${project.section}/${project.slug}/`;
const badge = (project) => project.badge ? ` <span class="project-badge">${escape(project.badge)}</span>` : "";
const entries = (section) => articles.filter((project) => project.section === section).map((project, index) => `
  <article class="entry">
    <span class="entry-index">${String(index).padStart(2, "0")}</span>
    <div><h3><a href="${articlePath(project)}">${escape(project.title)}</a>${badge(project)}</h3><p>${escape(project.summary)}</p></div>
    <div class="entry-side"><span>${escape(project.category)}</span><a href="${articlePath(project)}" aria-label="Read ${escape(project.title)}">↗</a></div>
  </article>`).join("\n");

await writeFile(resolve(output, "index.html"), deployHtml(template
  .replace("<!-- PROJECT_ENTRIES -->", entries("projects"))
  .replace("<!-- RESEARCH_ENTRIES -->", entries("research"))
  .replace("<!-- FUTURE_RESEARCH_ENTRIES -->", entries("future-research"))));

const sidebar = template.match(/<aside class="sidebar"[\s\S]*?<\/aside>/)[0]
  .replaceAll('href="#', 'href="/#');
const footer = template.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)[0]
  .replace('href="#home"', 'href="#content"');
await mkdir(resolve(output, "reports"), { recursive: true });
await mkdir(resolve(output, "proposals"), { recursive: true });

for (const project of articles) {
  const title = escape(project.title);
  const section = { projects: "Projects", research: "Research", "future-research": "Future Research" }[project.section];
  const report = project.report;
  const reports = [report, ...(project.additionalReports ?? [])].filter(Boolean);
  for (const file of reports) await cp(resolve(root, "reports", file.source), resolve(output, "reports", file.file));
  if (project.proposal) await cp(resolve(root, "future_research", project.proposal), resolve(output, "proposals", project.proposal));
  const resources = [
    ...(project.proposal ? [`<a href="/proposals/${escape(project.proposal)}" download>Download full proposal (MD) ↓</a>`] : []),
    ...(reports.length ? reports.map((file) => `<a href="/reports/${file.file}" download>Download ${escape(file.label ?? (file.manuscript ? "manuscript (.tex)" : "report (PDF)"))} ↓</a>`)
      : []),
    ...(project.links ?? []).map((link) => `<a href="${escape(link.href)}" target="_blank" rel="noreferrer">${escape(link.label)} ↗</a>`)
  ].join("\n");
  const words = project.body.replace(/<[^>]*>/g, " ").split(/\s+/).length;
  const page = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title} — Daniel David</title>
    <meta name="description" content="${escape(project.summary)}" />
    <meta name="theme-color" content="#f5f4ee" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${escape(project.summary)}" />
    <meta property="og:url" content="${absoluteUrl(articlePath(project))}" />
    <link rel="canonical" href="${absoluteUrl(articlePath(project))}" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="/styles.css" />
    <script src="/navigation.js" defer></script>
  </head>
  <body>
    <a class="skip-link" href="#content">Skip to content</a>
    ${sidebar}
    <main id="content">
      <article class="project-article">
        <a class="back-link" href="/#${project.section}">← All ${section.toLowerCase()}</a>
        <header class="article-header">
          <p class="article-meta">${escape(project.category)} · ${Math.max(1, Math.ceil(words / 220))} min read</p>
          <h1>${title}${badge(project)}</h1>
          <p class="article-deck">${escape(project.summary)}</p>
          ${resources ? `<div class="article-resources">${resources}</div>` : ""}
          ${report?.manuscript ? `<p class="article-note">${escape(report.note ?? "LaTeX manuscript source; a compiled PDF is not yet available.")}</p>` : ""}
        </header>
        <div class="article-body">${project.body}</div>
        <nav class="article-end" aria-label="Article navigation"><a href="/#${project.section}">← Back to ${section.toLowerCase()}</a><a href="#content">Back to top ↑</a></nav>
      </article>
      ${footer}
    </main>
  </body>
</html>`;
  const directory = resolve(output, project.section, project.slug);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, "index.html"), deployHtml(page));
  // Keep bookmarked article URLs working on any static host.
  for (const alias of project.aliases ?? []) {
    const aliasDirectory = resolve(output, project.section, alias);
    await mkdir(aliasDirectory, { recursive: true });
    await writeFile(resolve(aliasDirectory, "index.html"), deployHtml(`<!doctype html>
<html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title} — Daniel David</title><meta name="robots" content="noindex" />
<link rel="canonical" href="${absoluteUrl(articlePath(project))}" />
<meta http-equiv="refresh" content="0;url=${publicPath(articlePath(project))}" /></head>
<body><p>This article has moved to <a href="${articlePath(project)}">${title}</a>.</p></body></html>`));
  }
}

await writeFile(resolve(output, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${["/", ...articles.map(articlePath)].map((path) => `  <url><loc>${absoluteUrl(path)}</loc></url>`).join("\n")}
</urlset>\n`);
await writeFile(resolve(output, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`);
await writeFile(resolve(output, ".nojekyll"), "");
console.log(`Built static site with ${articles.length} articles in dist/`);
