FROM node:latest

RUN mkdir /root/app
WORKDIR /root/app
COPY ./build /root/app/build

RUN npm install -g serve

EXPOSE 3000

CMD serve -l 3000 -s build 