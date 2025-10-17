export interface Realisation {
	id: string
	title: string
	location: string
	date: string // Format: "YYYY-MM-DD"
	image: string
	shortDescription: string
	description: string
	category: 'entretien' | 'amenagement' | 'potager' | 'taille'
	features: string[]
	images?: string[] // Images supplémentaires pour la page détail
}

export const REALISATIONS: Realisation[] = [
	{
		id: 'entretien-pelouse-monnieres',
		title: 'Entretien de pelouse naturelle',
		location: 'Monnières',
		date: '2023-11-17',
		image: 'ex7.webp',
		shortDescription: "Entretien régulier d'une pelouse en méthode écologique sans produits chimiques",
		description:
			"Entretien régulier d'une pelouse naturelle à Monnières. Tonte différenciée pour préserver la biodiversité, mulching pour nourrir naturellement le sol. Aucun produit chimique utilisé.",
		category: 'entretien',
		features: ['Tonte écologique', 'Mulching', 'Sans chimie', 'Biodiversité'],
	},
	{
		id: 'taille-haies-vignoble',
		title: 'Taille raisonnée de haies',
		location: 'Vignoble Nantais',
		date: '2024-03-10',
		image: 'ex8.webp',
		shortDescription: 'Taille respectueuse du cycle naturel des végétaux pour des haies en bonne santé',
		description:
			'Taille raisonnée de haies dans le vignoble nantais. Respect des périodes de taille, préservation de la forme naturelle des arbustes, et maintien de la biodiversité. Intervention réalisée hors période de nidification.',
		category: 'taille',
		features: ['Taille douce', 'Respect du vivant', 'Hors nidification', 'Forme naturelle'],
	},
	{
		id: 'amenagement-paysager-clisson',
		title: 'Aménagement paysager écologique',
		location: 'Clisson',
		date: '2025-04-02',
		image: 'ex9.webp',
		shortDescription: "Création d'un espace paysager harmonieux et respectueux de l'environnement",
		description:
			"Aménagement complet d'un jardin à Clisson. Création de massifs avec des plantes locales et mellifères, mise en place de paillage naturel, installation d'un système de récupération d'eau de pluie.",
		category: 'amenagement',
		features: ['Plantes locales', 'Paillage naturel', 'Récup. eau pluie', 'Mellifère'],
	},
	{
		id: 'potager-permaculture-haie-fouassiere',
		title: 'Potager en permaculture',
		location: 'La Haie-Fouassière',
		date: '2025-08-03',
		image: 'jardin_toboggan.webp',
		shortDescription: 'Création et accompagnement pour un potager productif et autonome',
		description:
			"Mise en place d'un potager en permaculture à La Haie-Fouassière. Design en buttes et lasagnes, association de cultures, installation de composteur, conseil sur les cultures de saison. Objectif : autonomie alimentaire progressive.",
		category: 'potager',
		features: ['Permaculture', 'Buttes & lasagnes', 'Associations', 'Compostage'],
	},
	{
		id: 'entretien-massifs-haute-goulaine',
		title: 'Entretien de massifs fleuris',
		location: 'Haute-Goulaine',
		date: '2025-08-03',
		image: 'jardin_vue_haut.webp',
		shortDescription: 'Entretien régulier de massifs avec des techniques écologiques',
		description:
			'Entretien régulier de massifs fleuris à Haute-Goulaine. Désherbage manuel, paillage organique, taille des vivaces, suppression des fleurs fanées pour prolonger la floraison. Aucun traitement chimique.',
		category: 'entretien',
		features: ['Désherbage manuel', 'Paillage bio', 'Sans chimie', 'Vivaces'],
	},
	{
		id: 'jardin-naturel-vallee-loire',
		title: 'Jardin naturel entretenu',
		location: 'Vallée de la Loire',
		date: '2025-10-06',
		image: 'jardin_paysagiste_travail.webp',
		shortDescription: "Entretien complet d'un jardin en favorisant la nature spontanée",
		description:
			"Entretien d'un jardin naturel dans la vallée de la Loire. Approche respectueuse de la flore spontanée, gestion différenciée des espaces, préservation des zones de biodiversité. Le jardin évolue avec les saisons.",
		category: 'entretien',
		features: ['Gestion différenciée', 'Flore spontanée', 'Biodiversité', 'Saisonnier'],
	},
]
