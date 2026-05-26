function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const LEADING_COVER_MARKDOWN_RE = /^!\[Cover image\]\([^)]*\)\s*\n?/i;

/** CMS API may still contain unreplaced cover placeholders — cover renders from coverImageUrl. */
export function stripLeadingCoverImageMarkdown(content: string): string {
  let result = content.trimStart();

  while (LEADING_COVER_MARKDOWN_RE.test(result)) {
    result = result.replace(LEADING_COVER_MARKDOWN_RE, "").trimStart();
  }

  return result
    .replace(/^!\[[^\]]*\]\(\{COVER_IMAGE_PLACEHOLDER\}\)\s*\n?/gi, "")
    .replace(/!\[[^\]]*\]\(\{COVER_IMAGE_PLACEHOLDER\}\)\s*/gi, "")
    .replace(/<img[^>]*COVER_IMAGE_PLACEHOLDER[^>]*>\s*/gi, "")
    .trimStart();
}

/** Removes duplicate title H1 when the page template already renders the title. */
export function stripDuplicateTitleHeading(content: string, title: string): string {
  if (!title.trim()) {
    return content;
  }

  const escaped = escapeRegExp(title.trim());
  return content.replace(new RegExp(`^#\\s+${escaped}\\s*\\n+`, "i"), "");
}

export function sanitizeJournalContent(content: string, title: string): string {
  return stripDuplicateTitleHeading(stripLeadingCoverImageMarkdown(content), title);
}
