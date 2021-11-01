const { PrismaClient } = require('@prisma/client');
const storage = require('../storage/index');

const prisma = new PrismaClient();

const getReadSignedUrl = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const video = await prisma.video.findUnique({
    where: {
      id: id
    }
  });

  const readSignedUrl = await storage.generateReadSignedUrl(video.fileName);

  ctx.body = {
    data: readSignedUrl
  }
  ctx.status = 200;
}

module.exports = {
  getReadSignedUrl
};
