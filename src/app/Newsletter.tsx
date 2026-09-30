"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

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
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="newsletterForm" onSubmit={onSubmit}>
      <label className="visuallyHidden" htmlFor="newsletter-email">
        Email
      </label>
      <span className="footerLabel">Newsletter</span>
      <input
        id="newsletter-email"
        type="email"
        name="EMAIL"
        placeholder="Your email"
        required
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        disabled={status === "loading" || status === "success"}
      />
      <button type="submit" disabled={status === "loading" || status === "success"} aria-label="Subscribe">
        {status === "success" ? "✓" : "→"}
      </button>
      <span className="newsletterStatus" role="status">
        {status === "error" && "Something went wrong — try again."}
        {status === "success" && "You're in!"}
      </span>
    </form>
  );
}
