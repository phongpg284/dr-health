FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

ENV NODE_ENV production

RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

CMD [ "node", "dist/src/main.js" ]
