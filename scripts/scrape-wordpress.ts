/**
 * Script pour scraper toutes les images du site WordPress cinquin-maeva.com
 * et les organiser par catégorie dans le dossier save/
 */

import * as cheerio from 'cheerio'
import fs from 'node:fs'
import https from 'node:https'
import path from 'node:path'

const BASE_URL = 'https://cinquin-maeva.com'
const SAVE_DIR = path.join(process.cwd(), 'save')

interface ImageData {
	url: string
	category: string
	title?: string
	alt?: string
	pageUrl: string
}

// Créer les dossiers nécessaires
function ensureDirectories() {
	const dirs = [
		SAVE_DIR,
		path.join(SAVE_DIR, 'galleries'),
		path.join(SAVE_DIR, 'galleries', 'mariage'),
		path.join(SAVE_DIR, 'galleries', 'artistique'),
		path.join(SAVE_DIR, 'galleries', 'nail-art'),
		path.join(SAVE_DIR, 'galleries', 'evenementiel'),
		path.join(SAVE_DIR, 'blog'),
		path.join(SAVE_DIR, 'other'),
	]

	for (const dir of dirs) {
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true })
			console.log(`✓ Dossier créé: ${dir}`)
		}
	}
}

// Télécharger une image
async function downloadImage(url: string, filepath: string): Promise<boolean> {
	return new Promise((resolve) => {
		// Si le fichier existe déjà, on skip
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
					console.error(`✗ Erreur ${response.statusCode} pour: ${url}`)
					resolve(false)
				}
			})
			.on('error', (err) => {
				fs.unlink(filepath, () => {})
				console.error(`✗ Erreur de téléchargement: ${err.message}`)
				resolve(false)
			})
	})
}

// Fetch HTML d'une page
async function fetchPage(url: string): Promise<string | null> {
	return new Promise((resolve) => {
		https
			.get(url, (res) => {
				let data = ''
				res.on('data', (chunk) => {
					data += chunk
				})
				res.on('end', () => {
					resolve(data)
				})
			})
			.on('error', (err) => {
				console.error(`Erreur fetch ${url}:`, err.message)
				resolve(null)
			})
	})
}

// Extraire les URLs de galerie depuis la page réalisations
async function getGalleryPages(): Promise<string[]> {
	console.log('\n📂 Récupération des pages de réalisations...')
	const html = await fetchPage(`${BASE_URL}/realisations/`)
	if (!html) return []

	const $ = cheerio.load(html)
	const galleryUrls: string[] = []

	// Chercher tous les liens vers les réalisations
	$('a').each((_, elem) => {
		const href = $(elem).attr('href')
		if (href) {
			const fullUrl = href.startsWith('http') ? href : `${BASE_URL}${href}`

			// Filtrer pour ne garder que les réalisations individuelles
			if (
				fullUrl.includes('/realisations/') &&
				!fullUrl.endsWith('/realisations') &&
				!fullUrl.endsWith('/realisations/') &&
				fullUrl !== BASE_URL &&
				!galleryUrls.includes(fullUrl)
			) {
				galleryUrls.push(fullUrl)
			}
		}
	})

	console.log(`✓ Trouvé ${galleryUrls.length} réalisations`)
	galleryUrls.forEach((url) => console.log(`   - ${url}`))
	return galleryUrls
}

