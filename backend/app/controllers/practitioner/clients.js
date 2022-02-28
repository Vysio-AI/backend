const prisma = require('../prisma-client');

const index = async (ctx) => {

  const allClients = await prisma.client.findMany({
    where: {
      practitionerId: ctx.practitioner.id
    }
  });

  clients = allClients.map(client => {
    delete client.auth0Sub;
    return client
  })

  ctx.body = clients;
  ctx.status = 200;
};

const get = async (ctx) => {
  const clientId = parseInt(ctx.params.id);

  const client = await prisma.client.findUnique({
    where: {
      id: clientId
    }
  });

  // Check client is associated with practitioner making request
  if (ctx.practitioner.id != client.practitionerId) {
    ctx.status = 401;
    return
  }

  delete client.auth0Sub;

  ctx.body = client;
  ctx.status = 200;
}

const update = async (ctx) => {
  const clientId = parseInt(ctx.params.id);

  // Check client is associated with practitioner making request
  if (ctx.practitioner.clients.every((client) => {
    client.id != clientId
  })) {
    ctx.status = 401;
    return
  }

  const updateClient = await prisma.client.update({
    where: {
      id: clientId
    },
    data: ctx.request.body
  });

  ctx.body = updateClient;
  ctx.status = 200;
}

const destroy = async (ctx) => {
  const clientId = parseInt(ctx.params.id);

  // Check client is associated with practitioner making request
  if (ctx.practitioner.clients.every((client) => {
    client.id != clientId
  })) {
    ctx.status = 401;
    return
  }

  await prisma.client.delete({
    where: {
      id: clientId
    }
  });

  ctx.status = 204;
}

const getAllPlans = async (ctx) => {
  const clientId = parseInt(ctx.params.id);

  // Check client is associated with practitioner making request
  const client = await prisma.client.findUnique({
    where: {
      clientId: clientId
    }
  });

  if (client.practitionerId !== ctx.practitioner.id) {
    ctx.status = 401;
    return
  }

  const plans = await prisma.plan.findMany({
    where: {
      clientId: clientId
    }
  });

  ctx.body = plans;
  ctx.status = 200;
}

const getAllSessions = async (ctx) => {
  const clientId = parseInt(ctx.params.id);

  // Check client is associated with practitioner making request
  const client = await prisma.client.findUnique({
    where: {
      clientId: clientId
    }
  });

  if (client.practitionerId !== ctx.practitioner.id) {
    ctx.status = 401;
    return
  }

  const sessions = await prisma.session.findMany({
    where: {
      clientId: clientId
    }
  });

  ctx.body = sessions;
  ctx.status = 200;
}

module.exports = {
  index,
  get,
  update,
  destroy,
  getAllPlans,
  getAllSessions,
};
