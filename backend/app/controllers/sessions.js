const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (ctx) => {
  const session = await prisma.session.create({
    data: {
      ...ctx.request.body
    }
  });

  ctx.body = {
    data: session
  };
  ctx.status = 200
}

const get = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const session = await prisma.session.findUnique({
    where: {
      id: id
    }
  });

  ctx.body = {
    data: session
  };
  ctx.status = 200;
}

const update = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const updateSession = await prisma.session.update({
    where: {
      id: id
    },
    data: ctx.request.body
  });

  ctx.body = {
    data: updateSession
  }
  ctx.status = 200;
}

const destroy = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const session = await prisma.session.delete({
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
