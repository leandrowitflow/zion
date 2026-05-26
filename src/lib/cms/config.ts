export const JOURNAL_INDEX_PATH = "/journal";

export function journalPostPath(slug: string): string {
  return `/journal/${slug}`;
}

export type CmsConfig = {
  baseUrl: string;
  siteId: string;
  apiKey: string;
  webhookSecret: string | undefined;
  contentLocale: string;
};

export function getCmsConfig(): CmsConfig | null {
  const baseUrl = process.env.CMS_API_BASE_URL?.replace(/\/$/, "");
  const siteId = process.env.CMS_SITE_ID?.trim();
  const apiKey = (process.env.CMS_API_KEY ?? process.env.CMS_WEBHOOK_SECRET)?.trim();
  const webhookSecret = process.env.CMS_WEBHOOK_SECRET?.trim();
  const contentLocale = process.env.CMS_CONTENT_LOCALE?.trim() || "en";

  if (!baseUrl || !siteId || !apiKey) {
    return null;
  }

  return { baseUrl, siteId, apiKey, webhookSecret, contentLocale };
}

export function isCmsConfigured(): boolean {
  return getCmsConfig() !== null;
}
