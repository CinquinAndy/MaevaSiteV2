/**
 * Environment variable validation utility
 * Validates and logs all required environment variables at startup
 */

interface EnvValidationResult {
	valid: boolean
	missing: string[]
	invalid: string[]
}

const requiredEnvVars = [
	'DATABASE_URI',
	'PAYLOAD_SECRET',
	'S3_BUCKET',
	'S3_ENDPOINT',
	'S3_ACCESS_KEY_ID',
	'S3_SECRET_ACCESS_KEY',
	'S3_REGION',
	'NEXT_PUBLIC_SERVER_URL',
] as const

const optionalEnvVars = ['NODE_ENV', 'PORT'] as const

/**
 * Redacts sensitive parts of environment variable values for logging
 */
function redactValue(key: string, value: string): string {
	const sensitiveKeys = ['SECRET', 'KEY', 'PASSWORD', 'TOKEN', 'URI']

	if (sensitiveKeys.some(k => key.includes(k))) {
		if (value.length <= 8) return '***'
		return `${value.slice(0, 4)}...${value.slice(-4)}`
	}

	return value
}

/**
 * Validates all required environment variables
 */
export function validateEnvironment(): EnvValidationResult {
	const timestamp = new Date().toISOString()
	console.log(`[${timestamp}] [ENV_VALIDATION] Starting environment validation...`)

	const missing: string[] = []
	const invalid: string[] = []

	// Check required variables
	for (const varName of requiredEnvVars) {
		const value = process.env[varName]

		if (!value) {
			missing.push(varName)
			console.error(`[${timestamp}] [ENV_VALIDATION] ❌ MISSING: ${varName}`)
		} else if (value.trim() === '') {
			invalid.push(varName)
			console.error(`[${timestamp}] [ENV_VALIDATION] ❌ EMPTY: ${varName}`)
		} else {
			console.log(`[${timestamp}] [ENV_VALIDATION] ✓ ${varName}: ${redactValue(varName, value)}`)
		}
	}

	// Log optional variables
	for (const varName of optionalEnvVars) {
		const value = process.env[varName]
		if (value) {
			console.log(`[${timestamp}] [ENV_VALIDATION] ℹ ${varName}: ${value}`)
		}
	}

	// Validate specific formats
	const dbUri = process.env.DATABASE_URI
	if (dbUri && !dbUri.startsWith('postgres://') && !dbUri.startsWith('postgresql://')) {
		invalid.push('DATABASE_URI (invalid format)')
		console.error(`[${timestamp}] [ENV_VALIDATION] ❌ DATABASE_URI must start with postgres:// or postgresql://`)
	}

	const s3Endpoint = process.env.S3_ENDPOINT
	if (s3Endpoint && !s3Endpoint.startsWith('http://') && !s3Endpoint.startsWith('https://')) {
		invalid.push('S3_ENDPOINT (invalid format)')
		console.error(`[${timestamp}] [ENV_VALIDATION] ❌ S3_ENDPOINT must start with http:// or https://`)
	}

	const valid = missing.length === 0 && invalid.length === 0

	if (valid) {
		console.log(`[${timestamp}] [ENV_VALIDATION] ✅ All environment variables validated successfully`)
	} else {
		console.error(
			`[${timestamp}] [ENV_VALIDATION] ❌ Environment validation FAILED - Missing: ${missing.length}, Invalid: ${invalid.length}`
		)
	}

	return { valid, missing, invalid }
}

/**
 * Validates environment and throws if invalid (for startup checks)
 */
export function validateEnvironmentOrThrow(): void {
	const result = validateEnvironment()

	if (!result.valid) {
		const errorMessage = [
			'Environment validation failed!',
			result.missing.length > 0 ? `Missing: ${result.missing.join(', ')}` : '',
			result.invalid.length > 0 ? `Invalid: ${result.invalid.join(', ')}` : '',
		]
			.filter(Boolean)
			.join('\n')

		throw new Error(errorMessage)
	}
}
