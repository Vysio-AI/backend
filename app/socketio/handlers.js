const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const processMsg = (msg) => {
  const obj = JSON.parse(msg);
  obj.userId = 2;
  return obj;
}

const setup = (io, socket) => {
  console.log('Connected');
  socket.on('message', (msg) => {
    console.log(msg);
    const processed = processMsg(msg);
    io.emit('message', processed);
  });
}

module.exports = {
  setup,
}