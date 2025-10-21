/**
 * Script pour extraire les avis Google de Maeva Cinquin
 * Utilise Playwright pour automatiser la navigation et extraire les données
 */

import { chromium, type Browser, type Page } from "playwright";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

interface GoogleReview {
	author: string;
	authorImage?: string;
	rating: number;
	date: string;
	text: string;
	response?: {
		text: string;
		date: string;
	};
}

interface ReviewsData {
	businessName: string;
	averageRating: number;
	totalReviews: number;
	placeId?: string;
	extractedAt: string;
	reviews: GoogleReview[];
}

/**
 * Extraire les avis Google depuis une URL de profil Google Business
 */
async function scrapeGoogleReviews(url: string): Promise<ReviewsData> {
	console.log("🚀 Démarrage du scraping des avis Google...");

	const browser: Browser = await chromium.launch({
		headless: false, // Mettre à true pour exécution en arrière-plan
		slowMo: 100, // Ralentir pour éviter la détection
	});

	const context = await browser.newContext({
		userAgent:
			"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
		locale: "fr-FR",
		viewport: { width: 1920, height: 1080 },
	});

	const page: Page = await context.newPage();

	try {
		console.log("📱 Navigation vers la page Google...");
		await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

		// Attendre que la page se charge
		await page.waitForTimeout(5000);

		// Extraire le nom de l'entreprise
		const businessName =
			(await page.locator('h1, h2').filter({ hasText: /makeup|maquillage/i }).first().textContent().catch(() => null)) ||
			(await page.locator('h1').first().textContent().catch(() => null)) ||
			"Makeup.Artist.Dream";

		console.log(`🏢 Entreprise: ${businessName}`);

		// Cliquer sur l'onglet des avis
		try {
			const reviewsTab = page.locator('button[role="tab"]').filter({ hasText: /avis|reviews/i }).first();
			await reviewsTab.waitFor({ state: "visible", timeout: 10000 });
			console.log("👆 Clic sur l'onglet Avis...");
			await reviewsTab.click();
			await page.waitForTimeout(3000);
		} catch (error) {
			console.log("⚠️  Onglet Avis non trouvé, peut-être déjà sur la page des avis");
		}

		// Faire défiler pour charger plus d'avis
		console.log("📜 Chargement de tous les avis...");
		await scrollToLoadReviews(page);

		// Extraire les statistiques globales
		const ratingText = await page
			.locator('div[class*="fontDisplayLarge"], span[class*="fontDisplayLarge"]')
			.first()
			.textContent()
			.catch(() => "0");

		const averageRating = parseFloat(ratingText?.replace(",", ".") || "0");

		const totalReviewsText = await page
			.locator('button:has-text("avis"), div:has-text("avis")')
			.first()
			.textContent()
			.catch(() => "0 avis");

		const totalReviews = parseInt(totalReviewsText?.match(/\d+/)?.[0] || "0", 10);

		console.log(`⭐ Note moyenne: ${averageRating}/5`);
		console.log(`📊 Total d'avis: ${totalReviews}`);

		// Extraire tous les avis
		console.log("📝 Extraction des avis...");
		const reviews: GoogleReview[] = await extractReviews(page);

		console.log(`✅ ${reviews.length} avis extraits avec succès!`);

		const data: ReviewsData = {
			businessName: businessName || "Makeup.Artist.Dream",
			averageRating,
			totalReviews,
			extractedAt: new Date().toISOString(),
			reviews,
		};

		return data;
	} finally {
		await browser.close();
	}
}

/**
 * Faire défiler la liste des avis pour charger tous les avis
 */
async function scrollToLoadReviews(page: Page): Promise<void> {
	try {
		// Trouver le conteneur scrollable (Google Maps utilise souvent un div avec overflow)
		const scrollableSelector = 'div[role="feed"], div[class*="m6QErb"], div[aria-label*="avis"]';
		const scrollableContainer = page.locator(scrollableSelector).first();

		await scrollableContainer.waitFor({ state: "visible", timeout: 5000 }).catch(() => {
			console.log("   ⚠️  Conteneur scrollable non trouvé");
		});

		let previousHeight = 0;
		let currentHeight = await scrollableContainer.evaluate((el) => el.scrollHeight).catch(() => 0);

		let attempts = 0;
		const maxAttempts = 15;

		while (currentHeight > previousHeight && attempts < maxAttempts) {
			previousHeight = currentHeight;

			// Scroll vers le bas
			await scrollableContainer
				.evaluate((el) => {
					el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
				})
				.catch(() => {});

			await page.waitForTimeout(2000);

			currentHeight = await scrollableContainer.evaluate((el) => el.scrollHeight).catch(() => currentHeight);

			attempts++;
			console.log(`   ↓ Scroll ${attempts}/${maxAttempts} (hauteur: ${currentHeight}px)`);
		}

		console.log(`   ✓ Scrollé ${attempts} fois pour charger les avis`);
	} catch (error) {
		console.log("   ⚠️  Erreur lors du scroll:", error);
	}
}

