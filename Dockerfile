# syntax=docker/dockerfile:1

FROM node:16.16.0
ENV NODE_ENV=production
ENV JWTTOKEN_ENV=xxxxxxxxxxx
ENV SESSIONKEY_ENV=xxxxxxx
ENV DBHOST_ENV=127.0.0.1
ENV PORT_ENV=3000
ENV DBPORT_ENV=3306
ENV DBUSER_ENV=user
ENV DBPASSWORD_ENV=user
ENV DBDATABASE_ENV=paneldatabase

WORKDIR /build

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

EXPOSE 3000

CMD [ "node", "build/index.js" ]