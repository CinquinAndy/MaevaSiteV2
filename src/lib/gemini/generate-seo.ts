import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { generateText } from 'ai'

interface SeoContent {
	title: string
	description: string
}

export interface PageContext {
	pageType:
		| 'homepage'
		| 'blog'
		| 'blog-post'
		| 'galery'
		| 'galery-item'
		| 'service'
		| 'services'
		| 'contact'
		| 'mentions-legales'
	title?: string
	description?: string
	content?: string
	category?: string
	additionalContext?: Record<string, unknown>
}

/**
 * Generate SEO title and description using Gemini
 */
export async function generateSeoContent(context: PageContext): Promise<SeoContent | null> {
	try {
		const apiKey = process.env.GEMINI_API_KEY
		if (!apiKey) {
			console.error('GEMINI_API_KEY not configured')
			return null
		}

		const google = createGoogleGenerativeAI({ apiKey })
		const prompt = buildSeoPrompt(context)

		const { text } = await generateText({
			model: google('gemini-2.5-pro'),
			prompt,
			temperature: 0.7,
		})

		// Parse the response
		const seoContent = parseSeoResponse(text)
		return seoContent
	} catch (error) {
		console.error('Error generating SEO content:', error)
		return null
	}
}

function buildSeoPrompt(context: PageContext): string {
	const baseContext = `Tu es un expert en SEO pour Maeva Cinquin, maquilleuse professionnelle et nail artist basée en Haute-Savoie, France.

**Contexte professionnel:**
- Diplômée de la Make Up For Ever Academy (Nice)
- Spécialisations : maquillage beauté, maquillage artistique, nail art
- Services : mariages, événements, projets artistiques, shooting photo, défilés de mode, enfants
- Zones d'intervention : Haute-Savoie et Suisse (Thonon-les-Bains, Genève, Annecy, Lausanne et environs)
- Ton : professionnel mais authentique, utilise le "je" avec légèreté et naturel

**Structure du site:**
- Accueil : présentation et expertise
- Blog : conseils maquillage, nail art, actualités beauté
- Galerie : portfolios de réalisations (mariages, artistique, nail art)
- Prestations : détails des services offerts
- Contact : formulaire et informations

**IMPORTANT - Règles SEO strictes:**
- Le titre SEO doit faire **maximum 60 caractères**
- La description SEO doit faire **maximum 155 caractères**
- Ton naturel et professionnel avec un "je" léger quand approprié
- Évite les superlatifs excessifs ou formulations marketing agressives
- Intègre naturellement les mots-clés pertinents (maquillage, maquilleuse, nail art, beauté)
- Pense référencement local (Haute-Savoie, Thonon, Genève, Annecy, Lausanne)
- Privilégie authenticité et clarté plutôt que promesses exagérées

`

	let specificContext = ''

	switch (context.pageType) {
		case 'homepage':
			specificContext = `Page: **Accueil**
Cette page présente Maeva, son parcours (Make Up For Ever Academy), ses expertises (maquillage beauté, artistique, nail art), et ses zones d'intervention.
Focus SEO: maquilleuse Haute-Savoie, maquillage mariage Thonon, makeup artist Genève, nail art Annecy.`
			break

		case 'blog':
			specificContext = `Page: **Blog - Liste des articles**
Page listant tous les articles : conseils maquillage, tutoriels nail art, actualités beauté, recommandations produits.
Focus SEO: conseils maquillage professionnel, tips beauté, tutoriels makeup, blog maquilleuse.`
			break

		case 'blog-post':
			specificContext = `Page: **Article de blog - ${context.title || 'Article'}**
${context.description ? `Extrait: ${context.description}` : ''}
${context.category ? `Catégorie: ${context.category}` : ''}
Focus SEO: sujet spécifique de l'article, expertise partagée, conseils pratiques beauté/maquillage.`
			break

		case 'galery':
			specificContext = `Page: **Galerie - Portfolio**
Page présentant les réalisations : mariages, maquillages artistiques, créations nail art, événements, shootings.
Focus SEO: portfolio maquilleuse, réalisations maquillage mariage, book makeup artist Haute-Savoie.`
			break

		case 'galery-item':
			specificContext = `Page: **Galerie - ${context.title || 'Collection'}**
${context.description ? `Description: ${context.description}` : ''}
${context.category ? `Type: ${context.category}` : ''}
Focus SEO: projet concret, type de maquillage/nail art, résultat visuel, expertise démontrée.`
			break

		case 'service':
			specificContext = `Page: **Prestation - ${context.title || 'Service'}**
${context.description ? `Description: ${context.description}` : ''}
${context.category ? `Catégorie: ${context.category}` : ''}
Focus SEO: service spécifique (ex: maquillage mariage, nail art, makeup artistique), avantages, zone d'intervention.`
			break

		case 'services':
			specificContext = `Page: **Prestations - Liste des services**
Page détaillant tous les services : mariages, événements, maquillage artistique, nail art, shooting, défilés.
Focus SEO: services maquilleuse professionnelle, prestations maquillage Haute-Savoie, tarifs maquillage mariage.`
			break

		case 'contact':
			specificContext = `Page: **Contact**
Page pour me contacter et demander un devis ou réservation.
Focus SEO: contact maquilleuse Thonon, devis maquillage mariage, rendez-vous makeup Haute-Savoie, réservation nail art.`
			break

		case 'mentions-legales':
			specificContext = `Page: **Mentions légales**
Page d'information légale obligatoire.
Focus SEO: simple et factuel, mentions légales Maeva Cinquin maquilleuse.`
			break
	}

	if (context.content) {
		specificContext += `\n\nContenu disponible:\n${context.content.substring(0, 500)}...`
	}

	const outputFormat = `

**RÉPONSE ATTENDUE (format strict):**
Génère UNIQUEMENT ces deux lignes, sans autre texte:

TITLE: [ton titre SEO de max 60 caractères]
DESCRIPTION: [ta description SEO de max 155 caractères]

Exemples de ton et style:
TITLE: Maquilleuse professionnelle Haute-Savoie | Maeva Cinquin
DESCRIPTION: Diplômée Make Up For Ever Academy. Je réalise vos maquillages mariage, artistique et nail art à Thonon, Genève, Annecy. Devis gratuit.

TITLE: Portfolio maquillage mariage | Maeva Cinquin
DESCRIPTION: Découvrez mes réalisations maquillage pour mariées en Haute-Savoie et Suisse. Makeup naturel et sophistiqué pour votre grand jour.`

	return baseContext + specificContext + outputFormat
}

function parseSeoResponse(text: string): SeoContent {
	const lines = text.trim().split('\n')
	let title = ''
	let description = ''

	for (const line of lines) {
		const trimmedLine = line.trim()
		if (trimmedLine.startsWith('TITLE:')) {
			title = trimmedLine.replace('TITLE:', '').trim()
		} else if (trimmedLine.startsWith('DESCRIPTION:')) {
			description = trimmedLine.replace('DESCRIPTION:', '').trim()
		}
	}

	// Ensure we have valid content
	if (!title || !description) {
		// Fallback parsing
		const titleMatch = text.match(/TITLE:\s*(.+)/i)
		const descMatch = text.match(/DESCRIPTION:\s*(.+)/i)
		title = titleMatch?.[1]?.trim() || 'Maeva Cinquin - Maquilleuse Professionnelle'
		description =
			descMatch?.[1]?.trim() ||
			'Maquilleuse et nail artist en Haute-Savoie. Maquillage mariage, artistique et nail art.'
	}

	// Truncate if too long
	if (title.length > 60) {
		title = `${title.substring(0, 57)}...`
	}
	if (description.length > 155) {
		description = `${description.substring(0, 152)}...`
	}

	return { title, description }
}
