const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (ctx) => {
  const protocol = await prisma.protocol.create({
    data: {
      ...ctx.request.body
    }
  });

  ctx.body = {
    data: protocol
  };
  ctx.status = 200
}

const get = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const protocol = await prisma.protocol.findUnique({
    where: {
      id: id
    }
  });

  ctx.body = {
    data: protocol
  };
  ctx.status = 200;
}

const update = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const updateProtocol = await prisma.protocol.update({
    where: {
      id: id
    },
    data: ctx.request.body
  });

  ctx.body = {
    data: updateProtocol
  }
  ctx.status = 200;
}

const destroy = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const protocol = await prisma.protocol.delete({
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
}
