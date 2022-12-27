FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . ./

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build"]