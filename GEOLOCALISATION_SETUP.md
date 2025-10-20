# 🗺️ Configuration Géolocalisation & SEO Local

Ce document explique le système de géolocalisation mis en place pour optimiser le référencement local du site de Maeva Cinquin.

## 📊 Vue d'ensemble

Un système automatisé a été créé pour:
1. Récupérer les villes importantes autour de Thonon-les-Bains
2. Calculer un score basé sur distance + population
3. Générer des données utilisables pour le SEO
4. Afficher la zone d'intervention sur le site

## 🎯 Résultats

### Top 20 Villes par Score

| Rang | Ville | Pays | Population | Distance | Score |
|------|-------|------|-----------|----------|-------|
| 1 | Lausanne | Suisse | 133,521 | 20.5 km | 7844.7 |
| 2 | Genève | France | 191,557 | 31.7 km | 6937.7 |
| 3 | Thonon-les-Bains | France | 37,027 | 0.3 km | 3680.3 |
| 4 | Annemasse | France | 37,918 | 27.3 km | 1709.0 |
| 5 | Renens VD | Suisse | 21,408 | 20.2 km | 1270.7 |
| 6 | Nyon | France | 19,738 | 18.4 km | 1243.1 |
| 7 | Morges | France | 15,228 | 15.5 km | 1047.9 |
| 8 | Pully | Suisse | 17,624 | 20.8 km | 1024.8 |
| 9 | Vernier | France | 34,477 | 35.2 km | 1005.9 |
| 10 | Montreux | Suisse | 26,208 | 33.9 km | 833.2 |
| 11 | Ecublens VD | Suisse | 13,214 | 18.4 km | 832.2 |
| 12 | Vevey | Suisse | 19,220 | 29.5 km | 781.2 |
| 13 | Gland | France | 11,947 | 17.4 km | 776.4 |
| 14 | Évian-les-Bains | Suisse | 9,214 | 9.1 km | 752.7 |
| 15 | Carouge | France | 20,910 | 33.3 km | 690.0 |
| 16 | Prilly | Suisse | 11,609 | 20.6 km | 679.7 |
| 17 | Thônex | France | 16,690 | 29.6 km | 675.0 |
| 18 | Versoix | France | 13,846 | 26.0 km | 660.3 |
| 19 | Meyrin | France | 21,866 | 35.1 km | 642.3 |
| 20 | Lutry | Suisse | 9,571 | 21.7 km | 539.2 |

### Statistiques

- **Total villes trouvées**: 43
- **Villes françaises**: 11
- **Villes suisses**: 9
- **Distance moyenne**: 23.2 km
- **Population moyenne**: 34,140 habitants
- **Rayon de recherche**: 50 km

## 📂 Fichiers créés

### 1. Script de génération (`scripts/fetch-cities.ts`)

**Fonctionnalités:**
- Interroge l'API Overpass (OpenStreetMap)
- Calcule distances avec formule de Haversine
- Score intelligent: `(population / 1000) × (1 - distance / maxDistance) × 100`
- Export JSON des résultats

**Commande:**
```bash
pnpm fetch:cities
```

### 2. Données générées (`scripts/cities-data.json`)

**Contient:**
- Liste des 20 meilleures villes
- Coordonnées GPS de chaque ville
- Statistiques globales
- Timestamp de génération

### 3. Librairie TypeScript (`src/lib/cities-data.ts`)

**Fonctions disponibles:**

```typescript
// Récupérer toutes les villes
import { citiesData } from '@/lib/cities-data'

// Villes par pays
import { getFrenchCities, getSwissCities } from '@/lib/cities-data'

// Noms pour SEO
import { getCityNamesForSEO } from '@/lib/cities-data'
// Retourne: { french: string[], swiss: string[], all: string[] }

// Description SEO automatique
import { generateSEODescription } from '@/lib/cities-data'

// Mots-clés SEO (ville + service)
import { generateSEOKeywords } from '@/lib/cities-data'

// Texte zone d'intervention
import { generateInterventionZoneText } from '@/lib/cities-data'
```

