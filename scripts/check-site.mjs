import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { resolve, relative } from "node:path";
import { siteUrl } from "../site.config.mjs";

const output = resolve(import.meta.dirname, "../dist");
const files = await readdir(output, { recursive: true });
const pages = files.filter((file) => file.endsWith(".html"));
let checked = 0;
for (const file of pages) {
  const html = await readFile(resolve(output, file), "utf8");
  const pageUrl = new URL(file.replace(/index\.html$/, ""), siteUrl);
  assert(!html.includes("{{SITE_URL}}"), `Unresolved URL in ${file}`);
  assert(!html.includes("groovyvenus133.chatgpt.site"), `Old host in ${file}`);
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)[1];
  assert(canonical.startsWith(siteUrl.href), `Incorrect canonical URL in ${file}`);
  const targets = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  const redirect = html.match(/http-equiv="refresh" content="0;url=([^"]+)"/);
  if (redirect) targets.push(redirect[1]);
  for (const target of targets) {
    const url = new URL(target.replaceAll("&amp;", "&"), pageUrl);
    if (url.origin !== siteUrl.origin) continue;
    assert(url.pathname.startsWith(siteUrl.pathname), `Link escapes site path: ${target} in ${file}`);
    let localPath = resolve(output, decodeURIComponent(url.pathname.slice(siteUrl.pathname.length)));
    assert(!relative(output, localPath).startsWith(".."), `Link escapes output: ${target}`);
    const info = await stat(localPath).catch(() => null);
    assert(info, `Missing target ${target} in ${file}`);
    if (info.isDirectory()) localPath = resolve(localPath, "index.html");
    const content = await readFile(localPath);
    if (url.hash && localPath.endsWith(".html")) {
      assert(content.toString().includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `Missing anchor ${target} in ${file}`);
    }
    checked++;
  }
}
const sitemap = await readFile(resolve(output, "sitemap.xml"), "utf8");
for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) assert(match[1].startsWith(siteUrl.href));
assert((await readFile(resolve(output, "robots.txt"), "utf8")).includes(new URL("sitemap.xml", siteUrl).href));
console.log(`Checked ${pages.length} HTML pages and ${checked} internal links, assets, and downloads for ${siteUrl.href}`);
