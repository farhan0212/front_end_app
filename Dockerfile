# Stage 1: Build the Next.js application
FROM node:20.11.1-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:20.11.1-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]
