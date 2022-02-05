const prisma = require('../prisma-client');
const { Prisma } = require('@prisma/client');
const kafka = require('../../kafka/index');
const nd = require("nanoid");

const index = async (ctx) => {
  const invites = await prisma.invite.findMany({
    where: {
      practitionerId: ctx.practitioner.id
    }
  });

  ctx.body = invites
  ctx.status = 200
}

const create = async (ctx) => {
  let inviteExistsForEmail = false;

  // Create invite
  const invite = await prisma.invite.create({
    data: {
      ...ctx.request.body,
      referralCode: nd.nanoid(10)
    }
  }).catch((err) => {
    // Handle case when invite already exists for email
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        inviteExistsForEmail = true
      }
    }
  });

  if (inviteExistsForEmail) {
    ctx.body = {
      err: "Invite already exists for given email."
    };
    ctx.status = 400;
    return
  }

  // Produce invite object to kafka topic
  // Use practitionerId as key to ensure all invites produced by a
  // practitioner are written to the same kafka partition
  await kafka.sendMessage(kafka.topics.INVITES, invite.practitionerId, invite);

  ctx.body = invite
  ctx.status = 200
}

const update = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const invite = await prisma.invite.findUnique({
    where: {
      id: id
    }
  });

  // No invite exists for given id
  if (!invite) {
    ctx.status = 404;
    return
  }

  // Invite does not belong to practitioner
  if (invite.practitionerId != ctx.practitioner.id) {
    ctx.status = 401;
    return
  }

  const updateInvite = await prisma.invite.update({
    where: {
      id: id
    },
    data: {
      ...ctx.request.body
    }
  });

  ctx.body = updateInvite;
  ctx.status = 200;
}

module.exports = {
  create,
  update,
  index,
}
