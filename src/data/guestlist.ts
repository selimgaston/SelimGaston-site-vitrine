// Infos de l'événement affichées sur /guestlist — à mettre à jour avant
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
  venue: "Manko",
  date: "15 October",
  city: "Paris",
  country: "France"
};
