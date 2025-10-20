/**
 * Script pour récupérer toutes les galeries WordPress (réalisations)
 * avec leurs images associées
 */

import fs from 'node:fs'
import https from 'node:https'
import path from 'node:path'

const BASE_URL = 'https://cinquin-maeva.com'
const API_URL = `${BASE_URL}/wp-json/wp/v2`
const SAVE_DIR = path.join(process.cwd(), 'save')

interface WPMedia {
	id: number
	source_url: string
	title: { rendered: string }
	alt_text: string
}

interface WPPost {
	id: number
	title: { rendered: string }
	slug: string
	content: { rendered: string }
	excerpt: { rendered: string }
	featured_media: number
	categories: number[]
	date: string
}

interface Gallery {
	title: string
	slug: string
	description: string
	category: string
	images: Array<{
		filename: string
		url: string
		alt: string
		title: string
	}>
	publishedDate: string
}

// Fetch depuis l'API
async function fetchAPI(endpoint: string): Promise<any> {
	return new Promise((resolve, reject) => {
		https
			.get(`${API_URL}${endpoint}`, (res) => {
				let data = ''
				res.on('data', (chunk) => {
					data += chunk
				})
				res.on('end', () => {
					try {
						resolve(JSON.parse(data))
					} catch (error) {
						console.error('Erreur parsing JSON:', error)
						resolve(null)
					}
				})
			})
			.on('error', (err) => {
				console.error(`Erreur API ${endpoint}:`, err.message)
				reject(err)
			})
	})
}

// Extraire les URLs d'images depuis le contenu HTML
function extractImageUrls(htmlContent: string): string[] {
	const imgRegex = /<img[^>]+src="([^">]+)"/g
	const urls: string[] = []
	let match

	while ((match = imgRegex.exec(htmlContent)) !== null) {
		urls.push(match[1])
	}

	return urls
}

// Déterminer la catégorie basée sur le titre/contenu
function determineCategory(title: string, content: string): string {
	const lowerTitle = title.toLowerCase()
	const lowerContent = content.toLowerCase()

	if (lowerTitle.includes('mariage') || lowerContent.includes('mariage')) {
		return 'mariage'
	}
	if (
		lowerTitle.includes('artistique') ||
		lowerContent.includes('artistique') ||
		lowerTitle.includes('cirque') ||
		lowerTitle.includes('mi-ange') ||
		lowerTitle.includes('démon')
	) {
		return 'artistique'
	}
	if (lowerTitle.includes('nail') || lowerTitle.includes('ongle') || lowerContent.includes('nail')) {
		return 'nail-art'
	}
	if (
		lowerTitle.includes('événement') ||
		lowerTitle.includes('halloween') ||
		lowerContent.includes('événement')
	) {
		return 'evenementiel'
	}
	if (lowerTitle.includes('naturel') || lowerTitle.includes('beauté')) {
		return 'mariage' // Beauté/Naturel souvent pour mariages
	}

	return 'evenementiel' // Par défaut
}

// Nettoyer le texte HTML
function stripHtml(html: string | undefined): string {
	if (!html) return ''
	return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim()
}

// Récupérer toutes les réalisations (galeries)
async function getAllRealisations(): Promise<WPPost[]> {
	console.log('\n📸 Récupération des réalisations WordPress...')

	const allPosts: WPPost[] = []
	let page = 1
	let hasMore = true

	// Essayer différents endpoints
	const endpoints = ['/posts?categories=', '/realisations', '/posts']

	for (const endpoint of endpoints) {
		try {
			page = 1
			hasMore = true

			while (hasMore) {
				const posts = await fetchAPI(`${endpoint}${endpoint.includes('?') ? '&' : '?'}per_page=100&page=${page}`)

				if (!posts || posts.length === 0) {
					hasMore = false
				} else {
					// Filtrer pour ne garder que les réalisations/galeries
					const galleries = posts.filter((p: WPPost) => {
						const title = p.title.rendered.toLowerCase()
						return (
							title.includes('maquillage') ||
							title.includes('nail') ||
							title.includes('mariage') ||
							title.includes('collection') ||
							title.includes('artistique')
						)
					})

					allPosts.push(...galleries)
					console.log(`   ${endpoint} - Page ${page}: ${galleries.length} galeries`)
					page++
				}
			}
		} catch (error) {
			// Continuer avec le prochain endpoint
			console.log(`   ${endpoint}: non disponible`)
		}
	}

	// Dédupliquer par ID
	const uniquePosts = Array.from(new Map(allPosts.map((p) => [p.id, p])).values())

	console.log(`✓ Total: ${uniquePosts.length} galeries uniques\n`)
	return uniquePosts
}

