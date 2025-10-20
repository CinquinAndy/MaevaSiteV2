# 🎯 TOP 15 VILLES - RÉSUMÉ

## Modifications effectuées

Le système a été modifié pour générer **15 villes** au lieu de 20.

### ✅ Fichiers modifiés

1. **scripts/fetch-cities.ts**
   - `displayResults()`: top 15 par défaut
   - `saveToFile()`: top 15 par défaut  
   - `generateSEOList()`: top 15 par défaut
   - `main()`: appels avec 15 villes

2. **scripts/cities-data.json**
   - Régénéré avec 15 villes
   - Nouvelles statistiques

3. **scripts/README.md**
   - Tableau mis à jour (Top 15)
   - Statistiques mises à jour

## 📊 Nouvelles statistiques (Top 15)

- **Villes sélectionnées**: 15
- **Villes françaises**: 8
- **Villes suisses**: 7  
- **Distance moyenne**: 22.1 km
- **Population moyenne**: 40,614 habitants

## 🏆 Top 15 Villes

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

## 🚀 Utilisation

```bash
# Régénérer les données
pnpm fetch:cities
```

Les composants React et fonctions SEO utilisent automatiquement le fichier JSON généré.

## 📝 Zone d'intervention (pour SEO)

**Haute-Savoie (France):**
Genève, Thonon-les-Bains, Annemasse, Nyon, Morges, Vernier, Gland, Carouge

**Région Lémanique (Suisse):**
Lausanne, Renens VD, Pully, Montreux, Ecublens VD, Vevey, Évian-les-Bains

---

**Date**: 20 octobre 2025
**Version**: 1.1 (Top 15)
