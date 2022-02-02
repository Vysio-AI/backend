const prisma = require('../prisma-client');

const get = async (ctx) => {
  const id = parseInt(ctx.params.id);

  const flag = await prisma.flag.findUnique({
    where: {
      id: id
    }
  });

  const session = await prisma.session.findUnique({
    where: {
      id: flag.sessionId
    }
  });

  if (session.practitionerId != ctx.practitioner.id) {
    ctx.status = 401;
    return
  }

  ctx.body = flag
  ctx.status = 200;
}

module.exports = {
  get,
};
