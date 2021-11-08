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

  ctx.body = {
    data: client
  };
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

  ctx.body = {
    data: updateClient
  }
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

const getNotificationSettings = async (ctx) => {
  const clientId = parseInt(ctx.params.id);

  // Check client is the client making request
  if (ctx.client.id != clientId) {
    ctx.status = 401;
    return
  }

  const settings = await prisma.clientNotificationSettings.findUnique({
    where: {
      clientId: clientId
    }
  });

  ctx.body = {
    data: settings
  }
  ctx.status = 200;
}

const updateNotificationSettings = async (ctx) => {
  const id = parseInt(ctx.params.id);

  // Check client is the client making request
  if (ctx.client.id != id) {
    ctx.status = 401;
  }

  const updateSettings = await prisma.clientNotificationSettings.update({
    where: {
      clientId: id
    },
    data: ctx.request.body
  });
  ctx.body = {
    data: updateSettings
  }
  ctx.status = 200;
}

const getAllProtocols = async (ctx) => {
  const clientId = parseInt(ctx.params.id);

  // Check client is the client making request
  if (ctx.client.id != clientId) {
    ctx.status = 401;
    return
  }

  const limit = parseInt(ctx.params.limit);
  const offset = parseInt(ctx.params.offset);

  const protocols = await prisma.protocol.findMany({
    take: limit,
    skip: offset,
    where: {
      clientId: clientId
    }
  });

  ctx.body = {
    data: protocols
  };
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

  ctx.body = {
    data: sessions
  }
  ctx.status = 200;
}

module.exports = {
  get,
  update,
  destroy,
  getNotificationSettings,
  updateNotificationSettings,
  getAllProtocols,
  getAllSessions,
};
