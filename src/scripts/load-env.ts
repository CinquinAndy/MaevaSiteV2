// Loads the same .env files as `next build` (what the Payload CLI does before running a script).
// Separate module, imported first: the Payload config reads process.env as soon as it is imported.
import { loadEnv } from 'payload/node'

loadEnv()
