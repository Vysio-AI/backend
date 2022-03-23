const prisma = require('../controllers/prisma-client')
const { Kafka } = require('kafkajs')
const { getExerciseId, addSessionEnd, isSessionEnded } = require('../redis/cache');
const { appendToBuffer, flushBuffer, isOutsideBufferWindow } = require('../redis/buffer');
const { aggregateSessionFrames } = require('../job-processors/session-processor');

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
  WINDOWED: "windowed"
};

const setup = async (socketService) => {
  // Setup consumer
  const consumer = kafka.consumer({ groupId: 'vysio-backend1' });

  await consumer.connect();

  // Subscribe to relevant topics
  await consumer.subscribe({ topic: topics.WATCH });
  await consumer.subscribe({ topic: topics.WINDOWED });
  await consumer.subscribe({ topic: topics.CLASSIFICATIONS });
  await consumer.subscribe({ topic: topics.SESSION_END });
  await consumer.subscribe({ topic: topics.NOTIFICATIONS });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      switch (topic) {
        case topics.WATCH:
          await processWatch(message, socketService);
          break;
        case topics.CLASSIFICATIONS:
          await processClassifications(message, socketService);
          break;
        case topics.SESSION_END:
          await processSessionEnd(message, socketService);
          break;
        case topics.NOTIFICATIONS:
          await processNotification(message, socketService);
          break;
        case topics.WINDOWED:
          await processWindowed(message);
          break;
        default:
          console.log(`Topic handler not implemented for ${topic}`);
      }
    },
  });
}

// Process watch messages and window them based on session and user id
const processWatch = async (message, socketService) => {
  var msg = JSON.parse(message.value.toString());
  console.log(msg);

  let outsideBufferWindow = await isOutsideBufferWindow(msg.user_id, msg.session_id, msg.timestamp);
  if (outsideBufferWindow) {
    // Flush buffer and send message to windowed topic
    let windowedData = await flushBuffer(msg.user_id, msg.session_id);

    let key = String(msg.user_id)
    let value = JSON.stringify(windowedData);
    sendMessage(topics.WINDOWED, key, value);
  }

  // Append to buffer
  let success = await appendToBuffer(msg.user_id, msg.session_id, msg.timestamp,[
    msg.a_x,
    msg.a_y,
    msg.a_z,
    msg.w_x,
    msg.w_y,
    msg.w_z
  ]);

  if (!success) {
    console.log("Failed to append to buffer, window may be missing data");
  }
}

const processWindowed = async (message) => {
  let msg = JSON.parse(message.value.toString());
  console.log(msg);
}

const processClassifications = async (message, socketService) => {
  // Parse json message
  var jsonMsg = JSON.parse(message.value.toString());
  console.log(jsonMsg);

  // If session is ended, ignore the incoming classification
  let sessionEnded = await isSessionEnded(jsonMsg["user_id"], jsonMsg["session_id"]);
  if (sessionEnded) {
    console.log("session ended, ignoring session frames")
    return
  }

  console.log("Fetching exerciseId")
  const exerciseId = await getExerciseId(
    jsonMsg["user_id"],
    jsonMsg["session_id"],
    jsonMsg["classification"]
  )

  console.log(exerciseId)

  // Session frame was classified as an activity that's not in the session's
  // plan
  if (!exerciseId) {
    console.log("Exercise not defined")
    return
  }

  // Emit to session-frame socket
  socketService.emitter(`session-frame:${jsonMsg.session_id}`, jsonMsg);

  await prisma.sessionFrame.create({
    data: {
      startTime: new Date(jsonMsg["start_time"]),
      endTime: new Date(jsonMsg["end_time"]),
      exerciseId: exerciseId,
      sessionId: jsonMsg["session_id"],
    }
  });
}

const processNotification = async (message, socketService) => {
  // Parse JSON invite object
  const notification = JSON.parse(message.value.toString());

  // Get notification type from message
  const notificationHandler = notificationHandlers[notification.notificationType]

  if (!notificationHandler) {
    console.log(`No function implemented to process ${notification.notificationType} notifications`);
    return
  }

  await notificationHandler(notification, socketService)
}

// Not 100% sure about this, since we might not be finished processing all
// the session frames for a particular session before we receive this
// message... But it will work for now...
const processSessionEnd = async (message, socketService) => {
  jsonMsg = JSON.parse(message.value.toString())
  console.log(jsonMsg)

  const session = await prisma.session.findUnique({
    where: {
      id: jsonMsg.sessionId
    },
    include: {
      flags: true,
    }
  });

  // Aggregate session frames to reduce number of records in database and
  // introduce natural breakpoints
  await aggregateSessionFrames(session.id);

  // Create/update session metrics

  // Produce session summary notification if session is notable
  if (isNotableSession(session)) {
    await sendMessage(
      topics.NOTIFICATIONS,
      session.practitionerId.toString(),
      JSON.stringify({
        notificationType: 'SESSION',
        sessionId: session.id,
        clientId: session.clientId,
        planId: session.planId,
        practitionerId: session.practitionerId,
      })
    )
  }

  const updateSession = await prisma.session.update({
    where: {
      id: jsonMsg.sessionId
    },
    data: {
      status: 'PROCESSED'
    }
  })

  // Emit message over socket to notify frontend that session has been processed
  socketService.emitter(`session:${updateSession.id}`, 'PROCESSED');
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
