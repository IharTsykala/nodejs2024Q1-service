FROM node:20-alpine3.17

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i --legacy-peer-deps && npm cache clean --force

COPY . .

EXPOSE ${PORT}

CMD [ "npm", "run", "start:dev" ]

