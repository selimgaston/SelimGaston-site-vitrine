"use client";

import { useEffect } from "react";

// Bascule la bulle WhatsApp en noir-sur-clair quand elle flotte au-dessus
// d'une section claire (bio, gigs, grille Links), blanc-sur-sombre partout
// ailleurs (photo hero, sections noires) — pour qu'elle reste lisible
// en toutes circonstances.
export function WhatsAppTheme() {
  useEffect(() => {
    const fab = document.querySelector<HTMLElement>(".whatsappFab");
    if (!fab) return;

    const zones = Array.from(document.querySelectorAll<HTMLElement>('[data-fab-theme="light"]'));
    if (zones.length === 0) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const fabRect = fab.getBoundingClientRect();
      const centerY = fabRect.top + fabRect.height / 2;
      const onLight = zones.some((zone) => {
        const r = zone.getBoundingClientRect();
        return centerY >= r.top && centerY <= r.bottom;
      });
      fab.classList.toggle("onLight", onLight);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
