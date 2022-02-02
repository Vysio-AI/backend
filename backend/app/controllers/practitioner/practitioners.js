const prisma = require('../prisma-client');

const get = async (ctx) => {
  const id = parseInt(ctx.params.id);

  if (id != ctx.practitioner.id) {
    ctx.status = 401
    return
  }

  const practitioner = await prisma.practitioner.findUnique({
    where: {
      id: id
    }
  });

  ctx.body = practitioner;
  ctx.status = 200;
}

const update = async (ctx) => {
  const id = parseInt(ctx.params.id);

  if (id != ctx.practitioner.id) {
    ctx.status = 401
    return
  }

  const updatePractitioner = await prisma.practitioner.update({
    where: {
      id: id
    },
    data: ctx.request.body
  });

  ctx.body = updatePractitioner;
  ctx.status = 200;
}

const destroy = async (ctx) => {
  const id = parseInt(ctx.params.id);

  if (id != ctx.practitioner.id) {
    ctx.status = 401
    return
  }

  await prisma.practitioner.delete({
    where: {
      id: id
    }
  });

  ctx.status = 204;
}

module.exports = {
  get,
  update,
  destroy,
};
