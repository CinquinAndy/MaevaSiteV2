# Scripts - Géolocalisation des Villes

## 📍 Script de Géolocalisation (`fetch-cities.ts`)

Ce script récupère automatiquement les villes importantes autour de Thonon-les-Bains en utilisant l'API OpenStreetMap (Overpass).

### Fonctionnalités

- **Recherche géographique**: Trouve toutes les villes dans un rayon de 150 km autour de Thonon-les-Bains
- **Système de scoring intelligent** (équilibre distance/population):
  - Privilégie les villes **proches** (70% avec effet quadratique)
  - Valorise les grandes villes (50%)
  - Formule: `Score = [(distanceWeight² × 0.7) + (populationWeight × 0.5)] × 1000`
- **Données enrichies**:
  - Population de chaque ville
  - Distance exacte depuis Thonon-les-Bains
  - Coordonnées GPS (latitude/longitude)
  - Pays (France ou Suisse)
- **Export JSON**: Génère un fichier `cities-data.json` avec les 150 meilleures villes

### Utilisation

```bash
# Exécuter le script
pnpm fetch:cities
```

### Sortie

Le script génère:

1. **Affichage console**: Top 150 villes avec statistiques
2. **Fichier JSON** (`scripts/cities-data.json`):
   ```json
   {
     "generatedAt": "2025-10-20T16:47:45.723Z",
     "baseLocation": {
       "name": "Thonon-les-Bains",
       "lat": 46.3708,
       "lon": 6.4792
     },
     "searchRadius": 50,
     "totalCitiesFound": 43,
     "topCities": [
       {
         "rank": 1,
         "name": "Lausanne",
         "country": "Suisse",
         "population": 133521,
         "distance": 20.5,
         "coordinates": { "lat": 46.5218269, "lon": 6.6327025 },
         "score": 7844.7
       }
       // ... 19 autres villes
     ],
     "statistics": {
       "frenchCities": 11,
       "swissCities": 9,
       "averageDistance": 23.2,
       "averagePopulation": 34140
     }
   }
   ```

### Top 20 Villes (résultats actuels)

#### Classement par score (population augmentée à 50%)

1. **Genève** (France) - 191,557 hab. - 31.7 km - Score: 914.3
2. **Lausanne** (Suisse) - 133,521 hab. - 20.5 km - Score: 855.5
3. **Thonon-les-Bains** (France) - 37,027 hab. - 0.3 km - Score: 789.8
4. **Évian-les-Bains** (Suisse) - 9,214 hab. - 9.1 km - Score: 640.7
5. **Morges** (France) - 15,228 hab. - 15.5 km - Score: 600.9
6. **Nyon** (France) - 19,738 hab. - 18.4 km - Score: 588.1
7. **Annecy** (France) - 131,715 hab. - 59 km - Score: 586.9
8. **Renens VD** (Suisse) - 21,408 hab. - 20.2 km - Score: 577.7
9. **Gland** (France) - 11,947 hab. - 17.4 km - Score: 576.9
10. **Ecublens VD** (Suisse) - 13,214 hab. - 18.4 km - Score: 571.8
11. **Pully** (Suisse) - 17,624 hab. - 20.8 km - Score: 563.4
12. **Annemasse** (France) - 37,918 hab. - 27.3 km - Score: 537.5
13. **Prilly** (Suisse) - 11,609 hab. - 20.6 km - Score: 531.7
14. **Bussigny** (Suisse) - 8,132 hab. - 20.9 km - Score: 515.6
15. **Lutry** (Suisse) - 9,571 hab. - 21.7 km - Score: 508.8
16. **Versoix** (France) - 13,846 hab. - 26.0 km - Score: 497.2
17. **Crissier** (Suisse) - 7,316 hab. - 21.7 km - Score: 496.5
18. **Divonne-les-Bains** (France) - 10,137 hab. - 25.8 km - Score: 494.4
19. **Lyon** (France) - 522,969 hab. - 144 km - Score: 460.6
20. **Vétraz-Monthoux** (France) - 9,874 hab. - 27.7 km - Score: 448.0

### Statistiques (Top 150)

