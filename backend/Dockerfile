FROM node:18

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all backend source code
COPY . .

# Build TypeScript -> dist/
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
