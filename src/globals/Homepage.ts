import type { GlobalConfig } from 'payload'
import { seoFields } from '@/lib/payload/seo-fields'

export const Homepage: GlobalConfig = {
	slug: 'homepage',
	label: "Page d'Accueil",
	access: {
		read: () => true,
	},
	fields: [
		...seoFields,
		// ===========================
		// SECTION HERO (EN-TÊTE)
		// ===========================
		{
			name: 'hero',
			type: 'group',
			label: 'Section Hero (En-tête principal)',
			fields: [
				{
					name: 'title',
					type: 'text',
					required: true,
					label: 'Titre principal',
				},
			],
		},

		// ===========================
		// SECTION ABOUT (QUI EST MAEVA)
		// ===========================
		{
			name: 'about',
			type: 'group',
			label: 'Section À Propos',
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: 'Qui est Maeva ?',
					label: 'Titre de la section',
				},
				{
					name: 'image',
					type: 'upload',
					relationTo: 'media',
					label: 'Photo de profil',
				},
				{
					name: 'paragraphs',
					type: 'array',
					label: 'Paragraphes de présentation',
					fields: [
						{
							name: 'text',
							type: 'textarea',
							required: true,
						},
					],
				},
			],
		},

		// ===========================
		// SECTION SERVICES
		// ===========================
		{
			name: 'services',
			type: 'group',
			label: 'Section Services',
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: 'Mes Prestations',
					label: 'Titre de la section',
				},
				{
					name: 'subtitle',
					type: 'text',
					defaultValue: "Des services personnalisés pour sublimer votre beauté à chaque occasion",
					label: 'Sous-titre',
				},
			],
		},

		// ===========================
		// SECTION BLOG
		// ===========================
		{
			name: 'blog',
			type: 'group',
			label: 'Section Blog',
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: 'Derniers Articles',
					label: 'Titre de la section',
				},
				{
					name: 'subtitle',
					type: 'text',
					defaultValue: "Découvrez mes conseils, astuces et actualités sur le maquillage et le nail art",
					label: 'Sous-titre',
				},
				{
					name: 'limit',
					type: 'number',
					defaultValue: 3,
					min: 1,
					max: 6,
					label: "Nombre d'articles à afficher",
				},
			],
		},

		// ===========================
		// SECTION GALERIE
		// ===========================
		{
			name: 'gallery',
			type: 'group',
			label: 'Section Galerie',
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: 'Mes Dernières Créations',
					label: 'Titre de la section',
				},
				{
					name: 'subtitle',
					type: 'text',
					defaultValue: "Découvrez mes réalisations récentes en maquillage et nail art",
					label: 'Sous-titre',
				},
				{
					name: 'limit',
					type: 'number',
					defaultValue: 4,
					min: 1,
					max: 8,
					label: 'Nombre de galeries à afficher',
				},
			],
		},

		// ===========================
		// SECTION TÉMOIGNAGES
		// ===========================
		{
			name: 'testimonials',
			type: 'group',
			label: 'Section Témoignages',
			fields: [
				{
					name: 'enabled',
					type: 'checkbox',
					defaultValue: true,
					label: 'Afficher la section témoignages',
				},
				{
					name: 'title',
					type: 'text',
					defaultValue: 'Elles me font confiance',
					label: 'Titre de la section',
				},
				{
					name: 'subtitle',
					type: 'text',
					defaultValue: "Découvrez les témoignages de mes clientes satisfaites",
					label: 'Sous-titre',
				},
				{
					name: 'items',
					type: 'array',
					label: 'Témoignages',
					maxRows: 6,
					fields: [
						{
							name: 'name',
							type: 'text',
							required: true,
							label: 'Nom de la cliente',
						},
						{
							name: 'role',
							type: 'text',
							required: true,
							label: 'Contexte (ex: Mariée 2024)',
						},
						{
							name: 'content',
							type: 'textarea',
							required: true,
							label: 'Témoignage',
						},
						{
							name: 'rating',
							type: 'number',
							defaultValue: 5,
							min: 1,
							max: 5,
							label: 'Note (1-5 étoiles)',
						},
					],
				},
			],
		},

		// ===========================
		// SECTION CTA (CALL TO ACTION)
		// ===========================
		{
			name: 'cta',
			type: 'group',
			label: "Section Appel à l'action",
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: "Prête à révéler votre beauté ?",
					label: 'Titre',
				},
				{
					name: 'subtitle',
					type: 'textarea',
					defaultValue:
						"Que ce soit pour votre mariage, un événement spécial ou simplement pour vous faire plaisir, je suis là pour sublimer votre beauté naturelle.",
					label: 'Sous-titre',
				},
			],
		},
	],
}
