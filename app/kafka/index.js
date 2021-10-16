const { Kafka } = require('kafkajs')
const kafka = new Kafka({
  clientId: 'vysio-backend1',
  brokers: ['localhost:9092']
})

const setup = async (ctx, next) => {

  // Setup consumer
  const consumer = kafka.consumer({ groupId: 'vysio-backend1' })

  await consumer.connect()
  await consumer.subscribe({ topic: 'classifications', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(message);
      console.log({
        value: message.value.toString(),
      })
    },
  })

  await next();
}

const sendMessage = async (topic, key, message) => {
  const producer = kafka.producer();
  await producer.connect()
  const send = await producer.send({
    topic: topic,
    messages: [
      { key: key, value: message },
    ],
  })

  console.log(send);

  await producer.disconnect()
}

module.exports = {
  setup,
  sendMessage,
}