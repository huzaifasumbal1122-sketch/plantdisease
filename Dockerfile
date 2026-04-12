FROM node:20-alpine

WORKDIR /app

# Build-time env (needed because Next.js runs code during `next build`)
ARG MONGODB_URI
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL

ENV MONGODB_URI=$MONGODB_URI
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NEXTAUTH_URL=$NEXTAUTH_URL

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm","start","--","-H","0.0.0.0","-p","3000"]
