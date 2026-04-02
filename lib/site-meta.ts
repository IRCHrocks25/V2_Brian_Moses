/** Canonical site URL for Open Graph / Twitter absolute URLs (metadataBase). */
export function getSiteMetadataBase(): URL {
  const raw = (process.env.SITE_URL || "https://www.brianmoses.com").replace(/\/$/, "");
  try {
    return new URL(raw);
  } catch {
    return new URL("https://www.brianmoses.com");
  }
}

/** Shared SEO / link preview strings (Open Graph, Twitter, browser title). */
export const SITE_LINK_PREVIEW_TITLE =
  "Internationally Recognized Speaker & Sales Performance Expert";

export const SITE_BROWSER_TITLE = `${SITE_LINK_PREVIEW_TITLE} | Brian Moses`;

export const SITE_META_DESCRIPTION =
  "Brian Moses — keynote speaker, real estate coach, and creator of the Attract, Don’t Chase system. Proven strategies for sales performance and scaling your business.";
