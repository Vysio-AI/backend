const prisma = require('../prisma-client');

const create = async (ctx) => {

  // Check if req planId belongs to practitioner
  const plan = await prisma.plan.findUnique({
    where: {
      id: ctx.request.body.planId
    }
  });

  if (!plan) {
    ctx.status = 404
    ctx.body = {
      "error": "Plan does not exist"
    }
  } else if (plan.practitionerId != ctx.practitioner.id) {
    ctx.status = 401
    ctx.body = {
      "error": "unauthorized"
    }
  }

  const exercise = await prisma.exercise.create({
    data: {
      ...ctx.request.body
    }
  });

  ctx.body = exercise;
  ctx.status = 200
}

const get = async (ctx) => {
  const id = parseInt(ctx.params.id);

  const exercise = await prisma.exercise.findUnique({
    where: {
      id: id
    }
  });

  if (ctx.practitioner.plans.every((plan) => {
    plan.id != exercise.planId
  })) {
    ctx.status = 401;
    return
  }

  ctx.body = exercise;
  ctx.status = 200;
}

const update = async (ctx) => {
  const id = parseInt(ctx.params.id);

  const exercise = await prisma.exercise.findUnique({
    where: {
      id: id
    }
  });

  if (ctx.practitioner.plans.every((plan) => {
    plan.id != exercise.planId
  })) {
    ctx.status = 401;
    return
  }

  const updateExercise = await prisma.exercise.update({
    where: {
      id: id
    },
    data: ctx.request.body
  });

  ctx.body = updateExercise;
  ctx.status = 200;
}

const destroy = async (ctx) => {
  const id = parseInt(ctx.params.id);

  const exercise = await prisma.exercise.findUnique({
    where: {
      id: id
    }
  });

  if (ctx.practitioner.plans.every((plan) => {
    plan.id != exercise.planId
  })) {
    ctx.status = 401;
    return
  }

  await prisma.exercise.delete({
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
