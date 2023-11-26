# base image
FROM node:latest as build

# set working directory
WORKDIR /app

COPY /build /build

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

# Copy the default nginx.conf provided by the docker image
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]