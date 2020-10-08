FROM node:12.18-alpine

WORKDIR /app

RUN npm install -g pm2


# coyp fil package json to /app
COPY ["package.json", "package-lock.json*", "./"]

# remove console after run npm install
RUN npm install --silent
COPY . .

CMD ["npm ","run", "start"]