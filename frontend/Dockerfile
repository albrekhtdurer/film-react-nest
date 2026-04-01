FROM node:20-alpine AS builder
WORKDIR /frontend
COPY package*.json ./
RUN npm i
COPY . .
ARG VITE_API_URL="//albrekhtdurer.nomorepartiessite.ru/api/afisha"
ARG VITE_CDN_URL="//albrekhtdurer.nomorepartiessite.ru/content/afisha"
RUN VITE_API_URL=${VITE_API_URL} VITE_CDN_URL=${VITE_CDN_URL} npm run build 
