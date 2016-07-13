FROM node

RUN mkdir -p /src
WORKDIR src

COPY package.json /src
RUN npm install

COPY . /src

CMD ["npm", "start"]