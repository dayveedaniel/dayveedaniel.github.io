// Override SITE_URL to build for a custom domain or local preview.
export const siteUrl = new URL(process.env.SITE_URL || "https://dayveedaniel.github.io/");
if (!["https:", "http:"].includes(siteUrl.protocol) || siteUrl.search || siteUrl.hash || siteUrl.username || siteUrl.password) {
  throw new Error("SITE_URL must be an HTTP(S) URL without credentials, a query, or a fragment.");
}
siteUrl.pathname = siteUrl.pathname.replace(/\/?$/, "/");
