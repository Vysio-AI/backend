const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const catchError = async function catchError(ctx, next) {
  try {
    await next();
    if (ctx.status === 404) ctx.throw(404);
    if (ctx.status === 401) ctx.throw(401);
  } catch (err) {
    let status = err.status || 500;
    if (status < 0) {
      status = 500;
    }
    ctx.status = status;

    if (status === 500) {
      console.log('Server error', err, ctx);
      ctx.body = {
        errors: "Internal Server Error",
        status: ctx.status
      }
    } else if (status === 401) {
      console.log('Unauthorized', err, ctx);
      ctx.body = {
        errors: "Unauthorized",
        status: ctx.status
      }
    } else {
      console.log('Unknown error: ', ctx, err);
      ctx.body = {
        errors: "Error",
        status: ctx.status,
      }
    }
  }
}

const checkToken = async function checkToken(ctx, next) {
  ctx.user = {
    id: 2,
    firstName: "Test",
    lastName: "Test last"
  }
  await next()
}

module.exports = {
  catchError,
  checkToken,
}