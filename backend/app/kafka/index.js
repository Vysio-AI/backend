const prisma = require('../controllers/prisma-client');
const { Kafka } = require('kafkajs')
const { client } = require('../redis/index');
const kafka = new Kafka({
  clientId: 'vysio-backend1',
  brokers: [process.env.BROKER]
})

const sessionFrames = require('../controllers/session-frames');

const topics = {
  CLASSIFICATIONS: "classifications",
  SESSION_END: "session-end",
  WATCH: "watch",
};

const setup = async (socketService) => {
  // Setup consumer
  const consumer = kafka.consumer({ groupId: 'vysio-backend1' });

  await consumer.connect();

  await consumer.subscribe({ topic: topics.CLASSIFICATIONS });
  await consumer.subscribe({ topic: topics.SESSION_END });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      switch (topic) {
        case topics.CLASSIFICATIONS:
          processClassifications(topic, partition, message, socketService);
          break;
        case topics.SESSION_END:
          processSessionEnd(topic, partition, message, socketService);
          break;
        default:
          console.log(topic);
          console.log("Topic handler not implemented");
      }
    },
  });
}

const processClassifications = async (topic, partition, message, socketService) => {
  // Parse json message
  const jsonMsg = JSON.parse(message.value.toString());
  console.log(jsonMsg);

  // Emit to sessionFrame socket
  const exerciseId = await client.get(`${jsonMsg.session_id}:${jsonMsg.classification}`)
  if (exerciseId) {
    socketService.emitter(`sessionFrame:${jsonMsg.session_id}`, jsonMsg);

    // Persist to database
    const sessionFrame = await prisma.sessionFrame.create({
      data: {
        sessionId: Number(jsonMsg.session_id),
        startTime: jsonMsg.window.start,
        endTime: jsonMsg.window.end,
        exerciseId: Number(exerciseId),
      }
    });
    console.log(sessionFrame);
  }
  console.log("Activity not in protocol for this session")
}

const processSessionEnd = async (topic, partition, message, socketService) => {
  // Potential TODO: Create the SessionMetrics record for the session
  // 1. Clean the session data -> Low pass filter on the sessionFrames
  // 2. Detect transition points
  // 3. Update overall client stats
  // 4. Update the processed state
  // 5. Send websocket message on sessions:userId to update processed status
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
  topics,
}
