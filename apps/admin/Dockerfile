FROM node:18
RUN apt-get update && apt-get install -y nginx && apt-get install vim
WORKDIR /usr/src/app

RUN npm install pnpm -g
COPY . .
RUN pnpm i

RUN npm run build:admin

EXPOSE 80
COPY ./apps/admin/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]

