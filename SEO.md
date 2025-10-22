# Stratégie SEO - Site Maeva Cinquin

## Vue d'ensemble

Ce document décrit la stratégie SEO complète mise en place pour le site de Maeva Cinquin, maquilleuse professionnelle et prothésiste ongulaire basée en Haute-Savoie.

## Structure des fichiers SEO

### 📁 `/src/lib/seo/`

- **`constants.ts`** : Contient toutes les constantes SEO (informations du site, mots-clés, metadata par page)
- **`metadata.ts`** : Fonctions helpers pour générer les metadata Next.js et JSON-LD
- **`index.ts`** : Export centralisé de toutes les fonctions SEO

## Stratégie par page

### 🏠 Page d'accueil (`/`)

**Titre** : "Maquilleuse professionnelle | Nail Art | Maeva Cinquin"

**Description** : Maquilleuse professionnelle diplômée Make Up For Ever Academy et prothésiste ongulaire en Haute-Savoie. Mariages, événements, maquillage artistique, nail art. Interventions à Thonon, Annecy, Genève, Lausanne.

**Mots-clés principaux** :
- Maquilleuse professionnelle
- Makeup artist
- Prothésiste ongulaire
- Nail art
- Maquillage mariage
- Haute-Savoie, Thonon-les-Bains, Genève, Annecy, Lausanne

