/**
 * Script pour analyser en détail chaque galerie WordPress
 * et extraire les URLs exactes des images
 */

import https from 'node:https'
import * as cheerio from 'cheerio'
import fs from 'node:fs'
import path from 'node:path'

const BASE_URL = 'https://cinquin-maeva.com'

// URLs des galeries WordPress (réalisations)
const GALLERY_URLS = [
	'https://cinquin-maeva.com/realisations/maquillage-artistique-cirque/',
	'https://cinquin-maeva.com/realisations/collection-mi-ange-mi-demon/',
	'https://cinquin-maeva.com/realisations/maquillage-naturel/',
	'https://cinquin-maeva.com/realisations/maquillage-evenementiel-halloween/',
	'https://cinquin-maeva.com/realisations/maquillage-beaute/',
	'https://cinquin-maeva.com/realisations/salon-du-mariage/',
	'https://cinquin-maeva.com/realisations/nail-art/',
]

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

// Extraire les informations d'une galerie
async function analyzeGallery(url: string) {
	console.log(`\n🔍 Analyse: ${url}`)
	const html = await fetchPage(url)
	if (!html) {
		console.log('   ❌ Impossible de récupérer la page')
		return null
	}

	const $ = cheerio.load(html)
	const title = $('h1').first().text().trim() || path.basename(url)
	const slug = path.basename(url)

	console.log(`   Titre: ${title}`)
	console.log(`   Slug: ${slug}`)

	// Extraire toutes les images
	const images: string[] = []
	const imageFilenames: string[] = []

	// Chercher dans le contenu principal
	$('img').each((_, elem) => {
		const src = $(elem).attr('src')
		if (src && !src.includes('logo') && !src.includes('icon') && !src.includes('avatar')) {
			const fullUrl = src.startsWith('http') ? src : `${BASE_URL}${src}`
			if (!images.includes(fullUrl)) {
				images.push(fullUrl)
				const filename = path.basename(new URL(fullUrl).pathname)
				imageFilenames.push(filename)
			}
		}
	})

	// Chercher aussi dans les liens (parfois les galeries utilisent des liens vers les images)
	$('a[href*=".jpg"], a[href*=".jpeg"], a[href*=".png"]').each((_, elem) => {
		const href = $(elem).attr('href')
		if (href) {
			const fullUrl = href.startsWith('http') ? href : `${BASE_URL}${href}`
			if (!images.includes(fullUrl)) {
				images.push(fullUrl)
				const filename = path.basename(new URL(fullUrl).pathname)
				imageFilenames.push(filename)
			}
		}
	})

	console.log(`   📸 ${images.length} images trouvées`)

	// Afficher les 5 premiers noms de fichiers comme aperçu
	console.log(`   📝 Aperçu des fichiers:`)
	imageFilenames.slice(0, 5).forEach((f) => console.log(`      - ${f}`))
	if (imageFilenames.length > 5) {
		console.log(`      ... et ${imageFilenames.length - 5} autres`)
	}

	return {
		title,
		slug,
		url,
		imageCount: images.length,
		images,
		imageFilenames,
	}
}

// Fonction principale
async function main() {
	console.log('🚀 Analyse détaillée des galeries WordPress\n')
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

	const results = []

	for (const url of GALLERY_URLS) {
		const result = await analyzeGallery(url)
		if (result) {
			results.push(result)
		}
		// Petit délai pour ne pas surcharger le serveur
		await new Promise((resolve) => setTimeout(resolve, 1000))
	}

	// Sauvegarder les résultats
	const outputPath = path.join(process.cwd(), 'save', 'wordpress-galleries-analysis.json')
	fs.writeFileSync(outputPath, JSON.stringify(results, null, 2))

	console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
	console.log('✅ ANALYSE TERMINÉE !')
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
	console.log(`\n📁 Résultats sauvegardés: ${outputPath}`)
	console.log(`\n📊 Résumé par galerie:`)
	results.forEach((r) => {
		console.log(`   - ${r.title}: ${r.imageCount} images`)
	})
}

main().catch(console.error)
