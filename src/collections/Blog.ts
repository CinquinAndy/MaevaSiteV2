import type { CollectionConfig } from 'payload'
import { seoFields } from '@/lib/payload/seo-fields'

export const Blog: CollectionConfig = {
	slug: 'blog',
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'category', 'publishedDate', 'updatedAt'],
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			label: 'Titre',
		},
		{
			name: 'slug',
			type: 'text',
			required: true,
			unique: true,
			label: 'Slug (URL)',
			admin: {
				description: "URL de l'article (ex: conseils-maquillage-mariage)",
			},
		},
		{
			name: 'featuredImage',
			type: 'upload',
			relationTo: 'media',
			required: false,
			label: 'Image à la une',
		},
		{
			name: 'excerpt',
			type: 'textarea',
			required: false,
			label: 'Extrait',
			admin: {
				description: "Court résumé de l'article (affiché dans les listings)",
			},
			maxLength: 300,
		},
		{
			name: 'content',
			type: 'richText',
			required: true,
			label: 'Contenu',
		},
		{
			name: 'category',
			type: 'select',
			required: true,
			label: 'Catégorie',
			options: [
				{ label: 'Conseils Maquillage', value: 'conseils-maquillage' },
				{ label: 'Nail Art', value: 'nail-art' },
				{ label: 'Tutoriels', value: 'tutoriels' },
				{ label: 'Actualités', value: 'actualites' },
				{ label: 'Collections', value: 'collections' },
				{ label: 'Mariages & Événements', value: 'mariages-evenements' },
			],
			defaultValue: 'conseils-maquillage',
		},
		{
			name: 'tags',
			type: 'array',
			label: 'Tags',
			required: false,
			fields: [
				{
					name: 'tag',
					type: 'text',
					required: true,
				},
			],
		},
		{
			name: 'publishedDate',
			type: 'date',
			required: true,
			label: 'Date de publication',
			admin: {
				date: {
					pickerAppearance: 'dayOnly',
				},
			},
		},
		{
			name: 'author',
			type: 'relationship',
			relationTo: 'users',
			required: false,
			label: 'Auteur',
			admin: {
				description: 'Laisser vide pour Maeva Cinquin par défaut',
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
		...seoFields,
	],
}
