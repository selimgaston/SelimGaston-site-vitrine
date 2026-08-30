"use client";

import type { MouseEvent as ReactMouseEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

export function MenuNav() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 260);
  }, [cancelClose]);

  const openNow = useCallback(() => {
    cancelClose();
    setOpen(true);
  }, [cancelClose]);

  const closeNow = useCallback(() => {
    cancelClose();
    setOpen(false);
  }, [cancelClose]);

  useEffect(() => cancelClose, [cancelClose]);

  const goToSection = useCallback(
    (event: ReactMouseEvent<HTMLAnchorElement>, hash: string) => {
      event.preventDefault();
      closeNow();
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", hash);
      }
    },
    [closeNow]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeNow();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeNow]);

  return (
    <details
      className="menuShell"
      open={open}
      onToggle={(event) => {
        const el = event.currentTarget;
        if (el.open !== open) setOpen(el.open);
      }}
    >
      <summary
        className="menuButton"
        onMouseEnter={openNow}
        onMouseLeave={scheduleClose}
        onClick={(event) => {
          event.preventDefault();
          setOpen((value) => !value);
        }}
      >
        <svg className="menuLogo" viewBox="0 0 308.55 308.83" aria-hidden="true">
          <polygon points="308.55 .4 308.55 52.3 50.1 52.3 102.4 0 308.55 .4" />
          <polygon points="50.1 52.3 0 102.4 0 206.37 206.19 206.37 154.42 154.61 50.89 154.61 50.1 52.3" />
          <polygon points="154.42 154.61 102.67 102.86 308.55 102.86 308.55 206.37 206.09 308.83 0 308.83 0 256.57 257.23 256.57 257.23 154.36 154.42 154.61" />
        </svg>
        Menu
      </summary>
      <div className="menuPanel" onClick={closeNow}>
        <div
          className="menuPanelInner"
          onMouseEnter={openNow}
          onMouseLeave={scheduleClose}
        >
          <p>Navigation</p>
          <a href="#top" onClick={(event) => goToSection(event, "#top")}>
            Accueil
          </a>
          <a href="#bio" onClick={(event) => goToSection(event, "#bio")}>
            Bio
          </a>
          <a href="#music" onClick={(event) => goToSection(event, "#music")}>
            Latest Sound
          </a>
          <a href="#gigs" onClick={(event) => goToSection(event, "#gigs")}>
            Gigs
          </a>
          <a href="#players" onClick={(event) => goToSection(event, "#players")}>
            Spotify × Soundcloud
          </a>
          <a href="#follow" onClick={(event) => goToSection(event, "#follow")}>
            Follow Me
          </a>
        </div>
      </div>
    </details>
  );
}
