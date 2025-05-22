# =============== STAGE 1: Install dependencies ===================
FROM node:20.11-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci


# =============== STAGE 2: Build the app ===================
FROM node:20.11-alpine AS builder
WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.ts ./

COPY public ./public
COPY src ./src

RUN npm run build:production


# =============== STAGE 3: Final clean image ===================
FROM node:20.11-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 3000
CMD ["npm", "start"]

