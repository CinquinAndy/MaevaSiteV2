/**
 * Script pour récupérer les images via l'API WordPress REST
 * Plus fiable que le scraping HTML
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
	media_details: {
		width: number
		height: number
		file: string
	}
}

interface WPPost {
	id: number
	title: { rendered: string }
	slug: string
	content: { rendered: string }
	featured_media: number
	categories: number[]
}

// Créer les dossiers
function ensureDirectories() {
	const dirs = [
		SAVE_DIR,
		path.join(SAVE_DIR, 'galleries'),
		path.join(SAVE_DIR, 'blog'),
		path.join(SAVE_DIR, 'media'),
	]

	for (const dir of dirs) {
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true })
		}
	}
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

// Télécharger une image
async function downloadImage(url: string, filepath: string): Promise<boolean> {
	return new Promise((resolve) => {
		if (fs.existsSync(filepath)) {
			console.log(`⊘ Déjà téléchargé: ${path.basename(filepath)}`)
			resolve(true)
			return
		}

		const file = fs.createWriteStream(filepath)

		https
			.get(url, (response) => {
				if (response.statusCode === 200) {
					response.pipe(file)
					file.on('finish', () => {
						file.close()
						console.log(`✓ Téléchargé: ${path.basename(filepath)}`)
						resolve(true)
					})
				} else {
					fs.unlink(filepath, () => {})
					console.error(`✗ Erreur ${response.statusCode}`)
					resolve(false)
				}
			})
			.on('error', (err) => {
				fs.unlink(filepath, () => {})
				console.error(`✗ Erreur: ${err.message}`)
				resolve(false)
			})
	})
}

// Récupérer toutes les images de la médiathèque
async function getAllMedia(): Promise<WPMedia[]> {
	console.log('\n📸 Récupération de la médiathèque WordPress...')

	const allMedia: WPMedia[] = []
	let page = 1
	let hasMore = true

	while (hasMore) {
		try {
			const media = await fetchAPI(`/media?per_page=100&page=${page}`)

			if (!media || media.length === 0) {
				hasMore = false
			} else {
				allMedia.push(...media)
				console.log(`   Page ${page}: ${media.length} images`)
				page++
			}
		} catch (error) {
			hasMore = false
		}
	}

	console.log(`✓ Total: ${allMedia.length} images\n`)
	return allMedia
}

// Récupérer tous les posts (réalisations/blog)
async function getAllPosts(postType: string = 'posts'): Promise<WPPost[]> {
	console.log(`\n📄 Récupération des ${postType}...`)

	const allPosts: WPPost[] = []
	let page = 1
	let hasMore = true

	while (hasMore) {
		try {
			const posts = await fetchAPI(`/${postType}?per_page=100&page=${page}`)

			if (!posts || posts.length === 0) {
				hasMore = false
			} else {
				allPosts.push(...posts)
				console.log(`   Page ${page}: ${posts.length} posts`)
				page++
			}
		} catch (error) {
			hasMore = false
		}
	}

	console.log(`✓ Total: ${allPosts.length} ${postType}\n`)
	return allPosts
}

// Télécharger toutes les images
async function downloadAllMedia(media: WPMedia[]) {
	console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
	console.log('💾 TÉLÉCHARGEMENT DES IMAGES')
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

	let downloaded = 0
	let skipped = 0

	for (const item of media) {
		const filename = path.basename(item.source_url)
		const filepath = path.join(SAVE_DIR, 'media', filename)

		const success = await downloadImage(item.source_url, filepath)
		if (success) {
			if (fs.existsSync(filepath) && fs.statSync(filepath).size > 0) {
				downloaded++
			} else {
				skipped++
			}
		} else {
			skipped++
		}

		// Rate limiting
		await new Promise((resolve) => setTimeout(resolve, 100))
	}

	console.log(`\n✓ Téléchargées: ${downloaded}`)
	console.log(`⊘ Ignorées: ${skipped}`)

	// Sauvegarder les métadonnées
	const metadataPath = path.join(SAVE_DIR, 'media', '_metadata.json')
	fs.writeFileSync(
		metadataPath,
		JSON.stringify(
			media.map((m) => ({
				id: m.id,
				filename: path.basename(m.source_url),
				title: m.title.rendered,
				alt: m.alt_text,
				url: m.source_url,
			})),
			null,
			2
		)
	)
	console.log(`✓ Métadonnées sauvegardées`)
}

// Fonction principale
async function main() {
	console.log('🚀 Récupération des données WordPress via API REST\n')

	ensureDirectories()

	try {
		// Récupérer toute la médiathèque
		const media = await getAllMedia()

		if (media.length > 0) {
			await downloadAllMedia(media)
		}

		// Optionnel : récupérer les posts
		// const posts = await getAllPosts('posts')
		// const realisations = await getAllPosts('realisations') // Si custom post type

		console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
		console.log('✅ TERMINÉ !')
		console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
		console.log(`\n📁 Images dans: ${path.join(SAVE_DIR, 'media')}`)
	} catch (error) {
		console.error('\n❌ Erreur:', error)
	}
}

main().catch(console.error)
