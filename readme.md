# Time Service

Bu proje Docker üzerinde Kafka ve Postgresql kullanımını test amaçlıdır. Proje senaryosu şöyledir:

Kafka üzerinde `Producer` konteynerimiz tarafından tek partition'lı `TimeDbTopic` adlı bir topic oluşturuluyor.

Ve ardından `Producer` konternerimiz üzerindeki producer servisi ile 10 saniyede bir zaman bilgisini push ediyor.

`Consumer_Db` adlı konteynerimiz ise üzerindeki consumer servisi ile bu zaman verilerini çekiyor ve veritabanına yazıyor.

## Kurulum

PostgreSQL, Kafka, Pgadmin, Zookeeper'ın kurulumu için aşağıdaki komutları çalıştırınız.

```
docker network create --subnet 172.20.0.0/16 --ip-range 172.20.240.0/20 -d bridge my-network
docker create ^
	-p 5432:5432 ^
        -e POSTGRES_PASSWORD="password" ^
        --name pg ^
        postgres

docker network connect --ip 172.20.240.4 my-network pg

docker create ^
	-p 5555:80 ^
        --name pgadmin ^
        -e PGADMIN_DEFAULT_EMAIL="postgres" ^
        -e PGADMIN_DEFAULT_PASSWORD="password" ^
	dpage/pgadmin4"

docker network connect --ip 172.20.240.5 my-network pgadmin

docker create ^
	--name zookeeper ^
        -p 2181:2181 ^
        zookeeper

docker network connect --ip 172.20.240.2 my-network zookeeper

docker create ^
	--name kafka ^
	-p 9092:9092 ^
	-e KAFKA_ZOOKEEPER_CONNECT=172.20.240.2:2181 ^
	-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://172.20.240.3:9092 ^
	-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 ^
	confluentinc/cp-kafka

docker network connect --ip 172.20.240.3 my-network kafka
```

Konteyner'ları başlatmak için şu kodları takip ediniz:

```
docker start zookeeper pg
timeout 6
docker start kafka pgadmin
```

burada `timeout 6` 6 saniye gecikme uygulayacaktır. Bunun nedeni kafka ve pgadmin için zookeeper ve pg'nin başlamış olması gerekir.

Şimdi projenin docker konteyner'larının oluşturulmasına geçelim.
Sırayla `Producer` ve `Consumer_Db` klasörlerine girelim.
Klasörlerin içerisindeki `docker-install.bat`,
`docker-run.bat`
dosyalarını sırayla çalıştıralım.

Docker Desktop'tan yada `docker ps` ile konteynerları kontrol edebilirsiniz.
