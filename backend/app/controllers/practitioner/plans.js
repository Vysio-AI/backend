const prisma = require('../prisma-client');

const index = async (ctx) => {
  const plans = await prisma.plan.findMany({
    where: {
      practitionerId: ctx.practitioner.id
    },
    include: {
      exercises: true,
      clients: true,
    }
  });

  ctx.body = plans
  ctx.status = 200
}

const create = async (ctx) => {

  const plan = await prisma.plan.create({
    data: {
      ...ctx.request.body,
      practitionerId: ctx.practitioner.id
    }
  });

  ctx.body = plan;
  ctx.status = 200
}

const get = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const plan = await prisma.plan.findUnique({
    where: {
      id: id,
      practitionerId: ctx.practitioner.id
    }
  });

  ctx.body = plan;
  ctx.status = 200;
}

const update = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const updateplan = await prisma.plan.update({
    where: {
      id: id,
      practitionerId: ctx.practitioner.id
    },
    data: ctx.request.body
  });

  ctx.body = updateplan;
  ctx.status = 200;
}

const destroy = async (ctx) => {
  const planId = parseInt(ctx.params.id);

  const plan = await prisma.plan.findUnique({
    where: {
      id: planId
    }
  });

  // Check that practitioner owns plan
  if (ctx.practitioner.id !== plan.practitionerId) {
    ctx.status = 401;
    return
  }

  // Cascade delete any exercises on this plan
  await prisma.exercise.deleteMany({
    where: {
      planId: planId
    }
  })

  await prisma.plan.delete({
    where: {
      id: planId
    }
  });

  ctx.status = 204;
}

const getAllExercises = async (ctx) => {
  const planId = parseInt(ctx.params.id);

  const plan = await prisma.plan.findUnique({
    where: {
      id: planId
    }
  });

  if (plan.practitionerId != ctx.practitioner.id) {
    ctx.status = 401
    return
  }

  const exercises = await prisma.exercise.findMany({
    where: {
      planId: planId,
    }
  });

  ctx.body = exercises;
  ctx.status = 200;
}

const getAllSessions = async (ctx) => {
  const planId = parseInt(ctx.params.id);

  const plan = await prisma.plan.findUnique({
    where: {
      id: planId
    }
  });

  if (plan.practitionerId != ctx.practitioner.id) {
    ctx.status = 401
    return
  }

  const sessions = await prisma.session.findMany({
    where: {
      planId: planId
    }
  });

  ctx.body = sessions;
  ctx.status = 200;
}

module.exports = {
  index,
  create,
  get,
  update,
  destroy,
  getAllExercises,
  getAllSessions
};
