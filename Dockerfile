FROM node:14

WORKDIR /app/docs
COPY docs/package.json .
COPY docs/yarn.lock .
RUN yarn -D
RUN npm install -g vuepress
WORKDIR /app
COPY . .
RUN vuepress build .
RUN npm install -g static-server
WORKDIR /app/docs/.vuepress/dist
EXPOSE 5000
ENTRYPOINT static-server -p 5000