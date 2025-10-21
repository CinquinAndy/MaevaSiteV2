/**
 * Script d'import des avis Google dans Payload CMS
 * Convertit les données de reviews-data/google-reviews.json vers la collection Testimonials
 */

import "dotenv/config";
import { getPayload } from "payload";
import config from "@payload-config";
import { readFileSync } from "node:fs";
import { join } from "node:path";

interface GoogleReview {
	author: string;
	authorImage: string | null;
	rating: number;
	date: string;
	text: string;
}

interface ReviewsData {
	businessName: string;
	averageRating: number;
	totalReviews: number;
	extractedAt: string;
	reviews: GoogleReview[];
}

interface ImportOptions {
	mode: "create" | "update" | "sync";
	autoPublish?: boolean;
	autoFeature5Stars?: boolean;
	skipExisting?: boolean;
}

/**
 * Convertir un avis Google vers le format Payload Testimonials
 */
function convertGoogleReviewToTestimonial(review: GoogleReview, index: number) {
	return {
		name: review.author,
		content: review.text,
		publishedDate: review.date, // Date ISO maintenant
		rating: review.rating,
		source: "google" as const,
		sourceUrl: "https://www.google.com/maps/search/cinquin+maeva",
		avatarUrl: review.authorImage,
		featured: review.rating === 5, // Mettre en avant les 5 étoiles
		status: "published" as const, // Auto-publier les avis Google
		order: index, // Ordre d'importation (plus récents en premier)
	};
}

/**
 * Vérifier si un témoignage existe déjà
 */
async function testimonialExists(payload: any, name: string, content: string): Promise<string | null> {
	const result = await payload.find({
		collection: "testimonials",
		where: {
			and: [{ name: { equals: name } }, { content: { equals: content } }],
		},
		limit: 1,
	});

	return result.docs.length > 0 ? result.docs[0].id : null;
}

/**
 * Importer les avis Google dans Payload
 */
async function importGoogleReviews(options: ImportOptions = { mode: "sync" }) {
	console.log("🚀 Démarrage de l'import des avis Google dans Payload CMS\n");

	// 1. Charger les données JSON
	const filePath = join(process.cwd(), "reviews-data", "google-reviews.json");
	const rawData = readFileSync(filePath, "utf-8");
	const data: ReviewsData = JSON.parse(rawData);

	console.log("📊 Données chargées:");
	console.log(`   - ${data.totalReviews} avis`);
	console.log(`   - Note moyenne: ${data.averageRating}/5`);
	console.log(`   - Extrait le: ${new Date(data.extractedAt).toLocaleDateString("fr-FR")}`);
	console.log("");

	// 2. Initialiser Payload
	console.log("🔌 Connexion à Payload CMS...");
	const payload = await getPayload({ config });
	console.log("✅ Connecté à Payload CMS\n");

	// 3. Importer les avis
	let created = 0;
	let updated = 0;
	let skipped = 0;
	let errors = 0;

	console.log(`📥 Import en mode: ${options.mode}\n`);

	for (let i = 0; i < data.reviews.length; i++) {
		const review = data.reviews[i];
		const testimonialData = convertGoogleReviewToTestimonial(review, i);

		try {
			// Vérifier si l'avis existe déjà
			const existingId = await testimonialExists(payload, review.author, review.text);

			if (existingId && options.mode === "create") {
				console.log(`⏭️  [${i + 1}/${data.reviews.length}] Existe déjà: ${review.author}`);
				skipped++;
				continue;
			}

			if (existingId && options.mode === "update") {
				// Mettre à jour l'avis existant
				await payload.update({
					collection: "testimonials",
					id: existingId,
					data: testimonialData,
				});
				console.log(`🔄 [${i + 1}/${data.reviews.length}] Mis à jour: ${review.author} (${review.rating}⭐)`);
				updated++;
			} else if (existingId && options.mode === "sync") {
				// En mode sync, mettre à jour uniquement si les données ont changé
				console.log(`✓  [${i + 1}/${data.reviews.length}] Déjà à jour: ${review.author}`);
				skipped++;
			} else {
				// Créer un nouveau témoignage
				await payload.create({
					collection: "testimonials",
					data: testimonialData,
				});
				console.log(`✨ [${i + 1}/${data.reviews.length}] Créé: ${review.author} (${review.rating}⭐)`);
				created++;
			}
		} catch (error) {
			console.error(`❌ [${i + 1}/${data.reviews.length}] Erreur pour ${review.author}:`, error);
			errors++;
		}
	}

	// 4. Résumé
	console.log("\n═══════════════════════════════════════════════════");
	console.log("📊 RÉSUMÉ DE L'IMPORT\n");
	console.log(`   ✨ Créés:      ${created}`);
	console.log(`   🔄 Mis à jour: ${updated}`);
	console.log(`   ⏭️  Ignorés:    ${skipped}`);
	console.log(`   ❌ Erreurs:    ${errors}`);
	console.log(`   📝 Total:      ${data.reviews.length}`);
	console.log("═══════════════════════════════════════════════════\n");

	// 5. Statistiques Payload
	const stats = await payload.find({
		collection: "testimonials",
		where: {
			source: { equals: "google" },
		},
		limit: 0, // Just get count
	});

	console.log("📈 STATISTIQUES PAYLOAD\n");
	console.log(`   Total avis Google dans Payload: ${stats.totalDocs}`);

	const featured = await payload.find({
		collection: "testimonials",
		where: {
			and: [{ source: { equals: "google" } }, { featured: { equals: true } }],
		},
		limit: 0,
	});

	console.log(`   Avis mis en avant: ${featured.totalDocs}`);

	const published = await payload.find({
		collection: "testimonials",
		where: {
			and: [{ source: { equals: "google" } }, { status: { equals: "published" } }],
		},
		limit: 0,
	});

	console.log(`   Avis publiés: ${published.totalDocs}`);
	console.log("");

	console.log("✅ Import terminé avec succès!");

	return {
		created,
		updated,
		skipped,
		errors,
		total: data.reviews.length,
	};
}

/**
 * Fonction principale avec options CLI
 */
async function main() {
	const args = process.argv.slice(2);
	const mode = (args[0] as ImportOptions["mode"]) || "sync";

	console.log("╔═══════════════════════════════════════════════════════════════╗");
	console.log("║                                                               ║");
	console.log("║     Import des avis Google vers Payload CMS                  ║");
	console.log("║                                                               ║");
	console.log("╚═══════════════════════════════════════════════════════════════╝\n");

	const validModes = ["create", "update", "sync"];
	if (!validModes.includes(mode)) {
		console.error(`❌ Mode invalide: ${mode}`);
		console.error(`   Modes valides: ${validModes.join(", ")}`);
		console.error("\nUtilisation:");
		console.error("  pnpm tsx scripts/import-google-reviews-to-payload.ts [mode]");
		console.error("\nModes:");
		console.error("  create - Créer uniquement les nouveaux avis (ignore les existants)");
		console.error("  update - Créer les nouveaux et mettre à jour les existants");
		console.error("  sync   - Mode intelligent: créer les nouveaux, ignorer les existants (défaut)");
		process.exit(1);
	}

	try {
		await importGoogleReviews({ mode });
	} catch (error) {
		console.error("❌ Erreur lors de l'import:", error);
		process.exit(1);
	}

	process.exit(0);
}

main();
