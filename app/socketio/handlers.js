const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const processMsg = (msg) => {
  const obj = JSON.parse(msg);
  obj.userId = 2;
  return obj;
};

const setup = (io) => {
  io.on('connection', (socket) => {
    // On connected
    console.log('Connected');

    // Handle message
    socket.on('message', (msg) => {
      console.log(msg);
      io.emit('message', {
        "message": "A message"
      });
    });

    socket.on('watchMessage', (msg) => {

      io.emit('watchMessage', "ack")
    })
  });
}

module.exports = {
  setup,
}