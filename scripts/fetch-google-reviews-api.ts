/**
 * Script pour récupérer les avis Google via Google Places API (New)
 * ATTENTION: Nécessite une API Key Google Places API (pas service account)
 *
 * Pour obtenir une API Key:
 * 1. Aller sur https://console.cloud.google.com/apis/credentials
 * 2. Créer une API Key (pas OAuth2, pas Service Account)
 * 3. Activer "Places API (New)" dans https://console.cloud.google.com/apis/library
 * 4. Restreindre la clé aux APIs Places uniquement
 * 5. Ajouter GOOGLE_PLACES_API_KEY dans .env
 */

import { Client } from "@googlemaps/google-maps-services-js";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

interface PlaceReview {
	author: string;
	authorImage?: string;
	rating: number;
	relativeTimeDescription: string;
	text: string;
	time: number; // Unix timestamp
}

interface ReviewsData {
	businessName: string;
	address: string;
	averageRating: number;
	totalReviews: number;
	placeId: string;
	extractedAt: string;
	reviews: PlaceReview[];
}

/**
 * Récupérer le Place ID depuis le nom et l'adresse
 */
async function findPlaceId(client: Client, apiKey: string): Promise<string> {
	console.log("🔍 Recherche du Place ID...");

	const response = await client.findPlaceFromText({
		params: {
			input: "Maquilleuse professionnelle freelance - Makeup.Artist.Dream, Thonon-les-Bains",
			inputtype: "textquery",
			fields: ["place_id", "name"],
			key: apiKey,
		},
	});

	if (response.data.candidates.length === 0) {
		throw new Error("Place ID non trouvé. Vérifiez le nom et l'adresse.");
	}

	const placeId = response.data.candidates[0].place_id;
	console.log(`✅ Place ID trouvé: ${placeId}`);

	return placeId;
}

/**
 * Récupérer les détails du lieu et les avis
 */
async function fetchPlaceReviews(client: Client, apiKey: string, placeId: string): Promise<ReviewsData> {
	console.log("📥 Récupération des avis via Places API...");

	const response = await client.placeDetails({
		params: {
			place_id: placeId,
			fields: ["name", "formatted_address", "rating", "user_ratings_total", "reviews"],
			key: apiKey,
			language: "fr",
		},
	});

	const place = response.data.result;

	if (!place) {
		throw new Error("Impossible de récupérer les détails du lieu");
	}

	console.log(`🏢 Entreprise: ${place.name}`);
	console.log(`⭐ Note moyenne: ${place.rating}/5`);
	console.log(`📊 Total d'avis: ${place.user_ratings_total}`);

	// Formater les avis
	const reviews: PlaceReview[] =
		place.reviews?.map((review) => ({
			author: review.author_name || "Anonyme",
			authorImage: review.profile_photo_url,
			rating: review.rating || 0,
			relativeTimeDescription: review.relative_time_description || "",
			text: review.text || "",
			time: review.time || 0,
		})) || [];

	console.log(`✅ ${reviews.length} avis récupérés (max 5 avis avec l'API gratuite)`);

	return {
		businessName: place.name || "",
		address: place.formatted_address || "",
		averageRating: place.rating || 0,
		totalReviews: place.user_ratings_total || 0,
		placeId,
		extractedAt: new Date().toISOString(),
		reviews,
	};
}

/**
 * Sauvegarder les données dans un fichier JSON
 */
function saveReviews(data: ReviewsData, filename = "google-reviews-api.json"): void {
	const outputPath = join(process.cwd(), "reviews-data", filename);
	writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf-8");
	console.log(`💾 Données sauvegardées dans: ${outputPath}`);
}

/**
 * Point d'entrée principal
 */
async function main() {
	const apiKey = process.env.GOOGLE_PLACES_API_KEY;

	if (!apiKey) {
		console.error("❌ ERREUR: Variable d'environnement GOOGLE_PLACES_API_KEY manquante");
		console.error("\n📝 Pour obtenir une API Key:");
		console.error("   1. Aller sur https://console.cloud.google.com/apis/credentials");
		console.error('   2. Cliquer sur "Créer des identifiants" > "Clé API"');
		console.error('   3. Activer "Places API (New)" dans la bibliothèque d\'APIs');
		console.error("   4. Ajouter GOOGLE_PLACES_API_KEY=votre_clé dans .env");
		console.error("\n⚠️  Note: Un Service Account ne fonctionne PAS pour Places API");
		process.exit(1);
	}

	const client = new Client({});

	try {
		// Trouver le Place ID
		const placeId = await findPlaceId(client, apiKey);

		// Récupérer les avis
		const data = await fetchPlaceReviews(client, apiKey, placeId);

		// Sauvegarder
		saveReviews(data);

		console.log("\n📊 Résumé:");
		console.log(`   Entreprise: ${data.businessName}`);
		console.log(`   Adresse: ${data.address}`);
		console.log(`   Note moyenne: ${data.averageRating}/5`);
		console.log(`   Total d'avis: ${data.totalReviews}`);
		console.log(`   Avis récupérés: ${data.reviews.length}`);
		console.log("\n⚠️  LIMITATION: L'API gratuite ne retourne que les 5 avis les plus pertinents");
		console.log("   Pour plus d'avis, utilisez le script Playwright (scrape-google-reviews.ts)");
		console.log("\n✅ Récupération terminée avec succès!");
	} catch (error) {
		console.error("❌ Erreur:", error);
		process.exit(1);
	}
}

// Exécuter le script
main();
