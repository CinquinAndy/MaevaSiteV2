/**
 * Constantes SEO pour le site de Maeva Cinquin
 * Toutes les métadonnées de base pour chaque page du site
 */

export const SITE_CONFIG = {
	name: 'Maeva Cinquin',
	url: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
	email: 'maevacinquin1@gmail.com',
	phone: '+33 6 16 62 51 37',
	locale: 'fr_FR',
	type: 'website' as const,
	social: {
		instagram: '@makeup.artist.dream',
		facebook: 'Cinquin-maeva',
	},
} as const

export const BUSINESS_INFO = {
	businessName: 'Maeva Cinquin - Maquilleuse Professionnelle',
	profession: 'Maquilleuse professionnelle et prothésiste ongulaire',
	diploma: 'Diplômée Make Up For Ever Academy (Nice)',
	specialties: ['maquillage beauté', 'maquillage artistique', 'nail art', 'prothésiste ongulaire'],
	services: [
		'maquillage mariage',
		'maquillage événementiel',
		'maquillage artistique',
		'nail art',
		'shooting photo',
		'défilés de mode',
		'maquillage enfants',
	],
	serviceAreas: ['Haute-Savoie', 'Thonon-les-Bains', 'Genève', 'Annecy', 'Lausanne', 'Suisse'],
} as const

/**
 * Métadonnées SEO par défaut pour toutes les pages
 */
export const DEFAULT_SEO = {
	title: 'Maeva Cinquin - Maquilleuse Professionnelle & Prothésiste Ongulaire',
	description:
		'Maquilleuse professionnelle diplômée Make Up For Ever Academy et prothésiste ongulaire en Haute-Savoie. Mariages, événements, maquillage artistique, nail art. Interventions à Thonon, Annecy, Genève, Lausanne.',
	keywords: [
		'maquilleuse professionnelle',
		'makeup artist',
		'prothésiste ongulaire',
		'nail art',
		'maquillage mariage',
		'maquillage artistique',
		'Haute-Savoie',
		'Thonon-les-Bains',
		'Genève',
		'Annecy',
		'Lausanne',
		'Make Up For Ever Academy',
	],
} as const

/**
 * Métadonnées SEO spécifiques par page
 */
export const PAGE_SEO = {
	home: {
		title: 'Maquilleuse professionnelle | Nail Art | Maeva Cinquin',
		description:
			'Maquilleuse professionnelle diplômée Make Up For Ever Academy et prothésiste ongulaire en Haute-Savoie. Mariages, événements, maquillage artistique, nail art. Interventions à Thonon, Annecy, Genève, Lausanne.',
		keywords: [
			...DEFAULT_SEO.keywords,
			'maquillage beauté',
			'maquilleuse Haute-Savoie',
			'makeup artist Genève',
			'nail art Annecy',
		],
	},
	blog: {
		title: 'Mes conseils - Maquilleuse professionnelle | Nail Art | Maeva Cinquin',
		description:
			'Conseils maquillage, astuces nail art, actualités beauté. Découvrez mon expertise en maquillage professionnel et nail art à travers mes articles.',
		keywords: [
			...DEFAULT_SEO.keywords,
			'conseils maquillage',
			'tutoriels makeup',
			'blog beauté',
			'astuces nail art',
			'actualités maquillage',
		],
	},
	galery: {
		title: 'Mes réalisations - Maquilleuse professionnelle | Nail Art | Maeva Cinquin',
		description:
			'Découvrez mes réalisations en maquillage et nail art : mariages, événements, maquillage artistique, body painting, manucure. Portfolio professionnel en Haute-Savoie.',
		keywords: [
			...DEFAULT_SEO.keywords,
			'portfolio maquillage',
			'réalisations makeup',
			'book maquilleuse',
			'photos mariage',
			'maquillage artistique photos',
		],
	},
	services: {
		title: 'Prestations - Maquilleuse professionnelle - Prothésiste ongulaire',
		description:
			'Prestations maquillage professionnel et nail art : mariages, événements, maquillage artistique, manucure, pédicure. Interventions en Haute-Savoie et Suisse.',
		keywords: [
			...DEFAULT_SEO.keywords,
			'tarifs maquillage',
			'prestations makeup',
			'services nail art',
			'devis maquillage mariage',
			'tarifs manucure',
		],
	},
	contact: {
		title: 'Contact - Maquilleuse professionnelle Haute-Savoie | Maeva Cinquin',
		description:
			'Contactez-moi pour vos projets maquillage et nail art. Devis gratuit. Interventions à Thonon, Annecy, Genève, Lausanne. Tél: +33 6 16 62 51 37',
		keywords: [
			...DEFAULT_SEO.keywords,
			'contact maquilleuse',
			'devis maquillage',
			'réservation makeup',
			'rendez-vous nail art',
			'contact Thonon',
		],
	},
	mentionsLegales: {
		title: 'Mentions légales - Maeva Cinquin Maquilleuse Professionnelle',
		description:
			'Mentions légales du site de Maeva Cinquin, maquilleuse professionnelle et prothésiste ongulaire en Haute-Savoie.',
		keywords: ['mentions légales', 'informations légales', 'Maeva Cinquin'],
	},
} as const

/**
 * Image par défaut pour Open Graph et Twitter cards
 */
export const DEFAULT_OG_IMAGE = '/og-mae.webp'
export const TWITTER_HANDLE = '@makeup.artist.dream'