**JSON-LD** : Schema.org LocalBusiness avec informations complètes (coordonnées, zones d'intervention, horaires)

---

### 📝 Page Blog (`/blog`)

**Titre** : "Mes conseils - Maquilleuse professionnelle | Nail Art | Maeva Cinquin"

**Description** : Conseils maquillage, astuces nail art, actualités beauté. Découvrez mon expertise en maquillage professionnel et nail art à travers mes articles.

**Mots-clés** : Conseils maquillage, tutoriels makeup, blog beauté, astuces nail art

---

### 📰 Article de blog (`/blog/[slug]`)

**Metadata dynamiques** :
- Titre : `seo_title` du CMS ou `{titre article} - Blog Maeva Cinquin`
- Description : `seo_description` du CMS ou `excerpt` de l'article
- Image : `featuredImage` de l'article
- Date de publication : `publishedDate`

**JSON-LD** : Schema.org BlogPosting avec toutes les propriétés structurées

**Open Graph & Twitter Cards** : Automatiquement générés avec image, titre, description

---

### 🎨 Page Galerie (`/galerie`)

**Titre** : "Mes réalisations - Maquilleuse professionnelle | Nail Art | Maeva Cinquin"

**Description** : Découvrez mes réalisations en maquillage et nail art : mariages, événements, maquillage artistique, body painting, manucure. Portfolio professionnel en Haute-Savoie.

**Mots-clés** : Portfolio maquillage, réalisations makeup, book maquilleuse, photos mariage

---

### 🖼️ Galerie individuelle (`/galerie/[slug]`)

**Metadata dynamiques** :
- Titre : `seo_title` du CMS ou `{titre galerie} - Galerie Maeva Cinquin`
- Description : `seo_description` du CMS ou `description` de la galerie
- Image : `coverImage` de la galerie
- Date de publication : `publishedDate`

**JSON-LD** : Schema.org ImageGalery avec toutes les images de la collection

**Open Graph & Twitter Cards** : Automatiquement générés avec image de couverture

---

### 💼 Page Prestations (`/prestations`)

**Titre** : "Prestations - Maquilleuse professionnelle - Prothésiste ongulaire"

**Description** : Prestations maquillage professionnel et nail art : mariages, événements, maquillage artistique, manucure, pédicure. Interventions en Haute-Savoie et Suisse.

**Mots-clés** : Tarifs maquillage, prestations makeup, services nail art, devis maquillage mariage

---

### 📋 Prestation individuelle (`/prestations/[slug]`)

**Metadata dynamiques** :
- Titre : `seo_title` du CMS ou `{titre service} - Maeva Cinquin`
- Description : `seo_description` du CMS ou `shortDescription` du service
- Image : `featuredImage` du service

**Open Graph & Twitter Cards** : Automatiquement générés

---

### 📞 Page Contact (`/contact`)

**Titre** : "Contact - Maquilleuse professionnelle Haute-Savoie | Maeva Cinquin"

**Description** : Contactez-moi pour vos projets maquillage et nail art. Devis gratuit. Interventions à Thonon, Annecy, Genève, Lausanne. Tél: +33 6 16 62 51 37

**Mots-clés** : Contact maquilleuse, devis maquillage, réservation makeup, contact Thonon

---

### ⚖️ Mentions légales (`/mentions-legales`)

**Titre** : "Mentions légales - Maeva Cinquin Maquilleuse Professionnelle"

**Description** : Mentions légales du site de Maeva Cinquin, maquilleuse professionnelle et prothésiste ongulaire en Haute-Savoie.

**Indexation** : `noIndex: true` - Cette page ne doit pas être indexée par les moteurs de recherche

---

## Fonctionnalités SEO implémentées

### ✅ Metadata Next.js 15

Toutes les pages utilisent l'API `generateMetadata` de Next.js 15 pour :
- Titre et description optimisés
- Mots-clés ciblés
- Canonical URLs
- Open Graph tags complets
- Twitter Cards
- Robots directives

### ✅ JSON-LD (Schema.org)

Structured data pour améliorer l'affichage dans les résultats de recherche :

**Page d'accueil** :
- `LocalBusiness` avec coordonnées complètes
- Zones d'intervention (Thonon, Annecy, Genève, Lausanne)
- Horaires d'ouverture
- Réseaux sociaux

**Articles de blog** :
- `BlogPosting` avec auteur, date, image
- Informations de publication et modification

**Galeries** :
- `ImageGalery` avec toutes les images
- Métadonnées complètes pour chaque collection

### ✅ Open Graph & Twitter Cards

Chaque page génère automatiquement :
- Open Graph tags pour Facebook, LinkedIn, etc.
- Twitter Cards pour un affichage optimisé
- Images OG de 1200x630px
- Type de contenu approprié (website, article, etc.)

### ✅ Sitemap.xml automatique

Le fichier `src/app/sitemap.ts` génère automatiquement le sitemap :
- **Pages statiques** : Accueil, Blog, Galerie, Prestations, Contact, Mentions légales
- **Pages dynamiques** : Tous les articles de blog, galeries et services publiés
- **Mise à jour automatique** : Le sitemap se régénère à chaque build
- **Accessible à** : `https://cinquin-maeva.com/sitemap.xml`
- **Lien dans le footer** : Visible pour les utilisateurs

**Fréquences de mise à jour** :
- Accueil : weekly (priorité 1.0)
- Blog/Galerie/Prestations : weekly (priorité 0.9)
- Articles/Galeries/Services : monthly (priorité 0.7-0.8)
- Contact : monthly (priorité 0.8)
- Mentions légales : yearly (priorité 0.3)

### ✅ Robots.txt automatique

Le fichier `src/app/robots.ts` génère automatiquement le robots.txt :
- **Autorisation** : Tous les bots autorisés sur `/`
- **Restriction** : Bloque `/admin/` et `/api/`
- **Sitemap** : Référence automatique vers `https://cinquin-maeva.com/sitemap.xml`
- **Accessible à** : `https://cinquin-maeva.com/robots.txt`

Le fichier `layout.tsx` autorise également l'indexation complète :
- `index: true` - Autoriser l'indexation
- `follow: true` - Suivre les liens
- `max-image-preview: large` - Afficher de grandes images dans les résultats
- `max-snippet: -1` - Autoriser les snippets complets

### ✅ SEO Local

Optimisation pour le référencement local en Haute-Savoie :
- Mention systématique des villes clés (Thonon, Annecy, Genève, Lausanne)
- Schema.org LocalBusiness avec coordonnées géographiques
- Zones d'intervention clairement définies
- Numéro de téléphone et email dans le JSON-LD

---

## Utilisation des fonctions SEO

### Import

```typescript
import {
  generateHomeMetadata,
  generateBlogListingMetadata,
  generateBlogPostMetadata,
  generateGaleryListingMetadata,
  generateGaleryItemMetadata,
  generateServicesListingMetadata,
  generateServiceItemMetadata,
  generateContactMetadata,
  generateMentionsLegalesMetadata,
  generateHomeJsonLd,
  generateBlogPostJsonLd,
  generateGaleryJsonLd,
} from '@/lib/seo'
```

### Exemple pour une page statique

```typescript
// src/app/(frontend)/blog/page.tsx
export const metadata = generateBlogListingMetadata()
```

### Exemple pour une page dynamique

```typescript
// src/app/(frontend)/blog/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  return generateBlogPostMetadata({
    title: post.title,
    excerpt: post.excerpt,
    featuredImage: post.featuredImage?.url,
    slug: post.slug,
    publishedDate: post.publishedDate,
    seoTitle: post.seo_title,
    seoDescription: post.seo_description,
  })
}
```

### Exemple avec JSON-LD

```typescript
export default async function HomePage() {
  const jsonLd = generateHomeJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Contenu de la page */}
    </>
  )
}
```

---

## Sitemap et Robots.txt

### 📄 Sitemap.xml

Le sitemap est généré automatiquement par Next.js via le fichier `src/app/sitemap.ts`.

**Fichier** : `src/app/sitemap.ts`

```typescript
import type { MetadataRoute } from 'next'
import config from '@payload-config'
import { getPayload } from 'payload'
import { SITE_CONFIG } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = SITE_CONFIG.url
  const payload = await getPayload({ config })

  // Récupérer toutes les données dynamiques depuis Payload CMS
  const [blogPosts, galleries, services] = await Promise.all([...])

  // Combiner pages statiques et dynamiques
  return [...staticPages, ...blogPages, ...galeryPages, ...servicePages]
}
```

**Accès** : `https://cinquin-maeva.com/sitemap.xml`

**Contenu** :
- Toutes les pages statiques (accueil, blog, galerie, prestations, contact, mentions légales)
- Tous les articles de blog publiés avec leur date de modification
- Toutes les galeries publiées avec leur date de modification
- Tous les services publiés avec leur date de modification

**Mise à jour** : Le sitemap est automatiquement régénéré à chaque build Next.js

### 🤖 Robots.txt

Le robots.txt est généré automatiquement par Next.js via le fichier `src/app/robots.ts`.

**Fichier** : `src/app/robots.ts`

```typescript
import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  }
}
```

**Accès** : `https://cinquin-maeva.com/robots.txt`

**Contenu** :
- Autorise tous les bots (`User-agent: *`)
- Autorise l'indexation de tout le site (`Allow: /`)
- Bloque l'admin Payload CMS (`Disallow: /admin/`)
- Bloque les routes API (`Disallow: /api/`)
- Référence le sitemap

### 🔗 Lien dans le footer

Le sitemap est également accessible via un lien dans le footer du site, à côté des mentions légales :
- Texte : "Plan du site"
- URL : `/sitemap.xml`

---

## Bonnes pratiques appliquées

### 📏 Longueur des titres et descriptions

- **Titres** : Maximum 60 caractères (pour éviter la troncature dans Google)
- **Descriptions** : Maximum 155 caractères (pour un affichage optimal)

### 🎯 Mots-clés

- Intégration naturelle dans les titres et descriptions
- Focus sur les mots-clés longue traîne ("maquilleuse mariage Thonon")
- Référencement local systématique (villes et régions)

### 🖼️ Images

- Toutes les images ont des attributs `alt` descriptifs
- Images Open Graph en 1200x630px
- Compression et optimisation des images via Next.js

### 🔗 Liens internes

- Breadcrumbs sur toutes les pages détail
- Liens de retour vers les pages parentes
- Structure hiérarchique claire

### 📱 Mobile-first

- Metadata identiques pour mobile et desktop
- Schema.org optimisé pour les résultats mobiles
- Fast loading avec Next.js 15

---

## Prochaines étapes recommandées

### 🚀 À faire avant la mise en production

1. **Créer une image Open Graph par défaut** (`/public/og-image.jpg`)
   - Dimensions : 1200x630px
   - Contenu : Logo + slogan + coordonnées
   - À utiliser pour toutes les pages sans image spécifique

2. **Google Search Console**
   - Ajouter le site à Google Search Console
   - Soumettre le sitemap (`https://cinquin-maeva.com/sitemap.xml`)
   - Vérifier l'indexation des pages
   - Surveiller les erreurs d'exploration
   - Analyser les performances de recherche

3. **Google Business Profile**
   - Créer/mettre à jour le profil Google Business
   - Ajouter photos professionnelles (réalisations, studio)
   - Configurer horaires d'ouverture
   - Lister tous les services
   - Encourager les avis clients
   - Ajouter les zones d'intervention (Thonon, Annecy, Genève, Lausanne)

4. **Vérifier le fonctionnement**
   - Tester `https://cinquin-maeva.com/sitemap.xml`
   - Tester `https://cinquin-maeva.com/robots.txt`
   - Valider les structured data avec [Google Rich Results Test](https://search.google.com/test/rich-results)
   - Vérifier les metadata avec [Meta Tags](https://metatags.io/)

### 📊 Suivi et analytics

1. **Google Analytics 4**
   - Déjà configuré avec Umami
   - Ajouter GA4 si besoin

2. **Mots-clés à suivre** :
   - "maquilleuse Thonon"
   - "maquillage mariage Haute-Savoie"
   - "nail art Annecy"
   - "makeup artist Genève"
   - "prothésiste ongulaire Lausanne"

3. **Objectifs de conversion** :
   - Formulaire de contact soumis
   - Clic sur numéro de téléphone
   - Clic sur email
   - Visite de la page prestations

---

## Support et maintenance

Pour modifier les metadata SEO :

1. **Constantes de base** : Modifier `src/lib/seo/constants.ts`
2. **Logique de génération** : Modifier `src/lib/seo/metadata.ts`
3. **Metadata CMS** : Utiliser les champs `seo_title` et `seo_description` dans Payload CMS

---

## Ressources utiles

- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org Documentation](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)

---

**Dernière mise à jour** : 2025-10-22
**Auteur** : Andy Cinquin
