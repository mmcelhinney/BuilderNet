# BuilderNet - Production Dockerfile (multi-stage)
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
COPY package.json pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/
COPY packages/database/package.json ./packages/database/
COPY packages/utils/package.json ./packages/utils/
COPY packages/ui/package.json ./packages/ui/
COPY packages/blocks/package.json ./packages/blocks/
COPY packages/editor/package.json ./packages/editor/

RUN pnpm install --frozen-lockfile

COPY . .
COPY packages/database/prisma ./packages/database/prisma

# Generate Prisma client
RUN pnpm --filter @buildernet/database generate

# Build packages then web app
RUN pnpm --filter @buildernet/utils build \
  && pnpm --filter @buildernet/ui build \
  && pnpm --filter @buildernet/blocks build \
  && pnpm --filter @buildernet/editor build \
  && pnpm --filter web build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/web/server.js"]
