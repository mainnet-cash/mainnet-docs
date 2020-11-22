FROM node:14

WORKDIR /app/docs
COPY docs/package.json .
COPY docs/yarn.lock .
RUN yarn -D
RUN npm install -g vuepress
WORKDIR /app
COPY . .
WORKDIR /app/docs
RUN vuepress build src

WORKDIR /app/docs/src/.vuepress/dist/
RUN npm install -g static-server
ENTRYPOINT static-server -p 5000