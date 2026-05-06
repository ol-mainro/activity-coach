## Objectif

Analyser mes sorties Strava.

M'identifier uniquement par mon prénom — l'application doit rester anonyme.

Plusieurs mini-apps, pages web et supports de présentation sont destinés à être créés en tant qu'artefacts.

---

## Données brutes Strava

Les données importées depuis Strava sont stockées dans `./raw-data/strava`.

- **Import incrémental uniquement** : ne réimporter que les activités absentes du dossier (comparer par `activity_id`) et celles de moins de 7 jours (ces denrnières peuvent avoir été modifiées), sauf si de nouveaux champs sont nécessaires pour les besoin des applications.
- **Visibilité** : importer toutes les activités quelle que soit leur visibilité, y compris les activités non publiques (visibles uniquement par moi) — le champ Strava `visibility` ou `private` permet de les identifier.
- **Notes cachées** : le champ `private_note` (note cachée de l'activité) doit être importé et conservé dans le JSON brut. Il peut contenir des informations contextuelles précieuses (état physique, météo, ressenti, etc.).
- **Format** : un fichier JSON par activité, nommé `{activity_id}.json`, contenant les champs bruts Strava et leurs descriptions.
- **Source de vérité** : le front-end lit ses données depuis ce dossier (via script de build ou fetch au chargement) — jamais de données codées en dur dans le HTML.
- **Script de build** : `./scripts/build-data.js` transforme `./raw-data/strava/*.json` en `./artefacts/app-coach/data/runs.json`.
- **Filtre par type** : l'application coach (`app-coach`) ne prend en compte que les activités de type course à pied (champ Strava `type: "Run"` ou `sport_type: "Run"`). Les autres types d'activités sont ignorés lors du build.

---

## Scripts plutôt qu'IA

Dès qu'un processus récurrent peut être automatisé sans IA générative, créer un script dans `./scripts` et l'utiliser systématiquement. Objectif : réduire la consommation de tokens et d'appels d'outils.

---

## Base de connaissances

Avant toute production d'artefact, l'IA génère ou met à jour des fichiers de connaissances synthétiques dans `./knowledge/`.

### Structure

```
./knowledge/
  {theme}/
    DESCRIPTION.md   ← décrit ce que doit contenir la connaissance de ce thème
    KNOWLEDGE.md     ← généré par l'IA, mis à jour à chaque régénération
```

### `DESCRIPTION.md`

Fichier rédigé manuellement, il décrit en langage naturel le périmètre et les intentions éditoriales du thème. L'IA s'y réfère pour savoir quoi produire dans `KNOWLEDGE.md`.

### `KNOWLEDGE.md`

Fichier généré par l'IA à partir :
- des données brutes Strava (`./raw-data/strava/*.json`)
- de connaissances propres à l'IA sur le thème (botanique, physiologie, etc.)
- d'inférences et d'analyses contextualisées aux activités de Romain

Il est **plus exhaustif que l'artefact final** — c'est la couche de synthèse intermédiaire. Les artefacts doivent lire ce fichier comme source principale de contenu, plutôt que de générer le contenu à la volée.

### Règles

- **Toute production d'artefact est précédée de la mise à jour du ou des `KNOWLEDGE.md` pertinents.**
- Chaque thème est indépendant : un artefact peut s'appuyer sur un ou plusieurs thèmes.
- Ne pas coder de chiffres ou de faits en dur dans les artefacts : ils doivent toujours provenir des données brutes ou du `KNOWLEDGE.md`.
- Si un nouveau thème est nécessaire, créer le sous-dossier et son `DESCRIPTION.md` avant de générer le `KNOWLEDGE.md`.

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

## Navigation entre artefacts

Chaque artefact doit comporter, en bas de page, un bouton de navigation permettant d'accéder aux autres artefacts.

- **Placement** : dans le `<footer>` de la page — créer un footer si absent.
- **Lien dynamique** : toujours utiliser des chemins relatifs (`../nom-de-lartefact/`) — jamais de domaine ou de chemin absolu codé en dur. Cela garantit que les liens fonctionnent quel que soit le domaine ou le sous-dossier d'hébergement.
- **Style** : respecter le design system de l'artefact courant (couleurs, typographie, bordures).
- **Mise à jour** : à chaque création d'un nouvel artefact, ajouter le lien vers ce nouvel artefact dans le footer de tous les artefacts existants, et vice-versa.

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
