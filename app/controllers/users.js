const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const index = async (ctx) => {
  const allUsers = await prisma.user.findMany();
  ctx.body = {
    data: allUsers
  };
  ctx.status = 200;
};

const create = async (ctx) => {
  const user = await prisma.user.create({
    data: ctx.request.body
  });

  ctx.body = {
    data: user
  };
  ctx.status = 200;
}

const get = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const user = await prisma.user.findUnique({
    where: {
      id: id
    }
  });
  ctx.body = {
    data: user
  };
  ctx.status = 200;
}

module.exports = {
  index,
  create,
  get
};
