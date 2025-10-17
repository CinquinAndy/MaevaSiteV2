import type { GlobalConfig } from 'payload'
import { seoFields } from '@/lib/payload/seo-fields'

export const MentionsLegalesPage: GlobalConfig = {
	slug: 'mentions-legales-page',
	label: 'Page Mentions Légales',
	access: {
		read: () => true,
	},
	fields: [
		...seoFields,
		// ===========================
		// SECTION HERO
		// ===========================
		{
			name: 'hero',
			type: 'group',
			label: 'Section Hero (En-tête)',
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: 'Mentions Légales',
					label: 'Titre de la page',
				},
				{
					name: 'image',
					type: 'upload',
					relationTo: 'media',
					label: "Image d'en-tête",
				},
			],
		},

		// ===========================
		// CONTENU LÉGAL
		// ===========================
		{
			name: 'content',
			type: 'richText',
			required: true,
			label: 'Contenu légal',
			admin: {
				description:
					"Contenu légal complet éditable. Utilisez les titres H2 pour les sections principales. Les sections 'Hébergement', 'Création du site' et 'Droits d'auteur' sont ajoutées automatiquement après ce contenu. Sections recommandées : Éditeur du site, Coordonnées, Agrément SAP, Responsable de publication, Protection des données (RGPD), Cookies, Crédits photo.",
			},
		},
	],
}
