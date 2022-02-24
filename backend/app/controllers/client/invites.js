const prisma = require('../prisma-client');

const validateReferral = async (ctx) => {
  // Mark invite with matching referral code as status completed
  const invite = await prisma.invite.findUnique({
    where: {
      referralCode: ctx.request.body.referralCode,
    }
  });

  // If no pending invite matched the given referral code
  if (!invite || invite.status != "SENT") {
    ctx.body = {
      "err": "No invite matching referral code used."
    }
    ctx.status = 200
    return
  }

  // Update invite status
  await prisma.invite.update({
    where: {
      referralCode: ctx.request.body.referralCode
    },
    data: {
      status: 'COMPLETED'
    }
  });

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
