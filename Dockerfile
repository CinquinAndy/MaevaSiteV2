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
FROM oven/bun:1.3.14@sha256:e10577f0db68676a7024391c6e5cb4b879ebd17188ab750cf10024a6d700e5c4 AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# 2. Build, on the Node version that runs the server.
FROM node:24.22.1-bookworm-slim@sha256:55fb5f5a527ea2c5c4a95f963e48ef90aa38c7b346054fdc8ee9957a2b55d205 AS build
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
ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build

# 3. What runs. The app is copied whole: `next start` needs .next, node_modules and the sources
#    that next.config.ts and the Payload config import.
FROM node:24.22.1-bookworm-slim@sha256:55fb5f5a527ea2c5c4a95f963e48ef90aa38c7b346054fdc8ee9957a2b55d205 AS run
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 NODE_OPTIONS=--no-deprecation PORT=3000 HOSTNAME=0.0.0.0
COPY --from=build --chown=node:node /app ./
# Never root: `node` is the unprivileged user of the base image.
USER node
EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
