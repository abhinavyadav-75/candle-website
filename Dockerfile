FROM node:20-alpine

WORKDIR /app

# Copy package files first for better caching
COPY Asset-Manager/package*.json ./

# Install ALL dependencies (including devDependencies for build)
RUN npm install

# Copy source code
COPY Asset-Manager/ .

# Build the app
RUN npm run build

# Set environment
ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

# Start directly with node (not npm)
CMD ["node", "dist/index.cjs"]