/**
 * Extraire les détails de chaque avis
 */
async function extractReviews(page: Page): Promise<GoogleReview[]> {
	// Cliquer sur "Plus" pour afficher le texte complet de chaque avis
	const moreButtons = page.locator('button:has-text("Plus"), button[aria-label*="voir"]');
	const moreButtonCount = await moreButtons.count();

	console.log(`   📖 ${moreButtonCount} boutons "Plus" trouvés, expansion des avis...`);

	for (let i = 0; i < moreButtonCount; i++) {
		try {
			await moreButtons.nth(i).click({ timeout: 1000 });
			await page.waitForTimeout(200);
		} catch {
			// Ignorer si le bouton n'est plus cliquable
		}
	}

	// Extraire tous les avis
	const reviewElements = page.locator('div[data-review-id], div[class*="jftiEf"]');
	const reviewCount = await reviewElements.count();

	console.log(`   🔍 Extraction de ${reviewCount} avis...`);

	const reviews: GoogleReview[] = [];

	for (let i = 0; i < reviewCount; i++) {
		try {
			const reviewElement = reviewElements.nth(i);

			// Nom de l'auteur
			const author = (await reviewElement.locator('div[class*="d4r55"]').first().textContent()) || "Anonyme";

			// Image de profil
			const authorImage =
				(await reviewElement.locator('img[class*="NBa7we"]').first().getAttribute("src")) || undefined;

			// Note (nombre d'étoiles)
			const ratingAriaLabel = await reviewElement
				.locator('span[role="img"][aria-label*="étoile"]')
				.first()
				.getAttribute("aria-label");
			const rating = parseInt(ratingAriaLabel?.match(/\d+/)?.[0] || "5", 10);

			// Date de l'avis
			const date = (await reviewElement.locator('span[class*="rsqaWe"]').first().textContent()) || "";

			// Texte de l'avis
			const text =
				(await reviewElement.locator('span[class*="wiI7pd"], div[class*="MyEned"]').first().textContent()) || "";

			// Réponse du propriétaire (si elle existe)
			let response: { text: string; date: string } | undefined;

			const responseElement = reviewElement.locator('div[class*="CDe7pd"]');
			if ((await responseElement.count()) > 0) {
				const responseText = (await responseElement.locator('div[class*="wiI7pd"]').textContent()) || "";
				const responseDate = (await responseElement.locator('span[class*="rsqaWe"]').textContent()) || "";

				if (responseText) {
					response = { text: responseText, date: responseDate };
				}
			}

			reviews.push({
				author: author.trim(),
				authorImage,
				rating,
				date: date.trim(),
				text: text.trim(),
				response,
			});
		} catch (error) {
			console.error(`   ⚠️  Erreur lors de l'extraction de l'avis ${i + 1}:`, error);
		}
	}

	return reviews;
}

/**
 * Sauvegarder les données dans un fichier JSON
 */
function saveReviews(data: ReviewsData, filename = "google-reviews.json"): void {
	const outputPath = join(process.cwd(), "reviews-data", filename);
	writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf-8");
	console.log(`💾 Données sauvegardées dans: ${outputPath}`);
}

/**
 * Point d'entrée principal
 */
async function main() {
	// URL de la page Google Business de Maeva Cinquin
	// Vous pouvez utiliser l'URL longue ou l'URL courte
	const googleUrl =
		process.argv[2] ||
		"https://www.google.com/maps/place/Maquilleuse+professionnelle+freelance+-+Makeup.Artist.Dream/@46.3653855,6.4719562,17z/";

	try {
		const data = await scrapeGoogleReviews(googleUrl);
		saveReviews(data);

		console.log("\n📊 Résumé:");
		console.log(`   Entreprise: ${data.businessName}`);
		console.log(`   Note moyenne: ${data.averageRating}/5`);
		console.log(`   Total d'avis: ${data.totalReviews}`);
		console.log(`   Avis extraits: ${data.reviews.length}`);
		console.log("\n✅ Scraping terminé avec succès!");
	} catch (error) {
		console.error("❌ Erreur lors du scraping:", error);
		process.exit(1);
	}
}

// Exécuter le script
main();
