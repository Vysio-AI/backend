const prisma = require('../prisma-client');

const get = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const plan = await prisma.plan.findUnique({
    where: {
      id: id,
    },
    include: {
      clients: true,
    }
  });

  if (!plan.clients.includes(ctx.client.id)) {
    ctx.status = 401;
    return
  }

  ctx.body = plan;
  ctx.status = 200;
}

const getAllExercises = async (ctx) => {
  const planId = parseInt(ctx.params.id);

  const plan = await prisma.plan.findUnique({
    where: {
      id: planId,
    },
    include: {
      clients: true,
    }
  });

  if (!plan.clients.includes(ctx.client.id)) {
    ctx.status = 401;
    return
  }
  
  const exercises = await prisma.exercise.findMany({
    where: {
      planId: planId
    }
  });

  ctx.body = exercises;
  ctx.status = 200;
}

const getAllSessions = async (ctx) => {
  const planId = parseInt(ctx.params.id);

  const sessions = await prisma.session.findMany({
    where: {
      planId: planId,
      clientId: ctx.client.id
    }
  });

  ctx.body = sessions;
  ctx.status = 200;
}

module.exports = {
  get,
  getAllExercises,
  getAllSessions
};
