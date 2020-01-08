FROM node:8

COPY ["./client", "/usr/src/"]

WORKDIR /usr/src

RUN npm install

EXPOSE 5000

CMD npm run dev