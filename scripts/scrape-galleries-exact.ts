/**
 * Script pour extraire les images EXACTES depuis les galeries WordPress
 * en ciblant les <ul class="gridMaeva">
 */

import * as cheerio from 'cheerio'
import fs from 'node:fs'
import https from 'node:https'
import path from 'node:path'

const BASE_URL = 'https://cinquin-maeva.com'
const SAVE_DIR = path.join(process.cwd(), 'save', 'galleries-exact')

// Configuration des galeries avec leurs URLs WordPress
const GALLERIES = [
	{
		title: 'Collection Mi-ange Mi-démon',
		slug: 'collection-mi-ange-mi-demon',
		url: 'https://cinquin-maeva.com/mi-ange-mi-demon/',
		category: 'artistique',
	},
	{
		title: 'Maquillage Artistique',
		slug: 'maquillage-artistique',
		url: 'https://cinquin-maeva.com/maquillage-artistique-galerie/',
		category: 'artistique',
	},
	{
		title: 'Maquillage Naturel',
		slug: 'maquillage-naturel',
		url: 'https://cinquin-maeva.com/maquillage-naturel-galerie/',
		category: 'mariage',
	},
	{
		title: 'Maquillage Événementiel',
		slug: 'maquillage-evenementiel',
		url: 'https://cinquin-maeva.com/maquillage-evenementiel-galerie/',
		category: 'evenementiel',
	},
	{
		title: 'Maquillage Beauté',
		slug: 'maquillage-beaute',
		url: 'https://cinquin-maeva.com/maquillage-beaute-galerie/',
		category: 'mariage',
	},
	{
		title: 'Salon du Mariage',
		slug: 'salon-du-mariage',
		url: 'https://cinquin-maeva.com/salon-mariage-maquilleuse-professionnel/',
		category: 'mariage',
	},
	{
		title: 'Nail Art',
		slug: 'nail-art',
		url: 'https://cinquin-maeva.com/nail-art/',
		category: 'nail-art',
	},
]

interface GalleryImage {
	url: string
	filename: string
	alt: string
}

interface GalleryData {
	title: string
	slug: string
	category: string
	url: string
	images: GalleryImage[]
}

// Créer les dossiers
function ensureDirectories() {
	if (!fs.existsSync(SAVE_DIR)) {
		fs.mkdirSync(SAVE_DIR, { recursive: true })
	}
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

// Télécharger une image
async function downloadImage(url: string, filepath: string): Promise<boolean> {
	return new Promise((resolve) => {
		if (fs.existsSync(filepath)) {
			console.log(`   ⊘ Déjà téléchargé: ${path.basename(filepath)}`)
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
						console.log(`   ✓ Téléchargé: ${path.basename(filepath)}`)
						resolve(true)
					})
				} else {
					fs.unlink(filepath, () => {})
					console.error(`   ✗ Erreur ${response.statusCode}`)
					resolve(false)
				}
			})
			.on('error', (err) => {
				fs.unlink(filepath, () => {})
				console.error(`   ✗ Erreur: ${err.message}`)
				resolve(false)
			})
	})
}

// Extraire les images d'une galerie
async function extractGalleryImages(gallery: typeof GALLERIES[0]): Promise<GalleryData | null> {
	console.log(`\n📸 Extraction: ${gallery.title}`)
	console.log(`   URL: ${gallery.url}`)

	const html = await fetchPage(gallery.url)
	if (!html) {
		console.log('   ❌ Impossible de récupérer la page')
		return null
	}

	const $ = cheerio.load(html)
	const images: GalleryImage[] = []

	// Cibler spécifiquement <ul class="gridMaeva">
	$('ul.gridMaeva img').each((_, elem) => {
		const src = $(elem).attr('src')
		const alt = $(elem).attr('alt') || ''

		if (src) {
			const fullUrl = src.startsWith('http') ? src : `${BASE_URL}${src}`
			const filename = path.basename(new URL(fullUrl).pathname)

			images.push({
				url: fullUrl,
				filename,
				alt,
			})
		}
	})

	console.log(`   ✓ ${images.length} images trouvées`)

	return {
		title: gallery.title,
		slug: gallery.slug,
		category: gallery.category,
		url: gallery.url,
		images,
	}
}

