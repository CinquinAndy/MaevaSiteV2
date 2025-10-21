# Prestations Data - Payload CMS Structure

This document contains all services data extracted from the old website, structured for the Payload CMS Services collection.

---

## Collection Structure Recommendation

```typescript
// Services Collection Schema
{
  slug: 'services',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'category', type: 'select', options: ['beaute', 'mariage', 'artistique', 'nail-art'], required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'shortDescription', type: 'textarea' }, // For cards
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'order', type: 'number', defaultValue: 0 },
    { name: 'location', type: 'select', options: ['deplacement', 'domicile', 'both'] },
    { name: 'pdfUrl', type: 'text' }, // Link to PDF pricing sheet
    { 
      name: 'services', 
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'price', type: 'text' }, // Text to allow "80 €" or "Sur devis"
        { name: 'priceDetails', type: 'textarea' }, // For additional pricing info
        { name: 'minAge', type: 'number' },
        { name: 'duration', type: 'text' }
      ]
    },
    { name: 'seoTitle', type: 'text' },
    { name: 'seoDescription', type: 'textarea' }
  ]
}
```

---

## Data to Import

### 1. MAQUILLAGES BEAUTÉ

**Catégorie:** `beaute`  
**Slug:** `maquillages-beaute`  
**Featured:** ⭐ Oui  
**Localisation:** Déplacement (chez le client)  
**Fiche tarifaire PDF:** [FICHE-TARIFS-BEAUTE-MAE.pdf](https://cinquin-maeva.com/uploads/2021/06/FICHE-TARIFS-BEAUTE-MAE.pdf)

#### Description Générale

Envie de vous refaire une beauté ? Ou bien d'être la reine de la soirée ? Demandez-moi un maquillage naturel ou bien sophistiqué et je concrétiserai vos envies, même les plus colorées et les plus complexes ! Il n'y a rien de mieux qu'un beau maquillage mettant en valeur votre beauté naturelle pour avoir confiance en soi.

#### Description Courte (pour cards)

Maquillage naturel ou sophistiqué pour sublimer votre beauté naturelle et vous donner confiance en vous.

---

#### Services Inclus

##### ✨ Maquillage Naturel

**Tarif:** 80 €

**Description:**  
Sublime votre beauté naturelle, mise en lumière du teint, effet naturel selon vos envies.

---

##### 💄 Maquillage Sophistiqué

**Tarif:** 100 €

**Description:**  
Un teint travaillé, des yeux sublimés, une bouche redessinée, même des faux cils suivant vos envies.

**Options:**

- Faux cils : +15 €

---

#### SEO

**Title:** Maquillage Beauté Professionnel - Thonon-les-Bains | Maeva Cinquin  
**Description:** Maquilleuse professionnelle à Thonon-les-Bains. Maquillage naturel ou sophistiqué pour toutes occasions. Déplacement en Haute-Savoie et Suisse.

---

#### JSON Data (for import)

```json
{
  "title": "Maquillages Beauté",
  "slug": "maquillages-beaute",
  "category": "beaute",
  "description": "Envie de vous refaire une beauté ? Ou bien d'être la reine de la soirée ? Demandez-moi un maquillage naturel ou bien sophistiqué et je concrétiserai vos envies, même les plus colorées et les plus complexes ! Il n'y a rien de mieux qu'un beau maquillage mettant en valeur votre beauté naturelle pour avoir confiance en soi.",
  "shortDescription": "Maquillage naturel ou sophistiqué pour sublimer votre beauté naturelle et vous donner confiance en vous.",
  "featured": true,
  "order": 1,
  "location": "deplacement",
  "pdfUrl": "https://cinquin-maeva.com/uploads/2021/06/FICHE-TARIFS-BEAUTE-MAE.pdf",
  "services": [
    {
      "name": "Maquillage Naturel",
      "description": "Sublime votre beauté naturelle, mise en lumière du teint, effet naturel selon vos envies.",
      "price": "80 €",
      "priceDetails": null
    },
    {
      "name": "Maquillage Sophistiqué",
      "description": "Un teint travaillé, des yeux sublimés, une bouche redessinée, même des faux cils suivant vos envies.",
      "price": "100 €",
      "priceDetails": "Option faux cils : +15 €"
    }
  ],
  "seoTitle": "Maquillage Beauté Professionnel - Thonon-les-Bains | Maeva Cinquin",
  "seoDescription": "Maquilleuse professionnelle à Thonon-les-Bains. Maquillage naturel ou sophistiqué pour toutes occasions. Déplacement en Haute-Savoie et Suisse."
}
```

---

### 2. MAQUILLAGES MARIAGE

**Catégorie:** `mariage`  
**Slug:** `maquillages-mariage`  
**Featured:** ⭐ Oui  
**Localisation:** Déplacement (chez le client)  
**Fiche tarifaire PDF:** [FICHE-TARIFS-MARIAGE-MAE.pdf](https://cinquin-maeva.com/uploads/2023/01/FICHE-TARIFS-MARIAGE-MAE.pdf)

#### Description Générale

Je vous accompagne le Jour J, l'un des plus beaux de votre vie. Pour cette journée particulière, je prends soin des amoureux (maquillages pour elle comme pour lui) mais aussi du cortège familial et des enfants lors de la soirée. Ainsi, tout le monde y trouve son bonheur et participe au mariage afin de créer des souvenirs magiques pour toute la famille.

#### Description Courte (pour cards)

Accompagnement complet pour votre mariage : mariée, marié, cortège et enfants. Essai + Jour J.

---

#### Services Inclus

##### 💍 Maquillage pour la Mariée

**Tarif:** 200 €

**Description:**  
Lors du premier rendez-vous, je crée le maquillage de vos rêves et me fie à vos envies pour un maquillage mariée parfaitement adapté à vos souhaits. Puis le jour J, j'interviens à l'endroit que vous souhaitez.

**Inclus:**

- Essai maquillage
- Maquillage jour J

**Options:**

- Faux cils : +15 €

---

##### 👰 Maquillage pour le Cortège

**Tarif:** 60 € / personne

**Description:**  
Je propose également mes services à votre entourage : témoins, sœur, maman. Les membres de votre cortège peuvent donc être maquillés par mes soins eux aussi.

---

##### 🤵 Maquillage pour le Marié

**Tarif:** 30 €

**Description:**  
Pour monsieur, j'effectue un teint imperceptible longue tenue.

---

##### 👶 Maquillage pour les Enfants

**Tarif:**

- 60 € pour 1 heure
- 100 € pour 2 heures

**Description:**  
Pendant la soirée, une métamorphose des enfants en super-héros, princesse, ou en animal… Afin d'animer le début de soirée.

**Âge minimum:** 3 ans

---

#### SEO

**Title:** Maquillage Mariage Professionnel - Haute-Savoie | Maeva Cinquin  
**Description:** Maquilleuse mariage en Haute-Savoie et Suisse. Essai + Jour J, maquillage mariée, cortège, marié et enfants. Déplacement à domicile.

---

#### JSON Data (for import)

```json
{
  "title": "Maquillages Mariage",
  "slug": "maquillages-mariage",
  "category": "mariage",
  "description": "Je vous accompagne le Jour J, l'un des plus beaux de votre vie. Pour cette journée particulière, je prends soin des amoureux (maquillages pour elle comme pour lui) mais aussi du cortège familial et des enfants lors de la soirée. Ainsi, tout le monde y trouve son bonheur et participe au mariage afin de créer des souvenirs magiques pour toute la famille.",
  "shortDescription": "Accompagnement complet pour votre mariage : mariée, marié, cortège et enfants. Essai + Jour J.",
  "featured": true,
  "order": 2,
  "location": "deplacement",
  "pdfUrl": "https://cinquin-maeva.com/uploads/2023/01/FICHE-TARIFS-MARIAGE-MAE.pdf",
  "services": [
    {
      "name": "Maquillage pour la Mariée",
      "description": "Lors du premier rendez-vous, je crée le maquillage de vos rêves et me fie à vos envies pour un maquillage mariée parfaitement adapté à vos souhaits. Puis le jour J, j'interviens à l'endroit que vous souhaitez.",
      "price": "200 €",
      "priceDetails": "Essai maquillage + jour J inclus\nOption faux cils : +15 €"
    },
    {
      "name": "Maquillage pour le Cortège",
      "description": "Je propose également mes services à votre entourage : témoins, sœur, maman. Les membres de votre cortège peuvent donc être maquillés par mes soins eux aussi.",
      "price": "60 € / personne",
      "priceDetails": null
    },
    {
      "name": "Maquillage pour le Marié",
      "description": "Pour monsieur, j'effectue un teint imperceptible longue tenue.",
      "price": "30 €",
      "priceDetails": null
    },
    {
      "name": "Maquillage pour les Enfants",
      "description": "Pendant la soirée, une métamorphose des enfants en super-héros, princesse, ou en animal… Afin d'animer le début de soirée.",
      "price": "60 € pour 1 heure",
      "priceDetails": "100 € pour 2 heures",
      "minAge": 3
    }
  ],
  "seoTitle": "Maquillage Mariage Professionnel - Haute-Savoie | Maeva Cinquin",
  "seoDescription": "Maquilleuse mariage en Haute-Savoie et Suisse. Essai + Jour J, maquillage mariée, cortège, marié et enfants. Déplacement à domicile."
}
```

---

### 3. MAQUILLAGES ARTISTIQUES

**Catégorie:** `artistique`  
**Slug:** `maquillages-artistiques`  
**Featured:** ⭐ Oui  
**Localisation:** Déplacement (chez le client)  
**Fiche tarifaire PDF:** [FICHE-TARIFS-ARTISTIQUE-MAE.pdf](https://cinquin-maeva.com/uploads/2021/06/FICHE-TARIFS-ARTISTIQUE-MAE.pdf)

#### Description Générale

Le bodypainting et le maquillage pour enfants font aussi partie de mes compétences et vous offrent une expérience du maquillage à une autre échelle. Que ce soit pour des animations ou pour un projet plus personnel, je me plie à vos demandes et effectue un devis selon vos idées. Le bodypainting est un moment unique et de partage que vous ne risquez pas d'oublier !

#### Description Courte (pour cards)

Body painting et maquillage artistique pour enfants. Animations, événements et projets personnels.

---

#### Services Inclus

##### 🎨 Maquillage pour les Enfants

**Tarif:** 60 € / heure

**Description:**  
Je viens chez vous ou sur le lieu de fête. Je maquille vos petits bouts de chou selon vos envies, avec une large palette de couleurs et surtout plein de paillettes. Un maquillage au gré de vos envies.

**Âge minimum:** 3 ans

---

##### 🎭 Body Painting

**Tarif:** Sur devis

**Description:**  
L'art du maquillage sur corps, une expérience unique.

**Note:** Tarif évalué en fonction du projet (complexité, durée, nombre de personnes, etc.)

---

#### SEO

**Title:** Maquillage Artistique et Body Painting - Haute-Savoie | Maeva Cinquin  
**Description:** Maquilleuse artistique : body painting, maquillage enfants, animations. Déplacement en Haute-Savoie et Suisse pour vos événements.

---

#### JSON Data (for import)

```json
{
  "title": "Maquillages Artistiques",
  "slug": "maquillages-artistiques",
  "category": "artistique",
  "description": "Le bodypainting et le maquillage pour enfants font aussi partie de mes compétences et vous offrent une expérience du maquillage à une autre échelle. Que ce soit pour des animations ou pour un projet plus personnel, je me plie à vos demandes et effectue un devis selon vos idées. Le bodypainting est un moment unique et de partage que vous ne risquez pas d'oublier !",
  "shortDescription": "Body painting et maquillage artistique pour enfants. Animations, événements et projets personnels.",
  "featured": true,
  "order": 3,
  "location": "deplacement",
  "pdfUrl": "https://cinquin-maeva.com/uploads/2021/06/FICHE-TARIFS-ARTISTIQUE-MAE.pdf",
  "services": [
    {
      "name": "Maquillage pour les Enfants",
      "description": "Je viens chez vous ou sur le lieu de fête. Je maquille vos petits bouts de chou selon vos envies, avec une large palette de couleurs et surtout plein de paillettes. Un maquillage au gré de vos envies.",
      "price": "60 € / heure",
      "priceDetails": null,
      "minAge": 3
    },
    {
      "name": "Body Painting",
      "description": "L'art du maquillage sur corps, une expérience unique.",
      "price": "Sur devis",
      "priceDetails": "Tarif évalué en fonction du projet"
    }
  ],
  "seoTitle": "Maquillage Artistique et Body Painting - Haute-Savoie | Maeva Cinquin",
  "seoDescription": "Maquilleuse artistique : body painting, maquillage enfants, animations. Déplacement en Haute-Savoie et Suisse pour vos événements."
}
```

---

### 4. PRESTATIONS DE MANUCURE / NAIL ART

**Catégorie:** `nail-art`  
**Slug:** `manucure-nail-art`  
**Featured:** ⭐ Oui  
**Localisation:** À domicile (chez Maeva) ⚠️  
**Fiche tarifaire PDF:** [FICHES-TARIFS-ONGLES-MAE.pdf](https://cinquin-maeva.com/uploads/2021/06/FICHES-TARIFS-ONGLES-MAE.pdf)

#### Description Générale

Qui a dit qu'on ne pouvait pas être belle jusqu'au bout des doigts (et des pieds !) ? Le Nail Art est aussi une forme de maquillage tout aussi originale et agréable à porter ! Mat, brillant, pailleté, avec strass… Je peux sans cesse vous proposer une multitude d'alternatives pour rendre vos ongles toujours plus travaillés.

Venez chez moi afin de vous faire chouchouter l'espace de quelques heures. Vous choisirez parmi un large choix de couleurs, une large gamme de nail art, décorations…

Gel ou semi-permanent, vous trouverez votre bonheur. Vous avez envie d'une superbe manucure pour une occasion ou simplement pour égayer votre quotidien, prenez rendez-vous.

#### Description Courte (pour cards)

Manucure gel et semi-permanent, nail art personnalisé. Large choix de couleurs et décorations.

---

#### Services Inclus

##### 💅 Manucure Gel

**Tarif:** Voir fiche tarifaire

**Description:**  
Pose de gel avec un large choix de couleurs et décorations. Mat, brillant, pailleté, avec strass…

**Note:** Tarifs détaillés disponibles dans la fiche PDF ou sur demande

---

##### ✨ Manucure Semi-Permanent

**Tarif:** Voir fiche tarifaire

**Description:**  
Vernis semi-permanent pour une tenue longue durée. Large gamme de couleurs et nail art.

**Note:** Tarifs détaillés disponibles dans la fiche PDF ou sur demande

---

##### 🎨 Nail Art Personnalisé

**Tarif:** Voir fiche tarifaire + supplément

**Description:**  
Créations personnalisées selon vos envies : motifs, dégradés, paillettes, strass, décorations complexes, etc.

**Note:** Supplément calculé selon la complexité du design

---

#### SEO

**Title:** Manucure et Nail Art - Thonon-les-Bains | Maeva Cinquin  
**Description:** Prothésiste ongulaire à Thonon-les-Bains. Manucure gel et semi-permanent, nail art personnalisé. Sur rendez-vous à domicile.

---

#### JSON Data (for import)

```json
{
  "title": "Manucure & Nail Art",
  "slug": "manucure-nail-art",
  "category": "nail-art",
  "description": "Qui a dit qu'on ne pouvait pas être belle jusqu'au bout des doigts (et des pieds !) ? Le Nail Art est aussi une forme de maquillage tout aussi originale et agréable à porter ! Mat, brillant, pailleté, avec strass… Je peux sans cesse vous proposer une multitude d'alternatives pour rendre vos ongles toujours plus travaillés.\n\nVenez chez moi afin de vous faire chouchouter l'espace de quelques heures. Vous choisirez parmi un large choix de couleurs, une large gamme de nail art, décorations…\n\nGel ou semi-permanent, vous trouverez votre bonheur. Vous avez envie d'une superbe manucure pour une occasion ou simplement pour égayer votre quotidien, prenez rendez-vous.",
  "shortDescription": "Manucure gel et semi-permanent, nail art personnalisé. Large choix de couleurs et décorations.",
  "featured": true,
  "order": 4,
  "location": "domicile",
  "pdfUrl": "https://cinquin-maeva.com/uploads/2021/06/FICHES-TARIFS-ONGLES-MAE.pdf",
  "services": [
    {
      "name": "Manucure Gel",
      "description": "Pose de gel avec un large choix de couleurs et décorations. Mat, brillant, pailleté, avec strass…",
      "price": "Voir fiche tarifaire",
      "priceDetails": "Tarifs détaillés disponibles sur demande"
    },
    {
      "name": "Manucure Semi-Permanent",
      "description": "Vernis semi-permanent pour une tenue longue durée. Large gamme de couleurs et nail art.",
      "price": "Voir fiche tarifaire",
      "priceDetails": "Tarifs détaillés disponibles sur demande"
    },
    {
      "name": "Nail Art Personnalisé",
      "description": "Créations personnalisées selon vos envies : motifs, dégradés, paillettes, strass, etc.",
      "price": "Voir fiche tarifaire",
      "priceDetails": "Supplément selon la complexité du design"
    }
  ],
  "seoTitle": "Manucure et Nail Art - Thonon-les-Bains | Maeva Cinquin",
  "seoDescription": "Prothésiste ongulaire à Thonon-les-Bains. Manucure gel et semi-permanent, nail art personnalisé. Sur rendez-vous à domicile."
}
```

---

## Additional Information

### Service Areas (Zones d'Intervention)

- **France:** Haute-Savoie
- **Suisse:** Genève, Lausanne et alentours
- **Villes principales:** Thonon-les-Bains, Annecy, Genève, Lausanne

### Contact Information

- **Email:** <maevacinquin1@gmail.com>
- **Phone:** +33 6 16 62 51 37
- **Address:** 15 avenue de la fontaine couverte, 74200 Thonon-les-Bains
- **Google Maps:** <https://g.page/cinquin-maeva?share>
- **Instagram:** @makeup.artist.dream
- **Facebook:** Cinquin-maeva-2360623587315010

### Important Notes

1. **Nail Art:** Prestations uniquement à domicile (chez Maeva)
2. **Autres services:** Déplacement possible en Haute-Savoie et Suisse
3. **Minimum d'âge enfants:** 3 ans
4. **PDF tarifaires:** À télécharger et héberger sur le nouveau site (ou lien externe)
5. **Devis personnalisés:** Body painting et projets spéciaux

---

## Images to Source

Based on the old website, these are the main images needed for each service:

1. **Maquillages Beauté:** Woman in black lace dress examining floral arrangement
2. **Maquillages Mariage:** Bride in white off-shoulder dress with bouquet and string lights
3. **Maquillages Artistiques:** Circus-themed group photo with 8 women in elegant outfits
4. **Manucure & Nail Art:** Close-up of manicured hand with nude and black nail art

---

## Implementation Steps

### 1. Create Services Collection in Payload

```bash
# Create file: src/collections/Services.ts
# Use the schema structure provided above
# Add SEO fields using the seo-fields helper
# Add lexical rich text for detailed descriptions if needed
```

### 2. Seed Data

```bash
# Option A: Manual entry via Payload admin
# Option B: Create a seed script in /scripts/
# Option C: Import via Payload API
```

### 3. Create Services Page

```bash
# Update: src/app/(frontend)/prestations/page.tsx
# Fetch all services grouped by category
# Display in grid/card layout with filtering
```

### 4. Create Individual Service Pages (Optional)

```bash
# Create: src/app/(frontend)/prestations/[slug]/page.tsx
# Fetch single service by slug
# Display detailed information with all sub-services
```

### 5. Add Service Selector to Contact Form

```bash
# Update: src/app/(frontend)/contact/page.tsx
# Add dropdown to select service type
# Update contact action to include service selection
```

---

## UI/UX Recommendations

### Services Grid Layout

- Display 4 cards (one per main category)
- Each card shows: image, title, short description, "En savoir plus" CTA
- Color-coded by category (optional)
- Hover effects with subtle animations

### Individual Service Page

- Hero section with main image and title
- Description section
- Services list with pricing table
- CTA: "Prendre rendez-vous" → Contact form
- PDF download button (if available)
- Gallery section (link to related galleries)

### Pricing Display

- Clear price table for each sub-service
- "Sur devis" for custom projects
- Highlight package deals (e.g., Mariée: essai + jour J)
- Optional pricing notes/details

---

## SEO Strategy

### Keywords per Category

- **Beauté:** maquilleuse professionnelle, maquillage naturel, maquillage sophistiqué, Thonon-les-Bains
- **Mariage:** maquillage mariage, maquilleuse mariage Haute-Savoie, makeup artist wedding
- **Artistique:** body painting, maquillage artistique, maquillage enfants, animation
- **Nail Art:** prothésiste ongulaire, manucure gel, nail art Thonon, vernis semi-permanent

### Meta Descriptions

- Include location (Haute-Savoie, Suisse)
- Mention key services
- Call to action (réservation, devis)
- Keep under 155 characters

---

## Future Enhancements

1. **Online Booking System:** Integration with calendar for appointments
2. **Service Packages:** Combine services (e.g., "Pack Mariée Complète")
3. **Reviews/Testimonials:** Display per service category
4. **Before/After Gallery:** Link to specific galleries per service
5. **FAQ Section:** Common questions per service type
6. **Gift Cards:** Vouchers for services
7. **Seasonal Offers:** Special pricing or packages

---

## Payload CMS Collection Code Example

```typescript
// src/collections/Services.ts
import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'order'],
  },
  access: {
    read: () => true, // Public
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Maquillages Beauté', value: 'beaute' },
        { label: 'Maquillages Mariage', value: 'mariage' },
        { label: 'Maquillages Artistiques', value: 'artistique' },
        { label: 'Manucure & Nail Art', value: 'nail-art' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      admin: {
        description: 'Short description for cards (max 160 characters)',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Display on homepage',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Display order (lower = first)',
      },
    },
    {
      name: 'location',
      type: 'select',
      options: [
        { label: 'Déplacement (chez le client)', value: 'deplacement' },
        { label: 'À domicile (chez Maeva)', value: 'domicile' },
        { label: 'Les deux', value: 'both' },
      ],
    },
    {
      name: 'pdfUrl',
      type: 'text',
      admin: {
        description: 'Link to PDF pricing sheet',
      },
    },
    {
      name: 'services',
      type: 'array',
      label: 'Sous-services',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'price',
          type: 'text',
          admin: {
            description: 'e.g., "80 €" or "Sur devis"',
          },
        },
        {
          name: 'priceDetails',
          type: 'textarea',
          admin: {
            description: 'Additional pricing information',
          },
        },
        {
          name: 'minAge',
          type: 'number',
          admin: {
            description: 'Minimum age required (for children services)',
          },
        },
        {
          name: 'duration',
          type: 'text',
          admin: {
            description: 'e.g., "1 heure", "2 heures"',
          },
        },
      ],
    },
    // SEO Fields (use your seo-fields helper)
    {
      name: 'seoTitle',
      type: 'text',
    },
    {
      name: 'seoDescription',
      type: 'textarea',
    },
  ],
}
```