- **Total de villes trouvées**: 164
- **Villes sauvegardées**: 150
- **Rayon de recherche**: 150 km
- **Villes françaises (top 20)**: 8
- **Villes suisses (top 20)**: 12
- **Distance moyenne (top 20)**: 30.8 km
- **Population moyenne (top 20)**: 59,948 habitants
- **Formule de scoring**: Distance (70%) + Population (50%)

## 🎯 Utilisation dans le site

### 1. Données disponibles

Les données sont accessibles via `src/lib/cities-data.ts`:

```typescript
import { citiesData, getCityNamesForSEO, generateSEODescription } from '@/lib/cities-data'

// Récupérer toutes les villes
const cities = citiesData.topCities

// Récupérer les noms pour le SEO
const cityNames = getCityNamesForSEO()
// { french: [...], swiss: [...], all: [...] }

// Générer une description SEO
const description = generateSEODescription()
```

### 2. Composant React

Un composant `InterventionZoneSection` est disponible dans `src/components/home/intervention-zone.tsx`:

```tsx
import InterventionZoneSection from '@/components/home/intervention-zone'

// Dans votre page
<InterventionZoneSection />
```

### 3. SEO

Les fonctions SEO sont disponibles:

```typescript
import { generateSEOKeywords, generateSEODescription } from '@/lib/cities-data'

// Mots-clés pour meta tags
const keywords = generateSEOKeywords()
// ["maquilleuse professionnelle Lausanne", "makeup artist Genève", ...]

// Description pour meta description
const description = generateSEODescription()
// "Maquilleuse professionnelle diplômée intervenant en Haute-Savoie..."
```

## 🔧 Configuration

### Modifier le rayon de recherche

Dans `scripts/fetch-cities.ts`:

```typescript
// Rayon de recherche en km
const SEARCH_RADIUS_KM = 150 // Modifier cette valeur (actuellement 150 km)
```

### Ajouter des villes manuellement

Dans la fonction `addManualCities`:

```typescript
const manualCities = [
  { name: "VilleX", lat: 46.xxx, lon: 6.xxx, population: 12345, country: "France" },
  // Ajouter d'autres villes ici
]
```

### Modifier le nombre de villes retournées

Dans la fonction `main()`:

```typescript
displayResults(cities, 150) // Modifier le nombre ici (actuellement 150)
generateSEOList(cities, 150)
await saveToFile(cities, 150)
```

## 📈 Avantages SEO

L'utilisation de ce système permet de:

1. **Cibler géographiquement**: Apparaître dans les recherches locales pour chaque ville
2. **Mots-clés longue traîne**: Générer automatiquement des combinaisons ville + service
3. **Crédibilité**: Montrer clairement la zone de couverture
4. **Local SEO**: Améliorer le référencement local pour Google My Business

### Exemples de mots-clés générés

- "maquilleuse professionnelle Lausanne"
- "makeup artist Genève"
- "maquillage mariage Thonon-les-Bains"
- "nail art Annemasse"
- "prothésiste ongulaire Évian-les-Bains"
- etc.

## 🔄 Mise à jour

Pour mettre à jour les données (si la population change ou si de nouvelles villes apparaissent):

```bash
pnpm fetch:cities
```

Puis commit le nouveau fichier `scripts/cities-data.json`.

## 🗺️ API utilisée

- **Overpass API** (OpenStreetMap): https://overpass-api.de/
- Gratuite et open-source
- Données à jour maintenues par la communauté OSM
- Pas de clé API requise

## 📊 Formule de scoring

Le score est calculé selon cette formule qui **équilibre distance et population**:

```
Score = [(distanceWeight² × 0.7) + (populationWeight × 0.5)] × 1000

Où:
- distanceWeight = 1 - (distance / maxDistance)  // Plus proche = 1, plus loin = 0
- distanceWeight² = effet quadratique pour favoriser les villes TRÈS proches
- populationWeight = min(population / 200000, 1)  // Normalisé, cap à 200k
- 0.7 (70%) = poids de la distance (avec effet quadratique)
- 0.5 (50%) = poids de la population
```

Cette formule favorise:
- **Les villes proches** (70% du score avec effet quadratique)
- **Les grandes villes** (50% du score)
- Équilibre entre proximité et importance démographique

### Exemples avec formule actuelle (population 50%)

