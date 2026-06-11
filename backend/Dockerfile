FROM node:20-alpine AS builder
WORKDIR /backend
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

FROM node:20-alpine AS prod
WORKDIR /backend
COPY --from=builder /backend/package*.json ./
RUN npm install --omit=dev
COPY --from=builder /backend/dist ./dist/
EXPOSE 3000
CMD ["node", "./dist/main.js"]