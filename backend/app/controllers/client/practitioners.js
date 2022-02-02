const prisma = require('../prisma-client');

const get = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const practitioner = await prisma.practitioner.findUnique({
    where: {
      id: id
    }
  });
  ctx.body = practitioner;
  ctx.status = 200;
}

module.exports = {
  get,
};