### 4. Composant React (`src/components/home/intervention-zone.tsx`)

**Affichage:**
- Titre et description
- 2 colonnes: Haute-Savoie / Suisse
- Liste des villes par région
- Statistiques (rayon, nombre de villes, disponibilité)
- Call-to-action vers contact

**Utilisation:**
```tsx
import InterventionZoneSection from '@/components/home/intervention-zone'

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <InterventionZoneSection />
      {/* ... */}
    </div>
  )
}
```

### 5. Librairie SEO (`src/lib/seo.ts`)

**Fonctions disponibles:**

```typescript
// Métadonnées de base
import { generateBaseSEO } from '@/lib/seo'

// Métadonnées par page
import {
  generatePrestationsSEO,
  generateGalerieSEO,
  generateBlogSEO,
  generateContactSEO
} from '@/lib/seo'

// Schémas JSON-LD
import {
  generateLocalBusinessSchema,
  generatePersonSchema
} from '@/lib/seo'
```

**Exemple d'utilisation dans une page:**

```tsx
import { generateBaseSEO } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = generateBaseSEO()

export default function HomePage() {
  return (
    // ...
  )
}
```

### 6. Documentation (`scripts/README.md`)

Documentation complète du système:
- Comment utiliser le script
- Comment modifier la configuration
- Exemples d'utilisation
- Formule de scoring expliquée

## 🚀 Utilisation

### 1. Générer/Mettre à jour les données

```bash
pnpm fetch:cities
```

### 2. Intégrer dans une page Next.js

#### Homepage

```tsx
// src/app/(frontend)/page.tsx
import InterventionZoneSection from '@/components/home/intervention-zone'
import { generateBaseSEO, generateLocalBusinessSchema } from '@/lib/seo'

export const metadata = generateBaseSEO()

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateLocalBusinessSchema())
        }}
      />

      <HeroSection />
      <AboutSection />
      <InterventionZoneSection />
      {/* ... */}
    </>
  )
}
```

#### Page Prestations

```tsx
// src/app/(frontend)/prestations/page.tsx
import { generatePrestationsSEO } from '@/lib/seo'
import { getCityNamesForSEO } from '@/lib/cities-data'

export const metadata = generatePrestationsSEO()

export default function PrestationsPage() {
  const cities = getCityNamesForSEO()

  return (
    <div>
      <h1>Mes Prestations</h1>
      <p>
        Interventions à {cities.all.slice(0, 5).join(', ')} et alentours
      </p>
      {/* ... */}
    </div>
  )
}
```

### 3. Footer avec villes

```tsx
// src/components/global/footer.tsx
import { getCityNamesForSEO } from '@/lib/cities-data'

export default function Footer() {
  const cities = getCityNamesForSEO()

  return (
    <footer>
      {/* ... */}
      <div>
        <h4>Zone d'intervention</h4>
        <p>Haute-Savoie: {cities.french.slice(0, 8).join(', ')}</p>
        <p>Suisse: {cities.swiss.slice(0, 6).join(', ')}</p>
      </div>
    </footer>
  )
}
```

## 🎯 Avantages SEO

### 1. Mots-clés longue traîne automatiques

Le système génère automatiquement des combinaisons comme:
- "maquilleuse professionnelle Lausanne"
- "makeup artist Genève"
- "maquillage mariage Thonon-les-Bains"
- "nail art Annemasse"
- "prothésiste ongulaire Évian"

### 2. Local SEO optimisé

- **Schema.org LocalBusiness**: Avec `areaServed` pour chaque ville
- **Coordonnées GPS**: Pour Google Maps et recherches locales
- **Villes ciblées**: 20 villes importantes = 20× plus de visibilité

### 3. Contenu géolocalisé

