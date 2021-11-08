const userType = {
  CLIENT:'client',
  PRACTITIONER: 'practitioner'
}

const callUserTypeFunction = async (ctx, clientCallback, practitionerCallback) => {
  if (ctx.userType == userType.CLIENT && clientCallback) {
    return clientCallback(ctx);
  } else if (ctx.userType == userType.PRACTITIONER && practitionerCallback) {
    return practitionerCallback(ctx);
  } else {
    return async (ctx) => {
      ctx.status = 404
    }
  }
}

module.exports = {
  userType,
  callUserTypeFunction,
}
