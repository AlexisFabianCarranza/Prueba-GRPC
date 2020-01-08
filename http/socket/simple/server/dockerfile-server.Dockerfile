FROM node:8

COPY ["./client", "/usr/src/"]

WORKDIR /usr/src

RUN npm install

EXPOSE 50051

CMD npm run dev