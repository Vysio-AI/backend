const prisma = require('../prisma-client');

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

const getAllExercises = async (ctx) => {
  const protocolId = parseInt(ctx.params.id);
  const exercises = await prisma.exercise.findMany({
    where: {
      protocolId: protocolId
    }
  });

  ctx.body = {
    data: exercises
  };
  ctx.status = 200;
}

const getAllSessions = async (ctx) => {
  const protocolId = parseInt(ctx.params.id);
  const sessions = await prisma.session.findMany({
    where: {
      protocolId: protocolId
    }
  });

  ctx.body = {
    data: sessions
  }
  ctx.status = 200;
}

module.exports = {
  create,
  get,
  update,
  destroy,
  getAllExercises,
  getAllSessions
};
