import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
	slug: 'site-settings',
	label: 'Paramètres du Site',
	access: {
		read: () => true,
	},
	fields: [
		// ===========================
		// INFORMATIONS DE CONTACT
		// ===========================
		{
			name: 'contact',
			type: 'group',
			label: 'Informations de Contact',
			fields: [
				{
					name: 'phone',
					type: 'text',
					required: true,
					label: 'Numéro de téléphone',
				},
				{
					name: 'email',
					type: 'email',
					required: true,
					label: 'Adresse email',
				},
				{
					name: 'company',
					type: 'group',
					label: "Informations de l'entreprise",
					fields: [
						{
							name: 'name',
							type: 'text',
							defaultValue: 'SASU Nature et Paysage Laheux',
							label: "Nom de l'entreprise",
						},
						{
							name: 'representative',
							type: 'text',
							defaultValue: 'Jean-Luc Laheux',
							label: 'Représentant légal',
						},
						{
							name: 'legalForm',
							type: 'text',
							defaultValue: 'SASU',
							label: 'Forme juridique',
						},
					],
				},
				{
					name: 'address',
					type: 'group',
					label: 'Adresse',
					fields: [
						{
							name: 'postalCode',
							type: 'text',
							label: 'Code postal',
						},
						{
							name: 'city',
							type: 'text',
							label: 'Ville',
						},
						{
							name: 'region',
							type: 'text',
							label: 'Région',
						},
						{
							name: 'country',
							type: 'text',
							defaultValue: 'France',
							label: 'Pays',
						},
					],
				},
				{
					name: 'social',
					type: 'group',
					label: 'Réseaux sociaux',
					fields: [
						{
							name: 'facebook',
							type: 'text',
							label: 'URL Facebook',
						},
						{
							name: 'linkedin',
							type: 'text',
							label: 'URL LinkedIn',
						},
					],
				},
				{
					name: 'hours',
					type: 'group',
					label: "Horaires d'ouverture",
					fields: [
						{
							name: 'weekday',
							type: 'text',
							label: 'Horaires en semaine',
						},
						{
							name: 'saturday',
							type: 'text',
							label: 'Horaires le samedi',
						},
						{
							name: 'sunday',
							type: 'text',
							label: 'Horaires le dimanche',
						},
						{
							name: 'note',
							type: 'textarea',
							label: 'Note complémentaire',
						},
					],
				},
			],
		},
	],
}
