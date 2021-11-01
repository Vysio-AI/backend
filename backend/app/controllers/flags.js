const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (ctx) => {
  const flag = await prisma.flag.create({
    data: {
      ...ctx.request.body
    }
  });

  ctx.body = {
    data: flag
  };
  ctx.status = 200
}

const get = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const flag = await prisma.flag.findUnique({
    where: {
      id: id
    }
  });

  ctx.body = {
    data: flag
  };
  ctx.status = 200;
}

const update = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const updateFlag = await prisma.flag.update({
    where: {
      id: id
    },
    data: ctx.request.body
  });

  ctx.body = {
    data: updateFlag
  }
  ctx.status = 200;
}

const destroy = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const flag = await prisma.flag.delete({
    where: {
      id: id
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
