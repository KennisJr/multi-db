# multi-db
docker run --name postgres -e POSTGRES_USER=edsonkennis -e POSTGRES_PASSWORD=12345 -e POSTGRES_DB=livros -p 5432:5432 -d postgres


    docker ps 
    docker exec -it postgres /bin/bash

    docker run --name adminer -p 8080:8080 --link postgres:postgres -d adminer

