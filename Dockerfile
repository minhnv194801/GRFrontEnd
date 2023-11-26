FROM node:latest
ENV NODE_ENV="production"

RUN mkdir /root/app
WORKDIR /root/app
COPY . /root/app/

RUN npm install -g serve

EXPOSE 3000
ENV PORT 3000

CMD ["serve", "-s", "build", "-l", "3000"]