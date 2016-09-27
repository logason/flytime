FROM node:6.3.1

RUN mkdir /flytime
WORKDIR /flytime

COPY ./package.json /flytime
RUN npm install

COPY . /flytime
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
