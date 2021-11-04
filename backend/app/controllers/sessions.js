const prisma = require('./prisma-client');
const kafka = require('../kafka/index');
const redis = require('../redis/index');

const activityType = {
  'PENDULUM': 0,
  'ABDUCTION': 1,
  'FORWARD_ELEVATION': 2,
  'INTERNAL_ROTATION': 3,
  'EXTERNAL_ROTATION': 4,
  'TRAPEZIUS_EXTENSION': 5,
  'UPRIGHT_ROW': 6
};

const create = async (ctx) => {
  const session = await prisma.session.create({
    data: {
      ...ctx.request.body
    }
  });

  const protocol = await prisma.protocol.findUnique({
    where: {
      id: session.protocolId
    },
    include: {
      exercises: true
    }
  });

  // Asynchronously add each exercise to redis
  const client = await redis.connect();

  const results = await Promise.all(protocol.exercises.map(async (exercise) => {
    return await client.set(`${session.id}:${activityType[exercise.activityType]}`, exercise.activityType);
  }));

  console.log(results);

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

const end = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const updateSession = await prisma.session.update({
    where: {
      id: id
    },
    data: {
      endTime: Date.now()
    }
  });

  // Send message to kafka to indicate session is complete
  kafka.sendMessage("session-end", "1", JSON.stringify({
    session_id: id
  }));

  ctx.body = {
    data: updateSession
  }
  ctx.status = 200;
}

const getAllSessionFrames = async (ctx) => {
  const sessionId = parseInt(ctx.params.id);
  const sessionFrames = await prisma.sessionFrame.findMany({
    where: {
      sessionId: sessionId
    }
  });

  ctx.body = {
    data: sessionFrames
  };
  ctx.status = 200;
}

const getAllFlags = async (ctx) => {
  const sessionId = parseInt(ctx.params.id);
  const flags = await prisma.flag.findMany({
    where: {
      sessionId: sessionId
    }
  });

  ctx.body = {
    data: flags
  };
  ctx.status = 200;
}

module.exports = {
  create,
  get,
  update,
  destroy,
  getAllSessionFrames,
  getAllFlags
};
