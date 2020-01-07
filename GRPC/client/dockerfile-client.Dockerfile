FROM node:8

COPY ["./client", "/usr/src/"]

COPY ["./greeting.proto", "/usr/"]

WORKDIR /usr/src

RUN npm install

EXPOSE 3000

CMD npm run dev