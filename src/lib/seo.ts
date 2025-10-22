import type { Metadata } from 'next'
import { generateSEODescription, generateSEOKeywords, getCityNamesForSEO } from './cities-data'

/**
 * Génère les métadonnées SEO de base pour le site
 */
export function generateBaseSEO(): Metadata {
	const description = generateSEODescription()
	const keywords = generateSEOKeywords().slice(0, 20) // Limiter à 20 mots-clés principaux

	return {
		title: {
			default: 'Maeva Cinquin - Maquilleuse Professionnelle Haute-Savoie & Genève',
			template: '%s | Maeva Cinquin Makeup Artist',
		},
		description,
		keywords: keywords.join(', '),
		authors: [{ name: 'Maeva Cinquin' }],
		creator: 'Maeva Cinquin',
		openGraph: {
			type: 'website',
			locale: 'fr_FR',
			url: 'https://maevacinquin.com',
			siteName: 'Maeva Cinquin - Makeup Artist',
			title: 'Maeva Cinquin - Maquilleuse Professionnelle',
			description,
			images: [
				{
					url: '/image00001.jpeg',
					width: 1920,
					height: 1080,
					alt: 'Maeva Cinquin - Maquilleuse Professionnelle',
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: 'Maeva Cinquin - Maquilleuse Professionnelle',
			description,
			images: ['/image00001.jpeg'],
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
		alternates: {
			canonical: 'https://maevacinquin.com',
		},
	}
}

/**
 * Génère les métadonnées SEO pour la page prestations
 */
export function generatePrestationsSEO(): Metadata {
	const cities = getCityNamesForSEO()
	const mainCities = cities.all.slice(0, 6).join(', ')

	return {
		title: 'Prestations - Maquillage Beauté, Mariages, Artistique & Nail Art',
		description: `Découvrez mes prestations de maquillage professionnel: beauté, mariages, artistique, body painting et nail art. Interventions à ${mainCities} et toute la Haute-Savoie.`,
		openGraph: {
			title: 'Mes Prestations - Maeva Cinquin Makeup Artist',
			description: `Services de maquillage professionnel en Haute-Savoie et Suisse: beauté, mariages, artistique, nail art. Déplacement à ${mainCities}.`,
			images: ['/image00005.jpeg'],
		},
	}
}

/**
 * Génère les métadonnées SEO pour la page galerie
 */
export function generateGalerieSEO(): Metadata {
	return {
		title: 'Portfolio & Galerie - Mes Réalisations',
		description:
			'Découvrez mon portfolio de maquillage professionnel: mariages, maquillages artistiques, beauty looks, nail art et body painting. Photos de mes réalisations en Haute-Savoie et Genève.',
		openGraph: {
			title: 'Portfolio - Maeva Cinquin Makeup Artist',
			description: 'Galerie photo de mes réalisations: mariages, maquillages artistiques, beauty looks et nail art.',
			images: ['/image00003.jpeg'],
		},
	}
}

/**
 * Génère les métadonnées SEO pour la page blog
 */
export function generateBlogSEO(): Metadata {
	return {
		title: 'Blog - Conseils Maquillage & Actualités Beauté',
		description:
			'Retrouvez mes conseils de maquilleuse professionnelle, astuces beauté, tendances maquillage et actualités nail art. Tips et tutoriels pour sublimer votre beauté.',
		openGraph: {
			title: 'Blog Beauté - Maeva Cinquin',
			description: 'Conseils maquillage, tendances beauté et astuces de professionnelle.',
			images: ['/image00006.jpeg'],
		},
	}
}

/**
 * Génère les métadonnées SEO pour la page contact
 */
export function generateContactSEO(): Metadata {
	const cities = getCityNamesForSEO()
	const zones = `${cities.french.slice(0, 3).join(', ')} et ${cities.swiss.slice(0, 3).join(', ')}`

	return {
		title: 'Contact - Demandez un Devis Gratuit',
		description: `Contactez-moi pour vos prestations de maquillage et nail art en Haute-Savoie et Suisse. Déplacement à ${zones}. Devis gratuit et réponse sous 24-48h.`,
		openGraph: {
			title: 'Me Contacter - Maeva Cinquin',
			description: 'Demandez un devis gratuit pour vos prestations de maquillage. Réponse rapide garantie.',
		},
	}
}

/**
 * Génère le JSON-LD pour le Local Business Schema
 */
export function generateLocalBusinessSchema() {
	const cities = getCityNamesForSEO()

	return {
		'@context': 'https://schema.org',
		'@type': 'BeautySalon',
		name: 'Maeva Cinquin - Makeup Artist',
		description: generateSEODescription(),
		image: 'https://maevacinquin.com/image00001.jpeg',
		'@id': 'https://maevacinquin.com',
		url: 'https://maevacinquin.com',
		telephone: '+33616625137',
		email: 'maevacinquin1@gmail.com',
		priceRange: '€€',
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Thonon-les-Bains',
			addressRegion: 'Haute-Savoie',
			postalCode: '74200',
			addressCountry: 'FR',
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: 46.3708,
			longitude: 6.4792,
		},
		areaServed: [
			...cities.french.map(city => ({
				'@type': 'City',
				name: city,
				addressCountry: 'FR',
			})),
			...cities.swiss.map(city => ({
				'@type': 'City',
				name: city,
				addressCountry: 'CH',
			})),
		],
		sameAs: [
			'https://www.instagram.com/makeup.artist.dream',
			'https://www.facebook.com/Cinquin-maeva',
			'https://g.page/cinquin-maeva',
		],
		openingHoursSpecification: {
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
			opens: '09:00',
			closes: '19:00',
		},
		hasOfferCatalog: {
			'@type': 'OfferCatalog',
			name: 'Prestations de maquillage',
			itemListElement: [
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Maquillage Beauté',
						description: 'Maquillage naturel ou sophistiqué pour toutes occasions',
						priceSpecification: {
							'@type': 'PriceSpecification',
							price: '80',
							priceCurrency: 'EUR',
						},
					},
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Maquillage Mariage',
						description: 'Maquillage mariée avec essai, cortège et marié',
					},
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Maquillage Artistique',
						description: 'Body painting, maquillage enfants, créations artistiques',
					},
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Nail Art',
						description: 'Pose de gel, semi-permanent, nail art et manucure',
					},
				},
			],
		},
	}
}

