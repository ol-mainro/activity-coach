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

### 3. Mise à jour de la base de connaissances

Pour chaque sous-dossier dans `./knowledge/` :

1. **Lire `DESCRIPTION.md`** — il décrit le périmètre éditorial du thème et ce que `KNOWLEDGE.md` doit contenir.

2. **Générer ou mettre à jour `KNOWLEDGE.md`** en combinant :
   - Les données brutes Strava (`./raw-data/strava/*.json`) filtrées et analysées selon le thème.
   - Les connaissances propres à l'IA sur ce thème (botanique, physiologie, etc.), contextualisées aux activités de Romain.
   - Des inférences, patterns et analyses qui enrichissent la compréhension au-delà du chiffre brut.

3. **`KNOWLEDGE.md` doit être plus exhaustif que les artefacts** qui en découlent : c'est la couche de synthèse intermédiaire que les artefacts viennent piocher.

Afficher un résumé des thèmes mis à jour.

### 4. Régénération de chaque artefact

Pour chaque sous-dossier dans `./artefacts/` :

1. **Lire `DESCRIPTION.md`** à la racine de l'artefact (s'il existe).
   - Extraire la propriété `principes_regeneration` du frontmatter YAML.
   - Ces principes sont la **mémoire éditoriale** de l'artefact : les respecter impérativement lors de toute modification.

2. **Identifier les thèmes de connaissance pertinents** pour cet artefact et lire les `KNOWLEDGE.md` correspondants dans `./knowledge/`.

3. **Lire le fichier principal de l'artefact** (`index.html` ou équivalent).

4. **Mettre à jour le contenu** en s'appuyant sur les `KNOWLEDGE.md` comme source principale :
   - Recalculer tous les KPIs, stats et métriques depuis `./raw-data/strava/*.json` ou `./artefacts/app-coach/data/runs.json`.
   - Ne jamais coder de chiffres ou de faits en dur — toujours recalculer ou citer le `KNOWLEDGE.md`.
   - Appliquer chaque principe listé dans `principes_regeneration`.
   - Conserver le design system, la structure des onglets/sections et le style visuel définis dans l'artefact.

5. **Écrire le fichier mis à jour** en place.

### 5. Vérification

Après mise à jour de chaque artefact :
- Vérifier que le HTML est valide (balises fermées, pas de placeholder `****`).
- Vérifier que l'anonymat est respecté (prénom uniquement, pas de nom complet).

### 6. Commit et push

```bash
git add -A
git commit -m "chore: régénération artefacts — activités au {date_du_jour}"
git push origin main
```

Remplacer `{date_du_jour}` par la date ISO du jour (ex : `2026-04-25`).

## Comportement attendu en fin d'exécution

- Résumé des activités importées (nouvelles / mises à jour / ignorées).
- Résumé des thèmes de connaissance mis à jour.
- Liste des artefacts mis à jour avec les changements principaux.
- Confirmation du commit et du push.
