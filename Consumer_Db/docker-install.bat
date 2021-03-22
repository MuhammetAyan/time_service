docker build --tag node-docker .
docker container create --name consumer_db node-docker
docker network connect --ip 172.20.240.7 my-network consumer_db