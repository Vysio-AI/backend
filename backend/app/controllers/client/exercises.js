const prisma = require('../prisma-client');

const get = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const exercise = await prisma.exercise.findUnique({
    where: {
      id: id
    }
  });

  ctx.body = exercise;
  ctx.status = 200;
}

module.exports = {
  get,
};
