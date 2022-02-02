const prisma = require('../prisma-client');

const get = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const practitioner = await prisma.practitioner.findUnique({
    where: {
      id: id
    }
  });

  delete practitioner.auth0Sub;

  ctx.body = practitioner;
  ctx.status = 200;
}

module.exports = {
  get,
};
