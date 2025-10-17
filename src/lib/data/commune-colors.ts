// Palette de couleurs ultra-douces pour les 15 communes
// Couleurs très pâles et harmonieuses pour éviter la surcharge visuelle
export const COMMUNE_COLORS: Record<string, string> = {
	// Top communes - Verts très pâles
	'44117': '#d1fae5', // Le Pallet (score 860) - Vert menthe très pâle
	'44100': '#ecfdf5', // Monnières (score 340) - Vert eau très clair
	'44064': '#d1fae5', // Gorges - Vert pâle
	'44032': '#f0fdf4', // La Chapelle-Heulin - Vert presque blanc

	// Vallet et environs - Beiges/Pêches ultra-doux
	'44212': '#fef3c7', // Vallet 9.5k - Jaune crème
	'44108': '#fef9e7', // Mouzillon - Beige très clair
	'44084': '#fef3c7', // Le Loroux-Bottereau - Pêche pâle

	// Vertou - Bleu très pâle
	'44215': '#e0f2fe', // Vertou 26k hab - Bleu ciel très clair

	// Goulaine - Violets ultra-pâles
	'44071': '#f3e8ff', // Haute-Goulaine - Mauve presque blanc
	'44009': '#faf5ff', // Basse-Goulaine - Violet ultra-pâle

	// Clisson et environs - Roses/Corails très doux
	'44043': '#fee2e2', // Clisson - Rose pêche très pâle
	'44173': '#fef2f2', // Saint-Lumine - Rose presque blanc

	// Autres - Tons neutres très pâles
	'44070': '#fce7f3', // La Haie-Fouassière - Rose glacé
	'44088': '#f5f3ff', // Maisdon-sur-Sèvre - Lavande très pâle
	'44002': '#fef9e7', // Aigrefeuille - Jaune crème très clair
}

export function getCommuneColor(code: string): string {
	return COMMUNE_COLORS[code] || '#ecfdf5'
}
