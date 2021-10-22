const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const signupClient = async (ctx) => {
  const client = await prisma.client.create({
    data: {
      ...ctx.request.body,
      auth0Sub: ctx.state.user.sub,
    }
  });

  const settings = await prisma.clientNotificationSettings.create({
    data: {
      clientId: client.id
    }
  });

  ctx.body = {
    data: client
  };
  ctx.status = 200;
}

const signupPractitioner = async (ctx) => {
  const practitioner = await prisma.practitioner.create({
    data: {
      ...ctx.request.body,
      auth0Sub: ctx.state.user.sub,
    }
  });

  const settings = await prisma.practitionerNotificationSettings.create({
    data: {
      practitionerId: practitioner.id
    }
  });

  ctx.body = {
    data: practitioner
  };
  ctx.status = 200;
}

module.exports = {
  signupClient,
  signupPractitioner,
};