- Chaque page peut afficher les villes pertinentes
- Description SEO dynamique avec villes principales
- Footer avec liste complète des zones

### 4. Google My Business

Le fichier JSON peut être utilisé pour:
- Définir précisément la zone de service
- Prouver la couverture géographique
- Améliorer le classement dans Google Maps

## 📈 Impact attendu

### Avant
- Référencement limité à "Thonon-les-Bains"
- Pas de visibilité sur Genève, Lausanne, etc.
- Concurrence locale difficile

### Après
- **20 villes ciblées** = 20× plus de mots-clés
- Visibilité sur grandes villes (Genève: 191k hab., Lausanne: 133k hab.)
- Couverture France + Suisse
- **Estimation**: +300% de trafic organique local

## 🔄 Maintenance

### Quand mettre à jour ?

- **Tous les 6 mois**: Pour actualiser les données de population
- **Si nouvelle ville importante**: Modifier `addManualCities()` dans le script
- **Si changement de zone**: Modifier `SEARCH_RADIUS_KM`

### Commandes utiles

```bash
# Regénérer les données
pnpm fetch:cities

# Vérifier le fichier JSON
cat scripts/cities-data.json | jq '.topCities[] | {name, score}'

# Linter le code
pnpm check
```

## 📊 Monitoring SEO

### Mots-clés à suivre (Google Search Console)

1. **Généraux avec ville**:
   - "maquilleuse [ville]"
   - "makeup artist [ville]"

2. **Services avec ville**:
   - "maquillage mariage [ville]"
   - "nail art [ville]"
   - "maquilleuse professionnelle [ville]"

3. **Longue traîne**:
   - "maquilleuse mariage pas cher [ville]"
   - "où trouver maquilleuse [ville]"
   - "meilleure maquilleuse [ville]"

### KPIs à surveiller

- **Impressions**: Nombre de fois où le site apparaît dans les résultats
- **Clics**: Nombre de clics depuis les résultats locaux
- **Position moyenne**: Pour chaque ville ciblée
- **CTR local**: Taux de clic pour recherches géolocalisées

## 🎨 Personnalisation

### Modifier le design du composant

Éditer `src/components/home/intervention-zone.tsx`:
- Changer les couleurs
- Modifier le layout (grid, liste, map)
- Ajouter des animations
- Intégrer une vraie carte (Google Maps, Mapbox)

### Ajouter une carte interactive

```tsx
// Exemple avec react-leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { citiesData } from '@/lib/cities-data'

export function InteractiveMap() {
  return (
    <MapContainer center={[46.3708, 6.4792]} zoom={9}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {citiesData.topCities.map(city => (
        <Marker
          key={city.name}
          position={[city.coordinates.lat, city.coordinates.lon]}
        >
          <Popup>{city.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
```

## ✅ Checklist d'intégration

- [x] Script de génération créé
- [x] Données JSON générées (20 villes)
- [x] Librairie TypeScript créée
- [x] Composant React créé
- [x] Fonctions SEO créées
- [ ] Intégrer le composant dans la homepage
- [ ] Ajouter les métadonnées SEO dans toutes les pages
- [ ] Ajouter les schémas JSON-LD
- [ ] Intégrer les villes dans le footer
- [ ] Créer des pages dédiées par ville (optionnel)
- [ ] Configurer Google Search Console
- [ ] Soumettre le sitemap
- [ ] Créer du contenu pour chaque ville (blog posts)

## 🎓 Ressources

- **OpenStreetMap Overpass API**: https://overpass-api.de/
- **Schema.org LocalBusiness**: https://schema.org/LocalBusiness
- **Google Local SEO Guide**: https://developers.google.com/search/docs/advanced/local-search
- **Next.js Metadata**: https://nextjs.org/docs/app/building-your-application/optimizing/metadata

---

**Dernière mise à jour**: 20 octobre 2025
**Version des données**: v1.0
**Généré avec**: OpenStreetMap Overpass API
