FROM node:14

WORKDIR /app/docs
COPY docs/package.json .
COPY docs/yarn.lock .
RUN yarn -D
RUN npm install -g vuepress
WORKDIR /app
COPY . .
WORKDIR /app/docs

ENTRYPOINT vuepress dev src