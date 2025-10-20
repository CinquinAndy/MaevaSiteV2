/**
 * Script pour inspecter la structure du site WordPress
 */

import * as cheerio from 'cheerio'
import https from 'node:https'

const BASE_URL = 'https://cinquin-maeva.com'

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

async function inspect() {
	console.log('🔍 Inspection du site cinquin-maeva.com\n')

	// Inspecter la homepage
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━')
	console.log('📄 HOMEPAGE')
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

	const html = await fetchPage(BASE_URL)
	if (!html) {
		console.log('❌ Impossible de récupérer la homepage')
		return
	}

	const $ = cheerio.load(html)

	// Trouver tous les liens
	const links: Record<string, number> = {}
	$('a').each((_, elem) => {
		const href = $(elem).attr('href')
		if (href && href.startsWith(BASE_URL)) {
			const cleanUrl = href.split('?')[0].split('#')[0]
			links[cleanUrl] = (links[cleanUrl] || 0) + 1
		}
	})

	console.log(`Total de liens uniques trouvés: ${Object.keys(links).length}\n`)

	// Grouper par type
	const galleries = Object.keys(links).filter((url) => url.includes('galerie'))
	const blog = Object.keys(links).filter((url) => url.includes('blog') || url.match(/\/\d{4}\/\d{2}\//))
	const other = Object.keys(links).filter((url) => !galleries.includes(url) && !blog.includes(url))

	console.log(`📸 Galeries (${galleries.length}):`)
	galleries.forEach((url) => console.log(`   ${url}`))

	console.log(`\n📰 Blog/Articles (${blog.length}):`)
	blog.forEach((url) => console.log(`   ${url}`))

	console.log(`\n📄 Autres pages (${other.length}):`)
	other.slice(0, 10).forEach((url) => console.log(`   ${url}`))
	if (other.length > 10) {
		console.log(`   ... et ${other.length - 10} autres`)
	}

	// Inspecter les menus de navigation
	console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━')
	console.log('🧭 NAVIGATION')
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

	$('nav a, .menu a').each((_, elem) => {
		const href = $(elem).attr('href')
		const text = $(elem).text().trim()
		if (href && text) {
			console.log(`   ${text} → ${href}`)
		}
	})

	// Trouver les images
	console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━')
	console.log('🖼️  IMAGES')
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

	const images: string[] = []
	$('img').each((_, elem) => {
		const src = $(elem).attr('src')
		if (src && !src.includes('logo') && !src.includes('icon')) {
			images.push(src)
		}
	})

	console.log(`Total d'images sur la homepage: ${images.length}`)
	images.slice(0, 5).forEach((img) => console.log(`   ${img}`))
	if (images.length > 5) {
		console.log(`   ... et ${images.length - 5} autres`)
	}
}

inspect().catch(console.error)
