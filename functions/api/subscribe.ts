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

function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
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

  if (!email || !EMAIL_PATTERN.test(email)) {
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
