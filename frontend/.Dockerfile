FROM node:20-alpine AS builder
WORKDIR /frontend
RUN npm i
COPY . .
RUN npm run build

FROM node:20-alpine AS prod
WORKDIR /frontend
COPY --from=builder /frontend/package*.json ./
RUN npm install --omit=dev
COPY --from=builder /frontend/dist ./dist/