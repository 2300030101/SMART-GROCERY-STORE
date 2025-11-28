FROM node:18

WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./
RUN npm install

# Copy remaining backend source
COPY . .

# Compile TypeScript -> creates dist/ folder
RUN npm run build

EXPOSE 3001

# Run compiled JS output
CMD ["node", "dist/index.js"]
