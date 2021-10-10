const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const catchError = async function catchError(ctx, next) {
  try {
    await next();
    if (ctx.status === 404) ctx.throw(404);
  } catch (err) {
    let status = err.status || 500;
    if (status < 0) {
      status = 500;
    }
    ctx.status = status;
    if (status === 500) {
      console.log('server error', err, ctx);
    }
    ctx.body = {
      "message": "Server error"
    }
  }
}

const authenticateUser = async function setUser(ctx, next) {
  ctx.user = {
    id: 2,
    firstName: "Test",
    lastName: "Test last"
  }
  await next()
}

module.exports = {
  catchError,
  authenticateUser,
}