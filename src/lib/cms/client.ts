import { getCmsConfig } from "@/lib/cms/config";
import type { CmsPost, CmsPostsResponse, CmsSitemapResponse } from "@/lib/cms/types";

class CmsApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "CmsApiError";
  }
}

async function cmsFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const config = getCmsConfig();
  if (!config) {
    throw new CmsApiError("CMS is not configured", 503);
  }

  const url = `${config.baseUrl}${path}`;
  const response = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      Accept: "application/json",
      ...init?.headers,
    },
    next: { revalidate: 3600, tags: ["cms-journal"] },
  });

  if (!response.ok) {
    throw new CmsApiError(`CMS request failed (${response.status})`, response.status);
  }

  return response.json() as Promise<T>;
}

export async function fetchCmsPosts(page = 1, limit = 100): Promise<CmsPostsResponse> {
  const config = getCmsConfig();
  if (!config) {
    return {
      posts: [],
      pagination: { page: 1, limit, total: 0, totalPages: 0 },
    };
  }

  const params = new URLSearchParams({
    status: "published",
    page: String(page),
    limit: String(limit),
    locale: config.contentLocale,
  });

  return cmsFetch<CmsPostsResponse>(`/api/v1/sites/${config.siteId}/posts?${params}`);
}

export async function fetchAllCmsPosts(): Promise<CmsPostsResponse["posts"]> {
  const first = await fetchCmsPosts(1, 100);
  if (first.pagination.totalPages <= 1) {
    return first.posts;
  }

  const rest = await Promise.all(
    Array.from({ length: first.pagination.totalPages - 1 }, (_, index) =>
      fetchCmsPosts(index + 2, 100).then((response) => response.posts),
    ),
  );

  return [...first.posts, ...rest.flat()];
}

export async function fetchCmsPostBySlug(slug: string): Promise<CmsPost | null> {
  const config = getCmsConfig();
  if (!config) {
    return null;
  }

  try {
    const locale = config.contentLocale;
    return await cmsFetch<CmsPost>(
      `/api/v1/sites/${config.siteId}/posts/${encodeURIComponent(slug)}?locale=${encodeURIComponent(locale)}`,
    );
  } catch (error) {
    if (error instanceof CmsApiError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function fetchCmsSitemap(): Promise<CmsSitemapResponse["urls"]> {
  const config = getCmsConfig();
  if (!config) {
    return [];
  }

  const response = await cmsFetch<CmsSitemapResponse>(`/api/v1/sites/${config.siteId}/sitemap`);
  return response.urls;
}
