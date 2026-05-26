import { blogAssets } from "@/lib/assets/blog";

export type BlogPost = {
  slug: string;
  title: string;
  image: string;
  description?: string;
  datePublished?: string;
};

/** Published journal entries — populated when posts go live. */
export const blogPosts: BlogPost[] = [];

export const BLOG_POSTS_PER_PAGE = 12;

export function blogPostPath(slug: string): string {
  return `/journal/${slug}`;
}

export function getBlogPostSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}
