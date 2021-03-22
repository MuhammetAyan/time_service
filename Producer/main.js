const { Kafka } = require("kafkajs");
const conf = require("./conf.json");
const { createTable, writeData } = require("./connection");
const { createTopic } = require("./topic");

createTopic();
// createTable();
createProducer();

async function createProducer() {
    try {
        const kafka = new Kafka(conf.kafka);
        const producer = kafka.producer();
        console.log("Producer'a bağlanılıyor...");
        await producer.connect();
        console.log("bağlantı başarılı.");
        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        }
        while (true) {
            try {
                const message_result = await producer.send({
                    topic: "TimeDbTopic",
                    messages: [
                        {
                            value: JSON.stringify(new Date()),
                            partition: 0
                        }
                    ]
                });
                console.log("Veri gönderildi: ", JSON.stringify(message_result));
                await sleep(10000);
            } catch (error) {
                break
            }
        }
        setInterval(loop, 10000);
        await producer.disconnect();
    } catch (error) {
        console.log("Bir hata oluştu.", error);
    }
}