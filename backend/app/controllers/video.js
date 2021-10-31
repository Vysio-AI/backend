const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getSignedUrl = async (ctx) => {
  const id = parseInt(ctx.params.id);
  const video = await prisma.video.findUnique({
    where: {
      id: id
    }
  });

  // Authenticate video's url and return pre-signed url
  const preSignedUrl = video.url

  ctx.body = {
    data: preSignedUrl
  }
  ctx.status = 200;
}

module.exports = {
  getSignedUrl
};
