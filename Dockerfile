# base image
FROM node:latest as build

# set working directory
WORKDIR /app

COPY . .

FROM nginx:stable
#copies react to the container directory
# set working directory to nginx resources directory
WORKDIR /usr/share/nginx/html
# remove default nginx static resources
RUN rm /etc/nginx/conf.d/default.conf
# copies static resources from builder stage
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
# containers run nginx with global directives and daemon off
CMD ["nginx", "-g", "daemon off;"]