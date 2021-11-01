const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const kafka = require('../kafka/index');

const create = async (ctx) => {
  const session = await prisma.session.create({
    data: {
      ...ctx.request.body
    }
  });

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
