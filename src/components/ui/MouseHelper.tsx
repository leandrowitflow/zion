"use client";

import { useEffect, useRef, useState } from "react";

/** Matches live site TRX_ADDONS_STORAGE.mobile_breakpoint_mousehelper_off */
const MOUSE_HELPER_MIN_WIDTH = 1025;
const MOUSE_HELPER_DELAY = 8;

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, label, summary, [role="button"], [role="link"]';

/** Content images with overflow clip — magnet parallax like trx_addons mouse-helper */
const IMAGE_MAGNET_SELECTOR = "main.site-main .relative.overflow-hidden";
const MAGNET_MIN_SIZE = 120;
const MAGNET_SHIFT = 22;
const MAGNET_EASING = 5;

type MagnetEntry = {
  inner: HTMLElement;
  nx: number;
  ny: number;
};

function canUseMouseHelper() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (window.matchMedia("(pointer: coarse)").matches) return false;
  return window.innerWidth >= MOUSE_HELPER_MIN_WIDTH;
}

function collectMagnets(): MagnetEntry[] {
  const entries: MagnetEntry[] = [];

  document.querySelectorAll(IMAGE_MAGNET_SELECTOR).forEach((container) => {
    if (!(container instanceof HTMLElement)) return;

    const inner = container.querySelector("img");
    if (!(inner instanceof HTMLElement)) return;

    const { width, height } = container.getBoundingClientRect();
    if (width < MAGNET_MIN_SIZE || height < MAGNET_MIN_SIZE) return;

    entries.push({ inner, nx: 0, ny: 0 });
  });

  return entries;
}

/**
 * Smooth follower dot + soft image magnet — zion-creativeartisans.com trx_addons mouse-helper.
 */
export function MouseHelper() {
  const dotRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const activeRef = useRef(false);
  const visibleRef = useRef(false);
  const magnetsRef = useRef<MagnetEntry[]>([]);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const updateEnabled = () => setEnabled(canUseMouseHelper());
    updateEnabled();

    const desktopMq = window.matchMedia(`(min-width: ${MOUSE_HELPER_MIN_WIDTH}px)`);
    desktopMq.addEventListener("change", updateEnabled);
    window.addEventListener("resize", updateEnabled);

    return () => {
      desktopMq.removeEventListener("change", updateEnabled);
      window.removeEventListener("resize", updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    if (!dot) return;

    let raf = 0;

    const refreshMagnets = () => {
      magnetsRef.current = collectMagnets();
    };

    refreshMagnets();

    const observer = new MutationObserver(refreshMagnets);
    const main = document.querySelector("main.site-main");
    if (main) {
      observer.observe(main, { childList: true, subtree: true });
    }

    window.addEventListener("resize", refreshMagnets);

    const syncClasses = () => {
      dot.classList.toggle("mouse-helper-visible", visibleRef.current);
      dot.classList.toggle("mouse-helper-active", activeRef.current);
    };

    const onPointerMove = (event: PointerEvent) => {
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
      if (!visibleRef.current) {
        posRef.current.x = event.clientX;
        posRef.current.y = event.clientY;
        visibleRef.current = true;
        syncClasses();
      }
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const nextActive = !!target.closest(INTERACTIVE_SELECTOR);
      if (nextActive !== activeRef.current) {
        activeRef.current = nextActive;
        syncClasses();
      }
    };

    const updateMagnets = (mouseX: number, mouseY: number) => {
      for (const entry of magnetsRef.current) {
        const container = entry.inner.closest(".relative.overflow-hidden");
        if (!(container instanceof HTMLElement)) continue;

        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const near =
          mouseX >= rect.left - rect.width * 0.15 &&
          mouseX <= rect.right + rect.width * 0.15 &&
          mouseY >= rect.top - rect.height * 0.15 &&
          mouseY <= rect.bottom + rect.height * 0.15;

        if (near) {
          const targetX = ((mouseX - centerX) / rect.width) * MAGNET_SHIFT;
          const targetY = ((mouseY - centerY) / rect.height) * MAGNET_SHIFT;
          entry.nx += (targetX - entry.nx) / MAGNET_EASING;
          entry.ny += (targetY - entry.ny) / MAGNET_EASING;
          entry.inner.style.transition = "none";
          entry.inner.style.transform = `translate3d(${entry.nx}px, ${entry.ny}px, 0) scale(1.04)`;
        } else if (entry.nx !== 0 || entry.ny !== 0) {
          entry.nx += (0 - entry.nx) / MAGNET_EASING;
          entry.ny += (0 - entry.ny) / MAGNET_EASING;
          if (Math.abs(entry.nx) < 0.05 && Math.abs(entry.ny) < 0.05) {
            entry.nx = 0;
            entry.ny = 0;
            entry.inner.style.transition = "transform 0.5s ease";
            entry.inner.style.transform = "";
          } else {
            entry.inner.style.transition = "none";
            entry.inner.style.transform = `translate3d(${entry.nx}px, ${entry.ny}px, 0) scale(1.04)`;
          }
        }
      }
    };

    const animate = () => {
      const { x: mouseX, y: mouseY } = mouseRef.current;
      posRef.current.x += (mouseX - posRef.current.x) / MOUSE_HELPER_DELAY;
      posRef.current.y += (mouseY - posRef.current.y) / MOUSE_HELPER_DELAY;
      dot.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      updateMagnets(mouseX, mouseY);
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("resize", refreshMagnets);
      observer.disconnect();
      cancelAnimationFrame(raf);
      for (const entry of magnetsRef.current) {
        entry.inner.style.transition = "";
        entry.inner.style.transform = "";
      }
    };
  }, [enabled]);

  if (!enabled) return null;

  return <div ref={dotRef} className="mouse-helper" aria-hidden="true" />;
};
