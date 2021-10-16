const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const index = async (ctx) => {
  const allClients = await prisma.client.findMany();
  ctx.body = {
    data: allClients
  };
  ctx.status = 200;
};

const get = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const client = await prisma.client.findUnique({
    where: {
      id: id
    }
  });
  ctx.body = {
    data: client
  };
  ctx.status = 200;
}

const update = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const updateClient = await prisma.client.update({
    where: {
      id: id
    },
    data: ctx.request.body
  });
  ctx.body = {
    data: updateClient
  }
  ctx.status = 200;
}

const destroy = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const client = await prisma.client.delete({
    where: {
      id: id
    }
  });
  ctx.status = 204;
}

const getNotificationSettings = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const settings = await prisma.clientNotificationSettings.findUnique({
    where: {
      clientId: id
    }
  });
  ctx.body = {
    data: settings
  }
  ctx.status = 200;
}

const updateNotificationSettings = async (ctx) => {
  const id = parseInt(ctx.params.id);
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

module.exports = {
  index,
  get,
  update,
  destroy,
  getNotificationSettings,
  updateNotificationSettings
};
