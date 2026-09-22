---
name: motion-design
description: Ajouter ou améliorer des animations modernes (motion design) sur le site vitrine DJ Selim Gaston — reveals au scroll, split text, parallax, marquee, clip-path, micro-interactions, transitions. Utiliser dès qu'on parle d'animation, motion, effet, transition, scroll, hover, "rendre le site plus vivant/moderne".
---

# Motion design — site vitrine Selim Gaston

Stack : Next.js 16 en `output: "export"` (statique, Cloudflare Pages), React 19, CSS global unique (`src/app/globals.css`), pas de Tailwind. Polices : Bebas Neue (`--font-display`) + Inter (`--font-sans`). Couleurs : `--black`, `--paper`, `--accent` (#e7ff3b), `--orange` (#ff5a1f).

## Direction artistique
Site de DJ : le mouvement doit évoquer le rythme, l'énergie, la nuit, sans devenir un gadget.
- Des animations franches et bien rythmées plutôt qu'un peu de mouvement partout. On mise sur un ou deux moments marquants (hero, transitions de section), et le reste reste sobre.
- Easing maison : `cubic-bezier(0.22, 1, 0.36, 1)` (déjà utilisé). Le définir en token si on en ajoute : `--ease-out-expo`, `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)`.
- Durées : micro-interactions 140–220 ms, reveals 600–900 ms, décalage entre éléments (stagger) 60–110 ms.
- Idées adaptées au site : titre du hero découpé en lettres ou en lignes (masque + translateY), marquee infini en Bebas Neue (dates, genres), images révélées par `clip-path: inset()`, parallax léger sur les visuels, boutons « magnétiques » et curseur custom (desktop uniquement), pulsation au BPM sur un accent, défilement horizontal épinglé pour les gigs, grain/bruit en overlay.

## Choix technique, du plus léger au plus lourd
1. **CSS pur** en priorité : `@keyframes`, transitions, et les **scroll-driven animations** (`animation-timeline: view()` / `scroll()`) derrière `@supports (animation-timeline: view())`, avec un fallback statique ou le `ScrollReveal` existant.
2. **Le `ScrollReveal.tsx` existant** pour les reveals simples : ajouter des sélecteurs à `SELECTORS` plutôt que de créer un deuxième système. Pour du stagger, poser `--i` en inline style et utiliser `transition-delay: calc(var(--i) * 80ms)`.
3. **View Transitions API** (`document.startViewTransition`) pour les changements d'état (menu, onglets de lecteurs).
4. **Bibliothèque** seulement si le CSS ne suffit pas (timelines complexes, scroll épinglé, split text robuste) :
   - `motion` (`import { motion } from "motion/react"`) pour les animations déclaratives de composants React.
   - `gsap` + `ScrollTrigger` / `SplitText` (tous gratuits) pour les séquences scrollées ou épinglées.
   Toujours demander à l'utilisateur avant d'ajouter une dépendance. Charger dans un composant `"use client"` et nettoyer au démontage (`ctx.revert()` / `gsap.context`).

## Règles non négociables
- **Mobile à chaque modification** : chaque animation est pensée et testée aux breakpoints existants (920 / 560 / 380 px). Sur mobile, amplitude réduite (translate plus court, pas de parallax lourd), aucun effet qui dépend du hover.
- Les effets hover, curseur et magnétiques sont réservés à `@media (hover: hover) and (pointer: fine)`.
- `prefers-reduced-motion: reduce` : aucun mouvement, le contenu est visible immédiatement. Les états initiaux cachés (`opacity: 0`) vivent **uniquement** dans `@media (prefers-reduced-motion: no-preference)` et derrière une classe posée par JS (comme `.reveal-on`), pour que le contenu reste visible sans JS.
- N'animer que `transform`, `opacity`, `clip-path` et `filter` (avec parcimonie). Jamais `top`, `left`, `width`, `height` ni `margin`.
- `will-change` seulement pendant l'animation, jamais en global.
- IntersectionObserver ou le rAF throttlé existant, jamais de handler de scroll brut non throttlé.
- Aucun CLS : les éléments animés gardent leur place dans le layout (on transforme, on ne décale pas).
- Pas d'animation qui bloque la lecture du hero plus d'environ 1,2 s. Le LCP (image du hero) ne doit pas partir de `opacity: 0`.
- Export statique : pas d'API serveur. Tout le code d'animation est côté client et protégé par `typeof window` ou `useEffect`.

## Vérification (obligatoire avant de dire « fini »)
1. `npm run dev` (via le preview du navigateur intégré), puis regarder l'animation en desktop.
2. Viewport `mobile` (375×812) : l'effet est adapté et il n'y a pas de scroll horizontal.
3. Émuler `prefers-reduced-motion: reduce` (DevTools, ou `matchMedia` via JS) : le contenu est visible et statique.
4. `npm run build` : l'export statique passe.
5. Vérifier dans la console qu'il n'y a ni erreur d'hydratation ni warning.
