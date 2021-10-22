const { Kafka } = require('kafkajs')
const kafka = new Kafka({
  clientId: 'vysio-backend1',
  brokers: [process.env.BROKER]
})

const sessionFrames = require('../controllers/session-frames');

const setup = async (socketService) => {
  // Setup consumer
  const consumer = kafka.consumer({ groupId: 'vysio-backend1' });

  await consumer.connect();

  await consumer.subscribe({ topic: 'classifications' })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      // Parse json message
      const jsonMsg = JSON.parse(message.value.toString());
      console.log(jsonMsg);

      // Emit to sessionFrame socket
      socketService.emitter(`sessionFrame:${jsonMsg.session_id}`, jsonMsg);

      // Persist to database
      // TODO
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