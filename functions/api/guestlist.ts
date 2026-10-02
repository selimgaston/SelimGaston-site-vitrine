// Fonction Cloudflare Pages (route /api/guestlist) : reçoit une demande de
// guestlist depuis /guestlist, ajoute le contact à la liste Brevo dédiée
// (avec nom/téléphone/événement en attributs, pour générer la liste des
// invités avant chaque soirée) puis déclenche l'email de confirmation
// (template Brevo #2). La clé API Brevo reste côté serveur, jamais exposée
// au navigateur.

interface Env {
  BREVO_API_KEY: string;
}

const BREVO_LIST_ID = 4;
const BREVO_TEMPLATE_ID = 2;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+()\-\s]{6,20}$/;
const NAME_MAX_LENGTH = 100;

// Doit rester synchronisé avec `guestlistEvent.active` dans
// src/data/guestlist.ts : la page cache le formulaire côté client quand
// c'est à `false`, et ce drapeau refuse aussi les requêtes faites
// directement à l'API pendant que c'est désactivé.
const GUESTLIST_ACTIVE = false;

function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!GUESTLIST_ACTIVE) {
    return json({ error: "not_open" }, 403);
  }

  if (!env.BREVO_API_KEY) {
    return json({ error: "not_configured" }, 500);
  }

  let name: string | undefined;
  let email: string | undefined;
  let phone: string | undefined;
  let venue: string | undefined;
  let date: string | undefined;
  let city: string | undefined;

  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      venue?: string;
      date?: string;
      city?: string;
    };
    name = body.name?.trim();
    email = body.email?.trim().toLowerCase();
    phone = body.phone?.trim();
    venue = body.venue?.trim();
    date = body.date?.trim();
    city = body.city?.trim();
  } catch {
    return json({ error: "invalid_body" }, 400);
  }

  if (!name || name.length > NAME_MAX_LENGTH) {
    return json({ error: "invalid_name" }, 400);
  }
  if (!email || !EMAIL_PATTERN.test(email)) {
    return json({ error: "invalid_email" }, 400);
  }
  if (!phone || !PHONE_PATTERN.test(phone)) {
    return json({ error: "invalid_phone" }, 400);
  }
  // L'événement vient du site (non saisi par l'utilisateur) mais on
  // vérifie sa présence pour éviter un attribut Brevo vide.
  if (!venue || !date || !city) {
    return json({ error: "invalid_event" }, 400);
  }

  const brevoHeaders = {
    "api-key": env.BREVO_API_KEY,
    "Content-Type": "application/json",
    Accept: "application/json"
  };

  const eventLabel = `${venue} — ${date} — ${city}`;

  // 1. Ajoute (ou met à jour) le contact dans la liste guestlist, avec le
  // nom/téléphone/événement en attributs pour pouvoir générer la liste des
  // invités depuis Brevo avant la soirée. Un email déjà inscrit renvoie une
  // erreur "duplicate_parameter" — traitée comme un succès (met à jour ses
  // infos pour ce nouvel événement plutôt que d'échouer).
  const contactRes = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: brevoHeaders,
    body: JSON.stringify({
      email,
      listIds: [BREVO_LIST_ID],
      updateEnabled: true,
      attributes: { FULL_NAME: name, PHONE: phone, EVENT: eventLabel }
    })
  });

  if (!contactRes.ok) {
    const errBody = await contactRes.json().catch(() => null);
    const isDuplicate = (errBody as { code?: string } | null)?.code === "duplicate_parameter";
    if (!isDuplicate) {
      return json({ error: "brevo_contact_failed" }, 502);
    }
  }

  // 2. Envoie l'email de confirmation avec les infos de l'événement.
  const emailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: brevoHeaders,
    body: JSON.stringify({
      templateId: BREVO_TEMPLATE_ID,
      to: [{ email, name }],
      params: { FULL_NAME: name, VENUE: venue, DATE: date, CITY: city }
    })
  });

  if (!emailRes.ok) {
    return json({ error: "brevo_email_failed" }, 502);
  }

  return json({ ok: true }, 200);
};
