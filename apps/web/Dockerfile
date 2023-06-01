FROM node:18
RUN apt-get update && apt-get install -y nginx
WORKDIR /usr/src/app

RUN npm install pnpm -g
COPY . .
RUN pnpm i

RUN npm run build:web

EXPOSE 80
COPY ./apps/web/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]

