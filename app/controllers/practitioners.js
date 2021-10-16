const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const index = async (ctx) => {
  const allPractitioners = await prisma.practitioner.findMany();
  ctx.body = {
    data: allPractitioners
  };
  ctx.status = 200;
};

const get = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const practitioner = await prisma.practitioner.findUnique({
    where: {
      id: id
    }
  });
  ctx.body = {
    data: practitioner
  };
  ctx.status = 200;
}

const update = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const updatePractitioner = await prisma.practitioner.update({
    where: {
      id: id
    },
    data: ctx.request.body
  });
  ctx.body = {
    data: updatePractitioner
  }
  ctx.status = 200;
}

const destroy = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const practitioner = await prisma.practitioner.delete({
    where: {
      id: id
    }
  });
  ctx.status = 204;
}

const getAllClients = async (ctx) => {
  const practitionerId = parseInt(ctx.params.id);
  const clients = await prisma.client.findMany({
    where: {
      practitionerId: practitionerId
    }
  });
  ctx.body = {
    data: clients
  }
  ctx.status = 200;
}

const getNotificationSettings = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const settings = await prisma.practitionerNotificationSettings.findUnique({
    where: {
      practitionerId: id
    }
  });
  ctx.body = {
    data: settings
  }
  ctx.status = 200;
}

const updateNotificationSettings = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const updateSettings = await prisma.practitionerNotificationSettings.update({
    where: {
      practitionerId: id
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
  getAllClients,
  getNotificationSettings,
  updateNotificationSettings,
};