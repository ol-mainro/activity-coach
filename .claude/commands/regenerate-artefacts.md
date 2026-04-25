# Régénération des artefacts

Régénère l'ensemble des artefacts du projet à partir des dernières activités Strava, puis commit et pousse sur main.

## Étapes

### 1. Import incrémental des activités Strava

Récupère les activités récentes via le MCP Strava (`mcp__strava__get-recent-activities` ou `mcp__strava__get-all-activities`).

Pour chaque activité retournée :
- Vérifier si le fichier `./raw-data/strava/{activity_id}.json` existe déjà.
- **Si non** : créer le fichier avec les champs bruts de l'activité.
- **Si oui** : réimporter (écraser) uniquement dans deux cas :
  1. L'activité date de moins de 7 jours (les données Strava peuvent encore être modifiées).
  2. Les artefacts nécessitent des champs absents du fichier existant (champs non encore importés).
- Dans tous les autres cas : ignorer.

Afficher un résumé : combien de nouvelles activités importées, combien mises à jour, combien ignorées.

### 2. Reconstruction du fichier de données consolidé

Exécuter le script de build :
```
node ./scripts/build-data.js
```
Ce script lit `./raw-data/strava/*.json` et produit `./artefacts/app-coach/data/runs.json`.

### 3. Régénération de chaque artefact

Pour chaque sous-dossier dans `./artefacts/` :

1. **Lire `DESCRIPTION.md`** à la racine de l'artefact (s'il existe).
   - Extraire la propriété `principes_regeneration` du frontmatter YAML.
   - Ces principes sont la **mémoire éditoriale** de l'artefact : les respecter impérativement lors de toute modification.

2. **Lire le fichier principal de l'artefact** (`index.html` ou équivalent).

3. **Mettre à jour le contenu** en intégrant les nouvelles données :
   - Recalculer tous les KPIs, stats et métriques depuis `./raw-data/strava/*.json` ou `./artefacts/app-coach/data/runs.json`.
   - Ne jamais coder de chiffres en dur — toujours recalculer.
   - Appliquer chaque principe listé dans `principes_regeneration`.
   - Conserver le design system, la structure des onglets/sections et le style visuel définis dans l'artefact.

4. **Écrire le fichier mis à jour** en place.

### 4. Vérification

Après mise à jour de chaque artefact :
- Vérifier que le HTML est valide (balises fermées, pas de placeholder `****`).
- Vérifier que l'anonymat est respecté (prénom uniquement, pas de nom complet).

### 5. Commit et push

```bash
git add -A
git commit -m "chore: régénération artefacts — activités au {date_du_jour}"
git push origin main
```

Remplacer `{date_du_jour}` par la date ISO du jour (ex : `2026-04-25`).

## Comportement attendu en fin d'exécution

- Résumé des activités importées (nouvelles / ignorées).
- Liste des artefacts mis à jour avec les changements principaux.
- Confirmation du commit et du push.
