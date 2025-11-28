FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build TypeScript
RUN npm run build

EXPOSE 3001

CMD ["node", "dist/index.js"]
