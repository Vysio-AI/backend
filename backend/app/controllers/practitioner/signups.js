const prisma = require('../prisma-client');

const signupPractitioner = async (ctx) => {
  const practitioner = await prisma.practitioner.create({
    data: {
      ...ctx.request.body,
      auth0Sub: ctx.state.user.sub,
    }
  });

  ctx.body = practitioner;
  ctx.status = 200;
}

// Ping this endpoint to check the signup status of the current user
// Returns an object with user type (client || practitioner) if the user
// is signed up, as well as sign up status.
const signupStatus = async (ctx) => {
  if(ctx.userType && (ctx.client || ctx.practitioner)) {
    console.log("Signed up");
    ctx.body = {
      signedUp: true,
      type: ctx.userType
    }
    ctx.status = 200;
  } else {
    console.log("Not signed up");
    ctx.body = {
      signedUp: false
    }
    ctx.status = 200;
  }
}

module.exports = {
  signupPractitioner,
  signupStatus,
};
