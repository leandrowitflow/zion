function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
  return stripDuplicateTitleHeading(content, title);
}
