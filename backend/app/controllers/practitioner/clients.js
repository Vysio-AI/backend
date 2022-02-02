const prisma = require('../prisma-client');

const index = async (ctx) => {

  const limit = parseInt(ctx.params.limit);
  const offset = parseInt(ctx.params.offset);

  const allClients = await prisma.client.findMany({
    take: limit,
    skip: offset,
    where: {
      practitionerId: ctx.practitioner.id
    }
  });

  ctx.body = allClients;
  ctx.status = 200;
};

const get = async (ctx) => {
  const clientId = parseInt(ctx.params.id);

  // Check client is associated with practitioner making request
  if (ctx.practitioner.clients.every((client) => {
    client.id != clientId
  })) {
    ctx.status = 401;
    return
  }

  const client = await prisma.client.findUnique({
    where: {
      id: clientId
    }
  });

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
  if (ctx.practitioner.clients.every((client) => {
    client.id != clientId
  })) {
    ctx.status = 401;
    return
  }

  const limit = parseInt(ctx.params.limit);
  const offset = parseInt(ctx.params.offset);

  const plans = await prisma.plan.findMany({
    take: limit,
    skip: offset,
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
  if (ctx.practitioner.clients.every((client) => {
    client.id != clientId
  })) {
    ctx.status = 401;
    return
  }

  const limit = parseInt(ctx.params.limit);
  const offset = parseInt(ctx.params.offset);

  const sessions = await prisma.session.findMany({
    take: limit,
    skip: offset,
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
