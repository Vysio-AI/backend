const userType = {
  CLIENT = 'client',
  PRACTITIONER = 'practitioner'
}

const callUserTypeFunction = async (ctx, clientCallback, practitionerCallback) => {
  if (ctx.userType == userType.CLIENT) {
    await clientCallback(ctx);
  } else if (ctx.userType == userType.PRACTITIONER) {
    await practitionerCallback(ctx);
  }
}


module.exports = {
  userType,
  callUserTypeFunction,
}
