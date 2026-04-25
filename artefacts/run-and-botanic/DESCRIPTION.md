---
titre: "Run & Botanic"
description: "Mini web app affichant les espèces végétales observées lors des sorties de course, extraites des descriptions d'activités Strava. Filtre par lieu et date, herbier interactif avec fiches botaniques détaillées."
type: html
principes_regeneration: |
  - Ne jamais afficher le nom complet du coureur — app anonyme orientée grand public.
  - Relire les descriptions Strava via l'API pour détecter les nouvelles observations botaniques (chercher les patterns "botanique running", listes de plantes, noms d'espèces).
  - Toujours recalculer les stats depuis les données brutes (nombre d'espèces, de sorties, de familles).
  - Design system : strava_running_herbarium / botanical_high_contrast. Respecter strictement la palette (primary #000d03, primary-container #0a2612, secondary #43664d, surface #fbf9f8, inverse-primary #aecfb0), les polices (Noto Serif pour les titres, Inter pour le corps), les border-radius (8px standard, 12px cartes herbier, 16px modal/CTA, 9999px pills) et les ombres forest-glow (rgba(10,38,18,…)).
  - Chaque nouvelle plante observée doit être ajoutée à la base PLANTS avec ses informations botaniques (latin, famille, floraison, habitat, description, anecdote).
  - L'app doit rester 100% statique (HTML/CSS/JS) — aucune dépendance serveur.
  - Le ton est pédagogique et accessible : vocabulaire botanique expliqué, anecdotes légères.
  - La section CTA "Toi aussi, note ta flore sauvage" doit toujours figurer en bas de page.
  - Conserver les liens Strava vers les activités sources.
---
