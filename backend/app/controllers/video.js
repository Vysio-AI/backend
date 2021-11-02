const prisma = require('./prisma-client');
const storage = require('../storage/index');

const create = async (ctx) => {
  const video = await prisma.video.create({
    data: {
      ...ctx.request.body
    }
  });

  // Get upload signed URL for file associated with video object
  const uploadSignedUrl = {
    'uploadSignedUrl': await storage.generateUploadSignedUrl(video.fileName)
  };

  ctx.body = {
    data: {...video, ...uploadSignedUrl}
  }
  ctx.status = 200;
}

const get = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const video = await prisma.video.findUnique({
    where: {
      id: id
    }
  });

  // Get read signed URL for file associated with video object
  const readSignedUrl = {
    'readSignedUrl': await storage.generateReadSignedUrl(video.fileName)
  };

  ctx.body = {
    data: {...video, ...readSignedUrl}
  }
  ctx.status = 200;
}

const destroy = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const video = await prisma.video.delete({
    where: {
      id: id
    }
  });

  // Delete file from Google Cloud Storage
  await storage.deleteVideoFile(video.fileName);

  ctx.status = 204;
}

module.exports = {
  create,
  get,
  destroy,
};
