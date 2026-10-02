// Fonction Cloudflare Pages (route /api/subscribe) : reçoit l'inscription
// newsletter depuis le footer du site, ajoute le contact à la liste Brevo
// puis déclenche l'email de confirmation (template Brevo #1). La clé API
// Brevo reste côté serveur (variable d'environnement Cloudflare), jamais
// exposée au navigateur.

interface Env {
  BREVO_API_KEY: string;
}

const BREVO_LIST_ID = 3;
const BREVO_TEMPLATE_ID = 1;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMAIL_MAX_LENGTH = 254; // limite RFC 5321 de l'adresse elle-même

function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "X-Content-Type-Options": "nosniff" }
  });
}

// Un <form>/fetch cross-site classique ne peut pas forger ces en-têtes :
// seul un navigateur qui navigue réellement depuis le site les pose. Ça ne
// remplace pas une vraie protection CSRF à base de jeton, mais ça bloque à
// coût nul l'abus le plus courant (une page tierce qui POST en masse sur cet
// endpoint pour spammer des inscriptions / faire envoyer des emails à des
// adresses arbitraires via notre domaine). Comparé au host de la requête
// elle-même (pas à un domaine en dur) pour marcher aussi bien en prod, sur
// les previews Cloudflare Pages que via `wrangler pages dev` en local.
function isSameSite(request: Request) {
  const host = new URL(request.url).host;
  const origin = request.headers.get("Origin");
  if (origin) {
    try {
      return new URL(origin).host === host;
    } catch {
      return false;
    }
  }
  const referer = request.headers.get("Referer");
  if (referer) {
    try {
      return new URL(referer).host === host;
    } catch {
      return false;
    }
  }
  // Ni Origin ni Referer : requête hors-navigateur (curl, script) — pas une
  // navigation croisée depuis un site tiers, donc hors du scénario qu'on
  // cherche à bloquer ici. Laissée passer (le rate limiting Cloudflare, lui,
  // s'applique à tous les cas).
  return true;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!isSameSite(request)) {
    return json({ error: "forbidden_origin" }, 403);
  }

  if (!env.BREVO_API_KEY) {
    return json({ error: "not_configured" }, 500);
  }

  let email: string | undefined;
  try {
    const body = (await request.json()) as { email?: string };
    email = body.email?.trim().toLowerCase();
  } catch {
    return json({ error: "invalid_body" }, 400);
  }

  if (!email || email.length > EMAIL_MAX_LENGTH || !EMAIL_PATTERN.test(email)) {
    return json({ error: "invalid_email" }, 400);
  }

  const brevoHeaders = {
    "api-key": env.BREVO_API_KEY,
    "Content-Type": "application/json",
    Accept: "application/json"
  };

  // 1. Ajoute (ou met à jour) le contact dans la liste newsletter. Un email
  // déjà inscrit renvoie une erreur "duplicate_parameter" — on la traite
  // comme un succès plutôt que d'échouer la ré-inscription.
  const contactRes = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: brevoHeaders,
    body: JSON.stringify({ email, listIds: [BREVO_LIST_ID], updateEnabled: true })
  });

  if (!contactRes.ok) {
    const errBody = await contactRes.json().catch(() => null);
    const isDuplicate = (errBody as { code?: string } | null)?.code === "duplicate_parameter";
    if (!isDuplicate) {
      return json({ error: "brevo_contact_failed" }, 502);
    }
  }

  // 2. Envoie l'email de confirmation thématisé (template Brevo).
  // "params" ne doit pas être vide — l'API Brevo rejette {} avec
  // "missing_parameter" même quand le template n'utilise aucune variable.
  const emailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: brevoHeaders,
    body: JSON.stringify({
      templateId: BREVO_TEMPLATE_ID,
      to: [{ email }],
      params: { SUBSCRIBER_EMAIL: email }
    })
  });

  if (!emailRes.ok) {
    return json({ error: "brevo_email_failed" }, 502);
  }

  return json({ ok: true }, 200);
};
