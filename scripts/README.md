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
