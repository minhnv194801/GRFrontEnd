FROM node:latest
WORKDIR /app
COPY . .
RUN npm install -g serve
WORKDIR /app/build
EXPOSE 443
CMD ["serve", "-s", "build", "-l", "443"]