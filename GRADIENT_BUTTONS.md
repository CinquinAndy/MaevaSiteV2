# Boutons Gradient - Documentation

## Vue d'ensemble

Les boutons gradient sont des boutons stylés avec des effets de dégradé animés adaptés au thème beauté/maquillage du site. Ils utilisent des propriétés CSS personnalisées (`@property`) pour créer des transitions fluides entre les couleurs.

## Composant

Le composant est situé dans `src/components/ui/gradient-button.tsx`.

## Utilisation

### Import

```tsx
import { GradientButton } from '@/components/ui/gradient-button'
```

### Exemples de base

#### Bouton simple

```tsx
<GradientButton>Cliquez ici</GradientButton>
```

#### Bouton avec variante secondaire

```tsx
<GradientButton variant="secondary">Bouton secondaire</GradientButton>
```

#### Bouton avec lien (en utilisant asChild)

```tsx
import Link from 'next/link'

<GradientButton asChild>
  <Link href="/contact">Me contacter</Link>
</GradientButton>
```

#### Bouton avec icône

```tsx
import { IconMail } from '@tabler/icons-react'

<GradientButton>
  <IconMail className="w-5 h-5" />
  Envoyer un email
</GradientButton>
```

## Variantes disponibles

### `default` (par défaut)
- **Couleurs initiales :** Dégradé de noir (#000) vers rose mauve (#a8517a)
- **Couleurs au survol :** Transition vers des tons roses chauds (#c96287, #c66c64, #cc7d23)
- **Bordure :** Gradient rose avec angle à 20deg qui passe à 190deg au survol

### `secondary`
- **Couleurs initiales :** Dégradé de bordeaux foncé (#1a0a0f) vers rose (#a8517a)
- **Couleurs au survol :** Inversion vers tons roses clairs (#c96287, #d87ba3)
- **Bordure :** Gradient rose pâle avec angle à 200deg qui passe à 180deg au survol

## Personnalisation CSS

Les styles sont définis dans `src/app/(frontend)/global.css`. Vous pouvez créer de nouvelles variantes en ajoutant des classes CSS :

```css
.gradient-button-variant-name {
  --color-1: #hexcolor;
  --color-2: #hexcolor;
  --color-3: #hexcolor;
  --color-4: #hexcolor;
  --color-5: #hexcolor;
  --border-angle: 200deg;
  --border-color-1: hsla(...);
  --border-color-2: hsla(...);
}

.gradient-button-variant-name:hover {
  /* Modifier les propriétés au survol */
  --pos-x: 0%;
  --pos-y: 95%;
  --spread-x: 130%;
  --spread-y: 115%;
  /* ... autres propriétés */
}
```

Puis ajoutez la variante dans le composant TypeScript :

```tsx
variants: {
  variant: {
    default: '',
    secondary: 'gradient-button-secondary',
    votreVariante: 'gradient-button-variant-name',
  },
}
```

## Props

Le composant accepte toutes les props HTML standard d'un bouton, plus :

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `variant` | `'default' \| 'secondary'` | `'default'` | Style de dégradé à appliquer |
| `asChild` | `boolean` | `false` | Si `true`, rend l'enfant au lieu d'un bouton (utile pour les liens) |
| `className` | `string` | `undefined` | Classes CSS supplémentaires |

## Où les boutons sont utilisés

Les `GradientButton` sont actuellement utilisés dans :

1. **AboutSection** (`src/components/home/about-section.tsx`)
   - Bouton principal : "Découvrir mes prestations"
   - Bouton secondaire : "Me contacter"

2. **ServicesSection** (`src/components/home/services-section.tsx`)
   - Bouton : "Découvrir toutes mes prestations"

3. **LatestBlogSection** (`src/components/home/latest-blog-section.tsx`)
   - Bouton : "Voir tous les articles"

4. **LatestGallerySection** (`src/components/home/latest-gallery-section.tsx`)
   - Bouton : "Voir toute la galerie"

5. **CtaSection** (`src/components/home/cta-section.tsx`)
   - Bouton principal : "Demander un devis"
   - Bouton secondaire : Lien téléphone "06 16 62 51 37"

## Compatibilité navigateurs

Les boutons utilisent la fonctionnalité CSS `@property` qui est supportée par :
-  Chrome 85+
-  Edge 85+
-  Safari 15.4+
-  Firefox 128+ (activé par défaut depuis août 2024)

Pour les navigateurs plus anciens, les boutons afficheront le dégradé mais sans les transitions animées.

## Notes de design

- Les couleurs ont été choisies pour correspondre au thème beauté/maquillage
- Les transitions sont fluides (0.5s) pour un effet premium
- Les bordures utilisent des gradients avec transparence pour un effet subtil
- L'effet `hover` crée un mouvement du gradient pour attirer l'attention

## Accessibilité

- Le composant utilise `focus-visible:ring` pour l'accessibilité clavier
- Les boutons désactivés ont une opacité réduite et les événements pointeur désactivés
- Compatible avec les lecteurs d'écran (utilise des éléments `<button>` ou liens sémantiques avec `asChild`)
