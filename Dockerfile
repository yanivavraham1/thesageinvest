# ------------------------------
# Development Stage
# ------------------------------
    FROM node:20-alpine AS development

    WORKDIR /app
    
    # Install optional package managers if lockfiles exist
    COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
    
    RUN \
      if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
      elif [ -f package-lock.json ]; then npm ci; \
      elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install --frozen-lockfile; \
      else echo "No lockfile found. Exiting." && exit 1; \
      fi
    
    # Copy Prisma schema and run generate
    COPY prisma ./prisma
    RUN npx prisma generate
    
    # Copy the rest of the application
    COPY . .
    
    # Expose port
    EXPOSE 3000
    
    # Start development server with hot reload
    CMD ["npm", "run", "dev"]
    
    # ------------------------------
    # Builder: install, generate Prisma client, and build app
    # ------------------------------
    FROM node:20-alpine AS builder
    
    WORKDIR /app
    
    # Install optional package managers if lockfiles exist
    COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
    
    RUN \
      if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
      elif [ -f package-lock.json ]; then npm ci; \
      elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install --frozen-lockfile; \
      else echo "No lockfile found. Exiting." && exit 1; \
      fi
    
    # Copy Prisma schema and run generate
    COPY prisma ./prisma
    RUN npx prisma generate
    
    # Copy the rest of the application
    COPY . .
    
    # Build the app (Next.js standalone)
    RUN npm run build
    
    # ------------------------------
    # Runner: lightweight production image
    # ------------------------------
    FROM node:20-alpine AS runner
    
    WORKDIR /app
    
    ENV NODE_ENV=production
    
    # Copy the output from the builder
    COPY --from=builder /app/.next/standalone ./
    COPY --from=builder /app/.next/static ./.next/static
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/package.json ./package.json
    COPY --from=builder /app/prisma ./prisma 
    COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
    
    # Expose port
    EXPOSE 3000
    
    # Start the app
    CMD ["node", "server.js"]