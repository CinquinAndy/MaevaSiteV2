import type { Metadata } from 'next'
import { generateSEODescription, generateSEOKeywords, getCityNamesForSEO } from './cities-data'

/**
 * Configuration du site pour SEO et sitemap
 */
export const SITE_CONFIG = {
	url: 'https://cinquin-maeva.com',
	name: 'Maeva Cinquin - Makeup Artist',
	author: 'Maeva Cinquin',
} as const

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
			canonical: 'https://cinquin-maeva.com',
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
		'@id': 'https://cinquin-maeva.com',
		url: 'https://cinquin-maeva.com',
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
		image: 'https://cinquin-maeva.com/image00002.jpeg',
		url: 'https://cinquin-maeva.com',
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
			canonical: 'https://cinquin-maeva.com',
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

/**
 * Génère les métadonnées SEO pour une page de contact
 */
export function generateContactMetadata(): Metadata {
	return generateContactSEO()
}

/**
 * Génère les métadonnées SEO pour une page de mentions légales
 */
export function generateMentionsLegalesMetadata(): Metadata {
	return {
		title: 'Mentions Légales',
		description:
			'Mentions légales du site Maeva Cinquin - Informations légales, propriété intellectuelle et protection des données personnelles.',
		robots: {
			index: true,
			follow: true,
		},
	}
}

/**
 * Génère les métadonnées SEO pour la liste des articles de blog
 */
export function generateBlogListingMetadata(): Metadata {
	return generateBlogSEO()
}

/**
 * Génère les métadonnées SEO pour un article de blog individuel
 */
export function generateBlogPostMetadata(params: {
	title: string
	excerpt?: string
	featuredImage?: string
	slug: string
	publishedDate?: string
	seoTitle?: string
	seoDescription?: string
}): Metadata {
	const baseSEO = generateBaseSEO()
	const { title, excerpt, slug, seoTitle, seoDescription } = params

	const metaTitle = seoTitle || `${title} | Blog Maeva Cinquin`
	const metaDescription = seoDescription || excerpt || title

	return {
		...baseSEO,
		title: metaTitle,
		description: metaDescription,
		openGraph: {
			title: metaTitle,
			description: metaDescription,
			type: 'article',
			url: `${SITE_CONFIG.url}/blog/${slug}`,
		},
		twitter: {
			card: 'summary_large_image',
			title: metaTitle,
			description: metaDescription,
		},
		alternates: {
			canonical: `${SITE_CONFIG.url}/blog/${slug}`,
		},
	}
}

/**
 * Génère le JSON-LD pour un article de blog
 */
export function generateBlogPostJsonLd(params: {
	title: string
	excerpt?: string
	featuredImage?: string
	slug: string
	publishedDate?: string
}) {
	const { title, excerpt, featuredImage, slug, publishedDate } = params

	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: title,
		description: excerpt || title,
		image: featuredImage || `${SITE_CONFIG.url}/image00002.jpeg`,
		datePublished: publishedDate || new Date().toISOString(),
		dateModified: publishedDate || new Date().toISOString(),
		author: {
			'@type': 'Person',
			name: 'Maeva Cinquin',
			url: SITE_CONFIG.url,
		},
		publisher: {
			'@type': 'Organization',
			name: SITE_CONFIG.name,
			logo: {
				'@type': 'ImageObject',
				url: `${SITE_CONFIG.url}/image00002.jpeg`,
			},
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `${SITE_CONFIG.url}/blog/${slug}`,
		},
	}
}

/**
 * Génère les métadonnées SEO pour la liste des galeries
 */
export function generateGaleryListingMetadata(): Metadata {
	return generateGalerieSEO()
}

/**
 * Génère les métadonnées SEO pour une galerie individuelle
 */
export function generateGaleryItemMetadata(params: {
	title: string
	description?: string
	coverImage?: string
	slug: string
	publishedDate?: string
	seoTitle?: string
	seoDescription?: string
}): Metadata {
	const baseSEO = generateBaseSEO()
	const { title, description, slug, seoTitle, seoDescription } = params

	const metaTitle = seoTitle || `${title} | Galerie Maeva Cinquin`
	const metaDescription = seoDescription || description || title

	return {
		...baseSEO,
		title: metaTitle,
		description: metaDescription,
		openGraph: {
			title: metaTitle,
			description: metaDescription,
			type: 'website',
			url: `${SITE_CONFIG.url}/galerie/${slug}`,
		},
		twitter: {
			card: 'summary_large_image',
			title: metaTitle,
			description: metaDescription,
		},
		alternates: {
			canonical: `${SITE_CONFIG.url}/galerie/${slug}`,
		},
	}
}

/**
 * Génère le JSON-LD pour une galerie
 */
export function generateGaleryJsonLd(params: { title: string; description?: string; slug: string; images: string[] }) {
	const { title, description, slug, images } = params

	return {
		'@context': 'https://schema.org',
		'@type': 'ImageGalery',
		name: title,
		description: description || title,
		url: `${SITE_CONFIG.url}/galerie/${slug}`,
		image: images,
		author: {
			'@type': 'Person',
			name: 'Maeva Cinquin',
			url: SITE_CONFIG.url,
		},
	}
}

/**
 * Génère les métadonnées SEO pour la liste des services
 */
export function generateServicesListingMetadata(): Metadata {
	return generatePrestationsSEO()
}

/**
 * Génère les métadonnées SEO pour un service individuel
 */
export function generateServiceItemMetadata(params: {
	title: string
	shortDescription?: string
	featuredImage?: string
	slug: string
	seoTitle?: string
	seoDescription?: string
}): Metadata {
	const baseSEO = generateBaseSEO()
	const { title, shortDescription, slug, seoTitle, seoDescription } = params
	const cities = getCityNamesForSEO()

	const metaTitle = seoTitle || `${title} | Prestations Maeva Cinquin`
	const metaDescription =
		seoDescription ||
		shortDescription ||
		`Découvrez mon service ${title} en Haute-Savoie et Suisse. Interventions à ${cities.all.slice(0, 3).join(', ')}.`

	return {
		...baseSEO,
		title: metaTitle,
		description: metaDescription,
		openGraph: {
			title: metaTitle,
			description: metaDescription,
			type: 'website',
			url: `${SITE_CONFIG.url}/prestations/${slug}`,
		},
		twitter: {
			card: 'summary_large_image',
			title: metaTitle,
			description: metaDescription,
		},
		alternates: {
			canonical: `${SITE_CONFIG.url}/prestations/${slug}`,
		},
	}
}
