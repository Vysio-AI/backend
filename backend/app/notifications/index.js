const { sendInviteEmail } = require('../email/index');
const prisma = require('../controllers/prisma-client');

const inviteNotificationHandler = async (notification) => {
  const practitioner = await prisma.practitioner.findUnique({
    where: {
      id: parseInt(notification.practitionerId),
    }
  })

  const [isSent, error] = await sendInviteEmail(notification.clientEmail, {
    client_first_name: notification.clientFirstName,
    client_last_name: notification.clientLastName,
    practitioner_first_name: practitioner.firstName,
    practitioner_last_name: practitioner.lastName,
    referral_code: notification.referralCode
  });

  if (!isSent) {
    console.log(`Unable to send invite to ${notification.clientEmail}`);
    console.log(error);
  }

  const inviteStatus = isSent ? 'SENT' : 'FAILED'

  // Update invite record with relevant status
  const updateInvite = await prisma.invite.update({
    where: {
      id: notification.id
    },
    data: {
      status: inviteStatus
    }
  });
}

const notificationHandlers = {
  INVITE: inviteNotificationHandler,
}

module.exports = {
  notificationHandlers,
}
