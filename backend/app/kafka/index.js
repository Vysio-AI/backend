const prisma = require('../controllers/prisma-client')
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'vysio-backend1',
  brokers: [process.env.BROKER]
})

const sessionFrames = require('../controllers/client/session-frames');
const { notificationHandlers } = require('../notifications/index');

const topics = {
  CLASSIFICATIONS: "classifications",
  SESSION_END: "session-end",
  WATCH: "watch",
  NOTIFICATIONS: "notifications",
};

const setup = async (socketService) => {
  // Setup consumer
  const consumer = kafka.consumer({ groupId: 'vysio-backend1' });

  await consumer.connect();

  // Subscribe to relevant topics
  await consumer.subscribe({ topic: topics.CLASSIFICATIONS });
  await consumer.subscribe({ topic: topics.SESSION_END });
  await consumer.subscribe({ topic: topics.NOTIFICATIONS });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      switch (topic) {
        case topics.CLASSIFICATIONS:
          await processClassifications(message, socketService);
          break;
        case topics.SESSION_END:
          await processSessionEnd(message, socketService);
          break;
        case topics.NOTIFICATIONS:
          await processNotification(message);
          break;
        default:
          console.log(`Topic handler not implemented for ${topic}`);
      }
    },
  });
}

const processClassifications = async (message, socketService) => {
  // Parse json message
  const jsonMsg = JSON.parse(message.value.toString());
  console.log(jsonMsg);

  // Emit to sessionFrame socket
  socketService.emitter(`sessionFrame:${jsonMsg.session_id}`, jsonMsg);

  // Persist to database
  // TODO
}

const processNotification = async (message) => {
  // Parse JSON invite object
  const notification = JSON.parse(message.value.toString());

  // Get notification type from message
  const notificationHandler = notificationHandlers[notification.notificationType]

  if (!notificationHandler) {
    console.log(`No function implemented to process ${notification.notificationType} notifications`);
    return
  }

  await notificationHandler(notification)
}

// Not 100% sure about this, since we might not be finished processing all
// the session frames for a particular session before we receive this
// message... But it will work for now...
const processSessionEnd = async (message, socketService) => {
  message = JSON.parse(message.value.toString())

  const updateSession = await prisma.session.update({
    where: {
      id: message.sessionId
    },
    data: {
      endTime: message.timestamp
    },
    include: {
      flags: true
    },
  })

  // Create/update session metrics

  // Produce session summary notification if session is notable
  if (isNotableSession(updateSession)) {
    await sendMessage(
      topics.NOTIFICATIONS,
      updateSession.practitionerId.toString(),
      JSON.stringify({
        notificationType: 'SESSION',
        sessionId: updateSession.id,
        flags: updateSession.flags,
        clientId: updateSession.clientId,
        planId: updateSession.planId,
        practitionerId: updateSession.practitionerId,
      })
    )
  }

  // Emit message over socket to notify frontend that session has been processed
  socketService.emitter(
    `sessions:${updateSession.clientId}`,
    `Session ${updateSession.id} sucessfully processed`
  );
}

const isNotableSession = (session) => {
  return session.flags.length > 0
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
