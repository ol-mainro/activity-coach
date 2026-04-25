---
titre: "Run & Botanic"
description: "Mini web app affichant les espèces végétales observées lors des sorties de course, extraites des descriptions d'activités Strava. Filtre par lieu et date, herbier interactif avec fiches botaniques détaillées."
type: html
principes_regeneration: |
  - Ne jamais afficher le nom complet du coureur — app anonyme orientée grand public.
  - Relire les descriptions Strava via l'API pour détecter les nouvelles observations botaniques (chercher les patterns "botanique running", listes de plantes, noms d'espèces).
  - Toujours recalculer les stats depuis les données brutes (nombre d'espèces, de sorties, de familles).
  - Conserver le design "herbier botanique" : palette parchemin/forêt/ocre, typo Playfair Display + Source Sans 3, esthétique carnet de terrain.
  - Chaque nouvelle plante observée doit être ajoutée à la base PLANTS avec ses informations botaniques (latin, famille, floraison, habitat, description, anecdote).
  - L'app doit rester 100% statique (HTML/CSS/JS) — aucune dépendance serveur.
  - Le ton est pédagogique et accessible : vocabulaire botanique expliqué, anecdotes légères.
  - La section CTA "Toi aussi, note ta flore sauvage" doit toujours figurer en bas de page.
  - Conserver les liens Strava vers les activités sources.
---
