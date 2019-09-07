FROM node:12
RUN mkdir -p /usr/diegorsmq
WORKDIR /usr/diegorsmq
COPY package*.json ./
RUN npm install -g pm2 yarn
RUN yarn install
COPY . .
RUN yarn run build
EXPOSE 8080 80 5601 9200 9300
CMD [ "pm2", "start", "ecosystem.config.js", "--env", "development", "--no-daemon" ]