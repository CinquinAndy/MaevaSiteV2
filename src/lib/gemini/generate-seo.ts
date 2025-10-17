import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { generateText } from 'ai'

interface SeoContent {
	title: string
	description: string
}

export interface PageContext {
	pageType:
		| 'homepage'
		| 'service'
		| 'realisation'
		| 'faq'
		| 'contact'
		| 'mentions-legales'
		| 'prestations'
		| 'realisations'
	title?: string
	description?: string
	content?: string
	location?: string
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
			model: google('gemini-2.5-flash'),
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
	const baseContext = `Tu es un expert en SEO pour un paysagiste écologique basé dans la région de Nantes (Loire-Atlantique).
L'entreprise "Nature Paysage Laheux" propose des services de jardinage et paysagisme respectueux de l'environnement.

**IMPORTANT - Règles strictes:**
- Le titre SEO doit faire **maximum 60 caractères**
- La description SEO doit faire **maximum 155 caractères**
- Reste naturel, clair et précis
- Évite les superlatifs excessifs
- Intègre des mots-clés pertinents naturellement
- Pense référencement local (Nantes, Loire-Atlantique)

`

	let specificContext = ''

	switch (context.pageType) {
		case 'homepage':
			specificContext = `Page: **Accueil**
Cette page présente l'entreprise de paysagisme écologique, ses valeurs, et ses services principaux.
Focus: paysagiste Nantes, jardin écologique, entretien jardins naturels.`
			break

		case 'service':
			specificContext = `Page: **Prestation - ${context.title || 'Service'}**
${context.description ? `Description: ${context.description}` : ''}
${context.category ? `Catégorie: ${context.category}` : ''}
Focus: service spécifique de paysagisme, avantages, zone d'intervention.`
			break

		case 'prestations':
			specificContext = `Page: **Liste des prestations**
Page listant tous les services de paysagisme proposés.
Focus: services paysagiste, entretien jardin, création espaces verts Nantes.`
			break

		case 'realisation':
			specificContext = `Page: **Réalisation - ${context.title || 'Projet'}**
${context.description ? `Description: ${context.description}` : ''}
${context.location ? `Localisation: ${context.location}` : ''}
${context.category ? `Type: ${context.category}` : ''}
Focus: projet concret, expertise, résultat, localité.`
			break

		case 'realisations':
			specificContext = `Page: **Portfolio des réalisations**
Page présentant les projets de paysagisme réalisés dans la région nantaise.
Focus: réalisations paysagiste, projets jardins, portfolio Nantes.`
			break

		case 'faq':
			specificContext = `Page: **Questions fréquentes**
Page répondant aux questions courantes sur les services de paysagisme.
Focus: informations pratiques, tarifs, zone intervention, méthodes écologiques.`
			break

		case 'contact':
			specificContext = `Page: **Contact**
Page pour contacter le paysagiste et demander un devis.
Focus: devis paysagiste Nantes, contact jardinier, zone intervention.`
			break

		case 'mentions-legales':
			specificContext = `Page: **Mentions légales**
Page d'information légale obligatoire.
Focus: simple et factuel, nom entreprise.`
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

Exemple:
TITLE: Paysagiste écologique à Nantes | Nature Paysage Laheux
DESCRIPTION: Expert en jardinage naturel près de Nantes. Entretien, création et conseil pour vos espaces verts respectueux de l'environnement. Devis gratuit.`

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
		title = titleMatch?.[1]?.trim() || 'Nature Paysage Laheux'
		description = descMatch?.[1]?.trim() || 'Paysagiste écologique à Nantes'
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
