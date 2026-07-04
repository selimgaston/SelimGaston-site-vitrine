# SelimGaston-site-vitrine

Site vitrine Next.js exporte en statique pour Cloudflare Pages.

## Modifier le contenu

Tout le contenu principal est dans `src/data/profile.ts` :

- nom d'artiste
- bio
- email
- liens Spotify et SoundCloud
- image hero
- services et chiffres cles

## Lancer en local

Utilise Node 22, ou au minimum Node 20.9.

```bash
npm install
npm run dev
```

## Build statique

```bash
npm run build
```

Le dossier genere pour Cloudflare Pages est `out`.

## Deploiement Cloudflare Pages

Parametres recommandes :

- Framework preset: `Next.js (Static HTML Export)` ou `None`
- Build command: `npm run build`
- Build output directory: `out`
- Node version: `22`

Si Cloudflare ne detecte pas `.node-version`, ajoute la variable d'environnement :

```text
NODE_VERSION=22
```

Depuis le terminal, apres connexion Cloudflare :

```bash
npm run deploy
```

Sur cette machine, si le Node global est encore en v14 :

```bash
npm run deploy:node22
```
