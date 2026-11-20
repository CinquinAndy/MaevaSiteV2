import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

// Corrections de contenu relevées par le check-up du 20/11/2026 (données seulement, aucun changement de schéma).
// - Titres des prestations : « Nait art » et « Maquillage artistiques ».
// - Textes alternatifs des images les plus visibles : images insérées dans les articles et prestations, images
//   principales des articles, prestations et galeries. Rédigés à partir des photos.
// Idempotente : un titre ou un alt déjà modifié dans l'admin n'est jamais écrasé (on ne touche qu'à l'ancienne
// valeur exacte, ou à un alt vide). Sur une base sans ces données, elle ne fait rien.

const ALTS: ReadonlyArray<readonly [filename: string, alt: string]> = [
	['IMG_0029.jpeg', 'Mariés qui s’embrassent au bord du lac Léman, sous les arbres, la mariée en robe de princesse'],
	['IMG_0029.JPG', 'Mariés qui s’embrassent au bord du lac Léman, sous les arbres, la mariée en robe de princesse'],
	[
		'IMG_9765-scaled-1.jpeg',
		'Collection Mi-ange Mi-démon : modèle au corps pailleté d’or, coiffe de feuilles dorées et cornes, motifs noirs sur le visage',
	],
	[
		'63b069bf-adb1-4d7f-85cb-7b4e09538982-1.jpeg',
		'Maquillage d’Halloween : smoky eye charbonneux et lèvres bordeaux, sous une lumière rose et des toiles d’araignée',
	],
	['IMG_2311-1.jpg', 'Nail art de la Saint-Valentin : ongles amande nude, blancs et bordeaux décorés de petits cœurs'],
	['IMG_2311.jpg', 'Nail art de la Saint-Valentin : ongles amande nude, blancs et bordeaux décorés de petits cœurs'],
	[
		'image00001-1.jpeg',
		'Maquillage artistique tribal : motifs graphiques noirs et dorés sur le front et le menton, lèvres noires',
	],
	[
		'image00001.jpeg',
		'Maquillage artistique tribal : motifs graphiques noirs et dorés sur le front et le menton, lèvres noires',
	],
	[
		'IMG_2297.jpeg',
		'Maquillage d’Halloween : modèle au chapeau haut-de-forme, lèvres noires et regard rouge, entourée de toiles d’araignée',
	],
	['image00007.jpeg', 'Maquillage beauté naturel : teint lumineux, regard doré et lèvres rosées, cheveux ondulés'],
	['image00048-1.png', 'Logo Makeup Artist Dream de Maeva Cinquin : lèvres rouges et ongles bleu nuit'],
	['image00047.jpeg', 'Maeva Cinquin applique un fard sur les paupières d’une cliente en séance de maquillage'],
	['image00046.jpeg', 'Pose d’eye-liner au pinceau fin, en gros plan, en noir et blanc'],
	['image00024.jpeg', 'Maquillage beauté : teint sculpté et regard bronze, application au pinceau à blush'],
	[
		'Gemini_Generated_Image_icv9fyicv9fyicv9.png',
		'Maquillage naturel lumineux : teint frais, sourcils structurés et lèvres nude',
	],
	['image00015.jpeg', 'Shooting photo en studio : modèle en robe noire, maquillage glamour, éclairée par des projecteurs'],
	[
		'image00010.jpeg',
		'Maquillage de mariée naturel et lumineux, coiffure tressée, bouquet de roses blanches sous une arche fleurie',
	],
	[
		'IMG_2318.jpg',
		'Maquillage artistique sur le thème du cirque : artiste au visage blanc assise dans un cerceau aérien, décor de chapiteau',
	],
	['image00012.jpeg', 'Salon du mariage : mariée tatouée en robe de dentelle bordeaux, bouquet de fleurs blanches'],
	['charlotte tilbury.jpg', 'Soins Charlotte Tilbury : Magic Cream, Magic Night Cream et Magic Eye Rescue sur fond rose'],
]

const TITLES: ReadonlyArray<readonly [slug: string, oldTitle: string, newTitle: string]> = [
	['nail-art', 'Nait art', 'Nail art'],
	['maquillages-artistiques', 'Maquillage artistiques', 'Maquillages artistiques'],
]

export async function up({ db }: MigrateUpArgs): Promise<void> {
	for (const [slug, oldTitle, newTitle] of TITLES) {
		await db.execute(sql`UPDATE "services" SET "title" = ${newTitle} WHERE "slug" = ${slug} AND "title" = ${oldTitle};`)
	}
	for (const [filename, alt] of ALTS) {
		await db.execute(
			sql`UPDATE "media" SET "alt" = ${alt} WHERE "filename" = ${filename} AND ("alt" IS NULL OR btrim("alt") = '');`,
		)
	}
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
	// Les anciennes valeurs étaient des fautes ou des alts vides : rien à restaurer.
	await db.execute(sql`SELECT 1;`)
}
