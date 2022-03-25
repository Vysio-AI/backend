const prisma = require('../prisma-client');
const storage = require('../../storage/index');
const { addSessionExercises, addSessionEnd } = require('../../redis/cache');
const { topics, sendMessage } = require('../../kafka/index');

const index = async (ctx) => {
  const sessions = await prisma.session.findMany({
    where: {
      clientId: ctx.client.id
    }
  });

  // Remove private practitioner notes
  for (let session in sessions) {
    delete session.privatePractitionerNotes;
  }

  ctx.body = sessions;
  ctx.status = 200
}

const create = async (ctx) => {
  const session = await prisma.session.create({
    data: {
      clientId: ctx.client.id,
      ...ctx.request.body
    }
  });

  // Add session exercises to cache
  await addSessionExercises(ctx.client.id, session);

  ctx.body = session;
  ctx.status = 200
}

const get = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const session = await prisma.session.findUnique({
    where: {
      id: id
    }
  });

  // Remove private practitioner notes
  delete session.privatePractitionerNotes;

  ctx.body = session;
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

  ctx.body = updateSession;
  ctx.status = 200;
}

const destroy = async (ctx) => {
  const id = parseInt(ctx.params.id);

  const video = await prisma.video.findUnique({
    where: {
      sessionId: id
    }
  })

  if (video) {
    // Delete video
    await prisma.video.delete({
      where: {
        sessionId: id
      }
    });

    // Delete file from Google Cloud Storage
    await storage.deleteVideoFile(video.fileName);
  }

  const deleteSessionFrames = await prisma.sessionFrame.deleteMany({
    where: {
      sessionId: id
    }
  });

  // Delete session
  await prisma.session.delete({
    where: {
      id: id
    }
  });

  ctx.status = 204;
}

const end = async (ctx) => {
  const sessionId = parseInt(ctx.params.id);

  const updateSession = await prisma.session.update({
    where: {
      id: sessionId
    },
    data: {
      ...ctx.request.body,
      status: 'COMPLETED'
    }
  });

  // Add session end flag to redis
  await addSessionEnd(ctx.client.id, sessionId);

  // Produce session end message to kafka
  const key = ctx.client.id.toString();
  const msg = JSON.stringify({'sessionId': updateSession.id})
  await sendMessage(topics.SESSION_END, key, msg);

  ctx.body = updateSession;
  ctx.status = 200;
}

const notify = async (ctx) => {
  const sessionId = parseInt(ctx.params.id);

  const updateSession = await prisma.session.update({
    where: {
      id: sessionId,
    },
    data: {
      notification: {
        create: ctx.request.body,
      },
    },
  });

  await sendMessage(
    topics.NOTIFICATIONS,
    updateSession.practitionerId.toString(),
    JSON.stringify({
      notificationType: 'SESSION',
      sessionId: updateSession.id,
      clientId: updateSession.clientId,
      planId: updateSession.planId,
      practitionerId: updateSession.practitionerId,
    })
  );

  ctx.body = updateSession;
  ctx.status = 200;
}

const getAllSessionFrames = async (ctx) => {
  const sessionId = parseInt(ctx.params.id);

  const session = await prisma.sessionFrame.findUnique({
    where: {
      id: sessionId
    }
  })

  if (session.clientId != ctx.client.id) {
    ctx.status = 401;
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
      id: sessionId
    }
  })

  if (session.clientId != ctx.client.id) {
    ctx.status = 401;
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
  create,
  get,
  update,
  destroy,
  end,
  notify,
  getAllSessionFrames,
  getAllFlags
};
