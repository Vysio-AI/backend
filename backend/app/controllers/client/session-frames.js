const prisma = require('../prisma-client');

const create = async (ctx) => {
  const session = await prisma.sessionFrame.findUnique({
    where: {
      id: ctx.request.body.sessionId
    }
  })

  if (session.clientId != ctx.client.id) {
    ctx.status = 401;
    return
  }

  const sessionFrame = await prisma.sessionFrame.create({
    data: {
      ...ctx.request.body
    }
  });

  ctx.body = sessionFrame;
  ctx.status = 200
}

const get = async (ctx) => {
  const id = parseInt(ctx.params.id);

  const session = await prisma.sessionFrame.findUnique({
    where: {
      id: ctx.request.body.sessionId
    }
  })

  if (session.clientId != ctx.client.id) {
    ctx.status = 401;
    return
  }
  
  const sessionFrame = await prisma.sessionFrame.findUnique({
    where: {
      id: id
    }
  });

  ctx.body = sessionFrame;
  ctx.status = 200;
}

module.exports = {
  create,
  get,
};
