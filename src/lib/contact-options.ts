/**
 * Choix proposés dans le formulaire de contact (facultatifs). Les valeurs partent aussi dans l'événement Umami
 * « Formulaire contact envoyé » : ne pas les renommer, les statistiques déjà collectées ne les retrouveraient plus.
 */

export const PRESTATION_OPTIONS = [
	{ value: 'mariage', label: 'Maquillage de mariage' },
	{ value: 'beaute', label: 'Maquillage beauté, soirée ou événement' },
	{ value: 'artistique', label: 'Maquillage artistique (shooting, scène, body painting)' },
	{ value: 'nail-art', label: 'Nail art, ongles' },
	{ value: 'autre', label: 'Autre demande' },
] as const

/**
 * « Comment m'avez-vous connue ? » : seule façon de savoir qu'une cliente vient d'une recommandation d'une IA
 * (elle tape souvent ensuite le nom dans Google, et Umami ne voit que Google).
 */
export const SOURCE_OPTIONS = [
	{ value: 'google', label: 'Recherche Google' },
	{ value: 'ia', label: 'ChatGPT, Gemini ou une autre IA' },
	{ value: 'instagram', label: 'Instagram' },
	{ value: 'facebook', label: 'Facebook' },
	{ value: 'bouche-a-oreille', label: 'Bouche-à-oreille' },
	{ value: 'evenement', label: "Mariage ou événement d'un proche" },
	{ value: 'autre', label: 'Autre' },
] as const

type Option = { readonly value: string; readonly label: string }

/** Valeur connue de la liste, ou chaîne vide (valeur absente, inconnue ou trafiquée). */
export function normalizeOption(options: readonly Option[], value: unknown): string {
	return typeof value === 'string' && options.some(option => option.value === value) ? value : ''
}

/** Libellé lisible d'une valeur (pour l'email), ou null. */
export function optionLabel(options: readonly Option[], value: unknown): string | null {
	return options.find(option => option.value === value)?.label ?? null
}
