# Guide : Extraction des avis Google pour Maeva Cinquin

Ce guide explique comment extraire et utiliser les avis Google sur le site de Maeva.

## 📊 Résumé des avis extraits

**Statistiques actuelles :**
- ✅ **19 avis uniques** extraits (38 avant nettoyage)
- ⭐ **Note moyenne : 4.58/5**
- 🌟 **89.5% d'avis 5 étoiles** (17 sur 19)
- 📅 Avis triés du plus récent au plus ancien

**Distribution des notes :**
- 5 étoiles : 17 avis (89.5%)
- 4 étoiles : 0 avis (0%)
- 3 étoiles : 0 avis (0%)
- 2 étoiles : 0 avis (0%)
- 1 étoile : 2 avis (10.5%)

## 🚀 Utilisation rapide

### Étape 1 : Extraire les avis

```bash
# Lancer le scraping (cherche automatiquement "cinquin maeva" sur Google Maps)
pnpm scrape:reviews
```

Le navigateur Chrome s'ouvrira automatiquement et :
1. Ira sur Google Maps
2. Acceptera automatiquement les cookies
3. Cherchera "cinquin maeva"
4. Scrollera pour charger tous les avis
5. Extraira les données

### Étape 2 : Nettoyer les données

```bash
# Supprimer les doublons et calculer les vraies statistiques
pnpm clean:reviews
```

Cette commande va :
- Supprimer les doublons (basé sur auteur + texte)
- Nettoyer les noms d'auteurs (enlever "Photo de ")
- Calculer la note moyenne réelle
- Trier les avis par date (plus récent en premier)
- Afficher les statistiques détaillées

### Résultat

Les avis sont sauvegardés dans `reviews-data/google-reviews.json` :

```json
{
  "businessName": "Maquilleuse professionnelle freelance - Makeup.Artist.Dream",
  "averageRating": 4.58,
  "totalReviews": 19,
  "extractedAt": "2025-10-21T22:35:23.623Z",
  "reviews": [
    {
      "author": "Laure Périnel",
      "rating": 5,
      "date": "il y a 9 mois",
      "text": "Super moment de complicité avec ma fille..."
    }
  ]
}
```

## 📝 Scripts disponibles

### 1. `scrape:reviews` (Recommandé)
- **Commande :** `pnpm scrape:reviews`
- **Fichier :** `scripts/scrape-google-reviews-simple.ts`
- **Fonction :** Extrait tous les avis via recherche Google Maps
- **Avantages :** Simple, rapide, gère automatiquement les cookies

### 2. `clean:reviews`
- **Commande :** `pnpm clean:reviews`
- **Fichier :** `scripts/clean-reviews.ts`
- **Fonction :** Nettoie les doublons et calcule les stats
- **À lancer :** Après chaque scraping

### 3. `fetch:reviews-api` (Alternative officielle)
- **Commande :** `pnpm fetch:reviews-api`
- **Fichier :** `scripts/fetch-google-reviews-api.ts`
- **Fonction :** Utilise Google Places API (officiel)
- **Limitation :** Max 5 avis avec l'API gratuite
- **Prérequis :** API Key Google Places

## 🎨 Afficher les avis sur le site web

### Option 1 : Import direct du JSON

```tsx
// src/components/reviews/GoogleReviews.tsx
import reviewsData from '@/reviews-data/google-reviews.json';

export function GoogleReviews() {
  return (
    <section className="reviews-section">
      <div className="container">
        <h2>Ce que disent nos clients</h2>

        <div className="rating-summary">
          <div className="rating">
            <span className="score">{reviewsData.averageRating}</span>
            <span className="stars">{'⭐'.repeat(Math.round(reviewsData.averageRating))}</span>
          </div>
          <p>{reviewsData.totalReviews} avis Google</p>
        </div>

        <div className="reviews-grid">
          {reviewsData.reviews.slice(0, 6).map((review, index) => (
            <div key={index} className="review-card">
              <div className="review-header">
                <h3>{review.author}</h3>
                <div className="rating">
                  {'⭐'.repeat(review.rating)}
                </div>
                <span className="date">{review.date}</span>
              </div>
              <p className="review-text">{review.text}</p>
            </div>
          ))}
        </div>

        <a
          href="https://www.google.com/maps/search/cinquin+maeva"
          target="_blank"
          rel="noopener noreferrer"
          className="view-all-link"
        >
          Voir tous les avis sur Google
        </a>
      </div>
    </section>
  );
}
```

### Option 2 : Stocker dans Payload CMS

Pour plus de flexibilité, vous pouvez créer une collection `Reviews` dans Payload CMS :

```typescript
// src/collections/Reviews.ts
import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'author',
  },
  fields: [
    {
      name: 'author',
      type: 'text',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      required: true,
    },
    {
      name: 'date',
      type: 'text',
      required: true,
    },
    {
      name: 'text',
      type: 'textarea',
      required: true,
    },
    {
      name: 'source',
      type: 'select',
      options: ['google', 'facebook', 'manual'],
      defaultValue: 'google',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Afficher cet avis sur la page d\'accueil',
      },
    },
  ],
}
```

