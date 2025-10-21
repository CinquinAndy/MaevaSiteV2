# Scripts - Documentation

Ce dossier contient les scripts utilitaires pour le projet.

## 📋 Scripts disponibles

### 1. Géolocalisation des villes (`fetch-cities.ts`)

Récupère automatiquement les villes importantes autour de Thonon-les-Bains.

```bash
pnpm fetch:cities
```

**Fonctionnalités :**
- Recherche géographique (rayon 150 km)
- Système de scoring intelligent (distance + population)
- Export JSON avec 150 villes
- Données : population, distance, coordonnées GPS, pays

**Sortie :** `scripts/cities-data.json`

---

### 2. Extraction avis Google (`scrape-google-reviews-simple.ts`)

Extrait les avis Google de "cinquin maeva" via Playwright.

```bash
pnpm scrape:reviews
```

**Fonctionnalités :**
- Navigation automatique sur Google Maps
- Gestion de la popup de cookies
- Extraction : nom, image, note, date, commentaire
- Scroll automatique pour tous les avis

**Sortie :** `reviews-data/google-reviews.json`

---

### 3. Nettoyage des avis (`clean-reviews.ts`)

Nettoie les données extraites : supprime doublons, calcule stats.

```bash
pnpm clean:reviews
```

**Fonctionnalités :**
- Suppression des doublons (nom + texte)
- Nettoyage des noms ("Photo de" retiré)
- Calcul de la note moyenne
- Distribution des notes
- Tri par date

**Sortie :** `reviews-data/google-reviews.json` (nettoyé)

---

### 4. Import Payload CMS (`import-google-reviews-to-payload.ts`)

Importe les avis Google dans la collection `Testimonials` de Payload CMS.

```bash
# Mode sync (recommandé) : nouveaux uniquement
pnpm import:reviews sync

# Mode create : ignore les existants
pnpm import:reviews create

# Mode update : crée + met à jour
pnpm import:reviews update
```

**Fonctionnalités :**
- Conversion JSON → Payload
- Détection des doublons
- Auto-publication (status = published)
- Auto-featured pour 5 étoiles
- Statistiques détaillées

**Résultat :** Avis dans Payload Admin `/admin`

---

### 5. Workflow complet (`sync:reviews`)

Exécute toute la chaîne : extraction → nettoyage → import.

```bash
pnpm sync:reviews
```

Équivalent à :
```bash
pnpm scrape:reviews
pnpm clean:reviews
pnpm import:reviews sync
```

**Utilisation recommandée :** 1 fois par mois pour mise à jour.

---

## 📂 Fichiers de données

### Villes

- `scripts/cities-data.json` - 150 villes autour de Thonon
- Utilisé pour le SEO local

### Avis Google

- `reviews-data/google-reviews.json` - Avis extraits et nettoyés
- Format : nom, image URL, note, date, texte

### Galeries (archive)

- `scripts/galleries-config.json` - Configuration galeries WordPress (migration terminée)

---

## 🎯 Utilisation courante

### Mise à jour mensuelle des avis

```bash
pnpm sync:reviews
```

### Régénérer les types Payload

Après modification de collections :

```bash
pnpm generate:types
```

### Vérifier la qualité du code

```bash
pnpm check
```

---

## 🗂️ Structure des données

### Avis Google (`reviews-data/google-reviews.json`)

```json
{
  "businessName": "Maquilleuse professionnelle freelance - Makeup.Artist.Dream",
  "averageRating": 4.58,
  "totalReviews": 19,
  "extractedAt": "2025-10-22T...",
  "reviews": [
    {
      "author": "Laure Périnel",
      "authorImage": "https://lh3.googleusercontent.com/...",
      "rating": 5,
      "date": "il y a 9 mois",
      "text": "Super moment de complicité..."
    }
  ]
}
```

### Villes (`scripts/cities-data.json`)

```json
{
  "generatedAt": "2025-10-20T...",
  "baseLocation": {
    "name": "Thonon-les-Bains",
    "lat": 46.3708,
    "lon": 6.4792
  },
  "searchRadius": 150,
  "totalCitiesFound": 164,
  "topCities": [
    {
      "rank": 1,
      "name": "Genève",
      "country": "France",
      "population": 191557,
      "distance": 31.7,
      "coordinates": { "lat": 46.2..., "lon": 6.1... },
      "score": 914.3
    }
  ]
}
```

---

## 📚 Documentation complète

- **CLAUDE.md** - Instructions pour Claude Code
- **PAYLOAD_REVIEWS_GUIDE.md** - Guide import Payload CMS
- **PRESTATIONS_DATA.md** - Données des prestations

---

**Dernière mise à jour :** 22 octobre 2025
