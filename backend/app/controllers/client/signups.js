const prisma = require('../prisma-client');

const signupClient = async (ctx) => {
  console.log(ctx.request.body);
  const client = await prisma.client.create({
    data: {
      ...ctx.request.body,
      auth0Sub: ctx.state.user.sub,
    }
  });

  const settings = await prisma.clientNotificationSettings.create({
    data: {
      clientId: client.id
    }
  });

  ctx.body = {
    data: client
  };
  ctx.status = 200;
}

const signupPractitioner = async (ctx) => {
  const practitioner = await prisma.practitioner.create({
    data: {
      ...ctx.request.body,
      auth0Sub: ctx.state.user.sub,
    }
  });

  const settings = await prisma.practitionerNotificationSettings.create({
    data: {
      practitionerId: practitioner.id
    }
  });

  ctx.body = {
    data: practitioner
  };
  ctx.status = 200;
}

// Ping this endpoint to check the signup status of the current user
// Returns an object with user type (client || practitioner) if the user
// is signed up, as well as sign up status.
const signupStatus = async (ctx) => {
  if(ctx.userType && (ctx.client || ctx.practitioner)) {
    console.log("Signed up");
    ctx.body = {
      data: {
        signedUp: true,
        type: ctx.userType
      }
    }
    ctx.status = 200;
  } else {
    console.log("Not signed up");
    ctx.body = {
      data: {
        signedUp: false
      }
    }
    ctx.status = 200;
  }
}

module.exports = {
  signupClient,
  signupPractitioner,
  signupStatus,
};
