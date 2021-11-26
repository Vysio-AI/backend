const prisma = require('../prisma-client');
const storage = require('../../storage/index');

const index = async (ctx) => {
  const sessions = await prisma.session.findMany({
    where: {
      clientId: ctx.client.id
    }
  });

  ctx.body = {
    data: sessions
  }
  ctx.status = 200
}

const create = async (ctx) => {
  console.log(ctx.request.body);
  const session = await prisma.session.create({
    data: {
      clientId: ctx.client.id,
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

  // Delete video
  const video = await prisma.video.delete({
    where: {
      sessionId: id
    }
  });

  // Delete file from Google Cloud Storage
  await storage.deleteVideoFile(video.fileName);

  // Delete session
  await prisma.session.delete({
    where: {
      id: id
    }
  });

  ctx.status = 204;
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
  index,
  create,
  get,
  update,
  destroy,
  getAllSessionFrames,
  getAllFlags
};
