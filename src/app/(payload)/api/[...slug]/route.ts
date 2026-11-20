/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import '@payloadcms/next/css'
import { REST_DELETE, REST_GET, REST_OPTIONS, REST_PATCH, REST_POST, REST_PUT } from '@payloadcms/next/routes'

// Configure route segment for serverless functions
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60 // Maximum execution time in seconds (for media files from S3)

export const GET = REST_GET(config)
export const POST = REST_POST(config)
export const DELETE = REST_DELETE(config)
export const PATCH = REST_PATCH(config)
export const PUT = REST_PUT(config)
export const OPTIONS = REST_OPTIONS(config)

// Ajout au fichier généré (à reporter si Payload le régénère) : Payload ne répond pas aux requêtes HEAD
// (404 sur /api/media/file/…, alors que GET répond 200). Certains robots et vérificateurs de liens envoient un
// HEAD d'abord et concluaient que les images n'existaient pas. On rejoue la requête en GET et on ne renvoie que
// le statut et les en-têtes.
export const HEAD = async (...[request, context]: Parameters<typeof GET>) => {
	const response = await GET(new Request(request, { method: 'GET' }), context)
	await response.body?.cancel()
	return new Response(null, { status: response.status, headers: response.headers })
}
