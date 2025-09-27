# FROM node:20
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# COPY .env .env
# EXPOSE 5173
# CMD ["npm","run","dev"]

FROM node:20-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Remove .env from image for security (use environment variables instead)
# COPY .env .env  # Remove this line

EXPOSE 5173

# Ensure dev server binds to all interfaces
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
