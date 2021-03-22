docker build --tag node-docker .
docker container create --name producer node-docker
docker network connect --ip 172.20.240.6 my-network producer