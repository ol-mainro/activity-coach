## Objectif

Analyser mes sorties Strava et préparer au mieux mes objectifs sportifs, dont le marathon d'Auxerre le 26 mai 2026.

M'identifier uniquement par mon prénom — l'application doit rester anonyme.

Plusieurs mini-apps, pages web et supports de présentation sont destinés à être créés en tant qu'artefacts.

---

## Données brutes Strava

Les données importées depuis Strava sont stockées dans `./raw-data/strava`.

- **Import incrémental uniquement** : ne réimporter que les activités absentes du dossier (comparer par `activity_id`).
- **Format** : un fichier JSON par activité, nommé `{activity_id}.json`, contenant les champs bruts Strava.
- **Source de vérité** : le front-end lit ses données depuis ce dossier (via script de build ou fetch au chargement) — jamais de données codées en dur dans le HTML.
- **Script de build** : `./scripts/build-data.js` transforme `./raw-data/strava/*.json` en `./artefacts/app-coach/data/runs.json`.

---

## Scripts plutôt qu'IA

Dès qu'un processus récurrent peut être automatisé sans IA générative, créer un script dans `./scripts` et l'utiliser systématiquement. Objectif : réduire la consommation de tokens et d'appels d'outils.

---

## Création d'artefacts

Les artefacts finalisés sont stockés dans `./artefacts`.

### `DESCRIPTION.md`

Chaque artefact doit contenir un fichier `DESCRIPTION.md` à sa racine, au format frontmatter :

```yaml
---
titre: "Titre de l'artefact"
description: "Description courte du contenu et de la méthode de génération."
type: markdown | html | app | slides
principes_regeneration: |
  Principes en langage naturel que l'agent doit respecter à chaque régénération
  de cet artefact. Exemple : conserver le ton sobre et factuel, ne jamais afficher
  le nom complet de l'utilisateur, toujours recalculer les KPIs depuis les données
  brutes, respecter la palette de couleurs du design system retenu.
---
```

La propriété `principes_regeneration` est optionnelle mais recommandée dès que l'artefact est amené à être régénéré. Elle sert de mémoire éditoriale et technique persistante pour l'agent.

### `config.yaml`

Chaque artefact doit également contenir un fichier `config.yaml` à sa racine :

```yaml
design_system: nom-du-design-system
url: https://... # si hébergé
```

---

## Design systems

Disponibles dans `./design-systems/`. Sélectionner le design system adapté à chaque artefact avant de commencer sa création.

---

## Déploiement

- **Toujours demander confirmation avant de déployer.**
- Mode de déploiement par défaut : AWS Amplify.

### Fichiers de configuration à créer dans le dossier de l'artefact

**`DEPLOYMENT.md`** — informations non-sensibles :
```
hosted_product_cloud_provider:****
hosted_product_url:****
hosted_product_region:****
```

**`SECRETS.md`** — credentials (ne pas versionner) :
```
hosted_product_username:****
hosted_product_password:****
```

### AWS Amplify

Créer un projet Amplify dédié s'il n'existe pas. Les assets (images, audio) sont hébergés sur S3.

### GCP

Créer un projet GCP dédié s'il n'existe pas. Le site est hébergé sur Firebase Hosting. Les assets sont stockés dans Google Cloud Storage.
