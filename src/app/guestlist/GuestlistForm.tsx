"use client";

import { useState, type FormEvent } from "react";
import { guestlistEvent } from "@/data/guestlist";
import { profile } from "@/data/profile";

type Status = "idle" | "loading" | "success" | "duplicate" | "error";

// Accompagnants en plus de la personne qui s'inscrit (0 = seul, jusqu'à +3)
// — doit rester synchronisé avec PLUS_ONES_MAX dans functions/api/guestlist.ts.
const PLUS_ONES_MAX = 3;
const PLUS_ONES = Array.from({ length: PLUS_ONES_MAX + 1 }, (_, i) => i);

// Proposé une fois l'inscription faite (ou déjà faite).
function InstagramFollow() {
  return (
    <div className="guestlistFollow">
      <p>Stay in the loop for the next dates.</p>
      <a href={profile.instagramUrl} target="_blank" rel="noopener noreferrer">
        Follow me on Instagram
      </a>
    </div>
  );
}

export function GuestlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [plusOnes, setPlusOnes] = useState(0);
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/guestlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, plusOnes, ...guestlistEvent })
      });

      if (res.status === 409) {
        setStatus("duplicate");
        return;
      }
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
        <p className="guestlistSpamHint">
          Can&rsquo;t find it? Check your spam folder or the Promotions tab.
        </p>
        <InstagramFollow />
      </div>
    );
  }

  if (status === "duplicate") {
    return (
      <div className="guestlistSuccess">
        <p className="eyebrow">Already on the list</p>
        <h2>You&rsquo;re all set.</h2>
        <p>That name is already on the guestlist for {guestlistEvent.venue} — no need to sign up twice.</p>
        <InstagramFollow />
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

        <label htmlFor="guestlist-plus-ones">Plus ones</label>
        <select
          id="guestlist-plus-ones"
          value={plusOnes}
          onChange={(event) => setPlusOnes(Number(event.target.value))}
          disabled={status === "loading"}
        >
          {PLUS_ONES.map((count) => (
            <option key={count} value={count}>
              {count === 0 ? "Just me" : `+${count}`}
            </option>
          ))}
        </select>

        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Request guestlist"}
        </button>

        {status === "error" && <p className="guestlistError">Something went wrong — try again.</p>}
      </form>
    </>
  );
}
