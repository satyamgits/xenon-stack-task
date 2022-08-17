FROM node:11.1.0-alpine

WORKDIR /server

COPY ./package.json ./

RUN npm install

COPY ./ ./

CMD [ "npm", "start" ]