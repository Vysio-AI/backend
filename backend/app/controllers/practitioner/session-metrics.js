const prisma = require('../prisma-client');

const index = async (ctx) => {
  const sessionMetrics = await prisma.sessionMetric.findMany({
    where: {
      clientId: ctx.request.body.clientId,
    },
    orderBy: {
      startTime: 'desc',
    }
  });

  ctx.body = sessionMetrics;
  ctx.status = 200;
}

const get = async (ctx) => {
  const clientId = parseInt(ctx.params.id)
  const sessionMetrics = await prisma.sessionMetric.findMany({
    where: {
      clientId: clientId,
    },
    orderBy: {
      startTime: 'desc',
    }
  });

  ctx.body = sessionMetrics;
  ctx.status = 200;
}

module.exports = {
  index,
  get
}
