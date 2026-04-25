# Workflow — Création d'un artefact éditorial

Ce document décrit le processus conversationnel que l'IA suit pour produire un artefact éditorial (newsletter, mini-site, quiz, slides…) à partir de la base de connaissances `./knowledge/`.

L'IA ne produit rien avant que l'utilisateur ait validé l'intention, les options éditoriales et le plan de travail.

---

## Vue d'ensemble

```
[Phase 1] Lecture de la base de connaissances
        ↓
[Phase 2] Clarification de l'intention
        ↓
[Phase 3] Proposition de sujets & discussion
        ↓
[Phase 4] ✅ Validation des options
        ↓
[Phase 5] Proposition du plan de travail
        ↓
[Phase 6] ✅ Validation du plan
        ↓
[Phase 7] Production de l'artefact
```

---

## Phase 1 — Lecture de la base de connaissances

Avant toute conversation avec l'utilisateur, l'IA lit :

1. Tous les fichiers `./knowledge/*/DESCRIPTION.md` pour cartographier les thèmes disponibles.
2. Tous les fichiers `./knowledge/*/KNOWLEDGE.md` existants pour s'imprégner des contenus synthétisés.
3. La liste des artefacts existants dans `./artefacts/` (titres, types, sujets) pour éviter les doublons et identifier des synergies.

L'IA construit mentalement une carte des connaissances disponibles avant de commencer le dialogue.

---

## Phase 2 — Clarification de l'intention

L'IA engage la conversation en posant des questions ouvertes pour comprendre :

**Questions à explorer (adapter selon le contexte, ne pas toutes poser d'un coup) :**

- Quel est le format souhaité ? *(newsletter, mini-site, quiz, slides, PDF…)*
- À qui est destiné cet artefact ? *(soi-même, partager, archiver…)*
- Quel est le déclencheur ? *(une période, un événement, une envie, une question)*
- Quel ton ? *(informatif, personnel, ludique, scientifique, poétique…)*
- Quel niveau de profondeur ? *(synthèse rapide, analyse détaillée)*

L'IA reformule la demande en une phrase synthétique et demande confirmation avant de passer à la suite.

---

## Phase 3 — Proposition de sujets et discussion

À partir des `KNOWLEDGE.md` disponibles et de l'intention clarifiée, l'IA propose **3 à 5 angles éditoriaux possibles**.

Chaque angle est présenté ainsi :

```
### Angle n — [Titre court]

**Thème(s) de connaissance mobilisés** : botanic / human-body / …
**Idée centrale** : [une phrase]
**Ce que ça pourrait donner** : [exemple de titre ou accroche de l'artefact]
**Pourquoi c'est pertinent maintenant** : [ancrage dans les données récentes]
```

L'IA invite ensuite à **discuter** de ces angles :
- Y en a-t-il un qui résonne plus ?
- Faut-il combiner plusieurs angles ?
- Y a-t-il un sujet absent qu'on devrait explorer ?

Cette phase est itérative : l'IA ajuste ses propositions selon les retours.

---

## Phase 4 — Validation des options ✅

Une fois un angle retenu, l'IA présente une **synthèse des options validées** :

```
## Récapitulatif avant plan de travail

- **Format** : [newsletter / mini-site / quiz / …]
- **Angle éditorial** : [titre de l'angle retenu]
- **Thèmes de connaissance** : [liste des KNOWLEDGE.md mobilisés]
- **Ton** : [sobre / ludique / scientifique / …]
- **Longueur estimée** : [courte / moyenne / longue]

✅ On valide ces options avant de passer au plan ?
```

L'IA attend une confirmation explicite avant de continuer.

---

## Phase 5 — Proposition du plan de travail

L'IA rédige un plan détaillé de l'artefact, adapté au format choisi.

### Plan type — Newsletter

```
## Plan de la newsletter

**Sujet** : [ligne d'objet proposée]
**Structure** :
1. Accroche — [angle d'entrée, 1 phrase]
2. Section principale — [titre + résumé du contenu, ~150 mots]
3. Encart chiffre / fait marquant — [donnée issue du KNOWLEDGE.md]
4. Section secondaire — [titre + résumé, ~100 mots]
5. Clôture — [ton, appel ou réflexion finale]

**Design system** : [nom du design system retenu]
**Sources** : [liste des KNOWLEDGE.md et fichiers raw-data utilisés]
```

### Plan type — Mini-site

```
## Plan du mini-site

**Titre de la page** : [proposition]
**Sections** :
1. Hero — [accroche + sous-titre]
2. [Nom de section] — [contenu, composants visuels]
3. [Nom de section] — [contenu]
4. …
5. Footer — navigation inter-artefacts

**Design system** : [nom retenu]
**Données dynamiques** : [champs JSON Strava utilisés]
**Données issues de KNOWLEDGE.md** : [extraits ou thèmes]
```

### Plan type — Quiz

```
## Plan du quiz

**Titre** : [proposition]
**Nombre de questions** : [5 / 10 / …]
**Format des questions** : [QCM / vrai-faux / réponse libre]
**Thèmes couverts** : [liste]
**Structure** :
- Introduction / contexte
- Questions (avec réponses et explications issues du KNOWLEDGE.md)
- Score & bilan final

**Design system** : [nom retenu]
```

---

## Phase 6 — Validation du plan ✅

L'IA présente le plan et demande une validation explicite :

```
## Plan de travail — validation requise

[Plan complet tel que défini en Phase 5]

**Avant de produire l'artefact, quelques questions :**
- La structure des sections vous convient-elle ?
- Le ton est-il juste ?
- Y a-t-il des éléments à ajouter, retirer ou déplacer ?

✅ On valide ce plan et on lance la production ?
```

L'IA n'écrit aucun code ni contenu final avant cette validation.

---

## Phase 7 — Production de l'artefact

Une fois le plan validé, l'IA exécute la production en suivant les règles de `CLAUDE.md` :

1. **Lire les `KNOWLEDGE.md` concernés** — s'y référer comme source principale de contenu.
2. **Calculer les métriques** depuis `./raw-data/strava/*.json` ou `./artefacts/app-coach/data/runs.json` — ne jamais coder de chiffres en dur.
3. **Choisir le design system** dans `./design-systems/` et l'appliquer.
4. **Produire l'artefact** dans `./artefacts/{nom-artefact}/`.
5. **Créer `DESCRIPTION.md`** avec `principes_regeneration` documentant les choix éditoriaux.
6. **Créer `config.yaml`** avec le design system et l'URL si applicable.
7. **Ajouter la navigation inter-artefacts** dans le footer de tous les artefacts existants.

---

## Règles transversales

- **Jamais de contenu produit sans validation** des phases 4 et 6.
- **Jamais de nom complet** — prénom uniquement (anonymat).
- **Jamais de chiffres codés en dur** — tout est calculé ou extrait du `KNOWLEDGE.md`.
- **Le `KNOWLEDGE.md` prime** sur l'improvisation : si une information n'est pas dans la base de connaissances, le signaler et proposer de l'enrichir d'abord.
- Si un thème manque dans `./knowledge/`, proposer de créer le dossier et le `DESCRIPTION.md` avant de lancer la production.
