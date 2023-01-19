# syntax=docker/dockerfile:1

FROM node:16.16.0
ENV NODE_ENV=production
ENV JWTKEY=xxxxxxxxxxx
ENV KEYSSN=xxxxxxx
ENV DBHOST=127.0.0.1
ENV PORT=3000
ENV DBPORT=3306
ENV DBUSER=user
ENV DBPASSWORD=user
ENV DBDATABASE=paneldatabase

WORKDIR /build

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

EXPOSE 3000

CMD [ "node", "build/index.js" ]