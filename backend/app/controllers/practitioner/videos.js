const prisma = require('../prisma-client');
const storage = require('../../storage/index');

const get = async (ctx) => {
  const id = parseInt(ctx.params.id);

  const video = await prisma.video.findUnique({
    where: {
      id: id
    }
  });

  const session = await prisma.session.findUnique({
    where: {
      id: video.sessionId
    }
  });

  if (session.practitionerId != ctx.practitioner.id) {
    ctx.status = 401
    return
  }

  // Get read signed URL for file associated with video object
  const readSignedUrl = {
    'readSignedUrl': await storage.generateReadSignedUrl(video.fileName)
  };

  ctx.body = {...video, ...readSignedUrl}
  ctx.status = 200;
}

module.exports = {
  get,
};
