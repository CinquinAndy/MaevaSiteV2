# Guide : Import des avis Google dans Payload CMS

Ce guide explique comment importer et gérer les avis Google dans Payload CMS.

## ✅ Résumé du système

Un système complet a été mis en place pour :
1. ✅ Extraire les avis Google (Playwright)
2. ✅ Nettoyer les données (suppression doublons)
3. ✅ Importer dans Payload CMS (collection `Testimonials`)
4. ✅ Afficher sur le site (fonctions utilitaires)

## 📊 Résultat de l'import

**Import réussi avec succès !**

- ✨ **19 avis créés** dans Payload CMS
- 🌟 **17 avis mis en avant** automatiquement (5 étoiles)
- 📝 **100% des avis publiés** automatiquement
- 📷 **Images de profil** stockées via URL externe

---

## 🔧 Collection Payload: `Testimonials`

### Champs disponibles

La collection `Testimonials` (`src/collections/Testimonials.ts`) contient :

| Champ | Type | Description |
|-------|------|-------------|
| `name` | text | Nom du client (ex: "Laure Périnel") |
| `content` | textarea | Texte du témoignage |
| `date` | text | Date de publication (ex: "il y a 9 mois") |
| `rating` | number | Note de 1 à 5 étoiles |
| `source` | select | Source (google, facebook, instagram, email, other) |
| `sourceUrl` | text | URL vers l'avis original |
| `avatarUrl` | text | URL externe de la photo de profil (Google) |
| `avatar` | upload | Photo uploadée manuellement (optionnel) |
| `featured` | checkbox | Afficher en priorité (auto-activé pour 5⭐) |
| `status` | select | draft / published (auto-publié pour Google) |
| `order` | number | Ordre d'affichage (0 = premier) |

### Spécificités avis Google

