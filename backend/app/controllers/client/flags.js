const prisma = require('../prisma-client');

const create = async (ctx) => {
  const session = await prisma.session.findUnique({
    where: {
      id: ctx.request.body.sessionId
    }
  });

  if (!session) {
    ctx.status = 400;
    return
  }

  if (session.clientId != ctx.client.id) {
    ctx.status = 401;
    return
  }

  const flag = await prisma.flag.create({
    data: {
      ...ctx.request.body
    }
  });

  ctx.body = flag;
  ctx.status = 200;
}

const get = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const flag = await prisma.flag.findUnique({
    where: {
      id: id,
      clientId: ctx.client.id,
    }
  });

  ctx.body = flag;
  ctx.status = 200;
}

const update = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const updateFlag = await prisma.flag.update({
    where: {
      id: id,
      clientId: ctx.client.id
    },
    data: ctx.request.body
  });

  ctx.body = updateFlag;
  ctx.status = 200;
}

const destroy = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const flag = await prisma.flag.delete({
    where: {
      id: id,
      clientId: ctx.client.id
    }
  });

  ctx.status = 204;
}

module.exports = {
  create,
  get,
  update,
  destroy,
};
