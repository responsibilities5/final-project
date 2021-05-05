FROM node:14.16 AS ui-build

WORKDIR /home/app

COPY client/ /home/app/client

RUN cd /home/app/client && npm install && npm run build

FROM node:14.16 AS server-build

WORKDIR /root/

COPY --from=ui-build /home/app/client/build ./client/build

COPY package*.json .

RUN npm install

COPY server.js .

EXPOSE 5000

CMD ["node", "server.js"]