// Télécharger les images d'une galerie
async function downloadGalleryImages(galleryData: GalleryData) {
	console.log(`\n💾 Téléchargement: ${galleryData.title}`)

	const galleryDir = path.join(SAVE_DIR, galleryData.slug)
	if (!fs.existsSync(galleryDir)) {
		fs.mkdirSync(galleryDir, { recursive: true })
	}

	for (const image of galleryData.images) {
		const filepath = path.join(galleryDir, image.filename)
		await downloadImage(image.url, filepath)
		// Rate limiting
		await new Promise((resolve) => setTimeout(resolve, 200))
	}

	// Sauvegarder les métadonnées
	const metadataPath = path.join(galleryDir, '_metadata.json')
	fs.writeFileSync(
		metadataPath,
		JSON.stringify(
			{
				title: galleryData.title,
				slug: galleryData.slug,
				category: galleryData.category,
				url: galleryData.url,
				imageCount: galleryData.images.length,
				images: galleryData.images,
			},
			null,
			2
		)
	)
	console.log('   ✓ Métadonnées sauvegardées')
}

// Générer galleries-config.json avec les noms exacts
function generateConfig(galleriesData: GalleryData[]) {
	const config = galleriesData.map((gallery) => ({
		title: gallery.title,
		slug: gallery.slug,
		description: getDescription(gallery.slug),
		category: gallery.category,
		// Utiliser les noms de fichiers exacts comme keywords
		keywords: gallery.images.map((img) => img.filename),
	}))

	const outputPath = path.join(process.cwd(), 'scripts', 'galleries-config.json')
	fs.writeFileSync(outputPath, JSON.stringify(config, null, 2))

	console.log(`\n✅ Configuration générée: ${outputPath}`)
}

// Descriptions des galeries
function getDescription(slug: string): string {
	const descriptions: Record<string, string> = {
		'collection-mi-ange-mi-demon':
			'Une collection unique, intitulée « Mi ange Mi démon ». Nous avons tous un côté ange et un côté démon, et cette collection est une invitation à explorer et à célébrer cette dualité.',
		'maquillage-artistique':
			'Maquillage artistique créatif. Des créations colorées et originales qui explorent l\'art du maquillage de manière audacieuse et expressive.',
		'maquillage-naturel':
			'Maquillage naturel et frais pour sublimer votre beauté au quotidien. Un look léger et lumineux qui met en valeur vos atouts naturels.',
		'maquillage-evenementiel':
			"Maquillages créatifs pour événements spéciaux. Des créations uniques adaptées à chaque occasion, d'Halloween aux fêtes costumées.",
		'maquillage-beaute':
			'Maquillage beauté professionnel pour toutes les occasions. Un maquillage soigné qui sublime vos traits et révèle votre éclat.',
		'salon-du-mariage':
			'Présence et démonstrations lors du salon du mariage. Découvrez mes créations et prestations pour sublimer votre jour J.',
		'nail-art':
			'Créations artistiques sur ongles. Manucure professionnelle avec designs variés, paillettes et strass pour des ongles qui brillent.',
	}
	return descriptions[slug] || ''
}

// Fonction principale
async function main() {
	console.log('🚀 Extraction exacte des galeries WordPress\n')
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

	ensureDirectories()

	const galleriesData: GalleryData[] = []

	// Extraire les images de chaque galerie
	for (const gallery of GALLERIES) {
		const data = await extractGalleryImages(gallery)
		if (data) {
			galleriesData.push(data)
		}
		// Délai entre les requêtes
		await new Promise((resolve) => setTimeout(resolve, 1000))
	}

	console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
	console.log('📊 RÉSUMÉ DE L\'EXTRACTION')
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

	for (const gallery of galleriesData) {
		console.log(`   ${gallery.title}: ${gallery.images.length} images`)
	}

	// Générer la configuration
	generateConfig(galleriesData)

	// Télécharger les images
	console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
	console.log('💾 TÉLÉCHARGEMENT DES IMAGES')
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

	for (const gallery of galleriesData) {
		await downloadGalleryImages(gallery)
	}

	console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
	console.log('✅ TERMINÉ !')
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
	console.log(`\n📁 Images sauvegardées dans: ${SAVE_DIR}`)
	console.log(`📁 Configuration: scripts/galleries-config.json`)
	console.log(`\nProchaine étape: pnpm import:galleries`)
}

main().catch(console.error)
