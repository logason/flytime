FROM node:argon

ADD package.json /tmp/package.json
RUN cd /tmp && \
    npm install --progress=false && \
    mkdir -p /usr/src/app && \
    mv /tmp/node_modules /usr/src/app/

WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm run build

EXPOSE 8080
CMD [ "npm", "start" ]