// Extraire les URLs d'articles depuis la page blog
async function getBlogPages(): Promise<string[]> {
	console.log('\n📰 Récupération des articles de blog...')

	const blogUrls: string[] = []

	// Essayer différentes URLs possibles pour le blog WordPress
	const possibleBlogUrls = [`${BASE_URL}/blog`, `${BASE_URL}/actualites`, `${BASE_URL}/articles`]

	for (const blogUrl of possibleBlogUrls) {
		const html = await fetchPage(blogUrl)
		if (!html) continue

		const $ = cheerio.load(html)

		// Chercher tous les liens
		$('a').each((_, elem) => {
			const href = $(elem).attr('href')
			if (href) {
				const fullUrl = href.startsWith('http') ? href : `${BASE_URL}${href}`

				// Filtrer pour ne garder que les articles (éviter les pages système)
				if (
					(fullUrl.includes('/blog/') ||
						fullUrl.includes('/actualites/') ||
						fullUrl.includes('/articles/') ||
						fullUrl.match(/\/\d{4}\/\d{2}\//)) && // Format date WordPress
					!fullUrl.includes('wp-admin') &&
					!fullUrl.includes('wp-content') &&
					!fullUrl.includes('wp-json') &&
					fullUrl !== blogUrl &&
					!blogUrls.includes(fullUrl)
				) {
					blogUrls.push(fullUrl)
				}
			}
		})
	}

	console.log(`✓ Trouvé ${blogUrls.length} articles`)
	blogUrls.forEach((url) => console.log(`   - ${url}`))
	return [...new Set(blogUrls)] // Dédupliquer
}

// Déterminer la catégorie d'une galerie
function determineGalleryCategory(url: string, title: string): string {
	const lowerUrl = url.toLowerCase()
	const lowerTitle = title.toLowerCase()

	if (lowerUrl.includes('mariage') || lowerTitle.includes('mariage')) return 'mariage'
	if (lowerUrl.includes('artistique') || lowerTitle.includes('artistique')) return 'artistique'
	if (lowerUrl.includes('nail') || lowerTitle.includes('nail') || lowerTitle.includes('ongle')) return 'nail-art'
	if (lowerUrl.includes('event') || lowerTitle.includes('événement')) return 'evenementiel'

	return 'other'
}

// Scraper une galerie
async function scrapeGallery(url: string): Promise<void> {
	console.log(`\n🖼️  Scraping galerie: ${url}`)
	const html = await fetchPage(url)
	if (!html) return

	const $ = cheerio.load(html)
	const title = $('h1').first().text().trim() || path.basename(url)
	const category = determineGalleryCategory(url, title)

	console.log(`   Catégorie détectée: ${category}`)
	console.log(`   Titre: ${title}`)

	const images: ImageData[] = []

	// Chercher toutes les images
	$('img').each((_, elem) => {
		const src = $(elem).attr('src')
		const alt = $(elem).attr('alt') || ''

		if (src && !src.includes('logo') && !src.includes('icon')) {
			const fullUrl = src.startsWith('http') ? src : `${BASE_URL}${src}`
			images.push({
				url: fullUrl,
				category,
				title,
				alt,
				pageUrl: url,
			})
		}
	})

	console.log(`   Trouvé ${images.length} images`)

	// Télécharger les images
	for (const img of images) {
		const filename = path.basename(new URL(img.url).pathname)
		const filepath = path.join(SAVE_DIR, 'galleries', category, filename)
		await downloadImage(img.url, filepath)
		await new Promise((resolve) => setTimeout(resolve, 200)) // Rate limiting
	}

	// Sauvegarder les métadonnées
	const metadataPath = path.join(SAVE_DIR, 'galleries', category, '_metadata.json')
	const metadata = {
		title,
		url,
		category,
		images: images.map((img) => ({
			filename: path.basename(new URL(img.url).pathname),
			alt: img.alt,
		})),
	}

	fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2))
	console.log(`   ✓ Métadonnées sauvegardées`)
}

// Scraper un article de blog
async function scrapeBlogPost(url: string): Promise<void> {
	console.log(`\n📝 Scraping article: ${url}`)
	const html = await fetchPage(url)
	if (!html) return

	const $ = cheerio.load(html)
	const title = $('h1').first().text().trim() || path.basename(url)

	console.log(`   Titre: ${title}`)

	const images: ImageData[] = []

	// Chercher toutes les images
	$('img').each((_, elem) => {
		const src = $(elem).attr('src')
		const alt = $(elem).attr('alt') || ''

		if (src && !src.includes('logo') && !src.includes('icon')) {
			const fullUrl = src.startsWith('http') ? src : `${BASE_URL}${src}`
			images.push({
				url: fullUrl,
				category: 'blog',
				title,
				alt,
				pageUrl: url,
			})
		}
	})

	console.log(`   Trouvé ${images.length} images`)

	// Créer un sous-dossier pour l'article
	const slug = path.basename(url)
	const articleDir = path.join(SAVE_DIR, 'blog', slug)
	if (!fs.existsSync(articleDir)) {
		fs.mkdirSync(articleDir, { recursive: true })
	}

	// Télécharger les images
	for (const img of images) {
		const filename = path.basename(new URL(img.url).pathname)
		const filepath = path.join(articleDir, filename)
		await downloadImage(img.url, filepath)
		await new Promise((resolve) => setTimeout(resolve, 200)) // Rate limiting
	}

	// Sauvegarder les métadonnées
	const metadataPath = path.join(articleDir, '_metadata.json')
	const metadata = {
		title,
		url,
		images: images.map((img) => ({
			filename: path.basename(new URL(img.url).pathname),
			alt: img.alt,
		})),
	}

	fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2))
	console.log(`   ✓ Métadonnées sauvegardées`)
}

// Fonction principale
async function main() {
	console.log('🚀 Démarrage du scraping de cinquin-maeva.com\n')

	// Créer les dossiers
	ensureDirectories()

	// Récupérer les URLs
	const galleryUrls = await getGalleryPages()
	const blogUrls = await getBlogPages()

	// Scraper les galeries
	console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
	console.log('📸 SCRAPING DES GALERIES')
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

	for (const url of galleryUrls) {
		await scrapeGallery(url)
	}

	// Scraper les articles
	console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
	console.log('📰 SCRAPING DES ARTICLES')
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

	for (const url of blogUrls) {
		await scrapeBlogPost(url)
	}

	console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
	console.log('✅ SCRAPING TERMINÉ !')
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
	console.log(`\n📁 Images sauvegardées dans: ${SAVE_DIR}`)
}

// Exécution
main().catch(console.error)
