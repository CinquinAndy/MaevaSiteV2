import { type NextRequest, NextResponse } from 'next/server'
import { resolveUpstream, rewriteTrackerScript, UMAMI_UPSTREAM, upstreamHeaders } from '@/lib/analytics/umami-proxy'

/** Relais Umami servi depuis le domaine du site : voir `src/lib/analytics/umami-proxy.ts`. */

export const dynamic = 'force-dynamic'

const TIMEOUT_MS = 10_000
/** recorder.js envoie des lots de 500 Ko au plus : au-delà, ce n'est pas lui. */
const MAX_BODY_BYTES = 1_000_000
/** Les scripts Umami sont gardés une heure en mémoire, puis relus sur le serveur Umami. */
const SCRIPT_TTL_MS = 60 * 60 * 1000

const scriptCache = new Map<string, { code: string; expires: number }>()

async function loadScript(path: string): Promise<string | null> {
	const cached = scriptCache.get(path)
	if (cached && cached.expires > Date.now()) return cached.code
	try {
		const res = await fetch(`${UMAMI_UPSTREAM}${path}`, { cache: 'no-store', signal: AbortSignal.timeout(TIMEOUT_MS) })
		if (!res.ok) return cached?.code ?? null
		const code = rewriteTrackerScript(await res.text())
		scriptCache.set(path, { code, expires: Date.now() + SCRIPT_TTL_MS })
		return code
	} catch {
		// Serveur Umami injoignable : on garde la dernière version connue plutôt que de casser le suivi.
		return cached?.code ?? null
	}
}

async function relay(request: NextRequest, segments: string[]): Promise<Response> {
	const target = resolveUpstream(request.method, segments)
	if (!target) return new NextResponse(null, { status: 404 })

	if (target.kind === 'script') {
		const code = await loadScript(target.path)
		if (code === null) return new NextResponse(null, { status: 502 })
		return new NextResponse(code, {
			headers: {
				'Content-Type': 'application/javascript; charset=utf-8',
				'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
			},
		})
	}

	let body: string | undefined
	if (request.method === 'POST') {
		body = await request.text()
		if (body.length > MAX_BODY_BYTES) return new NextResponse(null, { status: 413 })
	}

	try {
		const res = await fetch(`${UMAMI_UPSTREAM}${target.path}`, {
			method: request.method,
			headers: upstreamHeaders(request.headers),
			body,
			cache: 'no-store',
			signal: AbortSignal.timeout(TIMEOUT_MS),
		})
		return new NextResponse(await res.text(), {
			status: res.status,
			headers: {
				'Content-Type': res.headers.get('content-type') ?? 'application/json',
				'Cache-Control': 'no-store',
			},
		})
	} catch {
		return new NextResponse(null, { status: 502 })
	}
}

type Context = { params: Promise<{ path: string[] }> }

export async function GET(request: NextRequest, { params }: Context) {
	return relay(request, (await params).path)
}

export async function POST(request: NextRequest, { params }: Context) {
	return relay(request, (await params).path)
}
