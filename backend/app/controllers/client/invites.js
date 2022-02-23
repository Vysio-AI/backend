const prisma = require('../prisma-client');

const validateReferral = async (ctx) => {
  // Mark invite with matching referral code as status completed
  const updateInvite = await prisma.invite.update({
    where: {
      referralCode: ctx.request.body.referralCode,
      status: 'SENT'
    },
    data: {
      status: 'COMPLETED'
    }
  });

  // If no pending invite matched the given referral code
  if (!updateInvite) {
    ctx.body = {
      "err": "No invite matching referral code used."
    }
    ctx.status = 200
    return
  }

  // Associate client with practitioner who invited them
  const updateClient = await prisma.client.update({
    where: {
      id: ctx.client.id
    },
    data: {
      practitionerId: updateInvite.practitionerId
    }
  });

  ctx.body = updateClient
  ctx.status = 200
}

module.exports = {
  validateReferral,
}
