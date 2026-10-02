"use client";

import { useState, type FormEvent } from "react";
import { guestlistEvent } from "@/data/guestlist";

type Status = "idle" | "loading" | "success" | "error";

export function GuestlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/guestlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, ...guestlistEvent })
      });
      if (!res.ok) throw new Error("guestlist request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="guestlistSuccess">
        <p className="eyebrow">You&rsquo;re in</p>
        <h2>See you at {guestlistEvent.venue}.</h2>
        <p>A confirmation just landed in your inbox — just give your name at the door.</p>
      </div>
    );
  }

  return (
    <>
      <p className="guestlistCopy">
        Leave your details below to request a spot on the guestlist. You&rsquo;ll get a
        confirmation by email.
      </p>
      <form className="guestlistForm" onSubmit={onSubmit}>
        <label htmlFor="guestlist-name">Full name</label>
        <input
          id="guestlist-name"
          type="text"
          placeholder="Jane Doe"
          required
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          disabled={status === "loading"}
        />

        <label htmlFor="guestlist-email">Email</label>
        <input
          id="guestlist-email"
          type="email"
          placeholder="you@example.com"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={status === "loading"}
        />

        <label htmlFor="guestlist-phone">Phone</label>
        <input
          id="guestlist-phone"
          type="tel"
          placeholder="+33 6 00 00 00 00"
          required
          autoComplete="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          disabled={status === "loading"}
        />

        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Request guestlist"}
        </button>

        {status === "error" && <p className="guestlistError">Something went wrong — try again.</p>}
      </form>
    </>
  );
}
