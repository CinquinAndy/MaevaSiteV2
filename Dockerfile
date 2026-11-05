# The image of the site: one Next.js server (Payload inside), built by Coolify.
#
# - Node 24 LTS, patched (22.23.4 / 24.22.1 / 26.12.1 fix CVE-2026-111497, the Brotli decoder).
#   Both base images are pinned by version AND digest: Renovate proposes the next ones.
# - The build WRITES to the database named by DATABASE_URI (`bun run build` migrates, then
#   `next build` reads). Coolify hands the variables to `docker build` as build arguments and
#   adds the database to the build's hosts, which is why this is a Dockerfile and not Railpack
#   (the Railpack builder of this Coolify ignores those hosts).
# - The arguments below are build-stage only. They are never copied to the final image, whose
#   variables are given by Coolify when the container starts.

# 1. Dependencies, from the lockfile alone.
FROM oven/bun:1.4.4@sha256:1d22548f177f4ff38e0c15baa3c2c46c6c2060ba2d1bc573bb4720b407548f1d AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# 2. Build, on the Node version that runs the server.
FROM node:26.13.0-bookworm-slim@sha256:add5c17c14752c54d2f3d519ec46a3815684d41c33f198bcb09fb998f7dcbf68 AS build
WORKDIR /app
COPY --from=deps /usr/local/bin/bun /usr/local/bin/bun
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG DATABASE_URI
ARG PAYLOAD_SECRET
ARG S3_BUCKET
ARG S3_ENDPOINT
ARG S3_ACCESS_KEY_ID
ARG S3_SECRET_ACCESS_KEY
ARG S3_REGION
ARG FORVOYEZ_TOKEN
ARG GEMINI_API_KEY
ARG RESEND_TOKEN
ARG REVALIDATE_SECRET
ARG NEXT_PUBLIC_SERVER_URL
# Version skew (a page opened before a deploy), see src/scripts/build-ids.mjs:
# - Stable Server Actions key across builds (derived from PAYLOAD_SECRET, unless Coolify provides
#   NEXT_SERVER_ACTIONS_ENCRYPTION_KEY): the id of submitContactForm no longer changes on every deploy.
# - .deployment-id: `deploymentId` of next.config.mjs, the commit when Coolify passes SOURCE_COMMIT.
ARG NEXT_SERVER_ACTIONS_ENCRYPTION_KEY
ARG SOURCE_COMMIT
ENV NEXT_TELEMETRY_DISABLED=1
RUN node src/scripts/build-ids.mjs deployment-id > .deployment-id \
	&& NEXT_SERVER_ACTIONS_ENCRYPTION_KEY="${NEXT_SERVER_ACTIONS_ENCRYPTION_KEY:-$(node src/scripts/build-ids.mjs server-actions-key)}" \
	bun run build

# 3. What runs. The app is copied whole: `next start` needs .next, node_modules and the sources
#    that next.config.ts and the Payload config import.
FROM node:26.13.0-bookworm-slim@sha256:add5c17c14752c54d2f3d519ec46a3815684d41c33f198bcb09fb998f7dcbf68 AS run
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 NODE_OPTIONS=--no-deprecation PORT=3000 HOSTNAME=0.0.0.0
COPY --from=build --chown=node:node /app ./
# Never root: `node` is the unprivileged user of the base image.
USER node
EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
