# base image

FROM node:20-alpine

# create work directory

WORKDIR /app

# copy package.json and copy package-lock.json

COPY package*.json ./

# install dependencies

RUN npm i

# COPY all files

COPY . .

# expose PORT 

EXPOSE 4000

# run the server;

CMD [ "npm", "start"]


