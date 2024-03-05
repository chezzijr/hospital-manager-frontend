ARG NODE_VERSION=20.9.0-alpine

FROM node:${NODE_VERSION} as base
WORKDIR /app
EXPOSE 3000

FROM base as dev
RUN --mount=type=bind,source=package.json,target=package.json \
  --mount=type=bind,source=package-lock.json,target=package-lock.json \
  --mount=type=cache,target=/root/.npm \
  npm ci --include=dev
COPY . .
ENV NODE_ENV=development
CMD ["npm", "run", "dev"]

FROM base as builder
RUN --mount=type=bind,source=package.json,target=package.json \
  --mount=type=bind,source=package-lock.json,target=package-lock.json \
  --mount=type=cache,target=/root/.npm \
  npm ci --omit=dev
COPY . .
RUN npm run build && npm prune --production

FROM base as prod
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
ENV NODE_ENV=production
CMD ["npm", "start"]
