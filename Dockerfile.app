#################################
# build image
#################################
FROM node:current-alpine as build

WORKDIR /usr/app

COPY app/package.json app/package-lock.json ./
COPY app/src/ ./src

# install and build test
RUN npm install --no-progress --loglevel error

# unit tests
COPY app/test/ ./test
RUN npm test

# install production
RUN npm install --production --no-progress --loglevel error
COPY app/public/ ./public


#################################
# prod image
#################################
FROM node:current-alpine as production

RUN apk add --no-cache dumb-init

COPY --from=build /usr/app /usr/app

WORKDIR /usr/app

ENV LOGLEVEL=INFO

USER 1000
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD [ "node", "./src/app.js" ]
