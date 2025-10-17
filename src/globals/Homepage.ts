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
					name: 'backgroundImage',
					type: 'upload',
					relationTo: 'media',
					required: true,
					label: 'Image de fond',
				},
				{
					name: 'title',
					type: 'text',
					required: true,
					label: 'Titre principal',
					admin: {
						description: 'Utilisez **mot** pour mettre en gras (effet blob). Exemple : **Transformez** Votre Jardin',
					},
				},
			],
		},

		// ===========================
		// SECTION VALEURS
		// ===========================
		{
			name: 'values',
			type: 'group',
			label: 'Section Valeurs',
			fields: [
				{
					name: 'sectionTitle',
					type: 'text',
					required: true,
					label: 'Titre de la section',
					admin: {
						description: 'Utilisez **mot** pour mettre en gras. Exemple : Une Approche **Écologique** et Sur-Mesure',
					},
				},
				{
					name: 'image',
					type: 'upload',
					relationTo: 'media',
					label: 'Image de la section',
				},
				{
					name: 'valuesList',
					type: 'array',
					label: 'Liste des valeurs',
					minRows: 4,
					maxRows: 4,
					admin: {
						description: 'Exactement 4 valeurs seront affichées',
					},
					fields: [
						{
							name: 'icon',
							type: 'select',
							required: true,
							label: 'Icône',
							options: [
								{ label: 'Feuille (Leaf)', value: 'leaf' },
								{ label: 'Outil (Wrench)', value: 'wrench' },
								{ label: 'Épingle de carte (MapPin)', value: 'map-pin' },
								{ label: 'Flèche descendante (TrendingDown)', value: 'trending-down' },
							],
						},
						{
							name: 'number',
							type: 'text',
							required: true,
							label: 'Numéro affiché',
							admin: {
								description: 'Par exemple : "01", "02", "03", "04"',
							},
						},
						{
							name: 'title',
							type: 'text',
							required: true,
							label: 'Titre de la valeur',
						},
						{
							name: 'description',
							type: 'textarea',
							required: true,
							label: 'Description',
						},
					],
				},
			],
		},

		// ===========================
		// SECTION APERÇU DES PRESTATIONS
		// ===========================
		{
			name: 'servicesPreview',
			type: 'group',
			label: 'Section Aperçu des Prestations',
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: "Mes Prestations d'Entretien de Jardin",
					label: 'Titre de la section',
				},
				{
					name: 'subtitle',
					type: 'text',
					defaultValue: "Toutes mes prestations bénéficient de 50% de réduction d'impôt",
					label: 'Sous-titre',
				},
				{
					name: 'ctaLabel',
					type: 'text',
					defaultValue: 'Voir Toutes Mes Prestations',
					label: 'Texte du bouton',
				},
				{
					name: 'ctaUrl',
					type: 'text',
					defaultValue: '/prestations',
					label: 'Lien du bouton',
				},
			],
			admin: {
				description: 'Les prestations sont automatiquement récupérées depuis la collection "Prestations"',
			},
		},

		// ===========================
		// SECTION PHILOSOPHIE
		// ===========================
		{
			name: 'philosophy',
			type: 'group',
			label: 'Section Philosophie',
			fields: [
				{
					name: 'title',
					type: 'text',
					required: true,
					label: 'Titre de la section',
					admin: {
						description: 'Utilisez **mot** pour mettre en gras. Exemple : Mon Approche : **Nature & Respect**',
					},
				},
				{
					name: 'introText',
					type: 'textarea',
					label: "Texte d'introduction",
				},
				{
					name: 'quote',
					type: 'text',
					label: 'Citation mise en avant',
				},
				{
					name: 'primaryImage',
					type: 'upload',
					relationTo: 'media',
					label: 'Image principale',
				},
				{
					name: 'imageOverlayTitle',
					type: 'text',
					label: "Titre sur l'image",
				},
				{
					name: 'imageOverlayDescription',
					type: 'textarea',
					label: "Description sur l'image",
				},
				{
					name: 'philosophyPoints',
					type: 'array',
					label: 'Points de philosophie',
					minRows: 4,
					maxRows: 4,
					admin: {
						description: 'Exactement 4 cartes de philosophie seront affichées',
					},
					fields: [
						{
							name: 'icon',
							type: 'select',
							required: true,
							label: 'Icône',
							options: [
								{ label: 'Feuille (Leaf)', value: 'leaf' },
								{ label: 'Cœur (Heart)', value: 'heart' },
								{ label: 'Récompense (Award)', value: 'award' },
								{ label: 'Bouclier (Shield)', value: 'shield' },
							],
						},
						{
							name: 'title',
							type: 'text',
							required: true,
							label: 'Titre',
						},
						{
							name: 'description',
							type: 'textarea',
							required: true,
							label: 'Description',
						},
					],
				},
				{
					name: 'preferences',
					type: 'array',
					label: 'Ce que je privilégie (Liste verte)',
					admin: {
						description: 'Pratiques écologiques que je favorise',
					},
					fields: [
						{
							name: 'title',
							type: 'text',
							required: true,
							label: 'Titre',
						},
						{
							name: 'description',
							type: 'text',
							label: 'Description courte',
						},
					],
				},
				{
					name: 'refusals',
					type: 'array',
					label: 'Ce que je refuse (Liste rouge)',
					admin: {
						description: "Pratiques que je n'utilise jamais",
					},
					fields: [
						{
							name: 'title',
							type: 'text',
							required: true,
							label: 'Titre',
						},
						{
							name: 'description',
							type: 'text',
							label: 'Description courte',
						},
					],
				},
				{
					name: 'engagementBanner',
					type: 'group',
					label: "Bannière d'engagement",
					fields: [
						{
							name: 'title',
							type: 'text',
							label: 'Titre',
						},
						{
							name: 'description',
							type: 'textarea',
							label: 'Description',
						},
						{
							name: 'ctaLabel',
							type: 'text',
							label: 'Texte du bouton',
						},
						{
							name: 'ctaUrl',
							type: 'text',
							defaultValue: '/contact',
							label: 'Lien du bouton',
						},
					],
				},
			],
		},

		// ===========================
		// SECTION ZONE D'INTERVENTION
		// ===========================
		{
			name: 'interventionZone',
			type: 'group',
			label: "Section Zone d'Intervention",
			fields: [
				{
					name: 'title',
					type: 'text',
					label: 'Titre de la section',
				},
				{
					name: 'subtitle',
					type: 'text',
					label: 'Sous-titre',
				},
				{
					name: 'mapCenterLat',
					type: 'number',
					defaultValue: 47.1339,
					label: 'Latitude du centre de la carte',
					admin: {
						description: 'Coordonnée latitude pour centrer la carte (ne pas modifier sans raison)',
					},
				},
				{
					name: 'mapCenterLng',
					type: 'number',
					defaultValue: -1.3433,
					label: 'Longitude du centre de la carte',
					admin: {
						description: 'Coordonnée longitude pour centrer la carte (ne pas modifier sans raison)',
					},
				},
				{
					name: 'radiusKm',
					type: 'number',
					defaultValue: 20,
					label: "Rayon d'intervention (en km)",
				},
				{
					name: 'communes',
					type: 'array',
					label: 'Communes principales',
					admin: {
						description: 'Liste des villes où vous intervenez',
					},
					fields: [
						{
							name: 'name',
							type: 'text',
							required: true,
							label: 'Nom de la commune',
						},
					],
				},
				{
					name: 'ctaSection',
					type: 'group',
					label: "Section appel à l'action",
					fields: [
						{
							name: 'title',
							type: 'text',
							label: 'Titre',
						},
						{
							name: 'description',
							type: 'textarea',
							label: 'Description',
						},
						{
							name: 'ctaLabel',
							type: 'text',
							label: 'Texte du bouton',
						},
						{
							name: 'ctaUrl',
							type: 'text',
							defaultValue: '/contact',
							label: 'Lien du bouton',
						},
					],
				},
			],
		},

		// ===========================
		// SECTION APERÇU DES RÉALISATIONS
		// ===========================
		{
			name: 'realisationsPreview',
			type: 'group',
			label: 'Section Aperçu des Réalisations',
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: 'Découvrez Mes Réalisations',
					label: 'Titre de la section',
				},
				{
					name: 'description',
					type: 'textarea',
					label: 'Description',
				},
				{
					name: 'ctaLabel',
					type: 'text',
					defaultValue: 'Voir Toutes Mes Réalisations',
					label: 'Texte du bouton',
				},
				{
					name: 'ctaUrl',
					type: 'text',
					defaultValue: '/realisations',
					label: 'Lien du bouton',
				},
			],
			admin: {
				description: 'Les 6 dernières réalisations sont automatiquement récupérées depuis la collection "Réalisations"',
			},
		},

		// ===========================
		// SECTION FAQ COURTE
		// ===========================
		{
			name: 'faqShort',
			type: 'group',
			label: 'Section FAQ (Questions fréquentes)',
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: 'Questions Fréquentes',
					label: 'Titre de la section',
				},
				{
					name: 'description',
					type: 'textarea',
					label: 'Description',
				},
				{
					name: 'ctaLabel',
					type: 'text',
					defaultValue: 'Voir Toutes les Questions',
					label: 'Texte du bouton',
				},
				{
					name: 'ctaUrl',
					type: 'text',
					defaultValue: '/faq',
					label: 'Lien du bouton',
				},
			],
			admin: {
				description: 'Les 4 questions marquées "À afficher sur la page d\'accueil" sont automatiquement récupérées',
			},
		},

		// ===========================
		// SECTION CRÉDIT D'IMPÔT
		// ===========================
		{
			name: 'taxCredit',
			type: 'group',
			label: "Section Crédit d'Impôt",
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: "Comment Profiter de 50% de Réduction d'Impôt ?",
					label: 'Titre de la section',
				},
				{
					name: 'subtitle',
					type: 'text',
					label: 'Sous-titre',
				},
				{
					name: 'steps',
					type: 'array',
					label: "Étapes pour bénéficier du crédit d'impôt",
					minRows: 4,
					maxRows: 4,
					admin: {
						description: "Les 4 étapes pour profiter du crédit d'impôt de 50%",
					},
					fields: [
						{
							name: 'number',
							type: 'number',
							required: true,
							label: "Numéro de l'étape",
						},
						{
							name: 'title',
							type: 'text',
							required: true,
							label: "Titre de l'étape",
						},
						{
							name: 'description',
							type: 'textarea',
							label: 'Description',
						},
						{
							name: 'image1',
							type: 'upload',
							relationTo: 'media',
							label: 'Première image',
						},
						{
							name: 'image2',
							type: 'upload',
							relationTo: 'media',
							label: 'Deuxième image',
						},
					],
				},
			],
		},

		// ===========================
		// SECTION APPEL À L'ACTION FINAL
		// ===========================
		{
			name: 'finalCta',
			type: 'group',
			label: "Section Appel à l'Action Final",
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: 'Prêt à Redonner Vie à Votre Jardin ?',
					label: 'Titre',
				},
				{
					name: 'description',
					type: 'textarea',
					label: 'Description',
				},
				{
					name: 'buttonText',
					type: 'text',
					defaultValue: 'Demander un Devis Gratuit',
					label: 'Texte du bouton',
				},
				{
					name: 'buttonUrl',
					type: 'text',
					defaultValue: '/contact',
					label: 'Lien du bouton',
				},
				{
					name: 'benefits',
					type: 'array',
					label: 'Liste des avantages',
					admin: {
						description: 'Points clés qui encouragent à prendre contact',
					},
					fields: [
						{
							name: 'benefit',
							type: 'text',
							required: true,
							label: 'Avantage',
						},
					],
				},
			],
		},
	],
}
