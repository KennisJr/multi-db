# multi-db
docker run --name postgres -e POSTGRES_USER=edsonkennis -e POSTGRES_PASSWORD=12345 -e POSTGRES_DB=livros -p 5432:5432 -d postgres


    docker ps 
    docker exec -it postgres /bin/bash

    docker run --name adminer -p 8080:8080 --link postgres:postgres -d adminer

## ---- MONGODB
docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin -d mongo:4

docker run --name mongocliet -p 3000:3000 --link mongodb:mongodb -d mongoclient/mongoclient

CRIAR USUARIO
docker exec -it mongodb mongo --host localhost -u admin -p senhaadmin --authenticationDatabase admin --eval "db.getSiblingDB('livros').createUser({user: 'edsonkennis', pwd: '12345', roles:[{role: 'readWrite', db: 'livros'}]})"