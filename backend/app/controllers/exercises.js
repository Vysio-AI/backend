const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (ctx) => {
  const exercise = await prisma.exercise.create({
    data: {
      ...ctx.request.body
    }
  });

  ctx.body = {
    data: exercise
  };
  ctx.status = 200
}

const get = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const exercise = await prisma.exercise.findUnique({
    where: {
      id: id
    }
  });

  ctx.body = {
    data: exercise
  };
  ctx.status = 200;
}

const update = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const updateExercise = await prisma.exercise.update({
    where: {
      id: id
    },
    data: ctx.request.body
  });

  ctx.body = {
    data: updateExercise
  }
  ctx.status = 200;
}

const destroy = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const exercise = await prisma.exercise.delete({
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
