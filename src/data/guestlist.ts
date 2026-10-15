// Infos de l'événement affichées sur /guestlist/<slug> — à mettre à jour avant
// chaque soirée (le reste de la page/logique ne change pas).
//
// `active: false` masque la page au public (affiche un message "pas encore
// disponible" à la place du formulaire) — mettre à `true` quand le lien est
// prêt à être partagé pour un événement. Le backend (functions/api/
// guestlist.ts) a son propre drapeau GUESTLIST_ACTIVE à garder synchronisé
// avec celui-ci, pour refuser aussi les requêtes directes à l'API tant que
// c'est désactivé.
export const guestlistEvent = {
  active: false,
  // URL de la page : /guestlist/<slug> — lieu + date (JJ-MM-AAAA), unique pour
  // chaque soirée. /guestlist tout court redirige vers l'événement en cours.
  slug: "manko-15-10-2026",
  venue: "Manko",
  // Affichée en petit sous le nom du lieu — mettre `null` pour la masquer.
  address: "15 Av. Montaigne, 75008 Paris" as string | null,
  date: "15 October",
  city: "Paris",
  country: "France",
  // Vidéo verticale (9:16) affichée à côté du formulaire, dans public/ —
  // mettre `null` pour une soirée sans vidéo.
  video: "/guestlist/manko.mp4" as string | null,
  videoPoster: "/guestlist/manko-poster.jpg"
};
