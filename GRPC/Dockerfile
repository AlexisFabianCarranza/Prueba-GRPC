# Imagen base
FROM node:10

#GRPC Client
# Crear la carpeta 'app' y establer la carpeta de trabajo - GRPC Client
RUN mkdir -p /app
RUN mkdir -p /app/GRPC
RUN mkdir -p /app/GRPC/client
WORKDIR /app/GRPC/client

# Agregar '/app/node_modules/.bin' al $PATH
ENV PATH /app/node_modules/.bin:$PATH
# Para que la prueba de NPM se ejecute solo una vez de forma no interactiva
ENV CI=true
# Instalar y almacenar dependencias de la caché
COPY package.json /app/GRPC/client
RUN npm install --silent
# Fuente del paquete de la App
ADD ./GRPC/client /app/GRPC/client
# run dev --> defined in package.json
CMD npm run dev

#GRPC Server
RUN mkdir -p /app
RUN mkdir -p /app/GRPC
RUN mkdir -p /app/GRPC/server
WORKDIR /app/GRPC/server
# Para que la prueba de NPM se ejecute solo una vez de forma no interactiva
ENV CI=true
# Instalar y almacenar dependencias de la caché
COPY package.json /app/GRPC/server
RUN npm install --silent
# Fuente del paquete de la App
ADD ./GRPC/server /app/GRPC/server
# run dev app --> defined in package.json
CMD npm run dev

EXPOSE 3001