# Prompt — Génération de la page "Analyse Entraînement"

Ce prompt est à utiliser chaque fois qu'il faut mettre à jour la page **Analyse Entraînement** de l'application `app-coach`, notamment lorsque de nouvelles activités Strava ont été enregistrées dans `./raw-data/strava/`.

---

## Contexte

- **Athlète** : prénom uniquement (anonymat)
- **Objectif** : Marathon d'Auxerre — 26 mai 2026 — objectif 3h30'–3h40' (allure cible ~5:06/km)
- **Source de données** : fichiers JSON dans `./raw-data/strava/` (activités de course à pied uniquement)
- **Période d'analyse** : toutes les activités depuis la reprise (janvier 2026) jusqu'à aujourd'hui

---

## Instructions pour l'agent

Tu vas analyser l'ensemble des activités de course à pied disponibles dans `./raw-data/strava/` et mettre à jour la section HTML de la page **Analyse Entraînement** dans `./artefacts/app-coach/index.html`.

### Étape 1 — Collecte et calcul des métriques

À partir des fichiers JSON des activités Strava, calcule les métriques suivantes :

**Volume global**
- Volume total en km (depuis janvier 2026)
- Volume par mois (janvier, février, mars, avril, …)
- Pic mensuel (mois + volume)

**Sorties longues**
- Nombre de sorties ≥ 20 km
- Dates des sorties longues
- Distance maximale atteinte (date + durée)

**Répartition des séances** (20 dernières sorties)
Classer chaque activité dans l'une des catégories suivantes selon l'allure et la distance :
- `longue` : distance ≥ 15 km, allure modérée (> 5:00/km)
- `tempo` : allure rapide (< 5:00/km), distance 5–15 km
- `endurance` : allure modérée, distance 8–15 km
- `récup` : allure lente (> 5:30/km), distance < 12 km
- `fractionné` : distance < 5 km avec allure < 4:00/km ou nom contenant "fractionné/interval"

Compter le nombre de séances par catégorie.

**Adaptation à l'objectif**
- Allure cible marathon : calculée pour 3h35' → `(3*3600 + 35*60) / 42.195` secondes/km
- Allure des 3 dernières longues ≥ 20 km : moyenne pondérée par distance
- Écart à combler en secondes/km
- VO₂max estimé : via formule Riegel depuis le meilleur semi ou 10 km récent
- % VO₂max à allure cible : `(allure_cible_mL / VO2max) * 100`
- FC cible estimée : si disponible dans les données Strava

---

### Étape 2 — Grille d'analyse qualitative

Pour chaque section ci-dessous, rédige une analyse courte et directe basée sur les chiffres calculés :

#### A. Bilan global
- Progression de volume mois par mois (rapide/lente/irrégulière ?)
- Régularité de l'entraînement
- Présence de semaines de récupération

#### B. Adaptation à l'objectif marathon
- L'allure des longues est-elle en ligne avec l'objectif ?
- L'écart allure longues / allure cible est-il gérable (< 15 sec/km = gérable, > 20 sec/km = préoccupant) ?
- Confirmation de la base aérobie via semi ou 10 km récent

#### C. Risques & Incertitudes
Évaluer chaque risque sur 3 niveaux : **élevé** / **modéré** / **faible**

| Risque | Indicateur | Niveau |
|--------|-----------|--------|
| Distance max insuffisante | Distance max < 32 km → élevé, 32–36 km → modéré, > 36 km → faible | ? |
| Départ trop rapide | Meilleur 10 km < 44 min → risque élevé de partir trop vite | ? |
| Météo | Fin mai : risque modéré systématique | modéré |
| Fatigue accumulée | Volume cumulé > 300 km sur 3 mois → modéré | ? |
| Gestion mentale km 30–38 | Distance max < 35 km → à surveiller | ? |

#### D. Phase d'affûtage
- Nombre de semaines restantes avant le marathon
- Plan d'affûtage : J-4 → J-2 (volume −50 %), J-1 (repos + activation)
- Recommandations spécifiques selon le volume actuel

#### E. Défis physiologiques
Ces éléments sont **fixes** (ne changent pas selon les données) mais les valeurs numériques doivent être mises à jour :
- Glycogène musculaire vs dépense marathon à l'allure cible (calculer la dépense calorique : `poids_estimé_kg × 1.05 × 42.195`)
- Plan de nutrition (4 gels toutes les 45 min à partir du km 10)
- Plan hydratation (150–200 mL à chaque ravitaillement tous les 5 km)
- Thermorégulation si météo > 18 °C
- Fatigue neuromusculaire (nombre de foulées ≈ distance × 820)
- VO₂max et % à l'allure cible

#### F. Synthèse & Verdict
- Points forts : lister les 3–5 points positifs de l'entraînement
- Points à surveiller : lister les 3–5 risques principaux
- Objectif réaliste : fourchette de temps basée sur l'allure des longues + gain affûtage (2–4 %)
- Verdict en une phrase courte, directe, en majuscules (ex : "PRÊT. GÈRE LE DÉPART.")

---

### Étape 3 — Mise à jour du HTML

Modifier uniquement la section `<div id="page-analyse" ...>` dans `./artefacts/app-coach/index.html`.

**Règles de mise à jour :**
- Conserver le design system Atheos High-Performance (classes Tailwind existantes, couleurs fuchsia `#a900a9` / noir `#1a1c1c`)
- Mettre à jour toutes les valeurs numériques et dates
- Mettre à jour les barres de progression mensuelle (tableau `analyseMonthly` dans le script JS)
- Mettre à jour les compteurs de séances par type
- Mettre à jour les niveaux de risque (couleurs : rouge = élevé, ambre = modéré, gris = faible)
- Mettre à jour le verdict final
- Ne pas modifier la structure HTML ou les classes CSS

**Variables JS à mettre à jour :**
```javascript
// Dans le script, mettre à jour ce tableau avec les données réelles :
const analyseMonthly = [
  { label:'Jan 2026', km: XX.X, note:'...' },
  { label:'Fév 2026', km: XX.X, note:'...' },
  { label:'Mar 2026', km:XXX.X, note:'...' },
  { label:'Avr 2026', km:XXX.X, note:'...' },
  // Ajouter les mois suivants si nécessaire
];
```

---

## Format des données d'entrée (fichiers `./raw-data/strava/*.json`)

Chaque fichier contient au minimum les champs suivants issus de l'API Strava :

```json
{
  "id": 12345678,
  "name": "Course à pied du midi",
  "type": "Run",
  "start_date_local": "2026-04-24T12:30:00Z",
  "distance": 10130.0,
  "moving_time": 2810,
  "elapsed_time": 2900,
  "average_speed": 3.604,
  "max_speed": 4.5,
  "average_heartrate": 158,
  "max_heartrate": 172,
  "total_elevation_gain": 45.0
}
```

Conversions à appliquer :
- `distance` (mètres) → km : `distance / 1000`
- `moving_time` (secondes) → allure (sec/km) : `moving_time / (distance / 1000)`
- `average_speed` (m/s) → allure (sec/km) : `1000 / average_speed`

---

## Exemple d'appel

```
Voici les nouvelles activités Strava dans ./raw-data/strava/ (depuis la dernière mise à jour).
Applique la grille d'analyse ci-dessus et mets à jour la page Analyse Entraînement de ./artefacts/app-coach/index.html.
Date du jour : [DATE].
Jours restants avant le marathon d'Auxerre (26 mai 2026) : [J-XX].
```
