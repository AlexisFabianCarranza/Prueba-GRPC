# Imagen base
FROM node:8

#GRPC Client
# Crear la carpeta 'app' y establer la carpeta de trabajo - GRPC Client
RUN mkdir -p /app
RUN mkdir -p /app/client
WORKDIR /app/client

# Agregar '/app/node_modules/.bin' al $PATH
ENV PATH /app/node_modules/.bin:$PATH
# Para que la prueba de NPM se ejecute solo una vez de forma no interactiva
ENV CI=true
# Instalar y almacenar dependencias de la caché
COPY package.json /app/client
RUN npm install --silent

# run dev --> defined in package.json
CMD npm run dev

EXPOSE 3001