// Récupérer les détails d'une image
async function getMediaDetails(mediaId: number): Promise<WPMedia | null> {
	try {
		const media = await fetchAPI(`/media/${mediaId}`)
		return media
	} catch (error) {
		return null
	}
}

// Charger les métadonnées locales
function loadLocalMetadata(): Map<string, WPMedia> {
	const metadataPath = path.join(SAVE_DIR, 'media', '_metadata.json')

	if (!fs.existsSync(metadataPath)) {
		return new Map()
	}

	const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'))
	const map = new Map<string, WPMedia>()

	for (const item of metadata) {
		map.set(item.url, item)
	}

	return map
}

// Convertir les posts en galeries structurées
async function convertToGalleries(posts: WPPost[]): Promise<Gallery[]> {
	console.log('\n🔄 Conversion des réalisations en galeries...\n')

	const localMetadata = loadLocalMetadata()
	const galleries: Gallery[] = []

	for (const post of posts) {
		console.log(`📁 Traitement: ${post.title.rendered}`)

		// Extraire les URLs d'images du contenu
		const imageUrls = extractImageUrls(post.content.rendered)
		console.log(`   ${imageUrls.length} images trouvées`)

		// Récupérer les détails des images
		const images: Array<{ filename: string; url: string; alt: string; title: string }> = []

		for (const url of imageUrls) {
			const metadata = localMetadata.get(url)
			if (metadata) {
				images.push({
					filename: path.basename(url),
					url,
					alt: metadata.alt_text || '',
					title: stripHtml(metadata.title.rendered),
				})
			} else {
				// Image non trouvée dans les métadonnées locales
				images.push({
					filename: path.basename(url),
					url,
					alt: '',
					title: path.basename(url),
				})
			}
		}

		// Ajouter l'image featured si elle existe
		if (post.featured_media) {
			const featuredMedia = await getMediaDetails(post.featured_media)
			if (featuredMedia && !images.some((img) => img.url === featuredMedia.source_url)) {
				images.unshift({
					filename: path.basename(featuredMedia.source_url),
					url: featuredMedia.source_url,
					alt: featuredMedia.alt_text || '',
					title: stripHtml(featuredMedia.title.rendered),
				})
			}
		}

		const category = determineCategory(post.title.rendered, post.content.rendered)
		const description = stripHtml(post.excerpt.rendered) || stripHtml(post.content.rendered).substring(0, 300)

		galleries.push({
			title: stripHtml(post.title.rendered),
			slug: post.slug,
			description,
			category,
			images,
			publishedDate: post.date,
		})

		console.log(`   ✓ Catégorie: ${category}`)
		console.log(`   ✓ ${images.length} images dans la galerie\n`)
	}

	return galleries
}

// Sauvegarder les galeries
function saveGalleries(galleries: Gallery[]) {
	const outputPath = path.join(SAVE_DIR, 'galleries-structure.json')

	fs.writeFileSync(outputPath, JSON.stringify(galleries, null, 2))

	console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
	console.log('✅ GALERIES EXTRAITES !')
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
	console.log(`\n📁 Structure sauvegardée dans: ${outputPath}`)
	console.log(`\n📊 Résumé:`)
	console.log(`   - Total de galeries: ${galleries.length}`)

	const byCategory = galleries.reduce(
		(acc, g) => {
			acc[g.category] = (acc[g.category] || 0) + 1
			return acc
		},
		{} as Record<string, number>
	)

	console.log(`\n   Par catégorie:`)
	for (const [cat, count] of Object.entries(byCategory)) {
		console.log(`     - ${cat}: ${count}`)
	}

	// Afficher la liste des galeries
	console.log(`\n   Liste des galeries:`)
	galleries.forEach((g, i) => {
		console.log(`     ${i + 1}. ${g.title} (${g.category}) - ${g.images.length} images`)
	})
}

// Fonction principale
async function main() {
	console.log('🚀 Extraction des galeries WordPress\n')

	const posts = await getAllRealisations()

	if (posts.length === 0) {
		console.log('❌ Aucune galerie trouvée')
		return
	}

	const galleries = await convertToGalleries(posts)
	saveGalleries(galleries)
}

main().catch(console.error)
