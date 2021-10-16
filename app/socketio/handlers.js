const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const kafka = require('../kafka/index');

const processMsg = (msg) => {
  const obj = JSON.parse(msg);
  obj.userId = 2;
  return obj;
};

const setup = (io) => {
  io.on('connection', (socket) => {
    // On connected
    console.log('Connected');

    socket.on('message', (msg) => {
      let timestamp = new Date();
      timestamp = timestamp.toJSON();

      const testMessage = {
        session_id: 2,
        timestamp: timestamp,
        a_x: 2.34,
        a_y: 1.33,
        a_z: 4.65,
        w_x: 2.63,
        w_y: 1.84,
        w_z: 2.32,
      }

      kafka.sendMessage('watch', "1", JSON.stringify(testMessage));
      console.log('message');
      io.emit('message', "ack");
    })
  });
}

module.exports = {
  setup,
}