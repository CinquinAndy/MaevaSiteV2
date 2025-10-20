/**
 * Script pour générer manuellement la configuration des galeries
 * en listant les noms de fichiers exacts depuis WordPress
 *
 * UTILISATION:
 * 1. Aller sur chaque page de galerie WordPress
 * 2. Copier les URLs des images ou leurs noms de fichiers
 * 3. Les ajouter dans ce fichier dans le tableau correspondant
 * 4. Lancer le script pour générer galleries-config.json
 */

import fs from 'node:fs'
import path from 'node:path'

interface GalleryConfigManual {
	title: string
	slug: string
	description: string
	category: string
	// Liste EXACTE des noms de fichiers (sans extension ni préfixes)
	imageFilenames: string[]
}

// Configuration manuelle des galeries avec les noms de fichiers EXACTS
const galleriesManual: GalleryConfigManual[] = [
	{
		title: 'Collection Mi-ange Mi-démon',
		slug: 'collection-mi-ange-mi-demon',
		description:
			'Une collection unique, intitulée « Mi ange Mi démon ». Nous avons tous un côté ange et un côté démon, et cette collection est une invitation à explorer et à célébrer cette dualité.',
		category: 'artistique',
		imageFilenames: [
			// EXEMPLE: Ajouter ici les noms EXACTS des fichiers (partie principale du nom)
			// Par exemple: "IMG_9765", "IMG_9766", etc.
			'IMG_9765',
			'IMG_9766',
			'IMG_9767',
			'IMG_9768',
			'IMG_9769',
			'IMG_9770',
			'IMG_9771',
			'IMG_9773',
		],
	},
	{
		title: 'Maquillage Artistique - Cirque',
		slug: 'maquillage-artistique-cirque',
		description:
			'Maquillage artistique créatif sur le thème du cirque. Des créations colorées et originales pour un univers festif et ludique.',
		category: 'artistique',
		imageFilenames: [
			// Ajouter les noms exacts ici
			'Maquillage_Artistique_Cirque_Shooting',
			'Maquillage_Artistique_Cirque_Shooting_2',
			'Maquillage_Artistique_Cirque_Shooting_3',
			'Maquillage_Artistique_Cirque_Shooting_4',
			'Maquillage_Artistique_Cirque_Shooting_5',
			'Maquillage_Artistique_Cirque_Shooting_6',
			'Maquillage_Artistique_Cirque_Shooting_7',
			'Maquillage_Artistique_Cirque_Shooting_8',
		],
	},
	{
		title: 'Maquillage Naturel',
		slug: 'maquillage-naturel',
		description:
			'Maquillage naturel et frais pour sublimer votre beauté au quotidien. Un look léger et lumineux qui met en valeur vos atouts naturels.',
		category: 'mariage',
		imageFilenames: [
			// À COMPLÉTER avec les vrais noms de fichiers
			// Pour l'instant je laisse vide, tu devras les ajouter
		],
	},
	{
		title: 'Maquillage Événementiel - Halloween',
		slug: 'maquillage-evenementiel-halloween',
		description:
			"Maquillages créatifs pour événements spéciaux. Des créations uniques adaptées à chaque occasion, d'Halloween aux fêtes costumées.",
		category: 'evenementiel',
		imageFilenames: [
			'Maquillage_Halloween_1',
			'Maquillage_Halloween_2',
			'Maquillage_Halloween_3',
			'Maquillage_Halloween_4',
			'Maquillage_Halloween_5',
			'Maquillage_Halloween_6',
			'Maquillage_Halloween_7',
			'Maquillage_Halloween_8',
			'IMG_9936',
		],
	},
	{
		title: 'Maquillage Beauté',
		slug: 'maquillage-beaute',
		description:
			'Maquillage beauté professionnel pour toutes les occasions. Un maquillage soigné qui sublime vos traits et révèle votre éclat.',
		category: 'mariage',
		imageFilenames: [
			// À COMPLÉTER
		],
	},
	{
		title: 'Salon du Mariage',
		slug: 'salon-du-mariage',
		description:
			'Présence et démonstrations lors du salon du mariage. Découvrez mes créations et prestations pour sublimer votre jour J.',
		category: 'mariage',
		imageFilenames: [
			// À COMPLÉTER
		],
	},
	{
		title: 'Nail Art',
		slug: 'nail-art',
		description:
			'Créations artistiques sur ongles. Manucure professionnelle avec designs variés, paillettes et strass pour des ongles qui brillent.',
		category: 'nail-art',
		imageFilenames: [
			// À COMPLÉTER avec environ 20 fichiers
			// Tu peux me donner les noms et je les ajouterai
		],
	},
]

function generateConfig() {
	const config = galleriesManual.map((gallery) => ({
		title: gallery.title,
		slug: gallery.slug,
		description: gallery.description,
		category: gallery.category,
		// Utiliser les noms de fichiers exacts comme keywords
		keywords: gallery.imageFilenames,
	}))

	const outputPath = path.join(process.cwd(), 'scripts', 'galleries-config.json')
	fs.writeFileSync(outputPath, JSON.stringify(config, null, 2))

	console.log('✅ Configuration générée !')
	console.log(`📁 Fichier: ${outputPath}`)
	console.log(`\n📊 Résumé:`)
	config.forEach((g) => {
		console.log(`   - ${g.title}: ${g.keywords.length} images`)
	})
	console.log(
		`\n⚠️  Note: Certaines galeries n'ont pas encore leurs images configurées.`
	)
	console.log(
		`   Ouvrir ${path.basename(__filename)} et ajouter les noms de fichiers dans imageFilenames[]`
	)
}

generateConfig()
