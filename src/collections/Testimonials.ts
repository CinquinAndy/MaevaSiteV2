import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
	slug: 'testimonials',
	admin: {
		useAsTitle: 'name',
		defaultColumns: ['name', 'rating', 'source', 'featured', 'updatedAt'],
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'name',
			type: 'text',
			required: true,
			label: 'Nom du client',
			admin: {
				description: 'Ex: Sophie L., Julie M.',
			},
		},
		{
			name: 'content',
			type: 'textarea',
			required: true,
			label: 'Commentaire',
			admin: {
				description: 'Le témoignage complet',
			},
		},
		{
			name: 'publishedDate',
			type: 'date',
			required: false,
			label: 'Date de publication',
			admin: {
				description: 'Date de publication de l\'avis',
				date: {
					pickerAppearance: 'dayAndTime',
				},
			},
		},
		{
			name: 'avatarUrl',
			type: 'text',
			required: false,
			label: 'URL de la photo (externe)',
			admin: {
				description: 'URL externe de la photo de profil (pour les avis Google)',
				condition: data => data.source === 'google',
			},
		},
		{
			name: 'rating',
			type: 'number',
			required: true,
			label: 'Note',
			min: 1,
			max: 5,
			defaultValue: 5,
			admin: {
				description: 'Note sur 5',
			},
		},
		{
			name: 'source',
			type: 'select',
			required: true,
			label: 'Source',
			options: [
				{ label: 'Google Reviews', value: 'google' },
				{ label: 'Facebook', value: 'facebook' },
				{ label: 'Instagram', value: 'instagram' },
				{ label: 'Email', value: 'email' },
				{ label: 'Autre', value: 'other' },
			],
			defaultValue: 'google',
		},
		{
			name: 'sourceUrl',
			type: 'text',
			required: false,
			label: 'Lien source',
			admin: {
				description: 'Lien vers le commentaire original (optionnel)',
			},
		},
		{
			name: 'avatar',
			type: 'upload',
			relationTo: 'media',
			required: false,
			label: 'Photo du client',
			admin: {
				description: 'Optionnel - photo de profil du client',
			},
		},
		{
			name: 'featured',
			type: 'checkbox',
			label: 'Mis en avant',
			defaultValue: false,
			admin: {
				description: 'Afficher en priorité ce témoignage',
				position: 'sidebar',
			},
		},
		{
			name: 'status',
			type: 'select',
			required: true,
			label: 'Statut',
			options: [
				{ label: 'Brouillon', value: 'draft' },
				{ label: 'Publié', value: 'published' },
			],
			defaultValue: 'draft',
			admin: {
				position: 'sidebar',
			},
		},
		{
			name: 'order',
			type: 'number',
			required: false,
			label: "Ordre d'affichage",
			defaultValue: 0,
			admin: {
				description: "Ordre d'affichage dans la liste (0 = premier)",
				position: 'sidebar',
			},
		},
	],
}
