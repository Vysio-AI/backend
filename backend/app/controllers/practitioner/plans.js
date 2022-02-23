const prisma = require('../prisma-client');

const index = async (ctx) => {
  const plans = await prisma.plan.findMany({
    where: {
      practitionerId: ctx.practitioner.id
    }
  });

  ctx.body = plans
  ctx.status = 200
}

const create = async (ctx) => {

  if (ctx.request.body.practitionerId != ctx.practitioner.id) {
    ctx.status = 401
    return
  }

  const plan = await prisma.plan.create({
    data: {
      ...ctx.request.body
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
  const id = parseInt(ctx.params.id);
  await prisma.plan.delete({
    where: {
      id: id,
      practitionerId: ctx.practitioner.id
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
