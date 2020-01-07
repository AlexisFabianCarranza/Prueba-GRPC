## Benchmark GRPC - Http1/Api Rest - [Dockerizada]

## Pre-requisitos
Debes tener instalado:
+ Node
+ Git
+ Docker
+ Docker Compose

## GRPC - Despliegue
1. Clonar el repo o descargar el repositorio:
```bash
git clone https://github.com/drnavia/poc-gql-apollo-srv.git
```
2. Posicionarse sobre la carpeta GRPC y ejecutar el siguiente comando para contruir la imagen y el contenedor:
```bash
docker-compose -f dc-grpc.yml up --build -d
```
3. Verificar que el contenedor se encuentre levantado:
```bash
docker-compose -f dc-grpc.yml ps
```
5. Ingresar a las siguientes URL para probar que las distintas comunicaciones]: <br>
a) [http://localhost:3001/simpleRPC/PEPE](http://localhost:3001/simpleRPC/PEPE) <br>
b) [http://localhost:3001/serverSideStreamingRPC](http://localhost:3001/serverSideStreamingRPC) <br>
c) [http://localhost:3001/clientSideStreamingRPC](http://localhost:3001/clientSideStreamingRPC) <br>
d) [http://localhost:3001/bidirectionalStreamingRPC](http://localhost:3001/bidirectionalStreamingRPC) <br>

<br><br>
**[ Eteam - Telecom ]**