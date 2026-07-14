# Pipeline GitHub Actions

La pipeline GitHub Actions sert à **construire le site Next.js et à le publier automatiquement sur Cloudflare Pages**.

Sa configuration se trouve dans `.github/workflows/deploy-cloudflare-pages.yml`.

## Quand se déclenche-t-elle ?

Elle démarre :

- automatiquement à chaque `push` sur la branche `main` ;
- manuellement depuis l'onglet **Actions** de GitHub grâce à `workflow_dispatch`.

## Les étapes

### 1. Création d'une machine temporaire

GitHub démarre une machine virtuelle sous Ubuntu pour exécuter le déploiement.

### 2. Récupération du dépôt

```yaml
uses: actions/checkout@v4
```

La pipeline télécharge le code du projet sur cette machine.

### 3. Installation de Node.js 22

```yaml
uses: actions/setup-node@v4
```

Elle prépare Node.js 22 et active le cache npm pour accélérer les prochaines exécutions.

### 4. Installation des dépendances

```bash
npm ci
```

Les dépendances sont installées exactement selon le fichier `package-lock.json`. Cette commande est adaptée aux pipelines automatisées.

### 5. Construction du site

```bash
npm run build
```

Cette commande exécute `next build`. Le fichier `next.config.mjs` contient :

```js
output: "export"
```

Next.js transforme donc le site en fichiers statiques HTML, CSS et JavaScript, placés dans le dossier `out`.

### 6. Déploiement sur Cloudflare Pages

```bash
npx wrangler pages deploy out \
  --project-name selimgaston-site-vitrine \
  --branch main
```

Wrangler envoie le contenu du dossier `out` vers le projet Cloudflare Pages `selimgaston-site-vitrine`.

## Secrets utilisés

Pour se connecter à Cloudflare, la pipeline utilise deux secrets configurés dans GitHub :

- `CLOUDFLARE_API_TOKEN` ;
- `CLOUDFLARE_ACCOUNT_ID`.

Ces informations ne sont pas écrites dans le code et restent protégées par GitHub.

## Gestion des déploiements simultanés

La configuration contient :

```yaml
cancel-in-progress: true
```

Si plusieurs modifications sont poussées rapidement, GitHub annule l'ancien déploiement encore en cours et conserve uniquement le plus récent.

## Résumé

```text
Push sur main
→ récupération du code
→ installation de Node.js
→ installation des dépendances
→ création du site statique dans out/
→ publication sur Cloudflare Pages
```

Si une étape échoue, les suivantes ne sont pas exécutées et GitHub marque la pipeline en rouge.
