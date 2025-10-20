# Scripts - Géolocalisation des Villes

## 📍 Script de Géolocalisation (`fetch-cities.ts`)

Ce script récupère automatiquement les villes importantes autour de Thonon-les-Bains en utilisant l'API OpenStreetMap (Overpass).

### Fonctionnalités

- **Recherche géographique**: Trouve toutes les villes dans un rayon de 50 km autour de Thonon-les-Bains
- **Système de scoring intelligent**:
  - Combine la distance et la population
  - Plus une ville est grande et proche, plus son score est élevé
  - Formule: `Score = (population / 1000) × (1 - distance / maxDistance) × 100`
- **Données enrichies**:
  - Population de chaque ville
  - Distance exacte depuis Thonon-les-Bains
  - Coordonnées GPS (latitude/longitude)
  - Pays (France ou Suisse)
- **Export JSON**: Génère un fichier `cities-data.json` utilisable par le site

### Utilisation

```bash
# Exécuter le script
pnpm fetch:cities
```

### Sortie

Le script génère:

1. **Affichage console**: Top 30 villes avec statistiques
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

### Top 15 Villes (résultats actuels)

#### Classement par score

1. **Lausanne** (Suisse) - 133,521 hab. - 20.5 km - Score: 7844.7
2. **Genève** (France) - 191,557 hab. - 31.7 km - Score: 6937.7
3. **Thonon-les-Bains** (France) - 37,027 hab. - 0.3 km - Score: 3680.3
4. **Annemasse** (France) - 37,918 hab. - 27.3 km - Score: 1709.0
5. **Renens VD** (Suisse) - 21,408 hab. - 20.2 km - Score: 1270.7
6. **Nyon** (France) - 19,738 hab. - 18.4 km - Score: 1243.1
7. **Morges** (France) - 15,228 hab. - 15.5 km - Score: 1047.9
8. **Pully** (Suisse) - 17,624 hab. - 20.8 km - Score: 1024.8
9. **Vernier** (France) - 34,477 hab. - 35.2 km - Score: 1005.9
10. **Montreux** (Suisse) - 26,208 hab. - 33.9 km - Score: 833.2
11. **Ecublens VD** (Suisse) - 13,214 hab. - 18.4 km - Score: 832.2
12. **Vevey** (Suisse) - 19,220 hab. - 29.5 km - Score: 781.2
13. **Gland** (France) - 11,947 hab. - 17.4 km - Score: 776.4
14. **Évian-les-Bains** (Suisse) - 9,214 hab. - 9.1 km - Score: 752.7
15. **Carouge** (France) - 20,910 hab. - 33.3 km - Score: 690.0

### Statistiques

- **Villes françaises**: 8
- **Villes suisses**: 7
- **Distance moyenne**: 23.9 km
- **Population moyenne**: 38,484 habitants

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
const SEARCH_RADIUS_KM = 50 // Modifier cette valeur
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
await saveToFile(cities, 15) // Modifier le nombre ici (actuellement 15)
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

Le score est calculé selon cette formule:

```
Score = (population / 1000) × (1 - distance / maxDistance) × 100

Où:
- population: nombre d'habitants
- distance: distance en km depuis Thonon-les-Bains
- maxDistance: distance maximale trouvée (normalisation)
```

Cette formule favorise:
- Les grandes villes (population élevée)
- Les villes proches (distance faible)

### Exemples

| Ville | Population | Distance | Score |
|-------|-----------|----------|-------|
| Lausanne | 133,521 | 20.5 km | 7844.7 |
| Genève | 191,557 | 31.7 km | 6937.7 |
| Évian | 9,214 | 9.1 km | 752.7 |

Lausanne a un score élevé car elle est grande et relativement proche.
Genève a un score élevé malgré la distance car elle est très peuplée.
Évian a un bon score grâce à sa proximité malgré sa taille modeste.
