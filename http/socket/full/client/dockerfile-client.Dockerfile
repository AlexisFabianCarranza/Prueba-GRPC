FROM node:8

COPY ["./client", "/usr/src/"]

WORKDIR /usr/src

RUN npm install

CMD npm run dev