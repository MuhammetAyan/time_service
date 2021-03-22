const { Kafka } = require("kafkajs");
const { Pool, Client } = require('pg');
const conf = require("./conf.json");
const { writeData } = require("./connection");


const client = new Client(conf.pg);
client.connect();

createConsumer();

async function createConsumer() {
    try {
        const kafka = new Kafka(conf.kafka);
    
        const consumer = kafka.consumer({
            groupId: "time_db_consumer_group"
        });

        console.log("Consumer'a bağlanılıyor...");
        await consumer.connect();
        console.log("Bağlantı başarılı.");
        //Consumer subscribe...
        await consumer.subscribe({
            topic: "TimeDbTopic",
            fromBeginning: true // Başlangıçta okumaya başla
        });

        await consumer.run({
            eachMessage: async result => {
                var row = JSON.parse(result.message.value);
                console.log(row);
                writeData(row);
            }
        })
    } catch (error) {
        console.log("Bir hata oluştu.", error);
    }
}