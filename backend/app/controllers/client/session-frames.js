const prisma = require('../prisma-client');

const get = async (ctx) => {
  const id = parseInt(ctx.params.id);

  const session = await prisma.session.findUnique({
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
  get,
};
