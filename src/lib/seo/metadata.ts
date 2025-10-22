import type { Metadata } from 'next'
import { DEFAULT_OG_IMAGE, PAGE_SEO, SITE_CONFIG, TWITTER_HANDLE } from './constants'

/**
 * Options pour la génération de metadata
 */
export interface MetadataOptions {
	title?: string
	description?: string
	keywords?: string[]
	image?: string
	path?: string
	noIndex?: boolean
	alternates?: {
		canonical?: string
	}
	publishedTime?: string
	modifiedTime?: string
	authors?: string[]
	type?: 'website' | 'article' | 'profile'
}

/**
 * Génère les metadata Next.js avec toutes les informations SEO nécessaires
 */
export function generateMetadata(options: MetadataOptions = {}): Metadata {
	const {
		title = PAGE_SEO.home.title,
		description = PAGE_SEO.home.description,
		keywords,
		image = DEFAULT_OG_IMAGE,
		path = '',
		noIndex = false,
		alternates,
		publishedTime,
		modifiedTime,
		authors = ['Maeva Cinquin'],
		type = 'website',
	} = options

	const url = `${SITE_CONFIG.url}${path}`
	const imageUrl = image.startsWith('http') ? image : `${SITE_CONFIG.url}${image}`

	const metadata: Metadata = {
		metadataBase: new URL(SITE_CONFIG.url),
		title,
		description,
		keywords: keywords?.join(', '),
		authors: authors.map(name => ({ name })),
		creator: 'Maeva Cinquin',
		publisher: 'Maeva Cinquin',
		formatDetection: {
			email: true,
			telephone: true,
		},
		alternates: {
			canonical: alternates?.canonical || url,
		},
		openGraph: {
			type,
			locale: SITE_CONFIG.locale,
			url,
			siteName: SITE_CONFIG.name,
			title,
			description,
			images: [
				{
					url: imageUrl,
					width: 1200,
					height: 630,
					alt: title,
				},
			],
			...(publishedTime && { publishedTime }),
			...(modifiedTime && { modifiedTime }),
		},
		twitter: {
			card: 'summary_large_image',
			site: TWITTER_HANDLE,
			creator: TWITTER_HANDLE,
			title,
			description,
			images: [imageUrl],
		},
		robots: {
			index: !noIndex,
			follow: !noIndex,
			nocache: noIndex,
			googleBot: {
				index: !noIndex,
				follow: !noIndex,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
	}

	return metadata
}

/**
 * Génère les metadata pour la page d'accueil
 */
export function generateHomeMetadata(): Metadata {
	return generateMetadata({
		title: PAGE_SEO.home.title,
		description: PAGE_SEO.home.description,
		keywords: [...PAGE_SEO.home.keywords],
		path: '/',
		type: 'website',
	})
}

/**
 * Génère les metadata pour la page blog (listing)
 */
export function generateBlogListingMetadata(): Metadata {
	return generateMetadata({
		title: PAGE_SEO.blog.title,
		description: PAGE_SEO.blog.description,
		keywords: [...PAGE_SEO.blog.keywords],
		path: '/blog',
		type: 'website',
	})
}

/**
 * Génère les metadata pour un article de blog
 */
export function generateBlogPostMetadata(options: {
	title: string
	description?: string
	excerpt?: string
	featuredImage?: string
	slug: string
	publishedDate?: string
	seoTitle?: string
	seoDescription?: string
}): Metadata {
	const { title, description, excerpt, featuredImage, slug, publishedDate, seoTitle, seoDescription } = options

	return generateMetadata({
		title: seoTitle || `${title} - Blog Maeva Cinquin`,
		description:
			seoDescription || description || excerpt || `Découvrez l'article ${title} sur le blog de Maeva Cinquin`,
		image: featuredImage,
		path: `/blog/${slug}`,
		type: 'article',
		publishedTime: publishedDate,
	})
}

/**
 * Génère les metadata pour la page galerie (listing)
 */
export function generateGalleryListingMetadata(): Metadata {
	return generateMetadata({
		title: PAGE_SEO.gallery.title,
		description: PAGE_SEO.gallery.description,
		keywords: [...PAGE_SEO.gallery.keywords],
		path: '/galerie',
		type: 'website',
	})
}

/**
 * Génère les metadata pour une galerie individuelle
 */
export function generateGalleryItemMetadata(options: {
	title: string
	description?: string
	coverImage?: string
	slug: string
	publishedDate?: string
	seoTitle?: string
	seoDescription?: string
}): Metadata {
	const { title, description, coverImage, slug, publishedDate, seoTitle, seoDescription } = options

	return generateMetadata({
		title: seoTitle || `${title} - Galerie Maeva Cinquin`,
		description: seoDescription || description || `Découvrez la galerie ${title} de Maeva Cinquin`,
		image: coverImage,
		path: `/galerie/${slug}`,
		type: 'article',
		publishedTime: publishedDate,
	})
}

/**
 * Génère les metadata pour la page prestations (listing)
 */
export function generateServicesListingMetadata(): Metadata {
	return generateMetadata({
		title: PAGE_SEO.services.title,
		description: PAGE_SEO.services.description,
		keywords: [...PAGE_SEO.services.keywords],
		path: '/prestations',
		type: 'website',
	})
}

/**
 * Génère les metadata pour une prestation individuelle
 */
export function generateServiceItemMetadata(options: {
	title: string
	shortDescription?: string
	featuredImage?: string
	slug: string
	seoTitle?: string
	seoDescription?: string
}): Metadata {
	const { title, shortDescription, featuredImage, slug, seoTitle, seoDescription } = options

	return generateMetadata({
		title: seoTitle || `${title} - Maeva Cinquin`,
		description:
			seoDescription ||
			shortDescription ||
			`Découvrez ${title} - Service professionnel de maquillage et nail art en Haute-Savoie`,
		image: featuredImage,
		path: `/prestations/${slug}`,
		type: 'website',
	})
}

/**
 * Génère les metadata pour la page contact
 */
export function generateContactMetadata(): Metadata {
	return generateMetadata({
		title: PAGE_SEO.contact.title,
		description: PAGE_SEO.contact.description,
		keywords: [...PAGE_SEO.contact.keywords],
		path: '/contact',
		type: 'website',
	})
}

/**
 * Génère les metadata pour la page mentions légales
 */
export function generateMentionsLegalesMetadata(): Metadata {
	return generateMetadata({
		title: PAGE_SEO.mentionsLegales.title,
		description: PAGE_SEO.mentionsLegales.description,
		keywords: [...PAGE_SEO.mentionsLegales.keywords],
		path: '/mentions-legales',
		type: 'website',
		noIndex: true, // Les pages légales ne doivent généralement pas être indexées
	})
}

/**
 * Génère un JSON-LD pour la page d'accueil (Local Business Schema)
 */
export function generateHomeJsonLd() {
	return {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		'@id': `${SITE_CONFIG.url}/#organization`,
		name: SITE_CONFIG.name,
		description: PAGE_SEO.home.description,
		url: SITE_CONFIG.url,
		telephone: SITE_CONFIG.phone,
		email: SITE_CONFIG.email,
		image: `${SITE_CONFIG.url}${DEFAULT_OG_IMAGE}`,
		priceRange: '$$',
		address: {
			'@type': 'PostalAddress',
			addressRegion: 'Haute-Savoie',
			addressCountry: 'FR',
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: 46.3708,
			longitude: 6.4767,
		},
		areaServed: [
			{
				'@type': 'City',
				name: 'Thonon-les-Bains',
			},
			{
				'@type': 'City',
				name: 'Annecy',
			},
			{
				'@type': 'City',
				name: 'Genève',
			},
			{
				'@type': 'City',
				name: 'Lausanne',
			},
		],
		sameAs: [
			`https://instagram.com/${SITE_CONFIG.social.instagram.replace('@', '')}`,
			`https://facebook.com/${SITE_CONFIG.social.facebook}`,
		],
		openingHoursSpecification: {
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			opens: '09:00',
			closes: '19:00',
		},
	}
}

/**
 * Génère un JSON-LD pour un article de blog
 */
export function generateBlogPostJsonLd(options: {
	title: string
	description?: string
	excerpt?: string
	featuredImage?: string
	slug: string
	publishedDate?: string
	modifiedDate?: string
}) {
	const { title, description, excerpt, featuredImage, slug, publishedDate, modifiedDate } = options

	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: title,
		description: description || excerpt,
		image: featuredImage ? `${SITE_CONFIG.url}${featuredImage}` : undefined,
		datePublished: publishedDate,
		dateModified: modifiedDate || publishedDate,
		author: {
			'@type': 'Person',
			name: SITE_CONFIG.name,
			url: SITE_CONFIG.url,
		},
		publisher: {
			'@type': 'Organization',
			name: SITE_CONFIG.name,
			url: SITE_CONFIG.url,
			logo: {
				'@type': 'ImageObject',
				url: `${SITE_CONFIG.url}/logo.png`,
			},
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `${SITE_CONFIG.url}/blog/${slug}`,
		},
	}
}

/**
 * Génère un JSON-LD pour une galerie
 */
export function generateGalleryJsonLd(options: {
	title: string
	description?: string
	slug: string
	images: string[]
}) {
	const { title, description, slug, images } = options

	return {
		'@context': 'https://schema.org',
		'@type': 'ImageGallery',
		name: title,
		description,
		url: `${SITE_CONFIG.url}/galerie/${slug}`,
		associatedMedia: images.map(imageUrl => ({
			'@type': 'ImageObject',
			contentUrl: imageUrl.startsWith('http') ? imageUrl : `${SITE_CONFIG.url}${imageUrl}`,
		})),
		author: {
			'@type': 'Person',
			name: SITE_CONFIG.name,
			url: SITE_CONFIG.url,
		},
	}
}
