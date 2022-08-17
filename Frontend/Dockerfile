FROM node:11.1.0-alpine

WORKDIR /app

COPY ./package.json /app/

# ENV PATH /app/node_modules/.bin:$PATH

RUN npm install

COPY ./ ./

# RUN npm start
CMD [ "npm", "start" ]

