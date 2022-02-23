const { sendEmail, emailTemplates } = require('../email/index');
const prisma = require('../controllers/prisma-client');

const inviteNotificationHandler = async (notification) => {
  const practitioner = await prisma.practitioner.findUnique({
    where: {
      id: parseInt(notification.practitionerId),
    }
  })

  const [isSent, error] = await sendEmail(
    notification.clientEmail,
    emailTemplates.INVITE,
    {
      client_first_name: notification.clientFirstName,
      client_last_name: notification.clientLastName,
      practitioner_first_name: practitioner.firstName,
      practitioner_last_name: practitioner.lastName,
      referral_code: notification.referralCode
    }
  );

  if (!isSent) {
    console.log(`Unable to send invite to ${notification.clientEmail}`);
    console.log(error);
  }

  const inviteStatus = isSent ? 'SENT' : 'FAILED'

  // Update invite record with relevant status
  await prisma.invite.update({
    where: {
      id: notification.id
    },
    data: {
      status: inviteStatus
    }
  });
}

const getSessionUrl = (sessionId) => {
  return `https://vysio.ca/dashboard/sessions/${sessionId}`
}

const sessionNotificationHandler = async (notification) => {
  const client = await prisma.client.findUnique({
    where: {
      id: notification.clientId,
    }
  });

  const practitioner = await prisma.practitioner.findUnique({
    where: {
      id: notification.practitionerId,
    }
  });

  const [isSent, error] = await sendEmail(
    practitioner.email,
    emailTemplates.SESSION,
    {
      client_first_name: client.firstName,
      client_last_name: client.lastName,
      session_url: getSessionUrl(notification.sessionId),
    }
  );

  if (!isSent) {
    console.log(`Unable to send session to ${notification.clientEmail}`);
    console.log(error);
  }
}

const notificationHandlers = {
  INVITE: inviteNotificationHandler,
  SESSION: sessionNotificationHandler,
}

module.exports = {
  notificationHandlers,
}
