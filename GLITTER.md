# Glitter Effect

Effet de paillettes scintillantes basé sur un shader WebGL.

## Composants disponibles

### GlitterFinal
Fond complet noir avec paillettes.

```tsx
import GlitterFinal from '@/components/ui/glitter-final'

<GlitterFinal speed={1} />
```

**Props:**
- `speed?: number` - Vitesse animation (défaut: 1)
- `intensity?: number` - Intensité (défaut: 5.0)
- `className?: string` - Classes CSS

### GlitterOverlay
Overlay transparent pour superposer.

```tsx
import GlitterOverlay from '@/components/ui/glitter-overlay'

<div className="absolute inset-0 z-50 pointer-events-none">
  <GlitterOverlay speed={1.5} opacity={0.6} />
</div>
```

**Props:**
- `speed?: number` - Vitesse animation (défaut: 1)
- `opacity?: number` - Opacité 0-1 (défaut: 0.8)
- `className?: string` - Classes CSS

## Utilisation dans le hero

```tsx
import GlitterOverlay from '@/components/ui/glitter-overlay'

export default function Hero() {
  return (
    <div className="relative w-full h-full">
      {/* Contenu */}
      <h1>Title</h1>

      {/* Glitter overlay */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        <GlitterOverlay speed={1} opacity={0.5} />
      </div>
    </div>
  )
}
```

## Principe

Le shader multiplie deux textures de noise à différentes échelles et vitesses pour créer des paillettes :

```glsl
result += texture2D(noise, uv * 1.1 + vec2(time * -0.005)).r;
result *= texture2D(noise, uv * 0.9 + vec2(time * 0.005)).g;
result = pow(result, 12.0);  // Paillettes nettes
result *= 5.0;               // Amplification
```
