FROM node:14-alpine3.10

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install -g rimraf
RUN npm install

COPY . .

EXPOSE 4000
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

CMD ["node", "index.js"]