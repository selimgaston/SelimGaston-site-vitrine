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
  ".socialCta ul"
].join(", ");

export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTORS));
    if (els.length === 0) return;

    document.documentElement.classList.add("reveal-on");
    els.forEach((el) => el.classList.add("reveal"));

    let pending = els.slice();
    let frame = 0;

    const reveal = () => {
      frame = 0;
      const trigger = window.innerHeight * 0.9;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top < trigger) {
          el.classList.add("is-visible");
          return false;
        }
        return true;
      });
      if (pending.length === 0) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(reveal);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reveal();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
