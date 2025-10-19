# Sparkles Shader Effect

## Description

Un effet de paillettes scintillantes créé avec Three.js et React Three Fiber, basé sur un shader GLSL personnalisé. L'effet est affiché au-dessus de tous les éléments de la page hero.

## Composants disponibles

### 1. `Sparkles` (Version simple)
Fichier : `src/components/ui/sparkles.tsx`

Version basique avec des paramètres minimaux.

**Props:**
- `speed?: number` - Vitesse de l'animation (défaut: 1)
- `className?: string` - Classes CSS additionnelles

**Exemple d'utilisation:**
```tsx
import Sparkles from '@/components/ui/sparkles'

<div className="absolute inset-0 z-50 pointer-events-none">
  <Sparkles speed={1.5} />
</div>
```

### 2. `SparklesEnhanced` (Version avancée)
Fichier : `src/components/ui/sparkles-enhanced.tsx`

Version avec contrôle complet de tous les paramètres du shader.

**Props:**
- `speed?: number` - Vitesse globale de l'animation (défaut: 1)
- `intensity?: number` - Intensité lumineuse des paillettes (défaut: 5.0)
- `scale1?: number` - Échelle de la première couche de noise (défaut: 1.1)
- `scale2?: number` - Échelle de la deuxième couche de noise (défaut: 0.9)
- `speed1?: number` - Vitesse de déplacement de la première couche (défaut: -0.005)
- `speed2?: number` - Vitesse de déplacement de la deuxième couche (défaut: 0.005)
- `power?: number` - Puissance pour rendre les paillettes plus ou moins "pointues" (défaut: 12.0)
- `color?: string` - Couleur des paillettes en hexadécimal (défaut: '#ffffff')
- `className?: string` - Classes CSS additionnelles

**Exemple d'utilisation:**
```tsx
import SparklesEnhanced from '@/components/ui/sparkles-enhanced'

<div className="absolute inset-0 z-50 pointer-events-none">
  <SparklesEnhanced
    speed={1.5}
    intensity={8.0}
    power={15.0}
    color="#ffd700"
  />
</div>
```

## Implémentation actuelle

Le shader est actuellement intégré dans `src/components/home/heroAlt.tsx` :

```tsx
{/* Sparkles overlay - positioned above everything */}
<div className="absolute inset-0 z-50 pointer-events-none">
  <Sparkles speed={1.5} />
</div>
```

## Personnalisation

### Changer la couleur des paillettes
Utilisez `SparklesEnhanced` avec la prop `color` :
```tsx
<SparklesEnhanced color="#ffd700" /> {/* Or doré */}
<SparklesEnhanced color="#ff69b4" /> {/* Rose */}
<SparklesEnhanced color="#00ffff" /> {/* Cyan */}
```

### Augmenter l'intensité
```tsx
<SparklesEnhanced intensity={10.0} /> {/* Plus lumineux */}
<SparklesEnhanced intensity={3.0} />  {/* Plus subtil */}
```

### Rendre les paillettes plus ou moins grandes
```tsx
<SparklesEnhanced power={8.0} />  {/* Paillettes plus grandes et diffuses */}
<SparklesEnhanced power={20.0} /> {/* Paillettes très petites et pointues */}
```

### Ralentir ou accélérer l'animation
```tsx
<SparklesEnhanced speed={0.5} /> {/* Plus lent */}
<SparklesEnhanced speed={3.0} /> {/* Plus rapide */}
```

### Combiner plusieurs effets
```tsx
<SparklesEnhanced
  speed={2.0}
  intensity={7.0}
  power={15.0}
  color="#ffffff"
  scale1={1.5}
  scale2={0.7}
/>
```

## Optimisations

- Le composant utilise `pointer-events-none` pour ne pas bloquer les interactions
- Le canvas utilise `powerPreference: 'high-performance'`
- L'antialiasing est désactivé pour de meilleures performances
- Le blending additif (`THREE.AdditiveBlending`) est utilisé pour un effet lumineux

## Notes techniques

Le shader est basé sur la composition de deux textures de noise à différentes échelles et vitesses :
```glsl
result += texture2D(noiseTexture, uv * scale1 + vec2(time * speed1)).r;
result *= texture2D(noiseTexture, uv * scale2 + vec2(time * speed2)).g;
result = pow(result, power);
```

Cette technique crée des motifs scintillants qui évoluent dans le temps.

## Dépannage

Si l'effet ne s'affiche pas :
1. Vérifiez que Three.js est correctement installé : `pnpm install three @react-three/fiber @react-three/drei`
2. Vérifiez que le composant est bien marqué avec `'use client'`
3. Vérifiez le z-index (doit être supérieur aux autres éléments)
4. Vérifiez la console pour d'éventuelles erreurs WebGL

## Performance

L'effet est optimisé pour les performances mais peut être coûteux sur les appareils moins puissants. Pour améliorer les performances :
- Réduisez la résolution de la texture de noise (actuellement 512x512)
- Réduisez la fréquence de mise à jour
- Désactivez l'effet sur mobile si nécessaire
