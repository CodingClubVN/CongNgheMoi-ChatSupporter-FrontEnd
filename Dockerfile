### STAGE 1: Build ###
FROM node:16-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm i -g @angular/cli

# Install app dependencies:
RUN npm i 

COPY . .
ENV NODE_ENV production
RUN ng build --configuration production
### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY ./config/fe_nginx.conf /etc/nginx/conf.d/fe_nginx.conf
COPY --from=build /usr/src/app/dist/* /usr/share/nginx/html