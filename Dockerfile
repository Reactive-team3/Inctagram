FROM node:20.11-alpine as dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install


FROM node:20.11-alpine as builder
WORKDIR /app
COPY .env.production .env.production
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build:production


FROM node:20.11-alpine as runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/ ./
EXPOSE 3000
CMD ["npm", "start"]

