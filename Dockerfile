FROM node:12-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn

RUN yarn server:build

RUN rm -rf ./packages/app
RUN rm -rf ./packages/schema
RUN rm -rf ./packages/server/src

RUN ls -la ./packages/server/dist

EXPOSE 4000

CMD ["node", "./packages/server/dist/index.js"]