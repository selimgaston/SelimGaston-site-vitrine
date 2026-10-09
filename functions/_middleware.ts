// Middleware Cloudflare Pages (toutes les routes) : le site ne doit être
// visible que sur selimgaston.com. Toute requête arrivant sur l'adresse
// technique *.pages.dev (production ou aperçus de déploiement) est
// redirigée en 301 vers le même chemin sur selimgaston.com, pour que
// Google n'indexe pas de copie du site.

const CANONICAL_ORIGIN = "https://selimgaston.com";

export const onRequest: PagesFunction = async ({ request, next }) => {
  const url = new URL(request.url);
  if (url.hostname.endsWith(".pages.dev")) {
    return new Response(null, {
      status: 301,
      headers: {
        Location: CANONICAL_ORIGIN + url.pathname + url.search,
        "X-Robots-Tag": "noindex, nofollow"
      }
    });
  }
  return next();
};
