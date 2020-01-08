FROM node:8

COPY ["./server", "/usr/src/"]

WORKDIR /usr/src

RUN npm install

EXPOSE 5002

CMD npm run dev