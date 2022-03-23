const prisma = require('../prisma-client');

const index = async (ctx) => {
  const sessionNotifications = await prisma.sessionNotification.findMany({
    where: {
      practitionerId: ctx.practitioner.id,
      viewed: false,
    },
    orderBy: {
      createdAt: 'desc',
    }
  });

  ctx.body = sessionNotifications;
  ctx.status = 200;
}

const get = async (ctx) => {
  const sessionNotificationId = parseInt(ctx.params.id);

  const sessionNotification = await prisma.sessionNotification.findUnique({
    where: {
      id: sessionNotificationId,
    },
  });

  // Check if the practitioner is authorized to view this notification
  if (sessionNotification.practitionerId !== ctx.practitioner.id) {
    ctx.status = 401;
    return
  }

  ctx.body = sessionNotification;
  ctx.status = 200;
}

const update = async (ctx) => {
  const sessionNotificationId = parseInt(ctx.params.id);

  const updateSessionNotification = await prisma.sessionNotification.update({
    where: {
      id: sessionNotificationId,
    },
    data: ctx.request.body,
  });

  ctx.body = updateSessionNotification;
  ctx.status = 200;
}

module.exports = {
  index,
  get,
  update,
}
