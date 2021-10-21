const { Kafka } = require('kafkajs')
const kafka = new Kafka({
  clientId: 'vysio-backend1',
  brokers: ['kafka1:19092']
})



const setup = async (socketService) => {
  // Setup consumer
  const consumer = kafka.consumer({ groupId: 'vysio-backend1' });

  await consumer.connect();

  await consumer.subscribe({ topic: 'classifications' })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      })
      socketService.emitter('sessionFrame:23423', message.value.toString());
    },
  });
}

const sendMessage = async (topic, key, message) => {
  const producer = kafka.producer();
  await producer.connect()
  await producer.send({
    topic: topic,
    messages: [
      { key: key, value: message },
    ],
  })

  await producer.disconnect()
}

module.exports = {
  setup,
  sendMessage,
}