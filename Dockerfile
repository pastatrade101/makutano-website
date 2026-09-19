# syntax=docker/dockerfile:1

# One image, two processes. docker-compose.yml starts it twice with different
# commands: the Fastify API on 5174 and the SvelteKit (adapter-node) server on
# 3000. Node 22 because the workspace requires >=20 and the host runs 18.

# ---- build ----------------------------------------------------------------
FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable

# Manifests first, so the dependency layer caches independently of source edits.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY packages/shared/package.json packages/shared/
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/.npmrc apps/web/
RUN pnpm install --frozen-lockfile

COPY . .

# shared → api → web, in that order: both apps import @makutano/shared from its
# compiled dist, so it has to exist before either builds.
RUN pnpm build

# ---- runtime --------------------------------------------------------------
FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# The workspace is carried over whole rather than pruned: pnpm's symlinked
# node_modules does not survive a selective copy, and the image is internal.
COPY --from=build /app ./

USER node

# No CMD — docker-compose.yml supplies the command per service.
