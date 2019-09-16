FROM node:10

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

ENV PATH=$PATH:/home/node/.npm-global/bin

RUN npm install -g serverless

RUN npm install -g knex

RUN npm install -g mocha

RUN npm install -g typescript@2.0

RUN npm install -g ts-node



