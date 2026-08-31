"use client";

import { useEffect } from "react";

const SELECTORS = [
  ".statement > div",
  ".latestVisual",
  ".latestCopy",
  ".gigsImage",
  ".gigsContent",
  ".playersTitle",
  ".players",
  ".socialCover",
  ".socialCta ul",
  ".footer section"
].join(", ");

export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTORS));
    if (els.length === 0) return;

    document.documentElement.classList.add("reveal-on");
    els.forEach((el) => el.classList.add("reveal"));

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
