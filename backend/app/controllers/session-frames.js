const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (ctx) => {
  const sessionFrame = await prisma.sessionFrame.create({
    data: {
      ...ctx.request.body
    }
  });

  ctx.body = {
    data: sessionFrame
  };
  ctx.status = 200
}

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

const update = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const updateSessionFrame = await prisma.sessionFrame.update({
    where: {
      id: id
    },
    data: ctx.request.body
  });

  ctx.body = {
    data: updateSessionFrame
  };
  ctx.status = 200;
}

const destroy = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const sessionFrame = await prisma.sessionFrame.delete({
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
  destroy
};
