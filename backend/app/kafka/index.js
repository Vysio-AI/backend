const { Kafka } = require('kafkajs')
const kafka = new Kafka({
  clientId: 'vysio-backend1',
  brokers: [process.env.BROKER]
})

const sessionFrames = require('../controllers/client/session-frames');
const { sendInviteEmail } = require('../email/index');

const topics = {
  CLASSIFICATIONS: "classifications",
  SESSION_END: "session-end",
  WATCH: "watch",
  INVITES: "invites",
};

const setup = async (socketService) => {
  // Setup consumer
  const consumer = kafka.consumer({ groupId: 'vysio-backend1' });

  await consumer.connect();

  // Subscribe to relevant topics
  await consumer.subscribe({ topic: topics.CLASSIFICATIONS });
  await consumer.subscribe({ topic: topics.SESSION_END });
  await consumer.subscribe({ topic: topics.INVITES });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      switch (topic) {
        case topics.CLASSIFICATIONS:
          await processClassifications(message, socketService);
          break;
        case topics.SESSION_END:
          await processSessionEnd(topic, partition, message, socketService);
          break;
        case topics.INVITES:
          await processInvites(message);
          break;
        default:
          console.log(topic);
          console.log("Topic handler not implemented");
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

const processInvites = async (message) => {
  // Parse JSON invite object
  const invite = JSON.parse(message.value.toString());
  console.log(invite);

  // TODO: Finalize email template and refactor invite model to have required
  //       fields
  //
  // sendInviteEmail(invite.clientEmail, {
  //   client_name: invite.clientName,
  //   practitioner_name: invite.practitionerName,
  //   referral_code: invite.referralCode
  // });
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
