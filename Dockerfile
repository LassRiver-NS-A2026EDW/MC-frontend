# ---- Build Stage ----
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---- Production Stage ----
FROM node:22-alpine
WORKDIR /app

COPY --from=build /app/dist /app/dist

EXPOSE 4000

CMD ["node", "dist/ModelosComputacion_AngularFrontend/server/server.mjs"]
