const prisma = require('../prisma-client');

const get = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const sessionFrame = await prisma.sessionFrame.findUnique({
    where: {
      id: id
    }
  });

  ctx.body = {
    data: sessionFrame
  };
  ctx.status = 200;
}

module.exports = {
  get,
};
