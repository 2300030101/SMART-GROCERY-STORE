FROM node:18

WORKDIR /app

COPY package*.json ./

# Install ALL dependencies (including devDependencies)
RUN npm install

# Copy backend source code
COPY . .

# Build TypeScript -> dist
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
