const prisma = require('../prisma-client');
const storage = require('../../storage/index');


// Get all sessions for all clients
const index = async (ctx) => {
  const clients = await prisma.client.findMany({
    where: {
      practitionerId: ctx.practitioner.id
    },
    include: {
      sessions: true
    }
  });

  // Flatmap returns a new array formed by applying a given
  // callback function to each element of the array, then
  // flattening the result by one level
  const sessions = clients.flatMap(client => {
    return client.sessions
  });

  ctx.body = sessions;
  ctx.status = 200
}

const get = async (ctx) => {
  const sessionId = parseInt(ctx.params.id);

  const session = await prisma.session.findUnique({
    where: {
      id: sessionId,
    }
  });

  if (session.practitionerId !== ctx.practitioner.id) {
    ctx.status = 401
    return
  }

  if (session && (session.status == "PROCESSED" || session.status == "COMPLETED")) {
    const video = await prisma.video.findUnique({
      where: {
        sessionId: session.id
      }
    })
    session.videoId = video.id;
    session.videoFileName = video.fileName
  }
  
  ctx.body = session;
  ctx.status = 200;
}

const update = async (ctx) => {
  const sessionId = parseInt(ctx.params.id);

  const session = await prisma.session.findUnique({
    where: {
      id: sessionId
    }
  })

  if (session.practitionerId !== ctx.practitioner.id) {
    ctx.status = 401
    return
  }

  const updateSession = await prisma.session.update({
    where: {
      id: sessionId,
    },
    data: ctx.request.body
  });

  ctx.body = updateSession;
  ctx.status = 200;
}

const destroy = async (ctx) => {
  const sessionId = parseInt(ctx.params.id);

  const session = await prisma.session.findUnique({
    where: {
      id: sessionId
    }
  });

  if (session.practitionerId != ctx.practitioner.id) {
    ctx.status = 401
    return
  }

  // Delete notification
  await prisma.sessionNotification.delete({
    where: {
      sessionId: sessionId
    }
  })

  // Delete video
  const video = await prisma.video.delete({
    where: {
      sessionId: sessionId
    }
  });

  // Delete file from Google Cloud Storage
  await storage.deleteVideoFile(video.fileName);

  // Delete session
  await prisma.session.delete({
    where: {
      id: sessionId
    }
  });

  ctx.status = 204;
}

const getAllSessionFrames = async (ctx) => {
  const sessionId = parseInt(ctx.params.id);

  const session = await prisma.session.findUnique({
    where: {
      id: id
    }
  });

  if (session.practitionerId != ctx.practitioner.id) {
    ctx.status = 401
    return
  }

  const sessionFrames = await prisma.sessionFrame.findMany({
    where: {
      sessionId: sessionId
    }
  });

  ctx.body = sessionFrames;
  ctx.status = 200;
}

const getAllFlags = async (ctx) => {
  const sessionId = parseInt(ctx.params.id);

  const session = await prisma.session.findUnique({
    where: {
      id: id
    }
  });

  if (session.practitionerId != ctx.practitioner.id) {
    ctx.status = 401
    return
  }

  const flags = await prisma.flag.findMany({
    where: {
      sessionId: sessionId
    }
  });

  ctx.body = flags;
  ctx.status = 200;
}

module.exports = {
  index,
  get,
  update,
  destroy,
  getAllSessionFrames,
  getAllFlags
};
