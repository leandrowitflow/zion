export type CmsAuthor = {
  id: string;
  name: string;
  slug: string;
  jobTitle: string | null;
  bio: string | null;
  avatarUrl: string | null;
};

export type CmsPostListItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl: string | null;
  coverImageAlt: string | null;
  publishedAt: string | null;
  updatedAt: string;
  author: CmsAuthor | null;
  categories: unknown[];
  seoTitle: string | null;
};

export type CmsPost = CmsPostListItem & {
  content: string;
  seoDescription: string | null;
  canonicalUrl: string | null;
  ogImageUrl: string | null;
  structuredData: unknown;
  locale: string;
  translations: Record<
    string,
    {
      title: string;
      excerpt: string;
      content: string;
      seoTitle: string | null;
      seoDescription: string | null;
    }
  >;
};

export type CmsPostsResponse = {
  posts: CmsPostListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type CmsSitemapResponse = {
  urls: Array<{
    slug: string;
    updatedAt: string;
    publishedAt: string | null;
  }>;
};

export type CmsWebhookEvent =
  | "post.published"
  | "post.updated"
  | "post.deleted"
  | "post.unpublished"
  | "cms.post.published"
  | "cms.post.updated";

export type CmsWebhookPayload = {
  event: CmsWebhookEvent;
  siteId: string;
  post?: {
    id?: string;
    slug?: string;
    status?: string;
    updatedAt?: string;
  };
  timestamp?: string;
  signatureVersion?: string;
};
