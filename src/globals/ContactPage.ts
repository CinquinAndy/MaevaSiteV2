import type { GlobalConfig } from 'payload'
import { seoFields } from '@/lib/payload/seo-fields'

export const ContactPage: GlobalConfig = {
	slug: 'contact-page',
	label: 'Page de Contact',
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
					defaultValue: 'Contactez-Moi',
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
		// SECTION FORMULAIRE
		// ===========================
		{
			name: 'formSection',
			type: 'group',
			label: 'Section Formulaire',
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: 'Parlons de Votre Jardin',
					label: 'Titre du formulaire',
				},
				{
					name: 'subtitle',
					type: 'text',
					label: 'Sous-titre du formulaire',
				},
				{
					name: 'gardenSizeOptions',
					type: 'array',
					label: 'Options de surface de jardin',
					admin: {
						description: 'Options proposées dans le menu déroulant pour la surface du jardin',
					},
					fields: [
						{
							name: 'label',
							type: 'text',
							required: true,
							label: 'Libellé affiché',
						},
						{
							name: 'value',
							type: 'text',
							required: true,
							label: 'Valeur technique',
						},
					],
				},
				{
					name: 'privacyText',
					type: 'textarea',
					label: 'Texte de confidentialité',
					admin: {
						description: "Texte affiché sous le bouton d'envoi concernant la protection des données",
					},
				},
			],
		},

		// ===========================
		// ENCART INFORMATIONS DE CONTACT
		// ===========================
		{
			name: 'contactInfoSidebar',
			type: 'group',
			label: 'Encart Informations',
			fields: [
				{
					name: 'benefits',
					type: 'array',
					label: 'Liste des avantages',
					admin: {
						description: 'Avantages clés affichés dans l\'encart (ex: "Réponse sous 24h")',
					},
					fields: [
						{
							name: 'benefit',
							type: 'text',
							label: 'Avantage',
						},
					],
				},
			],
			admin: {
				description: 'Les coordonnées (téléphone, email, etc.) proviennent des Paramètres du Site',
			},
		},
	],
}
