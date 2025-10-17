import config from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

interface HealthCheckResult {
	status: 'healthy' | 'unhealthy' | 'degraded'
	timestamp: string
	checks: {
		payload: { status: 'ok' | 'error'; message?: string; responseTime?: number }
		database: { status: 'ok' | 'error'; message?: string; responseTime?: number }
		s3: { status: 'ok' | 'error'; message?: string }
		environment: { status: 'ok' | 'error'; missingVars?: string[] }
	}
}

export async function GET() {
	const timestamp = new Date().toISOString()
	console.log(`[${timestamp}] [HEALTH_CHECK] Starting health check...`)

	const result: HealthCheckResult = {
		status: 'healthy',
		timestamp,
		checks: {
			payload: { status: 'ok' },
			database: { status: 'ok' },
			s3: { status: 'ok' },
			environment: { status: 'ok' },
		},
	}

	// Check environment variables
	const requiredEnvVars = [
		'DATABASE_URI',
		'PAYLOAD_SECRET',
		'S3_BUCKET',
		'S3_ENDPOINT',
		'S3_ACCESS_KEY_ID',
		'S3_SECRET_ACCESS_KEY',
	]
	const missingVars = requiredEnvVars.filter(v => !process.env[v])

	if (missingVars.length > 0) {
		result.checks.environment = {
			status: 'error',
			missingVars,
		}
		result.status = 'unhealthy'
		console.error(`[${timestamp}] [HEALTH_CHECK] ❌ Missing environment variables: ${missingVars.join(', ')}`)
	} else {
		console.log(`[${timestamp}] [HEALTH_CHECK] ✓ Environment variables OK`)
	}

	// Check Payload initialization
	try {
		const payloadStart = Date.now()
		const payload = await getPayload({ config })
		const payloadTime = Date.now() - payloadStart

		result.checks.payload = {
			status: 'ok',
			responseTime: payloadTime,
		}
		console.log(`[${timestamp}] [HEALTH_CHECK] ✓ Payload initialized (${payloadTime}ms)`)

		// Check database connection
		try {
			const dbStart = Date.now()
			// Simple query to test database connection
			await payload.find({
				collection: 'users',
				limit: 1,
				depth: 0,
			})
			const dbTime = Date.now() - dbStart

			result.checks.database = {
				status: 'ok',
				responseTime: dbTime,
			}
			console.log(`[${timestamp}] [HEALTH_CHECK] ✓ Database connection OK (${dbTime}ms)`)
		} catch (dbError) {
			result.checks.database = {
				status: 'error',
				message: dbError instanceof Error ? dbError.message : 'Database query failed',
			}
			result.status = 'degraded'
			console.error(
				`[${timestamp}] [HEALTH_CHECK] ❌ Database check failed:`,
				dbError instanceof Error ? dbError.message : dbError
			)
		}

		// Check S3 configuration (just verify it's configured, not actual connectivity)
		const s3Configured =
			process.env.S3_BUCKET &&
			process.env.S3_ENDPOINT &&
			process.env.S3_ACCESS_KEY_ID &&
			process.env.S3_SECRET_ACCESS_KEY

		if (s3Configured) {
			result.checks.s3 = { status: 'ok' }
			console.log(`[${timestamp}] [HEALTH_CHECK] ✓ S3 configuration present`)
		} else {
			result.checks.s3 = {
				status: 'error',
				message: 'S3 configuration incomplete',
			}
			result.status = 'degraded'
			console.error(`[${timestamp}] [HEALTH_CHECK] ❌ S3 configuration incomplete`)
		}
	} catch (payloadError) {
		result.checks.payload = {
			status: 'error',
			message: payloadError instanceof Error ? payloadError.message : 'Payload initialization failed',
		}
		result.status = 'unhealthy'
		console.error(
			`[${timestamp}] [HEALTH_CHECK] ❌ Payload initialization failed:`,
			payloadError instanceof Error ? payloadError.message : payloadError
		)
	}

	console.log(`[${timestamp}] [HEALTH_CHECK] Health check completed: ${result.status}`)

	const statusCode = result.status === 'healthy' ? 200 : result.status === 'degraded' ? 207 : 503

	return NextResponse.json(result, { status: statusCode })
}
