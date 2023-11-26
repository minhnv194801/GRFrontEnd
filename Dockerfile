# base image
FROM node:latest as build

# set working directory
WORKDIR /app

copy . .

from nginx:1.20.1
#copies react to the container directory
# set working directory to nginx resources directory
workdir /usr/share/nginx/html
# remove default nginx static resources
run rm /etc/nginx/conf.d/default.conf
# copies static resources from builder stage
copy --from=build /app/build /usr/share/nginx/html
copy ./nginx.conf /etc/nginx/conf.d/default.conf

expose 3000
# containers run nginx with global directives and daemon off
entrypoint ["nginx", "-g", "daemon off;"]