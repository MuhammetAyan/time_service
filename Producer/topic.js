const { Kafka } = require("kafkajs");
const conf = require("./conf.json");

createTopic();

async function createTopic() {
    try {
        const kafka = new Kafka(conf.kafka);
    
        const admin = kafka.admin();
        console.log("Kafka Broker'a bağlanılıyor...");
        await admin.connect();
        console.log("Kafka Broker'a bağlantı başarılı. Topic üretilecek.");
        await admin.createTopics({
            topics: [
                {
                    topic: "TimeDbTopic",
                    numPartitions: 1
                }
            ]
        })
        console.log("Topic başarılı bir şekilde oluşturulmuştur.");
        await admin.disconnect();
    } catch (error) {
        console.log("Bir hata oluştu.", error);
    }
}

module.exports = {
    createTopic
}