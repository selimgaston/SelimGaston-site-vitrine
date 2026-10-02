// Une entrée par sortie, chacune accessible sur /release/<slug>. Pour une
// nouvelle release : ajouter un objet ici (le slug devient l'URL, ex.
// /release/mon-nouveau-titre), le reste de la page ne change pas.
//
// `coverImage` doit être un carré (pochette officielle — le plus simple est
// de la récupérer via l'oEmbed Spotify : https://open.spotify.com/oembed?url=<lien album>
// donne un thumbnail_url, dont on peut remonter en haute résolution en
// remplaçant le segment de taille "00001e02" par "0000b273" dans l'URL
// i.scdn.co correspondante).
//
// `platforms[].url` : mettre "#" tant que le lien réel n'est pas connu —
// le bouton reste visible pour prévisualiser le rendu mais ne doit pas être
// partagé publiquement avant d'avoir le vrai lien.
export type ReleasePlatform = {
  name: string;
  action: string;
  label: string;
  url: string;
};

export type Release = {
  slug: string;
  title: string;
  label: string;
  description: string;
  coverImage: string;
  platforms: ReleasePlatform[];
};

export const releases: Release[] = [
  {
    slug: "aint-movin",
    title: "Ain't Movin",
    label: "Groove Society",
    description: "Deep, groove-driven electronic music — out now.",
    coverImage: "/selim-gaston-release-cover.jpg",
    platforms: [
      { name: "spotify", action: "Listen", label: "Spotify", url: "https://open.spotify.com/album/1RUbdm6AgdSsAM2CnAT3h4" },
      { name: "beatport", action: "Buy", label: "Beatport", url: "https://www.beatport.com/fr/track/aint-movin/30105815" },
      { name: "applemusic", action: "Listen", label: "Apple Music", url: "https://music.apple.com/au/album/aint-movin/6797947826?i=6797947827" },
      { name: "itunes", action: "Download", label: "iTunes", url: "https://music.apple.com/au/album/aint-movin/6797947826?i=6797947827" },
      { name: "traxsource", action: "Go to", label: "Traxsource", url: "https://www.traxsource.com/title/2852059/aint-movin-extended-mix" },
      { name: "amazonmusic", action: "Listen", label: "Amazon Music", url: "https://music.amazon.com/tracks/B0HCWM3RGJ" },
      { name: "tidal", action: "Listen", label: "Tidal", url: "https://tidal.com/album/549177029/track/549177030" },
      { name: "deezer", action: "Listen", label: "Deezer", url: "https://www.deezer.com/track/4201983812" },
      { name: "audiomack", action: "Listen", label: "Audiomack", url: "https://audiomack.com/selim-gaston/song/aint-movin" },
      { name: "soundcloud", action: "Listen", label: "SoundCloud", url: "https://soundcloud.com/selim-gaston" }
    ]
  }
];
