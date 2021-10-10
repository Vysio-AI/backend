const ping = async (ctx) => {
  ctx.body = {
    "message": "Ping!"
  };
  ctx.status = 200;
}

module.exports = {
  ping,
}