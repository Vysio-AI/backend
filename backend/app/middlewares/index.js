const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const jwt = require('koa-jwt');
const jwksRsa = require('jwks-rsa');

const catchError = async (ctx, next) => {
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
        status: ctx.status,
        error: err
      }
    } else {
      ctx.body = {
        errors: "Error",
        status: ctx.status,
      }
    }
  }
}

const checkToken = jwt({
  secret: jwksRsa.koaJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://petermarshall.us.auth0.com/.well-known/jwks.json`
  }),
  audience: 'https://api.vysio.ca',
  issuer: 'https://petermarshall.us.auth0.com/',
  algorithms: ['RS256', 'HS256']
});

const setUser = async (ctx, next) => {
  const user = ctx.state.user;
  console.log(user);
  const client = await prisma.client.findUnique({
    where: {
      auth0Sub: user.sub
    }
  });

  const practitioner = await prisma.practitioner.findUnique({
    where: {
      auth0Sub: user.sub
    }
  });

  if (client != null) {
    ctx.userType = 'client'
    ctx.client = client
  } else if (practitioner != null) {
    ctx.userType = 'practitioner'
    ctx.practitioner = practitioner
  } else {
    if (ctx.request.url != '/api/v1/clients/signup' && ctx.request.url != '/api/v1/practitioners/signup') {
      ctx.status = 401
    }
  }
  await next(ctx);
}

module.exports = {
  catchError,
  checkToken,
  setUser,
}
