# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder

WORKDIR /app

# Debugging: List contents before copying package.json
RUN echo "--- Before copying package.json ---" && ls -la /app

COPY package*.json ./
# Debugging: List contents after copying package.json
RUN echo "--- After copying package.json ---" && ls -la /app

RUN npm install
# Debugging: List contents after npm install
RUN echo "--- After npm install ---" && ls -la /app

COPY . .
# Debugging: List contents after copying all project files
RUN echo "--- After copying all project files ---" && ls -la /app

RUN npm run build
# Debugging: List contents after npm run build
RUN echo "--- After npm run build ---" && ls -la /app
# Debugging: Check if .next directory exists and its contents
RUN echo "--- Checking .next directory ---" && ls -la /app/.next || echo ".next directory not found!"

# Stage 2: Create the production image
FROM node:alpine AS production

WORKDIR /app

COPY --from=builder /app/package.json ./
RUN npm install --only=production

COPY --from=builder /app/.next ./next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]