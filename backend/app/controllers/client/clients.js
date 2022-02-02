const prisma = require('../prisma-client');

const get = async (ctx) => {
  const clientId = parseInt(ctx.params.id);

  // Check client is the client making request
  if (ctx.client.id != clientId) {
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

  // Check client is the client making request
  if (ctx.client.id != clientId) {
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

  // Check client is the client making request
  if (ctx.client.id != clientId) {
    ctx.status = 401;
    return
  }

  const client = await prisma.client.delete({
    where: {
      id: clientId
    }
  });

  ctx.status = 204;
}

const getAllPlans = async (ctx) => {
  const clientId = parseInt(ctx.params.id);

  // Check client is the client making request
  if (ctx.client.id != clientId) {
    ctx.status = 401;
    return
  }

  const limit = parseInt(ctx.params.limit);
  const offset = parseInt(ctx.params.offset);

  const client = await prisma.client.findUnique({
    where: {
      id: clientId
    }
  });

  const plans = await prisma.plan.findMany({
    take: limit,
    skip: offset,
    where: {
      id: { in: client.plans }
    }
  });

  ctx.body = plans;
  ctx.status = 200;
}

const getAllSessions = async (ctx) => {
  const clientId = parseInt(ctx.params.id);

  // Check client is the client making request
  if (ctx.client.id != clientId) {
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
  get,
  update,
  destroy,
  getAllPlans,
  getAllSessions,
};
