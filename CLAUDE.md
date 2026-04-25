## Objectif
Utiliser le mcp Strava en vue d'analyser mes sorties et m'aider à préparer au mieux mes objectifs à venir, dont mon marathon à Auxerre le 26 mai 2026.

M'identifier seulement par mon prénom, l'application doit reste anonyme.


Plusieurs mini apps et support de présentation sont destinés à être crées en tant qu'artefacts.

## Données brutes Strava
Les données brutes importées de Strava utiles pour l'application doivent être régulièrement importées dans le dossier `./raw-data/strava`.

- **Import incrémental uniquement** : ne réimporter que les données des nouvelles activités (pas les activités déjà présentes).
- **Format** : un fichier JSON par activité, nommé `{activity_id}.json`, contenant les champs bruts Strava.
- **Source de vérité pour le front** : le front-end doit lire ses données depuis ce dossier (via un script de build ou un fetch au chargement) plutôt que des données codées en dur dans le HTML.
- **Script de build** : utiliser `./scripts/build-data.js` (ou équivalent) pour transformer les fichiers `./raw-data/strava/*.json` en un fichier `./artefacts/app-coach/data/runs.json` consommé par l'application.

## Préférer l'utisation de scripts pluôt que de l'IA quand c'est possible
Dans une optique d'optimisation de la consommation d'outils et des tokens, dès que des processus récurrents pouvant être générés sans ia générative sont identifiés, il faut créer des scripts dans le dossier ./scripts réalisant la même tâche et l'utiliser quand nécessaire.

## Création d'artefacts
Ils doivent être stockés, après aboutissement, dans le dossier ../artefacts

Après finalisation du produit, un fichier DESCRIPTION.md doit être produit et intégré dans le dossier sous la forme suivante :

`---`
`titre: "Transformation IA & Amélioration Continue (Gemini/Marp)"`
`description: "Présentation Marp (Markdown) générée par Gemini/NotebookLM, couvrant la transformation IA de la Squad DAI."`

`type: markdown`
`---`

Cahque artefact doit avoir à sa racine un fichier config.yaml avec différentes informations techniques comme :
- nom du design system
- url du site (si éligible)

## Design
Plusieurs design system sont disponibles pour la création des artefacts. 
Ils sont localisés dans design-systems/

## Déploiement et hébergement distant des *produits finis*
- Toujours demander confirmation avant de déployer
- Le mode de déploiement par défaut est vers amplify

**`DEPLOYMENT.md`** — informations non-sensibles :
```
hosted_product_cloud_provider:****
hosted_product_url:****
hosted_product_region:****
```

**`SECRETS.md`** — credentials sensibles (username/password) :
```
hosted_product_username:****
hosted_product_password:****
```

Exemple `DEPLOYMENT.md` :
```
hosted_product_cloud_provider:aws_amplify
hosted_product_url:https://main.d3rn8pl4ofbmbg.amplifyapp.com
hosted_product_region:eu-west-1
```

Exemple `SECRETS.md` :
```
hosted_product_username:admin
hosted_product_password:mypassword
```

### Si choix : GCP
Créer un projet GCP dédié, à créer s'il n'existe pas.
Le produit créé, s'il est un site, doit être stocké dans Firebase Hosting.
Les assets audio et images qu'utilisent le site doivent être stockés dans Google Cloud Storage

### Si choix : AWS Amplify
Créer un projet Amplify dédié, à créer s'il n'existe pas.
Les assets audio et images qu'utilisent le site doivent être stockés dans S3