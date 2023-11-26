FROM node:latest
WORKDIR /
COPY build .
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]