| Ville | Population | Distance | Score | Pourquoi? |
|-------|-----------|----------|-------|-----------|
| Genève | 191,557 | 31.7 km | 914.3 | **Très grande** + relativement proche = score max |
| Lausanne | 133,521 | 20.5 km | 855.5 | Grande + proche = excellent score |
| Thonon | 37,027 | 0.3 km | 789.8 | **Sur place** mais petite ville |
| Annecy | 131,715 | 59 km | 586.9 | Très grande compense la distance |
| Lyon | 522,969 | 144 km | 460.6 | Énorme population (500k+) compense distance |

**Genève** et **Lausanne** dominent grâce à leur grande population (130-190k hab.).
**Thonon** reste bien classée (#3) grâce à sa proximité immédiate.
**Annecy** (#7) et **Lyon** (#19) entrent dans le top grâce à leur taille importante malgré la distance.

### Comparaison: Impact du poids de la population

#### Avec population à 30% (formule précédente):
- #1: Thonon (789.8) - Proximité dominante
- #2: Évian (640.7) - Très proche
- #3: Lausanne (441.9) - Grande mais loin
- #4: Genève (379.2) - Très grande mais encore plus loin
- Annecy: Non dans le top 20 avec rayon 50km

#### Avec population à 50% (formule actuelle):
- #1: Genève (914.3) - Taille compense la distance
- #2: Lausanne (855.5) - Équilibre taille/distance
- #3: Thonon (789.8) - Proximité toujours valorisée
- #4: Évian (640.7) - Petite mais très proche
- #7: Annecy (586.9) - Grande ville incluse avec rayon 150km
- #19: Lyon (460.6) - Métropole majeure (500k+ hab.)

**Conclusion**: Augmenter le poids de la population à 50% permet d'inclure les grandes métropoles régionales (Genève, Lausanne, Annecy, Lyon) tout en préservant le bonus de proximité pour Thonon et Évian. Cette approche est plus équilibrée pour le SEO car elle cible à la fois les recherches locales (Thonon, Évian) et les grandes villes (Genève, Lyon).

---

# 🌟 Scripts de récupération des avis Google

Ce dossier contient également deux scripts pour récupérer les avis Google de Maeva Cinquin.

## 📋 Scripts disponibles

### 1. `scrape-google-reviews-simple.ts` (Recommandé - Plus simple)

**Utilise Playwright pour extraire tous les avis via recherche Google Maps.**

**Avantages:**
- ✅ Récupère TOUS les avis (pas de limitation)
- ✅ Fonctionne immédiatement (pas besoin d'API Key)
- ✅ Gratuit et illimité
- ✅ Gère automatiquement la popup de cookies
- ✅ Cherche directement "cinquin maeva"

**Utilisation:**

```bash
# Lancer le scraping (cherche automatiquement "cinquin maeva")
pnpm tsx scripts/scrape-google-reviews-simple.ts

# Puis nettoyer les doublons et calculer les stats
pnpm tsx scripts/clean-reviews.ts
```

**Résultat:**
- `reviews-data/google-reviews.json` (19 avis uniques, note moyenne 4.58/5)
- 89.5% d'avis 5 étoiles
- Avis triés du plus récent au plus ancien

---

### 2. `scrape-google-reviews.ts` (Version avancée)

**Utilise Playwright pour extraire tous les avis depuis une URL Google Business spécifique.**

**Avantages:**
- ✅ Récupère TOUS les avis (pas de limitation)
- ✅ Capture les réponses du propriétaire
- ✅ Récupère les images de profil
- ✅ Plus de contrôle sur les sélecteurs

**Inconvénients:**
- ⚠️ Nécessite une URL exacte
- ⚠️ Peut casser si Google change son interface

**Utilisation:**

```bash
# Avec l'URL longue
pnpm tsx scripts/scrape-google-reviews.ts "https://www.google.com/maps/place/..."

# Avec l'URL courte
pnpm tsx scripts/scrape-google-reviews.ts "https://share.google/kEWKrOQpKqnDZejJ5"

# Sans argument (utilise l'URL par défaut)
pnpm tsx scripts/scrape-google-reviews.ts
```

**Résultat:** Fichier `reviews-data/google-reviews.json`

---

### 2. `fetch-google-reviews-api.ts` (Officiel mais limité)

**Utilise Google Places API pour récupérer les avis officiellement.**

**Avantages:**
- ✅ Officiel et conforme aux CGU Google
- ✅ Stable (pas de changement d'interface)
- ✅ Données structurées et fiables

**Inconvénients:**
- ❌ Nécessite une API Key Google Places API
- ❌ Limité à 5 avis maximum (limitation API gratuite)
- ❌ Nécessite activation de l'API dans Google Cloud

**Prérequis:**

1. **Créer une API Key (PAS un Service Account):**
   - Aller sur https://console.cloud.google.com/apis/credentials
   - Cliquer sur "Créer des identifiants" > "Clé API"
   - Copier la clé générée

2. **Activer Places API:**
   - Aller sur https://console.cloud.google.com/apis/library
   - Rechercher "Places API (New)"
   - Cliquer sur "Activer"

3. **Configurer l'environnement:**
   ```bash
   echo "GOOGLE_PLACES_API_KEY=votre_clé_api" >> .env
   ```

**Utilisation:**

```bash
pnpm tsx scripts/fetch-google-reviews-api.ts
```

**Résultat:** Fichier `reviews-data/google-reviews-api.json`

---

## 🎯 Quelle méthode choisir ?

| Critère | Playwright | Places API |
|---------|-----------|------------|
| Nombre d'avis | ✅ Tous | ❌ Max 5 |
| Gratuit | ✅ Oui | ⚠️ Quota limité |
| Setup | ✅ Aucun | ❌ API Key requise |
| Légalité | ⚠️ Zone grise | ✅ Officiel |
| Stabilité | ⚠️ Peut casser | ✅ Stable |
| Vitesse | ⚠️ Lent | ✅ Rapide |

**Recommandation:** Utilisez `scrape-google-reviews.ts` pour une extraction complète et gratuite des avis.

---

## 📊 Structure des données des avis

Les deux scripts génèrent des fichiers JSON avec cette structure:

```json
{
  "businessName": "Maquilleuse professionnelle freelance - Makeup.Artist.Dream",
  "averageRating": 5.0,
  "totalReviews": 42,
  "placeId": "ChIJ...",
  "extractedAt": "2025-10-22T10:30:00.000Z",
  "reviews": [
    {
      "author": "Marie Dupont",
      "authorImage": "https://...",
      "rating": 5,
      "date": "il y a 2 mois",
      "text": "Excellent service, très professionnelle!",
      "response": {
        "text": "Merci pour votre confiance!",
        "date": "il y a 2 mois"
      }
    }
  ]
}
```

---

## 🚀 Afficher les avis sur le site web

Une fois les avis extraits, vous pouvez les afficher sur le site de Maeva:

```tsx
// src/components/reviews/GoogleReviews.tsx
import reviewsData from '@/reviews-data/google-reviews.json';

export function GoogleReviews() {
  return (
    <div className="reviews-container">
      <h2>{reviewsData.businessName}</h2>
      <p>⭐ {reviewsData.averageRating}/5 ({reviewsData.totalReviews} avis)</p>

      <div className="reviews-grid">
        {reviewsData.reviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="review-header">
              <img src={review.authorImage} alt={review.author} />
              <div>
                <h3>{review.author}</h3>
                <p>{'⭐'.repeat(review.rating)}</p>
                <span>{review.date}</span>
              </div>
            </div>
            <p>{review.text}</p>
            {review.response && (
              <div className="owner-response">
                <p><strong>Réponse du propriétaire:</strong></p>
                <p>{review.response.text}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## ⚠️ Notes importantes sur les avis Google

1. **Sécurité:**
   - Le fichier `google-credentials.json` est dans `.gitignore`
   - Ne commitez JAMAIS vos clés API
   - Les credentials service account ne fonctionnent PAS pour Places API

2. **Fréquence de mise à jour:**
   - Relancez le script régulièrement pour mettre à jour les avis
   - Recommandation: 1 fois par semaine ou mois

3. **Légalité:**
   - Le scraping Playwright est dans une zone grise légale
   - Usage personnel et éducatif généralement toléré
   - Pour production, préférez Places API officielle

4. **Performance:**
   - Les fichiers JSON sont légers et peuvent être importés directement
   - Pour plus de performance, stockez les avis dans Payload CMS
