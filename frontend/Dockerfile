FROM node:20-alpine AS builder
WORKDIR /frontend
COPY package*.json ./
RUN npm i
COPY . .
ARG VITE_API_URL="//localhost/api/afisha"
ARG VITE_CDN_URL="//localhost/content/afisha"
CMD ["npm", "run", "build"] 
