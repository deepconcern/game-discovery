FROM node:12-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn

RUN yarn build

RUN rm -rf ./src

EXPOSE 4000

CMD ["node", "./dist/index.js"]