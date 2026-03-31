FROM node:20-alpine AS builder
WORKDIR /frontend
COPY package*.json ./
RUN npm i
COPY . .
ARG VITE_API_URL="//localhost/api/afisha"
ARG VITE_CDN_URL="//localhost/content/afisha"
RUN VITE_API_URL=${VITE_API_URL} VITE_CDN_URL=${VITE_CDN_URL} npm run build 

FROM node:20-alpine AS prod
WORKDIR /frontend
COPY --from=builder /frontend/package*.json ./
RUN npm install --omit=dev
COPY --from=builder /frontend/dist ./dist/
