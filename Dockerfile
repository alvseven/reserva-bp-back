FROM node:20.11.1-alpine AS builder

WORKDIR /home/node/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:20.11.1-alpine

WORKDIR /home/node/app

COPY --from=builder /home/node/app/package*.json ./
COPY --from=builder /home/node/app/node_modules ./node_modules
COPY --from=builder /home/node/app/dist ./dist

ENV DOCKERIZE_VERSION v0.7.0

RUN apk update --no-cache \
    && apk add --no-cache wget openssl \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apk del wget

COPY entrypoint.sh /usr/local/bin/

CMD ["node", "dist/index.js"]