- **`source`** = "google"
- **`avatarUrl`** = URL Google (https://lh3.googleusercontent.com/...)
- **`featured`** = true pour les 5 étoiles
- **`status`** = "published" automatiquement
- **`order`** = index (0 à 18, ordre chronologique inverse)

---

## 🚀 Commandes disponibles

### 1. Import initial

```bash
# Importer les avis Google dans Payload (mode sync)
pnpm import:reviews-to-payload sync
```

**Mode sync** (recommandé) :
- Crée les nouveaux avis
- Ignore les avis déjà existants
- Pas de doublons

### 2. Autres modes d'import

```bash
# Mode create : créer uniquement les nouveaux (ignore les existants)
pnpm import:reviews-to-payload create

# Mode update : créer les nouveaux ET mettre à jour les existants
pnpm import:reviews-to-payload update
```

### 3. Workflow complet (scraping + import)

```bash
# Extraire, nettoyer et importer en une seule commande
pnpm sync:reviews
```

Cette commande exécute :
1. `scrape:reviews` - Extraction depuis Google Maps
2. `clean:reviews` - Nettoyage des doublons
3. `import:reviews-to-payload sync` - Import dans Payload

---

## 📖 Utiliser les avis sur le site

### Fonctions utilitaires créées

Fichier : `src/lib/payload/get-testimonials.ts`

```typescript
import {
  getPublishedTestimonials,
  getFeaturedTestimonials,
  getTestimonialsBySource,
  getTestimonialsByRating,
  getTestimonialsStats
} from '@/lib/payload/get-testimonials'

// Tous les avis publiés (max 100)
const testimonials = await getPublishedTestimonials()

// Avis mis en avant (par défaut 3)
const featured = await getFeaturedTestimonials(3)

// Avis Google uniquement
const googleReviews = await getTestimonialsBySource('google', 50)

// Avis 5 étoiles
const fiveStars = await getTestimonialsByRating(5, 20)

// Statistiques
const stats = await getTestimonialsStats()
// => {
//   total: 19,
//   google: 19,
//   featured: 17,
//   averageRating: 4.58,
//   ratingDistribution: { 1: 2, 5: 17 }
// }
```

### Exemple: Page avec avis

```tsx
// app/(frontend)/avis/page.tsx
import { getTestimonialsBySource } from '@/lib/payload/get-testimonials'
import Image from 'next/image'

export default async function AvisPage() {
  const reviews = await getTestimonialsBySource('google')

  return (
    <main className="container py-12">
      <h1>Avis clients</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <article key={review.id} className="bg-white rounded-lg shadow p-6">
            {/* Image de profil */}
            {review.avatarUrl && (
              <Image
                src={review.avatarUrl}
                alt={review.name}
                width={48}
                height={48}
                className="rounded-full"
              />
            )}

            {/* Nom et note */}
            <h2>{review.name}</h2>
            <div>{'⭐'.repeat(review.rating)}</div>
            <span>{review.date}</span>

            {/* Commentaire */}
            <p>{review.content}</p>

            {/* Lien source */}
            {review.sourceUrl && (
              <a href={review.sourceUrl} target="_blank" rel="noopener">
                Voir sur Google
              </a>
            )}
          </article>
        ))}
      </div>
    </main>
  )
}
```

### Exemple: Section témoignages (page d'accueil)

```tsx
// app/(frontend)/page.tsx
import { getFeaturedTestimonials } from '@/lib/payload/get-testimonials'

export default async function HomePage() {
  const testimonials = await getFeaturedTestimonials(3)

  return (
    <main>
      {/* ... autres sections ... */}

      <section className="testimonials py-16">
        <h2>Ce que disent nos clients</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <blockquote key={testimonial.id} className="bg-white p-6">
              <p>"{testimonial.content}"</p>
              <footer>
                <cite>{testimonial.name}</cite>
                <div>{'⭐'.repeat(testimonial.rating)}</div>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </main>
  )
}
```

---

## 🎨 Gestion dans Payload Admin

### Accéder aux avis

1. Lancer le serveur : `pnpm dev`
2. Aller sur `/admin`
3. Cliquer sur "Testimonials" dans le menu

### Fonctionnalités disponibles

**Filtres :**
- Source (Google, Facebook, etc.)
- Note (1-5 étoiles)
- Statut (Publié, Brouillon)
- Featured (Mis en avant)

**Actions possibles :**
- ✏️ Modifier un avis (contenu, note, featured)
- 🗑️ Supprimer un avis
- 📝 Créer un avis manuel
- 🔄 Changer le statut (publié/brouillon)
- ⭐ Mettre en avant/retirer de la mise en avant
- 📊 Réorganiser l'ordre d'affichage

### Ajouter un avis manuel

1. Cliquer sur "Create New" dans Testimonials
2. Remplir les champs :
   - Nom du client
   - Commentaire
   - Note (1-5)
   - Source (sélectionner "Autre" ou la source appropriée)
   - Uploader une photo (optionnel)
   - Cocher "Mis en avant" si souhaité
3. Publier

---

## 🔄 Mise à jour des avis

### Workflow mensuel recommandé

```bash
# Une fois par mois, mettre à jour les avis
pnpm sync:reviews
```

Cette commande va :
1. Extraire les nouveaux avis depuis Google Maps
2. Nettoyer les doublons
3. Importer uniquement les nouveaux avis dans Payload

**Les avis existants ne seront PAS modifiés** (mode sync).

### Si vous voulez forcer la mise à jour

```bash
# Mettre à jour les avis existants + créer les nouveaux
pnpm scrape:reviews
pnpm clean:reviews
pnpm import:reviews-to-payload update
```

---

## 📊 Statistiques et monitoring

### Vérifier les stats dans Payload

```bash
# Script pour afficher les statistiques
pnpm tsx scripts/show-testimonials-stats.ts
```

Créez ce script :

```typescript
// scripts/show-testimonials-stats.ts
import 'dotenv/config'
import { getTestimonialsStats } from '@/lib/payload/get-testimonials'

async function main() {
  const stats = await getTestimonialsStats()

  console.log('📊 STATISTIQUES DES TÉMOIGNAGES\n')
  console.log(`   Total: ${stats.total}`)
  console.log(`   Avis Google: ${stats.google}`)
  console.log(`   Mis en avant: ${stats.featured}`)
  console.log(`   Note moyenne: ${stats.averageRating}/5`)
  console.log('\n   Distribution:')
  for (let i = 5; i >= 1; i--) {
    const count = stats.ratingDistribution[i] || 0
    console.log(`   ${i}⭐: ${count}`)
  }
}

main()
```

---

## 🎯 Bonnes pratiques

### 1. Mise à jour régulière

- **Fréquence recommandée :** 1 fois par mois
- **Commande :** `pnpm sync:reviews`
- **Avantages :** Avis toujours à jour, nouveaux témoignages visibles

### 2. Modération

- Vérifier les nouveaux avis dans Payload Admin
- Désactiver les avis inappropriés (passer en "Brouillon")
- Répondre aux avis négatifs (ajouter une note dans Payload)

### 3. Mise en avant

- Mettre en avant les **meilleurs témoignages** (5⭐ + contenu détaillé)
- Varier les types de prestations (mariage, nail art, cours, etc.)
- Limiter à 3-5 avis mis en avant sur la page d'accueil

### 4. Performance

- Utiliser le cache Next.js pour les listes d'avis
- Limiter le nombre d'avis affichés par page (pagination)
- Optimiser les images (avatars)

---

## ⚠️ Notes importantes

### Images de profil

**Avis Google :**
- Les images sont stockées via `avatarUrl` (URL externe Google)
- Format : `https://lh3.googleusercontent.com/...`
- Elles peuvent expirer ou changer (rare mais possible)

**Alternative :** Télécharger et uploader les images dans Payload
- Utiliser le champ `avatar` (upload)
- Plus stable mais nécessite du stockage

### Doublons

Le système détecte les doublons basé sur :
- Nom de l'auteur
- Texte du commentaire

Si vous relancez l'import en mode `sync`, les avis existants ne seront PAS dupliqués.

### Ordre d'affichage

- Les avis sont triés par le champ `order`
- Plus le nombre est grand, plus l'avis est récent
- Vous pouvez modifier l'ordre manuellement dans Payload Admin

---

## 🛠️ Scripts créés

### Import et synchronisation

1. `scripts/scrape-google-reviews-simple.ts` - Extraction Google Maps
2. `scripts/clean-reviews.ts` - Nettoyage des données
3. `scripts/import-google-reviews-to-payload.ts` - **Import dans Payload**
4. `src/lib/payload/get-testimonials.ts` - **Fonctions utilitaires**

### Commandes package.json

```json
{
  "scrape:reviews": "Extraire les avis Google",
  "clean:reviews": "Nettoyer les doublons",
  "import:reviews-to-payload": "Importer dans Payload [mode]",
  "sync:reviews": "Workflow complet (extract + clean + import)"
}
```

---

## 📚 Documentation complète

- `GOOGLE_REVIEWS_GUIDE.md` - Guide extraction Google
- `AVIS_GOOGLE_RESUME.md` - Résumé de l'extraction
- `PAYLOAD_REVIEWS_GUIDE.md` - **Ce fichier** (import Payload)
- `EXAMPLE_REVIEWS_COMPONENT.tsx` - Composants React d'exemple

---

## ✅ Checklist de mise en production

- [ ] Extraire les avis Google (`pnpm scrape:reviews`)
- [ ] Nettoyer les données (`pnpm clean:reviews`)
- [ ] Importer dans Payload (`pnpm import:reviews-to-payload sync`)
- [ ] Vérifier dans `/admin` que les avis sont bien importés
- [ ] Créer une page `/avis` pour afficher tous les avis
- [ ] Ajouter une section témoignages sur la page d'accueil
- [ ] Ajouter les données structurées JSON-LD pour le SEO
- [ ] Tester l'affichage sur mobile
- [ ] Planifier la mise à jour mensuelle

---

**Créé le :** 22 octobre 2025
**Statut :** ✅ Opérationnel - 19 avis importés avec succès
**Note moyenne :** 4.58/5 (89.5% de 5 étoiles)
