FROM node:latest

RUN mkdir -p /usr/src/client
WORKDIR /usr/src/client

COPY ./src /usr/src/client/src
COPY ./package.json /usr/src/client/

RUN npm install -g npm@latest
RUN npm install -g ionic
RUN npm install --legacy-peer-deps

EXPOSE 8100

# Start
CMD [ "npm", "start", "--host", "0.0.0.0" ]