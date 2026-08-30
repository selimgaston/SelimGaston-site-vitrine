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

Utilise la version de Node indiquee dans `.node-version` (Node 26), ou au minimum Node 22.

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
- Node version: `26`

Si Cloudflare ne detecte pas `.node-version`, ajoute la variable d'environnement :

```text
NODE_VERSION=26
```

Depuis le terminal, apres connexion Cloudflare :

```bash
npm run deploy
```

## Pipeline GitHub Actions

Le workflow `.github/workflows/deploy-cloudflare-pages.yml` deploie automatiquement sur Cloudflare Pages a chaque push sur `main`.

Ajoute ces secrets dans GitHub, dans `Settings` > `Secrets and variables` > `Actions` :

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Le token Cloudflare doit avoir les droits Cloudflare Pages pour le compte qui contient le projet `selimgaston-site-vitrine`.
