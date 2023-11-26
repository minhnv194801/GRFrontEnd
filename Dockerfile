FROM node:18-alpine as dependencies
WORKDIR /home/app

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /home/app

COPY --from=dependencies /home/app/node_modules ./node_modules
COPY . .

ENV NODE_ENV="production"

RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /home/app

COPY --from=builder /home/app/build ./build

RUN npm install -g serve

EXPOSE 3000
ENV PORT 3000

CMD ["serve", "-s", "build", "-l", "3000"]