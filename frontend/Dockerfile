FROM node:20-alpine AS builder
WORKDIR /frontend
COPY package*.json ./
RUN npm i
COPY . .
ARG VITE_API_URL="//albrekhtdurer.nomorepartiessite.ru/api/afisha"
ARG VITE_CDN_URL="//albrekhtdurer.nomorepartiessite.ru/content/afisha"
CMD ["npm", "run", "build"] 
