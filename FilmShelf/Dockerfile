# ---- Build stage ----
FROM node:20-alpine AS build

WORKDIR /app

# Build-time configuration (injected into the bundle via dotenv-webpack)
ARG API_BASE_URL="https://filmshelf-api.mangosea-0e6f4fc6.switzerlandnorth.azurecontainerapps.io/api"
ARG BASE_URL="https://filmshelf-api.mangosea-0e6f4fc6.switzerlandnorth.azurecontainerapps.io"
ARG GOOGLE_CLIENT_ID=""

COPY package*.json ./
RUN npm ci

COPY . .

# Generate the .env that dotenv-webpack consumes during `ng build`
RUN printf "API_BASE_URL=%s\nBASE_URL=%s\nGOOGLE_CLIENT_ID=%s\n" \
    "$API_BASE_URL" "$BASE_URL" "$GOOGLE_CLIENT_ID" > .env

RUN npm run build -- --configuration production

# ---- Runtime stage ----
FROM nginx:1.27-alpine AS runtime

# Container Apps sends traffic to port 8080 by default; configure nginx to listen there
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/film-shelf/ /usr/share/nginx/html/

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
