import { fetchAllCmsPosts, fetchCmsPostBySlug, fetchCmsSitemap } from "@/lib/cms/client";
import { getCmsConfig, isCmsConfigured, journalPostPath } from "@/lib/cms/config";
import { sanitizeJournalContent } from "@/lib/cms/sanitize-content";
import type { CmsPost, CmsPostListItem } from "@/lib/cms/types";

export type BlogPost = {
  slug: string;
  title: string;
  image?: string;
  description?: string;
  datePublished?: string;
};

export type JournalAuthor = {
  name: string;
  jobTitle?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
};

export type JournalArticle = BlogPost & {
  content: string;
  author?: JournalAuthor | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  structuredData?: unknown;
  updatedAt?: string;
};

export const BLOG_POSTS_PER_PAGE = 12;

export const blogPostPath = journalPostPath;

function pickLocalizedFields(
  post: CmsPostListItem | CmsPost,
  locale: string,
): Pick<BlogPost, "title" | "description"> {
  if ("translations" in post) {
    const translation = post.translations[locale];
    if (translation) {
      return {
        title: translation.title || post.title,
        description: translation.excerpt || post.excerpt,
      };
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

function mapListItem(post: CmsPostListItem, locale: string): BlogPost {
  const localized = pickLocalizedFields(post, locale);

  return {
    slug: post.slug,
    title: localized.title,
    image: post.coverImageUrl ?? undefined,
    description: localized.description,
    datePublished: post.publishedAt ?? undefined,
  };
}

function mapJournalAuthor(post: CmsPost): JournalAuthor | null {
  if (!post.author) {
    return null;
  }

  return {
    name: post.author.name,
    jobTitle: post.author.jobTitle,
    bio: post.author.bio,
    avatarUrl: post.author.avatarUrl ?? undefined,
  };
}

function mapArticle(post: CmsPost, locale: string): JournalArticle {
  const localized = pickLocalizedFields(post, locale);
  const translation = post.translations[locale];
  const rawContent = translation?.content || post.content;
  const seoTitle = translation?.seoTitle ?? post.seoTitle;
  const seoDescription = translation?.seoDescription ?? post.seoDescription;

  return {
    ...mapListItem(post, locale),
    title: localized.title,
    description: localized.description ?? seoDescription ?? undefined,
    content: sanitizeJournalContent(rawContent, localized.title),
    author: mapJournalAuthor(post),
    seoTitle,
    seoDescription,
    structuredData: post.structuredData,
    updatedAt: post.updatedAt,
  };
}

export async function getJournalPosts(): Promise<BlogPost[]> {
  if (!isCmsConfigured()) {
    return [];
  }

  try {
    const locale = getCmsConfig()?.contentLocale ?? "en";
    const posts = await fetchAllCmsPosts();
    return posts.map((post) => mapListItem(post, locale));
  } catch (error) {
    console.error("[journal] Failed to fetch posts from CMS:", error);
    return [];
  }
}

export async function getJournalArticle(slug: string): Promise<JournalArticle | null> {
  if (!isCmsConfigured()) {
    return null;
  }

  try {
    const locale = getCmsConfig()?.contentLocale ?? "en";
    const post = await fetchCmsPostBySlug(slug);
    if (!post) {
      return null;
    }

    return mapArticle(post, locale);
  } catch (error) {
    console.error(`[journal] Failed to fetch post "${slug}" from CMS:`, error);
    return null;
  }
}

export async function getJournalPostSlugs(): Promise<string[]> {
  if (!isCmsConfigured()) {
    return [];
  }

  try {
    const urls = await fetchCmsSitemap();
    return urls.map((entry) => entry.slug);
  } catch (error) {
    console.error("[journal] Failed to fetch CMS sitemap:", error);
    return [];
  }
}
