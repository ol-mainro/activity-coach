---
titre: "Mon Coach de Course"
description: "Dashboard personnel de coaching marathon. Quatre sections : dernières sorties avec KPIs hebdomadaires, prédiction de temps au marathon d'Auxerre (26 mai 2026), records personnels par distance, analyse de l'entraînement sur 4 mois. Données Strava calculées manuellement et intégrées en dur dans le HTML. Design system Atheos High-Performance (Lexend, fuchsia, noir, blanc, angles vifs)."
type: html
principes_regeneration: |
  - Ne jamais afficher le nom complet — identifier uniquement par prénom ou initiale.
  - Toujours recalculer le compte à rebours jusqu'au marathon d'Auxerre (26 mai 2026) depuis la date du jour.
  - Conserver le design system Atheos High-Performance : Lexend, primaire fuchsia (#a900a9), fond blanc #f9f9f9, angles 0 px, typographie label en majuscules avec letter-spacing.
  - Les KPIs et données de sorties doivent être mis à jour depuis les données brutes Strava (raw-data/strava) via le script build-data.js — ne jamais coder les chiffres en dur sans les recalculer.
  - La section Prédiction marathon doit inclure : temps cible, allure cible, méthode de calcul (semi-marathon comme référence principale), analyse des facteurs de risque (mur du 30e km, hydratation, glycogène).
  - La section Analyse entraînement doit afficher le volume mensuel sous forme de barres et les indicateurs de charge.
  - Maintenir les 4 onglets : Dernières sorties / Prédiction marathon / Records personnels / Analyse entraînement.
  - L'app est déployée sur AWS Amplify (voir DEPLOYMENT.md) — toujours vérifier la compatibilité du build statique avant de pousser.
---