/**
 * Génère le JSON-LD pour Person Schema (Maeva)
 */
export function generatePersonSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Maeva Cinquin',
		jobTitle: 'Maquilleuse Professionnelle',
		description: 'Maquilleuse professionnelle diplômée de la Make Up For Ever Academy et prothésiste ongulaire',
		image: 'https://maevacinquin.com/image00002.jpeg',
		url: 'https://maevacinquin.com',
		email: 'maevacinquin1@gmail.com',
		telephone: '+33616625137',
		alumniOf: {
			'@type': 'EducationalOrganization',
			name: 'Make Up For Ever Academy',
			address: {
				'@type': 'PostalAddress',
				addressLocality: 'Nice',
				addressCountry: 'FR',
			},
		},
		knowsAbout: [
			'Maquillage beauté',
			'Maquillage artistique',
			'Maquillage mariage',
			'Body painting',
			'Nail art',
			'Prothésie ongulaire',
		],
		sameAs: [
			'https://www.instagram.com/makeup.artist.dream',
			'https://www.facebook.com/Cinquin-maeva',
			'https://cinquin-maeva.com',
		],
	}
}

/**
 * Génère les métadonnées SEO pour la page d'accueil
 */
export function generateHomeMetadata(): Metadata {
	const baseSEO = generateBaseSEO()
	return {
		...baseSEO,
		title: 'Maeva Cinquin - Maquilleuse Professionnelle Haute-Savoie & Genève',
		alternates: {
			canonical: 'https://maevacinquin.com',
		},
	}
}

/**
 * Génère le JSON-LD combiné pour la page d'accueil
 */
export function generateHomeJsonLd() {
	const localBusiness = generateLocalBusinessSchema()
	const person = generatePersonSchema()

	return {
		'@context': 'https://schema.org',
		'@graph': [localBusiness, person],
	}
}
