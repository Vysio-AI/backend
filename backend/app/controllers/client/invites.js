const prisma = require('../prisma-client');

const validateReferral = async (ctx) => {
  // Mark invite with matching referral code as status completed
  console.log("Validating Referral")
  console.log("Params:")
  console.log(ctx.request.body)

  console.log("Checking for invite")
  const invite = await prisma.invite.findUnique({
    where: {
      referralCode: ctx.request.body.referralCode,
      status: "SENT"
    }
  });

  // If no pending invite matched the given referral code
  if (!invite) {
    ctx.body = {
      "err": "No invite matching referral code used."
    }
    ctx.status = 200
    return
  }

  // Update invite status
  console.log("Updating invite status")
  await prisma.invite.update({
    where: {
      referralCode: ctx.request.body.referralCode
    },
    data: {
      status: 'COMPLETED'
    }
  });

  // Associate client with practitioner who invited them
  console.log("Associating client with practitioner")
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
