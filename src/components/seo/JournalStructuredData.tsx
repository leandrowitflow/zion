import { JsonLd } from "@/components/seo/JsonLd";
import { blogPostPath, type BlogPost } from "@/lib/blog";
import type { FaqItem } from "@/lib/seo/faqs";
import { ogImages } from "@/lib/seo/og";
import {
  blogPostingSchema,
  blogSchema,
  breadcrumbSchema,
  collectionPageSchema,
  faqSchema,
  itemListSchema,
} from "@/lib/seo/schemas";

const JOURNAL_PATH = "/journal";
const JOURNAL_NAME = "The Journal of ZION";
const JOURNAL_DESCRIPTION =
  "Curated stories on luxury travel, Portuguese destinations, craftsmanship, and quiet luxury from ZION Creative Artisans.";

type JournalStructuredDataProps = {
  faqs: FaqItem[];
  posts: BlogPost[];
};

/** Breadcrumb + Blog + CollectionPage + FAQ; ItemList + BlogPosting when articles exist. */
export function JournalStructuredData({ faqs, posts }: JournalStructuredDataProps) {
  const schemas = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: JOURNAL_NAME, path: JOURNAL_PATH },
    ]),
    blogSchema({
      name: JOURNAL_NAME,
      description: JOURNAL_DESCRIPTION,
      path: JOURNAL_PATH,
    }),
    collectionPageSchema({
      name: JOURNAL_NAME,
      description: JOURNAL_DESCRIPTION,
      path: JOURNAL_PATH,
      image: ogImages.journal,
    }),
    faqSchema(faqs),
  ];

  if (posts.length > 0) {
    schemas.push(
      itemListSchema({
        name: JOURNAL_NAME,
        path: JOURNAL_PATH,
        items: posts.map((post) => ({
          name: post.title,
          path: blogPostPath(post.slug),
        })),
      }),
    );

    for (const post of posts) {
      schemas.push(
        blogPostingSchema({
          title: post.title,
          description: post.description ?? post.title,
          path: blogPostPath(post.slug),
          image: post.image,
          datePublished: post.datePublished,
        }),
      );
    }
  }

  return <JsonLd data={schemas} />;
}
