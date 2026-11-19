/**
 * JSON-LD à placer dans une balise <script> : « < » est échappé pour qu'un texte du CMS contenant
 * « </script> » ne puisse pas fermer la balise et injecter du HTML dans la page.
 */
export function serializeJsonLd(data: unknown): string {
	return JSON.stringify(data).replace(/</g, '\\u003c')
}
