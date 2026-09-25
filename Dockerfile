FROM node:20-slim AS deps
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev

FROM node:20-slim
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY server.js ./
COPY index.html ./
COPY port.css ./
COPY port-app.js ./
COPY shared ./shared
RUN mkdir -p /app/data && chmod 777 /app/data

EXPOSE 8080
CMD ["node", "server.js"]
