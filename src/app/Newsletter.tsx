"use client";

import { useState, type FormEvent } from "react";

// URL d'action du formulaire Brevo (Contacts → Forms → Create a form → onglet
// Share, copier l'attribut action du <form>). Vide tant que la liste Brevo
// n'est pas créée : le formulaire s'affiche mais prévient que l'inscription
// n'est pas encore active, au lieu d'échouer silencieusement.
const BREVO_FORM_ACTION = "";

type Status = "idle" | "loading" | "success" | "error" | "not-configured";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!BREVO_FORM_ACTION) {
      setStatus("not-configured");
      return;
    }

    setStatus("loading");
    try {
      // Formulaire Brevo classique : soumission cross-origin en no-cors, donc
      // la réponse est opaque (on ne peut pas lire le statut HTTP). Un fetch
      // qui ne lève pas d'exception signifie que la requête est bien partie.
      await fetch(BREVO_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams({
          EMAIL: email,
          email_address_check: "",
          locale: "en"
        })
      });
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
        {status === "not-configured" && "Coming soon."}
        {status === "error" && "Something went wrong — try again."}
        {status === "success" && "You're in!"}
      </span>
    </form>
  );
}
