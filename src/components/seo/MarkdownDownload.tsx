"use client";

import { useEffect } from "react";

const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "SVG", "NAV", "FORM"]);

function visibleText(node: Node): string {
  return (node.textContent ?? "").replace(/\s+/g, " ").trim();
}

function pageSlug(): string {
  const path = window.location.pathname.replace(/\/$/, "") || "home";
  return path.replace(/^\//, "").replace(/\//g, "-") || "home";
}

function nodeToMarkdown(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = visibleText(node);
    return text;
  }

  if (!(node instanceof HTMLElement)) {
    return "";
  }

  if (node.dataset.mdDownload === "true" || SKIP_TAGS.has(node.tagName)) {
    return "";
  }

  const tag = node.tagName;

  if (tag === "H1" || tag === "H2" || tag === "H3" || tag === "H4") {
    const level = Number(tag[1]);
    const text = visibleText(node);
    return text ? `${"#".repeat(level)} ${text}\n\n` : "";
  }

  if (tag === "P") {
    const text = visibleText(node);
    return text ? `${text}\n\n` : "";
  }

  if (tag === "LI") {
    const text = visibleText(node);
    return text ? `- ${text}\n` : "";
  }

  if (tag === "UL" || tag === "OL") {
    const items = Array.from(node.children)
      .map((child) => nodeToMarkdown(child))
      .join("");
    return items ? `${items}\n` : "";
  }

  if (tag === "DETAILS") {
    const question = visibleText(node.querySelector(".faq-item-question") ?? node.querySelector("summary") ?? node);
    const answer = visibleText(node.querySelector(".faq-item-answer") ?? node.querySelector("p") ?? node);
    if (!question) {
      return "";
    }
    return `### ${question}\n\n${answer ? `${answer}\n\n` : ""}`;
  }

  if (tag === "A") {
    const text = visibleText(node);
    const href = node.getAttribute("href");
    if (text && href && href.startsWith("/")) {
      return `[${text}](${href})`;
    }
    return text;
  }

  if (tag === "IMG") {
    const alt = node.getAttribute("alt")?.trim();
    const src = node.getAttribute("src");
    if (alt && src && !node.hasAttribute("aria-hidden")) {
      return `![${alt}](${src})\n\n`;
    }
    return "";
  }

  if (tag === "BR") {
    return "\n";
  }

  return Array.from(node.childNodes).map((child) => nodeToMarkdown(child)).join("");
}

function pageToMarkdown(): string {
  const title = document.title.trim();
  const source = window.location.href;
  const root = document.querySelector("main") ?? document.body;
  const body = nodeToMarkdown(root).replace(/\n{3,}/g, "\n\n").trim();

  return `# ${title}\n\nSource: ${source}\n\n---\n\n${body}\n`;
}

function downloadMarkdown() {
  const markdown = pageToMarkdown();
  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${pageSlug()}.md`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

/** Subtle MD download control — injected beside the page H1, matching Flow. */
export function MarkdownDownload() {
  useEffect(() => {
    const heading = document.querySelector("main h1");
    if (!heading || heading.querySelector("[data-md-download]")) {
      return;
    }

    const host = document.createElement("span");
    host.dataset.mdDownload = "true";
    host.style.display = "inline-flex";
    host.style.alignItems = "center";
    host.style.marginLeft = "0.75rem";
    host.style.verticalAlign = "middle";

    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", "Download page as Markdown");
    button.title = "Download as Markdown";
    button.className = "md-download-button";
    button.addEventListener("click", downloadMarkdown);

    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path><path d="M14 2v5a1 1 0 0 0 1 1h5"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>`;

    host.appendChild(button);
    heading.appendChild(host);

    return () => {
      button.removeEventListener("click", downloadMarkdown);
      host.remove();
    };
  }, []);

  return null;
}