Puis créer un script d'import :

```typescript
// scripts/import-reviews-to-payload.ts
import { getPayload } from 'payload'
import config from '@payload-config'
import reviewsData from '../reviews-data/google-reviews.json'

async function importReviews() {
  const payload = await getPayload({ config })

  for (const review of reviewsData.reviews) {
    await payload.create({
      collection: 'reviews',
      data: {
        author: review.author,
        rating: review.rating,
        date: review.date,
        text: review.text,
        source: 'google',
        featured: review.rating === 5, // Mettre en avant les 5 étoiles
      },
    })
  }

  console.log(`✅ ${reviewsData.reviews.length} avis importés dans Payload CMS`)
}

importReviews()
```

## 🔄 Mise à jour des avis

Pour garder les avis à jour, relancez le scraping régulièrement :

```bash
# Workflow complet
pnpm scrape:reviews  # Extraire les nouveaux avis
pnpm clean:reviews   # Nettoyer et calculer les stats
```

**Fréquence recommandée :** 1 fois par mois

## 📈 SEO et Rich Snippets

Pour améliorer le SEO avec les avis, ajoutez des données structurées JSON-LD :

```tsx
// src/app/(frontend)/layout.tsx ou page.tsx
import reviewsData from '@/reviews-data/google-reviews.json'

export default function Layout() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Makeup.Artist.Dream - Maeva Cinquin",
    "image": "https://votre-site.com/logo.png",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": reviewsData.averageRating,
      "reviewCount": reviewsData.totalReviews,
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviewsData.reviews.slice(0, 5).map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5"
      },
      "reviewBody": review.text,
      "datePublished": review.date
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Votre contenu */}
    </>
  )
}
```

## ⚠️ Notes importantes

### Légalité
- ✅ Le scraping pour usage personnel/éducatif est généralement toléré
- ⚠️ Pour production, Google Places API est recommandée (mais limitée à 5 avis)
- ℹ️ Les avis extraits sont publics et visibles par tous

### Sécurité
- ✅ Le fichier `google-credentials.json` est dans `.gitignore`
- ❌ Ne commitez JAMAIS vos clés API
- ℹ️ Les service accounts ne fonctionnent PAS pour Places API (besoin d'API Key)

### Maintenance
- 🔄 Google peut changer son interface → le script peut casser
- 🛠️ Mettre à jour les sélecteurs si nécessaire
- 📊 Vérifier régulièrement que les avis sont bien extraits

## 🎯 Exemples d'utilisation

### Page d'accueil - Section témoignages

```tsx
import reviewsData from '@/reviews-data/google-reviews.json'

export function TestimonialsSection() {
  const featuredReviews = reviewsData.reviews
    .filter(r => r.rating === 5)
    .slice(0, 3)

  return (
    <section>
      <h2>Ils nous font confiance</h2>
      <div className="grid">
        {featuredReviews.map((review, i) => (
          <blockquote key={i}>
            <p>"{review.text}"</p>
            <footer>
              <cite>{review.author}</cite>
              <span>{review.rating}⭐</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  )
}
```

### Page dédiée aux avis

```tsx
import reviewsData from '@/reviews-data/google-reviews.json'

export default function ReviewsPage() {
  return (
    <main>
      <h1>Avis clients</h1>

      <div className="stats">
        <div className="stat">
          <span className="number">{reviewsData.averageRating}</span>
          <span className="label">Note moyenne</span>
        </div>
        <div className="stat">
          <span className="number">{reviewsData.totalReviews}</span>
          <span className="label">Avis vérifiés</span>
        </div>
        <div className="stat">
          <span className="number">89.5%</span>
          <span className="label">5 étoiles</span>
        </div>
      </div>

      <div className="all-reviews">
        {reviewsData.reviews.map((review, index) => (
          <article key={index} className="review">
            <header>
              <h3>{review.author}</h3>
              <div>
                {'⭐'.repeat(review.rating)}
                <time>{review.date}</time>
              </div>
            </header>
            <p>{review.text}</p>
          </article>
        ))}
      </div>
    </main>
  )
}
```

## 🆘 Dépannage

### Le script ne trouve pas les avis
- Vérifier que l'URL Google Maps est correcte
- Attendre plus longtemps (augmenter les timeouts)
- Vérifier les sélecteurs CSS (Google peut avoir changé l'interface)

### La popup de cookies ne se ferme pas
- Le script gère automatiquement la popup
- Si ça ne fonctionne pas, accepter manuellement lors du premier lancement

### Trop de doublons
- Lancer `pnpm clean:reviews` après chaque scraping
- Vérifier que la logique de détection des doublons fonctionne

## 📚 Ressources

- [Documentation Playwright](https://playwright.dev/)
- [Google Places API](https://developers.google.com/maps/documentation/places/web-service)
- [Schema.org Reviews](https://schema.org/Review)
- [Rich Snippets Testing Tool](https://search.google.com/test/rich-results)

---

**Créé le :** 2025-10-22
**Dernière mise à jour :** 2025-10-22
**Avis extraits :** 19 avis (note moyenne 4.58/5)
