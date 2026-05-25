"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = "main.site-main .relative.overflow-hidden";
const MIN_SIZE = 120;

function shouldReveal(container: HTMLElement) {
  if (container.classList.contains("scroll-reveal")) return false;
  if (container.closest("header") || container.closest("footer")) return false;

  const img = container.querySelector("img");
  if (!img) return false;

  const { width, height } = container.getBoundingClientRect();
  return width >= MIN_SIZE && height >= MIN_SIZE;
}

/**
 * Fade-in-up on scroll for content images — live site splendour-fadeinup / Elementor reveal.
 */
export function ScrollReveal() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const markVisible = (element: Element) => {
      element.classList.add("is-visible");
    };

    const setupElements = () => {
      document.querySelectorAll(REVEAL_SELECTOR).forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        if (!shouldReveal(node)) return;
        node.classList.add("scroll-reveal");
        if (reducedMotion) markVisible(node);
      });
    };

    setupElements();

    if (reducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          markVisible(entry.target);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.08,
      },
    );

    const observePending = () => {
      setupElements();
      document.querySelectorAll(".scroll-reveal:not(.is-visible)").forEach((el) => {
        observer.observe(el);
      });
    };

    observePending();

    const main = document.querySelector("main.site-main");
    const mutationObserver = main
      ? new MutationObserver(() => {
          observePending();
        })
      : null;

    mutationObserver?.observe(main!, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver?.disconnect();
    };
  }, []);

  return null;
}
