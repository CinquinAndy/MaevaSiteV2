/**
 * Script simplifié pour extraire les avis Google via recherche Google Maps
 * Utilise la recherche "cinquin maeva" directement
 */

import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { chromium } from 'playwright'

interface GoogleReview {
	author: string
	authorImage: string | null
	rating: number
	date: string
	text: string
}

async function scrapeReviewsSimple() {
	console.log('🚀 Démarrage du scraping (version simple)...\n')

	const browser = await chromium.launch({
		headless: false,
		slowMo: 50,
	})

	const context = await browser.newContext({
		userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
		locale: 'fr-FR',
		viewport: { width: 1920, height: 1080 },
	})

	const page = await context.newPage()

	try {
		// 1. Aller directement sur l'URL de recherche Google Maps
		console.log('📍 Recherche de "cinquin maeva" sur Google Maps...')
		const searchUrl = 'https://www.google.com/maps/search/cinquin+maeva/@46.3708,6.4792,13z'
		await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 30000 })
		await page.waitForTimeout(3000)

		// 2. Gérer la popup de consentement des cookies
		console.log('🍪 Gestion de la popup de cookies...')
		try {
			// Bouton "Tout accepter" ou "Accept all"
			const acceptButton = page
				.locator('button')
				.filter({ hasText: /tout accepter|accept all|accepter tout/i })
				.first()
			await acceptButton.waitFor({ state: 'visible', timeout: 5000 })
			await acceptButton.click()
			console.log('   ✓ Cookies acceptés')
			await page.waitForTimeout(2000)
		} catch {
			// Essayer le bouton "Tout refuser" ou autre variante
			try {
				const rejectButton = page
					.locator('button')
					.filter({ hasText: /tout refuser|reject all/i })
					.first()
				await rejectButton.click()
				console.log('   ✓ Cookies refusés')
				await page.waitForTimeout(2000)
			} catch {
				console.log('   ⚠️  Pas de popup de cookies (déjà accepté?)')
			}
		}

		console.log('✅ Page de recherche chargée\n')

		// 3. Extraire le nom de l'entreprise
		const businessName =
			(await page
				.locator('h1[class*="fontHeadline"], h1')
				.first()
				.textContent()
				.catch(() => null)) || 'Cinquin Maeva'

		console.log(`🏢 Entreprise: ${businessName}`)

		// 4. Extraire la note globale
		const ratingText =
			(await page
				.locator('div[class*="fontDisplayLarge"]:has-text("★"), span:has-text("★")')
				.first()
				.textContent()
				.catch(() => null)) || '0'

		const averageRating = parseFloat(ratingText.replace(',', '.').replace(/[^0-9.]/g, '')) || 0
		console.log(`⭐ Note moyenne: ${averageRating}/5`)

		// 5. Cliquer sur les avis
		try {
			const reviewsButton = page.locator('button').filter({ hasText: /avis/i }).first()
			await reviewsButton.waitFor({ state: 'visible', timeout: 5000 })
			await reviewsButton.click()
			await page.waitForTimeout(3000)
			console.log('👆 Onglet Avis ouvert\n')
		} catch {
			console.log('⚠️  Bouton Avis non trouvé, continue...\n')
		}

		// 6. Scroll pour charger plus d'avis
		console.log('📜 Chargement des avis...')
		for (let i = 0; i < 10; i++) {
			await page.keyboard.press('PageDown')
			await page.waitForTimeout(1000)
		}

		// 7. Cliquer sur tous les boutons "Plus" pour étendre les avis
		console.log('📖 Expansion des avis tronqués...')
		const moreButtons = page.locator('button[aria-label*="voir"], button').filter({ hasText: /plus/i })
		const count = await moreButtons.count()

		for (let i = 0; i < Math.min(count, 50); i++) {
			try {
				await moreButtons.nth(i).click({ timeout: 500 })
				await page.waitForTimeout(100)
			} catch {
				// Ignorer si le bouton n'est plus disponible
			}
		}

		// 8. Extraire les avis
		console.log('\n🔍 Extraction des avis...')
		const reviews: GoogleReview[] = []

		// Chercher tous les conteneurs d'avis
		const reviewContainers = page.locator('div[data-review-id], div[jslog*="review"]')
		const reviewCount = await reviewContainers.count()
		console.log(`   Trouvé ${reviewCount} avis potentiels`)

		for (let i = 0; i < reviewCount; i++) {
			try {
				const container = reviewContainers.nth(i)

				// Nom de l'auteur
				const authorElement = container.locator('div[class*="d4r55"], button[aria-label]').first()
				const author =
					(await authorElement.textContent().catch(() => null)) ||
					(await authorElement.getAttribute('aria-label').catch(() => null)) ||
					'Anonyme'

				// Image de profil de l'auteur
				const authorImage =
					(await container
						.locator('img[class*="NBa7we"], button img, a img')
						.first()
						.getAttribute('src')
						.catch(() => null)) || null

				// Note (étoiles)
				const ratingAttr = await container
					.locator('span[role="img"][aria-label*="étoile"]')
					.first()
					.getAttribute('aria-label')
					.catch(() => null)
				const rating = ratingAttr ? parseInt(ratingAttr.match(/\d+/)?.[0] || '5', 10) : 5

				// Date
				const date =
					(await container
						.locator('span[class*="rsqaWe"]')
						.first()
						.textContent()
						.catch(() => null)) || ''

				// Texte de l'avis
				const text =
					(await container
						.locator('span[class*="wiI7pd"], div[class*="MyEned"]')
						.first()
						.textContent()
						.catch(() => null)) || ''

				if (author && text) {
					reviews.push({
						author: author.trim(),
						authorImage,
						rating,
						date: date.trim(),
						text: text.trim(),
					})
				}
			} catch (error) {
				// Ignorer les avis qui ne peuvent pas être extraits
			}
		}

		console.log(`✅ ${reviews.length} avis extraits avec succès!\n`)

		// 9. Sauvegarder les données
		const data = {
			businessName: businessName.trim(),
			averageRating,
			totalReviews: reviews.length,
			extractedAt: new Date().toISOString(),
			reviews,
		}

		const outputPath = join(process.cwd(), 'reviews-data', 'google-reviews.json')
		writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8')

		console.log('📊 Résumé:')
		console.log(`   Entreprise: ${data.businessName}`)
		console.log(`   Note moyenne: ${data.averageRating}/5`)
		console.log(`   Avis extraits: ${data.reviews.length}`)
		console.log(`   Sauvegardé dans: ${outputPath}`)

		console.log('\n✅ Scraping terminé avec succès!')

		return data
	} finally {
		await page.waitForTimeout(2000)
		await browser.close()
	}
}

scrapeReviewsSimple().catch(error => {
	console.error('❌ Erreur:', error)
	process.exit(1)
})
