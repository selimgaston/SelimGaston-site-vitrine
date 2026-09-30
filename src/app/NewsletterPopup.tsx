"use client";

import { useEffect, useState, type FormEvent } from "react";

const STORAGE_KEY = "sg-newsletter-popup-seen";
const SHOW_DELAY_MS = 4000;

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    // Ne s'affiche qu'une fois par navigateur — jamais si déjà vu, fermé ou inscrit.
    let seen = true;
    try {
      seen = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // Stockage indisponible (navigation privée...) : on tente quand même, sans persistance.
    }
    if (seen) return;

    const timer = window.setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Ignoré si le stockage est indisponible.
    }
  };

  useEffect(() => {
    if (!visible) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      if (!res.ok) throw new Error("subscribe failed");
      setStatus("success");
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // Ignoré si le stockage est indisponible.
      }
      window.setTimeout(() => setVisible(false), 2200);
    } catch {
      setStatus("error");
    }
  };

  if (!visible) return null;

  return (
    <div
      className="popupOverlay"
      onClick={(event) => {
        if (event.target === event.currentTarget) dismiss();
      }}
    >
      <div className="popupCard" role="dialog" aria-modal="true" aria-labelledby="popup-title">
        <button type="button" className="popupClose" aria-label="Close" onClick={dismiss}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6 18 18M18 6 6 18" />
          </svg>
        </button>

        {status === "success" ? (
          <p className="popupSuccess">You&rsquo;re in! Check your inbox.</p>
        ) : (
          <>
            <p className="eyebrow">Newsletter</p>
            <h2 id="popup-title">Don&rsquo;t miss a release.</h2>
            <p className="popupCopy">New tracks and upcoming gigs, straight to your inbox.</p>
            <form className="popupForm" onSubmit={onSubmit}>
              <label className="visuallyHidden" htmlFor="popup-email">
                Email
              </label>
              <input
                id="popup-email"
                type="email"
                placeholder="Your email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={status === "loading"}
              />
              <button type="submit" disabled={status === "loading"}>
                {status === "loading" ? "…" : "Subscribe"}
              </button>
            </form>
            {status === "error" && <p className="popupError">Something went wrong — try again.</p>}
          </>
        )}
      </div>
    </div>
  );
}
